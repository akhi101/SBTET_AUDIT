define(['app'], function (app) {
    app.controller("RptConstitutedCenterListDistrictWiseController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService) {
        $scope.RptConstitutedCenterListDistrictWise = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        var RptConstitutedCenterListDistrictWiseRightsdata = [];
        RptConstitutedCenterListDistrictWiseRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptConstitutedCenterListDistrictWiseRightsdata.length; i++) {
            if (RptConstitutedCenterListDistrictWiseRightsdata[i].GridFormToOpen == PageNm) {

            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.RptConstitutedCenterListDistrictWise.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            //$scope.GetPreZoneData($scope.RptConstitutedCenterListDistrictWise.DistrictID);
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        $scope.PrintConstitutedCenterListDistrictWise = function () {
            if (CheckValidation() == true) {
                var Urlstring = "api/PreZoneCenter/GetConstitutedCenterList/?DistrictID=" + $scope.RptConstitutedCenterListDistrictWise.DistrictID + "&ZoneID=0&ExamInstID=" + AppSettings.ExamInstID;
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
                        var datasetName1 = "ConstitutedCenterListDistrictWise";
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
            if (($scope.RptConstitutedCenterListDistrictWise == undefined)) {
                alert("Select District");
                return false;
            }
            if (($scope.RptConstitutedCenterListDistrictWise.DistrictID == undefined) || ($scope.RptConstitutedCenterListDistrictWise.DistrictID == "")) {
                alert("Select District");
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
                reportPath: "RptConstitutedCenterListDistrictWise.rdlc",
                dataSources: [{ value: [], name: "ConstitutedCenterListDistrictWise" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
