$(function () {
    'use strict';
    angular.module('app')
        .factory('PreExamNRReportService', 
        function ($http, AppSettings ) {

            var serviceBase = AppSettings.WebApiUrl + "api/NRDetail/";
            var PreExamNRReportService = {};
            PreExamNRReportService.getPreExamNRPDFReport = function (ExamID, ExamInstID, CollegeID, TypeID)  {
                return $http.get(serviceBase + 'GetPreExamNRPDFReport', { params: { ExamID: ExamID, ExamInstID: ExamInstID, CollegeID: CollegeID, TypeID: TypeID }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };
            PreExamNRReportService.getPreExamNRTextReport = function (ExamID, ExamInstID, CollegeID)  {
                return $http.get(serviceBase + 'getPreExamNRTextReport', { params: { ExamID: ExamID, ExamInstID: ExamInstID, CollegeID: CollegeID }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };
            PreExamNRReportService.getPreExamNRPDFReportBridge = function (ExamID, ExamInstID, CollegeID) {
                return $http.get(serviceBase + 'GetPreExamNRPDFReportBridge', { params: { ExamID: ExamID, ExamInstID: ExamInstID, CollegeID: CollegeID }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };
            PreExamNRReportService.getNRStudentsByCollege = function (CollegeID, HTNO, ExamInstID) {
                return $http.get(serviceBase + 'GetNRStudentsByCollege', { params: { CollegeID: CollegeID, HTNO: HTNO, ExamInstID: ExamInstID } }).then(function (results) {
                    return results.data;
                });
            };
            PreExamNRReportService.postPhotoCorrectionData = function (StudData) {
                return $http.post(serviceBase + 'PostPhotoCorrectionData', StudData).then(function (results) {
                    return results.data;
                });
            };
            return PreExamNRReportService;
        });
}());