define(['app'], function (app) {
    app.controller("CcicPaymentProcessController", function ($scope, $state, TwshStudentRegService, $uibModal, PaymentService, $localStorage) {
        $scope.btndisable = true;
        //$scope.allItemsSelected = false;
        var gradeData = $localStorage.gradeDetails;
        $scope.userId = gradeData.userId;
        $scope.gradeId = gradeData.gradeId;
        var getFeeNotPaid = TwshStudentRegService.getFeeNotpaidList($scope.userId, $scope.gradeId);
        getFeeNotPaid.then(function (response) {

            $scope.NotpaidList = response;
        },
            function (error) {
                console.log(error)

            });

        $scope.addData = function (id, ApplicationNumber, feeAmount) {

            return {
                Id: id,
                ApplicationNumber: ApplicationNumber,
                FeeAmount: feeAmount,
            };

        };

        var PaymentStudentList = [];
        $scope.selectEntity = function (data) {

            if (data.isChecked) {
                let list = $scope.addData(data.Id, data.ApplicationNumber, data.FeeAmount);
                PaymentStudentList.push(list);

                var FeeAmount = 0;
                $scope.PaymentStudentList = PaymentStudentList;
                for (i = 0; i < $scope.PaymentStudentList.length; i++) {
                    FeeAmount += parseInt($scope.PaymentStudentList[i].FeeAmount)
                }
                $scope.feeAmount = FeeAmount;
                if ($scope.PaymentStudentList.length > 0) {
                    $scope.btndisable = false;
                } else {
                    $scope.btndisable = true;
                }
            }
            if (!data.isChecked) {
                function arrayRemove(arr, value) {
                    return arr.filter(function (ele) {
                        return ele.Id != value;
                    });
                }
                PaymentStudentList = arrayRemove(PaymentStudentList, data.Id, data.ApplicationNumber, data.FeeAmount);
                var FeeAmount = 0;
                $scope.PaymentStudentList = PaymentStudentList;
                for (i = 0; i < $scope.PaymentStudentList.length; i++) {
                    FeeAmount += parseInt($scope.PaymentStudentList[i].FeeAmount)
                }
                $scope.feeAmount = FeeAmount;
                if ($scope.PaymentStudentList.length > 0) {
                    $scope.btndisable = false;
                } else {
                    $scope.btndisable = true;
                }
            }
            for (var i = 0; i < $scope.NotpaidList.length; i++) {
                if (!$scope.NotpaidList[i].isChecked) {
                    $scope.allItemsSelected = false;
                    return;
                }
            }


            $scope.allItemsSelected = true;
        };

        $scope.selectAll = function () {
            PaymentStudentList = [];
            for (var i = 0; i < $scope.NotpaidList.length; i++) {
                $scope.NotpaidList[i].isChecked = $scope.allItemsSelected;
                if ($scope.NotpaidList[i].isChecked) {
                    let list = $scope.addData($scope.NotpaidList[i].Id, $scope.NotpaidList[i].ApplicationNumber, $scope.NotpaidList[i].FeeAmount);
                    PaymentStudentList.push(list);


                }
                if (!$scope.NotpaidList[i].isChecked) {
                    function arrayRemove(arr, value) {
                        return arr.filter(function (ele) {
                            return ele.Id != value;
                        });

                    }
                    PaymentStudentList = arrayRemove(PaymentStudentList, $scope.NotpaidList[i].Id, $scope.NotpaidList[i].ApplicationNumber, $scope.NotpaidList[i].FeeAmount);

                }
            }
            $scope.PaymentStudentList = PaymentStudentList;

            var FeeAmount = 0;
            for (i = 0; i < $scope.PaymentStudentList.length; i++) {
                FeeAmount += parseInt($scope.PaymentStudentList[i].FeeAmount)
            }
            $scope.feeAmount = FeeAmount;
            if ($scope.PaymentStudentList.length > 0) {
                $scope.btndisable = false;
            } else {
                $scope.btndisable = true;
            }
        };

        $scope.Proceed = function () {
            $scope.btndisable = true;
            var obj =
            {
                "TotalAmount": $scope.feeAmount,
                "GradeId": $scope.gradeId,
                "ApplicationCount": $scope.PaymentStudentList.length,
                "AppData": $scope.PaymentStudentList
            }


            var postMultiplePayments = TwshStudentRegService.PostMultiplePaymentData(obj);
            postMultiplePayments.then(function (response) {
                // $scope.openModel();

                $scope.btndisable = false;
                var res = JSON.parse(response);
                if (res.respcode == "200") {
                    $scope.AmountPayable = $scope.feeAmount;
                    $scope.AppCount = $scope.PaymentStudentList.length;
                    $scope.ChalanaNo = res.challanaNo;
                    $scope.Paybtndisable = false;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "app/views/TWSH/ChalanDetails.html",
                        size: 'xlg',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                    });

                } else {
                    $scope.StatusMessage = "Server Error!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    $scope.btndisable = false;
                }
            },
                function (error) {
                    $scope.StatusMessage = "Server Error!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    $scope.btndisable = false;
                    console.log(error);

                });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };
        $scope.PayAmount = function (ChalanaNo, AmountPayable) {
            $scope.Paybtndisable = true;
            var marchantid = "TSSBTET"; // test
            var addInfo1 = "";
            var addInfo3 = "";
            var addInfo4 = "";
            var addInfo5 = 2;
            var addInfo6 = "";
            var amount = AmountPayable.toFixed(2);
            var addInfo7 = "";
            var subMarchantid = "TSTWSH"
            $localStorage.redirecturl = "";
            $localStorage.redirecturl = 'TWSH.OnlineApplication';
            var location = window.location.origin;
            if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
                location += "/API/"
            } else {
                location += "/"
            }
            var proceedfinePayment = PaymentService.getHashValue(location + "TwshPayment/BillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, ChalanaNo, amount);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    if ($scope.status = "200") {
                        var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp
                        window.location.replace(req);
                        $scope.Paybtndisable = false;
                    } else {
                        alert('details not found.');
                    }

                }
            }, function (err) {
                alert('Details not found');
                console.log(err);
                $scope.Paybtndisable = false;
            });
        }
    })
})