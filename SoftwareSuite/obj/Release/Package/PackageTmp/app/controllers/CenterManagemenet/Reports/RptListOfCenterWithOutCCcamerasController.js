define(['app'], function (app) {
    app.controller("RptListOfCenterWithOutCCcamerasController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService) {
        $scope.RptListOfCenterWithOutCCcameras = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        varRptListOfCenterWithOutCCcamerasRightsdata = [];
        RptListOfCenterWithOutCCcamerasRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptListOfCenterWithOutCCcamerasRightsdata.length; i++) {
            if (RptListOfCenterWithOutCCcamerasRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.RptListOfCenterWithOutCCcameras.PreZoneCntrID == 0) {
                    if (RptListOfCenterWithOutCCcamerasRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (RptListOfCenterWithOutCCcamerasRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (RptListOfCenterWithOutCCcamerasRightsdata[i].isdeletable == 'Y') {
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
            $scope.RptListOfCenterWithOutCCcameras.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            //$scope.GetPreZoneData($scope.RptDistrictCenterList.DistrictID);
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });
        $scope.PrintCenterList = function () {
            if (CheckValidation() == true) {
                var DistrictID = $scope.RptListOfCenterWithOutCCcameras.DistrictID
                var Urlstring = "api/PreZoneCenter/GetCenterListWithoutPoliceStationPostOfcCCameras/?DistrictID=" + DistrictID + "&RptFlg=CC&ExamInstID=" + AppSettings.ExamInstID;
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
            if (($scope.RptListOfCenterWithOutCCcameras.DistrictID == undefined) || ($scope.RptListOfCenterWithOutCCcameras.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            else {
                return true;
            }
        }
        //varRptListOfCenterWithOutCCcameras = [];
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
                reportPath: "RptListOfCenterWithOutCCcameras.rdlc",
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
