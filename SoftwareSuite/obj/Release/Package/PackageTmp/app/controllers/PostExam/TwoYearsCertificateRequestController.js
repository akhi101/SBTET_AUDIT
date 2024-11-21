define(['app'], function (app) {
    app.controller("TwoYearsCertificateRequestController", function ($scope, $http, $localStorage, $window, $state, $stateParams, AppSettings, $uibModal, $timeout, PaymentService, PreExaminationService,SystemUserService,$crypto) {
        $scope.DeleteDisable = true;

        const $ctrl = this;

        $ctrl.$onInit = () => {

            $scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')

            var eKey = SystemUserService.GetEKey();
            eKey.then(function (res) {
                $scope.EKey = res;
                $scope.EncriptedSession = $crypto.encrypt($crypto.encrypt($scope.SessionCaptcha, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                $scope.GetCaptchaData();

                $scope.FourthCard = true;
                $scope.firstCard = false;
                $scope.SecondCard = false;
                $scope.ThirdCard = false;

                $scope.secondClick = false;
                $scope.noteChallan = false;
                $scope.noteApply = false;
                $scope.DetailsFound = false;
                $scope.NoDataFound = false;
                $scope.data = false;

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


        $scope.ValidateCaptchaText = function () {


            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.loginbutton = false;
                return;
            };

            var captcha = PreExaminationService.ValidateCaptchaText($scope.SessionCaptcha, $scope.CaptchaText, $scope.PinNumber);
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
                    $scope.SubmitPin()
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

            //     var attr = document.createElement("a");
            //     attr.id = "attr";
            //    attr.title ="Please click here to reload captcha";

            //    var iattr = document.createElement("i");
            //    iattr.id = "iattr";
            //   iattr.className ="fa fa-refresh"; 
            //   var att = document.createAttribute("aria-hidden");       // Create a "class" attribute
            //     att.value = "true"; 
            //     iattr.setAttributeNode(att);
            //   document.getElementById("attr").appendChild(iattr);

            $scope.newCapchaCode = captcha.join("");
            //document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
            // document.getElementById("captcha").appendChild(attr); // adds the canvas to the body element
        }




        $window.validateRecaptcha = $scope.validateRecaptcha;


        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.SubmitPin();
            }
        }



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


        $scope.next = function () {
            $scope.firstCard = false;
            $scope.SecondCard = true;
            $scope.ThirdCard = false;
        }

        $scope.Preview = function () {
            try {
                $scope.Collegepreviewdata = JSON.parse($scope.Collegedata);
            } catch (err) { }

            $scope.array = [];
            if ($scope.NoOfBacklogs == '1') {
                var obj = {};
                obj.SubjectCode = $scope.SubCode;
                obj.SubjectName = $scope.Subject
                $scope.array.push(obj);

            } else if ($scope.NoOfBacklogs == '2') {
                var obj = {};
                obj.SubjectCode = $scope.SubCode;
                obj.SubjectName = $scope.Subject
                $scope.array.push(obj);
                var obj = {};
                obj.SubjectCode = $scope.SubCode1;
                obj.SubjectName = $scope.Subject1
                $scope.array.push(obj);
            } else if ($scope.NoOfBacklogs == '3') {
                var obj = {};
                obj.SubjectCode = $scope.SubCode;
                obj.SubjectName = $scope.Subject
                $scope.array.push(obj);
                var obj = {};
                obj.SubjectCode = $scope.SubCode1;
                obj.SubjectName = $scope.Subject1
                $scope.array.push(obj);
                var obj = {};
                obj.SubjectCode = $scope.SubCode2;
                obj.SubjectName = $scope.Subject2
                $scope.array.push(obj);
            }


            $scope.firstCard = false;
            $scope.SecondCard = false;
            $scope.ThirdCard = true;
        }
        $scope.Back = function () {
            $scope.PinData()
        }

        $scope.Back1 = function () {
            $scope.firstCard = true;
            $scope.SecondCard = false;
            $scope.ThirdCard = false;
        }
        $scope.Back2 = function () {
            $scope.firstCard = false;
            $scope.SecondCard = false;
            $scope.ThirdCard = true;
        }
        $scope.studentfilearr = [];
        $scope.studentfilearr = [
            {
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
                $scope.studentfilearr.push(
                    {
                        fileindex: $scope.studentfilearr.length,
                        file: "",
                    }
                );
                $scope.studentfilearr = $scope.studentfilearr.map(function (arr, ind) {
                    arr.fileindex = ind;
                    return arr;
                });

            } else {
                alert('maximum files limit reached');
            }
            console.log($scope.studentfilearr);
        }

        $scope.removeUser = function (val) {
            var item = document.getElementById('userfile' + val);
            item.parentNode.removeChild(item);
            $scope.studentfilearr.splice(val, 1);
            console.log($scope.studentfilearr);
        }

        $scope.ChangeData = function (myfile) {
            console.log("Hii");
            console.log(myfile)
        }
        $scope.notedChallan = function () {
            if ($scope.noteChallan == true) {
                $scope.noteChallan = false;
            } else {
                $scope.noteChallan = true;
            }
        }

        $scope.notedApply = function () {
            if ($scope.noteApply == true) {
                $scope.noteApply = false;
            } else {
                $scope.noteApply = true;
            }
        }

        $scope.PinData = function () {
            $scope.firstCard = false;
            $scope.SecondCard = false;
            $scope.ThirdCard = false;
            $scope.FourthCard = true;
        }

        $scope.PinNoData = function () {
            $scope.firstCard = true;
            $scope.SecondCard = false;
            $scope.ThirdCard = false;
            $scope.FourthCard = false;
            $scope.NoData = false;
        }


        $scope.closeModal = function () {
            $scope.noteChallan = false;
            $scope.modalInstance.close();
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
            var addInfo3 = "TWO YEARS Certificate";
            var addInfo4 = "NA"//$scope.loadedScheme.Scheme;
            var addInfo5 = "NA";//Semester;
            var addInfo6 = "NA"//PaymentType;
            var addInfo7 = "NA";
            var amount = $scope.billdeskamount;

            var subMarchantid = "STUSERVICES";
            $localStorage.CertificateFeePaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "Dashboard.DiplomaDashboard.StudentOnlineRequest"
            }
            $localStorage.CertificateFeePaymentGatewayResponse = redirecturl;

            var location = window.location.origin;

            PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount, "studentType", "json");

            var proceedfinePayment = PaymentService.getHashValue(location + "/Payment/BulkBillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, challan, amount);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url

                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                console.log(err);
            });


        }

        $scope.Apply = function () {
            if ($scope.PageType == '4') {
                alert("Not eligible to write backlog exam or to apply for diploma pass certificate.");
                return;
                //} else if ($scope.PageType == '3' || ($scope.PageType == '1' && $scope.CertificateType == 'Backlog')) {
                //    window.location.replace("https://exams.sbtet.telangana.gov.in/index.html#/Dashboard/Diploma/DiplomaFeePayment");
            }
            //else if (($scope.PageType == '1' && ($scope.CertificateType == 'Certificate' || $scope.StudentData.NumberOfBacklogs == '0')) || $scope.PageType == '2') {
            if ($scope.LMobileNumber == '' || $scope.LMobileNumber == null) {
                alert('Please Enter the Latest Mobile Number');
                return;
            } else if ($scope.LMobileNumber.length < 10 || $scope.LMobileNumber.length > 10) {
                alert('Please Enter valid Mobile Number');
                return;
            } else {
                var UpdateMobile = PreExaminationService.UpdateMobileNumber($scope.PinNumber, $scope.LMobileNumber)
                UpdateMobile.then(function (resp) {
                    console.log(resp)
                }, function (err) {
                    console.log(err)
                    alert('Mobile Updation Failed');
                });
                var getChallannumber = PreExaminationService.CertificateFeePaymentChallanNumber($scope.PinNumber, 2)
                getChallannumber.then(function (resp) {
                    if (resp.Table.length > 0) {
                        $scope.challan = resp.Table1[0].ChallanNumber;
                        $scope.paymentPin = $scope.PinNumber;
                        $scope.Amount = resp.Table1[0].Amount;
                        $scope.mobile = resp.Table1[0].mobile;
                        $scope.billdeskamount = resp.Table1[0].Amount;
                        $scope.data = true;
                        if (resp.Table1.length > 0) {
                            $scope.modalInstance = $uibModal.open({
                                templateUrl: "/app/views/CertificateFeePaymentPopup.html",
                                size: 'xlg',
                                scope: $scope,
                                windowClass: 'modal-fit-att',
                                //backdrop: 'static',
                            });
                        }

                    }
                }, function (err) {
                    $scope.data = false;
                });
            }

            //}
        }


        $scope.uploadUserPhoto = function () {
            var input = document.getElementById("stdPhotoFile");
            var fileSize = input.files[0].size;
            console.log(fileSize);
            if (fileSize <= 500000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdPhotoImg').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.userPhoto = base64Image;
                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 500kb ");
                return;
            }
        }

        $scope.BacklogCount = function () {
            if ($scope.NoOfBacklogs == '1') {
                $scope.count1 = true;
                $scope.count2 = false;
                $scope.count3 = false;
            } else if ($scope.NoOfBacklogs == '2') {
                $scope.count1 = false;
                $scope.count2 = true;
                $scope.count3 = false;
            } else if ($scope.NoOfBacklogs == '3') {
                $scope.count1 = false;
                $scope.count2 = false;
                $scope.count3 = true;
            }
        }


        // $scope.CertFeeamount 

        $scope.AddData = function () {
            if ($scope.Email == '' || $scope.Email == null) {
                $scope.Email = 'Null'
            }
            $scope.studentfilearr = $scope.studentfilearr.filter(function (item) {
                if (item.file != "") {
                    return item;
                }
            });
            if ($scope.studentfilearr.length < 2 || $scope.studentfilearr.length > 13) {
                alert("Please upload the minimum number of certificates.");
                return;
            }

            if ($scope.studentfilearr == null || angular.isUndefined($scope.studentfilearr)) {
                alert("Files format not supported, Please upload in jpg format.");
                return;
            }


            var req = {
                "PIN": $scope.PinNo == null || angular.isUndefined($scope.PinNo) ? "" : angular.uppercase($scope.PinNo),
                "first_Name": $scope.FirstName == null || $scope.FirstName == undefined ? "" : angular.uppercase($scope.FirstName),
                "last_Name": $scope.LastName == null || angular.isUndefined($scope.LastName) ? "" : angular.uppercase($scope.LastName),
                "Father_Name": $scope.FatherName == null || angular.isUndefined($scope.FatherName) ? "" : angular.uppercase($scope.FatherName),
                "Gender": $scope.Gender == null || angular.isUndefined($scope.Gender) ? "" : $scope.Gender,
                "Mobile": $scope.MobileNumber == null || angular.isUndefined($scope.MobileNumber) ? "" : $scope.MobileNumber,
                "Email": $scope.Email == null || angular.isUndefined($scope.Email) ? "" : $scope.Email,
                "CollegeName": $scope.Collegepreviewdata.CollegeName == null || angular.isUndefined($scope.Collegepreviewdata.CollegeName) ? "" : $scope.Collegepreviewdata.CollegeName,
                "CourseName": $scope.CourseName == null || angular.isUndefined($scope.CourseName) ? "" : angular.uppercase($scope.CourseName),
                "CollegeCode": $scope.Collegepreviewdata.CollegeCode == null || angular.isUndefined($scope.Collegepreviewdata.CollegeCode) ? "" : $scope.Collegepreviewdata.CollegeCode,
                "Scheme": $scope.Scheme == null || angular.isUndefined($scope.Scheme) ? "" : $scope.Scheme,
                "Purpose": $scope.Purpose == null || angular.isUndefined($scope.Purpose) ? "" : $scope.Purpose,
                "AddressProof": $scope.AddressProofType == null || angular.isUndefined($scope.AddressProofType) ? "" : $scope.AddressProofType,
                "IdNumber": $scope.IdNumber == null || angular.isUndefined($scope.IdNumber) ? "" : $scope.IdNumber,
                "Village": $scope.Village == null || angular.isUndefined($scope.Village) ? "" : $scope.Village,
                "Town": $scope.Town == null || angular.isUndefined($scope.Town) ? "" : $scope.Town,
                "Mandal": $scope.Mandal == null || angular.isUndefined($scope.Mandal) ? "" : $scope.Mandal,
                "District": $scope.District == null || angular.isUndefined($scope.District) ? "" : $scope.District,
                "States": $scope.State == null || angular.isUndefined($scope.State) ? "" : $scope.State,
                "filedata": $scope.studentfilearr == null || angular.isUndefined($scope.studentfilearr) ? "" : $scope.studentfilearr,
                "Photo": $scope.userPhoto == null || angular.isUndefined($scope.userPhoto) ? "" : $scope.userPhoto,
                "backlogCount": $scope.NoOfBacklogs == null || angular.isUndefined($scope.NoOfBacklogs) ? -1 : parseInt($scope.NoOfBacklogs),
                "backlogsubjson": $scope.array == null || angular.isUndefined($scope.array) ? "" : JSON.stringify($scope.array)

            }

            var AddUserData = PreExaminationService.AddOldStudentData(req);
            AddUserData.then(function (response) {

                if (response.Table2[0].ResponceCode == '200') {
                    alert(response.Table2[0].ResponceDescription);

                    var getChallannumber = PreExaminationService.CertificateFeePaymentChallanNumber($scope.PinNo)
                    getChallannumber.then(function (resp) {
                        if (resp.Table.length > 0) {
                            $scope.challan = resp.Table1[0].ChallanNumber;
                            $scope.paymentPin = $scope.PinNo;
                            $scope.Amount = resp.Table1[0].Amount;
                            $scope.billdeskamount = resp.Table1[0].Amount;
                            $scope.DetailsFound = true;
                            $scope.data = true;
                            if (resp.Table1.length > 0) {
                                $scope.modalInstance = $uibModal.open({
                                    templateUrl: "/app/views/CertificateFeePaymentPopup.html",
                                    size: 'xlg',
                                    scope: $scope,
                                    windowClass: 'modal-fit-att',
                                    //backdrop: 'static',
                                });
                            }

                        }
                    }, function (err) {
                        $scope.data = false;
                        $scope.DetailsFound = false;
                    });


                } else {
                    $scope.loading = false;
                    alert("Request sent Failed")
                    $scope.reports = false;
                    $scope.Noreports = true;
                }

            },
                function (error) {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                    alert("error while loading data");
                });


        }


        var tempId = [];

        $scope.uploadfiles = function (ele, val) {
            var input = document.getElementById("studentFile" + val);
            var fileSize = input.files[0].size;
            if (fileSize <= 1000000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (ele) {
                        $('#studentFile' + val).attr('src', ele.target.result);
                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");
                        imageElement.setAttribute = $('<img>', { src: ele.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");

                            if ($scope.studentfilearr.length > 0) {
                                $scope.studentfilearr.map((obj) => {
                                    if (obj.fileindex == val) {
                                        obj.file = base64Image;
                                    }
                                });
                            }

                        });


                    }
                    reader.onerror = function (ele) {
                        console.error("File could not be read! Code " + ele.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 1000kb ");
                return;
            }
        }


        $scope.addfilData = function (fileindex, file) {
            return {
                fileindex: fileindex,
                file: file,
            };
        }

        $scope.buttoncontrol = function () {
            if ($scope.PageType == 3 || ($scope.PageType == 1 && $scope.CertificateType == 'Backlog')) {
                $scope.noteApply = true;
                $scope.ApplyDisable = false;
            } else if (($scope.PageType == 1 && ($scope.CertificateType == 'Certificate' || $scope.StudentData.NumberOfBacklogs == '0')) || $scope.PageType == 2) {
                $scope.noteApply = false;
                $scope.ApplyDisable = false;
            } else {
                $scope.noteApply = false;
                $scope.ApplyDisable = true;
            }

        }
        $scope.SubmitPin = function () {

            if ($scope.PinNumber == "" || $scope.PinNumber == undefined || $scope.PinNumber == null) {
                alert("Enter Pin");
                return;
            }

            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                return;
            }
            $scope.Data = false;
            $scope.loading = true;


            $scope.EncriptedSession = $crypto.encrypt($crypto.encrypt($scope.SessionCaptcha, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            $scope.EncriptedCaptchaText = $crypto.encrypt($crypto.encrypt($scope.CaptchaText.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            $scope.Encstdpin = $crypto.encrypt($crypto.encrypt($scope.PinNumber.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;

            if ($scope.PinNumber.length > 9 && $scope.PinNumber.length < 16) {
                var GetPinStatus = PreExaminationService.ValidateTwoYearsFeePaymentStatusCaptcha($scope.EncriptedSession, $scope.EncriptedCaptchaText, $scope.Encstdpin);
                GetPinStatus.then(function (res) {
                    try {
                        var response = JSON.parse(res);
                    } catch (err) { }

                    if (response[0].ResponceCode == '200') {
                        $scope.CaptchaText = "";
                        $scope.GetCatcha = response[0].Captcha
                        var captcha = JSON.parse(response[0].Captcha)
                        $scope.CaptchaImage = captcha[0].Image;
                        var response = JSON.parse(response[0].Data)

                        if (response.Table[0].ResponceCode == '200' || response.Table[0].ResponceCode == '400') {
                            $scope.loading = false;
                            $scope.Data = false
                            $scope.NoData = true;
                            $scope.NoDataFound = false;
                            alert(response.Table[0].ResponceDescription);

                        } else {
                            //$scope.loading = false;
                            var res = $scope.PinNumber.substring(0, 2);
                            var tempval = angular.uppercase($scope.PinNumber)
                            var exis = (tempval.includes("CCA") || tempval.includes("CCC") || tempval.includes("CCCM") || tempval.includes("CCEC")
                                || tempval.includes("CCEE") || tempval.includes("CCM") || tempval.includes("CCMET") || tempval.includes("CCPT"));

                            if (res >= 75) {
                                //alert("Data Not Found Plase Fill the below Application for Certificate");
                                $scope.PinNo = $scope.PinNumber
                                $scope.Data = false;
                                $scope.NoDataFound = false;
                                $scope.NoData = false;
                                $scope.PinNoData();
                            } else if (res <= 04) {
                                //alert("Data Not Found Plase Fill the below Application for Certificate");
                                $scope.Data = false;
                                $scope.PinNo = $scope.PinNumber
                                $scope.NoDataFound = false;
                                $scope.NoData = false;
                                $scope.PinNoData();
                            } else if (res == 05 && exis) {
                                //alert("Data Not Found Plase Fill the below Application for Certificate");
                                $scope.Data = false;
                                $scope.PinNo = $scope.PinNumber
                                $scope.NoDataFound = false;
                                $scope.NoData = false;
                                $scope.PinNoData();
                            }
                            else {
                                $scope.NoDataFound = false;
                                var GetPinData = PreExaminationService.GetTwoYearsPinDetails($scope.Encstdpin);
                                GetPinData.then(function (res) {
                                    //$scope.bakCaptcha = "";
                                    //$scope.createCaptcha();
                                    if (res.Table[0].ResponceCode == '200' || res.Table[0].ResponceCode == '201') {
                                        $scope.loading = false;
                                        $scope.Data = true;
                                        $scope.NoData = false;
                                        $scope.StudentData = res.Table1[0];
                                        $scope.PageType = res.Table1[0].PageType;
                                        $scope.Scheme = res.Table1[0].Scheme;

                                        if ($scope.PageType == 4) {
                                            $scope.noteApply = true;
                                            $scope.ApplyDisable = true;
                                        } else if ($scope.PageType == 1) {
                                            $scope.noteApply = false;
                                            $scope.ApplyDisable = true;
                                        } else if ($scope.PageType == 1 && $scope.StudentData.NumberOfBacklogs > 0) {
                                            $scope.noteApply = false;
                                        } else if ($scope.PageType == 3) {
                                            $scope.noteApply = true;
                                        }
                                        else {
                                            $scope.noteApply = false;
                                            $scope.ApplyDisable = false;
                                        }
                                        $scope.FeeAmount = res.Table2[0].FeeAmount;
                                        $scope.NoDataFound = false;
                                        $scope.Table3 = true;
                                        if (res.Table3.length > 0) {
                                            $scope.BacklogData = res.Table3;
                                            for (let i = 0; i < $scope.BacklogData.length; i++) {

                                                if ($scope.BacklogData[i].SubjectType == "Theory") {
                                                    $scope.Table3 = false;
                                                    $scope.TheoryCreditsCount = $scope.BacklogData[i].CreditsCount
                                                    $scope.TheoryPassCreditsCount = $scope.BacklogData[i].PassCreditsCount
                                                    $scope.TheorySubjectCount = $scope.BacklogData[i].SubjectsCount
                                                    $scope.TheoryPassCount = $scope.BacklogData[i].PassSubjetsCount
                                                    $scope.TheoryPercentage = $scope.BacklogData[i].PassSubjectPercentage
                                                    $scope.Theorysubtype = $scope.BacklogData[i].subtype


                                                } else if ($scope.BacklogData[i].SubjectType == "Practical") {
                                                    $scope.Table3 = false;
                                                    $scope.PracticalCreditsCount = $scope.BacklogData[i].CreditsCount
                                                    $scope.PracticalPassCreditsCount = $scope.BacklogData[i].PassCreditsCount
                                                    $scope.PracticalSubjectCount = $scope.BacklogData[i].SubjectsCount
                                                    $scope.PracticalPassCount = $scope.BacklogData[i].PassSubjetsCount
                                                    $scope.PracticalPercentage = $scope.BacklogData[i].PassSubjectPercentage
                                                    $scope.Practicalsubtype = $scope.BacklogData[i].subtype
                                                }
                                                else if ($scope.BacklogData[i].SubjectType == "Rubrics") {
                                                    $scope.Table3 = false;
                                                    $scope.RubricsCreditsCount = $scope.BacklogData[i].CreditsCount
                                                    $scope.RubricsPassCreditsCount = $scope.BacklogData[i].PassCreditsCount
                                                    $scope.RubricsSubjectCount = $scope.BacklogData[i].SubjectsCount
                                                    $scope.RubricsPassCount = $scope.BacklogData[i].PassSubjetsCount
                                                    $scope.RubricsPercentage = $scope.BacklogData[i].PassSubjectPercentage
                                                    $scope.Rubricssubtype = $scope.BacklogData[i].subtype
                                                }
                                            }


                                            $scope.NoDataFound = false;
                                        } else {
                                            $scope.loading = false;
                                            $scope.Table3 = false;
                                            $scope.NoDataFound = false;
                                        }

                                    } else if (res.Table[0].ResponceCode == '400') {
                                        $scope.loading = false;
                                        //alert("No data found please fill the below form for Certificate")
                                        $scope.Response = res.Table[0].ResponceDescription;
                                        $scope.Data = false;
                                        $scope.NoDataFound = true;
                                        $scope.NoData = false;

                                    } else if (res.Table[0].ResponceCode == '401') {
                                        $scope.loading = false;
                                        $scope.Response = res.Table[0].ResponceDescription;
                                        $scope.Data = false;
                                        $scope.NoDataFound = true;
                                        $scope.NoData = false;

                                    }
                                    else {
                                        $scope.loading = false;
                                        $scope.Data = false;
                                        $scope.NoDataFound = false;
                                        $scope.NoData = true;
                                    }

                                }, function (err) {
                                    $scope.loading = false;
                                    $scope.Data = false;
                                    $scope.NoDataFound = false;
                                    $scope.NoData = false;
                                });

                            }
                        }

                    }
                    else {
                        alert(response[0].ResponceDescription)
                        $scope.CaptchaText = "";
                        $scope.GetCatcha = response[0].Captcha
                        var captcha = JSON.parse(response[0].Captcha)
                        $scope.CaptchaImage = captcha[0].Image;
                        $scope.loading = false;
                        $scope.Data = false;
                        $scope.NoDataFound = false;
                        $scope.NoData = false;

                    }
                }, function (err) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.NoDataFound = false;
                    $scope.NoData = false;
                });
            } else {
                //$scope.loading = false;
                alert('Please Enter Valid PIN')
            }
        }
    });
});