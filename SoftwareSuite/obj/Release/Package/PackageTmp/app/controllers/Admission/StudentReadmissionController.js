define(['app'], function (app) {
    app.controller("StudentReadmissionController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AssessmentService, ReportService, AdmissionService) {

        $scope.StudentDetailes = [];

        $scope.studentdata = function () {
            if ($scope.Readmissionform.$valid) {

                $scope.Table = false;

                var StudentReadmissiondata = AdmissionService.StudentReadmissiondata($scope.pinNumber);

                StudentReadmissiondata.then(function (response) {

                    if (response.length > 0) {

                        $scope.Table = true;
                        $scope.studentsNotFound = false;
                        $scope.StudentDetailes = response;
                    }

                    else {
                        alert("Data not found")

                    }

                },
                 function (error) {
                     alert("error");
                     $scope.Table = false;
                     $scope.studentsNotFound = true;

                 });
            } else {
                alert("Please  Enter Student Pin");
               

            }
        }







    });
});