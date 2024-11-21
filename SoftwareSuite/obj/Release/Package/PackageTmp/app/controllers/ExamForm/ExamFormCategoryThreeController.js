define(['app'], function (app) {
    app.controller("ExamFormCategoryThreeController", function ($scope, $state, $stateParams, AppSettings, ExamFormCategoryThreeService, BasicCourseService, BasicBranchService, BasicMainGroupService, BasicExamService) {
        $scope.ExamFormCategoryThree = { ExmFrmID: $stateParams.ExmFrmID, CourseID: $stateParams.CourseID, CollegeID: $stateParams.CollegeID, ExamID: $stateParams.ExamID, BranchID: $stateParams.BranchID };
        var CourseID = $stateParams.CourseID;
        var ExamID = $stateParams.ExamID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExamFormCategoryThreeRightsdata = [];
        ExamFormCategoryThreeRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormCategoryThreeRightsdata.length; i++) {
            if (ExamFormCategoryThreeRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormCategoryThree.ExmFrmID == 0) {
                    if (ExamFormCategoryThreeRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormCategoryThreeRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormCategoryThreeRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var StudList = ExamFormCategoryThreeService.GetStudCatList();
        StudList.then(function (StudCatdata, status, headers, config, error) {
            $scope.StudCatList = StudCatdata;
            for (var i = 0; i < $scope.StudCatList.length; i++) {
                if ($scope.StudCatList[i].StudCatID == 3) {
                    $scope.ExamFormCategoryThree.StudCatName = $scope.StudCatList[i].StudCatName;
                    $scope.ExamFormCategoryThree.StudCatID = $scope.StudCatList[i].StudCatID;
                }
            }
        }, function (StudCatdata, status, headers, config) {
            alert(error);
        });
        $scope.Updateddisable = false;
        $scope.checkDisable = false;
        if ($scope.ExamFormCategoryThree.ExmFrmID == 0) {
            var InsScheduleList = ExamFormCategoryThreeService.GetCurrExmInstSchedule(AppSettings.ExamInstID);
            InsScheduleList.then(function (Instdata, status, headers, config, error) {
                if (Instdata == 0) {
                    alert("Exam Instance Shedule not found current instance");
                    RedirectToListPage("ExamForm.ExamFormCategoryThreeList");
                }
            }, function (Instdata, status, headers, config) {
                alert(error);
            });
            var InsScheduleList = ExamFormCategoryThreeService.GetInstScheduleDate(AppSettings.ExamInstID);
            InsScheduleList.then(function (Instschdate, status, headers, config, error) {
                if (Instschdate == 0) {
                    alert("Exam Instance schedule not open for current instance");
                    RedirectToListPage("ExamForm.ExamFormCategoryThreeList");
                }
            }, function (Instdata, status, headers, config) {
                alert(error);
            });
            var FormNo = ExamFormCategoryThreeService.GetExmFrmMaxNo(AppSettings.ExamInstID, $scope.ExamFormCategoryThree.CollegeID);
            FormNo.then(function (data) {
                $scope.ExamFormCategoryThree.Formno = data;
                var PhysDisbList = ExamFormCategoryThreeService.GetPhysDisbList();
                PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                    $scope.PhysDisbList = PhysDisbListdata;
                    var SpclConsList = ExamFormCategoryThreeService.GetSpclConsList();
                    SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                        $scope.SpclConsList = SpclConsListdata;
                        var MainGroupList = ExamFormCategoryThreeService.GetMainGroupListByCollegeId($scope.ExamFormCategoryThree.CollegeID, $scope.ExamFormCategoryThree.CourseID, AppSettings.AcdYrID);
                        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                            $scope.MainGroupList = MainGroupListdata;
                            var MedList = ExamFormCategoryThreeService.GetBasicMediumList();
                            MedList.then(function (Mediumdata, status, headers, config, error) {
                                $scope.MediumList = Mediumdata;
                                var CourseList = BasicCourseService.GetBasicCourseList();
                                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                                    $scope.CourseList = BasicCoursedata;
                                    for (var i = 0; i < $scope.CourseList.length; i++) {
                                        if ($scope.CourseList[i].CourseID == $stateParams.CourseID) {
                                            $scope.ExamFormCategoryThree.CourseName = $scope.CourseList[i].CourseName;
                                            $scope.ExamFormCategoryThree.CourseID = $scope.CourseList[i].CourseID;
                                        }
                                    }
                                    var ExamList = BasicExamService.GetBasicExamList(0);
                                    ExamList.then(function (Examdata, status, headers, config, error) {
                                        $scope.ExamList = Examdata;
                                        for (var i = 0; i < $scope.ExamList.length; i++) {
                                            if ($scope.ExamList[i].ExamID == $stateParams.ExamID) {
                                                $scope.ExamFormCategoryThree.ExmName = $scope.ExamList[i].ExmName;
                                                $scope.ExamFormCategoryThree.ExamID = $scope.ExamList[i].ExamID;
                                            }
                                        }
                                        var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                                        BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                                            $scope.BasicBranchList = BasicBranchdata;
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == $stateParams.BranchID) {
                                                    $scope.ExamFormCategoryThree.BranchName = $scope.BasicBranchList[i].BranchName;
                                                    $scope.ExamFormCategoryThree.BranchID = $scope.BasicBranchList[i].BranchID;
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
            var MainGroupList = ExamFormCategoryThreeService.GetMainGroupListByCollegeId($scope.ExamFormCategoryThree.CollegeID, $scope.ExamFormCategoryThree.CourseID, AppSettings.AcdYrID);
            MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                $scope.MainGroupList = MainGroupListdata;
                var MedList = ExamFormCategoryThreeService.GetBasicMediumList();
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;
                    var CourseList = BasicCourseService.GetBasicCourseList();
                    CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                        $scope.CourseList = BasicCoursedata;
                        var PhysDisbList = ExamFormCategoryThreeService.GetPhysDisbList();
                        PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                            $scope.PhysDisbList = PhysDisbListdata;
                            var SpclConsList = ExamFormCategoryThreeService.GetSpclConsList();
                            SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                                $scope.SpclConsList = SpclConsListdata;
                                var ExamList = BasicExamService.GetBasicExamList(0);
                                ExamList.then(function (Examdata, status, headers, config, error) {
                                    $scope.ExamList = Examdata;
                                    var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                                    BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                                        $scope.BasicBranchList = BasicBranchdata;

                                        var ExamListdata = ExamFormCategoryThreeService.GetExamFormCategoryThreeById($scope.ExamFormCategoryThree.ExmFrmID);
                                        ExamListdata.then(function (data, status, headers, config, error) {
                                            $scope.ExamFormCategoryThree = data[0];
                                            for (var i = 0; i < $scope.CourseList.length; i++) {
                                                if ($scope.CourseList[i].CourseID == data[0].CourseID) {
                                                    $scope.ExamFormCategoryThree.CourseName = $scope.CourseList[i].CourseName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.ExamList.length; i++) {
                                                if ($scope.ExamList[i].ExamID == data[0].ExamID) {
                                                    $scope.ExamFormCategoryThree.ExmName = $scope.ExamList[i].ExmName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == data[0].BranchID) {
                                                    $scope.ExamFormCategoryThree.BranchName = $scope.BasicBranchList[i].BranchName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                if ($scope.StudCatList[i].StudCatID == 3) {
                                                    $scope.ExamFormCategoryThree.StudCatName = $scope.StudCatList[i].StudCatName;
                                                    $scope.ExamFormCategoryThree.StudCatID = $scope.StudCatList[i].StudCatID;
                                                }
                                            }
                                            for (var i = 0; i < data[0].ExamFormsSubject.length; i++) {
                                                data[0].ExamFormsSubject[i].CheckSub = true;
                                            }
                                            $scope.ExamFormCategoryThree.LateFees = $scope.LateFeesCurrent;
                                            $scope.ExamFormCategoryThree.FormFees = $scope.ExamFormCategoryThree.RegularFees + $scope.ExamFormCategoryThree.LateFees;
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
                        }, function (BasicCoursedata, status, headers, config) {
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
        }
        var LateFeesImprovement = ExamFormCategoryThreeService.GetAcademicYearFeesByDateForBridge(AppSettings.ExamInstID, $scope.ExamFormCategoryThree.ExamID);
        LateFeesImprovement.then(function (data, status, headers, config, error) {
            $scope.ExamFormCategoryThree.LateFees = data;
            $scope.LateFeesCurrent = data;
            var ExamFormFees = ExamFormCategoryThreeService.GetRegularExamFormFees(AppSettings.ExamInstID, $scope.ExamFormCategoryThree.ExamID);
            ExamFormFees.then(function (data, status, headers, config, error) {
                $scope.ExamFormCategoryThree.TheroyFee = data[0].TheroyFee;
                $scope.ExamFormCategoryThree.PractFee = data[0].PractFee;
                $scope.ExamFormCategoryThree.ImprovementPerSubjectFee = data[0].ImprovementPerSubjectFee;
                $scope.ExamFormCategoryThree.ExamFeesID = data[0].ExamFeesID;
                $scope.TheroyFee = data[0].TheroyFee;
                $scope.PractFee = data[0].PractFee;
                if ($scope.ExamFormCategoryThree.LateFees == undefined) { $scope.ExamFormCategoryThree.LateFees = 0; }
                if ($scope.ExamFormCategoryThree.RegularFees == undefined) { $scope.ExamFormCategoryThree.RegularFees = 0; }
                $scope.ExamFormCategoryThree.RegularFees = data[0].PractFee;
                $scope.ExamFormCategoryThree.FormFees = $scope.ExamFormCategoryThree.RegularFees + $scope.ExamFormCategoryThree.LateFees;
            }, function (Instdata, status, headers, config) {
                alert(error);
            });
        }, function (Instdata, status, headers, config) {
            alert(error);
        });
        $scope.GetGroupSubjects = function (MainGrpID) {
            if (MainGrpID != null) {
                var SubList = ExamFormCategoryThreeService.GetGroupSubjects(MainGrpID, $scope.ExamFormCategoryThree.ExamID);
                SubList.then(function (subdata, status, headers, config, error) {
                    $scope.Subjectdata = subdata;
                }, function (BasicBranchdata, status, headers, config) {
                    alert(error);
                });
            }
        }

        $scope.GetMigrationData = function () {
            var ExamFormList = ExamFormCategoryThreeService.GetSSCHallTicketNoAndInsertIntoPrestudent($scope.ExamFormCategoryThree.PRNNo);
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
            var ExamFormList = ExamFormCategoryThreeService.GetExamFormDataByPrnNo($scope.ExamFormCategoryThree.PRNNo, AppSettings.ExamInstID, $scope.ExamFormCategoryThree.CollegeID, $scope.ExamFormCategoryThree.CourseID, $scope.ExamFormCategoryThree.ExamID, $scope.ExamFormCategoryThree.BranchID);
            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                if (ExamFormdata.length == 0) {
                    alert("Data not found for this PRN No./HTNo");
                    $scope.ExamFormCategoryThree.StudName = "";
                    $scope.ExamFormCategoryThree.Gender = "";
                    $scope.ExamFormCategoryThree.MainGrpID = "";
                    $scope.ExamFormCategoryThree.PreStudRegID = "";
                    $scope.ExamFormCategoryThree.MediumID = "";
                    $scope.ExamFormCategoryThree.SubName = "";
                    $scope.ExamFormCategoryThree.SecondLangID = "";
                    $scope.Subjectdata = [];
                    return;
                } else {
                    if ((ExamFormdata[0].ExamFormsSubject == "") || (ExamFormdata[0].ExamFormsSubject == undefined)) {
                        alert("No Any subjects for category3 ");
                        return;
                    } else {
                        $scope.fillData(ExamFormdata);
                    }
                }
            }, function (ExamFormdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.RegularFeesPerFee = 0;
        $scope.fillData = function (ExamFormdata) {
            for (var i = 0; i < $scope.ExamList.length; i++) {
                if ($scope.ExamList[i].ExamID == $scope.ExamFormCategoryThree.ExamID) {
                    $scope.ExamFormCategoryThree.SequenceNo = $scope.ExamList[i].SequenceNo;
                }
            }
            $scope.ExamFormCategoryThree.StudName = ExamFormdata[0].StudName;
            $scope.ExamFormCategoryThree.Gender = ExamFormdata[0].Gender;
            $scope.ExamFormCategoryThree.MainGrpID = ExamFormdata[0].MainGrpID;
            $scope.ExamFormCategoryThree.PreStudRegID = ExamFormdata[0].PreStudRegID;

            $scope.ExamFormCategoryThree.ExamFeesID = ExamFormdata[0].ExamFeesID;
            $scope.ExamFormCategoryThree.MediumID = ExamFormdata[0].MediumID;
            $scope.ExamFormCategoryThree.SubName = ExamFormdata[0].SubName;
            $scope.ExamFormCategoryThree.SecondLangID = ExamFormdata[0].SecondLangID;
            var PracCnt = 0;
            var ThCnt = 0;
            for (var i = 0; i < ExamFormdata[0].ExamFormsSubject.length; i++) {
                if ($scope.ExamFormCategoryThree.SequenceNo == "2") {
                    if (ExamFormdata[0].ExamFormsSubject[i].SequenceNo == "2") {
                        ExamFormdata[0].ExamFormsSubject[i].CheckSub = true;
                    } else {
                        ExamFormdata[0].ExamFormsSubject[i].CheckSub = false;
                    }
                }
                else {
                    ExamFormdata[0].ExamFormsSubject[i].CheckSub = true;
                }
                if (ExamFormdata[0].ExamFormsSubject[i].EvalTypeID == 1) {
                    ThCnt = ThCnt + 1;
                } else {
                    PracCnt = PracCnt + 1;
                }
            }
            if ((ExamFormdata[0].ExamFormsSubject.length == ThCnt) || (ExamFormdata[0].ExamFormsSubject.length == ThCnt)) {
                $scope.ExamFormCategoryThree.RegularFees = $scope.ExamFormCategoryThree.TheroyFee;
                $scope.ExamFormCategoryThree.FormFees = $scope.ExamFormCategoryThree.LateFees + $scope.ExamFormCategoryThree.RegularFees;
            } else {
                $scope.ExamFormCategoryThree.RegularFees = $scope.ExamFormCategoryThree.PractFee;
                $scope.ExamFormCategoryThree.FormFees = $scope.ExamFormCategoryThree.LateFees + $scope.ExamFormCategoryThree.RegularFees;
            }
            //if (PracCnt > 0) {
            //    $scope.ExamFormCategoryThree.RegularFees = $scope.ExamFormCategoryThree.PractFee;
            //    $scope.ExamFormCategoryThree.FormFees = $scope.ExamFormCategoryThree.LateFees + $scope.ExamFormCategoryThree.RegularFees;
            //} else {
            //    $scope.ExamFormCategoryThree.RegularFees = $scope.ExamFormCategoryThree.TheroyFee;
            //    $scope.ExamFormCategoryThree.FormFees = $scope.ExamFormCategoryThree.LateFees + $scope.ExamFormCategoryThree.RegularFees;
            //}
            //if ($scope.ExamFormCategoryThree.SequenceNo == "2") {
            //    //$scope.checkDisable = true;
            //    $scope.ExamFormCategoryThree.RegularFees = ExamFormdata[0].RegularFees;
            //    $scope.ExamFormCategoryThree.FormFees = $scope.ExamFormCategoryThree.LateFees + $scope.ExamFormCategoryThree.RegularFees;
            //    $scope.RegularFeesPerFee = ExamFormdata[0].RegularFees;
            //}
            $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
        }
        $scope.ShowPRNData = function () { //GetExamFormData
            if ($scope.ExamFormCategoryThree.PRNNo == "" || $scope.ExamFormCategoryThree.PRNNo == undefined) {
                alert("Enter PRN No./HTNo");
                return;
            }
            if ($("#ApplicationDate").val() != "") { $scope.ExamFormCategoryThree.ApplicationDate = $("#ApplicationDate").val(); }
            var ExPRNCountList = ExamFormCategoryThreeService.GetPrnNoCountInPrestudentReg($scope.ExamFormCategoryThree.PRNNo);
            ExPRNCountList.then(function (data, status, headers, config, error) {
                if (data == 0) {
                    $scope.GetMigrationData();
                } else {
                    var UnStudCaseList = ExamFormCategoryThreeService.GetCheckUnStudCase($scope.ExamFormCategoryThree.PRNNo, $scope.ExamFormCategoryThree.ApplicationDate, AppSettings.ExamInstID);
                    UnStudCaseList.then(function (data, status, headers, config, error) {
                        if (data[0].UnStudCase == 1) {
                            alert("This student is Debarred up to date " + data[0].UpToDateDesc + "");
                            return;
                        } else {
                            //var studResultList = ExamFormCategoryThreeService.GetcheckstudPassOrNot($scope.ExamFormCategoryThree.PRNNo, AppSettings.ExamInstID, $scope.ExamFormCategoryThree.CollegeID, $scope.ExamFormCategoryThree.CourseID, $scope.ExamFormCategoryThree.ExamID, $scope.ExamFormCategoryThree.BranchID);
                            //studResultList.then(function (data, status, headers, config, error) {
                            //    if (data == "P") {
                            var ExamFormList = ExamFormCategoryThreeService.GetExamFormDataByPrnNo($scope.ExamFormCategoryThree.PRNNo, AppSettings.ExamInstID, $scope.ExamFormCategoryThree.CollegeID, $scope.ExamFormCategoryThree.CourseID, $scope.ExamFormCategoryThree.ExamID, $scope.ExamFormCategoryThree.BranchID);
                            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                                if (ExamFormdata.length == 0) {
                                    alert("Data not found for this PRN No.");
                                    $scope.ExamFormCategoryThree.StudName = "";
                                    $scope.ExamFormCategoryThree.Gender = "";
                                    $scope.ExamFormCategoryThree.MainGrpID = "";
                                    $scope.ExamFormCategoryThree.PreStudRegID = "";
                                    $scope.ExamFormCategoryThree.MediumID = "";
                                    $scope.ExamFormCategoryThree.SubName = "";
                                    $scope.Subjectdata = [];
                                    return;
                                }
                                else {
                                    var studResultList = ExamFormCategoryThreeService.GetcheckstudPassOrNotForCatThree($scope.ExamFormCategoryThree.PRNNo, AppSettings.ExamInstID, $scope.ExamFormCategoryThree.CollegeID, $scope.ExamFormCategoryThree.CourseID, $scope.ExamFormCategoryThree.ExamID, $scope.ExamFormCategoryThree.BranchID);
                                    studResultList.then(function (data, status, headers, config, error) {
                                        if (data == "F") {
                                            if ((ExamFormdata[0].ExamFormsSubject == "") || (ExamFormdata[0].ExamFormsSubject == undefined)) {
                                                alert("No Any subjects for Cateogry 3");
                                                return;
                                            } else {
                                                $scope.fillData(ExamFormdata);
                                            }
                                        } else {
                                            alert("You are not eligible to Fill up the Form ");
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
                        //else {
                        //    alert("You can't apply for improvement because you have not passed 2nd year.");
                        //    return;
                        //}
                        //}, function (ExamFormdata, status, headers, config) {
                        //    alert(error);
                        //});
                    }, function (ExamFormdata, status, headers, config) {
                        alert(error);
                    });
                }
            }, function (ExamFormdata, status, headers, config) {
                alert(error);
            });
        }
        $("#ApplicationDate").ejDatePicker({ value: new Date(), allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#ApplicationDate").ejDatePicker("disable");
        $scope.ExamFormCategoryThree.ImprovementFlag = "N";
        $scope.ExamFormCategoryThree.AddSubFlag = "N";
        $scope.ExamFormCategoryThree.BridgeCourseFlag = "N";
        //$scope.ExamFormCategoryThree.StudCatID = "R";
        $scope.ExamFormCategoryThree.StudType = "F";
        $scope.ExamFormCategoryThree.Handicaped = "N";
        $scope.Subjectdata = [];
        var gridColumns = [
            { field: "ExmSubID", headerText: "ExmSubID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "EvalTypeID", headerText: "EvalTypeID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "SubjectID", headerText: "SubjectID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "ExmSubCode", headerText: "Subject Code", textAlign: ej.TextAlign.Left, width: 100, allowEditing: false },
            { field: "ExmSubName", headerText: "Subject Name", textAlign: ej.TextAlign.Left, width: 300, allowEditing: false },
            { field: "SubResult", headerText: "Sub Result", textAlign: ej.TextAlign.Left, width: 100, allowEditing: false },
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



        $scope.SaveExamFormCategoryThree = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                if ($("#ApplicationDate").val() != "") { $scope.ExamFormCategoryThree.ApplicationDate = $("#ApplicationDate").val(); }
                $scope.ExamFormCategoryThree.ExamFormsSubject = $scope.Subjectdata;
                $scope.ExamFormCategoryThree.CreLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormCategoryThree.UpdLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormCategoryThree.AcdYrID = AppSettings.AcdYrID;
                $scope.ExamFormCategoryThree.ExamInstID = AppSettings.ExamInstID;

                if (($scope.ExamFormCategoryThree.ExmFrmID == undefined) || ($scope.ExamFormCategoryThree.ExmFrmID == "")) { $scope.ExamFormCategoryThree.ExmFrmID = 0; }
                if ($scope.ExamFormCategoryThree.ExmFrmID == 0) {
                    var getPromise = ExamFormCategoryThreeService.GetCheckPRNNoPresent($scope.ExamFormCategoryThree.PRNNo, $scope.ExamFormCategoryThree.ExamInstID);
                    getPromise.then(function (data) {
                        if (data != 0) {
                            alert("Exam form is already present for this student.");
                            $scope.isupdatableDisable = false;
                            return;
                        } else {
                            $scope.ExamFormCategoryThree.StudCatID = 3;
                            var getPromise = ExamFormCategoryThreeService.AddExamFormCategoryThree($scope.ExamFormCategoryThree);
                            getPromise.then(function (msg) {
                                $scope.isupdatableDisable = false;
                                alert("Saved successfully!!");
                                $scope.ExamFormCategoryThree.StudName = "";
                                $scope.ExamFormCategoryThree.Gender = "";
                                $scope.ExamFormCategoryThree.MainGrpID = "";
                                $scope.ExamFormCategoryThree.PreStudRegID = "";
                                $scope.ExamFormCategoryThree.PRNNo = "";
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
                    var getPromise = ExamFormCategoryThreeService.UpdateExamFormCategoryThree($scope.ExamFormCategoryThree);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Updated successfully!!");
                        $scope.ExamFormCategoryThree.StudName = "";
                        $scope.ExamFormCategoryThree.Gender = "";
                        $scope.ExamFormCategoryThree.MainGrpID = "";
                        $scope.ExamFormCategoryThree.PreStudRegID = "";
                        $scope.ExamFormCategoryThree.PRNNo = "";
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
        $scope.ExamFormUpdatedAlreadyGenerated = function (ExamFormCategoryThree) {
            var getPromise = ExamFormCategoryThreeService.AddExamFormUpdatedAlreadyGenerated(ExamFormCategoryThree);
            getPromise.then(function (msg) {
                $scope.isupdatableDisable = false;
                alert("Saved successfully!!");
                $scope.ExamFormCategoryThree.StudName = "";
                $scope.ExamFormCategoryThree.Gender = "";
                $scope.ExamFormCategoryThree.MainGrpID = "";
                $scope.ExamFormCategoryThree.PreStudRegID = "";
                $scope.ExamFormCategoryThree.PRNNo = "";
                $scope.Subjectdata = [];
            }, function (error) {
                $scope.isupdatableDisable = false;
                alert(error);
            });
        }
        $scope.DeleteExamFormCategoryThree = function () {
            var getData = ExamFormCategoryThreeService.DeleteExamFormCategoryThree($scope.ExamFormCategoryThree.ExmFrmID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.ExamFormCategoryThree.PRNNo == undefined) || ($scope.ExamFormCategoryThree.PRNNo == "")) {
                alert("Enter PRN No.");
                return false;
            }
            if (($scope.ExamFormCategoryThree.StudName == undefined) || ($scope.ExamFormCategoryThree.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormCategoryThree.CollegeID == undefined) || ($scope.ExamFormCategoryThree.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormCategoryThree.MainGrpID == undefined) || ($scope.ExamFormCategoryThree.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamFormCategoryThree.Formno == undefined) || ($scope.ExamFormCategoryThree.Formno == "")) {
                alert("Enter Form no");
                return false;
            }
            if (($scope.ExamFormCategoryThree.FormFees == undefined) || ($scope.ExamFormCategoryThree.FormFees == "")) {
                alert("Enter Form Fees");
                return false;
            }
            if ($scope.ExamFormCategoryThree.Handicaped == 'Y') {
                if (($scope.ExamFormCategoryThree.PhysDisbID == 0) || ($scope.ExamFormCategoryThree.PhysDisbID == 1)) {
                    alert("Select Physical Disability");
                    return false;
                }
                if ($scope.ExamFormCategoryThree.PhysDisbID > 1) {
                    if (($scope.ExamFormCategoryThree.PhysDisbPer == undefined) || ($scope.ExamFormCategoryThree.PhysDisbPer == "") || ($scope.ExamFormCategoryThree.PhysDisbPer == 0)) {
                        alert("Enter Disability %.");
                        return false;
                    }
                }
                if ($scope.ExamFormCategoryThree.PhysDisbID == 2) {
                    if ($scope.ExamFormCategoryThree.PhysDisbPer < 40) {
                        alert("Enter Disability % must be greater than or equal to 40, if you are blind condidate.");
                        return false;
                    }
                    if ($scope.ExamFormCategoryThree.BranchID == 2) {
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
            $state.go('Exam.ExamFormCategoryThreeList');
        }

        $scope.GetCheckSubject = function (obj) {
            if ($scope.ExamFormCategoryThree.SequenceNo == "1") {
                alert("Can't UnCheck First year subjects");
                obj.CheckSub = true;
                return;
            }
            if (obj.SequenceNo == "2") {
                alert("Can't UnCheck 2nd year subjects");
                obj.CheckSub = true;
                return;
            } else {
                if ($scope.ExamFormCategoryThree.SequenceNo == "2") {
                    if (obj.CheckSub == true) {
                        $scope.ExamFormCategoryThree.RegularFees = $scope.ExamFormCategoryThree.RegularFees + $scope.TheroyFee;
                        $scope.ExamFormCategoryThree.FormFees = $scope.ExamFormCategoryThree.RegularFees + $scope.ExamFormCategoryThree.LateFees;
                    } else {
                        $scope.ExamFormCategoryThree.RegularFees = $scope.ExamFormCategoryThree.RegularFees - $scope.TheroyFee;
                        $scope.ExamFormCategoryThree.FormFees = $scope.ExamFormCategoryThree.RegularFees + $scope.ExamFormCategoryThree.LateFees;
                    }
                    for (var i = 0; i < $scope.Subjectdata.length; i++) {
                        if ($scope.Subjectdata[i].SequenceNo == "1") {
                            if (obj.CheckSub == true) {
                                $scope.Subjectdata[i].CheckSub = true;
                            }
                            else {
                                $scope.Subjectdata[i].CheckSub = false;
                            }
                        }
                    }
                }
            }
            //if ($scope.ExamFormCategoryThree.SequenceNo == "1") {
            //    var thoeryfess = 0; var practfees = 0;
            //    if (obj.CheckSub == true) {
            //        $scope.ExamFormCategoryThree.RegularFees = $scope.ExamFormCategoryThree.RegularFees + $scope.TheroyFee;
            //        $scope.ExamFormCategoryThree.FormFees = $scope.ExamFormCategoryThree.RegularFees + $scope.ExamFormCategoryThree.LateFees;
            //    } else {
            //        $scope.ExamFormCategoryThree.RegularFees = $scope.ExamFormCategoryThree.RegularFees - $scope.ExamFormCategoryThree.TheroyFee;
            //        $scope.ExamFormCategoryThree.FormFees = $scope.ExamFormCategoryThree.RegularFees - $scope.ExamFormCategoryThree.LateFees;
            //    }
            //}
        }
    });
});
