$(function () {
	'use strict';
	angular.module('app')
		.factory('basicBranchService', 
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl + "api/BasicBranch/";
				var basicBranchService = {};

				basicBranchService.getBasicBranchList = function () {
					return $http.get(serviceBase + 'GetBasicBranchList').then(function (results) {
						return results.data;
					});
                };

                basicBranchService.getBasicBranchListByCourseId = function (courseId) {                    
                    return $http.get(serviceBase + 'GetBasicBranchListByCourseID', { params: { CourseID: courseId }}).then(function (results) {
                        return results.data;
                    });
                };
				
				return basicBranchService;
			});
}());