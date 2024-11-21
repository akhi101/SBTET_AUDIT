(function () {
    'use strict';
    angular.module('app')
		.controller('branchChangeController', ['$rootScope', '$scope', 'preStudentAddressService','basicBranchService', 'basicCourseService', 'basicCollegeService', 'basicExamService', 'basicStudentInformationService','branchChangeService',
			function ($rootScope, $scope, preStudentAddressService, basicBranchService, basicCourseService, basicCollegeService, basicExamService, basicStudentInformationService, branchChangeService) {

                $scope.branchChange = {};
				$scope.tempbranchChange = {};
				$scope.tempbranchChange.prnNo === undefined;
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

                $scope.$watch('branchChange.courseID', function () {
                    if ($scope.branchChange.courseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.branchChange.courseID).then(function (results) {
                            $scope.basicBranches = results;
                        });

                        basicExamService.getBasicExamListByCourseID($scope.branchChange.courseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
				});

				$scope.$watch('tempbranchChange.prnNo', function () {
					if ($scope.tempbranchChange.prnNo !== undefined) {
						basicStudentInformationService.getBasicStudentInformationByPRN($scope.tempbranchChange.prnNo).then(function (results) {
							$scope.branchChange = results[0];
							$scope.studentRegID = $scope.branchChange.preStudRegID;
							preStudentAddressService.getStudentAddressByID($scope.studentRegID).then(function (results) {
								$scope.branchChange.address = results[0];
							});
						});
					}
				});

				$scope.saveBranchChange = function () {
					if ($scope.branchChangeForm.$valid) {
						branchChangeService.putBranchChange($scope.branchChange).then(function (results) {
						});
					}
				};
        
    }]);
}());