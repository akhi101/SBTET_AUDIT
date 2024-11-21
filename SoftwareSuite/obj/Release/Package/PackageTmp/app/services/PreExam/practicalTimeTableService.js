$(function () {
    'use strict';
    angular.module('app')
        .factory('practicalTimeTableService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl +"api/PracticalTimeTable/";
                var practicalTimeTableService = {};
                
                practicalTimeTableService.getPracticalTimeTableSubjectByExamIDBranchID = function (ExamID, BranchID, ExamInstID) {
                    return $http.get(serviceBase + 'GetPracticalTimeTableSubjectByExamIDBranchID', { params: { ExamID: ExamID, BranchID: BranchID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };
                practicalTimeTableService.putPracticalTimeTable = function (practicalTimeTable) {
                    return $http.post(serviceBase + 'PostPracticalTimeTable', practicalTimeTable).then(function (results) {
						return results.data;
					});
                };

                practicalTimeTableService.postPracticalTimeTableApprovalStatus = function (practicalTimeTableApprovalDetail) {
                    return $http.post(serviceBase + 'PostPracticalTimeTableApproval', practicalTimeTableApprovalDetail).then(function (results) {
                        return results.data;
                    });
                };

                practicalTimeTableService.getPracticalTimeTableReport = function (practicalTimeTableDetail) {
                    return $http.post(serviceBase + 'GetPracticalTimeTableReport', practicalTimeTableDetail, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };

                practicalTimeTableService.getPracticalTimeTableSubjectListByExamIDBranchID = function (examID, branchID) {
                    return $http.get(serviceBase + 'GetPracticalTimeTableSubjectListByExamIDBranchID', { params: { ExamID: examID, BranchID: branchID } }).then(function (results) {
                        return results.data;
                    });
                };

                practicalTimeTableService.getPracticalTimeTableByExamIDBranchID = function (ExamID, BranchID, ExamInstID) {
                    return $http.get(serviceBase + 'GetPracticalTimeTableByExamIDBranchID', { params: { ExamID: ExamID, BranchID: BranchID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };
                
                
                return practicalTimeTableService;
        });
}());