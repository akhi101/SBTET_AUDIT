define(['app'], function (app) {
    app.controller("EnrollStudentRequestController", function ($scope, $state, $filter, $stateParams, AppSettings, EnrollStudentRequestService, RegisterAdmittedStudentService, $localStorage) {
        var authData = $localStorage.authorizationData;
        AppSettings.MngtTypID = authData.MngtTypID; 
        $scope.EnrollStudentRequest = { StudEnrolColID: $stateParams.StudEnrolColID };
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
        $scope.SaveEnrollStudentRequest = function () {
            $scope.RollEditDisable = true;

            if (AppSettings.MngtTypID != 21) {
                //for (var i = 0; i < $scope.MainGroupList.length; i++) {

                //    if ($scope.MainGroupList[i].MainGrpID == $scope.EnrollStudentRequest.MainGrpID) {
                //        if ($scope.MainGroupList[i].SecAadharVerify != 1) {
                //            alert("Aadhaar verification is pending for the group.");
                //            $scope.GovtColEnrollExist.MainGrpID = "";
                //            $scope.RollEditDisable = false;
                //            return;
                //        }
                //    }
                //}
                //if ($scope.EnrollStudentRequest.CourseID == 1) {
                //    for (var i = 0; i < $scope.SecondLangList.length; i++) {
                //        if ($scope.SecondLangList[i].SecondLangID == $scope.EnrollStudentRequest.SecondLangID) {
                //            if (!$scope.SecondLangList[i].SubAadharVerify > 0) {
                //                alert("Aadhaar verification is pending for the second language.");
                //                $scope.RegisterAdmittedStudent.SecondLangID = "";
                //                $scope.RollEditDisable = false;
                //                return;
                //            }
                //        }
                //    }
                //}
            }
            var UnStudCaseList = RegisterAdmittedStudentService.GetCheckUnStudCaseForAdmission(AppSettings.AcdYrID, $scope.EnrollStudentRequest.YrName, $scope.EnrollStudentRequest.SSCHallTicket, $scope.EnrollStudentRequest.BoardID);
            UnStudCaseList.then(function (data, status, headers, config, error) {
                if (data[0].UnStudCase == 1) {
                    alert("This student is Debarred up to date " + data[0].UpToDateDesc + "");
                    $scope.RollEditDisable = true;
                    $scope.RollEditDisableShow = false;
                    return;
                } else {
                    var getPromise = RegisterAdmittedStudentService.CheckMobileNoCount($scope.EnrollStudentRequest.MobileNo, AppSettings.CollegeID, AppSettings.AcdYrID);
                    getPromise.then(function (data) {
                        if (data == 2) {
                            alert("Entered Mobile No. already used two times. Please enter another Mobile No.");
                            $scope.RollEditDisable = true;
                            $scope.RollEditDisableShow = false;
                            return;
                        } else {
                            //var getPromise = RegisterAdmittedStudentService.CheckAddBranchCount(AppSettings.CollegeID, AppSettings.AcdYrID, $scope.EnrollStudentRequest.BranchID);
                            var getPromise = RegisterAdmittedStudentService.GetMainGroupAndCollegewiseIntake(AppSettings.CollegeID, $scope.EnrollStudentRequest.BranchID, AppSettings.AcdYrID, $scope.EnrollStudentRequest.MainGrpID, $scope.EnrollStudentRequest.MediumID, $scope.EnrollStudentRequest.CourseID);
                            getPromise.then(function (data) {
                                if (data == 0) {
                                    alert("College Group wise intake is full");
                                    //$scope.RollEditDisable = true;
                                    //$scope.RollEditDisableShow = false;
                                    //$scope.ClearData();
                                    return;
                                } else {
                                    //var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresent(AppSettings.AcdYrID, $scope.EnrollStudentRequest.SSCHallTicket, $scope.EnrollStudentRequest.BoardID);
                                    var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresent($scope.EnrollStudentRequest.YrName, $scope.EnrollStudentRequest.SSCHallTicket, $scope.EnrollStudentRequest.BoardID, AppSettings.CollegeID);
                                    getPromise.then(function (data) {
                                        if (data != 0) {
                                            alert("Hall Ticket No already present");
                                            $scope.EnrollStudentRequest.SSCHallTicket = "";
                                            $scope.RollEditDisable = true;
                                            //$scope.RollEditDisableShow = false;
                                            //$scope.ClearData();
                                            return false;
                                        } else {
                                            if (($scope.EnrollStudentRequest.BranchID == undefined) || ($scope.EnrollStudentRequest.BranchID == "")) {
                                                $scope.EnrollStudentRequest.BranchID = 0;
                                            }
                                            $scope.EnrollStudentRequest.CreLoginID = AppSettings.LoggedUserId;
                                            $scope.EnrollStudentRequest.UpdLoginID = AppSettings.LoggedUserId;
                                            $scope.EnrollStudentRequest.AcdYrID = AppSettings.AcdYrID;
                                            $scope.EnrollStudentRequest.CollegeID = AppSettings.CollegeID;
                                            $scope.EnrollStudentRequest.checkShedule = true;
                                            $scope.EnrollStudentRequest.Stream = "";
                                            if ($scope.EnrollStudentRequest.PassingMonth == 'Mar') {
                                                $scope.EnrollStudentRequest.Stream = "R";
                                            } else if ($scope.EnrollStudentRequest.PassingMonth == 'Jun') {
                                                $scope.EnrollStudentRequest.Stream = "A";
                                            }
                                            $scope.EnrollStudentRequest.Year = $scope.EnrollStudentRequest.YrName;
                                            $scope.EnrollStudentRequest.IsOpenCollege = 1;
                                            var getPromise = RegisterAdmittedStudentService.PutSSCStudentDetails($scope.EnrollStudentRequest);
                                            getPromise.then(function (msg) {
                                                if (msg[0].Message != 0) {
                                                    var getPromise = EnrollStudentRequestService.GetUpdateEnrolFlagStud($scope.EnrollStudentRequest.StudEnrolID, AppSettings.CollegeID);
                                                    getPromise.then(function (data) {
                                                        var SecondLangName = "";
                                                        for (var i = 0; i < $scope.SecondLangList.length; i++) {
                                                            if ($scope.SecondLangList[i].SecondLangID == $scope.EnrollStudentRequest.SecondLangID) {
                                                                SecondLangName = $scope.SecondLangList[i].SubName;
                                                            }
                                                        }
                                                        //SecondLangName = $filter('filter')($scope.SecondLangList, { SecondLangID: $scope.EnrollStudentRequest.SecondLangID })[0].SubName;
                                                        alert("Enrolled Successfully\nCollege = " + AppSettings.userName + ", Enrolled Number = " + msg[0].Message + ",\nLanguage = " + SecondLangName + "");
                                                        RedirectToListPage();
                                                    }, function (error) {
                                                        $scope.RollEditDisable = false;
                                                        alert(error);
                                                    });
                                                }
                                            }, function (error) {
                                                $scope.RollEditDisable = false;

                                                alert(error);
                                            });
                                        }
                                    }, function (error) {
                                        $scope.RollEditDisable = true;
                                        alert(error);
                                    });
                                }
                            }, function (error) {
                                $scope.RollEditDisable = true;
                                alert(error);
                            });
                        }
                    }, function (error) {
                        $scope.RollEditDisable = true;
                        alert(error);
                    });
                }
            }, function (error) {
                $scope.RollEditDisable = true;
                alert(error);
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission');
        }
        var BoardList = EnrollStudentRequestService.GetBasicBoardList();
        BoardList.then(function (BasicBoarddata, status, headers, config, error) {
            $scope.BoardList = BasicBoarddata;
        }, function (error) {
            alert(error);
        });
        var CourseList = EnrollStudentRequestService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
            $scope.CourseList = BasicCoursedata;
            var ExamList = EnrollStudentRequestService.GetBasicExamList();
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                var BranchList = EnrollStudentRequestService.GetBasicBranchList();
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                    var MainGroupList = EnrollStudentRequestService.GetMainGroupListByCollegeId(AppSettings.CollegeID);
                    MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                        $scope.MainGroupList = MainGroupListdata;
                        var MediumList = EnrollStudentRequestService.GetBasicMediumList();
                        MediumList.then(function (SecondLangdata, status, headers, config, error) {
                            $scope.MediumList = SecondLangdata;
                            //var SecondLangList = EnrollStudentRequestService.GetBasicSubjectListForSecondLangaugeInRegStud(AppSettings.CollegeID, 0);
                            var SecondLangList = EnrollStudentRequestService.GetBasicSubjectListForSecondLangaugeInRegStud1(AppSettings.CollegeID, 0,0);
                            SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                                $scope.SecondLangList = SecondLangdata;
                                var EnrollData = EnrollStudentRequestService.GetStudEnrollDataByEnrollColID($scope.EnrollStudentRequest.StudEnrolColID);
                                EnrollData.then(function (data) {
                                    if (data.length > 0) {
                                        $scope.EnrollStudentRequest = data[0];
                                        $("#BirthDate").ejDatePicker("disable");
                                        $scope.EnrollStudentRequest.BirthDate = $filter('date')($scope.EnrollStudentRequest.BirthDate, "dd/MMM/yyyy")
                                        $("#BirthDate").val($scope.EnrollStudentRequest.BirthDate);
                                        //if (data[0].EnrolFlag == 'Y') {
                                        //    $scope.RollEditDisable = true;
                                        //}
                                        //else {
                                        //    $scope.RollEditDisable = false;
                                        //}
                                    } else {
                                        alert("Data Not Found");
                                    }
                                }, function (error) {
                                    alert(error);
                                    $scope.RollEditDisableShow = false;
                                    $scope.candidateinfo = true;
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
        }, function (error) {
            alert(error);
        });

        $("#BirthDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#BirthDate").ejDatePicker("disable");
    });
});
