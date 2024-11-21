$(function () {
    'use strict';
    angular.module('app')
        .factory('EnvEthOTPService', 
        function ($http, AppSettings ) {
                var serviceBase = AppSettings.WebApiUrl + "api/EnvEthOTP/";
                var EnvEthOTPService = {};

                EnvEthOTPService.getPrincipalDetails = function (DistrictIDs, ExmSubID) {
                    return $http.get(serviceBase + 'GetPrincipalDetails', { params: { DistrictIDs: DistrictIDs, ExmSubID: ExmSubID } }).then(function (results) {
                        return results.data;
                    });
                };
                EnvEthOTPService.getExamSubjects = function (CourseID) {
                    return $http.get(serviceBase + 'GetExamSubjects', { params: { CourseID: CourseID } }).then(function (results) {
                        return results.data;
                    });
                };
                EnvEthOTPService.updateMobileNo = function (CollegeID, principal_mobile_no) {
                    return $http.get(serviceBase + 'UpdateMobileNo', { params: { CollegeID: CollegeID, principal_mobile_no: principal_mobile_no } }).then(function (results) {
                        return results.data;
                    });
                };
                //Dieo login(particular college sendOTP(ColCode,ExamDate,Password This Information Pass))
                EnvEthOTPService.sendOTPCode = function (CollegeID, ColCode, ExmSubID, MobileNo) {
                    return $http.get(serviceBase + 'SendOTPCode', { params: { CollegeID: CollegeID, ColCode: ColCode, ExmSubID: ExmSubID, MobileNo: MobileNo } }).then(function (results) {
                        return results.data;
                    });
                }
                EnvEthOTPService.getScheduleDateTime = function (ExmSubID) {
                    return $http.get(serviceBase + 'GetScheduleDateTime', { params: { ExmSubID: ExmSubID } }).then(function (results) {
                        return results.data;
                    });
                }
                return EnvEthOTPService;
        });
}());