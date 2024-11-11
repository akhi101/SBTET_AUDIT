define(['app'], function (app) {
    app.controller("RptConstitutedCenterListZoneWiseController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService, PreZoneService) {
        $scope.RptConstitutedCenterListZoneWise = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        var RptConstitutedCenterListZoneWiseRightsdata = [];
        RptConstitutedCenterListZoneWiseRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptConstitutedCenterListZoneWiseRightsdata.length; i++) {
            if (RptConstitutedCenterListZoneWiseRightsdata[i].GridFormToOpen == PageNm) {

            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.RptConstitutedCenterListZoneWise.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetPreZoneData($scope.RptConstitutedCenterListZoneWise.DistrictID);
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        $scope.GetPreZoneData = function (DistrictID) {
            if (DistrictID != "") {
                var PreZoneList = PreZoneService.GetPreZoneListByDistrictId(DistrictID,AppSettings.ExamInstID,1);
                PreZoneList.then(function (PreZoneData, status, headers, config, error) {
                    $scope.PreZoneList = PreZoneData;
                }, function (PreZoneData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.PrintConstitutedCenterListZoneWise = function () {
            if (CheckValidation() == true) {
                var Urlstring = "api/PreZoneCenter/GetConstitutedCenterList/?DistrictID=" + $scope.RptConstitutedCenterListZoneWise.DistrictID + "&ZoneID=" + $scope.RptConstitutedCenterListZoneWise.ZoneID + "&ExamInstID=" + AppSettings.ExamInstID;
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
                        var datasetName1 = "ConstitutedCenterListZoneWise";
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
            if (($scope.RptConstitutedCenterListZoneWise.DistrictID == undefined) || ($scope.RptConstitutedCenterListZoneWise.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.RptConstitutedCenterListZoneWise.ZoneID == undefined) || ($scope.RptConstitutedCenterListZoneWise.ZoneID == "")) {
                alert("Select Zone");
                return false;
            }
            else {
                return true;
            }
        }
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
                reportPath: "RptConstitutedCenterListZoneWise.rdlc",
                dataSources: [{ value: [], name: "ConstitutedCenterListZoneWise" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
