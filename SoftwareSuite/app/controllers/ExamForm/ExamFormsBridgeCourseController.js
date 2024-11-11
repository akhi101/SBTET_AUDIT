define(['app'], function (app) {
    app.controller("ExamFormsBridgeCourseController", function ($scope, $state, $stateParams, AppSettings, ExamFormsBridgeCourseService, BasicCourseService, BasicBranchService, BasicMainGroupService, BasicExamService) {
        $scope.ExamFormsBridgeCourse = { ExmFrmID: $stateParams.ExmFrmID, CourseID: $stateParams.CourseID, CollegeID: $stateParams.CollegeID, ExamID: $stateParams.ExamID, BranchID: $stateParams.BranchID };
        var CourseID = $stateParams.CourseID;
        var ExamID = $stateParams.ExamID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExamFormsBridgeCourseRightsdata = [];
        ExamFormsBridgeCourseRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormsBridgeCourseRightsdata.length; i++) {
            if (ExamFormsBridgeCourseRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormsBridgeCourse.ExmFrmID == 0) {
                    if (ExamFormsBridgeCourseRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormsBridgeCourseRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormsBridgeCourseRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.Updateddisable = false;
        var InsScheduleList = ExamFormsBridgeCourseService.GetCurrExmInstSchedule(AppSettings.ExamInstID, $scope.ExamFormsBridgeCourse.ExamID);
        InsScheduleList.then(function (Instdata, status, headers, config, error) {
            if (Instdata == 0) {
                alert("Exam Instance Shedule not found current instance");
                RedirectToListPage("ExamForm.ExamFormsBridgeCourseList");
            }
        }, function (Instdata, status, headers, config) {
            alert(error);
        });
        var InsScheduleList = ExamFormsBridgeCourseService.GetInstScheduleDate(AppSettings.ExamInstID);
        InsScheduleList.then(function (Instschdate, status, headers, config, error) {
            if (Instschdate == 0) {
                alert("Exam Instance schedule not open for current instance");
                RedirectToListPage("ExamForm.ExamFormsBridgeCourseList");
            }
        }, function (Instdata, status, headers, config) {
            alert(error);
        });
        var StudList = ExamFormsBridgeCourseService.GetStudCatList();
        StudList.then(function (StudCatdata, status, headers, config, error) {
            $scope.StudCatList = StudCatdata;
            for (var i = 0; i < $scope.StudCatList.length; i++) {
                if ($scope.StudCatList[i].StudCatID == 1) {
                    $scope.ExamFormsBridgeCourse.StudCatName = $scope.StudCatList[i].StudCatName;
                    $scope.ExamFormsBridgeCourse.StudCatID = $scope.StudCatList[i].StudCatID;
                }
            }
        }, function (StudCatdata, status, headers, config) {
            alert(error);
        });
        if ($scope.ExamFormsBridgeCourse.ExmFrmID == 0) {
            var FormNo = ExamFormsBridgeCourseService.GetExmFrmMaxNo(AppSettings.ExamInstID, $scope.ExamFormsBridgeCourse.CollegeID);
            FormNo.then(function (data) {
                $scope.ExamFormsBridgeCourse.Formno = data;
                var PhysDisbList = ExamFormsBridgeCourseService.GetPhysDisbList();
                PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                    $scope.PhysDisbList = PhysDisbListdata;
                    var SpclConsList = ExamFormsBridgeCourseService.GetSpclConsList();
                    SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                        $scope.SpclConsList = SpclConsListdata;
                        var MainGroupList = ExamFormsBridgeCourseService.GetMainGroupListByCollegeId($scope.ExamFormsBridgeCourse.CollegeID, $scope.ExamFormsBridgeCourse.CourseID, AppSettings.AcdYrID);
                        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                            $scope.MainGroupList = MainGroupListdata;
                            var MedList = ExamFormsBridgeCourseService.GetBasicMediumList();
                            MedList.then(function (Mediumdata, status, headers, config, error) {
                                $scope.MediumList = Mediumdata;
                                var CourseList = BasicCourseService.GetBasicCourseList();
                                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                                    $scope.CourseList = BasicCoursedata;
                                    for (var i = 0; i < $scope.CourseList.length; i++) {
                                        if ($scope.CourseList[i].CourseID == $stateParams.CourseID) {
                                            $scope.ExamFormsBridgeCourse.CourseName = $scope.CourseList[i].CourseName;
                                            $scope.ExamFormsBridgeCourse.CourseID = $scope.CourseList[i].CourseID;
                                        }
                                    }
                                    var ExamList = BasicExamService.GetBasicExamList(0);
                                    ExamList.then(function (Examdata, status, headers, config, error) {
                                        $scope.ExamList = Examdata;
                                        for (var i = 0; i < $scope.ExamList.length; i++) {
                                            if ($scope.ExamList[i].ExamID == $stateParams.ExamID) {
                                                $scope.ExamFormsBridgeCourse.ExmName = $scope.ExamList[i].ExmName;
                                                $scope.ExamFormsBridgeCourse.ExamID = $scope.ExamList[i].ExamID;
                                            }
                                        }
                                        var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                                        BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                                            $scope.BasicBranchList = BasicBranchdata;
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == $stateParams.BranchID) {
                                                    $scope.ExamFormsBridgeCourse.BranchName = $scope.BasicBranchList[i].BranchName;
                                                    $scope.ExamFormsBridgeCourse.BranchID = $scope.BasicBranchList[i].BranchID;
                                                }
                                            }
                                        }, function (BasicBranchdata, status, headers, config) {
                                            alert(error);
                                        });
                                    }, function (BasicCoursedata, status, headers, config) {
                                        alert(error);
                                    });
                                }, function (BasicCoursedata, status, headers, config) {
                                    alert(error);
                                });
                            }, function (error) {
                                alert(error);
                            });
                        }, function (error) {
                            alert(error);
                        });
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        } else {
            var MainGroupList = ExamFormsBridgeCourseService.GetMainGroupListByCollegeId($scope.ExamFormsBridgeCourse.CollegeID, $scope.ExamFormsBridgeCourse.CourseID, AppSettings.AcdYrID);
            MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                $scope.MainGroupList = MainGroupListdata;
                var MedList = ExamFormsBridgeCourseService.GetBasicMediumList();
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;
                    var CourseList = BasicCourseService.GetBasicCourseList();
                    CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                        $scope.CourseList = BasicCoursedata;
                        var ExamList = BasicExamService.GetBasicExamList(0);
                        ExamList.then(function (Examdata, status, headers, config, error) {
                            $scope.ExamList = Examdata;
                            var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                            BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                                $scope.BasicBranchList = BasicBranchdata;
                                var PhysDisbList = ExamFormsBridgeCourseService.GetPhysDisbList();
                                PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                                    $scope.PhysDisbList = PhysDisbListdata;
                                    var SpclConsList = ExamFormsBridgeCourseService.GetSpclConsList();
                                    SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                                        $scope.SpclConsList = SpclConsListdata;
                                        var ExamListdata = ExamFormsBridgeCourseService.GetExamFormsBridgeCourseById($scope.ExamFormsBridgeCourse.ExmFrmID);
                                        ExamListdata.then(function (data, status, headers, config, error) {
                                            $scope.ExamFormsBridgeCourse = data[0];
                                            for (var i = 0; i < $scope.CourseList.length; i++) {
                                                if ($scope.CourseList[i].CourseID == data[0].CourseID) {
                                                    $scope.ExamFormsBridgeCourse.CourseName = $scope.CourseList[i].CourseName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.ExamList.length; i++) {
                                                if ($scope.ExamList[i].ExamID == data[0].ExamID) {
                                                    $scope.ExamFormsBridgeCourse.ExmName = $scope.ExamList[i].ExmName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == data[0].BranchID) {
                                                    $scope.ExamFormsBridgeCourse.BranchName = $scope.BasicBranchList[i].BranchName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                if ($scope.StudCatList[i].StudCatID == 1) {
                                                    $scope.ExamFormsBridgeCourse.StudCatName = $scope.StudCatList[i].StudCatName;
                                                    $scope.ExamFormsBridgeCourse.StudCatID = $scope.StudCatList[i].StudCatID;
                                                }
                                            }
                                            

                                            //if ($scope.ExamFormsBridgeCourse.StudCatID = 1) {   // main data
                                            //    $scope.ExamFormsBridgeCourse.StudCatID = "R";
                                            //} else if ($scope.ExamFormsBridgeCourse.StudCatID = 2) {
                                            //    $scope.ExamFormsBridgeCourse.StudCatID = "P";
                                            //} else if ($scope.ExamFormsBridgeCourse.StudCatID = 3) {
                                            //    $scope.ExamFormsBridgeCourse.StudCatID = "E";
                                            //}
                                            for (var i = 0; i < data[0].ExamFormsSubject.length; i++) {
                                                data[0].ExamFormsSubject[i].CheckSub = true;
                                            }
                                            $scope.ExamFormsBridgeCourse.LateFees = $scope.LateFeesCurrent;
                                            $scope.ExamFormsBridgeCourse.FormFees = $scope.ExamFormsBridgeCourse.RegularFees + $scope.ExamFormsBridgeCourse.LateFees;
                                            $scope.Subjectdata = data[0].ExamFormsSubject;
                                            $scope.editmodecheck = true;
                                            $scope.Updateddisable = true;
                                        }, function (error) {
                                            alert(error);
                                        });
                                    }, function (BasicBranchdata, status, headers, config) {
                                        alert(error);
                                    });
                                }, function (BasicCoursedata, status, headers, config) {
                                    alert(error);
                                });
                            }, function (BasicCoursedata, status, headers, config) {
                                alert(error);
                            });
                        }, function (error) {
                            alert(error);
                        });
                    }, function (error) {
                        alert(error);
                    });
                }, function (BasicCoursedata, status, headers, config) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        var LateFeesAdditional = ExamFormsBridgeCourseService.GetAcademicYearFeesByDateForBridge(AppSettings.ExamInstID, $scope.ExamFormsBridgeCourse.ExamID);
        LateFeesAdditional.then(function (data, status, headers, config, error) {
            $scope.ExamFormsBridgeCourse.LateFees = data;
            $scope.LateFeesCurrent = data;
            var ExamFormFees = ExamFormsBridgeCourseService.GetBridgeExamFormFees(AppSettings.ExamInstID, $scope.ExamFormsBridgeCourse.ExamID);
            ExamFormFees.then(function (data, status, headers, config, error) {
                $scope.ExamFormsBridgeCourse.BridgeTheroyFee = data[0].BridgeTheroyFee;
                $scope.ExamFormsBridgeCourse.BridgePractFee = data[0].BridgePractFee;
                $scope.BridgeTheroyFee = data[0].BridgeTheroyFee;
                $scope.BridgePractFee = data[0].BridgePractFee;
                $scope.ExamFormsBridgeCourse.ExamFeesID = data[0].ExamFeesID;
                if ($scope.ExamFormsBridgeCourse.LateFees == undefined) { $scope.ExamFormsBridgeCourse.LateFees = 0; }
                if ($scope.ExamFormsBridgeCourse.RegularFees == undefined) { $scope.ExamFormsBridgeCourse.RegularFees = 0; }
                $scope.ExamFormsBridgeCourse.FormFees = $scope.ExamFormsBridgeCourse.RegularFees + $scope.ExamFormsBridgeCourse.LateFees;
            }, function (Instdata, status, headers, config) {
                alert(error);
            });
        }, function (Instdata, status, headers, config) {
            alert(error);
        });
        $scope.GetMigrationData = function () {
            var ExamFormList = ExamFormsBridgeCourseService.GetSSCHallTicketNoAndInsertIntoPrestudent($scope.ExamFormsBridgeCourse.PRNNo);
            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                if (ExamFormdata == 0) {
                    $scope.FillMigrationData();
                }
                else if (ExamFormdata == 1) {
                    alert("You are not eligible for admission ..(MalPractice) ");
                    $scope.Updateddisable = false;
                    return;
                } else {
                    alert("Some data mismatch, please contact Help Desk.");
                    $scope.Updateddisable = false;
                    return;
                }
            }, function (ExamFormdata, status, headers, config, error) {
                $scope.Updateddisable = false;
                alert("Some data mismatch, please contact Help Desk.");
            });
        }
        $scope.FillMigrationData = function () {
            var studResultList = ExamFormsBridgeCourseService.GetcheckstudPassOrNot($scope.ExamFormsBridgeCourse.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsBridgeCourse.CollegeID, $scope.ExamFormsBridgeCourse.CourseID, $scope.ExamFormsBridgeCourse.ExamID, $scope.ExamFormsBridgeCourse.BranchID);
            studResultList.then(function (data, status, headers, config, error) {
                if ((data == "P") && ($scope.ExamFormsBridgeCourse.CourseID == 1)) {
                    alert("This student is not eligible for Bridge Course");
                    $scope.Updateddisable = false;
                    return;
                } else {
                    var ExamFormList = ExamFormsBridgeCourseService.GetExamFormDataByPrnNoForBridgeCourse($scope.ExamFormsBridgeCourse.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsBridgeCourse.CollegeID, $scope.ExamFormsBridgeCourse.CourseID, $scope.ExamFormsBridgeCourse.ExamID, $scope.ExamFormsBridgeCourse.BranchID);
                    ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                        if (ExamFormdata.length == 0) {
                            alert("Data not found for this PRN No.");
                            $scope.ExamFormsBridgeCourse.StudName = "";
                            $scope.ExamFormsBridgeCourse.Gender = "";
                            $scope.ExamFormsBridgeCourse.MainGrpID = "";
                            $scope.ExamFormsBridgeCourse.PreStudRegID = "";
                            $scope.ExamFormsBridgeCourse.MediumID = "";
                            $scope.ExamFormsBridgeCourse.SubName = "";
                            $scope.ExamFormsBridgeCourse.SecondLangID = "";
                            $scope.Subjectdata = [];
                            $scope.Updateddisable = false;
                            return;
                        } else {
                            $scope.ExamFormsBridgeCourse.StudName = ExamFormdata[0].StudName;
                            $scope.ExamFormsBridgeCourse.Gender = ExamFormdata[0].Gender;
                            $scope.ExamFormsBridgeCourse.MainGrpID = ExamFormdata[0].MainGrpID;
                            $scope.ExamFormsBridgeCourse.PreStudRegID = ExamFormdata[0].PreStudRegID;
                            $scope.ExamFormsBridgeCourse.MediumID = ExamFormdata[0].MediumID;
                            $scope.ExamFormsBridgeCourse.SubName = ExamFormdata[0].SubName;
                            $scope.ExamFormsBridgeCourse.SecondLangID = ExamFormdata[0].SecondLangID;
                            //var thoeryfess = 0; var practfees = 0;
                            //for (var i = 0; i < ExamFormdata[0].ExamFormsSubject.length; i++) {
                            //    ExamFormdata[0].ExamFormsSubject[i].CheckSub = true;
                            //    if (ExamFormdata[0].ExamFormsSubject[i].EvalTypeID == 1) {
                            //        thoeryfess = thoeryfess + $scope.ExamFormsBridgeCourse.BridgeTheroyFee;
                            //    } else {
                            //        practfees = practfees + $scope.ExamFormsBridgeCourse.BridgeTheroyFee;
                            //    }
                            //}
                            //$scope.ExamFormsBridgeCourse.RegularFees = practfees + thoeryfess;
                            //$scope.ExamFormsBridgeCourse.FormFees = $scope.ExamFormsBridgeCourse.RegularFees + $scope.ExamFormsBridgeCourse.LateFees;
                            //$scope.ExamFormsBridgeCourse.BridgeCourseFees = $scope.ExamFormsBridgeCourse.FormFees;
                            $scope.ExamFormsBridgeCourse.RegularFees = ExamFormdata[0].RegularFees;
                            $scope.ExamFormsBridgeCourse.LateFees = ExamFormdata[0].LateFees;
                            $scope.ExamFormsBridgeCourse.FormFees = $scope.ExamFormsBridgeCourse.RegularFees + $scope.ExamFormsBridgeCourse.LateFees;

                            $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
                            for (var i = 0; i < $scope.Subjectdata.length; i++) {
                                $scope.Subjectdata[i].CheckSub = true;
                                $scope.Subjectdata[i].SubDisable = true;
                            }
                            $scope.Updateddisable = false;
                        }
                    }, function (ExamFormdata, status, headers, config) {
                        alert(error);
                        $scope.Updateddisable = false;
                    });
                }
            }, function (ExamFormdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.ShowPRNData = function () { //GetExamFormData
            if ($scope.ExamFormsBridgeCourse.PRNNo == "" || $scope.ExamFormsBridgeCourse.PRNNo == undefined) {
                alert("Enter PRN No./HTNo");
                return;
            }
            var strprn = "";
            strprn = parseInt($scope.ExamFormsBridgeCourse.PRNNo.substring(0, 2));
            if (strprn >= 18) {
                alert("This student is not eligible for Bridge Course");
                return;
            }
            $scope.Updateddisable = true;
            if ($("#ApplicationDate").val() != "") { $scope.ExamFormsBridgeCourse.ApplicationDate = $("#ApplicationDate").val(); }
            var getPromise = ExamFormsBridgeCourseService.GetCheckPRNNoPresent($scope.ExamFormsBridgeCourse.PRNNo, AppSettings.ExamInstID, "B");
            getPromise.then(function (data) {
                if (data != 0) {
                    alert("Exam form is already generated agains this PRNNo.");
                    $scope.Updateddisable = false;
                    return;
                } else {
                    var ExPRNCountList = ExamFormsBridgeCourseService.GetPrnNoCountInPrestudentReg($scope.ExamFormsBridgeCourse.PRNNo);
                    ExPRNCountList.then(function (data, status, headers, config, error) {
                        if (data == 0) {
                            //$scope.GetMigrationData();
                            alert("Please Fill up the Regular Exam Form then apply for Bridge Course.");
                            $scope.Updateddisable = false;
                            return;
                        } else {
                            var UnStudCaseList = ExamFormsBridgeCourseService.GetCheckUnStudCase($scope.ExamFormsBridgeCourse.PRNNo, $scope.ExamFormsBridgeCourse.ApplicationDate, AppSettings.ExamInstID);
                            UnStudCaseList.then(function (data, status, headers, config, error) {
                                if (data[0].UnStudCase == 1) {
                                    alert("This student is Debarred up to date " + data[0].UpToDateDesc + "");
                                    $scope.Updateddisable = false;
                                    return;
                                } else {
                                    var studResultList = ExamFormsBridgeCourseService.GetcheckstudPassOrNot($scope.ExamFormsBridgeCourse.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsBridgeCourse.CollegeID, $scope.ExamFormsBridgeCourse.CourseID, $scope.ExamFormsBridgeCourse.ExamID, $scope.ExamFormsBridgeCourse.BranchID);
                                    studResultList.then(function (data, status, headers, config, error) {
                                        if ((data == "P") && ($scope.ExamFormsBridgeCourse.CourseID == 1)) {
                                            alert("This student is not eligible for Bridge Course");
                                            $scope.Updateddisable = false;
                                            return;
                                        } else {
                                            var ExamFormList = ExamFormsBridgeCourseService.GetExmFormCntForBridgeCourse($scope.ExamFormsBridgeCourse.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsBridgeCourse.ExamID);
                                            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                                                if (ExamFormdata != 0) {
                                                    $scope.ExamFormsBridgeCourse.ExmFrmID = ExamFormdata;
                                                    var ExamFormList = ExamFormsBridgeCourseService.GetExamFormDataByPrnNoForBridgeCourse($scope.ExamFormsBridgeCourse.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsBridgeCourse.CollegeID, $scope.ExamFormsBridgeCourse.CourseID, $scope.ExamFormsBridgeCourse.ExamID, $scope.ExamFormsBridgeCourse.BranchID);
                                                    ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                                                        if (ExamFormdata.length == 0) {
                                                            ExamFormdata = [];
                                                            alert("Data not found for this PRN No./HTNo");
                                                            $scope.ExamFormsBridgeCourse.StudName = "";
                                                            $scope.ExamFormsBridgeCourse.Gender = "";
                                                            $scope.ExamFormsBridgeCourse.MainGrpID = "";
                                                            $scope.ExamFormsBridgeCourse.PreStudRegID = "";
                                                            $scope.ExamFormsBridgeCourse.MediumID = "";
                                                            $scope.ExamFormsBridgeCourse.SubName = "";
                                                            $scope.ExamFormsBridgeCourse.SecondLangID = "";
                                                            $scope.Subjectdata = [];
                                                            $scope.Updateddisable = false;
                                                            return;
                                                        }
                                                        else {
                                                            if (ExamFormdata[0].BridgeAppFlag == "N") {
                                                                alert("This student are not applicable for bridge course");
                                                                $scope.Updateddisable = false;
                                                                return;
                                                            } else {
                                                                $scope.ExamFormsBridgeCourse.StudName = ExamFormdata[0].StudName;
                                                                $scope.ExamFormsBridgeCourse.Gender = ExamFormdata[0].Gender;
                                                                $scope.ExamFormsBridgeCourse.MainGrpID = ExamFormdata[0].MainGrpID;
                                                                $scope.ExamFormsBridgeCourse.PreStudRegID = ExamFormdata[0].PreStudRegID;
                                                                $scope.ExamFormsBridgeCourse.MediumID = ExamFormdata[0].MediumID;
                                                                $scope.ExamFormsBridgeCourse.SubName = ExamFormdata[0].SubName;
                                                                $scope.ExamFormsBridgeCourse.SecondLangID = ExamFormdata[0].SecondLangID;
                                                                $scope.Updateddisable = false;
                                                                //var thoeryfess = 0; var practfees = 0;
                                                                //for (var i = 0; i < ExamFormdata[0].ExamFormsSubject.length; i++) {
                                                                //    ExamFormdata[0].ExamFormsSubject[i].CheckSub = true;
                                                                //    if (ExamFormdata[0].ExamFormsSubject[i].EvalTypeID == 1) {
                                                                //        thoeryfess = thoeryfess + $scope.ExamFormsBridgeCourse.BridgeTheroyFee;
                                                                //    } else {
                                                                //        practfees = practfees + $scope.ExamFormsBridgeCourse.BridgeTheroyFee;
                                                                //    }
                                                                //}
                                                                //$scope.ExamFormsBridgeCourse.RegularFees = practfees + thoeryfess;
                                                                //$scope.ExamFormsBridgeCourse.FormFees = $scope.ExamFormsBridgeCourse.RegularFees + $scope.ExamFormsBridgeCourse.LateFees;
                                                                //$scope.ExamFormsBridgeCourse.BridgeCourseFees = $scope.ExamFormsBridgeCourse.FormFees;
                                                                $scope.ExamFormsBridgeCourse.RegularFees = ExamFormdata[0].RegularFees;
                                                                $scope.ExamFormsBridgeCourse.LateFees = ExamFormdata[0].LateFees;
                                                                $scope.ExamFormsBridgeCourse.FormFees = $scope.ExamFormsBridgeCourse.RegularFees + $scope.ExamFormsBridgeCourse.LateFees;
                                                                $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
                                                                for (var i = 0; i < $scope.Subjectdata.length; i++) {
                                                                    $scope.Subjectdata[i].CheckSub = true;
                                                                    $scope.Subjectdata[i].SubDisable = true;
                                                                }

                                                            }
                                                        }
                                                    }, function (ExamFormdata, status, headers, config) {
                                                        alert(error);
                                                        $scope.Updateddisable = false;
                                                    });
                                                } else {
                                                    alert("This student is not eligible for Bridge Course");
                                                    $scope.Updateddisable = false;
                                                    return;
                                                }
                                            }, function (ExamFormdata, status, headers, config) {
                                                $scope.Updateddisable = false;
                                                alert(error);
                                            });
                                        }
                                    }, function (ExamFormdata, status, headers, config) {
                                        alert(error);
                                    });
                                    //old
                                }
                            }, function (ExamFormdata, status, headers, config) {
                                $scope.Updateddisable = false;
                                alert(error);
                            });
                        }
                    }, function (data, status, headers, config) {
                        $scope.Updateddisable = false;
                        alert(error);
                    });
                }
            }, function (error) {
                $scope.Updateddisable = false;
                alert(error);
            });
        }
        $("#ApplicationDate").ejDatePicker({ value: new Date(), allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#ApplicationDate").ejDatePicker("disable");
        $scope.ExamFormsBridgeCourse.ImprovementFlag = "N";
        $scope.ExamFormsBridgeCourse.AddSubFlag = "N";
        $scope.ExamFormsBridgeCourse.BridgeCourseFlag = "Y";
        $scope.ExamFormsBridgeCourse.StudType = "F";
        $scope.ExamFormsBridgeCourse.Handicaped = "N";
        $scope.Subjectdata = [];
        $scope.SaveExamFormsBridgeCourse = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                if ($("#ApplicationDate").val() != "") { $scope.ExamFormsBridgeCourse.ApplicationDate = $("#ApplicationDate").val(); }
                $scope.ExamFormsBridgeCourse.ExamFormsSubject = $scope.Subjectdata;
                $scope.ExamFormsBridgeCourse.CreLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsBridgeCourse.UpdLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsBridgeCourse.AcdYrID = AppSettings.AcdYrID;
                $scope.ExamFormsBridgeCourse.ExamInstID = AppSettings.ExamInstID;
                $scope.ExamFormsBridgeCourse.BridgeCourseFlag = "Y";
                var examsubs = [];
                for (var i = 0; i < $scope.Subjectdata.length; i++) {
                    if ($scope.Subjectdata[i].CheckSub == true) {
                        var obj = {};
                        obj.ExmSubID = $scope.Subjectdata[i].ExmSubID;
                        obj.EvalTypeID = $scope.Subjectdata[i].EvalTypeID;
                        obj.ExmSubCode = $scope.Subjectdata[i].ExmSubCode;
                        obj.ExmSubName = $scope.Subjectdata[i].ExmSubName;
                        obj.SubTyp = $scope.Subjectdata[i].SubTyp;
                        obj.GrpSeqNo = $scope.Subjectdata[i].GrpSeqNo;
                        obj.ExamID = $scope.Subjectdata[i].ExamID;
                        examsubs.push(obj);
                    }
                }
                $scope.ExamFormsBridgeCourse.ExamFormsSubject = examsubs;
                if (($scope.ExamFormsBridgeCourse.ExmFrmID == undefined) || ($scope.ExamFormsBridgeCourse.ExmFrmID == "")) { $scope.ExamFormsBridgeCourse.ExmFrmID = 0; }
                if ($scope.ExamFormsBridgeCourse.ExmFrmID == 0) {
                    //var getPromise = ExamFormsBridgeCourseService.GetCheckPRNNoPresent($scope.ExamFormsBridgeCourse.PreStudRegID, $scope.ExamFormsBridgeCourse.AcdYrID);
                    //getPromise.then(function (data) {
                    //    if (data != 0) {
                    //        alert("Exam form is already generated agains this PRNNo.");
                    //        $scope.isupdatableDisable = false;
                    //        return;
                    //    } else {
                    //var getPromise = ExamFormsBridgeCourseService.AddExamFormsBridgeCourse($scope.ExamFormsBridgeCourse);
                    //getPromise.then(function (msg) {
                    //    $scope.isupdatableDisable = false;
                    //    alert("Saved successfully!!");
                    //    $scope.ExamFormsBridgeCourse.StudName = "";
                    //    $scope.ExamFormsBridgeCourse.Gender = "";
                    //    $scope.ExamFormsBridgeCourse.MainGrpID = "";
                    //    $scope.ExamFormsBridgeCourse.PreStudRegID = "";
                    //    $scope.ExamFormsBridgeCourse.PRNNo = "";
                    //    $scope.ExamFormsBridgeCourse.FormFees = "";
                    //    $scope.Subjectdata = [];
                    //}, function (error) {
                    //    $scope.isupdatableDisable = false;
                    //    alert(error);
                    //});
                    //    }
                    //}, function (error) {
                    //    $scope.isupdatableDisable = false;
                    //    alert(error);
                    //});
                }
                else {
                    var getPromise = ExamFormsBridgeCourseService.PostBridgeCourseGenerateIndiviual($scope.ExamFormsBridgeCourse);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Updated successfully!!");
                        $scope.ExamFormsBridgeCourse.StudName = "";
                        $scope.ExamFormsBridgeCourse.Gender = "";
                        $scope.ExamFormsBridgeCourse.MainGrpID = "";
                        $scope.ExamFormsBridgeCourse.PreStudRegID = "";
                        $scope.ExamFormsBridgeCourse.PRNNo = "";
                        $scope.ExamFormsBridgeCourse.FormFees = "";
                        $scope.Subjectdata = [];
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteExamFormsBridgeCourse = function () {
            var getData = ExamFormsBridgeCourseService.DeleteExamFormsBridgeCourse($scope.ExamFormsBridgeCourse.ExmFrmID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.ExamFormsBridgeCourse.PRNNo == undefined) || ($scope.ExamFormsBridgeCourse.PRNNo == "")) {
                alert("Enter PRN No.");
                return false;
            }
            if (($scope.ExamFormsBridgeCourse.StudName == undefined) || ($scope.ExamFormsBridgeCourse.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsBridgeCourse.CollegeID == undefined) || ($scope.ExamFormsBridgeCourse.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsBridgeCourse.MainGrpID == undefined) || ($scope.ExamFormsBridgeCourse.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamFormsBridgeCourse.Formno == undefined) || ($scope.ExamFormsBridgeCourse.Formno == "")) {
                alert("Enter Form no");
                return false;
            }
            if (($scope.ExamFormsBridgeCourse.FormFees == undefined) || ($scope.ExamFormsBridgeCourse.FormFees == "")) {
                alert("Enter Form Fees");
                return false;
            }
            if ($scope.ExamFormsBridgeCourse.Handicaped == 'Y') {
                if (($scope.ExamFormsBridgeCourse.PhysDisbID == 0) || ($scope.ExamFormsBridgeCourse.PhysDisbID == 1)) {
                    alert("Select Physical Disability");
                    return false;
                }
                if ($scope.ExamFormsBridgeCourse.PhysDisbID > 1) {
                    if (($scope.ExamFormsBridgeCourse.PhysDisbPer == undefined) || ($scope.ExamFormsBridgeCourse.PhysDisbPer == "") || ($scope.ExamFormsBridgeCourse.PhysDisbPer == 0)) {
                        alert("Enter Disability %.");
                        return false;
                    }
                }
                if ($scope.ExamFormsBridgeCourse.PhysDisbID == 2) {
                    if ($scope.ExamFormsBridgeCourse.PhysDisbPer < 40) {
                        alert("Enter Disability % must be greater than or equal to 40, if you are blind condidate.");
                        return false;
                    }
                    if ($scope.ExamFormsBridgeCourse.BranchID == 2) {
                        alert("Blind condidate can't take science group");
                        return false;
                    }
                }
            }
            if ($scope.Subjectdata.length == 0) {
                alert("No any subject selected");
                return false;
            }
            var checsub = false;
            for (var i = 0; i < $scope.Subjectdata.length; i++) {
                if ($scope.Subjectdata[i].CheckSub == true) {
                    checsub = true;
                }
            }
            if (checsub == false) {
                alert("No any subject selected");
                return false;
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
            $state.go('Exam.ExamFormsBridgeCourseList');
        }
        $scope.GetCheckSubject = function (obj) {
            var thoeryfess = 0; var practfees = 0;
            for (var i = 0; i < $scope.Subjectdata.length; i++) {
                if ($scope.Subjectdata[i].CheckSub == true) {
                    if ($scope.Subjectdata[i].EvalTypeID == 1) {
                        thoeryfess = thoeryfess + $scope.BridgeTheroyFee;
                    } else {
                        practfees = practfees + $scope.BridgeTheroyFee;
                    }
                }
            }
            $scope.ExamFormsBridgeCourse.RegularFees = practfees + thoeryfess;
            $scope.ExamFormsBridgeCourse.FormFees = $scope.ExamFormsBridgeCourse.RegularFees + $scope.ExamFormsBridgeCourse.LateFees;
        }
        $scope.editmodecheck = false;
    });
});
