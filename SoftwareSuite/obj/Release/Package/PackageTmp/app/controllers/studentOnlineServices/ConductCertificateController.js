define(['app'], function (app) {
    app.controller("ConductCertificateController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings) {
        $scope.rectangles = [];
        $scope.Date = new Date()

        $scope.generatePdf = function () {
            $scope.Name = "Akhil Kumar Bejjenki";
            $scope.FatherName = "Sapmth Kumar";
            $scope.ColleageName = "Vijaya Rural Engg";
            $scope.AcademicYear = "2019-20";
            $scope.Status = "good";
            $scope.PinNumber = "19001-M-001"
            $scope.Date = new Date()
            setTimeout(function () { 
            document.title = 'Conduct_Certificate';
            window.print();
            document.title = tempTitle;
            }, 500);
        }




    });
});