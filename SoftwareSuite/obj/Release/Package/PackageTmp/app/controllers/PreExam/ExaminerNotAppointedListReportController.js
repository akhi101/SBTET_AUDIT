define(['app'], function (app) {
    app.controller("ExaminerNotAppointedListReportController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService, PrePractCenterService) {
        $scope.ExaminerNotAppointedListReport = {};
        $scope.ExaminerNotAppointedListReport.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExaminerNotAppointedListReportRightsdata = [];
        ExaminerNotAppointedListReportRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExaminerNotAppointedListReportRightsdata.length; i++) {
            if (ExaminerNotAppointedListReportRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExaminerNotAppointedListReport.OtherCenterID == 0) {
                    if (ExaminerNotAppointedListReportRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExaminerNotAppointedListReportRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExaminerNotAppointedListReportRightsdata[i].isdeletable == 'Y') {
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
            $scope.ExaminerNotAppointedListReport.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });

        $scope.GetExaminerNotAppointedListReport = function () {
            $scope.ExaminerNotAppointedListReport.DistrictID = $scope.ExaminerNotAppointedListReport.DistrictID;
            $scope.ExaminerNotAppointedListReport.ExamInstID = AppSettings.ExamInstID;
            $scope.ExaminerNotAppointedListReport.UpdLoginID = AppSettings.LoggedUserId;

            if ($scope.ExaminerNotAppointedListReport.DistrictID == undefined || $scope.ExaminerNotAppointedListReport.DistrictID == "") {
                $scope.ExaminerNotAppointedListReport.DistrictID = 0;
            }

            if (CheckValidation() == true) {
                var Urlstring = "api/PreExaminerAppointments/GetExaminerNotAppointMentListReport/?DistrictID=" + $scope.ExaminerNotAppointedListReport.DistrictID;
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
                        var datasetName1 = "dsExaminerNotAppointedListReport";
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
                reportPath: "RptDistWiseExaminerNotAppointedList.rdlc",
                dataSources: [{ value: [], name: "dsExaminerNotAppointedListReport" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
