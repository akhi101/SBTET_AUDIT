define(['app'], function (app) {
    app.controller("AttendanceCheckLIstReportController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService, BasicExamService, BasicCourseService, BasicCollegeService, BasicExamSubjectService, PrePractCenterService, PreVocationalCenterService, BasicBranchService) {
        $scope.AttendanceCheckList = { MarkEntrSchID: $stateParams.MarkEntrSchID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var AttendanceCheckListRightsdata = [];

        AttendanceCheckListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < AttendanceCheckListRightsdata.length; i++) {
            if (AttendanceCheckListRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.AttendanceCheckList.MarkEntrSchID == 0) {
                    if (AttendanceCheckListRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (AttendanceCheckListRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (AttendanceCheckListRightsdata[i].isdeletable == 'Y') {
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
        })

        $scope.GetExamList = function (CourseID) {
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

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictList();
        BasicDistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.BasicDistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });



        $scope.GetBasicCollegeList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {

                if ($scope.AttendanceCheckList.SubjectType == "O") {
                    var PraCenterList = PrePractCenterService.GetCollegeAsPracticalCenter(DistrictID);
                    PraCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                        $scope.PraCenterList = PracticalCenterData;
                    }, function (PracticalCenterData, status, headers, config) {
                        alert(error);
                    })
                }
                if ($scope.AttendanceCheckList.SubjectType == "R") {
                    //if ($scope.AttendanceCheckList.ExamID == 1 || $scope.AttendanceCheckList.ExamID == 2) {
                        var PraCenterList = BasicCollegeService.GetTheroyExamCenterCollegeList(DistrictID, AppSettings.ExamInstID);
                        PraCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                            $scope.PraCenterList = PracticalCenterData;
                        }, function (PracticalCenterData, status, headers, config) {
                            alert(error);
                        })
                    //}
                    //if ($scope.AttendanceCheckList.ExamID == 3 || $scope.AttendanceCheckList.ExamID == 4) {
                    //    var PraCenterList = PreVocationalCenterService.GetPreVocationalCenterByDistrictId(DistrictID, AppSettings.ExamInstID);
                    //    PraCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                    //        $scope.PraCenterList = PracticalCenterData;
                    //    }, function (PracticalCenterData, status, headers, config) {
                    //        alert(error);
                    //    })
                    //}
                }
            }
        }

        $scope.GetOtherExamSubjectList = function (ExamID) {
            if ($scope.AttendanceCheckList.SubjectType == "O") {
                if (ExamID != "" || ExamID != undefined) {
                    var BasicExamSubjectList = BasicExamSubjectService.GetOtherExamSubjectListForOtherMarkEntrySchedule(ExamID);
                    BasicExamSubjectList.then(function (ExmSubjectData, status, headers, config, error) {
                        $scope.BasicExamSubjectList = ExmSubjectData;
                    }, function (ExmSubjectData, status, headers, config) {
                        alert(error);
                    })
                }
            }
            if ($scope.AttendanceCheckList.SubjectType == "R") {
                var BasicExamSubjectList = BasicExamSubjectService.GetSubjectForAttendanceCheckList($scope.AttendanceCheckList.CourseID , ExamID);
                BasicExamSubjectList.then(function (ExmSubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = ExmSubjectData;
                }, function (ExmSubjectData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetTheoryExamAttendanceCheckListReport = function () {
            $scope.AttendanceCheckList.CourseID = $scope.AttendanceCheckList.CourseID;
            $scope.AttendanceCheckList.ExamID = $scope.AttendanceCheckList.ExamID;
            $scope.AttendanceCheckList.ExmSubID = $scope.AttendanceCheckList.ExmSubID;
            $scope.AttendanceCheckList.DistrictID = $scope.AttendanceCheckList.DistrictID;
            $scope.AttendanceCheckList.PreZoneCntrID = $scope.AttendanceCheckList.PreZoneCntrID;
            $scope.AttendanceCheckList.ExamInstID = AppSettings.ExamInstID;
            if ($scope.AttendanceCheckList.SubjectType == undefined || $scope.AttendanceCheckList.SubjectType == "") {
                $scope.AttendanceCheckList.SubjectType = "ALL";
            }
            //$scope.OtherSubjectAbsentList.UpdLoginID = AppSettings.LoggedUserId;
            if (CheckValidation() == true) {
                var Urlstring = "api/AbsentDetail/GetTheoryPaperAttendanceCheckList/?ExamID=" + $scope.AttendanceCheckList.ExamID + "&ExmSubID=" + $scope.AttendanceCheckList.ExmSubID + "&PreZoneCntrID=" + $scope.AttendanceCheckList.PreZoneCntrID + "&ExamInstID=" + $scope.AttendanceCheckList.ExamInstID + "&SubjectType=" + $scope.AttendanceCheckList.SubjectType;
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
                        var datasetName1 = "dsAttendanceChekList";
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
            if (($scope.AttendanceCheckList.CourseID == undefined) || ($scope.AttendanceCheckList.CourseID == "")) {
                alert("Please Select Course");
                return false;
            }
            if (($scope.AttendanceCheckList.ExamID == undefined) || ($scope.AttendanceCheckList.ExamID == "")) {
                alert("Please Select Exam");
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
            $state.go('PreExam');
        }

        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptAttendanceChekListReport.rdlc",
                dataSources: [{ value: [], name: "dsAttendanceChekList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });

        //$scope.openCalendarFromDate = function () {
        //    $scope.PreReqSchedule.FromDateIsOpen = true;
        //}
    });
});
