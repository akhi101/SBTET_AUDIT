define(['app'], function (app) {
    app.controller("StudentServicesStatusController", function ($scope, $state, $stateParams, AppSettings, PreExaminationService) {


        var getDatagetCertificates = PreExaminationService.GetCertificateTypes()
        getDatagetCertificates.then(function (response) {

            try {
                var response = JSON.parse(response);
            } catch (err) { }
            $scope.CertificateTypes = response.Table;
            //$scope.CertificateTypes.splice(7, 1);                       
            $scope.Service = false;
        }, function (error) {
            $scope.NoDataFound = true;
            $scope.result = false;
        })

    });
});
