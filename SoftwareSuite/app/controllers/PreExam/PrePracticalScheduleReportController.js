define(['app'], function (app) {
    app.controller("PrePracticalScheduleReportController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService, PrePractCenterService) {
        $scope.PrePracticalScheduleReport = {};
        $scope.PrePracticalScheduleReport.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PrePracticalScheduleReportRightsdata = [];
        PrePracticalScheduleReportRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PrePracticalScheduleReportRightsdata.length; i++) {
            if (PrePracticalScheduleReportRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PrePracticalScheduleReport.OtherCenterID == 0) {
                    if (PrePracticalScheduleReportRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PrePracticalScheduleReportRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PrePracticalScheduleReportRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.isupdatableDisable = false;
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.PrePracticalBatchAllocationReport.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetPreZoneList($scope.PrePracticalBatchAllocationReport.DistrictID);
            var ZoneList = PreZoneCenterService.GetPreZoneListByDistrictId($scope.PrePracticalBatchAllocationReport.DistrictID, AppSettings.ExamInstID, 3);
            ZoneList.then(function (ZoneData, status, headers, config, error) {
                $scope.PreZoneList = ZoneData;
                $scope.GetPracticalCenterList($scope.PrePracticalBatchAllocationReport.DistrictID);
            }, function (ZoneData, status, headers, config) {
                alert(error);
            })
        }, function (Castdata, status, headers, config) {
            alert(error);
        });

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (ZoneData, status, headers, config) {
            alert(error);
        })

        $scope.GetPreZoneList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                //$scope.EnableCenterCollege = false;
                var PreZoneList = PreZoneCenterService.GetPreZoneListByDistrictId(DistrictID, AppSettings.ExamInstID, 2);
                PreZoneList.then(function (ZoneData, status, headers, config, error) {
                    $scope.PreZoneList = ZoneData;
                }, function (ZoneData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetPracticalCenterList = function (DistrictID, ZoneID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PracticalCenterList = PrePractCenterService.GetPrePractCenterByDistrictIdANDZoneID(DistrictID, ZoneID, $scope.PrePracticalScheduleReport.ExamInstID);
                PracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                    $scope.PracticalCenterList = PracticalCenterData;
                }, function (PracticalCenterData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetPrePracticalScheduleReport = function () {
            ////$scope.PrePracticalBatchAllocationReport.CourseID = $scope.PrePracticalBatchAllocationReport.CourseID;
            // //$scope.PrePracticalBatchAllocationReport.ExamID = $scope.PrePracticalBatchAllocationReport.ExamID;
            $scope.PrePracticalScheduleReport.PrePractCntrID = $scope.PrePracticalScheduleReport.PrePractCntrID;
            $scope.PrePracticalScheduleReport.DistrictID = $scope.PrePracticalScheduleReport.DistrictID;
            $scope.PrePracticalScheduleReport.ExamInstID = AppSettings.ExamInstID;
            $scope.PrePracticalScheduleReport.UpdLoginID = AppSettings.LoggedUserId;
            var ExamID = 2;

            if (CheckValidation() == true) {
                var Urlstring = "api/PrePractCenter/GetGeneralPrePractBatchReportByCenterID/?ExamID=" + ExamID + "&PrCentreID=" + $scope.PrePracticalScheduleReport.PrePractCntrID + "&ExamInstID=" + $scope.PrePracticalScheduleReport.ExamInstID;
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
                        var datasetName1 = "dsCenterWisePracticalBatchSchedule";
                        if (data[0].length == 0) {
                            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                        }
                        //data[0][0].CollegeName = CollegeName;
                        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                        reportModel._refreshReport();
                    }
                });
            }
        }


        function CheckValidation() {
            if (($scope.PrePracticalScheduleReport.DistrictID == undefined) || ($scope.PrePracticalScheduleReport.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            //if (($scope.PrePracticalBatchAllocationReport.CourseID == undefined) || ($scope.PrePracticalBatchAllocationReport.CourseID == "")) {
            //    alert("Select Stream");
            //    return false;
            //}
            //if (($scope.PrePracticalBatchAllocationReport.ExamID == undefined) || ($scope.PrePracticalBatchAllocationReport.ExamID == "")) {
            //    alert("Select Year");
            //    return false;
            //}
            if (($scope.PrePracticalScheduleReport.PrePractCntrID == undefined) || ($scope.PrePracticalScheduleReport.PrePractCntrID == "")) {
                //alert("Select Practical Center");
                //return false;
                $scope.PrePracticalScheduleReport.PrePractCntrID = 0;
                return true;
            }
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $scope.isupdatableDisable = false;
            $state.go('PreExam');
        }

        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptPrctCenterWiseScheduleReport.rdlc",
                dataSources: [{ value: [], name: "dsCenterWisePracticalBatchSchedule" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });

    //});
});
