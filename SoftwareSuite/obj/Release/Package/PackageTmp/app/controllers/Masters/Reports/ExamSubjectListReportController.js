define(['app'], function (app) {
    app.controller("ExamSubjectListReportController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, BasicCourseService, BasicExamService) {
        $scope.ExamSubjectListReport = {};

        //     $scope.PrintExamSubjectListReport = function () {
        //         $scope.InterestList.DateFrom = $filter('date')($scope.InterestList.DateFrom,"dd/MMM/yyyy");
        //         $scope.InterestList.DateTo = $filter('date')($scope.InterestList.DateTo,"dd/MMM/yyyy");ExamSubjectListReport
        //var Urlstring = "api/BasicExamSubject/GetBasicExamSubjectListReport/?CourseID=" + $scope.BasicExamSubject.CourseID + "" + "&ExamID=" + $scope.BasicExamSubject.ExamID + "";
        //         var dataset1 = "dsExamSubjectList";
        //$state.go('Masters.ReportViewerController', { ReportName: 'RptExamSubjectList.rdlc', url: Urlstring, ds1: dataset1 });
        //     }
        $scope.PrintExamSubjectListReport = function () {
            $scope.BasicExamSubject.CourseID = $scope.BasicExamSubject.CourseID;
            $scope.BasicExamSubject.ExamID = $scope.BasicExamSubject.ExamID;
            if (CheckValidation() == true) {
                var Urlstring = "api/BasicExamSubject/GetBasicExamSubjectListReport/?CourseID=" + $scope.BasicExamSubject.CourseID + "" + "&ExamID=" + $scope.BasicExamSubject.ExamID + "";
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
                        var datasetName1 = "dsExamSubjectList";
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

        $scope.GetExamList = function (CourseID) {
            $scope.DisableExamAndBranch = false;
            var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
            BasicExamList.then(function (ExamData, status, headers, config, error) {
                $scope.BasicExamList = ExamData;
            }, function (ExamData, status, headers, config) {
                alert(error);
            })
        }
        function CheckValidation() {
            if (($scope.BasicExamSubject.CourseID == undefined) || ($scope.BasicExamSubject.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.BasicExamSubject.ExamID == undefined) || ($scope.BasicExamSubject.ExamID == "")) {
                alert("Select Year");
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
                reportPath: "RptExamSubjectList.rdlc",
                dataSources: [{ value: [], name: "dsExamSubjectList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });



    });
});


