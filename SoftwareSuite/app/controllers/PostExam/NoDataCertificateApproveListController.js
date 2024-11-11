define(['app'], function (app) {
    app.controller("NoDataCertificateApproveListController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService) {

        var data = {};
        $scope.$emit('showLoading', data);
        $scope.Data = false;
        $scope.Nodata = false;

        var ApproveList = PreExaminationService.GetNoDataCertificateApprovalList();
        ApproveList.then(function (response) {

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

        },
        function (error) {
            $scope.$emit('hideLoading', data);

            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });

        $scope.ApprovePending = function (Scheme) {
            $scope.ApproveType = 0;
            //localStorage.setItem('ApproveType', $scope.ApproveType)
            $localStorage.NoCertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }

            $state.go('Dashboard.PostExam.NoDataCertificateApproveListDetails');
        }
        $scope.ApprovedList = function (Scheme) {
            $scope.ApproveType = 1;
            $localStorage.NoCertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }
            $state.go('Dashboard.PostExam.NoDataCertificateApproveListDetails');
        }

        $scope.SendToCollegeList = function (Scheme) {
            $scope.ApproveType = 2;
            $localStorage.NoCertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }
            $state.go('Dashboard.PostExam.NoDataCertificateApproveListDetails');
        }
        $scope.RejectedList = function (Scheme) {
            $scope.ApproveType = 3;
            $localStorage.NoCertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }
            $state.go('Dashboard.PostExam.NoDataCertificateApproveListDetails');
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

    })
})