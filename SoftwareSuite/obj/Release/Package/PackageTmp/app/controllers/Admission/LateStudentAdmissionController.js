define(['app'], function (app) {
    app.controller("LateStudentAdmissionController", function ($scope, $state, $stateParams, AppSettings, RegisterAdmittedStudentService, LateStudentAdmissionService) {
        $scope.LateStudentAdmission = { LateAdmID: $stateParams.LateAdmID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        LateStudentAdmissiondata = AppSettings.UserRights;
        for (var i = 0; i < LateStudentAdmissiondata.length; i++) {
            if (LateStudentAdmissiondata[i].GridFormToOpen == PageNm) {
                if ($scope.LateStudentAdmission.LateAdmID == 0) {
                    if (LateStudentAdmissiondata[i].isaddable == 'Y') {
                        $scope.RollEditDisable = false;
                    } else {
                        $scope.RollEditDisable = true;
                    }
                    $scope.RollDeleteDisable = true;
                } else {
                    if (LateStudentAdmissiondata[i].isupdatable == 'Y') {
                        $scope.RollEditDisable = false;
                    }
                    else {
                        $scope.RollEditDisable = true;
                    }
                    if (LateStudentAdmissiondata[i].isdeletable == 'Y') {
                        $scope.RollDeleteDisable = false;
                    } else {
                        $scope.RollDeleteDisable = true;
                    }
                }
            }
        }
        var BasicCollegeList = RegisterAdmittedStudentService.GetBasicCollegeList();
        BasicCollegeList.then(function (BasicCollegedata, status, headers, config, error) {
            $scope.CollegeList = BasicCollegedata;
            var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                var ExamList = RegisterAdmittedStudentService.GetBasicExamListAll();
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    if ($scope.LateStudentAdmission.LateAdmID > 0) {
                        var LateStudentAdmissiondata = LateStudentAdmissionService.GetLateStudAdmByID($scope.LateStudentAdmission.LateAdmID);
                        LateStudentAdmissiondata.then(function (data) {
                            $scope.LateStudentAdmission = data[0];
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
            var ExamList = RegisterAdmittedStudentService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveLateStudentAdmission = function () {
            $scope.RollEditDisable = true;
            if ($scope.LateStudentAdmission.LateAdmID == undefined) { $scope.LateStudentAdmission.LateAdmID = 0; }
            if (CheckValidation() == true) {
                if ($scope.LateStudentAdmission.LateAdmID == 0) {
                    $scope.LateStudentAdmission.CreLoginID = AppSettings.LoggedUserId;
                    $scope.LateStudentAdmission.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = LateStudentAdmissionService.AddLateStudentAdmission($scope.LateStudentAdmission);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.RollEditDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.LateStudentAdmission.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = LateStudentAdmissionService.UpdateLateStudentAdmission($scope.LateStudentAdmission);
                    getPromise.then(function (msg) {
                        alert("Updated successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.RollEditDisable = false;
                        alert(error);
                    });
                }
            } else {
                $scope.RollEditDisable = false;
            }
        }
        $scope.DeleteLateStudentAdmission = function () {
            var getData = LateStudentAdmissionService.DeleteLateStudentAdmission($scope.LateStudentAdmission.LateAdmID);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.LateStudentAdmission.ExamID == undefined) || ($scope.LateStudentAdmission.ExamID == "")) {
                alert("Select Exam");
                return false;
            }
            if (($scope.LateStudentAdmission.CourseID == undefined) || ($scope.LateStudentAdmission.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.LateStudentAdmission.SSCHallTicket == undefined) || ($scope.LateStudentAdmission.SSCHallTicket == "")) {
                alert("Enter SSCHallTicket");
                return false;
            }
            if (($scope.LateStudentAdmission.AdmType == undefined) || ($scope.LateStudentAdmission.AdmType == "")) {
                alert("Select Student Type");
                return false;
            }
            if (($scope.LateStudentAdmission.StudName == undefined) || ($scope.LateStudentAdmission.StudName == "")) {
                alert("Enter Student Name");
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
            $state.go('Admission.LateStudentAdmissionList');
        }
    });
});
