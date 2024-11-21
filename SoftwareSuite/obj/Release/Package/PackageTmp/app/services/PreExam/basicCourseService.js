$(function () {
    'use strict';
    angular.module('app')
        .factory('basicCourseService',
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl +"api/BasicCourse/";
                var basicCourseService = {};
                
                basicCourseService.getAllBasicCourse = function () {
                    return $http.get(serviceBase + 'GetBasicCourseList').then(function (results) {
                        return  results.data;
                    });
                };
                basicCourseService.getAllBasicCourseByCourseID = function (CourseID) {
                    return $http.get(serviceBase + 'GetBasicCourseListByID', { params: { CourseID: CourseID } }).then(function (results) {
                        return results.data;
                    });
                };
                basicCourseService.GetCourseListForRegStud = function (collegeID, acdYrID) {
                return $http.get(serviceBase + 'GetCourseListForRegStud', { params: { CollegeID: collegeID, AcdYrID: acdYrID } }).then(function (results) {
                        return results.data;
                    });
                };
                return basicCourseService;
            });
}());