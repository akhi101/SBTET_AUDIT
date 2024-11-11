define(['app'], function (app) {
    app.controller("PracticalContigencyReportController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService, PrePractCenterService) {
        $scope.PracticalContigencyReport = {};
        $scope.PracticalContigencyReport.ExamInstID = AppSettings.ExamInstID;
        var ReportName = 'RptPracticalContegincyReport.rdlc';
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PracticalContigencyReportRightsdata = [];
        PracticalContigencyReportRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PracticalContigencyReportRightsdata.length; i++) {
            if (PracticalContigencyReportRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PracticalContigencyReport.OtherCenterID == 0) {
                    if (PracticalContigencyReportRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PracticalContigencyReportRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PracticalContigencyReportRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        $scope.isupdatableDisable = false;
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.PracticalContigencyReport.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });

        $scope.GetPracticalContigencyReport = function () {
            $scope.PracticalContigencyReport.DistrictID = $scope.PracticalContigencyReport.DistrictID;
            $scope.PracticalContigencyReport.ExamInstID = AppSettings.ExamInstID;
            $scope.PracticalContigencyReport.UpdLoginID = AppSettings.LoggedUserId;

            if ($scope.PracticalContigencyReport.DistrictID == undefined || $scope.PracticalContigencyReport.DistrictID == "") {
                $scope.PracticalContigencyReport.DistrictID = 0;
            }

            if (CheckValidation() == true) {
                var Urlstring = "api/PreExmSpelPract/GetPracticalContingencyReportByDistWise/?DistrictID=" + $scope.PracticalContigencyReport.DistrictID + "&ExamInstID=" + AppSettings.ExamInstID;;
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
                                reportPath: 'RptPracticalContegincyReport.rdlc',
                                dataSources: [{ value: [], name: "dsPracticalContegincyReport" }],
                                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                                reportError: function (args) {
                                    if (args.dataSources != undefined) {
                                        alert("Error...Some error occured in processing report");
                                    }
                                }
                            });
                        var datasetName1 = "dsPracticalContegincyReport";
                        if (data[0].length == 0) {
                            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                        }
                        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                        reportModel._refreshReport();
                    }
                });

            }
        }

        $scope.GetPracticalContigencyReportByCenter = function () {
            $scope.PracticalContigencyReport.DistrictID = $scope.PracticalContigencyReport.DistrictID;
            $scope.PracticalContigencyReport.ExamInstID = AppSettings.ExamInstID;
            $scope.PracticalContigencyReport.UpdLoginID = AppSettings.LoggedUserId;

            if ($scope.PracticalContigencyReport.DistrictID == undefined || $scope.PracticalContigencyReport.DistrictID == "") {
                $scope.PracticalContigencyReport.DistrictID = 0;
            }

            if (CheckValidation() == true) {
                var Urlstring = "api/PreExmSpelPract/GetPracticalContingencyReportByCenterWise/?DistrictID=" + $scope.PracticalContigencyReport.DistrictID + "&ExamInstID=" + AppSettings.ExamInstID;;
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
                                reportPath: 'RptCenterWisepracticalContingent.rdlc',
                                dataSources: [{ value: [], name: "dsPracticalContegincyReport" }],
                                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                                reportError: function (args) {
                                    if (args.dataSources != undefined) {
                                        alert("Error...Some error occured in processing report");
                                    }
                                }
                            });
                        var datasetName1 = "dsPracticalContegincyReport";
                        if (data[0].length == 0) {
                            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                        }
                        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                        reportModel._refreshReport();
                    }
                });

            }
        }

        function CheckValidation() {
                return true;
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $scope.isupdatableDisable = false;
            $state.go('PreExam');
        }

        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: ReportName,
                dataSources: [{ value: [], name: "dsPracticalContegincyReport" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
