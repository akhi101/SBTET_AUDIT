define(['app'], function (app) {
    app.controller("PrePracVocScheduleReportController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService, PrePractCenterService, BasicMainGroupService) {
        $scope.PrePracVocScheduleReport = {};
        $scope.PrePracVocScheduleReport.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PrePracVocScheduleReportRightsdata = [];
        PrePracVocScheduleReportRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PrePracVocScheduleReportRightsdata.length; i++) {
            if (PrePracVocScheduleReportRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PrePracVocScheduleReport.OtherCenterID == 0) {
                    if (PrePracVocScheduleReportRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PrePracVocScheduleReportRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PrePracVocScheduleReportRightsdata[i].isdeletable == 'Y') {
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

        var BasicCourseList = BasicCourseService.GetBasicCourseListByID(2);
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            //$scope.PrePracticalBatchAllocation.CourseID = "2";
           // $scope.GetExamList($scope.PrePracticalBatchAllocation.CourseID);
        }, function (ExamData, status, headers, config) {
            alert(error);
        })

        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                    //$scope.PrePracticalBatchAllocation.ExamID = "2";
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetMainGroupList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicMainGroupList = BasicMainGroupService.GetMainGroupListByCourseID(CourseID);
                BasicMainGroupList.then(function (MainGrpData, status, headers, config, error) {
                    $scope.BasicMainGroupList = MainGrpData;
                    //$scope.PrePracticalBatchAllocation.ExamID = "2";
                }, function (MainGrpData, status, headers, config) {
                    alert(error);
                })
            }
        }


        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (ZoneData, status, headers, config) {
            alert(error);
        })

        $scope.GetPreZoneList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                //$scope.EnableCenterCollege = false;
                var PreZoneList = PreZoneCenterService.GetPreZoneListByDistrictId(DistrictID, AppSettings.ExamInstID,3);
                PreZoneList.then(function (ZoneData, status, headers, config, error) {
                    $scope.PreZoneList = ZoneData;
                }, function (ZoneData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetPracticalCenterList = function (DistrictID, ZoneID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PracticalCenterList = PrePractCenterService.GetVocPrePractCenterByDistrictIdANDZoneID(DistrictID, ZoneID, $scope.PrePracVocScheduleReport.ExamInstID);
                PracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                    $scope.PracticalCenterList = PracticalCenterData;
                }, function (PracticalCenterData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetVocReportofPracticalSchedule = function () {
            ////$scope.PrePracticalBatchAllocationReport.CourseID = $scope.PrePracticalBatchAllocationReport.CourseID;
            // //$scope.PrePracticalBatchAllocationReport.ExamID = $scope.PrePracticalBatchAllocationReport.ExamID;
            $scope.PrePracVocScheduleReport.PrePractCntrID = $scope.PrePracVocScheduleReport.PrePractCntrID;
            $scope.PrePracVocScheduleReport.DistrictID = $scope.PrePracVocScheduleReport.DistrictID;
            $scope.PrePracVocScheduleReport.ExamID = $scope.PrePracVocScheduleReport.ExamID;
            $scope.PrePracVocScheduleReport.ExamInstID = AppSettings.ExamInstID;
            $scope.PrePracVocScheduleReport.UpdLoginID = AppSettings.LoggedUserId;
            //var ExamID = 2;

            if (CheckValidation() == true) {
                var Urlstring = "api/PrePractCenter/GetVocationalPrePractBatchScheduleReport/?ExamID=" + $scope.PrePracVocScheduleReport.ExamID + "&PrCentreID=" + $scope.PrePracVocScheduleReport.PrePractCntrID + "&MainGrpID=" + $scope.PrePracVocScheduleReport.MainGrpID + "&ExamInstID=" + $scope.PrePracVocScheduleReport.ExamInstID;
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
                        var datasetName1 = "dsPrePrctVocScheduleReport";
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
            if (($scope.PrePracVocScheduleReport.DistrictID == undefined) || ($scope.PrePracVocScheduleReport.DistrictID == "")) {
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
            if (($scope.PrePracVocScheduleReport.PrePractCntrID == undefined) || ($scope.PrePracVocScheduleReport.PrePractCntrID == "")) {
                //alert("Select Practical Center");
                //return false;
                $scope.PrePracVocScheduleReport.PrePractCntrID = 0;
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
                reportPath: "RptPrePractVocScheduleReport.rdlc",
                dataSources: [{ value: [], name: "dsPrePrctVocScheduleReport" }],
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
