define(['app'], function (app) {
    app.controller("ReportViewerController", function ($scope, $filter, $state, $stateParams, AppSettings, $location) {
        $scope.ReportViewerPara = { ReportName: $stateParams.ReportName, url: $stateParams.url, datasetName1: $stateParams.ds1, ReportHeader: $stateParams.ReportHeader };
        $("#container").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: $scope.ReportViewerPara.ReportName,
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    alert("Error...Some error occured in processing report");
                }
            });
        $scope.reportLoaded = function () {
            $.ajax({
                url: AppSettings.WebApiUrl + $scope.ReportViewerPara.url,
                dataType: "json",
                type: "GET",
                processData: false,
                crossDomain: true,
                async: false,
                timeout: 5000,
                success: function (result) {
                    var data = [];
                    data.push(result);
                    if (data[0].length == 0) {
                        alert("Data Not Found");
                        return;
                    }
                    var reportModel = $("#container").data('ejReportViewer');
                    if ($scope.ReportViewerPara.ReportName == "RptCollegesCenterNotAllocated.rdlc" || $scope.ReportViewerPara.ReportName == "RptCollegesCenterAllocated.rdlc" || $scope.ReportViewerPara.ReportName == "RptCollegeSNotAttachesList.rdlc") {
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.ReportViewerPara.datasetName1 }];
                        reportModel.model.parameters = [{ name: 'ReportHeader', labels: ['ReportHeader'], values: [$scope.ReportViewerPara.ReportHeader], nullable: true }];
                    }
                    if ($scope.ReportViewerPara.ReportName == "RptPreZoneList.rdlc") {
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.ReportViewerPara.datasetName1 }];
                    } 
                    if ($scope.ReportViewerPara.ReportName == "RptZoneWiseCollegeAttached.rdlc") {
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.ReportViewerPara.datasetName1 }];
                    } 
                    if ($scope.ReportViewerPara.ReportName == "RptSelfCenterCollegesList.rdlc") {
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.ReportViewerPara.datasetName1 }];
					}
					if ($scope.ReportViewerPara.ReportName == "RptSameManagementCollegeList.rdlc") {
						reportModel.model.dataSources = [{ value: data[0], name: $scope.ReportViewerPara.datasetName1 }];
                    }
                    if ($scope.ReportViewerPara.ReportName == "RptCenterList.rdlc") {
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.ReportViewerPara.datasetName1 }];
                    }
                }
            });
        }
        $scope.Back = function () {
            var url = $location.url();
            var ParentRoute = $location.url().split('/');
            if ($scope.ReportViewerPara.ReportName == "RptReceiptsEnergyBill.rdlc") {
                $state.go(ParentRoute[1] + ".EnergyBillReceipts", { ReceiptId: 0 });
            }
            else {
                $state.go(ParentRoute[1]);
            }
        }
    });
});
