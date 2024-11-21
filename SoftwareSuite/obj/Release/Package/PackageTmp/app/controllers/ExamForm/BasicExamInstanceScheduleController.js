define(['app'], function (app) {
    app.controller("BasicExamInstanceScheduleController", function ($scope, $state, $stateParams, AppSettings, BasicExamInstanceScheduleService, BasicExamService, BasicBranchService, ExamFormsApprovalService) {
        $scope.BasicExamInstanceSchedule = { ExmInstSchID: $stateParams.ExmInstSchID };
        var PageNm = $state.current.name.split(".")[1] + "";
        var BasicExamInstanceScheduleRightsdata = [];
        BasicExamInstanceScheduleRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicExamInstanceScheduleRightsdata.length; i++) {
            if (BasicExamInstanceScheduleRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicExamInstanceSchedule.ExmInstSchID == 0) {
                    if (BasicExamInstanceScheduleRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicExamInstanceScheduleRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicExamInstanceScheduleRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.ExamDisable = true;
        $scope.FillCollege = function (MandalID) {
            if ((MandalID > 0) || (MandalID != undefined)) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                $scope.CollegeList = [];
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.BasicExamInstanceSchedule.DistrictID, MandalID);
                CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    if (CollegeListdata.length == 0) {
                        $scope.CollegeList = [];
                        alert("There is no college in this mandal");
                        return;
                    } else {
                        $scope.CollegeList = CollegeListdata;
                        $scope.GovtColEnroll.CollegeID = "";
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollData = function (CollegeID) {
            if (CollegeID != null) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.BasicExamInstanceSchedule.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
            }, function (error) {
                alert(error);
            });
        }
        var ExamInstList = BasicExamInstanceScheduleService.GetExamInstanceYearList();
        ExamInstList.then(function (ExamInstdata, status, headers, config, error) {
            $scope.BasicExamInstanceSchedule.ExamInstanceNAme = ExamInstdata[0].ExamInstanceNAme;
            $scope.BasicExamInstanceSchedule.ExamInstID = ExamInstdata[0].ExamInstID;
        }, function (ExamInstdata, status, headers, config) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsApprovalService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamDisable = false;
                    $scope.ExamList = BasicExamdata;
                    var BranchList = ExamFormsApprovalService.GetBasicBranchListByCourseID(CourseID);
                    BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                        $scope.BranchList = BasicBranchdata;
                        $scope.BasicExamInstanceSchedule.BranchName = $scope.BranchList[0].BranchName;
                        $scope.BasicExamInstanceSchedule.BranchID = $scope.BranchList[0].BranchID;
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.ForBoardDisable = true;
        if (AppSettings.CollegeID == 0) {
            $scope.ForBoardDisable = false;
            var DistrictList = ExamFormsApprovalService.GetDistrictListByStateID(1);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        } else {
            $scope.BasicExamInstanceSchedule.CollegeID = AppSettings.CollegeID;
        }
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                $scope.CollegeList = [];
                $scope.MandalList = [];
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;
                var MandalList = ExamFormsApprovalService.GetMandalListByDistrict(DistrictID);
                MandalList.then(function (MandalListdata, status, headers, config, error) {
                    $scope.MandalList = MandalListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        var ExamFeesCode = "";
        var ExamFeesDesc = "";
        var ExamFeesAmount = 0;
        var ExmInstSchID = $scope.BasicExamInstanceSchedule.ExmInstSchID;
        var ExamInstID = AppSettings.ExamInstID;

        $scope.FillExamFeesPerYearList = function (ExamId) {
            var ExamFeesPerYearList = BasicExamInstanceScheduleService.GetExamFeesPerYear(ExamFeesCode, ExamFeesDesc, ExamFeesAmount, ExmInstSchID, ExamInstID, ExamId);
            ExamFeesPerYearList.then(function (ExamFeesPerYearListdata, status, headers, config, error) {
                $scope.ExamFeesPerYearList = ExamFeesPerYearListdata;
            }, function (error) {
                alert(error);
            });
        }

        var ExamList = BasicExamService.GetBasicExamList(0);
        ExamList.then(function (Examdata, status, headers, config, error) {
            $scope.ExamList = Examdata;
            var BranchList = BasicBranchService.GetBasicBranchList();
            BranchList.then(function (Branchdata, status, headers, config, error) {
                $scope.BranchList = Branchdata;
                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(0);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                    if ($scope.BasicExamInstanceSchedule.ExmInstSchID > 0) {
                        var BasicExamInstanceScheduledata = BasicExamInstanceScheduleService.GetBasicExamInstanceScheduleListByID($scope.BasicExamInstanceSchedule.ExmInstSchID);
                        BasicExamInstanceScheduledata.then(function (data) {
                            $scope.BasicExamInstanceSchedule = data[0];
                            $scope.BasicExamInstanceSchedule.ExamId = $scope.BasicExamInstanceSchedule.ExamID;
                            $("#StartDate").ejDatePicker({ value: data[0].StartDate });
                            $("#EndDate").ejDatePicker({ value: data[0].EndDate });
                            $("#EndCollegeTransDate").ejDatePicker({ value: data[0].EndCollegeTransDate });
                            $("#LateFeeDate").ejDatePicker({ value: data[0].LateFeeDate });
                            $("#SuperLateFeeDate").ejDatePicker({ value: data[0].SuperLateFeeDate });
                            $("#SuperSuperLateFeeDate").ejDatePicker({ value: data[0].SuperSuperLateFeeDate });
                            $("#FromLateDate1").ejDatePicker({ value: data[0].FromLateDate1 });
                            $("#FromLateDate2").ejDatePicker({ value: data[0].FromLateDate2 });
                            $("#FromLateDate3").ejDatePicker({ value: data[0].FromLateDate3 });
                            $("#FromLateDate4").ejDatePicker({ value: data[0].FromLateDate4 });
                            $("#FromLateDate5").ejDatePicker({ value: data[0].FromLateDate5 });
                            $("#FromLateDate6").ejDatePicker({ value: data[0].FromLateDate6 });
                            //$("#FromLateDate7").ejDatePicker({ value: data[0].FromLateDate7 });

                            $("#UpToLateDate1").ejDatePicker({ value: data[0].UpToLateDate1 });
                            $("#UpToLateDate2").ejDatePicker({ value: data[0].UpToLateDate2 });
                            $("#UpToLateDate3").ejDatePicker({ value: data[0].UpToLateDate3 });
                            $("#UpToLateDate4").ejDatePicker({ value: data[0].UpToLateDate4 });
                            $("#UpToLateDate5").ejDatePicker({ value: data[0].UpToLateDate5 });
                            $("#UpToLateDate6").ejDatePicker({ value: data[0].UpToLateDate6 });
                            //$("#UpToLateDate7").ejDatePicker({ value: data[0].UpToLateDate7 });

                            $("#CollegeTransDate1").ejDatePicker({ value: data[0].CollegeTransDate1 });
                            $("#CollegeTransDate2").ejDatePicker({ value: data[0].CollegeTransDate2 });
                            $("#CollegeTransDate3").ejDatePicker({ value: data[0].CollegeTransDate3 });
                            $("#CollegeTransDate4").ejDatePicker({ value: data[0].CollegeTransDate4 });
                            $("#CollegeTransDate5").ejDatePicker({ value: data[0].CollegeTransDate5 });
                            $("#CollegeTransDate6").ejDatePicker({ value: data[0].CollegeTransDate6 });
                            //$("#CollegeTransDate7").ejDatePicker({ value: data[0].CollegeTransDate7 });

                            if ($scope.BasicExamInstanceSchedule.PostingOfMarksFlag == 'Y') { $scope.BasicExamInstanceSchedule.PostingOfMarksFlag = true } else { $scope.BasicExamInstanceSchedule.PostingOfMarksFlag = false }
                            if ($scope.BasicExamInstanceSchedule.MarksSheetArchieveFlag == 'Y') { $scope.BasicExamInstanceSchedule.MarksSheetArchieveFlag = true } else { $scope.BasicExamInstanceSchedule.MarksSheetArchieveFlag = false }
                            if ($scope.BasicExamInstanceSchedule.ExamCenterAllocationFlag == 'Y') { $scope.BasicExamInstanceSchedule.ExamCenterAllocationFlag = true } else { $scope.BasicExamInstanceSchedule.ExamCenterAllocationFlag = false }
                            if ($scope.BasicExamInstanceSchedule.ResultPocessingFlag == 'Y') { $scope.BasicExamInstanceSchedule.ResultPocessingFlag = true } else { $scope.BasicExamInstanceSchedule.ResultPocessingFlag = false }
                            if ($scope.BasicExamInstanceSchedule.ApproveFlag == 'Y') { $scope.BasicExamInstanceSchedule.ApproveFlag = true } else { $scope.BasicExamInstanceSchedule.ApproveFlag = false }
                            if ($scope.BasicExamInstanceSchedule.SeatNoGenerationFlag == 'Y') { $scope.BasicExamInstanceSchedule.SeatNoGenerationFlag = true } else { $scope.BasicExamInstanceSchedule.SeatNoGenerationFlag = false }
                            if ($scope.BasicExamInstanceSchedule.LedgerArchieveFlag == 'Y') { $scope.BasicExamInstanceSchedule.LedgerArchieveFlag = true } else { $scope.BasicExamInstanceSchedule.LedgerArchieveFlag = false }

                            var ExamFeesPerYearList = BasicExamInstanceScheduleService.GetExamFeesPerYear(ExamFeesCode, ExamFeesDesc, ExamFeesAmount, $scope.BasicExamInstanceSchedule.ExmInstSchID, ExamInstID, $scope.BasicExamInstanceSchedule.ExamId);
                            ExamFeesPerYearList.then(function (ExamFeesPerYearListdata, status, headers, config, error) {
                                $scope.ExamFeesPerYearList = ExamFeesPerYearListdata;
                            }, function (error) {
                                alert(error);
                            });


                        }, function (error) {
                            alert(error);
                        });
                    }
                }, function (error) {
                    alert(error);
                });
            }, function (Branchdata, status, headers, config) {
                alert(error);
            });
        }, function (Examdata, status, headers, config) {
            alert(error);
        });
        $("#StartDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#EndDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#EndCollegeTransDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        //$("#SuperLateFeeDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        //$("#SuperSuperLateFeeDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#FromLateDate1").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#FromLateDate2").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#FromLateDate3").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#FromLateDate4").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#FromLateDate5").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#FromLateDate6").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        //$("#FromLateDate7").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });

        $("#UpToLateDate1").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#UpToLateDate2").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#UpToLateDate3").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#UpToLateDate4").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#UpToLateDate5").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#UpToLateDate6").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        //$("#UpToLateDate7").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });

        $("#CollegeTransDate1").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#CollegeTransDate2").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#CollegeTransDate3").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#CollegeTransDate4").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#CollegeTransDate5").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#CollegeTransDate6").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        //$("#CollegeTransDate7").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });


        $scope.SaveBasicExamInstanceSchedule = function () {

            if ($("#StartDate").val() != "") { $scope.BasicExamInstanceSchedule.StartDate = $("#StartDate").val(); }
            if ($("#EndDate").val() != "") { $scope.BasicExamInstanceSchedule.EndDate = $("#EndDate").val(); }
            if ($("#EndCollegeTransDate").val() != "") { $scope.BasicExamInstanceSchedule.EndCollegeTransDate = $("#EndCollegeTransDate").val(); }
            //if ($("#LateFeeDate").val() != "") { $scope.BasicExamInstanceSchedule.LateFeeDate = $("#LateFeeDate").val(); }
            //if ($("#SuperLateFeeDate").val() != "") { $scope.BasicExamInstanceSchedule.SuperLateFeeDate = $("#SuperLateFeeDate").val(); }
            //if ($("#SuperSuperLateFeeDate").val() != "") { $scope.BasicExamInstanceSchedule.SuperSuperLateFeeDate = $("#SuperSuperLateFeeDate").val(); }

            if ($("#FromLateDate1").val() != "") { $scope.BasicExamInstanceSchedule.FromLateDate1 = $("#FromLateDate1").val(); }
            if ($("#FromLateDate2").val() != "") { $scope.BasicExamInstanceSchedule.FromLateDate2 = $("#FromLateDate2").val(); }
            if ($("#FromLateDate3").val() != "") { $scope.BasicExamInstanceSchedule.FromLateDate3 = $("#FromLateDate3").val(); }
            if ($("#FromLateDate4").val() != "") { $scope.BasicExamInstanceSchedule.FromLateDate4 = $("#FromLateDate4").val(); }
            if ($("#FromLateDate5").val() != "") { $scope.BasicExamInstanceSchedule.FromLateDate5 = $("#FromLateDate5").val(); }
            if ($("#FromLateDate6").val() != "") { $scope.BasicExamInstanceSchedule.FromLateDate6 = $("#FromLateDate6").val(); }
            //if ($("#FromLateDate7").val() != "") { $scope.BasicExamInstanceSchedule.FromLateDate7 = $("#FromLateDate7").val(); }

            if ($("#UpToLateDate1").val() != "") { $scope.BasicExamInstanceSchedule.UpToLateDate1 = $("#UpToLateDate1").val(); }
            if ($("#UpToLateDate2").val() != "") { $scope.BasicExamInstanceSchedule.UpToLateDate2 = $("#UpToLateDate2").val(); }
            if ($("#UpToLateDate3").val() != "") { $scope.BasicExamInstanceSchedule.UpToLateDate3 = $("#UpToLateDate3").val(); }
            if ($("#UpToLateDate4").val() != "") { $scope.BasicExamInstanceSchedule.UpToLateDate4 = $("#UpToLateDate4").val(); }
            if ($("#UpToLateDate5").val() != "") { $scope.BasicExamInstanceSchedule.UpToLateDate5 = $("#UpToLateDate5").val(); }
            if ($("#UpToLateDate6").val() != "") { $scope.BasicExamInstanceSchedule.UpToLateDate6 = $("#UpToLateDate6").val(); }
            //if ($("#UpToLateDate7").val() != "") { $scope.BasicExamInstanceSchedule.UpToLateDate7 = $("#UpToLateDate7").val(); }

            if ($("#CollegeTransDate1").val() != "") { $scope.BasicExamInstanceSchedule.CollegeTransDate1 = $("#CollegeTransDate1").val(); }
            if ($("#CollegeTransDate2").val() != "") { $scope.BasicExamInstanceSchedule.CollegeTransDate2 = $("#CollegeTransDate2").val(); }
            if ($("#CollegeTransDate3").val() != "") { $scope.BasicExamInstanceSchedule.CollegeTransDate3 = $("#CollegeTransDate3").val(); }
            if ($("#CollegeTransDate4").val() != "") { $scope.BasicExamInstanceSchedule.CollegeTransDate4 = $("#CollegeTransDate4").val(); }
            if ($("#CollegeTransDate5").val() != "") { $scope.BasicExamInstanceSchedule.CollegeTransDate5 = $("#CollegeTransDate5").val(); }
            if ($("#CollegeTransDate6").val() != "") { $scope.BasicExamInstanceSchedule.CollegeTransDate6 = $("#CollegeTransDate6").val(); }
            //if ($("#CollegeTransDate7").val() != "") { $scope.BasicExamInstanceSchedule.CollegeTransDate7 = $("#CollegeTransDate7").val(); }

            //if ($("#StartDate").val() < new Date("dd/MMM/yyyy")) {
            //    alert("Start date must be greater than today date");
            //    return;
            //}
            //if ($("#EndDate").val() < $("#StartDate").val()) {
            //    alert("End date must be greater than Start date");
            //    return;
            //}
            //if ($("#LateFeeDate").val() < $("#EndDate").val()) {
            //    alert("Late Fee date must be greater than End date");
            //    return;
            //} else if ($("#LateFeeDate").val() > $("#SuperLateFeeDate").val()) {
            //    alert("Late Fee date must be less than Super Late Fee date");
            //    return;
            //}
            //if ($("#SuperLateFeeDate").val() < $("#LateFeeDate").val()) {
            //    alert("Super Late Fee date must be greater than Late Fee date");
            //    return;
            //} else if ($("#SuperLateFeeDate").val() > $("#SuperSuperLateFeeDate").val()) {
            //    alert("Super Late Fee date must be less than Super Super Late Fee date");
            //    return;
            //}
            //if ($("#SuperSuperLateFeeDate").val() < $("#SuperLateFeeDate").val()) {
            //    alert("Super Super Late Fee date must be greater than Super Late Fee date");
            //    return;
            //} 
            var ExamFeesPerYearList = [];
            for (var k = 0; k < $scope.ExamFeesPerYearList.length; k++) {
                var obj = {};

                obj.ExamFeesID = $scope.ExamFeesPerYearList[k].ExamFeesID;
                obj.ExamFeesCode = $scope.ExamFeesPerYearList[k].ExamFeesCode;
                obj.ExamFeesDesc = $scope.ExamFeesPerYearList[k].ExamFeesDesc;
                obj.ExamFeesAmount = $scope.ExamFeesPerYearList[k].ExamFeesAmount;
                obj.ExmInstSchID = $scope.BasicExamInstanceSchedule.ExmInstSchID;
                obj.ExamInstID = AppSettings.ExamInstID;
                ExamFeesPerYearList.push(obj);
            }

            $scope.BasicExamInstanceSchedule.ExamFeesPerYearList = ExamFeesPerYearList;
            $scope.isupdatableDisable = true;
            if ($scope.BasicExamInstanceSchedule.PostingOfMarksFlag == true) { $scope.BasicExamInstanceSchedule.PostingOfMarksFlag = 'Y' } else { $scope.BasicExamInstanceSchedule.PostingOfMarksFlag = 'N' }
            if ($scope.BasicExamInstanceSchedule.MarksSheetArchieveFlag == true) { $scope.BasicExamInstanceSchedule.MarksSheetArchieveFlag = 'Y' } else { $scope.BasicExamInstanceSchedule.MarksSheetArchieveFlag = 'N' }
            if ($scope.BasicExamInstanceSchedule.ExamCenterAllocationFlag == true) { $scope.BasicExamInstanceSchedule.ExamCenterAllocationFlag = 'Y' } else { $scope.BasicExamInstanceSchedule.ExamCenterAllocationFlag = 'N' }
            if ($scope.BasicExamInstanceSchedule.ResultPocessingFlag == true) { $scope.BasicExamInstanceSchedule.ResultPocessingFlag = 'Y' } else { $scope.BasicExamInstanceSchedule.ResultPocessingFlag = 'N' }
            if ($scope.BasicExamInstanceSchedule.ApproveFlag == true) { $scope.BasicExamInstanceSchedule.ApproveFlag = 'Y' } else { $scope.BasicExamInstanceSchedule.ApproveFlag = 'N' }
            if ($scope.BasicExamInstanceSchedule.SeatNoGenerationFlag == true) { $scope.BasicExamInstanceSchedule.SeatNoGenerationFlag = 'Y' } else { $scope.BasicExamInstanceSchedule.SeatNoGenerationFlag = 'N' }
            if ($scope.BasicExamInstanceSchedule.LedgerArchieveFlag == true) { $scope.BasicExamInstanceSchedule.LedgerArchieveFlag = 'Y' } else { $scope.BasicExamInstanceSchedule.LedgerArchieveFlag = 'N' }

            if ($scope.BasicExamInstanceSchedule.ExmInstSchID == undefined) { $scope.BasicExamInstanceSchedule.ExmInstSchID = 0; }
            if ($scope.BasicExamInstanceSchedule.ExmInstSchID == "") { $scope.BasicExamInstanceSchedule.ExmInstSchID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicExamInstanceSchedule.ExmInstSchID == 0) {
                    $scope.BasicExamInstanceSchedule.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicExamInstanceSchedule.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.BasicExamInstanceSchedule.SuperSuperLateFeeDate = 0;
                    $scope.BasicExamInstanceSchedule.RegularFeeAmount = 0;
                    //$scope.BasicExamInstanceSchedule.BranchID = 0;

                    var getCheckDate = BasicExamInstanceScheduleService.PostCheckDatesValidations($scope.BasicExamInstanceSchedule); /*$("#StartDate").val(), $("#EndDate").val(), $("#FromLateDate1").val(), $("#FromLateDate2").val(), $("#FromLateDate3").val()*/
                    getCheckDate.then(function (data) {
                        if (data != "") {
                            alert(data);
                            //alert("Start date must be greater than today date");
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        //else if (data == 2) {
                        //    alert("End date must be greater than Start date");
                        //    $scope.isupdatableDisable = false;
                        //    return;
                        //}
                        //else if (data == 3) {
                        //    alert("Late Fee date must be greater than End date");
                        //    $scope.isupdatableDisable = false;
                        //    return;
                        //}
                        //else if (data == 4) {
                        //    alert("Late Fee date must be less than Super Late Fee date");
                        //    $scope.isupdatableDisable = false;
                        //    return;
                        //}
                        //else if (data == 5) {
                        //    alert("Super Late Fee date must be greater than Late Fee date");
                        //    $scope.isupdatableDisable = false;
                        //    return;
                        //} else if (data == 6) {
                        //    alert("Super Late Fee date must be less than Super Super Late Fee date");
                        //    $scope.isupdatableDisable = false;
                        //    return;
                        //}
                        //else if (data == 7) {
                        //    alert("Super Super Late Fee date must be greater than Super Late Fee date");
                        //    $scope.isupdatableDisable = false;
                        //    return;
                        //} else if (data == 8) {
                        //    alert("Super Late Fee date must be greater than To date");
                        //    $scope.isupdatableDisable = false;
                        //    return;
                        //}
                        else {
                            var getPromise = BasicExamInstanceScheduleService.CheckDuplicateInstance($scope.BasicExamInstanceSchedule.ExamInstID, $scope.BasicExamInstanceSchedule.CourseID, $scope.BasicExamInstanceSchedule.ExamId, $scope.BasicExamInstanceSchedule.BranchID);
                            getPromise.then(function (data) {
                                if (data != 0) {
                                    $scope.isupdatableDisable = false;
                                    alert("Exam instance already created");
                                    return;
                                } else {
                                    var getPromise = BasicExamInstanceScheduleService.AddBasicExamInstanceSchedule($scope.BasicExamInstanceSchedule);
                                    getPromise.then(function (msg) {
                                        alert("Added successfully!!");
                                        RedirectToListPage();
                                    }, function (error) {
                                        $scope.isupdatableDisable = false;
                                        alert(error);
                                    });
                                }
                            }, function (error) {
                                $scope.isupdatableDisable = false;
                                alert(error);
                            });
                        }
                    }, function (error) {
                        alert(error);
                    });
                }
                else {
                    var getCheckDate = BasicExamInstanceScheduleService.PostCheckDatesValidations($scope.BasicExamInstanceSchedule); /*$("#StartDate").val(), $("#EndDate").val(), $("#FromLateDate1").val(), $("#FromLateDate2").val(), $("#FromLateDate3").val()*/
                    getCheckDate.then(function (data) {
                        if (data != "") {
                            alert(data);
                            //alert("Start date must be greater than today date");
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        else {
                            $scope.BasicExamInstanceSchedule.UpdLoginID = AppSettings.LoggedUserId;
                            var getPromise = BasicExamInstanceScheduleService.UpdateBasicExamInstanceSchedule($scope.BasicExamInstanceSchedule);
                            getPromise.then(function (msg) {
                                alert("Update successfully!!");
                                RedirectToListPage();
                            }, function (error) {
                                $scope.isupdatableDisable = false;
                                alert(error);
                            });
                        }
                    }, function (error) {
                        alert(error);
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicExamInstanceSchedule = function () {
            var getData = BasicExamInstanceScheduleService.DeleteBasicExamInstanceSchedule($scope.BasicExamInstanceSchedule.ExmInstSchID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicExamInstanceSchedule.ExamInstID == undefined) || ($scope.BasicExamInstanceSchedule.ExamInstID == 0)) {
                alert("Select Exam Instance ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.ExamId == undefined) || ($scope.BasicExamInstanceSchedule.ExamId == 0)) {
                alert("Select Exam ");
                return false;
            }
            //if (($scope.BasicExamInstanceSchedule.BranchID == undefined) || ($scope.BasicExamInstanceSchedule.BranchID == 0)) {
            //    alert("Select Branch");
            //    return false;
            //}
            //if (($scope.BasicExamInstanceSchedule.RegularFeeAmount == undefined) || ($scope.BasicExamInstanceSchedule.RegularFeeAmount == 0)) {
            //    alert("Enter Reguler Fee Amount");
            //    return false;
            //}
            if (($scope.BasicExamInstanceSchedule.DescLate1 == undefined) || ($scope.BasicExamInstanceSchedule.DescLate1 == "")) {
                alert("Enter Particulars 1");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.DescLate2 == undefined) || ($scope.BasicExamInstanceSchedule.DescLate2 == "")) {
                alert("Enter Particulars 2");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.DescLate4 == undefined) || ($scope.BasicExamInstanceSchedule.DescLate4 == "")) {
                alert("Enter Particulars 3");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.DescLate1 == undefined) || ($scope.BasicExamInstanceSchedule.DescLate1 == "")) {
                alert("Enter Particulars 4");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.DescLate5 == undefined) || ($scope.BasicExamInstanceSchedule.DescLate5 == "")) {
                alert("Enter Particulars 5");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.DescLate6 == undefined) || ($scope.BasicExamInstanceSchedule.DescLate6 == "")) {
                alert("Enter Particulars 6");
                return false;
            }
            //if (($scope.BasicExamInstanceSchedule.DescLate7 == undefined) || ($scope.BasicExamInstanceSchedule.DescLate7 == "")) {
            //    alert("Enter Particulars 7");
            //    return false;
            //}
            if (($scope.BasicExamInstanceSchedule.LateAmount1 == undefined) || ($scope.BasicExamInstanceSchedule.LateAmount1 == "")) {
                alert("Enter  Late Fee Amount 1");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.LateAmount2 == undefined) || ($scope.BasicExamInstanceSchedule.LateAmount2 == "")) {
                alert("Enter  Late Fee Amount 2");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.LateAmount3 == undefined) || ($scope.BasicExamInstanceSchedule.LateAmount3 == "")) {
                alert("Enter  Late Fee Amount 3");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.LateAmount4 == undefined) || ($scope.BasicExamInstanceSchedule.LateAmount4 == "")) {
                alert("Enter  Late Fee Amount 4");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.LateAmount5 == undefined) || ($scope.BasicExamInstanceSchedule.LateAmount5 == "")) {
                alert("Enter  Late Fee Amount 5");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.LateAmount6 == undefined) || ($scope.BasicExamInstanceSchedule.LateAmount6 == "")) {
                alert("Enter  Late Fee Amount 6");
                return false;
            }
            //if (($scope.BasicExamInstanceSchedule.LateAmount7 == undefined) || ($scope.BasicExamInstanceSchedule.LateAmount7 == "")) {
            //    alert("Enter  Late Fee Amount 7");
            //    return false;
            //}
            if (($scope.BasicExamInstanceSchedule.FromLateDate1 == undefined) || ($scope.BasicExamInstanceSchedule.FromLateDate1 == "")) {
                alert("Please Select From Late Date1 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.FromLateDate2 == undefined) || ($scope.BasicExamInstanceSchedule.FromLateDate2 == "")) {
                alert("Please Select From Late Date2 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.FromLateDate3 == undefined) || ($scope.BasicExamInstanceSchedule.FromLateDate3 == "")) {
                alert("Please Select From Late Date3 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.FromLateDate4 == undefined) || ($scope.BasicExamInstanceSchedule.FromLateDate4 == "")) {
                alert("Please Select From Late Date4 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.FromLateDate5 == undefined) || ($scope.BasicExamInstanceSchedule.FromLateDate5 == "")) {
                alert("Please Select From Late Date5 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.FromLateDate6 == undefined) || ($scope.BasicExamInstanceSchedule.FromLateDate6 == "")) {
                alert("Please Select From Late Date6 ");
                return false;
            }
            //if (($scope.BasicExamInstanceSchedule.FromLateDate7 == undefined) || ($scope.BasicExamInstanceSchedule.FromLateDate7 == "")) {
            //    alert("Please Select From Late Date7 ");
            //    return false;
            //}
            if (($scope.BasicExamInstanceSchedule.UpToLateDate1 == undefined) || ($scope.BasicExamInstanceSchedule.UpToLateDate1 == "")) {
                alert("Please Select up to Late Date1 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.UpToLateDate2 == undefined) || ($scope.BasicExamInstanceSchedule.UpToLateDate2 == "")) {
                alert("Please Select up to Late Date2 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.UpToLateDate3 == undefined) || ($scope.BasicExamInstanceSchedule.UpToLateDate3 == "")) {
                alert("Please Select up to Late Date3 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.UpToLateDate4 == undefined) || ($scope.BasicExamInstanceSchedule.UpToLateDate4 == "")) {
                alert("Please Select up to Late Date4 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.UpToLateDate5 == undefined) || ($scope.BasicExamInstanceSchedule.UpToLateDate5 == "")) {
                alert("Please Select up to Late Date5 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.UpToLateDate6 == undefined) || ($scope.BasicExamInstanceSchedule.UpToLateDate6 == "")) {
                alert("Please Select up to Late Date6 ");
                return false;
            }
            //if (($scope.BasicExamInstanceSchedule.UpToLateDate7 == undefined) || ($scope.BasicExamInstanceSchedule.UpToLateDate7 == "")) {
            //    alert("Please Select up to Late Date7 ");
            //    return false;
            //}
            if (($scope.BasicExamInstanceSchedule.CollegeTransDate1 == undefined) || ($scope.BasicExamInstanceSchedule.CollegeTransDate1 == "")) {
                alert("Please Select College Payment Tranasfer Date1 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.CollegeTransDate2 == undefined) || ($scope.BasicExamInstanceSchedule.CollegeTransDate2 == "")) {
                alert("Please Select College Payment Tranasfer Date2 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.CollegeTransDate3 == undefined) || ($scope.BasicExamInstanceSchedule.CollegeTransDate3 == "")) {
                alert("Please Select College Payment Tranasfer Date3 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.CollegeTransDate4 == undefined) || ($scope.BasicExamInstanceSchedule.CollegeTransDate4 == "")) {
                alert("Please Select College Payment Tranasfer Date4 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.CollegeTransDate5 == undefined) || ($scope.BasicExamInstanceSchedule.CollegeTransDate5 == "")) {
                alert("Please  Select College Payment Tranasfer Date5 ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.CollegeTransDate6 == undefined) || ($scope.BasicExamInstanceSchedule.CollegeTransDate6 == "")) {
                alert("Please Select College Payment Tranasfer Date6 ");
                return false;
            }
            //if (($scope.BasicExamInstanceSchedule.CollegeTransDate7 == undefined) || ($scope.BasicExamInstanceSchedule.CollegeTransDate7 == "")) {
            //    alert("Please Select College Payment Tranasfer Date7 ");
            //    return false;
            //}
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Exam.BasicExamInstanceScheduleList');
        }
    });
});
