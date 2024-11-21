define(['app'], function (app) {
    app.controller("StreamWiseFinalGradeReportController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, BasicCourseService) {
        $scope.BasicCourseGrades = {};
        //$scope.PrintBasicCourseGradesReport = function () {
        //    var CourseID = $scope.BasicCourseGrades.CourseID;
        //    if ($scope.BasicCourseGrades.CourseID == "") {
        //        $scope.BasicCourseGrades.CourseID = 0;
        //    }
        //    if ($scope.BasicCourseGrades.CourseID == undefined) {
        //        $scope.BasicCourseGrades.CourseID = 0;
        //    }
        //    var Urlstring = "api/BasicCourseGrades/GetCourseGradesReportByCourseID/?CourseID=" + $scope.BasicCourseGrades.CourseID + " ";
        //    var dataset1 = "dsCourseGradeList";
        //    $state.go('Masters.ReportViewerController', { ReportName: 'RptStreamWiseGradeListReport.rdlc', url: Urlstring, ds1: dataset1 });
        //}

        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Masters');
        }
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
        }, function (CourseData, status, headers, config) {
            alert(error);
        });


        $scope.PrintBasicCourseGradesReport = function () {

            $scope.BasicCourseGrades.CourseID = $scope.BasicCourseGrades.CourseID;
            if (CheckValidation() == true) {
                var Urlstring = "api/BasicCourseGrades/GetCourseGradesReportByCourseID/?CourseID=" + $scope.BasicCourseGrades.CourseID + " ";
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
                        var datasetName1 = "dsCourseGradeList";
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
            if ($scope.BasicCourseGrades.CourseID == undefined) {
                alert(" Select Stream ");
                return false;
            }
            else {
                return true;
            }
        }

        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptStreamWiseGradeListReport.rdlc",
                dataSources: [{ value: [], name: "dsCourseGradeList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });

    });
});


