define(['app'], function (app) {
    app.controller("ExamFormGenerationController", function ($scope, $state, $stateParams, AppSettings, ExamFormGenerationService, BasicExamInstanceService, BasicCourseService, BasicExamService, BasicCollegeService, ExamFormsApprovalService) {
        $scope.ExamFormGeneration = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExamFormGenerationRightsdata = [];
        ExamFormGenerationRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormGenerationRightsdata.length; i++) {
            if (ExamFormGenerationRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormGeneration.CoGradeID == 0) {
                    if (ExamFormGenerationRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormGenerationRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormGenerationRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.ForBoardDisable = true;
        if (AppSettings.CollegeID == 0) {
            $scope.ForBoardDisable = false;
            var DistrictList = ExamFormsApprovalService.GetDistrictListByStateID(1);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        } else {
            $scope.ExamFormGeneration.CollegeID = AppSettings.CollegeID;
        }
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID != null) && (DistrictID != undefined) && (DistrictID != "")) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                $scope.CollegeList = [];
                $scope.MandalList = [];
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;
                var MandalList = ExamFormsApprovalService.GetMandalListByDistrict(DistrictID);
                MandalList.then(function (MandalListdata, status, headers, config, error) {
                    $scope.MandalList = MandalListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollege = function (MandalID) {
            if ((MandalID != null) && (MandalID != undefined) && (MandalID != "")) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                $scope.CollegeList = [];
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormGeneration.DistrictID, MandalID);
                CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    if (CollegeListdata.length == 0) {
                        $scope.CollegeList = [];
                        alert("There is no college in this mandal");
                        return;
                    } else {
                        $scope.CollegeList = CollegeListdata;
                        $scope.GovtColEnroll.CollegeID = "";
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollData = function (CollegeID) {
            if ((CollegeID != null) && (CollegeID != undefined) && (CollegeID != "")) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.ExamFormGeneration.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.BasicCourseList = BasicCoursedata;
                    var ExamList = ExamFormsApprovalService.GetBasicExamList($scope.BasicCourseList[0].CourseID, AppSettings.AcdYrID);
                    ExamList.then(function (BasicExamdata, status, headers, config, error) {
                        $scope.ExamList = BasicExamdata;
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }
        var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(0);
        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
            $scope.BasicCourseList = BasicCoursedata;
        }, function (error) {
            alert(error);
            });
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.BasicCourseList = BasicCoursedata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsApprovalService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
       if ($scope.ExamFormGeneration.CoGradeID > 0) {
            var ExamFormGenerationdata = ExamFormGenerationService.GetExamFormGenerationListByID($scope.ExamFormGeneration.CoGradeID);
            ExamFormGenerationdata.then(function (data) {
                $scope.ExamFormGeneration = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetGenerateExamForm = function () {
            $scope.isupdatableDisable = true;
            if ($scope.ExamFormGeneration.CoGradeID == undefined) { $scope.ExamFormGeneration.CoGradeID = 0; }
            if (CheckValidation() == true) {
                if ($scope.ExamFormGeneration.CoGradeID == 0) {
                    $scope.ExamFormGeneration.AcdYrID = AppSettings.AcdYrID;
                    $scope.ExamFormGeneration.CreLoginID = AppSettings.LoggedUserId;
                    $scope.ExamFormGeneration.UpdLoginID = AppSettings.LoggedUserId;

                    if (($scope.ExamFormGeneration.CollegeID == undefined) || ($scope.ExamFormGeneration.CollegeID == "")) { $scope.ExamFormGeneration.CollegeID = 0; }
                    if (($scope.ExamFormGeneration.DistrictID == undefined) || ($scope.ExamFormGeneration.DistrictID == "")) { $scope.ExamFormGeneration.DistrictID = 0; }

                    var ExamFormGenerationdata = ExamFormGenerationService.GetGenerateExamForms($scope.ExamFormGeneration);
                    ExamFormGenerationdata.then(function (StudentData) {
                        alert("Exam Forms Generated Successfully!!");
                        RedirectToListPage();
                        //for (var i = 0; i < StudentData.length;i++ ){
                         
                        //}
                        $scope.ExamFormGeneration = StudentData;
                    }, function (error) {
                        alert(error);
                    });
                }
                else {
                    $scope.ExamFormGeneration.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = ExamFormGenerationService.UpdateExamFormGeneration($scope.ExamFormGeneration);
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
        $scope.DeleteExamFormGeneration = function () {
            var getData = ExamFormGenerationService.DeleteExamFormGeneration($scope.ExamFormGeneration.CoGradeID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            //if (($scope.ExamFormGeneration.GrdName == undefined) || ($scope.ExamFormGeneration.GrdName == "")) {
            //    alert("Enter Stream Grade Name");
            //    return false;
            //}
            //else {
            return true;
            //}
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Exam');
        }
    });
});
