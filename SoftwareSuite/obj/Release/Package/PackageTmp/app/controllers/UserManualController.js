define(['app'], function (app) {
    app.controller("UserManualController", function ($scope, $state, $localStorage, $stateParams, AppSettings) {
        var authdata = $localStorage.authorizationData;
        $scope.userType = authdata.SystemUserTypeId;
        /// $state.go('index');

    });
});
