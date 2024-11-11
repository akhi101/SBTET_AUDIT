define(['app'], function (app) {
    app.controller("ReportOfDRDCDistrictController", function ($scope, $state, $stateParams, AppSettings, PreDRDCService, BasicCourseService, BasicExamService) {
        $scope.ReportOfDRDCDistrict = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ReportOfDRDCDistrictRightsdata = [];
        ReportOfDRDCDistrictRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ReportOfDRDCDistrictRightsdata.length; i++) {
            if (ReportOfDRDCDistrictRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ReportOfDRDCDistrictRightsdata.PreZoneCntrID == 0) {
                    if (ReportOfDRDCDistrictRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ReportOfDRDCDistrictRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ReportOfDRDCDistrictRightsdata[i].isdeletable == 'Y') {
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

        $scope.PrintDRDCDistrict = function () {
            if (CheckValidation() == true) {
                var Urlstring = "api/PreDRDC/GetPreDRDCDistrictReport/?ExamID=" + $scope.ReportOfDRDCDistrict.ExamID ;
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
                        var datasetName1 = "dsPreDRDCReport";
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
            if (($scope.ReportOfDRDCDistrict.CourseID == undefined) || ($scope.ReportOfDRDCDistrict.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.ReportOfDRDCDistrict.ExamID == undefined) || ($scope.ReportOfDRDCDistrict.ExamID == "")) {
                alert("Select Exam");
                return false;
            }
            else {
                return true;
            }
        }
        var ReportOfDRDCDistrict = [];
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
                reportPath: "RptPreDRDCDistrictList.rdlc",
                dataSources: [{ value: [], name: "dsPreDRDCReport" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
