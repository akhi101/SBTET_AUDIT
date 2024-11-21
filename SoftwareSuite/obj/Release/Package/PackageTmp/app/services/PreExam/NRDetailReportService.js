$(function () {
    'use strict';
    angular.module('app')
        .factory('NRDetailReportService', 
        function ($http, AppSettings ) {

            var serviceBase = AppSettings.WebApiUrl + "api/NRDetail/";
            var NRDetailReportService = {};
            NRDetailReportService.getNRDetailByType = function (ExamID, CollegeID, ExamInstID, ReqType) //ExamID, MainGrpID, DistrictID, CollegeID, ExamInstID GetClgExmFrmNRDetailByType
            { 
                return $http.get(serviceBase + 'GetClgExmFrmNRDetailByType', { params: { ExamID: ExamID, CollegeID: CollegeID, ExamInstID: ExamInstID, ReqType: ReqType }, responseType: 'arraybuffer' }).then(function (results) //ExamID: ExamID, MainGrpID: MainGrpID, DistrictID: DistrictID, CollegeID: CollegeID, ExamInstID: ExamInstID
                {
                        return results.data;
                    });
            };

            NRDetailReportService.getNRDetailByPDF = function (ExamID, CollegeID, ExamInstID, ReqType) //ExamID, MainGrpID, DistrictID, CollegeID, ExamInstID GetClgExmFrmNRDetailByType
            {
                return $http.get(serviceBase + 'GetClgExmFrmNRDetail', { params: { ExamID: ExamID, CollegeID: CollegeID, ExamInstID: ExamInstID, ReqType: ReqType }, responseType: 'arraybuffer' }).then(function (results) //ExamID: ExamID, MainGrpID: MainGrpID, DistrictID: DistrictID, CollegeID: CollegeID, ExamInstID: ExamInstID
                {
                    return results.data;
                });
            };
            return NRDetailReportService;
        });
}());