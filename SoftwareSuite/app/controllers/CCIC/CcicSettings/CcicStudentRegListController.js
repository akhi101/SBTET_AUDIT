define(['app'], function (app) {
    app.controller("CcicStudentRegListController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        var tempData2 = $localStorage.TempData2;
        var tmp = $localStorage.TempData;
        $scope.UserName = authData.UserName;
       
        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.GetEnrollmentReportData();
            $scope.ShowStudentDetails = false;
            $scope.DataTable = true;
            $scope.LoadImg = false;
            $scope.Clear = false;
        }

        var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID
        $scope.GetEnrollmentReportData = function () {
          
            var enrollmentreportData = CcicPreExaminationService.GetInstitutionEnrollmentReportData(InstitutionID, tempData2.CourseID, tempData2.ReportTypeID);
            enrollmentreportData.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.EnrollmentReportDataTable = [];
                if (res.length >= 0) {
                  
                    $scope.EnrollmentReportDataTable = res;
                   
                } else {
               
                    $scope.EnrollmentReportDataTable = [];
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }


        $scope.Close = function () {
            $state.go('CcicDashboard.Academic.EnrollmentReport')
        }
      
        $scope.ViewStudentDetails = function (AppNo, StdId) {
            $scope.LoadImg = true;
            $scope.DataTable = false;
            var ViewStudentDetail = CcicPreExaminationService.GetViewStudentDetails(AppNo, StdId);
            ViewStudentDetail.then(function (response) {
              
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.ShowStudentDetails = true;
                $scope.DataTable = false;

                if (res[0].Submitted == 'Yes') {
                    $scope.Edit = true;
                    $scope.Submit = true;

                }
                else {
                    $scope.Clear = true;
                }

                $scope.PreviewData = [];
                if (res.length >= 0) {
                    $scope.LoadImg = true;
                    $scope.PreviewData = res[0];
                    $scope.LoadImg = false;
                 
                } else {
                    $scope.LoadImg = false;
                    $scope.PreviewData = [];
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });


            $scope.Modify = function () {
                var editstddetails = CcicPreExaminationService.GetStudentDetails($scope.ApplicationNumber, $scope.StudentId);
                editstddetails.then(function (response) {
                    try {
                        var editRes = JSON.parse(response);
                    }
                    catch (err) { }
                    $scope.LoadImg = true;
                    $scope.ShowDetails = false;
                    /*     $scope.Save = false;*/




                    $scope.EditData = editRes[0];
                    $scope.LoadImg = false;
                    $scope.coursedetails = true;
                    $scope.showEducation = true;
                    $scope.applicationForm = true;
                    /* $scope.Update = true;*/

                }, function (error) {

                    var err = JSON.parse(error);
                });

                $scope.ShowDetails = false;
                $scope.coursedetails = true;
                $scope.Submitted1 = true;
                $scope.showEducation = true;
                $scope.Submitted2 = true;
                $scope.Submitted3 = true;
                $scope.applicationForm = true;
                $scope.SscForm = true;


            }


            //$scope.modalInstance = $uibModal.open({
            //    templateUrl: "/app/views/CCIC/CcicSettings/ViewStdDetailsPopup.html",
            //    size: 'lg',
            //    scope: $scope,
            //    windowClass: 'modal-fit',
            //    backdrop: 'static',
            //    keyboard: false
            //});


            //$scope.closeModal = function () {
            //    $scope.modalInstance.close();
            //};


        }

    });
});















