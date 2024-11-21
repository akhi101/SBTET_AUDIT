define(['app'], function (app) {
    app.controller("CcicVerificationDataController", function ($scope, $uibModal, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        var tempData2 = $localStorage.TempData2;
        var tmp = $localStorage.TempData;
        $scope.UserName = authData.UserName;

        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.GetVerificationReportData();
            $scope.ShowStudentDetails = false;
            $scope.DataTable = true;
            
            $scope.Clear = false;
        }
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }


        
            $scope.loading = false;
            var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID
            $scope.GetVerificationReportData = function () {

                var verifyreportData = CcicPreExaminationService.GetInstitutionVerificationReportData(InstitutionID, tempData2.CourseID, tempData2.ReportTypeID);
                verifyreportData.then(function (response) {
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
            }
        


        $scope.Close = function () {
            $state.go('CcicDashboard.Academic.VerificationReport')
        }

        
        $scope.ViewStudentDetails = function (AppNo, StdId) {
            //$scope.loading = true;
            $scope.DataTable = false;
            var ViewStudentDetail = CcicPreExaminationService.GetViewStudentDetails(AppNo, StdId);
            ViewStudentDetail.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.ShowStudentDetails = true;
                $scope.DataTable = false;
                $scope.PreviewData = [];
                if (res.length >= 0) {
                    //$scope.loading = false;
                    $scope.PreviewData = res[0];
                    $scope.$emit('hideLoading', data);

                } else {
                    //$scope.loading = false;
                    $scope.PreviewData = [];
                    $scope.$emit('hideLoading', data);
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });



            $scope.Approve = function () {
                $scope.ApproveData = $scope.PreviewData;
                console.log($scope.ApproveData);
                $scope.modalInstance1 = $uibModal.open({
                    templateUrl: "/app/views/CCIC/CcicApprovedPopup.html",
                    size: 'lg',
                    scope: $scope,
                    windowClass: 'modal-fit',
                    backdrop: 'static',
                    keyboard: false
                });

                $scope.closeModal1 = function () {
                    $scope.modalInstance1.close();
                };
            }


            $scope.Revise = function () {
                $scope.ReviseData = $scope.PreviewData;
                $scope.modalInstance2 = $uibModal.open({
                    templateUrl: "/app/views/CCIC/CcicRevisedPopup.html",
                    size: 'lg',
                    scope: $scope,
                    windowClass: 'modal-fit',
                    backdrop: 'static',
                    keyboard: false
                });
                $scope.closeModal2 = function () {
                    $scope.modalInstance2.close();
                };
            }

            $scope.Reject = function () {
                $scope.RejectData = $scope.PreviewData;
                $scope.modalInstance3 = $uibModal.open({
                    templateUrl: "/app/views/CCIC/CcicRejectedPopup.html",
                    size: 'lg',
                    scope: $scope,
                    windowClass: 'modal-fit',
                    backdrop: 'static',
                    keyboard: false
                });
                $scope.closeModal3 = function () {
                    $scope.modalInstance3.close();
                };
            }


        }

    });
});















