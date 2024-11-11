define(['app'], function (app) {
    app.controller("ReportofCollegesCenterAllocateNotAllocatedController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, PreZoneService, BasicDistrictsService, BasicMandalService, BasicCourseService, BasicExamService) {
        $scope.ReportofCollegesCenterNotAllocated = { PreZoneCntrID: $stateParams.PreZoneCntrID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ReportofCollegesCenterNotAllocatedRightsdata = [];
        var FlagCenter = $stateParams.FlagCenter
        if (FlagCenter == "A") {
            $scope.ReportHeader = "Center Allocated to College List";
        } else if (FlagCenter == "C") {
            $scope.ReportHeader = "Not Allocated College List";
        } else {
            $scope.ReportHeader = "Center Not Allocated to College List";
        }
        ReportofCollegesCenterNotAllocatedRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ReportofCollegesCenterNotAllocatedRightsdata.length; i++) {
            if (ReportofCollegesCenterNotAllocatedRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ReportofCollegesCenterNotAllocated.PreZoneCntrID == 0) {
                    if (ReportofCollegesCenterNotAllocatedRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ReportofCollegesCenterNotAllocatedRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ReportofCollegesCenterNotAllocatedRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictsList();
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        $scope.GetPreZoneData = function (DistrictID) {
            if (DistrictID != "") {
                var PreZoneList = PreZoneService.GetPreZoneListByDistrictId(DistrictID);
                PreZoneList.then(function (PreZoneData, status, headers, config, error) {
                    $scope.PreZoneList = PreZoneData;
                }, function (PreZoneData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.ShowCollegeList = function () {
            if (CheckValidation() == true) {
                var PreZoneClgList = PreZoneCenterService.GetCollegesCenterAccocateNotAllocatedList($scope.ReportofCollegesCenterNotAllocated.ZoneID, FlagCenter);
                PreZoneClgList.then(function (PreZoneClgdata, status, headers, config, error) {
                    $scope.PreZoneClgList = PreZoneClgdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.PrintCollegeList = function () {
            if (CheckValidation() == true) {
                var Urlstring = "api/PreZoneCenter/GetCollegesCenterAccocateNotAllocatedList/?ZoneID=" + $scope.ReportofCollegesCenterNotAllocated.ZoneID + "&DistrictID=" + $scope.ReportofCollegesCenterNotAllocated.DistrictID + "&FlagCenter=" + FlagCenter;
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
            if (($scope.ReportofCollegesCenterNotAllocated.DistrictID == undefined) || ($scope.ReportofCollegesCenterNotAllocated.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.ReportofCollegesCenterNotAllocated.ZoneID == undefined) || ($scope.ReportofCollegesCenterNotAllocated.ZoneID == "")) {
                alert("Select Zone");
                return false;
            }
            else {
                return true;
            }
        }
        var ReportofCollegesCenterNotAllocated = [];
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
