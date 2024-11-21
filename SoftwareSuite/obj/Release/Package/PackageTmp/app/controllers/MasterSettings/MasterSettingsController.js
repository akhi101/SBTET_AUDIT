define(['app'], function (app) {
    app.controller("MasterSettingsController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService) {
        var authdata = $localStorage.authorizationData;
        $scope.userType = authdata.SystemUserTypeId;
        $scope.AssessmentModules = [];

        var ModuleId = parseInt($localStorage.selectedModule.Id);
        var usertypeId = parseInt($scope.userType);
        var getAdmissionsubmod = SystemUserService.GetSubModulesbyRole(usertypeId, ModuleId);
        getAdmissionsubmod.then(function (Usersdata) {
            var modulesList = [];
            var moduleroutename = "";
            if (Usersdata.length > 0) {
                for (var i = 0; i < Usersdata.length; i++) {
                    // if (moduleroutename != Usersdata[i].SubModuleRouteName) {
                    var obj = {};
                    obj.SysModName = Usersdata[i].SubModuleName;
                    obj.SysModID = Usersdata[i].id;
                    obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                    obj.ModuleImageClass = Usersdata[i].Class;
                    modulesList.push(obj);
                    //   moduleroutename = UsersRightsdata[i].SubModuleRouteName;
                    //  }
                }
                $scope.AssessmentModules = modulesList;
            } else {
                $scope.AssessmentModules = [];
            }
        }, function (err) {
            console.log(err);
        });

        $scope.OpenSubModule = function (Module) {
            $state.go("Dashboard.AssessmentDashbaord." + Module.ModuleRouteName);
        }
    })
})



