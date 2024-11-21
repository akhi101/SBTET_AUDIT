define(['app'], function (app) {
    app.controller("DRDCChartSubjectWiseController", function ($scope, $state, AppSettings, DRDCChartService) {
        $scope.DRDCChartSubjectWise = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;

        var CampusList = DRDCChartService.GetPreCampusList(AppSettings.ExamInstID);
        CampusList.then(function (CampusData, status, headers, config, error) {
            $scope.CampusList = CampusData;
        }, function (CampusData, status, headers, config) {
            alert(error);
            })
        $scope.CharHead = "DRDC Chart";
        $scope.Show = function () {
            for (var i = 0; i < $scope.CampusList.length; i++) {
                if ($scope.CampusList[i].CampusID == $scope.DRDCChartSubjetWise.CampusID) {
                    $scope.CharHead = "DRDC Chart For Campus-" + $scope.CampusList[i].CampusName + "";
                }
            }
            if (($scope.DRDCChartSubjetWise.CampusID == "") || ($scope.DRDCChartSubjetWise.CampusID == undefined)) {
                alert("Select Campus");
                return;
            }
            $scope.showChartdata();
        }
        $scope.chartshow = false;
        $scope.ExmCntTotal = 0;
        $scope.showChartdata = function () {
            var SubjectsList = DRDCChartService.GetDRDCChartSubjectWise($scope.DRDCChartSubjetWise.CampusID);
            SubjectsList.then(function (SubjListdata, status, headers, config, error) {
                $scope.DRDCChartdata = SubjListdata;
                $scope.ExmCntTotal = 0;
                for (var i = 0; i < $scope.DRDCChartdata.length; i++) {
                    $scope.ExmCntTotal = parseInt($scope.ExmCntTotal) + parseInt($scope.DRDCChartdata[i].ExmCnt);
                }
                $scope.chartshow = true;
            }, function (error) {
                alert(error);
            });
        }
     });
});