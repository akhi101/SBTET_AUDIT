define(['app'], function (app) {
    app.controller("BonafideCertApproveListController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService) {
        var authData = $localStorage.authorizationData;

        $scope.College_Code = authData.College_Code
        $scope.UserTypeId = authData.SystemUserTypeId;
        if ($scope.UserTypeId == 3) {
            let tempBranch = authData.userName.split("_");
            let Branch = tempBranch[0];
            $scope.BranchId = Branch
        } else {
            let Branch = '';
            $scope.BranchId = Branch;
        }


        var data = {};
        $scope.$emit('showLoading', data);
        $scope.Data = false;
        $scope.Nodata = false;

        var ApproveList = PreExaminationService.GetBonafideApprovalList($scope.College_Code, $scope.UserTypeId, $scope.BranchId);
        ApproveList.then(function (response) {
            var response = JSON.parse(response);
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

        $scope.ApprovePending = function (Scheme) {
            $scope.ApproveType = 0;
            //localStorage.setItem('ApproveType', $scope.ApproveType)
            $localStorage.CertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }

            $state.go('Dashboard.StudentServices.BonafideCertApproveListDetails');
        }
        $scope.ApprovedList = function (Scheme) {
            $scope.ApproveType = 1;
            $localStorage.CertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }
            $state.go('Dashboard.StudentServices.BonafideCertApproveListDetails');
        }

        $scope.SendToCollege = function (Scheme) {
            $scope.ApproveType = 2;
            $localStorage.CertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }
            $state.go('Dashboard.StudentServices.BonafideCertApproveListDetails');
        }
        $scope.RejectedList = function (Scheme) {
            $scope.ApproveType = 2;
            $localStorage.CertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }
            $state.go('Dashboard.StudentServices.BonafideCertApproveListDetails');
        }

    })
})