(function () {
    'use strict';
    angular.module('app')
        .controller('ExamFormNRReportController',
        function ($rootScope, $scope, basicCourseService, basicExamService, ExamFormNRReportService, AppSettings) {
            $scope.ExamFormNRReport = {};
            $scope.ReportType = "N";
            $scope.LoadImg = false;
            $scope.ShowPrint = false;
            $scope.init = function () {
                getAllBasicCourse();
                //getBasicDistrictList();
            };
            var getAllBasicCourse = function () {
                basicCourseService.GetCourseListForRegStud(AppSettings.CollegeID, AppSettings.AcdYrID).then(function (results) {
                    $scope.basicCourses = results;
                });
            };
            $scope.$watch('ExamFormNRReport.CourseID', function () {
                if ($scope.ExamFormNRReport.CourseID !== undefined) {
                    basicExamService.getBasicExamListByCourseID($scope.ExamFormNRReport.CourseID).then(function (results) {
                        $scope.basicExams = results;
                    });
                }
            });
            $scope.getExamFormNRReport = function () {
                if ($scope.examFormNRReportForm.$valid) {
                    $scope.LoadImg = true;
                    var ExamID = $scope.ExamFormNRReport.ExamID;
                    var CollegeID = AppSettings.CollegeID;
                    var ExamInstID = AppSettings.ExamInstID;
                    var ReqType = $scope.ReportType;
                    ExamFormNRReportService.getExamFormNRPDFReport(ExamID, CollegeID, ExamInstID, ReqType).then(function (results) {
                        if (results != "") {
                            $("#nrviewer").attr("src", URL.createObjectURL(new Blob([results], {
                                type: "application/pdf"
                            })))
                            $scope.ShowPrint = true;
                            $scope.LoadImg = false;
                        }
                    }, function (error) {
                        $scope.ExamFormNRReport = {};
                        if (error.statusText == 'Not Found') {
                            alert("No Data Found");
                            $scope.ShowPrint = false;
                            $("#nrviewer").attr("src", "");
                        }
                        else {
                            alert(error.statusText);
                            $scope.ShowPrint = false;
                            $("#nrviewer").attr("src", "");
                        }
                        $scope.LoadImg = false;
                    });
                }
            };
            $scope.printExamFormNRReport = function () {
                if ($scope.examFormNRReportForm.$valid) {
                    $scope.LoadImg = true;
                    var ExamID = $scope.ExamFormNRReport.ExamID;
                    var CollegeID = AppSettings.CollegeID;
                    var ExamInstID = AppSettings.ExamInstID;
                    var ReqType = $scope.ReportType;
                    ExamFormNRReportService.getExamFormNRTextReport(ExamID, CollegeID, ExamInstID, ReqType).then(function (results) {
                        if (results != "") {
                            $scope.ExamFormNRReport = {};
                            var file = new Blob([results], { type: 'application/txt' });
                            var fileURL = URL.createObjectURL(file);
                            var date = new Date();
                            var fileName = "ExamFormReport(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").txt";
                            var a = document.createElement("a");
                            document.body.appendChild(a);
                            a.href = fileURL;
                            a.download = fileName;
                            a.click();
                            $scope.LoadImg = false;
                        }
                    }, function (error) {
                        $scope.ExamFormNRReport = {};
                        if (error.statusText == 'Not Found') {
                            alert("No Data Found");
                        }
                        else {
                            alert(error.statusText);
                        }
                        $scope.LoadImg = false;
                    });
                }
            };
        });
}());