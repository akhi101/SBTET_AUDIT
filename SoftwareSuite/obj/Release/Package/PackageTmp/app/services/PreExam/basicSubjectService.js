$(function () {
	'use strict';
	angular.module('app')
		.factory('basicSubjectService',
        function ($http, AppSettings) {

            var serviceBase = AppSettings.WebApiUrl + "api/BasicSubject/";
				var basicSubjectService = {};

				basicSubjectService.getBasicSubjectListByExamID = function (examID) {
					return $http.get(serviceBase + 'GetBasicSubjectListByExamID', { params: { ExamID: examID}}).then(function (results) {
						return results.data;
					});
				};
				
				return basicSubjectService;
			});
}());