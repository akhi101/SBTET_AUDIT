define(['app'], function (app) {
    app.controller("BasicExamInstanceScheduleController", function ($scope, $state, $stateParams, AppSettings, BasicExamInstanceScheduleService, BasicCourseService, BasicExamService, BasicBranchService) {
        $scope.BasicExamInstanceSchedule = { ExmInstSchID: $stateParams.ExmInstSchID };
        var PageNm = $state.current.name.split(".")[1] + "List";
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
        var ExamInstList = BasicExamInstanceScheduleService.GetExamInstanceYearList();
        ExamInstList.then(function (ExamInstdata, status, headers, config, error) {
            $scope.ExamInstList = ExamInstdata;
        }, function (ExamInstdata, status, headers, config) {
            alert(error);
        });
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (BasicCourseData, status, headers, config, error) {
            $scope.BasicCourseList = BasicCourseData;
        }, function (BasicCourseData, status, headers, config) {
            alert(error);
        });

        $scope.GetExamAndBranch = function (CourseID) {
            //$scope.DisbaleSubGroup = false;
            FillExam(CourseID);
            FillBranch(CourseID);
        }
        function FillExam(CourseID) {
            var ExamList = BasicExamService.GetExamListByCourseID(CourseID);
            ExamList.then(function (Examdata, status, headers, config, error) {
                $scope.ExamList = Examdata;
            }, function (Examdata, status, headers, config) {
                alert(error);
            });
        }
        function FillBranch(CourseID) {
            var BranchList = BasicBranchService.GetBasicBranchListByCourseID(CourseID);
            BranchList.then(function (Branchdata, status, headers, config, error) {
                $scope.BranchList = Branchdata;
            }, function (Branchdata, status, headers, config) {
                alert(error);
            });
        }

        $("#StartDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#EndDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#LateFeeDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#SuperLateFeeDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#SuperSuperLateFeeDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });

        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (BasicCourseData, status, headers, config, error) {
            $scope.BasicCourseList = BasicCourseData;
            var ExamList = BasicExamService.GetExamListByCourseID(0);
            ExamList.then(function (Examdata, status, headers, config, error) {
                $scope.ExamList = Examdata;
                var BranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                BranchList.then(function (Branchdata, status, headers, config, error) {
                    $scope.BranchList = Branchdata;
                    if ($scope.BasicExamInstanceSchedule.ExmInstSchID > 0) {

                        var BasicExamInstanceScheduledata = BasicExamInstanceScheduleService.GetBasicExamInstanceScheduleListByID($scope.BasicExamInstanceSchedule.ExmInstSchID);
                        BasicExamInstanceScheduledata.then(function (data) {
                            $scope.BasicExamInstanceSchedule = data[0];
                            $("#StartDate").val(data[0].StartDate);
                            $("#EndDate").val(data[0].EndDate);
                            $("#LateFeeDate").val(data[0].LateFeeDate);
                            $("#SuperLateFeeDate").val(data[0].SuperLateFeeDate);
                            $("#SuperSuperLateFeeDate").val(data[0].SuperLateFeeDate);
                            $("#SuperSuperLateFeeDate").val(data[0].SuperLateFeeDate);
                            $("#StartDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
                            //$("#ExamID").val(data[0].ExamID);

                            if ($scope.BasicExamInstanceSchedule.PostingOfMarksFlag == 'Y') { $scope.BasicExamInstanceSchedule.PostingOfMarksFlag = true } else { $scope.BasicExamInstanceSchedule.PostingOfMarksFlag = false }
                            if ($scope.BasicExamInstanceSchedule.MarksSheetArchieveFlag == 'Y') { $scope.BasicExamInstanceSchedule.MarksSheetArchieveFlag = true } else { $scope.BasicExamInstanceSchedule.MarksSheetArchieveFlag = false }
                            if ($scope.BasicExamInstanceSchedule.ExamCenterAllocationFlag == 'Y') { $scope.BasicExamInstanceSchedule.ExamCenterAllocationFlag = true } else { $scope.BasicExamInstanceSchedule.ExamCenterAllocationFlag = false }
                            if ($scope.BasicExamInstanceSchedule.ResultPocessingFlag == 'Y') { $scope.BasicExamInstanceSchedule.ResultPocessingFlag = true } else { $scope.BasicExamInstanceSchedule.ResultPocessingFlag = false }
                            if ($scope.BasicExamInstanceSchedule.ApproveFlag == 'Y') { $scope.BasicExamInstanceSchedule.ApproveFlag = true } else { $scope.BasicExamInstanceSchedule.ApproveFlag = false }
                            if ($scope.BasicExamInstanceSchedule.SeatNoGenerationFlag == 'Y') { $scope.BasicExamInstanceSchedule.SeatNoGenerationFlag = true } else { $scope.BasicExamInstanceSchedule.SeatNoGenerationFlag = false }
                            if ($scope.BasicExamInstanceSchedule.LedgerArchieveFlag == 'Y') { $scope.BasicExamInstanceSchedule.LedgerArchieveFlag = true } else { $scope.BasicExamInstanceSchedule.LedgerArchieveFlag = false }

                        }, function (error) {
                            alert(error);
                        });
                    }
                }, function (Branchdata, status, headers, config) {
                    alert(error);
                });
            }, function (Examdata, status, headers, config) {
                alert(error);
            });
        }, function (Branchdata, status, headers, config) {
            alert(error);
        });
        $scope.SaveBasicExamInstanceSchedule = function () {
            $scope.isupdatableDisable = true;
            if ($("#StartDate").val() != "") { $scope.BasicExamInstanceSchedule.StartDate = $("#StartDate").val(); }
            if ($("#EndDate").val() != "") { $scope.BasicExamInstanceSchedule.EndDate = $("#EndDate").val(); }
            if ($("#LateFeeDate").val() != "") { $scope.BasicExamInstanceSchedule.LateFeeDate = $("#LateFeeDate").val(); }
            if ($("#SuperLateFeeDate").val() != "") { $scope.BasicExamInstanceSchedule.SuperLateFeeDate = $("#SuperLateFeeDate").val(); }
            if ($("#SuperSuperLateFeeDate").val() != "") { $scope.BasicExamInstanceSchedule.SuperSuperLateFeeDate = $("#SuperSuperLateFeeDate").val(); }

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
                    var getPromise = BasicExamInstanceScheduleService.AddBasicExamInstanceSchedule($scope.BasicExamInstanceSchedule);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
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
            if (($scope.BasicExamInstanceSchedule.ExamID == undefined) || ($scope.BasicExamInstanceSchedule.ExamID == 0)) {
                alert("Select Exam ");
                return false;
            }
            if (($scope.BasicExamInstanceSchedule.BranchID == undefined) || ($scope.BasicExamInstanceSchedule.BranchID == 0)) {
                alert("Select Branch");
                return false;
            }
            //if (($scope.BasicExamInstanceSchedule.ExamFormEntryCount == undefined) || ($scope.BasicExamInstanceSchedule.ExamFormEntryCount == 0)) {
            //    alert("Enter Exam Form Entry Count");
            //    return false;
            //}
            //if (($scope.BasicExamInstanceSchedule.ExamFormPostingCount == undefined) || ($scope.BasicExamInstanceSchedule.ExamFormPostingCount == "")) {
            //    alert("Enter Exam Form Posting Count");
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
            $state.go('Masters.BasicExamInstanceScheduleList');
        }
    });
});
