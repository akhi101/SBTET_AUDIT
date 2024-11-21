$(function () {
    'use strict';
    angular.module('app')
        .factory('absentDetailService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/AbsentDetail/";
                var absentDetailService = {};

                absentDetailService.getSubjectCategoryByExamID = function (exmSubID, examID) {
                    return $http.post(serviceBase + 'GetSubjectCategoryByExamID?ExmSubID=' + exmSubID + '&ExamID=' + examID).then(function (results) {
                        return results.data;
                    });
                };

                absentDetailService.getStudentDetailsByExamSubject = function (absentEntryDeatil) {
                    return $http.post(serviceBase + 'GetStudentDetailsByExamSubject', absentEntryDeatil).then(function (results) {
                        return results.data;
                    });
                };

                absentDetailService.postAbsentEntry = function (postAbsentEntry) {
                    return $http.post(serviceBase + 'PostAbsentEntry', postAbsentEntry).then(function (results) {
                        return results.data;
                    });
                };

                absentDetailService.getExamTimeTableSubjectListByExamIDBranchID = function (ExamID, BranchID, ExamInstID) {
                    return $http.get(serviceBase + 'GetExamTimeTableSubjectListByExamIDBranchID', { params: { ExamID: ExamID, BranchID: BranchID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };

                absentDetailService.getAbsentEntryReport = function (absentEntryDeatil) {
                    return $http.post(serviceBase + 'GetAbsentEntryReport', absentEntryDeatil, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };
                return absentDetailService;
            });
}());