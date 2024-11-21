define(['app'], function (app) {
    app.controller("BasicGrpSubjectController", function ($scope, $state, $stateParams, AppSettings, BasicGrpSubjectService, BasicCourseService, BasicExamService, BasicBranchService, BasicSubGroupService, BasicExamSubjectService, BasicMainGroupService) {
        $scope.BasicGrpSubject = { GrpSubID: $stateParams.GrpSubID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicGrpSubjectRightsdata = [];
        BasicGrpSubjectRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicGrpSubjectRightsdata.length; i++) {
            if (BasicGrpSubjectRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicGrpSubject.GrpSubID == 0) {
                    if (BasicGrpSubjectRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicGrpSubjectRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicGrpSubjectRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.DisbaleSubGroup = false;
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (BasicCourseData, status, headers, config, error) {
            $scope.BasicCourseList = BasicCourseData;
            var BasicExamList = BasicExamService.GetBasicExamList();
            BasicExamList.then(function (BasicExamhData, status, headers, config, error) {
                $scope.BasicExamList = BasicExamhData;
                var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                BasicBranchList.then(function (BasicBranchData, status, headers, config, error) {
                    $scope.BasicBranchList = BasicBranchData;
                    var BasicMainGroupList = BasicMainGroupService.GetBasicMainGroupList(0, 0);
                    BasicMainGroupList.then(function (BasicMainGroupData, status, headers, config, error) {
                        $scope.BasicMainGroupList = BasicMainGroupData;
                        var BasicSubGroupList = BasicSubGroupService.GetBasicSubGroupByMainGrpID(0);
                        BasicSubGroupList.then(function (SubGroupData, status, headers, config, error) {
                            $scope.BasicSubGroupList = SubGroupData;
                            var BasicExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectList();
                            BasicExamSubjectList.then(function (SubjectData, status, headers, config, error) {
                                $scope.BasicExamSubjectList = SubjectData;
                                if ($scope.BasicGrpSubject.GrpSubID > 0) {
                                    var BasicGrpSubjectdata = BasicGrpSubjectService.GetBasicGrpSubjectById($scope.BasicGrpSubject.GrpSubID);
                                    BasicGrpSubjectdata.then(function (data) {
                                        $scope.BasicGrpSubject = data[0];
                                        //$scope.BasicGrpSubject.MaxPapaer = data[0]["MaxPaper"];
                                        //$scope.BasicGrpSubject.MinPapaer = data[0]["MinPapaer"];
                                        $scope.DisbaleSubGroup = true;
                                    }, function (SubGroupData, status, headers, config) {
                                        alert(error);
                                    })
                                }
                            }, function (error) {
                                alert(error);
                            });
                        }, function (Subjectdata, status, headers, config) {
                            alert(error);
                        })
                    }, function (BasicMainGroupData, status, headers, config) {
                        alert(error);
                    })
                }, function (BasicBranchData, status, headers, config) {
                    alert(error);
                })
            }, function (BasicExamhData, status, headers, config) {
                alert(error);
            })

        }, function (BasicCourseData, status, headers, config) {
            alert(error);
        })

        $scope.GetBranch = function (CourseID) {
            $scope.DisbaleSubGroup = false;
            FillBranches(CourseID);
            FillExam(CourseID);
        }
        function FillBranches(CourseID) {
            var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(CourseID);
            BasicBranchList.then(function (BasicBranchData, status, headers, config, error) {
                $scope.BasicBranchList = BasicBranchData;
            }, function (BasicBranchData, status, headers, config) {
                alert(error);
            })
        }
        //$scope.GetExam = function (CourseID) {
        //	$scope.DisbaleSubGroup = false;
        //	FillExam(CourseID);
        //}
        function FillExam(CourseID) {
            var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
            BasicExamList.then(function (BasicExamhData, status, headers, config, error) {
                $scope.BasicExamList = BasicExamhData;
            }, function (BasicExamhData, status, headers, config) {
                alert(error);
            })
        }
        $scope.GetMainGroup = function (CourseID, BranchID) {
            $scope.DisbaleSubGroup = false;
            FillMainGroup(CourseID, BranchID);
        }
        function FillMainGroup(CourseID, BranchID) {
            var BasicMainGroupList = BasicGrpSubjectService.GetBasicMainGroupByCourseandBranchID(CourseID, BranchID);
            BasicMainGroupList.then(function (BasicBranchData, status, headers, config, error) {
                $scope.BasicMainGroupList = BasicBranchData;
            }, function (BasicBranchData, status, headers, config) {
                alert(error);
            })
        }
        $scope.GetExamSubject = function (ExamID) {
            $scope.DisbaleSubGroup = false;
            FillExamSubject(ExamID);
        }
        function FillExamSubject(ExamID) {
            var BasicExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectListByExamID(ExamID);
            BasicExamSubjectList.then(function (BasicExamSubjectData, status, headers, config, error) {
                $scope.BasicExamSubjectList = BasicExamSubjectData;
            }, function (BasicExamSubjectData, status, headers, config) {
                alert(error);
            })
        }


        $scope.GetSubGroup = function (MainGrpID) {
            $scope.DisbaleSubGroup = false;
            FillSubGroup(MainGrpID);
        }
        function FillSubGroup(MainGrpID) {
            var BasicSubGroupList = BasicSubGroupService.GetBasicSubGroupByMainGrpID(MainGrpID);
            BasicSubGroupList.then(function (SubGroupData, status, headers, config, error) {
                $scope.BasicSubGroupList = SubGroupData;
            }, function (SubGroupData, status, headers, config) {
                alert(error);
            })
        }

        $scope.SaveBasicGrpSubject = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicGrpSubject.GrpSubID == undefined) { $scope.BasicGrpSubject.GrpSubID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicGrpSubject.GrpSubID == 0) {
                    $scope.BasicGrpSubject.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicGrpSubject.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicGrpSubjectService.PostBasicGrpSubjectInsert($scope.BasicGrpSubject);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicGrpSubject.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicGrpSubjectService.UpdateBasicGrpSubject($scope.BasicGrpSubject)
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicGrpSubject = function () {
            var getData = BasicGrpSubjectService.DeleteBasicGrpSubject($scope.BasicGrpSubject.GrpSubID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            return true;
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Masters.BasicGrpSubjectList');
        }
    });
});
