(function () {
    'use strict';
    angular.module('app')
        .controller('PreExamNRReportController',
        function ($rootScope, $scope, basicCourseService, basicExamService, basicCollegeService, PreExamNRReportService, basicDistrictsService, basicMainGroupService, AppSettings) {

            $scope.PreExamNRReport = {};
            $scope.ReportType = "N";
            $scope.PreExamNRReport.TypeID = "0";
            $scope.LoadImg = false;
            $scope.ShowPrint = false;
            $scope.init = function () {
                getAllBasicCourse();
                //getAllBasicCollege();
                getBasicDistrictList();
            };
            //var getAllBasicCollege = function () {
            //    basicCollegeService.getAllBasicCollege().then(function (results) {
            //        $scope.basicColleges = results;
            //        // Add All In ArrayList Of Result
            //        //$scope.basicColleges.splice(0, 0, { CollegeID: 0, ColName: "All" });
            //    });
            //};
            //var getBasicDistrictList = function () {
            //    basicDistrictsService.getBasicDistrictsList().then(function (results) {
            //        $scope.basicDistrictList = results;
            //    });
            //};
            var getAllBasicCourse = function () {
                basicCourseService.getAllBasicCourse().then(function (results) {
                    $scope.basicCourses = results;
                });
            };

            $scope.$watch('PreExamNRReport.CourseID', function () {
                if ($scope.PreExamNRReport.CourseID !== undefined) {
                    //basicBranchService.getBasicBranchListByCourseId($scope.PreExamNRReport.CourseID).then(function (results) {
                    //    $scope.basicBranches = results;
                    //});
                    basicExamService.getBasicExamListByCourseID($scope.PreExamNRReport.CourseID).then(function (results) {
                        $scope.basicExams = results;
                    });
                }
            });
            //$scope.$watch('PreExamNRReport.DistrictID', function () {
            //    if ($scope.PreExamNRReport.DistrictID !== undefined) {
            //        basicCollegeService.getCollegeListByDistrict($scope.PreExamNRReport.DistrictID).then(function (results) {
            //            $scope.basicCollegeList = results;
            //        });
            //    }
            //});

            //$scope.$watch('PreExamNRReport.CollegeID', function () {
            //    if ($scope.PreExamNRReport.CollegeID !== undefined) {
            //        basicMainGroupService.getAllBasicMainGroup($scope.PreExamNRReport.CollegeID).then(function (results) {
            //            $scope.basicMainGroupList = results;
            //        });
            //    }
            //});

            $scope.getPreExamNRReport = function () {
                if ($scope.preExamNRReportForm.$valid) {
                    if ($scope.PreExamNRReport.TypeID == "" || $scope.PreExamNRReport.TypeID == undefined) {
                        alert("Select Regualr/Private");
                        return false;
                    }
                    else {
                        $scope.LoadImg = true;
                        var ExamID = $scope.PreExamNRReport.ExamID;
                        var CollegeID = AppSettings.CollegeID;
                        var ExamInstID = AppSettings.ExamInstID;
                        var TypeID = $scope.PreExamNRReport.TypeID;
                        PreExamNRReportService.getPreExamNRPDFReport(ExamID, ExamInstID, CollegeID, TypeID).then(function (results) {
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
                    }
                }
            };
            $scope.printPreExamNRReport = function () {
                if ($scope.preExamNRReportForm.$valid) {
                    $scope.LoadImg = true;
                    var ExamID = $scope.PreExamNRReport.ExamID;
                    var CollegeID = AppSettings.CollegeID;
                    var ExamInstID = AppSettings.ExamInstID;
                    PreExamNRReportService.getPreExamNRTextReport(ExamID, ExamInstID, CollegeID).then(function (results) {
                        if (results != "") {
                            $scope.PreExamNRReport = {};
                            var file = new Blob([results], { type: 'application/txt' });
                            var fileURL = URL.createObjectURL(file);
                            var date = new Date();
                            var fileName = "NRDetailReport(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").txt";
                            var a = document.createElement("a");
                            document.body.appendChild(a);
                            a.href = fileURL;
                            a.download = fileName;
                            a.click();
                            $scope.LoadImg = false;
                        }
                    }, function (error) {
                        $scope.PreExamNRReport = {};
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