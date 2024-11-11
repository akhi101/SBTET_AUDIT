$(function () {
    'use strict';
    angular.module('app')
        .factory('centerwiseSubjectSummaryService', 
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl + "api/CenterwiseSubjectSummary/";
                var centerwiseSubjectSummaryService = {};

                centerwiseSubjectSummaryService.getCenterwiseSubjectSummary = function (centerwiseSubjectSummary) {
                    return $http.post(serviceBase + 'GetCenterwiseSubjectSummary', centerwiseSubjectSummary, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };
                return centerwiseSubjectSummaryService;
        });
}());