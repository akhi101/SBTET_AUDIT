define(['app'], function (app) {
    app.controller("IVCRegistrationController", function ($scope, $http, $crypto, $localStorage, $state, $uibModal, IVCSystemUserService, IVCAdminService,IVCRegistrationService) {
        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.sendotp = true;
            $scope.enterotp = false;
            $scope.PhoneNum = false;
            $scope.verifyotp = false;
            $scope.loading = false;
            $scope.ResendLink = false;
            $scope.phonenoupdated = false;
            $scope.OtpVerified = false;

            var captcha = IVCAdminService.GetCaptchaString10();
            captcha.then(function (res) {
            try {
                $scope.newcapt = res;
                $scope.GetCaptchaData($scope.newcapt)
                sessionStorage.clear();
                alert(newcapt);
                sessionStorage.setItem('SessionCaptcha', newcapt);
                $scope.sessionid = res;
            } catch (err) {
                $scope.GetCatcha = ''
            }
        }, function (error) {
            $scope.GetCatcha = ''
            alert('Unable to load Captcha')
            });

            $scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')
            console.log($scope.SessionCaptcha)

            var eKey = IVCSystemUserService.GetEKey();
            eKey.then(function (res) {
                $scope.RegistrationEKey = res;
                sessionStorage.Ekey = res;

            });

           

        }

   
        $scope.Compare = function (ConfirmPass) {
            if ($scope.CreatePass.includes(ConfirmPass)) {
            }
            else {
                alert('Password Mismatch');
            }
        }

   


        $scope.Cancel = function () {
            $scope.StudentName = "";
            $scope.MobileNumber = "";
            $scope.OtpVerified = false;
            $scope.email = "";
            $scope.CreatePass = "";
            $scope.ConfirmPass = "";
            $scope.CaptchaText = "";
            $scope.PhoneNum = false;
            $scope.otpbutton = false;
            $scope.sendotp = true;
            $scope.enterotp = false;
            $scope.mobileotp = "";
            $scope.OtpVerified = false;
            $scope.verifyotp = false;
            $scope.ResendLink = false;

            $scope.GetCaptchaData()
        }


        $scope.GetCaptchaData = function () {
            var captcha = IVCAdminService.GetCaptchaString($scope.newcapt);
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

        $scope.ValidateCaptcha1 = function (datatype) {
            $scope.DataType = datatype;
            if ($scope.StudentName == "" || $scope.StudentName == null || $scope.StudentName == undefined) {
                alert("Please Enter Name")
                return
            }
            if ($scope.MobileNumber == "" || $scope.MobileNumber == null || $scope.MobileNumber == undefined) {
                alert("Please Enter Mobile Number")
                return
            }

            if ($scope.OtpVerified == false) {
                alert("Please Verify Mobile Number")
                return
            }
          
            if ($scope.CreatePass == "" || $scope.CreatePass == null || $scope.CreatePass == undefined) {
                alert("Please Enter Password")
                return
            }
            if ($scope.ConfirmPass == "" || $scope.ConfirmPass == null || $scope.ConfirmPass == undefined) {
                alert("Please Enter Confirm Password")
                return
            }
            $scope.ChangePassword();
            if ($scope.CaptchaText == "" || $scope.CaptchaText == null || $scope.CaptchaText == undefined) {
                alert("Please Enter Captcha")
                return
            }

            var captcha = IVCAdminService.ValidateCaptcha($scope.newcapt, $scope.CaptchaText);
            captcha.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {

                    $scope.CaptchaText = "";
                    $scope.Submit()
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;

                } else {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    return

                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }

   

        $scope.ResStatus = 0;
        $scope.SendSms = function () {
            $scope.otpbutton = true;
            if ($scope.StudentName == undefined || $scope.StudentName == "" || $scope.StudentName == null) {
                alert('Please enter Student name');
                $scope.otpbutton = false;
                return;
            }

            if ($scope.MobileNumber == undefined || $scope.MobileNumber == "" || $scope.MobileNumber == null) {
                alert('please Enter Mobile number');
                $scope.otpbutton = false;
                return;
            }

            $scope.loader1 = true;
            $scope.sendotp = true;
            $scope.phonenoupdated = false;
            var SendSms = IVCRegistrationService.SendSms($scope.MobileNumber, $scope.StudentName)
            SendSms.then(function (response) {
                let res = response[0];
                if (res.StatusCode == '200') {
                    $scope.loader1 = false;
                    $scope.otpbutton = false;
                    $scope.ResStatus = res.StatusCode;
                    alert("Otp sent successfully.");
                    $scope.sendotp = false;
                    $scope.phonenoupdated = false;
                    $scope.enterotp = true;
                    $scope.ResendLink = true;
                    $scope.verifyotp = true;
                }
                else if (res.StatusCode == '400') {
                    $scope.loader1 = false;
                    $scope.otpbutton = false;
                    $scope.ResStatus = res.StatusCode;
                    alert(res.StatusDescription);
                    $scope.sendotp = false;
                    $scope.phonenoupdated = false;
                    $scope.enterotp = true;
                    $scope.ResendLink = true;
                    $scope.verifyotp = true;
                }
                else {
                    $scope.loader1 = false;
                    $scope.otpbutton = false;
                    alert("Otp Sending Failed")
                    $scope.sendotp = true;
                    $scope.phonenoupdated = false;
                    $scope.enterotp = false;
                    $scope.verifyotp = false;
                }

            }, function (err) {
                $scope.loader1 = false;
                $scope.otpbutton = false;
                $scope.sendotp = true;
                $scope.phonenoupdated = false;
                $scope.enterotp = false;
                $scope.verifyotp = false;
            });
        }


        var count = 0;
        $scope.ResendOtp = function () {
            if (count < 3) {
                $scope.ReSendSms();
                if ($scope.ResStatus == 200)
                    count++;

                else if ($scope.ResStatus == 400)
                    alert('Otp Sent Less than 30 seconds');
                else
                    $scope.ResendLink = false;

            }
        }

        $scope.ReSendSms = function () {
            var SendSms = IVCRegistrationService.SendSms($scope.MobileNumber, $scope.StudentName)
            SendSms.then(function (response) {
                let res = response[0];
                if (res.StatusCode == '200') {
                    $scope.loader1 = false;
                    $scope.ResStatus = res.StatusCode;
                    alert("Otp sent successfully.");
                }
                else if (res.StatusCode == '400') {
                    $scope.loader1 = false;
                    $scope.ResStatus = res.StatusCode;
                }
                else {
                    $scope.loader1 = false;
                    alert("Otp Sending Failed")
                }

            }, function (err) {
                $scope.loader1 = false;

            });
        }


        $scope.VerifyMobileOtp = function (MobileNumber, StudentName, mobileotp) {


            if (MobileNumber == undefined || $scope.MobileNumber == "" || $scope.MobileNumber == null) {
                alert('please Enter Correct Mobile number');
                return;
            }

            if ($scope.StudentName == undefined || $scope.StudentName == "" || $scope.StudentName == null) {
                alert('Please enter Student name');
                return;
            }

            if ($scope.mobileotp == undefined || $scope.mobileotp == "" || $scope.mobileotp == null) {
                alert('please Enter OTP.');
                return;
            }

            $scope.loader2 = true;
            var VerifyMobileOtp = IVCRegistrationService.VerifyMobileOtp(MobileNumber, StudentName, mobileotp)
            VerifyMobileOtp.then(function (response) {
                let VerRes = response[0];
                if (VerRes.StatusCode == '200') {
                    $scope.loader2 = false;
                    alert("Mobile Number Verified Successfully");
                    $scope.OtpVerified = true;
                    $scope.enterotp = false;
                    $scope.verifyotp = false;
                    $scope.phonenoupdated = true;
                    $scope.PhoneNum = true;
                }
                else if (VerRes.StatusCode == '400') {
                    $scope.loader2 = false;
                    alert(VerRes.StatusDescription);
                    $scope.OtpVerified = false;
                    $scope.phonenoupdated = false;
                    $scope.sendotp = false;
                }
                else {
                    $scope.loader2 = false;
                    alert("Otp Verification Failed")
                    $scope.OtpVerified = false;
                    $scope.phonenoupdated = false;
                    $scope.sendotp = false;

                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }


    

        $scope.ChangePassword = function () {
            if ($scope.CreatePass !== $scope.ConfirmPass) {
                alert("Password and Confirm Password Not Matched")
                return;
            }
        }
    //    $scope.CasteVerified = false
    //    $scope.Aadhaar = "";
    //    $scope.CasteNum = "";

        $scope.Submit = function () {
            var EncriptedPassword = $crypto.encrypt($crypto.encrypt($scope.CreatePass, 'HBSBP9214EDU00TS'), $scope.RegistrationEKey) + '$$@@$$' + $scope.RegistrationEKey;
            var submitstddetails = IVCRegistrationService.SubmitStdDetails($scope.StudentName, $scope.MobileNumber,$scope.email, EncriptedPassword);
            submitstddetails.then(function (res) {
                try {
                    var res = JSON.parse(res)
                }
                catch (err) { }
                if (res.Table[0].StatusCode == '200') {
                    $scope.Loader1 = false;
                    alert(res.Table1[0].RegistrationNumber + " is Your provisional registration No for IVC 2023 and " + res.Table1[0].RegistrationPassword + " password. Login and complete Application, SBTET TS");
                } else if (res.Table[0].StatusCode == '400') {
                    $scope.loader4 = false;
                    alert(res.Table[0].StatusDescription);
                }
                else {
                    alert("Error while loading Data");
                }


            },
                function (error) {

                    $scope.DetailsFound = false;
                    alert("Error while loading Data");
                    console.log(error);
                });
        }

   


    });
});