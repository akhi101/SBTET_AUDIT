define(['app'], function (app) {
    app.controller("CcicTestingExamFeePaymentController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService, CcicPreExaminationService, CcicStudentRegistrationService, $uibModal, PaymentService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        $scope.InstitutionID = authData.InstitutionID;
        $scope.allItemsSelected = false;
        $scope.btndisable = false;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getCcicCurrentAcademicYear();
            $scope.feePaymentType();
        }

        $scope.addData = function (feePaymentDataID, studentID, PIN, feeAmount) {

            return {
                FeePaymentDataID: feePaymentDataID,
                StudentID: studentID,
                PIN: PIN,
                FeeAmount: feeAmount,
            };

        };

         $scope.PaymentList = [];
         $scope.PaymentPins = [];
        $scope.selectEntity = function (data) {
            $scope.allItemsSelected = false;
            if (data != null) {
                if (!$scope.PaymentPins.includes(data.PIN)) {
                    dataPay = {};
                    dataPay.PIN = data.PIN
                    dataPay.StudentID = data.StudentID
                    dataPay.FeePaymentDataID = data.FeePaymentDataID
                    dataPay.FeeAmount = data.FeeAmount
                    $scope.PaymentList.push(dataPay);
                    var FeeAmount=0
                    $scope.PaymentPins.push(data.PIN);
                    for (i = 0; i < $scope.PaymentList.length; i++) {
                       FeeAmount += parseInt($scope.PaymentList[i].FeeAmount)
                    
                    }
                    $scope.FeeAmount = FeeAmount;
                }
                else if ($scope.PaymentPins.includes(data.PIN)) {
                    $scope.PaymentPins.remByVal(data.PIN);
                    $scope.PaymentList.remElementByVal(data.PIN);
                    if ($scope.PaymentPins.length == 0) {
                        $scope.allItemsSelectedthing = false;
                    }
                    var FeeAmount = 0
                    for (i = 0; i < $scope.PaymentList.length; i++) {
                        FeeAmount += parseInt($scope.PaymentList[i].FeeAmount)

                    }
                    $scope.FeeAmount = FeeAmount;
                }
            }
            //console.log($scope.PaymentList)
            //console.log($scope.PaymentPins)

            
            //if (data.isChecked) {
            //    let list = $scope.addData(data.FeePaymentDataID, data.StudentID, data.PIN, data.FeeAmount);
            //    $scope.PaymentPins.push(list);

            //    var FeeAmount = 0;
            //    var PIN = [];
            //    $scope.$scope.PaymentPins = $scope.PaymentPins;
            //    for (i = 0; i < $scope.$scope.PaymentPins.length; i++) {
            //        FeeAmount += parseInt($scope.$scope.PaymentPins[i].FeeAmount)
            //        var obj = {
            //            PIN: $scope.$scope.PaymentPins[i].PIN,
            //        }
            //        PIN.push(obj)
            //    }

            //    $scope.PIN = PIN;
            //    $scope.feeAmount = FeeAmount;
            //    if ($scope.$scope.PaymentPins.length > 0) {
            //        $scope.btndisable = false;
            //    } else {
            //        $scope.btndisable = true;
            //    }
            //}
            //if (!data.isChecked) {
            //    function arrayRemove(arr, value) {
            //        return arr.filter(function (ele) {
            //            return ele.FeePaymentDataID != value;
            //        });
            //    }


            //     New$scope.PaymentPins = arrayRemove($scope.PaymentPins, data.FeePaymentDataID, data.StudentID, data.PIN, data.FeeAmount);
            //    var FeeAmount = 0;
            //    var PIN = []
            //    //var FeePaymentDataID = 0;
            //    $scope.New$scope.PaymentPins = New$scope.PaymentPins;
            //    for (i = 0; i < $scope.New$scope.PaymentPins.length; i++) {
            //        FeeAmount += parseInt($scope.New$scope.PaymentPins[i].FeeAmount)
            //        var obj = {
            //            PIN: $scope.New$scope.PaymentPins[i].PIN,
            //        }
            //        PIN.push(obj)
            //    }
            //    $scope.PIN = PIN;
            //    console.log($scope.PIN)
            //    $scope.feeAmount = FeeAmount;
            //    $scope.FeePaymentDataID = FeePaymentDataID;
            //    if ($scope.New$scope.PaymentPins.length > 0) {
            //        $scope.btndisable = false;
            //    } else {
            //        $scope.btndisable = true;
            //    }
            //}
            //for (var i = 0; i < $scope.ExamPayment.length; i++) {
            //    if (!$scope.ExamPayment[i].isChecked) {
            //        $scope.allItemsSelected = false;
            //        return;
            //    }
            //}


            //$scope.allItemsSelected = true;
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



        //$scope.selectAll = function () {
        //    $scope.PaymentPins = [];
        //    for (var i = 0; i < $scope.ExamPayment.length; i++) {
        //        $scope.ExamPayment[i].isChecked = $scope.allItemsSelected;
        //        if ($scope.ExamPayment[i].isChecked) {
        //            let list = $scope.addData($scope.ExamPayment[i].FeePaymentDataID, $scope.ExamPayment[i].StudentID, $scope.ExamPayment[i].PIN, $scope.ExamPayment[i].FeeAmount);
        //            $scope.PaymentPins.push(list);


        //        }
        //        if (!$scope.ExamPayment[i].isChecked) {
        //            function arrayRemove(arr, value) {
        //                return arr.filter(function (ele) {
        //                    return ele.Id != value;
        //                });

        //            }
        //            $scope.PaymentPins = arrayRemove($scope.PaymentPins, $scope.ExamPayment[i].FeePaymentDataID, $scope.ExamPayment[i].StudentID, $scope.ExamPayment[i].PIN, $scope.ExamPayment[i].FeeAmount);

        //        }
        //    }
        //    $scope.$scope.PaymentPins = $scope.PaymentPins;

        //    var FeeAmount = 0;
        //    var PIN = [];
        //    for (i = 0; i < $scope.$scope.PaymentPins.length; i++) {
        //        FeeAmount += parseInt($scope.$scope.PaymentPins[i].FeeAmount)
        //        var obj = {
        //            PIN: $scope.$scope.PaymentPins[i].PIN,
        //        }
        //        PIN.push(obj)
        //    }
        //    $scope.PIN = PIN;
        //    $scope.feeAmount = FeeAmount;
        //    if ($scope.$scope.PaymentPins.length > 0) {
        //        $scope.btndisable = false;
        //    } else {
        //        $scope.btndisable = true;
        //    }
        //};

        $scope.selectAll = function (val) {
            $scope.PaymentList = [];

            if (val == true) {
                for (var i = 0; i < $scope.ExamPayment.length; i++) {

                    $scope.ExamPayment[i].isChecked = true;
                    if ($scope.ExamPayment[i].isChecked) {
                        dataPay = {};
                        dataPay.PIN = $scope.ExamPayment[i].PIN
                        dataPay.StudentID = $scope.ExamPayment[i].StudentID
                        dataPay.FeePaymentDataID = $scope.ExamPayment[i].FeePaymentDataID
                        dataPay.FeeAmount = $scope.ExamPayment[i].FeeAmount
                        $scope.PaymentList.push(dataPay);
                        $scope.PaymentPins.push($scope.ExamPayment[i].PIN);
                    }
                }
                var FeeAmount = 0
                for (i = 0; i < $scope.PaymentList.length; i++) {
                   FeeAmount += parseInt($scope.PaymentList[i].FeeAmount)

                }
                $scope.FeeAmount = FeeAmount;

            } else {
                for (var i = 0; i < $scope.ExamPayment.length; i++) {
                    $scope.ExamPayment[i].isChecked = false;
                    $scope.PaymentList = [];
                    $scope.PaymentPins = [];
                }
                var FeeAmount = 0
                for (i = 0; i < $scope.PaymentList.length; i++) {
                  FeeAmount += parseInt($scope.PaymentList[i].FeeAmount)

                }
                $scope.FeeAmount = FeeAmount;
            }
            //console.log($scope.PaymentList);
        };

        $scope.Proceed = function () {
            $scope.btndisable = true;
            if ($scope.PaymentList == '' || $scope.PaymentList == undefined || $scope.PaymentList == null) {
                alert('Plese select Pin/s');
                $scope.btndisable = false;
                return;
            }
            var obj =
            {
                "TotalAmount": $scope.feeAmount,
                "ApplicationCount": $scope.PaymentList.length,
                "AppData": $scope.PaymentList
            }

            $scope.AppCount = $scope.PaymentList.length;
            $scope.PINS = $scope.PIN;
            $scope.AmountPayable = $scope.FeeAmount;

            //$scope.AmountPayable = $scope.feeAmount;
            //$scope.AppCount = $scope.$scope.PaymentPins.length;
            //$scope.ChalanaNo = res.challanaNo;
            $scope.Paybtndisable = false;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "app/views/CCIC/Popups/ConfirmStudentDetails.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });



        }



        $scope.Confirm = function () {
            $scope.modalInstance.close();
            $scope.btndisable = true;
            var obj =
            {
                "TotalAmount": $scope.FeeAmount,
                "ApplicationCount": $scope.PaymentList.length,
                "AppData": $scope.PaymentList,
                "AcademicYearID": $scope.AcademicYear,
                "ExamMonthYearID": $scope.ExamMonthYear,
                "FeePaymentTypeID": $scope.FeePaymentType,
                "UserName": $scope.UserName
            }


            var postMultiplePayments = CcicStudentRegistrationService.PostMultiplePaymentData(obj);
            postMultiplePayments.then(function (response) {
                // $scope.openModel();

                $scope.btndisable = false;
                //var res = JSON.parse(response);
                if (response.Table[0].StatusCode == "200") {
                    $scope.AmountPayable = response.Table[0].Amount;
                    $scope.AppCount = response.Table[0].ApplicationCount;
                    $scope.ChallanNumber = response.Table[0].ChallanNumber;
                    $scope.FeeType = response.Table[0].FeeType;
                    $scope.Paybtndisable = false;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "app/views/CCIC/Popups/ChalanDetails.html",
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
                    //console.log(error);

                });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
            $scope.btndisable = false;
        };



        $scope.PayAmount = function () {
            $scope.paymentbtn = true;
            $scope.noteChallan = false;
            $scope.secondClick = false;
            //var marchantid = "TSSBTET"; // live
            var marchantid = "TSSBTET"; // test

            var addInfo1 = $scope.UserName;
            var addInfo3 = $scope.FeeType;//PaymentType;
            var addInfo4 = "BULK";
            //var addInfo5 = "NA";//Semester;
            var addInfo6 = "NA";
            var addInfo7 = "NA";
            var amount = $scope.AmountPayable;
            if ($scope.FeePaymentType == 1) {
                addInfo5 = "REGULAR"
            }
            else if ($scope.FeePaymentType == 2) {
                addInfo5 = "BACKLOG"
            }
            else if ($scope.FeePaymentType == 3) {
                addInfo5 = "REGISTRATION"
            }
            

            var subMarchantid = "TSCCIC";
            $localStorage.CcicPaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "CcicDashboard.PreExamination.TesTingFeePayment"
            }
            $localStorage.CcicPaymentGatewayResponse = redirecturl;

            var location = window.location.origin;


            PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.ChallanNumber, amount, 0, "json");
            var proceedfinePayment = PaymentService.getSomeValue(location + "/Payment/BulkBillResponse", $scope.ChallanNumber);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                    //   var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                //console.log(err);
            });
        }



        $scope.ChangeAcaYr = function (AcademicYearID) {
            $scope.AcademicYearID = AcademicYearID;
            $scope.GetExamMonthYearData(AcademicYearID);
        }

        $scope.ChangeExmmonthYr = function (ExamMonthYear) {
            $scope.ExamMonthYearID = ExamMonthYear;
        }

        $scope.ChangeFeeType = function (FeePaymentType) {
            $scope.FeePaymentTypeID = FeePaymentType;
        }





        $scope.verifyDates = function () {
            $scope.loading = true;
            var VerifyDate = CcicPreExaminationService.VerifyFeePaymentDate($scope.AcademicYearID, $scope.ExamMonthYearID);
            VerifyDate.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) {

                }
                if (Res[0].ResponseCode == '200') {
                    $scope.showPaymentDetails();
                } else if (Res[0].ResponseCode == '400') {
                    alert(Res[0].ResponseDescription)
                    $state.go("CcicDashboard.PreExamination.FeePayment")

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.getCcicCurrentAcademicYear = function () {
            var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
            getCcicCurrentAcademicYear.then(function (response) {

                $scope.GetCcicCurrentAcademicYear = response;

            },
                function (error) {
                    alert("error while loading CurrentAcademicYear");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetExamMonthYearData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            $scope.AcademicYearID = AcademicYearID;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYear = res.Table;
                }
                else {
                    $scope.GetExamMonthYear = [];
                }
                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }

        $scope.feePaymentType = function () {
            var LoadfeepaymentType = CcicPreExaminationService.GetFeePaymentType($scope.InstitutionID);
            LoadfeepaymentType.then(function (response) {
                try {
                    var Res = JSON.parse(response)
                }
                catch {
                    
                }
                if (Res.length > 0) {
                    $scope.FeePaymentTypeData = Res;

                } else {
                    $scope.FeePaymentTypeData = [];
                }
            },
                function (error) {
                    alert("error while Data");
                    //console.log(error);
                });

        }

        $scope.showPaymentDetails = function () {
            $scope.ExamPayment = null;
            $scope.loading = true;
            var getAdmissionsubmod = CcicPreExaminationService.getPayExamFee($scope.InstitutionID, $scope.AcademicYearID, $scope.ExamMonthYearID, $scope.FeePaymentTypeID, $scope.UserName);
            getAdmissionsubmod.then(function (Usersdata) {

                if (Usersdata.Table.length > 0 && Usersdata.Table1[0].StatusCode=='200') {
                    $scope.isShowResults = true;
                    $scope.dataBackLog = false;

                    for (var i = 0; i < Usersdata.length; i++) {
                        Usersdata[i].isChecked = false;
                    }

                    $scope.ExamPayment = Usersdata.Table;
                    $scope.loading = false;
                    $scope.NoData = false;
                }
                else if (Usersdata.Table.length <= 0 && Usersdata.Table1[0].StatusCode == '400') {
                    alert(Usersdata.Table1[0].StatusDescription);
                    //$scope.NoData = true;
                    $scope.loading = false;
                    $scope.AcademicModules = [];
                    //alert("No Data Found");
                }

            }, function (err) {
                $scope.isShowResults = false;
            });


        }



    })
})