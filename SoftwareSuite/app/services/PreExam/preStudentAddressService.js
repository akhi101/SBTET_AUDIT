$(function () {
	'use strict';
	angular.module('app')
		.factory('preStudentAddressService', 
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl + "api/PreStudentAddress/";
				var preStudentAddressService = {};

				preStudentAddressService.getStudentAddressByID = function (preStudRegID) {
					return $http.get(serviceBase + 'GetStudentAddressByID', { params: { PreStudRegID: preStudRegID } }).then(function (results) {
						return results.data;
					});
				};

				return preStudentAddressService;
        });
}());