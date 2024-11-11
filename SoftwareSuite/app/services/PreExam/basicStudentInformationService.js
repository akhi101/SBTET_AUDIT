$(function () {
	'use strict';
	angular.module('app')
		.factory('basicStudentInformationService', 
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/BasicStudentInformation/";
				var basicStudentInformationService = {};

				basicStudentInformationService.getBasicStudentInformationByPRN = function (pRNNo) {
					return $http.get(serviceBase + 'GetBasicStudentInformationByPRN', { params: { PRNNo: pRNNo } }).then(function (results) {
						return results.data;
					});
				};
				
				return basicStudentInformationService;
        });
}());