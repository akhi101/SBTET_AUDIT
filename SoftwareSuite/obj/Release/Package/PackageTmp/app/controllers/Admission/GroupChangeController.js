define(['app'], function (app) {
    app.controller("GroupChangeController", function ($filter, $http, $scope, $state, $stateParams, AppSettings, StudentRegService, RegisterAdmittedStudentService) {
        $scope.GroupChange = { StudRegID: $stateParams.StudRegID };
        var PageNm = $state.current.name.split(".")[1] + "";
        var GroupChangeRightsdata = [];
        GroupChangeRightsdata = AppSettings.UserRights;
        for (var i = 0; i < GroupChangeRightsdata.length; i++) {
            if (GroupChangeRightsdata[i].GridFormToOpen == PageNm) {
                if (GroupChangeRightsdata[i].isupdatable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
            $scope.CourseList = BasicCoursedata;
            $scope.CourseListNew = BasicCoursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = RegisterAdmittedStudentService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                for (var i = 0; i < BasicExamdata.length; i++) {
                    if (BasicExamdata[i].SequenceNo == 1) {
                        $scope.GroupChange.ExamIDNew = BasicExamdata[i].ExamID;
                    }
                }
                var MainGroupList = RegisterAdmittedStudentService.GetMainGroupListByCollegeId(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupListNew = MainGroupListdata;
                    var SecondLangList = RegisterAdmittedStudentService.GetBasicSubjectListForSecondLangaugeInRegStud1(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID, 0);
                    SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                        $scope.SecondLangListNew = SecondLangdata;
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        $scope.ChangeSecondLanguage = function (SecondLangID) {
            if (SecondLangID != null) {
                //for (var i = 0; i < $scope.SecondLangListNew.length; i++) {
                //    if ($scope.SecondLangListNew[i].SecondLangID == SecondLangID) {
                //        if (!$scope.SecondLangListNew[i].SubAadharVerify > 0) {
                //            alert("Aadhaar verification is pending for the second language : " + $scope.SecondLangListNew[i].SubName + "");
                //            $scope.RegisterAdmittedStudent.SecondLangID = "";
                //            return;
                //        }
                //    }
                //}
            }
        }
        $scope.FillBranchByGroup = function (MainGrpID) {
            if (MainGrpID != null) {
                //for (var i = 0; i < $scope.MainGroupListNew.length; i++) {
                //    if ($scope.MainGroupListNew[i].MainGrpIDNew == MainGrpID) {
                //        if ($scope.MainGroupListNew[i].SecAadharVerify != 1) {
                //            alert("Aadhaar verification is pending for the group : " + $scope.MainGroupListNew[i].MainGrpName + "");
                //            $scope.GroupChange.MainGrpIDNew = "";
                //            return;
                //        }
                //    }
                //}
                var BranchList = RegisterAdmittedStudentService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchListNew = BasicBranchdata;
                    $scope.GroupChange.BranchIDNew = BasicBranchdata[0].BranchID;
                    $scope.GroupChange.BranchName = BasicBranchdata[0].BranchName;
                    var MediumList = RegisterAdmittedStudentService.GetBasicMediumInRegStud(AppSettings.CollegeID, $scope.GroupChange.BranchIDNew , AppSettings.AcdYrID);
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
        var MainGroupList = StudentRegService.GetMainGroupListByCollegeId(AppSettings.CollegeID, 0, AppSettings.AcdYrID);
        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
            $scope.MainGroupList = MainGroupListdata;
            var SecondLangList = StudentRegService.GetBasicSubjectListForSecondLangaugeInRegStud1(AppSettings.CollegeID,0, AppSettings.AcdYrID, 0);
            SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                $scope.SecondLangList = SecondLangdata;
                var MediumList = StudentRegService.GetMediumList(AppSettings.CollegeID,AppSettings.AcdYrID);
                MediumList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;
                    var StudentRegdata = StudentRegService.GetStudentRegById($scope.GroupChange.StudRegID);
                    StudentRegdata.then(function (data) {
                        $scope.GroupChange = data[0];
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
        $scope.SaveGroupChange = function () {
            if (($scope.GroupChange.CourseIDNew == undefined) || ($scope.GroupChange.CourseIDNew == "")) {
                alert("Select New Course");
                return;
            }
            if (($scope.GroupChange.MainGrpIDNew == undefined) || ($scope.GroupChange.MainGrpIDNew == "")) {
                alert("Select New Main Group");
                return;
            }
            if ($scope.GroupChange.MainGrpIDNew == $scope.GroupChange.MainGrpID) {
                alert("Old group and new group can not be same");
                return;
            }
            if (($scope.GroupChange.SecondLangIDNew == undefined) || ($scope.GroupChange.SecondLangIDNew == "")) {
                alert("Select New Second Language");
                return;
            }
            if (($scope.GroupChange.MediumIDNew == undefined) || ($scope.GroupChange.MediumIDNew == "")) {
                alert("Select New Medium");
                return;
            }
            //if (AppSettings.MngtTypID != 21) {
            //    if ($scope.GroupChange.SecAadharVerify != 1) {
            //        alert("Aadhaar verification is pending for selected group.");
            //        return;
            //    }
            //    if ($scope.GroupChange.CourseIDNew == 1) {
            //        if (!$scope.GroupChange.SubAadharVerify > 0) {
            //            alert("Aadhaar verification is pending for selected second language.");
            //            return;
            //        }
            //    }
            //}
            $scope.RollEditDisable = true;
            if ($scope.GroupChange.StudRegID == undefined) { $scope.GroupChange.StudRegID = 0; }
            if ($scope.GroupChange.StudRegID != 0) {
                $scope.GroupChange.UpdLoginID = AppSettings.LoggedUserId;
                $scope.GroupChange.AcdYrID = AppSettings.AcdYrID;
                $scope.GroupChange.CollegeID = AppSettings.CollegeID;
                var getPromise = StudentRegService.PostGroupChange($scope.GroupChange);
                getPromise.then(function (data) {
                    if (data == 1) {
                        $scope.RollEditDisable = true;
                        alert("College Group wise intake is full");
                        return;
                    } else {
                        $scope.RollEditDisable = true;
                        alert("Group change Successfully");
                        RedirectToListPage();
                    }
                }, function (error) {
                    $scope.RollEditDisable = false;
                    alert(error);
                });
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission.GroupChangeList');
        }
    });
});

