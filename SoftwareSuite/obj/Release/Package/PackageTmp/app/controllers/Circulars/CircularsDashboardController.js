define(['app'], function (app) {
    app.controller("CircularsDashboardController", function ($window ,$scope, $http, $localStorage, $state, $stateParams, $interval, AppSettings) {

        $scope.openDashboard = function () {
            $window.location.href = '/index.html#!/Dashboard';
        }
    })
})