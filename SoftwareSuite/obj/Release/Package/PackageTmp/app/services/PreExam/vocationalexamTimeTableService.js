$(function () {
    'use strict';
    angular.module('app')
        .factory('vocationalexamTimeTableService',
            function ($http, $q, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/examTimeTable/";
                var vocationalexamTimeTableService = {};

                vocationalexamTimeTableService.putExamTimeTable = function (examTimeTable) {
                    return $http.post(serviceBase + 'PostExamTimeTable', examTimeTable).then(function (results) {
                        return results.data;
                    });
                };
               
                return vocationalexamTimeTableService;
            });
}());