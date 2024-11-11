define(['app'], function (app) {
    app.controller("ExamFormsCorrectionController", function ($scope, $state, $http, $stateParams, AppSettings, ExamFormsCorrectionService) {
        $scope.ExamFormsCorrectionByParam = {
            PRNNo: $stateParams.PRNNo, ExamID: $stateParams.ExamID
        };
        $scope.ExamFormsCorrection = {};
        $scope.TempExamFormsCorrection = {};
        $scope.GroupID = 0;
        $scope.CourseID = 0;
        $scope.checkDisabledMain = true;
        $scope.checkDisabledMed = true;
        $scope.checkDisabledSec = true;
        $scope.checkDisabledCourse = true;
        $scope.UpdatedPhotoPath = "";
        $scope.UpdatedSignPath = "";


        var PageNm = $state.current.name.split(".")[1];
        var ExamFormsCorrectionRightsdata = [];
        ExamFormsCorrectionRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormsCorrectionRightsdata.length; i++) {
            if (ExamFormsCorrectionRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormsCorrection.ExmFrmID == 0) {
                    if (ExamFormsCorrectionRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormsCorrectionRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormsCorrectionRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.Updateddisable = false;
        var PhysDisbList = ExamFormsCorrectionService.GetPhysDisbList();
        PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
            $scope.PhysDisbList = PhysDisbListdata;
            var SpclConsList = ExamFormsCorrectionService.GetSpclConsList();
            SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                $scope.SpclConsList = SpclConsListdata;
            }, function (error) {
                alert(error);
            });
        }, function (error) {
            alert(error);
        });

        //var SecondLangList = ExamFormsCorrectionService.GetBasicSubjectListForSecondLangaugeInRegStud(AppSettings.CollegeID, 0, AppSettings.AcdYrID);
        //SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
        //    $scope.SecondLangListCollege = SecondLangdata;
        //}, function (error) {
        //    alert(error);
        //    });

        if (($scope.ExamFormsCorrectionByParam.ExamID == 1) || ($scope.ExamFormsCorrectionByParam.ExamID == 2)) {
            $scope.CourseID = 1;
        }
        else {
            $scope.CourseID = 2;
        }


        var SecondLangList = ExamFormsCorrectionService.GetBasicSubjectListForSecondLangaugeNR($scope.CourseID);
        SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
            $scope.SecondLangList = SecondLangdata;
            $scope.tempSecondLangList = $scope.SecondLangList;
        }, function (error) {
            alert(error);
            });

        var StudList = ExamFormsCorrectionService.GetStudCatList($scope.ExamFormsCorrectionByParam.ExamID);
        StudList.then(function (StudCatdata, status, headers, config, error) {
            $scope.StudCatList = StudCatdata;
        }, function (StudCatdata, status, headers, config) {
            alert(error);
        });

        var BasicCasteList = ExamFormsCorrectionService.GetCasteList();
        BasicCasteList.then(function (CasteData, status, headers, config, error) {
            $scope.BasicCasteList = CasteData;
        }, function (Castdata, status, headers, config) {
            alert(error);
        });

        var MainGroupList = ExamFormsCorrectionService.GetMainGroupListByCollegeId(AppSettings.CollegeID, $scope.ExamFormsCorrectionByParam.ExamID, AppSettings.AcdYrID);
        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
            $scope.MainGroupList = MainGroupListdata;
            $scope.tempMainGroupList = $scope.MainGroupList;
        }, function (error) {
            alert(error);
        });

        var MedList = ExamFormsCorrectionService.GetBasicMediumList(AppSettings.CollegeID);
        MedList.then(function (Mediumdata, status, headers, config, error) {
            $scope.MediumList = Mediumdata;
            $scope.tempMediumList = $scope.MediumList;
        }, function (error) {
            alert(error);
        });

        $scope.GetSubCaste = function (CasteID) {
            var SubCastList = ExamFormsCorrectionService.GetSubCastListByCasteID(CasteID);
            SubCastList.then(function (SubCastdata, status, headers, config, error) {
                $scope.SubCastList = SubCastdata;
            }, function (error) {
                alert(error);
            });
        }

        var StudCourseList = ExamFormsCorrectionService.GetStudCourseList(AppSettings.CollegeID);
        StudCourseList.then(function (StudCoursedata, status, headers, config, error) {
            $scope.StudCourseList = StudCoursedata;
        }, function (StudCoursedata, status, headers, config) {
            alert(error);
        });

        $scope.StudentPhoto = "";
        $scope.StudentSign = "";
        $scope.tempStudentPhoto = "";
        $scope.tempStudentSign = "";
        document.getElementById("StudentPhoto").src = "../../../contents/img/photoimages.png";
        document.getElementById("StudentSign").src = "../../../contents/img/photoimages.png";

        $scope.GroupChange = function (MainGrpID) {
            $scope.MainGrpID = MainGrpID;

        }

        $scope.NewGroup = function (MainGrpID) {
            $scope.MainGrpID = MainGrpID;
            var MedList = ExamFormsCorrectionService.GetBasicMediumListNew(AppSettings.CollegeID, $scope.MainGrpID);
            MedList.then(function (Mediumdata, status, headers, config, error) {
                $scope.MediumList = Mediumdata;
            }, function (error) {
                alert(error);
            });
        }

        var SubList = ExamFormsCorrectionService.GetGroupSubjects(MainGrpID, $scope.ExamID);
        SubList.then(function (subdata, status, headers, config, error) {
            $scope.SubjectdataNew = subdata;
        }, function (BasicBranchdata, status, headers, config) {
            alert(error);
        });

        $scope.changeMedium = function () { }
        $scope.changeSecondLanguage = function () { }

        $scope.MediumChange = function (MediumID) {
        }

        $scope.CourseChange = function (CourseID) {
            $scope.CourseID = CourseID;
            if (CourseID == 1) {
                $scope.ExamID = 1;
            }
            else if (CourseID == 2) {
                $scope.ExamID = 3;
            }
            var MainGroupList = ExamFormsCorrectionService.GetMainGroupListByCollegeId(AppSettings.CollegeID, $scope.ExamID, AppSettings.AcdYrID);
            MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                $scope.MainGroupList = MainGroupListdata;
                $scope.tempMainGroupList = $scope.MainGroupList;
            }, function (error) {
                alert(error);
            });

            var SecondLangList = ExamFormsCorrectionService.GetBasicSubjectListForSecondLangaugeNR($scope.CourseID);
            SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                $scope.SecondLangList = SecondLangdata;
            }, function (error) {
                alert(error);
            });
        }

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
                        var SubList = ExamFormsCorrectionService.GetGetSecLangLimitByCollegeID($scope.SubCode, AppSettings.CollegeID);
                        SubList.then(function (subdata, status, headers, config, error) {
                            if (subdata < 10) {
                            } else {
                                alert("Selected Second language not allowed.");
                                $scope.ExamFormsCorrection.SecondLangID = "";
                                return;
                            }
                        }, function (BasicBranchdata, status, headers, config) {
                            alert(error);
                        });
                    }
                }
            }
        }

        $scope.GroupChange = function (MainGrpID) {
            if (($scope.ExamFormsCorrection.ExamID == 2) || ($scope.ExamFormsCorrection.ExamID == 4)) {
                if ((MainGrpID != null) && (MainGrpID == 3)) {
                    alert("Cannot Change To BPC Group.");
                    $scope.ExamFormsCorrection.MainGrpID = $scope.GroupID;
                    return;
                }
                else if ((MainGrpID != null) && (MainGrpID == 1)) {
                    if ($scope.GroupID != 3) {
                        alert("Cannot Change To MPC Group.");
                        $scope.ExamFormsCorrection.MainGrpID = $scope.GroupID;
                        return;
                    }
                }
            }
        }

        $scope.ExamFormsCorrection.Handicaped == 'N';

        $scope.editvalue = false;
        $scope.SaveExamFormsCorrection = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                //var examsubs = [];
                //for (var i = 0; i < $scope.Subjectdata.length; i++) {
                //    if ($scope.Subjectdata[i].CheckSub == true) {
                //        var obj = {};
                //        obj.ExmSubID = $scope.Subjectdata[i].ExmSubID;
                //        obj.ExmFrmSubID = $scope.Subjectdata[i].ExmFrmSubID;
                //        obj.EvalTypeID = $scope.Subjectdata[i].EvalTypeID;
                //        obj.ExmSubCode = $scope.Subjectdata[i].ExmSubCode;
                //        obj.ExmSubName = $scope.Subjectdata[i].ExmSubName;
                //        obj.SubTyp = $scope.Subjectdata[i].SubTyp;
                //        obj.GrpSeqNo = $scope.Subjectdata[i].GrpSeqNo;
                //        obj.ExamID = $scope.Subjectdata[i].ExamID;
                //        obj.RepeaterFlg = $scope.Subjectdata[i].RepeaterFlg;
                //        obj.FrmExmSubID = $scope.Subjectdata[i].FrmExmSubID;
                //        examsubs.push(obj);
                //    }
                //}
                var examsubs = [];
                for (var i = 0; i < $scope.Subjectdata.length; i++) {
                    if ($scope.Subjectdata[i].CheckSub == false) {
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
                        obj.ValueName = "ExmSubID";
                        obj.ValueDisplayName = $scope.Subjectdata[i].ExmSubName;
                        obj.OldValue = $scope.Subjectdata[i].ExmSubID;
                        obj.NewValue = "D";
                        examsubs.push(obj);
                    }
                }
                //if (examsubs.length > 0) {
                for (var i = 0; i < $scope.SubjectdataNew.length; i++) {
                    if ($scope.SubjectdataNew[i].CheckSub == true) {
                        var obj = {};
                        obj.ExmSubID = $scope.SubjectdataNew[i].ExmSubID;
                        obj.EvalTypeID = $scope.SubjectdataNew[i].EvalTypeID;
                        obj.ExmSubCode = $scope.SubjectdataNew[i].ExmSubCode;
                        obj.ExmSubName = $scope.SubjectdataNew[i].ExmSubName;
                        obj.SubTyp = $scope.SubjectdataNew[i].SubTyp;
                        obj.GrpSeqNo = $scope.SubjectdataNew[i].GrpSeqNo;
                        obj.ExamID = $scope.SubjectdataNew[i].ExamID;
                        obj.RepeaterFlg = "R";
                        obj.ValueName = "ExmSubID";
                        obj.ValueDisplayName = $scope.SubjectdataNew[i].ExmSubName;
                        obj.OldValue = $scope.SubjectdataNew[i].ExmSubID;
                        obj.NewValue = "A";
                        examsubs.push(obj);
                    }
                }
                //}
                //if (examsubs.length == 0) {
                //    alert("No any subject selected");
                //    return false;
                //}
                for (var i = 0; i < $scope.SecondLangList.length; i++) {
                    if ($scope.SecondLangList[i].SecondLangID == $scope.ExamFormsCorrection.SecondLangID) {
                        $scope.SubCode = $scope.SecondLangList[i].SubCode;
                    }
                }
                $scope.ExamFormsCorrection.ExamFormsSubject = examsubs;
                //$scope.SubCode = $scope.SubCode.replace(/^\s+|\s+$/g, '');
                $scope.ExamFormsCorrection.SubCode = $scope.SubCode;
                $scope.ExamFormsCorrection.CreLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsCorrection.UpdLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsCorrection.AcdYrID = AppSettings.AcdYrID;
                $scope.ExamFormsCorrection.ExamInstID = AppSettings.ExamInstID;

                if (($scope.ExamFormsCorrection.ExamID == 1) || ($scope.ExamFormsCorrection.ExamID == 3)) {
                    if ($scope.ExamFormsCorrection.MainGroupChanged) {
                        $scope.ExamFormsCorrection.MainGroupChanged = 1;
                    }
                    else {
                        $scope.ExamFormsCorrection.MainGroupChanged = 0;
                    }
                    if ($scope.ExamFormsCorrection.MediumChanged) {
                        $scope.ExamFormsCorrection.MediumChanged = 1;
                    }
                    else {
                        $scope.ExamFormsCorrection.MediumChanged = 0;
                    }
                    if ($scope.ExamFormsCorrection.SecondLanguageChanged) {
                        $scope.ExamFormsCorrection.SecondLanguageChanged = 1;
                    }
                    else {
                        $scope.ExamFormsCorrection.SecondLanguageChanged = 0;
                    }
                }
                else {
                    $scope.ExamFormsCorrection.MainGroupChanged = 0;
                    $scope.ExamFormsCorrection.MediumChanged = 0;
                    $scope.ExamFormsCorrection.SecondLanguageChanged = 0;
                }

                if ($scope.ExamFormsCorrection.StudentPhotoChecked) {
                    $scope.ExamFormsCorrection.StudentPhotoChecked = 1;
                }
                else {
                    $scope.ExamFormsCorrection.StudentPhotoChecked = 0;
                }

                if ($scope.ExamFormsCorrection.StudentSignChecked) {
                    $scope.ExamFormsCorrection.StudentSignChecked = 1;
                }
                else {
                    $scope.ExamFormsCorrection.StudentSignChecked = 0;
                }
                if ($scope.ExamFormsCorrection.ExmFrmIDCorrection == 0) {
                    var getPromise = ExamFormsCorrectionService.AddExamFormsCorrection($scope.ExamFormsCorrection);
                    getPromise.then(function (data) {
                        if (data.length > 0) {
                            if (data.length == 2) {
                                if (data[1].Message != undefined) {
                                    if (data[1].Message == "10 Students Already Opted For This Second Language") {
                                        alert('10 Students Already Opted For This Second Language');
                                        $scope.isupdatableDisable = false;
                                        return;
                                    }
                                }
                                if (data[1].Message != undefined) {
                                    if (data[1].Message == "Seats Are All Filled. Cannot Change Group/Medium") {
                                        alert('Seats Are All Filled. Cannot Change Group/Medium');
                                        $scope.isupdatableDisable = false;
                                        return;
                                    }
                                }
                                if (data[1].Message != undefined) {
                                    if (data[1].Message == "Please contact TSBIE as your college/institution is non-affiliated at this time.") {
                                        alert('Please contact TSBIE as your college/institution is non-affiliated at this time.');
                                        $scope.isupdatableDisable = false;
                                        return;
                                    }
                                }
                            }

                            if (data[0].ErrorMessage == "Record Not Found") {
                                alert('Record Not Found');
                                return;
                            }
                            
                            $scope.ExamFormsCorrectionBill = data;
                            var TotalAmount = 0;
                            var intRows = 0;
                            for (var i = 0; i < data.length; i++) {
                                if (TotalAmount < data[i]["TotalAmount"]) {
                                    TotalAmount = data[i]["TotalAmount"];
                                }
                            }
                            $scope.ExamFormsCorrectionBill.TotalAmount = TotalAmount;
                        } else {
                            $scope.ExamFormsCorrectionBill = [];
                            //alert("Data Not Found.");
                        }
                        $scope.SaveStudentRegPhotoSign();
                        $scope.isupdatableDisable = false;
                        alert("Saved successfully. To Make Payment Click On View Bill!!!");

                        var ExamFormList = ExamFormsCorrectionService.GetExamFormsCorrectionBill($scope.ExamFormsCorrection.PreStudRegID);
                        ExamFormList.then(function (Studentdata, status, headers, config, error) {
                            if (Studentdata.length > 0) {
                                $scope.viewDisable = false;
                            }
                            else {
                                $scope.viewDisable = true;
                            }
                        });
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                } else {
                    var getPromise = ExamFormsCorrectionService.UpdateExamFormsCorrection($scope.ExamFormsCorrection);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Updated successfully!!");
                        $scope.ExamFormsCorrection.StudName = "";
                        $scope.ExamFormsCorrection.Gender = "";
                        $scope.ExamFormsCorrection.MainGrpID = "";
                        $scope.ExamFormsCorrection.PRNNo = "";
                        $scope.ExamFormsCorrection.FormFees = "";
                        $scope.ExamFormsCorrection.BirthDate = "";
                        $scope.ExamFormsCorrection.CourseName = "";
                        $scope.ExamFormsCorrection.ExmName = "";
                        $scope.ExamFormsCorrection.BranchName = "";
                        $scope.ExamFormsCorrection.MainGrpID = 0;
                        $scope.ExamFormsCorrection.MediumID = 0;
                        $scope.ExamFormsCorrection.SecondLangID = 0;
                        $scope.ExamFormsCorrection.StudCatID = 0;
                        $scope.ExamFormsCorrection.StudType = "";
                        $scope.ExamFormsCorrection.Fathername = "";
                        $scope.ExamFormsCorrection.MotherName = "";
                        $scope.ExamFormsCorrection.CasteID = 0;
                        $scope.ExamFormsCorrection.SubCastID = 0;
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

        $scope.DeleteExamFormsCorrection = function () {
            var getData = ExamFormsCorrectionService.DeleteExamFormsCorrection($scope.ExamFormsCorrection.ExmFrmID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }

        function CheckValidation() {
            if (($scope.ExamFormsCorrection.PRNNo == undefined) || ($scope.ExamFormsCorrection.PRNNo == "")) {
                alert("Enter PRN No.");
                return false;
            }
            if (($scope.ExamFormsCorrection.StudName == undefined) || ($scope.ExamFormsCorrection.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsCorrection.CollegeID == undefined) || ($scope.ExamFormsCorrection.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsCorrection.MainGrpID == undefined) || ($scope.ExamFormsCorrection.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamFormsCorrection.SecondLangID == undefined) || ($scope.ExamFormsCorrection.SecondLangID == "")) {
                alert("Select Second Language");
                return false;
            }
            if (($scope.ExamFormsCorrection.MediumID == undefined) || ($scope.ExamFormsCorrection.MediumID == "")) {
                alert("Select Medium");
                return false;
            }
            //if ($scope.ExamFormsCorrection.Handicaped == 'Y') {
            //    //if (($scope.ExamFormsCorrection.PhysDisbID == 0) || ($scope.ExamFormsCorrection.PhysDisbID == 1)) {
            //    //    alert("Select Physical Disability");
            //    //    return false;
            //    //}
            //    if ($scope.ExamFormsCorrection.PhysDisbID > 1) {
            //        if (($scope.ExamFormsCorrection.PhysDisbPer == undefined) || ($scope.ExamFormsCorrection.PhysDisbPer == "") || ($scope.ExamFormsCorrection.PhysDisbPer == 0)) {
            //            alert("Enter Disability %.");
            //            return false;
            //        }
            //    }
            //    if ($scope.ExamFormsCorrection.PhysDisbID == 2) {
            //        if ($scope.ExamFormsCorrection.PhysDisbPer < 40) {
            //            alert("Enter Disability % must be greater than or equal to 40, if you are blind condidate.");
            //            return false;
            //        }
            //        if ($scope.ExamFormsCorrection.BranchID == 2) {
            //            alert("Blind condidate can't take science group");
            //            return false;
            //        }
            //    }
            //}

            if ($scope.Subjectdata.length == 0) {
                alert("No any subject selected");
                return false;
            }
            else {
                return true;
            }
        }

        var delayInMilliseconds = 1500;
        setTimeout(function () {
            if ($scope.ExamFormsCorrectionByParam.PRNNo != 0) {
                $scope.ExamFormsCorrection.PRNNo = $scope.ExamFormsCorrectionByParam.PRNNo;
                var ExamFormList = ExamFormsCorrectionService.GetExamFormDataByPrnNoForCorrection($scope.ExamFormsCorrection.PRNNo, AppSettings.ExamInstID, AppSettings.CollegeID);
                ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                    if (ExamFormdata.length == 0) {
                        alert("Data not found for this PRN No./HTNo");
                        $scope.ExamFormsCorrection.StudName = "";
                        $scope.ExamFormsCorrection.Gender = "";
                        $scope.ExamFormsCorrection.MainGrpID = "";
                        $scope.ExamFormsCorrection.MediumID = "";
                        $scope.ExamFormsCorrection.SecondLangID = "";
                        $scope.Subjectdata = [];
                        return;
                    }
                    else {
                        $scope.ExamFormsCorrection = ExamFormdata[0];
                        angular.copy($scope.ExamFormsCorrection, $scope.TempExamFormsCorrection);
                        if ($scope.ExamFormsCorrection.Handicaped == " ") {
                            $scope.ExamFormsCorrection.Handicaped = "N";
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
                        $scope.ExamFormsCorrection.MainGrpID = "" + ExamFormdata[0].MainGrpID + "";
                        $scope.ExamFormsCorrection.SecondLangID = "" + ExamFormdata[0].SecondLangID + "";
                        $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
                        if ($scope.ExamFormsCorrection.CourseID == 1) {
                            if ($scope.ExamFormsCorrection.ExamID == 2) {
                                $scope.SubjectdataNew = ExamFormdata[0].ExamFormsSubjectNew;
                            } else {
                                $scope.SubjectdataNew = [];
                            }
                        } else {
                            if ($scope.ExamFormsCorrection.ExamID == 4) {
                                $scope.SubjectdataNew = ExamFormdata[0].ExamFormsSubjectNew;
                            } else {
                                $scope.SubjectdataNew = [];
                            }
                        }

                        $scope.GroupID = ExamFormdata[0].MainGrpID;
                        if (($scope.ExamFormsCorrection.ExamID == 2) || ($scope.ExamFormsCorrection.ExamID == 4)) {
                            $scope.editvalue = true;
                        }
                        else {
                            $scope.editvalue = false;
                        }

                        if (($scope.ExamFormsCorrection.ExamID == 2) || ($scope.ExamFormsCorrection.ExamID == 4)) {
                            $scope.checkDisabledMain = true;
                            $scope.checkDisabledMed = true;
                            $scope.checkDisabledSec = true;
                            $scope.checkDisabledCourse = true;
                        } else if ($scope.ExamFormsCorrection.ExamID == 3) {
                            $scope.checkDisabledMain = false;
                            $scope.checkDisabledMed = false;
                            $scope.checkDisabledSec = false;
                            $scope.checkDisabledCourse = false;
                        }
                        else {
                            $scope.checkDisabledMain = false;
                            $scope.checkDisabledMed = false;
                            $scope.checkDisabledSec = false;
                            $scope.checkDisabledCourse = false;
                        }

                        var StudPhotoList = ExamFormsCorrectionService.GetCandidatePhoto($scope.ExamFormsCorrection.PRNNo, AppSettings.CollegeID);
                        StudPhotoList.then(function (StudPhotodata, status, headers, config, error) {
                            if (StudPhotodata[0].PhotoPath == null) {
                                $scope.StudentPhoto = "../../../contents/img/photoimages.png";
                            } else {
                                $scope.StudentPhoto = StudPhotodata[0].PhotoPath;
                                $scope.tempStudentPhoto = $scope.StudentPhoto;
                            }
                            if (StudPhotodata[0].SignPath == null) {
                                $scope.StudentSign = "../../../contents/img/photoimages.png";
                            } else {
                                $scope.StudentSign = StudPhotodata[0].SignPath;
                                $scope.tempStudentSign = $scope.StudentSign;
                            }
                        });

                        var ExamFormList = ExamFormsCorrectionService.GetExamFormsCorrectionBill($scope.ExamFormsCorrection.PreStudRegID);
                        ExamFormList.then(function (Studentdata, status, headers, config, error) {
                            if (Studentdata.length > 0) {
                                $scope.viewDisable = false;
                            }
                            else {
                                $scope.viewDisable = true;
                            }
                        });
                    }
                }, function (ExamFormdata, status, headers, config) {
                    alert(error);
                });
            }

        }, delayInMilliseconds);

        $scope.ShowBill = function () {
            var ExamFormList = ExamFormsCorrectionService.GetExamFormsCorrectionBill($scope.ExamFormsCorrection.PreStudRegID);
            ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                if (ExamFormdata.length > 0) {
                    $scope.ExamFormsCorrectionBill = ExamFormdata;
                    var TotalAmount = 0;
                    var intRows = 0;
                    for (var i = 0; i < ExamFormdata.length; i++) {
                        TotalAmount += ExamFormdata[i]["Amount"];
                        if ($scope.ExamFormsCorrectionBill[i].ValueName == "PhotoPath") {
                            $scope.UpdatedPhotoPath = $scope.ExamFormsCorrectionBill[i].NewValue;
                        }
                        if ($scope.ExamFormsCorrectionBill[i].ValueName == "SignPath") {
                            $scope.UpdatedSignPath = $scope.ExamFormsCorrectionBill[i].NewValue;
                        }
                    }
                    if ($scope.UpdatedPhotoPath == "") {
                        $scope.HidePhoto = true;
                    }
                    else {
                        $scope.HidePhoto = false;
                    }
                    if ($scope.UpdatedSignPath == "") {
                        $scope.HideSign = true;
                    }
                    else {
                        $scope.HideSign = false;
                    }
                    var TotalAmount = 0;
                    for (var i = 0; i < ExamFormdata.length; i++) {
                        if (TotalAmount < ExamFormdata[i]["TotalAmount"]) {
                            TotalAmount = ExamFormdata[i]["TotalAmount"];
                        }
                    }

                    $scope.ExamFormsCorrectionBill.TotalAmount = TotalAmount;
                } else {
                    $scope.ExamFormsCorrectionBill = [];
                    alert("Data Not Found.");
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }

        $scope.SaveStudentRegPhotoSign = function () {
            if ($scope.ExamFormsCorrection.PreStudRegID == undefined) {
                $scope.ExamFormsCorrection.PreStudRegID = 0;
            }
            if ($scope.ExamFormsCorrection.PreStudRegID != 0) {
                if (($scope.StudentPhoto != "") && ($scope.StudentSign != "")) {
                    if ((($scope.Photofile[0] != undefined) && ($scope.StudentPhoto != "")) || (($scope.Signfile[0] != undefined) && ($scope.StudentSign != ""))) {
                        if (($scope.Photofile[0] != undefined) && ($scope.StudentPhoto != "") && ($scope.Signfile[0] == undefined)) {
                            var fd = new FormData();
                            fd.append("file", $scope.Photofile[0]);
                            var url = AppSettings.WebApiUrl + "api/ExamForms/PostStudentRegPhoto/?PreStudRegID=" + $scope.ExamFormsCorrection.PreStudRegID + "&ExmFrmID=" + $scope.ExamFormsCorrection.ExmFrmID + "&CollegeID=" + AppSettings.CollegeID + "&ExamID=" + $scope.ExamFormsCorrection.ExamID + "&CreLoginID=" + AppSettings.LoggedUserId;
                            $http.post(url, fd, {
                                headers: { 'Content-Type': undefined },
                                transformRequest: angular.identity
                            }).then(function (data) {
                                alert("Photo Uploaded Successfully");
                                $scope.isupdatableDisable = true;
                                $scope.viewDisable = false;
                                $scope.RollEditDisable = false;
                                //RedirectToListPage();
                            })
                                .catch(function (data, status, headers, config) {
                                    alert(data.data.error);
                                    $scope.RollEditDisable = false;
                                });
                        } else {
                            if (($scope.Signfile[0] != undefined) && ($scope.StudentSign != "") && ($scope.Photofile[0] == undefined)) {
                                var fd = new FormData();
                                fd.append("file", $scope.Signfile[0]);
                                var url = AppSettings.WebApiUrl + "api/ExamForms/PostStudentRegSign/?PreStudRegID=" + $scope.ExamFormsCorrection.PreStudRegID + "&ExmFrmID=" + $scope.ExamFormsCorrection.ExmFrmID + "&CollegeID=" + AppSettings.CollegeID + "&ExamID=" + $scope.ExamFormsCorrection.ExamID + "&CreLoginID=" + AppSettings.LoggedUserId;
                                $http.post(url, fd, {
                                    headers: { 'Content-Type': undefined },
                                    transformRequest: angular.identity
                                }).then(function (data) {
                                    alert("Signature Uploaded Successfully");
                                    $scope.isupdatableDisable = true;
                                    $scope.viewDisable = false;
                                    //RedirectToListPage();
                                })
                                    .catch(function (data, status, headers, config) {
                                        alert(data.data.error);
                                        $scope.RollEditDisable = false;
                                    });
                            } else {
                                var fd = new FormData();
                                fd.append("file", $scope.Photofile[0]);
                                var url = AppSettings.WebApiUrl + "api/ExamForms/PostStudentRegPhoto/?PreStudRegID=" + $scope.ExamFormsCorrection.PreStudRegID + "&ExmFrmID=" + $scope.ExamFormsCorrection.ExmFrmID + "&CollegeID=" + AppSettings.CollegeID + "&ExamID=" + $scope.ExamFormsCorrection.ExamID + "&CreLoginID=" + AppSettings.LoggedUserId + "";
                                $http.post(url, fd, {
                                    headers: { 'Content-Type': undefined },
                                    transformRequest: angular.identity
                                }).then(function (data) {
                                    if (($scope.Signfile[0] != undefined) && ($scope.StudentSign != "")) {
                                        var fd = new FormData();
                                        fd.append("file", $scope.Signfile[0]);
                                        var url = AppSettings.WebApiUrl + "api/ExamForms/PostStudentRegSign/?PreStudRegID=" + $scope.ExamFormsCorrection.PreStudRegID + "&ExmFrmID=" + $scope.ExamFormsCorrection.ExmFrmID + "&CollegeID=" + AppSettings.CollegeID + "&ExamID=" + $scope.ExamFormsCorrection.ExamID + "&CreLoginID=" + AppSettings.LoggedUserId + "";
                                        $http.post(url, fd, {
                                            headers: { 'Content-Type': undefined },
                                            transformRequest: angular.identity
                                        }).then(function (data) {
                                            alert("Photo and Signature Uploaded Successfully");
                                            $scope.isupdatableDisable = true;
                                            $scope.viewDisable = false;
                                            //RedirectToListPage();
                                        })
                                            .catch(function (data, status, headers, config) {
                                                alert(data.data.error);
                                                $scope.RollEditDisable = false;
                                            });
                                    } else {
                                        //alert("Please Select Signature");
                                        $scope.RollEditDisable = false;
                                    }
                                })
                                    .catch(function (data, status, headers, config) {
                                        alert(data.data.error);
                                        $scope.RollEditDisable = false;
                                    });
                            }
                        }
                    }
                }
                else {
                    //alert("Please Select Photo or Signature");
                    $scope.RollEditDisable = false;
                }
            }
        }

        $scope.StudentPhoto = [];
        $scope.Photofile = [];
        var DeletePhoto = false;
        var DeleteSign = false;
        $scope.RemovePhoto = function () {
            DeletePhoto = true;
            $scope.StudentPhoto = [];
            $scope.Photofile = [];
        }
        $scope.SelectPhotoUploadFile = function () {
            $('#PhotoUpload').trigger('click');
            DeletePhoto = false;
        }
        $scope.PhotoUpload = function (element) {
            var reader = new FileReader();
            if (element.value != '') {
                var extn = element.files[0].type.split("/").pop();
                if ((extn == "jpeg") || (extn == "png") || (extn == "gif") || (extn == "jpg") || (extn == "bmp")) {
                    $scope.Photofile = [];
                    var filesize = element.files[0].size;  // in bytes
                    if (filesize <= 50000) {
                        reader.onload = $scope.PhotoIsLoaded;
                        reader.readAsDataURL(element.files[0]);
                        $scope.Photofile.push(element.files[0]);
                    }
                    else {
                        alert("Please Upload a photo upto 50 KB");
                        $("#StudentPhoto").val("");
                        $scope.StudentPhoto = [];
                        $scope.StudentPhoto = null;
                        return;
                    }
                } else {
                    alert("Photo not valid format");
                    return;
                }
            } else {
                alert("Please Select Photo");
                return;
            }
        }
        $scope.PhotoIsLoaded = function (e) {
            $scope.$apply(function () {
                $scope.StudentPhoto = [];
                $scope.StudentPhoto.push(e.target.result);
                $scope.StudentPhoto = e.target.result;
            });
        }
        $scope.StudentSign = [];
        $scope.Signfile = [];
        $scope.SelectSignUploadFile = function () {
            $('#SignUpload').trigger('click');
            DeleteSign = false;
        }

        $scope.RemoveSign = function () {
            DeleteSign = true;
            $scope.StudentSign = [];
            $scope.Signfile = [];
        }
        $scope.SignUpload = function (element) {
            var reader = new FileReader();
            if (element.value != '') {
                reader.onload = $scope.SignIsLoaded;
                var extn = element.files[0].type.split("/").pop();
                if ((extn == "jpeg") || (extn == "png") || (extn == "gif") || (extn == "jpg") || (extn == "bmp")) {
                    reader.readAsDataURL(element.files[0]);
                    $scope.Signfile = [];
                    var filesize = element.files[0].size;  // in bytes
                    if (filesize <= 20000) {
                        $scope.Signfile.push(element.files[0]);
                    }
                    else {
                        alert("Please Upload a Sign upto 20 KB");
                        $("#StudentPhoto").val("");
                        $scope.StudentSign = [];
                        $scope.StudentSign = null;
                        return;
                    }
                } else {
                    alert("Sign not valid format");
                    return;
                }
            } else {
                alert("Please Select Sign");
                return;
            }
        }
        $scope.SignIsLoaded = function (e) {
            $scope.$apply(function () {
                $scope.StudentSign = [];
                $scope.StudentSign.push(e.target.result);
                $scope.StudentSign = e.target.result;
            });
        }
        $scope.uploadPhoto = function (files) {
            var fd = new FormData();
            fd.append("file", files[0]);
            var url = AppSettings.WebApiUrl + "api/ExamForms/PostStudentRegPhoto/?PreStudRegID=" + $scope.ExamFormsCorrection.PreStudRegID + "&ExmFrmID=" + $scope.ExamFormsCorrection.ExmFrmID + "&CollegeID=" + AppSettings.CollegeID + "&ExamID=" + $scope.ExamFormsCorrection.ExamID + "&CreLoginID=" + AppSettings.LoggedUserId;
            $http.post(url, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            }).then(function (data) {
                alert("Uploaded Photo Successfully");
            })
                .catch(function (data, status, headers, config) {
                    alert(data);
                    $scope.file = "";
                });
        };
        $scope.uploadSign = function (files) {
            var fd = new FormData();
            fd.append("file", files[0]);
            var url = AppSettings.WebApiUrl + "api/ExamForms/PostStudentRegSign/?PreStudRegID=" + $scope.ExamFormsCorrection.PreStudRegID + "&SSCHallTicket=" + $scope.StudentRegPhotoSign.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
            $http.post(url, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            }).then(function (data) {
                alert("Uploaded Photo Successfully");
            })
                .catch(function (data, status, headers, config) {
                    alert(data);
                    $scope.file = "";
                });
        };

        $scope.PayCorrectionFees = function () {
            $scope.paybtndisable = false;
            var payurl = AppSettings.PaymentUrl + '?FormNo=' + 63 + "&ServiceID=" + 63 + "&FeeAmount=" + $scope.ExamFormsCorrectionBill.TotalAmount + "&ChallanID=" + $scope.ExamFormsCorrectionBill[0].ChallanID + "&CollegeID=" + AppSettings.CollegeID;
            window.open(payurl, '_Self');
        }

        $scope.Exit = function () {
            RedirectToListPage();
        }

        function RedirectToListPage() {
            $state.go('Exam.ExamFormNRList', { CourseID: $scope.ExamFormsCorrection.CourseID, ExamID: $scope.ExamFormsCorrection.ExamID, MainGrpID: $scope.ExamFormsCorrection.MainGrpID, MediumID: $scope.ExamFormsCorrection.MediumID });
        }

        $scope.ChangeName = function (StudNameChecked) {
            if (StudNameChecked == false) {
                $scope.ExamFormsCorrection.StudName=$scope.TempExamFormsCorrection.StudName;
            }
        }

        $scope.ChangeFatherName = function (FathernameChecked) {
            if (FathernameChecked == false) {
                $scope.ExamFormsCorrection.Fathername = $scope.TempExamFormsCorrection.Fathername;
            }
        }

        $scope.ChangeMotherName = function (MotherNameChecked) {
            if (MotherNameChecked == false) {
                $scope.ExamFormsCorrection.MotherName = $scope.TempExamFormsCorrection.MotherName;
            }
        }
    });
});