define(['app'], function (app) {
    app.controller("PracticalMarkEntryAbsentCheckListReportController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService, BasicExamService, BasicCourseService, BasicCollegeService, BasicExamSubjectService, BasicBranchService, PrePractCenterService, PreVocationalCenterService) {
        $scope.PracticalMarkEntryAbsentList = {};

        // $scope.OtherSubjectAbsentList.ExamInstID = AppSettings.ExamInstID;

        var PageNm = $state.current.name.split(".")[1] + "List";
        var PracticalMarkEntryAbsentListRightsdata = [];
        PracticalMarkEntryAbsentListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PracticalMarkEntryAbsentListRightsdata.length; i++) {
            if (PracticalMarkEntryAbsentListRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.OtherSubjectAbsentList.OtherCenterID == 0) {
                    if (PracticalMarkEntryAbsentListRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PracticalMarkEntryAbsentListRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PracticalMarkEntryAbsentListRightsdata[i].isdeletable == 'Y') {
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
        $scope.GetBasicExamList = function (CourseID) {
            FillExamList(CourseID);
            FillBranchList(CourseID);
        }

        function FillExamList(CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }

        function FillBranchList(CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(CourseID);
                BasicBranchList.then(function (BranchData, status, headers, config, error) {
                    $scope.BasicBranchList = BranchData;
                }, function (BranchData, status, headers, config) {
                    alert(error);
                })
            }
        }


        $scope.GetPracticalCenterList = function (DistrictID) {
            FillCollegeList(DistrictID);
        }

        function FillCollegeList(DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                if ($scope.PracticalMarkEntryAbsentList.ExamID == 1 || $scope.PracticalMarkEntryAbsentList.ExamID == 2) {
                    var PraCenterList = PrePractCenterService.GetPrePractCenterByDistrictId(DistrictID, AppSettings.ExamInstID);
                    PraCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                        $scope.PraCenterList = PracticalCenterData;
                    }, function (PracticalCenterData, status, headers, config) {
                        alert(error);
                    })
                }
                if ($scope.PracticalMarkEntryAbsentList.ExamID == 3 || $scope.PracticalMarkEntryAbsentList.ExamID == 4) {
                    var PraCenterList = PreVocationalCenterService.GetPreVocationalCenterByDistrictId(DistrictID, AppSettings.ExamInstID);
                    PraCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                        $scope.PraCenterList = PracticalCenterData;
                    }, function (PracticalCenterData, status, headers, config) {
                        alert(error);
                    })
                }

            }
        }


        //function GetExamList(CourseID) {
        //    if (CourseID != "" || CourseID != undefined) {
        //        var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(CourseID);
        //        BasicBranchList.then(function (BranchData, status, headers, config, error) {
        //            $scope.BasicBranchList = BranchData;
        //        }, function (BranchData, status, headers, config) {
        //            alert(error);
        //        })
        //    }
        //}


        //$scope.GetBasicCollegeList = function (DistrictID) {
        //    if (DistrictID != "" || DistrictID != undefined) {
        //        var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(DistrictID);
        //        BasicCollegeList.then(function (CollegeData, status, headers, config, error) {
        //            $scope.BasicCollegeList = CollegeData;
        //        }, function (CollegeData, status, headers, config) {
        //            alert(error);
        //        })
        //    }
        //}

        $scope.GetExamSubjectList = function (BranchID) {
            if (BranchID != "" || BranchID != undefined) {
                var BasicExamSubjectList = BasicExamSubjectService.GetExamTimeTableSubjectListByExamIDBranchID($scope.PracticalMarkEntryAbsentList.ExamID, BranchID, AppSettings.ExamInstID);
                BasicExamSubjectList.then(function (ExmSubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = ExmSubjectData;
                }, function (ExmSubjectData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetPracticalMarkEntryAbsentListReport = function () {
            $scope.PracticalMarkEntryAbsentList.CourseID = $scope.PracticalMarkEntryAbsentList.CourseID;
            $scope.PracticalMarkEntryAbsentList.ExamID = $scope.PracticalMarkEntryAbsentList.ExamID;
            $scope.PracticalMarkEntryAbsentList.ExmSubID = $scope.PracticalMarkEntryAbsentList.ExmSubID;
            $scope.PracticalMarkEntryAbsentList.DistrictID = $scope.PracticalMarkEntryAbsentList.DistrictID;
            $scope.PracticalMarkEntryAbsentList.PrePractCntrID = $scope.PracticalMarkEntryAbsentList.PrePractCntrID;
            $scope.PracticalMarkEntryAbsentList.ExamInstID = AppSettings.ExamInstID;
            if ($scope.PracticalMarkEntryAbsentList.StatusFlag == undefined || $scope.PracticalMarkEntryAbsentList.StatusFlag == "") { 
            $scope.PracticalMarkEntryAbsentList.StatusFlag = "ALL";
            }
            //$scope.OtherSubjectAbsentList.UpdLoginID = AppSettings.LoggedUserId;
            if (CheckValidation() == true) {
                var Urlstring = "api/AbsentDetail/GetPracticalMarkEntryAbsentCheckListReport/?ExamID=" + $scope.PracticalMarkEntryAbsentList.ExamID + "&ExmSubID=" + $scope.PracticalMarkEntryAbsentList.ExmSubID + "&PrePractCntrID=" + $scope.PracticalMarkEntryAbsentList.PrePractCntrID + "&ExamInstID=" + $scope.PracticalMarkEntryAbsentList.ExamInstID + "&StatusFlag=" + $scope.PracticalMarkEntryAbsentList.StatusFlag;
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
                        var datasetName1 = "dsPractMarkEntrAbsCheckListReport";
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
            if (($scope.PracticalMarkEntryAbsentList.DistrictID == undefined) || ($scope.PracticalMarkEntryAbsentList.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PracticalMarkEntryAbsentList.CourseID == undefined) || ($scope.PracticalMarkEntryAbsentList.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.PracticalMarkEntryAbsentList.ExamID == undefined) || ($scope.PracticalMarkEntryAbsentList.ExamID == "")) {
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
                reportPath: "RptPractMarkEntrAbsCheckListReport.rdlc",
                dataSources: [{ value: [], name: "dsPractMarkEntrAbsCheckListReport" }],
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
