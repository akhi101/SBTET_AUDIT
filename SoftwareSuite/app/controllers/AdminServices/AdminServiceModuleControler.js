define(['app'], function (app) {
    app.controller("AdminServiceModuleControler", function ($scope, $http, $localStorage, $state, AppSettings) {


        var servicemodules = [];
        var obj = {};
        obj.SysModName = 'Login';
        obj.SysModID = '2';
        obj.ModuleRouteName = 'LoginServices';
        obj.ModuleImageClass = 'small-box bg-blue';
        servicemodules.push(obj);
        $scope.servicemodules = servicemodules;
        console.log($scope.servicemodules)

        $scope.OpenModule = function (ModuleRouteName) {
            localStorage.removeItem("userTypeId");
            $state.go(ModuleRouteName);
        }
    })
})