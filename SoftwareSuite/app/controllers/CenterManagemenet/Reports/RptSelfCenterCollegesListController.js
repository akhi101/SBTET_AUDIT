define(['app'], function (app) {
    app.controller("RptSelfCenterCollegesListController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService) {
        $scope.RptSelfCenterCollegesList = { PreZoneCntrID: $stateParams.PreZoneCntrID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var RptSelfCenterCollegesListRightsdata = [];
        RptSelfCenterCollegesListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptSelfCenterCollegesListRightsdata.length; i++) {
            if (RptSelfCenterCollegesListRightsdata[i].GridFormToOpen == PageNm) {
          
            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.RptSelfCenterCollegesList.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            //$scope.GetCollegeData($scope.RptPracticalBatchList.DistrictID);
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        $scope.PrintSelfCenterCollegesList = function () {
            if (CheckValidation() == true) {
                var Urlstring = "api/PreZoneCenter/GetSelfCenterCollegesList/?DistrictID=" + $scope.RptSelfCenterCollegesList.DistrictID + "&ExamInstID=" + AppSettings.ExamInstID;
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
                        var datasetName1 = "SelfCenterCollegesList";
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
            if (($scope.RptSelfCenterCollegesList.DistrictID == undefined) || ($scope.RptSelfCenterCollegesList.DistrictID == "")) {
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
                reportPath: "RptSelfCenterCollegesList.rdlc",
                dataSources: [{ value: [], name: "SelfCenterCollegesList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
