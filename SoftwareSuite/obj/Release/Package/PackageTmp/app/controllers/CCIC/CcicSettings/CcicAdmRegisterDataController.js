define(['app'], function (app) {
    app.controller("CcicAdmRegisterDataController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        var tmp = $localStorage.TempData;
        var tempData2 = $localStorage.TempData2;
        $scope.UserName = authData.UserName;



        $scope.Institution = tempData2.Institution;
        $scope.Course = tempData2.Course;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            //$scope.ShowStudentDetails = false;
            //$scope.DataTable = true;
            //$scope.LoadImg = false;
            $scope.Clear = false;
        }

        var data = {};
        $scope.$emit('showLoading', data);

     
        $scope.loading = true;

        var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID

            var registerreportData = CcicPreExaminationService.GetAdminRegisterReportData(InstitutionID, tempData2.CourseID, tempData2.ReportTypeID, tmp.academicYear, tmp.batch);
            registerreportData.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.AdmRegisterReportDataTable = [];
                if (res.length >= 0) {
                    $scope.loading = false;
                    $scope.AdmRegisterReportDataTable = res;
                    $scope.$emit('hideLoading', data);


                } else {
                    $scope.loading = false;
                    $scope.AdmRegisterReportDataTable = [];
                    $scope.$emit('hideLoading', data);

                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        


        $scope.Close = function () {
            $state.go('CcicDashboard.Academic.Register')
        }

        //$scope.ViewStudentDetails = function (AppNo, StdId) {
        //    $scope.LoadImg = true;
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
        //            $scope.LoadImg = true;
        //            $scope.PreviewData = res[0];
        //            $scope.LoadImg = false;

        //        } else {
        //            $scope.LoadImg = false;
        //            $scope.PreviewData = [];
        //        }
        //    },
        //        function (error) {
        //            //   alert("error while loading Notification");
        //            var err = JSON.parse(error);
        //        });


        //    $scope.Modify = function () {
        //        var editstddetails = CcicPreExaminationService.GetStudentDetails($scope.ApplicationNumber, $scope.StudentId);
        //        editstddetails.then(function (response) {
        //            try {
        //                var editRes = JSON.parse(response);
        //            }
        //            catch (err) { }
        //            $scope.LoadImg = true;
        //            $scope.ShowDetails = false;
        //            /*     $scope.Save = false;*/




        //            $scope.EditData = editRes[0];
        //            $scope.LoadImg = false;
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


        $scope.ViewStudentDetails = function (ApplicationNumber, StudentID, ApplicationStatus) {

            if (ApplicationStatus == 'Pending') {
                $localStorage.TempData3 = {
                    ApplicationNumber: ApplicationNumber,
                    StudentID: StudentID,
                    ApplicationStatus: 0

                };

                //    $state.go('CcicDashboard.Academic.ViewStdDetailsVerification');
            }

            else if (ApplicationStatus == 'Approved') {
                $localStorage.TempData3 = {
                    ApplicationNumber: ApplicationNumber,
                    StudentID: StudentID,
                    ApplicationStatus: 1

                };

                //    $state.go('CcicDashboard.Academic.ViewStdDetailsVerification');
            }
            else if (ApplicationStatus == 'Revised') {
                $localStorage.TempData3 = {
                    ApplicationNumber: ApplicationNumber,
                    StudentID: StudentID,
                    ApplicationStatus: 2

                };

                //    $state.go('CcicDashboard.Academic.ViewStdDetailsVerification');
            }
            else if (ApplicationStatus == 'Rejected') {
                $localStorage.TempData3 = {
                    ApplicationNumber: ApplicationNumber,
                    StudentID: StudentID,
                    ApplicationStatus: 3

                };

                $state.go('CcicDashboard.Academic.ViewStdDetailsVerification');
            }
            else if (ApplicationStatus == 'Recommended') {
                $localStorage.TempData3 = {
                    ApplicationNumber: ApplicationNumber,
                    StudentID: StudentID,
                    ApplicationStatus: 4

                };

                //    $state.go('CcicDashboard.Academic.ViewStdDetailsVerification');
            }

            $state.go('CcicDashboard.Academic.ViewStuDetails');

        }
    });
});















