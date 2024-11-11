define(['app'], function (app) {
    app.controller("TwshHomeController", function ($scope, $http, $localStorage, $state, $window, AppSettings, TwshStudentRegService, SystemUserService, $crypto) {

        $scope.isLogin = false;
        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.TwshLogin();
            }
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.loginEKey = res;
            sessionStorage.Ekey = res;

        });

        $scope.TwshLogin = function () {
         
            var params = {
                UserName: $scope.userName,
                Password: $scope.password
            }

            if ($scope.userName == undefined) {
                $scope.userName = ""
            };
            if ($scope.password == undefined) {
                $scope.password = ""
            };

            if ($scope.userName == "" && $scope.password == "") {
              
                alert("Enter Username And Password");
                return;
            }
            if ($scope.userName == "") {
                alert("Enter Username");
                return;
            }
            else if ($scope.password == "") {

                alert("Enter Password");
                return;
            } else {
                var isLogin = $localStorage.Twsh == undefined || $localStorage.Twsh == "" ? false : true;
                if (false) {

                    $scope.isLogin = false;
                } else {

                    $scope.isLogin = false;
                }
                if (!false) {
                    var data = $crypto.encrypt($scope.password, $scope.loginEKey) + "$$@@$$" + $crypto.encrypt($scope.userName, $scope.loginEKey) + "$$@@$$" + $scope.loginEKey;
                    var twshLogin = TwshStudentRegService.UpdateStudentReg(data);
                    twshLogin.then(function (response) {
                        if (response != "" && response != null) {
                            if (response.Table.length > 0) {

                                if (response.Table[0].ResponceCode == "200") {

                                    $localStorage.Twsh = {
                                        UserId: response.Table1[0].UserId,
                                        UserTypeId: parseInt(response.Table1[0].UserTypeId),
                                        Username: response.Table1[0].InstitutionName,
                                        ExamCenterID: response.Table1[0].ExamCenterID,
                                        isLogin: true
                                    }

                                    $scope.UserName = $localStorage.Twsh.Username;
                                    $scope.isLogin = true;
                                    $scope.getroutes(response.Table1[0].UserTypeId);

                                   
                                } else {
                                    alert("Login failed");
                                }
                            } else {
                                alert("Login failed");
                            }
                        } else {
                            alert("Login failed");
                        }
                      
                    },
                        function (error) {
                            var err = JSON.parse(error);
                            alert("Login failed, Server Error");
                            // console.log(err.Message);

                        });
                }
            }
        }

        $scope.openApplication = function () {
            $state.go('TWSH.OnlineApplication');
        }

        $scope.getroutes = function (UserTypeId) {
            var GetModules = TwshStudentRegService.getModules(UserTypeId);
            GetModules.then(function (response) {
                console.log(response)
                var data = {
                    moduleslist: response,
                    isLogin: true,
                    user: $localStorage.Twsh.Username
                }
                $scope.$emit('loadmodulelist', data);
                // $scope.modules = response;
                $scope.isLogin = true;
                $state.go(response[0].ModuleRouteName);
            },
                function (error) {
                    var err = JSON.parse(error);
                    alert("Login failed, Server Error");
                    // console.log(err.Message);

                });
        }

        //////////////////////////////////////////////////////////
        sessionStorage.loggedIn = "no";
        $scope.login = {
            userName: "",
            password: ""
        }
        $scope.userNamemessage = "";
        $scope.passwordmessage = "";
        $scope.message = "";

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.loginEKey = res;
            sessionStorage.Ekey = res;

        });

        var code;
        //  function createCaptcha() {
        //clear the contents of captcha div first 
        // $scope.createCaptcha = function () {
        //     $scope.newCapchaCode = "";
        //     document.getElementById('captcha').innerHTML = "";
        //     var charsArray =
        //         "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
        //     var lengthOtp = 6;
        //     var captcha = [];
        //     for (var i = 0; i < lengthOtp; i++) {
        //         //below code will not allow Repetition of Characters
        //         var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        //         if (captcha.indexOf(charsArray[index]) == -1)
        //             captcha.push(charsArray[index]);
        //         else i--;
        //     }
        //     var canv = document.createElement("canvas");
        //     canv.id = "captcha";
        //     canv.width = 150;
        //     canv.height = 50;
        //     var ctx = canv.getContext("2d");
        //     ctx.font = "25px Georgia";
        //     ctx.strokeText(captcha.join(""), 0, 30);
        //     //storing captcha so that can validate you can save it somewhere else according to your specific requirements
        //     $scope.newCapchaCode = captcha.join("");
        //     document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
        // }
        //function validateCaptcha() {
        //    event.preventDefault();
        //    debugger

        //}


        // $scope.validateRecaptcha = function (token) {
        //     $http.post(AppSettings.WebApiUrl + 'api/SystemUser/ValidateReCaptcha?encodedResponse=' + token, {}).then(
        //         function (response) {
        //             if (response.data) {

        //             } else {
        //                 //  return;
        //             }
        //         },
        //         function () {
        //             // return;
        //         });

        // }
        // $window.validateRecaptcha = $scope.validateRecaptcha;

        //$scope.keyLogin = function ($event) {
        //    if ($event.keyCode == 13) {
        //        $scope.login();
        //    }
        //}
        $scope.LoadImg = false;
        $scope.loginToken = "";
        $scope.loginEKey = "";

        //$scope.login = function () {
        //    delete $localStorage.authorizationData;

        //    //  $scope.message = "Invalid Username And Password";           
        //    // if ($scope.login.Captcha == undefined || $scope.login.Captcha == "") {
        //    //     $scope.login.Captcha = "";
        //    //     alert("Enter Captcha");
        //    //     return;
        //    // };

        //    if ($scope.login.userName == undefined) {
        //        $scope.login.userName = ""
        //    };
        //    if ($scope.login.password == undefined) {
        //        $scope.login.password = ""
        //    };

        //    if ($scope.login.userName == "" && $scope.login.password == "") {
        //        $scope.userNamemessage = "* Enter user name";
        //        $scope.passwordmessage = "* Enter password";
        //        alert("Enter Username And Password");
        //        return;
        //    }
        //    if ($scope.login.userName == "") {
        //        $scope.userNamemessage = "* Enter user name";
        //        alert("Enter Username");
        //        return;
        //    }
        //    else if ($scope.login.password == "") {
        //        $scope.passwordmessage = "* Enter password";
        //        alert("Enter Password");
        //        return;
        //    }
        //    else {
        //        // if ($scope.login.Captcha == $scope.newCapchaCode) {
        //        //     // alert("Valid Captcha");
        //        // } else {
        //        //     alert("Invalid Captcha. try Again");
        //        //     $scope.login.Captcha = "";
        //        //     $scope.createCaptcha();
        //        //     return;
        //        // }

        //        if ($scope.login.password !== null && $scope.login.userName !== null) {

        //            var data = $crypto.encrypt($scope.login.password, $scope.loginEKey) + "$$@@$$" + $crypto.encrypt($scope.login.userName, $scope.loginEKey) + "$$@@$$" + $scope.loginEKey;
        //            $http.post(AppSettings.WebApiUrl + 'api/SystemUser/GetUserLogin', data, {}).then(function (response) {
        //                $scope.LoadImg = true;
        //                var UserRights = [];
        //                sessionStorage.loggedIn = "yes";
        //                $localStorage.authToken = response.data.token + "$$@@$$" + $scope.loginEKey;
        //                var status = response.data.data.UserAuth[0].ResponceCode;
        //                if (status != "200") {
        //                    alert(response.data.data.UserAuth[0].RespoceDescription);
        //                    return;
        //                } else {
        //                    // $http.post(AppSettings.WebApiUrl + 'api/SystemUser/ValidateReCaptcha?encodedResponse ='+$scope.reCaptchaToken, {}).then(
        //                    //     function (response) {
        //                    //         if (response) {

        //                    //         } else{
        //                    //             return;
        //                    //         }
        //                    //     },
        //                    //     function () {
        //                    //         return;
        //                    //     });

        //                    response.data = response.data.data.SystemUser[0];
        //                    try {
        //                        $localStorage.authorizationData = {
        //                            token: $localStorage.authToken,
        //                            SysUserID: response.data.UserId,
        //                            College_Code: response.data.CollegeCode,
        //                            College_Name: response.data.CollegeName,
        //                            SystemUserTypeId: response.data.UserTypeId,
        //                            userName: $scope.login.userName.toUpperCase(),
        //                            CollegeID: response.data.CollegeId,
        //                            BranchId: response.data.BranchId,

        //                            CollegeCatName: "",
        //                            Clg_Type: "",
        //                            SectionId: "",
        //                            SchemeId: "",
        //                            SemesterId: "",
        //                            BranchCode: "",
        //                            AcademicId: "",
        //                            percentage: "",
        //                            TypeFlag: response.data.TypeFlag,
        //                            MngtTypID: response.data.MngtTypID,
        //                            SysUsrGrpID: response.data.SysUsrGrpID,
        //                            SeqNo: response.data.SeqNo,



        //                        };
        //                    } catch (err) {

        //                    }
        //                    $state.go('Dashboard');
        //                }

        //                //AppSettings.ExportToExcelUrl = response.data.ExportToExcelUrl;
        //                //AppSettings.ExportToWordUrl = response.data.ExportToWordUrl;
        //                //AppSettings.ExportToPdfUrl = response.data.ExportToPdfUrl;
        //                //AppSettings.LoggedUserId = response.data.SysUserID;
        //                //AppSettings.LoginName = response.data.LoginName;
        //                //AppSettings.CollegeID = response.data.CollegeID;
        //                //AppSettings.SysUsrGrpID = response.data.SysUsrGrpID;
        //                //AppSettings.PrevAdmNo = response.data.PrevAdmNo;
        //                //AppSettings.AcdYrID = response.data.AcdYrID;
        //                //AppSettings.TypeFlag = response.data.TypeFlag;
        //                //AppSettings.UserRights = UserRights;
        //                //AppSettings.userName = $scope.login.userName;
        //                //AppSettings.MngtTypID = response.data.MngtTypID;
        //                //AppSettings.SysUsrGrpID = response.data.SysUsrGrpID;
        //                //AppSettings.SeqNo = response.data.SeqNo;
        //                //AppSettings.DistrictIDs = response.data.DistrictIDs;
        //                //AppSettings.ColCode = response.data.ColCode;
        //                //AppSettings.College_Code = response.data.college_code;
        //                //AppSettings.College_Name = response.data.college_name;
        //                //AppSettings.SystemUserTypeId = response.data.systemusertypeid;
        //                //AppSettings.BranchId = response.data.branchid;



        //            });
        //        };
        //    }

        //}
        $scope.ForgetPasswordChange = function () {
            $state.go('ForgetPassword');
        }


        $("#username").focus();
        $scope.ClearErrorText = function ($event) {
            $scope.userNamemessage = "";
            $scope.passwordmessage = "";
            $scope.message = "";
        };
        $scope.$on('onUnload', function (e) {
            delete $localStorage.authorizationData;
            sessionStorage.loggedIn = "no";
        });
        $scope.Loginboclogin = function () {
            $state.go('login');
        }
    });

});