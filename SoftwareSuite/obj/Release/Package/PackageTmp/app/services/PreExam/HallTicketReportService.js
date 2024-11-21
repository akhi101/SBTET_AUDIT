$(function () {
    'use strict';
    angular.module('app')
        .factory('HallTicketReportService', 
        function ($http, AppSettings ) {

            var serviceBase = AppSettings.WebApiUrl + "api/HallTicket/";
            var HallTicketReportService = {};
            HallTicketReportService.GetHallTicketPDFReport = function (ExamID, ExamInstID, CollegeID) 
            {
                return $http.get(serviceBase + 'GetHallTicketPDFReport', { params: { ExamID: ExamID, ExamInstID: ExamInstID, CollegeID: CollegeID }, responseType: 'arraybuffer' }).then(function (results) //ExamID: ExamID, MainGrpID: MainGrpID, DistrictID: DistrictID, CollegeID: CollegeID, ExamInstID: ExamInstID
                {
                    return results.data;
                });
            };

            HallTicketReportService.GetEnvEthHallTicketPDFReport = function (ExamID, ExamInstID, CollegeID) {
                return $http.get(serviceBase + 'GetEnvEthHallTicketPDFReport', { params: { ExamID: ExamID, ExamInstID: ExamInstID, CollegeID: CollegeID }, responseType: 'arraybuffer' }).then(function (results) //ExamID: ExamID, MainGrpID: MainGrpID, DistrictID: DistrictID, CollegeID: CollegeID, ExamInstID: ExamInstID
                {
                    return results.data;
                });
            };

            HallTicketReportService.GetPracticalsHallTicketPDFReport = function (ExamID, ExamInstID, CollegeID) {
                return $http.get(serviceBase + 'GetPracticalsHallTicketPDFReport', { params: { ExamID: ExamID, ExamInstID: ExamInstID, CollegeID: CollegeID }, responseType: 'arraybuffer' }).then(function (results) //ExamID: ExamID, MainGrpID: MainGrpID, DistrictID: DistrictID, CollegeID: CollegeID, ExamInstID: ExamInstID
                {
                    return results.data;
                });
            };


            return HallTicketReportService;

            
        });
}());