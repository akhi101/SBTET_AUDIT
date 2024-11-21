define(['app'], function (app) {
    app.controller("GovtEnrollStudentReportController", function ($scope, $localStorage, $filter, $state, $interval, $stateParams, AppSettings, MenuService) {
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
        $scope.rptName = "RptStudentEnrollmentCount.rdlc";
        $scope.Print = function () {
            if (($scope.DistrictID == undefined) || ($scope.DistrictID == "")) {
                alert("Select District");
                return;
            }
            if (($scope.CollegeID == undefined) || ($scope.CollegeID == "") || ($scope.CollegeID == 0)) {
                alert("Select College");
                return;
            }
            if (($scope.CollegeID == undefined) || ($scope.CollegeID == "")) {
                $scope.CollegeID = 0;
            }
            var Urlstring = "";
            if ($scope.GovtOrPvt == "G") {

                 Urlstring = "api/GovtColEnroll/GetGovtEnrollStudentReport/?AcdYrID=" + AppSettings.AcdYrID + "&CollegeID=" + $scope.CollegeID + "&DistrictID=" + $scope.DistrictID;
            } else {
                Urlstring = "api/GovtColEnroll/GetGovtEnrollStudentReportPVT/?AcdYrID=" + AppSettings.AcdYrID + "&CollegeID=" + $scope.CollegeID + "&DistrictID=" + $scope.DistrictID;
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
                    var datasetName1 = "dsStudentEnrollmentCount";
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
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: $scope.rptName,
                dataSources: [{ value: [], name: "dsStudentEnrollmentCount" }],
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
        $scope.FillCollege = function (DistrictID) {
            $scope.CollegeList = [];
            if (DistrictID != "") {
                var CollegeList = MenuService.GetCollegeListByDistrictAndMandalGovtPvt(AppSettings.AcdYrID, DistrictID, $scope.GovtOrPvt);
                CollegeList.then(function (data, status, headers, config, error) {
                    $scope.CollegeList = data;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.ClgTypeChange = function (GovtOrPvt) {
            $scope.CollegeList = [];
            $scope.DistrictID = "";
            if (GovtOrPvt == "G") {
                $scope.rptName = "RptStudentEnrollmentCount.rdlc";
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
                $scope.rptName = "RptStudentEnrollmentCountPVT.rdlc";
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
            reportModel.model.dataSources = [{ value: [], name: "dsStudentEnrollmentCount" }];
            reportModel._refreshReport();
        }
    });
});