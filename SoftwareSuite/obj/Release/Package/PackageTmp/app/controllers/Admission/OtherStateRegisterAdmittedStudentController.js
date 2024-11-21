define(['app'], function (app) {
    app.controller("OtherStateRegisterAdmittedStudentController", function ($scope, $state, $stateParams, AppSettings, OtherStateRegisterAdmittedStudentService) {
        $scope.OtherStateRegisterAdmittedStudent = { };
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
        //$scope.OtherStateRegisterAdmittedStudent.CheckSSC = true;
        //$scope.OtherStateRegisterAdmittedStudent.CheckEligibility = false;
        $scope.OtherStateRegisterAdmittedStudent.CollegeID = AppSettings.CollegeID;
        //var AdmNoList = OtherStateRegisterAdmittedStudentService.GetMaxAdmNo();
        //AdmNoList.then(function (AdmNodata, status, headers, config, error) {
        //    $scope.OtherStateRegisterAdmittedStudent.AdmNo = AdmNodata;
        //}, function (error) {
        //    alert(error);
        //});
        var CourseList = OtherStateRegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
            $scope.CourseList = BasicCoursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = OtherStateRegisterAdmittedStudentService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                var BranchList = OtherStateRegisterAdmittedStudentService.GetBasicBranchListForRegStud(CourseID, AppSettings.CollegeID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveOtherStateRegisterAdmittedStudent = function () {
            if (($scope.OtherStateRegisterAdmittedStudent.CourseID == undefined) || ($scope.OtherStateRegisterAdmittedStudent.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.OtherStateRegisterAdmittedStudent.ExamID == undefined) || ($scope.OtherStateRegisterAdmittedStudent.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.OtherStateRegisterAdmittedStudent.SSCHallTicket == undefined) || ($scope.OtherStateRegisterAdmittedStudent.SSCHallTicket == "")) {
                alert("Enter SSC HallTicket");
                return;
            }
            //if ($scope.OtherStateRegisterAdmittedStudent.CheckSSC == true) {
            //    if (($scope.OtherStateRegisterAdmittedStudent.SSCHallTicket == undefined) || ($scope.OtherStateRegisterAdmittedStudent.SSCHallTicket == "")) {
            //        alert("Enter SSC HallTicket");
            //        return;
            //    }
            //} else {
            //    if (($scope.OtherStateRegisterAdmittedStudent.EligibilityNo == undefined) || ($scope.OtherStateRegisterAdmittedStudent.EligibilityNo == "")) {
            //        alert("Enter Eligibility No");
            //        return;
            //    }
            //}
            //if ($scope.OtherStateRegisterAdmittedStudent.CheckSSC == true) {
            //    $scope.OtherStateRegisterAdmittedStudent.CheckType = 'S';
            //}
            //else { $scope.OtherStateRegisterAdmittedStudent.CheckType = 'E'; }
            $scope.RollEditDisable = true;
            var getPromise = OtherStateRegisterAdmittedStudentService.CheckAddBranchCount(AppSettings.CollegeID, AppSettings.AcdYrID, $scope.OtherStateRegisterAdmittedStudent.BranchID);
            getPromise.then(function (data) {
                if (data == 0) {
                    alert("College Branch wise intake is full");
                    return;
                } else {
                    var getPromise = OtherStateRegisterAdmittedStudentService.CheckHallTicketNoPresent( AppSettings.AcdYrID, $scope.OtherStateRegisterAdmittedStudent.SSCHallTicket);
                    getPromise.then(function (data) {
                        if (data == 1) {
                            alert("Hall Ticket No already present");
                            $scope.RollEditDisable = false;
                            return false;
                        } else {
                            if (($scope.OtherStateRegisterAdmittedStudent.BranchID == undefined) || ($scope.OtherStateRegisterAdmittedStudent.BranchID == "")) {
                                $scope.OtherStateRegisterAdmittedStudent.BranchID = 0;
                            }
                            $scope.OtherStateRegisterAdmittedStudent.CreLoginID = AppSettings.LoggedUserId;
                            $scope.OtherStateRegisterAdmittedStudent.UpdLoginID = AppSettings.LoggedUserId;
                            $scope.OtherStateRegisterAdmittedStudent.AcdYrID = AppSettings.AcdYrID;
                            $scope.OtherStateRegisterAdmittedStudent.checkShedule = true;
                            var getPromise = OtherStateRegisterAdmittedStudentService.PutSSCStudentDetails($scope.OtherStateRegisterAdmittedStudent);
                            getPromise.then(function (msg) {
                                alert("Saved Successfully");
                                RedirectToListPage();
                            }, function (error) {
                                $scope.RollEditDisable = false;
                                alert("Saved Error");
                            });
                        }
                    }, function (error) {
                        alert(error);
                    });
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission');
        }

        //$scope.CheckSSC = function () {
        //    if ($scope.OtherStateRegisterAdmittedStudent.CheckSSC == true) {
        //        $scope.OtherStateRegisterAdmittedStudent.CheckEligibility = false;
        //    }
        //    else {
        //        $scope.OtherStateRegisterAdmittedStudent.CheckEligibility = true;
        //    }
        //}
        //$scope.CheckEligibility = function () {
        //    if ($scope.OtherStateRegisterAdmittedStudent.CheckEligibility == true) {
        //        $scope.OtherStateRegisterAdmittedStudent.CheckSSC = false;
        //    }
        //    else {
        //        $scope.OtherStateRegisterAdmittedStudent.CheckSSC = true;
        //    }
        //}
    });
});
