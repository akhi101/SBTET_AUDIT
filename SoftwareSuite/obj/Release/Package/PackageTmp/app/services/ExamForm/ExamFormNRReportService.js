$(function () {
    'use strict';
    angular.module('app')
        .factory('ExamFormNRReportService', 
        function ($http, AppSettings ) {
            var serviceBase = AppSettings.WebApiUrl + "api/NRDetail/";
            var ExamFormNRReportService = {};
            ExamFormNRReportService.getExamFormNRPDFReport = function (ExamID, CollegeID, ExamInstID, ReqType) {
                return $http.get(serviceBase + 'GetExamFormNRPDFReport', { params: { ExamID: ExamID, CollegeID: CollegeID, ExamInstID: ExamInstID, ReqType: ReqType }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };
            ExamFormNRReportService.getExamFormNRTextReport = function (ExamID, CollegeID, ExamInstID, ReqType) 
            { 
                return $http.get(serviceBase + 'GetExamFormNRTextReport', { params: { ExamID: ExamID, CollegeID: CollegeID, ExamInstID: ExamInstID, ReqType: ReqType }, responseType: 'arraybuffer' }).then(function (results) 
                {
                        return results.data;
                    });
            };
            return ExamFormNRReportService;
        });
}());