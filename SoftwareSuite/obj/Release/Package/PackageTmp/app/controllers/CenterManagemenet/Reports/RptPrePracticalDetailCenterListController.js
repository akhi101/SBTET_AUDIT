define(['app'], function (app) {
    app.controller("RptPrePracticalDetailCenterListController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService) {
        $scope.RptPrePracticalDetailCenterList = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        varRptPrePracticalDetailCenterListRightsdata = [];
        RptPrePracticalDetailCenterListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptPrePracticalDetailCenterListRightsdata.length; i++) {
            if (RptPrePracticalDetailCenterListRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.RptPrePracticalDetailCenterList.PreZoneCntrID == 0) {
                    if (RptPrePracticalDetailCenterListRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (RptPrePracticalDetailCenterListRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (RptPrePracticalDetailCenterListRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        $scope.reportTypes = [
            //{ ReportTypeName: 'General Theory', ReportType: '1' },
            { ReportTypeName: 'General Practical', ReportType: '2' },
            { ReportTypeName: 'Vocational Practical', ReportType: '3' },
            { ReportTypeName: 'Bridge Vocational Practical', ReportType: '4' } 
            //{ ReportTypeName: ' ', ReportType: '5' }
        ];

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.RptPrePracticalDetailCenterList.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            //$scope.GetCollegeData($scope.RptPracticalBatchList.DistrictID);
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });
        $scope.PrintZoneDetails = function () {
            if (CheckValidation() == true) {
                var DistrictID = $scope.RptPrePracticalDetailCenterList.DistrictID
                var Urlstring = "api/PrePractCenter/GetPracticalCenterDetails/?DistrictID=" + DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "&ReportType=" + $scope.RptPrePracticalDetailCenterList.ReportType ;
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
                        var datasetName1 = "PracticalCenterDetails";
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
            if (($scope.RptPrePracticalDetailCenterList.DistrictID == undefined) || ($scope.RptPrePracticalDetailCenterList.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.RptPrePracticalDetailCenterList.ReportType == undefined) || ($scope.RptPrePracticalDetailCenterList.ReportType == "")) {
                alert("Select Report Type");
                return false;
            }
            else {
                return true;
            }
        }
        //varRptPrePracticalDetailCenterList = [];
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
                reportPath: "RptPracticalCenterDetailsList.rdlc",
                dataSources: [{ value: [], name: "PracticalCenterDetails" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
