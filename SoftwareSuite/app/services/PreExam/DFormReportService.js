$(function () {
    'use strict';
    angular.module('app')
        .factory('DFormReportService', 
        function ($http, AppSettings ) {

            var serviceBase = AppSettings.WebApiUrl + "api/DForm/";
            var DFormReportService = {};
            DFormReportService.getDFormReportByType = function (ThCentreID, ExamID, ExamInstID, ExmSubID) {
                return $http.get(serviceBase + 'GetDFormReportByType', { params: { ThCentreID: ThCentreID, ExamID: ExamID, ExamInstID: ExamInstID, ExmSubID: ExmSubID} , responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };
            return DFormReportService;
        });
}());