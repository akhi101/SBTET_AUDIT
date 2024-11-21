(function () {
    'use strict';
    angular.module('app')
        .controller('StudTheoryHallTicketController',
        function ($rootScope, $scope, basicCourseService, basicExamService, basicCollegeService, StudTheoryHallTicketService, basicDistrictsService, basicMainGroupService, AppSettings) {

            $scope.HallTicketReport = {};
            $scope.ReportType = "N";
            $scope.LoadImg = false;
            $scope.ShowPrint = false;
            //$scope.init = function () {
            //    getAllBasicCourse();
            //};
         
            //var getAllBasicCourse = function () {
            //    basicCourseService.getAllBasicCourse().then(function (results) {
            //        $scope.basicCourses = results;
            //    });
            //};

            //$scope.$watch('HallTicketReport.CourseID', function () {
            //    if ($scope.HallTicketReport.CourseID !== undefined) {
            //        basicExamService.getBasicExamListByCourseID($scope.HallTicketReport.CourseID).then(function (results) {
            //            if (results != "") {
            //                $scope.basicExams = results;
            //            }
            //        }, function (error) {
            //            alert("error.");
            //        });
            //    }
            //});

            $scope.getHallTicketReport = function () {
                if ($scope.HallTicketReportForm.$valid) {
                        $scope.LoadImg = true;
                      //  var ExamID = $scope.HallTicketReport.ExamID;
                        var ExamID = "1";
                        var HTNo = $scope.HallTicketReport.HtNo;
                        var CollegeID = AppSettings.CollegeID;
                       // var ExamInstID = AppSettings.ExamInstID;
                        var ExamInstID = "103";
                        StudTheoryHallTicketService.GetHallTicket(HTNo).then(function (results) {
                            if (results != "") {
                                $scope.HallTicketReport = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "HallTicket_March_2019.pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
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