$(function () {
    'use strict';
    angular.module('app')
        .factory('studentDetailsViewService', 
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl + "api/StudentDetailView/";
                var studentDetailViewService = {};

                studentDetailViewService.getStudentDetailViewByHTNO = function (tempStudentDetailView) {
                    return $http.post(serviceBase + 'GetStudentDetailViewByHTNO', tempStudentDetailView ).then(function (results) {
                        return results.data;
                    });
                };

                return studentDetailViewService;
        });
}());