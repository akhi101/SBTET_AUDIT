define(['app'], function (app) {
    app.controller("GovtColEnrollExistController", function ($scope, $state, $filter, $stateParams, AppSettings, GovtColEnrollService) {
        $scope.GovtColEnrollExist = {};
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
        $scope.collapse = "";
        $scope.collapse1 = "";
        $scope.GovtColEnrollExist.CheckType = "S";
        $scope.GovtColEnrollExist.CollegeID = AppSettings.CollegeID;
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



        $scope.MandalDisable = true;
        $scope.GlgGender = "";
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;
                var MandalList = GovtColEnrollService.GetMandalListByDistrict(DistrictID);
                MandalList.then(function (MandalListdata, status, headers, config, error) {
                    $scope.MandalList = MandalListdata;
                    //var CollegeList = GovtColEnrollService.GetCollegeListByDistrictAndMandal(DistrictID, 0);
                    //CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    //    if (CollegeListdata.length == 0) {
                    //        $scope.CollegeList = [];
                    //        alert("There is no autherised college in this district");
                    //        return;
                    //    } else {
                    //        $scope.CollegeList = CollegeListdata;
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
            $scope.GovtColEnrollExist.CourseID = "";
            $scope.GovtColEnrollExist.ExamID = "";
            $scope.GovtColEnrollExist.BranchID = "";
            $scope.GovtColEnrollExist.MediumID = "";
            $scope.GovtColEnrollExist.MainGrpID = "";
            $scope.GovtColEnrollExist.SecondLangID = "";
            $scope.GovtColEnrollExist.BranchName = "";
            $scope.GovtColEnrollExist.CollegeID = "";
            $scope.CollegeDataFromAPI = [];
            $scope.CollegeList = [];
            $scope.MainGroupList = [];
            $scope.SecondLangList = [];
            $scope.MediumList = [];
            //if (($scope.GovtColEnrollExist.DistrictID == undefined) || ($scope.GovtColEnrollExist.DistrictID == "")) {
            //    alert("Select District");
            //    return;
            //}
            //if (($scope.GovtColEnrollExist.MandalID == undefined) || ($scope.GovtColEnrollExist.MandalID == "")) {
            //    return;
            //}
            //var CollegeList = GovtColEnrollService.GetCollegeListByDistrictAndMandal($scope.GovtColEnrollExist.DistrictID, MandalID);
            //CollegeList.then(function (CollegeListdata, status, headers, config, error) {
            //    if (CollegeListdata.length == 0) {
            //        $scope.CollegeList = [];
            //        alert("There is no autherised college in this mandal");
            //        return;
            //    } else {
            //        $scope.CollegeList = CollegeListdata;
            //    }
            //}, function (error) {
            //    alert(error);
            //});
        }
        $scope.CollegeDataFromAPI = [];
        $scope.FillCollData = function (CollegeID) {
            //$scope.GovtColEnrollExist.CourseID = "";
            //$scope.GovtColEnrollExist.ExamID = "";
            //$scope.GovtColEnrollExist.BranchID = "";
            //$scope.GovtColEnrollExist.MediumID = "";
            //$scope.GovtColEnrollExist.MainGrpID = "";
            //$scope.GovtColEnrollExist.SecondLangID = "";
            //$scope.GovtColEnrollExist.BranchName = "";
            if (CollegeID != null) {
                var CollegeDataApi = GovtColEnrollService.GetCollegeDataForOpenAdmission(CollegeID);
                CollegeDataApi.then(function (Colldata, status, headers, config, error) {
                    $scope.CollegeDataFromAPI = Colldata;
                    if (Colldata.length == 0) {
                        alert("select another college");
                        return;
                    } else {
                        $scope.CourseDisable = false;
                        if (Colldata[0].clg_type == "girls") {
                            $scope.GlgGender = "F";
                        } else if (Colldata[0].clg_type == "boys") {
                            $scope.GlgGender = "M";
                        } else {
                            $scope.GlgGender = "Co";
                        }
                        $scope.SecondLangDisable = false;
                        var SecondLangList = GovtColEnrollService.GetBasicSubjectListForSecondLangaugeInRegStud(CollegeID, $scope.GovtColEnrollExist.BranchID, $scope.GovtColEnrollExist.CourseID);
                        SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                            $scope.SecondLangList = SecondLangdata;
                            $scope.MediumDisable = false;
                            var MediumList = GovtColEnrollService.GetBasicMediumInRegStud($scope.GovtColEnrollExist.CollegeID, $scope.GovtColEnrollExist.BranchID);
                            MediumList.then(function (SecondLangdata, status, headers, config, error) {
                                $scope.MediumList = SecondLangdata;
                            }, function (error) {
                                alert(error);
                            });

                        }, function (error) {
                            alert(error);
                        });
                        //var CourseList = GovtColEnrollService.GetCourseListForRegStud(CollegeID);
                        //CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                        //    $scope.CourseList = BasicCoursedata;
                        //    //$scope.MainGrpDisable = false;
                        //    //var MainGroupList = GovtColEnrollService.GetMainGroupListByCollegeId(CollegeID);
                        //    //MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                        //    //    $scope.MainGroupList = MainGroupListdata;
                        //    //}, function (error) {
                        //    //    alert(error);
                        //    //});
                        //}, function (error) {
                        //    alert(error);
                        //});
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
            if (($scope.GovtColEnrollExist.DistrictID == undefined) || ($scope.GovtColEnrollExist.DistrictID == "")) {
                alert("Select District");
                return;
            }
            $scope.GovtColEnrollExist.ExamID = "";
            $scope.GovtColEnrollExist.BranchID = "";
            $scope.GovtColEnrollExist.MediumID = "";
            $scope.GovtColEnrollExist.MainGrpID = "";
            $scope.GovtColEnrollExist.SecondLangID = "";
            $scope.GovtColEnrollExist.BranchName = "";
            $scope.GovtColEnrollExist.CollegeID = "";

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
                        $scope.GovtColEnrollExist.ExamID = BasicExamdata[0].ExamID
                    }
                }

                var MainGroupList = GovtColEnrollService.GetMainGroupListByCourseID(CourseID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;

                    //$scope.SecondLangDisable = false;
                    //var SecondLangList = GovtColEnrollService.GetBasicSubjectListForSecondLangaugeInRegStud($scope.GovtColEnrollExist.CollegeID, CourseID);
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
                var BranchList = GovtColEnrollService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                    $scope.GovtColEnrollExist.BranchID = BasicBranchdata[0].BranchID;
                    $scope.GovtColEnrollExist.BranchName = BasicBranchdata[0].BranchName;
                    if (($scope.GovtColEnrollExist.MandalID == undefined) || ($scope.GovtColEnrollExist.MandalID == "")) {
                        $scope.AllMondal = "All";
                        $scope.GovtColEnrollExist.MandalID = "";
                    }
                    var CollegeList = GovtColEnrollService.GetCollegesForGovtEnroll($scope.GovtColEnrollExist.DistrictID, $scope.GovtColEnrollExist.MandalID, BasicBranchdata[0].BranchID, $scope.GovtColEnrollExist.MainGrpID);
                    //var CollegeList = GovtColEnrollService.GetCollegeListByDistrictAndMandalAndBranach($scope.GovtColEnrollExist.DistrictID, $scope.GovtColEnrollExist.MandalID, BasicBranchdata[0].BranchID);
                    CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                        if (CollegeListdata.length == 0) {
                            $scope.CollegeList = [];
                            alert("There is no authorised college in this mandal");
                            return;
                        } else {
                            $scope.CollegeList = CollegeListdata;
                            $scope.GovtColEnrollExist.CollegeID = "";
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
            if ($scope.GovtColEnrollExist.CourseID != undefined) {
                if (BranchID != null) {
                    //$scope.SecondLangDisable = false;
                    //var SecondLangList = GovtColEnrollService.GetBasicSubjectListForSecondLangaugeInRegStud($scope.GovtColEnrollExist.CollegeID, BranchID, $scope.GovtColEnrollExist.CourseID);
                    //SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                    //    $scope.SecondLangList = SecondLangdata;
                        //$scope.MediumDisable = false;
                        //var MediumList = GovtColEnrollService.GetBasicMediumInRegStud($scope.GovtColEnrollExist.CollegeID, BranchID);
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
            else {
                alert("Select stream first");
                $scope.GovtColEnrollExist.BranchID = "";
                $scope.GovtColEnrollExist.BranchName = "";
                $scope.GovtColEnrollExist.MainGrpID = "";
                return;
            }
        }
        $scope.SaveGovtColEnrollExist = function () {
            
            if (($scope.GovtColEnrollExist.SSCHallTicket == undefined) || ($scope.GovtColEnrollExist.SSCHallTicket == "")) {
                alert("Enter SSC Hall Ticket No.");
                return;
            }
            if ($scope.GovtEnrollCollegesData.length == 0) {
                alert("Select atleast single college");
                return;
            }
            if (($scope.GovtColEnrollExist.MobileNo == undefined) || ($scope.GovtColEnrollExist.MobileNo == "")) {
                alert("Enter Mobile Number");
                return;
            }
            if (($scope.GovtColEnrollExist.MobileNo != "") && ($scope.GovtColEnrollExist.MobileNo != undefined)) {
                if (($scope.GovtColEnrollExist.MobileNo.length < 10) || ($scope.GovtColEnrollExist.MobileNo.length > 10)) {
                    alert("Invalid Mobile No.");
                    return false;
                }
            }
            if (($scope.GovtColEnrollExist.ParentCellno != "") && ($scope.GovtColEnrollExist.ParentCellno != undefined)) {
                if (($scope.GovtColEnrollExist.ParentCellno.length < 10) || ($scope.GovtColEnrollExist.ParentCellno.length > 10)) {
                    alert("Invalid Parent Mobile No.");
                    return false;
                }
            }

            if (($scope.GovtColEnrollExist.MotherName == undefined) || ($scope.GovtColEnrollExist.MotherName == "")) {
                alert("Enter mother name");
                return;
            }
            if (($scope.GovtColEnrollExist.BirthDate == undefined) || ($scope.GovtColEnrollExist.BirthDate == "")) {
                alert("Select birth date");
                return;
            }
            //$scope.RollEditDisable = true;
            if ($scope.GovtColEnrollExist.CheckType == "E") {
                if ($("#BirthDate").val() != "") { $scope.GovtColEnrollExist.BirthDate = $("#BirthDate").val(); }
            }
            if ($scope.GovtColEnrollExist.CheckType == "S") {
                $scope.GovtColEnrollExist.BoardID = 59;
            } else if ($scope.GovtColEnrollExist.CheckType == "E") {
                if (($scope.GovtColEnrollExist.BoardID == undefined) || ($scope.GovtColEnrollExist.BoardID == "")) {
                    alert("Select Other Board");
                    $scope.RollEditDisable = true;
                    $scope.RollEditDisableShow = false;
                    $scope.ClearData();
                    return;
                }
            } else if ($scope.GovtColEnrollExist.CheckType == "O") {
                $scope.GovtColEnrollExist.BoardID = 61;
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
                    if ($scope.GovtColEnrollExist.Gender != "F") {
                        alert("Only girls will apply for this college (" + $scope.GovtEnrollCollegesData[i].CollegeCode + ")");
                        $scope.GovtColEnrollExist.CollegeID = "";
                        var gridObj = $("#GovtEnrollColleges").data("ejGrid");
                        gridObj.deleteRecord("CollegeID", { CollegeID: $scope.GovtEnrollCollegesData[i].CollegeID });
                        return;
                    }
                }
                if ($scope.GlgGender == "M") {
                    if ($scope.GovtColEnrollExist.Gender != "M") {
                        alert("Only boys will apply for this college (" + $scope.GovtEnrollCollegesData[i].CollegeCode + ")");
                        $scope.GovtColEnrollExist.CollegeID = "";
                        var gridObj = $("#GovtEnrollColleges").data("ejGrid");
                        gridObj.deleteRecord("CollegeID", { CollegeID: $scope.GovtEnrollCollegesData[i].CollegeID });
                        return;
                    }
                }
            }

            $scope.RollEditDisable = true;
            $scope.GovtColEnrollExist.BoardType = $scope.GovtColEnrollExist.CheckType;
            $scope.GovtColEnrollExist.StudEnrolCol = $scope.GovtEnrollCollegesData;
            var getPromise = GovtColEnrollService.UpdateGovtColEnrollSubject($scope.GovtColEnrollExist);
            getPromise.then(function (msg) {
                $scope.candidateinfo = true;
                alert("Updated Successfully");
                $scope.RollEditDisableShow = false;
                $scope.ClearData();
                var strPrint = confirm("Do you want to print this Form?");
                if (strPrint == true) {
                    $scope.Print();
                }
            }, function (error) {
                $scope.candidateinfo = false;
                $scope.RollEditDisable = false;
                $scope.RollEditDisableShow = false;
                alert(error);
                $scope.ClearData();
            });
        }
        $scope.Print = function () {
            var Urlstring = "api/GovtColEnroll/GetGovtColEnrollListByID/?StudEnrolID=" + $scope.GovtColEnrollExist.StudEnrolID;
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
            if (($scope.GovtColEnrollExist.CheckType == undefined) || ($scope.GovtColEnrollExist.CheckType == "")) {
                alert("Select Board Name");
                return;
            }
            if (($scope.GovtColEnrollExist.SSCHallTicket == undefined) || ($scope.GovtColEnrollExist.SSCHallTicket == "")) {
                alert("Enter SSC HallTicket");
                return;
            }
            if ($scope.GovtColEnrollExist.CheckType == "S") {
                $scope.GovtColEnrollExist.BoardID = 59;
            } else if ($scope.GovtColEnrollExist.CheckType == "E") {
                if (($scope.GovtColEnrollExist.BoardID == undefined) || ($scope.GovtColEnrollExist.BoardID == "")) {
                    alert("Select Other Board");
                    $scope.RollEditDisable = true;
                    $scope.RollEditDisableShow = false;
                    $scope.ClearData();
                    return;
                }
            } else if ($scope.GovtColEnrollExist.CheckType == "O") {
                $scope.GovtColEnrollExist.BoardID = 61;
            }
            $scope.RollEditDisableShow = true;
            var CheckType = $scope.GovtColEnrollExist.CheckType;
            var BoardID = $scope.GovtColEnrollExist.BoardID;
            var StudEnrolldata = GovtColEnrollService.GetStudentEnrollData($scope.GovtColEnrollExist.SSCHallTicket, $scope.GovtColEnrollExist.BoardID);
            StudEnrolldata.then(function (data) {
                if (data.length > 0) {
                    $scope.candidateinfo = false;
                    $scope.GovtColEnrollExist.StudName = data[0].StudName;
                    $scope.GovtColEnrollExist.FatherName = data[0].FatherName;
                    $scope.GovtColEnrollExist.MotherName = data[0].MotherName;
                    $scope.GovtColEnrollExist.BirthDate = data[0].BirthDate;
                    $scope.GovtColEnrollExist.MobileNo = data[0].MobileNo;
                    $scope.GovtColEnrollExist.ParentCellno = data[0].ParentCellno;
                    $scope.GovtColEnrollExist.Gender = data[0].Gender;
                    $scope.GovtColEnrollExist.PassingMonth = data[0].PassingMonth;
                    $scope.GovtColEnrollExist.PassingYear = data[0].PassingYear;
                    $scope.GovtColEnrollExist.Nationality = data[0].Nationality;
                    $scope.GovtColEnrollExist.StudEnrolID = data[0].StudEnrolID;
                    $scope.GovtColEnrollExist.AcdYrID = data[0].AcdYrID;
                    $scope.GovtColEnrollExist.BoardID = BoardID;
                    $scope.GovtColEnrollExist.CheckType = CheckType;
                    $("#BirthDate").ejDatePicker("disable");
                    $scope.GovtColEnrollExist.BirthDate = $filter('date')($scope.GovtColEnrollExist.BirthDate, "dd/MMM/yyyy")
                    $("#BirthDate").val($scope.GovtColEnrollExist.BirthDate);
                    $scope.RollEditDisable = false;
                    if (data[0].EnrolFlag == 'Y') {
                        $scope.RollEditDisable = true;
                    }
                    $scope.GovtEnrollCollegesData = data[0].StudEnrolCol;
                } else {
                    alert("Data not found");
                    return;
                }
            }, function (error) {
                alert(error);
                $scope.RollEditDisableShow = false;
                $scope.candidateinfo = true;
            });
        }
        $scope.ClearData = function () {
            $scope.GovtColEnrollExist.MobileNo = "";
            $scope.GovtColEnrollExist.SSCHallTicket = "";
            $scope.GovtColEnrollExist.StudName = "";
            $scope.GovtColEnrollExist.FatherName = "";
            $scope.GovtColEnrollExist.MotherName = "";
            $scope.GovtColEnrollExist.Nationality = "";
            $scope.GovtColEnrollExist.BirthDateDesc = "";
            $scope.GovtColEnrollExist.CourseName = "";
            $scope.RollEditDisableShow = false;
            $scope.candidateinfo = true;
            $scope.StreamDisable = true;
            $scope.GovtColEnrollExist.CheckType = "S";

            $scope.GovtColEnrollExist.CollegeID = "";
            $scope.GovtColEnrollExist.CourseID = "";
            $scope.GovtColEnrollExist.ExamID = "";
            $scope.GovtColEnrollExist.BranchID = "";
            $scope.GovtColEnrollExist.MediumID = "";
            $scope.GovtColEnrollExist.MainGrpID = "";
            $scope.GovtColEnrollExist.SecondLangID = "";
            $scope.GovtEnrollCollegesData = [];
            $scope.GovtColEnrollExist.BranchName = "";
        }

        $("#BirthDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#BirthDate").ejDatePicker("disable");
        $scope.OtherBoardreadonly = true;

        //Open Admission coding 
        $scope.ClearCollegeData = function () {
            $scope.GovtColEnrollExist.CollegeID = "";
            $scope.GovtColEnrollExist.CourseID = "";
            $scope.GovtColEnrollExist.ExamID = "";
            $scope.GovtColEnrollExist.BranchID = "";
            $scope.GovtColEnrollExist.MediumID = "";
            $scope.GovtColEnrollExist.MainGrpID = "";
            $scope.GovtColEnrollExist.SecondLangID = "";
            $scope.GovtColEnrollExist.BranchName = "";
            $scope.GovtColEnrollExist.MandalID = "";
            //$scope.GovtEnrollCollegesData = [];
        }
        $scope.AddToGrid = function () {
            if (($scope.GovtColEnrollExist.DistrictID == undefined) || ($scope.GovtColEnrollExist.DistrictID == "")) {
                alert("Select District");
                return;
            }
            if (($scope.GovtColEnrollExist.CollegeID == undefined) || ($scope.GovtColEnrollExist.CollegeID == "")) {
                alert("Select College");
                return;
            }
            if (($scope.GovtColEnrollExist.CourseID == undefined) || ($scope.GovtColEnrollExist.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.GovtColEnrollExist.MainGrpID == undefined) || ($scope.GovtColEnrollExist.MainGrpID == "")) {
                alert("Select Group");
                return;
            }
            //if (($scope.GovtColEnrollExist.BranchID == undefined) || ($scope.GovtColEnrollExist.BranchID == "")) {
            //    alert("Select Branch");
            //    return;
            //}
            if ($scope.GovtColEnrollExist.CourseID == 1) {
                if (($scope.GovtColEnrollExist.SecondLangID == undefined) || ($scope.GovtColEnrollExist.SecondLangID == "")) {
                    alert("Select Second Language");
                    return;
                }
            }
            if (($scope.GovtColEnrollExist.MediumID == undefined) || ($scope.GovtColEnrollExist.MediumID == "")) {
                alert("Select Medium");
                return;
            }
            if ($scope.GovtEnrollCollegesData.length == 3) {
                alert("Only 3 colleges are allowed to be selected");
                $scope.GovtColEnrollExist.CourseID = "";
                $scope.GovtColEnrollExist.ExamID = "";
                $scope.GovtColEnrollExist.BranchID = "";
                $scope.GovtColEnrollExist.MediumID = "";
                $scope.GovtColEnrollExist.MainGrpID = "";
                $scope.GovtColEnrollExist.SecondLangID = "";
                $scope.GovtColEnrollExist.BranchName = "";
                return;
            }
            for (var i = 0; i < $scope.GovtEnrollCollegesData.length; i++) {
                if ($scope.GovtEnrollCollegesData[i].CollegeID == $scope.GovtColEnrollExist.CollegeID) {
                    alert("College already selected, Please select another college");
                    $scope.GovtColEnrollExist.CollegeID = undefined;
                    $scope.GovtColEnrollExist.CollegeID = "";
                    $scope.GovtColEnrollExist.CourseID = "";
                    $scope.GovtColEnrollExist.ExamID = "";
                    $scope.GovtColEnrollExist.BranchID = "";
                    $scope.GovtColEnrollExist.MediumID = "";
                    $scope.GovtColEnrollExist.MainGrpID = "";
                    $scope.GovtColEnrollExist.SecondLangID = "";
                    $scope.GovtColEnrollExist.BranchName = "";
                    return;
                }
            }
            var obj = {};
            //var CollegeData = [];
            //var CollegeData1 = [];

            var ColName = "";
            var CollegeCode = "";
            for (var i = 0; i < $scope.CollegeList.length; i++) {
                if ($scope.CollegeList[i].CollegeID == $scope.GovtColEnrollExist.CollegeID) {
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
                if ($scope.CourseList[i].CourseID == $scope.GovtColEnrollExist.CourseID) {
                    CourseName = $scope.CourseList[i].CourseName;
                }
            }
            var ExmName = "";
            for (var i = 0; i < $scope.ExamList.length; i++) {
                if ($scope.ExamList[i].ExamID == $scope.GovtColEnrollExist.ExamID) {
                    ExmName = $scope.ExamList[i].ExmName;
                }
            }
            var BranchName = "";
            for (var i = 0; i < $scope.BranchList.length; i++) {
                if ($scope.BranchList[i].BranchID == $scope.GovtColEnrollExist.BranchID) {
                    BranchName = $scope.BranchList[i].BranchName;
                }
            }
            var MediumName = "";
            for (var i = 0; i < $scope.MediumList.length; i++) {
                if ($scope.MediumList[i].MediumID == $scope.GovtColEnrollExist.MediumID) {
                    MediumName = $scope.MediumList[i].MediumName;
                }
            }
            var MainGrpName = "";
            for (var i = 0; i < $scope.MainGroupList.length; i++) {
                if ($scope.MainGroupList[i].MainGrpID == $scope.GovtColEnrollExist.MainGrpID) {
                    MainGrpName = $scope.MainGroupList[i].MainGrpName;
                }
            }

            obj.ColName = ColName;
            obj.CollegeCode = CollegeCode;
            obj.ClgGender = clg_type;
            obj.CourseID = $scope.GovtColEnrollExist.CourseID;
            obj.CourseName = CourseName;
            obj.ExamID = $scope.GovtColEnrollExist.ExamID;
            obj.ExmName = ExmName;
            obj.BranchID = $scope.GovtColEnrollExist.BranchID;
            obj.BranchName = BranchName;
            obj.MediumID = $scope.GovtColEnrollExist.MediumID;
            obj.MediumName = MediumName;
            obj.MainGrpID = $scope.GovtColEnrollExist.MainGrpID;
            obj.MainGrpName = MainGrpName;
            if (($scope.GovtColEnrollExist.SecondLangID == undefined) || ($scope.GovtColEnrollExist.SecondLangID == "")) {
                $scope.GovtColEnrollExist.SecondLangID = 0;
            } else {
                var SubName = "";
                for (var i = 0; i < $scope.SecondLangList.length; i++) {
                    if ($scope.SecondLangList[i].SecondLangID == $scope.GovtColEnrollExist.SecondLangID) {
                        SubName = $scope.SecondLangList[i].SubName;
                    }
                }
                obj.SecondLangID = $scope.GovtColEnrollExist.SecondLangID;
                obj.SubName = SubName;
            }

            //CollegeData = $filter('filter')($scope.CollegeList, { CollegeID: $scope.GovtColEnrollExist.CollegeID });
            //obj.ColName = CollegeData[0].ColName;
            //obj.CollegeCode = CollegeData[0].CollegeCode;
            //CollegeData1 = $filter('filter')($scope.CollegeDataFromAPI, { college_code: CollegeData[0].CollegeCode });
            //obj.ClgGender = CollegeData1[0].clg_type;
            //obj.principal_mobile_no = CollegeData1[0].principal_mobile_no;
            //obj.CourseID = $scope.GovtColEnrollExist.CourseID;
            //obj.CourseName = $filter('filter')($scope.CourseList, { CourseID: $scope.GovtColEnrollExist.CourseID })[0].CourseName;
            //obj.ExamID = $scope.GovtColEnrollExist.ExamID;
            //obj.ExmName = $filter('filter')($scope.ExamList, { ExamID: $scope.GovtColEnrollExist.ExamID })[0].ExmName;
            //obj.BranchID = $scope.GovtColEnrollExist.BranchID;
            //obj.BranchName = $filter('filter')($scope.BranchList, { BranchID: $scope.GovtColEnrollExist.BranchID })[0].BranchName;
            //obj.MediumID = $scope.GovtColEnrollExist.MediumID;
            //obj.MediumName = $filter('filter')($scope.MediumList, { MediumID: $scope.GovtColEnrollExist.MediumID })[0].MediumName;
            //obj.MainGrpID = $scope.GovtColEnrollExist.MainGrpID;
            //obj.MainGrpName = $filter('filter')($scope.MainGroupList, { MainGrpID: $scope.GovtColEnrollExist.MainGrpID })[0].MainGrpName;
            //if (($scope.GovtColEnrollExist.SecondLangID == undefined) || ($scope.GovtColEnrollExist.SecondLangID == "")) {
            //} else {
            //    obj.SecondLangID = $scope.GovtColEnrollExist.SecondLangID;
            //    obj.SubName = $filter('filter')($scope.SecondLangList, { SecondLangID: $scope.GovtColEnrollExist.SecondLangID })[0].SubName;
            //}
            obj.CollegeID = $scope.GovtColEnrollExist.CollegeID;
            $scope.GovtEnrollCollegesData.push(obj);
            $scope.GovtColEnrollExist.CollegeID = "";
            $scope.GovtColEnrollExist.CourseID = "";
            $scope.GovtColEnrollExist.ExamID = "";
            $scope.GovtColEnrollExist.BranchID = "";
            $scope.GovtColEnrollExist.MediumID = "";
            $scope.GovtColEnrollExist.MainGrpID = "";
            $scope.GovtColEnrollExist.SecondLangID = "";
            $scope.GovtColEnrollExist.BranchName = "";
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
            { field: "MainGrpName", headerText: "Main Group", textAlign: ej.TextAlign.Left, width: 80, allowEditing: false },
            { field: "SecondLangID", headerText: "Second Lang", textAlign: ej.TextAlign.Left, width: 0, visible: false, allowEditing: false },
            { field: "SubName", headerText: "Second Lang", textAlign: ej.TextAlign.Left, width: 80, allowEditing: false },
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
                    if ($scope.RollEditDisable == false) {
                        var getPromise = GovtColEnrollService.DeleteBoysOrGirlsInEmptyRecord(args.model.selectedRecords[0].CollegeID, $scope.GovtColEnrollExist.StudEnrolID);
                        getPromise.then(function (msg) {
                        }, function (error) {
                            alert(error);
                        });
                        return;
                    } else {
                        alert("You can't delete this record because already enrolled to this college.");
                        args.cancel = true;
                        return;
                    }
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
            //            $scope.GovtColEnrollExist.SecondLangID = "";
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
    });
});
