$(function () {
	'use strict';
	angular.module('app')
		.factory('branchChangeService', 
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl + "api/BranchChange/";
				var branchChangeService = {};

				branchChangeService.putBranchChange = function (branchChange) {
					return $http.put(serviceBase + 'PutBranchChange', branchChange).then(function (results) {
						return results.data;
					});
				};

				return branchChangeService;
        });
}());