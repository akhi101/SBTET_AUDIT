(function () {
    'use strict';
    angular.module('app')
        .controller('generationOfSeatNoController', ['$rootScope', '$scope', 'basicBranchService', 'basicCourseService', 'basicExamService',
            function ($rootScope, $scope, basicBranchService, basicCourseService, basicExamService) {

                $scope.generationOfSeatNo = {};
                $scope.generateTypes = [];
                
                $scope.init = function () {
                    getAllBasicCourse();
                    getGenerateTypes();
                };

                var getGenerateTypes = function () {
                    $scope.generateTypes.push({ name: 'All Student', typeId: '1' });
                    $scope.generateTypes.push({ name: 'New Student', typeId: '2' });
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                $scope.$watch('generationOfSeatNo.courseID', function () {
                    if ($scope.generationOfSeatNo.courseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.generationOfSeatNo.courseID).then(function (results) {
                            $scope.basicBranches = results;
                        });

                        basicExamService.getBasicExamListByCourseID($scope.generationOfSeatNo.courseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });
            }]);
}());