define(['app'], function (app) {
    app.controller("RptCenterListController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, PreZoneService) {
        $scope.RptCenterList = { PreZoneCntrID: $stateParams.PreZoneCntrID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var RptCenterListRightsdata = [];
        RptCenterListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptCenterListRightsdata.length; i++) {
            if (RptCenterListRightsdata[i].GridFormToOpen == PageNm) {

            }
        }
        $scope.RptCenterList.ChkSensiCompli = true;
        $scope.RptCenterList.ChkVocationalMinorSub = false;
        $scope.CheckSensiCompli = function (ChkSensiCompli) {
            if (ChkSensiCompli == true) {
                $scope.RptCenterList.ChkVocationalMinorSub = false;
            }
        }
        $scope.CheckVocational = function (ChkVocationalMinorSub) {
            if (ChkVocationalMinorSub == true) {
                $scope.RptCenterList.ChkSensiCompli = false;
            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.RptCenterList.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetPreZoneData($scope.RptCenterList.DistrictID);
        }, function (Castdata, status, headers, config) {
            alert(error);
            });
        $scope.GetPreZoneData = function (DistrictID) {
            $scope.PreZoneClgList = [];
            if (DistrictID != "") {
                var PreZoneList = PreZoneService.GetPreZoneListByDistrictId(DistrictID,AppSettings.ExamInstID,1);
                PreZoneList.then(function (PreZoneData, status, headers, config, error) {
                    $scope.PreZoneList = PreZoneData;
                }, function (PreZoneData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.PrintCenterList = function () {
            if (CheckValidation() == true) {
                var ReportType= "";
                if ($scope.RptCenterList.ChkSensiCompli == true) {
                    ReportType = "S";
                }
                if ($scope.RptCenterList.ChkVocationalMinorSub == true) {
                    ReportType = "V";
                }
                var Urlstring = "api/PreZoneCenter/GetCenterList/?DistrictID=" + $scope.RptCenterList.DistrictID + "&ZoneID=" + $scope.RptCenterList.ZoneID + "&ReportType=" + ReportType + "&ExamInstID=" + AppSettings.ExamInstID;
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
                        var datasetName1 = "CenterList";
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
            if (($scope.RptCenterList.DistrictID == undefined) || ($scope.RptCenterList.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.RptCenterList.ZoneID == undefined) || ($scope.RptCenterList.ZoneID == "")) {
                alert("Select Zone");
                return false;
            }
            if (($scope.RptCenterList.ChkSensiCompli == false) && ($scope.RptCenterList.ChkVocationalMinorSub == false)) {
                alert("Select Report Type");
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
                reportPath: "RptCenterListZoneWise.rdlc",
                dataSources: [{ value: [], name: "CenterList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
