define(['app'], function (app) {
    app.controller("PreExmSpelThryController", function ($scope, $state, $stateParams, AppSettings, PreExmSpelThryService) {
        $scope.PreExmSpelThry = { PreExmSplTrID: $stateParams.PreExmSplTrID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreExmSpelThryRightsdata = [];
        PreExmSpelThryRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreExmSpelThryRightsdata.length; i++) {
            if (PreExmSpelThryRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreExmSpelThry.PreExmSplTrID == 0) {
                    if (PreExmSpelThryRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreExmSpelThryRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreExmSpelThryRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.examDisable = true;
        $scope.subDisable = true;
        var CourseList = PreExmSpelThryService.GetBasicCourseList();
        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
            $scope.CourseList = BasicCoursedata;
            var ExamList = PreExmSpelThryService.GetBasicExamListByCourseID(0);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                var ExamList = PreExmSpelThryService.GetBasicExamSubjectList();
                ExamList.then(function (Subjectdata, status, headers, config, error) {
                    $scope.ExmSubList = Subjectdata;
                    if ($scope.PreExmSpelThry.PreExmSplTrID > 0) {
                        var PreExmSpelThrydata = PreExmSpelThryService.GetPreExmSpelThryByID($scope.PreExmSpelThry.PreExmSplTrID);
                        PreExmSpelThrydata.then(function (data) {
                            $scope.PreExmSpelThry = data[0];
                            $("#SpellDate").ejDatePicker({ value: $scope.PreExmSpelThry.SpellDate });
                        }, function (error) {
                            alert(error);
                        });
                    }
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            if ((CourseID != "") && (CourseID != null)) {
                $scope.examDisable = false;
                var ExamList = PreExmSpelThryService.GetBasicExamListByCourseID(CourseID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillSubject = function (ExamID) {
            $scope.ExmSubList = [];
            if ((ExamID != "") && (ExamID != null)) {
                $scope.subDisable = false;
                var ExamList = PreExmSpelThryService.GetBasicExamSubjectListReport($scope.PreExmSpelThry.CourseID, ExamID);
                ExamList.then(function (Subjectdata, status, headers, config, error) {
                    $scope.ExmSubList = Subjectdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $("#SpellDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });
        $scope.SavePreExmSpelThry = function () {
            $scope.isupdatableDisable = true;
            if ($("#SpellDate").val() != "") { $scope.PreExmSpelThry.SpellDate = $("#SpellDate").val(); }
            if ($scope.PreExmSpelThry.PreExmSplTrID == undefined) { $scope.PreExmSpelThry.PreExmSplTrID = 0; }
            $scope.PreExmSpelThry.InstanceID = AppSettings.ExamInstID;
            if ($scope.PreExmSpelThry.PreExmSplTrID == "") { $scope.PreExmSpelThry.PreExmSplTrID = 0; }
            if (CheckValidation() == true) {
                if ($scope.PreExmSpelThry.PreExmSplTrID == 0) {
                    $scope.PreExmSpelThry.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PreExmSpelThry.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreExmSpelThryService.AddPreExmSpelThry($scope.PreExmSpelThry);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.PreExmSpelThry.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreExmSpelThryService.UpdatePreExmSpelThry($scope.PreExmSpelThry);
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
        $scope.DeletePreExmSpelThry = function () {
            var getData = PreExmSpelThryService.DeletePreExmSpelThry($scope.PreExmSpelThry.PreExmSplTrID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.PreExmSpelThry.SpellNo == undefined) || ($scope.PreExmSpelThry.SpellNo == "")) {
                alert("Enter Spell No ");
                return false;
            }
            if (($scope.PreExmSpelThry.SpellDate == undefined) || ($scope.PreExmSpelThry.SpellDate == "")) {
                alert("Select Spell Date");
                return false;
            }
            if (($scope.PreExmSpelThry.ExmSubID == undefined) || ($scope.PreExmSpelThry.ExmSubID == "")) {
                alert("Select Subject");
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
            $state.go('PreExam.PreExmSpelThryList');
        }
    });
});
