define(['app'], function (app) {
    app.controller("PreRegisterAdmittedStudentController", function ($scope, $state, $stateParams, AppSettings, PreRegisterAdmittedStudentService) {
        $scope.RegisterAdmittedStudent = { };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var RegisterAdmittedStudentRightsdata = [];
        RegisterAdmittedStudentRightsdata = AppSettings.UserRights;
        $scope.RegisterAdmittedStudent.CheckSSC = true;
        $scope.RegisterAdmittedStudent.CheckEligibility = false;
        $scope.RegisterAdmittedStudent.CollegeID = AppSettings.CollegeID;
        //var AdmNoList = PreRegisterAdmittedStudentService.GetMaxAdmNo();
        //AdmNoList.then(function (AdmNodata, status, headers, config, error) {
        //    $scope.RegisterAdmittedStudent.AdmNo = AdmNodata;
        //}, function (error) {
        //    alert(error);
        //});
        var CourseList = PreRegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
            $scope.CourseList = BasicCoursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = PreRegisterAdmittedStudentService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                var BranchList = PreRegisterAdmittedStudentService.GetBasicBranchListForRegStud(CourseID, AppSettings.CollegeID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveRegisterAdmittedStudent = function () {
            $scope.RollEditDisable = true;
            if ($scope.RegisterAdmittedStudent.CheckSSC == true) {
                $scope.RegisterAdmittedStudent.CheckType = 'S';
            }
            else { $scope.RegisterAdmittedStudent.CheckType = 'E'; }
            var getPromise = PreRegisterAdmittedStudentService.CheckHallTicketNoPresent(AppSettings.AcdYrID, $scope.RegisterAdmittedStudent.SSCHallTicket);
            getPromise.then(function (data) {
                if (data == 1) {
                    alert("Hall Ticket No already present");
                    $scope.RollEditDisable = false;
                    return false;
                } else {
                    if (($scope.RegisterAdmittedStudent.BranchID == undefined) || ($scope.RegisterAdmittedStudent.BranchID == "")) {
                        $scope.RegisterAdmittedStudent.BranchID = 0;
                    }
                    $scope.RegisterAdmittedStudent.CreLoginID = AppSettings.LoggedUserId;
                    $scope.RegisterAdmittedStudent.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.RegisterAdmittedStudent.AcdYrID = AppSettings.AcdYrID;
                    $scope.RegisterAdmittedStudent.checkShedule = true;
                    var getPromise = PreRegisterAdmittedStudentService.PutSSCStudentDetails($scope.RegisterAdmittedStudent);
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
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission');
        }

        $scope.CheckSSC = function () {
            if ($scope.RegisterAdmittedStudent.CheckSSC == true) {
                $scope.RegisterAdmittedStudent.CheckEligibility = false;
            }
            else {
                $scope.RegisterAdmittedStudent.CheckEligibility = true;
            }
        }
        $scope.CheckEligibility = function () {
            if ($scope.RegisterAdmittedStudent.CheckEligibility == true) {
                $scope.RegisterAdmittedStudent.CheckSSC = false;
            }
            else {
                $scope.RegisterAdmittedStudent.CheckSSC = true;
            }
        }
    });
});
