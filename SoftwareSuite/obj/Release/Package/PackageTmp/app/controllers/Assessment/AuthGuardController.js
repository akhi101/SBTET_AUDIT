define(['app'], function (app) {
    app.controller("AuthGuardController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings) {
        var authData = $localStorage.authorizationData;
        $scope.userType = authData.SystemUserTypeId;
        $scope.CanAccess = function (user) {
            if ($scope.userType == user) {
                return true;
            } else {
                return false;
            }

        }


    });
});