define(['app'], function (app) {
    app.controller("TwoYearsOdcReportController", function ($scope, $http, $window, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {




        var ApproveList = PreExaminationService.GetScheme();
        ApproveList.then(function (response) {


            $scope.Schemes = response.Table;

        },
            function (error) {
                //$scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });



      

        $scope.DownloadtoExcel = function () {
            $scope.loading = true;
            //if ($scope.Scheme == null || $scope.Scheme == "" || $scope.Scheme == undefined) {
            //    alert("Please select scheme")
            //    return
            //}
            if ($scope.FromDate == null || $scope.FromDate == "" || $scope.FromDate == undefined) {
                alert("Please Enter From Date")
                return
            }
            if ($scope.ToDate == null || $scope.ToDate == "" || $scope.FromDate == undefined) {
                alert("Please Enter To Date")
                return
            }
            var fromdate = moment($scope.FromDate).format("YYYY-MM-DD");
            var todate = moment($scope.ToDate).format("YYYY-MM-DD");
            var CertificateFeePaymentReports = PreExaminationService.GetTwoYearsOdcData(fromdate, todate);
            CertificateFeePaymentReports.then(function (res) {
                var response = JSON.parse(res);
                console.log(response)
                if (response[0].ResponceCode == '200') {
                    $scope.loading = false;
                 
                    var location = response[0].file;
                    window.location.href = location;
                    $scope.Error1 = false;
                    $scope.Noresult = false;
                } else if (response[0].ResponceCode == '400') {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = false;
                    $scope.Error1 = true;
                    $scope.ErrMsg1 = response[0].ResponceDescription;
                    alert($scope.ErrMsg1)
                } else {
                    $scope.loading = false;
                    $scope.Data = false
                    alert("No Data Found");
                    $scope.Noresult = true;
                    $scope.Error1 = false;

                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        }
    })
})