define(['app'], function (app) {
    app.controller("TwshCertificateController", function ($scope, $state, TwshStudentRegService, $localStorage) {
        $scope.Name = "Ramu";
        $scope.FatherName = "Ramesh";
        $scope.RegNo = "TEH219090194";
        $scope.Course = "TYPEWRITING ENGLISH(45 WPH)";
        $scope.MonthYear = "September-2019";
        $scope.College = "GOVERNMENT POLYTECHNIC, WARANGAL";
        $scope.Class = "SECOND DIVISION";
        $scope.DOB = "01/11/1996";
        $scope.Today = new Date();
        $scope.Institute = "Laxmi Narayana Typpewriting Institute,Mayuri Mall Complex,Kishan Pura,Hanumakonda";
        $scope.paper1 = "56";
        $scope.paper2 = "50";
    })
})