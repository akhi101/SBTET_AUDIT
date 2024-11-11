define(['app'], function (app) {
    app.controller("ExamFormsImprovementController", function ($scope, $state, $stateParams, AppSettings, ExamFormsImprovementService, BasicCourseService, BasicBranchService, BasicMainGroupService, BasicExamService) {
        $scope.ExamFormsImprovement = { ExmFrmID: $stateParams.ExmFrmID, CourseID: $stateParams.CourseID, CollegeID: $stateParams.CollegeID, ExamID: $stateParams.ExamID, BranchID: $stateParams.BranchID };
        var CourseID = $stateParams.CourseID;
        var ExamID = $stateParams.ExamID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExamFormsImprovementRightsdata = [];
        ExamFormsImprovementRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormsImprovementRightsdata.length; i++) {
            if (ExamFormsImprovementRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormsImprovement.ExmFrmID == 0) {
                    if (ExamFormsImprovementRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormsImprovementRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormsImprovementRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var StudList = ExamFormsImprovementService.GetStudCatList();
        StudList.then(function (StudCatdata, status, headers, config, error) {
            $scope.StudCatList = StudCatdata;
            for (var i = 0; i < $scope.StudCatList.length; i++) {
                if ($scope.StudCatList[i].StudCatID == 2) {
                    $scope.ExamFormsImprovement.StudCatName = $scope.StudCatList[i].StudCatName;
                    $scope.ExamFormsImprovement.StudCatID = $scope.StudCatList[i].StudCatID;
                }
            }
        }, function (StudCatdata, status, headers, config) {
            alert(error);
        });
        $scope.Updateddisable = false;
        $scope.checkDisable = false;
        if ($scope.ExamFormsImprovement.ExmFrmID == 0) {
            var InsScheduleList = ExamFormsImprovementService.GetCurrExmInstSchedule(AppSettings.ExamInstID);
            InsScheduleList.then(function (Instdata, status, headers, config, error) {
                if (Instdata == 0) {
                    alert("Exam Instance Shedule not found current instance");
                    RedirectToListPage("ExamForm.ExamFormsImprovementList");
                }
            }, function (Instdata, status, headers, config) {
                alert(error);
            });
            var InsScheduleList = ExamFormsImprovementService.GetInstScheduleDate(AppSettings.ExamInstID);
            InsScheduleList.then(function (Instschdate, status, headers, config, error) {
                if (Instschdate == 0) {
                    alert("Exam Instance schedule not open for current instance");
                    RedirectToListPage("ExamForm.ExamFormsImprovementList");
                }
            }, function (Instdata, status, headers, config) {
                alert(error);
            });
            var FormNo = ExamFormsImprovementService.GetExmFrmMaxNo(AppSettings.ExamInstID, $scope.ExamFormsImprovement.CollegeID);
            FormNo.then(function (data) {
                $scope.ExamFormsImprovement.Formno = data;
                var PhysDisbList = ExamFormsImprovementService.GetPhysDisbList();
                PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                    $scope.PhysDisbList = PhysDisbListdata;
                    var SpclConsList = ExamFormsImprovementService.GetSpclConsList();
                    SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                        $scope.SpclConsList = SpclConsListdata;
                        var MainGroupList = ExamFormsImprovementService.GetMainGroupListByCollegeId($scope.ExamFormsImprovement.CollegeID, $scope.ExamFormsImprovement.CourseID, AppSettings.AcdYrID);
                        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                            $scope.MainGroupList = MainGroupListdata;
                            var MedList = ExamFormsImprovementService.GetBasicMediumList();
                            MedList.then(function (Mediumdata, status, headers, config, error) {
                                $scope.MediumList = Mediumdata;
                                var CourseList = BasicCourseService.GetBasicCourseList();
                                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                                    $scope.CourseList = BasicCoursedata;
                                    for (var i = 0; i < $scope.CourseList.length; i++) {
                                        if ($scope.CourseList[i].CourseID == $stateParams.CourseID) {
                                            $scope.ExamFormsImprovement.CourseName = $scope.CourseList[i].CourseName;
                                            $scope.ExamFormsImprovement.CourseID = $scope.CourseList[i].CourseID;
                                        }
                                    }
                                    var ExamList = BasicExamService.GetBasicExamList(0);
                                    ExamList.then(function (Examdata, status, headers, config, error) {
                                        $scope.ExamList = Examdata;
                                        for (var i = 0; i < $scope.ExamList.length; i++) {
                                            if ($scope.ExamList[i].ExamID == $stateParams.ExamID) {
                                                $scope.ExamFormsImprovement.ExmName = $scope.ExamList[i].ExmName;
                                                $scope.ExamFormsImprovement.ExamID = $scope.ExamList[i].ExamID;
                                            }
                                        }
                                        var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                                        BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                                            $scope.BasicBranchList = BasicBranchdata;
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == $stateParams.BranchID) {
                                                    $scope.ExamFormsImprovement.BranchName = $scope.BasicBranchList[i].BranchName;
                                                    $scope.ExamFormsImprovement.BranchID = $scope.BasicBranchList[i].BranchID;
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
            var MainGroupList = ExamFormsImprovementService.GetMainGroupListByCollegeId($scope.ExamFormsImprovement.CollegeID, $scope.ExamFormsImprovement.CourseID, AppSettings.AcdYrID);
            MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                $scope.MainGroupList = MainGroupListdata;
                var MedList = ExamFormsImprovementService.GetBasicMediumList();
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;
                    var CourseList = BasicCourseService.GetBasicCourseList();
                    CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                        $scope.CourseList = BasicCoursedata;
                        var PhysDisbList = ExamFormsImprovementService.GetPhysDisbList();
                        PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                            $scope.PhysDisbList = PhysDisbListdata;
                            var SpclConsList = ExamFormsImprovementService.GetSpclConsList();
                            SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                                $scope.SpclConsList = SpclConsListdata;
                                var ExamList = BasicExamService.GetBasicExamList(0);
                                ExamList.then(function (Examdata, status, headers, config, error) {
                                    $scope.ExamList = Examdata;
                                    var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                                    BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                                        $scope.BasicBranchList = BasicBranchdata;

                                        var ExamListdata = ExamFormsImprovementService.GetExamFormsImprovementById($scope.ExamFormsImprovement.ExmFrmID);
                                        ExamListdata.then(function (data, status, headers, config, error) {
                                            $scope.ExamFormsImprovement = data[0];
                                            for (var i = 0; i < $scope.CourseList.length; i++) {
                                                if ($scope.CourseList[i].CourseID == data[0].CourseID) {
                                                    $scope.ExamFormsImprovement.CourseName = $scope.CourseList[i].CourseName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.ExamList.length; i++) {
                                                if ($scope.ExamList[i].ExamID == data[0].ExamID) {
                                                    $scope.ExamFormsImprovement.ExmName = $scope.ExamList[i].ExmName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                if ($scope.BasicBranchList[i].BranchID == data[0].BranchID) {
                                                    $scope.ExamFormsImprovement.BranchName = $scope.BasicBranchList[i].BranchName;
                                                }
                                            }
                                            for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                if ($scope.StudCatList[i].StudCatID == 2) {
                                                    $scope.ExamFormsImprovement.StudCatName = $scope.StudCatList[i].StudCatName;
                                                    $scope.ExamFormsImprovement.StudCatID = $scope.StudCatList[i].StudCatID;
                                                }
                                            }
                                            //if ($scope.ExamFormsImprovement.StudCatID = 1) {   // main data
                                            //    $scope.ExamFormsImprovement.StudCatID = "R";
                                            //} else if ($scope.ExamFormsImprovement.StudCatID = 2) {
                                            //    $scope.ExamFormsImprovement.StudCatID = "P";
                                            //} else if ($scope.ExamFormsImprovement.StudCatID = 3) {
                                            //    $scope.ExamFormsImprovement.StudCatID = "E";
                                            //}
                                            for (var i = 0; i < data[0].ExamFormsSubject.length; i++) {
                                                data[0].ExamFormsSubject[i].CheckSub = true;
                                            }
                                            $scope.ExamFormsImprovement.LateFees = $scope.LateFeesCurrent;
                                            $scope.ExamFormsImprovement.FormFees = $scope.ExamFormsImprovement.RegularFees + $scope.ExamFormsImprovement.LateFees;
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
        var LateFeesImprovement = ExamFormsImprovementService.GetAcademicYearFeesByDateForBridge(AppSettings.ExamInstID, $scope.ExamFormsImprovement.ExamID);
        LateFeesImprovement.then(function (data, status, headers, config, error) {
            $scope.ExamFormsImprovement.LateFees = data;
            $scope.LateFeesCurrent = data;
            var ExamFormFees = ExamFormsImprovementService.GetRegularExamFormFees(AppSettings.ExamInstID, $scope.ExamFormsImprovement.ExamID);
            ExamFormFees.then(function (data, status, headers, config, error) {
                $scope.ExamFormsImprovement.TheroyFee = data[0].TheroyFee;
                $scope.ExamFormsImprovement.PractFee = data[0].PractFee;
                $scope.ExamFormsImprovement.ImprovementPerSubjectFee = data[0].ImprovementPerSubjectFee;
                $scope.ImpTheroyFee = data[0].ImpTheroyFee;
                $scope.ImpPractFee = data[0].ImpPractFee;
                $scope.RegularFeesPerFee = data[0].ImprovementPerSubjectFee;
                $scope.ExamFormsImprovement.ExamFeesID = data[0].ExamFeesID;
                if ($scope.ExamFormsImprovement.LateFees == undefined) { $scope.ExamFormsImprovement.LateFees = 0; }
                if ($scope.ExamFormsImprovement.RegularFees == undefined) { $scope.ExamFormsImprovement.RegularFees = 0; }
                $scope.ExamFormsImprovement.FormFees = $scope.ExamFormsImprovement.RegularFees + $scope.ExamFormsImprovement.LateFees;
            }, function (Instdata, status, headers, config) {
                alert(error);
            });
        }, function (Instdata, status, headers, config) {
            alert(error);
        });
        $scope.GetGroupSubjects = function (MainGrpID) {
            if (MainGrpID != null) {
                var SubList = ExamFormsImprovementService.GetGroupSubjects(MainGrpID, $scope.ExamFormsImprovement.ExamID);
                SubList.then(function (subdata, status, headers, config, error) {
                    $scope.Subjectdata = subdata;
                }, function (BasicBranchdata, status, headers, config) {
                    alert(error);
                });
            }
        }

        $scope.GetMigrationData = function () {
            var ExamFormList = ExamFormsImprovementService.GetSSCHallTicketNoAndInsertIntoPrestudent($scope.ExamFormsImprovement.PRNNo);
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
            var ExamFormList = ExamFormsImprovementService.GetExamFormDataByPrnNo($scope.ExamFormsImprovement.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsImprovement.CollegeID, $scope.ExamFormsImprovement.CourseID, $scope.ExamFormsImprovement.ExamID, $scope.ExamFormsImprovement.BranchID);
            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                if (ExamFormdata.length == 0) {
                    alert("Data not found for this PRN No./HTNo");
                    $scope.ExamFormsImprovement.StudName = "";
                    $scope.ExamFormsImprovement.Gender = "";
                    $scope.ExamFormsImprovement.MainGrpID = "";
                    $scope.ExamFormsImprovement.PreStudRegID = "";
                    $scope.ExamFormsImprovement.MediumID = "";
                    $scope.ExamFormsImprovement.SubName = "";
                    $scope.ExamFormsImprovement.SecondLangID = "";
                    $scope.Subjectdata = [];
                    return;
                } else {
                    var studResultList = ExamFormsImprovementService.GetcheckstudPassOrNot($scope.ExamFormsImprovement.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsImprovement.CollegeID, $scope.ExamFormsImprovement.CourseID, $scope.ExamFormsImprovement.ExamID, $scope.ExamFormsImprovement.BranchID);
                    studResultList.then(function (data, status, headers, config, error) {
                        if (data == "P") {
                            if ((ExamFormdata[0].ExamFormsSubject == "") || (ExamFormdata[0].ExamFormsSubject == undefined)) {
                                alert("No Any subjects for improvement");
                                return;
                            } else {
                                $scope.fillData(ExamFormdata);
                            }
                        } else if (data == "") {
                            alert("Please Select 2nd year To Fill up the Form.");
                            return;
                        }
                        else {
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
        $scope.RegularFeesPerFee = 0;
        $scope.fillData = function (ExamFormdata)  
        {
            for (var i = 0; i < $scope.ExamList.length; i++) {
                if ($scope.ExamList[i].ExamID == $scope.ExamFormsImprovement.ExamID) {
                    $scope.ExamFormsImprovement.SequenceNo = $scope.ExamList[i].SequenceNo;
                }
            }
            $scope.ExamFormsImprovement.StudName = ExamFormdata[0].StudName;
            $scope.ExamFormsImprovement.Gender = ExamFormdata[0].Gender;
            $scope.ExamFormsImprovement.MainGrpID = ExamFormdata[0].MainGrpID;
            $scope.ExamFormsImprovement.PreStudRegID = ExamFormdata[0].PreStudRegID;

            $scope.ExamFormsImprovement.ExamFeesID = ExamFormdata[0].ExamFeesID;
            $scope.ExamFormsImprovement.MediumID = ExamFormdata[0].MediumID;
            $scope.ExamFormsImprovement.SubName = ExamFormdata[0].SubName;
            $scope.ExamFormsImprovement.SecondLangID = ExamFormdata[0].SecondLangID;
            var PracCnt = 0;
            var ThCnt = 0;
            for (var i = 0; i < ExamFormdata[0].ExamFormsSubject.length; i++) {
                if (ExamFormdata[0].ExamFormsSubject[i].SequenceNo  == "2") {
                    ExamFormdata[0].ExamFormsSubject[i].CheckSub = true;
                } else {
                    ExamFormdata[0].ExamFormsSubject[i].CheckSub = false;
                }
                if (ExamFormdata[0].ExamFormsSubject[i].EvalTypeID == 1) {
                    ThCnt = ThCnt + 1;
                } else {
                    PracCnt = PracCnt + 1;
                }
            }
            if (PracCnt > 0) {
                $scope.ExamFormsImprovement.RegularFees = $scope.ImpPractFee;
                $scope.ExamFormsImprovement.FormFees = $scope.ExamFormsImprovement.LateFees + $scope.ExamFormsImprovement.RegularFees;
            } else {
                $scope.ExamFormsImprovement.RegularFees = $scope.ImpTheroyFee;
                $scope.ExamFormsImprovement.FormFees = $scope.ExamFormsImprovement.LateFees + $scope.ExamFormsImprovement.RegularFees;
            }
            //if ($scope.ExamFormsImprovement.SequenceNo == "2") {
            //    //$scope.checkDisable = true;
            //    $scope.ExamFormsImprovement.RegularFees = $scope.ImpPractFee; //ExamFormdata[0].RegularFees;
            //    $scope.ExamFormsImprovement.FormFees = $scope.ExamFormsImprovement.LateFees + $scope.ExamFormsImprovement.RegularFees;
            //    $scope.RegularFeesPerFee = ExamFormdata[0].RegularFees;
            //}
            $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
        }
        $scope.ShowPRNData = function () { //GetExamFormData
            if ($scope.ExamFormsImprovement.PRNNo == "" || $scope.ExamFormsImprovement.PRNNo == undefined) {
                alert("Enter PRN No./HTNo");
                return;
            }
            if ($("#ApplicationDate").val() != "") { $scope.ExamFormsImprovement.ApplicationDate = $("#ApplicationDate").val(); }
            var ExPRNCountList = ExamFormsImprovementService.GetPrnNoCountInPrestudentReg($scope.ExamFormsImprovement.PRNNo);
            ExPRNCountList.then(function (data, status, headers, config, error) {
                if (data == 0) {
                    $scope.GetMigrationData();
                } else {
                    var UnStudCaseList = ExamFormsImprovementService.GetCheckUnStudCase($scope.ExamFormsImprovement.PRNNo, $scope.ExamFormsImprovement.ApplicationDate, AppSettings.ExamInstID);
                    UnStudCaseList.then(function (data, status, headers, config, error) {
                        if (data[0].UnStudCase == 1) {
                            alert("This student is Debarred up to date " + data[0].UpToDateDesc + "");
                            return;
                        } else {
                            //var studResultList = ExamFormsImprovementService.GetcheckstudPassOrNot($scope.ExamFormsImprovement.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsImprovement.CollegeID, $scope.ExamFormsImprovement.CourseID, $scope.ExamFormsImprovement.ExamID, $scope.ExamFormsImprovement.BranchID);
                            //studResultList.then(function (data, status, headers, config, error) {
                            //    if (data == "P") {
                            var ExamFormList = ExamFormsImprovementService.GetExamFormDataByPrnNo($scope.ExamFormsImprovement.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsImprovement.CollegeID, $scope.ExamFormsImprovement.CourseID, $scope.ExamFormsImprovement.ExamID, $scope.ExamFormsImprovement.BranchID);
                            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                                if (ExamFormdata.length == 0) {
                                    alert("Data not found for this PRN No.");
                                    $scope.ExamFormsImprovement.StudName = "";
                                    $scope.ExamFormsImprovement.Gender = "";
                                    $scope.ExamFormsImprovement.MainGrpID = "";
                                    $scope.ExamFormsImprovement.PreStudRegID = "";
                                    $scope.ExamFormsImprovement.MediumID = "";
                                    $scope.ExamFormsImprovement.SubName = "";
                                    $scope.Subjectdata = [];
                                    return;
                                }
                                else {
                                    var studResultList = ExamFormsImprovementService.GetcheckstudPassOrNot($scope.ExamFormsImprovement.PRNNo, AppSettings.ExamInstID, $scope.ExamFormsImprovement.CollegeID, $scope.ExamFormsImprovement.CourseID, $scope.ExamFormsImprovement.ExamID, $scope.ExamFormsImprovement.BranchID);
                                    studResultList.then(function (data, status, headers, config, error) {
                                        if (data == "P") {
                                            if ((ExamFormdata[0].ExamFormsSubject == "") || (ExamFormdata[0].ExamFormsSubject == undefined)) {
                                                alert("No Any subjects for improvement");
                                                return;
                                            } else {
                                                $scope.fillData(ExamFormdata);
                                            }
                                        } else if (data == "") {
                                            alert("You are not eligible to Fill up the Form ");
                                            return;
                                        }
                                        else {
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
        $scope.ExamFormsImprovement.ImprovementFlag = "N";
        $scope.ExamFormsImprovement.AddSubFlag = "N";
        $scope.ExamFormsImprovement.BridgeCourseFlag = "N";
        //$scope.ExamFormsImprovement.StudCatID = "R";
        $scope.ExamFormsImprovement.StudType = "F";
        $scope.ExamFormsImprovement.Handicaped = "N";
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



        $scope.SaveExamFormsImprovement = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                if ($("#ApplicationDate").val() != "") { $scope.ExamFormsImprovement.ApplicationDate = $("#ApplicationDate").val(); }
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
                $scope.ExamFormsImprovement.ExamFormsSubject = examsubs;
                $scope.ExamFormsImprovement.CreLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsImprovement.UpdLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsImprovement.AcdYrID = AppSettings.AcdYrID;
                $scope.ExamFormsImprovement.ExamInstID = AppSettings.ExamInstID;
                $scope.ExamFormsImprovement.ImprovementFlag = "Y";
                
                if (($scope.ExamFormsImprovement.ExmFrmID == undefined) || ($scope.ExamFormsImprovement.ExmFrmID == "")) { $scope.ExamFormsImprovement.ExmFrmID = 0; }
                if ($scope.ExamFormsImprovement.ExmFrmID == 0) {
                    //var getPromise = ExamFormsImprovementService.GetCheckPRNNoPresent($scope.ExamFormsImprovement.PRNNo, $scope.ExamFormsImprovement.ExamInstID,"I");
                    //getPromise.then(function (data) {
                    //    if (data != 0) {
                    //        alert("Exam form is already present for this student.");
                    //        $scope.isupdatableDisable = false;
                    //        return;
                    //    } else {
                    // $scope.ExamFormUpdatedAlreadyGenerated($scope.ExamFormsImprovement);
                    //    }
                    //}, function (error) {
                    //    $scope.isupdatableDisable = false;
                    //    alert(error);
                    //});
                    var getPromise = ExamFormsImprovementService.GetCheckPRNNoPresent($scope.ExamFormsImprovement.PRNNo, $scope.ExamFormsImprovement.ExamInstID);
                    getPromise.then(function (data) {
                        if (data != 0) {
                            alert("Exam form is already present for this student.");
                            $scope.isupdatableDisable = false;
                            return;
                        } else {
                            $scope.ExamFormsImprovement.StudCatID = 2;
                            var getPromise = ExamFormsImprovementService.AddExamFormsImprovement($scope.ExamFormsImprovement);
                            getPromise.then(function (msg) {
                                $scope.isupdatableDisable = false;
                                alert("Saved successfully!!");
                                $scope.ExamFormsImprovement.StudName = "";
                                $scope.ExamFormsImprovement.Gender = "";
                                $scope.ExamFormsImprovement.MainGrpID = "";
                                $scope.ExamFormsImprovement.PreStudRegID = "";
                                $scope.ExamFormsImprovement.PRNNo = "";
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
                    var getPromise = ExamFormsImprovementService.UpdateExamFormsImprovement($scope.ExamFormsImprovement);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Updated successfully!!");
                        $scope.ExamFormsImprovement.StudName = "";
                        $scope.ExamFormsImprovement.Gender = "";
                        $scope.ExamFormsImprovement.MainGrpID = "";
                        $scope.ExamFormsImprovement.PreStudRegID = "";
                        $scope.ExamFormsImprovement.PRNNo = "";
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
        $scope.ExamFormUpdatedAlreadyGenerated = function (ExamFormsImprovement) {
            var getPromise = ExamFormsImprovementService.AddExamFormUpdatedAlreadyGenerated(ExamFormsImprovement);
            getPromise.then(function (msg) {
                $scope.isupdatableDisable = false;
                alert("Saved successfully!!");
                $scope.ExamFormsImprovement.StudName = "";
                $scope.ExamFormsImprovement.Gender = "";
                $scope.ExamFormsImprovement.MainGrpID = "";
                $scope.ExamFormsImprovement.PreStudRegID = "";
                $scope.ExamFormsImprovement.PRNNo = "";
                $scope.Subjectdata = [];
            }, function (error) {
                $scope.isupdatableDisable = false;
                alert(error);
            });
        }
        $scope.DeleteExamFormsImprovement = function () {
            var getData = ExamFormsImprovementService.DeleteExamFormsImprovement($scope.ExamFormsImprovement.ExmFrmID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.ExamFormsImprovement.PRNNo == undefined) || ($scope.ExamFormsImprovement.PRNNo == "")) {
                alert("Enter PRN No.");
                return false;
            }
            if (($scope.ExamFormsImprovement.StudName == undefined) || ($scope.ExamFormsImprovement.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsImprovement.CollegeID == undefined) || ($scope.ExamFormsImprovement.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsImprovement.MainGrpID == undefined) || ($scope.ExamFormsImprovement.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamFormsImprovement.Formno == undefined) || ($scope.ExamFormsImprovement.Formno == "")) {
                alert("Enter Form no");
                return false;
            }
            if (($scope.ExamFormsImprovement.FormFees == undefined) || ($scope.ExamFormsImprovement.FormFees == "")) {
                alert("Enter Form Fees");
                return false;
            }
            if ($scope.ExamFormsImprovement.Handicaped == 'Y') {
                if (($scope.ExamFormsImprovement.PhysDisbID == 0) || ($scope.ExamFormsImprovement.PhysDisbID == 1)) {
                    alert("Select Physical Disability");
                    return false;
                }
                if ($scope.ExamFormsImprovement.PhysDisbID > 1) {
                    if (($scope.ExamFormsImprovement.PhysDisbPer == undefined) || ($scope.ExamFormsImprovement.PhysDisbPer == "") || ($scope.ExamFormsImprovement.PhysDisbPer == 0)) {
                        alert("Enter Disability %.");
                        return false;
                    }
                }
                if ($scope.ExamFormsImprovement.PhysDisbID == 2) {
                    if ($scope.ExamFormsImprovement.PhysDisbPer < 40) {
                        alert("Enter Disability % must be greater than or equal to 40, if you are blind condidate.");
                        return false;
                    }
                    if ($scope.ExamFormsImprovement.BranchID == 2) {
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
            $state.go('Exam.ExamFormsImprovementList');
        }

        $scope.GetCheckSubject = function (obj) {
            if (obj.SequenceNo == "2") {
                alert("Can't UnCheck 2nd year subjects");
                obj.CheckSub = true;
                return;
            } else {
                if ($scope.ExamFormsImprovement.SequenceNo == "2") {
                    if (obj.CheckSub == true) {
                        //var RegularFees = $scope.ExamFormsImprovement.RegularFees;
                        //var ImpTheroyFee = $scope.ImpTheroyFee;

                        $scope.ExamFormsImprovement.RegularFees = parseInt($scope.ExamFormsImprovement.RegularFees) + parseInt($scope.ImpTheroyFee);
                        //$scope.ExamFormsImprovement.RegularFees = RegularFees + ImpTheroyFee;

                         $scope.ExamFormsImprovement.FormFees = $scope.ExamFormsImprovement.RegularFees + $scope.ExamFormsImprovement.LateFees;
                    } else {
                        $scope.ExamFormsImprovement.RegularFees = $scope.ExamFormsImprovement.RegularFees - $scope.ImpTheroyFee;
                        $scope.ExamFormsImprovement.FormFees = $scope.ExamFormsImprovement.RegularFees + $scope.ExamFormsImprovement.LateFees;
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
            if ($scope.ExamFormsImprovement.SequenceNo == "1") {
                var thoeryfess = 0; var practfees = 0;
                if (obj.CheckSub == true) {
                    $scope.ExamFormsImprovement.RegularFees = $scope.ExamFormsImprovement.RegularFees + $scope.ExamFormsImprovement.ImprovementPerSubjectFee;
                    $scope.ExamFormsImprovement.FormFees = $scope.ExamFormsImprovement.RegularFees + $scope.ExamFormsImprovement.LateFees;
                } else {
                    $scope.ExamFormsImprovement.RegularFees = $scope.ExamFormsImprovement.RegularFees - $scope.ExamFormsImprovement.ImprovementPerSubjectFee;
                    $scope.ExamFormsImprovement.FormFees = $scope.ExamFormsImprovement.RegularFees + $scope.ExamFormsImprovement.LateFees; //$scope.ExamFormsImprovement.ImprovementPerSubjectFee;
                }
            }
        }
    });
});
