$(function () {
    'use strict';
    angular.module('app')
        .factory('basicCollegeService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/BasicCollege/";
                var basicCollegeService = {};

                basicCollegeService.getAllBasicCollege = function () {
                    return $http.get(serviceBase + 'GetBasicCollegeList').then(function (results) {
                        return results.data;
                    });
                };
                basicCollegeService.getCollegeListByDistrict = function (districtId) {
                    return $http.get(serviceBase + 'GetCollegeListByDistrict', { params: { DistrictID: districtId } }).then(function (results) {
                        return results.data;
                    });
                };
                basicCollegeService.getTheroyExamCenterCollegeList = function (DistrictId, ExamInstID) {
                    return $http.get(serviceBase + 'GetTheroyExamCenterCollegeList', { params: { DistrictID: DistrictId, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };
                basicCollegeService.GetBasicCollegeByCollegeID = function (CollegeID) {
                    return $http.get(serviceBase + 'GetBasicCollegeByCollegeID', { params: { CollegeID: CollegeID } }).then(function (results) {
                        return results.data;
                    });
                };

                basicCollegeService.GetCollegeListByDistrictUpdLoginID = function (DistrictID, UpdLoginID) {
                    return $http.get(serviceBase + 'GetCollegeListByDistrictUpdLoginID', { params: { DistrictID: DistrictID, UpdLoginID: UpdLoginID } }).then(function (results) {
                        return results.data;
                    });
                };
                
                return basicCollegeService;
            });
}());