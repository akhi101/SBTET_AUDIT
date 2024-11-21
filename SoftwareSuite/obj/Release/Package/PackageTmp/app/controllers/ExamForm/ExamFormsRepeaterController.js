define(['app'], function (app) {
    app.controller("ExamFormsRepeaterController", function ($scope, $state, $stateParams, AppSettings, ExamFormsRepeaterService, BasicCourseService, BasicBranchService, BasicMainGroupService, BasicExamService) {
        $scope.ExamFormsRepeater = { ExmFrmID: $stateParams.ExmFrmID, CourseID: $stateParams.CourseID, CollegeID: $stateParams.CollegeID, ExamID: $stateParams.ExamID, BranchID: $stateParams.BranchID };
        var CourseID = $stateParams.CourseID;
        var ExamID = $stateParams.ExamID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExamFormsRepeaterRightsdata = [];
        ExamFormsRepeaterRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormsRepeaterRightsdata.length; i++) {
            if (ExamFormsRepeaterRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormsRepeater.ExmFrmID == 0) {
                    if (ExamFormsRepeaterRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormsRepeaterRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormsRepeaterRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.FillSubCaste = function (CasteID) {
            $scope.SubCasteDisable = false;
            var SubCastList = ExamFormsRepeaterService.GetSubCastListByCasteID(CasteID);
            SubCastList.then(function (SubCastdata, status, headers, config, error) {
                $scope.SubCastList = SubCastdata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.Updateddisable = false;
        if ($scope.ExamFormsRepeater.ExmFrmID == 0) {
            var FormNo = ExamFormsRepeaterService.GetExmFrmMaxNo(AppSettings.ExamInstID, $scope.ExamFormsRepeater.CollegeID);
            FormNo.then(function (data) {
                $scope.ExamFormsRepeater.Formno = data;
                var FeeAmtList = ExamFormsRepeaterService.GetAcademicYearFeesByDate(AppSettings.AcdYrID);  //01 feescode
                FeeAmtList.then(function (FeeAmountdata, status, headers, config, error) {
                    $scope.ExamFormsRepeater.FormFees = FeeAmountdata[0].FeesAmount;
                    var MainGroupList = ExamFormsRepeaterService.GetMainGroupListByCollegeId($scope.ExamFormsRepeater.CollegeID, $scope.ExamFormsRepeater.CourseID, AppSettings.AcdYrID);
                    MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                        $scope.MainGroupList = MainGroupListdata;
                        var CourseList = BasicCourseService.GetBasicCourseList();
                        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                            $scope.CourseList = BasicCoursedata;
                            for (var i = 0; i < $scope.CourseList.length; i++) {
                                if ($scope.CourseList[i].CourseID == $stateParams.CourseID) {
                                    $scope.ExamFormsRepeater.CourseName = $scope.CourseList[i].CourseName;
                                    $scope.ExamFormsRepeater.CourseID = $scope.CourseList[i].CourseID;
                                }
                            }
                            var ExamList = BasicExamService.GetBasicExamList(0);
                            ExamList.then(function (Examdata, status, headers, config, error) {
                                $scope.ExamList = Examdata;
                                for (var i = 0; i < $scope.ExamList.length; i++) {
                                    if ($scope.ExamList[i].ExamID == $stateParams.ExamID) {
                                        $scope.ExamFormsRepeater.ExmName = $scope.ExamList[i].ExmName;
                                        $scope.ExamFormsRepeater.ExamID = $scope.ExamList[i].ExamID;
                                    }
                                }
                                var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                                BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                                    $scope.BasicBranchList = BasicBranchdata;
                                    for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                        if ($scope.BasicBranchList[i].BranchID == $stateParams.BranchID) {
                                            $scope.ExamFormsRepeater.BranchName = $scope.BasicBranchList[i].BranchName;
                                            $scope.ExamFormsRepeater.BranchID = $scope.BasicBranchList[i].BranchID;
                                        }
                                    }
                                    var CasteList = ExamFormsRepeaterService.GetCasteList();
                                    CasteList.then(function (Castedata, status, headers, config, error) {
                                        $scope.CasteList = Castedata;
                                        var SubCastList = ExamFormsRepeaterService.GetSubCastListByCasteID(0);
                                        SubCastList.then(function (SubCastdata, status, headers, config, error) {
                                            $scope.SubCastList = SubCastdata;
                                            $scope.SubCasteDisable = true;
                                            var SecondLangList = ExamFormsRepeaterService.GetBasicSubjectListForSecondLangaugeInRegStud1($scope.ExamFormsRepeater.CollegeID, $stateParams.CourseID, AppSettings.AcdYrID, 0);
                                            SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                                                $scope.SecondLangList = SecondLangdata;
                                                var MediumList = ExamFormsRepeaterService.GetBasicMediumInRegStud($scope.ExamFormsRepeater.CollegeID, $stateParams.BranchID, AppSettings.AcdYrID);
                                                MediumList.then(function (SecondLangdata, status, headers, config, error) {
                                                    $scope.MediumList = SecondLangdata;
                                                }, function (error) {
                                                    alert(error);
                                                });
                                            }, function (error) {
                                                alert(error);
                                            });
                                        }, function (Castedata, status, headers, config) {
                                            alert(error);
                                        });
                                    }, function (Castedata, status, headers, config) {
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
        } else {
            var MainGroupList = ExamFormsRepeaterService.GetMainGroupListByCollegeId($scope.ExamFormsRepeater.CollegeID, $scope.ExamFormsRepeater.CourseID, AppSettings.AcdYrID);
            MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                $scope.MainGroupList = MainGroupListdata;
                var CourseList = BasicCourseService.GetBasicCourseList();
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                    var ExamList = BasicExamService.GetBasicExamList(0);
                    ExamList.then(function (Examdata, status, headers, config, error) {
                        $scope.ExamList = Examdata;
                        var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                        BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                            $scope.BasicBranchList = BasicBranchdata;
                            var CasteList = ExamFormsRepeaterService.GetCasteList();
                            CasteList.then(function (Castedata, status, headers, config, error) {
                                $scope.CasteList = Castedata;
                                var SubCastList = ExamFormsRepeaterService.GetSubCastListByCasteID(0);
                                SubCastList.then(function (SubCastdata, status, headers, config, error) {
                                    $scope.SubCastList = SubCastdata;
                                    $scope.SubCasteDisable = true;
                                    var SecondLangList = ExamFormsRepeaterService.GetBasicSubjectListForSecondLangaugeInRegStud1($scope.ExamFormsRepeater.CollegeID, $stateParams.CourseID, AppSettings.AcdYrID, 0);
                                    SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                                        $scope.SecondLangList = SecondLangdata;
                                        var MediumList = ExamFormsRepeaterService.GetBasicMediumInRegStud($scope.ExamFormsRepeater.CollegeID, $stateParams.BranchID, AppSettings.AcdYrID);
                                        MediumList.then(function (SecondLangdata, status, headers, config, error) {
                                            $scope.MediumList = SecondLangdata;

                                            var ExamListdata = ExamFormsRepeaterService.GetExamFormsRepeaterById($scope.ExamFormsRepeater.ExmFrmID);
                                            ExamListdata.then(function (data, status, headers, config, error) {
                                                $scope.ExamFormsRepeater = data[0];
                                                for (var i = 0; i < $scope.CourseList.length; i++) {
                                                    if ($scope.CourseList[i].CourseID == data[0].CourseID) {
                                                        $scope.ExamFormsRepeater.CourseName = $scope.CourseList[i].CourseName;
                                                    }
                                                }
                                                for (var i = 0; i < $scope.ExamList.length; i++) {
                                                    if ($scope.ExamList[i].ExamID == data[0].ExamID) {
                                                        $scope.ExamFormsRepeater.ExmName = $scope.ExamList[i].ExmName;
                                                    }
                                                }
                                                for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                                    if ($scope.BasicBranchList[i].BranchID == data[0].BranchID) {
                                                        $scope.ExamFormsRepeater.BranchName = $scope.BasicBranchList[i].BranchName;
                                                    }
                                                }
                                                if ($scope.ExamFormsRepeater.StudCatID = 1) {   // main data
                                                    $scope.ExamFormsRepeater.StudCatID = "R";
                                                } else if ($scope.ExamFormsRepeater.StudCatID = 2) {
                                                    $scope.ExamFormsRepeater.StudCatID = "P";
                                                } else if ($scope.ExamFormsRepeater.StudCatID = 3) {
                                                    $scope.ExamFormsRepeater.StudCatID = "E";
                                                }
                                                $scope.Subjectdata = data[0].ExamFormsSubjectRepeater;
                                                $scope.Updateddisable = true;
                                            }, function (error) {
                                                alert(error);
                                            });
                                        }, function (error) {
                                            alert(error);
                                        });
                                    }, function (error) {
                                        alert(error);
                                    });
                                }, function (Castedata, status, headers, config) {
                                    alert(error);
                                });
                            }, function (Castedata, status, headers, config) {
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
        }
        $scope.GetGroupSubjects = function (MainGrpID) {
            if (MainGrpID != null) {
                var SubList = ExamFormsRepeaterService.GetGroupSubjects(MainGrpID, $scope.ExamFormsRepeater.ExamID);
                SubList.then(function (subdata, status, headers, config, error) {
                    $scope.Subjectdata = subdata;
                }, function (BasicBranchdata, status, headers, config) {
                    alert(error);
                });
            }
        }
        $("#ApplicationDate").ejDatePicker({ value: new Date(), allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#ApplicationDate").ejDatePicker("disable");
        $scope.ExamFormsRepeater.ImprovementFlag = "N";
        $scope.ExamFormsRepeater.StudCatID = "R";
        $scope.ExamFormsRepeater.StudType = "F";
        $scope.Subjectdata = [];
        var gridColumns = [
            { field: "ExmSubID", headerText: "ExmSubID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "EvalTypeID", headerText: "EvalTypeID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "SubjectID", headerText: "SubjectID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "ExmSubCode", headerText: "Subject Code", textAlign: ej.TextAlign.Left, width: 100, allowEditing: false },
            { field: "ExmSubName", headerText: "Subject Name", textAlign: ej.TextAlign.Left, width: 300, allowEditing: false },
            { field: "SubTyp", headerText: "Sub Type", textAlign: ej.TextAlign.Left, width: 0 },
            { field: "GrpSeqNo", headerText: "GrpSeqNo", textAlign: ej.TextAlign.Left, width: 0 }
        ];
        $("#SubjectGrid").ejGrid({
            dataSource: $scope.Subjectdata,
            allowSearching: true,
            allowScrolling: true,
            editSettings: { allowAdding: true },
            columns: gridColumns
        });
        $scope.SaveExamFormsRepeater = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                if ($("#ApplicationDate").val() != "") { $scope.ExamFormsRepeater.ApplicationDate = $("#ApplicationDate").val(); }
                $scope.ExamFormsRepeater.ExamFormsSubjectRepeater = $scope.Subjectdata;
                $scope.ExamFormsRepeater.CreLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsRepeater.UpdLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsRepeater.AcdYrID = AppSettings.AcdYrID;
                if ($scope.ExamFormsRepeater.StudCatID = "R") {
                    $scope.ExamFormsRepeater.StudCatID = 1;
                } else if ($scope.ExamFormsRepeater.StudCatID = "P") {
                    $scope.ExamFormsRepeater.StudCatID = 2;
                } else {
                    $scope.ExamFormsRepeater.StudCatID = 3;
                }
                if (($scope.ExamFormsRepeater.ExmFrmID == undefined) || ($scope.ExamFormsRepeater.ExmFrmID == "")) { $scope.ExamFormsRepeater.ExmFrmID = 0; }
                if ($scope.ExamFormsRepeater.ExmFrmID == 0) {
                    var getPromise = ExamFormsRepeaterService.AddExamFormsRepeater($scope.ExamFormsRepeater);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Saved successfully!!");
                        $scope.ExamFormsRepeater.StudName = "";
                        $scope.ExamFormsRepeater.Gender = "";

                        $scope.ExamFormsRepeater.SSCHallTicket = ""; 
                        $scope.ExamFormsRepeater.LastAppearYear = ""; 
                        $scope.ExamFormsRepeater.LastAppearMonth = ""; 
                        $scope.ExamFormsRepeater.Fathername = ""; 
                        $scope.ExamFormsRepeater.MotherName = ""; 
                        $scope.ExamFormsRepeater.CasteID = ""; 
                        $scope.ExamFormsRepeater.SubCastID = ""; 
                        $scope.ExamFormsRepeater.Gender = ""; 
                        $scope.ExamFormsRepeater.AadharNo = ""; 
                        $scope.ExamFormsRepeater.MobileNo = ""; 
                        $scope.ExamFormsRepeater.MainGrpID = ""; 
                        $scope.ExamFormsRepeater.SecondLangID = ""; 
                        $scope.ExamFormsRepeater.MediumID = ""; 
                        $scope.Subjectdata = [];
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    var getPromise = ExamFormsRepeaterService.UpdateExamFormsRepeater($scope.ExamFormsRepeater);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Updated successfully!!");
                        $scope.ExamFormsRepeater.StudName = "";
                        $scope.ExamFormsRepeater.Gender = "";

                        $scope.ExamFormsRepeater.SSCHallTicket = "";
                        $scope.ExamFormsRepeater.LastAppearYear = "";
                        $scope.ExamFormsRepeater.LastAppearMonth = "";
                        $scope.ExamFormsRepeater.Fathername = "";
                        $scope.ExamFormsRepeater.MotherName = "";
                        $scope.ExamFormsRepeater.CasteID = "";
                        $scope.ExamFormsRepeater.SubCastID = "";
                        $scope.ExamFormsRepeater.Gender = "";
                        $scope.ExamFormsRepeater.AadharNo = "";
                        $scope.ExamFormsRepeater.MobileNo = "";
                        $scope.ExamFormsRepeater.MainGrpID = "";
                        $scope.ExamFormsRepeater.SecondLangID = "";
                        $scope.ExamFormsRepeater.MediumID = ""; 
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
        $scope.DeleteExamFormsRepeater = function () {
            var getData = ExamFormsRepeaterService.DeleteExamFormsRepeater($scope.ExamFormsRepeater.ExmFrmID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.ExamFormsRepeater.SSCHallTicket == undefined) || ($scope.ExamFormsRepeater.SSCHallTicket == "")) {
                alert("Enter Hall Ticket No.");
                return false;
            }
            if (($scope.ExamFormsRepeater.LastAppearYear == undefined) || ($scope.ExamFormsRepeater.LastAppearYear == "")) {
                alert("Select Last Appear Year");
                return false;
            }
            if (($scope.ExamFormsRepeater.LastAppearMonth == undefined) || ($scope.ExamFormsRepeater.LastAppearMonth == "")) {
                alert("Select Last Month");
                return false;
            }
            if (($scope.ExamFormsRepeater.StudName == undefined) || ($scope.ExamFormsRepeater.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (($scope.ExamFormsRepeater.Fathername == undefined) || ($scope.ExamFormsRepeater.Fathername == "")) {
                alert("Enter Father Name");
                return false;
            }
            if (($scope.ExamFormsRepeater.MotherName == undefined) || ($scope.ExamFormsRepeater.MotherName == "")) {
                alert("Enter Mother Name");
                return false;
            }
            if (($scope.ExamFormsRepeater.CasteID == undefined) || ($scope.ExamFormsRepeater.CasteID == "")) {
                alert("Select Caste");
                return false;
            }
            if (($scope.ExamFormsRepeater.SubCastID == undefined) || ($scope.ExamFormsRepeater.SubCastID == "")) {
                $scope.ExamFormsRepeater.SubCastID = 0;
            }
            if (($scope.ExamFormsRepeater.Gender == undefined) || ($scope.ExamFormsRepeater.Gender == "")) {
                alert("Select Gender");
                return false;
            }
            if (($scope.ExamFormsRepeater.AadharNo == undefined) || ($scope.ExamFormsRepeater.AadharNo == "")) {
                alert("Enter Aaaddhar No.");
                return false;
            }
            if (($scope.ExamFormsRepeater.MobileNo == undefined) || ($scope.ExamFormsRepeater.MobileNo == "")) {
                alert("Enter Mobile No.");
                return false;
            }
            if (($scope.ExamFormsRepeater.MobileNo != "") && ($scope.ExamFormsRepeater.MobileNo != undefined)) {
                if (($scope.ExamFormsRepeater.MobileNo.length < 10) || ($scope.ExamFormsRepeater.MobileNo.length > 10)) {
                    alert("Invalid Mobile No.");
                    return false;
                }
            }
            if (($scope.ExamFormsRepeater.MainGrpID == undefined) || ($scope.ExamFormsRepeater.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            if (($scope.ExamFormsRepeater.SecondLangID == undefined) || ($scope.ExamFormsRepeater.SecondLangID == "")) {
                alert("Select Second Language");
                return false;
            }
            if (($scope.ExamFormsRepeater.MediumID == undefined) || ($scope.ExamFormsRepeater.MediumID == "")) {
                alert("Select Medium");
                return false;
            }
            if (($scope.ExamFormsRepeater.StudCatID == undefined) || ($scope.ExamFormsRepeater.StudCatID == "")) {
                alert("Select Student Category");
                return false;
            }
            if (($scope.ExamFormsRepeater.StudType == undefined) || ($scope.ExamFormsRepeater.StudType == "")) {
                alert("Select Student Type");
                return false;
            }
            if (($scope.ExamFormsRepeater.Formno == undefined) || ($scope.ExamFormsRepeater.Formno == "")) {
                alert("Enter Form no");
                return false;
            }
            if (($scope.ExamFormsRepeater.FormFees == undefined) || ($scope.ExamFormsRepeater.FormFees == "")) {
                alert("Enter Form Fees");
                return false;
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
            $state.go('Exam.ExamFormsRepeaterList');
        }
    });
});
