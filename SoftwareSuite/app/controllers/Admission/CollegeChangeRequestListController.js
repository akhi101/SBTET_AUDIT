define(['app'], function (app) {
    app.controller("CollegeChangeRequestListController", function ($scope, $state, $filter, $stateParams, AppSettings, $localStorage, CollegeChangeRequestListService, RegisterAdmittedStudentService) {

        var authData = $localStorage.authorizationData;
        AppSettings.MngtTypID = authData.MngtTypID;

        $scope.CollegeChangeRequestList = {};
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
        $scope.CollegeChangeRequestList.CheckType = "S";
        $scope.CollegeChangeRequestList.YrName = "2018";
        $scope.CollegeChangeRequestList.PassingMonth = "Mar";
        $scope.CollegeChangeRequestList.CollegeID = AppSettings.CollegeID;
        $scope.RollEditDisable = true;
        var BoardList = RegisterAdmittedStudentService.GetBasicBoardListOtherthanTelengana(59);
        BoardList.then(function (BasicBoarddata, status, headers, config, error) {
            $scope.BoardList = BasicBoarddata;
        }, function (error) {
            alert(error);
        });

        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
            $scope.CourseListNew = BasicCoursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var MainGroupList = RegisterAdmittedStudentService.GetMainGroupListByCollegeId(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID);
            MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                $scope.MainGroupListNew = MainGroupListdata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillBranchByGroup = function (MainGrpID) {
            if (MainGrpID != null) {
                for (var i = 0; i < $scope.MainGroupListNew.length; i++) {
                    if ($scope.MainGroupListNew[i].MainGrpIDNew == MainGrpID) {
                        if ($scope.MainGroupListNew[i].SecAadharVerify != 1) {
                            alert("Aadhaar verification is pending for the group : " + $scope.MainGroupListNew[i].MainGrpName + "");
                            $scope.CollegeChangeRequestList.MainGrpIDNew = "";
                            return;
                        }
                    }
                }
                var BranchList = RegisterAdmittedStudentService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchListNew = BasicBranchdata;
                    $scope.CollegeChangeRequestList.BranchIDNew = BasicBranchdata[0].BranchID;
                    $scope.CollegeChangeRequestList.BranchName = BasicBranchdata[0].BranchName;
                    var MediumList = RegisterAdmittedStudentService.GetBasicMediumInRegStud(AppSettings.CollegeID, $scope.CollegeChangeRequestList.BranchIDNew, AppSettings.AcdYrID);
                    MediumList.then(function (SecondLangdata, status, headers, config, error) {
                        $scope.MediumListNew = SecondLangdata;
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }


        $scope.SaveCollegeChangeRequestList = function () {
            if (($scope.CollegeChangeRequestList.SSCHallTicket == undefined) || ($scope.CollegeChangeRequestList.SSCHallTicket == "")) {
                alert("Enter SSC HallTicket");
                return;
            }
            if (($scope.CollegeChangeRequestList.Purpose == undefined) || ($scope.CollegeChangeRequestList.Purpose == "")) {
                alert("Enter Purpose");
                return;
            }
            if ($scope.CollegeChangeRequestList.CheckType == "S") {
                $scope.CollegeChangeRequestList.BoardID = 59;
            } else if ($scope.CollegeChangeRequestList.CheckType == "E") {
                if (($scope.CollegeChangeRequestList.BoardID == undefined) || ($scope.CollegeChangeRequestList.BoardID == "")) {
                    alert("Select Other Board");
                    $scope.RollEditDisable = true;
                    return;
                }
            } else if ($scope.CollegeChangeRequestList.CheckType == "O") {
                $scope.CollegeChangeRequestList.BoardID = 61;
            }
            if (AppSettings.Clg_Type == "F") {
                if ($scope.CollegeChangeRequestList.Gender != "F") {
                    alert("Only girls will apply for this college");
                    $scope.RollEditDisable = false;
                    return;
                }
            }
            if (AppSettings.Clg_Type == "M") {
                if ($scope.CollegeChangeRequestList.Gender != "M") {
                    alert("Only boys will apply for this college");
                    $scope.RollEditDisable = false;
                    return;
                }
            }

            var getPromise = RegisterAdmittedStudentService.CheckMobileNoCount($scope.CollegeChangeRequestList.MobileNo, AppSettings.CollegeID, AppSettings.AcdYrID);
            getPromise.then(function (data) {
                if (data == 2) {
                    alert("Entered Mobile No. already used two times. Please enter another Mobile No.");
                    $scope.CollegeChangeRequestList.MobileNo = "";
                    $scope.RollEditDisable = false;
                    return;
                } else {
                    if (($scope.CollegeChangeRequestList.CourseIDNew == undefined) || ($scope.CollegeChangeRequestList.CourseIDNew == "")) {
                        $scope.CollegeChangeRequestList.CourseIDNew = 0;
                    }
                    if (($scope.CollegeChangeRequestList.MainGrpIDNew == undefined) || ($scope.CollegeChangeRequestList.MainGrpIDNew == "")) {
                        $scope.CollegeChangeRequestList.MainGrpIDNew = 0;
                    }
                    if (($scope.CollegeChangeRequestList.MediumIDNew == undefined) || ($scope.CollegeChangeRequestList.MediumIDNew == "")) {
                        $scope.CollegeChangeRequestList.MediumIDNew = 0;
                    }
                    if (($scope.CollegeChangeRequestList.BranchIDNew == undefined) || ($scope.CollegeChangeRequestList.BranchIDNew == "")) {
                        $scope.CollegeChangeRequestList.BranchIDNew = 0;
                    }


                    if (($scope.CollegeChangeRequestList.CourseIDNew !=0 ) && ($scope.CollegeChangeRequestList.CourseIDNew != $scope.CollegeChangeRequestList.CourseID)) {
                        $scope.CollegeChangeRequestList.CourseID = $scope.CollegeChangeRequestList.CourseIDNew;
                    }
                    if (($scope.CollegeChangeRequestList.MainGrpIDNew !=0) && ($scope.CollegeChangeRequestList.MainGrpIDNew != $scope.CollegeChangeRequestList.MainGrpID)) {
                        $scope.CollegeChangeRequestList.MainGrpID = $scope.CollegeChangeRequestList.MainGrpIDNew;
                    }
                    if (($scope.CollegeChangeRequestList.MediumIDNew != 0) && ($scope.CollegeChangeRequestList.MediumIDNew != $scope.CollegeChangeRequestList.MediumID)) {
                        $scope.CollegeChangeRequestList.MediumID = $scope.CollegeChangeRequestList.MediumIDNew;
                    }
                    if (($scope.CollegeChangeRequestList.BranchIDNew != 0 ) && ($scope.CollegeChangeRequestList.BranchIDNew != $scope.CollegeChangeRequestList.BranchID)) {
                        $scope.CollegeChangeRequestList.BranchID = $scope.CollegeChangeRequestList.BranchIDNew;
                    }

                    //new 29062018
                    var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresent($scope.CollegeChangeRequestList.YrName, $scope.CollegeChangeRequestList.SSCHallTicket, $scope.CollegeChangeRequestList.BoardID, AppSettings.CollegeID);
                    getPromise.then(function (data) {
                        if (data != 0) {
                            alert("Hall Ticket No already exist in your college");
                            $scope.CollegeChangeRequestList.SSCHallTicket = "";
                            $scope.RollEditDisable = false;
                        } else {
                            //var getPromise = RegisterAdmittedStudentService.GetMainGroupAndCollegewiseIntake(AppSettings.CollegeID, $scope.CollegeChangeRequestList.BranchID, AppSettings.AcdYrID, $scope.CollegeChangeRequestList.MainGrpID, $scope.CollegeChangeRequestList.MediumID, $scope.CollegeChangeRequestList.CourseID);
                            //getPromise.then(function (data) {
                            //    if (data == 0) {
                            //        alert("College Group wise intake is full Or Student Group is not available in this College");
                            //        $scope.RollEditDisable = false;
                            //        return;
                            //    } else {
                                    $scope.CollegeChangeRequestList.CreLoginID = AppSettings.LoggedUserId;
                                    $scope.CollegeChangeRequestList.AcdYrID = AppSettings.AcdYrID;
                                    $scope.CollegeChangeRequestList.CollegeIDNew = AppSettings.CollegeID;
                                    var getPromise = CollegeChangeRequestListService.PutCollegeChanegRequest($scope.CollegeChangeRequestList);
                                    getPromise.then(function (msg) {
                                        alert("Request submitted successfully");
                                        RedirectToListPage();
                                    }, function (error) {
                                        $scope.RollEditDisable = false;
                                        alert(error);
                                    });
                                //}
                            //}, function (error) {
                            //    $scope.RollEditDisable = true;
                            //    alert(error);
                            //});
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
        $scope.ShowStudentInfo = function () {
            if (($scope.CollegeChangeRequestList.CheckType == undefined) || ($scope.CollegeChangeRequestList.CheckType == "")) {
                alert("Select Board Name");
                return;
            }
            if (($scope.CollegeChangeRequestList.SSCHallTicket == undefined) || ($scope.CollegeChangeRequestList.SSCHallTicket == "")) {
                alert("Enter SSC HallTicket");
                return;
            }
            if (($scope.CollegeChangeRequestList.YrName == undefined) || ($scope.CollegeChangeRequestList.YrName == "")) {
                alert("Select Year");
                return;
            }
            if (($scope.CollegeChangeRequestList.PassingMonth == undefined) || ($scope.CollegeChangeRequestList.PassingMonth == "")) {
                alert("Select Passing Month");
                return;
            }
            if ($scope.CollegeChangeRequestList.CheckType == "E") {
                if (($scope.CollegeChangeRequestList.BoardID == undefined) || ($scope.CollegeChangeRequestList.BoardID == "")) {
                    alert("Select Board");
                    return;
                }
            } else if ($scope.CollegeChangeRequestList.CheckType == "S") {
                $scope.CollegeChangeRequestList.BoardID = 59;
            } else if ($scope.CollegeChangeRequestList.CheckType == "O") {
                $scope.CollegeChangeRequestList.BoardID = 61;
            }
            $scope.RollEditDisableShow = true;
            var CheckType = $scope.CollegeChangeRequestList.CheckType;
            var YrName = $scope.CollegeChangeRequestList.YrName;
            var PassingMonth = $scope.CollegeChangeRequestList.PassingMonth;
            var BoardID = $scope.CollegeChangeRequestList.BoardID;
            var LateStudentdata = CollegeChangeRequestListService.GetStudentDataForCollegeChange(AppSettings.AcdYrID, $scope.CollegeChangeRequestList.YrName, $scope.CollegeChangeRequestList.PassingMonth, $scope.CollegeChangeRequestList.SSCHallTicket, $scope.CollegeChangeRequestList.BoardID);
            LateStudentdata.then(function (data) {
                if (data.length > 0) {
                    $scope.CollegeChangeRequestList = data[0];
                    $scope.CollegeChangeRequestList.BoardID = BoardID;
                    $scope.CollegeChangeRequestList.CheckType = CheckType;
                    $scope.CollegeChangeRequestList.YrName = YrName;
                    $scope.CollegeChangeRequestList.PassingMonth = PassingMonth;
                    $scope.RollEditDisable = false;
                    var getPromise = CollegeChangeRequestListService.GetCollegeRequestCnt($scope.CollegeChangeRequestList.StudRegID, $scope.CollegeChangeRequestList.SSCHallTicket, AppSettings.CollegeID);
                    getPromise.then(function (data) {
                        if (data != 0) {
                            alert("College Change Request is already done");
                            $scope.CollegeChangeRequestList.SSCHallTicket = "";
                            $scope.RollEditDisableShow = false;
                            $scope.RollEditDisable = false;
                            $scope.ClearData();
                        } 
                    }, function (error) {
                        $scope.RollEditDisable = true;
                        alert(error);
                    });
                } else {
                    alert("Data not found for this hall ticket.");
                    $scope.RollEditDisable = true;
                }
            }, function (error) {
                if (error == '[{"Id":"No Data","Message":"No Data Found"}]') {
                    alert("Data not found for this hall ticket.");
                }
                else {
                    alert(error);
                }
                $scope.RollEditDisable = true;
            });

           
            
        }
        $scope.ClearData = function () {
            $scope.CollegeChangeRequestList.CourseID = "";
            $scope.CollegeChangeRequestList.MainGrpID = "";
            $scope.CollegeChangeRequestList.MediumID = "";
            $scope.CollegeChangeRequestList.BranchID = "";
            $scope.CollegeChangeRequestList.MediumID = "";
            $scope.CollegeChangeRequestList.CollegeID = "";

            $scope.CollegeChangeRequestList.CollegeIDNew = "";
            $scope.CollegeChangeRequestList.CourseIDNew = "";
            $scope.CollegeChangeRequestList.MainGrpIDNew = "";
            $scope.CollegeChangeRequestList.MediumIDNew = "";
            $scope.CollegeChangeRequestList.BranchIDNew = "";
            $scope.CollegeChangeRequestList.BranchName = "";

            $scope.CollegeChangeRequestList.SSCHallTicket = "";
            $scope.CollegeChangeRequestList.StudName = "";
            $scope.CollegeChangeRequestList.FatherName = "";
            $scope.CollegeChangeRequestList.MotherName = "";
            $scope.CollegeChangeRequestList.CourseName = "";
            $scope.CollegeChangeRequestList.MainGrpName = "";
            $scope.CollegeChangeRequestList.ColName = "";
            $scope.CollegeChangeRequestList.MobileNo = "";
            $scope.CollegeChangeRequestList.CheckType = "S";
            $scope.CollegeChangeRequestList.YrName = "2018";
            $scope.CollegeChangeRequestList.PassingMonth = "Mar";
            $scope.CollegeChangeRequestList.Gender = "Mar";
            $scope.RollEditDisableShow = false;
        }
        $scope.RollEditDisableShow = false;
    });
});
