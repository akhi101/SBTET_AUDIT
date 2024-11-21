define(['app'], function (app) {
    app.controller("CcicDateSheetController", function ($scope, $http, $localStorage, $state, AppSettings, CcicSystemUserService) {

        var authData = $localStorage.authorizationData;
        $scope.userType = authData.SystemUserTypeID;
        $scope.hide = false;
        if ($scope.userType != 3) {
            $scope.hide = true;
        }

        var submodules = [];
        var UserTypeID = authData.UserTypeID;
        var ModuleID = parseInt($localStorage.selectedModule.ModuleID);

        var getAdmissionsubmod = CcicSystemUserService.GetCcicUserSubModules(UserTypeID, ModuleID);
        getAdmissionsubmod.then(function (Usersdata) {
            var modulesList = [];
            var moduleroutename = "";
            if (Usersdata.length > 0) {
                for (var i = 0; i < Usersdata.length; i++) {

                    var obj = {};
                    obj.SysModName = Usersdata[i].SubModuleName;
                    obj.SysModID = Usersdata[i].ModuleID;
                    obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                    obj.ModuleImageClass = Usersdata[i].ModuleCardClassName;
                    modulesList.push(obj);

                }
                $scope.PreExamModules = modulesList;
                // $('.overlayCss').css('display', 'none');
            } else {
                $scope.PreExamModules = [];
            }
        }, function (err) {
            console.log(err);
        });

        $scope.$on('showLoading', function (evt, data) {
            $('.overlayCss').css('display', 'block');
        });

        $scope.$on('hideLoading', function (evt, data) {
            $('.overlayCss').css('display', 'none');
        });



        $scope.submodules = submodules;

        $scope.OpenSubModule = function (Module) {
            $state.go("CcicDashboard.PreExamination." + Module.SubModuleRouteName);
        }

        $scope.OpenCcicDashboard = function () {
            $state.go('CcicDashboard')
        }

        $scope.logOut = function () {
            //$scope.$emit("logout", authData.UserName);
            sessionStorage.loggedIn = "no";
            var GetCcicUserLogout = CcicSystemUserService.PostCcicUserLogout($scope.UserName, $scope.SessionID);

            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;

            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""
            };
            $state.go('CcicLogin');
        }


    })
})