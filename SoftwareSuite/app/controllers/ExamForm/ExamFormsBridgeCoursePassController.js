define(['app'], function (app) {
    app.controller("ExamFormsBridgeCoursePassController", function ($scope, $state, $stateParams, AppSettings, ExamFormsBridgeCoursePassService, BasicCourseService, BasicBranchService, BasicMainGroupService, BasicExamService) {
        $scope.ExamFormsBridgeCoursePass = { ExmFrmID: $stateParams.ExmFrmID, CourseID: $stateParams.CourseID, CollegeID: $stateParams.CollegeID, ExamID: $stateParams.ExamID, BranchID: $stateParams.BranchID };
        var CourseID = $stateParams.CourseID;
        var ExamID = $stateParams.ExamID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExamFormsBridgeCoursePassRightsdata = [];
        ExamFormsBridgeCoursePassRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormsBridgeCoursePassRightsdata.length; i++) {
            if (ExamFormsBridgeCoursePassRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormsBridgeCoursePass.ExmFrmID == 0) {
                    if (ExamFormsBridgeCoursePassRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormsBridgeCoursePassRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormsBridgeCoursePassRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.Updateddisable = false;
        var InsScheduleList = ExamFormsBridgeCoursePassService.GetCurrExmInstSchedule(AppSettings.ExamInstID, $scope.ExamFormsBridgeCoursePass.ExamID);
        InsScheduleList.then(function (Instdata, status, headers, config, error) {
            if (Instdata == 0) {
                alert("Exam Instance Shedule not found current instance");
                RedirectToListPage("ExamForm.ExamFormsBridgeCoursePassList");
            }
        }, function (Instdata, status, headers, config) {
            alert(error);
        });
        var InsScheduleList = ExamFormsBridgeCoursePassService.GetInstScheduleDate(AppSettings.ExamInstID);
        InsScheduleList.then(function (Instschdate, status, headers, config, error) {
            if (Instschdate == 0) {
                alert("Exam Instance schedule not open for current instance");
                RedirectToListPage("ExamForm.ExamFormsBridgeCoursePassList");
            }
        }, function (Instdata, status, headers, config) {
            alert(error);
        });
        var StudList = ExamFormsBridgeCoursePassService.GetStudCatList();
        StudList.then(function (StudCatdata, status, headers, config, error) {
            $scope.StudCatList = StudCatdata;
            for (var i = 0; i < $scope.StudCatList.length; i++) {
                if ($scope.StudCatList[i].StudCatID == 1) {
                    $scope.ExamFormsBridgeCoursePass.StudCatName = $scope.StudCatList[i].StudCatName;
                    $scope.ExamFormsBridgeCoursePass.StudCatID = $scope.StudCatList[i].StudCatID;
                }
            }
        }, function (StudCatdata, status, headers, config) {
            alert(error);
        });
        if ($scope.ExamFormsBridgeCoursePass.ExmFrmID == 0) {
            var FormNo = ExamFormsBridgeCoursePassService.GetExmFrmMaxNo(AppSettings.ExamInstID, $scope.ExamFormsBridgeCoursePass.CollegeID);
            FormNo.then(function (data) {
                $scope.ExamFormsBridgeCoursePass.Formno = data;
                var PhysDisbList = ExamFormsBridgeCoursePassService.GetPhysDisbList();
                PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                    $scope.PhysDisbList = PhysDisbListdata;
                    var SpclConsList = ExamFormsBridgeCoursePassService.GetSpclConsList();
                    SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                        $scope.SpclConsList = SpclConsListdata;
                        var MainGroupList = ExamFormsBridgeCoursePassService.GetMainGroupListByCollegeId($scope.ExamFormsBridgeCoursePass.CollegeID, $scope.ExamFormsBridgeCoursePass.CourseID, AppSettings.AcdYrID);
                        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                            $scope.MainGroupList = MainGroupListdata;
                            var MedList = ExamFormsBridgeCoursePassService.GetBasicMediumList();
                            MedList.then(function (Mediumdata, status, headers, config, error) {
                                $scope.MediumList = Mediumdata;
                                var CourseList = BasicCourseService.GetBasicCourseList();
                                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                                    $scope.CourseList = BasicCoursedata;
                                    for (var i = 0; i < $scope.CourseList.length; i++) {
                                        if ($scope.CourseList[i].CourseID == $stateParams.CourseID) {
                                            $scope.ExamFormsBridgeCoursePass.CourseName = $scope.CourseList[i].CourseName;
                                            $scope.ExamFormsBridgeCoursePass.CourseID = $scope.CourseList[i].CourseID;
                                        }
                                    }
                                    var ExamList = BasicExamService.GetBasicExamList(0);
                                    ExamList.then(function (Examdata, status, headers, config, error) {
                                        $scope.ExamList = Examdata;
                                        for (var i = 0; i < $scope.ExamList.length; i++) {
                                            if ($scope.ExamList[i].ExamID == $stateParams.ExamID) {
                                                $scope.ExamFormsBridgeCoursePass.ExmName = $scope.ExamList[i].ExmName;
                                                $scope.ExamFormsBridgeCoursePass.ExamID = $scope.ExamList[i].ExamID;
                                            }
                                        }
                                        var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                                        BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                                            $scope.BasicBranchList = BasicBranchdata;
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == $stateParams.BranchID) {
                                                    $scope.ExamFormsBridgeCoursePass.BranchName = $scope.BasicBranchList[i].BranchName;
                                                    $scope.ExamFormsBridgeCoursePass.BranchID = $scope.BasicBranchList[i].BranchID;
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
            var MainGroupList = ExamFormsBridgeCoursePassService.GetMainGroupListByCollegeId($scope.ExamFormsBridgeCoursePass.CollegeID, $scope.ExamFormsBridgeCoursePass.CourseID, AppSettings.AcdYrID);
            MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                $scope.MainGroupList = MainGroupListdata;
                var MedList = ExamFormsBridgeCoursePassService.GetBasicMediumList();
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
                                var PhysDisbList = ExamFormsBridgeCoursePassService.GetPhysDisbList();
                                PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                                    $scope.PhysDisbList = PhysDisbListdata;
                                    var SpclConsList = ExamFormsBridgeCoursePassService.GetSpclConsList();
                                    SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                                        $scope.SpclConsList = SpclConsListdata;
                                        var ExamListdata = ExamFormsBridgeCoursePassService.GetExamFormsBridgeCoursePassById($scope.ExamFormsBridgeCoursePass.ExmFrmID);
                                        ExamListdata.then(function (data, status, headers, config, error) {
                                            $scope.ExamFormsBridgeCoursePass = data[0];
                                            for (var i = 0; i < $scope.CourseList.length; i++) {
                                                if ($scope.CourseList[i].CourseID == data[0].CourseID) {
                                                    $scope.ExamFormsBridgeCoursePass.CourseName = $scope.CourseList[i].CourseName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.ExamList.length; i++) {
                                                if ($scope.ExamList[i].ExamID == data[0].ExamID) {
                                                    $scope.ExamFormsBridgeCoursePass.ExmName = $scope.ExamList[i].ExmName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == data[0].BranchID) {
                                                    $scope.ExamFormsBridgeCoursePass.BranchName = $scope.BasicBranchList[i].BranchName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                if ($scope.StudCatList[i].StudCatID == 1) {
                                                    $scope.ExamFormsBridgeCoursePass.StudCatName = $scope.StudCatList[i].StudCatName;
                                                    $scope.ExamFormsBridgeCoursePass.StudCatID = $scope.StudCatList[i].StudCatID;
                                                }
                                            }


                                            //if ($scope.ExamFormsBridgeCoursePass.StudCatID = 1) {   // main data
                                            //    $scope.ExamFormsBridgeCoursePass.StudCatID = "R";
                                            //} else if ($scope.ExamFormsBridgeCoursePass.StudCatID = 2) {
                                            //    $scope.ExamFormsBridgeCoursePass.StudCatID = "P";
                                            //} else if ($scope.ExamFormsBridgeCoursePass.StudCatID = 3) {
                                            //    $scope.ExamFormsBridgeCoursePass.StudCatID = "E";
                                            //}
                                            for (var i = 0; i < data[0].ExamFormsSubject.length; i++) {
                                                data[0].ExamFormsSubject[i].CheckSub = true;
                                            }
                                            $scope.ExamFormsBridgeCoursePass.LateFees = $scope.LateFeesCurrent;
                                            $scope.ExamFormsBridgeCoursePass.FormFees = $scope.ExamFormsBridgeCoursePass.RegularFees + $scope.ExamFormsBridgeCoursePass.LateFees;
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
        var LateFeesAdditional = ExamFormsBridgeCoursePassService.GetAcademicYearFeesByDateForBridge(AppSettings.ExamInstID, $scope.ExamFormsBridgeCoursePass.ExamID);
        LateFeesAdditional.then(function (data, status, headers, config, error) {
            $scope.ExamFormsBridgeCoursePass.LateFees = data;
            $scope.LateFeesCurrent = data;
            var ExamFormFees = ExamFormsBridgeCoursePassService.GetBridgeExamFormFees(AppSettings.ExamInstID, $scope.ExamFormsBridgeCoursePass.ExamID);
            ExamFormFees.then(function (data, status, headers, config, error) {
                $scope.ExamFormsBridgeCoursePass.BridgeTheroyFee = data[0].BridgeTheroyFee;
                $scope.ExamFormsBridgeCoursePass.BridgePractFee = data[0].BridgePractFee;
                $scope.BridgeTheroyFee = data[0].BridgeTheroyFee;
                $scope.BridgePractFee = data[0].BridgePractFee;
                $scope.ExamFormsBridgeCoursePass.ExamFeesID = data[0].ExamFeesID;
                if ($scope.ExamFormsBridgeCoursePass.LateFees == undefined) { $scope.ExamFormsBridgeCoursePass.LateFees = 0; }
                if ($scope.ExamFormsBridgeCoursePass.RegularFees == undefined) { $scope.ExamFormsBridgeCoursePass.RegularFees = 0; }
                $scope.ExamFormsBridgeCoursePass.FormFees = $scope.ExamFormsBridgeCoursePass.RegularFees + $scope.ExamFormsBridgeCoursePass.LateFees;
            }, function (Instdata, status, headers, config) {
                alert(error);
            });
        }, function (Instdata, status, headers, config) {
            alert(error);
        });
        $scope.GetMigrationData = function () {
            var ExamFormList = ExamFormsBridgeCoursePassService.GetSSCHallTicketNoAndInsertIntoPrestudent($scope.ExamFormsBridgeCoursePass.PRNNo);
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
            var studResultList = ExamFormsBridgeCoursePassService.GetcheckstudPassOrNot($scope.ExamFormsBridgeCoursePass.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsBridgeCoursePass.CollegeID, $scope.ExamFormsBridgeCoursePass.CourseID, $scope.ExamFormsBridgeCoursePass.ExamID, $scope.ExamFormsBridgeCoursePass.BranchID);
            studResultList.then(function (data, status, headers, config, error) {
                //if ((data == "P") && ($scope.ExamFormsBridgeCoursePass.CourseID == 1)) {
                //    alert("This student is not eligible for Bridge Course");
                //    $scope.Updateddisable = false;
                //    return;
                //} else if (data == "P") {
                if (data == "P") {
                    var ExamFormList = ExamFormsBridgeCoursePassService.GetExamFormDataByPrnNoForBridgeCourse($scope.ExamFormsBridgeCoursePass.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsBridgeCoursePass.CollegeID, $scope.ExamFormsBridgeCoursePass.CourseID, $scope.ExamFormsBridgeCoursePass.ExamID, $scope.ExamFormsBridgeCoursePass.BranchID);
                    ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                        if (ExamFormdata.length == 0) {
                            alert("Data not found for this PRN No.");
                            $scope.ExamFormsBridgeCoursePass.StudName = "";
                            $scope.ExamFormsBridgeCoursePass.Gender = "";
                            $scope.ExamFormsBridgeCoursePass.MainGrpID = "";
                            $scope.ExamFormsBridgeCoursePass.PreStudRegID = "";
                            $scope.ExamFormsBridgeCoursePass.MediumID = "";
                            $scope.ExamFormsBridgeCoursePass.SubName = "";
                            $scope.ExamFormsBridgeCoursePass.SecondLangID = "";
                            $scope.Subjectdata = [];
                            $scope.Updateddisable = false;
                            return;
                        } else {
                            if ((ExamFormdata[0].BridgeAppFlag == "N") || (ExamFormdata[0].BridgeStudentResult == "P")) {
                                alert("This student are not applicable for bridge course");
                                $scope.Updateddisable = false;
                                return;
                            } else {
                                $scope.ExamFormsBridgeCoursePass.StudName = ExamFormdata[0].StudName;
                                $scope.ExamFormsBridgeCoursePass.Gender = ExamFormdata[0].Gender;
                                $scope.ExamFormsBridgeCoursePass.MainGrpID = ExamFormdata[0].MainGrpID;
                                $scope.ExamFormsBridgeCoursePass.PreStudRegID = ExamFormdata[0].PreStudRegID;
                                $scope.ExamFormsBridgeCoursePass.MediumID = ExamFormdata[0].MediumID;
                                $scope.ExamFormsBridgeCoursePass.SubName = ExamFormdata[0].SubName;
                                $scope.ExamFormsBridgeCoursePass.SecondLangID = ExamFormdata[0].SecondLangID;
                                $scope.ExamFormsBridgeCoursePass.RegularFees = ExamFormdata[0].RegularFees;
                                $scope.ExamFormsBridgeCoursePass.LateFees = ExamFormdata[0].LateFees;
                                $scope.ExamFormsBridgeCoursePass.FormFees = $scope.ExamFormsBridgeCoursePass.RegularFees + $scope.ExamFormsBridgeCoursePass.LateFees;

                                $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
                                for (var i = 0; i < $scope.Subjectdata.length; i++) {
                                    $scope.Subjectdata[i].CheckSub = true;
                                    $scope.Subjectdata[i].SubDisable = true;
                                }
                                $scope.Updateddisable = false;
                            }
                        }
                    }, function (ExamFormdata, status, headers, config) {
                        alert(error);
                        $scope.Updateddisable = false;
                    });
                } else {
                    alert("This student is not applied here for Bridge Course");
                    $scope.Updateddisable = false;
                    return;
                }
            }, function (ExamFormdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.ShowPRNData = function () { //GetExamFormData
            if ($scope.ExamFormsBridgeCoursePass.PRNNo == "" || $scope.ExamFormsBridgeCoursePass.PRNNo == undefined) {
                alert("Enter PRN No./HTNo");
                return;
            }
            //var strprn = "";
            //strprn = parseInt($scope.ExamFormsBridgeCoursePass.PRNNo.substring(0, 2));
            //if (strprn >= 18) {
            //    alert("This student is not eligible for Bridge Course");
            //    return;
            //}
            $scope.Updateddisable = true;
            if ($("#ApplicationDate").val() != "") { $scope.ExamFormsBridgeCoursePass.ApplicationDate = $("#ApplicationDate").val(); }
            var getPromise = ExamFormsBridgeCoursePassService.GetCheckPRNNoPresent($scope.ExamFormsBridgeCoursePass.PRNNo, AppSettings.ExamInstID);
            getPromise.then(function (data) {
                if (data != 0) {
                    alert("Exam form is already generated agains this PRNNo.");
                    $scope.Updateddisable = false;
                    return;
                } else {
                    var ExPRNCountList = ExamFormsBridgeCoursePassService.GetPrnNoCountInPrestudentReg($scope.ExamFormsBridgeCoursePass.PRNNo);
                    ExPRNCountList.then(function (data, status, headers, config, error) {
                        if (data == 0) {
                            $scope.GetMigrationData();
                        } else {
                            var UnStudCaseList = ExamFormsBridgeCoursePassService.GetCheckUnStudCase($scope.ExamFormsBridgeCoursePass.PRNNo, $scope.ExamFormsBridgeCoursePass.ApplicationDate, AppSettings.ExamInstID);
                            UnStudCaseList.then(function (data, status, headers, config, error) {
                                if (data[0].UnStudCase == 1) {
                                    alert("This student is Debarred up to date " + data[0].UpToDateDesc + "");
                                    $scope.Updateddisable = false;
                                    return;
                                } else {
                                    var studResultList = ExamFormsBridgeCoursePassService.GetcheckstudPassOrNot($scope.ExamFormsBridgeCoursePass.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsBridgeCoursePass.CollegeID, $scope.ExamFormsBridgeCoursePass.CourseID, $scope.ExamFormsBridgeCoursePass.ExamID, $scope.ExamFormsBridgeCoursePass.BranchID);
                                    studResultList.then(function (data, status, headers, config, error) {
                                        //if ((data == "P") && ($scope.ExamFormsBridgeCoursePass.CourseID == 1)) {
                                        //    alert("This student is not eligible for Bridge Course");
                                        //    $scope.Updateddisable = false;
                                        //    return;
                                        //} else 
                                        if (data == "P") {
                                            var ExamFormList = ExamFormsBridgeCoursePassService.GetExmFormCntForBridgeCourse($scope.ExamFormsBridgeCoursePass.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsBridgeCoursePass.ExamID);
                                            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                                                if (ExamFormdata == 0) {
                                                    var ExamFormList = ExamFormsBridgeCoursePassService.GetExamFormDataByPrnNoForBridgeCourse($scope.ExamFormsBridgeCoursePass.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsBridgeCoursePass.CollegeID, $scope.ExamFormsBridgeCoursePass.CourseID, $scope.ExamFormsBridgeCoursePass.ExamID, $scope.ExamFormsBridgeCoursePass.BranchID);
                                                    ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                                                        if (ExamFormdata.length == 0) {
                                                            ExamFormdata = [];
                                                            alert("Data not found for this PRN No./HTNo");
                                                            $scope.ExamFormsBridgeCoursePass.StudName = "";
                                                            $scope.ExamFormsBridgeCoursePass.Gender = "";
                                                            $scope.ExamFormsBridgeCoursePass.MainGrpID = "";
                                                            $scope.ExamFormsBridgeCoursePass.PreStudRegID = "";
                                                            $scope.ExamFormsBridgeCoursePass.MediumID = "";
                                                            $scope.ExamFormsBridgeCoursePass.SubName = "";
                                                            $scope.ExamFormsBridgeCoursePass.SecondLangID = "";
                                                            $scope.Subjectdata = [];
                                                            $scope.Updateddisable = false;
                                                            return;
                                                        }
                                                        else {
                                                            if ((ExamFormdata[0].BridgeAppFlag == "N") || (ExamFormdata[0].BridgeStudentResult == "P")) {
                                                                alert("This student are not applicable for bridge course");
                                                                $scope.Updateddisable = false;
                                                                return;
                                                            } else {
                                                                $scope.ExamFormsBridgeCoursePass.StudName = ExamFormdata[0].StudName;
                                                                $scope.ExamFormsBridgeCoursePass.Gender = ExamFormdata[0].Gender;
                                                                $scope.ExamFormsBridgeCoursePass.MainGrpID = ExamFormdata[0].MainGrpID;
                                                                $scope.ExamFormsBridgeCoursePass.PreStudRegID = ExamFormdata[0].PreStudRegID;
                                                                $scope.ExamFormsBridgeCoursePass.MediumID = ExamFormdata[0].MediumID;
                                                                $scope.ExamFormsBridgeCoursePass.SubName = ExamFormdata[0].SubName;
                                                                $scope.ExamFormsBridgeCoursePass.SecondLangID = ExamFormdata[0].SecondLangID;
                                                                $scope.Updateddisable = false;
                                                                $scope.ExamFormsBridgeCoursePass.RegularFees = ExamFormdata[0].RegularFees;
                                                                $scope.ExamFormsBridgeCoursePass.LateFees = ExamFormdata[0].LateFees;
                                                                $scope.ExamFormsBridgeCoursePass.FormFees = $scope.ExamFormsBridgeCoursePass.RegularFees + $scope.ExamFormsBridgeCoursePass.LateFees;
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
                                                    alert("This student is not applied here for Bridge Course");
                                                    $scope.Updateddisable = false;
                                                    return;
                                                }
                                            }, function (ExamFormdata, status, headers, config) {
                                                $scope.Updateddisable = false;
                                                alert(error);
                                            });
                                        } else {
                                            alert("This student is not applied here for Bridge Course");
                                            $scope.Updateddisable = false;
                                            return;
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
        $scope.ExamFormsBridgeCoursePass.ImprovementFlag = "N";
        $scope.ExamFormsBridgeCoursePass.AddSubFlag = "N";
        $scope.ExamFormsBridgeCoursePass.BridgeCourseFlag = "Y";
        $scope.ExamFormsBridgeCoursePass.StudType = "F";
        $scope.ExamFormsBridgeCoursePass.Handicaped = "N";
        $scope.Subjectdata = [];
        $scope.SaveExamFormsBridgeCoursePass = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                if ($("#ApplicationDate").val() != "") { $scope.ExamFormsBridgeCoursePass.ApplicationDate = $("#ApplicationDate").val(); }
                $scope.ExamFormsBridgeCoursePass.ExamFormsSubject = $scope.Subjectdata;
                $scope.ExamFormsBridgeCoursePass.CreLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsBridgeCoursePass.UpdLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsBridgeCoursePass.AcdYrID = AppSettings.AcdYrID;
                $scope.ExamFormsBridgeCoursePass.ExamInstID = AppSettings.ExamInstID;
                $scope.ExamFormsBridgeCoursePass.BridgeCourseFlag = "Y";
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
                $scope.ExamFormsBridgeCoursePass.ExamFormsSubject = examsubs;
                if (($scope.ExamFormsBridgeCoursePass.ExmFrmID == undefined) || ($scope.ExamFormsBridgeCoursePass.ExmFrmID == "")) { $scope.ExamFormsBridgeCoursePass.ExmFrmID = 0; }
                if ($scope.ExamFormsBridgeCoursePass.ExmFrmID == 0) {
                    var getPromise = ExamFormsBridgeCoursePassService.GetCheckPRNNoPresent($scope.ExamFormsBridgeCoursePass.PreStudRegID, $scope.ExamFormsBridgeCoursePass.AcdYrID);
                    getPromise.then(function (data) {
                        if (data != 0) {
                            alert("Exam form is already generated agains this PRNNo.");
                            $scope.isupdatableDisable = false;
                            return;
                        } else {
                    var getPromise = ExamFormsBridgeCoursePassService.AddExamFormsBridgeCoursePass($scope.ExamFormsBridgeCoursePass);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Saved successfully!!");
                        $scope.ExamFormsBridgeCoursePass.StudName = "";
                        $scope.ExamFormsBridgeCoursePass.Gender = "";
                        $scope.ExamFormsBridgeCoursePass.MainGrpID = "";
                        $scope.ExamFormsBridgeCoursePass.PreStudRegID = "";
                        $scope.ExamFormsBridgeCoursePass.PRNNo = "";
                        $scope.ExamFormsBridgeCoursePass.FormFees = "";
                        $scope.Subjectdata = [];
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
                else {
                    //var getPromise = ExamFormsBridgeCoursePassService.PostBridgeCourseGenerateIndiviual($scope.ExamFormsBridgeCoursePass);
                    //getPromise.then(function (msg) {
                    //    $scope.isupdatableDisable = false;
                    //    alert("Updated successfully!!");
                    //    $scope.ExamFormsBridgeCoursePass.StudName = "";
                    //    $scope.ExamFormsBridgeCoursePass.Gender = "";
                    //    $scope.ExamFormsBridgeCoursePass.MainGrpID = "";
                    //    $scope.ExamFormsBridgeCoursePass.PreStudRegID = "";
                    //    $scope.ExamFormsBridgeCoursePass.PRNNo = "";
                    //    $scope.ExamFormsBridgeCoursePass.FormFees = "";
                    //    $scope.Subjectdata = [];
                    //}, function (error) {
                    //    $scope.isupdatableDisable = false;
                    //    alert(error);
                    //});
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteExamFormsBridgeCoursePass = function () {
            var getData = ExamFormsBridgeCoursePassService.DeleteExamFormsBridgeCoursePass($scope.ExamFormsBridgeCoursePass.ExmFrmID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.ExamFormsBridgeCoursePass.PRNNo == undefined) || ($scope.ExamFormsBridgeCoursePass.PRNNo == "")) {
                alert("Enter PRN No.");
                return false;
            }
            if (($scope.ExamFormsBridgeCoursePass.StudName == undefined) || ($scope.ExamFormsBridgeCoursePass.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsBridgeCoursePass.CollegeID == undefined) || ($scope.ExamFormsBridgeCoursePass.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsBridgeCoursePass.MainGrpID == undefined) || ($scope.ExamFormsBridgeCoursePass.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamFormsBridgeCoursePass.Formno == undefined) || ($scope.ExamFormsBridgeCoursePass.Formno == "")) {
                alert("Enter Form no");
                return false;
            }
            if (($scope.ExamFormsBridgeCoursePass.FormFees == undefined) || ($scope.ExamFormsBridgeCoursePass.FormFees == "")) {
                alert("Enter Form Fees");
                return false;
            }
            if ($scope.ExamFormsBridgeCoursePass.Handicaped == 'Y') {
                if (($scope.ExamFormsBridgeCoursePass.PhysDisbID == 0) || ($scope.ExamFormsBridgeCoursePass.PhysDisbID == 1)) {
                    alert("Select Physical Disability");
                    return false;
                }
                if ($scope.ExamFormsBridgeCoursePass.PhysDisbID > 1) {
                    if (($scope.ExamFormsBridgeCoursePass.PhysDisbPer == undefined) || ($scope.ExamFormsBridgeCoursePass.PhysDisbPer == "") || ($scope.ExamFormsBridgeCoursePass.PhysDisbPer == 0)) {
                        alert("Enter Disability %.");
                        return false;
                    }
                }
                if ($scope.ExamFormsBridgeCoursePass.PhysDisbID == 2) {
                    if ($scope.ExamFormsBridgeCoursePass.PhysDisbPer < 40) {
                        alert("Enter Disability % must be greater than or equal to 40, if you are blind condidate.");
                        return false;
                    }
                    if ($scope.ExamFormsBridgeCoursePass.BranchID == 2) {
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
            $state.go('Exam.ExamFormsBridgeCoursePassList');
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
            $scope.ExamFormsBridgeCoursePass.RegularFees = practfees + thoeryfess;
            $scope.ExamFormsBridgeCoursePass.FormFees = $scope.ExamFormsBridgeCoursePass.RegularFees + $scope.ExamFormsBridgeCoursePass.LateFees;
        }
        $scope.editmodecheck = false;
    });
});
