define(['app'], function (app) {
    app.controller("ExamFormsAdditionalSubjectsController", function ($scope, $state, $stateParams, AppSettings, ExamFormsAdditionalSubjectsService, BasicCourseService, BasicBranchService, BasicMainGroupService, BasicExamService) {
        $scope.ExamFormsAdditionalSubjects = { ExmFrmID: $stateParams.ExmFrmID, CourseID: $stateParams.CourseID, CollegeID: $stateParams.CollegeID, ExamID: $stateParams.ExamID, BranchID: $stateParams.BranchID };
        var CourseID = $stateParams.CourseID;
        var ExamID = $stateParams.ExamID;
        var PageNm = $state.current.name.split(".")[1] + "";
        var ExamFormsAdditionalSubjectsRightsdata = [];
        ExamFormsAdditionalSubjectsRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormsAdditionalSubjectsRightsdata.length; i++) {
            if (ExamFormsAdditionalSubjectsRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormsAdditionalSubjects.ExmFrmID == 0) {
                    if (ExamFormsAdditionalSubjectsRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormsAdditionalSubjectsRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormsAdditionalSubjectsRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        $scope.Updateddisable = false;
        var InsScheduleList = ExamFormsAdditionalSubjectsService.GetCurrExmInstSchedule(AppSettings.ExamInstID, $scope.ExamFormsAdditionalSubjects.ExamID);
        InsScheduleList.then(function (Instdata, status, headers, config, error) {
            if (Instdata == 0) {
                alert("Exam Instance Shedule not found current instance");
                RedirectToListPage("ExamForm.ExamFormsAdditionalSubjectsList");
            }
        }, function (Instdata, status, headers, config) {
            alert(error);
        });
        var InsScheduleList = ExamFormsAdditionalSubjectsService.GetInstScheduleDate(AppSettings.ExamInstID);
        InsScheduleList.then(function (Instschdate, status, headers, config, error) {
            if (Instschdate == 0) {
                alert("Exam Instance schedule not open for current instance");
                RedirectToListPage("ExamForm.ExamFormsAdditionalSubjectsList");
            }
        }, function (Instdata, status, headers, config) {
            alert(error);
        });
        $scope.RegularFeesPer = 0;
        var LateFeesAdditional = ExamFormsAdditionalSubjectsService.GetAcademicYearFeesByDateForAdditional(AppSettings.ExamInstID, $scope.ExamFormsAdditionalSubjects.ExamID);
        LateFeesAdditional.then(function (data, status, headers, config, error) {
            $scope.ExamFormsAdditionalSubjects.LateFees = data;
            $scope.LateFeesCurrent = data;
            var ExamFormFees = ExamFormsAdditionalSubjectsService.GetAdditionalExamFormFees(AppSettings.ExamInstID, $scope.ExamFormsAdditionalSubjects.ExamID);
            ExamFormFees.then(function (data, status, headers, config, error) {
                $scope.ExamFormsAdditionalSubjects.RegularFees = data[0].RegularFees;
                $scope.RegularFeesPer = data[0].RegularFees;
                $scope.ExamFormsAdditionalSubjects.ExamFeesID = data[0].ExamFeesID;
                if ($scope.ExamFormsAdditionalSubjects.LateFees == undefined) { $scope.ExamFormsAdditionalSubjects.LateFees = 0; }
                if ($scope.ExamFormsAdditionalSubjects.RegularFees == undefined) { $scope.ExamFormsAdditionalSubjects.RegularFees = 0; }
                $scope.ExamFormsAdditionalSubjects.FormFees = $scope.ExamFormsAdditionalSubjects.RegularFees + $scope.ExamFormsAdditionalSubjects.LateFees;
            }, function (Instdata, status, headers, config) {
                alert(error);
            });
        }, function (Instdata, status, headers, config) {
            alert(error);
        });

        var StudList = ExamFormsAdditionalSubjectsService.GetStudCatList();
        StudList.then(function (StudCatdata, status, headers, config, error) {
            $scope.StudCatList = StudCatdata;
            for (var i = 0; i < $scope.StudCatList.length; i++) {
                if ($scope.StudCatList[i].StudCatID == 7) {
                    $scope.ExamFormsAdditionalSubjects.StudCatName = $scope.StudCatList[i].StudCatName;
                    $scope.ExamFormsAdditionalSubjects.StudCatID = $scope.StudCatList[i].StudCatID;
                }
            }
        }, function (StudCatdata, status, headers, config) {
            alert(error);
        });
        if ($scope.ExamFormsAdditionalSubjects.ExmFrmID == 0) {
            var FormNo = ExamFormsAdditionalSubjectsService.GetExmFrmMaxNo(AppSettings.ExamInstID, $scope.ExamFormsAdditionalSubjects.CollegeID);
            FormNo.then(function (data) {
                $scope.ExamFormsAdditionalSubjects.Formno = data;
                var PhysDisbList = ExamFormsAdditionalSubjectsService.GetPhysDisbList();
                PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                    $scope.PhysDisbList = PhysDisbListdata;
                    var SpclConsList = ExamFormsAdditionalSubjectsService.GetSpclConsList();
                    SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                        $scope.SpclConsList = SpclConsListdata;
                        var MainGroupList = ExamFormsAdditionalSubjectsService.GetMainGroupListByCollegeId($scope.ExamFormsAdditionalSubjects.CollegeID, $scope.ExamFormsAdditionalSubjects.CourseID, AppSettings.AcdYrID);
                        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                            $scope.MainGroupList = MainGroupListdata;
                            var MedList = ExamFormsAdditionalSubjectsService.GetBasicMediumList();
                            MedList.then(function (Mediumdata, status, headers, config, error) {
                                $scope.MediumList = Mediumdata;
                                var CourseList = BasicCourseService.GetBasicCourseList();
                                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                                    $scope.CourseList = BasicCoursedata;
                                    for (var i = 0; i < $scope.CourseList.length; i++) {
                                        if ($scope.CourseList[i].CourseID == $stateParams.CourseID) {
                                            $scope.ExamFormsAdditionalSubjects.CourseName = $scope.CourseList[i].CourseName;
                                            $scope.ExamFormsAdditionalSubjects.CourseID = $scope.CourseList[i].CourseID;
                                        }
                                    }
                                    var ExamList = BasicExamService.GetBasicExamList(0);
                                    ExamList.then(function (Examdata, status, headers, config, error) {
                                        $scope.ExamList = Examdata;
                                        for (var i = 0; i < $scope.ExamList.length; i++) {
                                            if ($scope.ExamList[i].ExamID == $stateParams.ExamID) {
                                                $scope.ExamFormsAdditionalSubjects.ExmName = $scope.ExamList[i].ExmName;
                                                $scope.ExamFormsAdditionalSubjects.ExamID = $scope.ExamList[i].ExamID;
                                            }
                                        }
                                        var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                                        BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                                            $scope.BasicBranchList = BasicBranchdata;
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == $stateParams.BranchID) {
                                                    $scope.ExamFormsAdditionalSubjects.BranchName = $scope.BasicBranchList[i].BranchName;
                                                    $scope.ExamFormsAdditionalSubjects.BranchID = $scope.BasicBranchList[i].BranchID;
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
            var MainGroupList = ExamFormsAdditionalSubjectsService.GetMainGroupListByCollegeId($scope.ExamFormsAdditionalSubjects.CollegeID, $scope.ExamFormsAdditionalSubjects.CourseID, AppSettings.AcdYrID);
            MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                $scope.MainGroupList = MainGroupListdata;
                var MedList = ExamFormsAdditionalSubjectsService.GetBasicMediumList();
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;
                    var PhysDisbList = ExamFormsAdditionalSubjectsService.GetPhysDisbList();
                    PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                        $scope.PhysDisbList = PhysDisbListdata;
                        var SpclConsList = ExamFormsAdditionalSubjectsService.GetSpclConsList();
                        SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                            $scope.SpclConsList = SpclConsListdata;
                            var CourseList = BasicCourseService.GetBasicCourseList();
                            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                                $scope.CourseList = BasicCoursedata;
                                var ExamList = BasicExamService.GetBasicExamList(0);
                                ExamList.then(function (Examdata, status, headers, config, error) {
                                    $scope.ExamList = Examdata;
                                    var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                                    BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                                        $scope.BasicBranchList = BasicBranchdata;
                                        var ExamListdata = ExamFormsAdditionalSubjectsService.GetExamFormsById($scope.ExamFormsAdditionalSubjects.ExmFrmID);
                                        ExamListdata.then(function (data, status, headers, config, error) {
                                            $scope.ExamFormsAdditionalSubjects = data[0];
                                            for (var i = 0; i < $scope.CourseList.length; i++) {
                                                if ($scope.CourseList[i].CourseID == data[0].CourseID) {
                                                    $scope.ExamFormsAdditionalSubjects.CourseName = $scope.CourseList[i].CourseName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.ExamList.length; i++) {
                                                if ($scope.ExamList[i].ExamID == data[0].ExamID) {
                                                    $scope.ExamFormsAdditionalSubjects.ExmName = $scope.ExamList[i].ExmName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == data[0].BranchID) {
                                                    $scope.ExamFormsAdditionalSubjects.BranchName = $scope.BasicBranchList[i].BranchName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                if ($scope.StudCatList[i].StudCatID == 1) {
                                                    $scope.ExamFormsAdditionalSubjects.StudCatName = $scope.StudCatList[i].StudCatName;
                                                    $scope.ExamFormsAdditionalSubjects.StudCatID = $scope.StudCatList[i].StudCatID;
                                                }
                                            }
                                            //if ($scope.ExamFormsAdditionalSubjects.StudCatID = 1) {   // main data
                                            //    $scope.ExamFormsAdditionalSubjects.StudCatID = "R";
                                            //} else if ($scope.ExamFormsAdditionalSubjects.StudCatID = 2) {
                                            //    $scope.ExamFormsAdditionalSubjects.StudCatID = "P";
                                            //} else if ($scope.ExamFormsAdditionalSubjects.StudCatID = 3) {
                                            //    $scope.ExamFormsAdditionalSubjects.StudCatID = "E";
                                            //}
                                            $scope.ExamFormsAdditionalSubjects.FormFees = data[0].FormFees;
                                            //$scope.ExamFormsAdditionalSubjects.LateFees = data[0].LateFees;
                                            $scope.ExamFormsAdditionalSubjects.RegularFees = data[0].RegularFees;
                                            $scope.ExamFormsAdditionalSubjects.LateFees = $scope.LateFeesCurrent;
                                            $scope.ExamFormsAdditionalSubjects.FormFees = $scope.ExamFormsAdditionalSubjects.RegularFees + $scope.ExamFormsAdditionalSubjects.LateFees;
                                            for (var i = 0; i < data[0].ExamFormsSubject.length; i++) {
                                                data[0].ExamFormsSubject[i].CheckSub = true;
                                            }
                                            $scope.Subjectdata = data[0].ExamFormsSubject;
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
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        $("#ApplicationDate").ejDatePicker({ value: new Date(), allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#ApplicationDate").ejDatePicker("disable");
        //$scope.lableprn = "Enter PRN No.:";
        $scope.ExamFormsAdditionalSubjects.StudType = "F";
        $scope.ExamFormsAdditionalSubjects.Handicaped = "N";
        //$scope.GetCheckPRN = function () {
        //    if ($scope.ExamFormsAdditionalSubjects.checkPRN == "Y") {
        //        $scope.lableprn = "Enter PRN No.:";
        //    } else {
        //        $scope.lableprn = "Enter SSC Hall Ticket No.";
        //    }
        //}
        $scope.GetMigrationData = function () {
            var ExamFormList = ExamFormsAdditionalSubjectsService.GetSSCHallTicketNoAndInsertIntoPrestudent($scope.ExamFormsAdditionalSubjects.PRNNo);
            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                if (ExamFormdata == 0) {
                    $scope.FillMigrationData();
                }
                else if (ExamFormdata == 1) {
                    alert("You are not eligible for admission ..(MalPractice) ");
                    return;
                } else {
                    alert("Some data mismatch, please contact Help Desk.");
                    return;
                }
            }, function (ExamFormdata, status, headers, config, error) {
                alert("Some data mismatch, please contact Help Desk.");
            });
        }
        $scope.FillMigrationData = function () {
            var ExamFormList = ExamFormsAdditionalSubjectsService.GetExamFormDataByPrnNoForAdditional($scope.ExamFormsAdditionalSubjects.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsAdditionalSubjects.CollegeID, $scope.ExamFormsAdditionalSubjects.CourseID, $scope.ExamFormsAdditionalSubjects.ExamID, $scope.ExamFormsAdditionalSubjects.BranchID);
            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                if (ExamFormdata.length == 0) {
                    alert("Data not found for this PRN No./HTNo");
                    $scope.ExamFormsAdditionalSubjects.StudName = "";
                    $scope.ExamFormsAdditionalSubjects.Gender = "";
                    $scope.ExamFormsAdditionalSubjects.MainGrpID = "";
                    $scope.ExamFormsAdditionalSubjects.PreStudRegID = "";
                    $scope.ExamFormsAdditionalSubjects.MediumID = "";
                    $scope.ExamFormsAdditionalSubjects.SubName = "";
                    $scope.ExamFormsAdditionalSubjects.SecondLangID = "";
                    $scope.Subjectdata = [];
                    return;
                } else {
                    $scope.ExamFormsAdditionalSubjects.StudName = ExamFormdata[0].StudName;
                    $scope.ExamFormsAdditionalSubjects.Gender = ExamFormdata[0].Gender;
                    $scope.ExamFormsAdditionalSubjects.MainGrpID = ExamFormdata[0].MainGrpID;
                    $scope.ExamFormsAdditionalSubjects.PreStudRegID = ExamFormdata[0].PreStudRegID;
                    $scope.ExamFormsAdditionalSubjects.MediumID = ExamFormdata[0].MediumID;
                    $scope.ExamFormsAdditionalSubjects.SubName = ExamFormdata[0].SubName;
                    for (var i = 0; i < ExamFormdata[0].ExamFormsSubject.length; i++) {
                        ExamFormdata[0].ExamFormsSubject[i].CheckSub = false;
                    }
                    $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
                    $scope.ExamFormsAdditionalSubjects.SecondLangID = ExamFormdata[0].SecondLangID;
                }
            }, function (ExamFormdata, status, headers, config) {
                alert(error);
            });
        }


        $scope.ShowPRNData = function () {
            if ($scope.ExamFormsAdditionalSubjects.PRNNo == "" || $scope.ExamFormsAdditionalSubjects.PRNNo == undefined) {
                alert("Enter PRN No./HTNo");
                return;
            }
            if ($("#ApplicationDate").val() != "") { $scope.ExamFormsAdditionalSubjects.ApplicationDate = $("#ApplicationDate").val(); }
            var ExPRNCountList = ExamFormsAdditionalSubjectsService.GetPrnNoCountInPrestudentReg($scope.ExamFormsAdditionalSubjects.PRNNo);
            ExPRNCountList.then(function (data, status, headers, config, error) {
                if (data == 0) {
                    $scope.GetMigrationData();
                } else {
                    var UnStudCaseList = ExamFormsAdditionalSubjectsService.GetCheckUnStudCase($scope.ExamFormsAdditionalSubjects.PRNNo, $scope.ExamFormsAdditionalSubjects.ApplicationDate, AppSettings.ExamInstID);
                    UnStudCaseList.then(function (data, status, headers, config, error) {
                        if (data[0].UnStudCase == 1) {
                            alert("This student is Debarred up to date " + data[0].UpToDateDesc + "");
                            return;
                        } else {
                            var ExamFormList = ExamFormsAdditionalSubjectsService.GetExamFormDataByPrnNoForAdditional($scope.ExamFormsAdditionalSubjects.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsAdditionalSubjects.CollegeID, $scope.ExamFormsAdditionalSubjects.CourseID, $scope.ExamFormsAdditionalSubjects.ExamID, $scope.ExamFormsAdditionalSubjects.BranchID);
                            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                                if (ExamFormdata.length == 0) {
                                    alert("Data not found for this PRN No. or SSC Hall Ticket No.");
                                    $scope.ExamFormsAdditionalSubjects.StudName = "";
                                    $scope.ExamFormsAdditionalSubjects.Gender = "";
                                    $scope.ExamFormsAdditionalSubjects.MainGrpID = "";
                                    $scope.ExamFormsAdditionalSubjects.PreStudRegID = "";
                                    $scope.ExamFormsAdditionalSubjects.MediumID = "";
                                    $scope.ExamFormsAdditionalSubjects.SubName = "";
                                    $scope.ExamFormsAdditionalSubjects.SecondLangID = "";
                                    $scope.Subjectdata = [];
                                    return;
                                }
                                else {
                                    var studResultList = ExamFormsAdditionalSubjectsService.GetcheckstudPassOrNot($scope.ExamFormsAdditionalSubjects.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsAdditionalSubjects.CollegeID, $scope.ExamFormsAdditionalSubjects.CourseID, $scope.ExamFormsAdditionalSubjects.ExamID, $scope.ExamFormsAdditionalSubjects.BranchID);
                                    studResultList.then(function (data, status, headers, config, error) {
                                        if (data == "P") {
                                            if ((ExamFormdata[0].ExamFormsSubject == "") || (ExamFormdata[0].ExamFormsSubject == undefined)) {
                                                alert("No Any subjects for additional");
                                                return;
                                            } else {
                                                $scope.fillData(ExamFormdata);
                                            }
                                        } else if (data == "") {
                                            alert("Please Select 2nd year To Fill up the Form.");
                                            return;
                                        }
                                        else {
                                            alert("You can't apply for additional subject (Category 7) because you have not passed 2nd year.");
                                            return;
                                        }
                                    }, function (ExamFormdata, status, headers, config) {
                                        alert(error);
                                    });
                                }
                            }, function (ExamFormdata, status, headers, config) {
                                alert(error);
                            });
                        }
                    }, function (ExamFormdata, status, headers, config) {
                        alert(error);
                    });
                }
            }, function (ExamFormdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.fillData = function (ExamFormdata) {
            $scope.ExamFormsAdditionalSubjects.StudName = ExamFormdata[0].StudName;
            $scope.ExamFormsAdditionalSubjects.Gender = ExamFormdata[0].Gender;
            $scope.ExamFormsAdditionalSubjects.MainGrpID = ExamFormdata[0].MainGrpID;
            $scope.ExamFormsAdditionalSubjects.PreStudRegID = ExamFormdata[0].PreStudRegID;
            $scope.ExamFormsAdditionalSubjects.MediumID = ExamFormdata[0].MediumID;
            $scope.ExamFormsAdditionalSubjects.SubName = ExamFormdata[0].SubName;
            $scope.ExamFormsAdditionalSubjects.SecondLangID = ExamFormdata[0].SecondLangID;
            for (var i = 0; i < ExamFormdata[0].ExamFormsSubject.length; i++) {
                ExamFormdata[0].ExamFormsSubject[i].CheckSub = false;
            }
            $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
        }
        $scope.SaveExamFormsAdditionalSubjects = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                if ($("#ApplicationDate").val() != "") { $scope.ExamFormsAdditionalSubjects.ApplicationDate = $("#ApplicationDate").val(); }
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
                        obj.RepeaterFlg = $scope.Subjectdata[i].RepeaterFlg;
                        examsubs.push(obj);
                    }
                }
                $scope.ExamFormsAdditionalSubjects.ExamFormsSubject = examsubs;
                $scope.ExamFormsAdditionalSubjects.CreLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsAdditionalSubjects.UpdLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsAdditionalSubjects.AcdYrID = AppSettings.AcdYrID;
                $scope.ExamFormsAdditionalSubjects.ExamInstID = AppSettings.ExamInstID;
                $scope.ExamFormsAdditionalSubjects.AddSubFlag = "Y";
                //if ($scope.ExamFormsAdditionalSubjects.StudCatID = "R") {
                //    $scope.ExamFormsAdditionalSubjects.StudCatID = 1;
                //} else if ($scope.ExamFormsAdditionalSubjects.StudCatID = "P") {
                //    $scope.ExamFormsAdditionalSubjects.StudCatID = 2;
                //} else {
                //    $scope.ExamFormsAdditionalSubjects.StudCatID = 3;
                //}
                if (($scope.ExamFormsAdditionalSubjects.ExmFrmID == undefined) || ($scope.ExamFormsAdditionalSubjects.ExmFrmID == "")) { $scope.ExamFormsAdditionalSubjects.ExmFrmID = 0; }
                if ($scope.ExamFormsAdditionalSubjects.ExmFrmID == 0) {
                    var getPromise = ExamFormsAdditionalSubjectsService.GetCheckPRNNoPresent($scope.ExamFormsAdditionalSubjects.PRNNo, AppSettings.ExamInstID,"I");
                    getPromise.then(function (data) {
                        if (data != 0) {
                            alert("Exam form is already present for this student.");
                            $scope.isupdatableDisable = false;
                            return;
                        } else {
                            var getPromise = ExamFormsAdditionalSubjectsService.AddExamForms($scope.ExamFormsAdditionalSubjects);
                            getPromise.then(function (msg) {
                                $scope.isupdatableDisable = false;
                                alert("Saved successfully!!");
                                $scope.ExamFormsAdditionalSubjects.StudName = "";
                                $scope.ExamFormsAdditionalSubjects.Gender = "";
                                $scope.ExamFormsAdditionalSubjects.MainGrpID = "";
                                $scope.ExamFormsAdditionalSubjects.PreStudRegID = "";
                                $scope.ExamFormsAdditionalSubjects.PRNNo = "";
                                $scope.ExamFormsAdditionalSubjects.FormFees = "";
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
                    var getPromise = ExamFormsAdditionalSubjectsService.UpdateExamForms($scope.ExamFormsAdditionalSubjects);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Update successfully!!");
                        $scope.ExamFormsAdditionalSubjects.StudName = "";
                        $scope.ExamFormsAdditionalSubjects.Gender = "";
                        $scope.ExamFormsAdditionalSubjects.MainGrpID = "";
                        $scope.ExamFormsAdditionalSubjects.PreStudRegID = "";
                        $scope.ExamFormsAdditionalSubjects.PRNNo = "";
                        $scope.ExamFormsAdditionalSubjects.FormFees = "";
                        $scope.Subjectdata = [];
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
            }
        }
        function CheckValidation() {
            if (($scope.ExamFormsAdditionalSubjects.PRNNo == undefined) || ($scope.ExamFormsAdditionalSubjects.PRNNo == "")) {
                alert("Enter PRN No.");
                return false;
            }
            if (($scope.ExamFormsAdditionalSubjects.StudName == undefined) || ($scope.ExamFormsAdditionalSubjects.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsAdditionalSubjects.CollegeID == undefined) || ($scope.ExamFormsAdditionalSubjects.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsAdditionalSubjects.MainGrpID == undefined) || ($scope.ExamFormsAdditionalSubjects.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamFormsAdditionalSubjects.Formno == undefined) || ($scope.ExamFormsAdditionalSubjects.Formno == "")) {
                alert("Enter Form no");
                return false;
            }
            if (($scope.ExamFormsAdditionalSubjects.FormFees == undefined) || ($scope.ExamFormsAdditionalSubjects.FormFees == "")) {
                alert("Enter Form Fees");
                return false;
            }
            if ($scope.ExamFormsAdditionalSubjects.Handicaped == 'Y') {
                if (($scope.ExamFormsAdditionalSubjects.PhysDisbID == 0) || ($scope.ExamFormsAdditionalSubjects.PhysDisbID == 1)) {
                    alert("Select Physical Disability");
                    return false;
                }
                if ($scope.ExamFormsAdditionalSubjects.PhysDisbID > 1) {
                    if (($scope.ExamFormsAdditionalSubjects.PhysDisbPer == undefined) || ($scope.ExamFormsAdditionalSubjects.PhysDisbPer == "") || ($scope.ExamFormsAdditionalSubjects.PhysDisbPer == 0)) {
                        alert("Enter Disability %.");
                        return false;
                    }
                }
                if ($scope.ExamFormsAdditionalSubjects.PhysDisbID == 2) {
                    if ($scope.ExamFormsAdditionalSubjects.PhysDisbPer < 40) {
                        alert("Enter Disability % must be greater than or equal to 40, if you are blind condidate.");
                        return false;
                    }
                    if ($scope.ExamFormsAdditionalSubjects.BranchID == 2) {
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
            return true;
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Exam.ExamFormsAdditionalSubjectsList');
        }
        $scope.checkSecondLangFirst = false;
        $scope.checkSecondLangSecond = false;

        $scope.checksubFirst = false;
        $scope.checksubSecond = false;

        $scope.SubjectFillLogic = function (obj) {
            var boolexam1 = false;
            var boolexam2 = false;
            for (var i = 0; i < $scope.Subjectdata.length; i++) {
                if ($scope.Subjectdata[i].CheckSub == true) {
                    if ($scope.Subjectdata[i].SequenceNo == 1) {
                        boolexam1 = true;
                    }
                    if ($scope.Subjectdata[i].SequenceNo == 2) {
                        boolexam2 = true;
                    }
                }
            }
            if (obj.CheckSub == true) {
                if (obj.SubjectType == "B") {
                    if (obj.SequenceNo == 1) {
                        if ($scope.checkSecondLangFirst == true) {
                            alert("Select only one second language for per year");
                            obj.CheckSub = false;
                            return;
                        } else {
                            for (var i = 0; i < $scope.Subjectdata.length; i++) {
                                if ($scope.Subjectdata[i].SubjectType == "B") {
                                    if ($scope.Subjectdata[i].CheckSub == true) {
                                        if ($scope.Subjectdata[i].SequenceNo == 2) {
                                            if ($scope.Subjectdata[i].SubjectID != obj.SubjectID) {
                                                alert("First year language must be same as second year");
                                                obj.CheckSub = false;
                                                return;
                                            }
                                        }
                                    }
                                }
                            }
                            $scope.checkSecondLangFirst = true;
                        }
                    } else {
                        if ($scope.checkSecondLangSecond == true) {
                            alert("Select only one second language for per year");
                            obj.CheckSub = false;
                            return;
                        } else {
                            for (var i = 0; i < $scope.Subjectdata.length; i++) {
                                if ($scope.Subjectdata[i].SubjectType == "B") {
                                    if ($scope.Subjectdata[i].CheckSub == true) {
                                        if ($scope.Subjectdata[i].SequenceNo == 1) {
                                            if ($scope.Subjectdata[i].SubjectID != obj.SubjectID) {
                                                alert("Second year language must be same as first year");
                                                obj.CheckSub = false;
                                                return;
                                            }
                                        }
                                    }
                                }
                            }
                            $scope.checkSecondLangSecond = true;
                        }
                    }
                }
                else {
                    if (obj.SubjectType == "C") {
                        for (var i = 0; i < $scope.Subjectdata.length; i++) {
                            if ($scope.Subjectdata[i].SubjectType == "C") {
                                if (obj.CheckSub == true) {
                                    if ($scope.Subjectdata[i].ExamID == obj.ExamID) {
                                        $scope.Subjectdata[i].CheckSub = true;
                                    }
                                } else {
                                    if ($scope.Subjectdata[i].ExamID == obj.ExamID) {
                                        $scope.Subjectdata[i].CheckSub = false;
                                    }
                                }
                            }
                        }
                    }
                }
                if ((boolexam1 == true) && (boolexam2 == true)) {
                    if (obj.CheckSub == false) {
                        $scope.ExamFormsAdditionalSubjects.RegularFees = $scope.RegularFeesPer / 2;
                        $scope.ExamFormsAdditionalSubjects.FormFees = $scope.ExamFormsAdditionalSubjects.RegularFees + $scope.LateFeesCurrent;
                    } else {
                        $scope.ExamFormsAdditionalSubjects.RegularFees = $scope.RegularFeesPer * 2;
                        $scope.ExamFormsAdditionalSubjects.FormFees = $scope.ExamFormsAdditionalSubjects.RegularFees + $scope.LateFeesCurrent;
                    }
                } else {
                    $scope.ExamFormsAdditionalSubjects.RegularFees = $scope.RegularFeesPer * 1;
                    $scope.ExamFormsAdditionalSubjects.FormFees = $scope.ExamFormsAdditionalSubjects.RegularFees + $scope.LateFeesCurrent;
                }

                //} else {
                //    //for subjects
                //    if (obj.SequenceNo == 1) {
                //        for (var i = 0; i < $scope.Subjectdata.length; i++) {
                //            if ($scope.Subjectdata[i].SubjectType == "B") {
                //                if ($scope.Subjectdata[i].CheckSub == true) {
                //                    if ($scope.Subjectdata[i].SequenceNo == 2) {
                //                        if ($scope.Subjectdata[i].SubjectID != obj.SubjectID) {
                //                            alert("First year subject must be same as second year");
                //                            obj.CheckSub = false;
                //                            return;
                //                        }
                //                    }
                //                }
                //            }
                //        }
                //    } else {
                //        for (var i = 0; i < $scope.Subjectdata.length; i++) {
                //            if ($scope.Subjectdata[i].SubjectType == "B") {
                //                if ($scope.Subjectdata[i].CheckSub == true) {
                //                    if ($scope.Subjectdata[i].SequenceNo == 2) {
                //                        if ($scope.Subjectdata[i].SubjectID != obj.SubjectID) {
                //                            alert("Second year subject must be same as first year");
                //                            obj.CheckSub = false;
                //                            return;
                //                        }
                //                    }
                //                }
                //            }
                //        }
                //    }
                //}
            }
            else {
                if (obj.SubjectType == "C") {
                    for (var i = 0; i < $scope.Subjectdata.length; i++) {
                        if ($scope.Subjectdata[i].SubjectType == "C") {
                            if (obj.CheckSub == true) {
                                if ($scope.Subjectdata[i].ExamID == obj.ExamID) {
                                    $scope.Subjectdata[i].CheckSub = true;
                                }
                            } else {
                                if ($scope.Subjectdata[i].ExamID == obj.ExamID) {
                                    $scope.Subjectdata[i].CheckSub = false;
                                }
                            }
                        }
                    }
                }
                if (obj.SubjectType == "B") {
                    if (obj.SequenceNo == 1) {
                        if ($scope.checkSecondLangFirst == true) {
                            $scope.checkSecondLangFirst = false;
                        }
                    } else {
                        if ($scope.checkSecondLangSecond == true) {
                            $scope.checkSecondLangSecond = false;
                        }
                    }
                }
            }
        }
        $scope.GetCheckSubject = function (obj) {
            $scope.RegularFeesPer = 0;
            var LateFeesAdditional = ExamFormsAdditionalSubjectsService.GetAcademicYearFeesByDateForAdditional(AppSettings.ExamInstID, obj.ExamID);
            LateFeesAdditional.then(function (data, status, headers, config, error) {
                $scope.ExamFormsAdditionalSubjects.LateFees = data;
                var ExamFormFees = ExamFormsAdditionalSubjectsService.GetAdditionalExamFormFees(AppSettings.ExamInstID, obj.ExamID);
                ExamFormFees.then(function (data, status, headers, config, error) {
                    $scope.ExamFormsAdditionalSubjects.RegularFees = data[0].RegularFees;
                    $scope.RegularFeesPer = data[0].RegularFees;
                    $scope.ExamFormsAdditionalSubjects.ExamFeesID = data[0].ExamFeesID;
                    if ($scope.ExamFormsAdditionalSubjects.LateFees == undefined) { $scope.ExamFormsAdditionalSubjects.LateFees = 0; }
                    if ($scope.ExamFormsAdditionalSubjects.RegularFees == undefined) { $scope.ExamFormsAdditionalSubjects.RegularFees = 0; }
                    $scope.ExamFormsAdditionalSubjects.FormFees = $scope.ExamFormsAdditionalSubjects.RegularFees + $scope.ExamFormsAdditionalSubjects.LateFees;
                    $scope.SubjectFillLogic(obj);
                }, function (Instdata, status, headers, config) {
                    alert(error);
                });
            }, function (Instdata, status, headers, config) {
                alert(error);
            });
        }
    });
});

