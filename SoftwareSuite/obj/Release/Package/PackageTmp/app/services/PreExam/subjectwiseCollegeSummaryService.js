$(function () {
    'use strict';
    angular.module('app')
        .factory('subjectwiseCollegeSummaryService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/SubjectwiseCollegeSummary/";
                var subjectwiseCollegeSummaryService = {};

                subjectwiseCollegeSummaryService.getSubjectwiseCollegeSummary = function (subjectwiseCollegeSummary) {
                    return $http.post(serviceBase + 'GetSubjectwiseCollegeSummary', subjectwiseCollegeSummary, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };
                return subjectwiseCollegeSummaryService;
        });
}());