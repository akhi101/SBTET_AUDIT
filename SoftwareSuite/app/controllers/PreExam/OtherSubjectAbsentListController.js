define(['app'], function (app) {
    app.controller("OtherSubjectAbsentListController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService, BasicExamService, BasicCourseService, BasicCollegeService, BasicExamSubjectService) {
        $scope.OtherSubjectAbsentList = {};

       // $scope.OtherSubjectAbsentList.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var OtherSubjectAbsentListRightsdata = [];
        OtherSubjectAbsentListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < OtherSubjectAbsentListRightsdata.length; i++) {
            if (OtherSubjectAbsentListRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.OtherSubjectAbsentList.OtherCenterID == 0) {
                    if (OtherSubjectAbsentListRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (OtherSubjectAbsentListRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (OtherSubjectAbsentListRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        // $scope.isupdatableDisable = false;

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
        }, function (CourseData, status, headers, config) {
            alert(error);
        })

        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetBasicExamListByIYearByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetBasicCollegeList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(DistrictID);
                BasicCollegeList.then(function (CollegeData, status, headers, config, error) {
                    $scope.BasicCollegeList = CollegeData;
                }, function (CollegeData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetOtherExamSubjectList = function (ExamID) {
            if (ExamID != "" || ExamID != undefined) {
                var BasicExamSubjectList = BasicExamSubjectService.GetOtherExamSubjectListForOtherMarkEntrySchedule(ExamID);
                BasicExamSubjectList.then(function (ExmSubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = ExmSubjectData;
                }, function (ExmSubjectData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetOtherSubjectAbsentListReport = function () {
            $scope.OtherSubjectAbsentList.CourseID = $scope.OtherSubjectAbsentList.CourseID;
            $scope.OtherSubjectAbsentList.ExamID = $scope.OtherSubjectAbsentList.ExamID;
            $scope.OtherSubjectAbsentList.ExmSubID = $scope.OtherSubjectAbsentList.ExmSubID;
            $scope.OtherSubjectAbsentList.DistrictID = $scope.OtherSubjectAbsentList.DistrictID;
            $scope.OtherSubjectAbsentList.CollegeID = $scope.OtherSubjectAbsentList.CollegeID;
            $scope.OtherSubjectAbsentList.ExamInstID = AppSettings.ExamInstID;
            
            if ($scope.OtherSubjectAbsentList.StatusFlag == undefined || $scope.OtherSubjectAbsentList.StatusFlag == "") {
                $scope.OtherSubjectAbsentList.StatusFlag = "ALL";
            }
            //$scope.OtherSubjectAbsentList.UpdLoginID = AppSettings.LoggedUserId;
            if (CheckValidation() == true) {
                var Urlstring = "api/AbsentDetail/GetOtherSubjectExamAbsentCheckListReport/?ExamID=" + $scope.OtherSubjectAbsentList.ExamID + "&ExmSubID=" + $scope.OtherSubjectAbsentList.ExmSubID + "&ExamInstID=" + $scope.OtherSubjectAbsentList.ExamInstID + "&CollegeID=" + $scope.OtherSubjectAbsentList.CollegeID + "&StatusFlag=" + $scope.OtherSubjectAbsentList.StatusFlag;
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
                        var datasetName1 = "dsOtherSubjectAbsentList";
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
            if (($scope.OtherSubjectAbsentList.DistrictID == undefined) || ($scope.OtherSubjectAbsentList.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.OtherSubjectAbsentList.CourseID == undefined) || ($scope.OtherSubjectAbsentList.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.OtherSubjectAbsentList.ExamID == undefined) || ($scope.OtherSubjectAbsentList.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            else {
                return true;
            }
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
                reportPath: "RptOtherSubjectAbsentList.rdlc",
                dataSources: [{ value: [], name: "dsOtherSubjectAbsentList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });

    //});
});
