(function () {
	'use strict';
	angular.module('app')
        .controller('generationOMRDataController', ['$rootScope', '$scope', '$state', 'basicCourseService', 'basicExamService','basicCollegeService',
            function ($rootScope, $scope, $state, basicCourseService, basicExamService, basicCollegeService) {

                $scope.generationOMRData = {};

				$scope.init = function () {
                    getAllBasicCourse();	
                    getAllBasicCollege();
				};

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                var getAllBasicCollege = function () {
                    basicCollegeService.getAllBasicCollege().then(function (results) {
                        $scope.basicColleges = results;
                    });
                };

                $scope.$watch('generationOMRData.courseID', function () {
                    if ($scope.generationOMRData.courseID !== undefined) {
                       
                        basicExamService.getBasicExamListByCourseID($scope.generationOMRData.courseID).then(function (results) {
                            $scope.bacicExams = results;
						});
					}
				});

			}]);
}());