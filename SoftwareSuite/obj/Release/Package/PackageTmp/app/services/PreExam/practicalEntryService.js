$(function () {
    'use strict';
    angular.module('app')
        .factory('practicalEntryService', 
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/PracticalEntry/";
                var practicalEntryService = {};
                
                practicalEntryService.getStudentDetailsByExamSubject = function (practicalEntryDeatil) {
                    return $http.post(serviceBase + 'GetStudentDetailsByExamSubject', practicalEntryDeatil).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.GetStudentDetailsByExamSubjectForVoc = function (practicalEntryDeatil) {
                    return $http.post(serviceBase + 'GetStudentDetailsByExamSubjectForVoc', practicalEntryDeatil).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getStudentDetailsByExamSubjectBridge = function (practicalEntryDeatil) {
                    return $http.post(serviceBase + 'getStudentDetailsByExamSubjectBridge', practicalEntryDeatil).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getStudentDetailsByExamSubjectGeo = function (practicalEntryDeatil) {
                    return $http.post(serviceBase + 'getStudentDetailsByExamSubjectGeo', practicalEntryDeatil).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.postPracticalEntry = function (postPracticalEntry) {
                    return $http.post(serviceBase + 'PostPracticalEntry', postPracticalEntry).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.postPracticalEntryBridge = function (postPracticalEntry) {
                    return $http.post(serviceBase + 'PostPracticalEntryBridge', postPracticalEntry).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.postPracticalEntryFinalSubmit = function (postPracticalEntry) {
                    return $http.post(serviceBase + 'postPracticalEntryFinalSubmit', postPracticalEntry).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExamTimeTableSubjectListByExamIDBranchID = function (ExamID, BranchID, ExamInstID) {
                    return $http.get(serviceBase + 'GetExamTimeTableSubjectListByExamIDBranchID', { params: { ExamID: ExamID, BranchID: BranchID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExamTimeTableSubjectListByExamIDBranchIDForBridge = function (ExamID, BranchID, ExamInstID) {
                    return $http.get(serviceBase + 'GetExamTimeTableSubjectListByExamIDBranchIDForBridge', { params: { ExamID: ExamID, BranchID: BranchID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExamTimeTableSubjectListByExamIDBranchIDForVocPract = function (ExamID, BranchID, ExamInstID, MainGrpID) {
                    return $http.get(serviceBase + 'getExamTimeTableSubjectListByExamIDBranchIDForVocPract', { params: { ExamID: ExamID, BranchID: BranchID, ExamInstID: ExamInstID, MainGrpID: MainGrpID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExamTimeTableSubjectListByExamIDBranchIDForGeo = function (ExamID, BranchID, ExamInstID) {
                    return $http.get(serviceBase + 'GetExamTimeTableSubjectListByExamIDBranchIDForGeo', { params: { ExamID: ExamID, BranchID: BranchID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getPrePractCenterByDistrictId = function (DistrictID, ExamInstID) {
                    return $http.get(AppSettings.WebApiUrl + "api/PrePractCenter/GetPrePractCenterByDistrictId", { params: { DistrictID: DistrictID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getCheckCenterCollegePresent = function (CollegeID, ExamInstID, CourseID) {
                    return $http.get(AppSettings.WebApiUrl + "api/PreVocationalCenter/getCheckCenterCollegePresent", { params: { CollegeID: CollegeID, ExamInstID: ExamInstID, CourseID: CourseID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getCheckCenterCollegePresentForBridge = function (CollegeID, ExamInstID, CourseID) {
                    return $http.get(AppSettings.WebApiUrl + "api/PreVocationalCenter/getCheckCenterCollegePresentForBridge", { params: { CollegeID: CollegeID, ExamInstID: ExamInstID, CourseID: CourseID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getCheckCenterCollegePresentForGeo = function (CollegeID, ExamInstID, CourseID) {
                    return $http.get(AppSettings.WebApiUrl + "api/PreVocationalCenter/getCheckCenterCollegePresentForGeo", { params: { CollegeID: CollegeID, ExamInstID: ExamInstID, CourseID: CourseID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getCheckCenterCollegePresentByDieo = function (DistrictID, ExamInstID, CourseID, CollegeID) {
                    return $http.get(AppSettings.WebApiUrl + "api/PreVocationalCenter/getCheckCenterCollegePresentByDieo", { params: { DistrictID: DistrictID, ExamInstID: ExamInstID, CourseID: CourseID, CollegeID: CollegeID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.GetPrePractCenterByDistrictId = function (DistrictID, ExamInstID) {
                    return $http.get(AppSettings.WebApiUrl + "api/PrePractCenter/GetPrePractCenterByDistrictId", { params: { DistrictID: DistrictID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getFillBatchDataForPrevious = function (ExamInstID, ExamID, PrePractCntrID, ExmSubID, BatchFlag, ZoneType, Prdate, MainGrpID ) {
                    return $http.get(serviceBase + 'getFillBatchDataForPrevious', { params: { ExamInstID: ExamInstID, ExamID: ExamID, PrCentreID: PrePractCntrID, ExmSubID: ExmSubID, BatchFlag: BatchFlag, ZoneType: ZoneType, Prdate: Prdate, MainGrpID: MainGrpID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getFillBatchDataForVocWithDate = function (ExamInstID, ExamID, PrePractCntrID, ExmSubID, BatchFlag, ZoneType, Prdate, MainGrpID) {
                    return $http.get(serviceBase + 'getFillBatchDataForVocWithDate', { params: { ExamInstID: ExamInstID, ExamID: ExamID, PrCentreID: PrePractCntrID, ExmSubID: ExmSubID, BatchFlag: BatchFlag, ZoneType: ZoneType, Prdate: Prdate,MainGrpID: MainGrpID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getFillBatchDataForBridgeWithDate = function (ExamInstID, ExamID, PrePractCntrID, ExmSubID, BatchFlag, ZoneType, Prdate) {
                    return $http.get(serviceBase + 'getFillBatchDataForBridgeWithDate', { params: { ExamInstID: ExamInstID, ExamID: ExamID, PrCentreID: PrePractCntrID, ExmSubID: ExmSubID, BatchFlag: BatchFlag, ZoneType: ZoneType, Prdate: Prdate } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getFillBatchDataForGeoWithDate = function (ExamInstID, ExamID, PrePractCntrID, ExmSubID, BatchFlag, ZoneType, Prdate) {
                    return $http.get(serviceBase + 'getFillBatchDataForGeoWithDate', { params: { ExamInstID: ExamInstID, ExamID: ExamID, PrCentreID: PrePractCntrID, ExmSubID: ExmSubID, BatchFlag: BatchFlag, ZoneType: ZoneType, Prdate: Prdate } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getFillBatchData = function (ExamInstID, ExamID, PrePractCntrID, ExmSubID, BatchFlag,ZoneType,MainGrpID) {
                    return $http.get(serviceBase + 'getFillBatchData', { params: { ExamInstID: ExamInstID, ExamID: ExamID, PrCentreID: PrePractCntrID, ExmSubID: ExmSubID, BatchFlag: BatchFlag, ZoneType: ZoneType, MainGrpID: MainGrpID} }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getFillBatchDataGeo = function (ExamInstID, ExamID, PrePractCntrID, ExmSubID, BatchFlag, ZoneType) {
                    return $http.get(serviceBase + 'getFillBatchDataGeo', { params: { ExamInstID: ExamInstID, ExamID: ExamID, PrCentreID: PrePractCntrID, ExmSubID: ExmSubID, BatchFlag: BatchFlag, ZoneType: ZoneType } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getFillBatchDataGeoWithDate = function (ExamInstID, ExamID, PrePractCntrID, ExmSubID, BatchFlag, ZoneType, Prdate) {
                    return $http.get(serviceBase + 'getFillBatchDataGeoWithDate', { params: { ExamInstID: ExamInstID, ExamID: ExamID, PrCentreID: PrePractCntrID, ExmSubID: ExmSubID, BatchFlag: BatchFlag, ZoneType: ZoneType, Prdate: Prdate} }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExaminerDatabyCenter = function (CollegeID, ExamInstID, ExamID, ExmSubID,ZoneType) {
                    return $http.get(serviceBase + 'getExaminerDatabyCenter', { params: { CollegeID: CollegeID, ExamInstID: ExamInstID, ExamID: ExamID, ExmSubID: ExmSubID, ZoneType: ZoneType} }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExaminerDatabyCenterForVocWithDate = function (CollegeID, ExamInstID, ExamID, ExmSubID, ZoneType, PrDate) {
                    return $http.get(serviceBase + 'getExaminerDatabyCenterForVocWithDate', { params: { CollegeID: CollegeID, ExamInstID: ExamInstID, ExamID: ExamID, ExmSubID: ExmSubID, ZoneType: ZoneType, PrDate: PrDate } }).then(function (results) {
                        return results.data;
                    });
                };
                
                practicalEntryService.getExaminerDatabyCenterForBridgeWithDate = function (CollegeID, ExamInstID, ExamID, ExmSubID, ZoneType, PrDate) {
                    return $http.get(serviceBase + 'getExaminerDatabyCenterForBridgeWithDate', { params: { CollegeID: CollegeID, ExamInstID: ExamInstID, ExamID: ExamID, ExmSubID: ExmSubID, ZoneType: ZoneType, PrDate: PrDate } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExaminerDatabyCenterForGeoWithDate = function (CollegeID, ExamInstID, ExamID, ExmSubID, ZoneType, PrDate,BatchNo) {
                    return $http.get(serviceBase + 'getExaminerDatabyCenterForGeoWithDate', { params: { CollegeID: CollegeID, ExamInstID: ExamInstID, ExamID: ExamID, ExmSubID: ExmSubID, ZoneType: ZoneType, PrDate: PrDate, BatchNo: BatchNo } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExaminerDatabyCenterForPrevious = function (CollegeID, ExamInstID, ExamID, ExmSubID, ZoneType, PrDate) {
                    return $http.get(serviceBase + 'getExaminerDatabyCenterForPrevious', { params: { CollegeID: CollegeID, ExamInstID: ExamInstID, ExamID: ExamID, ExmSubID: ExmSubID, ZoneType: ZoneType, PrDate: PrDate } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExaminerDatabyCenterForBulkOTP = function (DistrictIDs,ExamInstID, ExamID, ZoneType) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/getExaminerDatabyCenter", { params: { DistrictIDs: DistrictIDs, ExamInstID: ExamInstID, ExamID: ExamID,ZoneType: ZoneType } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.PostInsertOTPMarkEntry = function (practicalEntryDetailCollege) {
                    return $http.post(AppSettings.WebApiUrl + "api/OTPMarkEntry/PostInsertOTPMarkEntry", practicalEntryDetailCollege).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.PostInsertOTPMarkEntryList = function (postPracticalEntry) {
                    return $http.post(AppSettings.WebApiUrl + "api/OTPMarkEntry/PostInsertOTPMarkEntryList", postPracticalEntry).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.GetOTPMarkEntryByOTP = function (OTP, ExamInstID, MobileNO, ExamID, ExmSubID, PrePractCntrID) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/GetOTPMarkEntryByOTP", { params: { OTP: OTP, ExamInstID: ExamInstID, MobileNO: MobileNO, ExamID: ExamID, ExmSubID: ExmSubID, PrePractCntrID: PrePractCntrID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.GetOTPMarkEntryPresentInOTPTable = function (practicalEntryDetailCollege) {
                    return $http.post(AppSettings.WebApiUrl + "api/OTPMarkEntry/PostGetOTPMarkEntryPresentInOTPTable", practicalEntryDetailCollege).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.GetOTPMarkEntryPresentInOTPTableForSubmit = function (practicalEntryDetailCollege) {
                    return $http.post(AppSettings.WebApiUrl + "api/OTPMarkEntry/PostGetOTPMarkEntryPresentInOTPTableForSubmit", practicalEntryDetailCollege).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.GetGenerateOTP = function (MobileNO) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/GetRandanOTP", { params: { MobileNO: MobileNO }}).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExamTimeSchedulePresent = function (ExamID, ExamInstID, PrePractCntrID, ZoneType) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/getExamTimeSchedulePresent", { params: { ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, ZoneType: ZoneType } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExamTimeSchedulePresentMorning = function (ExamID, ExamInstID, PrePractCntrID, ZoneType) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/getExamTimeSchedulePresentMorning", { params: { ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, ZoneType: ZoneType } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExamTimeSchedulePresentEvening = function (ExamID, ExamInstID, PrePractCntrID, ZoneType) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/getExamTimeSchedulePresentEvening", { params: { ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, ZoneType: ZoneType } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExamTimeSchedulePresentMorningForVoc = function (ExamID, ExamInstID, PrePractCntrID, ZoneType, PrDate) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/getExamTimeSchedulePresentMorningForVoc", { params: { ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, ZoneType: ZoneType, PrDate: PrDate } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExamTimeSchedulePresentEveningForVoc = function (ExamID, ExamInstID, PrePractCntrID, ZoneType, PrDate) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/getExamTimeSchedulePresentEveningForVoc", { params: { ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, ZoneType: ZoneType, PrDate: PrDate } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getExamTimeScheduleForVocOnlyDate = function (ExamID, ExamInstID, PrePractCntrID, ZoneType, PrDate) {
                    return $http.get(AppSettings.WebApiUrl + "api/OTPMarkEntry/getExamTimeScheduleForVocOnlyDate", { params: { ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, ZoneType: ZoneType, PrDate: PrDate } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.GetHTNoPresentInPreStudentMarks = function (HTNO, ExamID, ExamInstID, PrePractCntrID, ExmSubID) {
                    return $http.get(serviceBase + 'GetHTNoPresentInPreStudentMarks', { params: { HTNO: HTNO, ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, ExmSubID: ExmSubID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.GetHTNoPresentInExamForms = function (HTNO, ExamID, ExamInstID, PrePractCntrID, ExmSubID, BatchNo,ZoneType) {
                    return $http.get(serviceBase + 'GetHTNoPresentInExamForms', { params: { HTNO: HTNO, ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, ExmSubID: ExmSubID, BatchNo: BatchNo, ZoneType: ZoneType } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.GetHTNoPresentInExamFormsForVoc = function (HTNO, ExamID, ExamInstID, PrePractCntrID, ExmSubID, BatchNo, ZoneType, MainGrpID) {
                    return $http.get(serviceBase + 'GetHTNoPresentInExamFormsForVoc', { params: { HTNO: HTNO, ExamID: ExamID, ExamInstID: ExamInstID, PrePractCntrID: PrePractCntrID, ExmSubID: ExmSubID, BatchNo: BatchNo, ZoneType: ZoneType, MainGrpID: MainGrpID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.GetBasicMainGroupForVocPract = function (PrePractCntrID) {
                    return $http.get(serviceBase + 'GetBasicMainGroupForVocPract', { params: { PrePractCntrID: PrePractCntrID }}).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.GetBasicMainGroupForVocPractWithDate = function (PrePractCntrID,PrDate) {
                    return $http.get(serviceBase + 'GetBasicMainGroupForVocPractWithDate', { params: { PrePractCntrID: PrePractCntrID, PrDate: PrDate } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalEntryService.getdatecompareforvoc = function (PrDate) {
                    return $http.get(serviceBase + 'getdatecompareforvoc', { params: { PrDate: PrDate } }).then(function (results) {
                        return results.data;
                    });
                };
                return practicalEntryService;
        });
}());