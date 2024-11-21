(function () {
    'use strict';
    angular.module('app')
        .controller('absentDetailsController', ['$rootScope', '$scope', 'basicCourseService', 'basicExamService', 'examTimeTableService','absentDetailService',
            function ($rootScope, $scope, basicCourseService, basicExamService, examTimeTableService, absentDetailService) {

              
                $scope.absentDetails = [];
                $scope.tempDetails = {};

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllZoneCenterCollege();                 
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                var getAllZoneCenterCollege = function () {
                    basicZoneService.getZoneCenterList().then(function (results) {
                        $scope.zoneCenterColleges = results;
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

                $scope.addAbsentEntry = function () {
                    var temp = {};
                    $scope.tempDetails.exmSubID = $scope.tempDetails.exmSubName.exmSubID;
                     angular.copy($scope.tempDetails, temp);
                    $scope.absentDetails.push(temp);
                    $scope.tempDetails = {};
                };

                $scope.removeAbsentEntry = function (item) {
                    var index = $scope.absentDetails.indexOf(item);
                    if (index != -1) {
                        $scope.absentDetails.splice(index, 1);
                    }
                };

            }]);
}());