	(function () {
		'use strict';
		angular.module('app')
			.controller('codeNoGenerationController', ['$rootScope', '$scope', 'basicCourseService', 'basicCollegeService', 'basicExamService',
				function ($rootScope, $scope, basicCourseService, basicCollegeService, basicExamService) {

					$scope.codeNoGeneration = {};

					$scope.init = function () {
						getAllBasicCourse();
					};

					var getAllBasicCourse = function () {
						basicCourseService.getAllBasicCourse().then(function (results) {
							$scope.basicCourses = results;
						});
					};
					
					$scope.$watch('codeNoGeneration.courseID', function () {
						if ($scope.codeNoGeneration.courseID !== undefined) {
							basicExamService.getBasicExamListByCourseID($scope.codeNoGeneration.courseID).then(function (results) {
								$scope.basicExams = results;
							});
						}
					});
				}]);
	}());