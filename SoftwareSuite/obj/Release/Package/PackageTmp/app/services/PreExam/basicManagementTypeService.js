$(function () {
    'use strict';
    angular.module('app')
        .factory('basicManagementTypeService',
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl + "api/BasicManagementType/";
                var basicManagementTypeService = {};

                basicManagementTypeService.getBasicManagementTypeList = function () {
                    return $http.get(serviceBase + 'GetBasicManagementTypeList').then(function (results) {
                        return results.data;
                    });
                };

                return basicManagementTypeService;
        });
}());