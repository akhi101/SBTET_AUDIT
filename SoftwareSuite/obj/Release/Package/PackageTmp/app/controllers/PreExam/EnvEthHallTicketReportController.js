(function () {
    'use strict';
    angular.module('app')
        .controller('EnvEthHallTicketReportController',
        function ($rootScope, $scope, basicCourseService, basicExamService, basicCollegeService, HallTicketReportService, basicDistrictsService, basicMainGroupService, AppSettings) {

            $scope.HallTicketReport = {};
            $scope.ReportType = "N";
            $scope.LoadImg = false;
            $scope.ShowPrint = false;
            $scope.init = function () {
                getAllBasicCourse();
            };
         
            var getAllBasicCourse = function () {
                basicCourseService.getAllBasicCourse().then(function (results) {
                    $scope.basicCourses = results;
                });
            };

            $scope.$watch('HallTicketReport.CourseID', function () {
                if ($scope.HallTicketReport.CourseID !== undefined) {
                    basicExamService.getBasicExamListByCourseID($scope.HallTicketReport.CourseID).then(function (results) {
                        $scope.basicExams = results;
                    });
                }
            });

            $scope.getHallTicketReport = function () {
                if ($scope.HallTicketReportForm.$valid) {
                        $scope.LoadImg = true;
                        var ExamID = $scope.HallTicketReport.ExamID;
                        var CollegeID = AppSettings.CollegeID;
                        var ExamInstID = AppSettings.ExamInstID;
                        HallTicketReportService.GetEnvEthHallTicketPDFReport(ExamID, ExamInstID, CollegeID).then(function (results) {
                            if (results != "") {
                                $("#pdfviewer").attr("src", URL.createObjectURL(new Blob([results], {
                                    type: "application/pdf"
                                })))
                                $scope.ShowPrint = true;
                                $scope.LoadImg = false;
                            }
                        }, function (error) {
                            $scope.HallTicketReport = {};
                            if (error.statusText == 'Not Found') {
                                alert("No Data Found");
                                $scope.ShowPrint = false;
                                $("#pdfviewer").attr("src", "");
                            }
                            else {
                                alert(error.statusText);
                                $scope.ShowPrint = false;
                                $("#pdfviewer").attr("src", "");
                            }
                            $scope.LoadImg = false;

                        });
                }
            };
        });
}());