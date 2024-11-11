define(['app'], function (app) {
    app.controller("ViewCandidateDetailsController", function ($scope, $uibModal, $localStorage, $state, CbtStudentRegService) {


        $scope.UserName = 'ADMIN';
        var tempData1 = $localStorage.TempData1;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            var ViewCandidateDetail = CbtStudentRegService.GetViewCandidateDetails(tempData1.ApplicationNumber, tempData1.CandidateID, 0);
            ViewCandidateDetail.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                $scope.PreviewData = [];
                if (res.length >= 0) {
                    $scope.loading = false;
                    $scope.PreviewData = res[0].Data;
                    $scope.PreviewData1 = JSON.parse($scope.PreviewData)
                    $scope.PreviewData = $scope.PreviewData1.Table[0];
                    $scope.imagesrc = $scope.PreviewData.PhotoPath;
                    $scope.imagesrc1 = $scope.PreviewData.Qualification1;
                    $scope.imagesrc2 = $scope.PreviewData.Qualification2;
                    $scope.Aadhaar = JSON.parse(res[0].Aadhar);
                    $scope.maskedAadhaar = $scope.Aadhaar.slice(0, 8).replace(/[0-9]/g, "X") + $scope.Aadhaar.slice(-4);
                    $scope.$emit('hideLoading', data);

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
        }

        var data = {};
        $scope.$emit('showLoading', data);

        $scope.Close = function () {
            $state.go('index.TestingCBTPAGE')
        }
        $scope.loading = true;
        





        $scope.Modify = function () {
            var ApplicationNumber = tempData1.ApplicationNumber;
            var CandidateID = tempData1.CandidateID;
            $localStorage = {
                ApplicationNumber: ApplicationNumber,
                CandidateID: CandidateID
            }
            $state.go('index.EditCandidateDetails');
        }


        $scope.SubmitStdDetails = function () {
            var submitstddetails = CcicPreExaminationService.SubmitStdDetails(tempData1.ApplicationNumber, tempData1.CandidateId);
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

        $scope.openImage = function (imagesrc) {
            $scope.img = imagesrc;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "app/views/CBT/Popups/ViewDocument.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',

            });

        }


    });
});















