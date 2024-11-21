(function () {
    'use strict';
    angular.module('app')
        .controller('QPDistributionCountReportController',
        function ($rootScope, $scope, AppSettings, districtCenterWiseThPaperCountService, basicCourseService, basicExamService, basicDistrictsService, basicCollegeService) {


                $scope.studentCount = {};
                $("#LoadImg").attr("src", AppSettings.LoadingImage);
                $scope.LoadImg = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                    $scope.reportTypes = [
                        { ReportTypeName: 'Center Wise', ReportType: 'C' },
                        { ReportTypeName: 'District Wise', ReportType: 'D' },
                        { ReportTypeName: 'Bulk', ReportType: 'B' },
                        { ReportTypeName: 'Old Center Wise', ReportType: 'OC' },
                        { ReportTypeName: 'Old District Wise', ReportType: 'OD' },
                        { ReportTypeName: 'Old Bulk', ReportType: 'OB' },
                        { ReportTypeName: 'Examiner Count', ReportType: 'E' }
                        
                    ];
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };
                var getAllBasicDistrict = function () {
                    basicDistrictsService.getBasicDistrictsList().then(function (results) {
                        $scope.basicDistricts = results;
                    });
                };

                $scope.$watch('studentCount.CourseID', function () {
                    if ($scope.studentCount.CourseID !== undefined) {
                        basicExamService.getBasicExamListByCourseID($scope.studentCount.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });
                $scope.$watch('studentCount.DistrictID', function () {
                    if ($scope.studentCount.DistrictID !== undefined) {
                        basicCollegeService.getTheroyExamCenterCollegeList($scope.studentCount.DistrictID, AppSettings.ExamInstID).then(function (results) {
                            $scope.basicCenters = results;
                        });
                    }
                });
            $scope.getdistrictCenterWiseThPaperCount = function () {
                $scope.studentCount.CenterCollegeID = 0;
                $scope.studentCount.CenterCollegeID = $scope.studentCount.PreZoneCntrID;

                if ($scope.studentCount.CenterCollegeID == undefined) { $scope.studentCount.CenterCollegeID = 0 }
                if ($scope.studentCount.DistrictID == undefined) { $scope.studentCount.DistrictID = 0 }

                if ($scope.districtCenterWiseForm.$valid && $scope.studentCount.ExamID) { //, $scope.studentCount.districtID, $scope.studentCount.preZoneCntrID
                    $scope.LoadImg = true;
                        if ($scope.studentCount.ReportType == "C") {
                            districtCenterWiseThPaperCountService.GetQPChartCenterWise(AppSettings.ExamInstID, $scope.studentCount.ExamID, $scope.studentCount.CenterCollegeID).then(function (results) {
                                if (results.isSuccess == undefined && results != "") {
                                    $scope.studentCount = {};
                                    var file = new Blob([results], { type: 'application/pdf' });
                                    var fileURL = URL.createObjectURL(file);
                                    var date = new Date();
                                    var fileName = "QPChartCenterWise(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                    var a = document.createElement("a");
                                    document.body.appendChild(a);
                                    a.href = fileURL;
                                    a.download = fileName;
                                    a.click();
                                    $scope.LoadImg = false;
                                } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                            }, function (error) {
                                $scope.studentCount = {};
                                alert(error.statusText);
                                $scope.LoadImg = false;
                            });
                        }
                        else if ($scope.studentCount.ReportType == "OC") {
                        districtCenterWiseThPaperCountService.GetQPChartCenterWiseOld(AppSettings.ExamInstID, $scope.studentCount.ExamID, $scope.studentCount.CenterCollegeID).then(function (results) {
                            if (results.isSuccess == undefined && results != "") {
                                $scope.studentCount = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "QPChartCenterWiseOld(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                                $scope.LoadImg = false;
                            } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                        }, function (error) {
                            $scope.studentCount = {};
                            alert(error.statusText);
                            $scope.LoadImg = false;
                        });
                    }
                        else if ($scope.studentCount.ReportType == "D") {
                            districtCenterWiseThPaperCountService.GetQPChartDistrictWise(AppSettings.ExamInstID, $scope.studentCount.ExamID, $scope.studentCount.DistrictID).then(function (results) {
                                if (results.isSuccess == undefined && results != "") {
                                    $scope.studentCount = {};
                                    var file = new Blob([results], { type: 'application/pdf' });
                                    var fileURL = URL.createObjectURL(file);
                                    var date = new Date();
                                    var fileName = "QPChartDistrictWise(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                    var a = document.createElement("a");
                                    document.body.appendChild(a);
                                    a.href = fileURL;
                                    a.download = fileName;
                                    a.click();
                                    $scope.LoadImg = false;
                                } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                            }, function (error) {
                                $scope.studentCount = {};
                                alert(error.statusText);
                                $scope.LoadImg = false;
                            });
                        }
                        else if ($scope.studentCount.ReportType == "OD") {
                            districtCenterWiseThPaperCountService.GetQPChartDistrictWiseOld(AppSettings.ExamInstID, $scope.studentCount.ExamID, $scope.studentCount.DistrictID).then(function (results) {
                                if (results.isSuccess == undefined && results != "") {
                                    $scope.studentCount = {};
                                    var file = new Blob([results], { type: 'application/pdf' });
                                    var fileURL = URL.createObjectURL(file);
                                    var date = new Date();
                                    var fileName = "QPChartDistrictWiseOld(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                    var a = document.createElement("a");
                                    document.body.appendChild(a);
                                    a.href = fileURL;
                                    a.download = fileName;
                                    a.click();
                                    $scope.LoadImg = false;
                                } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                            }, function (error) {
                                $scope.studentCount = {};
                                alert(error.statusText);
                                $scope.LoadImg = false;
                            });
                        }
                        else if ($scope.studentCount.ReportType == "B") {
                            districtCenterWiseThPaperCountService.GetQPChartBulk(AppSettings.ExamInstID, $scope.studentCount.ExamID).then(function (results) {
                                if (results.isSuccess == undefined && results != "") {
                                    $scope.studentCount = {};
                                    var file = new Blob([results], { type: 'application/pdf' });
                                    var fileURL = URL.createObjectURL(file);
                                    var date = new Date();
                                    var fileName = "QPChartBulk(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                    var a = document.createElement("a");
                                    document.body.appendChild(a);
                                    a.href = fileURL;
                                    a.download = fileName;
                                    a.click();
                                    $scope.LoadImg = false;
                                } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                            }, function (error) {
                                $scope.studentCount = {};
                                alert(error.statusText);
                                $scope.LoadImg = false;
                            });
                        }
                        else if ($scope.studentCount.ReportType == "OB") {
                            districtCenterWiseThPaperCountService.GetQPChartBulkOld(AppSettings.ExamInstID, $scope.studentCount.ExamID).then(function (results) {
                                if (results.isSuccess == undefined && results != "") {
                                    $scope.studentCount = {};
                                    var file = new Blob([results], { type: 'application/pdf' });
                                    var fileURL = URL.createObjectURL(file);
                                    var date = new Date();
                                    var fileName = "QPChartBulkOld(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                    var a = document.createElement("a");
                                    document.body.appendChild(a);
                                    a.href = fileURL;
                                    a.download = fileName;
                                    a.click();
                                    $scope.LoadImg = false;
                                } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                            }, function (error) {
                                $scope.studentCount = {};
                                alert(error.statusText);
                                $scope.LoadImg = false;
                            });
                        }
                        else if ($scope.studentCount.ReportType == "E") {
                            districtCenterWiseThPaperCountService.GetDistrictWiseExaminerCount($scope.studentCount.DistrictID, $scope.studentCount.ExamID, $scope.studentCount.CourseID).then(function (results) {
                                if (results.isSuccess == undefined && results != "") {
                                    $scope.studentCount = {};
                                    var file = new Blob([results], { type: 'application/pdf' });
                                    var fileURL = URL.createObjectURL(file);
                                    var date = new Date();
                                    var fileName = "DistrictWiseExaminerCount(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                    var a = document.createElement("a");
                                    document.body.appendChild(a);
                                    a.href = fileURL;
                                    a.download = fileName;
                                    a.click();
                                    $scope.LoadImg = false;
                                } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                            }, function (error) {
                                $scope.studentCount = {};
                                alert(error.statusText);
                                $scope.LoadImg = false;
                            });
                        }
                        else {
                            $scope.LoadImg = false;
                        }
                    }
                };

            });
}());