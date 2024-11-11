define(['app'], function (app) {
    app.controller("NameCorrectionApproveListController", function ($scope, $http, $localStorage, $uibModal, $state, AppSettings, PreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.Data = false;
        $scope.Nodata = false;

        var ApproveList = PreExaminationService.GetNameCorrectionApproveList($scope.UserTypeId);
        ApproveList.then(function (response) {
            var response = JSON.parse(response)
            console.log(response);
            if (response.Table.length > 0) {
                $scope.$emit('hideLoading', data);

                $scope.Data = true;
                $scope.Nodata = false;
                $scope.ApprovalData = response.Table;
                var ApprovalPending = 0
                var Approved = 0;
                var SentToCollege = 0;
                var Rejected = 0;

                for (var i = 0; i < response.Table.length; i++) {
                    if (response.Table[i].ApprovalPending != null)
                        ApprovalPending = ApprovalPending + response.Table[i].ApprovalPending;
                    if (response.Table[i].Approved != null)
                        Approved = Approved + response.Table[i].Approved;
                    if (response.Table[i].SentToCollege != null)
                        SentToCollege = SentToCollege + response.Table[i].SentToCollege;
                    if (response.Table[i].Rejected != null)
                        Rejected = Rejected + response.Table[i].Rejected;

                }

                $scope.ApprovalPending = ApprovalPending;
                $scope.Approved = Approved;
                $scope.SentToCollege = SentToCollege;
                $scope.Rejected = Rejected;
            } else {
                $scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
            }

            $scope.DownloadtoExcel = function () {
                var CertificateFeePaymentReports = PreExaminationService.CertificateFeePaymentReports($scope.Scheme);
                CertificateFeePaymentReports.then(function (res) {

                    if (res.length > 0) {
                        if (res.length > 4) {
                            window.location.href = res;
                        } else {
                            alert("No Excel Report Present")
                        }
                    } else {
                        alert("No Report Present")
                    }
                }, function (err) {
                    $scope.LoadImg = false;
                    alert("Error while loading");
                });

            }


        },
        function (error) {
            $scope.$emit('hideLoading', data);

            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });

        $scope.ApprovePending = function (Scheme, count) {
            if (count >= 1) {
                $scope.ApproveType = 0;
                //localStorage.setItem('ApproveType', $scope.ApproveType)
                $localStorage.CertificateData = {
                    ApproveType: $scope.ApproveType,
                    Scheme: Scheme
                }

                $state.go('Dashboard.PostExam.NameCorrectionApproveListDetails');
            }
        }
        $scope.ApprovedList = function (Scheme, count) {
            if (count >= 1) {
                $scope.ApproveType = 1;
                $localStorage.CertificateData = {
                    ApproveType: $scope.ApproveType,
                    Scheme: Scheme
                }
                $state.go('Dashboard.PostExam.NameCorrectionApproveListDetails');
            }
        }

        $scope.SendToCollege = function (Scheme) {
            $scope.ApproveType = 2;
            $localStorage.CertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }
            $state.go('Dashboard.PostExam.NameCorrectionApproveListDetails');
        }
        $scope.RejectedList = function (Scheme, count) {
            if (count >= 1) {
                $scope.ApproveType = 2;
                $localStorage.CertificateData = {
                    ApproveType: $scope.ApproveType,
                    Scheme: Scheme
                }
                $state.go('Dashboard.PostExam.NameCorrectionApproveListDetails');
            }
        }


    })
})