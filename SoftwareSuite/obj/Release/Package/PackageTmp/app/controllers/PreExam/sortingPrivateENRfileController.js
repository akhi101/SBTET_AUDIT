(function () {
	'use strict';
	angular.module('app')
        .controller('sortingPrivateENRFileController', ['$rootScope', '$scope', '$state', 'basicBranchService', 'basicCourseService', 'basicExamService','basicCollegeService',
            function ($rootScope, $scope, $state, basicBranchService, basicCourseService, basicExamService, basicCollegeService) {

                $scope.sortingPrivateENRFile = {};

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

                $scope.$watch('sortingPrivateENRFile.courseID', function () {
                    if ($scope.sortingPrivateENRFile.courseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.sortingPrivateENRFile.courseID).then(function (results) {
                            $scope.basicBranches = results;
                        });

                        basicExamService.getBasicExamListByCourseID($scope.sortingPrivateENRFile.courseID).then(function (results) {
                            $scope.bacicExams = results;
						});
					}
				});

			}]);
}());