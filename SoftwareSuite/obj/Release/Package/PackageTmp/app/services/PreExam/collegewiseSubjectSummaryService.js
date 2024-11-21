$(function () {
    'use strict';
    angular.module('app')
        .factory('collegewiseSubjectSummaryService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/CollegewiseSubjectSummary/";
                var collegewiseSubjectSummaryService = {};

                collegewiseSubjectSummaryService.getCollegewiseSubjectSummary = function (collegewiseSubjectSummary) {
                    return $http.post(serviceBase + 'GetCollegewiseSubjectSummary', collegewiseSubjectSummary, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };
                return collegewiseSubjectSummaryService;
        });
}());