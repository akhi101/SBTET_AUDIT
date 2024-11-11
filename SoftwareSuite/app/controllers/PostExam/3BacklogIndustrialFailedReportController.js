define(['app'], function (app) {
    app.controller("3BacklogIndustrialFailedReportController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService, StudentResultService) {
        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
        $scope.seminfo = [];
        $scope.examtypeinfo = [];
        $scope.pin = "";
        $scope.showData = 0;
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {

                $scope.schemeinfo = data;

            }
        }, function (error) {
            alert("unable to load Schemes");
        });

        $scope.Submit = function (scheme) {
            $scope.Noresult = false
            $scope.loading = true;
            var loadData1 = PreExaminationService.GetIndustrialFailedReport($scope.scheme)
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Noresult = false
                    $scope.loading = false;
                    var datalocation = data[0].file;
                    window.location.href = datalocation;

                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.Noresult = true
                        $scope.loading = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.Noresult = true
                        $scope.loading = false;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                $scope.Noresult = true
                $scope.loading = false;
            });
        }
    })
})