define(['app'], function (app) {
    app.controller("CcicAdminEnrollmentReportCountController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;

        const $ctrl = this;
        $ctrl.$onInit = () => {
        

        }




        var adminenrollmentreportCount = CcicPreExaminationService.GetAdminEnrollmentReportCount();
        adminenrollmentreportCount.then(function (Res) {
            //try {
            //    var Res = JSON.parse(response);
            //}
            //catch (err) { }
            $scope.AdminEnrollmentReportCountTable = [];
            if (Res.Table.length >= 0) {
                $scope.AdminEnrollmentReportCountTable = Res.Table;
            } else {
                $scope.AdminEnrollmentReportCountTable = [];
            }
        },
            function (error) {
                //   alert("error while loading Notification");
                var err = JSON.parse(error);
            });



        $scope.showAdminEnrollmentCount = function (InstitutionID) {

            $localStorage.TempData = {
                InstitutionID: InstitutionID,
            };
            $state.go('CcicDashboard.Academic.EnrollmentReport');

        }



      


    });
});















