$(function () {
    'use strict';
    angular.module('app')
        .factory('preExaminerAppointmentReportService', 
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/PreExaminerAppointments/";
                var preExaminerAppointmentReportService = {};

                preExaminerAppointmentReportService.getExaminerAppointmentReport = function (preExaminerAppointments) {
                    return $http.post(serviceBase + 'GetExaminerAppointmentReport', preExaminerAppointments, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentReportService.getPreExaminerAppointmentsOrderByExaminerID = function (InstanceID, ExaminerID, EvalTypeID, ExamID, AppointmentID, DistrictID, ZoneType,CollegeID) {
                    return $http.get(serviceBase + 'GetPreExaminerAppointmentsOrderByExaminerID', { params: { InstanceID: InstanceID, ExaminerID: ExaminerID, EvalTypeID: EvalTypeID, ExamID: ExamID, AppointmentID: AppointmentID, DistrictID: DistrictID, ZoneType: ZoneType, CollegeID: CollegeID }, responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentReportService.getExaminerListByCollegeID = function (collegeID) {
                    return $http.get(serviceBase + 'GetExaminerList', { params: { CollegeID: collegeID} }).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentReportService.GetExaminerListByCollegeIDForOrderReport = function (collegeID, ExamID) {
                    return $http.get(serviceBase + 'GetExaminerListByCollegeIDForOrderReport', { params: { CollegeID: collegeID, ExamID: ExamID } }).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentReportService.getExaminerAppointmentTextReport = function (preExaminerAppointments) {
                    return $http.post(serviceBase + 'getExaminerAppointmentTextReport', preExaminerAppointments, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentReportService.getBasicDistrictListByUserId = function (updLoginID) {
                    return $http.get(serviceBase + 'GetBasicDistrictListByUserId', { params: { UpdLoginID: updLoginID } }).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentReportService.GetPracticalCenterListByDistrictIDANDZoneType = function (ExamInstID, ZoneType, DistrictID) {
                    return $http.get(serviceBase + 'GetPracticalCenterListByDistrictIDANDZoneType', { params: { ExamInstID: ExamInstID, ZoneType: ZoneType, DistrictID: DistrictID } }).then(function (results) {
                        return results.data;
                    });
                };

                return preExaminerAppointmentReportService;
        });
}());