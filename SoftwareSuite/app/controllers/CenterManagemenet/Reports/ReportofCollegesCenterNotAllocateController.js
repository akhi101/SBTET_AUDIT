define(['app'], function (app) {
    app.controller("ReportofCollegesCenterNotAllocateController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, PreZoneService, BasicDistrictsService, BasicMandalService, BasicCourseService, BasicExamService) {
        $scope.ReportofCollegesCenterNotAllocate = { PreZoneCntrID: $stateParams.PreZoneCntrID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ReportofCollegesCenterNotAllocateRightsdata = [];
        ReportofCollegesCenterNotAllocateRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ReportofCollegesCenterNotAllocateRightsdata.length; i++) {
            if (ReportofCollegesCenterNotAllocateRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ReportofCollegesCenterNotAllocate.PreZoneCntrID == 0) {
                    if (ReportofCollegesCenterNotAllocateRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ReportofCollegesCenterNotAllocateRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ReportofCollegesCenterNotAllocateRightsdata[i].isdeletable == 'Y') {
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
            $scope.ReportofCollegesCenterNotAllocate.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetPreZoneData($scope.ReportofCollegesCenterNotAllocate.DistrictID);
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        $scope.GetPreZoneData = function (DistrictID) {
            if (DistrictID != "") {
                var PreZoneList = PreZoneService.GetPreZoneListByDistrictId(DistrictID,AppSettings.ExamInstID,1);
                PreZoneList.then(function (PreZoneData, status, headers, config, error) {
                    $scope.PreZoneList = PreZoneData;
                }, function (PreZoneData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.PrintCollegeList = function () {
            if (CheckValidation() == true) {
                var Urlstring = "api/PreZoneCenter/GetCollegesCenterAccocateNotAllocatedList/?ZoneID=" + $scope.ReportofCollegesCenterNotAllocate.ZoneID + "&DistrictID=" + $scope.ReportofCollegesCenterNotAllocate.DistrictID + "&FlagCenter=N&ExamInstID=" + AppSettings.ExamInstID;
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
                        var datasetName1 = "CollegeCenterNotAllocate";
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
            if (($scope.ReportofCollegesCenterNotAllocate.DistrictID == undefined) || ($scope.ReportofCollegesCenterNotAllocate.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.ReportofCollegesCenterNotAllocate.ZoneID == undefined) || ($scope.ReportofCollegesCenterNotAllocate.ZoneID == "")) {
                alert("Select Zone");
                return false;
            }
            else {
                return true;
            }
        }
        var ReportofCollegesCenterNotAllocate = [];
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
                reportPath: 'RptCollegesCenterAllocateOrNotAllocated.rdlc',
                dataSources: [{ value: [], name: "CollegeCenterNotAllocate" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
