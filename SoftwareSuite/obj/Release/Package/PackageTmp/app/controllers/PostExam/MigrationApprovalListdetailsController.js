define(['app'], function (app) {
    app.controller("MigrationApprovalListdetailsController", function ($scope, $http, $localStorage, $state, DigitalSignatureService, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        $scope.btnDisable = false;
        $scope.MyCheck = false;
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;

        $scope.buttonlabel = "Approve";

        var PaymentStudentList = []
        var PaymentStudent = [];
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getlist();
            $scope.smsbtndisable = false;
        }

        $scope.selectAll = function (val) {
            PaymentStudent = [];

            if (val == true) {
                for (var i = 0; i < $scope.ApprovalDetails.length; i++) {

                    $scope.ApprovalDetails[i].isChecked = true;
                    if ($scope.ApprovalDetails[i].isChecked) {
                        dataPay = {};
                        dataPay.PIN = $scope.ApprovalDetails[i].PIN
                        PaymentStudent.push(dataPay);
                        PaymentStudentList.push($scope.ApprovalDetails[i].PIN);
                    }
                }

            } else {
                for (var i = 0; i < $scope.ApprovalDetails.length; i++) {
                    $scope.ApprovalDetails[i].isChecked = false;
                    PaymentStudent = [];
                    PaymentStudentList = [];
                }
            }
            //  console.log(PaymentStudent);
        };


        $scope.ApproveType = $localStorage.CertificateData.ApproveType;
        $scope.Scheme = $localStorage.CertificateData.Scheme;
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.Data = false;
        $scope.Nodata = false;
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

        DigitalSignatureService.GetUserCertificates().then(
            function (res) {
                if (res.length > 0) {
                    $scope.UserCertificates = res;
                }

            }, function (error) {
                console.log(error);
                $scope.data = false;
                $scope.error = true;
            });

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

        $scope.ResetCertificateStatus = function (PIN, Path) {
            if (Path == null || Path == '' || Path == undefined) {
                var Path = '';
            }
            var ResetCertificateStatus = PreExaminationService.ResetCertificateStatus(1, PIN, Path);
            ResetCertificateStatus.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponceCode == "200") {
                    alert(response[0].ResponceDescription);
                    $scope.getlist();
                } else {
                    alert(response[0].ResponceDescription);
                    $scope.getlist();
                }

            }, function (err) {
                $scope.getlist();
            });



        }

        $scope.sensSMS = function (PIN, Path, mobile, ind) {
            if (mobile == null || angular.isUndefined(mobile) || mobile == "") {
                alert("Mobile No not Found");
                return;
            }
            if (Path == null || angular.isUndefined(Path) || Path == "") {
                alert("Certificate not found");
                return;
            }
            $scope['smsbtndisable' + ind] = true;
            var resultpath = Path.replace(/(^\w+:|^)\/\//, '');
            var sensSMS = PreExaminationService.sendcertSMS(PIN, resultpath, mobile, "migration");
            sensSMS.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response == "SUCCESS") {
                    var UpdateSmsStatus = PreExaminationService.UpdateSmsStatus(1, PIN);
                    UpdateSmsStatus.then(function (response) {
                        try { var response = JSON.parse(response) } catch (err) { }
                        if (response[0].ResponceCode == "200") {
                            alert(response[0].ResponceDescription);
                            $scope.getlist();
                        } else {
                            alert(response[0].ResponceDescription);
                            $scope.getlist();
                        }
                        $scope['smsbtndisable' + ind] = false;
                    }, function (err) {
                        $scope['smsbtndisable' + ind] = false;
                        $scope.getlist();
                    });

                } else {
                    alert(response);
                }
                $scope.smsbtndisable = false;
            }, function (err) {
                $scope['smsbtndisable' + ind] = false;
                $scope.getlist();
            });


        }

        $scope.getlist = function () {
            var ApproveList = PreExaminationService.GetMigrationApprovalDetails($scope.Scheme, $scope.ApproveType, $scope.UserTypeId);
            ApproveList.then(function (response) {
                var response = JSON.parse(response)
                console.log(response);
                if (response.Table[0].ResponseCode == '200') {
                    if (response.Table1.length > 0) {
                        $scope.$emit('hideLoading', data);
                        $scope.ApprovalDetails = response.Table1;
                        for (var j = 0; j < response.Table1.length; j++) {
                            $scope['smsbtndisable' + j] = false;
                        }
                        PaymentStudentList = []
                        PaymentStudent = []
                        $scope.Data = true;
                        $scope.Nodata = false;
                    } else {
                        $scope.$emit('hideLoading', data);
                        $scope.Data = false;
                        $scope.Nodata = true;
                    }

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

        var PaymentStudent = [];
        var PaymentStudentList = [];

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


        $scope.checkODC = function () {
            $scope.ResultFound = false;
            $scope.ResultNotFound = false;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/PostExam/ODCPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });
        }

        $scope.GetODC = function (Pin) {

            if ((Pin == undefined) || (Pin == "0") || (Pin == "")) {
                alert("Enter PIN");
                return;
            }
            $scope.ODCPin = Pin;
            $scope.LoadImg = true;
            $scope.ResultFound = false;
            $scope.ResultNotFound = false;
            var getmemodetails = PreExaminationService.getTranscriptODCDetailsByPin(Pin);
            getmemodetails.then(function (res) {
                try { var response = JSON.parse(res) } catch (err) { }
                $scope.modalInstance = $uibModal.open({
                    templateUrl: "/app/views/PostExam/ODCPopup.html",
                    size: 'xlg',
                    scope: $scope,
                    windowClass: 'modal-fit-att',
                    //backdrop: 'static',
                });

                if (response.Table[0].ResponceCode == '200') {
                    $scope.ODCstudData = response.Table1[0];
                    $scope.Odcmarkstable = response.Table2;
                    $scope.ResultFound = true;
                    $scope.LoadImg = false;
                    $scope.ResultNotFound = false;
                }
                else {
                    $scope.ODCstudData = [];
                    $scope.Odcmarkstable = [];
                    $scope.ResultFound = false;
                    $scope.LoadImg = false;
                    $scope.ResultNotFound = true;

                }


            }, function (err) {
                $scope.ResultFound = false;
                $scope.LoadImg = false;
                $scope.ResultNotFound = true;

            })

        }

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

        $scope.Approve = function () {
            if (PaymentStudent != [] && PaymentStudent != '') {
                var ApproveStatus = 1
                $scope.btndisable = true;
                if ($scope.UserTypeId == '1009') {
                    if (angular.isUndefined($scope.UserCertificates) || $scope.UserCertificates[0].SerialNumber == null) {
                        alert('Link the Digital signature to sign the documents');
                        return;
                    }
                    $scope.buttonlabel = "Signing in process ...";
                    var GetMigrationCertificateTobeSignedlocation = PreExaminationService.GetMigrationCertificateTobeSignedlocation(PaymentStudent)
                    GetMigrationCertificateTobeSignedlocation.then(function (response) {
                        var location = window.location.origin;
                        if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
                            location += "/API/"
                        } else {
                            location += "/"
                        }
                        var responseurl = location + "api/StudentCertificate/StoreSignedCertificate";
                        var paramObject = []
                        if (response.length > 0) {
                            for (var i = 0; i < response.length; i++) {
                                var obj = {
                                    "Pin": response[i].Pin,
                                    "CertificateServiceId": 1,
                                    "PdfLocation": response[i].PdfUrl,
                                    "SerialNumber": $scope.UserCertificates[0].SerialNumber,
                                    "ApplicationNo": angular.isUndefined(response[i].ApplicationNumber) ? "" : response[i].ApplicationNumber,
                                    "Designation": "CONTROLLER OF EXAMINATIONS, SBTET, TELANGANA",
                                    "llx": 360,
                                    "lly": 360,
                                    "urx": 360 + 170,
                                    "ury": 360 + 50,
                                    "responseUrl": btoa(responseurl)
                                }
                                paramObject.push(obj)
                            }
                            var SignPdf = PreExaminationService.SignMultiplePdf(paramObject)
                            SignPdf.then(function (response) {
                                if (response.length > 0) {
                                    var signedpins = [];
                                    response.forEach(function (item, index) {
                                        if (item.status == "SUCCESS") {
                                            signedpins.push({ "PIN": item.Pin });
                                        }
                                    });
                                    if (signedpins.length <= 0) {
                                        alert("certificate signing failed ");
                                        $scope.btndisable = false;
                                        $scope.buttonlabel = "Approve";
                                        return;
                                    }

                                    var getData = PreExaminationService.MigrationSetApproveStatus(signedpins, $scope.UserTypeId, ApproveStatus)
                                    getData.then(function (response) {
                                        var response = JSON.parse(response)
                                        if (response.Table[0].ResponseCode == '200') {
                                            alert(response.Table[0].ResponseDescription);
                                            $scope.buttonlabel = "Approve";
                                            $scope.btndisable = false;
                                            $scope.getlist();
                                        } else {
                                            alert(response.Table[0].ResponseDescription);
                                            $scope.btndisable = false;
                                            $scope.buttonlabel = "Approve";
                                            $scope.getlist();
                                        }
                                    }, function (error) {
                                        $scope.result = false;
                                        $scope.btndisable = false;
                                        $scope.buttonlabel = "Approve";
                                    });
                                }

                            }, function (err) {
                                $scope.btndisable = false;
                                $scope.buttonlabel = "Approve";
                                alert("sigining service not available");
                            });
                        }
                    }, function (err) {
                        $scope.btndisable = false;
                        $scope.buttonlabel = "Approve";
                    });



                } else {
                    var getData = PreExaminationService.MigrationSetApproveStatus(PaymentStudent, $scope.UserTypeId, ApproveStatus)
                    getData.then(function (response) {
                        var response = JSON.parse(response)
                        if (response.Table[0].ResponseCode == '200') {
                            alert(response.Table[0].ResponseDescription);
                            $scope.btndisable = false;
                            $scope.getlist();
                        } else {
                            alert(response.Table[0].ResponseDescription);
                            $scope.btndisable = false;
                            $scope.getlist();
                        }
                    }, function (error) {
                        $scope.result = false;
                        $scope.btndisable = false;
                    });

                }
            } else {
                alert('select the pins');
                return;
            }
        }


        $scope.Reject = function () {
            $scope.remarks = '';
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/Controllers/PostExam/RejectPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
        }


        $scope.ClosedModal = function () {
            $scope.modalInstance.close();
        }


        $scope.Submit = function (remarks) {
            if (PaymentStudent != [] && PaymentStudent != '') {
                var ApproveStatus = 2
                $scope.btndisable = true;

                var Approve = PreExaminationService.MigrationSetApproveStatusReject(PaymentStudent, $scope.UserTypeId, ApproveStatus, remarks);
                Approve.then(function (response) {
                    var response = JSON.parse(response)
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.btndisable = false;
                        $scope.ClosedModal()
                        $scope.getlist();

                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.btndisable = false;
                        $scope.ClosedModal()
                        $scope.getlist();
                    }
                    else {
                        //$scope.$emit('hideLoading', data);
                        $scope.Data = false;
                        $scope.Nodata = true;
                        $scope.ClosedModal()

                    }
                    //alert("Success")

                },
                    function (error) {
                        //$scope.$emit('hideLoading', data);
                        $scope.btndisable = false;

                        $scope.Data = false;
                        $scope.Nodata = true;
                        $scope.ClosedModal()
                        alert("error while loading data");
                    });
            } else {
                alert('select the pins');
                return;
            }
        }



        $scope.openDetails = function (pin, CertificateType) {
            //  alert()
            $localStorage.certData = {
                Certificate: CertificateType,
                pin: pin
            }
            $state.go('Dashboard.PostExam.Migrationpending');
        }

        $scope.openPending = function (pin, CertificateType) {
            if ($scope.UserTypeId == 1009) {
                $localStorage.certData = {
                    Certificate: CertificateType,
                    pin: pin
                }
                $state.go('Dashboard.PostExam.Migrationpending');
            } else {
                $localStorage.certData = {
                    Certificate: CertificateType,
                    pin: pin
                }
                $state.go('Dashboard.PostExam.Migrationpending');
            }

        }

        $scope.OpenData = function () {
            $state.go('Dashboard.PostExam.MigrationCertificate');
        }
    })
})
//define(['app'], function (app) {
//    app.controller("MigrationApprovalListdetailsController", function ($scope, $http, $localStorage, $state, DigitalSignatureService, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
//        $scope.btnDisable = false;
//        $scope.MyCheck = false;
//        var authData = $localStorage.authorizationData;
//        $scope.UserTypeId = authData.SystemUserTypeId;

//        $scope.buttonlabel = "Approve";

//        var PaymentStudentList = []
//        var PaymentStudent = [];
//        const $ctrl = this;
//        $ctrl.$onInit = () => {
//            $scope.getlist();
//            $scope.smsbtndisable = false;
//        }

//        $scope.ApproveType = $localStorage.CertificateData.ApproveType;
//        $scope.Scheme = $localStorage.CertificateData.Scheme;
//        var data = {};
//        $scope.$emit('showLoading', data);
//        $scope.Data = false;
//        $scope.Nodata = false;
//        $scope.arrows = true;
//        $scope.sortColumn = function (col) {
//            $scope.arrows = false;
//            $scope.column = col;
//            if ($scope.reverse) {
//                $scope.reverse = false;
//                $scope.reverseclass = 'arrow-up';
//            } else {
//                $scope.reverse = true;
//                $scope.reverseclass = 'arrow-down';
//            }
//        };

//        DigitalSignatureService.GetUserCertificates().then(
//            function (res) {
//                if (res.length > 0) {
//                    $scope.UserCertificates = res;
//                }

//            }, function (error) {
//                console.log(error);
//                $scope.data = false;
//                $scope.error = true;
//            });

//        // remove and change class
//        $scope.sortClass = function (col) {
//            if ($scope.column == col) {
//                if ($scope.reverse) {
//                    return 'arrow-down';
//                } else {
//                    return 'arrow-up';
//                }
//            } else {
//                return '';
//            }
//        }

//        $scope.DownloadtoExcel = function () {
//            var CertificateFeePaymentReports = PreExaminationService.CertificateFeePaymentReports($scope.Scheme);
//            CertificateFeePaymentReports.then(function (res) {

//                if (res.length > 0) {
//                    if (res.length > 4) {
//                        window.location.href = res;
//                    } else {
//                        alert("No Excel Report Present")
//                    }
//                } else {
//                    alert("No Report Present")
//                }
//            }, function (err) {
//                $scope.LoadImg = false;
//                alert("Error while loading");
//            });

//        }

//        $scope.ResetCertificateStatus = function (PIN, Path) {
//            if (Path == null || Path == '' || Path == undefined) {
//                var Path = '';
//            }
//            var ResetCertificateStatus = PreExaminationService.ResetCertificateStatus(1, PIN, Path);
//            ResetCertificateStatus.then(function (response) {
//                try { var response = JSON.parse(response) } catch (err) { }
//                if (response[0].ResponceCode == "200") {
//                    alert(response[0].ResponceDescription);
//                    $scope.getlist();
//                } else {
//                    alert(response[0].ResponceDescription);
//                    $scope.getlist();
//                }

//            }, function (err) {
//                $scope.getlist();
//            });



//        }

//        $scope.sensSMS = function (PIN, Path, mobile, ind) {
//            if (mobile == null || angular.isUndefined(mobile) || mobile == "") {
//                alert("Mobile No not Found");
//                return;
//            }
//            if (Path == null || angular.isUndefined(Path) || Path == "") {
//                alert("Certificate not found");
//                return;
//            }
//            $scope['smsbtndisable' + ind] = true;
//            var sensSMS = PreExaminationService.sendcertSMS(PIN, Path, mobile, "migration");
//            sensSMS.then(function (response) {
//                try { var response = JSON.parse(response) } catch (err) { }
//                if (response == "SUCCESS") {
//                    var UpdateSmsStatus = PreExaminationService.UpdateSmsStatus(1, PIN);
//                    UpdateSmsStatus.then(function (response) {
//                        try { var response = JSON.parse(response) } catch (err) { }
//                        if (response[0].ResponceCode == "200") {
//                            alert(response[0].ResponceDescription);
//                            $scope.getlist();
//                        } else {
//                            alert(response[0].ResponceDescription);
//                            $scope.getlist();
//                        }
//                        $scope['smsbtndisable' + ind] = false;
//                    }, function (err) {
//                        $scope['smsbtndisable' + ind] = false;
//                        $scope.getlist();
//                    });

//                } else {
//                    alert(response);
//                    $scope.getlist();
//                }
//                $scope['smsbtndisable' + ind] = false;
//            }, function (err) {
//                $scope['smsbtndisable' + ind] = false;
//                $scope.getlist();
//            });


//        }

//        $scope.getlist = function () {
//            var ApproveList = PreExaminationService.GetMigrationApprovalDetails($scope.Scheme, $scope.ApproveType, $scope.UserTypeId);
//            ApproveList.then(function (response) {
//                var response = JSON.parse(response)
//                console.log(response);
//                if (response.Table[0].ResponseCode == '200') {
//                    if (response.Table1.length > 0) {
//                        $scope.$emit('hideLoading', data);
//                        $scope.ApprovalDetails = response.Table1;
//                        for (var j = 0; j < response.Table1.length; j++) {
//                            $scope['smsbtndisable' + j] = false;
//                        }
//                        PaymentStudentList = []
//                        PaymentStudent = []
//                        $scope.Data = true;
//                        $scope.Nodata = false;
//                    } else {
//                        $scope.$emit('hideLoading', data);
//                        $scope.Data = false;
//                        $scope.Nodata = true;
//                    }

//                } else if (response.Table[0].ResponseCode == '400') {
//                    $scope.$emit('hideLoading', data);
//                    $scope.Data = false;
//                    $scope.Nodata = true;
//                }
//                else {
//                    $scope.$emit('hideLoading', data);
//                    $scope.Data = false;
//                    $scope.Nodata = true;
//                }

//            },
//                function (error) {
//                    $scope.$emit('hideLoading', data);

//                    $scope.Data = false;
//                    $scope.Nodata = true;
//                    alert("error while loading data");
//                });
//        }
//        //    $scope.ApprovalData = [
//        //{ "Id": "1", "Scheme": "C16", "CollegeCode": "20", "PIN": "16001-m-001", "Name": "Ram","Phone":"1234567890","ApprovalDate":"08-04-2020"},
//        //  { "Id": "2", "Scheme": "C16", "CollegeCode": "20", "PIN": "16001-M-001", "Name": "Ramesh", "Phone": "1234567890", "ApprovalDate": "08-04-2020", },
//        //    { "Id": "3", "Scheme": "C16", "CollegeCode": "20", "PIN": "16001-m-001", "Name": "Ram", "Phone": "1234567890", "ApprovalDate": "08-04-2020", }

//        //    ]

//        //$scope.Changecheck = function () {

//        //    if ($scope.MyCheck == false) {
//        //        $scope.btnDisable = false;
//        //        //$scope.MyCheck = true;
//        //    } else {
//        //        $scope.btnDisable = true;
//        //    }

//        //}

//        //$scope.Approve = function (Pin) {
//        //    $scope.Pin = Pin;
//        //    $scope.modalInstance = $uibModal.open({
//        //        templateUrl: "/app/views/AlertPopup.html",
//        //        size: 'xlg',
//        //        scope: $scope,
//        //        windowClass: 'modal-fit-att',
//        //        //backdrop: 'static',
//        //    });

//        //    $scope.ClosedModal = function () {
//        //        $scope.noteChallan = false;
//        //        $scope.modalInstance.close();
//        //    }
//        //}

//        //$scope.Proceed = function (status) {
//        //    $scope.Pin;
//        //    $scope.Approve = status;
//        //    //alert("Certificate Approved Successfully")
//        //    $scope.modalInstance.close();
//        //    var ApproveList = PreExaminationService.SetCertificateApproval($scope.Pin, $scope.Approve);
//        //    ApproveList.then(function (response) {
//        //        try { var response = JSON.parse(response); } catch (err) { }

//        //        if (response.Table[0].ResponseCode == '200') {
//        //            alert(response.Table[0].ResponseDesc)
//        //            $state.go('Dashboard.PostExam.CertificateApproveList');
//        //        } else if (response.Table[0].ResponseCode == '400') {
//        //            alert(response.Table[0].ResponseDesc)
//        //            $state.go('Dashboard.PostExam.CertificateApproveList');
//        //        }
//        //        else {
//        //            //$scope.$emit('hideLoading', data);
//        //            $scope.Data = false;
//        //            $scope.Nodata = true;
//        //        }

//        //    },
//        //    function (error) {
//        //        //$scope.$emit('hideLoading', data);

//        //        $scope.Data = false;
//        //        $scope.Nodata = true;
//        //        alert("error while loading data");
//        //    });
//        //}

//        //$scope.Proceed1 = function (Pin) {
//        //    $scope.Pin = Pin;
//        //    $scope.Approve = 2;

//        //    var ApproveList = PreExaminationService.SetCertificateApproval($scope.Pin, $scope.Approve);
//        //    ApproveList.then(function (response) {
//        //        var response = JSON.parse(response)
//        //        console.log(response);

//        //        if (response.Table[0].ResponseCode == '200') {
//        //            alert(response.Table[0].ResponseDesc)
//        //            $state.go('Dashboard.PostExam.CertificateApproveList');
//        //        } else if (response.Table[0].ResponseCode == '400') {
//        //            alert(response.Table[0].ResponseDesc)
//        //            $state.go('Dashboard.PostExam.CertificateApproveList');
//        //        }
//        //        else {
//        //            //$scope.$emit('hideLoading', data);
//        //            $scope.Data = false;
//        //            $scope.Nodata = true;
//        //        }

//        //    },
//        //    function (error) {
//        //        //$scope.$emit('hideLoading', data);

//        //        $scope.Data = false;
//        //        $scope.Nodata = true;
//        //        alert("error while loading data");
//        //    });
//        //}

//        var PaymentStudent = [];
//        var PaymentStudentList = [];

//        $scope.selectEntity = function (data) {

//            $scope.allItemsSelectedthing = false;
//            if (data != null) {
//                if (!PaymentStudentList.includes(data.PIN)) {
//                    dataPay = {};
//                    dataPay.PIN = data.PIN
//                    PaymentStudent.push(dataPay);
//                    PaymentStudentList.push(data.PIN);
//                }
//                else if (PaymentStudentList.includes(data.PIN)) {
//                    PaymentStudentList.remByVal(data.PIN);
//                    PaymentStudent.remElementByVal(data.PIN);
//                    if (PaymentStudentList.length == 0) {
//                        $scope.allItemsSelectedthing = false;
//                    }
//                }

//            }
//            //console.log(PaymentStudentList)
//        };


//        $scope.checkODC = function () {
//            $scope.ResultFound = false;
//            $scope.ResultNotFound = false;
//            $scope.modalInstance = $uibModal.open({
//                templateUrl: "/app/views/PostExam/ODCPopup.html",
//                size: 'xlg',
//                scope: $scope,
//                windowClass: 'modal-fit-att',
//                //backdrop: 'static',
//            });
//        }

//        $scope.GetODC = function (Pin) {

//            if ((Pin == undefined) || (Pin == "0") || (Pin == "")) {
//                alert("Enter PIN");
//                return;
//            }
//            $scope.ODCPin = Pin;
//            $scope.LoadImg = true;
//            $scope.ResultFound = false;
//            $scope.ResultNotFound = false;
//            var getmemodetails = PreExaminationService.getTranscriptODCDetailsByPin(Pin);
//            getmemodetails.then(function (res) {
//                try { var response = JSON.parse(res) } catch (err) { }
//                $scope.modalInstance = $uibModal.open({
//                    templateUrl: "/app/views/PostExam/ODCPopup.html",
//                    size: 'xlg',
//                    scope: $scope,
//                    windowClass: 'modal-fit-att',
//                    //backdrop: 'static',
//                });

//                if (response.Table[0].ResponceCode == '200') {
//                    $scope.ODCstudData = response.Table1[0];
//                    $scope.Odcmarkstable = response.Table2;
//                    $scope.ResultFound = true;
//                    $scope.LoadImg = false;
//                    $scope.ResultNotFound = false;
//                }
//                else {
//                    $scope.ODCstudData = [];
//                    $scope.Odcmarkstable = [];
//                    $scope.ResultFound = false;
//                    $scope.LoadImg = false;
//                    $scope.ResultNotFound = true;

//                }


//            }, function (err) {
//                $scope.ResultFound = false;
//                $scope.LoadImg = false;
//                $scope.ResultNotFound = true;

//            })

//        }

//        Array.prototype.remByVal = function (val) {
//            for (var i = 0; i < this.length; i++) {
//                if (this[i] === val) {
//                    this.splice(i, 1);
//                    break;
//                }
//            }
//            return this;
//        }

//        Array.prototype.remElementByVal = function (val) {
//            for (var i = 0; i < this.length; i++) {
//                if (this[i].PIN === val) {
//                    this.splice(i, 1);
//                    break;
//                }
//            }
//            return this;
//        }

//        $scope.Approve = function () {
//            if (PaymentStudent != [] && PaymentStudent != '') {
//                var ApproveStatus = 1
//                $scope.btndisable = true;
//                if ($scope.UserTypeId == '1009') {
//                    if (angular.isUndefined($scope.UserCertificates) || $scope.UserCertificates[0].SerialNumber == null) {
//                        alert('Link the Digital signature to sign the documents');
//                        return;
//                    }
//                    $scope.buttonlabel = "Signing in process ...";
//                    var GetMigrationCertificateTobeSignedlocation = PreExaminationService.GetMigrationCertificateTobeSignedlocation(PaymentStudent)
//                    GetMigrationCertificateTobeSignedlocation.then(function (response) {
//                        var location = window.location.origin;
//                        if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
//                            location += "/API/"
//                        } else {
//                            location += "/"
//                        }
//                        var responseurl = location + "api/StudentCertificate/StoreSignedCertificate";
//                        var paramObject = []
//                        if (response.length > 0) {
//                            for (var i = 0; i < response.length; i++) {
//                                var obj = {
//                                    "Pin": response[i].Pin,
//                                    "CertificateServiceId": 1,
//                                    "PdfLocation": response[i].PdfUrl,
//                                    "SerialNumber": $scope.UserCertificates[0].SerialNumber,
//                                    "ApplicationNo": angular.isUndefined(response[i].ApplicationNumber) ? "" : response[i].ApplicationNumber,
//                                    "Designation": "CONTROLLER OF EXAMINATIONS, SBTET, TELANGANA",
//                                    "llx": 360,
//                                    "lly": 360,
//                                    "urx": 360 + 170,
//                                    "ury": 360 + 50,
//                                    "responseUrl": btoa(responseurl)
//                                }
//                                paramObject.push(obj)
//                            }
//                            var SignPdf = PreExaminationService.SignMultiplePdf(paramObject)
//                            SignPdf.then(function (response) {
//                                if (response.length > 0) {
//                                    var signedpins = [];
//                                    response.forEach(function (item, index) {
//                                        if (item.status == "SUCCESS") {
//                                            signedpins.push({ "PIN": item.Pin });
//                                        }
//                                    });
//                                    if (signedpins.length <= 0) {
//                                        alert("certificate signing failed ");
//                                        $scope.btndisable = false;
//                                        $scope.buttonlabel = "Approve";
//                                        return;
//                                    }

//                                    var getData = PreExaminationService.MigrationSetApproveStatus(signedpins, $scope.UserTypeId, ApproveStatus)
//                                    getData.then(function (response) {
//                                        var response = JSON.parse(response)
//                                        if (response.Table[0].ResponseCode == '200') {
//                                            alert(response.Table[0].ResponseDescription);
//                                            $scope.buttonlabel = "Approve";
//                                            $scope.btndisable = false;
//                                            $scope.getlist();
//                                        } else {
//                                            alert(response.Table[0].ResponseDescription);
//                                            $scope.btndisable = false;
//                                            $scope.buttonlabel = "Approve";
//                                            $scope.getlist();
//                                        }
//                                    }, function (error) {
//                                        $scope.result = false;
//                                        $scope.btndisable = false;
//                                        $scope.buttonlabel = "Approve";
//                                    });
//                                }

//                            }, function (err) {
//                                $scope.btndisable = false;
//                                $scope.buttonlabel = "Approve";
//                                alert("sigining service not available");
//                            });
//                        }
//                    }, function (err) {
//                        $scope.btndisable = false;
//                        $scope.buttonlabel = "Approve";
//                    });



//                } else {
//                    var getData = PreExaminationService.MigrationSetApproveStatus(PaymentStudent, $scope.UserTypeId, ApproveStatus)
//                    getData.then(function (response) {
//                        var response = JSON.parse(response)
//                        if (response.Table[0].ResponseCode == '200') {
//                            alert(response.Table[0].ResponseDescription);
//                            $scope.btndisable = false;
//                            $scope.getlist();
//                        } else {
//                            alert(response.Table[0].ResponseDescription);
//                            $scope.btndisable = false;
//                            $scope.getlist();
//                        }
//                    }, function (error) {
//                        $scope.result = false;
//                        $scope.btndisable = false;
//                    });

//                }
//            } else {
//                alert('select the pins');
//                return;
//            }
//        }


//        $scope.Reject = function () {
//            $scope.remarks = '';
//            $scope.modalInstance = $uibModal.open({
//                templateUrl: "/app/Controllers/PostExam/RejectPopup.html",
//                size: 'xlg',
//                scope: $scope,
//                windowClass: 'modal-fit-att',
//            });
//        }


//        $scope.ClosedModal = function () {
//            $scope.modalInstance.close();
//        }


//        $scope.Submit = function (remarks) {
//            if (PaymentStudent != [] && PaymentStudent != '') {
//                var ApproveStatus = 2
//                $scope.btndisable = true;

//                var Approve = PreExaminationService.MigrationSetApproveStatusReject(PaymentStudent, $scope.UserTypeId, ApproveStatus, remarks);
//                Approve.then(function (response) {
//                    var response = JSON.parse(response)
//                    if (response.Table[0].ResponseCode == '200') {
//                        alert(response.Table[0].ResponseDescription)
//                        $scope.btndisable = false;
//                        $scope.getlist();

//                    } else if (response.Table[0].ResponseCode == '400') {
//                        alert(response.Table[0].ResponseDescription)
//                        $scope.btndisable = false;
//                        $scope.getlist();
//                    }
//                    else {
//                        //$scope.$emit('hideLoading', data);
//                        $scope.Data = false;
//                        $scope.Nodata = true;

//                    }
//                    //alert("Success")

//                },
//                    function (error) {
//                        //$scope.$emit('hideLoading', data);
//                        $scope.btndisable = false;

//                        $scope.Data = false;
//                        $scope.Nodata = true;
//                        alert("error while loading data");
//                    });
//            } else {
//                alert('select the pins');
//                return;
//            }
//        }



//        $scope.openDetails = function (pin, CertificateType) {
//            //  alert()
//            $localStorage.certData = {
//                Certificate: CertificateType,
//                pin: pin
//            }
//            $state.go('Dashboard.PostExam.Migrationpending');
//        }

//        $scope.openPending = function (pin, CertificateType) {
//            if ($scope.UserTypeId == 1009) {
//                $localStorage.certData = {
//                    Certificate: CertificateType,
//                    pin: pin
//                }
//                $state.go('Dashboard.PostExam.Migrationpending');
//            } else {
//                $localStorage.certData = {
//                    Certificate: CertificateType,
//                    pin: pin
//                }
//                $state.go('Dashboard.PostExam.Migrationpending');
//            }

//        }

//        $scope.OpenData = function () {
//            $state.go('Dashboard.PostExam.MigrationCertificate');
//        }
//    })
//})