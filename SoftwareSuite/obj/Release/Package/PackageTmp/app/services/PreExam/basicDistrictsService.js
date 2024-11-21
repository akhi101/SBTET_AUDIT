$(function () {
    'use strict';
    angular.module('app')
        .factory('basicDistrictsService', 
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl + "api/BasicDistricts/";
                var basicDistrictsService = {};

                basicDistrictsService.getBasicDistrictsList = function () {
                    return $http.get(serviceBase + 'GetBasicDistrictsList').then(function (results) {
                        return results.data;
                    });
                };

                basicDistrictsService.getGetBasicDistrictsByDistrictID = function (DistrictID) {
                    return $http.get(serviceBase + 'GetBasicDistrictsByDistrictID', { params: { DistrictID: DistrictID } }).then(function (results) {
                        return results.data;
                    });
                };

                return basicDistrictsService;
        });
}());