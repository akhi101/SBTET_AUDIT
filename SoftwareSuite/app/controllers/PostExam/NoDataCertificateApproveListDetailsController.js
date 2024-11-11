define(['app'], function (app) {
    app.controller("NoDataCertificateApproveListDetailsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {

        $scope.btnDisable = false;
        $scope.MyCheck = false;
        $scope.UserTypeId = $localStorage.authorizationData.SystemUserTypeId;
        $scope.ApproveType = $localStorage.NoCertificateData.ApproveType;
        $scope.Scheme = $localStorage.NoCertificateData.Scheme;
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.Data = false;
        $scope.Nodata = false;
        var PaymentStudent = [];
        var PaymentStudentList = [];

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetApproveListByScheme();
            $scope.btnDisable = false;
        }


        $scope.arrows = true;
        $scope.sortColumn = function (col) {
            $scope.arrows = false;
            $scope.column = col;
            if ($scope.reverse) {
                $scope.reverse = false;
                $scope.reverseclass = 'arrow-up';
            } else {
                $scope.reverse = true;
                $scope.reverseclass = 'arrow-down';
            }
        };

        $scope.openDetails = function (PIN) {
            localStorage.setItem('ApproveId', PIN)
            $state.go('Dashboard.PostExam.CertificateApprovalDetails');
        }

        // remove and change class
        $scope.sortClass = function (col) {
            if ($scope.column == col) {
                if ($scope.reverse) {
                    return 'arrow-down';
                } else {
                    return 'arrow-up';
                }
            } else {
                return '';
            }
        }

        $scope.DownloadtoExcel = function () {
            var CertificateFeePaymentReports = PreExaminationService.CertificateFeePaymentReports($scope.Scheme, $scope.ApproveType);
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

        $scope.GetApproveListByScheme = function () {
            var ApproveList = PreExaminationService.GetNoDataCertificateApprovalDetails($scope.Scheme.toString(), $scope.ApproveType);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response.Table[0].ResponseCode == '200') {
                    if (response.Table1.length > 0) {
                        $scope.$emit('hideLoading', data);

                        $scope.Data = true;
                        $scope.Nodata = false;
                    } else {
                        $scope.$emit('hideLoading', data);
                        $scope.Data = false;
                        $scope.Nodata = true;
                    }
                    PaymentStudent = [];
                    PaymentStudentList = [];
                    $scope.ApprovalDetails = response.Table1;
                } else if (response.Table[0].ResponseCode == '400') {
                    $scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                }
                else {
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
        }


        $scope.Changecheck = function () {

            if ($scope.MyCheck == false) {
                $scope.btnDisable = false;
            } else {
                $scope.btnDisable = true;
            }

        }

        $scope.selectEntity = function (data) {

            $scope.allItemsSelectedthing = false;
            if (data != null) {
                if (!PaymentStudentList.includes(data.PIN)) {
                    dataPay = {};
                    dataPay.PIN = data.PIN
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.PIN);
                }
                else if (PaymentStudentList.includes(data.PIN)) {
                    PaymentStudentList.remByVal(data.PIN);
                    PaymentStudent.remElementByVal(data.PIN);
                    if (PaymentStudentList.length == 0) {
                        $scope.allItemsSelectedthing = false;
                    }
                }

            }
            //console.log(PaymentStudentList)
        };


        Array.prototype.remByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        Array.prototype.remElementByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i].PIN === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }


        //$scope.Approve = function (Pin) {
        //    $scope.Pin = Pin;
        //    $scope.modalInstance = $uibModal.open({
        //        templateUrl: "/app/views/AlertPopup.html",
        //        size: 'xlg',
        //        scope: $scope,
        //        windowClass: 'modal-fit-att',
        //        //backdrop: 'static',
        //    });

        //    $scope.closeModal = function () {
        //        $scope.noteChallan = false;
        //        $scope.modalInstance.close();
        //    }
        //}

        //$scope.Proceed = function (status) {
        //    $scope.Pin;
        //    $scope.Approve = status;
        //    $scope.modalInstance.close();
        //    var ApproveList = PreExaminationService.SetCertificateApproval($scope.Pin, $scope.Approve);
        //    ApproveList.then(function (response) {
        //        try { var response = JSON.parse(response); } catch (err) { }
        //        if (response.Table[0].ResponseCode == '200') {
        //            alert(response.Table[0].ResponseDesc)
        //            $scope.GetApproveListByScheme();
        //        } else if (response.Table[0].ResponseCode == '400') {
        //            alert(response.Table[0].ResponseDesc)
        //            $scope.GetApproveListByScheme();
        //        }
        //        else {
        //            //$scope.$emit('hideLoading', data);
        //            $scope.Data = false;
        //            $scope.Nodata = true;
        //        }

        //    },
        //        function (error) {
        //            //$scope.$emit('hideLoading', data);

        //            $scope.Data = false;
        //            $scope.Nodata = true;
        //            alert("error while loading data");
        //        });
        //}

        $scope.SendToCollege = function (Pin) {

            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.Approve = 2;
                $scope.btndisable = true;
                var Approvedetails = PreExaminationService.SetCertificateApproval(PaymentStudent, ApproveId);
                Approvedetails.then(function (response) {
                    try { var response = JSON.parse(response); } catch (err) { }

                    if (response.Table[0].ResponseCode == '200') {
                        alert('Status Updated Successfully');
                        $scope.btndisable = false;
                        $scope.GetApproveListByScheme();
                    } else {
                        alert('Failed to Approve Status');
                        $scope.GetApproveListByScheme();
                        $scope.btndisable = false;
                    }
                }, function (error) {
                    alert('Failed to Approve Status')
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.btndisable = false;
                    $scope.Noreports = true;
                });
            } else {
                alert('select the pins');
                return;
            }
        }



        $scope.Approve = function () {
            if (PaymentStudent != [] && PaymentStudent != '') {
                var ApproveId = 1;
                $scope.btndisable = true;
                var Approvedetails = PreExaminationService.SetCertificateApproval(PaymentStudent, ApproveId);
                Approvedetails.then(function (response) {
                    try { var response = JSON.parse(response); } catch (err) { }

                    if (response.Table[0].ResponseCode == '200') {
                        alert('Status Updated Successfully');
                        $scope.btndisable = false;
                        $scope.GetApproveListByScheme();
                    } else {
                        alert('Failed to Approve Status');
                        $scope.GetApproveListByScheme();
                        $scope.btndisable = false;
                    }
                }, function (error) {
                    alert('Failed to Approve Status')
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.btndisable = false;
                    $scope.Noreports = true;
                });
            } else {
                alert('select the pins');
                return;
            }
        };


        $scope.Reject = function () {
            if (PaymentStudent != [] && PaymentStudent != '') {
                var Reject = 3;
                $scope.btndisable = true;
                var Rejectdetails = PreExaminationService.SetCertificateApproval(PaymentStudent, Reject);
                Rejectdetails.then(function (response) {
                    try { var response = JSON.parse(response); } catch (err) { }

                    if (response.Table[0].ResponseCode == '200') {
                        alert('Status Updated Successfully');
                        $scope.btndisable = false;
                        $scope.GetApproveListByScheme();
                    } else {
                        $scope.btndisable = false;
                        alert('Failed to Approve Status');
                        $scope.GetApproveListByScheme();
                    }
                },
                    function (error) {
                        console.log(error)
                        alert('Failed to Approve Status')
                        $scope.loading = false;
                        $scope.reports = false;
                        $scope.btndisable = false;
                        $scope.Noreports = true;
                    })
            }
        }

    });
});