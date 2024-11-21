define(['app'], function (app) {
    app.controller("RptListOfCenterWithOutPostOfficeController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService) {
        $scope.RptListOfCenterWithOutPostOffice = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        varRptListOfCenterWithOutPostOfficeRightsdata = [];
        RptListOfCenterWithOutPostOfficeRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptListOfCenterWithOutPostOfficeRightsdata.length; i++) {
            if (RptListOfCenterWithOutPostOfficeRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.RptListOfCenterWithOutPostOffice.PreZoneCntrID == 0) {
                    if (RptListOfCenterWithOutPostOfficeRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (RptListOfCenterWithOutPostOfficeRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (RptListOfCenterWithOutPostOfficeRightsdata[i].isdeletable == 'Y') {
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
            $scope.RptListOfCenterWithOutPostOffice.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            //$scope.GetPreZoneData($scope.RptDistrictCenterList.DistrictID);
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });
        $scope.PrintCenterList = function () {
            if (CheckValidation() == true) {
                var DistrictID = $scope.RptListOfCenterWithOutPostOffice.DistrictID
                var Urlstring = "api/PreZoneCenter/GetCenterListWithoutPoliceStationPostOfcCCameras/?DistrictID=" + DistrictID + "&RptFlg=PO&ExamInstID=" + AppSettings.ExamInstID;
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
            if (($scope.RptListOfCenterWithOutPostOffice.DistrictID == undefined) || ($scope.RptListOfCenterWithOutPostOffice.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            else {
                return true;
            }
        }
        //varRptListOfCenterWithOutPostOffice = [];
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
                reportPath: "RptListOfCenterWithOutPostOffice.rdlc",
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
