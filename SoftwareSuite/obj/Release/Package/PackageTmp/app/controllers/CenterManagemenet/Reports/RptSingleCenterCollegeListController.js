define(['app'], function (app) {
    app.controller("RptSingleCenterCollegeListController", function ($scope, $state, $stateParams, AppSettings,BasicDistrictsService) {
        $scope.RptSingleCenterCollegeList = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        varRptSingleCenterCollegeListRightsdata = [];
       RptSingleCenterCollegeListRightsdata = AppSettings.UserRights;
        for (var i = 0; i <RptSingleCenterCollegeListRightsdata.length; i++) {
            if (RptSingleCenterCollegeListRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.RptSingleCenterCollegeList.PreZoneCntrID == 0) {
                    if (RptSingleCenterCollegeListRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (RptSingleCenterCollegeListRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (RptSingleCenterCollegeListRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.RptSingleCenterCollegeList.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            //$scope.GetCollegeData($scope.RptPracticalBatchList.DistrictID);
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });
        $scope.PrintSingleCenterCollegeList = function () {
            if (CheckValidation() == true) {
                var DistrictID = $scope.RptSingleCenterCollegeList.DistrictID
                var Urlstring = "api/PreZoneCenter/GetSingleCenterCollegeList/?DistrictID=" + DistrictID + "&ExamInstID=" + AppSettings.ExamInstID;
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
                        var datasetName1 = "SingleCenterClgList";
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
            if (($scope.RptSingleCenterCollegeList.DistrictID == undefined) || ($scope.RptSingleCenterCollegeList.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            else {
                return true;
            }
        }
        //varRptSingleCenterCollegeList = [];
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
                reportPath: "RpSingleCenterCollegeList.rdlc",
                dataSources: [{ value: [], name: "SingleCenterClgList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
