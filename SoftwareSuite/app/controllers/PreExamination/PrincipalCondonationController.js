define(['app'], function (app) {
    app.controller("PrincipalCondonationController", function ($scope, $http, $localStorage, $state, AppSettings) {

        $scope.openStudentDetails = function () {
            alert();
            $state.go('Dashboard.FeePayment.CondonationApprovedDetails')
        }

    })
})