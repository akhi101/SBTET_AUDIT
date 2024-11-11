(function () {
    'use strict';
    angular.module('app')
        .controller('seatingArrangementController', ['$rootScope', '$scope', '$state', 'basicCourseService', 'basicCollegeService', 'basicBranchService','basicExamService',
            function ($rootScope, $scope, $state, basicCourseService, basicCollegeService, basicBranchService, basicExamService) {

                $scope.seatingArrangement = {};

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
                $scope.$watch('seatingArrangement.courseID', function () {
                    if ($scope.seatingArrangement.courseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.seatingArrangement.courseID).then(function (results) {
                            $scope.basicBranches = results;
                        });

                        basicExamService.getBasicExamListByCourseID($scope.seatingArrangement.courseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

    }]);
}());