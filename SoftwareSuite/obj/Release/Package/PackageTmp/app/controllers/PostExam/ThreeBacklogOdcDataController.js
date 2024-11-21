define(['app'], function (app) {
    app.controller("ThreeBacklogOdcDataController", function ($scope, $http, $window, $localStorage, $state, $stateParams, AppSettings, ThreeBacklogOdcDataService, $timeout, PreExaminationService) {

        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.ExamMonth = {
                Id: 2
            }
        }

       
        var ApproveLists = PreExaminationService.getExamYearMonths();
        ApproveLists.then(function (response) {
            $scope.ExamMonthYear = response.Table

        },
            function (error) {             
                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });



        $scope.DownloadtoExcel = function () {
            if (angular.isUndefined($scope.ExamMonth.Id) || $scope.ExamMonth.Id == "" || $scope.ExamMonth.Id == null) {
                alert("select ExamMonth Year");
                return;
            }

            var ThreeBacklogOdcData = ThreeBacklogOdcDataService.ThreeBacklogOdcData($scope.ExamMonth.Id);
            ThreeBacklogOdcData.then(function (res) {
                try { var response = JSON.parse(res) } catch (err) { }           
              
                if (response.Responcecode == '200') {
                    window.location.href = response.data;
                    } else {
                        alert("No Report Present")
                    }               
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        }


    });
});