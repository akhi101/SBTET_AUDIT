define(['app'], function (app) {
    app.controller("CertificateApprovalController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {


        var AcademicYearsActive = PreExaminationService.getStudentApprovalList();
        AcademicYearsActive.then(function (response) {
           
            console.log(response);
            if (response.Table.length > 0) {
                $scope.ApprovalList = response.Table;
                $scope.loading = false;
                $scope.reports = true;
                $scope.Noreports = false;
            }else{
                
            }
        },
        function (error) {
            $scope.loading = false;
            $scope.reports = false;
            $scope.Noreports = true;
        })

        $scope.openDetails = function (PIN) {
            localStorage.setItem('ApproveId', PIN)
            $state.go('Dashboard.PostExam.CertificateApprovalDetails');
        }
    })
})