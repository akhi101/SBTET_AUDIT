    define(['app'], function (app) {
    
        app.controller("PreAssessmentController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings ) {
       
        $scope.OpenAttendanceCheckList = function () {
            $state.go("PreExam.AttendanceCheckLIstReport");
        };
        $scope.OpenAttendanceSheet = function () {
            $state.go("PreExam.attendanceSheet");
        };
        $scope.OpenExamTimeTable = function () {
            $state.go("PreExam.examTimeTable");
        };
    });
});







