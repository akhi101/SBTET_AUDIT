(function () {
    'use strict';
    angular.module('app')
        .controller('AttendanceEntryController',
            function ($rootScope, $scope, $state, $filter, basicCourseService, basicExamService, examTimeTableService, AttendanceEntryService, basicZoneService, basicBranchService, basicDistrictsService, AppSettings) {

                $scope.AttendanceEntry = {};
                $scope.studentInfoList = [];
                $scope.postAttendanceEntry = {};
                $scope.postAttendanceEntry.studentInfoList = [];
                $scope.postAttendanceEntry.practicalEntryDetailColleges = {};
                $scope.updatedStudentInfoList = [];

                $scope.isCorrect = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                    //getExaminerDatabyCenter();
                    //getAllZoneCenterCollege();
                };
                $("#AttendanceDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });
                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse($scope.AttendanceEntry.CourseID).then(function (results) {
                        $scope.basicCourses = results;
                        $scope.AttendanceEntry.CourseID = $scope.basicCourses[0].CourseID;
                        $scope.SerDate = $scope.basicCourses[0].SerDate;
                        $("#AttendanceDate").ejDatePicker({ maxDate: $scope.SerDate, allowEdit: true, dateFormat: "dd/MMM/yyyy" });
                    });
                };
                var getAllBasicDistrict = function () {
                    basicDistrictsService.getBasicDistrictsList().then(function (results) {
                        $scope.basicDistricts = results;
                    });
                };
                $scope.$watch('AttendanceEntry.CourseID', function () {
                    if ($scope.AttendanceEntry.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.AttendanceEntry.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.AttendanceEntry.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                        AttendanceEntryService.getCheckCenterCollegePresent(AppSettings.CollegeID, AppSettings.ExamInstID, $scope.AttendanceEntry.CourseID).then(function (results) {
                            if (results == 0) {
                                alert("Center not generated.");
                                $state.go('PreExam');
                            } else {
                                $scope.AttendanceEntry.PrePractCntrID = "" + results[0].PrePractCntrID + "";
                                $scope.AttendanceEntry.ZoneID = results[0].ZoneID;
                            }
                        });
                    }
                });
                $scope.ExamDisable = true;

                $scope.$watch('AttendanceEntry.ExamID', function () {
                    //if ($scope.AttendanceEntry.BranchID !== undefined && $scope.AttendanceEntry.ExamID !== undefined) {
                    //    $scope.AttendanceEntry.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    //    AttendanceEntryService.getExamTimeTableSubjectListByExamIDBranchID($scope.AttendanceEntry.ExamID, $scope.AttendanceEntry.BranchID, $scope.AttendanceEntry.ExamInstID).then(function (results) {
                    //        $scope.examTimeTableSubjects = results;
                    //    });
                    //}
                    $scope.ackprintshow = false;
                    if ($scope.AttendanceEntry.ExamID !== undefined) {
                        if ($scope.AttendanceEntry.CourseID == 1) {
                            $scope.AttendanceEntry.ZoneType = 2;
                        } else {
                            $scope.AttendanceEntry.ZoneType = 3;
                        }
                        if ($("#AttendanceDate").val() != "") { $scope.AttendanceEntry.AttendanceDate = $("#AttendanceDate").val(); }
                        AttendanceEntryService.getExamTimeSchedulePresent($scope.AttendanceEntry.ExamID, AppSettings.ExamInstID, $scope.AttendanceEntry.PrePractCntrID, $scope.AttendanceEntry.AttendanceDate, $scope.AttendanceEntry.ZoneType).then(function (results) {
                            if (results.length == 0) {
                                alert("Attendance Entry Schedule not available");
                                $state.go('PreExam');
                            } else {
                                $scope.StartTime = results[0].StartTimeStr;
                                $scope.EndTime = results[0].EndTimeStr;

                                //if (results[0].BatchFlag == 'M') {
                                //    $scope.StartTime = results[0].MornigStartTime;
                                //    $scope.EndTime = results[0].MornigEndTime;
                                //}
                                //else {
                                //    $scope.StartTime = results[0].AfterNoonStartTime;
                                //    $scope.EndTime = results[0].AfterNoonEndTime;
                                //}
                            }
                        });
                    }
                });
                $scope.$watch('AttendanceEntry.ExmSubID', function () {
                    if ($scope.AttendanceEntry.ExmSubID !== undefined && $scope.AttendanceEntry.ExamID !== undefined) {
                        if ($scope.AttendanceEntry.CourseID == 1) {
                            $scope.AttendanceEntry.ZoneType = 2;
                        } else {
                            $scope.AttendanceEntry.ZoneType = 3;
                        }
                        AttendanceEntryService.getFillBatchData(AppSettings.ExamInstID, $scope.AttendanceEntry.ExamID, $scope.AttendanceEntry.PrePractCntrID, $scope.AttendanceEntry.ExmSubID).then(function (results) {
                            $scope.examBatches = results;
                        });
                        AttendanceEntryService.getExaminerDatabyCenter(AppSettings.CollegeID, AppSettings.ExamInstID, $scope.AttendanceEntry.ExamID, $scope.AttendanceEntry.ExmSubID, $scope.AttendanceEntry.ZoneType).then(function (results) {
                            $scope.examinerList = results;
                            $scope.AttendanceEntry.full_name = "" + $scope.examinerList[0].full_name + "";
                            $scope.AttendanceEntry.MobileNO = $scope.examinerList[0].mobile_no;
                            $scope.AttendanceEntry.ExaminerID = "" + $scope.examinerList[0].ExaminerID + "";
                            $scope.AttendanceEntry.CreateLoginID = AppSettings.LoggedUserId;
                        });
                    }
                });
                $scope.$watch('AttendanceEntry.BranchID', function () {
                    if ($scope.AttendanceEntry.BranchID !== undefined && $scope.AttendanceEntry.ExamID !== undefined) {
                        $scope.AttendanceEntry.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        AttendanceEntryService.getExamTimeTableSubjectListByExamIDBranchID($scope.AttendanceEntry.ExamID, $scope.AttendanceEntry.BranchID, $scope.AttendanceEntry.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                            if ($scope.AttendanceEntry.CourseID == 1) {
                                $scope.AttendanceEntry.BranchID = 2;
                            } else {
                                $scope.AttendanceEntry.BranchID = 3;
                            }
                        });
                    }
                });
                $scope.$watch('AttendanceEntry.PrBatchID', function () {
                    if ($scope.AttendanceEntry.PrBatchID != undefined && $scope.AttendanceEntry.PrBatchID != undefined) {
                        for (var i = 0; i < $scope.examBatches.length; i++) {
                            if ($scope.AttendanceEntry.PrBatchID == $scope.examBatches[i].PrBatchID) {
                                $scope.AttendanceEntry.BatchName = $scope.examBatches[i].BatchName;
                            }
                        }
                    }
                });
                $scope.$watch('AttendanceEntry.DistrictID', function () {
                    if ($scope.AttendanceEntry.DistrictID !== undefined) {
                        AttendanceEntryService.getPrePractCenterByDistrictId($scope.AttendanceEntry.DistrictID, AppSettings.ExamInstID).then(function (results) {
                            $scope.prePractCenters = results;
                        });
                    }
                });

                //    $scope.$watch('AttendanceEntry.ExmSubID', function () {

                //});
                $scope.OTPDisable = false;
                $scope.txtOTPDisable = true;
                $scope.SubmitDisable = false;
                $scope.addnewshow = false;
                $scope.SendOTP = function () {
                    if (($scope.AttendanceEntry.CourseID == undefined) || ($scope.AttendanceEntry.CourseID == "")) {
                        alert("Select Course");
                        return;
                    }
                    if (($scope.AttendanceEntry.ExamID == undefined) || ($scope.AttendanceEntry.ExamID == "")) {
                        alert("Select Exam");
                        return;
                    }
                    if (($scope.AttendanceEntry.BranchID == undefined) || ($scope.AttendanceEntry.BranchID == "")) {
                        alert("Select Branch");
                        return;
                    }
                    if (($scope.AttendanceEntry.BatchName == undefined) || ($scope.AttendanceEntry.BatchName == "")) {
                        alert("Select Batch No.");
                        return;
                    }
                    $scope.studentDetailList = [];
                    $scope.AttendanceEntry.CenterCollegeID = AppSettings.CollegeID;
                    $scope.AttendanceEntry.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    $scope.AttendanceEntry.CreateLoginID = AppSettings.LoggedUserId;
                    $scope.AttendanceEntry.DateOfMarkEntry = $scope.AttendanceEntry.AttendanceDate;
                    $scope.AttendanceEntry.EvalTypeID = 1;
                    if ($scope.AttendanceEntry.CourseID == 1) {
                        $scope.AttendanceEntry.ZoneType = 2;
                    } else {
                        $scope.AttendanceEntry.ZoneType = 3;
                    }
                    AttendanceEntryService.GetOTPMarkEntryPresentInOTPTable($scope.AttendanceEntry).then(function (resultsPre) {
                        if (resultsPre.length > 0) {
                            $scope.AttendanceEntry.OTPSended = resultsPre[0].OTP;
                            alert("OTP already Sent");
                            $scope.txtOTPDisable = false;
                            $scope.SubmitDisable = false;
                        } else {
                            AttendanceEntryService.GetGenerateOTP($scope.AttendanceEntry.MobileNO).then(function (results) {
                                $scope.AttendanceEntry.OTPSended = results;
                                alert("Sent OTP Successfully,Submit that OTP.");
                                $scope.txtOTPDisable = false;
                                $scope.SubmitDisable = false;
                            });
                            //AttendanceEntryService.PostInsertOTPMarkEntry($scope.AttendanceEntry).then(function (results) {
                            //    alert("Sent OTP Successfully,Submit that OTP.");
                            //    $scope.txtOTPDisable = false;
                            //    $scope.SubmitDisable = false;
                            //});
                        }
                    });
                }
                $scope.otoSuccess = false;
                $scope.showStudentDetails = function () {
                    if ($("#AttendanceDate").val() != "") { $scope.AttendanceEntry.AttendanceDate = $("#AttendanceDate").val(); }
                    if (($scope.AttendanceEntry.AttendanceDate == undefined) || ($scope.AttendanceEntry.AttendanceDate == "")) {
                        alert("Select Attendance Date");
                        return false;
                    }
                    $scope.SubmitDisable = true;
                    //if ($scope.AttendanceEntry.ExmSubID !== undefined && $scope.AttendanceEntry.BranchID !== undefined && $scope.AttendanceEntry.ExamID !== undefined && $scope.AttendanceEntry.PrePractCntrID && $scope.AttendanceEntry.CourseID) {
                    if ($scope.AttendanceEntry.ExamID !== undefined && $scope.AttendanceEntry.PrePractCntrID && $scope.AttendanceEntry.CourseID) {
                        $scope.studentDetailList = [];
                        $scope.loading = true;
                        $scope.AttendanceEntry.ExamInstID = AppSettings.ExamInstID;
                        $scope.AttendanceEntry.CenterCollegeID = AppSettings.CollegeID;
                        $scope.AttendanceEntry.CreateLoginID = AppSettings.LoggedUserId;
                        AttendanceEntryService.getStudentDetailsByExamSubject($scope.AttendanceEntry).then(function (results) {
                            $scope.SubmitDisable = false;
                            var final = 0;
                            var AttendanceDate = $("#AttendanceDate").val();
                            var otherdate = false;
                            if ($scope.SerDate != AttendanceDate) {
                                otherdate = true;
                            }
                            if (results.length > 0) {
                                for (var i = 0; i < results.length; i++) {
                                    results[i].DisableHTNO = true;
                                    results[i].DisableExmSubCode = true;
                                    results[i].HTNODisable = true;
                                    if (results[i].ChkListFlag == 'V') {
                                        results[i].DisableChecklistflag = true;
                                        final = final + 1;
                                    } else if (otherdate == true) {
                                        results[i].DisableChecklistflag = true;
                                    } else {
                                        results[i].DisableChecklistflag = false;
                                    }
                                   
                                }
                                $scope.savedisable = false;
                                $scope.addnewshow = true;
                                if (final == results.length) {
                                    alert("Already done final submit, you can't Edit")
                                    $scope.savedisable = true;
                                    $scope.DisableFinalSubmit = true;
                                    $scope.ackprintshow = true;
                                    $scope.addnewshow = false;
                                }
                                //if (otherdate == true) {
                                //    alert("This is another date attendance, you can't Edit")
                                //    $scope.savedisable = true;
                                //    $scope.DisableFinalSubmit = true;
                                //    $scope.ackprintshow = true;
                                //    $scope.addnewshow = false;
                                //}
                                $scope.studentDetailList = results;
                                $scope.SubmitDisable = false;
                                $scope.txtOTPDisable = true;
                                $scope.loading = false;
                            } else {
                                $scope.SubmitDisable = false;
                                $scope.studentDetailList = [];
                                alert("Record not found");
                                $scope.SubmitDisable = false;
                                $scope.txtOTPDisable = false;
                                $scope.loading = false;
                            }
                        });
                        //AttendanceEntryService.GetOTPMarkEntryByOTP($scope.AttendanceEntry.OTP, $scope.AttendanceEntry.ExamInstID,
                        //    $scope.AttendanceEntry.MobileNO, $scope.AttendanceEntry.ExamID,
                        //    $scope.AttendanceEntry.ExmSubID, $scope.AttendanceEntry.PrePractCntrID).then(function (resultsOTP) {
                        //        if (resultsOTP.length > 0) {
                        //            $scope.AttendanceEntry.BatchNo = $scope.AttendanceEntry.BatchName;
                        //        AttendanceEntryService.getStudentDetailsByExamSubject($scope.AttendanceEntry).then(function (results) {
                        //            if (results.length > 0) {
                        //                $scope.studentDetailList = results;
                        //            } else {
                        //                $scope.studentDetailList = [];
                        //                alert("Record not found");
                        //            }
                        //        });
                        //    } else {
                        //        $scope.studentDetailList = [];
                        //        alert("Wrong OTP Entered");
                        //    }
                        //});
                    }
                }
                $scope.postAttendanceEntrySave = function () {
                    if ($scope.practicalStudentDetailForm.$valid && $scope.studentDetailList.length > 0) {
                        for (var i = 0; i < $scope.studentDetailList.length; i++) {
                            $scope.isCorrect = true;
                            $scope.studentDetailList[i].CreateLoginID = AppSettings.LoggedUserId;
                            $scope.studentDetailList[i].CreLoginID = AppSettings.LoggedUserId;
                            $scope.studentDetailList[i].ExamInstID = AppSettings.ExamInstID;
                            $scope.studentDetailList[i].CenterCollegeID = AppSettings.CollegeID;
                            $scope.studentDetailList[i].AttendanceDate = $scope.AttendanceEntry.AttendanceDate;
                            if ($scope.studentDetailList[i].AddFlag == "Y") {
                                if (($scope.studentDetailList[i].OMRCode == "") || ($scope.studentDetailList[i].OMRCode == undefined)){
                                    alert("OMR Code Not Allowed Blank,For HTNO = " + $scope.studentDetailList[i].HTNO);
                                    $scope.isCorrect = false;
                                    break;
                                }
                            }
                        }
                        if ($scope.isCorrect) {
                            if ($scope.studentDetailList.length > 0) {
                                $scope.postAttendanceEntry = {};
                                $scope.postAttendanceEntry.studentInfoList = $scope.studentDetailList;
                                $scope.postAttendanceEntry.studentInfoList[0].ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                                $scope.postAttendanceEntry.studentInfoList[0].CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                                $scope.postAttendanceEntry.studentInfoList[0].UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID
                                $scope.postAttendanceEntry.studentInfoList[0].CreateLoginID = AppSettings.LoggedUserId;
                             
                                $scope.savedisable = true;
                                var isConfirmed = confirm("Do you want to Submit ?");
                                if (isConfirmed) {
                                    $scope.savedata();
                                } else {
                                }
                            } else {
                                $scope.AttendanceEntry = {};
                                $scope.updatedStudentInfoList = [];
                                $scope.studentDetailList = [];
                                $scope.postAttendanceEntry = {};
                                $scope.postAttendanceEntry.studentInfoList = [];
                                $scope.postAttendanceEntry.practicalEntryDetailColleges = {};
                            }
                        }
                    }
                };
                $scope.savedata = function () {
                    AttendanceEntryService.postAttendanceEntry($scope.postAttendanceEntry).then(function (results) {
                        if (results.IsSuccess) {
                            var isConfirmed = confirm("Submitted Successfully, Do you want to Final Submit ? After Final Submit you can not edit");
                            if (isConfirmed) {
                                $scope.postAttendanceEntrySaveFinalSubmit();
                            } else {
                                for (var i = 0; i < $scope.studentDetailList.length; i++) {
                                    $scope.studentDetailList[i].DisableChecklistflag = false;
                                }
                                $scope.savedisable = false;
                            }
                        } else {
                            $scope.AttendanceEntry = {};
                            $scope.studentDetailList = [];
                            $scope.updatedStudentInfoList = [];
                            $scope.postAttendanceEntry = {};
                            $scope.postAttendanceEntry.studentInfoList = [];
                            $scope.postAttendanceEntry.practicalEntryDetailColleges = {};
                            $scope.savedisable = false;
                            alert(results.Message);
                        }
                    }, function (error) {
                        $scope.AttendanceEntry = {};
                        $scope.updatedStudentInfoList = [];
                        $scope.studentDetailList = [];
                        $scope.postAttendanceEntry = {};
                        $scope.postAttendanceEntry.studentInfoList = [];
                        $scope.postAttendanceEntry.practicalEntryDetailColleges = {};
                        $scope.savedisable = false;
                        alert(error.statusText);
                    });
                }
                $scope.postAttendanceEntrySaveFinalSubmit = function () {
                    $scope.DisableFinalSubmit = true;
                    $scope.postAttendanceEntry = {};
                    $scope.postAttendanceEntry.studentInfoList = $scope.studentDetailList;
                    $scope.postAttendanceEntry.studentInfoList[0].ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    $scope.postAttendanceEntry.studentInfoList[0].CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                    $scope.postAttendanceEntry.studentInfoList[0].UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID
                    $scope.postAttendanceEntry.studentInfoList[0].CreateLoginID = AppSettings.LoggedUserId;
                    $scope.loading = true;
                    AttendanceEntryService.postAttendanceEntryFinalSubmit($scope.postAttendanceEntry).then(function (results) {
                        if (results.IsSuccess) {
                            //$scope.practicalEntryDetailCollege = {};
                            alert("Final Submit Successfully.");
                            $state.go('PreExam.AttendanceAcknowledegement', { PrePractCntrID: $scope.AttendanceEntry.PrePractCntrID, ExamID: $scope.AttendanceEntry.ExamID, AttendanceDate: $scope.AttendanceEntry.AttendanceDate });
                            $scope.DisableFinalSubmit = true;
                            $scope.savedisable = true;
                            $scope.loading = false;
                        } else {
                            //$scope.practicalEntryDetailCollege = {};
                            $scope.AttendanceEntry = {};
                            $scope.studentDetailList = [];
                            $scope.updatedStudentInfoList = [];
                            $scope.postAttendanceEntry = {};
                            $scope.postAttendanceEntry.studentInfoList = [];
                            $scope.postAttendanceEntry.practicalEntryDetailColleges = {};
                            alert(results.Message);
                            $scope.loading = false;
                        }
                    });
                };
                $scope.AddNewRow = function () {
                    if ($scope.studentDetailList == undefined) {
                        alert("No any data present")
                        return;
                    }
                    if ($scope.studentDetailList.length == 0) {
                        alert("No any data present")
                        return;
                    }
                    if ($scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO == "") {
                        alert("Last rows HTNo should not be blank");
                        return;
                    }
                    var final = 0;
                    for (var i = 0; i < $scope.studentDetailList.length; i++) {
                        if ($scope.studentDetailList[i].ChkListFlag == 'V') {
                            final = final + 1;
                        }
                    }
                    if (final == $scope.studentDetailList.length) {
                        alert("Already done final submit, you can't Edit")
                        return;
                    }

                    var obj = {};
                    obj.SrNo = $scope.studentDetailList.length + 1;
                    obj.HTNO = "";
                    obj.StatusFlag = "P";
                    //obj.ExmSubCode = $scope.studentDetailList[$scope.studentDetailList.length - 1].ExmSubCode;
                    //obj.ExamSubID = $scope.studentDetailList[$scope.studentDetailList.length - 1].ExamSubID;
                    //obj.ExmSubName = $scope.studentDetailList[$scope.studentDetailList.length - 1].ExmSubName;
                    obj.ExamID = $scope.AttendanceEntry.ExamID;
                    obj.PrCentreID = $scope.studentDetailList[$scope.studentDetailList.length - 1].PrCentreID;
                    obj.ExamInstID = AppSettings.ExamInstID;
                    obj.EvalTypID = $scope.studentDetailList[$scope.studentDetailList.length - 1].EvalTypID;
                    obj.BatchNo = $scope.studentDetailList[$scope.studentDetailList.length - 1].BatchNo;
                    obj.CenterCollegeID = AppSettings.CollegeID;
                    obj.HTNODisable = false;
                    $scope.studentDetailList.push(obj);
                    obj.AddFlag = "Y";
                }

                $scope.getsaved = function (studentDetail) {
                    //if (studentDetail.HTNO == "") {
                    //    studentDetail.StatusFlag = "P";
                    //    alert("HTNo Not Allowed Blank");
                    //    return;
                    //}
                    if (studentDetail.AddFlag == "Y") {
                        if ((studentDetail.OMRCode == "") || (studentDetail.OMRCode == undefined)) {
                            alert("OMR Code Not Allowed Blank,For HTNO = " + studentDetail.HTNO);
                            return;
                        }
                    }
                    var obj = {};
                    $scope.studentDetailListNew = [];
                    obj.HTNO = studentDetail.HTNO;
                    obj.RecordID = studentDetail.RecordID;
                    obj.StatusFlag = studentDetail.StatusFlag;
                    obj.ExmSubCode = studentDetail.ExmSubCode;
                    obj.ExmSubID = studentDetail.ExmSubID;
                    obj.ExmSubName = studentDetail.ExmSubName;
                    obj.ExamID = $scope.AttendanceEntry.ExamID;
                    obj.PrCentreID = studentDetail.PrCentreID;
                    obj.ExamInstID = AppSettings.ExamInstID;
                    obj.EvalTypID = studentDetail.EvalTypID;
                    obj.BatchNo = studentDetail.BatchNo;
                    obj.AddFlag = studentDetail.AddFlag;
                    obj.SubLevelFlag = studentDetail.SubLevelFlag;
                    obj.OMRCode = studentDetail.OMRCode;
                    obj.ExamInstID = AppSettings.ExamInstID;
                    obj.CenterCollegeID = AppSettings.CollegeID;
                    obj.CollegeID = studentDetail.CollegeID;
                    obj.AttendanceDate = $scope.AttendanceEntry.AttendanceDate;
                    $scope.studentDetailListNew.push(obj);
                    $scope.postAttendanceEntry = {};
                    $scope.postAttendanceEntry.studentInfoList = $scope.studentDetailListNew;
                    $scope.postAttendanceEntry.studentInfoList[0].ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    $scope.postAttendanceEntry.studentInfoList[0].CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                    $scope.postAttendanceEntry.studentInfoList[0].UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID
                    $scope.postAttendanceEntry.studentInfoList[0].CreateLoginID = AppSettings.LoggedUserId;

                    AttendanceEntryService.GetpostAttendanceEntrySingle($scope.postAttendanceEntry).then(function (results) {
                        studentDetail.RecordID = results;
                    }, function (error) {
                    });
                }
                $scope.postAttendanceEntryCancel = function () {
                    $state.go('PreExam');
                }
                $scope.printAcknowlegement = function () {
                    $scope.AttendanceEntry.AttendanceDate = $("#AttendanceDate").val();
                    $state.go('PreExam.AttendanceAcknowledegement', { PrePractCntrID: $scope.AttendanceEntry.PrePractCntrID, ExamID: $scope.AttendanceEntry.ExamID, AttendanceDate: $scope.AttendanceEntry.AttendanceDate });
                }
                $scope.ackprintshow = false;
                $scope.getExmSubIDName = function (studentDetail) {
                    AttendanceEntryService.GetExmSubIDNameFromCode($scope.AttendanceEntry.ExamID, AppSettings.ExamInstID, studentDetail.ExmSubCode, studentDetail.HTNO, $scope.AttendanceEntry.AttendanceDate).then(function (resultspre) {
                        if (resultspre.length == 0) {
                            alert("Wrong Subject Code");
                            studentDetail.ExmSubCode = "";
                            return;
                        } else {
                            studentDetail.ExmSubID = resultspre[0].ExmSubID;
                            studentDetail.ExmSubName = resultspre[0].ExmSubName;
                        }
                    }, function (error) {
                        alert(error.statusText);
                    });
                }

                $scope.DeleteRow = function (index) {
                    var isConfirmed = confirm("Are you sure to delete this record ?");
                    if (isConfirmed) {
                        $scope.studentDetailList.splice(index, 1);
                        //$scope.gettotalMarks();
                    }
                }

                $scope.CheckHTNOValidation = function (HTNO) {
                    if (HTNO != "") {
                        for (var i = 0; i < $scope.studentDetailList.length; i++) {
                            if ($scope.studentDetailList[i].AddFlag == "N") {
                                if ($scope.studentDetailList[i].HTNO == HTNO) {
                                    alert("HTNO is already present in above list, You Can not add this.");
                                    $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                    return;
                                }
                            } else {
                                if ($scope.studentDetailList.length - 1 != i) {
                                    if ($scope.studentDetailList[i].HTNO == HTNO) {
                                        alert("HTNO is already present in above list, You Can not add this.");
                                        $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                        return;
                                    }
                                }
                            }
                        }
                        AttendanceEntryService.GetHTNoPresentInExamForms(HTNO, $scope.AttendanceEntry.ExamID, AppSettings.ExamInstID, $scope.AttendanceEntry.PrePractCntrID, 0).then(function (resultspre) {
                            if (resultspre.length == 0) {
                                alert("HTNo is not found in exam , You Can not add this.");
                                HTNO = "";
                                $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                return;
                            } else {
                                $scope.studentDetailList[$scope.studentDetailList.length - 1].MediumName = resultspre[0].MediumName;
                                $scope.studentDetailList[$scope.studentDetailList.length - 1].MainGrpName = resultspre[0].MainGrpName;
                            }
                        }, function (error) {
                            alert(error.statusText);
                        });
                        //AttendanceEntryService.GetHTNoPresentInPreStudentMarks(HTNO, $scope.AttendanceEntry.ExamID, AppSettings.ExamInstID, $scope.AttendanceEntry.PrePractCntrID, 0).then(function (results) {
                        //    if (results.length > 0) {
                        //        if (results[0].StatusFlag == "A") {
                        //            var isConfirmed = confirm("HTNo : " + results[0].HTNoBarCode + " is already Absent in preivous exam, You wan't allowed ?");
                        //            if (isConfirmed) {
                        //            } else {
                        //                $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                        //                return;
                        //            }
                        //        }
                        //        else if (results[0].StatusFlag == "M") {
                        //            alert("This student is in Mal practice,So you Can't allowed");
                        //            $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                        //            $scope.studentDetailList[$scope.studentDetailList.length - 1].StudName = "";
                        //            return;
                        //        }
                        //        else if (results[0].StatusFlag == "AM") {
                        //            alert("This student is in Already Mal practice,So you Can't allowed");
                        //            $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                        //            $scope.studentDetailList[$scope.studentDetailList.length - 1].StudName = "";
                        //            return;
                        //        }
                        //        else if (results[0].StatusFlag == "N") {
                        //            alert("This student is in Not Offered,So you Can't allowed");
                        //            $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                        //            $scope.studentDetailList[$scope.studentDetailList.length - 1].StudName = "";
                        //            return;
                        //        }
                        //        else if (results[0].StatusFlag == "P") {
                        //            alert("HTNo : " + results[0].HTNoBarCode + " is already Present in preivous exam , You Can not add this.");
                        //            $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                        //            return;
                        //        }
                        //    } else {
                                
                        //    }
                        //}, function (error) {
                        //    alert(error.statusText);
                        //});
                    }
                }
            });
}());