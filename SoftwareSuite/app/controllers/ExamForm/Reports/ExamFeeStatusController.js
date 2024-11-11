define(['app'], function (app) {
    app.controller("ExamFeeStatusController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, RegisterAdmittedStudentService, BasicExamService) {
        $scope.Print = function () {
            if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            //if (($scope.BranchID == undefined) || ($scope.BranchID == "")) {
            //    alert("Select Branch");
            //    return;
            //}
            if (($scope.ReportType == undefined) || ($scope.ReportType == "")) {
                alert("Select Report Type");
                return;
            }

            $scope.BranchID = 0;

            var Urlstring = "api/ExamForms/GetExamFeeStatus/?CollegeID=" + AppSettings.CollegeID + "&CourseID=" + $scope.CourseID + "&BranchID=" + $scope.BranchID + "&ReportType=" + $scope.ReportType + "&ExamInstID=" + AppSettings.ExamInstID + "&ExamID=" + $scope.ExamID;
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
                    var reportModel = $("#container").data('ejReportViewer');
                    var datasetName1 = "dsExamFeeStatus";
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
        $scope.ReportType = "N";
        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
                $scope.BranchList = [];
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
            $state.go('Exam');
        }
        $("#container").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptExamFeeStatusReport.rdlc",
                dataSources: [{ value: [], name: "dsExamFeeStatus" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});