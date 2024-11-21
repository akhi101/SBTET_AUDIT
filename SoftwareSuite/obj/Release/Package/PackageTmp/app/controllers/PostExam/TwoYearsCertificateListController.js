define(['app'], function (app) {
    app.controller("TwoYearsCertificateListController", function ($scope, $http, $localStorage, $state, $uibModal, PreExaminationService, $window, $state, AppSettings, StudentResultService, Excel, $timeout) {
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
                    if ($scope.UserTypeId == 1007) {
                        if ($scope.ApprovalDetails[i].IsAsVerified == 0) {
                            $scope.ApprovalDetails[i].isChecked = false
                            alert("Please Verify Student Details by clicking concerned row")
                            return
                        }
                    } else
                        if ($scope.UserTypeId == 1002) {
                            if ($scope.ApprovalDetails[i].IsDsVerified == 0) {
                                $scope.ApprovalDetails[i].isChecked = false
                                alert("Please Verify Student Details by clicking concerned row")
                                return
                            }
                        } else
                            if ($scope.UserTypeId == 1009) {
                                if ($scope.ApprovalDetails[i].IsJsVerified == 0) {
                                    $scope.ApprovalDetails[i].isChecked = false
                                    alert("Please Verify Student Details by clicking concerned row")
                                    return
                                }
                            }
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
        $scope.Scheme1 = $localStorage.CertificateData.Scheme;
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

        //DigitalSignatureService.GetUserCertificates().then(
        //    function (res) {
        //        if (res.length > 0) {
        //            $scope.UserCertificates = res;
        //        }

        //    }, function (error) {
        //        console.log(error);
        //        $scope.data = false;
        //        $scope.error = true;
        //    });

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
            var CertificateFeePaymentReports = PreExaminationService.TwoYearsFeePaymentReports($scope.Scheme1, $scope.ApproveType, $scope.UserTypeId);
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
            var ApproveList = PreExaminationService.GetTwoYearsApproveList($scope.Scheme1, $scope.ApproveType, $scope.UserTypeId);
            ApproveList.then(function (res) {
                //var res = JSON.parse(response)
                console.log(res);
                if (res.Table[0].ResponseCode == '200') {
                    if (res.Table1.length > 0) {
                        $scope.$emit('hideLoading', data);
                        $scope.ApprovalDetails = res.Table1;
                        for (var j = 0; j < res.Table1.length; j++) {
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
        //    $scope.ApprovalData = [
        //{ "Id": "1", "Scheme": "C16", "CollegeCode": "20", "PIN": "16001-m-001", "Name": "Ram","Phone":"1234567890","ApprovalDate":"08-04-2020"},
        //  { "Id": "2", "Scheme": "C16", "CollegeCode": "20", "PIN": "16001-M-001", "Name": "Ramesh", "Phone": "1234567890", "ApprovalDate": "08-04-2020", },
        //    { "Id": "3", "Scheme": "C16", "CollegeCode": "20", "PIN": "16001-m-001", "Name": "Ram", "Phone": "1234567890", "ApprovalDate": "08-04-2020", }

        //    ]

        //$scope.Changecheck = function () {

        //    if ($scope.MyCheck == false) {
        //        $scope.btnDisable = false;
        //        //$scope.MyCheck = true;
        //    } else {
        //        $scope.btnDisable = true;
        //    }

        //}

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
        //    //alert("Certificate Approved Successfully")
        //    $scope.modalInstance.close();
        //    var ApproveList = PreExaminationService.SetCertificateApproval($scope.Pin, $scope.Approve);
        //    ApproveList.then(function (response) {
        //        try { var response = JSON.parse(response); } catch (err) { }

        //        if (response.Table[0].ResponseCode == '200') {
        //            alert(response.Table[0].ResponseDesc)
        //            $state.go('Dashboard.PostExam.CertificateApproveList');
        //        } else if (response.Table[0].ResponseCode == '400') {
        //            alert(response.Table[0].ResponseDesc)
        //            $state.go('Dashboard.PostExam.CertificateApproveList');
        //        }
        //        else {
        //            //$scope.$emit('hideLoading', data);
        //            $scope.Data = false;
        //            $scope.Nodata = true;
        //        }

        //    },
        //    function (error) {
        //        //$scope.$emit('hideLoading', data);

        //        $scope.Data = false;
        //        $scope.Nodata = true;
        //        alert("error while loading data");
        //    });
        //}

        //$scope.Proceed1 = function (Pin) {
        //    $scope.Pin = Pin;
        //    $scope.Approve = 2;

        //    var ApproveList = PreExaminationService.SetCertificateApproval($scope.Pin, $scope.Approve);
        //    ApproveList.then(function (response) {
        //        var response = JSON.parse(response)
        //        console.log(response);

        //        if (response.Table[0].ResponseCode == '200') {
        //            alert(response.Table[0].ResponseDesc)
        //            $state.go('Dashboard.PostExam.CertificateApproveList');
        //        } else if (response.Table[0].ResponseCode == '400') {
        //            alert(response.Table[0].ResponseDesc)
        //            $state.go('Dashboard.PostExam.CertificateApproveList');
        //        }
        //        else {
        //            //$scope.$emit('hideLoading', data);
        //            $scope.Data = false;
        //            $scope.Nodata = true;
        //        }

        //    },
        //    function (error) {
        //        //$scope.$emit('hideLoading', data);

        //        $scope.Data = false;
        //        $scope.Nodata = true;
        //        alert("error while loading data");
        //    });
        //}

        var PaymentStudent = [];
        var PaymentStudentList = [];

        $scope.selectEntity = function (data) {
            if ($scope.UserTypeId == 1007) {
                if (data.IsAsVerified == 0) {
                    data.isChecked = false
                    alert("Please Verify Student Details by clicking concerned row")
                    return
                }
            } else
                if ($scope.UserTypeId == 1002) {
                    if (data.IsDsVerified == 0) {
                        data.isChecked = false
                        alert("Please Verify Student Details by clicking concerned row")
                        return
                    }
                } else
                    if ($scope.UserTypeId == 1009) {
                        if (data.IsJsVerified == 0) {
                            data.isChecked = false
                            alert("Please Verify Student Details by clicking concerned row")
                            return
                        }
                    }
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
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/PostExam/StudentConsolidatedPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });
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
                    templateUrl: "/app/views/PostExam/StudentConsolidatedPopup.html",
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
            $scope.loading = true;
            if (PaymentStudent != [] && PaymentStudent != '') {
                var ApproveStatus = 1
                //$scope.btndisable = true;
                //if ($scope.UserTypeId == '1009') {
                //    if (angular.isUndefined($scope.UserCertificates) || $scope.UserCertificates[0].SerialNumber == null) {
                //        alert('Link the Digital signature to sign the documents');
                //        return;
                //    }
                //    $scope.buttonlabel = "Signing in process ...";
                //    var GetMigrationCertificateTobeSignedlocation = PreExaminationService.GetMigrationCertificateTobeSignedlocation(PaymentStudent)
                //    GetMigrationCertificateTobeSignedlocation.then(function (response) {
                //        var location = window.location.origin;
                //        if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
                //            location += "/API/"
                //        } else {
                //            location += "/"
                //        }
                //        var responseurl = location + "api/StudentCertificate/StoreSignedCertificate";
                //        var paramObject = []
                //        if (response.length > 0) {
                //            for (var i = 0; i < response.length; i++) {
                //                var obj = {
                //                    "Pin": response[i].Pin,
                //                    "CertificateServiceId": 1,
                //                    "PdfLocation": response[i].PdfUrl,
                //                    "SerialNumber": $scope.UserCertificates[0].SerialNumber,
                //                    "ApplicationNo": angular.isUndefined(response[i].ApplicationNumber) ? "" : response[i].ApplicationNumber,
                //                    "Designation": "CONTROLLER OF EXAMINATIONS, SBTET, TELANGANA",
                //                    "llx": 360,
                //                    "lly": 360,
                //                    "urx": 360 + 170,
                //                    "ury": 360 + 50,
                //                    "responseUrl": btoa(responseurl)
                //                }
                //                paramObject.push(obj)
                //            }
                //            var SignPdf = PreExaminationService.SignMultiplePdf(paramObject)
                //            SignPdf.then(function (response) {
                //                if (response.length > 0) {
                //                    var signedpins = [];
                //                    response.forEach(function (item, index) {
                //                        if (item.status == "SUCCESS") {
                //                            signedpins.push({ "PIN": item.Pin });
                //                        }
                //                    });
                //                    if (signedpins.length <= 0) {
                //                        alert("certificate signing failed ");
                //                        $scope.btndisable = false;
                //                        $scope.buttonlabel = "Approve";
                //                        return;
                //                    }

                var getData = PreExaminationService.TwoYearsCertificateSetApproveStatus(PaymentStudent, $scope.UserTypeId, ApproveStatus, $scope.Scheme1)
                                    getData.then(function (response) {
                                        var response = JSON.parse(response)
                                        if (response.Table[0].ResponseCode == '200') {
                                            $scope.loading = false;
                                            alert(response.Table[0].ResponseDescription);
                                            $scope.buttonlabel = "Approve";
                                            $scope.btndisable = false;
                                            $scope.getlist();
                                        } else {
                                            $scope.loading = false;
                                            alert(response.Table[0].ResponseDescription);
                                            $scope.btndisable = false;
                                            $scope.buttonlabel = "Approve";
                                            $scope.getlist();
                                        }
                                    }, function (error) {
                                        $scope.loading = false;
                                        $scope.result = false;
                                        $scope.btndisable = false;
                                        $scope.buttonlabel = "Approve";
                                    });
                                //}

                    //        }, function (err) {
                    //            $scope.btndisable = false;
                    //            $scope.buttonlabel = "Approve";
                    //            alert("sigining service not available");
                    //        });
                    //    }
                    //}, function (err) {
                    //    $scope.btndisable = false;
                    //    $scope.buttonlabel = "Approve";
                    //});



                
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


        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }


        $scope.Submit = function (remarks) {
            $scope.loading = true;
            if (PaymentStudent != [] && PaymentStudent != '') {
                var ApproveStatus = 2
                $scope.btndisable = true;

                var Approve = PreExaminationService.TwoYearsCertificateSetApproveStatusReject(PaymentStudent, $scope.UserTypeId, ApproveStatus, $scope.Scheme1, remarks);
                Approve.then(function (response) {
                    var response = JSON.parse(response)
                    if (response.Table[0].ResponseCode == '200') {
                        $scope.loading = false;
                        alert(response.Table[0].ResponseDescription)
                        $scope.btndisable = false;
                        $scope.closeModal()
                        $scope.getlist();

                    } else if (response.Table[0].ResponseCode == '400') {
                        $scope.loading = false;
                        alert(response.Table[0].ResponseDescription)
                        $scope.btndisable = false;
                        $scope.closeModal()
                        $scope.getlist();
                    }
                    else {
                        //$scope.$emit('hideLoading', data);
                        $scope.loading = false;
                        $scope.Data = false;
                        $scope.Nodata = true;
                        $scope.closeModal()

                    }
                    //alert("Success")

                },
                    function (error) {
                        //$scope.$emit('hideLoading', data);
                        $scope.loading = false;
                        $scope.btndisable = false;

                        $scope.Data = false;
                        $scope.Nodata = true;
                        $scope.closeModal()
                        alert("error while loading data");
                    });
            } else {
                $scope.loading = false;
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

        $scope.Verify = function (Pin) {
            var ApproveList = PreExaminationService.SetTwoYearsCertificateVerifyStatus(Pin, $scope.UserTypeId);
            ApproveList.then(function (response) {
                var response = JSON.parse(response)
                $scope.closeModal();
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponceDescription)

                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponceDescription)

                }
                $scope.getlist();

            },
                function (error) {
                    //$scope.$emit('hideLoading', data);

                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");
                });
        }

        $scope.openPending = function (pin) {
            var ApproveList = PreExaminationService.getTwoYearsCertificateDetails(pin);
            ApproveList.then(function (response) {
                try {
                    var response = JSON.parse(response)
                    $scope.StudentData = response.Table[0]
                   
                } catch (err) { }


                $scope.modalInstance = $uibModal.open({
                    templateUrl: "/app/views/TwoYearsCertificatePopup.html",
                    size: 'xlg',
                    scope: $scope,
                    windowClass: 'modal-fit-att',
                   

                });
            }, function (error) {
                alert("unable to load Schemes");
            });
        }

        $scope.OpenData = function () {
            $state.go('Dashboard.PostExam.MigrationCertificate');
        }

        //////////-------------------*----Consolidated Result----*---------------------////////////

         $scope.MonthAndYear = [
            { "Id": 1, "ExamYearMonth": "Oct - Nov 2018" },
            { "Id": 2, "ExamYearMonth": "Mar - Apr 2019" },
            { "Id": 3, "ExamYearMonth": "June 2019" },
            { "Id": 4, "ExamYearMonth": "Nov - Dec 2019" }
        ]

        $scope.ChangeScheme = function () {
            console.log($scope.scheme);
        }


        //get schemes data for dropdown
        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
        $scope.seminfo = [];
        $scope.examtypeinfo = [];
        $scope.pin = "";
        $scope.showData = 0;
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {

                $scope.schemeinfo = data;

            }
        }, function (error) {
            alert("unable to load Schemes");
        });
        // dropdown for sem exams
        $scope.loadSemExamTypes = function (SchemeId) {
            $scope.seminfo = [];
            $scope.examtypeinfo = [];
            $scope.pin = "";
            if ((SchemeId == undefined) || (SchemeId == "0") || (SchemeId == "")) {

                return false;
            }
            $scope.showData = 0;
            var SemExamInfo = StudentResultService.GetExamTypeForResults(SchemeId);
            SemExamInfo.then(function (data) {

                if (data.Table.length > 0) {

                    // $scope.schemeinfo = data[0].schemeInfo;
                    //$scope.seminfo = data[0].semInfo;
                    $scope.seminfo = data.Table;
                    // $scope.examtypeinfo = data.Table1;
                    // $scope.branchinfo = data[0].branchInfo;
                }

            }, function (error) {
                alert("unable to load semester");
            });
        }

        $scope.loadExamTypes = function (sem) {
            $scope.examtypeinfo = [];
            $scope.pin = "";
            if (($scope.scheme === undefined) || ($scope.scheme === "0") || ($scope.scheme === "")) {

                return false;
            }
            if (($scope.sem === undefined) || ($scope.sem === "0") || ($scope.sem === "")) {

                return false;
            }




            $scope.showData = 0;



            // Branch Information
            var SemExamInfo = StudentResultService.GetExamTypeForResults($scope.scheme);
            SemExamInfo.then(function (data) {
                if (data.Table.length > 0) {
                    $scope.examtypeinfo = data.Table1;

                }

            }, function (error) {
                alert("cannot load exam Type");
            });
        }


        $scope.hidePreviousResult = function () {
            $scope.ResultFound = false;
            $scope.showData = 0;
        },


        $scope.createCaptcha = function () {
            $scope.newCapchaCode = "";
            document.getElementById('captcha').innerHTML = "";
            var charsArray =
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
            var lengthOtp = 6;
            var captcha = [];
            for (var i = 0; i < lengthOtp; i++) {
                //below code will not allow Repetition of Characters
                var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
                if (captcha.indexOf(charsArray[index]) == -1)
                    captcha.push(charsArray[index]);
                else i--;
            }
            var canv = document.createElement("canvas");
            canv.id = "captcha";
            canv.width = 150;
            canv.height = 40;
            var ctx = canv.getContext("2d");
            ctx.font = "25px Georgia";
            ctx.strokeText(captcha.join(""), 0, 30);
            //storing captcha so that can validate you can save it somewhere else according to your specific requirements
            $scope.newCapchaCode = captcha.join("");
            document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
        }



        $window.validateRecaptcha = $scope.validateRecaptcha;


        //$scope.keyLogin = function ($event) {
        //    if ($event.keyCode == 13) {
        //        $scope.Submit();
        //    }
        //}

        $scope.GetConsolidated = function (Pin, Scheme) {
            $scope.Pin = Pin;
            $scope.scheme = Scheme;
            if ($scope.scheme == "" || $scope.scheme == undefined || $scope.scheme == null) {
                alert("select Scheme.");
                return;
            }

            if ($scope.Pin == "" || $scope.Pin == undefined || $scope.Pin == null) {
                alert("Enter Pin");
                return;
            }
            //if ($scope.ConCaptcha == undefined || $scope.ConCaptcha == "") {
            //    alert("Enter Captcha");
            //    return;
            //};


            //if ($scope.ConCaptcha == $scope.newCapchaCode) {
            //    // alert("Valid Captcha");
            //} else {
            //    alert("Invalid Captcha. try Again");
            //    $scope.ConCaptcha = "";
            //    $scope.createCaptcha();
            //    return;
            //}

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/PostExam/StudentConsolidatedPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });
            $scope.showData = 0
            $scope.LoadImg = true;
            $scope.ResultNotFound = false;
            $scope.ResultFound = false;

            $scope.ResultFound = false;
            $scope.LoadImg = true;
            if ($scope.scheme == 8) {
                var resultdata = StudentResultService.GetC09ConsolidatedResult($scope.Pin);
                resultdata.then(function (data) {
                    $scope.ConCaptcha = "";
                    //$scope.createCaptcha();
                    $scope.co9Data = true;
                    var data = JSON.parse(data)
                    data.Table3 = data.Table3;
                    if (data.Table.length > 0) {
                        if (data.Table[0].ResponceCode == '400') {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }
                        if (data.Table3.length > 0) {
                            data.Table3.forEach(function (item, i) {
                                if (item.SemId == "9") {
                                    data.Table3.splice(i, 1);
                                    data.Table3.unshift(item);
                                }
                            });

                        }

                        if (data.Table2.length > 0) {
                            $scope.showData = 1;
                            $scope.LoadImg = false;
                            $scope.ResultFound = true;
                            $scope.ResultNotFound = false;
                            $scope.studentInfo = data.Table1[0];
                            var resultData = [];
                            resultData = data.Table2;
                            $scope.TotalData = data.Table1[0];

                            $scope.totalearnedCourseCredits = data.Table1[0].CgpaTotalGained;
                            $scope.CreditsGained = parseFloat(data.Table1[0].CreditsGained) + 2.5 * data.Table3.length;
                            $scope.CgpaTotalCredits = parseFloat(data.Table1[0].CgpaTotalCredits) + 2.5 * data.Table3.length;
                            $scope.newresultDisplayInfo1 = [];

                            var SemesterList = [];

                            for (var i = 0; i < data.Table3.length; i++) {
                                if (!SemesterList.includes(data.Table3[i].SemId)) {
                                    SemesterList.push(data.Table3[i].SemId);
                                    var temp = {};
                                    temp.Subjects = [];
                                    var temcount = [];
                                    temp.Sgpainfo = [];
                                    temp.courseinfo = [];
                                    temp.semtotalinfo = [];
                                    temp.Semester = data.Table3[i].Semester;
                                    temp.TotalMarks = data.Table3[i].TotalMarks;
                                    temp.Result = data.Table3[i].Result;

                                    temp.SemId = data.Table3[i].SemId;
                                    var temp1 = {
                                        TotalGradePoints: data.Table3[i].TotalGradePoints,
                                        SGPA: data.Table3[i].SGPA,
                                        Credits: data.Table3[i].Credits
                                    }

                                    temp.Sgpainfo.push(temp1);
                                    var courseTotalGradePoints = 0;
                                    var courseCerditsGained = 2.5;
                                    var courseMaxcerdits = "";
                                    for (var j = 0; j < resultData.length; j++) {
                                        if (resultData[j].SemId == temp.SemId) {
                                            temp.Subjects.push(resultData[j]);
                                            courseTotalGradePoints += parseFloat(resultData[j].TotalGradePoints);
                                            courseCerditsGained += resultData[j].CreditsGained;

                                        }
                                    }
                                    var temp2 = {
                                        courseTotalGradePoints: courseTotalGradePoints,
                                        courseCerditsGained: courseCerditsGained,
                                        courseMaxCerdits: data.Table3[i].Credits + 2.5,
                                    }
                                    temp.courseinfo.push(temp2);

                                    //if (!temcount.includes(temp.SemId)) {
                                    //    temcount.push(temp.SemId);
                                    //    var tempobj = {
                                    //        Subject_Code: "",
                                    //        SubjectName: "Rubrics",
                                    //        MaxCredits: "2.5",
                                    //        Mid1Marks: "-",
                                    //        Mid2Marks: "-",
                                    //        InternalMarks: "-",
                                    //        EndExamMarks: "-",
                                    //        SubjectTotal: "-",
                                    //        HybridGrade: "-",
                                    //        GradePoint: "-",
                                    //        CreditsGained: "2.5",
                                    //        TotalGradePoints: "-",
                                    //        WholeOrSupply: "W",
                                    //        ExamMonthYear: "",
                                    //        ExamStatus: "P"
                                    //    };


                                    //    temp.Subjects.push(tempobj);
                                    //}
                                    $scope.newresultDisplayInfo1.push(temp);
                                }
                            }

                        }
                        else {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }
                    }
                    else {
                        $scope.co9Data = false;
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.LoadImg = false;
                    }
                }, function (error) {
                    $scope.co9Data = false;
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;


                });
            } else if ($scope.scheme == 1 || $scope.scheme == 3 || $scope.scheme == 4 || $scope.scheme == 2 || $scope.scheme == 6 || $scope.scheme == 7) {
                if ($scope.scheme == 1) {
                    var resultdata = StudentResultService.GetC14ConsolidatedResult($scope.Pin);
                } else if ($scope.scheme == 3) {
                    var resultdata = StudentResultService.GetC16ConsolidatedResult($scope.Pin);
                } else if ($scope.scheme == 4) {
                    var resultdata = StudentResultService.GetC16SConsolidatedResult($scope.Pin);
                } else if ($scope.scheme == 2) {
                    var resultdata = StudentResultService.GetER91ConsolidatedResult($scope.Pin);
                } else if ($scope.scheme == 6) {
                    var resultdata = StudentResultService.GetC05ConsolidatedResult($scope.Pin);
                } else if ($scope.scheme == 7) {
                    var resultdata = StudentResultService.GetC08ConsolidatedResult($scope.Pin);
                }

                resultdata.then(function (data) {
                    $scope.co9Data = true;
                    var data = JSON.parse(data)
                    $scope.ConCaptcha = "";
                    //$scope.createCaptcha();
                    if (data.Table.length > 0) {
                        if (data.Table[0].ResponceCode == '400') {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }
                        if (data.Table3.length > 0) {
                            data.Table3.forEach(function (item, i) {
                                if (item.SemId == "9") {
                                    data.Table3.splice(i, 1);
                                    data.Table3.unshift(item);
                                }
                            });

                        }

                        if (data.Table2.length > 0) {
                            $scope.showData = 1;
                            $scope.LoadImg = false;
                            $scope.ResultFound = true;
                            $scope.ResultNotFound = false;
                            $scope.studentInfo = data.Table1[0];
                            var resultData = [];
                            resultData = data.Table2;
                            $scope.TotalData = data.Table1[0];

                            $scope.totalearnedCourseCredits = data.Table1[0].CgpaTotalGained;
                            $scope.CreditsGained = parseFloat(data.Table1[0].CreditsGained) + 2.5 * data.Table3.length;
                            $scope.CgpaTotalCredits = parseFloat(data.Table1[0].CgpaTotalCredits) + 2.5 * data.Table3.length;
                            $scope.newresultDisplayInfo1 = [];

                            var SemesterList = [];

                            for (var i = 0; i < data.Table3.length; i++) {
                                if (!SemesterList.includes(data.Table3[i].SemId)) {
                                    SemesterList.push(data.Table3[i].SemId);
                                    var temp = {};
                                    temp.Subjects = [];
                                    var temcount = [];
                                    temp.Sgpainfo = [];
                                    temp.courseinfo = [];
                                    temp.semtotalinfo = [];
                                    temp.Semester = data.Table3[i].Semester;
                                    temp.TotalMarks = data.Table3[i].TotalMarks;
                                    temp.Result = data.Table3[i].Result;

                                    temp.SemId = data.Table3[i].SemId;
                                    var temp1 = {
                                        TotalGradePoints: data.Table3[i].TotalGradePoints,
                                        SGPA: data.Table3[i].SGPA,
                                        Credits: data.Table3[i].Credits
                                    }

                                    temp.Sgpainfo.push(temp1);
                                    var courseTotalGradePoints = 0;
                                    var courseCerditsGained = 2.5;
                                    var courseMaxcerdits = "";
                                    for (var j = 0; j < resultData.length; j++) {
                                        if (resultData[j].SemId == temp.SemId) {
                                            temp.Subjects.push(resultData[j]);
                                            courseTotalGradePoints += parseFloat(resultData[j].TotalGradePoints);
                                            courseCerditsGained += resultData[j].CreditsGained;

                                        }
                                    }
                                    var temp2 = {
                                        courseTotalGradePoints: courseTotalGradePoints,
                                        courseCerditsGained: courseCerditsGained,
                                        courseMaxCerdits: data.Table3[i].Credits + 2.5
                                    }
                                    temp.courseinfo.push(temp2);

                                    $scope.newresultDisplayInfo1.push(temp);
                                }
                            }

                        }
                        else {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }
                    }
                    else {
                        $scope.co9Data = false;
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.LoadImg = false;
                    }

                }, function (error) {
                    $scope.co9Data = false;
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;

                });
            } else {
                var resultdata = StudentResultService.GetConsolidatedResult($scope.Pin);
                resultdata.then(function (data) {
                    $scope.co9Data = false;
                    var data = JSON.parse(data)
                    $scope.ConCaptcha = "";
                    //$scope.createCaptcha();
                    if (data.Table.length > 0) {
                        if (data.Table2.length > 0) {
                            $scope.showData = 1;
                            $scope.LoadImg = false;
                            $scope.ResultFound = true;
                            $scope.ResultNotFound = false;
                            $scope.studentInfo = data.Table[0];
                            var resultData = [];
                            resultData = data.Table2;
                            $scope.TotalData = data.Table1[0];

                            $scope.totalearnedCourseCredits = data.Table1[0].CgpaTotalGained;
                            $scope.CreditsGained = parseFloat(data.Table1[0].CreditsGained) + 2.5 * data.Table3.length;
                            $scope.CgpaTotalCredits = parseFloat(data.Table1[0].CgpaTotalCredits) + 2.5 * data.Table3.length;

                            $scope.newresultDisplayInfo = [];

                            var SemesterList = [];
                            var sems = []
                            for (var i = 0; i < data.Table3.length; i++) {


                                if (!SemesterList.includes(data.Table3[i].SemId)) {
                                    SemesterList.push(data.Table3[i].SemId);
                                    var temp = {};
                                    temp.Subjects = [];
                                    var temcount = [];
                                    temp.Sgpainfo = [];
                                    temp.courseinfo = [];
                                    temp.semtotalinfo = [];
                                    temp.Semester = data.Table3[i].Semester;

                                    temp.SemId = data.Table3[i].SemId;
                                    var temp1 = {
                                        TotalGradePoints: data.Table3[i].TotalGradePoints,
                                        SGPA: data.Table3[i].SGPA,
                                        Credits: data.Table3[i].Credits
                                    }

                                    temp.Sgpainfo.push(temp1);
                                    var courseTotalGradePoints = 0;
                                    if (temp.SemId == 6) {
                                        var courseCerditsGained = 0;
                                    } else {
                                        var courseCerditsGained = 2.5;
                                    }

                                    var courseMaxcerdits = "";
                                    for (var j = 0; j < resultData.length; j++) {
                                        if (resultData[j].SemId == temp.SemId) {
                                            temp.Subjects.push(resultData[j]);
                                            courseTotalGradePoints += parseFloat(resultData[j].TotalGradePoints);
                                            courseCerditsGained += resultData[j].CreditsGained;

                                        }

                                    }

                                    if (temp.SemId == 6) {
                                        var temp2 = {
                                            courseTotalGradePoints: courseTotalGradePoints,
                                            courseCerditsGained: courseCerditsGained,
                                            courseMaxCerdits: data.Table3[i].Credits,
                                        }

                                    } else {
                                        var temp2 = {
                                            courseTotalGradePoints: courseTotalGradePoints,
                                            courseCerditsGained: courseCerditsGained,
                                            courseMaxCerdits: data.Table3[i].Credits + 2.5,
                                        }

                                    }

                                    sems.push(temp2);
                                    temp.courseinfo.push(temp2);

                                    if (!temcount.includes(temp.SemId)) {
                                        if (temp.SemId != '6') {
                                            temcount.push(temp.SemId);
                                            var tempobj = {
                                                Subject_Code: "",
                                                SubjectName: "Rubrics",
                                                MaxCredits: "2.5",
                                                Mid1Marks: "-",
                                                Mid2Marks: "-",
                                                InternalMarks: "-",
                                                EndExamMarks: "-",
                                                SubjectTotal: "-",
                                                HybridGrade: "-",
                                                GradePoint: "-",
                                                CreditsGained: "2.5",
                                                TotalGradePoints: "-",
                                                WholeOrSupply: "W",
                                                ExamMonthYear: "",
                                                ExamStatus: "P"
                                            };


                                            temp.Subjects.push(tempobj);
                                        }
                                    }
                                    $scope.newresultDisplayInfo.push(temp);
                                }
                            }

                            var courseTotalGradePoints = 0
                            var courseCerditsGained = 0
                            var courseMaxCerdits = 0
                            for (var j = 0; j < sems.length; j++) {
                                courseTotalGradePoints += parseFloat(sems[j].courseTotalGradePoints);
                                courseCerditsGained += sems[j].courseCerditsGained;
                                courseMaxCerdits += sems[j].courseMaxCerdits;
                                $scope.courseTotalGradePoints = courseTotalGradePoints
                                $scope.courseCerditsGained = courseCerditsGained
                                $scope.courseMaxCerdits = courseMaxCerdits

                            }

                        }
                        else {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }
                    }
                    else {
                        $scope.co9Data = false;
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.LoadImg = false;
                    }
                }, function (error) {
                    $scope.co9Data = false;
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;

                });
            }

        }

        $scope.DownloadPdfResult = function (tableid) {
            // alert(tableid + ":" + AppSettings.ExportToPdfUrl);
            //alert("pdf : " + tableid);
            html2canvas($('#idtoDivPrintAdmin'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("Table.pdf");
                }
            });
        }

        $scope.DownloadExcelResult = function (tableId) {
            var exportHref = Excel.tableToExcel(tableId, 'StudentResult');
            $timeout(function () { location.href = exportHref; }, 100);
        }

        $scope.PrintStudentResult = function () {

            var divName = "idtoDivPrintAdmin";
            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;
            $("#studentresult1").hide();
            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            //document.body.innerHTML = "";
            if (!$printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";
                document.body.appendChild($printSection);
            }
            $printSection.innerHTML = "";
            $printSection.appendChild(domClone);
            // alert($printSection.innerHTML);
            window.print();
            document.body.removeChild($printSection);
            $("#studentresult1").show();
        };


        $scope.PrintDashBoard = function () {
            var divName = "";
            if ($scope.adminuser == true) {
                divName = "idtoDivPrintAdmin";
            }
            else {
                divName = "DivIdToPrint";
            }

            var divToPrint = document.getElementById(divName);

            var newWin = window.open('', 'Print-Window');

            newWin.document.open();


            newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');

            newWin.document.close();

            setTimeout(function () { newWin.close(); }, 10);
        }

        $scope.DownloadPdfResultStudent = function (tableid) {

            // alert(tableid + ":" + AppSettings.ExportToPdfUrl);
            //alert("pdf : " + tableid);
            var height = $('#idtoDivPrintAdmin').height();
            var width = $('#idtoDivPrintAdmin').width();
            $('#idtoDivPrintAdmin').height('auto');
            var scaleBy = 5;
            var w = 1000;
            var h = 1000;
            var div = document.querySelector('#idtoDivPrintAdmin');
            var canvas = document.createElement('canvas');
            canvas.width = window.innerWidth * scaleBy;
            canvas.height = window.innerHeight * scaleBy;

            var context = canvas.getContext('2d');
            context.scale(scaleBy, scaleBy);
            html2canvas(div, {
                canvas: canvas,
                onrendered: function (canvas) {
                    thecanvas = canvas;
                    var data = thecanvas.toDataURL();
                    var docDefinition = {
                        // pageSize: { width: thecanvas.width, height: thecanvas.height },
                        content: [{
                            image: data,
                            width: 500
                        }],
                    };
                    pdfMake.createPdf(docDefinition).download("Table.pdf");
                    $('#idtoDivPrintAdmin').height(height);
                }
            });
        }

        $scope.stboclogin = function () {
            $state.go('login');
        }
    });


    app.factory('Excel', function ($window) {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId),
                    ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };


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

//        //    $scope.closeModal = function () {
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


//        $scope.closeModal = function () {
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