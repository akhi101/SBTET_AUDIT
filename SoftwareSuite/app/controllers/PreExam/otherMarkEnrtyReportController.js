(function () {
    'use strict';
    angular.module('app')
        .controller('otherMarkEnrtyReportController',
            function ($rootScope, $scope, basicCourseService, basicExamService, examTimeTableService, otherMarkEnrtyService, basicZoneService, basicBranchService, basicDistrictsService, AppSettings) {

                $scope.otherMarkEnrtyDetail = {};

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

                $scope.$watch('otherMarkEnrtyDetail.CourseID', function () {
                    if ($scope.otherMarkEnrtyDetail.CourseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.otherMarkEnrtyDetail.CourseID).then(function (results) {
                            $scope.basicBranches = results;
                        });
                        basicExamService.getBasicExamListByCourseID($scope.otherMarkEnrtyDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });
                $scope.$watch('otherMarkEnrtyDetail.DistrictID', function () {
                    if ($scope.otherMarkEnrtyDetail.DistrictID !== undefined) {
                        basicZoneService.getPreZoneCenterName($scope.otherMarkEnrtyDetail.DistrictID, AppSettings.ExamInstID).then(function (results) {
                            $scope.preZoneCenters = results;
                        });
                    }
                });

                $scope.$watch('otherMarkEnrtyDetail.BranchID', function () {
                    if ($scope.otherMarkEnrtyDetail.BranchID !== undefined && $scope.otherMarkEnrtyDetail.ExamID !== undefined) {
                        $scope.otherMarkEnrtyDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        otherMarkEnrtyService.getExamTimeTableSubjectListByExamIDBranchID($scope.otherMarkEnrtyDetail.ExamID, $scope.otherMarkEnrtyDetail.BranchID, $scope.otherMarkEnrtyDetail.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                        });
                    }
                });

                $scope.$watch('otherMarkEnrtyDetail.ExmSubID', function () {
                    if ($scope.otherMarkEnrtyDetail.ExmSubID !== undefined) {
                        otherMarkEnrtyService.getEvalTypeByExmSubID($scope.otherMarkEnrtyDetail.ExmSubID).then(function (results) {
                            $scope.evalTypes = results;
                        });
                    }
                });

                $scope.getOtherMarkEnrtyReport = function () {
                    if ($scope.otherMarkEnrtyDetailForm.$valid) {
                        $scope.otherMarkEnrtyDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        otherMarkEnrtyService.getOtherMarkEnrtyReport($scope.otherMarkEnrtyDetail).then(function (results) {
                            if (results != "") {
                                $scope.otherMarkEnrtyDetail = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "OtherMarkEntry(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                            } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                        }, function (error) {
                            $scope.otherMarkEnrtyDetail = {};
                            alert(error.statusText);
                        });
                    }
                };
            });
}());