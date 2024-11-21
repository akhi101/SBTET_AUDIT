(function () {
    'use strict';
    angular.module('app')
        .controller('DFormReportController', 
        function ($rootScope, $scope, basicCourseService, basicExamService, basicZoneService, basicBranchService, absentDetailService, DFormReportService,basicDistrictsService,AppSettings) {
                
                $scope.DFormReportDetail = {};

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                    //getAllZoneCenterCollege(AppSettings.ExamInstID);// Current ExamInstID
                };
                //var getAllZoneCenterCollege = function (ExamInstID) {
                //    basicZoneService.getZoneCenterList(ExamInstID).then(function (results) {
                //        $scope.zoneCenterColleges = results;
                //    });
                //};
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

                $scope.$watch('DFormReportDetail.CourseID', function () {
                    if ($scope.DFormReportDetail.CourseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.DFormReportDetail.CourseID).then(function (results) {
                            $scope.basicBranches = results;
                        });
                        basicExamService.getBasicExamListByCourseID($scope.DFormReportDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
            });

            $scope.$watch('DFormReportDetail.BranchID', function () {
                if ($scope.DFormReportDetail.BranchID !== undefined && $scope.DFormReportDetail.ExamID !== undefined) {
                    $scope.DFormReportDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    absentDetailService.getExamTimeTableSubjectListByExamIDBranchID($scope.DFormReportDetail.ExamID, $scope.DFormReportDetail.BranchID, $scope.DFormReportDetail.ExamInstID).then(function (results) {
                        $scope.examTimeTableSubjects = results;
                    });
                }
            });

            $scope.$watch('DFormReportDetail.DistrictID', function () {
                if ($scope.DFormReportDetail.DistrictID !== undefined) {
                    basicZoneService.getPreZoneCenterName($scope.DFormReportDetail.DistrictID, AppSettings.ExamInstID).then(function (results) {
                        $scope.preZoneCenters = results;
                    });
                }
            });

            $scope.getDFormReport = function () {
                    if ($scope.dFormReportDetailForm.$valid) {                        
                        var ThCentreID = $scope.DFormReportDetail.ThCentreID;
                        var ExamID = $scope.DFormReportDetail.ExamID;
                        var ExmSubID = $scope.DFormReportDetail.ExmSubID;                        
                        var ExamInstID = AppSettings.ExamInstID; // Current ExamInstID;
                        
                        DFormReportService.getDFormReportByType(ThCentreID, ExamID, ExamInstID, ExmSubID).then(function (results) {
                            if (results != "") {
                                $scope.DFormReportDetail = {};
                                var file = new Blob([results], { type: 'application/txt' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "DFormReport(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").txt";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                            } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                        }, function (error) {
                            $scope.DFormReportDetail = {};
                            alert(error.statusText);
                        });
                    }
                };
            });
}());