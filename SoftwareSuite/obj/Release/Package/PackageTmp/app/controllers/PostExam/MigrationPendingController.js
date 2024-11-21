define(['app'], function (app) {
    app.controller("MigrationPendingController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal,$uibModal, $timeout, PreExaminationService) {

        var data = {};
        $scope.$emit('showLoading', data);
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId
        $scope.Certificate= $localStorage.certData.Certificate
        $scope.pin = $localStorage.certData.pin
        $scope.today = new Date();
        $scope.name = "Kodurupaka Raj Kumar";
        $scope.father = "Srinivas";
        //$scope.pin = '13383-MNG-053';
        $scope.BranchYear = "Mining Enginering";
        $scope.Class = "First Class";
        $scope.year = "3";
        $scope.printForm = function () {
            $scope.name = "Kodurupaka Raj Kumar";
            $scope.father = "Srinivas";
            $scope.pin = '13383-MNG-053';
            $scope.BranchYear = "Mining Enginering MAR/APR-2017";
            $scope.Class = "First Class";
            $scope.year = "3";
            setTimeout(function () {
                document.title = 'Migration_Certificate';
                window.print();
                document.title = tempTitle;
            }, 500);
        }
        

        var ApproveList = PreExaminationService.getMigrationPendingDetails($scope.pin);
        ApproveList.then(function (response) {
            var response = JSON.parse(response)
            console.log(response);
            if (response.Table[0].ResponceCode == '200') {
                $scope.$emit('hideLoading', data);
                $scope.StudentData = response.Table1[0];
                $scope.markstable = response.Table2;
             
            } else if (response.Table[0].ResponceCode == '400') {
                $scope.$emit('hideLoading', data);
                alert(response.Table[0].ResponceDescription)
              //  $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            } else {
                $scope.$emit('hideLoading', data);
              //  $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            }
        },
        function (error) {
            //$scope.$emit('hideLoading', data);
            $scope.$emit('hideLoading', data);
            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
            $state.go('Dashboard.PostExam.StudentCertificateApproveList');
        });

        $scope.Approve = function () {

            var ApproveStatus = 1

            var getData = PreExaminationService.MigrationSetApproveStatus($scope.pin, $scope.UserTypeId, ApproveStatus)
            getData.then(function (response) {
                console.log(response)
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    if ($scope.UserTypeId == '1009') {
                        var GetMigrationCertificateTobeSignedlocation = PreExaminationService.GetMigrationCertificateTobeSignedlocation($scope.PIN)
                        GetMigrationCertificateTobeSignedlocation.then(function (response) {
                            $scope.location = response;
                            //if (response != null) {
                            //    var SignPdf = PreExaminationService.SignPdf($scope.PIN, $scope.Certificate, $scope.location,"345646546")
                            //    SignPdf.then(function (response) {
                            //        var sendsmscert = PreExaminationService.sendsmscert($scope.PIN, $scope.Certificate)
                            //        sendsmscert.then(function (response) {
                            //        }, function (err) { });

                            //    }, function (err) { });

                            //}
                        }, function (err) { });
                        alert(response.Table[0].ResponseDescription);
                   
                } else {
                    alert(response.Table[0].ResponseDescription);

                    // $state.go('Dashboard.PostExam.StudentCertificateApproveList');
                }
                    //alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.MigrationApprovalList');
                } else {
                    alert('Failed to Change Status')
                }
            }, function (error) {
                $scope.result = false;
            })
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

            var Approve = PreExaminationService.MigrationSetApproveStatusReject($scope.pin, $scope.UserTypeId, ApproveStatus, remarks);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    var sendsmscert = PreExaminationService.sendsmsMigrationrejectcert($scope.PIN, remarks)
                            sendsmscert.then(function (response) {
                            }, function (err) { });
                    alert(response.Table[0].ResponseDescription)
                    
                  //  $state.go('Dashboard.PostExam.MigrationApprovalList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                   // $state.go('Dashboard.PostExam.MigrationApprovalList');
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