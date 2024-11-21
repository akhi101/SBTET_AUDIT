define(['app'], function (app) {
    app.controller("MarksMemoController", function ($scope, $http, $window, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {

        

        
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

        

        var ApproveLists = PreExaminationService.getExamYearMonths();
        ApproveLists.then(function (response) {
           
           
            $scope.ExamMonthYear = response.Table

        },
        function (error) {
            //$scope.$emit('hideLoading', data);

            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });

        $scope.DownloadtoExcel = function () {
        
            var CertificateFeePaymentReports = PreExaminationService.Memos($scope.Scheme, $scope.ExamMonth, $scope.date);
            CertificateFeePaymentReports.then(function (res) {

                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No Excel Report Present")
                    }
                } else {
                    alert("No Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        }
    })
})