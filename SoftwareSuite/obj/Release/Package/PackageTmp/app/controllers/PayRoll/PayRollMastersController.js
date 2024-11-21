define(['app'], function (app) {
    app.controller("PayRollMastersController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService) {
        var authdata = $localStorage.authorizationData;
        $scope.userType = authdata.SystemUserTypeId;
        $scope.hide = false;
        if ($scope.userType != 3) {
            $scope.hide = true;
        }

        var submodules = [];
        var ModuleId = parseInt($localStorage.selectedModule.Id);
        var usertypeId = parseInt($scope.userType);
        var getAdmissionsubmod = SystemUserService.GetSubModulesbyRole(usertypeId, ModuleId);
        getAdmissionsubmod.then(function (Usersdata) {
            var modulesList = [];
            var moduleroutename = "";
            if (Usersdata.length > 0) {
                for (var i = 0; i < Usersdata.length; i++) {

                    var obj = {};
                    obj.SysModName = Usersdata[i].SubModuleName;
                    obj.SysModID = Usersdata[i].id;
                    obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                    obj.ModuleImageClass = Usersdata[i].Class;
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
            $state.go("Dashboard.PayRollDashboard." + Module.ModuleRouteName);
        }

        $scope.OpenDashboard = function () {
            $state.go('Dashboard')
        }
    })
})