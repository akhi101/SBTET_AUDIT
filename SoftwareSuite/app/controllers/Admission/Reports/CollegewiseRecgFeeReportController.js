define(['app'], function (app) {
    app.controller("CollegewiseRecgFeeReportController", function ($scope, $localStorage, $filter, $state, $interval, $stateParams, AppSettings, MenuService) {
        var authData = $localStorage.authorizationData;
        AppSettings.LoggedUserId = authData.SysUserID;
        $scope.userName = authData.userName;
        $scope.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        AppSettings.SeqNo = authData.SeqNo;
        AppSettings.DistrictIDs = authData.DistrictIDs;

        $scope.GovtOrPvt = "P";
        $scope.rptName = "RptCollegewiseRecgFeeReport.rdlc";

        $scope.Print = function () {
            //if (($scope.DistrictID == undefined) || ($scope.DistrictID == "")) {
            //    alert("Select District");
            //    return;
            //}
            if (($scope.DistrictID == undefined) || ($scope.DistrictID == "")) {
                $scope.DistrictID = 0;
            }
            if ($scope.GovtOrPvt == "G") {
                $scope.rptName = "RptCollegewiseRecgFeeReport.rdlc";
            } else {
                $scope.rptName = "RptCollegewiseRecgFeeReport.rdlc";
            }
            //var Urlstring = "api/GovtColEnroll/GetGovtEnrollCollegeReport/?AcdYrID=" + AppSettings.AcdYrID + "&DistrictID=" + $scope.DistrictID + "&LoggedUserId=" + AppSettings.LoggedUserId;
            var Urlstring = "api/GovtColEnroll/GetCollegewiseRecgFeeReport/?AcdYrID=" + AppSettings.AcdYrID + "&DistrictID=" + $scope.DistrictID + "&LoggedUserId=" + AppSettings.LoggedUserId + "&GovtOrPvt=" + $scope.GovtOrPvt;
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
                    var datasetName1 = "DataSet1";
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
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('BoardReportList');
        }
        $scope.ClgTypeChange = function (GovtOrPvt) {
            if (GovtOrPvt == "G") {
                $scope.rptName = "RptCollegewiseRecgFeeReport.rdlc";
                $("#reportviewer").ejReportViewer(
                    {
                        isResponsive: true,
                        reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                        processingMode: ej.ReportViewer.ProcessingMode.Local,
                        reportPath: $scope.rptName,
                        dataSources: [{ value: [], name: "DataSet1" }],
                        toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                        reportError: function (args) {
                            if (args.dataSources != undefined) {
                                alert("Error...Some error occured in processing report");
                            }
                        }
                    });
            }
            else {
                $scope.rptName = "RptCollegewiseRecgFeeReport.rdlc";
                $("#reportviewer").ejReportViewer(
                    {
                        isResponsive: true,
                        reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                        processingMode: ej.ReportViewer.ProcessingMode.Local,
                        reportPath: $scope.rptName,
                        dataSources: [{ value: [], name: "DataSet1" }],
                        toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                        reportError: function (args) {
                            if (args.dataSources != undefined) {
                                alert("Error...Some error occured in processing report");
                            }
                        }
                    });
            }
            var reportModel = $("#reportviewer").data('ejReportViewer');
            reportModel.model.dataSources = [{ value: [], name: "DataSet1" }];
            reportModel._refreshReport();
        }
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: $scope.rptName ,
                dataSources: [{ value: [], name: "DataSet1" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
        //var DistrictList = MenuService.GetDistrictListByStateID(1);
        var DistrictList = MenuService.GetDistrictListByLoggedID(1, AppSettings.LoggedUserId)
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });
    });
});