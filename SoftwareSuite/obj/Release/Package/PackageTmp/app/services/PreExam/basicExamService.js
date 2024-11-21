$(function () {
    'use strict';
    angular.module('app')
        .factory('basicExamService',
        function ($http, AppSettings ) {

            var serviceBase = AppSettings.WebApiUrl +"api/BasicExam/";
                var basicExamService = {};
                
                basicExamService.getAllBasicExam = function () {
                    return $http.get(serviceBase + 'GetBasicExamList').then(function (results) {
                        return  results.data;
                    });
                };

            basicExamService.getBasicExamListByCourseID = function (CourseID) {
                return $http.get(serviceBase + 'GetBasicExamListByCourseID', { params: { CourseID: CourseID } }).then(function (results) {
                        return results.data;
                    });
                };
               
                return basicExamService;
            });
}());