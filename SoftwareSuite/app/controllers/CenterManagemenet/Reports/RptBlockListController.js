define(['app'], function (app) {
    app.controller("RptBlockListController", function ($scope, $state, $filter, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService, BasicExamSubjectService) {
        $scope.RptBlockList = {};
        var CenterName = "";
        var ReportName = 'RptBlockList.rdlc';
        var PageNm = $state.current.name.split(".")[1] + "List";
        varRptBlockListRightsdata = [];
        RptBlockListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptBlockListRightsdata.length; i++) {
            if (RptBlockListRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.RptBlockList.PreZoneCntrID == 0) {
                    if (RptBlockListRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (RptBlockListRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (RptBlockListRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.RptBlockList.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetPreZoneCenterName($scope.RptBlockList.DistrictID);
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });
        $scope.GetPreZoneCenterName = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PreZoneCenterList = PreZoneCenterService.GetPreZoneCenterName(DistrictID, AppSettings.ExamInstID);
                PreZoneCenterList.then(function (PreZoneCenterData, status, headers, config, error) {
                    $scope.PreZoneCenterList = PreZoneCenterData;
                }, function (PreZoneCenterData, status, headers, config) {
                    alert(error);
                })
            }
        }
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
        }, function (ExamData, status, headers, config) {
            alert(error);
        })
        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.GetCenterName = function (PreZoneCntrID) {
            for (var i = 0; i < $scope.PreZoneCenterList.length; i++) {
                if (PreZoneCntrID == $scope.PreZoneCenterList[i].PreZoneCntrID) {
                    CenterName = $scope.PreZoneCenterList[i].CenterName;
                }
            }
        }
        $scope.GetBasicExamSubjectList = function (ExamID) {
            if (ExamID != "" || ExamID != undefined) {
                var BasicExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectListByExamID(ExamID, 1);
                BasicExamSubjectList.then(function (BasicExamSubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = BasicExamSubjectData;
                }, function (BasicExamSubjectData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.PrintBlockSeatingArrangment = function () {
            if (CheckValidation() == true) {
                ReportName = 'RptBlockSeatingArrangement.rdlc';
                var Urlstring = "api/PreZoneCenter/GetBlockList/?ExmSubID=" + $scope.RptBlockList.ExmSubID + "&PreZoneCntrID=" + $scope.RptBlockList.PreZoneCntrID + "&ExamInstID=" + AppSettings.ExamInstID + "&ExamID=" + $scope.RptBlockList.ExamID;
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
                        $("#reportviewer").ejReportViewer(
                            {
                                isResponsive: true,
                                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                                processingMode: ej.ReportViewer.ProcessingMode.Local,
                                reportPath: 'RptBlockSeatingArrangement.rdlc',
                                dataSources: [{ value: [], name: "BlockList" }],
                                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                                reportError: function (args) {
                                    if (args.dataSources != undefined) {
                                        alert("Error...Some error occured in processing report");
                                    }
                                }
                            });
                        var datasetName1 = "BlockList";
                        if (data[0][0].SeatingArrangement.length == 0) {
                            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                        }
                        data[0][0].SeatingArrangement[0].CenterName = CenterName;
                        reportModel.model.dataSources = [{ value: data[0][0].SeatingArrangement,name: datasetName1 }];
                        reportModel._refreshReport();
                    }
                });
            }
        }
        $scope.PrintBlockList = function () {
            if (CheckValidation() == true) {
                ReportName = 'RptBlockList.rdlc';
                var Urlstring = "api/PreZoneCenter/GetBlockList/?ExmSubID=" + $scope.RptBlockList.ExmSubID + "&PreZoneCntrID=" + $scope.RptBlockList.PreZoneCntrID + "&ExamInstID=" + AppSettings.ExamInstID + "&ExamID=" + $scope.RptBlockList.ExamID;;
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
                        $("#reportviewer").ejReportViewer(
                            {
                                isResponsive: true,
                                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                                processingMode: ej.ReportViewer.ProcessingMode.Local,
                                reportPath: 'RptBlockList.rdlc',
                                dataSources: [{ value: [], name: "BlockList" }],
                                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                                reportError: function (args) {
                                    if (args.dataSources != undefined) {
                                        alert("Error...Some error occured in processing report");
                                    }
                                }
                            });
                        var datasetName1 = "BlockList";
                        if (data[0].length == 0) {
                            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                        }
                        data[0][0].CenterName = CenterName;
                        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                        reportModel._refreshReport();
                    }
                });
            }
        }
        function CheckValidation() {
            if (($scope.RptBlockList.DistrictID == undefined) || ($scope.RptBlockList.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.RptBlockList.PreZoneCntrID == undefined) || ($scope.RptBlockList.PreZoneCntrID == "")) {
                alert("Select Center");
                return false;
            }
            if (($scope.RptBlockList.CourseID == undefined) || ($scope.RptBlockList.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.RptBlockList.ExamID == undefined) || ($scope.RptBlockList.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            if (($scope.RptBlockList.ExamID == ExmSubID) || ($scope.RptBlockList.ExmSubID == "")) {
                alert("Select Subject");
                return false;
            }
            else {
                return true;
            }
        }
        //varRptBlockList = [];
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('PreExam');
        }
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: ReportName,
                dataSources: [{ value: [], name: "BlockList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
