(function () {
    'use strict';
    angular.module('app')
        .controller('AttendanceEntryOtherController',
            function ($rootScope, $scope, $state, basicCourseService, basicExamService, examTimeTableService, AttendanceEntryService, basicZoneService, basicBranchService, basicDistrictsService, AppSettings) {

                $scope.AttendanceEntryOther = {};
                $scope.studentInfoList = [];
                $scope.postPracticalEntry = {};
                $scope.postPracticalEntry.studentInfoList = [];
                $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                $scope.updatedStudentInfoList = [];

                $scope.isCorrect = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                    //getExaminerDatabyCenter();
                    //getAllZoneCenterCollege();
                };
                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse($scope.AttendanceEntryOther.CourseID).then(function (results) {
                        $scope.basicCourses = results;
                        $scope.AttendanceEntryOther.CourseID = $scope.basicCourses[0].CourseID;
                    });
                };
                var getAllBasicDistrict = function () {
                    basicDistrictsService.getBasicDistrictsList().then(function (results) {
                        $scope.basicDistricts = results;
                    });
                };
                $scope.$watch('AttendanceEntryOther.CourseID', function () {
                    if ($scope.AttendanceEntryOther.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.AttendanceEntryOther.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.AttendanceEntryOther.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                        AttendanceEntryService.getCheckCenterCollegePresent(AppSettings.CollegeID, AppSettings.ExamInstID, $scope.AttendanceEntryOther.CourseID).then(function (results) {
                            if (results == 0) {
                                alert("Center not generated.");
                                $state.go('PreExam');
                            } else {
                                $scope.AttendanceEntryOther.PrePractCntrID = "" + results[0].PrePractCntrID + "";
                                $scope.AttendanceEntryOther.ZoneID = results[0].ZoneID;
                            }
                        });
                    }
                });
                $scope.ExamDisable = true;
                $scope.$watch('AttendanceEntryOther.ExamID', function () {
                    //if ($scope.AttendanceEntryOther.BranchID !== undefined && $scope.AttendanceEntryOther.ExamID !== undefined) {
                    //    $scope.AttendanceEntryOther.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    //    AttendanceEntryService.getExamTimeTableSubjectListByExamIDBranchID($scope.AttendanceEntryOther.ExamID, $scope.AttendanceEntryOther.BranchID, $scope.AttendanceEntryOther.ExamInstID).then(function (results) {
                    //        $scope.examTimeTableSubjects = results;
                    //    });
                    //}
                    if ($scope.AttendanceEntryOther.ExamID !== undefined) {
                        if ($scope.AttendanceEntryOther.CourseID == 1) {
                            $scope.AttendanceEntryOther.ZoneType = 2;
                        } else {
                            $scope.AttendanceEntryOther.ZoneType = 3;
                        }
                        AttendanceEntryService.getExamTimeSchedulePresent($scope.AttendanceEntryOther.ExamID, AppSettings.ExamInstID, $scope.AttendanceEntryOther.PrePractCntrID, $scope.AttendanceEntryOther.ZoneType).then(function (results) {
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
                $scope.$watch('AttendanceEntryOther.ExmSubID', function () {
                    if ($scope.AttendanceEntryOther.ExmSubID !== undefined && $scope.AttendanceEntryOther.ExamID !== undefined) {
                        if ($scope.AttendanceEntryOther.CourseID == 1) {
                            $scope.AttendanceEntryOther.ZoneType = 2;
                        } else {
                            $scope.AttendanceEntryOther.ZoneType = 3;
                        }
                        AttendanceEntryService.getFillBatchData(AppSettings.ExamInstID, $scope.AttendanceEntryOther.ExamID, $scope.AttendanceEntryOther.PrePractCntrID, $scope.AttendanceEntryOther.ExmSubID).then(function (results) {
                            $scope.examBatches = results;
                        });
                        AttendanceEntryService.getExaminerDatabyCenter(AppSettings.CollegeID, AppSettings.ExamInstID, $scope.AttendanceEntryOther.ExamID, $scope.AttendanceEntryOther.ExmSubID, $scope.AttendanceEntryOther.ZoneType).then(function (results) {
                            $scope.examinerList = results;
                            $scope.AttendanceEntryOther.full_name = "" + $scope.examinerList[0].full_name + "";
                            $scope.AttendanceEntryOther.MobileNO = $scope.examinerList[0].mobile_no;
                            $scope.AttendanceEntryOther.ExaminerID = "" + $scope.examinerList[0].ExaminerID + "";
                            $scope.AttendanceEntryOther.CreateLoginID = AppSettings.LoggedUserId;
                            $scope.AttendanceEntryOther.Prdate = new Date();
                        });
                    }
                });
                $scope.$watch('AttendanceEntryOther.BranchID', function () {
                    if ($scope.AttendanceEntryOther.BranchID !== undefined && $scope.AttendanceEntryOther.ExamID !== undefined) {
                        $scope.AttendanceEntryOther.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        AttendanceEntryService.getExamTimeTableSubjectListByExamIDBranchID($scope.AttendanceEntryOther.ExamID, $scope.AttendanceEntryOther.BranchID, $scope.AttendanceEntryOther.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                            if ($scope.AttendanceEntryOther.CourseID == 1) {
                                $scope.AttendanceEntryOther.BranchID = 2;
                            } else {
                                $scope.AttendanceEntryOther.BranchID = 3;
                            }
                        });
                    }
                });
                $scope.$watch('AttendanceEntryOther.PrBatchID', function () {
                    if ($scope.AttendanceEntryOther.PrBatchID != undefined && $scope.AttendanceEntryOther.PrBatchID != undefined) {
                        for (var i = 0; i < $scope.examBatches.length; i++) {
                            if ($scope.AttendanceEntryOther.PrBatchID == $scope.examBatches[i].PrBatchID) {
                                $scope.AttendanceEntryOther.BatchName = $scope.examBatches[i].BatchName;
                            }
                        }
                    }
                });
                $scope.$watch('AttendanceEntryOther.DistrictID', function () {
                    if ($scope.AttendanceEntryOther.DistrictID !== undefined) {
                        AttendanceEntryService.getPrePractCenterByDistrictId($scope.AttendanceEntryOther.DistrictID, AppSettings.ExamInstID).then(function (results) {
                            $scope.prePractCenters = results;
                        });
                    }
                });

                //    $scope.$watch('AttendanceEntryOther.ExmSubID', function () {

                //});
                $scope.OTPDisable = false;
                $scope.txtOTPDisable = true;
                $scope.SubmitDisable = false;
                $scope.SendOTP = function () {
                    if (($scope.AttendanceEntryOther.CourseID == undefined) || ($scope.AttendanceEntryOther.CourseID == "")) {
                        alert("Select Course");
                        return;
                    }
                    if (($scope.AttendanceEntryOther.ExamID == undefined) || ($scope.AttendanceEntryOther.ExamID == "")) {
                        alert("Select Exam");
                        return;
                    }
                    if (($scope.AttendanceEntryOther.BranchID == undefined) || ($scope.AttendanceEntryOther.BranchID == "")) {
                        alert("Select Branch");
                        return;
                    }
                    if (($scope.AttendanceEntryOther.BatchName == undefined) || ($scope.AttendanceEntryOther.BatchName == "")) {
                        alert("Select Batch No.");
                        return;
                    }
                    $scope.studentDetailList = [];
                    $scope.AttendanceEntryOther.CenterCollegeID = AppSettings.CollegeID;
                    $scope.AttendanceEntryOther.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    $scope.AttendanceEntryOther.CreateLoginID = AppSettings.LoggedUserId;
                    $scope.AttendanceEntryOther.DateOfMarkEntry = $scope.AttendanceEntryOther.Prdate;
                    $scope.AttendanceEntryOther.EvalTypeID = 2;
                    if ($scope.AttendanceEntryOther.CourseID == 1) {
                        $scope.AttendanceEntryOther.ZoneType = 2;
                    } else {
                        $scope.AttendanceEntryOther.ZoneType = 3;
                    }
                    AttendanceEntryService.GetOTPMarkEntryPresentInOTPTable($scope.AttendanceEntryOther).then(function (resultsPre) {
                        if (resultsPre.length > 0) {
                            $scope.AttendanceEntryOther.OTPSended = resultsPre[0].OTP;
                            alert("OTP already Sent");
                            $scope.txtOTPDisable = false;
                            $scope.SubmitDisable = false;
                        } else {
                            AttendanceEntryService.GetGenerateOTP($scope.AttendanceEntryOther.MobileNO).then(function (results) {
                                $scope.AttendanceEntryOther.OTPSended = results;
                                alert("Sent OTP Successfully,Submit that OTP.");
                                $scope.txtOTPDisable = false;
                                $scope.SubmitDisable = false;
                            });
                            //AttendanceEntryService.PostInsertOTPMarkEntry($scope.AttendanceEntryOther).then(function (results) {
                            //    alert("Sent OTP Successfully,Submit that OTP.");
                            //    $scope.txtOTPDisable = false;
                            //    $scope.SubmitDisable = false;
                            //});
                        }
                    });
                }
                $scope.otoSuccess = false;
                $scope.showStudentDetails = function () {
                    //if ($scope.AttendanceEntryOther.ExmSubID !== undefined && $scope.AttendanceEntryOther.BranchID !== undefined && $scope.AttendanceEntryOther.ExamID !== undefined && $scope.AttendanceEntryOther.PrePractCntrID && $scope.AttendanceEntryOther.CourseID) {
                    if ($scope.AttendanceEntryOther.ExamID !== undefined && $scope.AttendanceEntryOther.PrePractCntrID && $scope.AttendanceEntryOther.CourseID) {
                        $scope.studentDetailList = [];
                        $scope.AttendanceEntryOther.ExamInstID = AppSettings.ExamInstID;
                        $scope.AttendanceEntryOther.CenterCollegeID = AppSettings.CollegeID;
                        $scope.AttendanceEntryOther.CreateLoginID = AppSettings.LoggedUserId;
                        AttendanceEntryService.getStudentDetailsByExamSubject($scope.AttendanceEntryOther).then(function (results) {
                            if (results.length > 0) {
                                for (var i = 0; i < results.length; i++) {
                                    results[i].DisableHTNO = true;
                                    results[i].DisableExmSubCode = true;
                                }
                                $scope.studentDetailList = results;
                                $scope.SubmitDisable = false;
                                $scope.txtOTPDisable = true;
                            } else {
                                $scope.studentDetailList = [];
                                alert("Record not found");
                                $scope.SubmitDisable = false;
                                $scope.txtOTPDisable = false;
                            }
                        });
                        //AttendanceEntryService.GetOTPMarkEntryByOTP($scope.AttendanceEntryOther.OTP, $scope.AttendanceEntryOther.ExamInstID,
                        //    $scope.AttendanceEntryOther.MobileNO, $scope.AttendanceEntryOther.ExamID,
                        //    $scope.AttendanceEntryOther.ExmSubID, $scope.AttendanceEntryOther.PrePractCntrID).then(function (resultsOTP) {
                        //        if (resultsOTP.length > 0) {
                        //            $scope.AttendanceEntryOther.BatchNo = $scope.AttendanceEntryOther.BatchName;
                        //        AttendanceEntryService.getStudentDetailsByExamSubject($scope.AttendanceEntryOther).then(function (results) {
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
                $scope.postAttendanceEntry = function () {
                    if ($scope.practicalStudentDetailForm.$valid && $scope.studentDetailList.length > 0) {
                        for (var i = 0; i < $scope.studentDetailList.length; i++) {
                            $scope.isCorrect = true;
                            $scope.studentDetailList[i].CreateLoginID = AppSettings.LoggedUserId;
                            $scope.studentDetailList[i].CreLoginID = AppSettings.LoggedUserId;
                            //if (($scope.studentDetailList[i].StatusFlag == "A" || $scope.studentDetailList[i].StatusFlag == "M" || $scope.studentDetailList[i].StatusFlag == "N") && $scope.studentDetailList[i].Marks > 0) {
                            //    var statusName = $scope.studentDetailList[i].StatusFlag == "A" ? "Absent" : $scope.studentDetailList[i].StatusFlag == "M" ? "Malpractice" : $scope.studentDetailList[i].StatusFlag == "N" ? "Not Offered" : "";
                            //    alert("You have entered the marks against HTNo " + $scope.studentDetailList[i].HTNO + ", but you have selected " + statusName + ", please conform.");
                            //    $scope.isCorrect = false;
                            //    break;
                            //}
                            if ($scope.studentDetailList[i].HTNO == "") {
                                alert("HTNo Not Allowed Blank for " + $scope.studentDetailList[i].SrNo + " ");
                                $scope.isCorrect = false;
                                break;
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

                                AttendanceEntryService.postAttendanceEntry($scope.postAttendanceEntry).then(function (results) {
                                    if (results.IsSuccess) {
                                        $scope.AttendanceEntryOther = {};
                                        $scope.studentDetailList = [];
                                        $scope.updatedStudentInfoList = [];
                                        $scope.postPracticalEntry = {};
                                        $scope.postPracticalEntry.studentInfoList = [];
                                        $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                                        alert(results.Message);
                                    } else {
                                        $scope.AttendanceEntryOther = {};
                                        $scope.studentDetailList = [];
                                        $scope.updatedStudentInfoList = [];
                                        $scope.postPracticalEntry = {};
                                        $scope.postPracticalEntry.studentInfoList = [];
                                        $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                                        alert(results.Message);
                                    }
                                }, function (error) {
                                    $scope.AttendanceEntryOther = {};
                                    $scope.updatedStudentInfoList = [];
                                    $scope.studentDetailList = [];
                                    $scope.postPracticalEntry = {};
                                    $scope.postPracticalEntry.studentInfoList = [];
                                    $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                                    alert(error.statusText);
                                });
                            } else {
                                $scope.AttendanceEntryOther = {};
                                $scope.updatedStudentInfoList = [];
                                $scope.studentDetailList = [];
                                $scope.postPracticalEntry = {};
                                $scope.postPracticalEntry.studentInfoList = [];
                                $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                            }
                        }
                    }
                };
                $scope.AddNewRow = function () {
                    var obj = {};
                    obj.SrNo = $scope.studentDetailList.length + 1;
                    obj.HTNO = "";
                    obj.StatusFlag = "P";
                    obj.ExmSubCode = $scope.studentDetailList[$scope.studentDetailList.length - 1].ExmSubCode;
                    obj.ExamSubID = $scope.studentDetailList[$scope.studentDetailList.length - 1].ExamSubID;
                    obj.ExmSubName = $scope.studentDetailList[$scope.studentDetailList.length - 1].ExmSubName;
                    obj.ExamID = $scope.AttendanceEntryOther.ExamID;
                    obj.PrCentreID = $scope.studentDetailList[$scope.studentDetailList.length - 1].PrCentreID;
                    obj.ExamInstID = AppSettings.ExamInstID;
                    obj.EvalTypID = $scope.studentDetailList[$scope.studentDetailList.length - 1].EvalTypID;
                    obj.BatchNo = $scope.studentDetailList[$scope.studentDetailList.length - 1].BatchNo;
                    $scope.studentDetailList.push(obj);
                    obj.AddFlag = "Y";
                }

                $scope.getsaved = function (studentDetail) {
                    var obj = {};
                    $scope.studentDetailListNew = [];
                    obj.HTNO = studentDetail.HTNO;
                    obj.RecordID = studentDetail.RecordID;
                    obj.StatusFlag = studentDetail.StatusFlag;
                    obj.ExmSubCode = studentDetail.ExmSubCode;
                    obj.ExmSubID = studentDetail.ExmSubID;
                    obj.ExmSubName = studentDetail.ExmSubName;
                    obj.ExamID = $scope.AttendanceEntryOther.ExamID;
                    obj.PrCentreID = studentDetail.PrCentreID;
                    obj.ExamInstID = AppSettings.ExamInstID;
                    obj.EvalTypID = studentDetail.EvalTypID;
                    obj.BatchNo = studentDetail.BatchNo;
                    obj.AddFlag = studentDetail.AddFlag;
                    obj.SubLevelFlag = studentDetail.SubLevelFlag;
                    obj.OMRCode = studentDetail.OMRCode;
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
                $scope.CheckHTNOValidation = function (HTNO) {
                    //if (HTNO != "") {
                    //    AttendanceEntryService.GetHTNoPresentInPreStudentMarks(HTNO, $scope.AttendanceEntryOther.ExamID, AppSettings.ExamInstID, AppSettings.CollegeID, $scope.AttendanceEntryOther.ExmSubID).then(function (results) {
                    //        if (results.length > 0) {
                    //            if (results[0].StatusFlag == "A") {
                    //                var isConfirmed = confirm("HTNo : " + results[0].HTNoBarCode + " is already Absent in preivous exam, You wan't allowed ?");
                    //                if (isConfirmed) {
                    //                } else {
                    //                    $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                    //                    return;
                    //                }
                    //            } else if (results[0].StatusFlag == "P") {
                    //                alert("HTNo : " + results[0].HTNoBarCode + " is already Present in preivous exam , You Can not add this.");
                    //                $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                    //                return;
                    //            }
                    //        } else {
                    //            AttendanceEntryService.GetHTNoPresentInExamFormsTheory(HTNO, $scope.AttendanceEntryOther.ExamID, AppSettings.ExamInstID, AppSettings.CollegeID, $scope.AttendanceEntryOther.ExmSubID).then(function (resultspre) {
                    //                if (resultspre.length > 0) {
                    //                    if (resultspre[0].BatchNo != "") {
                    //                        alert("HTNo is already Present in next exam , You Can not add this.");
                    //                        HTNO = "";
                    //                        $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                    //                        return;
                    //                    }
                    //                }
                    //            }, function (error) {
                    //                alert(error.statusText);
                    //            });
                    //        }
                    //    }, function (error) {
                    //        alert(error.statusText);
                    //    });
                    //}
                }
            });
}());