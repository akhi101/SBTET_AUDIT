define(['app'], function (app) {
    app.controller("BoardStaffController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService) {
        $scope.SubBillers = ['JANUARY-2024', 'FEBRUARY-2024', 'MARCH-2024', 'APRIL-2024', 'MAY-2024'];
    })
})