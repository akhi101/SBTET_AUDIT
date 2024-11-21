define(['app'], function (app) {
    app.controller("PreparationofResultsController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicExamService, BasicCourseService, BasicCollegeService, BasicDistrictsService) {
        $scope.PreparationofResults = {};
        $scope.PreparationofResults.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreparationofResultsRightsdata = [];
        PreparationofResultsRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreparationofResultsRightsdata.length; i++) {
            if (PreparationofResultsRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreparationofResults.OtherCenterID == 0) {
                    if (PreparationofResultsRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreparationofResultsRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreparationofResultsRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.isupdatableDisable = false;
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
        }, function (ExamData, status, headers, config) {
            alert(error);
            })
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByCode();
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });
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
        $scope.GetCollegeList = function () {
            if ($scope.PreparationofResults.ExamID != "" || $scope.PreparationofResults.ExamID != undefined) {
                if ($scope.PreparationofResults.DistrictID != "" || $scope.PreparationofResults.DistrictID != undefined) {
                    var BasicCollegeList = BasicCollegeService.GetCollegeListByExamId($scope.PreparationofResults.ExamID, AppSettings.ExamInstID, $scope.PreparationofResults.DistrictID);
                    BasicCollegeList.then(function (BasicCollegeData, status, headers, config, error) {
                        $scope.BasicCollegeList = BasicCollegeData;
                    }, function (BasicCollegeData, status, headers, config) {
                        alert(error);
                    })
                }
            }
        }
        $scope.PreparationofResultsProcess = function () {
            $scope.isupdatableDisable = true;
            if (CheckValidation() == true) {
                $scope.PreparationofResults.EaxamID = $scope.PreparationofResults.ExamID;
                $scope.PreparationofResults.ExamInstID = AppSettings.ExamInstID;
                $scope.PreparationofResults.CourseID = $scope.PreparationofResults.CourseID;
                $scope.PreparationofResults.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreZoneCenterService.PreparationofResultsProcess($scope.PreparationofResults);
                getPromise.then(function (msg) {
                    alert("Process Done successfully!!");
                    RedirectToListPage();
                }, function (error) {
                    $scope.isupdatableDisable = false;
                    alert(error);
                });
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        function CheckValidation() {
            if (($scope.PreparationofResults.CourseID == undefined) || ($scope.PreparationofResults.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.PreparationofResults.ExamID == undefined) || ($scope.PreparationofResults.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            if (($scope.PreparationofResults.CollegeID == undefined) || ($scope.PreparationofResults.CollegeID == "")) {
                alert("Select College");
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
            $state.go('PreExam');
        }
    });
});
