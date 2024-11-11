define(['app'], function (app) {
    app.controller("StudStatusController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, RegisterAdmittedStudentService) {
        $scope.reportdata = [];
        $scope.Print = function () {
            if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.BranchID == undefined) || ($scope.BranchID == "")) {
                alert("Select Branch");
                return;
            }
            if (($scope.ReportType == undefined) || ($scope.ReportType == "")) {
                alert("Select Report Type");
                return;
            }
            var Urlstring = "api/StudentReg/GetStudRegStatusForReport/?CollegeID=" + AppSettings.CollegeID + "&CourseID=" + $scope.CourseID + "&BranchID=" + $scope.BranchID + "&ReportType=" + $scope.ReportType + "";
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
                    var datasetName1 = "dsStudStatus";
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
            //var Urlstring = "api/StudentReg/GetStudRegStatusForReport/?CollegeID=" + AppSettings.CollegeID + "&CourseID=" + $scope.CourseID + "&BranchID=" + $scope.BranchID + "&ReportType=" + $scope.StudStatus.ReportType + "";
            //var dataset1 = "dsStudStatus";
            //$state.go('Admission.ReportViewerController', { ReportName: 'RptStudStatusReport.rdlc', url: Urlstring, ds1: dataset1 });
        }
        $scope.ReportType = "N";
        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            $scope.BranchList = [];
            if (CourseID != "") {
                var BranchList = RegisterAdmittedStudentService.GetBasicBranchListForRegStud(CourseID, AppSettings.CollegeID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission');
        }
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptStudStatusReport.rdlc",
                dataSources: [{ value: [], name: "dsStudStatus" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});