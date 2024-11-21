define(['app'], function (app) {
    app.controller("ReportOfPreZoneController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, PreZoneService, BasicDistrictsService) {
        $scope.ReportOfPreZone = { PreZoneCntrID: $stateParams.PreZoneCntrID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ReportOfPreZoneRightsdata = [];
        ReportOfPreZoneRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ReportOfPreZoneRightsdata.length; i++) {
            if (ReportOfPreZoneRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ReportOfPreZone.PreZoneCntrID == 0) {
                    if (ReportOfPreZoneRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ReportOfPreZoneRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ReportOfPreZoneRightsdata[i].isdeletable == 'Y') {
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
            { ReportTypeName: 'Bridge Vocational Practical', ReportType: '4' } 
            
        ];

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.ReportOfPreZone.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        $scope.PrintZoneList = function () {
            if (CheckValidation() == true) {
                var Urlstring = "api/PreZone/GetPreZoneListForReport/?DistrictID=" + $scope.ReportOfPreZone.DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "&ZoneType=" + $scope.ReportOfPreZone.ReportType;
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
                        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                        reportModel._refreshReport();
                    }
                });
            }
        }
        function CheckValidation() {
            if (($scope.ReportOfPreZone.DistrictID == undefined) || ($scope.ReportOfPreZone.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.ReportOfPreZone.ReportType == undefined) || ($scope.ReportOfPreZone.ReportType == "")) {
                alert("Select Report Type");
                return false;
            }		
            if (($scope.ReportOfPreZone.MandalID == undefined) || ($scope.ReportOfPreZone.MandalID == "")) {
                $scope.ReportOfPreZone.MandalID = 0;
                return true;
            }
            else {
                return true;
            }
        }
        var ReportOfPreZone = [];
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
                reportPath: "RptPreZoneList.rdlc",
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
