define(['app'], function (app) {
    app.controller("BasicSubjectEquivalenceController", function ($scope, $state, $stateParams, AppSettings, BasicSubjectEquivalenceService, BasicCourseService, BasicExamService, BasicExamSubjectService) {
        $scope.BasicSubjectEquivalence = {};
        $scope.BasicSubjectEquivalence = { SubEqiValenceID: $stateParams.SubEqiValenceID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicSubjectEquivalenceRightsdata = [];
        BasicSubjectEquivalenceRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicSubjectEquivalenceRightsdata.length; i++) {
            if (BasicSubjectEquivalenceRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicSubjectEquivalence.OtherCenterID == 0) {
                    if (BasicSubjectEquivalenceRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicSubjectEquivalenceRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicSubjectEquivalenceRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        //$scope.isupdatableDisable = false;
        //var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        //BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
        //    $scope.BasicDistrictList = DistrictData;
        //}, function (Castdata, status, headers, config) {
        //    alert(error);
        //});
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
        }, function (ExamData, status, headers, config) {
            alert(error);
        })

        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }


        $scope.GetExamSubjectList = function (ExamID) {

            GetOldSyllabusExamSubjectList(ExamID);
            GetEquivalenceSyllabusExamSubjectList(ExamID);
        }
        //$scope.GetOldExamSubjectList = function (ExamID) {
        //$scope.GetEquivalenceExamSubjectList = function (ExamID) {
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            var BasicExamList = BasicExamService.GetBasicExamList();
            BasicExamList.then(function (ExamData, status, headers, config, error) {
                $scope.BasicExamList = ExamData;
                var BasicExamSubjectList = BasicSubjectEquivalenceService.GetBasicExamSubjectListForUpdate();
                BasicExamSubjectList.then(function (BasicExamOldSubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = BasicExamOldSubjectData;
                    var BasicSubjectList = BasicSubjectEquivalenceService.GetBasicExamSubjectListForUpdate();
                    BasicSubjectList.then(function (BasicExamNewSubjectData, status, headers, config, error) {
                        $scope.BasicSubjectList = BasicExamNewSubjectData;
                        if ($scope.BasicSubjectEquivalence.SubEqiValenceID > 0) {
                            var BasicSubjectEquivalencedata = BasicSubjectEquivalenceService.GetBasicSubjectEquivalenceListByID($scope.BasicSubjectEquivalence.SubEqiValenceID);
                            BasicSubjectEquivalencedata.then(function (data) {
                                $scope.BasicSubjectEquivalence = data[0];
                            }, function (error) {
                                alert(error);
                            });
                        }
                    }, function (BasicExamOldSubjectData, status, headers, config) {
                        alert(error);
                    })
                }, function (BasicExamOldSubjectData, status, headers, config) {
                    alert(error);
                })
            }, function (ExamData, status, headers, config) {
                alert(error);
            })
        }, function (CourseData, status, headers, config) {
            alert(error);
        })

        function GetOldSyllabusExamSubjectList(ExamID) {
            if (ExamID != "" || ExamID != undefined) {
                var BasicExamSubjectList = BasicExamSubjectService.GetOldSyllabusExamSubject(ExamID);
                BasicExamSubjectList.then(function (BasicExamSubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = BasicExamSubjectData;
                }, function (BasicExamSubjectData, status, headers, config) {
                    alert(error);
                })
            }
        }
        function GetEquivalenceSyllabusExamSubjectList(ExamID) {
            if (ExamID != "" || ExamID != undefined) {
                var BasicSubjectList = BasicExamSubjectService.GetEquivalenceExamSubject(ExamID);
                BasicSubjectList.then(function (BasicExamSubjectData, status, headers, config, error) {
                    $scope.BasicSubjectList = BasicExamSubjectData;
                }, function (BasicExamSubjectData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.SaveBasicSubjectEquivalence = function () {
            //$scope.isupdatableDisable = true;
            if ($scope.BasicSubjectEquivalence.SubEqiValenceID == undefined) { $scope.BasicSubjectEquivalence.SubEqiValenceID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicSubjectEquivalence.SubEqiValenceID == 0) {
                    $scope.BasicSubjectEquivalence.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicSubjectEquivalence.UpdLoginID = AppSettings.LoggedUserId;

                    var getPromise = BasicSubjectEquivalenceService.AddBasicSubjectEquivalence($scope.BasicSubjectEquivalence);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicSubjectEquivalence.UpdLoginID = AppSettings.LoggedUserId;

                    var getPromise = BasicSubjectEquivalenceService.UpdateBasicSubjectEquivalence($scope.BasicSubjectEquivalence);
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

        function CheckValidation() {
            if (($scope.BasicSubjectEquivalence.CourseID == undefined) || ($scope.BasicSubjectEquivalence.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.BasicSubjectEquivalence.ExamID == undefined) || ($scope.BasicSubjectEquivalence.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            if (($scope.BasicSubjectEquivalence.ExmSubID == undefined) || ($scope.BasicSubjectEquivalence.ExmSubID == "")) {
                alert("Select Subject");
                return false;
            }
            if (($scope.BasicSubjectEquivalence.SubEquID == undefined) || ($scope.BasicSubjectEquivalence.SubEquID == "")) {
                alert("Select Equivalence Subject");
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
            $scope.isupdatableDisable = false;
            $state.go('Masters.SubjectEquivalenceList');
        }


    });

    //});
});
