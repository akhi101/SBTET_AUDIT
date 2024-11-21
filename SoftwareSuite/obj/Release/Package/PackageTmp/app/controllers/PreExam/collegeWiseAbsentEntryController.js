(function () {
    'use strict';
    angular.module('app')
        .controller('collegeWiseAbsentEntryController', ['$rootScope', '$scope', 'basicCourseService', 'basicExamService', 'examTimeTableService', 'absentDetailService','basicCollegeService',
            function ($rootScope, $scope, basicCourseService, basicExamService, examTimeTableService, absentDetailService, basicCollegeService) {

              
                $scope.absentDetails = [];
                $scope.tempDetails = {};

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

                $scope.$watch('tempDetails.courseID', function () {
                    if ($scope.tempDetails.courseID !== undefined) {
                        basicExamService.getBasicExamListByCourseID($scope.tempDetails.courseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

                $scope.$watch('tempDetails.examID', function () {
                    if ($scope.tempDetails.examID !== undefined) {
                        examTimeTableService.getExamTimeTableSubjectByExamID($scope.tempDetails.examID).then(function (results) {
                            $scope.basicSubjects = results;
                        });
                    }
                })

                //$scope.$watch('tempDetails.exmSubID', function () {
                //    if ($scope.tempDetails.examID !== undefined && $scope.tempDetails.exmSubID) {
                //        absentDetailService.getSubjectCategoryByExamID($scope.tempDetails.exmSubID,$scope.tempDetails.examID).then(function (results) {
                //            $scope.basicSubjectCategory = results;
                //        });
                //    }
                //})

                $scope.findAbsentEntry = function () {
                    examTimeTableService.getExamTimeTableSubjectByExamID($scope.tempDetails.examID).then(function (results) {
                        if (results.isSuccess) {
                            $scope.examStudentList = results.data;
                        } else {
                            alert(results.message);
                        }
                    });
                };

                $scope.saveAbsentEntry = function () {
                   
                };

            }]);
}());