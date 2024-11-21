(function () {
    'use strict';
    angular.module('app')
        .controller('PreExamNRGeneralBridgeReportController',
        function ($rootScope, $scope, basicCourseService, basicExamService, basicCollegeService, PreExamNRReportService, basicDistrictsService, basicMainGroupService, AppSettings) {

            $scope.PreExamNRReport = {};
            $scope.ReportType = "N";
            $scope.LoadImg = false;
            $scope.ShowPrint = false;
            $scope.init = function () {
               // getAllBasicCourse();
                //getAllBasicCollege();
                getPreExamNRReport();
            };
            //var getAllBasicCourse = function () {
            //    basicCourseService.getAllBasicCourse().then(function (results) {
            //        $scope.basicCourses = results;
            //    });
            //};

            //$scope.$watch('PreExamNRReport.CourseID', function () {
            //    if ($scope.PreExamNRReport.CourseID !== undefined) {
            //        //basicBranchService.getBasicBranchListByCourseId($scope.PreExamNRReport.CourseID).then(function (results) {
            //        //    $scope.basicBranches = results;
            //        //});
            //        basicExamService.getBasicExamListByCourseID($scope.PreExamNRReport.CourseID).then(function (results) {
            //            $scope.basicExams = results;
            //        });
            //    }
            //});
           // $scope.getPreExamNRReport = function () {
            var getPreExamNRReport = function () {
                //if ($scope.preExamNRReportForm.$valid) {
                    $scope.LoadImg = true;
                    var ExamID = "0";
                    var CollegeID = AppSettings.CollegeID;
                    var ExamInstID = AppSettings.ExamInstID;
                    PreExamNRReportService.getPreExamNRPDFReportBridge(ExamID, ExamInstID, CollegeID).then(function (results) {
                        if (results != "") {
                            $("#pdfviewer").attr("src", URL.createObjectURL(new Blob([results], {
                                type: "application/pdf"
                            })))
                            $scope.ShowPrint = true;
                            $scope.LoadImg = false;
                        }
                    }, function (error) {
                        $scope.PreExamNRReport = {};
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
                //}
            };
            
        });
}());