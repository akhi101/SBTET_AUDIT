define(['app'], function (app) {
    app.controller("ReportOfPreCampusCenterController", function ($scope, $state, $stateParams, AppSettings, PreCampusService, BasicCourseService, BasicExamService) {
        $scope.ReportOfPreCampusCenter = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ReportOfPreCampusCenterRightsdata = [];
       ReportOfPreCampusCenterRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ReportOfPreCampusCenterRightsdata.length; i++) {
            if (ReportOfPreCampusCenterRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ReportOfPreCampusCenterRightsdata.PreZoneCntrID == 0) {
                    if (ReportOfPreCampusCenterRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ReportOfPreCampusCenterRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ReportOfPreCampusCenterRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
        }, function (CourseData, status, headers, config) {
            alert(error);
        });

        $scope.GetBasicExam = function (CourseID) {
            var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
            BasicExamList.then(function (ExamData, status, headers, config, error) {
                $scope.BasicExamList = ExamData;
            }, function (ExamData, status, headers, config) {
                alert(error);
            });
        }

        $scope.PrintPreCampusCenter = function () {
            if (CheckValidation() == true) {
                var Urlstring = "api/PreCampus/GetPreCampusCenterReportByExamID/?ExamID=" + $scope.ReportOfPreCampusCenter.ExamID;
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
                        var datasetName1 = "dsPreCampusCenterReport";
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
            if (($scope.ReportOfPreCampusCenter.CourseID == undefined) || ($scope.ReportOfPreCampusCenter.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.ReportOfPreCampusCenter.ExamID == undefined) || ($scope.ReportOfPreCampusCenter.ExamID == "")) {
                alert("Select Exam");
                return false;
            }
            else {
                return true;
            }
        }
        var ReportOfPreCampusCenter = [];
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
                reportPath: "RptPreCampusCenterList.rdlc",
                dataSources: [{ value: [], name: "dsPreCampusCenterReport" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
