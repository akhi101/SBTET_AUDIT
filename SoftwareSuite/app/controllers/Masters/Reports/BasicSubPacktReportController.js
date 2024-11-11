define(['app'], function (app) {
    app.controller("BasicSubPacktReportController", function ($scope, $state, $stateParams, AppSettings, BasicSubPacktService, BasicPacketService, BasicExamSubjectService, BasicCourseService, BasicExamService, BasicMainGroupService) {
        $scope.BasicSubPackt = {};
        $scope.BasicSubPackt.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PrePracVocScheduleReportRightsdata = [];

        // $scope.BasicSubPackt.CourseID = 1;
        $scope.rptName = "RptSubjectPacketReport.rdlc";
        $scope.MainGroupDisable = true;

        PrePracVocScheduleReportRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PrePracVocScheduleReportRightsdata.length; i++) {
            if (PrePracVocScheduleReportRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicSubPackt.OtherCenterID == 0) {
                    if (PrePracVocScheduleReportRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PrePracVocScheduleReportRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PrePracVocScheduleReportRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.isupdatableDisable = false;


        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            //$scope.PrePracticalBatchAllocation.CourseID = "2";
            // $scope.GetExamList($scope.PrePracticalBatchAllocation.CourseID);
        }, function (ExamData, status, headers, config) {
            alert(error);
        })

        var BasicPacketList = BasicPacketService.GetBasicPacketList(0);
        BasicPacketList.then(function (PacketData, status, headers, config, error) {
            $scope.BasicPacketList = PacketData;
        }, function (PacketData, status, headers, config) {
            alert(error);
        })

        $scope.GetExamList = function (CourseID) {
            FillExam(CourseID);
            FillMediumList(CourseID);

            FillMainGrpList(CourseID)

            CourseChange(CourseID);

            if (CourseID == 2) {
                $scope.MainGroupDisable = false;
            }
            else {
                $scope.MainGroupDisable = true;
            }
        }
        function FillMediumList(CourseID) {
            if (CourseID == 1) {
                var MedList = BasicSubPacktService.GetBasicMediumList();
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;
                }, function (error) {
                    alert(error);
                });
            }
            else {
                var MedList = BasicSubPacktService.GetBasicMediumByMediumID(1);
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;

                }, function (error) {
                    alert(error);
                });
            }
        }

        function FillMainGrpList(CourseID) {
            var BasicMainGrpList = BasicMainGroupService.GetMainGroupListByCourseIDForSubjectPacket(CourseID);
            BasicMainGrpList.then(function (MainGrpData, status, headers, config, error) {
                $scope.BasicMainGrpList = MainGrpData;
            }, function (error) {
                alert(error);
            });
        }
        function FillExam(CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                    //$scope.PrePracticalBatchAllocation.ExamID = "2";
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }



        $scope.GetSubjecPacketReport = function () {
            ////$scope.PrePracticalBatchAllocationReport.CourseID = $scope.PrePracticalBatchAllocationReport.CourseID;
            // //$scope.PrePracticalBatchAllocationReport.ExamID = $scope.PrePracticalBatchAllocationReport.ExamID;
            $scope.BasicSubPackt.ExamID = $scope.BasicSubPackt.ExamID;
            // $scope.BasicSubPackt.ExamInstID = AppSettings.ExamInstID;
            //$scope.BasicSubPackt.ExamInstID = 103;
            $scope.BasicSubPackt.MediumID = $scope.BasicSubPackt.MediumID;
            $scope.BasicSubPackt.SubjectType = $scope.BasicSubPackt.SubjectType;
            $scope.BasicSubPackt.PacktID = $scope.BasicSubPackt.PacktID;

            if ($scope.BasicSubPackt.MediumID == undefined || $scope.BasicSubPackt.MediumID == "") {
                $scope.BasicSubPackt.MediumID = 0;
            }
            if ($scope.BasicSubPackt.PcktID == undefined || $scope.BasicSubPackt.PcktID == "") {
                $scope.BasicSubPackt.PcktID = 0;
            }

            $scope.BasicSubPackt.UpdLoginID = AppSettings.LoggedUserId;
            //var ExamID = 2;

            if (CheckValidation() == true) {
                var Urlstring = "";

                if ($scope.BasicSubPackt.CourseID == 1) {
                    $scope.rptName = "RptSubjectPacketReport.rdlc";
                } else {
                    $scope.rptName = "RptVocationalSubjectPacketReport.rdlc";
                }
                if ($scope.BasicSubPackt.CourseID == 1) {

                    if ($scope.BasicSubPackt.SubjectType == "LS") {
                        Urlstring = "api/BasicSubPackt/GetSubjectPacketReportForLanguage/?ExamID=" + $scope.BasicSubPackt.ExamID + "&MediumID=" + $scope.BasicSubPackt.MediumID + "&PcktID=" + $scope.BasicSubPackt.PcktID + "&AcdYrID=" + AppSettings.AcdYrID;
                    }
                    if ($scope.BasicSubPackt.SubjectType == "GS") {
                        var Urlstring = "api/BasicSubPackt/GetSubjectPacketReport/?ExamID=" + $scope.BasicSubPackt.ExamID + "&MediumID=" + $scope.BasicSubPackt.MediumID + "&PcktID=" + $scope.BasicSubPackt.PcktID + "&AcdYrID=" + AppSettings.AcdYrID;
                    }
                    $.ajax({
                        url: AppSettings.WebApiUrl + Urlstring,
                        dataType: "json",
                        type: "GET",
                        processData: false,
                        crossDomain: true,
                        async: false,
                        timeout: 5000,
                        success: function (result) {
                            var data = [];
                            data.push(result);
                            var reportModel = $("#reportviewer").data('ejReportViewer');
                            var datasetName1 = "dsSubjectPacketReport";
                            if (data[0].length == 0) {
                                reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                                reportModel._refreshReport();
                                alert("Data Not Found");
                                return;
                            }
                            //data[0][0].CollegeName = CollegeName;
                            reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                            reportModel._refreshReport();
                        }
                    });
                }
                else {
                    if ($scope.BasicSubPackt.MainGrpID == "" || $scope.BasicSubPackt.MainGrpID == undefined) {
                        $scope.BasicSubPackt.MainGrpID = 0;
                    }
                    if ($scope.BasicSubPackt.SubjectType == "LS") {
                        Urlstring = "api/BasicSubPackt/GetVocationalSubjectPacketReportForLanguages/?CourseID=" + $scope.BasicSubPackt.CourseID + "&ExamID=" + $scope.BasicSubPackt.ExamID + "&AcdYrID=" + AppSettings.AcdYrID;
                    }
                    if ($scope.BasicSubPackt.SubjectType == "GS") {
                        var Urlstring = "api/BasicSubPackt/GetVocationalSubjectPacketReport/?CourseID=" + $scope.BasicSubPackt.CourseID + "&ExamID=" + $scope.BasicSubPackt.ExamID + "&MainGrpID=" + $scope.BasicSubPackt.MainGrpID + "&AcdYrID=" + AppSettings.AcdYrID;
                    }
                    $.ajax({
                        url: AppSettings.WebApiUrl + Urlstring,
                        dataType: "json",
                        type: "GET",
                        processData: false,
                        crossDomain: true,
                        async: false,
                        timeout: 5000,
                        success: function (result) {
                            var data = [];
                            data.push(result);
                            var reportModel = $("#reportviewer").data('ejReportViewer');
                            var datasetName1 = "dsVocationalSubjectPacketReport";
                            if (data[0].length == 0) {
                                reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                                reportModel._refreshReport();
                                alert("Data Not Found");
                                return;
                            }
                            //data[0][0].CollegeName = CollegeName;
                            reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                            reportModel._refreshReport();
                        }
                    });
                }
                //$.ajax({
                //    url: AppSettings.WebApiUrl + Urlstring,
                //    dataType: "json",
                //    type: "GET",
                //    processData: false,
                //    crossDomain: true,
                //    async: false,
                //    timeout: 5000,
                //    success: function (result) {
                //        var data = [];
                //        data.push(result);
                //        var reportModel = $("#reportviewer").data('ejReportViewer');
                //        var datasetName1 = "dsSubjectPacketReport";
                //        if (data[0].length == 0) {
                //            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                //            reportModel._refreshReport();
                //            alert("Data Not Found");
                //            return;
                //        }
                //        //data[0][0].CollegeName = CollegeName;
                //        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                //        reportModel._refreshReport();
                //    }
                //});
            }
        }

        function FillMediumList(CourseID) {
            if (CourseID == 1) {
                var MedList = BasicSubPacktService.GetBasicMediumList();
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;
                }, function (error) {
                    alert(error);
                });
            }
            else {
                var MedList = BasicSubPacktService.GetBasicMediumByMediumID(1);
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;

                }, function (error) {
                    alert(error);
                });
            }
        }

        function CheckValidation() {
            //if (($scope.BasicSubPackt.DistrictID == undefined) || ($scope.BasicSubPackt.DistrictID == "")) {
            //    alert("Select District");
            //    return false;
            //}
            ////if (($scope.PrePracticalBatchAllocationReport.CourseID == undefined) || ($scope.PrePracticalBatchAllocationReport.CourseID == "")) {
            ////    alert("Select Stream");
            ////    return false;
            ////}
            ////if (($scope.PrePracticalBatchAllocationReport.ExamID == undefined) || ($scope.PrePracticalBatchAllocationReport.ExamID == "")) {
            ////    alert("Select Year");
            ////    return false;
            ////}
            //if (($scope.BasicSubPackt.PrePractCntrID == undefined) || ($scope.BasicSubPackt.PrePractCntrID == "")) {
            //    //alert("Select Practical Center");
            //    //return false;
            //    $scope.BasicSubPackt.PrePractCntrID = 0;
            //    return true;
            //}
            //else {
            //    return true;
            //}
            return true;
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $scope.isupdatableDisable = false;
            $state.go('PreExam');
        }

        function CourseChange(CourseID) {
            if (CourseID == 1) {
                $scope.rptName = "RptSubjectPacketReport.rdlc";
                $("#reportviewer").ejReportViewer(
                    {
                        isResponsive: true,
                        reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                        processingMode: ej.ReportViewer.ProcessingMode.Local,
                        reportPath: $scope.rptName,
                        dataSources: [{ value: [], name: "dsSubjectPacketReport" }],
                        toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                        reportError: function (args) {
                            if (args.dataSources != undefined) {
                                alert("Error...Some error occured in processing report");
                            }
                        }
                    });
                var reportModel = $("#reportviewer").data('ejReportViewer');
                reportModel.model.dataSources = [{ value: [], name: "dsSubjectPacketReport" }];
                reportModel._refreshReport();
            }
            else {
                $scope.rptName = "RptVocationalSubjectPacketReport.rdlc";
                $("#reportviewer").ejReportViewer(
                    {
                        isResponsive: true,
                        reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                        processingMode: ej.ReportViewer.ProcessingMode.Local,
                        reportPath: $scope.rptName,
                        dataSources: [{ value: [], name: "dsVocationalSubjectPacketReport" }],
                        toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                        reportError: function (args) {
                            if (args.dataSources != undefined) {
                                alert("Error...Some error occured in processing report");
                            }
                        }
                    });
                var reportModel = $("#reportviewer").data('ejReportViewer');
                reportModel.model.dataSources = [{ value: [], name: "dsVocationalSubjectPacketReport" }];
                reportModel._refreshReport();
            }
        }

        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptSubjectPacketReport.rdlc",
                dataSources: [{ value: [], name: "dsSubjectPacketReport" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });

    //});
});
