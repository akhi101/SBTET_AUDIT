(function () {
    'use strict';
    angular.module('app')
        .controller('districtCenterWiseThPaperCountReportController',
        function ($rootScope, $scope, AppSettings, districtCenterWiseThPaperCountService, basicCourseService, basicExamService, basicDistrictsService, basicCollegeService) {


                $scope.studentCount = {};

                $("#LoadImg").attr("src", AppSettings.LoadingImage);
                $scope.LoadImg = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                    $scope.reportTypes = [
                        { ReportTypeName: 'Main Subject', ReportType: 'TH' },
                        { ReportTypeName: 'Other Subject', ReportType: 'OS' }
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
                    if ($scope.districtCenterWiseForm.$valid && $scope.studentCount.ExamID) { //, $scope.studentCount.districtID, $scope.studentCount.preZoneCntrID
                        $scope.LoadImg = true;
                        if ($scope.studentCount.PreZoneCntrID == undefined || $scope.studentCount.PreZoneCntrID == "") { $scope.studentCount.PreZoneCntrID = 0;}
                        if ($scope.studentCount.ReportType == "TH") {
                            districtCenterWiseThPaperCountService.getDistrictAndCenterWiseReport(103, $scope.studentCount.ExamID, $scope.studentCount.DistrictID, $scope.studentCount.PreZoneCntrID).then(function (results) {
                                if (results.isSuccess == undefined && results != "") {
                                    $scope.studentCount = {};
                                    var file = new Blob([results], { type: 'application/pdf' });
                                    var fileURL = URL.createObjectURL(file);
                                    var date = new Date();
                                    var fileName = "districtCenterWiseThPaperCountService(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
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
                            districtCenterWiseThPaperCountService.getDistrictAndCenterWiseDataOtherSub(103, $scope.studentCount.ExamID, $scope.studentCount.DistrictID, $scope.studentCount.PreZoneCntrID).then(function (results) {
                                if (results.isSuccess == undefined && results != "") {
                                    $scope.studentCount = {};
                                    var file = new Blob([results], { type: 'application/pdf' });
                                    var fileURL = URL.createObjectURL(file);
                                    var date = new Date();
                                    var fileName = "districtCenterWiseThPaperCountServiceforOtherSub(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
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
                    }
                };

            });
}());