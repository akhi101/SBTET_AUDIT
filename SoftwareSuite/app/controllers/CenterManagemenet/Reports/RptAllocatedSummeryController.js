define(['app'], function (app) {
    app.controller("RptAllocatedSummeryController", function ($scope, $state, $filter, $stateParams, AppSettings, BasicDistrictsService) {
        $scope.RptAllocatedSummery = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        varRptAllocatedSummeryRightsdata = [];
        RptAllocatedSummeryRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptAllocatedSummeryRightsdata.length; i++) {
            if (RptAllocatedSummeryRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.RptAllocatedSummery.PreZoneCntrID == 0) {
                    if (RptAllocatedSummeryRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (RptAllocatedSummeryRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (RptAllocatedSummeryRightsdata[i].isdeletable == 'Y') {
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
            $scope.RptAllocatedSummery.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            //$scope.GetPreZoneData($scope.ReportOfZoneWiseCollegeAttached.DistrictID);
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });
        $scope.PrintAllocatedSummery = function () {
            if (CheckValidation() == true) {
                var Urlstring = "api/PreZoneCenter/GetRptAllocatedSummary/?DistrictID=" + $scope.RptAllocatedSummery.DistrictID + "&ExamInstID=" + AppSettings.ExamInstID;
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
                        var datasetName1 = "AllocatedSummary";
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
            if (($scope.RptAllocatedSummery.DistrictID == undefined) || ($scope.RptAllocatedSummery.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            else {
                return true;
            }
        }
        //varRptAllocatedSummery = [];
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
                reportPath: 'RptAllocatedSummary.rdlc',
                dataSources: [{ value: [], name: "AllocatedSummary" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
