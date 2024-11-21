define(['app'], function (app) {
    app.controller("VocationalPracticalQPDownloadController", function ($http, $scope, $filter, $state, $interval, $stateParams, AppSettings, PracticalQPDownloadService) {
        $scope.VocationalPracticalQP = {};
        //$scope.GenPractSubList = {};
        $scope.CourseList = {};
        $scope.SubjectList = {};
        $scope.pwd = AppSettings.QPpwd;
        $scope.username = AppSettings.QPUname;
        $scope.enteredPassword = AppSettings.QPEnPwd;
        $scope.VocationalPracticalQP.ExamID = "0";
        $scope.VocationalPracticalQP.MainGrpID = "0";
        $scope.VocationalPracticalQP.ExmSubID = "0";
        $scope.LoadImg = false;

        var getExamList = PracticalQPDownloadService.getExamList(AppSettings.CollegeID);
        getExamList.then(function (results, status, headers, config, error) {
            $scope.ExamList = results;
        }, function (error) {
            alert(error);
        });

        $scope.GetCourseList = function () {
            if ($scope.VocationalPracticalQP.ExamID != undefined && $scope.VocationalPracticalQP.ExamID != "" && $scope.VocationalPracticalQP.ExamID != "0") {
                var getAllVocationalCourses = PracticalQPDownloadService.getVocationalCourses($scope.VocationalPracticalQP.ExamID, 0);
                getAllVocationalCourses.then(function (results, status, headers, config, error) {
                    $scope.CourseList = results;
                    $scope.VocationalPracticalQP.MainGrpID = "0";
                    $scope.VocationalPracticalQP.ExmSubID = "0";
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.CourseList = {};
                $scope.SubjectList = {};
                $scope.VocationalPracticalQP.MainGrpID = "0";
                $scope.VocationalPracticalQP.ExmSubID = "0";
                return;
            }
        }
        $scope.GetSubjectList = function () {
            if ($scope.VocationalPracticalQP.MainGrpID != undefined && $scope.VocationalPracticalQP.MainGrpID != "" && $scope.VocationalPracticalQP.MainGrpID != "0") {
                var getAllVocationalCourses = PracticalQPDownloadService.getVocationalCourses($scope.VocationalPracticalQP.ExamID, $scope.VocationalPracticalQP.MainGrpID);
                getAllVocationalCourses.then(function (results, status, headers, config, error) {
                    $scope.SubjectList = results;
                    $scope.VocationalPracticalQP.ExmSubID = "0";
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.VocationalPracticalQP.ExmSubID = "0";
                $scope.SubjectList = {};
                return;
            }
        }
       
        $scope.GetVocPractQPDownload = function () {
            if ($scope.VocationalPracticalQP.MainGrpID != undefined && $scope.VocationalPracticalQP.MainGrpID != "" && $scope.VocationalPracticalQP.MainGrpID != "0") {
                document.getElementById('TheForm').submit();
            }
            else {
                alert("Please Select Course.");
                return;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('PreExam');
        }
    });
});