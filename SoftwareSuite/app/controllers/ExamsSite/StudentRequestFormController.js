define(['app'], function (app) {
    app.controller("StudentRequestFormController", function ($scope, $crypto, SystemUserService,$http, $localStorage, $state, $window, $stateParams, AppSettings, PreExaminationService, PaymentService, $uibModal) {
        $scope.TCReceiptFound = false;
        $scope.serviceform = true;
        $scope.result = false;
        //$scope.Price = 0;
        //$scope.loader = true;
        $scope.date = new Date();
        //    $scope.Schemes = [{ "Id": "1", "Name": "C-00" },
        //        { "Id": "2", "Name": "C-96" },
        //         { "Id": "3", "Name": "C-90" },
        //{ "Id": "4", "Name": "NC" },
        //    ]



        const $ctrl = this;

        $ctrl.$onInit = () => {

            $scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')

            var eKey = SystemUserService.GetEKey();
            eKey.then(function (res) {
                $scope.EKey = res;
                $scope.EncriptedSession = $crypto.encrypt($crypto.encrypt($scope.SessionCaptcha, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                $scope.GetCaptchaData()

            });


        }



        $scope.GetCaptchaData = function () {
            var captcha = PreExaminationService.GetCaptchaString($scope.EncriptedSession);
            captcha.then(function (response) {
                try {
                    var res = JSON.parse(response);
                    $scope.GetCatcha = res[0].Text;
                    $scope.CaptchaImage = res[0].Image;

                } catch (err) {
                    $scope.GetCatcha = ''
                }
            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }


        $scope.ValidateCaptchaText = function (PinNumber) {

            if ($scope.CertificateType == null || $scope.CertificateType == "" || $scope.CertificateType == undefined) {
                alert("select Certificate Type");
                return;
            }

            if (PinNumber == null || PinNumber == "" || PinNumber == undefined) {
                alert("Enter PIN.");
                return;
            }

            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.loginbutton = false;
                return;
            };

            var EncriptedCaptchaText = $crypto.encrypt($crypto.encrypt($scope.CaptchaText.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            var Encstdpin = $crypto.encrypt($crypto.encrypt($scope.PinNumber.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            var captcha = PreExaminationService.ValidateCaptchaText($scope.EncriptedSession, EncriptedCaptchaText, Encstdpin);

         
            captcha.then(function (res) {
                var response = JSON.parse(res)
                //var Data = JSON.parse(response[0])
                //var response = Data;
                if (response[0].ResponceCode == '200') {
                    //alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    $scope.LoadImg = false;
                    $scope.DetailsNotFound = false;
                    $scope.DetailsFound = true;
                    $scope.save(PinNumber);
                    //  var resp = Data;


                } else {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)

                    $scope.CaptchaImage = captcha[0].Image;
                    $scope.Login.CaptchaText = "";
                    $scope.loginbutton = false;

                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.EKey = res;
            sessionStorage.Ekey = res;

        });
        $scope.inputType = 'password';
        $scope.eyeIcon = '👁️';


        $scope.toggleAadharVisibility = function () {
            $scope.inputType = ($scope.inputType === 'password') ? 'text' : 'password';
            $scope.eyeIcon = ($scope.inputType === 'password') ? '👁️' : '👀';
        };
        var getNoDataScheme = PreExaminationService.getNoDataSchemes();
        getNoDataScheme.then(function (response) {

            if (response.Table.length > 0) {
                $scope.Schemes = response.Table;

            }
        },
            function (error) {

            });

        var GetBonafideTypes = PreExaminationService.GetBonafideTypes();
        GetBonafideTypes.then(function (response) {

            if (response.Table.length > 0) {
                $scope.BonafideTypes = response.Table;

            }
        },
            function (error) {

            });

        var GetCollegeBranchs = PreExaminationService.GetBranchs();
        GetCollegeBranchs.then(function (response) {

            if (response.Table.length > 0) {
                $scope.getBranchs = response.Table;

            }
        },
            function (error) {

            });
        var GetCollegelist = PreExaminationService.GetCollegelist();
        GetCollegelist.then(function (response) {

            if (response.Table.length > 0) {
                $scope.GetCollegelist = response.Table;

            }
        },
            function (error) {

            })

        $scope.Genders = [{
            "Id": 1,
            "Name": "Male"
        },
            {
                "Id": 2,
                "Name": "Female"
            }
        ]
        $scope.Reasons = [{
            "Id": 1,
            "Name": "Course Completed"
        },
            {
                "Id": 2,
                "Name": "Discontinued"
            }
        ]

        $scope.transccert = [{
            "Id": 1,
            "Name": "ODC"
        },
            {
                "Id": 2,
                "Name": "Marks Memo"
            }
        ]

        $scope.Universities = [{
            "Id": 1,
            "Count": "1"
        },
            {
                "Id": 2,
                "Count": "2"
            },
            {
                "Id": 3,
                "Count": "3"
            },
            {
                "Id": 4,
                "Count": "4"
            },
            {
                "Id": 5,
                "Count": "5"
            },
            {
                "Id": 6,
                "Count": "6"
            },
        ]

        /// recaptcha

        $scope.createCaptcha = function () {
            $scope.newCapchaCode = "";
            //document.getElementById('captcha').innerHTML = "";
            var charsArray =
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
            var lengthOtp = 6;
            var captcha = [];
            for (var i = 0; i < lengthOtp; i++) {
                //below code will not allow Repetition of Characters
                var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
                if (captcha.indexOf(charsArray[index]) == -1)
                    captcha.push(charsArray[index]);
                else i--;
            }
            var canv = document.createElement("canvas");
            canv.id = "captcha";
            canv.width = 150;
            canv.height = 50;
            var ctx = canv.getContext("2d");
            ctx.font = "25px Georgia";
            ctx.strokeText(captcha.join(""), 0, 30);

            $scope.newCapchaCode = captcha.join("");
            //document.getElementById("captcha").appendChild(canv);
        }




        $window.validateRecaptcha = $scope.validateRecaptcha;

        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.save($scope.PinNumber);
            }
        }

        $scope.ChangeReason = function (OdcReason) {
            //alert(OdcReason)

            $scope.OdcReason = OdcReason;
        }




        $scope.array = []

        $scope.Add = function () {
            if ($scope.Sem == null || $scope.Sem == '' || $scope.Sem == undefined) {
                alert("Please Select Semester")
                return
            }
            if ($scope.ExamMonthYear == null || $scope.ExamMonthYear == '' || $scope.ExamMonthYear == undefined) {
                alert("Please Select Exam Month Year")
                return
            }
            var ExamMonthYear = $scope.ExamMonthYear
            if ($scope.ExamMonthYear == 'Other') {
                if ($scope.ExamMonth == null || $scope.ExamMonth == '' || $scope.ExamMonth == undefined) {
                    alert("Please Enter Exam Month Year")
                    return

                    var ExamMonthYear = $scope.ExamMonth
                }

            }
            for (i = 0; i < $scope.array.length; i++) {
                console.log($scope.array[i])
                if ($scope.array[i].Semester == $scope.Sem && $scope.array[i].ExamMonthYear == ExamMonthYear) {
                    alert('Semester or Exam Month Year Already Added Choose Another')
                    return
                }
                //if ($scope.array[i].ExamMonthYear == ExamMonthYear) {
                //    alert('Matched')
                //    return
                //}
            }
            var obj = {
                "Scheme": $scope.Scheme,
                "Semester": $scope.Sem,
                "ExamMonthYear": ExamMonthYear,
                "Amount": 1000
            }
            $scope.array.push(obj)
            $scope.Amount = 0
            for (var i = 0; i < $scope.array.length; i++) {
                $scope.Amount += $scope.array[i].Amount;
            }
            $scope.Price = $scope.Amount

        }

        $scope.Delete = function (id) {

            var id = id + 1

            $scope.array = removeItem($scope.array, id)
            $scope.Amount = 0
            for (var i = 0; i < $scope.array.length; i++) {
                $scope.Amount += $scope.array[i].Amount;
            }
            $scope.Price = $scope.Amount

        }
        const removeItem = (items, i) =>
            items.slice(0, i - 1).concat(items.slice(i, items.length))


        var Religion = PreExaminationService.GetReligion();
        Religion.then(function (response) {
            //var response = JSON.parse(response)
            $scope.Religions = response.Table
        }, function (error) {
            $scope.studentform = [];
            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });

        var Caste = PreExaminationService.GetCastes();
        Caste.then(function (response) {
            //var response = JSON.parse(response)
            $scope.Castes = response.Table
        }, function (error) {
            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });

        var Reason = PreExaminationService.GetOdcReasons();
        Reason.then(function (response) {
            //var response = JSON.parse(response)
            $scope.getOdcReasons = response.Table
        }, function (error) {


            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });

        var ExamMonth = PreExaminationService.GetExamMonthYears();
        ExamMonth.then(function (response) {
            //var response = JSON.parse(response)
            $scope.ExamMonthYears = response.Table
        }, function (error) {


            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });


        var semester = PreExaminationService.getActiveSemester();
        semester.then(function (response) {
            //var response = JSON.parse(response)
            $scope.Semesters = response.Table
        }, function (error) {


            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data")
        });


        $scope.ChangeOrganization = function () {
            if ($scope.OrganizationType == 'Government') {
                $scope.Price = 0
                //$scope.Submit();
            } else {
                $scope.Price = 500
            }
        }
        $scope.receiptBack = function () {
            $scope.serviceform = true;
            $scope.TCReceiptFound = false;
            $scope.cleardata();
        }

        $scope.printTcReceipt = function () {

            var divName = "TcReceiptDivPrint";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "mytable";



            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;
            //    $("#markslist").hide();
            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if ($printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";


                document.body.appendChild($printSection);

                var $ele1 = document.createElement("div");
                $ele1.className = "row";

                var $ele2 = document.createElement("div");
                $ele2.className = "col-lg-2 col-md-12";

                var $ele3 = document.createElement("div");
                $ele3.className = "col-lg-10 col-md-12";


                $ele1.appendChild($ele3);

                $printSection.appendChild($ele1);

                $printSection.appendChild($ele1);
                $printSection.appendChild($markstable);

            }

            window.print();


        }

        $scope.studentform = [];
        $scope.uploadpdffiles = function () {
            var input = document.getElementById("WesCert");
            var fileSize = input.files[0].size;
            if (fileSize <= 3000000 && fileSize >= 1000000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    var base64file;
                    reader.onload = function (ele) {
                        $('#wesfile').attr('src', ele.target.result);

                        base64file = ele.target.result;
                        $scope.upldWesfile = base64file.replace(/^data:application\/pdf+;base64,/, "");;
                        $scope.wesfile1 = canvas.toDataURL("application\/pdf").replace(/^data:application\/pdf+;base64,/, "");
                        ("image/png").replace(/^data:image\/[a-z]+;base64,/, "");

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 1000000) {
                alert("file size should not be less than 1MB");
                $('#WesCert').val('');
                return;
            } else if (fileSize >= 3000000) {
                alert("file size should not be greater than 3MB");
                $('#WesCert').val('');
                return;
            } else {
                alert("file size should be between 1MB and 3MB");
                $('#WesCert').val('');
                return;
            }
        }


        $scope.uploadPhoto = function () {
            var input = document.getElementById("stdPhotoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 3000000 && fileSize >= 1000000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdPhotoImg').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', {
                            src: e.target.result
                        });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image1 = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.userPhoto1 = base64Image1;
                            $scope.userPhoto = base64Image;

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 1000000) {
                alert("file size should not be less than 1MB");
                $('#stdPhotoFile').val('');
                return;
            } else if (fileSize >= 3000000) {
                alert("file size should not be greater than 3MB");
                $('#stdPhotoFile').val('');
                return;
            } else {
                alert("file size should be between 1MB and 3MB");
                $('#stdPhotoFile').val('');
                return;
            }
        }


        $scope.uploadPrincipalCover = function () {
            var input = document.getElementById("PrincipalCover");
            var fileSize = input.files[0].size;

            if (fileSize <= 3000000 && fileSize >= 1000000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#ViewPrincipalCover').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', {
                            src: e.target.result
                        });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image1 = canvas.toDataURL("image/png");
                            $scope.PrincipalCover1 = base64Image1;
                            var base64Image = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                            $scope.PrincipalCover = base64Image;


                            //var base64Image1 = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                            //var base64Image = canvas.toDataURL("image/png");
                            //$scope.userPhoto1 = base64Image1;
                            //$scope.userPhoto = base64Image;
                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 1000000) {
                alert("file size should not be less than 1MB");
                $('#PrincipalCover').val('');
                return;
            } else if (fileSize >= 3000000) {
                alert("file size should not be greater than 3MB");
                $('#PrincipalCover').val('');
                return;
            } else {
                alert("file size should be between 1MB and 3MB");
                $('#PrincipalCover').val('');
                return;
            }
        }

        $scope.uploadNoDue = function () {
            var input = document.getElementById("stdNodue");
            var fileSize = input.files[0].size;

            if (fileSize <= 3000000 && fileSize >= 1000000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdPhoto').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', {
                            src: e.target.result
                        });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.Photo = base64Image;

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else if (fileSize <= 1000000) {
                alert("file size should not be less than 1MB");
                $('#stdNodue').val('');
                return;
            }
            else if (fileSize >= 3000000) {
                alert("file size should not be greater than 3MB");
                $('#stdNodue').val('');
                return;
            } else {
                alert("file size should be between 1MB and 3MB");
                $('#stdNodue').val('');
                return;
            }
        }

        $scope.uploadAffidiate = function () {
            var input = document.getElementById("Affidiate");
            var fileSize = input.files[0].size;

            if (fileSize <= 3000000 && fileSize >= 1000000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#ViewAffidiate').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', {
                            src: e.target.result
                        });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Imag = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                            $scope.Affidiate = base64Imag;
                            console.log($scope.Affidiate)
                            var base64Image1 = canvas.toDataURL("image/png");
                            $scope.Affidiate1 = base64Image1;


                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 1000000) {
                alert("file size should not be less than 1MB");
                $('#Affidiate').val('');
                return;
            } else if (fileSize >= 3000000) {
                alert("file size should not be greater than 3MB");
                $('#Affidiate').val('');
                return;
            } else {
                alert("file size should be between 1MB and 3MB");
                $('#Affidiate').val('');
                return;
            }
        }

        $scope.uploadAadhar = function () {
            var input = document.getElementById("Aadhar");
            var fileSize = input.files[0].size;

            if (fileSize <= 3000000 && fileSize >= 1000000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#ViewAadhar').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', {
                            src: e.target.result
                        });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);

                            var base64Image1 = canvas.toDataURL("image/png");
                            $scope.Aadharxerox1 = base64Image1;
                            var base64Img = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                            $scope.Aadharxerox = base64Img;


                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 1000000) {
                alert("file size should not be less than 1MB");
                $('#Aadhar').val('');
                return;
            } else if (fileSize >= 3000000) {
                alert("file size should not be greater than 3MB");
                $('#Aadhar').val('');
                return;
            } else {
                alert("file size should be between 1MB and 3MB");
                $('#Aadhar').val('');
                return;
            }
        }


        $scope.Submit = function () {
            var ExamMonthYear = $scope.ExamMonthYear
            if ($scope.ExamMonthYear == 'Other') {
                var ExamMonthYear = $scope.ExamMonth;
                if (ExamMonthYear == undefined || ExamMonthYear == '' || ExamMonthYear == null) {
                    alert('Please Enter Exam Month & Year.');
                    return;
                }
            }


            if ($scope.UniversityCount == 1) {
                var UniversityEmail = $scope.UEmail1
            } else if ($scope.UniversityCount == 2) {
                var UniversityEmail = $scope.UEmail1 + ',' + $scope.UEmail2
            } else if ($scope.UniversityCount == 3) {
                var UniversityEmail = $scope.UEmail1 + ',' + $scope.UEmail2 + ',' + $scope.UEmail3
            } else if ($scope.UniversityCount == 4) {
                var UniversityEmail = $scope.UEmail1 + ',' + $scope.UEmail2 + $scope.UEmail3 + ',' + $scope.UEmail4
            } else if ($scope.UniversityCount == 5) {
                var UniversityEmail = $scope.UEmail1 + ',' + $scope.UEmail2 + $scope.UEmail3 + ',' + $scope.UEmail4 + ',' + $scope.UEmail5
            } else if ($scope.UniversityCount == 6) {
                var UniversityEmail = $scope.UEmail1 + ',' + $scope.UEmail2 + $scope.UEmail3 + ',' + $scope.UEmail4 + ',' + $scope.UEmail5 + ',' + $scope.UEmail6
            }
            //var UniversityEmail = $scope.UEmail1 + ',' + $scope.UEmail2 + ',' + $scope.UEmail3 + ',' + $scope.UEmail4 + ',' + $scope.UEmail5 + ',' + $scope.UEmail6
            //  +','+$scope.UEmail3+','+$scope.UEmail4+','+ $scope.UEmail5, $scope.UEmail6


            if ($scope.Certificate== 2 || $scope.Certificate== 4 || $scope.Certificate== 1 || $scope.Certificate== 7 || $scope.Certificate== 6 || $scope.Certificate== 5 || $scope.Certificate== 3 || $scope.Certificate== 9) {
                if ($scope.Certificate== 5) {
                    var EncriptedAadhar = $crypto.encrypt($crypto.encrypt($scope.AadharNo, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;


                    if ($scope.userData.Pin == undefined || $scope.userData.Pin == null || $scope.userData.Pin == '') {
                        alert('Please Enter Pin.');
                        return;
                    }
                    if ($scope.AadharNo == undefined || $scope.AadharNo == '' || $scope.AadharNo == null) {
                        alert('Please Enter Aadhaar Number.');
                        return;
                    }
                    if ($scope.OdcNo == undefined || $scope.OdcNo == '' || $scope.OdcNo == null) {
                        alert('Please Enter ODC Number.');
                        return;
                    }
                    if ($scope.userPhoto == undefined || $scope.userPhoto == '' || $scope.userPhoto == null) {
                        alert('Please upload Police Fir.');
                        return;
                    }
                    if ($scope.PrincipalCover1 == undefined || $scope.PrincipalCover1 == '' || $scope.PrincipalCover1 == null) {
                        alert('Please upload Principal Covering Letter.');
                        return;
                    }
                    if ($scope.Affidiate == undefined || $scope.Affidiate == '' || $scope.Affidiate == null) {
                        alert('Please upload Affidavit from Magistrate.');
                        return;
                    }
                    if ($scope.Aadharxerox == undefined || $scope.Aadharxerox == '' || $scope.Aadharxerox == null) {
                        alert('Please upload Aadhar Copy.');
                        return;
                    }

                    if ($scope.AadharNo.length != '12') {
                        alert('Aadhaar Number must be 12 digits.');
                        return;
                    }
                    console.log($scope.studentfilearr)
                    if ($scope.studentfilearr[0].file == '' || $scope.studentfilearr[0].file == null || $scope.studentfilearr[0].file == undefined) {
                        alert('Please upload  Certificates');
                        return;
                    }
                    var SetInterimData = PreExaminationService.SetOdcData($scope.userData.Pin, EncriptedAadhar, $scope.OdcNo, $scope.userPhoto1, $scope.PrincipalCover,
                        $scope.Affidiate, $scope.Aadharxerox, $scope.studentfilearr)
                    //AadharNo, OdcNo, PoliceFir, PrincipalCoveringLetter, MegisrateAffidavit, AadharCopy, OdcMemos
                    // var SetInterimData = PreExaminationService.SetInterimData($scope.userData.Pin)
                } else if ($scope.Certificate== 1) {
                    // alert("Please Click proceed to pay fee")
                    var SetInterimData = PreExaminationService.SetMigrationData($scope.userData.Pin)
                } else if ($scope.Certificate== 2) {
                    var SetInterimData = PreExaminationService.SetInterimData($scope.userData.Pin)
                    // alert("Please Click proceed to pay fee")
                } else if ($scope.Certificate== 6) {

                    var SetInterimData = PreExaminationService.SetTcData($scope.userData.Pin, $scope.Reason, $scope.IdMark1, $scope.IdMark2)
                } else if ($scope.Certificate== 7) {
                    if ($scope.userData.FatherName == null) {
                        $scope.userData.FatherName = ' '
                    }
                    var SetInterimData = PreExaminationService.SetNameCorrectionData($scope.userData.Pin, $scope.userData.Name, $scope.NewName, $scope.userData.FatherName,
                        $scope.NewFatherName, $scope.Gender, $scope.userPhoto)

                } else if ($scope.Certificate== 3) {
                    var SetInterimData = PreExaminationService.SetTranscriptData($scope.userData.Pin, $scope.UniversityCount, UniversityEmail, $scope.userPhoto, $scope.WesRefNo, $scope.Email, $scope.studentfilearr)

                } if ($scope.Certificate== 8) {
                    var ExamMonthYear = $scope.ExamMonthYear
                    if ($scope.ExamMonthYear == 'Other') {
                        if ($scope.ExamMonth == null || $scope.ExamMonth == '' || $scope.ExamMonth == undefined) {
                            alert("Please Enter Exam Month Year")
                            return

                            var ExamMonthYear = $scope.ExamMonth
                        }
                    }


                    var SetInterimData = PreExaminationService.SetGenuinenessCheck($scope.userData.Pin, $scope.OrganizationType, $scope.OrganizationName, $scope.OrganizationAddress, $scope.OrganizationEmail, $scope.OrganizationMobile, $scope.OdcNo, $scope.Aadharxerox,
                   ExamMonthYear, $scope.Price)

                } else if ($scope.Certificate== 4) {
                    if ($scope.userData.Pin == undefined || $scope.userData.Pin == null || $scope.userData.Pin == '') {
                        alert('Please Enter Pin.');
                        return;
                    }
                    //alert($scope.Sem)
                    if ($scope.Sem == undefined || $scope.Sem == '' || $scope.Sem == null) {
                        alert('Please Choose Semester.');
                        return;
                    }
                    var SetInterimData = PreExaminationService.UpdateMarksMemo($scope.userData.Pin, $scope.array)

                }
                SetInterimData.then(function (res) {
                    //if ($scope.Certificate== 4) {
                    //    var res = JSON.parse(res)
                    //}
                    if (res.Table[0].ResponceCode == '200') {
                        alert(res.Table[0].ResponseDescription)

                    } else {
                        alert(res.Table[0].ResponseDescription)
                    }
                });
            }
        }

        //             }, function (error) {
        //                 $scope.result = false;
        //             })


        $scope.GetSchemes = function () {
            var Schemes = PreExaminationService.GetSchemeByPin($scope.PinNumber);
            Schemes.then(function (response) {
                var response = JSON.parse(response)
                $scope.GetPinSchemes = response
                // $scope.GetSemsBySchemePin()
            }, function (error) {


                $scope.Data = false;
                $scope.Nodata = true;
                console.log("error while loading data");
            });
        }

        $scope.GetSemsBySchemePin = function () {
            var mySems = PreExaminationService.GetSemsBySchemePin($scope.PinNumber, $scope.Scheme);
            mySems.then(function (response) {
                //var response = JSON.parse(response)
                $scope.GetPinSems = response.Table
            }, function (error) {


                $scope.Data = false;
                $scope.Nodata = true;
                console.log("error while loading data");
            });
        }

        $scope.GetMonthYearBySemSchemePin = function () {
            var mySems = PreExaminationService.GetMonthYearBySemSchemePin($scope.PinNumber, $scope.Scheme, $scope.Sem);
            mySems.then(function (response) {
                //var response = JSON.parse(response)
                $scope.Monthyears = response.Table
            }, function (error) {
                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });
        }


        $scope.save = function (PinNumber) {
            $scope.MarksData =[]
            $scope.Verified = false;

            //if ($scope.Certificate== null || $scope.Certificate== "" || $scope.Certificate== undefined) {
            //    alert("select Certificate Type");
            //    return;
            //}

            //if (PinNumber == null || PinNumber == "" || PinNumber == undefined) {
            //    alert("Enter PIN.");
            //    return;
            //}
            //if ($scope.stsercaptcha == undefined || $scope.stsercaptcha == "") {
            //    alert("enter captcha");
            //    return;
            //};


            //if ($scope.stsercaptcha == $scope.newCapchaCode) {

            //} else {
            //    alert("invalid captcha. try again");
            //    $scope.stsercaptcha = "";
            //    $scope.createCaptcha();
            //    return;
            //}
            $scope.cleardata();
            $scope.PinNumber = PinNumber
            if ($scope.PinNumber.length > 9 && $scope.PinNumber.length < 16) {
                
                if ($scope.Certificate== 2) {
                    var getData = PreExaminationService.getDetailsByPin($scope.PinNumber)
                } else if ($scope.Certificate== 1) {
                    var getData = PreExaminationService.getMigrationDetailsByPin($scope.PinNumber)
                } else if ($scope.Certificate== 3) {
                    var res = $scope.PinNumber.substring(0, 2);
                    var tempval = angular.uppercase($scope.PinNumber)
                    var exis = (tempval.includes("CCA") || tempval.includes("CCC") || tempval.includes("CCCM") || tempval.includes("CCEC")
                        || tempval.includes("CCEE") || tempval.includes("CCM") || tempval.includes("CCMET") || tempval.includes("CCPT"));

                    if (res >= 75) {
                        alert("Data Not Found Please Fill the below Application for Certificate");
                        $scope.PinNo = $scope.PinNumber
                        $scope.result = true;
                        $scope.OldSudent = true;
                        $scope.NoDataFound = false;
                        $scope.NoData = false;

                    } else if (res <= 04) {
                        alert("Data Not Found Please Fill the below Application for Certificate");
                        $scope.result = true;
                        $scope.OldSudent = true;
                        $scope.PinNo = $scope.PinNumber
                        $scope.NoDataFound = false;
                        $scope.NoData = false;

                    } else if (res == 05 && exis) {
                        //alert("Data Not Found Please Fill the below Application for Certificate");
                        $scope.Data = false;
                        $scope.OldSudent = false;
                        $scope.PinNo = $scope.PinNumber
                        $scope.NoDataFound = false;
                        $scope.NoData = false;

                    } else {
                        var getData = PreExaminationService.getTranscriptDetailsByPin($scope.PinNumber)
                    }

                } else if ($scope.Certificate== 6) {
                    var getData = PreExaminationService.getTcDetailsByPin($scope.PinNumber)
                } else if ($scope.Certificate== 7) {
                    var getData = PreExaminationService.getNcDetailsByPin($scope.PinNumber)
                } else if ($scope.Certificate== 5) {

                    var res = $scope.PinNumber.substring(0, 2);
                    var tempval = angular.uppercase($scope.PinNumber)
                    var exis = (tempval.includes("CCA") || tempval.includes("CCC") || tempval.includes("CCCM") || tempval.includes("CCEC")
                        || tempval.includes("CCEE") || tempval.includes("CCM") || tempval.includes("CCMET") || tempval.includes("CCPT"));

                    if (res >= 75) {
                        //alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.PinNo = $scope.PinNumber
                        $scope.result = true;
                        $scope.OldSudent = true;
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                    } else if (res <= 04) {
                        alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.result = true;
                        $scope.OldSudent = true;
                        $scope.PinNo = $scope.PinNumber
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                    } else if (res == 05 && exis) {
                        //alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.Data = false;
                        $scope.OldSudent = false;
                        $scope.PinNo = $scope.PinNumber
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                    } else {
                        var getData = PreExaminationService.getODCDetailsByPin($scope.PinNumber)
                    }
                } else if ($scope.Certificate== 4) {
                    $scope.GetSchemes();
                    var res = $scope.PinNumber.substring(0, 2);
                    var tempval = angular.uppercase($scope.PinNumber)
                    var exis = (tempval.includes("CCA") || tempval.includes("CCC") || tempval.includes("CCCM") || tempval.includes("CCEC")
                        || tempval.includes("CCEE") || tempval.includes("CCM") || tempval.includes("CCMET") || tempval.includes("CCPT"));

                    if (res >= 75) {
                        //alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.PinNo = $scope.PinNumber
                        $scope.result = true;
                        $scope.OldSudent = true;
                        $scope.NoDataFound = false;
                        $scope.NoData = false;

                    } else if (res <= 04) {
                        alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.result = true;
                        $scope.OldSudent = true;
                        $scope.PinNo = $scope.PinNumber
                        $scope.NoDataFound = false;
                        $scope.NoData = false;

                    } else if (res == 05 && exis) {
                        //alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.Data = false;
                        $scope.OldSudent = false;
                        $scope.PinNo = $scope.PinNumber
                        $scope.NoDataFound = false;
                        $scope.NoData = false;

                    } else {

                        var getData = PreExaminationService.getMarksMemoDetailsByPin($scope.PinNumber)
                    }
                }
                else if ($scope.Certificate== 9) {


                    var res = $scope.PinNumber.substring(0, 2);
                    var tempval = angular.uppercase($scope.PinNumber)
                    var exis = (tempval.includes("CCA") || tempval.includes("CCC") || tempval.includes("CCCM") || tempval.includes("CCEC")
                        || tempval.includes("CCEE") || tempval.includes("CCM") || tempval.includes("CCMET") || tempval.includes("CCPT"));

                    if (res >= 75) {
                        //alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.PinNo = $scope.PinNumber
                        $scope.result = true;
                        $scope.OldSudent = true;
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                    } else if (res <= 04) {
                        alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.result = true;
                        $scope.OldSudent = true;
                        $scope.PinNo = $scope.PinNumber
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                    } else if (res == 05 && exis) {
                        //alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.Data = false;
                        $scope.OldSudent = false;
                        $scope.PinNo = $scope.PinNumber
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                    } else {
                        $scope.EncriptedPin = $crypto.encrypt($crypto.encrypt($scope.PinNumber.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;


                        var getData = PreExaminationService.getStudyDetailsByPin($scope.EncriptedPin)
                    }
                
                } else if ($scope.Certificate== 10) {


                    var res = $scope.PinNumber.substring(0, 2);
                    var tempval = angular.uppercase($scope.PinNumber)
                    var exis = (tempval.includes("CCA") || tempval.includes("CCC") || tempval.includes("CCCM") || tempval.includes("CCEC")
                        || tempval.includes("CCEE") || tempval.includes("CCM") || tempval.includes("CCMET") || tempval.includes("CCPT"));

                    if (res >= 75) {
                        //alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.PinNo = $scope.PinNumber
                        $scope.result = true;
                        $scope.OldSudent = true;
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                    } else if (res <= 04) {
                        alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.result = true;
                        $scope.OldSudent = true;
                        $scope.PinNo = $scope.PinNumber
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                    } else if (res == 05 && exis) {
                        //alert("Data Not Found Plase Fill the below Application for Certificate");
                        $scope.Data = false;
                        $scope.OldSudent = false;
                        $scope.PinNo = $scope.PinNumber
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                    } else {

                        var getData = PreExaminationService.getBonafiedDetailsByPin($scope.PinNumber)
                    }
                }


                getData.then(function (response) {
                    //$scope.stsercaptcha = "";
                    //$scope.createCaptcha();
                    var response = JSON.parse(response);
                    if (response.Table[0].ResponceCode == '400') {
                        $scope.Error = true;
                        $scope.OldSudent = false;
                        $scope.NoData = false;
                        $scope.result = false;
                        alert(response.Table[0].ResponceDescription)
                        $scope.ErrorMsg = response.Table[0].ResponceDescription;
                    } else {
                        // $scope.GetSchemes()
                        $scope.result = true;
                        $scope.Error = false;
                        $scope.OldSudent = false;
                        $scope.NoData = false;
                        $scope.NoDataFound = false;
                        if (response.Table1.length > 0) {
                            var data = response.Table1[0];

                            $scope.StudentPhoneNumber = response.Table1[0].StudentPhoneNumber;
                            $scope.applicatioNo = response.Table1[0].ApplicationNumber;
                            $scope.NewName = response.Table1[0].Name;
                            $scope.NewFatherName = response.Table1[0].FatherName;
                            $scope.CollegeCode = response.Table1[0].CollegeCode;
                            $scope.BranchCode = response.Table1[0].BranchCode;
                            $scope.NewName = response.Table1[0].Name;
                            $scope.NewFatherName = response.Table1[0].FatherName;

                            //if (data.Dateofbirth !== undefined) {
                            //    if (data.Dateofbirth !== null) {
                            //        var d = moment(data.Dateofbirth).toISOString().slice(0, 10).split('-');
                            //    }
                            //    if (d !== undefined && d[2] !== null && d[2] !== undefined) {
                            //        if (d[0].length == '4')
                            //            data.Dateofbirth = d[1] + "-" + d[2] + "-" + d[0];
                            //    }
                            //}
                            $scope.userData = data;
                            $scope.userData.Gender = response.Table1[0].Gender;
                            if ($scope.userData.Gender == 'M') {
                                $scope.Gender = 1;
                            } else if ($scope.userData.Gender == 'F') {
                                $scope.Gender = 2;
                            }
                        } else {
                            $scope.NoDataFound = true;
                            $scope.OldSudent = false;
                            $scope.Error = false;
                            $scope.result = false;
                            $scope.NoData = false;
                        }

                        if (response.Table2.length > 0) {
                            $scope.MarksData = response.Table2
                        }


                    }
                }, function (error) {
                    $scope.NoDataFound = true;
                    $scope.OldSudent = false;
                    $scope.Error = false;
                    $scope.result = false;
                    $scope.NoData = false;
                })

            } else {
                alert('Please Enter Valid PIN')
                $scope.NoDataFound = true;
                $scope.OldSudent = false;
                $scope.Error = false;
                $scope.result = false;
                $scope.NoData = false;
            }
        };


        $scope.Back = function () {
            $state.go('Dashboard.PostExam.StudentRequestForm');
        };


        var getDatagetCertificates = PreExaminationService.GetCertificateTypes()
        getDatagetCertificates.then(function (response) {

            try {
                var response = JSON.parse(response);
            } catch (err) { }
            $scope.CertificateTypes = response.Table;
            //$scope.CertificateTypes.splice(7, 1); 
            console.log($localStorage.StudentServices)
            $scope.CertificateType= $localStorage.StudentServices.ServiceType;
           
           
            $scope.Service = false;
        }, function (error) {
            $scope.NoDataFound = true;
            $scope.result = false;
        })

        $scope.cleardata = function () {

            $scope.tcapplicatioNo = "";
            $scope.NoOtp = true;
            $scope.limitexceeded = false;
            $scope.phonenoupdated = false;
            $scope.result = false;
            $scope.Otp = false;
            $scope.userData = [];
            $scope.array = []
            $scope.Sem = '';
            $scope.UniversityCount = '';
            $scope.Photo = "";
            $scope.userPhoto = '';
            $scope.WesRefNo = '';
            $scope.ExamMonthYear = '';
            $scope.Email = '';
            $scope.NewName = '';
            $scope.NewFatherName = '';
            $scope.AadharNo = '';
            $scope.OdcNo = '';
            $scope.userPhoto = '';
            $scope.PrincipalCover = '';
            $scope.Affidiate = '';
            $scope.Aadharxerox = '';
            $scope.OrganizationType = '';
            $scope.OrganizationName = '';
            $scope.OrganizationAddress = '';
            $scope.OrganizationEmail = '';
            $scope.OrganizationMobile = '';
            ExamMonthYear = '';
            $scope.upldfile = '';
            $scope.OdcReason = '';
            $scope.Affidiate1 = ''
            $scope.upldfile1 = ''
            $scope.userPhoto1 = '';
            $scope.PrincipalCover1 = '';
            $scope.Aadharxerox1 = '';
            $('#upldfile').val(null);
            $('#ViewAffidiate').attr('src', '');
            $('#Aadhar').val(null);
            $('#ViewAadhar').attr('src', '');
            $('#PrincipalCover').val(null);
            $('#ViewPrincipalCover').attr('src', '');
            $('#WesCert').val(null);
            $('#upldWesfile').val(null);
            $('#stdPhotoFile').val(null);
            $('#stdPhotoImg').attr('src', '');

            if ($scope.Certificate== 3) {
                $scope.studentfilearr = [{
                    fileindex: 0,
                    file: "",
                    filetype: ""
                },
                    {
                        fileindex: 1,
                        file: "",
                        filetype: ""
                    },
                    {
                        fileindex: 2,
                        file: "",
                        filetype: ""
                    }
                ];
            } else {
                $scope.studentfilearr = [{
                    fileindex: 0,
                    file: "",
                },
                    {
                        fileindex: 1,
                        file: ""
                    },
                    {
                        fileindex: 2,
                        file: ""
                    }
                ];
            }
            $scope.Reason = '';
            $scope.OTPdata = '';
            $scope.IdMark1 = '';
            $scope.IdMark2 = '';
            $scope.UEmail1 = '';
            $scope.UEmail2 = '';
            $scope.UEmail3 = '';
            $scope.UEmail4 = '';
            $scope.UEmail5 = '';
            $scope.UEmail6 = '';
            $scope.Religion = '';
            $scope.Caste = '';
            $scope.Gender = undefined;
            $scope.StudentPhoneNumber = '';
            $scope.NoOtp = true;
            $scope.limitexceeded = false;
            $scope.phonenoupdated = false;
            $scope.NoDataFound = false;
            $scope.Error = false;
            $scope.result = false;
            $scope.NoData = false;
            $scope.counter = 0;
            $scope.TranscriptPrice = '';
            $scope.TCReceiptFound = false;
            $scope.Name = '';
            $scope.FatherName = '';
            $scope.serviceform = true;
            $scope.CollegeCode = null;
            $scope.Scheme = null;
            $scope.Branch = null;
            $scope.ReasonForBonafied = '';
        }

        $scope.showTcReceipt = function () {
            $scope.result = false;
            $scope.TCReceiptFound = true;
            $scope.serviceform = false;
        }

        $scope.changeCertificate = function (data) {
            //try {
            //    var Cetificate = JSON.parse($scope.Certificate)
            //} catch (err) { }
            $scope.CertificateName = data.Name;
            $scope.Certificate = data.Id;
            $scope.Price = data.Price;
            $scope.cleardata();
        }

        $scope.closeModal = function () {
            $scope.noteChallan = false;
            $scope.modalInstance.close();
        }

        $scope.Proceed = function () {

            if ($scope.Certificate == 3 || $scope.Certificate == 7 || $scope.Certificate == 6 || $scope.Certificate == 5 || $scope.Certificate == 4 || $scope.Certificate == 9 || $scope.Certificate == 10) {


                if (!$scope.phonenoupdated) {
                    alert('Please Verify the Mobile number, before you proceed.');
                    return;
                }

                if ($scope.Certificate== 7) {
                    if ($scope.Gender == undefined || $scope.Gender == null || $scope.Gender == '') {
                        alert('Please Choose Gender.');
                        return;
                    }
                    if ($scope.NewName == undefined || $scope.NewName == '' || $scope.NewName == null) {
                        alert('Please Enter correction in name.');
                        return;
                    }
                    if ($scope.NewFatherName == undefined || $scope.NewFatherName == '' || $scope.NewFatherName == null) {
                        alert('Please Enter correction in Father name.');
                        return;
                    }
                    if ($scope.userPhoto == undefined || $scope.userPhoto == '' || $scope.userPhoto == null) {
                        alert('Please upload SSC marks memo.');
                        return;
                    }
                    $scope.loader = true;
                    var SetInterimData = PreExaminationService.SetNameCorrectionData($scope.userData.Pin, $scope.userData.Name, $scope.NewName, $scope.userData.FatherName,
                        $scope.NewFatherName, $scope.Gender, $scope.userPhoto)
                    SetInterimData.then(function (res) {
                        if (res.Table[0].ResponceCode == '200') {
                            $scope.loader = false;
                            $scope.GetChallanData();
                        } else {
                            $scope.loader = false;
                            alert(res.Table[0].ResponseDesription);
                            return;
                        }


                    }, function (error) {
                        $scope.loader = false;
                    })
                } else if ($scope.Certificate== 6) {
                    if ($scope.IdMark1 == undefined || $scope.IdMark1 == null || $scope.IdMark1 == '') {
                        alert('Please Enter Identifiation Mark 1.');
                        return;
                    }
                    if ($scope.IdMark2 == undefined || $scope.IdMark2 == '' || $scope.IdMark2 == null) {
                        alert('Please Enter Identifiation Mark 2.');
                        return;
                    }

                    $scope.loader = true;
                    //if ($scope.userData.Pin != null && $scope.Reason != null && $scope.IdMark1 != null && $scope.IdMark2 != null && $scope.userData.FatherName != null && $scope.userData.Mothername != null &&
                    //    $scope.Religion != null && $scope.userData.Nationality != null && $scope.Caste != null && $scope.userData.Dateofbirth != null) {
                    var SetInterimData = PreExaminationService.UpdateTcData($scope.userData.Pin, $scope.userData.Remarks, $scope.IdMark1, $scope.IdMark2)
                    SetInterimData.then(function (res) {
                        if (res.Table[0].ResponseCode == '200') {
                            //$scope.GetChallanData();
                            //$scope.loader = false;
                            $scope.tcapplicatioNo = res.Table1[0].ApplicationNum;
                            $scope.showTcReceipt();
                            alert(res.Table[0].ResponseDesription + ', Please Note the Application Number for further Reference : ' + $scope.tcapplicatioNo)


                        } else if (res.Table[0].ResponseCode == '400') {
                            $scope.loader = false;
                            alert(res.Table[0].ResponseDesription + ', Please Note the Application Number for further Reference : ' + $scope.tcapplicatioNo)

                        } else {
                               $scope.loader = false;
                            //alert(res.Table[0].ResponseDesription);
                        }


                    }, function (error) {
                          $scope.loader = false;
                        $scope.result = false;
                    })
                    //} else {
                    //    alert("Please fill all fields")
                    //}

                } else if ($scope.Certificate== 10) {
                    if ($scope.ReasonForBonafied == undefined || $scope.ReasonForBonafied == null || $scope.ReasonForBonafied == '') {
                        alert('Please Enter the purpose, for Bonafied/Study certificate.');
                        return;
                    }
                    //if ($scope.BonafideType == undefined || $scope.BonafideType == null || $scope.BonafideType == '') {
                    //    alert('Please Select Certificate.');
                    //    return;
                    //}
                  
                    if ($scope.OldSudent) {
                        if ($scope.Gender == undefined || $scope.Gender == '' || $scope.Gender == null) {
                            alert('Please select Gender.');
                            return;
                        }
                        if ($scope.Name == undefined || $scope.Name == '' || $scope.Name == null) {
                            alert('Please Enter Name.');
                            return;
                        }
                        if ($scope.FatherName == undefined || $scope.FatherName == '' || $scope.FatherName == null) {
                            alert('Please Enter Father name.');
                            return;
                        }
                        if ($scope.Branch == undefined || $scope.Branch == '' || $scope.Branch == null) {
                            alert('Please select Branch.');
                            return;
                        }
                        if ($scope.CollegeCode == undefined || $scope.CollegeCode == '' || $scope.CollegeCode == null) {
                            alert('Please select college.');
                            return;
                        }
                        if ($scope.Scheme == undefined || $scope.Scheme == '' || $scope.Scheme == null) {
                            alert('Please select Scheme.');
                            return;
                        }
                    }

                    var SetBonafiedData = PreExaminationService.SetBonafiedData($scope.PinNumber, $scope.ReasonForBonafied, $scope.userData.Name, $scope.userData.FatherName, $scope.userData.BranchCode, $scope.userData.CollegeCode)
                    SetBonafiedData.then(function (res) {
                        if (res.Table[0].ResponseCode == '200') {

                            $scope.tcapplicatioNo = res.Table1[0].ApplicationNum;
                            $scope.showTcReceipt();
                            alert(res.Table[0].ResponseDesription + ', Please Note the Application Number for further Reference : ' + $scope.tcapplicatioNo)


                        } else if (res.Table[0].ResponseCode == '400') {
                            alert(res.Table[0].ResponseDesription + ', Please Note the Application Number for further Reference : ' + $scope.tcapplicatioNo);

                        } else {

                            $scope.result = false;

                            //  alert(res.Table[0].ResponseDesription);
                        }


                    }, function (error) {

                        $scope.result = false;
                    });

                } else if ($scope.Certificate== 9) {
                    if ($scope.ReasonForBonafied == undefined || $scope.ReasonForBonafied == null || $scope.ReasonForBonafied == '') {
                        alert('Please Enter the purpose, for Bonafied/Study certificate.');
                        return;
                    }
                    //if ($scope.BonafideType == undefined || $scope.BonafideType == null || $scope.BonafideType == '') {
                    //    alert('Please Select Certificate.');
                    //    return;
                    //}

                    if ($scope.OldSudent) {
                        if ($scope.Gender == undefined || $scope.Gender == '' || $scope.Gender == null) {
                            alert('Please select Gender.');
                            return;
                        }
                        if ($scope.Name == undefined || $scope.Name == '' || $scope.Name == null) {
                            alert('Please Enter Name.');
                            return;
                        }
                        if ($scope.FatherName == undefined || $scope.FatherName == '' || $scope.FatherName == null) {
                            alert('Please Enter Father name.');
                            return;
                        }
                        if ($scope.Branch == undefined || $scope.Branch == '' || $scope.Branch == null) {
                            alert('Please select Branch.');
                            return;
                        }
                        if ($scope.CollegeCode == undefined || $scope.CollegeCode == '' || $scope.CollegeCode == null) {
                            alert('Please select college.');
                            return;
                        }
                        if ($scope.Scheme == undefined || $scope.Scheme == '' || $scope.Scheme == null) {
                            alert('Please select Scheme.');
                            return;
                        }
                    }

                    var SetBonafiedData = PreExaminationService.SetStudyCertData($scope.PinNumber, $scope.ReasonForBonafied, $scope.userData.Name, $scope.userData.FatherName, $scope.userData.BranchCode, $scope.userData.CollegeCode, $scope.userData.Gender)
                    SetBonafiedData.then(function (res) {
                        if (res.Table[0].ResponseCode == '200') {

                            $scope.tcapplicatioNo = res.Table1[0].ApplicationNum;
                            $scope.showTcReceipt();
                            alert(res.Table[0].ResponseDesription + ', Please Note the Application Number for further Reference : ' + $scope.tcapplicatioNo)


                        } else if (res.Table[0].ResponseCode == '400') {
                            alert(res.Table[0].ResponseDesription + ', Please Note the Application Number for further Reference : ' + $scope.tcapplicatioNo);

                        } else {

                            $scope.result = false;

                            //  alert(res.Table[0].ResponseDesription);
                        }


                    }, function (error) {

                        $scope.result = false;
                    });

                }
                else if ($scope.Certificate== 4) {
                    //if ($scope.userData.Pin == undefined || $scope.userData.Pin == null || $scope.userData.Pin == '') {
                    //    alert('Please Enter Pin.');
                    //    return;
                    //}
                    if ($scope.Scheme == undefined || $scope.Scheme == '' || $scope.Scheme == null) {
                        alert('Please Choose Scheme.');
                        return;
                    }
                    if ($scope.Sem == undefined || $scope.Sem == '' || $scope.Sem == null) {
                        alert('Please Choose Semester.');
                        return;
                    }
                    if ($scope.ExamMonthYear == undefined || $scope.ExamMonthYear == '' || $scope.ExamMonthYear == null) {
                        alert('Please Choose Exam Month & Year.');
                        return;
                    }
                    if ($scope.array.length == 0) {
                        alert('Please select Scheme, Semester, ExamMonthYear and Click Add button.');
                        return;
                    }

                    if ($scope.OldSudent) {
                        if ($scope.Gender == undefined || $scope.Gender == '' || $scope.Gender == null) {
                            alert('Please select Gender.');
                            return;
                        }
                        if ($scope.Name == undefined || $scope.Name == '' || $scope.Name == null) {
                            alert('Please Enter Name.');
                            return;
                        }
                        if ($scope.FatherName == undefined || $scope.FatherName == '' || $scope.FatherName == null) {
                            alert('Please Enter Father name.');
                            return;
                        }
                        if ($scope.Branch == undefined || $scope.Branch == '' || $scope.Branch == null) {
                            alert('Please select Branch.');
                            return;
                        }
                        if ($scope.CollegeCode == undefined || $scope.CollegeCode == '' || $scope.CollegeCode == null) {
                            alert('Please select college.');
                            return;
                        }
                        if ($scope.Scheme == undefined || $scope.Scheme == '' || $scope.Scheme == null) {
                            alert('Please select Scheme.');
                            return;
                        }
                        if ($scope.array.length == 0) {
                            alert('Please select Scheme, Semester, ExamMonthYear and Click Add button.');
                            return;
                        }
                        $scope.ProceedDisable = true;
                        $scope.loader = true;
                        var SetMarksMemo = PreExaminationService.UpdateNoDataMarksMemo($scope.PinNumber, $scope.Name, $scope.FatherName, $scope.Branch, $scope.CollegeCode, $scope.Scheme, $scope.Gender, $scope.array)
                        SetMarksMemo.then(function (res) {
                            if (res[0].ResponceCode == '200') {
                                $scope.applicatioNo = res[0].ApplicationNumber;
                                $scope.GetChallanData();
                                //$scope.loader = false;
                                //alert(res.Table[0].ResponceDescription)
                            } else if (res[0].ResponceCode == '400') {
                                $scope.ProceedDisable = false;
                                $scope.loader = false;
                                alert(res[0].ResponceDescription);
                            } else {
                                $scope.ProceedDisable = true;
                                $scope.loader = true;
                            }


                        }, function (error) {
                            $scope.ProceedDisable = false;
                            $scope.loader = false;
                            $scope.result = false;
                        })
                    } else {
                        $scope.ProceedDisable = true;
                        $scope.loader = true;
                        var SetMarksMemo = PreExaminationService.UpdatePaymentMarksMemo($scope.userData.Pin, $scope.array)
                        SetMarksMemo.then(function (res) {
                            if (res[0].ResponceCode == '200') {

                                $scope.loader = false;

                                $scope.applicatioNo = res[0].ApplicationNumber;
                                $scope.GetChallanData();
                            } else if (res[0].ResponceCode == '400') {
                                $scope.ProceedDisable = false;
                                $scope.loader = false;
                                alert(res[0].ResponceDescription);
                            } else {
                                $scope.ProceedDisable = true;
                                $scope.loader = true;
                            }


                        }, function (error) {
                            $scope.ProceedDisable = false;
                            $scope.loader = false;
                            $scope.result = false;
                        })
                    }


                } else if ($scope.Certificate== 5) {

                    $scope.loader = true;
                    //if ($scope.userData.Pin == undefined || $scope.userData.Pin == null || $scope.userData.Pin == '') {

                    //    alert('Please Enter Pin.');

                    //    return;
                    //}
                    var EncriptedAadhar = $crypto.encrypt($crypto.encrypt($scope.AadharNo, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                    if ($scope.AadharNo == undefined || $scope.AadharNo == '' || $scope.AadharNo == null) {

                        alert('Please Enter Aadhaar Number.');
                        return;

                    }
                    if ($scope.OdcNo == undefined || $scope.OdcNo == '' || $scope.OdcNo == null) {

                        $scope.OdcNo == ' '
                    }

                    if ($scope.PrincipalCover == undefined || $scope.PrincipalCover == '' || $scope.PrincipalCover == null) {

                        alert('Please upload Principal Covering Letter.');
                        return;
                    }

                    if ($scope.Aadharxerox == undefined || $scope.Aadharxerox == '' || $scope.Aadharxerox == null) {

                        alert('Please upload Aadhaar Copy.');
                        return;
                    }

                    if ($scope.OdcReason == undefined || $scope.OdcReason == '' || $scope.OdcReason == null) {

                        alert('Please Select Reason for ODC.');
                        return;
                    }


                    if ($scope.AadharNo < 99999999999 || $scope.AadharNo > 999999999999) {

                        alert('Aadhaar Number must be 12 digits.');
                        return;
                    }
                    $scope.studentfilearr = $scope.studentfilearr.filter(function (item) {
                        if (item.file != "") {

                            return item;
                        }
                    });
                    //for (var p = 0; p < $scope.studentfilearr.length; p++) {
                    //    if ($scope.studentfilearr[p].filetype == "" || $scope.studentfilearr[p].filetype == null || $scope.studentfilearr[p].filetype == undefined) {
                    //        alert("please select certificate Type");
                    //        $("#studentFilename" + p).focus();
                    //        return;
                    //    }
                    //}
                    if ($scope.studentfilearr.length < 1) {

                        alert("Please upload the certificates .");
                        $scope.studentfilearr = [{
                            fileindex: 0,
                            file: "",
                            filetype: ""
                        },
                            {
                                fileindex: 1,
                                file: "",
                                filetype: ""
                            },
                            {
                                fileindex: 2,
                                file: "",
                                filetype: ""
                            }
                        ];
                        return;
                    }
                    //console.log($scope.studentfilearr)
                    //if ($scope.studentfilearr[0].file == '' || $scope.studentfilearr[0].file == null || $scope.studentfilearr[0].file == undefined) {
                    //    alert('Please upload  Certificates');
                    //    return;
                    //}
                    if ($scope.OdcReason == 'Missing ODC') {
                        if ($scope.userPhoto == undefined || $scope.userPhoto == '' || $scope.userPhoto == null) {

                            alert('Please upload Police FIR.');
                            return;
                        }
                        if ($scope.Affidiate == undefined || $scope.Affidiate == '' || $scope.Affidiate == null) {

                            alert('Please upload Affidavit from Magistrate.');
                            return;
                        }
                    }
                    if ($scope.OldSudent) {
                        if ($scope.Gender == undefined || $scope.Gender == '' || $scope.Gender == null) {
                            alert('Please select Gender.');
                            return;
                        }
                        if ($scope.Name == undefined || $scope.Name == '' || $scope.Name == null) {
                            alert('Please Enter Name.');
                            return;
                        }
                        if ($scope.FatherName == undefined || $scope.FatherName == '' || $scope.FatherName == null) {
                            alert('Please Enter Father name.');
                            return;
                        }
                        if ($scope.Branch == undefined || $scope.Branch == '' || $scope.Branch == null) {
                            alert('Please select Branch.');
                            return;
                        }
                        if ($scope.CollegeCode == undefined || $scope.CollegeCode == '' || $scope.CollegeCode == null) {
                            alert('Please select college.');
                            return;
                        }
                        if ($scope.Scheme == undefined || $scope.Scheme == '' || $scope.Scheme == null) {
                            alert('Please select Scheme.');
                            return;
                        }
                        $scope.ProceedDisable = true;
                        $scope.loader = true;
                        var EncriptedAadhar = $crypto.encrypt($crypto.encrypt($scope.AadharNo, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                        var SetOdcData = PreExaminationService.SetOldStudentsOdcDataPayment($scope.PinNumber, $scope.Name, $scope.FatherName, $scope.Branch, $scope.CollegeCode, $scope.Scheme, $scope.Gender, EncriptedAadhar, $scope.OdcNo, $scope.userPhoto1, $scope.PrincipalCover,
                            $scope.Affidiate, $scope.Aadharxerox, $scope.studentfilearr, $scope.OdcReason)
                        SetOdcData.then(function (res) {
                            console.log(res)
                            if (res.Table[0].ResponceCode == '200') {
                                $scope.GetChallanData();

                                //alert(res.Table[0].ResponseDesription)
                            } else {
                                $scope.ProceedDisable = false;
                                $scope.loader = false;
                                alert(res.Table[0].ResponceDescription);
                            }


                        }, function (error) {
                            $scope.ProceedDisable = false;
                            $scope.loader = false;
                            $scope.result = false;
                        })
                    } else {
                        $scope.ProceedDisable = true;
                        $scope.loader = true;
                        var EncriptedAadhar = $crypto.encrypt($crypto.encrypt($scope.AadharNo, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                        var SetOdcData = PreExaminationService.SetOdcDataPayment($scope.userData.Pin, EncriptedAadhar, $scope.OdcNo, $scope.userPhoto1, $scope.PrincipalCover,
                            $scope.Affidiate, $scope.Aadharxerox, $scope.studentfilearr, $scope.OdcReason)
                        SetOdcData.then(function (res) {
                            if (res.Table[0].ResponceCode == '200') {
                                $scope.GetChallanData();

                                //alert(res.Table[0].ResponseDesription)
                            } else {
                                $scope.ProceedDisable = false;
                                $scope.loader = false;
                                alert(res.Table[0].ResponceDesription);
                            }


                        }, function (error) {
                            $scope.ProceedDisable = false;
                            $scope.loader = false;
                            $scope.result = false;
                        })
                    }

                }
                if ($scope.Certificate== 8) {
                    var ExamMonthYear = $scope.ExamMonthYear
                    if ($scope.ExamMonthYear == 'Other') {
                        if ($scope.ExamMonth == null || $scope.ExamMonth == '' || $scope.ExamMonth == undefined) {
                            alert("Please Enter Exam Month Year")
                            return

                            var ExamMonthYear = $scope.ExamMonth
                        }
                    }
                    //if ($scope.Name == undefined || $scope.Name == null || $scope.Name == '') {
                    //    alert('Please Enter Name.');
                    //    return;
                    //}
                    //if ($scope.FatherName == undefined || $scope.FatherName == null || $scope.FatherName == '') {
                    //    alert('Please Enter Father Name.');
                    //    return;
                    //}
                    if ($scope.OrganizationType == undefined || $scope.OrganizationType == '' || $scope.OrganizationType == null) {
                        alert('Please choose Organization Type.');
                        return;
                    }
                    if ($scope.OrganizationName == undefined || $scope.OrganizationName == '' || $scope.OrganizationName == null) {
                        alert('Please choose Organization Name.');
                        return;
                    }
                    if ($scope.OrganizationName == undefined || $scope.OrganizationName == '' || $scope.OrganizationName == null) {
                        alert('Please choose Organization Name.');
                        return;
                    }

                    if ($scope.OrganizationAddress == undefined || $scope.OrganizationAddress == '' || $scope.OrganizationAddress == null) {
                        alert('Please choose Organization Address.');
                        return;
                    }
                    if ($scope.OrganizationEmail == undefined || $scope.OrganizationEmail == '' || $scope.OrganizationEmail == null) {
                        alert('Please choose Organization Email.');
                        return;
                    }
                    if ($scope.OrganizationMobile == undefined || $scope.OrganizationMobile == '' || $scope.OrganizationMobile == null) {
                        alert('Please choose Organization Mobile.');
                        return;
                    }
                    if ($scope.Aadharxerox == undefined || $scope.Aadharxerox == '' || $scope.Aadharxerox == null) {
                        alert('Please choose Aadhar Xerox.');
                        return;
                    }
                    if (ExamMonthYear == undefined || ExamMonthYear == '' || ExamMonthYear == null) {
                        alert('Please choose ExamMonthYear.');
                        return;
                    }

                    if ($scope.OrganizationType == 'Government') {
                        $scope.Price = 0
                        $scope.Submit();
                    } else {

                        $scope.loader = true;
                        var SetGenuineness = PreExaminationService.SetGenuinenessCheckPayment($scope.userData.Pin, $scope.OrganizationType, $scope.OrganizationName, $scope.OrganizationAddress, $scope.OrganizationEmail, $scope.OrganizationMobile, $scope.OdcNo, $scope.Aadharxerox,
                       ExamMonthYear, $scope.Price)
                        SetGenuineness.then(function (res) {
                            try {
                                var res = JSON.parse(res);
                            } catch (err) {
                            }
                            if (res.Table[0].ResponseCode == '200') {
                                //alert(res.Table[0].ResponseDesription);
                                $scope.GetChallanData();
                                $scope.loader = false;
                                $scope.applicatioNo = res.Table1[0].ApplicationNumber;
                            } else {
                               $scope.loader = false;
                                alert(res.Table[0].ResponseDescription);
                            }
                        }, function (error) {
                            $scope.loader = false;
                            $scope.result = false;
                        });


                    }

                } else if ($scope.Certificate== 3) {


                    if ($scope.UniversityCount == undefined || $scope.UniversityCount == null || $scope.UniversityCount == '') {
                        alert('Please select no of universities applied.');
                        return;
                    }
                    //if ($scope.upldWesfile == undefined || $scope.upldWesfile == '' || $scope.upldWesfile == null) {
                    //    alert('Please choose WES certificate.');
                    //    return;
                    //}
                    //if ($scope.WesRefNo == undefined || $scope.WesRefNo == '' || $scope.WesRefNo == null) {
                    //    alert('Please Enter WES reference number.');
                    //    return;
                    //}
                    if ($scope.Email == undefined || $scope.Email == '' || $scope.Email == null) {
                        alert('Please Enter Email Id.');
                        return;
                    }


                    var UniversityEmail = "";
                    for (var k = 1; k <= parseInt($scope.UniversityCount) ; k++) {
                        var tmpval = "UEmail" + k;
                        if ($scope[tmpval] != null && $scope[tmpval] != '' && $scope[tmpval] != undefined) {

                            UniversityEmail += $scope[tmpval] + ',';
                        } else {
                            alert("please fill University Email" + k);
                            return;
                        }
                    }


                    $scope.studentfilearr = $scope.studentfilearr.filter(function (item) {
                        if (item.file != "") {
                            return item;
                        }
                    });
                    for (var p = 0; p < $scope.studentfilearr.length; p++) {
                        if ($scope.studentfilearr[p].filetype == "" || $scope.studentfilearr[p].filetype == null || $scope.studentfilearr[p].filetype == undefined) {
                            alert("please select certificate Type");
                            $("#studentFilename" + p).focus();
                            return;
                        }
                    }
                    if ($scope.studentfilearr.length < 1) {
                        alert("Please upload the certificates for transcripts.");
                        $scope.studentfilearr = [{
                            fileindex: 0,
                            file: "",
                            filetype: ""
                        },
                            {
                                fileindex: 1,
                                file: "",
                                filetype: ""
                            },
                            {
                                fileindex: 2,
                                file: "",
                                filetype: ""
                            }
                        ];
                        return;
                    }
                    $scope.loader = true;
                    var Wesfile = angular.isUndefined($scope.upldWesfile) ? "" : $scope.upldWesfile;
                    if ($scope.OldSudent) {
                        if ($scope.Gender == undefined || $scope.Gender == '' || $scope.Gender == null) {
                            alert('Please select Gender.');
                            return;
                        }
                        if ($scope.Name == undefined || $scope.Name == '' || $scope.Name == null) {
                            alert('Please Enter Name.');
                            return;
                        }
                        if ($scope.FatherName == undefined || $scope.FatherName == '' || $scope.FatherName == null) {
                            alert('Please Enter Father name.');
                            return;
                        }
                        if ($scope.Branch == undefined || $scope.Branch == '' || $scope.Branch == null) {
                            alert('Please select Branch.');
                            return;
                        }
                        if ($scope.CollegeCode == undefined || $scope.CollegeCode == '' || $scope.CollegeCode == null) {
                            alert('Please select college.');
                            return;
                        }
                        if ($scope.Scheme == undefined || $scope.Scheme == '' || $scope.Scheme == null) {
                            alert('Please select Scheme.');
                            return;
                        }

                        var SetTranscriptData = PreExaminationService.SetNoDataTranscriptData($scope.PinNumber, $scope.Name, $scope.FatherName, $scope.Branch, $scope.CollegeCode, $scope.Scheme, $scope.Gender, $scope.UniversityCount, UniversityEmail, Wesfile, $scope.WesRefNo, $scope.Email, $scope.studentfilearr, $scope.Certificate)
                        SetTranscriptData.then(function (res) {
                            try {
                                var res = JSON.parse(res);
                            } catch (err) {
                            }
                            if (res.Table[0].ResponceCode == '200') {
                                $scope.applicatioNo = res.Table1[0].ApplicationNumber;
                                alert(res.Table[0].ResponceDescription);
                                $scope.GetChallanData();
                                //$scope.loader = false;
                                
                            } else {
                                //$scope.loader = false;
                                alert(res.Table[0].ResponceDescription);
                            }
                        }, function (error) {
                            //$scope.loader = false;
                            $scope.result = false;
                            alert("Pdf documents uploaded are corrupted,try scan documents again correctly.");
                        });
                    } else {

                        var SetTranscriptData = PreExaminationService.SetTranscriptData($scope.userData.Pin, $scope.UniversityCount, UniversityEmail, Wesfile, $scope.WesRefNo, $scope.Email, $scope.studentfilearr, $scope.Certificate)
                        SetTranscriptData.then(function (res) {
                            try {
                                var res = JSON.parse(res);
                            } catch (err) {
                            }
                            if (res.Table[0].ResponceCode == '200') {
                                $scope.applicatioNo = res.Table1[0].ApplicationNumber;
                                alert(res.Table[0].ResponceDescription);
                                $scope.GetChallanData();
                                $scope.loader = false;
                                
                            } else {
                                $scope.loader = false;
                                alert(res.Table[0].ResponceDescription);
                            }
                        }, function (error) {
                            $scope.loader = false;
                            $scope.result = false;
                            alert("Pdf documents uploaded are corrupted,try scan documents again correctly.");
                        });
                    }
                } else {
                    //$scope.loader = false;
                    // $scope.GetChallanData();
                }
            } else if ($scope.Certificate== 1 || $scope.Certificate== 2) {

                if (!$scope.phonenoupdated) {
                    //$scope.loader = false;
                    alert('Please Verify the Mobile number, before you proceed.');
                    return;
                }
                //$scope.loader = false;
                $scope.GetChallanData();
            }

        }

        $scope.calculateTranscriptamount = function () {
            var studentupldfilearr = $scope.studentfilearr.filter(function (item) {
                if (item.file != "") {
                    return item;
                }
            });
            var studeupldamount;
            if (studentupldfilearr.length == 0) {
                studeupldamount = 1
            } else {
                studeupldamount = studentupldfilearr.length;
            }
            var universityamt = $scope.UniversityCount == "" || parseInt($scope.UniversityCount) == undefined || $scope.UniversityCount == undefined ? 1 : parseInt($scope.UniversityCount)

            $scope.TranscriptPrice = (200 * universityamt * studeupldamount);
            $scope.$apply();
        }

        $scope.validateEmail = function (emailField) {

            //var x = document.getElementById("myEmail").pattern;
            //document.getElementById("demo").innerHTML = x;
            var email = document.getElementById('myEmail');
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (!filter.test(email.value)) {
                alert('Please provide a valid email address');
                email.focus;
                return false;
            }

        }

        $scope.GetChallanData = function () {
            if ($scope.OldSudent) {
                var Pin = $scope.PinNumber
            } else {
                var Pin = $scope.userData.Pin
            }

            var SetData = PreExaminationService.GetChallanData(Pin, $scope.Certificate, $scope.applicatioNo)
            SetData.then(function (response) {
                if (response[0].ResponseCode == '400') {
                    $scope.ProceedDisable = false;
                    $scope.loader = false;
                    alert(response[0].ResponceDescription)
                } else {
                    try {
                        var response = JSON.parse(response);
                    } catch (err) {
                        $scope.ProceedDisable = false;
                        $scope.loader = false;
                    }
                    $scope.challan = response.Table1[0].ChallanNumber
                    $scope.paymentPin = response.Table1[0].Pin
                    if ($scope.Certificate== 4) {
                        $scope.Amount = $scope.Price;
                    } else {
                        $scope.Amount = response.Table1[0].Amount;
                    }
                    $scope.billdeskamount = response.Table1[0].Amount;
                    $scope.data = true;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/CertificateFeePaymentPopup.html",
                        size: 'xlg',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                        //backdrop: 'static',
                    });
                    $scope.ProceedDisable = false;
                    $scope.loader = false;
                }

            }, function (error) {
                $scope.ProceedDisable = false;
                $scope.loader = false;
                $scope.result = false;
            })
        }

        $scope.GetChallanNumberData = function () {
            if ($scope.OldSudent) {
                var Pin = $scope.PinNumber
            } else {
                var Pin = $scope.userData.Pin
            }

            var SetData = PreExaminationService.GetChallanNumberData(Pin, $scope.Certificate, $scope.applicatioNo)
            SetData.then(function (response) {
                if (response[0].ResponseCode == '400') {
                    $scope.ProceedDisable = false;
                    $scope.loader = false;
                    alert(response[0].ResponceDescription)
                } else {
                    try {
                        var response = JSON.parse(response);
                    } catch (err) {
                        $scope.ProceedDisable = false;
                        $scope.loader = false;
                    }
                    $scope.challan = response.Table1[0].ChallanNumber
                    $scope.paymentPin = response.Table1[0].Pin
                    if ($scope.Certificate== 4) {
                        $scope.Amount = $scope.Price;
                    } else {
                        $scope.Amount = response.Table1[0].Amount;
                    }
                    $scope.billdeskamount = response.Table1[0].Amount;
                    $scope.data = true;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/CertificateFeePaymentPopup.html",
                        size: 'xlg',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                        //backdrop: 'static',
                    });
                    $scope.ProceedDisable = false;
                    $scope.loader = false;
                }

            }, function (error) {
                $scope.ProceedDisable = false;
                $scope.loader = false;
                $scope.result = false;
            })
        }


        $scope.payfee = function (Pin, challan) {
            if (angular.isUndefined(Pin) || angular.isUndefined(challan)) {
                alert('please try after sometime');
                return;
            }

            $scope.noteChallan = false;
            $scope.secondClick = false;
            var marchantid = "TSSBTET"; // test
            var addInfo1 = Pin;
            var addInfo3 = $scope.CertificateName == null || angular.isUndefined($scope.CertificateName) ? "Certificate" : $scope.CertificateName;
            var addInfo4 = "NA";
            var addInfo5 = $scope.Certificate; //$scope.loadedScheme.Scheme;
            var addInfo6 = "NA" //PaymentType;
            var addInfo7 = $scope.applicatioNo == undefined ? "NA" : $scope.applicatioNo;
            var amount = $scope.billdeskamount;

            var subMarchantid = "STUSERVICES";
            $localStorage.CertificateFeePaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "index.StudentRequestForm"
            }
            $localStorage.CertificateFeePaymentGatewayResponse = redirecturl;

            var location = window.location.origin;


            var proceedfinePayment = PaymentService.getHashValue(location + "/Payment/BulkBillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, challan, amount);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // live url

                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                console.log(err);
            });


        }


        $scope.studentfilearr = [];

        $scope.studentfilearr = [{
            fileindex: 0,
            file: "",
        },
            {
                fileindex: 1,
                file: ""
            },
            {
                fileindex: 2,
                file: ""
            }
        ];

        if ($scope.studentfilearr.length == 1) {
            $scope.DeleteDisable = true;
        } else {
            $scope.DeleteDisable = false;
        }
        $scope.addUser = function () {


            if ($scope.studentfilearr.length == 0) {
                $scope.DeleteDisable = true;
            } else {
                $scope.DeleteDisable = false;
            }

            if ($scope.studentfilearr.length < 12) {
                if ($scope.Certificate== 3) {
                    $scope.studentfilearr.push({
                        fileindex: $scope.studentfilearr.length,
                        file: "",
                        filetype: ""
                    });
                } else {
                    $scope.studentfilearr.push({
                        fileindex: $scope.studentfilearr.length,
                        file: ""
                    });
                }


                $scope.studentfilearr = $scope.studentfilearr.map(function (arr, ind) {
                    arr.fileindex = ind;
                    return arr;
                });

            } else {
                alert('maximum files limit reached');
            }
        }

        $scope.removeUser = function (val) {
            var item = document.getElementById('studentFile' + val);
            item.parentNode.removeChild(item);
            $scope.studentfilearr.splice(val, 1);
            $scope.calculateTranscriptamount();
        }

        $scope.uploadfiletype = function (ele, ind) {
            $scope.studentfilearr.map((obj) => {
                if (obj.fileindex == ind) {
                    obj.filetype = ele.value;
                }
            });

        }


        $scope.uploadfiles = function (ele, val) {
            var input = document.getElementById("studentFile" + val);
            var img = document.createElement("img");

            var fileSize = input.files[0].size;
            if (fileSize <= 3000000 && fileSize >= 1000000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    var base64file;
                    reader.onload = function (ele) {
                        $('#studentFile' + val).attr('src', ele.target.result);
                        base64file = ele.target.result;
                        //  if ($scope.studentfilearr.length > 0) {
                        $scope.studentfilearr.map((obj) => {
                            if (obj.fileindex == val) {
                                obj.file = base64file.replace(/^data:application\/pdf+;base64,/, "");
                            }
                        });
                        $scope.calculateTranscriptamount();
                    }


                    // }
                    reader.onerror = function (ele) {
                        console.error("File could not be read! Code " + ele.target.error.code);
                    };

                }

            } else if (fileSize <= 1000000) {
                alert("file size should not be less than 1MB");
                $('#studentFile' + val).val('');
                $scope.calculateTranscriptamount();
                return;
            } else if (fileSize >= 3000000) {
                alert("file size should not be greater than 3MB");
                $('#studentFile' + val).val('');
                $scope.calculateTranscriptamount();
                return;
            } else {
                alert("file size should be between 1MB and 3MB");
                $('#studentFile' + val).val('');
                $scope.calculateTranscriptamount();
                return;
            }
        }

        $scope.SendOtp = function () {
            if ($scope.StudentPhoneNumber != null && $scope.StudentPhoneNumber != undefined && $scope.StudentPhoneNumber.length == '10') {
                if ($scope.OldSudent) {
                    var Pin = $scope.PinNumber;
                } else {
                    var Pin = $scope.userData.Pin;
                }
                $scope.Otp = true;
                $scope.NoOtp = false;
                var GenerateOtpForMobile = PreExaminationService.GenerateOtpForMobileNoUpdate(Pin, $scope.StudentPhoneNumber)
                GenerateOtpForMobile.then(function (response) {
                    try {
                        var detail = JSON.parse(response);
                    } catch (err) { }
                    if (detail.status == '200') {
                        alert(detail.description);
                        $scope.Otp = true;
                        $scope.NoOtp = false;
                    } else {
                        alert(detail.description);
                        $scope.Otp = false;
                        $scope.NoOtp = true;
                    }
                }, function (error) {
                    alert('error occured while sending OTP');
                    $scope.Otp = false;
                    $scope.NoOtp = true;
                })

            } else if ($scope.StudentPhoneNumber == null || $scope.StudentPhoneNumber == undefined) {
                alert("Please Enter Mobile Number");
            } else if ($scope.StudentPhoneNumber.length != '10') {
                alert('Enter valid Mobile number');
            } else {
                alert("Please Enter Mobile Number");
            }


        }
        $scope.counter = 0;
        $scope.ReSendOtp = function () {
            $scope.counter++;
            if ($scope.counter > 2) {
                $scope.limitexceeded = true;
                return;
            } else {
                if ($scope.OldSudent) {
                    var Pin = $scope.PinNumber;
                } else {
                    var Pin = $scope.userData.Pin;
                }
                var GenerateOtpForMobileNoUpdate = PreExaminationService.GenerateOtpForMobileNoUpdate(Pin, $scope.StudentPhoneNumber)
                GenerateOtpForMobileNoUpdate.then(function (response) {
                    try {
                        var detail = JSON.parse(response);
                    } catch (err) { }
                    if (detail.status == '200') {
                        alert(detail.description);
                        $scope.Otp = true;
                        $scope.NoOtp = false;
                    } else {
                        alert(detail.description);
                        $scope.Otp = false;
                        $scope.NoOtp = true;
                    }
                }, function (error) {
                    alert('error occured while Resending OTP');
                    $scope.Otp = false;
                    $scope.NoOtp = true;
                });


            }
        }

        $scope.updatephonenumber = function () {
            if ($scope.OTPdata == null || $scope.OTPdata == "" || $scope.OTPdata == undefined) {
                alert('Please Enter OTP.');
                return;
            }
            if ($scope.OTPdata.length != '6') {
                alert('Please Enter valid OTP.');
                return;
            }
            if ($scope.OldSudent) {
                var Pin = $scope.PinNumber;
            } else {
                var Pin = $scope.userData.Pin;
            }
            var UpdateUserdata = PreExaminationService.UpdateUserdata(Pin, $scope.StudentPhoneNumber, $scope.OTPdata)
            UpdateUserdata.then(function (response) {

                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res.Table[0].StatusCode == '200') {
                    alert(res.Table[0].StatusDescription);
                    $scope.phonenoupdated = true;
                    $scope.Verified = true;
                } else {
                    alert(res.Table[0].StatusDescription);
                    $scope.phonenoupdated = false;
                    $scope.Verified = false;
                }
            }, function (error) {
                alert('error occured while updating Mobile number.');
                $scope.phonenoupdated = false;
                $scope.Verified = false;
            });


        }

    })
})