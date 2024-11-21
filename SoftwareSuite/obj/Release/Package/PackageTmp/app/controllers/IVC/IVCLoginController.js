define(['app'], function (app) {
    app.controller("IVCLoginController", function ($scope, $crypto, AppSettings, $http, $localStorage, $state, IVCSystemUserService, IVCAdminService, IVCRegistrationService) {

        const $ctrl = this;

        $ctrl.$onInit = () => {

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

            var eKey = IVCSystemUserService.GetEKey();
            eKey.then(function (res) {
                $scope.RegistrationEKey = res;
                sessionStorage.Ekey = res;

            });
            var sessioneKey = IVCSystemUserService.GetSessionEKey();
            sessioneKey.then(function (res) {
                $scope.LoginSessionEKey = res;
                sessionStorage.SessionEkey = res;
                $scope.GetCaptchaData($scope.SessionCaptcha)

            });

            $scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')


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




      

        $scope.ValidateCaptcha = function () {
           
            if ($scope.UserName == "" || $scope.UserName == undefined || $scope.UserName == null) {
                $scope.UserNamemessage = "* Enter user name";
                alert("Enter Registration Number/Mobile Number");
                $scope.loginbutton = false;
                return;
            }
            else if ($scope.Password == "" || $scope.Password == undefined || $scope.Password == null) {
                $scope.UserPasswordmessage = "* Enter password";
                alert("Enter Password");
                $scope.loginbutton = false;
                return;
            }
               if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.loginbutton = false;
                return;
                };
            var captcha = IVCAdminService.ValidateCaptcha($scope.newcapt, $scope.CaptchaText);
            captcha.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {
                    //alert(response[0].ResponseDescription);
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    $scope.Login()
                } else {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }


        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.ValidateCaptcha();
            }
        }

        //$scope.LoadImg = false;
        $scope.LoginToken = "";
        $scope.LoginEKey = "";
        $scope.LoginSessionEkey = "";

        $scope.Login = function () {
            //delete $localStorage.authorizationData;

         

            if ($scope.UserName == undefined) {
                $scope.UserName = ""
            };
            if ($scope.Password == undefined) {
                $scope.Password = ""
            };

            if ($scope.UserName == "" && $scope.Password == "") {
                $scope.UserNamemessage = "* Enter user name";
                $scope.UserPasswordmessage = "* Enter password";
                alert("Enter Username And Password");
                $scope.loginbutton = false;
                return;
            }
            if ($scope.UserName == "") {
                $scope.UserNamemessage = "* Enter user name";
                alert("Enter Username");
                $scope.loginbutton = false;
                return;
            }
            else if ($scope.Password == "") {
                $scope.UserPasswordmessage = "* Enter password";
                alert("Enter Password");
                $scope.loginbutton = false;

                return;
            }
            else {

                if ($scope.Password !== null && $scope.UserName !== null) {
                    var Type = "student";
                    var data = $crypto.encrypt($crypto.encrypt($scope.Password, 'HBSBP9214EDU00TS'), $scope.LoginEKey) + "$$@@$$" + $crypto.encrypt($scope.UserName, $scope.LoginEKey) + "$$@@$$" + $scope.LoginEKey + "$$@@$$" + $scope.LoginSessionEKey + "$$@@$$" + Type;
                    $http.post(AppSettings.WebApiUrl + 'api/IVCSystemUser/GetIVCUserLogin', data, {}).then(function (response) {

                        //$scope.LoadImg = true;
                        var UserRights = [];
                        sessionStorage.loggedIn = "yes";
                        $localStorage.authToken = response.data.token + "$$@@$$" + $scope.LoginEKey;
                        var status = response.data.data.IVCUserAuth[0].ResponceCode;
                        if (status != "200") {
                            alert(response.data.data.IVCUserAuth[0].RespoceDescription);
                           
                            return;
                        } else {
                            $scope.loginbutton = true;
                            $localStorage.SessionID = $scope.LoginSessionEKey;
                            if (response.data.data.IVCSystemUser[0].UserTypeID == 0) {
                                //try {
                                    $localStorage.authorizationData = {
                                        token: $localStorage.IVCauthToken,
                                        SessionID: $scope.LoginSessionEkey,
                                       // UserName: $scope.Login.UserName.toUpperCase(),
                                        //CourseID: response.data.CourseID,
                                        //InstitutionID: response.data.InstitutionID,
                                        //InstitutionCode: response.data.InstitutionCode,
                                        //InstitutionName: response.data.InstitutionName,
                                        UserTypeID: response.data.data.IVCSystemUser[0].UserTypeID,
                                        UserID: response.data.data.IVCSystemUser[0].UserID,


                                    };
                                //} catch (err) {

                                //}
                                $state.go('StudentDashboard');
                            } else {
                                response.data = response.data.data.IVCSystemUser[0];

                               // try {
                                    $localStorage.authorizationData = {
                                        token: $localStorage.authToken,
                                        SessionID: $scope.LoginSessionEkey,
                                        UserID: response.data.UserID,
                                        UserName: $scope.Login.UserName.toUpperCase(),
                                        //CourseID: response.data.CourseID,
                                        //InstitutionID: response.data.InstitutionID,
                                        //InstitutionCode: response.data.InstitutionCode,
                                        //InstitutionName: response.data.InstitutionName,
                                        UserTypeID: response.data.data.IVCSystemUser[0].UserTypeID,
                                       


                                    };

                                //} catch (err) {

                                //}
                                $state.go('StudentDashboard');
                            }
                            }
                            


                    });
                };
            }

        }
        $scope.ForgetPasswordChange = function () {
           // $state.go('ForgetPassword');
        }


        $("#username").focus();
        $scope.ClearErrorText = function ($event) {
            $scope.UserNamemessage = "";
            $scope.UserPasswordmessage = "";
            $scope.message = "";
        };
        $scope.$on('onUnload', function (e) {
            delete $localStorage.authorizationData;
            sessionStorage.loggedIn = "no";
        });
        $scope.LoginbocLogin = function () {
          //  $state.go('Login');
        }

    })
})