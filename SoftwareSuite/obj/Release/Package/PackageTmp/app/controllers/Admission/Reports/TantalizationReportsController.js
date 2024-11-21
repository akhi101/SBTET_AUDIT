define(['app'], function (app) {
    app.controller("TantalizationReportsController", function ($scope, $http, $localStorage, $state, AppSettings, AdmissionService) {


        $scope.GetTanatlizationReport = function () {
            var getActiveList = AdmissionService.getTantalizationReport();
            getActiveList.then(function (data) {
                if (data.length > 0) {
                    if (data.length > 4) {
                        $scope.LoadImg = false;
                        $scope.Result = true;
                        var location = data;
                        window.location.href = location;

                    } else {
                        $scope.LoadImg = false;
                        alert("No Data Found");
                    }
                } else {
                    $scope.LoadImg = false;
                    alert("No Data Found");
                }
                //$scope.ResultNotFound = false;
                //$scope.ResultFound = false;



            }, function (error) {
                alert("Something Went Wrong");
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }
    })
})