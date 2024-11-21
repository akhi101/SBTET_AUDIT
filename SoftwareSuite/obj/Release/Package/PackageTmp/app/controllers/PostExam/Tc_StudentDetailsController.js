define(['app'], function (app) {
    app.controller("Tc_StudentDetailsController", function ($scope, $http, $localStorage, $uibModal,$state, AppSettings, PreExaminationService) {
        var data = {};
        $scope.$emit('showLoading', data);
       
        $scope.pin = $localStorage.certData.pin
        $scope.Certificate = $localStorage.certData.Certificate
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;

        $scope.Name = "Akhil Kumar Bejjenki";
        $scope.PIN = "16001-M-001";
        $scope.Scheme = "C16";
        $scope.CollegeCode = "001";
        $scope.Mobile = '9123456789';

        var ApproveList = PreExaminationService.getTcDetails($scope.pin);
        ApproveList.then(function (response) {
            var response = JSON.parse(response)
            console.log(response);
          
            $scope.StudentDetails = response.Table[0];
            $scope.$emit('hideLoading', data);
        },
        function (error) {
            //$scope.$emit('hideLoading', data);

            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
            $scope.$emit('hideLoading', data);
        });


        $scope.Approve = function () {
            var ApproveStatus = 1
            var Approve = PreExaminationService.TcSetApproveStatus( $scope.pin, $scope.UserTypeId, ApproveStatus);
                 Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.TcApprovalList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.TcApprovalList');
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
           
            var Approve = PreExaminationService.TcSetApproveStatusReject( $scope.pin, $scope.UserTypeId, ApproveStatus,remarks);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.TcApprovalList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.TcApprovalList');
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