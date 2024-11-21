define(['app'], function (app) {
    app.controller("StudentServicesController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService) {
        var authdata = $localStorage.authorizationData;
        $scope.userType = authdata.SystemUserTypeId;
        $scope.StudentServicesModules = [];
        var ModuleId = parseInt($localStorage.selectedModule.Id);
        var usertypeId = parseInt($scope.userType);
        var getStudentServicesSubMod = SystemUserService.GetSubModulesbyRole(usertypeId, ModuleId);
        getStudentServicesSubMod.then(function (Usersdata) {
            var modulesList = [];
            if (Usersdata.length > 0) {
                for (var i = 0; i < Usersdata.length; i++) {
                    var obj = {};
                    obj.SysModName = Usersdata[i].SubModuleName;
                    obj.SysModID = Usersdata[i].id;
                    obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                    obj.ModuleImageClass = Usersdata[i].Class;
                    modulesList.push(obj);
                }
                $scope.StudentServicesModules = modulesList;
                console.log(modulesList);
            } else {
                $scope.StudentServicesModules = [];
            }
        }, function (err) {
            console.log(err);
        });

        $scope.OpenSubModule = function (Module) {
            $state.go("Dashboard.StudentServices." + Module.ModuleRouteName);
        }
    })
})
