$(function () {
    'use strict';
    angular.module('app')
        .factory('basicZoneService', 
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl + "api/PreZone/";
                var basicZoneService = {};

            basicZoneService.getZoneList = function (ExamInstID) {
                return $http.get(serviceBase + 'GetPreZoneList', { params: { ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
            };

            basicZoneService.getZoneListByDistAndType = function (ExamInstID, ZoneType, DistrictIDs) {
                return $http.get(serviceBase + 'GetPreZoneList', { params: { ExamInstID: ExamInstID, ZoneType: ZoneType , DistrictIDs: DistrictIDs } }).then(function (results) {
                    return results.data;
                });
            };

            basicZoneService.getZoneCenterList = function (ExamInstID) {
                return $http.get(serviceBase + 'GetZoneCenterList', { params: { ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
            };
            basicZoneService.getPreZoneCenterName = function (DistrictID, ExamInstID) {
                return $http.get(AppSettings.WebApiUrl + "api/PreZoneCenter/GetPreZoneCenterName", { params: { DistrictID: DistrictID, ExamInstID: ExamInstID } }).then(function (results) {
                    return results.data;
                });
            };
                return basicZoneService;
        });
}());