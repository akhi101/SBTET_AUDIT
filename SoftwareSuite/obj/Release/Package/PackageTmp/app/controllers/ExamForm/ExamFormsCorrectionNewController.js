define(['app'], function (app) {
    app.controller("ExamFormsCorrectionNewController", function ($scope, $state, $stateParams, AppSettings, ExamFormsCorrectionNewService) {
        $scope.ExamFormsCorrectionNew = {};
        var PageNm = $state.current.name.split(".")[1];
        var ExamFormsCorrectionNewRightsdata = [];
        ExamFormsCorrectionNewRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormsCorrectionNewRightsdata.length; i++) {
            if (ExamFormsCorrectionNewRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormsCorrectionNew.ExmFrmID == 0) {
                    if (ExamFormsCorrectionNewRightsdata[i].isaddable == 'Y') {        
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormsCorrectionNewRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormsCorrectionNewRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.Updateddisable = false;
        var PhysDisbList = ExamFormsCorrectionNewService.GetPhysDisbList();
        PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
            $scope.PhysDisbList = PhysDisbListdata;
            var SpclConsList = ExamFormsCorrectionNewService.GetSpclConsList();
            SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                $scope.SpclConsList = SpclConsListdata;
                var MedList = ExamFormsCorrectionNewService.GetBasicMediumList();
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;
                    var StudList = ExamFormsCorrectionNewService.GetStudCatList();
                    StudList.then(function (StudCatdata, status, headers, config, error) {
                        $scope.StudCatList = StudCatdata;
                        var SecondLangList = ExamFormsCorrectionNewService.GetBasicSubjectListForSecondLangauge();
                        SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                            $scope.SecondLangList = SecondLangdata;
                            var MainGroupList = ExamFormsCorrectionNewService.GetMainGroupListByCollegeId(AppSettings.CollegeID, 0, AppSettings.AcdYrID);
                            MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                                $scope.MainGroupList = MainGroupListdata;
                                var SecondLangList = ExamFormsCorrectionNewService.GetBasicSubjectListForSecondLangaugeInRegStud(AppSettings.CollegeID, 0, AppSettings.AcdYrID);
                                SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                                    $scope.SecondLangListCollege = SecondLangdata;
                                }, function (error) {
                                    alert(error);
                                });
                            }, function (error) {
                                alert(error);
                            });
                        }, function (error) {
                            alert(error);
                        });
                    }, function (StudCatdata, status, headers, config) {
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
        
        $scope.CheckSecLangLimit = function (SecondLangID) {
            if (SecondLangID != null) {
                for (var i = 0; i < $scope.SecondLangList.length; i++) {
                    if ($scope.SecondLangList[i].SecondLangID == SecondLangID) {
                        $scope.SubCode = $scope.SecondLangList[i].SubCode;
                    }
                }
                $scope.SubCodeCollege = "";
                for (var i = 0; i < $scope.SecondLangListCollege.length; i++) {
                    if ($scope.SecondLangListCollege[i].SecondLangID == SecondLangID) {
                        $scope.SubCodeCollege = $scope.SecondLangListCollege[i].SubCode;
                    }
                }
                if ($scope.SubCodeCollege == "") {
                    $scope.SubCode = $scope.SubCode.replace(/^\s+|\s+$/g, '');
                    if (($scope.SubCode == "23") || ($scope.SubCode == "17")) {
                        var SubList = ExamFormsCorrectionNewService.GetGetSecLangLimitByCollegeID($scope.SubCode, AppSettings.CollegeID);
                        SubList.then(function (subdata, status, headers, config, error) {
                            if (subdata < 10) {
                            } else {
                                alert("Selected Second language not allowed.");
                                $scope.ExamFormsCorrectionNew.SecondLangID = "";
                                return;
                            }
                        }, function (BasicBranchdata, status, headers, config) {
                            alert(error);
                        });
                    }
                }
            }
        }
        $scope.GetGroupSubjects = function (MainGrpID) {
            if (MainGrpID != null) {
                var SubList = ExamFormsCorrectionNewService.GetGroupSubjects(MainGrpID, $scope.ExamFormsCorrectionNew.ExamID);
                SubList.then(function (subdata, status, headers, config, error) {
                    $scope.SecondLangList = subdata;
                }, function (BasicBranchdata, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.ExamFormsCorrectionNew.Handicaped == 'N';
        $scope.ShowPRNData1 = function () { //GetExamFormData
            if ($scope.ExamFormsCorrectionNew.PRNNo == "" || $scope.ExamFormsCorrectionNew.PRNNo == undefined) {
                alert("Enter PRN No./HTNo");
                return;
            }
            var ExamFormList = ExamFormsCorrectionNewService.GetExamFormDataByPrnNoForCorrectionInCorrectionForm($scope.ExamFormsCorrectionNew.PRNNo, AppSettings.ExamInstID, AppSettings.CollegeID);
            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                if (ExamFormdata.length == 0) {
                    var ExamFormList = ExamFormsCorrectionNewService.GetExamFormDataByPrnNoForCorrection($scope.ExamFormsCorrectionNew.PRNNo, AppSettings.ExamInstID, AppSettings.CollegeID);
                    ExamFormList.then(function(ExamFormdata, status, headers, config, error) {
                        if (ExamFormdata.length == 0) {
                            alert("Data not found for this PRN No./HTNo");
                            $scope.ExamFormsCorrectionNew.StudName = "";
                            $scope.ExamFormsCorrectionNew.Gender = "";
                            $scope.ExamFormsCorrectionNew.MainGrpID = "";
                            $scope.ExamFormsCorrectionNew.PreStudRegID = "";
                            $scope.ExamFormsCorrectionNew.MediumID = "";
                            $scope.ExamFormsCorrectionNew.SecondLangID = "";
                            $scope.Subjectdata = [];
                            return;
                        }
                        else {
                            $scope.ExamFormsCorrectionNew = ExamFormdata[0];
                            if ($scope.ExamFormsCorrectionNew.Handicaped == " ") {
                                $scope.ExamFormsCorrectionNew.Handicaped = "N";
                            }
                            for (var i = 0; i < ExamFormdata[0].ExamFormsSubject.length; i++) {
                                if (ExamFormdata[0].ExamFormsSubject[i].RepeaterFlg == 'R') {
                                    ExamFormdata[0].ExamFormsSubject[i].CheckSub = true;
                                    ExamFormdata[0].ExamFormsSubject[i].SubDisable = false;
                                } else {
                                    ExamFormdata[0].ExamFormsSubject[i].CheckSub = true;
                                    ExamFormdata[0].ExamFormsSubject[i].SubDisable = true;
                                }
                            }
                            $scope.ExamFormsCorrectionNew.MainGrpID = "" + ExamFormdata[0].MainGrpID + "";
                            $scope.ExamFormsCorrectionNew.SecondLangID = "" + ExamFormdata[0].SecondLangID + "";
                            $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;

                            //var SecondLangList = ExamFormsCorrectionNewService.GetBasicSubjectListForSecondLangaugeInRegStud(0, ExamFormdata[0].CourseID, AppSettings.AcdYrID);
                            //SecondLangList.then(function(SecondLangdata, status, headers, config, error) {
                            //    $scope.SecondLangList = SecondLangdata;
                            //    var MainGroupList = ExamFormsCorrectionNewService.GetMainGroupListByCollegeId(AppSettings.CollegeID, ExamFormdata[0].CourseID, AppSettings.AcdYrID);
                            //    MainGroupList.then(function(MainGroupListdata, status, headers, config, error) {
                            //        $scope.MainGroupList = MainGroupListdata;
                            //    }, function(error) {
                            //        alert(error);
                            //    });
                            //}, function(error) {
                            //    alert(error);
                            //});
                        }
                    }, function(ExamFormdata, status, headers, config) {
                        alert(error);
                    });
                }
                else {
                    $scope.ExamFormsCorrectionNew = ExamFormdata[0];
                    for (var i = 0; i < ExamFormdata[0].ExamFormsSubject.length; i++) {
                        if (ExamFormdata[0].ExamFormsSubject[i].RepeaterFlg == 'R') {
                            ExamFormdata[0].ExamFormsSubject[i].CheckSub = true;
                            ExamFormdata[0].ExamFormsSubject[i].SubDisable = false;
                        } else {
                            ExamFormdata[0].ExamFormsSubject[i].CheckSub = true;
                            ExamFormdata[0].ExamFormsSubject[i].SubDisable = true;
                        }
                    }
                    $scope.ExamFormsCorrectionNew.MainGrpID = "" + ExamFormdata[0].MainGrpID + "";
                    $scope.ExamFormsCorrectionNew.SecondLangID = "" + ExamFormdata[0].SecondLangID + "";
                    $scope.ExamFormsCorrectionNew.StudName = ExamFormdata[0].StudName;
                    $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;

                    //var SecondLangList = ExamFormsCorrectionNewService.GetBasicSubjectListForSecondLangaugeInRegStud(0, ExamFormdata[0].CourseID, AppSettings.AcdYrID);
                    //SecondLangList.then(function(SecondLangdata, status, headers, config, error) {
                    //    $scope.SecondLangList = SecondLangdata;
                    //    var MainGroupList = ExamFormsCorrectionNewService.GetMainGroupListByCollegeId(AppSettings.CollegeID, ExamFormdata[0].CourseID, AppSettings.AcdYrID);
                    //    MainGroupList.then(function(MainGroupListdata, status, headers, config, error) {
                    //        $scope.MainGroupList = MainGroupListdata;
                    //    }, function(error) {
                    //        alert(error);
                    //    });
                    //}, function(error) {
                    //    alert(error);
                    //});
                }
            }, function(ExamFormdata, status, headers, config) {
                alert(error);
            });
        }

        $scope.chkStudentName = function (StudName) {
        }

        $scope.editvalue = false;
        $scope.SaveExamFormsCorrectionNew = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                var examsubs = [];
                for (var i = 0; i < $scope.Subjectdata.length; i++) {
                    if ($scope.Subjectdata[i].CheckSub == true) {
                        var obj = {};
                        obj.ExmSubID = $scope.Subjectdata[i].ExmSubID;
                        obj.ExmFrmSubID = $scope.Subjectdata[i].ExmFrmSubID;
                        obj.EvalTypeID = $scope.Subjectdata[i].EvalTypeID;
                        obj.ExmSubCode = $scope.Subjectdata[i].ExmSubCode;
                        obj.ExmSubName = $scope.Subjectdata[i].ExmSubName;
                        obj.SubTyp = $scope.Subjectdata[i].SubTyp;
                        obj.GrpSeqNo = $scope.Subjectdata[i].GrpSeqNo;
                        obj.ExamID = $scope.Subjectdata[i].ExamID;
                        obj.RepeaterFlg = $scope.Subjectdata[i].RepeaterFlg;
                        obj.FrmExmSubID = $scope.Subjectdata[i].FrmExmSubID;
                        examsubs.push(obj);
                    }
                }
                if (examsubs.length == 0) {
                    alert("No any subject selected");
                    return false;
                }
                for (var i = 0; i < $scope.SecondLangList.length; i++) {
                    if ($scope.SecondLangList[i].SecondLangID == $scope.ExamFormsCorrectionNew.SecondLangID) {
                        $scope.SubCode = $scope.SecondLangList[i].SubCode;
                    }
                }
                $scope.ExamFormsCorrectionNew.ExamFormsSubject = examsubs;
                $scope.SubCode = $scope.SubCode.replace(/^\s+|\s+$/g, '');
                $scope.ExamFormsCorrectionNew.SubCode = $scope.SubCode;
                $scope.ExamFormsCorrectionNew.CreLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsCorrectionNew.UpdLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsCorrectionNew.AcdYrID = AppSettings.AcdYrID;
                $scope.ExamFormsCorrectionNew.ExamInstID = AppSettings.ExamInstID;
                if ($scope.ExamFormsCorrectionNew.ExmFrmIDCorrection == 0) {
                    var getPromise = ExamFormsCorrectionNewService.AddExamFormsCorrectionNew($scope.ExamFormsCorrectionNew);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Saved successfully!!");
                        $scope.ExamFormsCorrectionNew.StudName = "";
                        $scope.ExamFormsCorrectionNew.Gender = "";
                        $scope.ExamFormsCorrectionNew.MainGrpID = "";
                        $scope.ExamFormsCorrectionNew.PreStudRegID = "";
                        $scope.ExamFormsCorrectionNew.PRNNo = "";
                        $scope.ExamFormsCorrectionNew.FormFees = "";
                        $scope.Subjectdata = [];
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                } else {
                    var getPromise = ExamFormsCorrectionNewService.UpdateExamFormsCorrectionNew($scope.ExamFormsCorrectionNew);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Updated successfully!!");
                        $scope.ExamFormsCorrectionNew.StudName = "";
                        $scope.ExamFormsCorrectionNew.Gender = "";
                        $scope.ExamFormsCorrectionNew.MainGrpID = "";
                        $scope.ExamFormsCorrectionNew.PreStudRegID = "";
                        $scope.ExamFormsCorrectionNew.PRNNo = "";
                        $scope.ExamFormsCorrectionNew.FormFees = "";
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
        $scope.DeleteExamFormsCorrectionNew = function () {
            var getData = ExamFormsCorrectionNewService.DeleteExamFormsCorrectionNew($scope.ExamFormsCorrectionNew.ExmFrmID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.ExamFormsCorrectionNew.PRNNo == undefined) || ($scope.ExamFormsCorrectionNew.PRNNo == "")) {
                alert("Enter PRN No.");
                return false;
            }
            if (($scope.ExamFormsCorrectionNew.StudName == undefined) || ($scope.ExamFormsCorrectionNew.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsCorrectionNew.CollegeID == undefined) || ($scope.ExamFormsCorrectionNew.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsCorrectionNew.MainGrpID == undefined) || ($scope.ExamFormsCorrectionNew.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamFormsCorrectionNew.SecondLangID == undefined) || ($scope.ExamFormsCorrectionNew.SecondLangID == "")) {
                alert("Select Second Language");
                return false;
            }
            if (($scope.ExamFormsCorrectionNew.MediumID == undefined) || ($scope.ExamFormsCorrectionNew.MediumID == "")) {
                alert("Select Medium");
                return false;
            }
            if (($scope.ExamFormsCorrectionNew.Formno == undefined) || ($scope.ExamFormsCorrectionNew.Formno == "")) {
                alert("Enter Form no");
                return false;
            }
            if (($scope.ExamFormsCorrectionNew.FormFees == undefined) || ($scope.ExamFormsCorrectionNew.FormFees == "")) {
                alert("Enter Form Fees");
                return false;
            }
            if ($scope.ExamFormsCorrectionNew.Handicaped == 'Y') {
                if (($scope.ExamFormsCorrectionNew.PhysDisbID == 0) || ($scope.ExamFormsCorrectionNew.PhysDisbID == 1)) {
                    alert("Select Physical Disability");
                    return false;
                }
                if ($scope.ExamFormsCorrectionNew.PhysDisbID > 1) {
                    if (($scope.ExamFormsCorrectionNew.PhysDisbPer == undefined) || ($scope.ExamFormsCorrectionNew.PhysDisbPer == "") || ($scope.ExamFormsCorrectionNew.PhysDisbPer == 0)) {
                        alert("Enter Disability %.");
                        return false;
                    }
                }
                if ($scope.ExamFormsCorrectionNew.PhysDisbID == 2) {
                    if ($scope.ExamFormsCorrectionNew.PhysDisbPer < 40) {
                        alert("Enter Disability % must be greater than or equal to 40, if you are blind condidate.");
                        return false;
                    }
                    if ($scope.ExamFormsCorrectionNew.BranchID == 2) {
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
            $state.go('Exam');
        }
    });
});
