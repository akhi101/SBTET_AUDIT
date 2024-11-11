define(['app'], function (app) {
    app.controller("OdcDataController", function ($scope, $http, $localStorage, $state, $stateParams,AppSettings, $uibModal, $timeout, PreExaminationService) {

        $scope.Pin = localStorage.getItem('GenuinePin')
      

        if (($scope.Pin == undefined) || ($scope.Pin == null) || ($scope.Pin == "")) {
                alert("Enter PIN");
                return;
            }else{
            $scope.LoadImg = true;
            $scope.ResultFound = false;
            $scope.ResultNotFound = false;
            var getmemodetails = PreExaminationService.getTranscriptODCDetailsByPin($scope.Pin);
            getmemodetails.then(function (res) {
                try { var response = JSON.parse(res) } catch (err) { }

                if (response.Table[0].ResponceCode == '200') {
                    $scope.ODCstudData = response.Table1[0];
                    $scope.Odcmarkstable = response.Table2;
                    $scope.ResultFound = true;
                    $scope.LoadImg = false;
                    $scope.ResultNotFound = false;
                }
                else {
                    $scope.ODCstudData = [];
                    $scope.Odcmarkstable = [];
                    $scope.ResultFound = false;
                    $scope.LoadImg = false;
                    $scope.ResultNotFound = true;

                }


            }, function (err) {
                $scope.ResultFound = false;
                $scope.LoadImg = false;
                $scope.ResultNotFound = true;

            })

        }

        
    })
})