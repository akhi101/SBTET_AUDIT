define(['app'], function (app) {
    app.controller("SyllabusReportController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, BasicExamSubjectService, BasicCourseService, BasicExamService, BasicBranchService, BasicMainGroupService) {
        $scope.SyllabusReport = {};

        //$scope.PrintSyllabusReport = function () {
        //    //$scope.InterestList.DateFrom = $filter('date')($scope.InterestList.DateFrom,"dd/MMM/yyyy");
        //    //$scope.InterestList.DateTo = $filter('date')($scope.InterestList.DateTo,"dd/MMM/yyyy");ExamSubjectListReport
        //    var Urlstring = "api/BasicExamSubject/GetSyllabusListReport/?ExamID=" + $scope.Syllabus.ExamID + "" + "&BranchID=" + $scope.Syllabus.BranchID + "" + "&MainGrpID=" + $scope.Syllabus.MainGrpID + "";
        //    var dataset1 = "dsSyllabusList";
        //    $state.go('Masters.ReportViewerController', { ReportName: 'RptSyllabus.rdlc', url: Urlstring, ds1: dataset1 });
        //}

        $scope.PrintSyllabusReport = function () {
            $scope.Syllabus.CourseID = $scope.Syllabus.CourseID;
            $scope.Syllabus.ExamID = $scope.Syllabus.ExamID;
            $scope.Syllabus.BranchID = $scope.Syllabus.BranchID;
            $scope.Syllabus.MainGrpID = $scope.Syllabus.MainGrpID;
            if (CheckValidation() == true) {
                var Urlstring = "api/BasicExamSubject/GetSyllabusListReport/?ExamID=" + $scope.Syllabus.ExamID + "" + "&BranchID=" + $scope.Syllabus.BranchID + "" + "&MainGrpID=" + $scope.Syllabus.MainGrpID + "";
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
                        var datasetName1 = "dsSyllabusList";
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
            var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(CourseID);
            BasicBranchList.then(function (BranchData, status, headers, config, error) {
                $scope.BasicBranchList = BranchData;
            }, function (BranchData, status, headers, config) {
                alert(error);
            })
        }

        $scope.GetMainGroupList = function (BranchID) {
            var BasicMainGroupList = BasicMainGroupService.GetBasicMainGroupListByExamIDAndBranchID($scope.Syllabus.ExamID, BranchID);
            BasicMainGroupList.then(function (MainGroupData, status, headers, config, error) {
                $scope.BasicMainGroupList = MainGroupData;
            }, function (MainGroupData, status, headers, config) {
                alert(error);
            })
        }

        function CheckValidation() {
            if (($scope.Syllabus.CourseID == undefined) || ($scope.Syllabus.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.Syllabus.ExamID == undefined) || ($scope.Syllabus.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            if (($scope.Syllabus.BranchID == undefined) || ($scope.Syllabus.BranchID == "")) {
                alert("Select Branch");
                return false;
            }
            if (($scope.Syllabus.MainGrpID == undefined) || ($scope.Syllabus.MainGrpID == "")) {
                alert("Select Group");
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
                reportPath: "RptSyllabus.rdlc",
                dataSources: [{ value: [], name: "dsSyllabusList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });


    });
});


