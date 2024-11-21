define(['app'], function (app) {
    app.controller("SeatingArrangementController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {

        $scope.Exams = [
          { id: 1, exam: "Mid 1" },
          { id: 2, exam: "Mid 2" },
          { id: 5, exam: "Semester" }
        ];

        $scope.TimeSlots = [
         { id: 1, time: "10AM - 12PM" },
         { id: 2, time: "2PM - 4PM" }
        ];
        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });


        $scope.changedExamType = function () {
            $scope.DetailsFound = false;
            if ($scope.StudentTypeId != "") {
                var getCurrentExamDates = PreExaminationService.CurrentExamDatesForNr($scope.StudentTypeId, $scope.examTypeId);
                getCurrentExamDates.then(function (response) {
                    if (response.Table.length > 0) {
                        $scope.ExamDates = response.Table;
                    } else {
                        $scope.ExamDates = [];
                        alert("No ExamDates Founded");
                    }
                },
                    function (error) {
                        alert("error while loading Exam Dates");
                        console.log(error);
                    });
            }
        }
    })
})