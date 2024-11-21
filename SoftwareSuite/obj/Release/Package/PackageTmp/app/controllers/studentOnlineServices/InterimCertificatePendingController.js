//import { isUndefined } from "../../../scripts/pdfmake"

define(['app'], function (app) {
    app.controller("InterimCertificatePendingController", function ($scope, $http, $localStorage, $state, $stateParams,DigitalSignatureService,$uibModal, AppSettings, PreExaminationService) {
        var data = {};
        $scope.$emit('showLoading', data);
        try {
            $scope.Certificate = $localStorage.certData.Certificate
            $scope.PIN = $localStorage.certData.pin

        } catch (err) {
        }
        
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId
        //$scope.pin='19001-m-005'
        $scope.today = new Date();
        // $scope.name = "Banadari Santhosh";
        $scope.father = "Srinivas";
        $scope.pin = '16047-AA-057';
        $scope.Branch = "Mining Enginering"
        $scope.Year = "MAR/APR-2017";
        $scope.CollegeName = "SANA POLYTECHNIC, KODADA";
        $scope.Class = "FirstClass";
        $scope.passed = "Passed";
        $scope.no = '3';
        $scope.Duration = "Two Months";

        DigitalSignatureService.GetUserCertificates().then(
            function (res) {
                if (res.length > 0) {
                    $scope.UserCertificates = res;
                }
                //else {
                //    alert("Link Digital signature certificate.");
                //}
            }, function (error) {
                console.log(error);
                $scope.data = false;
                $scope.error = true;
            });

        var ApproveList = PreExaminationService.getInterimPendingDetails($scope.PIN);
        ApproveList.then(function (response) {
            var response = JSON.parse(response);
           
            if (response.Table[0].ResponceCode == '200') {
                $scope.StudentData = response.Table1[0];
                $scope.markstable = response.Table2;
                $scope.$emit('hideLoading', data);
                $scope.Data = true
            } else if (response.Table[0].ResponceCode == '400') {
                $scope.$emit('hideLoading', data);
                $scope.Data = false
                alert(response.Table[0].ResponceDescription)
              //  $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            } else {
                $scope.$emit('hideLoading', data);
                $scope.Data = false
             //   $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            }
        },
        function (error) {
            //$scope.$emit('hideLoading', data);
            $scope.$emit('hideLoading', data);
            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
          //  $state.go('Dashboard.PostExam.StudentCertificateApproveList');
        });

        $scope.rectangles = [];

        $scope.printForm = function () {

            $scope.today = '01-05-2020';
           // $scope.name = "Banadari Santhosh";
            $scope.father = "Srinivas";
            $scope.pin = '19001-M-001';
            $scope.Branch = "Mining Enginering"
            $scope.Year = "MAR/APR-2017";
            $scope.CollegeName = "SANA POLYTECHNIC, KODADA";
            $scope.Class = "FirstClass";
            $scope.passed = "Passed";
            $scope.no = '3';
            $scope.Duration = "Two Months";
            setTimeout(function () {
                document.title = 'Interim_Certificate';
                window.print();
                document.title = tempTitle;
            });
        }


        $scope.Marks = [{
            'examnation': '1 YEAR', 'MaxMarks': "1000", 'MarksSecured': "750", 'Infigures': "185", 'persantage': "25%", 'Inwords': "ONE EIGHT FIVE"
        },
           { 'examnation': 'III semester', 'MaxMarks': "1000", 'MarksSecured': "750", 'Infigures': "185", 'persantage': "25%", 'Inwords': "SEVEN FIVE ZERO" },
            { 'examnation': 'IV semester', 'MaxMarks': "1000", 'MarksSecured': "850", 'Infigures': "750", 'persantage': "100%", 'Inwords': "EIGHT FIVE ZERO" },
            { 'examnation': 'V semester', 'MaxMarks': "1000", 'MarksSecured': "600", 'Infigures': "600", 'persantage': "100%", 'Inwords': "SIX ZERO ZERO" },
            { 'examnation': 'V semester', 'MaxMarks': "1000", 'MarksSecured': "853", 'Infigures': "853", 'persantage': "100%", 'Inwords': "EIGHT FIVE THREE" }

        ]



        $scope.Approve = function () {

            var ApproveStatus = 1

            if ($scope.UserTypeId == '1009') {
                if (angular.isUndefined($scope.UserCertificates) || $scope.UserCertificates[0].SerialNumber == null) {
                    alert('Link the Digital signature to sign the documents');
                    return;
                }
            }

            var getData = PreExaminationService.InterimSetApproveStatus($scope.PIN, $scope.UserTypeId, ApproveStatus)
            getData.then(function (response) {
              
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    if ($scope.UserTypeId == '1009') {                       
                        var GetInterimCertificateTobeSignedlocation = PreExaminationService.GetInterimCertificateTobeSignedlocation($scope.PIN)
                        GetInterimCertificateTobeSignedlocation.then(function (response) {
                            var location = window.location.origin;
                            $scope.location = location + response;
                          //  window.open($scope.location);
                            if (response != null) {
                                var SignPdf = PreExaminationService.SignPdf($scope.PIN, parseInt($scope.Certificate), $scope.location, $scope.UserCertificates[0].SerialNumber)
                                SignPdf.then(function (response) {
                                    $state.go('Dashboard.PostExam.StudentCertificateApproveList');
                                    var sendsmscert = PreExaminationService.sendsmscert($scope.PIN, $scope.Certificate)
                                    sendsmscert.then(function (response) {
                                    }, function (err) { });

                                }, function (err) { });

                            }
                        }, function (err) { });
                        alert(response.Table[0].ResponseDescription);
                    } else {
                        alert(response.Table[0].ResponseDescription);

                         $state.go('Dashboard.PostExam.StudentCertificateApproveList');
                    }
                   
                   
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

            var Approve = PreExaminationService.InterimSetApproveStatusReject($scope.PIN, $scope.UserTypeId, ApproveStatus, remarks);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    var sendsmscert = PreExaminationService.sendsmsrejectcert($scope.PIN, remarks, $scope.Certificate)
                    sendsmscert.then(function (response) {
                        $state.go('Dashboard.PostExam.StudentCertificateApproveList');
                    }, function (err) { });

                   
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
