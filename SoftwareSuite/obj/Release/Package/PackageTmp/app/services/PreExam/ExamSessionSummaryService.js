$(function () {
    'use strict';
    angular.module('app')
        .factory('ExamSessionSummaryService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/ExamSessionSummary/";
                var ExamSessionSummaryService = {};

                ExamSessionSummaryService.GetExamSessionDetails = function (ExamSessionSummary) {
                    return $http.post(serviceBase + 'GetExamSessionDetails', AttendanceEntryDeatil).then(function (results) {
                        return results.data;
                    });
                };

              
                return ExamSessionSummaryService;
            });
}());