define(['app'], function (app) {
    app.controller("CcicVerificationCoursesController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmp = $localStorage.TempData;



        const $ctrl = this;
        $ctrl.$onInit = () => {


        }

        var data = {};
        $scope.$emit('showLoading', data);

        var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID

        var verifyreportCount = CcicPreExaminationService.GetInstitutionVerificationReportCount(InstitutionID);
        verifyreportCount.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.VerificationReportCountTable = [];
            if (res.length >= 0) {
                $scope.VerificationReportCountTable = res;
                $scope.$emit('hideLoading', data);
            } else {
                $scope.VerificationReportCountTable = [];
                $scope.$emit('hideLoading', data);
            }
        },
            function (error) {
                //   alert("error while loading Notification");
                var err = JSON.parse(error);
            });


        //$scope.showAdminEnrollmentCount = function (InstitutionID) {
        //    var enrollmentreportCount = CcicPreExaminationService.GetInstitutionEnrollmentReportCount(InstitutionID);
        //    enrollmentreportCount.then(function (response) {
        //        try {
        //            var res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        $scope.EnrollmentReportCountTable = [];
        //        if (res.length >= 0) {
        //            $scope.EnrollmentReportCountTable = res;
        //        } else {
        //            $scope.EnrollmentReportCountTable = [];
        //        }
        //    },
        //        function (error) {
        //            //   alert("error while loading Notification");
        //            var err = JSON.parse(error);
        //        });
        //    /*$state.go('CcicDashboard.Academic.EnrollmentReport');*/



        //}



        $scope.showDetails = function (CourseID, ReportTypeID) {

            $localStorage.TempData2 = {

                CourseID: CourseID,
                ReportTypeID: ReportTypeID,

            };

            $state.go('CcicDashboard.Academic.CcicVerificationData');


        }



    });
});

