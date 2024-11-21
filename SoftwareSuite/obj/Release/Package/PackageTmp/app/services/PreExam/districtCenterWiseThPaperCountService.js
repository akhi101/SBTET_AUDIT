$(function () {
    'use strict';
    angular.module('app')
        .factory('districtCenterWiseThPaperCountService', 
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl + "api/PreExaminerAppointments/";
                var districtCenterWiseThPaperCountService = {};

                districtCenterWiseThPaperCountService.getDistrictAndCenterWiseReport = function (instanceID, examID, districtID, preZoneCntrID) {//, DistrictID: districtID, CenterCollegeID: preZoneCntrID
                    return $http.get(serviceBase + 'GetDistrictAndCenterWiseReport', { params: { InstanceID: instanceID, ExamID: examID,DistrictID: districtID, CenterID: preZoneCntrID  } , responseType: 'arraybuffer'}).then(function (results) {
                        return results.data;
                        return results.data;
                    });
                };
            //var serviceBase = AppSettings.WebApiUrl + "api/PreExaminerAppointments/";
            //var districtCenterWiseThPaperCountService = {};

            districtCenterWiseThPaperCountService.getDistrictAndCenterWiseDataOtherSub = function (instanceID, examID, districtID, preZoneCntrID) {//, DistrictID: districtID, CenterCollegeID: preZoneCntrID
                return $http.get(serviceBase + 'GetDistrictAndCenterWiseDataOtherSub', { params: { InstanceID: instanceID, ExamID: examID, DistrictID: districtID, CenterID: preZoneCntrID }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };
                //districtCenterWiseThPaperCountService.getExamTimeTableSubjectListByExamIDBranchID = function (examID, branchID) {
                //	return $http.get(serviceBase + 'GetExamTimeTableSubjectListByExamIDBranchID', { params: { ExamID: examID, BranchID: branchID } }).then(function (results) {
                //		return results.data;
                //	});
                //};

            districtCenterWiseThPaperCountService.GetQPChartDistrictWise = function (ExamInstID, ExamID, DistrictID) { 
                return $http.get(serviceBase + 'GetQPChartDistrictWise', { params: { ExamInstID: ExamInstID, ExamID: ExamID, DistrictID: DistrictID }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };
            districtCenterWiseThPaperCountService.GetQPChartDistrictWiseOld = function (ExamInstID, ExamID, DistrictID) {
                return $http.get(serviceBase + 'GetQPChartDistrictWiseOld', { params: { ExamInstID: ExamInstID, ExamID: ExamID, DistrictID: DistrictID }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };


            districtCenterWiseThPaperCountService.GetQPChartCenterWise = function (ExamInstID, ExamID, CenterCollegeID) { 
                return $http.get(serviceBase + 'GetQPChartCenterWise', { params: { ExamInstID: ExamInstID, ExamID: ExamID, CenterCollegeID: CenterCollegeID }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };
            districtCenterWiseThPaperCountService.GetQPChartCenterWiseOld = function (ExamInstID, ExamID, CenterCollegeID) {
                return $http.get(serviceBase + 'GetQPChartCenterWiseOld', { params: { ExamInstID: ExamInstID, ExamID: ExamID, CenterCollegeID: CenterCollegeID }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };

            districtCenterWiseThPaperCountService.GetQPChartBulk = function (ExamInstID, ExamID) {
                return $http.get(serviceBase + 'GetQPChartBulk', { params: { ExamInstID: ExamInstID, ExamID: ExamID }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };
            districtCenterWiseThPaperCountService.GetQPChartBulkOld = function (ExamInstID, ExamID) {
                return $http.get(serviceBase + 'GetQPChartBulkOld', { params: { ExamInstID: ExamInstID, ExamID: ExamID }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };
            districtCenterWiseThPaperCountService.GetDistrictWiseExaminerCount = function (DistrictID, ExamID, CourseID) {
                return $http.get(serviceBase + 'GetDistrictWiseExaminerCount', { params: { DistrictID: DistrictID, ExamID: ExamID, CourseID: CourseID }, responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };

            return districtCenterWiseThPaperCountService;
        });
}());