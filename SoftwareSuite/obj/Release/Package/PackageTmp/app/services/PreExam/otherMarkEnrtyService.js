$(function () {
    'use strict';
    angular.module('app')
        .factory('otherMarkEnrtyService', 
        function ($http, AppSettings ) {

                var serviceBase = AppSettings.WebApiUrl + "api/OtherMarkEnrty/";
                var otherMarkEnrtyService = {};

                otherMarkEnrtyService.getCollegeInfo = function (CollegeID) {
                    return $http.get(serviceBase + 'GetCollegeInfo', { params: { CollegeID: CollegeID } }).then(function (results) {
                        return results.data;
                    });
                }; 
                otherMarkEnrtyService.getScheduleDetails = function (CollegeID, ExmSubID) {
                    return $http.get(serviceBase + 'GetScheduleDetails', { params: { CollegeID: CollegeID, ExmSubID: ExmSubID } }).then(function (results) {
                        return results.data;
                    });
                }; 
                otherMarkEnrtyService.getExaminerDetails = function (CollegeID) {
                    return $http.get(serviceBase + 'GetExaminerDetails', { params: { CollegeID: CollegeID } }).then(function (results) {
                        return results.data;
                    });
                };
                otherMarkEnrtyService.getMainGrpDetails = function (CourseID) {
                    return $http.get(serviceBase + 'GetMainGrpDetails', { params: { CourseID: CourseID } }).then(function (results) {
                        return results.data;
                    });
                };
                otherMarkEnrtyService.getHTNoDetails = function (HTNO) {
                    return $http.get(serviceBase + 'GetHTNoDetails', { params: { HTNO: HTNO } }).then(function (results) {
                        return results.data;
                    });
                };
                otherMarkEnrtyService.getPostHTNoDetails = function (HTNO, ExmSubID) {
                    return $http.get(serviceBase + 'GetPostHTNoDetails', { params: { HTNO: HTNO, ExmSubID: ExmSubID } }).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.getPostHTNoDetailsForOntheJobTraining = function (HTNO, ExmSubID, ExamInstID) {
                    return $http.get(serviceBase + 'GetPostHTNoDetailsForOntheJobTraining', { params: { HTNO: HTNO, ExmSubID: ExmSubID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.getMFNumber = function (CollegeID, ExamSubID, CourseID, TypeText) {
                    return $http.get(serviceBase + 'GetMFNumber', { params: { CollegeID: CollegeID, ExamSubID: ExamSubID, CourseID: CourseID, TypeText: TypeText } }).then(function (results) {
                        return results.data;
                    });
                };
                  
                otherMarkEnrtyService.getMFNumberforOJT = function (CollegeID, ExamSubID, CourseID, TypeText ,ExamID) {
                    return $http.get(serviceBase + 'GetMFNumberforOJT', { params: { CollegeID: CollegeID, ExamSubID: ExamSubID, CourseID: CourseID, TypeText: TypeText, ExamID: ExamID } }).then(function (results) {
                        return results.data;
                    });
                };
                
                otherMarkEnrtyService.deleteHTNO = function (RecordID) {
                    return $http.get(serviceBase + 'DeleteHTNO', { params: { RecordID: RecordID } }).then(function (results) {
                        return results.data;
                    });
                };
                otherMarkEnrtyService.getDistrictDetails = function (CollegeID) {
                    return $http.get(serviceBase + 'GetDistrictDetails', { params: { CollegeID: CollegeID } }).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.getStudentDetailsByExamSubject = function (otherMarkEnrtyDeatil) {
                    return $http.post(serviceBase + 'GetStudentDetailsByExamSubject', otherMarkEnrtyDeatil).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.getStudentDetailsByExamSubjectForOntheJobTraining = function (otherMarkEnrtyDeatil) {
                    return $http.post(serviceBase + 'GetStudentDetailsByExamSubjectForOntheJobTraining', otherMarkEnrtyDeatil).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.postOtherMarkEnrty = function (postOtherMarkEnrty) {
                    return $http.post(serviceBase + 'PostOtherMarkEnrty', postOtherMarkEnrty).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.PostOtherMarkEnrtyOntheJobTraining = function (postOtherMarkEnrty) {
                    return $http.post(serviceBase + 'PostOtherMarkEnrtyOntheJobTraining', postOtherMarkEnrty).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.getExamTimeTableSubjectListByExamIDBranchID = function (ExamID, BranchID, ExamInstID) {
                return $http.get(serviceBase + 'GetExamTimeTableSubjectListByExamIDBranchID', { params: { ExamID: ExamID, BranchID: BranchID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.GetOnTheJobTrngExamSubListForMarkEntry = function (ExamID) {
                    return $http.get(serviceBase + 'GetOnTheJobTrngExamSubListForMarkEntry', { params: { ExamID: ExamID } }).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.GetGenVocPractExamSubListForSummeryReport = function (ExamID) {
                    return $http.get(serviceBase + 'GetGenVocPractExamSubListForSummeryReport', { params: { ExamID: ExamID } }).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.GetMainGroupListForOJTMarkEntry = function (ExamID, CollegeID, ExamInstID) {
                    return $http.get(serviceBase + 'GetMainGroupListForOJTMarkEntry', { params: { ExamID: ExamID, CollegeID: CollegeID, ExamInstID: ExamInstID} }).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.getEvalTypeByExmSubID = function (exmSubID) {
                    return $http.get(serviceBase + 'GetEvalTypeByExmSubID', { params: { ExmSubID: exmSubID} }).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.getOtherMarkEnrtyReport = function (otherMarkEnrtyDeatil) {
                    return $http.post(serviceBase + 'GetOtherMarkEnrtyReport', otherMarkEnrtyDeatil, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.postOtherMarkVerification = function (postOtherMarkEnrty) {
                    return $http.post(serviceBase + 'postOtherMarkVerification', postOtherMarkEnrty).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.postOtherMarkVerificationOJT = function (postOtherMarkEnrty) {
                    return $http.post(serviceBase + 'PostOtherMarkVerificationOJT', postOtherMarkEnrty).then(function (results) {
                        return results.data;
                    });
                };

                otherMarkEnrtyService.postExaminerInfo = function (postOtherMarkEnrty) {
                    return $http.post(serviceBase + 'PostExaminerInfo', postOtherMarkEnrty).then(function (results) {
                        return results.data;
                    });
                };
                otherMarkEnrtyService.postOtherMarkHTNO = function (RecordID, HTNO) {
                    return $http.get(serviceBase + 'PostOtherMarkHTNO', { params: { RecordID: RecordID, HTNO: HTNO } }).then(function (results) {
                        return results.data;
                    });
                };
                return otherMarkEnrtyService;
        });
}());