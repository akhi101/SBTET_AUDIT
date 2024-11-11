define(['app'], function (app) {
    app.controller("IC_StudentDetailsController", function ($scope, $http, $localStorage, $uibModal, $state, AppSettings, PreExaminationService) {
        $scope.pin = $localStorage.certData.pin
        $scope.Certificate = $localStorage.certData.Certificate
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;

        var ApproveList = PreExaminationService.getTcDetails($scope.pin, $scope.Certificate);
        ApproveList.then(function (response) {
            var response = JSON.parse(response)
            console.log(response);

            $scope.StudentDetails = response.Table[0];
        },
        function (error) {
            //$scope.$emit('hideLoading', data);

            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });


        $scope.Approve = function () {
            var ApproveStatus = 1
            var Approve = PreExaminationService.InterimSetApproveStatus($scope.Certificate, $scope.pin, $scope.UserTypeId, ApproveStatus);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.StudentCertificateApproveList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.StudentCertificateApproveList');
                }
                else {
                    //$scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                }
                //alert("Success")

            },
            function (error) {
                //$scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });

        }

        $scope.Reject = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/Controllers/PostExam/RejectPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.Submit = function (remarks) {
            var ApproveStatus = 2

            var Approve = PreExaminationService.InterimSetApproveStatusReject($scope.Certificate, $scope.pin, $scope.UserTypeId, ApproveStatus, remarks);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.StudentCertificateApproveList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.StudentCertificateApproveList');
                }
                else {
                    //$scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                }
                //alert("Success")

            },
            function (error) {
                //$scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });

        }

    })
})