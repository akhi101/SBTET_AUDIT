define(['app'], function (app) {
    app.controller("ReportOfZoneWiseCollegeAttachedController", function ($scope, $state, $stateParams, AppSettings, PreZoneService, BasicDistrictsService, BasicMandalService) {
        $scope.ReportOfZoneWiseCollegeAttached = { PreZoneCntrID: $stateParams.PreZoneCntrID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ReportOfZoneWiseCollegeAttachedRightsdata = [];
        ReportOfZoneWiseCollegeAttachedRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ReportOfZoneWiseCollegeAttachedRightsdata.length; i++) {
            if (ReportOfZoneWiseCollegeAttachedRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ReportOfZoneWiseCollegeAttached.PreZoneCntrID == 0) {
                    if (ReportOfZoneWiseCollegeAttachedRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ReportOfZoneWiseCollegeAttachedRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ReportOfZoneWiseCollegeAttachedRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        

        $scope.reportTypes = [
            { ReportTypeName: 'General Theory', ReportType: '1' },
            { ReportTypeName: 'General Practical', ReportType: '2' },
            { ReportTypeName: 'Vocational Practical', ReportType: '3' },
            { ReportTypeName: 'Bridge Vocational Practical', ReportType: '4' },
            { ReportTypeName: 'Bridge Theory', ReportType: '5' }
        ];

        $scope.ReportOfZoneWiseCollegeAttached.ReportType = '1';
        $scope.ReportOfZoneWiseCollegeAttached.Report = "RptZoneWiseCollegeAttached.rdlc";

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.ReportOfZoneWiseCollegeAttached.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetPreZoneData($scope.ReportOfZoneWiseCollegeAttached.DistrictID);
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        $scope.GetPreZoneData = function (DistrictID) {
            if (DistrictID != "") {
                if (($scope.ReportOfZoneWiseCollegeAttached.ReportType == undefined) || ($scope.ReportOfZoneWiseCollegeAttached.ReportType == "")) {
                    $scope.ReportOfZoneWiseCollegeAttached.ReportType = 1;
                }               
                var PreZoneList = PreZoneService.GetPreZoneListByDistrictId(DistrictID, AppSettings.ExamInstID, $scope.ReportOfZoneWiseCollegeAttached.ReportType);
                PreZoneList.then(function (PreZoneData, status, headers, config, error) {
                    $scope.PreZoneList = PreZoneData;
                }, function (PreZoneData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.PrintZoneWiseCollegeAttachedList = function () {
            if (CheckValidation() == true) {

                if ($scope.ReportOfZoneWiseCollegeAttached.ReportType == 1) {
                    $scope.ReportOfZoneWiseCollegeAttached.Report = "RptZoneWiseCollegeAttached.rdlc";
                } else if ($scope.ReportOfZoneWiseCollegeAttached.ReportType == 2) {
                    $scope.ReportOfZoneWiseCollegeAttached.Report = "RptZoneWiseCollegeAttachedGenPract.rdlc";
                } else if ($scope.ReportOfZoneWiseCollegeAttached.ReportType == 3) {
                    $scope.ReportOfZoneWiseCollegeAttached.Report = "RptZoneWiseCollegeAttachedVOCPractNew.rdlc";
                } else if ($scope.ReportOfZoneWiseCollegeAttached.ReportType == 4) {
                    $scope.ReportOfZoneWiseCollegeAttached.Report = "RptZoneWiseCollegeAttachedVOCBridgePract.rdlc";
                } else if ($scope.ReportOfZoneWiseCollegeAttached.ReportType == 5) {
                    $scope.ReportOfZoneWiseCollegeAttached.Report = "RptZoneWiseCollegeAttached.rdlc";
                }

                 var Urlstring = "api/PreZoneCollege/GetZoneWiseCollegeAttachedList/?ZoneID=" + $scope.ReportOfZoneWiseCollegeAttached.ZoneID + "&DistrictID=" + $scope.ReportOfZoneWiseCollegeAttached.DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "&ReportType=" + $scope.ReportOfZoneWiseCollegeAttached.ReportType;
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
                        var datasetName1 = "dsPreZone";
                        if (data[0].length == 0) {

                            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                        }
                        $scope.LoadImg = false;
                        $("#reportviewer").ejReportViewer(
                            {
                                reportPath: $scope.ReportOfZoneWiseCollegeAttached.Report ,
                            });
                        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                        reportModel._refreshReport();
                    }
                });
            }
        }
        function CheckValidation() {
            if (($scope.ReportOfZoneWiseCollegeAttached.DistrictID == undefined) || ($scope.ReportOfZoneWiseCollegeAttached.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.ReportOfZoneWiseCollegeAttached.ReportType == undefined) || ($scope.ReportOfZoneWiseCollegeAttached.ReportType == "")) {
                alert("Select Report Type");
                return false;
            }
            if (($scope.ReportOfZoneWiseCollegeAttached.ZoneID == undefined) || ($scope.ReportOfZoneWiseCollegeAttached.ZoneID == "")) {
                $scope.ReportOfZoneWiseCollegeAttached.ZoneID = 0;
                return true;
            }
            else {
                return true;
            }
        }
        var ReportOfZoneWiseCollegeAttached = [];
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('CenterManagemnet');
        }
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: $scope.ReportOfZoneWiseCollegeAttached.Report,
                dataSources: [{ value: [], name: "dsPreZone" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
