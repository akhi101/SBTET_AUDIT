$(function () {
    'use strict';
    angular.module('app')
        .factory('PracticalQPDownloadService', 
        function ($http, AppSettings ) {
            var serviceBase = AppSettings.WebApiUrl + "api/PracticalQPDownload/";
                var PracticalQPDownloadService = {};
                PracticalQPDownloadService.getGeneralPracticalSubjects = function (CollegeID) {
                    return $http.get(serviceBase + 'GetGeneralPracticalSubjects', { params: { CollegeID: CollegeID }}).then(function (results) {
                        return results.data;
                    });
                };
                PracticalQPDownloadService.getExamList = function (CollegeID) {
                    return $http.get(serviceBase + 'GetExamList', { params: { CollegeID: CollegeID } }).then(function (results) {
                        return results.data;
                    });
                };
                PracticalQPDownloadService.getVocationalCourses = function (ExamID, MainGrpID) {
                    return $http.get(serviceBase + 'GetVocationalCourses', { params: { ExamID: ExamID, MainGrpID: MainGrpID } }).then(function (results) {
                        return results.data;
                    });
                };
                return PracticalQPDownloadService;
        });
}());