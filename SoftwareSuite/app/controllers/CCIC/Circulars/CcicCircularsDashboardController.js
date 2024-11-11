define(['app'], function (app) {
    app.controller("CcicCircularsDashboardController", function ($window, $scope, $http, $localStorage, $state, $stateParams, $interval, AppSettings) {

        $scope.openCcicDashboard = function () {
            $window.location.href = '/index.html#!/CcicDashboard';
        }
    })
})