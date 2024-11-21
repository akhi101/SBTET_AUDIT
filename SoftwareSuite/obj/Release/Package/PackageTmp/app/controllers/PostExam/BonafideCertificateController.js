define(['app'], function (app) {
    app.controller("BonafideCertificateController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {
   
        $scope.pin = $localStorage.certData.pin;
        $scope.Id = $localStorage.certData.Id;
      
        $scope.today = new Date();
        var ApproveList = PreExaminationService.getBonafideData($scope.pin, $scope.Id);
        ApproveList.then(function (response) {
            var response = JSON.parse(response)
            console.log(response);
            if (response.Table[0].ResponceCode == '200') {
                //$scope.$emit('hideLoading', data);
                $scope.StudentData = response.Table1[0];
                $scope.markstable = response.Table2;

            } else if (response.Table[0].ResponceCode == '400') {
                //$scope.$emit('hideLoading', data);
                alert(response.Table[0].ResponceDescription)
                $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            } else {
                //$scope.$emit('hideLoading', data);
                $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            }
        },
        function (error) {
            //$scope.$emit('hideLoading', data);
            //$scope.$emit('hideLoading', data);
            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
            $state.go('Dashboard.PostExam.StudentCertificateApproveList');
        });
    })
})