$(function () {
    'use strict';
    angular.module('app')
        .factory('AttendanceEntryService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/AttendanceEntry/";
                var AttendanceEntryService = {};

                AttendanceEntryService.getStudentDetailsByExamSubject = function (AttendanceEntryDeatil) {
                    return $http.post(serviceBase + 'GetStudentDetailsByExamSubject', AttendanceEntryDeatil).then(function (results) {
                        return results.data;
                    });
                };

                AttendanceEntryService.postAttendanceEntry = function (postAttendanceEntry) {
                    return $http.post(serviceBase + 'PostAttendanceEntry', postAttendanceEntry).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.postAttendanceEntryFinalSubmit = function (postAttendanceEntry) {
                    return $http.post(serviceBase + 'postAttendanceEntryFinalSubmit', postAttendanceEntry).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.GetpostAttendanceEntrySingle = function (postAttendanceEntry) {
                    return $http.post(serviceBase + 'GetpostAttendanceEntrySingle', postAttendanceEntry).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.getExamTimeTableSubjectListByExamIDBranchID = function (ExamID, BranchID, ExamInstID) {
                    return $http.get(serviceBase + 'GetExamTimeTableSubjectListByExamIDBranchID', { params: { ExamID: ExamID, BranchID: BranchID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.getPrePractCenterByDistrictId = function (DistrictID, ExamInstID) {
                    return $http.get(AppSettings.WebApiUrl + "api/PrePractCenter/GetPrePractCenterByDistrictId", { params: { DistrictID: DistrictID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.getCheckCenterCollegePresent = function (CollegeID, ExamInstID, CourseID) {
                    return $http.get(AppSettings.WebApiUrl + "api/PreVocationalCenter/getCheckCenterCollegePresentForGeneral", { params: { CollegeID: CollegeID, ExamInstID: ExamInstID, CourseID: CourseID } }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.getCheckCenterCollegePresentByDieo = function (DistrictID, ExamInstID, CourseID) {
                    return $http.get(AppSettings.WebApiUrl + "api/PreVocationalCenter/getCheckCenterCollegePresentByDieo", { params: { DistrictID: DistrictID, ExamInstID: ExamInstID, CourseID: CourseID } }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.getFillBatchData = function (ExamInstID, ExamID, PrePractCntrID, ExmSubID) {
                    return $http.get(serviceBase + 'getFillBatchData', { params: { ExamInstID: ExamInstID, ExamID: ExamID, PrCentreID:PrePractCntrID,ExmSubID: ExmSubID} }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.getExaminerDatabyCenter = function (CollegeID, ExamInstID, ExamID, ExmSubID, ZoneType) {
                    return $http.get(serviceBase + 'getExaminerDatabyCenter', { params: { CollegeID: CollegeID, ExamInstID: ExamInstID, ExamID: ExamID, ExmSubID: ExmSubID, ZoneType: ZoneType } }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.getExaminerDatabyCenterForBulkOTP = function (DistrictIDs, ExamInstID, ExamID, ZoneType) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/getExaminerDatabyCenter", { params: { DistrictIDs: DistrictIDs, ExamInstID: ExamInstID, ExamID: ExamID, ZoneType: ZoneType } }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.PostInsertOTPMarkEntry = function (AttendanceEntryDetailCollege) {
                    return $http.post(AppSettings.WebApiUrl + "api/OTPMarkEntry/PostInsertOTPMarkEntry", AttendanceEntryDetailCollege).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.PostInsertOTPMarkEntryList = function (postAttendanceEntry) {
                    return $http.post(AppSettings.WebApiUrl + "api/OTPMarkEntry/PostInsertOTPMarkEntryList", postAttendanceEntry).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.GetOTPMarkEntryByOTP = function (OTP, ExamInstID, MobileNO, ExamID, ExmSubID, PrePractCntrID) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/GetOTPMarkEntryByOTP", { params: { OTP: OTP, ExamInstID: ExamInstID, MobileNO: MobileNO, ExamID: ExamID, ExmSubID: ExmSubID, PrePractCntrID: PrePractCntrID } }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.GetOTPMarkEntryPresentInOTPTable = function (AttendanceEntryDetailCollege) {
                    return $http.post(AppSettings.WebApiUrl + "api/OTPMarkEntry/PostGetOTPMarkEntryPresentInOTPTable", AttendanceEntryDetailCollege).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.GetGenerateOTP = function (MobileNO) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/GetRandanOTP", { params: { MobileNO: MobileNO } }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.getExamTimeSchedulePresent = function (ExamID, ExamInstID, PrePractCntrID, AttendanceDate, ZoneType) {
                    return $http.get(serviceBase + 'getExamTimeSchedulePresent', { params: { ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, AttendanceDate:AttendanceDate,ZoneType: ZoneType } }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.GetHTNoPresentInPreStudentMarks = function (HTNO, ExamID, ExamInstID, PrePractCntrID, ExmSubID) {
                    return $http.get(serviceBase + 'GetHTNoPresentInPreStudentMarks', { params: { HTNO: HTNO, ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, ExmSubID: ExmSubID } }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.GetHTNoPresentInExamForms = function (HTNO, ExamID, ExamInstID, PrePractCntrID, ExmSubID) {
                    return $http.get(serviceBase + 'GetHTNoPresentInExamForms', { params: { HTNO: HTNO, ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, ExmSubID: ExmSubID } }).then(function (results) {
                        return results.data;
                    });
                };
                AttendanceEntryService.GetExmSubIDNameFromCode = function (ExamID, ExamInstID, ExmSubCode, HTNo, AttendanceDate) {
                    return $http.get(serviceBase + 'GetExmSubIDNameFromCode', { params: { ExamID: ExamID, ExamInstID: ExamInstID, ExmSubCode: ExmSubCode, HTNo: HTNo, AttendanceDate: AttendanceDate } }).then(function (results) {
                        return results.data;
                    });
                };
                return AttendanceEntryService;
            });
}());