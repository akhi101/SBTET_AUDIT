define(['app'], function (app) {
    app.controller("PrePractGeographyBatchChartReportController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService, PrePractCenterService) {
        $scope.PrePracticalBatchAllocationReport = {};
        $scope.PrePracticalBatchAllocationReport.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PrePracticalBatchAllocationReportRightsdata = [];
        PrePracticalBatchAllocationReportRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PrePracticalBatchAllocationReportRightsdata.length; i++) {
            if (PrePracticalBatchAllocationReportRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PrePracticalBatchAllocationReport.OtherCenterID == 0) {
                    if (PrePracticalBatchAllocationReportRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PrePracticalBatchAllocationReportRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PrePracticalBatchAllocationReportRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        $scope.PrePracticalBatchAllocationReport.ZoneType = '2';

        $scope.isupdatableDisable = false;
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.PrePracticalBatchAllocationReport.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetPreZoneList($scope.PrePracticalBatchAllocationReport.DistrictID);
            //var ZoneList = PreZoneCenterService.GetPreZoneListByDistrictId($scope.PrePracticalBatchAllocationReport.DistrictID, AppSettings.ExamInstID, 3);
            if ($scope.PrePracticalBatchAllocationReport.CourseID == 1) {
                $scope.PrePracticalBatchAllocationReport.ZoneType = 2;
            }
            else if ($scope.PrePracticalBatchAllocationReport.CourseID == 2) {
                $scope.PrePracticalBatchAllocationReport.ZoneType = 3;
            }
            //var ZoneList = PreZoneCenterService.GetPreZoneListByDistrictId($scope.PrePracticalBatchAllocationReport.DistrictID, AppSettings.ExamInstID, $scope.PrePracticalBatchAllocationReport.ZoneType);
            //ZoneList.then(function (ZoneData, status, headers, config, error) {
            //    $scope.PreZoneList = ZoneData;
            //    $scope.GetPracticalCenterList($scope.PrePracticalBatchAllocationReport.DistrictID);
            //}, function (ZoneData, status, headers, config) {
            //    alert(error);
            //})
        }, function (Castdata, status, headers, config) {
            alert(error);
        });


        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            $scope.PrePracticalBatchAllocationReport.CourseID = "1";
            GetExamList($scope.PrePracticalBatchAllocationReport.CourseID);
        }, function (ExamData, status, headers, config) {
            alert(error);
            })


       function GetExamList(CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                    $scope.PrePracticalBatchAllocationReport.ExamID = "2";
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }


        $scope.GetPracticalCenterList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PracticalCenterList = PrePractCenterService.GetPracticalCenterListByDistrictIDANDZoneType($scope.PrePracticalBatchAllocationReport.ExamInstID, 2, DistrictID);
                PracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                    $scope.PracticalCenterList = PracticalCenterData;
                }, function (PracticalCenterData, status, headers, config) {
                    alert(error);
                })
            }
        }



        $scope.GetGeographyPrePracticalBatchAllocationReport = function () {

            if ($scope.PrePracticalBatchAllocationReport.PrePractCntrID == undefined || $scope.PrePracticalBatchAllocationReport.PrePractCntrID == "") {
                $scope.PrePracticalBatchAllocationReport.PrePractCntrID = 0;
            }

            $scope.PrePracticalBatchAllocationReport.CourseID = $scope.PrePracticalBatchAllocationReport.CourseID;
            $scope.PrePracticalBatchAllocationReport.ExamID = $scope.PrePracticalBatchAllocationReport.ExamID;
            $scope.PrePracticalBatchAllocationReport.PrePractCntrID = $scope.PrePracticalBatchAllocationReport.PrePractCntrID;
            $scope.PrePracticalBatchAllocationReport.DistrictID = $scope.PrePracticalBatchAllocationReport.DistrictID;
            $scope.PrePracticalBatchAllocationReport.ExamInstID = AppSettings.ExamInstID;
            $scope.PrePracticalBatchAllocationReport.UpdLoginID = AppSettings.LoggedUserId;

            if (CheckValidation() == true) {
                //if ($scope.PrePracticalBatchAllocationReport.CourseID == 1) {
                var Urlstring = "api/PrePractCenter/GetGeographyPracticalChartReport/?PrePractCntrID=" + $scope.PrePracticalBatchAllocationReport.PrePractCntrID + "&ExamID=" + $scope.PrePracticalBatchAllocationReport.ExamID + "&ExamInstID=" + $scope.PrePracticalBatchAllocationReport.ExamInstID + "&UpdLoginID=" + $scope.PrePracticalBatchAllocationReport.UpdLoginID + "&DistrictID=" + $scope.PrePracticalBatchAllocationReport.DistrictID + "&CourseID=" + $scope.PrePracticalBatchAllocationReport.CourseID + "&ZoneID=" + $scope.PrePracticalBatchAllocationReport.ZoneID;
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
                        var datasetName1 = "dsCenterWisePracticalBatchReport";
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
            if (($scope.PrePracticalBatchAllocationReport.DistrictID == undefined) || ($scope.PrePracticalBatchAllocationReport.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PrePracticalBatchAllocationReport.CourseID == undefined) || ($scope.PrePracticalBatchAllocationReport.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.PrePracticalBatchAllocationReport.ExamID == undefined) || ($scope.PrePracticalBatchAllocationReport.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            if (($scope.PrePracticalBatchAllocationReport.PrePractCntrID == undefined) || ($scope.PrePracticalBatchAllocationReport.PrePractCntrID == "")) {
                $scope.PrePracticalBatchAllocationReport.PrePractCntrID = 0;
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
            $state.go('CenterManagemnet');
        }

        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptGeographyPracticalChartReport.rdlc",
                dataSources: [{ value: [], name: "dsCenterWisePracticalBatchReport" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });

    //});RptCenterWisePracticalBatchReport
});
