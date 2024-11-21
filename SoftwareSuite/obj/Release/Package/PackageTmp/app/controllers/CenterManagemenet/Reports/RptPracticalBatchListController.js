define(['app'], function (app) {
    app.controller("RptPracticalBatchListController", function ($scope, $state, $stateParams, AppSettings, BasicCollegeService, BasicDistrictsService, BasicExamService, BasicCourseService, BasicExamSubjectService) {
        $scope.RptPracticalBatchList = {};
        var CollegeName = "";
        var PageNm = $state.current.name.split(".")[1] + "List";
        varRptPracticalBatchListRightsdata = [];
        RptPracticalBatchListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptPracticalBatchListRightsdata.length; i++) {
            if (RptPracticalBatchListRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.RptPracticalBatchList.PreZoneCntrID == 0) {
                    if (RptPracticalBatchListRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (RptPracticalBatchListRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (RptPracticalBatchListRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.RptPracticalBatchList.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetCollegeData($scope.RptPracticalBatchList.DistrictID);
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });
        $scope.GetCollegeData = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(DistrictID);
                BasicCollegeList.then(function (BasicCollegeData, status, headers, config, error) {
                    $scope.BasicCollegeList = BasicCollegeData;
                }, function (BasicCollegeData, status, headers, config) {
                    alert(error);
                })
            }
        }
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
        }, function (ExamData, status, headers, config) {
            alert(error);
        })
        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.GetCollegeName = function (CollegeID) {
            for (var i = 0; i < $scope.BasicCollegeList.length; i++) {
                if (CollegeID == $scope.BasicCollegeList[i].CollegeID) {
                    CollegeName = $scope.BasicCollegeList[i].ColName;
                }
            }
        }
        $scope.GetBasicExamSubjectList = function (ExamID) {
            if (ExamID != "" || ExamID != undefined) {
                var BasicExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectListByExamID(ExamID, 2);
                BasicExamSubjectList.then(function (BasicExamSubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = BasicExamSubjectData;
                }, function (BasicExamSubjectData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.PrintPracticalBatchList = function () {
            if (CheckValidation() == true) {
                var Urlstring = "api/PreZoneCenter/GetPracticalBatchList/?ExmSubID=" + $scope.RptPracticalBatchList.ExmSubID + "&CollegeID=" + $scope.RptPracticalBatchList.CollegeID + "&ExamInstID=" + AppSettings.ExamInstID;
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
                        var datasetName1 = "PracticalBatchList";
                        if (data[0].length == 0) {
                            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                        }
                        data[0][0].CollegeName = CollegeName;
                        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                        reportModel._refreshReport();
                    }
                });
            }
        }
        function CheckValidation() {
            if (($scope.RptPracticalBatchList.DistrictID == undefined) || ($scope.RptPracticalBatchList.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.RptPracticalBatchList.CollegeID == undefined) || ($scope.RptPracticalBatchList.CollegeID == "")) {
                alert("Select College");
                return false;
            }
            if (($scope.RptPracticalBatchList.CourseID == undefined) || ($scope.RptPracticalBatchList.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.RptPracticalBatchList.ExamID == undefined) || ($scope.RptPracticalBatchList.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            if (($scope.RptPracticalBatchList.ExamID == ExmSubID) || ($scope.RptPracticalBatchList.ExmSubID == "")) {
                alert("Select Subject");
                return false;
            }
            else {
                return true;
            }
        }
        //varRptPracticalBatchList = [];
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
                reportPath: "RptPracticalBatchList.rdlc",
                dataSources: [{ value: [], name: "PracticalBatchList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
