define(['app'], function (app) {
    app.controller("DistrictWiseCenterCountController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService, PrePractCenterService) {
        $scope.DistrictWiseCenterCount = {};
        $scope.DistrictWiseCenterCount.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var DistrictWiseCenterCountRightsdata = [];
        DistrictWiseCenterCountRightsdata = AppSettings.UserRights;
        for (var i = 0; i < DistrictWiseCenterCountRightsdata.length; i++) {
            if (DistrictWiseCenterCountRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.DistrictWiseCenterCount.OtherCenterID == 0) {
                    if (DistrictWiseCenterCountRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (DistrictWiseCenterCountRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (DistrictWiseCenterCountRightsdata[i].isdeletable == 'Y') {
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
            $scope.DistrictWiseCenterCount.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });

        $scope.GetDistrictWiseCenterCount = function () {
            $scope.DistrictWiseCenterCount.DistrictID = $scope.DistrictWiseCenterCount.DistrictID;
            $scope.DistrictWiseCenterCount.ExamInstID = AppSettings.ExamInstID;
            $scope.DistrictWiseCenterCount.UpdLoginID = AppSettings.LoggedUserId;

            if ($scope.DistrictWiseCenterCount.DistrictID == undefined || $scope.DistrictWiseCenterCount.DistrictID == "") {
                $scope.DistrictWiseCenterCount.DistrictID = 0;
            }

            if (CheckValidation() == true) {
                //if ($scope.PrePracticalBatchAllocationReport.CourseID == 1) {
                var Urlstring = "api/PreZoneCenter/GetDistrictWiseCenterCount/?DistrictID=" + $scope.DistrictWiseCenterCount.DistrictID + "&ExamInstID=" + AppSettings.ExamInstID;
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
                        var datasetName1 = "dsDistrictWiseCenterCount";
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
            return true;
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
                reportPath: "RptDistrictWiseCenterCountReport.rdlc",
                dataSources: [{ value: [], name: "dsDistrictWiseCenterCount" }],
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
