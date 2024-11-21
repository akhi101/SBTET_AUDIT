$(function () {
    'use strict';
    angular.module('app')
        .factory('basicMainGroupService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/BasicMainGroup/";
                var basicMainGroupService = {};

                basicMainGroupService.getAllBasicMainGroup = function (collegeID) {
                    return $http.get(serviceBase + 'GetMainGroupListByCollegeId?CollegeID=' + collegeID).then(function (results) {
                        return results.data;
                    });
                };
                basicMainGroupService.getMainGroupListByCourseID = function (courseID) {
                    return $http.get(serviceBase + 'GetMainGroupListByCourseID?courseID=' + courseID).then(function (results) {
                        return results.data;
                    });
                };
                basicMainGroupService.GetMainGroupListByCollegeIdBranchId = function (collegeID, BranchID) {
                    return $http.get(serviceBase + 'GetMainGroupListByCollegeIdBranchId', { params: { collegeID: collegeID, BranchID: BranchID } }).then(function (results) {
                        return results.data;
                    });
                };
                return basicMainGroupService;
            });
}());