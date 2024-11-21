define(['app'], function (app) {
    app.controller("ViewStudentDetailsController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tempData1 = $localStorage.TempData1;
    

        const $ctrl = this;
        $ctrl.$onInit = () => {
           /* $scope.Modify();*/
        }

        var data = {};
        $scope.$emit('showLoading', data);

        $scope.Close = function () {
            $state.go('CcicDashboard.Academic')
        }
        $scope.loading = true;
        var ViewStudentDetail = CcicPreExaminationService.GetViewStudentDetails(tempData1.ApplicationNumber, tempData1.StudentId, tempData1.ApplicationStatus);
        ViewStudentDetail.then(function (response) {

            try {
                var res = JSON.parse(response);
            }
            catch (err) { }


            //if (res[0].Submitted == 'Yes') {
            //    $scope.Edit = true;
            //    $scope.Submit = true;

            //}
            //else {
            //    $scope.Clear = true;
            //}

            $scope.PreviewData = [];
            if (res.Table.length >= 0) {
                $scope.loading = false;
                $scope.PreviewData = res.Table[0];
                $scope.imagesrc = res.Table[0].SSCCertificate;
                $scope.imagesrc1 = res.Table[0].QualificationCertificate;
                $scope.imagesrc2 = res.Table[0].ExperienceCertificate;
                $scope.imagesrc3 = res.Table[0].BlindCertificate;
                //$scope.DateofBirth = $scope.PreviewData.DateofBirth;
                //$scope.maskedAadhaar = $scope.PreviewData.AadharNumber.slice(0, 8).replace(/[0-9]/g, "X") + $scope.PreviewData.AadharNumber.slice(-4);
                $scope.$emit('hideLoading', data);

                if ($scope.PreviewData.IsBlind==false) {
                    $scope.PreviewData.BlindCertificate = '';
                }
            } else {
                $scope.loading = false;
                $scope.PreviewData = [];
                $scope.$emit('hideLoading', data);

            }
        },
            function (error) {
                //   alert("error while loading Notification");
                var err = JSON.parse(error);
            });



        $scope.openImage = function (imagesrc) {
            $scope.img = imagesrc;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "app/views/CCIC/Popups/ViewDocument.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',

            });

        }

        $scope.Modify = function (ApplicationNumber, StudentId) {
            var ApplicationNumber = tempData1.ApplicationNumber;
            var StudentId = tempData1.StudentId;
            $localStorage = {
                ApplicationNumber: ApplicationNumber,
                    StudentId: StudentId
            }
            $state.go('CcicDashboard.Academic.EditStudentDetails');
        }


        $scope.SubmitStdDetails = function () {
            var submitstddetails = CcicPreExaminationService.SubmitStdDetails(tempData1.ApplicationNumber, tempData1.StudentId);
            submitstddetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $state.go('CcicDashboard.Academic.Enrollment');

                }

                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                }

                else {
                    alert('Something Went Wrong')
                }
            }, function (error) {
                var err = JSON.parse(error);
            });
        }




    });
});















