 (function () {
    'use strict';
    angular.module('app')
        .controller('attendanceSheetController',
        function ($rootScope, $scope, basicCourseService, basicExamService, basicZoneService, attendanceSheetService, basicDistrictsService, AppSettings) {

                $scope.tempDetails = {};

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                    //getAllZoneCenterCollege(AppSettings.ExamInstID);// Current ExamInstID
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

                //var getAllZoneCenterCollege = function (ExamInstID) {
                //    basicZoneService.getZoneCenterList(ExamInstID).then(function (results) {
                //        $scope.zoneCenterColleges = results;
                //    });
                //};

                $scope.$watch('tempDetails.CourseID', function () {
                    if ($scope.tempDetails.CourseID !== undefined) {
                        basicExamService.getBasicExamListByCourseID($scope.tempDetails.CourseID).then(function (results) {
                            $scope.basicExams = results;
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

            $scope.getAttendanceSheetDetail = function () {
                if ($scope.attendanceSheetDetailForm.$valid) {
                    var ThCentreID = $scope.tempDetails.ThCentreID;
                    var ExamID = $scope.tempDetails.ExamID;
                    var ExamInstID = AppSettings.ExamInstID;
                    attendanceSheetService.getAttendanceSheetReportByType(ThCentreID, ExamID, ExamInstID).then(function (results) {
                     
                    if (results != "") {
                        $scope.tempDetails = {};
                        var file = new Blob([results], { type: 'application/pdf' });
                        var fileURL = URL.createObjectURL(file);
                        var date = new Date();
                        var fileName = "AttendanceSheet(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
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