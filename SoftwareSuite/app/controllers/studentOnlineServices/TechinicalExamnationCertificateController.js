define(['app'], function (app) {
    app.controller("TechinicalExamnationCertificateController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings) {
        $scope.StudentName = "Akhil kumar Bejanaki";
        $scope.FatherName = "Sampath kumar Bejanaki";

        $scope.regNO = "105632";
        $scope.Status = "3rd sem";

        $scope.rectangles = [];

        $scope.DOB = "10/12/2006";
        $scope.FIRSTCLASS = "75% and above in each paper";
        $scope.SECONDCLASS = "10/12/2006";
        $scope.SPONSERD = "-------";





    });
});