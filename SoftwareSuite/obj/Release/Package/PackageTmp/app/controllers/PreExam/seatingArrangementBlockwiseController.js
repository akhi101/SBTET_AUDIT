	(function () {
		'use strict';
		angular.module('app')
			.controller('seatingArrangementBlockwiseController', ['$rootScope', '$scope', '$state',  'basicCourseService',
				function ($rootScope, $scope, $state, basicCourseService) {

					$scope.seatingArrangementBlockwise = {};

					$scope.init = function () {
						getAllBasicCourse();
					};

					var getAllBasicCourse = function () {
						basicCourseService.getAllBasicCourse().then(function (results) {
							$scope.basicCourses = results;
						});
					};
					
				}]);
	}());