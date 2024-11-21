define(['app'], function (app) {
    app.controller("RptDistrictCenterListController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService) {
        $scope.RptDistrictCenterList = { };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var RptDistrictCenterListRightsdata = [];
        RptDistrictCenterListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptDistrictCenterListRightsdata.length; i++) {
            if (RptDistrictCenterListRightsdata[i].GridFormToOpen == PageNm) {

            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.RptDistrictCenterList.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            //$scope.GetPreZoneData($scope.RptDistrictCenterList.DistrictID);
        }, function (Castdata, status, headers, config) {
            alert(error);
            });

        $scope.reportTypes = [
            { ReportTypeName: 'General Theory', ReportType: '1' },
            { ReportTypeName: 'General Practical', ReportType: '2' },
            { ReportTypeName: 'Vocational Practical', ReportType: '3' },
            { ReportTypeName: 'Bridge Vocational Practical', ReportType: '4' }
            //{ ReportTypeName: ' ', ReportType: '5' }
        ];

        $scope.PrintCenterDistrictList = function () {
            if (CheckValidation() == true) {
                var ReportType= "A";
                var Urlstring = "api/PreZoneCenter/GetCenterList/?DistrictID=" + $scope.RptDistrictCenterList.DistrictID + "&ZoneID=0&ReportType=" + ReportType + "&ExamInstID=" + AppSettings.ExamInstID + "&ZopeType=" + $scope.RptDistrictCenterList.ReportType ;
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
            if (($scope.RptDistrictCenterList == undefined)) {
                alert("Select District");
                return false;
            }
            if (($scope.RptDistrictCenterList.DistrictID == undefined) || ($scope.RptDistrictCenterList.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.RptDistrictCenterList.ReportType == undefined) || ($scope.RptDistrictCenterList.ReportType == "")) {
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
                reportPath: "RptCenterList.rdlc",
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
