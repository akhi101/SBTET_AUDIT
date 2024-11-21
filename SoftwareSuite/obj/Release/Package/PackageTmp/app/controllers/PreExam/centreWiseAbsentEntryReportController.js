(function () {
    'use strict';
    angular.module('app')
        .controller('centreWiseAbsentEntryReportController', 
        function ($rootScope, $scope, basicCourseService, basicExamService, examTimeTableService, absentDetailService, basicZoneService, basicBranchService, basicDistrictsService, AppSettings) {

                $scope.tempDetails = {};

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                    //getAllZoneCenterCollege();
            };
            var getAllBasicDistrict = function () {
                basicDistrictsService.getBasicDistrictsList().then(function (results) {
                    $scope.basicDistricts = results;
                });
            };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                //var getAllZoneCenterCollege = function () {
                //    basicZoneService.getZoneCenterList().then(function (results) {
                //        $scope.zoneCenterColleges = results;
                //    });
                //};

                $scope.$watch('tempDetails.CourseID', function () {
                    if ($scope.tempDetails.CourseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.tempDetails.CourseID).then(function (results) {
                            $scope.basicBranches = results;
                        });
                        basicExamService.getBasicExamListByCourseID($scope.tempDetails.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

                $scope.$watch('tempDetails.BranchID', function () {
                    if ($scope.tempDetails.BranchID !== undefined && $scope.tempDetails.ExamID !== undefined) {
                        $scope.tempDetails.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        absentDetailService.getExamTimeTableSubjectListByExamIDBranchID($scope.tempDetails.ExamID, $scope.tempDetails.BranchID, $scope.tempDetails.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                        });
                    }
            });

            $scope.$watch('tempDetails.DistrictID', function () {
                if ($scope.tempDetails.DistrictID !== undefined) {
                    basicZoneService.getPreZoneCenterName($scope.tempDetails.DistrictID, AppSettings.ExamInstID).then(function (results) {
                        $scope.preZoneCenters = results;
                    });
                }
            });

                $scope.getAbsentEntryReport = function () {
                    if ($scope.absentEntryForm.$valid) {
                        $scope.tempDetails.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        absentDetailService.getAbsentEntryReport($scope.tempDetails).then(function (results) {
                            if (results != "") {
                                $scope.tempDetails = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "AbsentEntry(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                            } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                        }, function (error) {
                            $scope.tempDetails = {};
                            alert(error.statusText);
                        });
                    }
                };
            });
}());