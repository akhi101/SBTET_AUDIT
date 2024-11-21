define(['app'], function (app) {
    app.controller("StudentCastWiseCountController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, RegisterAdmittedStudentService) {
        $scope.Print = function () {
            if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            var Urlstring = "api/StudentReg/GetStudCastwiseCount/?CollegeID=" + AppSettings.CollegeID + "&CourseID=" + $scope.CourseID + "&ExamID=" + $scope.ExamID + "";
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
                    var datasetName1 = "dsStudentCastwiseCount";
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
            //var Urlstring = "api/StudentReg/GetStudCastwiseCount/?CollegeID=" + AppSettings.CollegeID + "&CourseID=" + $scope.CourseID + "&ExamID=" + $scope.ExamID + "";
            //var dataset1 = "dsStudentCastwiseCount";
            //$state.go('Admission.ReportViewerController', { ReportName: 'RptStudentCastwiseCountReport.rdlc', url: Urlstring, ds1: dataset1 });
        }
        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            if (CourseID != "") {
                var ExamList = RegisterAdmittedStudentService.GetBasicExamList(CourseID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
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
        $("#container").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptStudentCastwiseCountReport.rdlc",
                dataSources: [{ value: [], name: "dsStudentCastwiseCount" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});