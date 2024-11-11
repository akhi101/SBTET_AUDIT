define(['app'], function (app) {
    app.controller("S2sTransactionReportsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {
        var DataTypeId = 1;
        var StudentTypeId = 1;
        var StartDate = '01-11-2019';
        var StartDate = '13-11-2019';
        var GetTransaction = PreExaminationService.GetS2SPaymentReports(DataTypeId, StudentTypeId, StartDate, EndDate);
        GetTransaction.then(function (response) {
            console.log(response)
        }, function (err) {
         //   $scope.isShowResults = false;
            console.log(err);
        });
    })
})