define(['app'], function (app) {
    app.controller("GovtColEnrollController", function ($scope, $state, $filter, $stateParams, AppSettings, GovtColEnrollService) {
        $scope.GovtColEnroll = {};
        var PageNm = $state.current.name.split(".")[1];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                if (UsersRightsdata[i].isaddable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        var getPromise = GovtColEnrollService.GetInsertEmptyRecGovtColEnrollSubject();
        getPromise.then(function (data) {
            $scope.GovtColEnroll.StudEnrolID = data;
        }, function (data) {
            alert(error);
        });
        $scope.gridinfo = true;
        $scope.DisableSubmitCollege = false;
        $scope.DisableEnrollCollege = false;
        $scope.EnrollCollege = function () {
            if ($scope.GovtEnrollCollegesData.length == 0) {
                alert("Select atleast one college");
                return;
            }
            $scope.candidateinfo = false;
        }
        $scope.collapse = "";
        $scope.collapse1 = "";
        $scope.GovtColEnroll.CheckType = "S";
        $scope.GovtColEnroll.PassingYear = "2018";
        $scope.GovtColEnroll.PassingMonth = "Mar";
        $scope.GovtColEnroll.CollegeID = AppSettings.CollegeID;
        $scope.RollEditDisableShow = false;
        $scope.RollEditDisable = true;
        var BoardList = GovtColEnrollService.GetBasicBoardListOtherthanTelengana(59);
        BoardList.then(function (BasicBoarddata, status, headers, config, error) {
            $scope.BoardList = BasicBoarddata;
        }, function (error) {
            alert(error);
        });
        var DistrictList = GovtColEnrollService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });
        var CourseList = GovtColEnrollService.GetCourseList();
        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
            $scope.CourseList = BasicCoursedata;
        }, function (error) {
            alert(error);
        });


        $scope.AllMondal = "";
        $scope.MandalDisable = true;
        $scope.GlgGender = "";
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.AllMondal = "All";
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;

                $scope.GovtColEnroll.CourseID = "";
                $scope.GovtColEnroll.ExamID = "";
                $scope.GovtColEnroll.BranchID = "";
                $scope.GovtColEnroll.MediumID = "";
                $scope.GovtColEnroll.MainGrpID = "";
                $scope.GovtColEnroll.SecondLangID = "";
                $scope.GovtColEnroll.BranchName = "";
                $scope.CollegeList = [];
                $scope.CollegeDataFromAPI = [];
                var MandalList = GovtColEnrollService.GetMandalListByDistrict(DistrictID);
                MandalList.then(function (MandalListdata, status, headers, config, error) {
                    $scope.MandalList = MandalListdata;
                    //var CollegeList = GovtColEnrollService.GetCollegeListByDistrictAndMandal(DistrictID, 0);
                    //CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    //    if (CollegeListdata.length == 0) {
                    //        $scope.CollegeList = [];
                    //        alert("There is no authorised college in this district");
                    //        return;
                    //    } else {
                    //        $scope.CollegeList = CollegeListdata;
                    //        $scope.GovtColEnroll.CollegeID = "";
                    //    }
                    //}, function (error) {
                    //    alert(error);
                    //});
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollege = function (MandalID) {
            $scope.GovtColEnroll.CourseID = "";
            $scope.GovtColEnroll.ExamID = "";
            $scope.GovtColEnroll.BranchID = "";
            $scope.GovtColEnroll.MediumID = "";
            $scope.GovtColEnroll.MainGrpID = "";
            $scope.GovtColEnroll.SecondLangID = "";
            $scope.GovtColEnroll.BranchName = "";
            $scope.GovtColEnroll.CollegeID = "";
            $scope.CollegeDataFromAPI = [];
            $scope.CollegeList = [];
            $scope.MainGroupList = [];
            $scope.SecondLangList = [];
            $scope.MediumList = [];

            //if (($scope.GovtColEnroll.DistrictID == undefined) || ($scope.GovtColEnroll.DistrictID == "")) {
            //    alert("Select District");
            //    return;
            //}
            //if (($scope.GovtColEnroll.MandalID == undefined) || ($scope.GovtColEnroll.MandalID == "")) {
            //    return;
            //}
            //var CollegeList = GovtColEnrollService.GetCollegeListByDistrictAndMandal($scope.GovtColEnroll.DistrictID, MandalID);
            //CollegeList.then(function (CollegeListdata, status, headers, config, error) {
            //    if (CollegeListdata.length == 0) {
            //        $scope.CollegeList = [];
            //        alert("There is no authorised college in this mandal");
            //        return;
            //    } else {
            //        $scope.CollegeList = CollegeListdata;
            //        $scope.GovtColEnroll.CollegeID = "";
            //    }
            //}, function (error) {
            //    alert(error);
            //});
        }
        $scope.CollegeDataFromAPI = [];
        $scope.FillCollData = function (CollegeID) {
            //$scope.GovtColEnroll.CourseID = "";
            //$scope.GovtColEnroll.ExamID = "";
            //$scope.GovtColEnroll.BranchID = "";
            //$scope.GovtColEnroll.MediumID = "";
            //$scope.GovtColEnroll.MainGrpID = "";
            //$scope.GovtColEnroll.SecondLangID = "";
            //$scope.GovtColEnroll.BranchName = "";
            $scope.SecondLangList = [];
            $scope.MediumList = [];
            if (CollegeID != null) {
                var CollegeDataApi = GovtColEnrollService.GetCollegeDataForOpenAdmission(CollegeID);
                CollegeDataApi.then(function (Colldata, status, headers, config, error) {
                    $scope.CollegeDataFromAPI = Colldata;
                    if (Colldata.length == 0) {
                        alert("select another college,this is not in list");
                        $scope.GovtColEnroll.CollegeID = "";
                        if ($scope.CollegeList.length == 1) {
                            $scope.CollegeList = [];
                        }
                        return;
                    } else {
                        //$scope.CourseDisable = false;
                        if (Colldata[0].clg_type == "girls") {
                            $scope.GlgGender = "F";
                        } else if (Colldata[0].clg_type == "boys") {
                            $scope.GlgGender = "M";
                        } else {
                            $scope.GlgGender = "Co";
                        }
                        $scope.SecondLangDisable = false;
                        var SecondLangList = GovtColEnrollService.GetBasicSubjectListForSecondLangaugeInRegStud(CollegeID, $scope.GovtColEnroll.BranchID, $scope.GovtColEnroll.CourseID);
                        SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                            $scope.SecondLangList = SecondLangdata;
                            $scope.MediumDisable = false;
                            var MediumList = GovtColEnrollService.GetMainGroupListForRegStudWithMainGrpID($scope.GovtColEnroll.CollegeID, $scope.GovtColEnroll.BranchID, $scope.GovtColEnroll.MainGrpID);
                            MediumList.then(function (SecondLangdata, status, headers, config, error) {
                                $scope.MediumList = SecondLangdata;
                            }, function (error) {
                                alert(error);
                            });
                        }, function (error) {
                            alert(error);
                        });
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.CourseDisable = false;
        $scope.CollegeDisable = true;
        $scope.MediumDisable = true;
        $scope.MainGrpDisable = true;
        $scope.BranchDisable = true;
        $scope.SecondLangDisable = true;
        $scope.candidateinfo = true;
        $scope.FillCoursePart = function (CourseID) {
            if (($scope.GovtColEnroll.DistrictID == undefined) || ($scope.GovtColEnroll.DistrictID == "")) {
                alert("Select District");
                return;
            }
            $scope.GovtColEnroll.ExamID = "";
            $scope.GovtColEnroll.BranchID = "";
            $scope.GovtColEnroll.MediumID = "";
            $scope.GovtColEnroll.MainGrpID = "";
            $scope.GovtColEnroll.SecondLangID = "";
            $scope.GovtColEnroll.BranchName = "";
            $scope.GovtColEnroll.CollegeID = "";

            $scope.CollegeDataFromAPI = [];
            $scope.CollegeList = [];
            $scope.MainGroupList = [];

            $scope.MainGrpDisable = false;
            $scope.CollegeDisable = true;
            var ExamList = GovtColEnrollService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                for (var i = 0; i < BasicExamdata.length; i++) {
                    if (BasicExamdata[i].SequenceNo == 1) {
                        $scope.GovtColEnroll.ExamID = BasicExamdata[0].ExamID;
                    }
                }
                var MainGroupList = GovtColEnrollService.GetMainGroupListByCourseID(CourseID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                    //$scope.SecondLangDisable = false;
                    //var SecondLangList = GovtColEnrollService.GetBasicSubjectListForSecondLangaugeInRegStud($scope.GovtColEnroll.CollegeID, CourseID);
                    //SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                    //    $scope.SecondLangList = SecondLangdata;
                    //}, function (error) {
                    //    alert(error);
                    //});

                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillBranchByGroup = function (MainGrpID) {
            if (MainGrpID != null) {
                //for (var i = 0; i < $scope.MainGroupList.length; i++) {
                //    if ($scope.MainGroupList[i].MainGrpID == MainGrpID) {
                //        if ($scope.MainGroupList[i].SecAadharVerify != 1) {
                //            alert("Aadhaar verification is pending for the group : " + $scope.MainGroupList[i].MainGrpName + "");
                //            $scope.GovtColEnrollExist.MainGrpID = "";
                //            return;
                //        }
                //    }
                //}
                $scope.SecondLangList = [];
                $scope.MediumList = [];
                $scope.CollegeDisable = false;
                $scope.BranchDisable = false;
                $scope.GovtColEnroll.MainGrpID = MainGrpID;
                var BranchList = GovtColEnrollService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                    $scope.GovtColEnroll.BranchID = BasicBranchdata[0].BranchID;
                    $scope.GovtColEnroll.BranchName = BasicBranchdata[0].BranchName;
                    if (($scope.GovtColEnroll.MandalID == undefined) || ($scope.GovtColEnroll.MandalID == ""))
                    {
                        $scope.AllMondal = "All";
                        $scope.GovtColEnroll.MandalID = "";                        
                    }
                    $scope.CollegeList = [];
                    var CollegeList = GovtColEnrollService.GetCollegesForGovtEnroll($scope.GovtColEnroll.DistrictID, $scope.GovtColEnroll.MandalID, BasicBranchdata[0].BranchID, $scope.GovtColEnroll.MainGrpID);
                    //var CollegeList = GovtColEnrollService.GetCollegeListByDistrictAndMandalAndBranach($scope.GovtColEnroll.DistrictID, $scope.GovtColEnroll.MandalID, BasicBranchdata[0].BranchID);
                    CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                        if (CollegeListdata.length == 0) {
                            $scope.CollegeList = [];
                            alert("There is no authorised college for this group");
                            return;
                        } else {
                            $scope.CollegeList = CollegeListdata;
                            $scope.GovtColEnroll.CollegeID = "";
                        }
                        $scope.FillSecondLaunguge(BasicBranchdata[0].BranchID);
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.FillSecondLaunguge = function (BranchID) {
            if (BranchID != null) {
                //$scope.SecondLangDisable = false;
                //var SecondLangList = GovtColEnrollService.GetBasicSubjectListForSecondLangaugeInRegStud(0, BranchID, $scope.GovtColEnroll.CourseID);
                //SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                //    $scope.SecondLangList = SecondLangdata;
                    //$scope.MediumDisable = false;
                    //var MediumList = GovtColEnrollService.GetBasicMediumInRegStud($scope.GovtColEnroll.CollegeID, BranchID);
                    //MediumList.then(function (SecondLangdata, status, headers, config, error) {
                    //    $scope.MediumList = SecondLangdata;
                    //}, function (error) {
                    //    alert(error);
                    //});
                //}, function (error) {
                //    alert(error);
                //});
            }
        }
        $scope.GovtColEnroll.SendedOTP = "";
        $scope.GovtColEnroll.OTP = "";
        $scope.SendOTP = function () {
            if (($scope.GovtColEnroll.SSCHallTicket == undefined) || ($scope.GovtColEnroll.SSCHallTicket == "")) {
                alert("Enter SSC Hall Ticket No.");
                return;
            }
            if ($scope.GovtEnrollCollegesData.length == 0) {
                alert("Select atleast single college");
                return;
            }
            if (($scope.GovtColEnroll.MotherName == undefined) || ($scope.GovtColEnroll.MotherName == "")) {
                alert("Enter mother name");
                return;
            }
            if (($scope.GovtColEnroll.Gender == undefined) || ($scope.GovtColEnroll.Gender == "")) {
                alert("Select Gender");
                return;
            }
            if (($scope.GovtColEnroll.BirthDate == undefined) || ($scope.GovtColEnroll.BirthDate == "")) {
                alert("Select birth date");
                return;
            }
            if ($scope.GovtColEnroll.CheckType == "O") {
                if ($("#BirthDate").val() == "") {
                    alert("Select birth date");
                    return;
                }
            }
            if (($scope.GovtColEnroll.MobileNo == undefined) || ($scope.GovtColEnroll.MobileNo == "")) {
                alert("Enter Mobile Number");
                return;
            }
            if (($scope.GovtColEnroll.MobileNo != "") && ($scope.GovtColEnroll.MobileNo != undefined)) {
                if (($scope.GovtColEnroll.MobileNo.length < 10) || ($scope.GovtColEnroll.MobileNo.length > 10)) {
                    alert("Invalid Mobile No.");
                    return false;
                }
            }
            if (($scope.GovtColEnroll.ParentCellno != "") && ($scope.GovtColEnroll.ParentCellno != undefined)) {
                if (($scope.GovtColEnroll.ParentCellno.length < 10) || ($scope.GovtColEnroll.ParentCellno.length > 10)) {
                    alert("Invalid Parent Mobile No.");
                    return false;
                }
            }
            
            if ($scope.GovtColEnroll.CheckType == "E") {
                if ($("#BirthDate").val() != "") { $scope.GovtColEnroll.BirthDate = $("#BirthDate").val(); }
            }
            if ($scope.GovtColEnroll.CheckType == "O") {
                if ($("#BirthDate").val() != "") { $scope.GovtColEnroll.BirthDate = $("#BirthDate").val(); }
            }
            if ($scope.GovtColEnroll.CheckType == "S") {
                $scope.GovtColEnroll.BoardID = 59;
            } else if ($scope.GovtColEnroll.CheckType == "E") {
                if (($scope.GovtColEnroll.BoardID == undefined) || ($scope.GovtColEnroll.BoardID == "")) {
                    alert("Select Other Board");
                    $scope.RollEditDisable = true;
                    $scope.RollEditDisableShow = false;
                    $scope.ClearData();
                    return;
                }
            } else if ($scope.GovtColEnroll.CheckType == "O") {
                $scope.GovtColEnroll.BoardID = 61;
            }
            for (var i = 0; i < $scope.GovtEnrollCollegesData.length; i++) {
                if ($scope.GovtEnrollCollegesData[i].ClgGender == "girls") {
                    $scope.GlgGender = "F";
                } else if ($scope.GovtEnrollCollegesData[i].ClgGender == "boys") {
                    $scope.GlgGender = "M";
                } else {
                    $scope.GlgGender = "Co";
                }
                if ($scope.GlgGender == "F") {
                    if ($scope.GovtColEnroll.Gender != "F") {
                        alert("College (" + $scope.GovtEnrollCollegesData[i].CollegeCode + ") is Girls college so you can't apply here.");
                        $scope.GovtColEnroll.CollegeID = "";
                        var getPromise = GovtColEnrollService.DeleteBoysOrGirlsInEmptyRecord($scope.GovtEnrollCollegesData[i].CollegeID, $scope.GovtColEnroll.StudEnrolID);
                        getPromise.then(function (msg) {
                            var gridObj = $("#GovtEnrollColleges").data("ejGrid");
                            gridObj.deleteRecord("CollegeID", { CollegeID: $scope.GovtEnrollCollegesData[i].CollegeID });
                        }, function (error) {
                            alert(error);
                        });
                        return;
                    }
                }
                if ($scope.GlgGender == "M") {
                    if ($scope.GovtColEnroll.Gender != "M") {
                        alert("College (" + $scope.GovtEnrollCollegesData[i].CollegeCode + ") is Boys college so you cannot apply here.");
                        $scope.GovtColEnroll.CollegeID = "";
                        var getPromise = GovtColEnrollService.DeleteBoysOrGirlsInEmptyRecord($scope.GovtEnrollCollegesData[i].CollegeID, $scope.GovtColEnroll.StudEnrolID);
                        getPromise.then(function (msg) {
                            var gridObj = $("#GovtEnrollColleges").data("ejGrid");
                            gridObj.deleteRecord("CollegeID", { CollegeID: $scope.GovtEnrollCollegesData[i].CollegeID });
                        }, function (error) {
                            alert(error);
                        });
                        return;
                    }
                }
            }
            var getSendOTP = GovtColEnrollService.GetRandanOTP($scope.GovtColEnroll.MobileNo);
            getSendOTP.then(function (data) {
                $scope.GovtColEnroll.SendedOTP = data;
                $scope.RollEditDisable = false;
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveGovtColEnroll = function () {
            
            if (($scope.GovtColEnroll.SSCHallTicket == undefined) || ($scope.GovtColEnroll.SSCHallTicket == "")) {
                alert("Enter SSC HallTicket");
                return;
            }
            if ($scope.GovtEnrollCollegesData.length == 0) {
                alert("Select atleast single college");
                return;
            }
            if (($scope.GovtColEnroll.MobileNo == undefined) || ($scope.GovtColEnroll.MobileNo == "")) {
                alert("Enter Mobile No ");
                return;
            }
            if (($scope.GovtColEnroll.MobileNo != "") && ($scope.GovtColEnroll.MobileNo != undefined)) {
                if (($scope.GovtColEnroll.MobileNo.length < 10) || ($scope.GovtColEnroll.MobileNo.length > 10)) {
                    alert("Invalid Mobile No.");
                    return false;
                }
            }
            if (($scope.GovtColEnroll.MotherName == undefined) || ($scope.GovtColEnroll.MotherName == "")) {
                alert("Enter mother name");
                return;
            }
            if (($scope.GovtColEnroll.BirthDate == undefined) || ($scope.GovtColEnroll.BirthDate == "")) {
                alert("Select birth date");
                return;
            }
            if ($scope.GovtColEnroll.CheckType == "E") {
                if ($("#BirthDate").val() != "") { $scope.GovtColEnroll.BirthDate = $("#BirthDate").val(); }
            }
            if ($scope.GovtColEnroll.CheckType == "O") {
                if ($("#BirthDate").val() != "") { $scope.GovtColEnroll.BirthDate = $("#BirthDate").val(); }
            }
            if ($scope.GovtColEnroll.CheckType == "S") {
                $scope.GovtColEnroll.BoardID = 59;
            } else if ($scope.GovtColEnroll.CheckType == "E") {
                if (($scope.GovtColEnroll.BoardID == undefined) || ($scope.GovtColEnroll.BoardID == "")) {
                    alert("Select Other Board");
                    $scope.RollEditDisable = false;
                    return;
                }
            } else if ($scope.GovtColEnroll.CheckType == "O") {
                $scope.GovtColEnroll.BoardID = 61;
            }
            //for (var i = 0; i < $scope.GovtEnrollCollegesData.length; i++) {
            //    if ($scope.GovtEnrollCollegesData[i].ClgGender == "girls") {
            //        $scope.GlgGender = "F";
            //    } else if ($scope.GovtEnrollCollegesData[i].ClgGender == "boys") {
            //        $scope.GlgGender = "M";
            //    } else {
            //        $scope.GlgGender = "Co";
            //    }
            //}
            if ($scope.GovtColEnroll.SendedOTP == $scope.GovtColEnroll.OTP) {
                $scope.RollEditDisable = false;
            } else {
                alert("Enter valid OTP");
                return;
            }
            $scope.RollEditDisable = true;
            $scope.GovtColEnroll.BoardType = $scope.GovtColEnroll.CheckType;
            var getPromise = GovtColEnrollService.CheckMobileNoCount($scope.GovtColEnroll.MobileNo);
            getPromise.then(function (data) {
                if (data == 2) {
                    alert("Entered Mobile No. already used two times. Please enter another Mobile No.");
                    $scope.GovtColEnroll.MobileNo = "";
                    $scope.RollEditDisable = false;
                    return;
                } else {
                    $scope.RollEditDisable = true;
                    var getPromise = GovtColEnrollService.PutGovtColEnrollSubjectForEmptyRecord($scope.GovtColEnroll);
                    getPromise.then(function (msg) {
                        $scope.candidateinfo = true;
                        alert("Saved Successfully");
                        $scope.RollEditDisableShow = false;
                        $scope.ClearData();
                        var strPrint = confirm("Do you want to print this Form?");
                        if (strPrint == true) {
                            $scope.Print();
                        } else {
                            RedirectToListPage();
                        }
                    }, function (error) {
                        $scope.candidateinfo = false;
                        $scope.RollEditDisable = false;
                        $scope.RollEditDisableShow = false;
                        alert(error);
                        $scope.ClearData();
                    });
                }
            }, function (error) {
                alert(error);
                $scope.RegisterAdmittedStudent.MobileNo = "";
            });
        }
        $scope.Print = function () {
            var Urlstring = "api/GovtColEnroll/GetGovtColEnrollListByID/?StudEnrolID=" + $scope.GovtColEnroll.StudEnrolID;
            var dataset1 = "dsStudentEnroll";
            var dataset2 = "dsStudentEnrollCollegeDetails";
            $state.go('ReportViewer1Controller', { ReportName: 'RptStudentEnrollFormReport.rdlc', url: Urlstring, ds1: dataset1, ds2: dataset2 });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('GovtColEnrollList');
        }

        $scope.ShowStudentInfo = function () {
            if (($scope.GovtColEnroll.CheckType == undefined) || ($scope.GovtColEnroll.CheckType == "")) {
                alert("Select Board Name");
                return;
            }
            if (($scope.GovtColEnroll.SSCHallTicket == undefined) || ($scope.GovtColEnroll.SSCHallTicket == "")) {
                alert("Enter SSC Hall Ticket");
                return;
            }
            if (($scope.GovtColEnroll.PassingYear == undefined) || ($scope.GovtColEnroll.PassingYear == "")) {
                alert("Select Year");
                return;
            }
            if (($scope.GovtColEnroll.PassingMonth == undefined) || ($scope.GovtColEnroll.PassingMonth == "")) {
                alert("Select Passing Month");
                return;
            }
            if ($scope.GovtColEnroll.CheckType == "S") {
                $scope.GovtColEnroll.BoardID = 59;
            } else if ($scope.GovtColEnroll.CheckType == "E") {
                if (($scope.GovtColEnroll.BoardID == undefined) || ($scope.GovtColEnroll.BoardID == "")) {
                    alert("Select Other Board");
                    $scope.RollEditDisable = true;
                    $scope.RollEditDisableShow = false;
                    $scope.ClearData();
                    return;
                }
            } else if ($scope.GovtColEnroll.CheckType == "O") {
                $scope.GovtColEnroll.BoardID = 61;
            }
            var Stream = "";
            if ($scope.GovtColEnroll.PassingMonth == 'Mar') {
                Stream = "R";
            } else if ($scope.GovtColEnroll.PassingMonth == 'Jun') {
                Stream = "A";
            }
            var getPromise = GovtColEnrollService.CheckHallTicketNoPresent($scope.GovtColEnroll.PassingYear, $scope.GovtColEnroll.SSCHallTicket, $scope.GovtColEnroll.BoardID);
            getPromise.then(function (data) {
                if (data != 0) {
                    alert("Hall Ticket No already exist");
                    $scope.GovtColEnroll.SSCHallTicket = "";
                    //$scope.RollEditDisable = true;
                    //$scope.RollEditDisableShow = false;
                    //$scope.ClearData();
                } else {
                    var getPromise = GovtColEnrollService.GetCheckHallTicketNoPresentStudReg($scope.GovtColEnroll.PassingYear, $scope.GovtColEnroll.SSCHallTicket, $scope.GovtColEnroll.BoardID);
                    getPromise.then(function (data) {
                        if (data != 0) {
                            alert("You have already enrolled through college.");
                            $scope.GovtColEnroll.SSCHallTicket = "";
                            RedirectToListPage();
                            //$scope.RollEditDisable = true;
                            //$scope.RollEditDisableShow = false;
                            //$scope.ClearData();
                        } else {
                            $scope.RollEditDisableShow = true;
                            var CheckType = $scope.GovtColEnroll.CheckType;
                            var PassingYear = $scope.GovtColEnroll.PassingYear;
                            var PassingMonth = $scope.GovtColEnroll.PassingMonth;
                            var BoardID = $scope.GovtColEnroll.BoardID;
                            var LateStudentdata = GovtColEnrollService.GetRegisterStudentData($scope.GovtColEnroll.PassingYear, $scope.GovtColEnroll.SSCHallTicket, $scope.GovtColEnroll.CheckType, $scope.GovtColEnroll.BoardID, Stream);
                            LateStudentdata.then(function (data) {
                                if (data.length > 0) {
                                    $scope.candidateinfo = false;
                                    $scope.GovtColEnroll.StudName = data[0].StudName;
                                    $scope.GovtColEnroll.FatherName = data[0].FatherName;
                                    $scope.GovtColEnroll.MotherName = data[0].MotherName;
                                    $scope.GovtColEnroll.Nationality = data[0].Nationality;
                                    $scope.GovtColEnroll.BirthDate = data[0].BirthDate;
                                    $scope.GovtColEnroll.MobileNo = data[0].MobileNo;
                                    $scope.GovtColEnroll.Gender = data[0].Gender;
                                    $scope.GovtColEnroll.ParentCellno = data[0].ParentCellno;
                                    $scope.GovtColEnroll.BoardID = BoardID;
                                    $scope.GovtColEnroll.CheckType = CheckType;
                                    $scope.GovtColEnroll.PassingYear = PassingYear;
                                    $scope.GovtColEnroll.PassingMonth = PassingMonth;
                                    //if ($scope.GovtColEnroll.Gender == "") {
                                    //    alert("Gender is unknown for this SSC HallTicket No.");
                                    //    $scope.RollEditDisableShow = false;
                                    //    $scope.candidateinfo = true;
                                    //    $scope.ClearData();
                                    //    return;
                                    //}
                                    if ($scope.GovtColEnroll.CheckType == "E") {
                                        $scope.OtherBoardreadonly = false;
                                        $("#BirthDate").ejDatePicker("enable");
                                    } else if ($scope.GovtColEnroll.CheckType == "S") {
                                        $("#BirthDate").ejDatePicker("disable");
                                        $scope.GovtColEnroll.BirthDate = $filter('date')($scope.GovtColEnroll.BirthDate, "dd/MMM/yyyy")
                                        $("#BirthDate").val($scope.GovtColEnroll.BirthDate);
                                    } else if ($scope.GovtColEnroll.CheckType == "O") {
                                        $scope.OtherBoardreadonly = false;
                                        $("#BirthDate").ejDatePicker("enable");
                                    }
                                    //$scope.RollEditDisable = false;
                                } else {
                                    alert("Data not found for this hall ticket.");
                                    $scope.RollEditDisableShow = false;
                                    $scope.candidateinfo = true;
                                }
                            }, function (error) {
                                if (error == '[{"Id":"No Data","Message":"No Data Found"}]') {
                                    alert("Data not found for this hall ticket.");
                                    return;
                                }
                                else {
                                    alert(error);
                                }
                                $scope.RollEditDisableShow = false;
                                $scope.candidateinfo = true;
                            });
                        }
                    }, function (error) {
                        if (error == '[{"Id":"No Data","Message":"No Data Found"}]') {
                            alert("Data not found for this hall ticket.");
                            return;
                        }
                        else {
                            alert(error);
                        }
                        $scope.RollEditDisable = true;
                        //$scope.RollEditDisableShow = false;
                        $scope.ClearData();
                    }); 
                }
            }, function (error) {
                if (error == '[{"Id":"No Data","Message":"No Data Found"}]') {
                    alert("Data not found for this hall ticket.");
                    return;
                }
                else {
                    alert(error);
                }
                $scope.RollEditDisable = true;
                //$scope.RollEditDisableShow = false;
                $scope.ClearData();
            });
            //var StudEnrolldata = GovtColEnrollService.GetStudentEnrollData($scope.GovtColEnroll.SSCHallTicket, $scope.GovtColEnroll.BoardID);
            //StudEnrolldata.then(function (data) {
            //    if (data.length > 0) {
            //        $scope.candidateinfo = false;
            //        $scope.GovtColEnroll = data[0];
            //        $scope.GovtColEnroll.BoardID = BoardID;
            //        $scope.GovtColEnroll.CheckType = CheckType;
            //        $scope.GovtColEnroll.PassingYear = PassingYear;
            //        $scope.GovtColEnroll.PassingMonth = PassingMonth;
            //        $scope.GovtColEnroll.CheckType = $scope.GovtColEnroll.BoardType;
            //        $("#BirthDate").ejDatePicker("disable");
            //        $scope.GovtColEnroll.BirthDate = $filter('date')($scope.GovtColEnroll.BirthDate, "dd/MMM/yyyy")
            //        $("#BirthDate").val($scope.GovtColEnroll.BirthDate);
            //        $scope.RollEditDisable = false;

            //        if (data[0].EnrolFlag == 'Y') {
            //            $scope.RollEditDisable = true;
            //        }
            //        var GovtEnrollCollegesData = data[0].StudEnrolCol;
            //        var data = { CollegeID: 10247, ColName: "ASDFG" };
            //        $scope.GovtEnrollCollegesData = data;// data[0].StudEnrolCol;
            //        $("#GovtEnrollColleges").ejGrid("dataSource", GovtEnrollCollegesData);
            //        //var gridObj = $("#GovtEnrollColleges").ejGrid("instance");
            //        //gridObj.refreshContent();
            //    } else {

            //    }
            //}, function (error) {
            //    alert(error);
            //    $scope.RollEditDisableShow = false;
            //    $scope.candidateinfo = true;
            //});
        }
        $scope.ClearData = function () {
            $scope.GovtColEnroll.MobileNo = "";
            $scope.GovtColEnroll.SSCHallTicket = "";
            $scope.GovtColEnroll.StudName = "";
            $scope.GovtColEnroll.FatherName = "";
            $scope.GovtColEnroll.MotherName = "";
            $scope.GovtColEnroll.Nationality = "";
            $scope.GovtColEnroll.BirthDateDesc = "";

            $scope.RollEditDisableShow = false;
            $scope.candidateinfo = true;
            $scope.GovtColEnroll.CheckType = "S";

            //$scope.GovtColEnroll.CourseName = "";
            //$scope.StreamDisable = true;
            //$scope.GovtColEnroll.CollegeID = "";
            //$scope.GovtColEnroll.CourseID = "";
            //$scope.GovtColEnroll.ExamID = "";
            //$scope.GovtColEnroll.BranchID = "";
            //$scope.GovtColEnroll.MediumID = "";
            //$scope.GovtColEnroll.MainGrpID = "";
            //$scope.GovtColEnroll.SecondLangID = "";
            //$scope.GovtEnrollCollegesData = [];
            //$scope.GovtColEnroll.BranchName = "";
        }
        $("#BirthDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#BirthDate").ejDatePicker("disable");
        $scope.OtherBoardreadonly = true;


        //Open Admission coding 
        $scope.ClearCollegeData = function () {
            $scope.GovtEnrollCollegesData = [];
        }
        $scope.SubmitCollege = function () {
            if (($scope.GovtColEnroll.DistrictID == undefined) || ($scope.GovtColEnroll.DistrictID == "")) {
                alert("Select District");
                return;
            }
            if (($scope.GovtColEnroll.CollegeID == undefined) || ($scope.GovtColEnroll.CollegeID == "")) {
                alert("Select College");
                return;
            }
            if (($scope.GovtColEnroll.CourseID == undefined) || ($scope.GovtColEnroll.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.GovtColEnroll.MainGrpID == undefined) || ($scope.GovtColEnroll.MainGrpID == "")) {
                alert("Select Group");
                return;
            }
            //if (($scope.GovtColEnroll.BranchID == undefined) || ($scope.GovtColEnroll.BranchID == "")) {
            //    alert("Select Branch");
            //    return;
            //}
            if ($scope.GovtColEnroll.CourseID == 1) {
                if (($scope.GovtColEnroll.SecondLangID == undefined) || ($scope.GovtColEnroll.SecondLangID == "")) {
                    alert("Select Second Language");
                    return;
                }
            }
            if (($scope.GovtColEnroll.MediumID == undefined) || ($scope.GovtColEnroll.MediumID == "")) {
                alert("Select Medium");
                return;
            }
            if ($scope.GovtEnrollCollegesData.length == 3) {
                alert("Only 3 colleges are allowed to be selected");
                return;
            }
            for (var i = 0; i < $scope.GovtEnrollCollegesData.length; i++) {
                if ($scope.GovtEnrollCollegesData[i].CollegeID == $scope.GovtColEnroll.CollegeID) {
                    alert("College already selected, Please select another college");
                    $scope.GovtColEnroll.CollegeID = undefined;
                    $scope.GovtColEnroll.CollegeID = "";
                    $scope.GovtColEnroll.CourseID = "";
                    $scope.GovtColEnroll.ExamID = "";
                    $scope.GovtColEnroll.BranchID = "";
                    $scope.GovtColEnroll.MediumID = "";
                    $scope.GovtColEnroll.MainGrpID = "";
                    $scope.GovtColEnroll.SecondLangID = "";
                    $scope.GovtColEnroll.BranchName = "";
                    return;
                }
            }
            //if ($filter('filter')($scope.GovtEnrollCollegesData, { CollegeID: $scope.GovtColEnroll.CollegeID }).length > 0) {
            //    alert("College already selected, Please select another college");
            //    $scope.GovtColEnroll.CollegeID = undefined;
            //    $scope.GovtColEnroll.CollegeID = "";
            //    $scope.GovtColEnroll.CourseID = "";
            //    $scope.GovtColEnroll.ExamID = "";
            //    $scope.GovtColEnroll.BranchID = "";
            //    $scope.GovtColEnroll.MediumID = "";
            //    $scope.GovtColEnroll.MainGrpID = "";
            //    $scope.GovtColEnroll.SecondLangID = "";
            //    $scope.GovtColEnroll.BranchName = "";
            //    return;
            //}
            $scope.gridinfo = false;
            var obj = {};
            $scope.TempData = [];

            var ColName = "";
            var CollegeCode = "";
            for (var i = 0; i < $scope.CollegeList.length; i++) {
                if ($scope.CollegeList[i].CollegeID == $scope.GovtColEnroll.CollegeID) {
                    ColName = $scope.CollegeList[i].ColName;
                    CollegeCode = $scope.CollegeList[i].CollegeCode;
                }
            }
            var clg_type = "";
            for (var i = 0; i < $scope.CollegeDataFromAPI.length; i++) {
                if ($scope.CollegeDataFromAPI[i].college_code == CollegeCode) {
                    clg_type = $scope.CollegeDataFromAPI[i].clg_type;
                }
            }
            var CourseName = "";
            for (var i = 0; i < $scope.CourseList.length; i++) {
                if ($scope.CourseList[i].CourseID == $scope.GovtColEnroll.CourseID) {
                    CourseName = $scope.CourseList[i].CourseName;
                }
            }
            var ExmName = "";
            for (var i = 0; i < $scope.ExamList.length; i++) {
                if ($scope.ExamList[i].ExamID == $scope.GovtColEnroll.ExamID) {
                    ExmName = $scope.ExamList[i].ExmName;
                }
            }
            var BranchName = "";
            for (var i = 0; i < $scope.BranchList.length; i++) {
                if ($scope.BranchList[i].BranchID == $scope.GovtColEnroll.BranchID) {
                    BranchName = $scope.BranchList[i].BranchName;
                }
            }
            var MediumName = "";
            for (var i = 0; i < $scope.MediumList.length; i++) {
                if ($scope.MediumList[i].MediumID == $scope.GovtColEnroll.MediumID) {
                    MediumName = $scope.MediumList[i].MediumName;
                }
            }
            var MainGrpName = "";
            for (var i = 0; i < $scope.MainGroupList.length; i++) {
                if ($scope.MainGroupList[i].MainGrpID == $scope.GovtColEnroll.MainGrpID) {
                    MainGrpName = $scope.MainGroupList[i].MainGrpName;
                }
            }
            obj.ColName = ColName;
            obj.CollegeCode = CollegeCode;
            obj.ClgGender = clg_type;
            obj.CourseID = $scope.GovtColEnroll.CourseID;
            obj.CourseName = CourseName;
            obj.ExamID = $scope.GovtColEnroll.ExamID;
            obj.ExmName = ExmName;
            obj.BranchID = $scope.GovtColEnroll.BranchID;
            obj.BranchName = BranchName;
            obj.MediumID = $scope.GovtColEnroll.MediumID;
            obj.MediumName = MediumName;
            obj.MainGrpID = $scope.GovtColEnroll.MainGrpID;
            obj.MainGrpName = MainGrpName;
            if (($scope.GovtColEnroll.SecondLangID == undefined) || ($scope.GovtColEnroll.SecondLangID == "")) {
                $scope.GovtColEnroll.SecondLangID = 0;
            } else {
                var SubName = "";
                for (var i = 0; i < $scope.SecondLangList.length; i++) {
                    if ($scope.SecondLangList[i].SecondLangID == $scope.GovtColEnroll.SecondLangID) {
                        SubName = $scope.SecondLangList[i].SubName;
                    }
                }
                obj.SecondLangID = $scope.GovtColEnroll.SecondLangID;
                obj.SubName = SubName;
            }
            obj.CollegeID = $scope.GovtColEnroll.CollegeID;
            $scope.GovtEnrollCollegesData.push(obj);
            $scope.TempData.push(obj);

            $scope.GovtColEnroll.StudEnrolCol = $scope.TempData;
            //$scope.GovtColEnroll.StudEnrolCol = $scope.GovtEnrollCollegesData;
            //Save Transaction Record
            var getPromise = GovtColEnrollService.PutEnrollCollegesForEmptyRecord($scope.GovtColEnroll);
            getPromise.then(function (msg) {

                $scope.GovtColEnroll.CollegeID = "";
                $scope.GovtColEnroll.CourseID = "";
                $scope.GovtColEnroll.ExamID = "";
                $scope.GovtColEnroll.BranchID = "";
                $scope.GovtColEnroll.MediumID = "";
                $scope.GovtColEnroll.MainGrpID = "";
                $scope.GovtColEnroll.SecondLangID = "";
                $scope.GovtColEnroll.BranchName = "";
            }, function (error) {
                alert(error);
                $scope.gridinfo = false;
            });
        }
        var gridColumns = [
            { field: "ColName", headerText: "College Name", textAlign: ej.TextAlign.length, width: 200, allowEditing: false },
            { field: "CollegeCode", headerText: "Code", textAlign: ej.TextAlign.Right, width: 50, allowEditing: false },
            { field: "ClgGender", headerText: "ClgGender", textAlign: ej.TextAlign.Right, width: 0, allowEditing: false, visible: true },
            { field: "principal_mobile_no", headerText: "principal_mobile_no", textAlign: ej.TextAlign.Right, width: 0, allowEditing: false, visible: true },
            { field: "CourseID", headerText: "Stream", textAlign: ej.TextAlign.Left, width: 0, visible: false, allowEditing: false },
            { field: "CourseName", headerText: "Stream", textAlign: ej.TextAlign.Left, width: 80, allowEditing: false },
            { field: "ExamID", headerText: "Exam", textAlign: ej.TextAlign.Left, width: 0, visible: false, allowEditing: false },
            { field: "ExmName", headerText: "Exam", textAlign: ej.TextAlign.Left, width: 80, allowEditing: false },
            { field: "BranchID", headerText: "Branch", textAlign: ej.TextAlign.Left, width: 0, visible: false, allowEditing: false },
            { field: "BranchName", headerText: "Branch", textAlign: ej.TextAlign.Left, width: 80, allowEditing: false },
            { field: "MediumID", headerText: "Medium", textAlign: ej.TextAlign.Left, width: 0, visible: false, allowEditing: false },
            { field: "MediumName", headerText: "Medium", textAlign: ej.TextAlign.Left, width: 80, allowEditing: false },
            { field: "MainGrpID", headerText: "Main Group", textAlign: ej.TextAlign.Left, width: 0, visible: false, allowEditing: false },
            { field: "MainGrpName", headerText: "Group", textAlign: ej.TextAlign.Left, width: 80, allowEditing: false },
            { field: "SecondLangID", headerText: "Second Lang", textAlign: ej.TextAlign.Left, width: 0, visible: false, allowEditing: false },
            { field: "SubName", headerText: "Second Language", textAlign: ej.TextAlign.Left, width: 80, allowEditing: false },
            { field: "CollegeID", headerText: "CollegeID", isPrimaryKey: true, visible: false, textAlign: ej.TextAlign.Left, width: 0 },
            { field: "StudEnrolColID", headerText: "StudEnrolColID", visible: false, textAlign: ej.TextAlign.Left, width: 0 },
        ];
        $scope.GovtEnrollCollegesData = [];
        $("#GovtEnrollColleges").ejGrid({
            dataSource: $scope.GovtEnrollCollegesData,
            //allowSearching: true,
            //allowScrolling: true,
            //allowFiltering: true,
            editSettings: { allowDeleting: true },
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Delete, ej.Grid.ToolBarItems.Search] },
            toolbarClick: function (args) {
                if (args.itemName == "Add") {
                    args.cancel = true;
                    AddNew();
                }
                if (args.itemName == "Delete") {
                    var getPromise = GovtColEnrollService.DeleteBoysOrGirlsInEmptyRecord(args.model.selectedRecords[0].CollegeID, $scope.GovtColEnroll.StudEnrolID);
                    getPromise.then(function (msg) {
                    }, function (error) {
                        alert(error);
                    });
                    return;
                }
                if (args.itemName == "Excel Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToExcelUrl);
                }
                if (args.itemName == "Word Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToWordUrl);
                }
                if (args.itemName == "PDF Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToPdfUrl);
                }
            },
            columns: gridColumns
        });
        $scope.ChangeSecondLanguage = function (SecondLangID) {
            //for (var i = 0; i < $scope.SecondLangList.length; i++) {
            //    if ($scope.SecondLangList[i].SecondLangID == SecondLangID) {
            //        if (!$scope.SecondLangList[i].SubAadharVerify > 0) {
            //            alert("Aadhaar verification is pending for the second language : " + $scope.MainGroupList[i].SubName + "");
            //            $scope.GovtColEnroll.SecondLangID = "";
            //            return;
            //        }
            //    }
            //}
        }
        $scope.NewEnrollment = function () {
            $state.go('GovtColEnroll');
        }
        $scope.ExistingEnrollment = function () {
            $state.go('GovtColEnrollExist');
        }
        $scope.ClearDataHallTickete = function () {
            $scope.GovtColEnroll.SSCHallTicket = "";
            $scope.GovtColEnroll.CheckType = "S";
            $scope.GovtColEnroll.PassingYear = "2018";
            $scope.GovtColEnroll.PassingMonth = "Mar";
            $scope.RollEditDisableShow = false;


            $scope.GovtColEnroll.MobileNo = "";
            $scope.GovtColEnroll.SSCHallTicket = "";
            $scope.GovtColEnroll.StudName = "";
            $scope.GovtColEnroll.FatherName = "";
            $scope.GovtColEnroll.MotherName = "";
            $scope.GovtColEnroll.Nationality = "";
            $scope.GovtColEnroll.BirthDateDesc = "";
            $scope.GovtColEnroll.BirthDate = "";
            //if ($("#BirthDate").val() != "") { $scope.GovtColEnroll.BirthDate = $("#BirthDate").val(); }

           

        }

        
        $scope.ChangeCheckType = function (CheckType) {
            if (CheckType == "O") {
                $scope.GovtColEnroll.BoardID = 61;
            }
        }
    });
});