(function () {
    'use strict';
    angular.module('app')
        .controller('coursewiseCenterListController', ['$rootScope', '$scope', 'basicCourseService', 'basicBranchService','basicExamService',
            function ($rootScope, $scope, basicCourseService, basicBranchService, basicExamService) {

                $scope.coursewiseCenterList = {};

				$scope.init = function () {
					getAllBasicCourse();
				};

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                $scope.$watch('coursewiseCenterList.courseID', function () {
                    if ($scope.coursewiseCenterList.courseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.coursewiseCenterList.courseID).then(function (results) {
                            $scope.basicBranches = results;
                        });

                        basicExamService.getBasicExamListByCourseID($scope.coursewiseCenterList.courseID).then(function (results) {
                            $scope.bacicExams = results;
                        });
                    }
                });        
    }]);
}());