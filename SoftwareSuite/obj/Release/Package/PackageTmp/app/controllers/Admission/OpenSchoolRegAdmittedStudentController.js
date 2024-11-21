define(['app'], function (app) {
    app.controller("OpenSchoolRegAdmittedStudentController", function ($scope, $state, $filter, $stateParams, AppSettings, RegisterAdmittedStudentService, $localStorage) {

        var authData = $localStorage.authorizationData;
        AppSettings.MngtTypID = authData.MngtTypID;

        var AdmNoList = RegisterAdmittedStudentService.ChecAdmissionNo(AppSettings.CollegeID);
        AdmNoList.then(function (response, error) {
            //$scope.AdmNo = response[0].PrevAdmNo;
            if (response[0].PrevAdmNo == 0) {
                alert("Please enter previous Admission Number.");
                $state.go('Admission.PreYearAdmissionEntry');
            }
        }, function (error) {
            alert(error);
        });


        $scope.OpenSchoolRegAdmittedStudent = {};
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
        $scope.candidateinfo = true;
        //$scope.OpenSchoolRegAdmittedStudent.CheckType = "S";
        $scope.OpenSchoolRegAdmittedStudent.YrName = "2018";
        $scope.OpenSchoolRegAdmittedStudent.PassingMonth = "Mar";
        //$scope.OpenSchoolRegAdmittedStudent.CheckSSC = true;
        //$scope.OpenSchoolRegAdmittedStudent.CheckEligibility = false;
        $scope.OpenSchoolRegAdmittedStudent.CollegeID = AppSettings.CollegeID;

        //var AdmNoList = RegisterAdmittedStudentService.GetMaxAdmNo();
        //AdmNoList.then(function (AdmNodata, status, headers, config, error) {
        //    $scope.OpenSchoolRegAdmittedStudent.AdmNo = AdmNodata;
        //}, function (error) {
        //    alert(error);
        //});
        //$scope.RollEditDisableShow = false;

        $scope.RollEditDisable = true;
        $scope.OpenSchoolRegAdmittedStudent.BoardName = "OPEN SCHOOL BOARD";
        //var BoardList = RegisterAdmittedStudentService.GetBasicBoardNameForOpenSchool(61); //remain change
        //BoardList.then(function (BasicBoarddata, status, headers, config, error) {
        //    $scope.BoardList = BasicBoarddata;
        //}, function (error) {
        //    alert(error);
        //});
        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
            $scope.CourseList = BasicCoursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = RegisterAdmittedStudentService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                // $scope.ExamList = BasicExamdata;
                for (var i = 0; i < BasicExamdata.length; i++) {
                    if (BasicExamdata[i].SequenceNo == 1) {
                        $scope.OpenSchoolRegAdmittedStudent.ExamID = BasicExamdata[0].ExamID;
                    }
                }
                var MainGroupList = RegisterAdmittedStudentService.GetMainGroupListByCollegeId(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                    //var SecondLangList = RegisterAdmittedStudentService.GetBasicSubjectListForSecondLangaugeInRegStud(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID);
                    var SecondLangList = RegisterAdmittedStudentService.GetBasicSubjectListForSecondLangaugeInRegStud1(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID, 0);
                    SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                        $scope.SecondLangList = SecondLangdata;
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
                //var BranchList = RegisterAdmittedStudentService.GetBasicBranchListForRegStud(CourseID,AppSettings.CollegeID);
                //BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                //    $scope.BranchList = BasicBranchdata;
                //}, function (error) {
                //    alert(error);
                //});
            }, function (error) {
                alert(error);
            });
        }
        //var MainGroupList = RegisterAdmittedStudentService.GetMainGroupListByCollegeId(AppSettings.CollegeID);
        //MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
        //    $scope.MainGroupList = MainGroupListdata;
        //}, function (error) {
        //    alert(error);
        //});
        $scope.FillBranchByGroup = function (MainGrpID) {
            if (MainGrpID != null) {

                if (AppSettings.MngtTypID != 21) {

                    for (var i = 0; i < $scope.MainGroupList.length; i++) {

                        if ($scope.MainGroupList[i].MainGrpID == MainGrpID) {
                            if ($scope.MainGroupList[i].SecAadharVerify != 1) {
                                alert("Aadhaar verification is pending for the group : " + $scope.MainGroupList[i].MainGrpName + "");
                                $scope.OpenSchoolRegAdmittedStudent.MainGrpID = "";
                                return;
                            }
                        }
                    }
                }


                var BranchList = RegisterAdmittedStudentService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                    $scope.OpenSchoolRegAdmittedStudent.BranchID = BasicBranchdata[0].BranchID;
                    $scope.OpenSchoolRegAdmittedStudent.BranchName = BasicBranchdata[0].BranchName;
                    $scope.FillSecondLaunguge(BasicBranchdata[0].BranchID);
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.FillSecondLaunguge = function (BranchID) {
            if (BranchID != null) {
                //var SecondLangList = RegisterAdmittedStudentService.GetBasicSubjectListForSecondLangaugeInRegStud(AppSettings.CollegeID, BranchID, $scope.OpenSchoolRegAdmittedStudent.CourseID,AppSettings.AcdYrID);
                //SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                //    $scope.SecondLangList = SecondLangdata;
                var MediumList = RegisterAdmittedStudentService.GetBasicMediumInRegStud(AppSettings.CollegeID, BranchID, AppSettings.AcdYrID);
                MediumList.then(function (SecondLangdata, status, headers, config, error) {
                    $scope.MediumList = SecondLangdata;
                    //var MainGroupList = RegisterAdmittedStudentService.GetMainGroupListForRegStud(AppSettings.CollegeID, BranchID);
                    //MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    //    $scope.MainGroupList = MainGroupListdata;
                    //}, function (error) {
                    //    alert(error);
                    //});
                }, function (error) {
                    alert(error);
                });
                //}, function (error) {
                //    alert(error);
                //});
            }
        }
        $scope.SaveOpenSchoolRegAdmittedStudent = function () {
            if (($scope.OpenSchoolRegAdmittedStudent.SSCHallTicket == undefined) || ($scope.OpenSchoolRegAdmittedStudent.SSCHallTicket == "")) {
                alert("Enter SSC HallTicket");
                return;
            }
            if (($scope.OpenSchoolRegAdmittedStudent.YrName == undefined) || ($scope.OpenSchoolRegAdmittedStudent.YrName == "")) {
                alert("Select Passing Year");
                return;
            }
            if (($scope.OpenSchoolRegAdmittedStudent.PassingMonth == undefined) || ($scope.OpenSchoolRegAdmittedStudent.PassingMonth == "")) {
                alert("Select Passing Month");
                return;
            }
            if (($scope.OpenSchoolRegAdmittedStudent.MotherName == undefined) || ($scope.OpenSchoolRegAdmittedStudent.MotherName == "")) {
                alert("Enter Mother Name");
                return;
            }
            if (($scope.OpenSchoolRegAdmittedStudent.Gender == undefined) || ($scope.OpenSchoolRegAdmittedStudent.Gender == "")) {
                alert("Select Gender");
                return;
            }
            if ($("#BirthDate").val() == "") {
                alert("Select birth date");
                return;
            }
            if (($scope.OpenSchoolRegAdmittedStudent.AadharNo != "") && ($scope.OpenSchoolRegAdmittedStudent.AadharNo != undefined)) {
                if (($scope.OpenSchoolRegAdmittedStudent.AadharNo.length < 12) || ($scope.OpenSchoolRegAdmittedStudent.AadharNo.length > 12)) {
                    alert("Invalid Aadhaar No.");
                    return false;
                }
            }
            if (($scope.OpenSchoolRegAdmittedStudent.MobileNo == undefined) || ($scope.OpenSchoolRegAdmittedStudent.MobileNo == "")) {
                alert("Enter Mobile No.");
                return;
            }
            if (($scope.OpenSchoolRegAdmittedStudent.MobileNo != "") && ($scope.OpenSchoolRegAdmittedStudent.MobileNo != undefined)) {
                if (($scope.OpenSchoolRegAdmittedStudent.MobileNo.length < 10) || ($scope.OpenSchoolRegAdmittedStudent.MobileNo.length > 10)) {
                    alert("Invalid Mobile No.");
                    return false;
                }
            }
            if (($scope.OpenSchoolRegAdmittedStudent.CourseID == undefined) || ($scope.OpenSchoolRegAdmittedStudent.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.OpenSchoolRegAdmittedStudent.MainGrpID == undefined) || ($scope.OpenSchoolRegAdmittedStudent.MainGrpID == "")) {
                alert("Select Group");
                return;
            }
            if ($scope.OpenSchoolRegAdmittedStudent.CourseID == 1) {
                if (($scope.OpenSchoolRegAdmittedStudent.SecondLangID == undefined) || ($scope.OpenSchoolRegAdmittedStudent.SecondLangID == "")) {
                    alert("Select Second Language");
                    return;
                }
            }
            if (($scope.OpenSchoolRegAdmittedStudent.MediumID == undefined) || ($scope.OpenSchoolRegAdmittedStudent.MediumID == "")) {
                alert("Select Medium ");
                return;
            }
            $scope.RollEditDisable = true;
            if ($("#BirthDate").val() != "") {
                $scope.OpenSchoolRegAdmittedStudent.BirthDate = $("#BirthDate").val();
            }
            $scope.OpenSchoolRegAdmittedStudent.BoardID = 61;
            if (($scope.OpenSchoolRegAdmittedStudent.Gender == "") || ($scope.OpenSchoolRegAdmittedStudent.Gender == undefined)) {   //new change 25062018
                alert("Select Gender");
                $scope.RollEditDisable = false;
                return;
            }
            if (AppSettings.Clg_Type == "F") {
                if ($scope.OpenSchoolRegAdmittedStudent.Gender != "F") {
                    alert("Only girls will apply for this college");
                    $scope.RollEditDisable = false;
                    return;
                }
            }
            if (AppSettings.Clg_Type == "M") {
                if ($scope.OpenSchoolRegAdmittedStudent.Gender != "M") {
                    alert("Only boys will apply for this college");
                    $scope.RollEditDisable = false;
                    return;
                }
            }


            var getPromise = RegisterAdmittedStudentService.CheckMobileNoCount($scope.OpenSchoolRegAdmittedStudent.MobileNo, AppSettings.CollegeID, AppSettings.AcdYrID);
            getPromise.then(function (data) {
                if (data == 2) {
                    alert("Entered Mobile No. already used two times. Please enter another Mobile No.");
                    //$scope.RollEditDisable = true;
                    //$scope.RollEditDisableShow = false;
                    $scope.OpenSchoolRegAdmittedStudent.MobileNo = "";
                    $scope.RollEditDisable = false;
                    //$scope.ClearData();
                    return;
                } else {
                    var getPromise = RegisterAdmittedStudentService.GetMainGroupAndCollegewiseIntake(AppSettings.CollegeID, $scope.OpenSchoolRegAdmittedStudent.BranchID, AppSettings.AcdYrID, $scope.OpenSchoolRegAdmittedStudent.MainGrpID, $scope.OpenSchoolRegAdmittedStudent.MediumID, $scope.OpenSchoolRegAdmittedStudent.CourseID);
                    //var getPromise = OpenSchoolRegAdmittedStudentService.CheckAddBranchCount(AppSettings.CollegeID, AppSettings.AcdYrID, $scope.OpenSchoolRegAdmittedStudent.BranchID);
                    getPromise.then(function (data) {
                        if (data == 0) {
                            alert("College Group wise intake is full");
                            $scope.RollEditDisable = true;
                            //$scope.RollEditDisableShow = false;
                            $scope.ClearData();
                            return;
                        } else {
                            //var getPromise = OpenSchoolRegAdmittedStudentService.CheckHallTicketNoPresent($scope.OpenSchoolRegAdmittedStudent.YrName, $scope.OpenSchoolRegAdmittedStudent.SSCHallTicket, $scope.OpenSchoolRegAdmittedStudent.BoardID);
                            //var getPromise = OpenSchoolRegAdmittedStudentService.CheckHallTicketNoPresentInCollege($scope.OpenSchoolRegAdmittedStudent.YrName, $scope.OpenSchoolRegAdmittedStudent.SSCHallTicket, $scope.OpenSchoolRegAdmittedStudent.BoardID);
                            var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresentOpenAdmission($scope.OpenSchoolRegAdmittedStudent.YrName, $scope.OpenSchoolRegAdmittedStudent.SSCHallTicket, $scope.OpenSchoolRegAdmittedStudent.BoardID, 0);
                            getPromise.then(function (data) {
                                if (data != 0) {
                                    alert("Student already applied through online");
                                    //alert("Hall Ticket No already exist");
                                    $scope.OpenSchoolRegAdmittedStudent.SSCHallTicket = "";
                                    $scope.RollEditDisable = true;
                                    //$scope.RollEditDisableShow = false;
                                    //$scope.ClearData();
                                    return false;
                                } else {
                                    // var getPromise = OpenSchoolRegAdmittedStudentService.CheckHallTicketNoPresentOpenAdmission($scope.OpenSchoolRegAdmittedStudent.YrName, $scope.OpenSchoolRegAdmittedStudent.SSCHallTicket, $scope.OpenSchoolRegAdmittedStudent.BoardID, AppSettings.CollegeID);
                                    var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresentInCollege($scope.OpenSchoolRegAdmittedStudent.YrName, $scope.OpenSchoolRegAdmittedStudent.SSCHallTicket, $scope.OpenSchoolRegAdmittedStudent.BoardID);
                                    getPromise.then(function (data) {
                                        if (data != 0) {
                                            //alert("Student already applied through online");
                                            alert("Hall Ticket No already exist");
                                            $scope.OpenSchoolRegAdmittedStudent.SSCHallTicket = "";
                                            $scope.RollEditDisable = true;
                                            //$scope.RollEditDisableShow = false;
                                            //$scope.ClearData();
                                        } else {
                                            if (($scope.OpenSchoolRegAdmittedStudent.BranchID == undefined) || ($scope.OpenSchoolRegAdmittedStudent.BranchID == "")) {
                                                $scope.OpenSchoolRegAdmittedStudent.BranchID = 0;
                                            }
                                            $scope.OpenSchoolRegAdmittedStudent.CreLoginID = AppSettings.LoggedUserId;
                                            $scope.OpenSchoolRegAdmittedStudent.UpdLoginID = AppSettings.LoggedUserId;
                                            $scope.OpenSchoolRegAdmittedStudent.AcdYrID = AppSettings.AcdYrID;
                                            $scope.OpenSchoolRegAdmittedStudent.CollegeID = AppSettings.CollegeID;
                                            $scope.OpenSchoolRegAdmittedStudent.checkShedule = true;
                                            if ($scope.OpenSchoolRegAdmittedStudent.PassingMonth == 'Mar') {
                                                $scope.OpenSchoolRegAdmittedStudent.Stream = "R";
                                            } else if ($scope.OpenSchoolRegAdmittedStudent.PassingMonth == 'Jun') {
                                                $scope.OpenSchoolRegAdmittedStudent.Stream = "A";
                                            }
                                            var getPromise = RegisterAdmittedStudentService.PutSSCStudentDetails($scope.OpenSchoolRegAdmittedStudent);
                                            getPromise.then(function (msg) {
                                                $scope.candidateinfo = true;
                                                var SecondLangName = "";

                                                for (var i = 0; i < $scope.SecondLangList.length; i++) {
                                                    if ($scope.SecondLangList[i].SecondLangID == $scope.OpenSchoolRegAdmittedStudent.SecondLangID) {
                                                        SecondLangName = $scope.SecondLangList[i].SubName;
                                                    }
                                                }
                                                if (SecondLangName == "") {
                                                    SecondLangName = "-";
                                                }
                                                //SecondLangName = $filter('filter')($scope.SecondLangList, { SecondLangID: $scope.OpenSchoolRegAdmittedStudent.SecondLangID })[0].SubName;
                                                alert("Enrolled Successfully\nCollege = " + AppSettings.userName + ", Enrolled Number = " + msg[0].Message + ",\nLanguage = " + SecondLangName + "");
                                                //$scope.RollEditDisableShow = false;
                                                $scope.ClearData();
                                            }, function (error) {
                                                $scope.candidateinfo = false;
                                                $scope.RollEditDisable = false;
                                                //$scope.RollEditDisableShow = false;
                                                alert(error);
                                                $scope.ClearData();
                                            });
                                        }
                                    }, function (error) {
                                        $scope.RollEditDisable = true;
                                        //$scope.RollEditDisableShow = false;
                                        alert(error);
                                        $scope.ClearData();
                                    });
                                }
                            }, function (error) {
                                $scope.RollEditDisable = true;
                                //$scope.RollEditDisableShow = false;
                                alert(error);
                                $scope.ClearData();
                            });
                        }
                    }, function (error) {
                        $scope.RollEditDisable = true;
                        //$scope.RollEditDisableShow = false;
                        alert(error);
                        $scope.ClearData();
                    });
                }
            }, function (error) {
                $scope.RollEditDisable = true;
                $scope.RollEditDisableShow = false;
                alert(error);
                $scope.ClearData();
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission');
        }
        $scope.ShowStudentInfo = function () {
            if (($scope.OpenSchoolRegAdmittedStudent.SSCHallTicket == undefined) || ($scope.OpenSchoolRegAdmittedStudent.SSCHallTicket == "")) {
                alert("Enter SSC HallTicket");
                return;
            }
            var Stream = "";
            if ($scope.OpenSchoolRegAdmittedStudent.PassingMonth == 'Mar') {
                Stream = "R";
            } else if ($scope.OpenSchoolRegAdmittedStudent.PassingMonth == 'Jun') {
                Stream = "A";
            }
            //$scope.RollEditDisableShow = true;
            $scope.OpenSchoolRegAdmittedStudent.CheckType = "O";
            var CheckType = $scope.OpenSchoolRegAdmittedStudent.CheckType;
            var YrName = "";
            var PassingMonth = "";
            var BoardName = $scope.OpenSchoolRegAdmittedStudent.BoardName;
            $scope.OpenSchoolRegAdmittedStudent.BoardID = 61;
            var BoardID = $scope.OpenSchoolRegAdmittedStudent.BoardID;
            // $scope.OpenSchoolRegAdmittedStudent.CourseID = $scope.CourseList[0].CourseID;
            //$scope.OpenSchoolRegAdmittedStudent.CheckType = 'S';
            var LateStudentdata = RegisterAdmittedStudentService.GetRegisterStudentData($scope.OpenSchoolRegAdmittedStudent.YrName, $scope.OpenSchoolRegAdmittedStudent.SSCHallTicket, $scope.OpenSchoolRegAdmittedStudent.CheckType, $scope.OpenSchoolRegAdmittedStudent.BoardID, Stream);
            LateStudentdata.then(function (data) {
                if (data.length > 0) {
                    $scope.candidateinfo = false;
                    $scope.OpenSchoolRegAdmittedStudent = data[0];
                    $scope.OpenSchoolRegAdmittedStudent.BoardID = BoardID;
                    $scope.OpenSchoolRegAdmittedStudent.CheckType = CheckType;
                    $scope.OpenSchoolRegAdmittedStudent.YrName = YrName;
                    $scope.OpenSchoolRegAdmittedStudent.PassingMonth = PassingMonth;
                    $scope.OpenSchoolRegAdmittedStudent.BoardName = BoardName;
                    //if ($scope.OpenSchoolRegAdmittedStudent.Gender == "") { 
                    //    alert("Gender is unknown for this SSC HallTicket No.");
                    //    $scope.RollEditDisableShow = false;
                    //    $scope.candidateinfo = true;
                    //    $scope.RollEditDisable = true;
                    //    $scope.ClearData();
                    //    return;
                    //}
                    if ($scope.OpenSchoolRegAdmittedStudent.Gender != "") {
                        if (AppSettings.Clg_Type == "F") {
                            if ($scope.OpenSchoolRegAdmittedStudent.Gender != "F") {
                                alert("Only girls will apply for this college");
                                $scope.RollEditDisableShow = false;
                                $scope.candidateinfo = true;
                                $scope.RollEditDisable = true;
                                $scope.ClearData();
                                return;
                            }
                        }
                        if (AppSettings.Clg_Type == "M") {
                            if ($scope.OpenSchoolRegAdmittedStudent.Gender != "M") {
                                alert("Only boys will apply for this college");
                                $scope.RollEditDisableShow = false;
                                $scope.candidateinfo = true;
                                $scope.RollEditDisable = true;
                                $scope.ClearData();
                                return;
                            }
                        }
                    }
                    $scope.OtherBoardreadonly = false;
                    //$scope.OpenSchoolRegAdmittedStudent.BirthDate = $filter('date')($scope.OpenSchoolRegAdmittedStudent.BirthDate, "dd/MMM/yyyy")
                    //$("#BirthDate").val($scope.OpenSchoolRegAdmittedStudent.BirthDate);
                    var CourseNew = [];
                    if ($scope.CourseList.length == 1) {
                        $scope.OpenSchoolRegAdmittedStudent.CourseName = $scope.CourseList[0].CourseName;
                        $scope.OpenSchoolRegAdmittedStudent.CourseID = $scope.CourseList[0].CourseID;
                        $scope.StreamDisable = false;
                        $scope.FillCoursePart($scope.CourseList[0].CourseID);
                    }
                    $scope.RollEditDisable = false;
                } else {
                    alert("Data not found for this hall ticket.");
                    $scope.RollEditDisableShow = false;
                    $scope.candidateinfo = true;
                }
            }, function (error) {
                if (error == '[{"Id":"No Data","Message":"No Data Found"}]') {
                    alert("Data not found for this hall ticket.");
                }
                else {
                    alert(error);
                }
                $scope.RollEditDisableShow = false;
                $scope.candidateinfo = true;
            });
        }
        $scope.ClearData = function () {
            $scope.OpenSchoolRegAdmittedStudent.MobileNo = "";
            $scope.OpenSchoolRegAdmittedStudent.AadharNo = "";
            $scope.OpenSchoolRegAdmittedStudent.CourseID = "";

            $scope.OpenSchoolRegAdmittedStudent.BranchID = "";
            $scope.OpenSchoolRegAdmittedStudent.ExamID = "";
            $scope.OpenSchoolRegAdmittedStudent.MediumID = "";
            $scope.OpenSchoolRegAdmittedStudent.SecondLangID = "";
            $scope.OpenSchoolRegAdmittedStudent.MainGrpID = "";

            $scope.OpenSchoolRegAdmittedStudent.SSCHallTicket = "";
            $scope.OpenSchoolRegAdmittedStudent.StudName = "";
            $scope.OpenSchoolRegAdmittedStudent.FatherName = "";

            $scope.OpenSchoolRegAdmittedStudent.MotherName = "";
            $scope.OpenSchoolRegAdmittedStudent.Nationality = "";
            $scope.OpenSchoolRegAdmittedStudent.BirthDateDesc = "";
            $scope.OpenSchoolRegAdmittedStudent.CourseName = "";
            $scope.RollEditDisableShow = false;
            $scope.candidateinfo = true;
            $scope.StreamDisable = true;
            $scope.OpenSchoolRegAdmittedStudent.CheckType = "S";

            $scope.OpenSchoolRegAdmittedStudent.CheckType = "S";
            $scope.OpenSchoolRegAdmittedStudent.YrName = "2018";
            $scope.OpenSchoolRegAdmittedStudent.PassingMonth = "Mar";
        }
        $("#BirthDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });
        $scope.StreamDisable = true;
        $scope.ChangeSecondLanguage = function (SecondLangID) {
            console.log(AppSettings.MngtTypID);
            if (AppSettings.MngtTypID == 21) {
                return;
            }
            if ($scope.OpenSchoolRegAdmittedStudent.CourseID == 2) {
                return;
            }
            for (var i = 0; i < $scope.SecondLangList.length; i++) {
                if ($scope.SecondLangList[i].SecondLangID == SecondLangID) {
                    if (!$scope.SecondLangList[i].SubAadharVerify > 0) {
                        alert("Aadhaar verification is pending for the second language : " + $scope.SecondLangList[i].SubName + "");
                        $scope.OpenSchoolRegAdmittedStudent.SecondLangID = "";
                        return;
                    }
                }
            }
        }
    });
});
