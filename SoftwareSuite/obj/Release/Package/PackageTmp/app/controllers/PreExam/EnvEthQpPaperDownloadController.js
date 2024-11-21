define(['app'], function (app) {
    app.controller("EnvEthQpPaperDownloadController", function ($http, $scope, $filter, $state, $interval, $stateParams, AppSettings, BasicCollegeService) {
        $scope.EnvEthQpPaperDownload = {};
        $scope.BasicCollegeList = {};
        $scope.college_code = "";
        $scope.pwd = AppSettings.QPpwd;
        $scope.username = AppSettings.QPUname; 
        $scope.enteredPassword = AppSettings.QPEnPwd; 
        $scope.CollegeDisable = false;
        $scope.LoadImg = false;
        $scope.EnvEthQpPaperDownload.ExmSubID = "3";
        if (AppSettings.CollegeID != undefined && AppSettings.CollegeID != "" && AppSettings.CollegeID != "0") {
            var BasicCollegeList = BasicCollegeService.GetBasicCollegeList();
            BasicCollegeList.then(function (Collegedata, status, headers, config, error) {
                $scope.BasicCollegeList = Collegedata;
                $scope.EnvEthQpPaperDownload.CollegeID = AppSettings.CollegeID;
                $scope.CollegeDisable = true;
                $scope.GetCollegeCode();
            }, function (error) {
                alert(error);
            });
        }
        else if (AppSettings.DistrictIDs != undefined && AppSettings.DistrictIDs != "" && AppSettings.DistrictIDs != "0") {
            var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(AppSettings.DistrictIDs);
            BasicCollegeList.then(function (Collegedata, status, headers, config, error) {
                $scope.BasicCollegeList = Collegedata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetCollegeCode = function () {
            $scope.college_code = "0";
            $scope.LoadImg = true;
            if (AppSettings.CollegeID > 0) {
                for (var i = 0; i < $scope.BasicCollegeList.length; i++) {
                    if ($scope.BasicCollegeList[i].CollegeID == AppSettings.CollegeID) {
                        $scope.college_code = $scope.BasicCollegeList[i].ColCode;
                        $scope.LoadImg = false;
                        break;
                    }
                }
            }
            else if ($scope.EnvEthQpPaperDownload.CollegeID != "" && $scope.EnvEthQpPaperDownload.CollegeID != undefined && $scope.EnvEthQpPaperDownload.CollegeID != "0") {
                for (var i = 0; i < $scope.BasicCollegeList.length; i++) {
                    if ($scope.BasicCollegeList[i].CollegeID == $scope.EnvEthQpPaperDownload.CollegeID) {
                        $scope.college_code = $scope.BasicCollegeList[i].ColCode;
                        $scope.LoadImg = false;
                        break;
                    }
                }
            }
        }
        $scope.GetEnvEthQpPaperDownload = function () {
            if ($scope.EnvEthQpPaperDownload.CollegeID != undefined && $scope.EnvEthQpPaperDownload.CollegeID != "" && $scope.EnvEthQpPaperDownload.CollegeID != "0") {
                document.getElementById('TheForm').submit();
            }
            else {
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