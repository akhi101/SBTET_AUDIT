$(function () {
    'use strict';
    angular.module('app')
        .factory('attendanceSheetService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/AttendanceSheet/";
                var attendanceSheetService = {};

                attendanceSheetService.getAttendanceSheetReportByType = function (ThCentreID, ExamID, ExamInstID) {
                    return $http.get(serviceBase + 'GetAttendanceSheetReportByType', { params: { ThCentreID: ThCentreID, ExamID: ExamID, ExamInstID: ExamInstID }, responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };
                return attendanceSheetService;
            });
}());