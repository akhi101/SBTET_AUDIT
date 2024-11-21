$(function () {
    'use strict';
    angular.module('app')
        .factory('examTimeTableService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/examTimeTable/";
                var examTimeTableService = {};

                examTimeTableService.getExamTimeTableSubjectByExamIDBranchID = function (examID, branchID, examInstID) {
                    return $http.get(serviceBase + 'GetExamTimeTableSubjectByExamIDBranchID', { params: { ExamID: examID, BranchID: branchID, ExamInstID: examInstID } }).then(function (results) {
                        return results.data;
                    });
                };
                examTimeTableService.getExamTimeTableByExamIDBranchID = function (examID, branchID, examInstID) {
                    return $http.get(serviceBase + 'GetExamTimeTableByExamIDBranchID', { params: { ExamID: examID, BranchID: branchID, ExamInstID: examInstID } }).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.putExamTimeTable = function (examTimeTable) {
                    return $http.post(serviceBase + 'PostExamTimeTable', examTimeTable).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.PutvocationalPracticalBatchTimeTable = function (vocationalPracticalBatchTimeTable) {
                    return $http.post(AppSettings.WebApiUrl + "api/PracticalTimeTable/PostvocationalPracticalBatchTimeTable", vocationalPracticalBatchTimeTable).then(function (results) {
                        return results.data;
                    });
                };
                examTimeTableService.PutvocationalPracticalBatchTimeTableBridge = function (vocationalPracticalBatchTimeTable) {
                    return $http.post(AppSettings.WebApiUrl + "api/PracticalTimeTable/PostvocationalPracticalBatchTimeTableBridge", vocationalPracticalBatchTimeTable).then(function (results) {
                        return results.data;
                    });
                };
                examTimeTableService.PutvocationalPracticalBatchTimeTableGeo = function (vocationalPracticalBatchTimeTable) {
                    return $http.post(AppSettings.WebApiUrl + "api/PracticalTimeTable/PostvocationalPracticalBatchTimeTableGeo", vocationalPracticalBatchTimeTable).then(function (results) {
                        return results.data;
                    });
                };
                examTimeTableService.postExamTimeTableApprovalStatus = function (examTimeTableApprovalDetail) {
                    return $http.post(serviceBase + 'PostExamTimeTableApproval', examTimeTableApprovalDetail).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.GetExamTimeTableReport = function (ExamTimeTableDetail) {
                    return $http.post(serviceBase + 'GetExamTimeTableReport', ExamTimeTableDetail, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };
                
                examTimeTableService.getExamTimeTableSubjectListByExamIDBranchID = function (ExamID, BranchID, ExamInstID) {
                    return $http.get(serviceBase + 'GetExamTimeTableSubjectListByExamIDBranchID', { params: { ExamID: ExamID, BranchID: BranchID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.putVocationalExamTimeTable = function (examTimeTable) {
                    return $http.post(serviceBase + 'PostVocationalExamTimeTable', examTimeTable).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.getVocationalExamTimeTableByExamIDMainGrpID = function (ExamID, MainGrpID, ExamInstID) {
                    return $http.get(serviceBase + 'GetVocationalExamTimeTableByExamIDMainGrpID', { params: { ExamID: ExamID, MainGrpID: MainGrpID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.getVocationalExamTimeTableSubjectByExamIDMainGrpID = function (ExamID, MainGrpID, ExamInstID) {
                    return $http.get(serviceBase + 'GetVocationalExamTimeTableSubjectByExamIDMainGrpID', { params: { ExamID: ExamID, MainGrpID: MainGrpID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.postVocationalExamTimeTableApproval = function (examTimeTableApprovalDetail) {
                    return $http.post(serviceBase + 'PostVocationalExamTimeTableApproval', examTimeTableApprovalDetail).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.GetVocationalExamTimeTableReport = function (examTimeTableDetail) {
                    return $http.post(serviceBase + 'GetVocationalExamTimeTableReport', examTimeTableDetail, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.GetBridgeOrOtherSubjectExamTimeTableReport = function (examTimeTableDetail) {
                    return $http.post(serviceBase + 'GetBridgeOrOtherSubjectExamTimeTableReport', examTimeTableDetail, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };


                examTimeTableService.GetBridgeCourseExamSubjectListByExamID = function (ExamID, SubjectTypeID, EvalTypeID) {
                    return $http.get(serviceBase + 'GetBridgeCourseExamSubjectListByExamID', { params: { ExamID: ExamID, SubjectTypeID: SubjectTypeID, EvalTypeID: EvalTypeID } }).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.putBridgeOROtherExamTimeTable = function (examTimeTable) {
                    return $http.post(serviceBase + 'PostBridgeOROtherExamTimeTable', examTimeTable).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.GetBridgeCourseExamTimeTableExamID = function (ExamID, SubjectTypeID, ExamInstID, EvalTypeID) {
                    return $http.get(serviceBase + 'GetBridgeCourseExamTimeTableExamID', { params: { ExamID: ExamID, SubjectTypeID: SubjectTypeID, ExamInstID: ExamInstID, EvalTypeID: EvalTypeID } }).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.postBridgeOROtherExamTimeTableApproval = function (examTimeTableApprovalDetail) {
                    return $http.post(serviceBase + 'PostBridgeOROtherExamTimeTableApproval', examTimeTableApprovalDetail).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.GETGeneralStreamExamTimeTable = function (ExamID, TTFlag) {
                    return $http.get(serviceBase + 'GETGeneralStreamExamTimeTable', { params: { ExamID: ExamID, TTFlag: TTFlag } }).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.GetGeneralExamTimeTablereportByCourseIDANDExamID = function ( CourseID, ExamID) {
                    return $http.get(serviceBase + 'GetGeneralExamTimeTablereportByCourseIDANDExamID', { params: { CourseID: CourseID, ExamID: ExamID } }, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.putGeneralExamTimeTable = function (examTimeTable) {
                    return $http.post(serviceBase + 'PostGeneralExamTimeTable', examTimeTable).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.getGeneralStreamExamTimeTableReport = function (examTimeTableDetail) {
                    return $http.post(serviceBase + 'GetGeneralStreamExamTimeTableReport', examTimeTableDetail, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.getGeneratedGeneralExamTimereport = function (examTimeTableDetail) {
                    return $http.post(serviceBase + 'GetGeneratedGeneralExamTimereport', examTimeTableDetail, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.postProcessGenerateTheoryExamTimeTable = function (ExamTimeTable) {
                    return $http.post(serviceBase + 'PostProcessGenerateTheoryExamTimeTable', ExamTimeTable).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.postProcessGeneratePracticalExamTimeTable = function (ExamTimeTable) {
                    return $http.post(serviceBase + 'PostProcessGeneratePracticalExamTimeTable', ExamTimeTable).then(function (results) {
                        return results.data;
                    });
                };

                examTimeTableService.GetExaminerAvailable = function (AppointMentDate, InstanceID, ExaminerID) {
                    return $http.get(serviceBase + 'GetExaminerAvailable', { params: { AppointMentDate: AppointMentDate, InstanceID: InstanceID, ExaminerID: ExaminerID } }).then(function (results) {
                        return results.data;
                    });
                };
                //examTimeTableService.GetGeneratedGeneralExamTimereport = function () {
                //    return $http.get(serviceBase + 'GetGeneratedGeneralExamTimereport').then(function (results) {
                //        return results.data;
                //    });
                //};

                return examTimeTableService;
            });
}()); 