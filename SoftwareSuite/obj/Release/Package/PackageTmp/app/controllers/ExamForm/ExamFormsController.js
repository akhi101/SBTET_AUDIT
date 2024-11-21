define(['app'], function (app) {
    app.controller("ExamFormsController", function ($scope, $state, $stateParams, AppSettings, ExamFormsService, BasicCourseService, BasicBranchService, BasicMainGroupService, BasicExamService) {
        $scope.ExamForms = { ExmFrmID: $stateParams.ExmFrmID, CourseID: $stateParams.CourseID, CollegeID: $stateParams.CollegeID, ExamID: $stateParams.ExamID, BranchID: $stateParams.BranchID };
        var CourseID = $stateParams.CourseID;
        var ExamID = $stateParams.ExamID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExamFormsRightsdata = [];
        ExamFormsRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormsRightsdata.length; i++) {
            if (ExamFormsRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamForms.ExmFrmID == 0) {
                    if (ExamFormsRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormsRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormsRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var StudList = ExamFormsService.GetStudCatList();
        StudList.then(function (StudCatdata, status, headers, config, error) {
            $scope.StudCatList = StudCatdata;
            //for (var i = 0; i < $scope.StudCatList.length; i++) {
            //    if (($scope.StudCatList[i].StudCatID == 1) ($scope.StudCatList[i].StudCatID == 4)){
            //        $scope.ExamForms.StudCatName = $scope.StudCatList[i].StudCatName;
            //        $scope.ExamForms.StudCatID = $scope.StudCatList[i].StudCatID;
            //    }
            //}
        }, function (StudCatdata, status, headers, config) {
            alert(error);
        });
        $scope.Updateddisable = false;
        if ($scope.ExamForms.ExmFrmID == 0) {
            var InsScheduleList = ExamFormsService.GetCurrExmInstSchedule(AppSettings.ExamInstID, $scope.ExamForms.ExamID);
            InsScheduleList.then(function (Instdata, status, headers, config, error) {
                if (Instdata == 0) {
                    alert("Exam Instance schedule not found current instance");
                    RedirectToListPage("ExamForm.ExamFormsList");
                }
            }, function (Instdata, status, headers, config) {
                alert(error);
            });
            var InsScheduleList = ExamFormsService.GetInstScheduleDate(AppSettings.ExamInstID);
            InsScheduleList.then(function (Instschdate, status, headers, config, error) {
                if (Instschdate == 0) {
                    alert("Exam Instance schedule not open for current instance");
                    RedirectToListPage("ExamForm.ExamFormsList");
                }
            }, function (Instdata, status, headers, config) {
                alert(error);
            });

            var FormNo = ExamFormsService.GetExmFrmMaxNo(AppSettings.ExamInstID, $scope.ExamForms.CollegeID);
            FormNo.then(function (data) {
                $scope.ExamForms.Formno = data;
                var PhysDisbList = ExamFormsService.GetPhysDisbList();
                PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                    $scope.PhysDisbList = PhysDisbListdata;
                    var SpclConsList = ExamFormsService.GetSpclConsList();
                    SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                        $scope.SpclConsList = SpclConsListdata;
                        var MainGroupList = ExamFormsService.GetMainGroupListByCollegeId($scope.ExamForms.CollegeID, $scope.ExamForms.CourseID, AppSettings.AcdYrID);
                        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                            $scope.MainGroupList = MainGroupListdata;
                            var MedList = ExamFormsService.GetBasicMediumList();
                            MedList.then(function (Mediumdata, status, headers, config, error) {
                                $scope.MediumList = Mediumdata;
                                var CourseList = BasicCourseService.GetBasicCourseList();
                                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                                    $scope.CourseList = BasicCoursedata;
                                    for (var i = 0; i < $scope.CourseList.length; i++) {
                                        if ($scope.CourseList[i].CourseID == $stateParams.CourseID) {
                                            $scope.ExamForms.CourseName = $scope.CourseList[i].CourseName;
                                            $scope.ExamForms.CourseID = $scope.CourseList[i].CourseID;
                                        }
                                    }
                                    var ExamList = BasicExamService.GetBasicExamList(0);
                                    ExamList.then(function (Examdata, status, headers, config, error) {
                                        $scope.ExamList = Examdata;
                                        for (var i = 0; i < $scope.ExamList.length; i++) {
                                            if ($scope.ExamList[i].ExamID == $stateParams.ExamID) {
                                                $scope.ExamForms.ExmName = $scope.ExamList[i].ExmName;
                                                $scope.ExamForms.ExamID = $scope.ExamList[i].ExamID;
                                            }
                                        }
                                        var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                                        BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                                            $scope.BasicBranchList = BasicBranchdata;
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == $stateParams.BranchID) {
                                                    $scope.ExamForms.BranchName = $scope.BasicBranchList[i].BranchName;
                                                    $scope.ExamForms.BranchID = $scope.BasicBranchList[i].BranchID;
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
            var MainGroupList = ExamFormsService.GetMainGroupListByCollegeId($scope.ExamForms.CollegeID, $scope.ExamForms.CourseID, AppSettings.AcdYrID);
            MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                $scope.MainGroupList = MainGroupListdata;
                var MedList = ExamFormsService.GetBasicMediumList();
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;
                    var PhysDisbList = ExamFormsService.GetPhysDisbList();
                    PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                        $scope.PhysDisbList = PhysDisbListdata;
                        var SpclConsList = ExamFormsService.GetSpclConsList();
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
                                        var ExamListdata = ExamFormsService.GetExamFormsById($scope.ExamForms.ExmFrmID);
                                        ExamListdata.then(function (data, status, headers, config, error) {
                                            $scope.ExamForms = data[0];
                                            $scope.isupdatableDisable = true;
                                            for (var i = 0; i < $scope.CourseList.length; i++) {
                                                if ($scope.CourseList[i].CourseID == data[0].CourseID) {
                                                    $scope.ExamForms.CourseName = $scope.CourseList[i].CourseName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.ExamList.length; i++) {
                                                if ($scope.ExamList[i].ExamID == data[0].ExamID) {
                                                    $scope.ExamForms.ExmName = $scope.ExamList[i].ExmName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == data[0].BranchID) {
                                                    $scope.ExamForms.BranchName = $scope.BasicBranchList[i].BranchName;
                                                }
                                            }

                                            for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                if ($scope.StudCatList[i].StudCatID == data[0].StudCatID) {
                                                    $scope.ExamForms.StudCatName = $scope.StudCatList[i].StudCatName;
                                                    $scope.ExamForms.StudCatID = $scope.StudCatList[i].StudCatID;
                                                }
                                            }
                                       
                                            //if ($scope.ExamForms.StudCatID = 1) {   // main data
                                            //    $scope.ExamForms.StudCatID = "R";
                                            //} else if ($scope.ExamForms.StudCatID = 2) {
                                            //    $scope.ExamForms.StudCatID = "P";
                                            //} else if ($scope.ExamForms.StudCatID = 3) {
                                            //    $scope.ExamForms.StudCatID = "E";
                                            //}
                                            $scope.ExamForms.RegularFees = data[0].FormFees;
                                            $scope.ExamForms.LateFees = $scope.LateFeesCurrent;
                                            $scope.ExamForms.FormFees = $scope.ExamForms.RegularFees + $scope.ExamForms.LateFees;
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
        var LateFeesImprovement = ExamFormsService.GetAcademicYearFeesByDateForBridge(AppSettings.ExamInstID, $scope.ExamForms.ExamID);
        LateFeesImprovement.then(function (data, status, headers, config, error) {
            $scope.LateFeesCurrent = data;
        }, function (Instdata, status, headers, config) {
            alert(error);
        });
        $scope.GetGroupSubjects = function (MainGrpID) {
            if (MainGrpID != null) {
                var SubList = ExamFormsService.GetGroupSubjects(MainGrpID, $scope.ExamForms.ExamID);
                SubList.then(function (subdata, status, headers, config, error) {
                    $scope.Subjectdata = subdata;
                }, function (BasicBranchdata, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.GetMigrationData = function () {
            var ExamFormList = ExamFormsService.GetSSCHallTicketNoAndInsertIntoPrestudent($scope.ExamForms.PRNNo);
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
            var ExamFormList = ExamFormsService.GetExamFormDataByPrnNo($scope.ExamForms.PRNNo, AppSettings.ExamInstID, $scope.ExamForms.CollegeID, $scope.ExamForms.CourseID, $scope.ExamForms.ExamID, $scope.ExamForms.BranchID);
            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                if (ExamFormdata.length == 0) {
                    alert("Data not found for this PRN No./HTNo");
                    $scope.ExamForms.StudName = "";
                    $scope.ExamForms.Gender = "";
                    $scope.ExamForms.MainGrpID = "";
                    $scope.ExamForms.PreStudRegID = "";
                    $scope.ExamForms.MediumID = "";
                    $scope.ExamForms.SecondLangID = "";
                    $scope.Subjectdata = [];
                    return;
                } else {
                    for (var i = 0; i < $scope.ExamList.length; i++) {
                        if ($scope.ExamList[i].ExamID == $scope.ExamForms.ExamID) {
                            $scope.SequenceNo = $scope.ExamList[i].SequenceNo;
                        }
                    }
                    var studResultList = ExamFormsService.GetcheckstudPassOrNot($scope.ExamForms.PRNNo, AppSettings.ExamInstID, $scope.ExamForms.CollegeID, $scope.ExamForms.CourseID, $scope.ExamForms.ExamID, $scope.ExamForms.BranchID);
                    studResultList.then(function (data, status, headers, config, error) {
                        if (data == "P") {
                            alert("Student has already passed, So you can not apply here.");
                            return;
                        } else if (($scope.SequenceNo == "1") && (data == "F")) {
                            alert("Student is 2nd year,So you can not applied here.");
                            return;
                        } else {
                            if (ExamFormdata[0].ReAddmissonStudFlag == "Y") {
                                alert("Student can not apply here. Please Contact Helpdesk.");
                                return;
                            } else {
                                for (var i = 0; i < $scope.ExamList.length; i++) {
                                    if ($scope.ExamList[i].ExamID == $scope.ExamForms.ExamID) {
                                        $scope.SequenceNo = $scope.ExamList[i].SequenceNo;
                                    }
                                }
                                if ($scope.SequenceNo == "2") {
                                    if (data == "F") {
                                        for (var i = 0; i < $scope.StudCatList.length; i++) {
                                            if ($scope.StudCatList[i].StudCatID == 4) {
                                                $scope.ExamForms.StudCatName = $scope.StudCatList[i].StudCatName;
                                                $scope.ExamForms.StudCatID = $scope.StudCatList[i].StudCatID;
                                            }
                                        }
                                    }
                                } else {
                                    for (var i = 0; i < $scope.StudCatList.length; i++) {
                                        if ($scope.StudCatList[i].StudCatID == 1) {
                                            $scope.ExamForms.StudCatName = $scope.StudCatList[i].StudCatName;
                                            $scope.ExamForms.StudCatID = $scope.StudCatList[i].StudCatID;
                                        }
                                    }
                                }
                                $scope.ExamForms.StudName = ExamFormdata[0].StudName;
                                $scope.ExamForms.Gender = ExamFormdata[0].Gender;
                                $scope.ExamForms.MainGrpID = ExamFormdata[0].MainGrpID;
                                $scope.ExamForms.PreStudRegID = ExamFormdata[0].PreStudRegID;
                                $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
                                $scope.ExamForms.RegularFees = ExamFormdata[0].RegularFees;
                                $scope.ExamForms.FormFees = ExamFormdata[0].FormFees;
                                $scope.ExamForms.LateFees = ExamFormdata[0].LateFees;
                                $scope.ExamForms.ExamFeesID = ExamFormdata[0].ExamFeesID;
                                $scope.ExamForms.MediumID = ExamFormdata[0].MediumID;
                                $scope.ExamForms.CollegeTransDate = ExamFormdata[0].CollegeTransDate;
                                $scope.ExamForms.SecondLangID = ExamFormdata[0].SecondLangID;
                            }
                        }
                    }, function (ExamFormdata, status, headers, config) {
                        alert(error);
                    });
                }
            }, function (ExamFormdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.ShowPRNData = function () { //GetExamFormData
            if ($scope.ExamForms.PRNNo == "" || $scope.ExamForms.PRNNo == undefined) {
                alert("Enter PRN No./HTNo");
                return;
            }
            if ($("#ApplicationDate").val() != "") { $scope.ExamForms.ApplicationDate = $("#ApplicationDate").val(); }
            var getPromise = ExamFormsService.GetCheckPRNNoPresent($scope.ExamForms.PRNNo, AppSettings.ExamInstID);
            getPromise.then(function (data) {
                if (data != 0) {
                    alert("Exam form is already generated agains this PRNNo.");
                    $scope.isupdatableDisable = false;
                    return;
                } else {
                    var ExPRNCountList = ExamFormsService.GetPrnNoCountInPrestudentReg($scope.ExamForms.PRNNo);
                    ExPRNCountList.then(function (data, status, headers, config, error) {
                        if (data == 0) {
                            $scope.GetMigrationData();
                        } else {
                            var UnStudCaseList = ExamFormsService.GetCheckUnStudCase($scope.ExamForms.PRNNo, $scope.ExamForms.ApplicationDate, AppSettings.ExamInstID);
                            UnStudCaseList.then(function (data, status, headers, config, error) {
                                if (data[0].UnStudCase == 1) {
                                    alert("This student is Debarred up to date " + data[0].UpToDateDesc + "");
                                    return;
                                } else {
                                    for (var i = 0; i < $scope.ExamList.length; i++) {
                                        if ($scope.ExamList[i].ExamID == $scope.ExamForms.ExamID) {
                                            $scope.SequenceNo = $scope.ExamList[i].SequenceNo;
                                        }
                                    }
                                    var studResultList = ExamFormsService.GetcheckstudPassOrNot($scope.ExamForms.PRNNo, AppSettings.ExamInstID, $scope.ExamForms.CollegeID, $scope.ExamForms.CourseID, $scope.ExamForms.ExamID, $scope.ExamForms.BranchID);
                                    studResultList.then(function (data, status, headers, config, error) {
                                        if (data == "P") {
                                            alert("Student is already passed,So you can not applied here.");
                                            return;
                                        } else if (($scope.SequenceNo == "1") && (data == "F"))
                                        {
                                            alert("Student is 2nd year,So you can not applied here.");
                                            return;
                                        }
                                        else {
                                            for (var i = 0; i < $scope.ExamList.length; i++) {
                                                if ($scope.ExamList[i].ExamID == $scope.ExamForms.ExamID) {
                                                    $scope.SequenceNo = $scope.ExamList[i].SequenceNo;
                                                }
                                            }
                                            if ($scope.SequenceNo == "2") {
                                                if (data == "F") {
                                                    for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                        if ($scope.StudCatList[i].StudCatID == 4) {
                                                            $scope.ExamForms.StudCatName = $scope.StudCatList[i].StudCatName;
                                                            $scope.ExamForms.StudCatID = $scope.StudCatList[i].StudCatID;
                                                        }
                                                    }
                                                } else {
                                                    for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                        if ($scope.StudCatList[i].StudCatID == 1) {
                                                            $scope.ExamForms.StudCatName = $scope.StudCatList[i].StudCatName;
                                                            $scope.ExamForms.StudCatID = $scope.StudCatList[i].StudCatID;
                                                        }
                                                    }
                                                }
                                            } else {
                                                for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                    if ($scope.StudCatList[i].StudCatID == 1) {
                                                        $scope.ExamForms.StudCatName = $scope.StudCatList[i].StudCatName;
                                                        $scope.ExamForms.StudCatID = $scope.StudCatList[i].StudCatID;
                                                    }
                                                }
                                            }
                                            var ExamFormList = ExamFormsService.GetExamFormDataByPrnNo($scope.ExamForms.PRNNo, AppSettings.ExamInstID, $scope.ExamForms.CollegeID, $scope.ExamForms.CourseID, $scope.ExamForms.ExamID, $scope.ExamForms.BranchID);
                                            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                                                if (ExamFormdata.length == 0) {
                                                    alert("Data not found for this PRN No./HTNo");
                                                    $scope.ExamForms.StudName = "";
                                                    $scope.ExamForms.Gender = "";
                                                    $scope.ExamForms.MainGrpID = "";
                                                    $scope.ExamForms.PreStudRegID = "";
                                                    $scope.ExamForms.MediumID = "";
                                                    $scope.ExamForms.SecondLangID = "";
                                                    $scope.Subjectdata = [];
                                                    return;
                                                }
                                                else {
                                                    if (ExamFormdata[0].ReAddmissonStudFlag == "Y") {
                                                        alert("Student can not apply from here. Please Contact Helpdesk.");
                                                        return;
                                                    } else {
                                                        $scope.ExamForms.StudName = ExamFormdata[0].StudName;
                                                        $scope.ExamForms.Gender = ExamFormdata[0].Gender;
                                                        $scope.ExamForms.MainGrpID = ExamFormdata[0].MainGrpID;
                                                        $scope.ExamForms.PreStudRegID = ExamFormdata[0].PreStudRegID;
                                                        $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
                                                        $scope.ExamForms.RegularFees = ExamFormdata[0].RegularFees;
                                                        $scope.ExamForms.FormFees = ExamFormdata[0].FormFees;
                                                        $scope.ExamForms.LateFees = ExamFormdata[0].LateFees;
                                                        $scope.ExamForms.ExamFeesID = ExamFormdata[0].ExamFeesID;
                                                        $scope.ExamForms.MediumID = ExamFormdata[0].MediumID;
                                                        $scope.ExamForms.SubName = ExamFormdata[0].SubName;
                                                        $scope.ExamForms.SecondLangID = ExamFormdata[0].SecondLangID;
                                                    }
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
            }, function (error) {
                $scope.isupdatableDisable = false;
                alert(error);
            });
        }
        $("#ApplicationDate").ejDatePicker({ value: new Date(), allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#ApplicationDate").ejDatePicker("disable");
        $scope.ExamForms.ImprovementFlag = "N";
        $scope.ExamForms.AddSubFlag = "N";
        $scope.ExamForms.BridgeCourseFlag = "N";

        $scope.ExamForms.StudType = "F";
        $scope.ExamForms.Handicaped = "N";
        $scope.Subjectdata = [];
        var gridColumns = [
            //{ field: "SrNo", headerText: "Sr.No", textAlign: ej.TextAlign.Left, width: 0, isPrimaryKey: true, allowEditing: false },
            //{ field: "MainGrpID", headerText: "MainGrpID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            //{ field: "BranchID", headerText: "BranchID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "ExmSubID", headerText: "ExmSubID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "EvalTypeID", headerText: "EvalTypeID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "SubjectID", headerText: "SubjectID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "ExmSubCode", headerText: "Subject Code", textAlign: ej.TextAlign.Left, width: 100, allowEditing: false },
            { field: "ExmSubName", headerText: "Subject Name", textAlign: ej.TextAlign.Left, width: 300, allowEditing: false },
            //{ field: "SubResult", headerText: "Sub Result", textAlign: ej.TextAlign.Left, width: 100, allowEditing: false },
            { field: "SubTyp", headerText: "Sub Type", textAlign: ej.TextAlign.Left, width: 0 },
            { field: "GrpSeqNo", headerText: "GrpSeqNo", textAlign: ej.TextAlign.Left, width: 0 },
            { field: "ExamID", headerText: "ExamID", textAlign: ej.TextAlign.Left, width: 0 }
        ];
        $("#SubjectGrid").ejGrid({
            dataSource: $scope.Subjectdata,
            allowSearching: true,
            allowScrolling: true,
            editSettings: { allowAdding: true },
            columns: gridColumns
        });



        $scope.SaveExamForms = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                if ($("#ApplicationDate").val() != "") { $scope.ExamForms.ApplicationDate = $("#ApplicationDate").val(); }
                $scope.ExamForms.ExamFormsSubject = $scope.Subjectdata;
                $scope.ExamForms.CreLoginID = AppSettings.LoggedUserId;
                $scope.ExamForms.UpdLoginID = AppSettings.LoggedUserId;
                $scope.ExamForms.AcdYrID = AppSettings.AcdYrID;
                $scope.ExamForms.ExamInstID = AppSettings.ExamInstID;
                //if ($scope.ExamForms.StudCatID = "R") {
                //    $scope.ExamForms.StudCatID = 1;
                //} else if ($scope.ExamForms.StudCatID = "P") {
                //    $scope.ExamForms.StudCatID = 2;
                //} else {
                //    $scope.ExamForms.StudCatID = 3;
                //}
                if (($scope.ExamForms.ExmFrmID == undefined) || ($scope.ExamForms.ExmFrmID == "")) { $scope.ExamForms.ExmFrmID = 0; }
                if ($scope.ExamForms.ExmFrmID == 0) {
                    var getPromise = ExamFormsService.GetCheckPRNNoPresent($scope.ExamForms.PreStudRegID, AppSettings.ExamInstID);
                    getPromise.then(function (data) {
                        if (data != 0) {
                            alert("Exam form is already generated agains this PRNNo.");
                            $scope.isupdatableDisable = false;
                            return;
                        } else {
                            var getPromise = ExamFormsService.AddExamForms($scope.ExamForms);
                            getPromise.then(function (msg) {
                                $scope.isupdatableDisable = false;
                                alert("Saved successfully!!");
                                $scope.ExamForms.StudName = "";
                                $scope.ExamForms.Gender = "";
                                $scope.ExamForms.MainGrpID = "";
                                $scope.ExamForms.PreStudRegID = "";
                                $scope.ExamForms.PRNNo = "";
                                $scope.ExamForms.FormFees = "";
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
                    var getPromise = ExamFormsService.UpdateExamForms($scope.ExamForms);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Updated successfully!!");
                        $scope.ExamForms.StudName = "";
                        $scope.ExamForms.Gender = "";
                        $scope.ExamForms.MainGrpID = "";
                        $scope.ExamForms.PreStudRegID = "";
                        $scope.ExamForms.PRNNo = "";
                        $scope.ExamForms.FormFees = "";
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
        $scope.DeleteExamForms = function () {
            var getData = ExamFormsService.DeleteExamForms($scope.ExamForms.ExmFrmID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.ExamForms.PRNNo == undefined) || ($scope.ExamForms.PRNNo == "")) {
                alert("Enter PRN No.");
                return false;
            }
            if (($scope.ExamForms.StudName == undefined) || ($scope.ExamForms.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamForms.CollegeID == undefined) || ($scope.ExamForms.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamForms.MainGrpID == undefined) || ($scope.ExamForms.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamForms.Formno == undefined) || ($scope.ExamForms.Formno == "")) {
                alert("Enter Form no");
                return false;
            }
            if (($scope.ExamForms.FormFees == undefined) || ($scope.ExamForms.FormFees == "")) {
                alert("Enter Form Fees");
                return false;
            }
            if ($scope.ExamForms.Handicaped == 'Y') {
                if (($scope.ExamForms.PhysDisbID == 0) || ($scope.ExamForms.PhysDisbID == 1)) {
                    alert("Select Physical Disability");
                    return false;
                }
                if ($scope.ExamForms.PhysDisbID > 1) {
                    if (($scope.ExamForms.PhysDisbPer == undefined) || ($scope.ExamForms.PhysDisbPer == "") || ($scope.ExamForms.PhysDisbPer == 0)) {
                        alert("Enter Disability %.");
                        return false;
                    }
                }
                if ($scope.ExamForms.PhysDisbID == 2) {
                    if ($scope.ExamForms.PhysDisbPer < 40) {
                        alert("Enter Disability % must be greater than or equal to 40, if you are blind condidate.");
                        return false;
                    }
                    if ($scope.ExamForms.BranchID == 2) {
                        alert("Blind condidate can't take science group");
                        return false;
                    }
                }
            }
            if ($scope.Subjectdata.length == 0) {
                alert("No any subject selected");
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
            $state.go('Exam.ExamFormsList');
        }

        $scope.GetCalFees = function () {
            if (($scope.ExamForms.PRNNo == undefined) || ($scope.ExamForms.PRNNo == "")) {
                alert("Enter PRN No.");
                return false;
            }
            if (($scope.ExamForms.StudName == undefined) || ($scope.ExamForms.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamForms.CollegeID == undefined) || ($scope.ExamForms.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamForms.MainGrpID == undefined) || ($scope.ExamForms.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamForms.Formno == undefined) || ($scope.ExamForms.Formno == "")) {
                alert("Enter Form no");
                return false;
            }
            if ($scope.Subjectdata.length == 0) {
                alert("No any subject selected");
                return false;
            }
            $scope.isupdatableDisable = true;
            if ($("#ApplicationDate").val() != "") { $scope.ExamForms.ApplicationDate = $("#ApplicationDate").val(); }
            $scope.ExamForms.ExamFormsSubject = $scope.Subjectdata;
            $scope.ExamForms.CreLoginID = AppSettings.LoggedUserId;
            $scope.ExamForms.UpdLoginID = AppSettings.LoggedUserId;
            $scope.ExamForms.AcdYrID = AppSettings.AcdYrID;
            $scope.ExamForms.ExamInstID = AppSettings.ExamInstID;
            $scope.ExamForms.ImprovementFlag = "N";
            $scope.ExamForms.AddSubFlag = "N";
            $scope.ExamForms.BridgeCourseFlag = "N";
            //if ($scope.ExamForms.StudCatID = "R") {
            //    $scope.ExamForms.StudCatID = 1;
            //} else if ($scope.ExamForms.StudCatID = "P") {
            //    $scope.ExamForms.StudCatID = 2;
            //} else {
            //    $scope.ExamForms.StudCatID = 3;
            //}
            var FeeAmtList = ExamFormsService.GetAcademicYearFeesByDate($scope.ExamForms);
            FeeAmtList.then(function (FeeAmountdata, status, headers, config, error) {
                $scope.ExamForms.FormFees = FeeAmountdata;
            }, function (FeeAmountdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.ClearAmount = function () {
            $scope.ExamForms.RegularFees = "";
            $scope.ExamForms.FormFees = "";
            $scope.ExamForms.LateFees = "";
        }
        //$scope.ShowPRNData = function () {
        //    var PRNDataList = ExamFormsService.GetPRNDataList(ExamForms.PRNNo, ExamForms.AcdYrID);
        //    PRNDataList.then(function (PRNdata, status, headers, config, error) {
        //        $scope.PRNDataList = PRNdata;
        //    }, function (MainGrpdata, status, headers, config) {
        //        alert(error);
        //    });
        //}
    });
});
