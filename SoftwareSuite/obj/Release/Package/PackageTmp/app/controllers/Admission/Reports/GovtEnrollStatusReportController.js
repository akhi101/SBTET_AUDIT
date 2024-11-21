define(['app'], function (app) {
    app.controller("GovtEnrollStatusReportController", function ($scope, $localStorage,$filter, $state, $interval, $stateParams, AppSettings) {
        var authData = $localStorage.authorizationData;
        AppSettings.LoggedUserId = authData.SysUserID;
        $scope.userName = authData.userName;
        $scope.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        AppSettings.SeqNo = authData.SeqNo;
        AppSettings.DistrictIDs = authData.DistrictIDs;

        $scope.GovtOrPvt = "G";
        $scope.rptName = "RptStudentEnrollmentCountDistrictWise.rdlc";
        $scope.Print = function () {
            if ($scope.GovtOrPvt == "G") {
                $scope.rptName = "RptStudentEnrollmentCountDistrictWise.rdlc";
            } else {
                $scope.rptName = "RptStudentEnrollmentCountDistrictWisePVT.rdlc";
            }
            //var Urlstring = "api/GovtColEnroll/GetGovtEnrollStatusReport/?AcdYrID=" + AppSettings.AcdYrID + "&LoggedUserId=" + AppSettings.LoggedUserId;
            var Urlstring = "api/GovtColEnroll/GetGovtEnrollStatusReportGovtOrPVT/?AcdYrID=" + AppSettings.AcdYrID + "&LoggedUserId=" + AppSettings.LoggedUserId + "&GovtOrPVT=" + $scope.GovtOrPvt;
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
                    var datasetName1 = "dsStudentEnrollmentCountDistrictWise";
                    if (data[0].length == 0) {
                        reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
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
                $scope.rptName = "RptStudentEnrollmentCountDistrictWise.rdlc";
                $("#reportviewer").ejReportViewer(
                    {
                        isResponsive: true,
                        reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                        processingMode: ej.ReportViewer.ProcessingMode.Local,
                        reportPath: $scope.rptName,
                        toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                        reportError: function (args) {
                            if (args.dataSources != undefined) {
                                alert("Error...Some error occured in processing report");
                            }
                        }
                    });
            }
            else {
                $scope.rptName = "RptStudentEnrollmentCountDistrictWisePVT.rdlc";
                $("#reportviewer").ejReportViewer(
                    {
                        isResponsive: true,
                        reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                        processingMode: ej.ReportViewer.ProcessingMode.Local,
                        reportPath: $scope.rptName,
                        toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                        reportError: function (args) {
                            if (args.dataSources != undefined) {
                                alert("Error...Some error occured in processing report");
                            }
                        }
                    });
            }
            var reportModel = $("#reportviewer").data('ejReportViewer');
            reportModel.model.dataSources = [{ value: [], name: "dsStudentEnrollmentCountDistrictWise" }];
            reportModel._refreshReport();
        }
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: $scope.rptName,
                dataSources: [{ value: [], name: "dsStudentEnrollmentCountDistrictWise" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});