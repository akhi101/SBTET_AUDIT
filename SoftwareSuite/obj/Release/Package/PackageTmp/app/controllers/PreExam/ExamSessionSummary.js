(function () {
    'use strict';
    angular.module('app')
        .controller('ExamSessionSummaryController',
        function ($rootScope, $scope, $state, $filter, ExamSessionSummaryService, AppSettings) {
            getExamSessionSummaryDetails();
            var getExamSessionSummaryDetails = function () {
                ExamSessionSummaryService.GetExamSessionDetails($scope.ExamSessionClass.ExamSubject).then(function (results) {
                    $scope.ExamSessionSummaryList = results;
                });
             
            });
}());