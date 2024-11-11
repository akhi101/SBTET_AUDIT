define(['app'], function (app) {
    app.controller("RptCenterCollegeListController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, PreZoneService) {
        $scope.RptCenterCollegeList = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        var RptCenterCollegeListRightsdata = [];
        RptCenterCollegeListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptCenterCollegeListRightsdata.length; i++) {
            if (RptCenterCollegeListRightsdata[i].GridFormToOpen == PageNm) {

            }
        }
        $scope.reportTypes = [
            { ReportTypeName: 'General Theory', ReportType: '1' },
            { ReportTypeName: 'General Practical', ReportType: '2' },
            { ReportTypeName: 'Vocational Practical', ReportType: '3' },
            { ReportTypeName: 'Bridge Vocational Practical', ReportType: '4' } ,
             { ReportTypeName: 'Bridge Theory', ReportType: '5' }
        ];
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.RptCenterCollegeList.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetPreZoneData($scope.RptCenterCollegeList.DistrictID);
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        $scope.GetPreZoneData = function (DistrictID) {
            $scope.PreZoneClgList = [];
            if (DistrictID != "") {
                if (($scope.RptCenterCollegeList.ReportType == undefined) || ($scope.RptCenterCollegeList.ReportType == "")) {
                    $scope.RptCenterCollegeList.ReportType = 1;
                }
                var PreZoneList = PreZoneService.GetPreZoneListByDistrictId(DistrictID, AppSettings.ExamInstID, $scope.RptCenterCollegeList.ReportType);
                PreZoneList.then(function (PreZoneData, status, headers, config, error) {
                    $scope.PreZoneList = PreZoneData;
                }, function (PreZoneData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.PrintCenterCollegeList = function () {
            if (CheckValidation() == true) {
                var ReportType = "";
                var Urlstring = "api/PreZoneCenter/GetCenterCollegeList/?DistrictID=" + $scope.RptCenterCollegeList.DistrictID + "&ZoneID=" + $scope.RptCenterCollegeList.ZoneID + "&ExamInstID=" + AppSettings.ExamInstID + "&ReportType=" + $scope.RptCenterCollegeList.ReportType ;
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
                        var datasetName1 = "CenterCollegeList";
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
            if (($scope.RptCenterCollegeList.DistrictID == undefined) || ($scope.RptCenterCollegeList.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.RptCenterCollegeList.ReportType == undefined) || ($scope.RptCenterCollegeList.ReportType == "")) {
                alert("Select Report Type");
                return false;
            }
            if (($scope.RptCenterCollegeList.ZoneID == undefined) || ($scope.RptCenterCollegeList.ZoneID == "")) {
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
                reportPath: "RptCenterCollegeList.rdlc",
                dataSources: [{ value: [], name: "CenterCollegeList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
