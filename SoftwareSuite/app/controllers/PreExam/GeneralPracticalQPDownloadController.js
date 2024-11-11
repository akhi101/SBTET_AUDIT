define(['app'], function (app) {
    app.controller("GeneralPracticalQPDownloadController", function ($http, $scope, $filter, $state, $interval, $stateParams, AppSettings, PracticalQPDownloadService) {
        $scope.GeneralPracticalQP = {};
        $scope.GenPractSubList = {};
        $scope.pwd = AppSettings.QPpwd;
        $scope.username = AppSettings.QPUname; 
        $scope.enteredPassword = AppSettings.QPEnPwd; 
        $scope.GeneralPracticalQP.ExmSubID = "0";
        $scope.LoadImg = true;
        var GenPractSubList = PracticalQPDownloadService.getGeneralPracticalSubjects(AppSettings.CollegeID);
        GenPractSubList.then(function (GenPractSubData, status, headers, config, error) {
            $scope.GenPractSubList = GenPractSubData;
            $scope.LoadImg = false;
        }, function (error) {
            alert(error);
            $scope.LoadImg = false;
        });
        $scope.GetGenPractQPDownload = function () {
            if ($scope.GeneralPracticalQP.ExmSubID != undefined && $scope.GeneralPracticalQP.ExmSubID != "" && $scope.GeneralPracticalQP.ExmSubID != "0") {
                document.getElementById('TheForm').submit();
            }
            else {
                alert("Please Select Subject.");
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