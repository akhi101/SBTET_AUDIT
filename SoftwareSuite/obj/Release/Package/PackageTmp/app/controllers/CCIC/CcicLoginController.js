define(['app'], function (app) {
    app.controller("CcicLoginController", function ($scope, $http, $localStorage, $state, $window, AppSettings, CcicSystemUserService, $crypto) {

        sessionStorage.loggedIn = "no";
        $scope.CcicLogin = {
            UserName: "",
            UserPassword: ""
        }
        $scope.UserNamemessage = "";
        $scope.UserPasswordmessage = "";
        $scope.message = "";

        var eKey = CcicSystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.CcicLoginEKey = res;
            sessionStorage.Ekey = res;

        });

        var sessioneKey = CcicSystemUserService.GetSessionEKey();
        sessioneKey.then(function (res) {
            $scope.CcicLoginSessionEKey = res;
            sessionStorage.SessionEkey = res;

        });


        var code;
       
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
            //storing captcha so that can validate you can save it somewhere else according to your specific requirements
            $scope.newCapchaCode = captcha.join("");
            document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
        }
       


        $scope.validateRecaptcha = function (token) {
            $http.post(AppSettings.WebApiUrl + 'api/CcicSystemUser/ValidateReCaptcha?encodedResponse=' + token, {}).then(
                function (response) {
                    if (response.data) {

                    } else {
                    }
                },
                function () {
                });

        }
        $window.validateRecaptcha = $scope.validateRecaptcha;

        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.CcicLogin();
            }
        }
        $scope.LoadImg = false;
        $scope.CcicLoginToken = "";
        $scope.CcicLoginEKey = "";
        $scope.CcicLoginSessionEkey = "";

        $scope.CcicLogin = function () {
            delete $localStorage.authorizationData;

            if ($scope.CcicLogin.Captcha == undefined || $scope.CcicLogin.Captcha == "") {
                $scope.CcicLogin.Captcha = "";
                alert("Enter Captcha");
                return;
            };

            if ($scope.CcicLogin.UserName == undefined) {
                $scope.CcicLogin.UserName = ""
            };
            if ($scope.CcicLogin.UserPassword == undefined) {
                $scope.CcicLogin.UserPassword = ""
            };

            if ($scope.CcicLogin.UserName == "" && $scope.CcicLogin.UserPassword == "") {
                $scope.UserNamemessage = "* Enter user name";
                $scope.UserPasswordmessage = "* Enter password";
                alert("Enter Username And Password");
                return;
            }
            if ($scope.CcicLogin.UserName == "") {
                $scope.UserNamemessage = "* Enter user name";
                alert("Enter Username");
                return;
            }
            else if ($scope.CcicLogin.UserPassword == "") {
                $scope.UserPasswordmessage = "* Enter password";
                alert("Enter Password");
                return;
            }
            else {
                if ($scope.CcicLogin.Captcha == $scope.newCapchaCode) {
                    // alert("Valid Captcha");
                } else {
                    alert("Invalid Captcha. try Again");
                    $scope.CcicLogin.Captcha = "";
                    $scope.createCaptcha();
                    return;
                }

                if ($scope.CcicLogin.UserPassword !== null && $scope.CcicLogin.UserName !== null) {

                    var data = $crypto.encrypt($scope.CcicLogin.UserPassword, $scope.CcicLoginEKey) + "$$@@$$" + $crypto.encrypt($scope.CcicLogin.UserName, $scope.CcicLoginEKey) + "$$@@$$" + $scope.CcicLoginEKey + "$$@@$$" + $scope.CcicLoginSessionEKey;
                    $http.post(AppSettings.WebApiUrl + 'api/CcicSystemUser/GetCcicUserLogin', data, {}).then(function (response) {

                        $scope.LoadImg = true;
                        var UserRights = [];
                        sessionStorage.loggedIn = "yes";
                        $localStorage.authToken = response.data.token + "$$@@$$" + $scope.CcicLoginEKey;
                        var status = response.data.data.CcicUserAuth[0].ResponceCode;
                        if (status != "200") {
                            alert(response.data.data.CcicUserAuth[0].RespoceDescription);
                            return;
                        } else {
                            $localStorage.SessionID = $scope.CcicLoginSessionEKey;

                            response.data = response.data.data.CcicSystemUser[0];

                            try {
                                $localStorage.authorizationData = {
                                    token: $localStorage.CcicAuthToken,
                                    SessionID: $scope.CcicLoginSessionEkey,
                                    UserName: $scope.CcicLogin.UserName.toUpperCase(),
                                    CourseID: response.data.CourseID,
                                    InstitutionID: response.data.InstitutionID,
                                    InstitutionCode: response.data.InstitutionCode,                                  
                                    InstitutionName: response.data.InstitutionName,
                                    UserTypeID: response.data.UserTypeID,
                                    UserID: response.data.UserID,


                                };
                            } catch (err) {

                            }
                            $state.go('CcicDashboard');
                        }

                        
                    });
                };
            }

        }
        $scope.CcicForgetPasswordChange = function () {
            $state.go('CcicForgetPassword');
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
        $scope.LoginbocCcicLogin = function () {
            $state.go('CcicLogin');
        }
    });

});