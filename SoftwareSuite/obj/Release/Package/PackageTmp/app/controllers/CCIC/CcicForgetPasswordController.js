define(['app'], function (app) {
    app.controller("CcicForgetPasswordController", function ($scope, $state, $window, AppSettings, $crypto, CcicForgetPasswordService, CcicSystemUserService) {
        $scope.CcicForgetPassword = {};
        $scope.ShowLoading = false;
        $scope.CcicSavePreDetails = function () {
            $scope.Smsbtndisable = true;


           
            if (($scope.CcicForgetPassword.UserName == undefined) || ($scope.CcicForgetPassword.UserName == "")) {
                alert("Enter Username");
                return false;
            }

            if (($scope.CcicForgetPassword.UserMobile == undefined) || ($scope.CcicForgetPassword.UserMobile == "")) {
                alert("Enter Mobile Number");
                return false;
            }
            if (($scope.CcicForgetPassword.UserMobile.length < 10) || ($scope.CcicForgetPassword.UserMobile.length > 10)) {
                alert("Invalid Mobile Number");
                return false;
            }
            if ($scope.CcicForgetPassword.Captcha == undefined || $scope.CcicForgetPassword.Captcha == "") {
                $scope.CcicForgetPassword.Captcha = "";
                alert("Enter Captcha");
                return;
            };
            $scope.UserID = 0;
            $scope.ShowLoading = true;
            let reqdata = $crypto.encrypt($scope.CcicForgetPassword.UserName, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt($scope.CcicForgetPassword.UserMobile, sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
            var getPromise = CcicForgetPasswordService.GetCcicForgetPassword(reqdata);
            getPromise.then(function (data) {
                try {
                    var res = JSON.parse(data);

                } catch (ex) {
                }
                if (res.status == "200") {
                    $scope.Smsbtndisable = false;
                    $scope.ShowLoading = false;

                    var Message = "Dear Sir//Madam, Your Login Credentials: UserName=" + $scope.CcicForgetPassword.UserName + ", UserPassword= " + data[0].UserPassword + " SBTETTS";
                    //var Urlstring = "?User=sbtetts&Passwd=sbtet@1972&Sid=SBTETS&Mobilenumber=91" + data[0].CellNo + "&Message=" + Message + "&Mtype=N&DR`=Y";
                    //  var FinalURL= AppSettings.SMSApiUrl + Urlstring;

                    alert("Login Credentials sent to the registered mobile number. Please check.");
                    RedirectToListPage();
                } else {
                    alert(res.statusdesc);
                    $scope.Smsbtndisable = false;
                    $scope.ShowLoading = false;
                    $scope.RollEditDisable = false;
                }

            }, function (error) {
                $scope.Smsbtndisable = false;
                $scope.ShowLoading = false;
                $scope.RollEditDisable = false;
                try {
                    var res = JSON.parse(error);

                } catch (ex) {
                }
                alert(res.statusdesc);

            });
        }


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
                $scope.CcicForgetPassword();
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('CcicLogin');
        }
    });
});
