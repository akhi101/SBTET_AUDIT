(function () {
    'use strict';
    angular.module('app')
        .controller('studyCenterSummaryController', ['$rootScope', '$scope', 'basicExamService','basicCourseService',
            function ($rootScope, $scope, basicExamService, basicCourseService) {

                $scope.studyCenterSummary = {};

                $scope.init = function () {
                    getAllBasicCourse();
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                $scope.$watch('studyCenterSummary.courseID', function () {
                    if ($scope.studyCenterSummary.courseID !== undefined) {
                        basicExamService.getBasicExamListByCourseID($scope.studyCenterSummary.courseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });
            }]);
}());