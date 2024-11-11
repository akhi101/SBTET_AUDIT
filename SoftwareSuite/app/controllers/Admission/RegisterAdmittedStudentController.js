define(['app'], function (app) {
    app.controller("RegisterAdmittedStudentController", function ($scope, $state, $filter, $stateParams, AppSettings, RegisterAdmittedStudentService, $localStorage) {

        var authData = $localStorage.authorizationData;
        AppSettings.MngtTypID = authData.MngtTypID; 
        var checkShceduleList = RegisterAdmittedStudentService.GetAdmissionScheduleOpenOrNot(AppSettings.AcdYrID,AppSettings.CollegeID);
        checkShceduleList.then(function (data, status, headers, config, error) {
            if (data == 0) {
                alert("Academic Schedule is not open for this college.");
                $state.go('Admission');
            }
        }, function (error) {
            alert(error);
        });
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


        $scope.RegisterAdmittedStudent = {};
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
        $scope.RegisterAdmittedStudent.CheckType = "S";
        $scope.RegisterAdmittedStudent.YrName = "2018";
        $scope.RegisterAdmittedStudent.PassingMonth = "Mar";
        //$scope.RegisterAdmittedStudent.CheckSSC = true;
        //$scope.RegisterAdmittedStudent.CheckEligibility = false;
        $scope.RegisterAdmittedStudent.CollegeID = AppSettings.CollegeID;

        //var AdmNoList = RegisterAdmittedStudentService.GetMaxAdmNo();
        //AdmNoList.then(function (AdmNodata, status, headers, config, error) {
        //    $scope.RegisterAdmittedStudent.AdmNo = AdmNodata;
        //}, function (error) {
        //    alert(error);
        //});
        //$scope.RollEditDisableShow = false;

        $scope.RollEditDisable = true;
        var BoardList = RegisterAdmittedStudentService.GetBasicBoardListOtherthanTelengana(59);
        BoardList.then(function (BasicBoarddata, status, headers, config, error) {
            $scope.BoardList = BasicBoarddata;
        }, function (error) {
            alert(error);
        });
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
                for (var i = 0; i < BasicExamdata.length; i++)
                {
                    if (BasicExamdata[i].SequenceNo == 1) {
                        $scope.RegisterAdmittedStudent.ExamID = BasicExamdata[0].ExamID;
                    }
                }
                var MainGroupList = RegisterAdmittedStudentService.GetMainGroupListByCollegeId(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                    //var SecondLangList = RegisterAdmittedStudentService.GetBasicSubjectListForSecondLangaugeInRegStud(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID);
                    var SecondLangList = RegisterAdmittedStudentService.GetBasicSubjectListForSecondLangaugeInRegStud1(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID,0);
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

                    //for (var i = 0; i < $scope.MainGroupList.length; i++) {

                    //    if ($scope.MainGroupList[i].MainGrpID == MainGrpID) {
                    //        if ($scope.MainGroupList[i].SecAadharVerify != 1) {
                    //            alert("Aadhaar verification is pending for the group : " + $scope.MainGroupList[i].MainGrpName + "");
                    //            $scope.RegisterAdmittedStudent.MainGrpID = "";
                    //            return;
                    //        }
                    //    }
                    //}
                }

                
                var BranchList = RegisterAdmittedStudentService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                    $scope.RegisterAdmittedStudent.BranchID = BasicBranchdata[0].BranchID;
                    $scope.RegisterAdmittedStudent.BranchName = BasicBranchdata[0].BranchName;
                    $scope.FillSecondLaunguge(BasicBranchdata[0].BranchID);
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.FillSecondLaunguge = function (BranchID) {
            if (BranchID != null) {
                //var SecondLangList = RegisterAdmittedStudentService.GetBasicSubjectListForSecondLangaugeInRegStud(AppSettings.CollegeID, BranchID, $scope.RegisterAdmittedStudent.CourseID,AppSettings.AcdYrID);
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
        $scope.SaveRegisterAdmittedStudent = function () {
            if (($scope.RegisterAdmittedStudent.SSCHallTicket == undefined) || ($scope.RegisterAdmittedStudent.SSCHallTicket == "")) {
                alert("Enter SSC HallTicket");
                return;
            }
            if (($scope.RegisterAdmittedStudent.MotherName == undefined) || ($scope.RegisterAdmittedStudent.MotherName == "")) {
                alert("Enter mother name");
                return;
            }
            if (($scope.RegisterAdmittedStudent.BirthDate == undefined) || ($scope.RegisterAdmittedStudent.BirthDate == "")) {
                alert("Select birth date");
                return;
            }
            if (($scope.RegisterAdmittedStudent.MobileNo == undefined) || ($scope.RegisterAdmittedStudent.MobileNo == "")) {
                alert("Enter Mobile No.");
                return;
            }
            if (($scope.RegisterAdmittedStudent.AadharNo != "") && ($scope.RegisterAdmittedStudent.AadharNo != undefined)) {
                if (($scope.RegisterAdmittedStudent.AadharNo.length < 12) || ($scope.RegisterAdmittedStudent.AadharNo.length > 12)) {
                    alert("Invalid Aadhaar No.");
                    return false;
                }
            }
            if (($scope.RegisterAdmittedStudent.MobileNo != "") && ($scope.RegisterAdmittedStudent.MobileNo != undefined)) {
                if (($scope.RegisterAdmittedStudent.MobileNo.length < 10) || ($scope.RegisterAdmittedStudent.MobileNo.length > 10)) {
                    alert("Invalid Mobile No.");
                    return false;
                }
            }
            if (($scope.RegisterAdmittedStudent.CourseID == undefined) || ($scope.RegisterAdmittedStudent.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.RegisterAdmittedStudent.MainGrpID == undefined) || ($scope.RegisterAdmittedStudent.MainGrpID == "")) {
                alert("Select Group");
                return;
            }
            if ($scope.RegisterAdmittedStudent.CourseID == 1) {
                if (($scope.RegisterAdmittedStudent.SecondLangID == undefined) || ($scope.RegisterAdmittedStudent.SecondLangID == "")) {
                    alert("Select Second Language");
                    return;
                }
            }
            if (($scope.RegisterAdmittedStudent.MediumID == undefined) || ($scope.RegisterAdmittedStudent.MediumID == "")) {
                alert("Select Medium ");
                return;
            }
            $scope.RollEditDisable = true;
            if ($scope.RegisterAdmittedStudent.CheckType == "E") {
                if ($("#BirthDate").val() != "") { $scope.RegisterAdmittedStudent.BirthDate = $("#BirthDate").val(); }
            }
            if ($scope.RegisterAdmittedStudent.CheckType == "S") {
                $scope.RegisterAdmittedStudent.BoardID = 59;
            } else if ($scope.RegisterAdmittedStudent.CheckType == "E") {
                if (($scope.RegisterAdmittedStudent.BoardID == undefined) || ($scope.RegisterAdmittedStudent.BoardID == "")) {
                    alert("Select Other Board");
                    $scope.RollEditDisable = true;
                    //$scope.RollEditDisableShow = false;
                    $scope.ClearData();
                    return;
                }
            }
            if (($scope.RegisterAdmittedStudent.Gender == "") || ($scope.RegisterAdmittedStudent.Gender == undefined)) {   //new change 25062018
                alert("Select Gender");
                $scope.RollEditDisable = false;
                return;
            }
            if (AppSettings.Clg_Type == "F") {                              
                if ($scope.RegisterAdmittedStudent.Gender != "F") {
                    alert("Only girls will apply for this college");
                    $scope.RollEditDisable = false;
                    return;
                }
            }
            if (AppSettings.Clg_Type == "M") {
                if ($scope.RegisterAdmittedStudent.Gender != "M") {
                    alert("Only boys will apply for this college");
                    $scope.RollEditDisable = false;
                    return;
                }
            }
            var getPromise = RegisterAdmittedStudentService.CheckMobileNoCount($scope.RegisterAdmittedStudent.MobileNo, AppSettings.CollegeID, AppSettings.AcdYrID);
            getPromise.then(function (data) {
                if (data == 2) {
                    alert("Entered Mobile No. already used two times. Please enter another Mobile No.");
                    //$scope.RollEditDisable = true;
                    //$scope.RollEditDisableShow = false;
                    $scope.RegisterAdmittedStudent.MobileNo = "";
                    $scope.RollEditDisable = false;
                    //$scope.ClearData();
                    return;
                } else {
                    var getPromise = RegisterAdmittedStudentService.GetMainGroupAndCollegewiseIntake(AppSettings.CollegeID, $scope.RegisterAdmittedStudent.BranchID, AppSettings.AcdYrID, $scope.RegisterAdmittedStudent.MainGrpID, $scope.RegisterAdmittedStudent.MediumID, $scope.RegisterAdmittedStudent.CourseID);
                    //var getPromise = RegisterAdmittedStudentService.CheckAddBranchCount(AppSettings.CollegeID, AppSettings.AcdYrID, $scope.RegisterAdmittedStudent.BranchID);
                    getPromise.then(function (data) {
                        if (data == 0) {
                            alert("College Group wise intake is full");
                            $scope.RollEditDisable = true;
                            //$scope.RollEditDisableShow = false;
                            $scope.ClearData();
                            return;
                        } else {
                            //var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresent($scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID);
                            //var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresentInCollege($scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID);
                            var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresentOpenAdmission($scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID, 0);
                            getPromise.then(function (data) {
                                if (data != 0) {
                                    var getPromise = RegisterAdmittedStudentService.GetDeleteHallTicketNoPresentOpenAdmission(AppSettings.AcdYrID, $scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID);
                                    getPromise.then(function (data) {
                                        alert("Online Requests Deleted because Student Enrolled this College.");
                                        var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresentInCollege($scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID);
                                        getPromise.then(function (data) {
                                            if (data != 0) {
                                                alert("Hall Ticket No already exist");
                                                $scope.RegisterAdmittedStudent.SSCHallTicket = "";
                                                $scope.RollEditDisable = true;
                                            } else {
                                                if (($scope.RegisterAdmittedStudent.BranchID == undefined) || ($scope.RegisterAdmittedStudent.BranchID == "")) {
                                                    $scope.RegisterAdmittedStudent.BranchID = 0;
                                                }
                                                $scope.RegisterAdmittedStudent.CreLoginID = AppSettings.LoggedUserId;
                                                $scope.RegisterAdmittedStudent.UpdLoginID = AppSettings.LoggedUserId;
                                                $scope.RegisterAdmittedStudent.AcdYrID = AppSettings.AcdYrID;
                                                $scope.RegisterAdmittedStudent.CollegeID = AppSettings.CollegeID;
                                                $scope.RegisterAdmittedStudent.checkShedule = true;
                                                if ($scope.RegisterAdmittedStudent.PassingMonth == 'Mar') {
                                                    $scope.RegisterAdmittedStudent.Stream = "R";
                                                } else if ($scope.RegisterAdmittedStudent.PassingMonth == 'Jun') {
                                                    $scope.RegisterAdmittedStudent.Stream = "A";
                                                }
                                                var getPromise = RegisterAdmittedStudentService.PutSSCStudentDetails($scope.RegisterAdmittedStudent);
                                                getPromise.then(function (msg) {
                                                    $scope.candidateinfo = true;
                                                    var SecondLangName = "";
                                                    for (var i = 0; i < $scope.SecondLangList.length; i++) {
                                                        if ($scope.SecondLangList[i].SecondLangID == $scope.RegisterAdmittedStudent.SecondLangID) {
                                                            SecondLangName = $scope.SecondLangList[i].SubName;
                                                        }
                                                    }
                                                    if (SecondLangName == "") {
                                                        SecondLangName = "-";
                                                    }
                                                    alert("Enrolled Successfully\nCollege = " + AppSettings.userName + ", Enrolled Number = " + msg[0].Message + ",\nLanguage = " + SecondLangName + "");
                                                    $scope.ClearData();
                                                }, function (error) {
                                                    $scope.candidateinfo = false;
                                                    $scope.RollEditDisable = false;
                                                    alert(error);
                                                    $scope.ClearData();
                                                });
                                            }
                                        }, function (error) {
                                            $scope.RollEditDisable = true;

                                            alert(error);
                                            $scope.ClearData();
                                        });

                                    }, function (error) {
                                        $scope.RollEditDisable = true;
                                        alert(error);
                                        $scope.ClearData();
                                    });


                                    //alert("Student already applied through online");  //CHANGE 13-07-2018
                                    //$scope.RegisterAdmittedStudent.SSCHallTicket = "";
                                    //$scope.RollEditDisable = true;
                                    //return false;
                                }
                                else {


                                    // var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresentOpenAdmission($scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID, AppSettings.CollegeID);
                                    var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresentInCollege($scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID);
                                    getPromise.then(function (data) {
                                        if (data != 0) {
                                            //alert("Student already applied through online");
                                            alert("Hall Ticket No already exist");
                                            $scope.RegisterAdmittedStudent.SSCHallTicket = "";
                                            $scope.RollEditDisable = true;
                                            //$scope.RollEditDisableShow = false;
                                            //$scope.ClearData();
                                        } else {
                                            if (($scope.RegisterAdmittedStudent.BranchID == undefined) || ($scope.RegisterAdmittedStudent.BranchID == "")) {
                                                $scope.RegisterAdmittedStudent.BranchID = 0;
                                            }
                                            $scope.RegisterAdmittedStudent.CreLoginID = AppSettings.LoggedUserId;
                                            $scope.RegisterAdmittedStudent.UpdLoginID = AppSettings.LoggedUserId;
                                            $scope.RegisterAdmittedStudent.AcdYrID = AppSettings.AcdYrID;
                                            $scope.RegisterAdmittedStudent.CollegeID = AppSettings.CollegeID;
                                            $scope.RegisterAdmittedStudent.checkShedule = true;
                                            if ($scope.RegisterAdmittedStudent.PassingMonth == 'Mar') {
                                                $scope.RegisterAdmittedStudent.Stream = "R";
                                            } else if ($scope.RegisterAdmittedStudent.PassingMonth == 'Jun') {
                                                $scope.RegisterAdmittedStudent.Stream = "A";
                                            }
                                            var getPromise = RegisterAdmittedStudentService.PutSSCStudentDetails($scope.RegisterAdmittedStudent);
                                            getPromise.then(function (msg) {
                                                $scope.candidateinfo = true;
                                                var SecondLangName = "";

                                                for (var i = 0; i < $scope.SecondLangList.length; i++) {
                                                    if ($scope.SecondLangList[i].SecondLangID == $scope.RegisterAdmittedStudent.SecondLangID) {
                                                        SecondLangName = $scope.SecondLangList[i].SubName;
                                                    }
                                                }
                                                if (SecondLangName == "") {
                                                    SecondLangName = "-";
                                                }
                                                //SecondLangName = $filter('filter')($scope.SecondLangList, { SecondLangID: $scope.RegisterAdmittedStudent.SecondLangID })[0].SubName;
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
        $scope.changeCheckType = function (CheckType) {
            if (CheckType == "O") {
                if (AppSettings.MngtTypID == 21) {
                    $state.go('Admission.OpenSchoolRegAdmittedStudent');
                }
                else {
                    alert("Open School board available only govt. colleges.");
                    $scope.RegisterAdmittedStudent.CheckType = "";
                }
            }
        }
        $scope.CheckSSC = function () {
            if ($scope.RegisterAdmittedStudent.CheckSSC == true) {
                $scope.RegisterAdmittedStudent.CheckEligibility = false;
            }
            else {
                $scope.RegisterAdmittedStudent.CheckEligibility = true;
            }
        }
        $scope.CheckEligibility = function () {
            if ($scope.RegisterAdmittedStudent.CheckEligibility == true) {
                $scope.RegisterAdmittedStudent.CheckSSC = false;
            }
            else {
                $scope.RegisterAdmittedStudent.CheckSSC = true;
            }
        }
        $scope.ShowStudentInfo = function () {
            if (($scope.RegisterAdmittedStudent.CheckType == undefined) || ($scope.RegisterAdmittedStudent.CheckType == "")) {
                alert("Select Board Name");
                return;
            }
            if (($scope.RegisterAdmittedStudent.SSCHallTicket == undefined) || ($scope.RegisterAdmittedStudent.SSCHallTicket == "")) {
                alert("Enter SSC HallTicket");
                return;
            }
            if (($scope.RegisterAdmittedStudent.YrName == undefined) || ($scope.RegisterAdmittedStudent.YrName == "")) {
                alert("Select Year");
                return;
            }
            if (($scope.RegisterAdmittedStudent.PassingMonth == undefined) || ($scope.RegisterAdmittedStudent.PassingMonth == "")) {
                alert("Select Passing Month");
                return;
            }
            if ($scope.RegisterAdmittedStudent.CheckType == "E") {
                if (($scope.RegisterAdmittedStudent.BoardID == undefined) || ($scope.RegisterAdmittedStudent.BoardID == "")) {
                    alert("Select Board");
                    return;
                }
            } else if ($scope.RegisterAdmittedStudent.CheckType == "S") {
                $scope.RegisterAdmittedStudent.BoardID = 59;
            }
            var Stream = "";
            if ($scope.RegisterAdmittedStudent.PassingMonth == 'Mar') {
                Stream = "R";
            } else if ($scope.RegisterAdmittedStudent.PassingMonth == 'Jun') {
                Stream = "A";
            }
            //$scope.RollEditDisableShow = true;
            var CheckType = $scope.RegisterAdmittedStudent.CheckType;
            var YrName = $scope.RegisterAdmittedStudent.YrName;
            var PassingMonth = $scope.RegisterAdmittedStudent.PassingMonth;
            var BoardID = $scope.RegisterAdmittedStudent.BoardID;
            // $scope.RegisterAdmittedStudent.CourseID = $scope.CourseList[0].CourseID;
            //$scope.RegisterAdmittedStudent.CheckType = 'S';

            var UnStudCaseList = RegisterAdmittedStudentService.GetCheckUnStudCaseForAdmission(AppSettings.AcdYrID, $scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID);
            UnStudCaseList.then(function (data, status, headers, config, error) {
                if (data[0].UnStudCase == 1) {
                    alert("This student is Debarred up to date " + data[0].UpToDateDesc + "");
                    $scope.RollEditDisable = true;
                    return;
                } else {
                    var LateStudentdata = RegisterAdmittedStudentService.GetRegisterStudentData($scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.CheckType, $scope.RegisterAdmittedStudent.BoardID, Stream);
                    LateStudentdata.then(function (data) {
                        if (data.length > 0) {
                            $scope.candidateinfo = false;
                            $scope.RegisterAdmittedStudent = data[0];
                            $scope.RegisterAdmittedStudent.BoardID = BoardID;
                            $scope.RegisterAdmittedStudent.CheckType = CheckType;
                            $scope.RegisterAdmittedStudent.YrName = YrName;
                            $scope.RegisterAdmittedStudent.PassingMonth = PassingMonth;
                            //if ($scope.RegisterAdmittedStudent.Gender == "") { 
                            //    alert("Gender is unknown for this SSC HallTicket No.");
                            //    $scope.RollEditDisableShow = false;
                            //    $scope.candidateinfo = true;
                            //    $scope.RollEditDisable = true;
                            //    $scope.ClearData();
                            //    return;
                            //}
                            if ($scope.RegisterAdmittedStudent.Gender != "") {
                                if (AppSettings.Clg_Type == "F") {
                                    if ($scope.RegisterAdmittedStudent.Gender != "F") {
                                        alert("Only girls will apply for this college");
                                        $scope.RollEditDisableShow = false;
                                        $scope.candidateinfo = true;
                                        $scope.RollEditDisable = true;
                                        $scope.ClearData();
                                        return;
                                    }
                                }
                                if (AppSettings.Clg_Type == "M") {
                                    if ($scope.RegisterAdmittedStudent.Gender != "M") {
                                        alert("Only boys will apply for this college");
                                        $scope.RollEditDisableShow = false;
                                        $scope.candidateinfo = true;
                                        $scope.RollEditDisable = true;
                                        $scope.ClearData();
                                        return;
                                    }
                                }
                            }
                            //var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresentInCollege($scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID);
                            var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresentOpenAdmission($scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID, 0);
                            getPromise.then(function (data) {
                                if (data != 0) {
                                    //alert("Student already applied through online"); //Comment By Rohit On 14-Jul-2018

                                    //$scope.RegisterAdmittedStudent.SSCHallTicket = "";  CHANGE 13-07-2018
                                    //$scope.RollEditDisableShow = false;
                                    //$scope.candidateinfo = true;
                                    //$scope.RollEditDisable = true;
                                    //$scope.ClearData();
                                }
                                //else {   //CHANGE 13-07-2018
                                var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresentInCollege($scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID);
                                //var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresentOpenAdmission($scope.RegisterAdmittedStudent.YrName, $scope.RegisterAdmittedStudent.SSCHallTicket, $scope.RegisterAdmittedStudent.BoardID, AppSettings.CollegeID);
                                getPromise.then(function (data) {
                                    if (data != 0) {
                                        alert("Hall Ticket No already exist");
                                        //alert("Student already applied through online");
                                        $scope.RegisterAdmittedStudent.SSCHallTicket = "";
                                        $scope.RollEditDisableShow = false;
                                        $scope.candidateinfo = true;
                                        $scope.RollEditDisable = true;
                                        $scope.ClearData();
                                    } else {
                                        if ($scope.RegisterAdmittedStudent.CheckType == "E") {
                                            $scope.OtherBoardreadonly = false;
                                            $("#BirthDate").ejDatePicker("disable");
                                            $scope.RegisterAdmittedStudent.BirthDate = $filter('date')($scope.RegisterAdmittedStudent.BirthDate, "dd/MMM/yyyy")
                                            $("#BirthDate").val($scope.RegisterAdmittedStudent.BirthDate);
                                            var CourseNew = [];
                                            if ($scope.CourseList.length == 1) {
                                                $scope.RegisterAdmittedStudent.CourseName = $scope.CourseList[0].CourseName;
                                                $scope.RegisterAdmittedStudent.CourseID = $scope.CourseList[0].CourseID;
                                                $scope.StreamDisable = false;
                                                $scope.FillCoursePart($scope.CourseList[0].CourseID);
                                            }
                                        } else {
                                            $("#BirthDate").ejDatePicker("disable");
                                            $scope.RegisterAdmittedStudent.BirthDate = $filter('date')($scope.RegisterAdmittedStudent.BirthDate, "dd/MMM/yyyy")
                                            $("#BirthDate").val($scope.RegisterAdmittedStudent.BirthDate);
                                            if ($scope.CourseList.length == 1) {
                                                $scope.RegisterAdmittedStudent.CourseName = $scope.CourseList[0].CourseName;
                                                $scope.RegisterAdmittedStudent.CourseID = $scope.CourseList[0].CourseID;
                                                $scope.StreamDisable = false;
                                                $scope.FillCoursePart($scope.CourseList[0].CourseID);
                                            }
                                        }
                                        if ($scope.RegisterAdmittedStudent.CheckType == "O") {
                                            $scope.GenderDisable = false;
                                        } else {
                                            if ($scope.RegisterAdmittedStudent.Gender != "") {
                                                $scope.GenderDisable = true;
                                            }
                                            else {
                                                $scope.GenderDisable = false;
                                            }
                                        }
                                        $scope.RollEditDisable = false;
                                    }
                                }, function (error) {
                                    $scope.RollEditDisable = true;
                                    //$scope.RollEditDisableShow = false;
                                    alert(error);
                                    $scope.ClearData();
                                });
                                //}
                            }, function (error) {
                                $scope.RollEditDisable = true;
                                //$scope.RollEditDisableShow = false;
                                alert(error);
                                $scope.ClearData();
                            });
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
            }, function (data, status, headers, config) {
                alert(error);
            });
        }
        $scope.ClearData = function () {
            $scope.RegisterAdmittedStudent.MobileNo = "";
            $scope.RegisterAdmittedStudent.AadharNo = "";
            $scope.RegisterAdmittedStudent.CourseID = "";

            $scope.RegisterAdmittedStudent.BranchID = "";
            $scope.RegisterAdmittedStudent.ExamID = "";
            $scope.RegisterAdmittedStudent.MediumID = "";
            $scope.RegisterAdmittedStudent.SecondLangID = "";
            $scope.RegisterAdmittedStudent.MainGrpID = "";

            $scope.RegisterAdmittedStudent.SSCHallTicket = "";
            $scope.RegisterAdmittedStudent.StudName = "";
            $scope.RegisterAdmittedStudent.FatherName = "";

            $scope.RegisterAdmittedStudent.MotherName = "";
            $scope.RegisterAdmittedStudent.Nationality = "";
            $scope.RegisterAdmittedStudent.BirthDateDesc = "";
            $scope.RegisterAdmittedStudent.CourseName = "";
            $scope.RollEditDisableShow = false;
            $scope.candidateinfo = true;
            $scope.StreamDisable = true;
            $scope.RegisterAdmittedStudent.CheckType = "S";

            $scope.RegisterAdmittedStudent.CheckType = "S";
            $scope.RegisterAdmittedStudent.YrName = "2018";
            $scope.RegisterAdmittedStudent.PassingMonth = "Mar";
        }
        $("#BirthDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#BirthDate").ejDatePicker("disable");
        $scope.OtherBoardreadonly = true;
        $scope.StreamDisable = true;
        $scope.ChangeSecondLanguage = function (SecondLangID) {
            console.log(AppSettings.MngtTypID); 
            if (AppSettings.MngtTypID == 21) {
                return;
            }
            if ($scope.RegisterAdmittedStudent.CourseID == 2) {
                return;
            }
            //for (var i = 0; i < $scope.SecondLangList.length; i++) {
            //    if ($scope.SecondLangList[i].SecondLangID == SecondLangID) {
            //        if (!$scope.SecondLangList[i].SubAadharVerify > 0) {
            //            alert("Aadhaar verification is pending for the second language : " + $scope.SecondLangList[i].SubName + "");
            //            $scope.RegisterAdmittedStudent.SecondLangID = "";
            //            return;
            //        }
            //    }
            //}
        }
    });
});
