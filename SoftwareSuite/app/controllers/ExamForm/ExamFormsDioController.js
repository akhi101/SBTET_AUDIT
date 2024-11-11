define(['app'], function(app) {
    app.controller("ExamFormsDioController", function($scope, $state, $stateParams, AppSettings, ExamFormsDioService, BasicCourseService, BasicBranchService, BasicMainGroupService, BasicExamService) {
        $scope.ExamFormsDio = {};
        var CourseID = $stateParams.CourseID;
        var ExamID = $stateParams.ExamID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExamFormsDioRightsdata = [];
        ExamFormsDioRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormsDioRightsdata.length; i++) {
            if (ExamFormsDioRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormsDio.ExmFrmID == 0) {
                    if (ExamFormsDioRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormsDioRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormsDioRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var CollegeList = ExamFormsDioService.GetCollegeListByDistrictIDs(AppSettings.DistrictIDs);
        CollegeList.then(function(CollegeListdata, status, headers, config, error) {
            if (CollegeListdata.length == 0) {
                $scope.CollegeList = [];
                alert("There is no college in this mandal");
                return;
            } else {
                $scope.CollegeList = CollegeListdata;
                $scope.ExamFormsDioBridgeCourseList.CollegeID = "";
            }
        }, function(error) {
            alert(error);
        });
        var StudList = ExamFormsDioService.GetStudCatList();
        StudList.then(function(StudCatdata, status, headers, config, error) {
            $scope.StudCatList = StudCatdata;
        }, function(StudCatdata, status, headers, config) {
            alert(error);
        });
        $scope.FillCollData = function(CollegeID) {
            if (CollegeID != null) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                var CourseList = ExamFormsDioService.GetCourseListForRegStud(CollegeID, AppSettings.AcdYrID);
                CourseList.then(function(BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                    $scope.ExamFormsDio.CourseID = "" + $scope.CourseList[0].CourseID + "";
                    $scope.FillCoursePart($scope.ExamFormsDio.CourseID);
                }, function(error) {
                    alert(error);
                });
            }
        }
        var BranchList = ExamFormsDioService.GetBasicBranchListByCourseID(0);
        BranchList.then(function(BasicBranchdata, status, headers, config, error) {
            $scope.BranchList = BasicBranchdata;
        }, function(error) {
            alert(error);
        });
        $scope.FillCoursePart = function(CourseID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsDioService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function(BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    var BranchList = ExamFormsDioService.GetBasicBranchListByCourseID(CourseID);
                    BranchList.then(function(BasicBranchdata, status, headers, config, error) {
                        $scope.BranchList = BasicBranchdata;
                    }, function(error) {
                        alert(error);
                    });
                }, function(error) {
                    alert(error);
                });
            }
        }
        $scope.Updateddisable = false;
        if ($scope.ExamFormsDio.ExmFrmID == 0) {
            var InsScheduleList = ExamFormsDioService.GetCurrExmInstSchedule(AppSettings.ExamInstID, $scope.ExamFormsDio.ExamID);
            InsScheduleList.then(function(Instdata, status, headers, config, error) {
                if (Instdata == 0) {
                    alert("Exam Instance schedule not found current instance");
                    RedirectToListPage("ExamForm.ExamFormsDioList");
                }
            }, function(Instdata, status, headers, config) {
                alert(error);
            });
            var InsScheduleList = ExamFormsDioService.GetInstScheduleDate(AppSettings.ExamInstID);
            InsScheduleList.then(function(Instschdate, status, headers, config, error) {
                if (Instschdate == 0) {
                    alert("Exam Instance schedule not open for current instance");
                    RedirectToListPage("ExamForm.ExamFormsDioList");
                }
            }, function(Instdata, status, headers, config) {
                alert(error);
            });
        }
        var LateFeesImprovement = ExamFormsDioService.GetAcademicYearFeesByDateForBridge(AppSettings.ExamInstID, $scope.ExamFormsDio.ExamID);
        LateFeesImprovement.then(function(data, status, headers, config, error) {
            $scope.LateFeesCurrent = data;
        }, function(Instdata, status, headers, config) {
            alert(error);
        });
        $scope.GetGroupSubjects = function(MainGrpID) {
            if (MainGrpID != null) {
                var SubList = ExamFormsDioService.GetGroupSubjects(MainGrpID, $scope.ExamFormsDio.ExamID);
                SubList.then(function(subdata, status, headers, config, error) {
                    $scope.Subjectdata = subdata;
                }, function(BasicBranchdata, status, headers, config) {
                    alert(error);
                });
            }
        }
        
        $scope.GetMigrationData = function() {
            var ExamFormList = ExamFormsDioService.GetSSCHallTicketNoAndInsertIntoPrestudent($scope.ExamFormsDio.PRNNo);
            ExamFormList.then(function(ExamFormdata, status, headers, config, error) {
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
            }, function(ExamFormdata, status, headers, config, error) {
                alert("Some data mismatch, please contact Help Desk.");
            });
        }
        $scope.FillMigrationData = function() {
            var ExamFormList = ExamFormsDioService.GetExamFormDataByPrnNoForDio($scope.ExamFormsDio.PRNNo, AppSettings.ExamInstID, 0, 0, 0);
            ExamFormList.then(function(ExamFormdata, status, headers, config, error) {
                if (ExamFormdata.length == 0) {
                    alert("Data not found for this PRN No./HTNo");
                    $scope.ExamFormsDio.StudName = "";
                    $scope.ExamFormsDio.Fathername = "";
                    $scope.ExamFormsDio.Gender = "";
                    $scope.ExamFormsDio.MainGrpID = "";
                    $scope.ExamFormsDio.PreStudRegID = "";
                    $scope.ExamFormsDio.MediumID = "";
                    $scope.ExamFormsDio.SecondLangID = "";
                    $scope.Subjectdata = [];
                    $scope.Updateddisable = false;
                    return;
                } else {
                    if (ExamFormdata[0].CourseID == 1) {
                        $scope.ExamFormsDio.ExamID = "2";
                    } else {
                        $scope.ExamFormsDio.ExamID = "4";
                    }
                    $scope.ExamFormsDio.CourseID = "" + ExamFormdata[0].CourseID + "";
                    $scope.ExamFormsDio.BranchID = "" + ExamFormdata[0].BranchID + "";
                    var getPromise = ExamFormsDioService.GetCheckDistrictDioAndStudent($scope.ExamFormsDio.PRNNo, AppSettings.ExamInstID, AppSettings.DistrictIDs);
                    getPromise.then(function(data) {
                        if (data == 0) {
                            var studResultList = ExamFormsDioService.GetcheckstudPassOrNot($scope.ExamFormsDio.PRNNo, AppSettings.ExamInstID, 0, ExamFormdata[0].CourseID, $scope.ExamFormsDio.ExamID, ExamFormdata[0].BranchID);
                            studResultList.then(function(data, status, headers, config, error) {
                                if (data == "P") {
                                    alert("Student has already passed, So you can not apply here.");
                                    $scope.Updateddisable = false;
                                    return;
                                } else {
                                    if (ExamFormdata[0].ReAddmissonStudFlag == "Y") {
                                        alert("Student can not apply here. Please Contact Helpdesk.");
                                        $scope.Updateddisable = false;
                                        return;
                                    } else {
                                        
                                        for (var i = 0; i < $scope.ExamList.length; i++) {
                                            if ($scope.ExamList[i].ExamID == $scope.ExamFormsDio.ExamID) {
                                                $scope.SequenceNo = $scope.ExamList[i].SequenceNo;
                                            }
                                        }
                                        if ($scope.SequenceNo == "2") {
                                            if (data == "F") {
                                                for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                    if ($scope.StudCatList[i].StudCatID == 4) {
                                                        $scope.ExamFormsDio.StudCatName = $scope.StudCatList[i].StudCatName;
                                                        $scope.ExamFormsDio.StudCatID = $scope.StudCatList[i].StudCatID;
                                                    }
                                                }
                                            }
                                        } else {
                                            for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                if ($scope.StudCatList[i].StudCatID == 1) {
                                                    $scope.ExamFormsDio.StudCatName = $scope.StudCatList[i].StudCatName;
                                                    $scope.ExamFormsDio.StudCatID = $scope.StudCatList[i].StudCatID;
                                                }
                                            }
                                        }
                                        $scope.ExamFormsDio.StudName = ExamFormdata[0].StudName;
                                        $scope.ExamFormsDio.Fathername = ExamFormdata[0].Fathername;
                                        $scope.ExamFormsDio.ColCode = ExamFormdata[0].ColCode;
                                        $scope.ExamFormsDio.Gender = ExamFormdata[0].Gender;
                                        $scope.ExamFormsDio.MainGrpID = ExamFormdata[0].MainGrpID;
                                        $scope.ExamFormsDio.PreStudRegID = ExamFormdata[0].PreStudRegID;
                                        $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
                                        $scope.ExamFormsDio.RegularFees = ExamFormdata[0].RegularFees;
                                        $scope.ExamFormsDio.FormFees = ExamFormdata[0].FormFees;
                                        $scope.ExamFormsDio.LateFees = ExamFormdata[0].LateFees;
                                        $scope.ExamFormsDio.ExamFeesID = ExamFormdata[0].ExamFeesID;
                                        $scope.ExamFormsDio.MediumID = ExamFormdata[0].MediumID;
                                        $scope.ExamFormsDio.CollegeTransDate = ExamFormdata[0].CollegeTransDate;
                                        $scope.ExamFormsDio.SecondLangID = ExamFormdata[0].SecondLangID;

                                        $scope.Updateddisable = false;
                                    }
                                }
                            }, function(ExamFormdata, status, headers, config) {
                                $scope.Updateddisable = false;
                                alert(error);
                            });
                        } else {
                            alert("You can not apply here. Student does not Belong to this District");
                            $scope.Updateddisable = false;
                            return;
                        }
                    }, function(error) {
                        $scope.Updateddisable = false;
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
            }, function(ExamFormdata, status, headers, config) {
                $scope.Updateddisable = false;
                alert(error);
            });
        }
        $scope.ShowPRNData = function() { //GetExamFormData
            //if (($scope.ExamFormsDio.CourseID == undefined) || ($scope.ExamFormsDio.CourseID == "")) {
            //    alert("Select Stream");
            //    return;
            //}
            //if (($scope.ExamFormsDio.ExamID == undefined) || ($scope.ExamFormsDio.ExamID == "")) {
            //    alert("Select Exam");
            //    return;
            //}
            //if (($scope.ExamFormsDio.BranchID == undefined) || ($scope.ExamFormsDio.BranchID == "")) {
            //    $scope.ExamFormsDio.BranchID = 0;
            //}
            if ($scope.ExamFormsDio.PRNNo == "" || $scope.ExamFormsDio.PRNNo == undefined) {
                alert("Enter Hall Ticket No./PRN No.");
                return;
            }
            if ($scope.ExamFormsDio.CollegeID == "" || $scope.ExamFormsDio.CollegeID == undefined) {
                alert("Select  College to Transfer Data");
                return;
            }
            $scope.Updateddisable = true;
            if ($("#ApplicationDate").val() != "") { $scope.ExamFormsDio.ApplicationDate = $("#ApplicationDate").val(); }
            var FormNo = ExamFormsDioService.GetExmFrmMaxNo(AppSettings.ExamInstID, $scope.ExamFormsDio.CollegeID);
            FormNo.then(function(data) {
                $scope.ExamFormsDio.Formno = data;
                var PhysDisbList = ExamFormsDioService.GetPhysDisbList();
                PhysDisbList.then(function(PhysDisbListdata, status, headers, config, error) {
                    $scope.PhysDisbList = PhysDisbListdata;
                    var SpclConsList = ExamFormsDioService.GetSpclConsList();
                    SpclConsList.then(function(SpclConsListdata, status, headers, config, error) {
                        $scope.SpclConsList = SpclConsListdata;
                        var getPromise = ExamFormsDioService.GetCheckPRNNoPresent($scope.ExamFormsDio.PRNNo, AppSettings.ExamInstID);
                        getPromise.then(function(data) {
                            //if (data == 0) {
                            //    alert("Data Not Found.");
                            //    //"Exam form is already generated against this Hall Ticket No./PRN No.
                            //    //$scope.isupdatableDisable = false;
                            //    //$scope.Updateddisable = false;
                            //    return;
                            //} else {
                                var ExPRNCountList = ExamFormsDioService.GetPrnNoCountInPrestudentReg($scope.ExamFormsDio.PRNNo);
                                ExPRNCountList.then(function(data, status, headers, config, error) {
                                    if (data == 0) {
                                        $scope.GetMigrationData();
                                    } else {
                                        var getPromise = ExamFormsDioService.GetCheckDistrictDioAndStudent($scope.ExamFormsDio.PRNNo, AppSettings.ExamInstID, AppSettings.DistrictIDs);
                                        getPromise.then(function(data) {
                                            if (data == 0) {
                                                var UnStudCaseList = ExamFormsDioService.GetCheckUnStudCase($scope.ExamFormsDio.PRNNo, $scope.ExamFormsDio.ApplicationDate, AppSettings.ExamInstID);
                                                UnStudCaseList.then(function(data, status, headers, config, error) {
                                                    if (data[0].UnStudCase == 1) {
                                                        alert("This student is Debarred up to date " + data[0].UpToDateDesc + "");
                                                        $scope.Updateddisable = false;
                                                        return;
                                                    } else {
                                                        var ExamFormList = ExamFormsDioService.GetExamFormDataByPrnNoForDio($scope.ExamFormsDio.PRNNo, AppSettings.ExamInstID, 0, 0, 0);
                                                        ExamFormList.then(function(ExamFormdata, status, headers, config, error) {
                                                            if (ExamFormdata.length == 0) {
                                                                alert("Data not found for this Hall Ticket No./PRN No.");
                                                                $scope.Updateddisable = false;
                                                                $scope.ExamFormsDio.StudName = "";
                                                                $scope.ExamFormsDio.Fathername = "";
                                                                $scope.ExamFormsDio.Gender = "";
                                                                $scope.ExamFormsDio.MainGrpID = "";
                                                                $scope.ExamFormsDio.PreStudRegID = "";
                                                                $scope.ExamFormsDio.MediumID = "";
                                                                $scope.ExamFormsDio.SecondLangID = "";
                                                                $scope.Subjectdata = [];
                                                                return;
                                                            }
                                                            else {
                                                                if (ExamFormdata[0].ReAddmissonStudFlag == "Y") {
                                                                    alert("Student can not apply here. Please Contact Helpdesk.");
                                                                    $scope.Updateddisable = false;
                                                                    return;
                                                                } else {
                                                                    if (ExamFormdata[0].CourseID == 1) {
                                                                        $scope.ExamFormsDio.ExamID = "2";
                                                                    } else {
                                                                        $scope.ExamFormsDio.ExamID = "4";
                                                                    }
                                                                    $scope.ExamFormsDio.CourseID = "" + ExamFormdata[0].CourseID + "";
                                                                    $scope.ExamFormsDio.BranchID = "" + ExamFormdata[0].BranchID + "";
                                                                    var studResultList = ExamFormsDioService.GetcheckstudPassOrNot($scope.ExamFormsDio.PRNNo, AppSettings.ExamInstID, 0, ExamFormdata[0].CourseID, $scope.ExamFormsDio.ExamID, ExamFormdata[0].BranchID);
                                                                    studResultList.then(function(data, status, headers, config, error) {
                                                                        if (data == "P") {
                                                                            alert("Student is already passed,So you can not apply here.");
                                                                            $scope.Updateddisable = false;
                                                                            return;
                                                                        } else {
                                                                            for (var i = 0; i < $scope.ExamList.length; i++) {
                                                                                if ($scope.ExamList[i].ExamID == $scope.ExamFormsDio.ExamID) {
                                                                                    $scope.SequenceNo = $scope.ExamList[i].SequenceNo;
                                                                                }
                                                                            }
                                                                            if ($scope.SequenceNo == "2") {
                                                                                if (data == "F") {
                                                                                    for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                                                        if ($scope.StudCatList[i].StudCatID == 4) {
                                                                                            $scope.ExamFormsDio.StudCatName = $scope.StudCatList[i].StudCatName;
                                                                                            $scope.ExamFormsDio.StudCatID = $scope.StudCatList[i].StudCatID;
                                                                                        }
                                                                                    }
                                                                                } else {
                                                                                    for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                                                        if ($scope.StudCatList[i].StudCatID == 4) {
                                                                                            $scope.ExamFormsDio.StudCatName = $scope.StudCatList[i].StudCatName;
                                                                                            $scope.ExamFormsDio.StudCatID = $scope.StudCatList[i].StudCatID;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            } else {
                                                                                for (var i = 0; i < $scope.StudCatList.length; i++) {
                                                                                    if ($scope.StudCatList[i].StudCatID == 1) {
                                                                                        $scope.ExamFormsDio.StudCatName = $scope.StudCatList[i].StudCatName;
                                                                                        $scope.ExamFormsDio.StudCatID = $scope.StudCatList[i].StudCatID;
                                                                                    }
                                                                                }
                                                                            }
                                                                            $scope.ExamFormsDio.StudName = ExamFormdata[0].StudName;
                                                                            $scope.ExamFormsDio.Fathername = ExamFormdata[0].Fathername;
                                                                            $scope.ExamFormsDio.ColCode = ExamFormdata[0].ColCode;
                                                                            $scope.ExamFormsDio.Gender = ExamFormdata[0].Gender;
                                                                            $scope.ExamFormsDio.MainGrpID = ExamFormdata[0].MainGrpID; 
                                                                            $scope.ExamFormsDio.PreStudRegID = ExamFormdata[0].PreStudRegID;
                                                                            $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
                                                                            $scope.ExamFormsDio.RegularFees = ExamFormdata[0].RegularFees;
                                                                            $scope.ExamFormsDio.FormFees = ExamFormdata[0].FormFees;
                                                                            $scope.ExamFormsDio.LateFees = ExamFormdata[0].LateFees;
                                                                            $scope.ExamFormsDio.ExamFeesID = ExamFormdata[0].ExamFeesID;
                                                                            $scope.ExamFormsDio.MediumID = ExamFormdata[0].MediumID;
                                                                            $scope.ExamFormsDio.SubName = ExamFormdata[0].SubName;
                                                                            $scope.ExamFormsDio.SecondLangID = ExamFormdata[0].SecondLangID;
                                                                            $scope.Updateddisable = false;
                                                                        }
                                                                    }, function(ExamFormdata, status, headers, config) {
                                                                        $scope.Updateddisable = false;
                                                                        alert(error);
                                                                    });
                                                                }
                                                            }
                                                        }, function(ExamFormdata, status, headers, config) {
                                                            $scope.Updateddisable = false;
                                                            alert(error);
                                                        });
                                                    }
                                                }, function(ExamFormdata, status, headers, config) {
                                                    $scope.Updateddisable = false;
                                                    alert(error);
                                                });
                                            } else {
                                                alert("You can not apply here. Student does not Belong to this District");
                                                $scope.Updateddisable = false;
                                                return;
                                            }
                                        }, function(error) {
                                            $scope.isupdatableDisable = false;
                                            $scope.Updateddisable = false;
                                            alert(error);
                                        });
                                    }
                                }, function(ExamFormdata, status, headers, config) {
                                    $scope.Updateddisable = false;
                                    alert(error);
                                });
                            //}
                        }, function(error) {
                            $scope.isupdatableDisable = false;
                            $scope.Updateddisable = false;
                            alert(error);
                        });
                    }, function(error) {
                        $scope.Updateddisable = false;
                        alert(error);
                    });
                }, function(error) {
                    $scope.Updateddisable = false;
                    alert(error);
                });
            }, function(error) {
            $scope.Updateddisable = false;
                alert(error);
            });
        }
        $("#ApplicationDate").ejDatePicker({ value: new Date(), allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#ApplicationDate").ejDatePicker("disable");
        $scope.ExamFormsDio.ImprovementFlag = "N";
        $scope.ExamFormsDio.AddSubFlag = "N";
        $scope.ExamFormsDio.BridgeCourseFlag = "N";

        $scope.ExamFormsDio.StudType = "F";
        $scope.ExamFormsDio.Handicaped = "N";
        $scope.Subjectdata = [];
        var gridColumns = [
            { field: "ExmSubID", headerText: "ExmSubID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "EvalTypeID", headerText: "EvalTypeID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "SubjectID", headerText: "SubjectID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "ExmSubCode", headerText: "Subject Code", textAlign: ej.TextAlign.Left, width: 100, allowEditing: false },
            { field: "ExmSubName", headerText: "Subject Name", textAlign: ej.TextAlign.Left, width: 300, allowEditing: false },
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
        $scope.SaveExamFormsDio = function() {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                if ($("#ApplicationDate").val() != "") { $scope.ExamFormsDio.ApplicationDate = $("#ApplicationDate").val(); }
                $scope.ExamFormsDio.ExamFormsSubject = $scope.Subjectdata;
                $scope.ExamFormsDio.CreLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsDio.UpdLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsDio.AcdYrID = AppSettings.AcdYrID;
                $scope.ExamFormsDio.ExamInstID = AppSettings.ExamInstID;
                if (($scope.ExamFormsDio.ExmFrmID == undefined) || ($scope.ExamFormsDio.ExmFrmID == "")) { $scope.ExamFormsDio.ExmFrmID = 0; }
                if ($scope.ExamFormsDio.ExmFrmID == 0) {
                    var getPromise = ExamFormsDioService.GetCheckPRNNoPresent($scope.ExamFormsDio.PRNNo, AppSettings.ExamInstID);
                    getPromise.then(function(data) {
                        if (data != 0) {
                            //alert("Exam form is already generated agains this Hall Ticket No./PRN No.");
                            //$scope.isupdatableDisable = false;
                            //return;
                            var getPromise = ExamFormsDioService.GetUpdateCollegeDetails($scope.ExamFormsDio.PreStudRegID, $scope.ExamFormsDio.PRNNo, $scope.ExamFormsDio.CollegeID);
                            getPromise.then(function (data) {
                                $scope.isupdatableDisable = false;
                                alert("Updated The Record Successfully!");
                                $scope.ExamFormsDio.StudName = "";
                                $scope.ExamFormsDio.Gender = "";
                                $scope.ExamFormsDio.MainGrpID = "";
                                $scope.ExamFormsDio.PreStudRegID = "";
                                $scope.ExamFormsDio.PRNNo = "";
                                $scope.ExamFormsDio.FormFees = "";
                                $scope.Subjectdata = [];
                            }, function (error) {
                                $scope.isupdatableDisable = false;
                                alert(error);
                            });
                        } else {
                            var getPromise = ExamFormsDioService.AddExamFormsDio($scope.ExamFormsDio);
                            getPromise.then(function(msg) {
                                var getPromise = ExamFormsDioService.GetUpdateCollegeInPreStudentReg($scope.ExamFormsDio.PreStudRegID, $scope.ExamFormsDio.PRNNo, $scope.ExamFormsDio.CollegeID);
                                getPromise.then(function(data) {
                                    $scope.isupdatableDisable = false;
                                    alert("Updated The Record Successfully!");
                                    $scope.ExamFormsDio.StudName = "";
                                    $scope.ExamFormsDio.Gender = "";
                                    $scope.ExamFormsDio.MainGrpID = "";
                                    $scope.ExamFormsDio.PreStudRegID = "";
                                    $scope.ExamFormsDio.PRNNo = "";
                                    $scope.ExamFormsDio.FormFees = "";
                                    $scope.Subjectdata = [];
                                }, function(error) {
                                    $scope.isupdatableDisable = false;
                                    alert(error);
                                });
                            }, function(error) {
                                $scope.isupdatableDisable = false;
                                alert(error);
                            });
                        }
                    }, function(error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    var getPromise = ExamFormsDioService.UpdateExamFormsDio($scope.ExamFormsDio);
                    getPromise.then(function(msg) {
                        $scope.isupdatableDisable = false;
                        alert("Updated Successfully!!");
                        $scope.ExamFormsDio.StudName = "";
                        $scope.ExamFormsDio.Gender = "";
                        $scope.ExamFormsDio.MainGrpID = "";
                        $scope.ExamFormsDio.PreStudRegID = "";
                        $scope.ExamFormsDio.PRNNo = "";
                        $scope.ExamFormsDio.FormFees = "";
                        $scope.Subjectdata = [];
                    }, function(error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteExamFormsDio = function() {
            var getData = ExamFormsDioService.DeleteExamFormsDio($scope.ExamFormsDio.ExmFrmID, AppSettings.LoggedUserId);
            getData.then(function(msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function(error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.ExamFormsDio.PRNNo == undefined) || ($scope.ExamFormsDio.PRNNo == "")) {
                alert("Enter Hall Ticket No./PRN No.");
                return false;
            }
            if (($scope.ExamFormsDio.StudName == undefined) || ($scope.ExamFormsDio.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsDio.CollegeID == undefined) || ($scope.ExamFormsDio.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsDio.MainGrpID == undefined) || ($scope.ExamFormsDio.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamFormsDio.Formno == undefined) || ($scope.ExamFormsDio.Formno == "")) {
                alert("Enter Form no");
                return false;
            }
            if (($scope.ExamFormsDio.FormFees == undefined) || ($scope.ExamFormsDio.FormFees == "")) {
                alert("Enter Form Fees");
                return false;
            }
            if ($scope.ExamFormsDio.Handicaped == 'Y') {
                if (($scope.ExamFormsDio.PhysDisbID == 0) || ($scope.ExamFormsDio.PhysDisbID == 1)) {
                    alert("Select Physical Disability");
                    return false;
                }
                if ($scope.ExamFormsDio.PhysDisbID > 1) {
                    if (($scope.ExamFormsDio.PhysDisbPer == undefined) || ($scope.ExamFormsDio.PhysDisbPer == "") || ($scope.ExamFormsDio.PhysDisbPer == 0)) {
                        alert("Enter Disability %.");
                        return false;
                    }
                }
                if ($scope.ExamFormsDio.PhysDisbID == 2) {
                    if ($scope.ExamFormsDio.PhysDisbPer < 40) {
                        alert("Enter Disability % must be greater than or equal to 40, if you are blind condidate.");
                        return false;
                    }
                    if ($scope.ExamFormsDio.BranchID == 2) {
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
        $scope.Exit = function() {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Exam');
        }

        $scope.GetCalFees = function() {
            if (($scope.ExamFormsDio.PRNNo == undefined) || ($scope.ExamFormsDio.PRNNo == "")) {
                alert("Enter PRN No.");
                return false;
            }
            if (($scope.ExamFormsDio.StudName == undefined) || ($scope.ExamFormsDio.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsDio.CollegeID == undefined) || ($scope.ExamFormsDio.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsDio.MainGrpID == undefined) || ($scope.ExamFormsDio.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamFormsDio.Formno == undefined) || ($scope.ExamFormsDio.Formno == "")) {
                alert("Enter Form no");
                return false;
            }
            if ($scope.Subjectdata.length == 0) {
                alert("No any subject selected");
                return false;
            }
            $scope.isupdatableDisable = true;
            if ($("#ApplicationDate").val() != "") { $scope.ExamFormsDio.ApplicationDate = $("#ApplicationDate").val(); }
            $scope.ExamFormsDio.ExamFormsDioSubject = $scope.Subjectdata;
            $scope.ExamFormsDio.CreLoginID = AppSettings.LoggedUserId;
            $scope.ExamFormsDio.UpdLoginID = AppSettings.LoggedUserId;
            $scope.ExamFormsDio.AcdYrID = AppSettings.AcdYrID;
            $scope.ExamFormsDio.ExamInstID = AppSettings.ExamInstID;
            $scope.ExamFormsDio.ImprovementFlag = "N";
            $scope.ExamFormsDio.AddSubFlag = "N";
            $scope.ExamFormsDio.BridgeCourseFlag = "N";
            var FeeAmtList = ExamFormsDioService.GetAcademicYearFeesByDate($scope.ExamFormsDio);
            FeeAmtList.then(function(FeeAmountdata, status, headers, config, error) {
                $scope.ExamFormsDio.FormFees = FeeAmountdata;
            }, function(FeeAmountdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.ClearAmount = function() {
            $scope.ExamFormsDio.RegularFees = "";
            $scope.ExamFormsDio.FormFees = "";
            $scope.ExamFormsDio.LateFees = "";
        }
    });
});
