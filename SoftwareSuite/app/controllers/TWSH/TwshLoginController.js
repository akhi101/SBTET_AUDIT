define(['app'], function (app) {
    app.controller("TwshLoginController", function ($scope, $state, TwshStudentRegService, $localStorage) {
        $scope.isLogin = false;

        $state.go('TwshHome');
        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.TwshLogin();
            }
        }

        $scope.TwshLogin = function (userName, password) {

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
                if (isLogin) {

                    $scope.isLogin = true;
                } else {

                    $scope.isLogin = false;
                }
                if (!isLogin) {
                    var twshLogin = TwshStudentRegService.UpdateStudentReg(params);
                    twshLogin.then(function (response) {
                        if (response.Table.length > 0) {
                            if (response.Table[0].ResponceCode == "200") {
                                $localStorage.Twsh = {
                                    UserId: response.Table1[0].UserId,
                                    UserTypeId: parseInt(response.Table1[0].UserTypeId),
                                    Username: response.Table1[0].InstitutionName,
                                    isLogin: true,
                                    ApplicationNo: ""
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
                    },
                        function (error) {
                            var err = JSON.parse(error);
                            alert("Login failed, Server Error");
                        });
                }
            }
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

    });
});