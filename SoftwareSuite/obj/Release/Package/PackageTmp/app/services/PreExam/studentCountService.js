$(function () {
    'use strict';
    angular.module('app')
        .factory('studentCountService',
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl + "api/StudentCount/";
                var studentCountService = {};

                studentCountService.getStudentCountReport = function (studentCount) {
                    return $http.post(serviceBase + 'GetStudentCountReport', studentCount, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };
                return studentCountService;
        });
}());