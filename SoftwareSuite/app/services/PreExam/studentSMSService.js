$(function () {
    'use strict';
    angular.module('app')
        .factory('studentSMSService', 
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/StudentSMS/";
                var studentSMSService = {};

                studentSMSService.getStudentInfoByHTNO = function (HTNo, ExamInstID) {
                    return $http.get(serviceBase + 'GetStudentInfoByHTNo', { params: { HTNo: HTNo, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };

                studentSMSService.sendStudentSMS = function (studentSmsDetail) {
                    return $http.post(serviceBase + 'SendSMSToStudent', studentSmsDetail).then(function (results) {
                        return results.data;
                    });
                };

                return studentSMSService;
        });
}());