define(['app'], function (app) {
    app.controller("GenuinenessCheckFormController", function ($scope, $http, $localStorage, $state, $window, $stateParams, AppSettings, PreExaminationService, PaymentService, $uibModal) {
        $scope.Certificate = 8;
        //$scope.OrganizationTypes = [
        //   { "Id": "1", "Name": "State Government" },
        //   { "Id": "2", "Name": "Central Government" },
        //    { "Id": "3", "Name": "Public Sector Under Taken" },
        //   { "Id": "4", "Name": "Third Party Verification Agency" },
        //   { "Id": "5", "Name": "Private Organization" },
        //   { "Id": "6", "Name": "Others" }]
        //$scope.loader = true;

        var ExamMonth = PreExaminationService.GetOrganizationTypes();
        ExamMonth.then(function (response) {
            //var response = JSON.parse(response)
            $scope.OrganizationTypes = response.Table
        }, function (error) {


            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });

        $scope.Form1 = true;
        $scope.Form2 = true;
        $scope.Form3 = true;
        $scope.date = new Date();
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.createCaptcha()
        }


        /// recaptcha
        $scope.loader = false;
        $scope.createCaptcha = function () {
            $scope.newCapchaCode = "";
            document.getElementById('captcha').innerHTML = "";
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
            document.getElementById("captcha").appendChild(canv);
        }




        $window.validateRecaptcha = $scope.validateRecaptcha;

        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.save($scope.PinNumber);
            }
        }

        $scope.Back = function () {
            $scope.cleardata()
            $scope.result = false;
            $scope.paymentResponseFound = false;
            $scope.Form1 = true;
            $scope.Form2 = true;
            $scope.Form3 = true;


        }

        $scope.ValidateEmail = function () {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($scope.OrganizationEmail)) {
                return (true)
            }
            alert("You have entered an invalid email address!")
            return (false)
        }

        $scope.closeModal = function () {
            $scope.noteChallan = false;
            $scope.modalInstance.close();
        }

        $scope.printMarksEntered = function () {

            var divName = "idtoDivPrint";
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
                //var $ele1 = document.createElement("div");
                //$ele1.className = "sbtet_img";             
                // var divToPrintheads = bl.getElementById("divtitle");
                //var divToPrintheaded = al.getElementById("divtop");
                //var divToPrinthead = el.getElementById("divtoadd");
                // $markstable.appendChild(divToPrintheads);
                //$markstable.appendChild(divToPrintheaded);
                //$markstable.appendChild(divToPrinthead);


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
        $scope.ChangeOrganization = function () {
            var data = JSON.parse($scope.OrganizationType)

            $scope.Price = data.Price;
            $scope.OrgId = data.Id
            $scope.OrgType = data.OrganizationType;
            //if ($scope.OrganizationType == 'State Government' || $scope.OrganizationType == 'Central Government') {
            //    $scope.Price = 0
            //    //$scope.Submit();
            //} else {
            //    $scope.Price = 500;
            //}
        }

        $scope.save = function (PinNumber) {
            $scope.MailVerified = false;
            //if ($scope.Certificate == null || $scope.Certificate == "" || $scope.Certificate == undefined) {
            //    alert("select Certificate Type");
            //    return;
            //}
            //$('#ViewAadhar').attr('src', '');
            if ($scope.stserCaptcha == undefined || $scope.stserCaptcha == "") {
                alert("Enter Captcha");
                return;
            };


            if ($scope.stserCaptcha == $scope.newCapchaCode) {
                // alert("Valid Captcha");
            } else {
                alert("Invalid Captcha. try Again");
                $scope.stserCaptcha = "";
                $scope.createCaptcha();
                return;
            }
            $scope.cleardata();
            //  16001 - m - 010

            $scope.PinNumber = PinNumber
            if ($scope.PinNumber.length > 9 && $scope.PinNumber.length < 16) {
                var getData = PreExaminationService.getGenuinenessCheckDetailsByPin($scope.PinNumber)
                getData.then(function (response) {
                    var response = JSON.parse(response);
                    $scope.stserCaptcha = "";
                    $scope.createCaptcha();
                    if (response.Table[0].ResponceCode == '400') {
                        $scope.Error = true;
                        $scope.NoData = false;
                        $scope.result = false;
                        alert(response.Table[0].ResponceDescription)
                        $scope.ErrorMsg = response.Table[0].ResponceDescription;
                    } else {
                        $scope.result = true;
                        $scope.Error = false;
                        $scope.NoData = false;
                        $scope.NoDataFound = false;
                        if (response.Table1.length > 0) {
                            var data = response.Table1[0];

                            //$scope.StudentPhoneNumber = response.Table1[0].StudentPhoneNumber;
                            $scope.ApplicationNo = response.Table1[0].ApplicationNumber;
                            $scope.NewName = response.Table1[0].Name;
                            $scope.NewFatherName = response.Table1[0].FatherName;
                            $scope.userData = data;
                            $scope.userData.Gender = response.Table1[0].Gender;
                            if ($scope.userData.Gender == 'M') {
                                $scope.Gender = 1;
                            } else if ($scope.userData.Gender == 'F') {
                                $scope.Gender = 2;
                            }
                            $scope.paymentResponseFound = false;
                        } else {
                            $scope.NoDataFound = true;
                            $scope.Error = false;
                            $scope.result = false;
                            $scope.NoData = false;
                        }

                        //if (response.Table2.length > 0) {
                        //    $scope.MarksData = response.Table2
                        //}


                    }
                }, function (error) {
                    $scope.NoDataFound = true;
                    $scope.Error = false;
                    $scope.result = false;
                    $scope.NoData = false;
                })

            } else {
                alert('Please Enter Valid PIN')
                $scope.NoDataFound = true;
                $scope.Error = false;
                $scope.result = false;
                $scope.NoData = false;
            }
        };

        $scope.cleardata = function () {
            $scope.NoOtp = true;
            $scope.limitexceeded = false;
            $scope.phonenoupdated = false;
            $scope.result = false;
            $scope.Otp = false;
            $scope.userData = [];
            $scope.array = []
            $scope.OrganizationType = '';
            $scope.Sem = '';
            $scope.MobileDisable = false;
            //$scope.stserCaptcha = "";
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
            $scope.MailOTP = '';
            $scope.OTP = '';
            $scope.userPhoto = '';
            $scope.PrincipalCover = '';
            $scope.Affidiate = '';
            $scope.Aadharxerox = '';
            $scope.OrgType = '';
            $scope.OrgId = '';
            $scope.OrganizationName = '';
            $scope.OrganizationAddress = '';
            $scope.OrganizationEmail = '';
            $scope.OrganizationMobile = '';
            ExamMonthYear = '';
            $scope.Price = '';
            $scope.Affidiate1 = ''
            $scope.upldfile1 = ''
            $scope.userPhoto1 = '';
            $scope.PrincipalCover1 = '';
            $scope.ExamMonth = '';
            $scope.ApplyingOfficer = '';
            $scope.Aadharxerox1 = '';
            $scope.Aadharxerox1 = null;
            $scope.upldfile1 = '';
            $scope.PinNumber = '';
            $scope.ApplicationLetter = '';
            $scope.ApplicationLetter1 = '';
            $scope.OfficerDesignation = '';
            $('#ApplicationLetter').val(null);
            $('#ViewApplicationLetter').attr('src', '');
            $scope.Aadharxerox1 = $scope.Aadharxerox;
            //$('#Aadhar').attr('src', '');
            $('#Aadhar').val(null);
            $('#ViewAadhar').attr('src', '');

            //document.getElementById("ViewAadhar");
            //var myobj = document.getElementById("ViewAadhar");
            //myobj.remove();
            //var element = document.getElementById("ViewAadhar");
            //element.parentNode.removeChild(element);
            if ($scope.Certificate == 3) {
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
            $scope.MailDisabled = false;
            $scope.SendMail = true;
            $scope.ResendMail = false
            $scope.MailVerified = false;
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
            $scope.Gender = '';
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
            $scope.ResponsePin = '';
            $scope.ApplicationNo = '';
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

        $scope.UploadApplication = function () {
            var input = document.getElementById("ApplicationLetter");
            var fileSize = input.files[0].size;

            if (fileSize <= 3000000 && fileSize >= 1000000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#ViewApplicationLetter').attr('src', e.target.result);

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
                            $scope.ApplicationLetter1 = base64Image1;
                            var base64Img = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                            $scope.ApplicationLetter = base64Img;


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

        $scope.GetchallanData = function () {
            $scope.Certificate = 8;
            var SetData = PreExaminationService.GetChallanData($scope.userData.Pin, $scope.Certificate)
            SetData.then(function (response) {
                if (response[0].ResponseCode == '400') {
                    $scope.proceedDisable = false;
                    $scope.loader = false;
                    alert('Already Applied for Certificate')

                } else {
                    try {
                        var response = JSON.parse(response);
                    } catch (err) {
                        $scope.proceedDisable = false;
                        $scope.loader = false;
                    }
                    $scope.challan = response.Table1[0].ChallanNumber
                    $scope.paymentPin = response.Table1[0].Pin
                    $scope.Amount = response.Table1[0].Amount;
                    $scope.billdeskamount = response.Table1[0].Amount;
                    $scope.data = true;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/CertificateFeePaymentPopup.html",
                        size: 'xlg',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                        //backdrop: 'static',
                    });
                    $scope.proceedDisable = false;
                    $scope.loader = false;
                }

            }, function (error) {
                $scope.proceedDisable = false;
                $scope.result = false;
                $scope.loader = false;
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
            var addInfo3 = "Genuineness Check";
            var addInfo4 = "NA";
            var addInfo5 = $scope.Certificate; //$scope.loadedScheme.Scheme;
            var addInfo6 = $scope.StudentPhoneNumber == undefined ? "NA" : $scope.StudentPhoneNumber;//Verified Mobile No
            var addInfo7 = $scope.ApplicationNo == undefined ? "NA" : $scope.ApplicationNo;
            var amount = $scope.billdeskamount;

            var subMarchantid = "STUSERVICES";
            $localStorage.CertificateFeePaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "index.GenuinenessCheckForm",
                CertificateType: 8,
                OrgMobile: $scope.OrganizationMobile
            }
            $localStorage.CertificateFeePaymentGatewayResponse = redirecturl;
            $localStorage.CertificateType = 8;
            $localStorage.OrgMobile = $scope.OrganizationMobile;

            var location = window.location.origin;


            var proceedfinePayment = PaymentService.getHashValue(location + "/Payment/BulkBillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, challan, amount);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // live url
                    //$scope.SendSms()
                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                console.log(err);
            });


        }

        $scope.closeModal = function () {
            $scope.noteChallan = false;
            $scope.modalInstance.close();
        }

        $scope.Proceed = function () {
            if (!$scope.MailVerified) {
                alert('Please Verify the Email, before you proceed.');
                return;
            }
            if (!$scope.phonenoupdated) {
                alert('Please Verify the Mobile number, before you proceed.');
                return;
            }

            if ($scope.ExamMonth == null || $scope.ExamMonth == '' || $scope.ExamMonth == undefined) {
                alert("Please Enter Exam Month Year")
                return
            }
            if ($scope.OrgType == undefined || $scope.OrgType == '' || $scope.OrgType == null) {
                alert('Please choose Organization Type.');
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
            if ($scope.OrganizationEmail) {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($scope.OrganizationEmail)) {

                } else {
                    alert("You have entered an invalid email address!")
                    return;
                }

            }
            if ($scope.OrganizationMobile == undefined || $scope.OrganizationMobile == '' || $scope.OrganizationMobile == null) {
                alert('Please choose Organization Mobile.');
                return;
            }
            if ($scope.Aadharxerox == undefined || $scope.Aadharxerox == '' || $scope.Aadharxerox == null) {
                alert('Please upload Diploma Certificate.');
                return;
            }
            if ($scope.ExamMonth == undefined || $scope.ExamMonth == '' || $scope.ExamMonth == null) {
                alert('Please Enter Month & Year of Pass.');
                return;
            }
            if ($scope.ApplyingOfficer == undefined || $scope.ApplyingOfficer == '' || $scope.ApplyingOfficer == null) {
                alert('Please Enter Applying Officer Name.');
                return;
            }
            if ($scope.OfficerDesignation == undefined || $scope.OfficerDesignation == '' || $scope.OfficerDesignation == null) {
                alert('Please Enter Applying Officer Designation.');
                return;
            }
            if ($scope.ApplicationLetter == undefined || $scope.ApplicationLetter == '' || $scope.ApplicationLetter == null) {
                alert('Please Upload Department/Covering Letter.');
                return;
            }
            if ($scope.OrgId == '1' || $scope.OrgId == '2' || $scope.OrgId == '3') {

                $scope.loader = true;
                $scope.Price = 0
                $scope.proceedDisable = true;
                $scope.CertificateName = "Genuineness Check"
                $scope.Submit();

            } else {
                $scope.loader = true;
                $scope.proceedDisable = true;
                var SetGenuineness = PreExaminationService.SetGenuinenessCheckPayment($scope.userData.Pin, $scope.OrgType, $scope.OrganizationName, $scope.OrganizationAddress, $scope.OrganizationEmail, $scope.OrganizationMobile, $scope.OdcNo, $scope.Aadharxerox,
               $scope.ExamMonth, $scope.Price, $scope.ApplyingOfficer, $scope.ApplicationLetter, $scope.OfficerDesignation)
                SetGenuineness.then(function (res) {
                    try {
                        //alert(res.Table[0].ResponseDesription);
                        var res = JSON.parse(res);
                    } catch (err) {
                        $scope.loader = false;
                        $scope.proceedDisable = false;
                    }
                    if (res.Table[0].ResponseCode == '200') {
                        $scope.ResponsePin = res.Table[0].Pin;
                        $scope.ApplicationNo = res.Table[0].ApplicationNo;
                        $scope.GetchallanData();

                    } else {
                        $scope.loader = false;
                        $scope.proceedDisable = false;
                        alert(res.Table[0].ResponseDescription);

                    }
                }, function (error) {
                    $scope.loader = false;
                    $scope.proceedDisable = false;
                    $scope.result = false;
                });


            }
        }



        $scope.Submit = function () {

            $scope.loader = true;
            var SetInterimData = PreExaminationService.SetGenuinenessCheck($scope.userData.Pin, $scope.OrgType, $scope.OrganizationName, $scope.OrganizationAddress, $scope.OrganizationEmail, $scope.OrganizationMobile, $scope.OdcNo, $scope.Aadharxerox,
              $scope.ExamMonth, $scope.Price, $scope.ApplyingOfficer, $scope.ApplicationLetter, $scope.OfficerDesignation)
            SetInterimData.then(function (res) {
                if (res.Table[0].ResponseCode == '200') {
                    $scope.loader = false;

                    alert(res.Table[0].ResponseDescription)
                    $scope.ResponsePin = res.Table[0].Pin
                    $scope.ApplicationNo = res.Table[0].ApplicationNo
                    $scope.Form1 = false;
                    $scope.Form2 = false;
                    $scope.Form3 = false;
                    $scope.Form3 = false;
                    $scope.result = false;
                    $scope.paymentResponseFound = true;
                    $scope.SendSms()
                    //  sendGenuinenessSMS

                    $scope.proceedDisable = false;



                } else {
                    alert(res.Table[0].ResponseDescription)
                    $scope.proceedDisable = false;
                    $scope.loader = false;
                }
            }, function (error) {
                alert('Something Went Wrong');
                $scope.proceedDisable = false;
                $scope.loader = false;
                $scope.Otp = false;
                $scope.NoOtp = true;
            });
        }

        $scope.SendSms = function () {
            var sendSmss = PreExaminationService.sendGenuinenessSMS($scope.userData.Pin, $scope.StudentPhoneNumber, $scope.CertificateName, $scope.ApplicationNo)
            sendSmss.then(function (res) {

            }, function (error) {
                alert('error occured while Sending SMS');
                $scope.Otp = false;
                $scope.NoOtp = true;
            });
        }

        $scope.SendOtp = function () {
            if ($scope.StudentPhoneNumber != null && $scope.StudentPhoneNumber != undefined && $scope.StudentPhoneNumber.length == '10') {
                $scope.Otp = true;
                $scope.NoOtp = false;
                var GenerateOtpForMobileNoUpdate = PreExaminationService.GenerateOtpForMobileNoUpdate($scope.userData.Pin, $scope.StudentPhoneNumber)
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
                var GenerateOtpForMobileNoUpdate = PreExaminationService.GenerateOtpForMobileNoUpdate($scope.userData.Pin, $scope.StudentPhoneNumber)
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
            var UpdateUserdata = PreExaminationService.UpdateUserdata($scope.userData.Pin, $scope.StudentPhoneNumber, $scope.OTPdata)
            UpdateUserdata.then(function (response) {

                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res.Table[0].StatusCode == '200') {
                    alert(res.Table[0].StatusDescription);
                    $scope.phonenoupdated = true;
                    $scope.Verified = true;
                    $scope.MobileDisable = true;
                } else {
                    alert(res.Table[0].StatusDescription);
                    $scope.phonenoupdated = false;
                    $scope.Verified = false;
                    $scope.MobileDisable = false;
                }
            }, function (error) {
                alert('error occured while updating Mobile number.');
                $scope.phonenoupdated = false;
                $scope.Verified = false;
                $scope.MobileDisable = false;
            });


        }

        $scope.Back = function () {
            $scope.cleardata()
            $scope.result = false;
            $scope.paymentResponseFound = false;
            $scope.Form1 = true;
            $scope.Form2 = true;
            $scope.Form3 = true;


        }

        //  SendOTP

        $scope.sendmail = function (Subject, message, mails, Attachment) {


            if (angular.isUndefined($scope.OrganizationEmail) || $scope.OrganizationEmail == "" || $scope.OrganizationEmail == null) {
                alert('please Enter Organization Email');
                return;
            }

            $scope.SendMail = false;
            $scope.ResendMail = true

            var obj = {
                "From": 'sbtet-helpdesk@telangana.gov.in',
                "To": $scope.OrganizationEmail,
                "cc": "sbtet-helpdesk@telangana.gov.in",
                "Subject": "Genuineness OTP Verification",
                "Message": "Hii",
                //"attachmentdata": Attachment,
                "Pin": $scope.PinNumber
            }

            var sendmail = PreExaminationService.SendOTP(obj)
            sendmail.then(function (response) {

                var mailed_app = response;
                if (response == 'Success') {
                    alert("mail sent successfully.");
                    //$scope.closeModal();


                } else {
                    alert("Mail sending failed");

                }

            }, function (err) {

            });
        }
        $scope.SendMail = true;
        $scope.Verify = function () {
            var setmailstatis = PreExaminationService.Verify_GenuinenessEmailLog($scope.PinNumber, $scope.OrganizationEmail, $scope.MailOTP);
            setmailstatis.then(function (response) {
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.SendMail = false;
                    $scope.ResendMail = false
                    $scope.MailVerified = true;
                    $scope.MailDisabled = true;
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.MailDisabled = false;
                    $scope.SendMail = false;
                    $scope.ResendMail = true
                    $scope.MailVerified = false;
                } else {
                    alert('OTP Not Matched');
                    $scope.MailDisabled = false;
                    $scope.SendMail = false;
                    $scope.ResendMail = true
                    $scope.MailVerified = false;
                }

            }, function () {
                alert('OTP Not Matched');
                $scope.MailDisabled = false;
                $scope.SendMail = false;
                $scope.ResendMail = true
                $scope.MailVerified = false;
            });


        }

    })
})
