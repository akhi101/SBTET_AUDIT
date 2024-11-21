(function () {
    'use strict';
    angular.module('app')
        .controller('NRDetailReportController', 
        function ($rootScope, $scope, basicCourseService, basicExamService, basicCollegeService, NRDetailReportService, basicDistrictsService, basicMainGroupService, AppSettings) {
                
                $scope.NRDetailReportDetail = {};
                $scope.ReportType = "N";
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

                $scope.$watch('NRDetailReportDetail.CourseID', function () {
                    if ($scope.NRDetailReportDetail.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.NRDetailReportDetail.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.NRDetailReportDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });
                //$scope.$watch('NRDetailReportDetail.DistrictID', function () {
                //    if ($scope.NRDetailReportDetail.DistrictID !== undefined) {
                //        basicCollegeService.getCollegeListByDistrict($scope.NRDetailReportDetail.DistrictID).then(function (results) {
                //            $scope.basicCollegeList = results;
                //        });
                //    }
                //});

                //$scope.$watch('NRDetailReportDetail.CollegeID', function () {
                //    if ($scope.NRDetailReportDetail.CollegeID !== undefined) {
                //        basicMainGroupService.getAllBasicMainGroup($scope.NRDetailReportDetail.CollegeID).then(function (results) {
                //            $scope.basicMainGroupList = results;
                //        });
                //    }
                //});
                //$scope.reportPath1 = "rptFygenNRDetails.rdlc";
                //$("#container").ejReportViewer(
                //    {
                //        isResponsive: true,
                //        reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                //        processingMode: ej.ReportViewer.ProcessingMode.Local,
                //        reportPath: $scope.reportPath1,
                //        dataSources: [{ value: [], name: "dsNRDetails" }],
                //        toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                //        reportError: function (args) {
                //            if (args.dataSources != undefined) {
                //                alert("Error...Some error occured in processing report");
                //            }
                //        }
                //    });
                //$scope.getNRDetailReport = function () {
                //    if ($scope.nRDetailReportForm.$valid) {
                //        var ExamID = $scope.NRDetailReportDetail.ExamID;
                //        if ($scope.NRDetailReportDetail.ExamID == 1) {
                //            $scope.reportPath1 = "rptFygenNRDetails.rdlc";
                //            $("#container").ejReportViewer(
                //                {
                //                    reportPath: "rptFygenNRDetails.rdlc"
                //                });
                //        } 
                //        else if ($scope.NRDetailReportDetail.ExamID == 2) {
                //            $scope.reportPath1 = "rptSygenNRDetails.rdlc";
                //            $("#container").ejReportViewer(
                //                {
                //                    reportPath: "rptSygenNRDetails.rdlc"
                //                });
                //        }
                //        else if ($scope.NRDetailReportDetail.ExamID == 3) {
                //            $scope.reportPath1 = "rptFyvocExamNRDetails.rdlc";
                //            $("#container").ejReportViewer(
                //                {
                //                    reportPath: "rptFyvocExamNRDetails.rdlc"
                //                });
                //        }
                //        else if ($scope.NRDetailReportDetail.ExamID == 4) {
                //            $scope.reportPath1 = "rptSyvocExamNRDetails.rdlc";
                //            $("#container").ejReportViewer(
                //                {
                //                    reportPath: "rptSyvocExamNRDetails.rdlc"
                //                });
                //        }
                //        var CollegeID = AppSettings.CollegeID;                     
                //        var ExamInstID = AppSettings.ExamInstID;
                //        var ReqType = $scope.ReportType;
                //        var Urlstring = "api/NRDetail/GetClgExmFrmNRDetail?ExamID=" + ExamID + "&CollegeID=" + CollegeID + "&ExamInstID=" + ExamInstID + "&ReqType=" + ReqType + "";
                //        $.ajax({
                //            url: AppSettings.WebApiUrl + Urlstring,
                //            dataType: "json",
                //            type: "GET",
                //            processData: false,
                //            crossDomain: true,
                //            async: false,
                //            timeout: 5000,
                //            success: function (result) {
                //                var data = [];
                //                data.push(result);
                //                var reportModel = $("#container").data('ejReportViewer');
                //                var datasetName1 = "dsNRDetails";
                //                if (data[0].length == 0) {
                //                    reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                //                    reportModel._refreshReport();
                //                    alert("Data Not Found");
                //                    return;
                //                }
                //                reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                //                reportModel._refreshReport();
                //                $scope.ShowPrint = true;
                //            }   
                //        });
                //    }

                //};

                $scope.getNRDetailReport = function () {
                    if ($scope.nRDetailReportForm.$valid) {
                        $scope.LoadImg = true;
                        var ExamID = $scope.NRDetailReportDetail.ExamID;
                        var CollegeID = AppSettings.CollegeID;
                        var ExamInstID = AppSettings.ExamInstID;
                        var ReqType = $scope.ReportType;
                        NRDetailReportService.getNRDetailByPDF(ExamID, CollegeID, ExamInstID, ReqType).then(function (results) {
                            if (results != "") {
                                $("#pdfviewer").attr("src", URL.createObjectURL(new Blob([results], {
                                    type: "application/pdf"
                                })))
                                $scope.ShowPrint = true;
                                $scope.LoadImg = false;
                            }
                        }, function (error) {
                            $scope.NRDetailReportDetail = {};
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
                $scope.printNRDetail = function () {
                    if ($scope.nRDetailReportForm.$valid) {
                        $scope.LoadImg = true;
                        var ExamID = $scope.NRDetailReportDetail.ExamID;
                        var CollegeID = AppSettings.CollegeID;                   
                        var ExamInstID = AppSettings.ExamInstID; 
                        var ReqType = $scope.ReportType;
                        NRDetailReportService.getNRDetailByType(ExamID, CollegeID, ExamInstID, ReqType).then(function (results) {
                            if (results != "") {
                                $scope.NRDetailReportDetail = {};
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
                            $scope.NRDetailReportDetail = {};
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