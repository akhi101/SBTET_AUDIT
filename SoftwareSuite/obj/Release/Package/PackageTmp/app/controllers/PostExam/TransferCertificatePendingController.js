define(['app'], function (app) {
    app.controller("TransferCertificatePendingController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        $scope.pin = $localStorage.certData.pin
        $scope.Certificate = $localStorage.certData.Certificate
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        $scope.today = new Date();
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.tcdetails($scope.pin)
        }
        $scope.StudentDetails = [];

        //$scope.generatePdf = function () {
        //    $scope.Institution = "Vijay Rural Enng College";
        //    $scope.Name = "Akhil Kumar Bejjenki";
        //    $scope.PIN = "19001-M-001";
        //    $scope.FatherName = "Sampath kumar";
        //    $scope.DateOfBirth = "13/02/1993";
        //    $scope.class = "3rd Semster";
        //    $scope.Nationality = "Indain";
        //    $scope.Religion = "Hindu";
        //    $scope.Caste = "BC-D";
        //    $scope.Status = "Discontinued";
        //    $scope.FeeStatus = "Totaly Paid";
        //    $scope.Reasonforliving = "Discontinued";
        //    $scope.Dateforiving = "10/10/2019";
        //    $scope.DatewhenapplidforTc = "10/10/2019";
        //    $scope.Conduct = "Good";
        //    $scope.IdentificationMarks = "Amole on the left hand";
        //    $scope.IdentificationMarks1 = "Amole on the righthand";
        //    setTimeout(function () {
        //        document.title = 'Transfer_Certificate';
        //        window.print();
        //        document.title = tempTitle;
        //    }, 500);
        //}

        var data = {};
        $scope.tcdetails = function (pin) {
            $scope.$emit('showLoading', data);
            var tcdetails = PreExaminationService.getTcRequestedDetailsByPin(pin);
            tcdetails.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response.Table[0].ResponceCode == '200') {
                    var data = response.Table1[0];
                    $scope.StudentDetails = data;                 
                    $scope.$emit('hideLoading', data);
                   
                } else {
                    $scope.StudentDetails = [];
                    $scope.$emit('hideLoading', data);
                    alert('data cannot be displayed, something went wrong.');
                }

            },
                function (error) {
                    //$scope.$emit('hideLoading', data);
                    $scope.StudentDetails = [];
                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");
                    $scope.$emit('hideLoading', data);
                });

        }

        //$scope.Approve = function () {
        
        //    var ApproveStatus = 1
            
        //    var getData = PreExaminationService.TcSetApproveStatus($scope.pin, $scope.UserTypeId, ApproveStatus)
        //    getData.then(function (response) {
        //        console.log(response)
        //        var response = JSON.parse(response)
        //        if (response.Table[0].ResponseCode == '200') {
        //            alert(response.Table[0].ResponseDescription)
        //            $state.go('Dashboard.PostExam.TcApprovalList');
        //        } else {
        //            alert('Failed to Change Status')
        //        }
        //    }, function (error) {
        //        $scope.result = false;
        //    })
        //}

        //$scope.Reject = function () {
        //    $scope.modalInstance = $uibModal.open({
        //        templateUrl: "/app/Controllers/PostExam/RejectPopup.html",
        //        size: 'xlg',
        //        scope: $scope,
        //        windowClass: 'modal-fit-att',
        //    });
        //}


        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.Submit = function (remarks) {
            var ApproveStatus = 2

            var Approve = PreExaminationService.TcSetApproveStatusReject($scope.pin, $scope.UserTypeId, ApproveStatus, remarks);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert("Application Rejected Successfully")
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