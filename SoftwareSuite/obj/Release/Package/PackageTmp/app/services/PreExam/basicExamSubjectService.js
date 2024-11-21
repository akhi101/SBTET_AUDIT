$(function () {
    'use strict';
    angular.module('app')
        .factory('basicExamSubjectService',
            function ($http, $q, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/BasicExamSubject/";
                var basicExamSubjectService = {};

                basicExamSubjectService.getBasicExamSubjectListByExamID = function (examId) {
                    return $http.get(serviceBase + 'GetBasicExamSubjectListByExamID', { params: { ExamId: examId } }).then(function (results) {
                        return results.data;
                    });
                };

                basicExamSubjectService.getExamSubjectFromMainGroupIDForVocationalTimeTable = function (MainGrpID, ExamID) {
                    return $http.get(serviceBase + 'GetExamSubjectFromMainGroupIDForVocationalTimeTable', { params: { MainGrpID: MainGrpID, ExamID: ExamID } }).then(function (results) {
                        return results.data;
                    });
                };

                basicExamSubjectService.getExamSubjectForCenterWiseSummeryReport = function (ExamID, ExamInstID, DistrictID, PreZoneCntrID) {
                    return $http.get(serviceBase + 'GetExamSubjectForCenterWiseSummeryReport', { params: { ExamID: ExamID, ExamInstID: ExamInstID, DistrictID: DistrictID, PreZoneCntrID: PreZoneCntrID } }).then(function (results) {
                        return results.data;
                    });
                };

                return basicExamSubjectService;
            });
}());