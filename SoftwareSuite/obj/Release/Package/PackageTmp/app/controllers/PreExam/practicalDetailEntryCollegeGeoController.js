(function () {
    'use strict';
    angular.module('app')
        .controller('practicalDetailEntryCollegeGeoController',
            function ($rootScope, $scope, $state, basicCourseService, basicExamService, examTimeTableService, practicalEntryService, basicZoneService, basicBranchService, basicDistrictsService, AppSettings) {

                $scope.practicalEntryDetailCollege = {};
                $scope.studentInfoList = [];
                $scope.postPracticalEntry = {};
                $scope.postPracticalEntry.studentInfoList = [];
                $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                $scope.updatedStudentInfoList = [];

                $scope.isCorrect = false;
                var ProcRegex = /^[0-9\aAmMnN]+$/;
                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                    //getExaminerDatabyCenter();
                    //getAllZoneCenterCollege();
                };

                $scope.SerDate = "";
                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse($scope.practicalEntryDetailCollege.CourseID).then(function (results) {
                        $scope.basicCourses = results;
                        $scope.practicalEntryDetailCollege.CourseID = $scope.basicCourses[0].CourseID;
                        $scope.SerDate = $scope.basicCourses[0].SerDate;
                        $("#Prdate").ejDatePicker({ maxDate: $scope.SerDate, allowEdit: true, dateFormat: "dd/MMM/yyyy" });
                        $("#Prdate").val($scope.SerDate);
                    });
                };
                var getAllBasicDistrict = function () {
                    basicDistrictsService.getBasicDistrictsList().then(function (results) {
                        $scope.basicDistricts = results;
                    });
                };
                //var getAllZoneCenterCollege = function () {
                //    basicZoneService.getZoneCenterList().then(function (results) {
                //        $scope.zoneCenterColleges = results;
                //    });
                //};
                $scope.$watch('practicalEntryDetailCollege.MainGrpID', function () {
                    if ($scope.practicalEntryDetailCollege.MainGrpID !== undefined) {
                        if ($scope.practicalEntryDetailCollege.BranchID !== undefined && $scope.practicalEntryDetailCollege.ExamID !== undefined) {
                            $scope.practicalEntryDetailCollege.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                            practicalEntryService.getExamTimeTableSubjectListByExamIDBranchIDForGeo($scope.practicalEntryDetailCollege.ExamID, $scope.practicalEntryDetailCollege.BranchID, $scope.practicalEntryDetailCollege.ExamInstID, $scope.practicalEntryDetailCollege.MainGrpID).then(function (results) {
                                $scope.examTimeTableSubjects = results;
                            });
                        }
                    }
                });
                $scope.$watch('practicalEntryDetailCollege.CourseID', function () {
                    if ($scope.practicalEntryDetailCollege.CourseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.practicalEntryDetailCollege.CourseID).then(function (results) {
                            $scope.basicBranches = results;
                        });

                        basicExamService.getBasicExamListByCourseID($scope.practicalEntryDetailCollege.CourseID).then(function (results) {
                            $scope.basicExams = results;
                            $scope.practicalEntryDetailCollege.ExamID = $scope.basicExams[1].ExamID;
                            $scope.practicalEntryDetailCollege.ExamInstID = AppSettings.ExamInstID;
                            if ($scope.practicalEntryDetailCollege.CourseID !== undefined) {
                                if ($scope.practicalEntryDetailCollege.CourseID == 2) {
                                    $scope.practicalEntryDetailCollege.BranchID = 3;
                                    $scope.ExamDisable = true;
                                } else {
                                    $scope.practicalEntryDetailCollege.BranchID = 1;
                                    $scope.ExamDisable = false;
                                }
                            }
                        });
                        practicalEntryService.getCheckCenterCollegePresentForGeo(AppSettings.CollegeID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.CourseID).then(function (results) {
                            if (results == 0) {
                                alert("Center not generated.");
                                $state.go('PreExam');
                            } else {
                                $scope.practicalEntryDetailCollege.PrePractCntrID = "" + results[0].PrePractCntrID + "";
                                $scope.practicalEntryDetailCollege.ZoneID = results[0].ZoneID;

                            }
                        });
                    }
                });
                $scope.ExamDisable = true;
                $scope.$watch('practicalEntryDetailCollege.ExamID', function () {
                    if ($scope.practicalEntryDetailCollege.ExamID !== undefined) {
                      
                    }
                    if ($scope.practicalEntryDetailCollege.CourseID == 1) {
                        $scope.practicalEntryDetailCollege.ZoneType = 2;
                    } else {
                        $scope.practicalEntryDetailCollege.ZoneType = 4;
                    }
          
                    if ($scope.practicalEntryDetailCollege.BranchID !== undefined && $scope.practicalEntryDetailCollege.ExamID !== undefined) {
                        $scope.practicalEntryDetailCollege.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        practicalEntryService.getExamTimeTableSubjectListByExamIDBranchIDForGeo($scope.practicalEntryDetailCollege.ExamID, $scope.practicalEntryDetailCollege.BranchID, $scope.practicalEntryDetailCollege.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                            //$scope.practicalEntryDetailCollege.ExmSubID = results[0].ExmSubID;
                        });
                    }
                    //if ($scope.practicalEntryDetailCollege.BranchID !== undefined && $scope.practicalEntryDetailCollege.ExamID !== undefined) {
                    //    practicalEntryService.getCheckCenterCollegePresentForGeo(AppSettings.CollegeID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.CourseID).then(function (results) {
                    //        if (results == 0) {
                    //            alert("Center not generated.");
                    //            $state.go('PreExam');
                    //        } else {
                    //            $scope.practicalEntryDetailCollege.PrePractCntrID = "" + results[0].PrePractCntrID + "";
                    //            $scope.practicalEntryDetailCollege.ZoneID = results[0].ZoneID;
                    //            practicalEntryService.getdatecompareforvoc($scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                    //                if (results == 1) {
                    //                    practicalEntryService.getExamTimeSchedulePresentMorningForVoc($scope.practicalEntryDetailCollege.ExamID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.PrePractCntrID, $scope.practicalEntryDetailCollege.ZoneType, $scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                    //                        if (results.length == 0) {
                    //                            practicalEntryService.getExamTimeSchedulePresentEveningForVoc($scope.practicalEntryDetailCollege.ExamID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.PrePractCntrID, $scope.practicalEntryDetailCollege.ZoneType, $scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                    //                                if (results.length == 0) {
                    //                                    alert("Mark Entry Schedule not available");
                    //                                    $state.go('PreExam');
                    //                                } else {
                    //                                    if (results[0].BatchFlag == 'M') {
                    //                                        $scope.OldBatchFlag = "FN";
                    //                                    }
                    //                                    else {
                    //                                        $scope.OldBatchFlag = "AN";
                    //                                    }
                    //                                    $scope.practicalEntryDetailCollege.BatchFlag = "";
                    //                                    $scope.practicalEntryDetailCollege.ExmSubID = "";
                    //                                    $scope.practicalEntryDetailCollege.MainGrpID = "";
                    //                                }
                    //                            });
                    //                        } else {
                    //                            if (results[0].BatchFlag == 'M') {
                    //                                $scope.OldBatchFlag = "FN";
                    //                            }
                    //                            else {
                    //                                $scope.OldBatchFlag = "AN";
                    //                            }
                    //                            $scope.practicalEntryDetailCollege.BatchFlag = "";
                    //                            $scope.practicalEntryDetailCollege.ExmSubID = "";
                    //                            $scope.practicalEntryDetailCollege.MainGrpID = "";
                    //                        }
                    //                    });
                    //                }
                    //                else {
                    //                    practicalEntryService.getExamTimeScheduleForVocOnlyDate($scope.practicalEntryDetailCollege.ExamID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.PrePractCntrID, $scope.practicalEntryDetailCollege.ZoneType, $scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                    //                        if (results.length == 0) {
                    //                            alert("Mark Entry Schedule not available");
                    //                            $state.go('PreExam');
                    //                        } else {
                    //                            $scope.practicalEntryDetailCollege.BatchFlag = "";
                    //                            $scope.practicalEntryDetailCollege.ExmSubID = "";
                    //                            $scope.practicalEntryDetailCollege.MainGrpID = "";
                    //                        }
                    //                    });
                    //                }
                    //            });
                    //        }
                    //    });
                    //}
                });
                $scope.MornigStartTime = "";
                $scope.MornigEndTime = "";
                $scope.AfterNoonStartTime = "";
                $scope.AfterNoonEndTime = "";
                $scope.getchangedate = function () {
                    $scope.practicalEntryDetailCollege.BatchNo = "";
                    $scope.practicalEntryDetailCollege.PrBatchID = ""
                    $scope.practicalEntryDetailCollege.BatchName = "";
                    $scope.practicalEntryDetailCollege.full_name = "";
                    $scope.practicalEntryDetailCollege.MobileNO = "";
                    $scope.practicalEntryDetailCollege.ExaminerID = "";
                    $scope.practicalEntryDetailCollege.Prdate = $("#Prdate").val();
                    $scope.practicalEntryDetailCollege.ExmSubID = "";

                }
                $scope.$watch('practicalEntryDetailCollege.ExmSubID', function () {
                    $scope.practicalEntryDetailCollege.BatchNo = "";
                    $scope.practicalEntryDetailCollege.PrBatchID = ""
                    $scope.practicalEntryDetailCollege.BatchName = "";
                    $scope.practicalEntryDetailCollege.full_name = "";
                    $scope.practicalEntryDetailCollege.MobileNO = "";
                    $scope.practicalEntryDetailCollege.ExaminerID = "";
                    if ($scope.practicalEntryDetailCollege.ExmSubID !== undefined ) {
                        if ($scope.practicalEntryDetailCollege.CourseID == 1) {
                            $scope.practicalEntryDetailCollege.ZoneType = 2;
                        } else {
                            $scope.practicalEntryDetailCollege.ZoneType = 4;
                        }
                        $scope.practicalEntryDetailCollege.BatchNo = "";
                        $scope.practicalEntryDetailCollege.PrBatchID = ""
                        $scope.practicalEntryDetailCollege.BatchName = "";
                        $scope.studentDetailList = [];
                        $scope.showdisable = false;
                        $scope.OTPDisable = false;
                        $scope.DisableFinalSubmit = true;
                        $scope.ackprintshow = false;
                        //if ($scope.practicalEntryDetailCollege.ExmSubID != "") {
                        //    if (($("#Prdate").val() == "") || ($("#Prdate").val() == "")) {
                        //        alert("Select Date first");
                        //        $scope.practicalEntryDetailCollege.ExmSubID = "";
                        //        return;
                        //    }
                        //}
                        $scope.practicalEntryDetailCollege.Prdate = $("#Prdate").val();
                        $scope.practicalEntryDetailCollege.BatchFlag = "";
                        practicalEntryService.getFillBatchDataGeoWithDate(AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.ExamID, $scope.practicalEntryDetailCollege.PrePractCntrID, $scope.practicalEntryDetailCollege.ExmSubID, $scope.practicalEntryDetailCollege.BatchFlag, $scope.practicalEntryDetailCollege.ZoneType, $scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                            $scope.examBatches = results;
                            $scope.practicalEntryDetailCollege.PrBatchID = "" + $scope.examBatches[0].PrBatchID + "";
                            $scope.practicalEntryDetailCollege.BatchNo = $scope.examBatches[0].BatchName;
                            $scope.practicalEntryDetailCollege.BatchName = $scope.examBatches[0].BatchName;
                            $scope.practicalEntryDetailCollege.BatchFlag = $scope.examBatches[0].BatchFlag;
                            $scope.practicalEntryDetailCollege.Prdate = $("#Prdate").val();
                            practicalEntryService.getdatecompareforvoc($scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                                if (results == 1) {
                                    $scope.practicalEntryDetailCollege.Prdate = $("#Prdate").val();
                                    practicalEntryService.getExamTimeSchedulePresentMorningForVoc($scope.practicalEntryDetailCollege.ExamID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.PrePractCntrID, $scope.practicalEntryDetailCollege.ZoneType, $scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                                        if (results.length == 0) {
                                            practicalEntryService.getExamTimeSchedulePresentEveningForVoc($scope.practicalEntryDetailCollege.ExamID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.PrePractCntrID, $scope.practicalEntryDetailCollege.ZoneType, $scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                                                if (results.length == 0) {
                                                    alert("Mark Entry Schedule not available");
                                                    $state.go('PreExam');
                                                } else {
                                                    if (results[0].BatchFlag == 'M') {
                                                        $scope.OldBatchFlag = "FN";
                                                        $scope.StartTime = results[0].MornigStartTime;
                                                        $scope.EndTime = results[0].MornigEndTime;
                                                        $scope.MornigStartTime = results[0].MornigStartTime;
                                                        $scope.MornigEndTime = results[0].MornigEndTime;
                                                        $scope.Session = "FN Session";
                                                        $scope.OldBatchFlag = "FN";
                                                    }
                                                    else {
                                                        $scope.OldBatchFlag = "AN";
                                                        $scope.StartTime = results[0].AfterNoonStartTime;
                                                        $scope.EndTime = results[0].AfterNoonEndTime;
                                                        $scope.AfterNoonStartTime = results[0].AfterNoonStartTime;
                                                        $scope.AfterNoonEndTime = results[0].AfterNoonEndTime;
                                                        $scope.Session = "AN Session";
                                                    }

                                                }
                                            });
                                        } else {
                                            if (results[0].BatchFlag == 'M') {
                                                $scope.OldBatchFlag = "FN";
                                                $scope.StartTime = results[0].MornigStartTime;
                                                $scope.EndTime = results[0].MornigEndTime;
                                                $scope.MornigStartTime = results[0].MornigStartTime;
                                                $scope.MornigEndTime = results[0].MornigEndTime;
                                                $scope.Session = "FN Session";
                                            }
                                            else {
                                                $scope.OldBatchFlag = "AN";
                                                $scope.StartTime = results[0].AfterNoonStartTime;
                                                $scope.EndTime = results[0].AfterNoonEndTime;
                                                $scope.AfterNoonStartTime = results[0].AfterNoonStartTime;
                                                $scope.AfterNoonEndTime = results[0].AfterNoonEndTime;
                                                $scope.Session = "AN Session";
                                            }
                                        }
                                    });
                                }
                                else {
                                    $scope.practicalEntryDetailCollege.Prdate = $("#Prdate").val();
                                    practicalEntryService.getExamTimeScheduleForVocOnlyDate($scope.practicalEntryDetailCollege.ExamID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.PrePractCntrID, $scope.practicalEntryDetailCollege.ZoneType, $scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                                        if (results.length == 0) {
                                            alert("Mark Entry Schedule not available");
                                            $state.go('PreExam');
                                        } else {
                                            if (results[0].BatchFlag == 'M') {
                                                $scope.Session = "FN Session";
                                            } else {
                                                $scope.Session = "AN Session";
                                            }
                                        }
                                    });
                                }
                            });
                        });
                        practicalEntryService.getExaminerDatabyCenterForGeoWithDate(AppSettings.CollegeID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.ExamID, $scope.practicalEntryDetailCollege.ExmSubID, $scope.practicalEntryDetailCollege.ZoneType, $scope.practicalEntryDetailCollege.Prdate, $scope.practicalEntryDetailCollege.BatchName).then(function (results) {
                            if (results.length > 0) {
                                $scope.examinerList = results;
                                $scope.practicalEntryDetailCollege.full_name = "" + $scope.examinerList[0].full_name + "";
                                $scope.practicalEntryDetailCollege.MobileNO = $scope.examinerList[0].mobile_no;
                                $scope.practicalEntryDetailCollege.ExaminerID = "" + $scope.examinerList[0].ExaminerID + "";
                            } else {
                                $scope.practicalEntryDetailCollege.full_name = "";
                                $scope.practicalEntryDetailCollege.MobileNO = "";
                                $scope.practicalEntryDetailCollege.ExaminerID = "";

                            }
                            $scope.practicalEntryDetailCollege.CreateLoginID = AppSettings.LoggedUserId;
                        });
                    }
                });
                $scope.$watch('practicalEntryDetailCollege.BranchID', function () {
                    if ($scope.practicalEntryDetailCollege.BranchID !== undefined && $scope.practicalEntryDetailCollege.ExamID !== undefined) {
                        $scope.practicalEntryDetailCollege.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        practicalEntryService.getExamTimeTableSubjectListByExamIDBranchIDForGeo($scope.practicalEntryDetailCollege.ExamID, $scope.practicalEntryDetailCollege.BranchID, $scope.practicalEntryDetailCollege.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                            //$scope.practicalEntryDetailCollege.ExmSubID = results[0].ExmSubID;
                            if ($scope.practicalEntryDetailCollege.CourseID == 1) {
                                $scope.practicalEntryDetailCollege.BranchID = 2;
                            } else {
                                $scope.practicalEntryDetailCollege.BranchID = 3;
                            }
                        });
                    }
                });
                //$("#Prdate").ejDatePicker({ maxDate: $scope.SerDate, allowEdit: true, dateFormat: "dd/MMM/yyyy" });
                $scope.$watch('practicalEntryDetailCollege.PrBatchID', function () {
                    $scope.studentDetailList = [];
                    $scope.showdisable = false;
                    $scope.OTPDisable = false;
                    $scope.DisableFinalSubmit = true;
                    $scope.ackprintshow = false;
                    if ($scope.practicalEntryDetailCollege.PrBatchID != undefined && $scope.practicalEntryDetailCollege.PrBatchID != undefined) {
                        practicalEntryService.getExaminerDatabyCenterForGeoWithDate(AppSettings.CollegeID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.ExamID, $scope.practicalEntryDetailCollege.ExmSubID, $scope.practicalEntryDetailCollege.ZoneType, $scope.practicalEntryDetailCollege.Prdate, $scope.practicalEntryDetailCollege.BatchName).then(function (results) {
                            if (results.length > 0) {
                                $scope.examinerList = results;
                                $scope.practicalEntryDetailCollege.full_name = "" + $scope.examinerList[0].full_name + "";
                                $scope.practicalEntryDetailCollege.MobileNO = $scope.examinerList[0].mobile_no;
                                $scope.practicalEntryDetailCollege.ExaminerID = "" + $scope.examinerList[0].ExaminerID + "";
                            } else {
                                $scope.practicalEntryDetailCollege.full_name = "";
                                $scope.practicalEntryDetailCollege.MobileNO = "";
                                $scope.practicalEntryDetailCollege.ExaminerID = "";
                            }
                        });
                        for (var i = 0; i < $scope.examBatches.length; i++) {
                            if ($scope.practicalEntryDetailCollege.PrBatchID == $scope.examBatches[i].PrBatchID) {
                                $scope.practicalEntryDetailCollege.BatchNo = $scope.examBatches[i].BatchName;
                                $scope.practicalEntryDetailCollege.BatchName = $scope.examBatches[i].BatchName;
                                $scope.practicalEntryDetailCollege.BatchFlag = $scope.examBatches[i].BatchFlag;
                                if (($scope.Session != "") && ($scope.Session != undefined)) {
                                    practicalEntryService.getdatecompareforvoc($scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                                        if (results == 1) {
                                            if ($scope.practicalEntryDetailCollege.BatchFlag == "M") {
                                                practicalEntryService.getExamTimeSchedulePresentMorningForVoc($scope.practicalEntryDetailCollege.ExamID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.PrePractCntrID, $scope.practicalEntryDetailCollege.ZoneType, $scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                                                    if (results.length == 0) {
                                                        alert("Mark Entry Schedule not available");
                                                        $scope.OTPDisable = true;
                                                        $scope.SubmitDisable = true;
                                                    }
                                                    else {
                                                        $scope.StartTime = results[0].MornigStartTime;
                                                        $scope.EndTime = results[0].MornigEndTime;
                                                        $scope.Session = "FN Session";
                                                    }
                                                });
                                            }
                                            else {
                                                practicalEntryService.getExamTimeSchedulePresentEveningForVoc($scope.practicalEntryDetailCollege.ExamID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.PrePractCntrID, $scope.practicalEntryDetailCollege.ZoneType, $scope.practicalEntryDetailCollege.Prdate).then(function (results) {
                                                    if (results.length == 0) {
                                                        alert("Mark Entry Schedule not available");
                                                        $scope.OTPDisable = true;
                                                        $scope.SubmitDisable = true;
                                                    } else {
                                                        $scope.StartTime = results[0].AfterNoonStartTime;
                                                        $scope.EndTime = results[0].AfterNoonEndTime;
                                                        $scope.Session = "AN Session";
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                });
                $scope.$watch('practicalEntryDetailCollege.DistrictID', function () {
                    if ($scope.practicalEntryDetailCollege.DistrictID !== undefined) {
                        practicalEntryService.getPrePractCenterByDistrictId($scope.practicalEntryDetailCollege.DistrictID, AppSettings.ExamInstID).then(function (results) {
                            $scope.prePractCenters = results;
                        });
                    }
                });

                //    $scope.$watch('practicalEntryDetailCollege.ExmSubID', function () {

                //});
                $scope.OTPDisable = false;
                $scope.txtOTPDisable = true;
                $scope.SubmitDisable = false;
                $scope.SendOTP = function () {
                    if (($scope.practicalEntryDetailCollege.CourseID == undefined) || ($scope.practicalEntryDetailCollege.CourseID == "")) {
                        alert("Select Course");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollege.ExamID == undefined) || ($scope.practicalEntryDetailCollege.ExamID == "")) {
                        alert("Select Exam");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollege.BranchID == undefined) || ($scope.practicalEntryDetailCollege.BranchID == "")) {
                        alert("Select Branch");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollege.BatchName == undefined) || ($scope.practicalEntryDetailCollege.BatchName == "")) {
                        alert("Select Batch No.");
                        return;
                    }
                    $scope.practicalEntryDetailCollege.Prdate = $("#Prdate").val();
                    if (($scope.practicalEntryDetailCollege.Prdate == undefined) || ($scope.practicalEntryDetailCollege.Prdate == "")) {
                        alert("Select date ");
                        return;
                    }
                    //$scope.studentDetailList = [];
                    $scope.practicalEntryDetailCollege.CenterCollegeID = AppSettings.CollegeID;
                    $scope.practicalEntryDetailCollege.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    $scope.practicalEntryDetailCollege.CreateLoginID = AppSettings.LoggedUserId;
                    $scope.practicalEntryDetailCollege.DateOfMarkEntry = $scope.practicalEntryDetailCollege.Prdate;
                    $scope.practicalEntryDetailCollege.BatchNo = $scope.practicalEntryDetailCollege.BatchName;
                    $scope.practicalEntryDetailCollege.EvalTypeID = 2;
                    if ($scope.practicalEntryDetailCollege.CourseID == 1) {
                        $scope.practicalEntryDetailCollege.ZoneType = 2;
                    } else {
                        $scope.practicalEntryDetailCollege.ZoneType = 4;
                    }
                    practicalEntryService.GetOTPMarkEntryPresentInOTPTable($scope.practicalEntryDetailCollege).then(function (resultsPre) {
                        if (resultsPre.length > 0) {
                            $scope.practicalEntryDetailCollege.OTPSended = resultsPre[0].OTP;
                            //alert("OTP already Sent");
                            alert("Sent OTP Successfully,Submit that OTP.");
                            $scope.txtOTPDisable = false;
                            $scope.SubmitDisable = false;
                        } else {
                            //practicalEntryService.GetGenerateOTP($scope.practicalEntryDetailCollege.MobileNO).then(function (results) {
                            //    $scope.practicalEntryDetailCollege.OTPSended = results;
                            //    alert("Sent OTP Successfully,Submit that OTP.");
                            //    $scope.txtOTPDisable = false;
                            //    $scope.SubmitDisable = false;
                            //});
                            practicalEntryService.PostInsertOTPMarkEntry($scope.practicalEntryDetailCollege).then(function (results) {
                                alert("Sent OTP Successfully,Submit that OTP.");
                                $scope.txtOTPDisable = false;
                                $scope.SubmitDisable = false;
                            });
                        }
                    });
                }
                $scope.otoSuccess = false;
                $scope.DisableSubmit = false;
                $scope.savedisable = false;
                $scope.printshow = true;
                $scope.ShowOnlyData = function () {
                    if (($scope.practicalEntryDetailCollege.BatchName == undefined) || ($scope.practicalEntryDetailCollege.BatchName == "")) {
                        alert("Batch not available");
                        return;
                    }
                    if ($scope.practicalEntryDetailCollege.PrBatchID == undefined || $scope.practicalEntryDetailCollege.PrBatchID == "") {
                        alert("Batch not available");
                        return;
                    }
                    $scope.showStudentDetails();
                }
                $scope.showStudentDetailsNew = function () {
                    if ($scope.studentDetailList == undefined) {
                        alert("Please First shows the data then send OTP.")
                        return;
                    }
                    if ($scope.studentDetailList.length == 0) {
                        alert("Please First shows the data then send OTP.")
                        return;
                    }
                    if (($scope.practicalEntryDetailCollege.BatchName == undefined) || ($scope.practicalEntryDetailCollege.BatchName == "")) {
                        alert("Select Batch No.");
                        return;
                    }
                    practicalEntryService.GetOTPMarkEntryPresentInOTPTableForSubmit($scope.practicalEntryDetailCollege).then(function (resultsPre) {
                        if (resultsPre.length > 0) {
                            $scope.practicalEntryDetailCollege.OTPSended = resultsPre[0].OTP;
                            if ($scope.practicalEntryDetailCollege.OTPSended != $scope.practicalEntryDetailCollege.OTP) {
                                // $scope.studentDetailList = [];
                                alert("Wrong OTP Entered");
                            } else {
                                $scope.printshow = false;
                                var final = 0;
                                $scope.practicalEntryDetailCollege.TotalMarks = 0;
                                for (var i = 0; i < $scope.studentDetailList.length; i++) {
                                    if ($scope.studentDetailList[i].ChkListFlag == 'V') {
                                        $scope.studentDetailList[i].DisableChecklistflag = true;
                                        final = final + 1;
                                    } else {
                                        $scope.studentDetailList[i].DisableChecklistflag = false;
                                    }

                                    $scope.studentDetailList[i].HTNODisable = true;
                                    if (($scope.studentDetailList[i].Marks == "") || ($scope.studentDetailList[i].Marks == undefined)) { $scope.studentDetailList[i].Marks = 0; }
                                    //$scope.studentDetailList[i].Inwords = toWords($scope.studentDetailList[i].Marks)
                                    if ($scope.studentDetailList[i].AddFlag == "Y") {
                                        //$scope.studentDetailList[i].showmarks = false;
                                        $scope.studentDetailList[i].AddFlagStud = "*****";
                                    } else {
                                        $scope.studentDetailList[i].showmarks = true;
                                        $scope.studentDetailList[i].AddFlagStud = "";
                                    }
                                    if ($scope.studentDetailList[i].StatusFlag == "P") {
                                        if ($scope.studentDetailList[i].ChkListFlag != 'V') {
                                            $scope.practicalEntryDetailCollege.TotalMarks = parseInt($scope.practicalEntryDetailCollege.TotalMarks) + parseInt($scope.studentDetailList[i].Marks);
                                            if (($scope.studentDetailList[i].Marks == 0) && ($scope.studentDetailList[i].RecordID != 0)) {
                                                $scope.studentDetailList[i].Marks = "0";
                                                $scope.studentDetailList[i].Inwords = "Zero";
                                            } else if (($scope.studentDetailList[i].Marks == 0) && ($scope.studentDetailList[i].RecordID == 0)) {
                                                $scope.studentDetailList[i].Marks = "";
                                            }
                                            if ($scope.studentDetailList[i].Marks.toString().length == 1) {
                                                $scope.studentDetailList[i].Marks = "0" + $scope.studentDetailList[i].Marks;
                                            }
                                        } else {
                                            $scope.studentDetailList[i].Marks = "P";
                                        }
                                    } else {
                                        $scope.studentDetailList[i].Marks = $scope.studentDetailList[i].StatusFlag;
                                    }
                                }
                                $scope.AddNewRowDisable = false;
                                $scope.savedisable = false;
                                $scope.practicalEntryDetailCollege.TotalMarksInWords = toWords($scope.practicalEntryDetailCollege.TotalMarks);
                                if (final == $scope.studentDetailList.length) {
                                    alert("Already done final submit, you can't Edit")
                                    $scope.savedisable = true;
                                    $scope.showdisable = true;
                                    $scope.OTPDisable = true;
                                    $scope.AddNewRowDisable = true;
                                    $scope.printshow = false;
                                }
                            }
                        } else {
                            //$scope.studentDetailList = [];
                            alert("Wrong OTP Entered");
                        }
                    });
                }
                $scope.AddNewRowDisable = true;
                $scope.showStudentDetails = function () {
                    if ($scope.practicalEntryDetailCollege.ExmSubID !== undefined && $scope.practicalEntryDetailCollege.BranchID !== undefined && $scope.practicalEntryDetailCollege.ExamID !== undefined && $scope.practicalEntryDetailCollege.PrePractCntrID && $scope.practicalEntryDetailCollege.CourseID) {
                        $scope.studentDetailList = [];
                        $scope.practicalEntryDetailCollege.BatchNo = $scope.practicalEntryDetailCollege.BatchName;
                        $scope.practicalEntryDetailCollege.ExamInstID = AppSettings.ExamInstID;
                        $scope.practicalEntryDetailCollege.CenterCollegeID = AppSettings.CollegeID;
                        //practicalEntryService.GetOTPMarkEntryPresentInOTPTable($scope.practicalEntryDetailCollege).then(function (resultsPre) {
                        //    if (resultsPre.length > 0) {
                        //        $scope.practicalEntryDetailCollege.OTPSended = resultsPre[0].OTP;
                        //        if ($scope.practicalEntryDetailCollege.OTPSended != $scope.practicalEntryDetailCollege.OTP) {
                        //            $scope.studentDetailList = [];
                        //            alert("Wrong OTP Entered");
                        //        } else {
                        $scope.practicalEntryDetailCollege.BatchNo = $scope.practicalEntryDetailCollege.BatchName;
                        $scope.practicalEntryDetailCollege.CreateLoginID = AppSettings.LoggedUserId;
                        $scope.loading = true;
                        practicalEntryService.getStudentDetailsByExamSubjectGeo($scope.practicalEntryDetailCollege).then(function (results) {
                            if (results.length > 0) {
                                var final = 0;
                                $scope.practicalEntryDetailCollege.TotalMarks = 0;
                                for (var i = 0; i < results.length; i++) {
                                    if (results[i].ChkListFlag == 'V') {
                                        results[i].DisableChecklistflag = true;
                                        final = final + 1;
                                    } else {
                                        results[i].DisableChecklistflag = false;
                                    }
                                    results[i].DisableChecklistflag = true;
                                    results[i].HTNODisable = true;
                                    if ((results[i].Marks == "") || (results[i].Marks == undefined)) { results[i].Marks = 0; }
                                    
                                    results[i].showmarks = true;
                                    if (results[i].AddFlag == "Y") {
                                        //results[i].showmarks = false;
                                        results[i].AddFlagStud = "*****";
                                    } else {
                                        results[i].AddFlagStud = "";
                                        results[i].showmarks = true;
                                    }
                                    if (results[i].StatusFlag == "P") {
                                        if (results[i].ChkListFlag != 'V') {
                                            //if (results[i].AddFlag != "Y") {
                                            //    results[i].Inwords = toWords(parseInt(results[i].Marks))
                                            //}
                                            results[i].Inwords = toWords(parseInt(results[i].Marks))
                                            $scope.practicalEntryDetailCollege.TotalMarks = parseInt($scope.practicalEntryDetailCollege.TotalMarks) + parseInt(results[i].Marks);
                                            if ((results[i].RecordID == "") || (results[i].RecordID == undefined)) { results[i].RecordID = 0; }
                                            if ((results[i].Marks == 0) && (results[i].RecordID != 0)) {
                                                results[i].Marks = "0";
                                                results[i].Inwords = "Zero";
                                            } else if ((results[i].Marks == 0) && (results[i].RecordID == 0)) {
                                                results[i].Marks = "";
                                                results[i].Inwords = "";
                                            }
                                            if (results[i].Marks.toString().length == 1) {
                                                results[i].Marks = "0" + results[i].Marks;
                                            }
                                        } else {
                                            results[i].Marks = "P";
                                        }
                                    } else {
                                        results[i].Marks = results[i].StatusFlag;
                                    }
                                    if ((results[i].Marks == "A") || (results[i].Marks == "a")) {
                                        results[i].Inwords = "Absent";
                                    }
                                    else if ((results[i].Marks == "AM") || (results[i].Marks == "am")) {
                                        results[i].Inwords = "Already Malpractice";
                                    }
                                    else if ((results[i].Marks == "M") || (results[i].Marks == "m")) {
                                        results[i].Inwords = "Malpractice";
                                    }
                                    else if ((results[i].Marks == "N") || (results[i].Marks == "n")) {
                                        results[i].Inwords = "Not Offered";
                                    }
                                }
                                $scope.practicalEntryDetailCollege.TotalMarksInWords = toWords($scope.practicalEntryDetailCollege.TotalMarks);
                                //var final = 0;
                                //for (var i = 0; i < results.length; i++) {
                                //    if (results[i].ChkListFlag == 'V') {
                                //        results[i].DisableChecklistflag = true;
                                //        final = final + 1;
                                //    } else {
                                //        results[i].DisableChecklistflag = false;
                                //    }
                                //    results[i].HTNODisable = true;
                                //    if ((results[i].Marks == "") || (results[i].Marks == undefined)) { results[i].Marks = 0; }
                                //    results[i].Inwords = toWords(results[i].Marks)
                                //}
                                //if (final == results.length) {
                                //    alert("Already done final submit, you can't Edit")
                                //    $scope.savedisable = true;
                                //}
                                $scope.studentDetailList = results;
                                $scope.SubmitDisable = false;
                                $scope.txtOTPDisable = true;
                                $scope.loading = false;
                                if ($scope.practicalEntryDetailCollege.TotalMarks > 0) {
                                    $scope.printshow = false;
                                } else {
                                    $scope.printshow = true;
                                }
                                if (final == results.length) {
                                    alert("Already done final submit, you can't Edit")
                                    $scope.savedisable = true;
                                    $scope.showdisable = true;
                                    $scope.OTPDisable = true;
                                    $scope.AddNewRowDisable = true;
                                    $scope.printshow = true;
                                    $scope.ackprintshow = true;
                                }
                            } else {
                                $scope.studentDetailList = [];
                                alert("Record not found");
                                $scope.SubmitDisable = false;
                                $scope.txtOTPDisable = false;
                                $scope.savedisable = false;
                                $scope.loading = false;
                            }
                        });
                        //}
                        //} else {
                        //    $scope.studentDetailList = [];
                        //    alert("Wrong OTP Entered");
                        //}
                        //});
                        //practicalEntryService.GetOTPMarkEntryByOTP($scope.practicalEntryDetailCollege.OTP, $scope.practicalEntryDetailCollege.ExamInstID,
                        //    $scope.practicalEntryDetailCollege.MobileNO, $scope.practicalEntryDetailCollege.ExamID,
                        //    $scope.practicalEntryDetailCollege.ExmSubID, $scope.practicalEntryDetailCollege.PrePractCntrID).then(function (resultsOTP) {
                        //        if (resultsOTP.length > 0) {
                        //            $scope.practicalEntryDetailCollege.BatchNo = $scope.practicalEntryDetailCollege.BatchName;
                        //        practicalEntryService.getStudentDetailsByExamSubject($scope.practicalEntryDetailCollege).then(function (results) {
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
                $scope.DisableFinalSubmit = true;
                $scope.postpracticalEntryDetailCollege = function () {
                    if (($scope.practicalEntryDetailCollege.CourseID == undefined) || ($scope.practicalEntryDetailCollege.CourseID == "")) {
                        alert("Select Course");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollege.ExamID == undefined) || ($scope.practicalEntryDetailCollege.ExamID == "")) {
                        alert("Select Exam");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollege.Prdate == undefined) || ($scope.practicalEntryDetailCollege.Prdate == "")) {
                        alert("Select Date");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollege.BranchID == undefined) || ($scope.practicalEntryDetailCollege.BranchID == "")) {
                        alert("Select Branch");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollege.BatchName == undefined) || ($scope.practicalEntryDetailCollege.BatchName == "")) {
                        alert("Batch not available");
                        return;
                    }
                    $scope.updatedStudentInfoList = [];
                    if ($scope.practicalStudentDetailForm.$valid && $scope.practicalEntryDetailCollegeForm.$valid && $scope.studentDetailList.length > 0) {
                        for (var i = 0; i < $scope.studentDetailList.length; i++) {
                            $scope.studentDetailList[i].CreateLoginID = AppSettings.LoggedUserId;
                            $scope.studentDetailList[i].CreLoginID = AppSettings.LoggedUserId;
                            $scope.studentDetailList[i].CenterCollegeID = AppSettings.CollegeID;
                            $scope.studentDetailList[i].PractType = 4;
                            $scope.studentDetailList[i].Prdate = $scope.practicalEntryDetailCollege.Prdate;
                            $scope.studentDetailList[i].Session = $scope.Session;
                            $scope.studentDetailList[i].ExaminerID = $scope.practicalEntryDetailCollege.ExaminerID;

                            if ($scope.studentDetailList[i].Marks.toString().replace(" ", "") == "") {
                                //if (($scope.studentDetailList[i].StatusFlag == "A" || $scope.studentDetailList[i].StatusFlag == "M" || $scope.studentDetailList[i].StatusFlag == "N") && $scope.studentDetailList[i].Marks > 0) {
                                //var statusName = $scope.studentDetailList[i].StatusFlag == "A" ? "Absent" : $scope.studentDetailList[i].StatusFlag == "M" ? "Malpractice" : $scope.studentDetailList[i].StatusFlag == "N" ? "Not Offered" : "";
                                alert("Please enter Marks or Status for HTNo " + $scope.studentDetailList[i].HTNO + ".");
                                //alert("You have entered the marks against HTNo " + $scope.studentDetailList[i].HTNO + ", but you have selected " + statusName + ", please conform.");
                                $scope.isCorrect = false;
                                break;
                            }
                            if (($scope.studentDetailList[i].Marks == undefined) || ($scope.studentDetailList[i].Marks == "")) {
                                $scope.studentDetailList[i].Marks = 0;
                            }
                            //if (($scope.studentDetailList[i].StatusFlag == "A") && ($scope.studentDetailList[i].Marks == 0)) {
                            //    alert("You have not entered the marks against HTNo " + $scope.studentDetailList[i].HTNO + ", but you have selected " + statusName + ", please conform.");
                            //    $scope.isCorrect = false;
                            //    break;
                            //}
                            $scope.isCorrect = true;
                           
                            if ($scope.studentDetailList[i].RecordID > 0) {
                               // if (($scope.studentDetailList[i].OldMarks !== $scope.studentDetailList[i].Marks) || ($scope.studentDetailList[i].OldStatusFlag !== $scope.studentDetailList[i].StatusFlag)) {
                                    var temp = {};
                                    angular.copy($scope.studentDetailList[i], temp);
                                    $scope.updatedStudentInfoList.push(temp);
                                //}
                            } else {
                                var temp = {};
                                angular.copy($scope.studentDetailList[i], temp);
                                $scope.updatedStudentInfoList.push(temp);
                            }

                        }
                        if ($scope.isCorrect) {
                            if ($scope.updatedStudentInfoList.length > 0) {
                                for (var i = 0; i < $scope.updatedStudentInfoList.length; i++) {
                                    if ($scope.updatedStudentInfoList[i].Marks > 0) {
                                        $scope.updatedStudentInfoList[i].StatusFlag = "P";
                                    }
                                    else if ($scope.updatedStudentInfoList[i].Marks == 0) {
                                        $scope.updatedStudentInfoList[i].StatusFlag = "P";
                                    } else {
                                        $scope.updatedStudentInfoList[i].StatusFlag = $scope.updatedStudentInfoList[i].Marks;
                                        $scope.updatedStudentInfoList[i].Marks = 0;
                                    }
                                }
                                $scope.postPracticalEntry = {};

                                $scope.postPracticalEntry.studentInfoList = $scope.updatedStudentInfoList;
                                $scope.practicalEntryDetailCollege.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                                $scope.practicalEntryDetailCollege.CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                                $scope.practicalEntryDetailCollege.UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID
                                $scope.practicalEntryDetailCollege.CreateLoginID = AppSettings.LoggedUserId;
                                $scope.practicalEntryDetailCollege.PractType = 4;
                                $scope.postPracticalEntry.practicalEntryDetailColleges = $scope.practicalEntryDetailCollege;

                                var isConfirmed = confirm("Do you want to Submit ?");
                                if (isConfirmed) {
                                    $scope.savedata();
                                } else {

                                }
                            } else {
                                //$scope.practicalEntryDetailCollege = {};
                                $scope.updatedStudentInfoList = [];
                                $scope.studentDetailList = [];
                                $scope.postPracticalEntry = {};
                                $scope.postPracticalEntry.studentInfoList = [];
                                $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                            }
                        }
                    }
                };
                $scope.savedata = function () {
                    $scope.postPracticalEntry.CreateLoginID = AppSettings.LoggedUserId;
                    $scope.postPracticalEntry.CreLoginID = AppSettings.LoggedUserId;

                    $scope.loading = true;
                    $scope.savedisable = true;
                    practicalEntryService.postPracticalEntry($scope.postPracticalEntry).then(function (results) {
                        if (results.IsSuccess) {
                            //$scope.practicalEntryDetailCollege = {};
                            //$scope.studentDetailList = [];
                            //$scope.updatedStudentInfoList = [];
                            //$scope.postPracticalEntry = {};
                            //$scope.postPracticalEntry.studentInfoList = [];
                            //$scope.postPracticalEntry.practicalEntryDetailColleges = {};
                            //alert(results.Message);
                            $scope.DisableFinalSubmit = false;
                            $scope.loading = false;
                            $scope.savedisable = false;
                            var isConfirmed = confirm("Submitted Successfully, Do you want to Final Submit ? After Final Submit you can not edit");
                            //var isConfirmed = confirm("Submitted...Do you want to Final Submit ? After Final Submit you don't have change any status/marks.");
                            if (isConfirmed) {
                                $scope.postpracticalEntryDetailCollegeFinalSubmit();
                            } else {
                                for (var i = 0; i < $scope.studentDetailList.length; i++) {
                                    $scope.studentDetailList[i].DisableChecklistflag = false;
                                }
                                $scope.savedisable = false;
                               // $state.go('PreExam');
                                //    //$scope.practicalEntryDetailCollege = {};
                                //    $scope.studentDetailList = [];
                                //    $scope.updatedStudentInfoList = [];
                                //    $scope.postPracticalEntry = {};
                                //    $scope.postPracticalEntry.studentInfoList = [];
                                //    $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                                //    $scope.loading = false;
                                //    $scope.savedisable = false;
                            }
                        } else {
                            //$scope.practicalEntryDetailCollege = {};
                            $scope.studentDetailList = [];
                            $scope.updatedStudentInfoList = [];
                            $scope.postPracticalEntry = {};
                            $scope.postPracticalEntry.studentInfoList = [];
                            $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                            $scope.loading = false;
                            $scope.savedisable = false;
                            alert(results.Message);
                        }
                    }, function (error) {
                        //$scope.practicalEntryDetailCollege = {};
                        $scope.updatedStudentInfoList = [];
                        $scope.studentDetailList = [];
                        $scope.postPracticalEntry = {};
                        $scope.postPracticalEntry.studentInfoList = [];
                        $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                        $scope.loading = false;
                        $scope.savedisable = false;
                        alert(error.statusText);
                    });
                }
                $scope.postpracticalEntryDetailCollegeFinalSubmit = function () {
                    //var isConfirmed = confirm("Are you sure to Final Submit ? After Final Submit you don't change any status/marks.");
                    //if (isConfirmed) {
                    $scope.updatedStudentInfoList = [];
                    for (var i = 0; i < $scope.studentDetailList.length; i++) {
                        var temp = {};
                        angular.copy($scope.studentDetailList[i], temp);
                        $scope.updatedStudentInfoList.push(temp);
                    }
                    $scope.postPracticalEntry = {};
                    $scope.postPracticalEntry.studentInfoList = $scope.updatedStudentInfoList;
                    $scope.practicalEntryDetailCollege.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    $scope.practicalEntryDetailCollege.CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                    $scope.practicalEntryDetailCollege.UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID
                    $scope.practicalEntryDetailCollege.CreateLoginID = AppSettings.LoggedUserId;
                    $scope.practicalEntryDetailCollege.PractType = 4;
                    $scope.practicalEntryDetailCollege.CenterCollegeID = AppSettings.CollegeID;
                    $scope.postPracticalEntry.practicalEntryDetailColleges = $scope.practicalEntryDetailCollege;

                    $scope.DisableFinalSubmit = true;
                    $scope.postPracticalEntry.CreateLoginID = AppSettings.LoggedUserId;
                    $scope.postPracticalEntry.CreLoginID = AppSettings.LoggedUserId;
                    $scope.loading = true;
                    practicalEntryService.postPracticalEntryFinalSubmit($scope.postPracticalEntry).then(function (results) {
                        if (results.IsSuccess) {
                            //$scope.practicalEntryDetailCollege = {};
                            $scope.studentDetailList = [];
                            $scope.updatedStudentInfoList = [];
                            $scope.postPracticalEntry = {};
                            $scope.postPracticalEntry.studentInfoList = [];
                            $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                            alert("Final Submit Successfully.");
                            //$state.go('PreExam');
                            $state.go('PreExam.GeographyPracticalAwardListAcknowledgement', { PrePractCntrID: $scope.practicalEntryDetailCollege.PrePractCntrID, ExmSubID: $scope.practicalEntryDetailCollege.ExmSubID, BatchNo: $scope.practicalEntryDetailCollege.BatchNo, ExamID: $scope.practicalEntryDetailCollege.ExamID, PrDate: $scope.practicalEntryDetailCollege.Prdate});
                            $scope.DisableFinalSubmit = false;
                            $scope.loading = false;
                        } else {
                            //$scope.practicalEntryDetailCollege = {};
                            $scope.studentDetailList = [];
                            $scope.updatedStudentInfoList = [];
                            $scope.postPracticalEntry = {};
                            $scope.postPracticalEntry.studentInfoList = [];
                            $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                            alert(results.Message);
                            $scope.loading = false;
                        }
                    });
                    /*} else {
                        //$scope.practicalEntryDetailColle
                        ge = {};
                        $scope.studentDetailList = [];
                        $scope.updatedStudentInfoList = [];
                        $scope.postPracticalEntry = {};
                        $scope.postPracticalEntry.studentInfoList = [];
                        $scope.postPracticalEntry.practicalEntryDetailColleges = {};
                    }*/
                };
                $scope.loading = false;
                $scope.AddNewRow = function () {
                    if ($scope.savedisable == true) {
                        alert("Already done final submit, you can't Edit")
                        return;
                    }
                    if ($scope.studentDetailList == undefined) {
                        alert("Please First Enter & Submit OTP.")
                        return;
                    }
                    if ($scope.studentDetailList.length == 0) {
                        alert("Please First Enter & Submit OTP.")
                        return;
                    }
                    if (($scope.practicalEntryDetailCollege.OTP == undefined) || ($scope.practicalEntryDetailCollege.OTP == "")) {
                        alert("Please First Enter & Submit OTP.")
                        return;
                    }
                    if ($scope.DisableFinalSubmit == false) {
                        alert("After submit don'nt allowed to add new record.")
                        return;
                    }
                    if ($scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO == "") {
                        alert("Last rows HTNo should not be blank");
                        return;
                    }
                    var obj = {};
                    obj.SrNo = $scope.studentDetailList.length + 1;
                    obj.HTNO = "";
                    obj.ExmSubCode = $scope.studentDetailList[$scope.studentDetailList.length - 1].ExmSubCode;
                    obj.ExmSubName = $scope.studentDetailList[$scope.studentDetailList.length - 1].ExmSubName;
                    obj.ExamSubID = $scope.studentDetailList[$scope.studentDetailList.length - 1].ExamSubID;
                    obj.Marks = "";
                    obj.showmarks = true;
                    obj.Inwords = "";
                    obj.ExamID = $scope.practicalEntryDetailCollege.ExamID;
                    obj.PrCentreID = $scope.studentDetailList[$scope.studentDetailList.length - 1].PrCentreID;
                    obj.ExamInstID = AppSettings.ExamInstID;
                    obj.ExmSubID = $scope.practicalEntryDetailCollege.ExmSubID;
                    obj.EvalTypID = $scope.studentDetailList[$scope.studentDetailList.length - 1].EvalTypID;
                    obj.BatchNo = $scope.practicalEntryDetailCollege.BatchNo;
                    obj.AddFlag = "Y";
                    obj.AddFlagForSameBatch = "Y";
                    $scope.studentDetailList.push(obj);
                }
                $scope.DeleteRow = function (index) {
                    var isConfirmed = confirm("Are you sure to delete this record ?");
                    if (isConfirmed) {
                        $scope.studentDetailList.splice(index, 1);
                        $scope.gettotalMarks();
                    }
                };
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
                        practicalEntryService.GetHTNoPresentInPreStudentMarks(HTNO, $scope.practicalEntryDetailCollege.ExamID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.PrePractCntrID, $scope.practicalEntryDetailCollege.ExmSubID).then(function (results) {
                            if (results.length > 0) {
                                $scope.studentDetailList[$scope.studentDetailList.length - 1].AddFlagForSameBatch = "Y";
                                $scope.studentDetailList[$scope.studentDetailList.length - 1].StudName = results[0].StudName;
                                if (results[0].StatusFlag == "A") {
                                    var isConfirmed = confirm("Marks Entry is already done,It's Absent in another batch,Do You wan't allowed ?");
                                    if (isConfirmed) {
                                    } else {
                                        $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                        $scope.studentDetailList[$scope.studentDetailList.length - 1].StudName ="";
                                        return;
                                    }
                                }
                                else if (results[0].StatusFlag == "M") {
                                    alert("This student is in Mal practice,So you Can't allowed");
                                    $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                    $scope.studentDetailList[$scope.studentDetailList.length - 1].StudName = "";
                                    return;
                                }
                                else if (results[0].StatusFlag == "N") {
                                    alert("This student is in Not Offered,So you Can't allowed");
                                    $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                    $scope.studentDetailList[$scope.studentDetailList.length - 1].StudName = "";
                                    return;
                                }
                                else if (results[0].StatusFlag == "P") {
                                    alert("Marks Entry is already done, It's Present in another batch, Can't allowed");
                                    $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                    $scope.studentDetailList[$scope.studentDetailList.length - 1].StudName = "";
                                    return;
                                    //alert();
                                    //$scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                    //return;
                                }
                                
                            } else {
                                practicalEntryService.GetHTNoPresentInExamForms(HTNO, $scope.practicalEntryDetailCollege.ExamID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollege.PrePractCntrID, $scope.practicalEntryDetailCollege.ExmSubID, $scope.practicalEntryDetailCollege.BatchNo,2).then(function (resultspre) {
                                    if (resultspre.length > 0) {
                                        $scope.studentDetailList[$scope.studentDetailList.length - 1].AddFlagForSameBatch = "N";
                                        //if (resultspre[0].MediumID == 6) {
                                        //    if (resultspre[0].MediumIDBatch != 6) {
                                        //        alert("Medium is different, You Can not add this.");
                                        //        $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                        //        return;
                                        //    }
                                        //}
                                        //if (resultspre[0].MediumIDBatch == 6) {
                                        //    if (resultspre[0].MediumID != 6) {
                                        //        alert("Medium is different, You Can not add this.");
                                        //        $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                        //        return;
                                        //    }
                                        //}
                                        if (resultspre[0].BatchNo != $scope.practicalEntryDetailCollege.BatchNo) {
                                            var isConfirmed = confirm("HTNo is already Present in next batch , Do you want to add this ? ?");
                                            if (isConfirmed) {
                                                $scope.studentDetailList[$scope.studentDetailList.length - 1].StudName = resultspre[0].StudName;
                                            } else {
                                                
                                                HTNO = "";
                                                $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                                return;
                                            }
                                        } else {
                                            $scope.studentDetailList[$scope.studentDetailList.length - 1].StudName = resultspre[0].StudName;
                                        }
                                    } else {
                                        alert("HTNo is not present in Exam Forms, You Can not add this.");
                                        $scope.studentDetailList[$scope.studentDetailList.length - 1].HTNO = "";
                                        return;
                                    }
                                }, function (error) {
                                    alert(error.statusText);
                                });
                            }
                        }, function (error) {
                            alert(error.statusText);
                        });
                    }
                }
                $scope.gettotalMarks = function () {
                    $scope.practicalEntryDetailCollege.TotalMarks = 0;
                    var marksforsum = 0;
                    for (var i = 0; i < $scope.studentDetailList.length; i++) {
                        if (isNaN($scope.studentDetailList[i].Marks)) {
                        } else {
                            if (($scope.studentDetailList[i].Marks == undefined) || ($scope.studentDetailList[i].Marks == "")) {
                                marksforsum = 0;
                            } else {
                                marksforsum = $scope.studentDetailList[i].Marks;
                            }
                            $scope.practicalEntryDetailCollege.TotalMarks = parseInt($scope.practicalEntryDetailCollege.TotalMarks) + parseInt(marksforsum);
                        }
                    }
                    $scope.practicalEntryDetailCollege.TotalMarksInWords = toWords($scope.practicalEntryDetailCollege.TotalMarks);
                }
                $scope.GetCheckMarks = function (studentDetail) {
                    if (studentDetail.MaxMarks == undefined) {
                        studentDetail.MaxMarks = $scope.studentDetailList[1].MaxMarks;
                    }
                    if (studentDetail.Marks > studentDetail.MaxMarks) {
                        alert("Please enter marks less than " + studentDetail.MaxMarks + " for HTNo " + studentDetail.HTNO);
                        studentDetail.Marks = "";
                        studentDetail.Inwords = "";
                        $scope.gettotalMarks();
                    } else {
                        if ((studentDetail.Marks == "A") || (studentDetail.Marks == "a")) {
                            studentDetail.Inwords = "Absent";
                        }
                        else if ((studentDetail.Marks == "AM") || (studentDetail.Marks == "am")) {
                            studentDetail.Inwords = "Already Malpractice";
                        }
                        else if ((studentDetail.Marks == "M") || (studentDetail.Marks == "m")) {
                            studentDetail.Inwords = "Malpractice";
                        }
                        else if ((studentDetail.Marks == "N") || (studentDetail.Marks == "n")) {
                            studentDetail.Inwords = "Not Applicable";
                        }
                        else if ((studentDetail.Marks == "")) {
                            studentDetail.Marks = "";
                            studentDetail.Inwords = "";
                        }
                        else if (studentDetail.Marks == "0") {
                            if (studentDetail.Marks.toString().length == 1) {
                                studentDetail.Marks = "0" + studentDetail.Marks;
                            }
                            studentDetail.Inwords = "Zero";
                        }
                        else if (studentDetail.Marks > 0) {
                            studentDetail.Inwords = toWords(parseInt(studentDetail.Marks));
                            if (studentDetail.Marks.toString().length == 1) {
                                studentDetail.Marks = "0" + studentDetail.Marks;
                            }
                            else if (studentDetail.Marks.toString().length > 2) {
                                if (studentDetail.Marks.charAt(0) == "0") {
                                    studentDetail.Marks = studentDetail.Marks.slice(1);
                                } else {
                                    studentDetail.Marks = studentDetail.Marks.slice(0, -1);
                                }
                            }
                        } else if (parseInt(studentDetail.Marks) == 0 && studentDetail.Marks.toString().length > 2) {
                            studentDetail.Marks = studentDetail.Marks.slice(0, -1);
                        }
                        $scope.gettotalMarks();
                    }
                }

                $scope.ThMarksChange = function (studentDetail) {
                    if (!ProcRegex.test(studentDetail.Marks)) {
                        if (isNaN(studentDetail.Marks)) {
                            studentDetail.Marks = studentDetail.Marks.slice(0, -1);
                        }
                        else {
                            $scope.GetCheckMarks(studentDetail);
                            //studentDetail.Inwords = studentDetail.Marks == "A" ? "Absent" : studentDetail.Marks == "AM" ? "Already Malpractice" : studentDetail.Marks == "M" ? "Malpractice" : studentDetail.Marks == "N" ? "Not Applicable" : "";
                            // studentDetail.Inwords = toWords(studentDetail.Marks);
                            //$scope.gettotalMarks(studentDetail);
                        }
                    }
                    else if (isNaN(studentDetail.Marks)) {
                        if (/\d/.test(studentDetail.Marks)) {
                            studentDetail.Marks = studentDetail.Marks.slice(0, -1);
                            return;
                        } else {
                            if (studentDetail.Marks.toString().length == 2) {
                                if ((studentDetail.Marks == 'AM') || (studentDetail.Marks == 'am') || (studentDetail.Marks == 'Am')) {
                                } else {
                                    alert("Wrong Characters");
                                    studentDetail.Marks = studentDetail.Marks.slice(0, -1);
                                    return;
                                }
                            }
                            $scope.GetCheckMarks(studentDetail);
                        }
                    } else {
                        $scope.GetCheckMarks(studentDetail);
                    }
                    //if (studentDetail.Marks != "") {
                    //    if (studentDetail.Marks < studentDetail.MaxMarks) {
                    //        alert("Please enter marks less than " + studentDetail.MaxMarks + " for HTNo " + studentDetail.HTNO);
                    //        studentDetail.Marks = studentDetail.Marks.slice(0, -1);
                    //        return;
                    //    }
                    //}
                }
                var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
                var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
                var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
                var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
                function toWords(s) {
                    s = s.toString();
                    s = s.replace(/[\, ]/g, '');
                    if (s != parseFloat(s)) return 'not a number';
                    var x = s.indexOf('.');
                    if (x == -1) x = s.length;
                    if (x > 15) return 'too big';
                    var n = s.split('');
                    var str = '';
                    var sk = 0;
                    for (var i = 0; i < x; i++) {
                        if ((x - i) % 3 == 2) {
                            if (n[i] == '1') {
                                str += tn[Number(n[i + 1])] + ' ';
                                i++;
                                sk = 1;
                            }
                            else if (n[i] != 0) {
                                str += tw[n[i] - 2] + ' ';
                                sk = 1;
                            }
                        }
                        else if (n[i] != 0) {
                            str += dg[n[i]] + ' ';
                            if ((x - i) % 3 == 0) str += 'Hundred ';
                            sk = 1;
                        }


                        if ((x - i) % 3 == 1) {
                            if (sk) str += th[(x - i - 1) / 3] + ' ';
                            sk = 0;
                        }
                    }
                    if (x != s.length) {
                        var y = s.length;
                        str += 'point ';
                        for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
                    }
                    return str.replace(/\s+/g, ' ');
                }
                $scope.printDiv = function (divName) {
                    var printContents = document.getElementById(divName).innerHTML;
                    var originalContents = document.body.innerHTML;
                    document.body.innerHTML = printContents;
                    var mywindow = window.open('', 'PRINT', 'height=400,width=600');
                    mywindow.print();
                    document.body.innerHTML = originalContents;
                    $state.go('PreExam.practicalDetailEntryCollegeGeo');
                }
                $scope.postpracticalEntryCancel = function (divName) {
                    $state.go('PreExam');
                }
                $scope.printAcknowlegement = function () {
                    $scope.practicalEntryDetailCollege.Prdate = $("#Prdate").val();
                    $state.go('PreExam.GeographyPracticalAwardListAcknowledgement', { PrePractCntrID: $scope.practicalEntryDetailCollege.PrePractCntrID, ExmSubID: $scope.practicalEntryDetailCollege.ExmSubID, BatchNo: $scope.practicalEntryDetailCollege.BatchNo, ExamID: $scope.practicalEntryDetailCollege.ExamID, PrDate: $scope.practicalEntryDetailCollege.Prdate });
                }
                $scope.ackprintshow = false;
            });
}());