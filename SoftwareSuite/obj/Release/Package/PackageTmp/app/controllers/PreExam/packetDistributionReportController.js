(function () {
    'use strict';
    angular.module('app')
        .controller('packetDistributionReportController', 
        function ($rootScope, $scope, basicCourseService, basicCollegeService, basicExamService, packetDistributionReportService, basicZoneService, basicDistrictsService, AppSettings) {

                $scope.packetDistributionReport = {};

                $("#LoadImg").attr("src", AppSettings.LoadingImage);
                $scope.LoadImg = false;

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

                $scope.$watch('packetDistributionReport.CourseID', function () {
                    if ($scope.packetDistributionReport.CourseID !== undefined) {
                        basicExamService.getBasicExamListByCourseID($scope.packetDistributionReport.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
            });

            $scope.$watch('packetDistributionReport.DistrictID', function () {
                if ($scope.packetDistributionReport.DistrictID !== undefined) {
                    basicZoneService.getPreZoneCenterName($scope.packetDistributionReport.DistrictID, AppSettings.ExamInstID).then(function (results) {
                        $scope.preZoneCenters = results;
                    });
                }
            });

                $scope.getPacketDistributionReport = function () {
                    if ($scope.packetDistributionReportForm.$valid) {
                        $scope.LoadImg = true;
                        $scope.packetDistributionReport.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        packetDistributionReportService.getPacketDistributionReport($scope.packetDistributionReport).then(function (results) {
                            if (results != "") {
                                $scope.packetDistributionReport = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "PacketDistributionReport(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();  
                                $scope.LoadImg = false;
                            }
                            //if (results.isSuccess == false) $scope.packetDistributionReport = {}; alert(results.message);
                        }, function (error) {
                            $scope.packetDistributionReport = {};
                            alert(error.statusText);
                            $scope.LoadImg = false;
                        });
                    }
                };
            });
}());