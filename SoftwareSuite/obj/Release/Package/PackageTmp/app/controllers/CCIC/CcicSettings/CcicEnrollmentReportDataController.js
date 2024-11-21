define(['app'], function (app) {
    app.controller("CcicEnrollmentReportDataController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        var tmp = $localStorage.TempData;
        $scope.UserName = authData.UserName;
        $scope.RegisterReportData = false;
        $scope.AdmRegisterReportData = false;
        var tempData2 = $localStorage.TempData2;
        var InstitutionID = authData.InstitutionID;
        const $ctrl = this;
        $ctrl.$onInit = () => {

            /*$scope.GetEnrollmentReportData();*/
            //$scope.ShowStudentDetails = false;
            //$scope.LoadImg = false;
            $scope.Clear = false;
        }

        var data = {};
        $scope.$emit('showLoading', data);


        $scope.loading = true;
        var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID

        var enrollmentreportData = CcicPreExaminationService.GetInstitutionRegisterReportData(InstitutionID, tempData2.CourseID, tempData2.ReportTypeID, tempData2.academicYear, tempData2.batch);
        enrollmentreportData.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.EnrollmentReportDataTable = [];
            if (res.length >= 0) {
                $scope.loading = false;
                $scope.EnrollmentReportDataTable = res;
                $scope.$emit('hideLoading', data);


            } else {
                $scope.loading = false;
                $scope.EnrollmentReportDataTable = [];
                $scope.$emit('hideLoading', data);

            }
        },
            function (error) {
                //   alert("error while loading Notification");
                var err = JSON.parse(error);
            });
        /*  }*/


        $scope.Close = function () {
            $state.go('CcicDashboard.Academic.EnrollmentReport')
        }
      
        //$scope.ViewStudentDetails = function (AppNo, StdId) {
        //    $scope.loading = true;
        //    $scope.DataTable = false;
        //    var ViewStudentDetail = CcicPreExaminationService.GetViewStudentDetails(AppNo, StdId);
        //    ViewStudentDetail.then(function (response) {
              
        //        try {
        //            var res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        $scope.ShowDetails = true;
        //        $scope.DataTable = false;

        //        //if (res[0].Submitted == 'Yes') {
        //        //    $scope.Edit = true;
        //        //    $scope.Submit = true;

        //        //}
        //        //else {
        //        //    $scope.Clear = true;
        //        //}

        //        $scope.PreviewData = [];
        //        if (res.length >= 0) {
        //            $scope.loading = false;
        //            $scope.PreviewData = res[0];
        //            $scope.$emit('hideLoading', data);
                 
        //        } else {
        //            $scope.loading = false;
        //            $scope.PreviewData = [];
        //            $scope.$emit('hideLoading', data);

        //        }
        //    },
        //        function (error) {
        //            //   alert("error while loading Notification");
        //            var err = JSON.parse(error);
        //        });


         


        //    //$scope.modalInstance = $uibModal.open({
        //    //    templateUrl: "/app/views/CCIC/CcicSettings/ViewStdDetailsPopup.html",
        //    //    size: 'lg',
        //    //    scope: $scope,
        //    //    windowClass: 'modal-fit',
        //    //    backdrop: 'static',
        //    //    keyboard: false
        //    //});


        //    //$scope.closeModal = function () {
        //    //    $scope.modalInstance.close();
        //    //};


        //}


        $scope.ViewStudentDetails = function (ApplicationNumber, StudentID, isSubmitted, ApplicationStatus) {

            $localStorage.TempData3 = {
                ApplicationNumber: ApplicationNumber,
                StudentID: StudentID,
                isSubmitted: isSubmitted,
                ApplicationStatus: ApplicationStatus,
                CourseID: tempData2.CourseID


            };

            $state.go('CcicDashboard.Academic.ViewStdDetails');


        }


    
    });
});















