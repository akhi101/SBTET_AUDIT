$(function () {
    'use strict';
    angular.module('app')
        .factory('subjectwiseCenterSummaryService', 
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/SubjectwiseCenterSummary/";
                var subjectwiseCenterSummaryService = {};

                subjectwiseCenterSummaryService.getSubjectwiseCenterSummary = function (subjectwiseCenterSummary) {
                    return $http.post(serviceBase + 'GetSubjectwiseCenterSummary', subjectwiseCenterSummary, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };
                return subjectwiseCenterSummaryService;
        });
}());