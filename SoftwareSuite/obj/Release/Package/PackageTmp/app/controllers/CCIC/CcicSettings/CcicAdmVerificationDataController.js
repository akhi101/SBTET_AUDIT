define(['app'], function (app) {
    app.controller("CcicAdmVerificationReportDataController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        var tempData2 = $localStorage.TempData2;
        var tmp = $localStorage.TempData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;

        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.ShowStudentDetails = false;
            //$scope.DataTable = true;
            $scope.Clear = false;
        }
        var data = {};
        $scope.$emit('showLoading', data);

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }



        $scope.loading = true;
        var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID
        var verreportData = CcicPreExaminationService.GetInstitutionVerificationReportData(tempData2.AcademicYearID, tempData2.Batch, InstitutionID, tempData2.CourseID, tempData2.ReportTypeID);
        verreportData.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.VerificationReportDataTable = [];
            if (res.length >= 0) {
                $scope.loading = false;
                $scope.VerificationReportDataTable = res;
                $scope.$emit('hideLoading', data);


            } else {
                $scope.loading = false;
                $scope.VerificationReportDataTable = [];
                $scope.$emit('hideLoading', data);

            }
        },
            function (error) {
                //   alert("error while loading Notification");
                var err = JSON.parse(error);
            });






        $scope.Close = function () {
            $state.go('CcicDashboard.Academic.Verification')
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


        //    $scope.Modify = function () {
        //        $scope.loading = true;
        //        var editstddetails = CcicPreExaminationService.GetStudentDetails($scope.ApplicationNumber, $scope.StudentId);
        //        editstddetails.then(function (response) {
        //            try {
        //                var editRes = JSON.parse(response);
        //            }
        //            catch (err) { }
        //            /*$scope.loading = true;*/
        //            $scope.ShowDetails = false;
        //            /*     $scope.Save = false;*/



        //            $scope.loading = false;
        //            $scope.EditData = editRes[0];
        //            $scope.$emit('hideLoading', data);
        //            $scope.coursedetails = true;
        //            $scope.showEducation = true;
        //            $scope.applicationForm = true;
        //            /* $scope.Update = true;*/

        //        }, function (error) {

        //            var err = JSON.parse(error);
        //        });

        //        $scope.ShowDetails = false;
        //        $scope.coursedetails = true;
        //        $scope.Submitted1 = true;
        //        $scope.showEducation = true;
        //        $scope.Submitted2 = true;
        //        $scope.Submitted3 = true;
        //        $scope.applicationForm = true;
        //        $scope.SscForm = true;


        //    }


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


        //$scope.ViewStudentDetails = function (ApplicationNumber, StudentID,ApplicationStatus) {

        //    if (ApplicationStatus == 'Pending') {
        //        $localStorage.TempData3 = {
        //            ApplicationNumber: ApplicationNumber,
        //            StudentID: StudentID,
        //            ApplicationStatus: 1

        //        };

        //        $state.go('CcicDashboard.Academic.ViewStdDetailsVerification');
        //    }
        //    else if (ApplicationStatus == 'Revised') {
        //        $localStorage.TempData3 = {
        //            ApplicationNumber: ApplicationNumber,
        //            StudentID: StudentID,
        //            ApplicationStatus: 2

        //        };

        //        $state.go('CcicDashboard.Academic.ViewStdDetailsVerification');
        //    }
        //    else if (ApplicationStatus == 'Rejected') {
        //        $localStorage.TempData3 = {
        //            ApplicationNumber: ApplicationNumber,
        //            StudentID: StudentID,
        //            ApplicationStatus: 3

        //        };

        //        $state.go('CcicDashboard.Academic.ViewStdDetailsVerification');
        //    }
            


        //}


        $scope.ViewStudentDetails = function (ApplicationNumber, StudentID, Submitted, ApplicationStatus) {

            $localStorage.TempData3 = {
                ApplicationNumber: ApplicationNumber,
                StudentID: StudentID,
                Submitted: Submitted,
                ApplicationStatus: ApplicationStatus


            };

            $state.go('CcicDashboard.Academic.ViewStdDetailsVerification');


        }

    });
});















