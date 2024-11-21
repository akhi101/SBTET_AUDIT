define(['app'], function (app) {
    app.controller("TcApprovalListDetailsController", function ($scope, $http, $localStorage, $state, DigitalSignatureService, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        $scope.btndisable = false;
        $scope.MyCheck = false;
        var authData = $localStorage.authorizationData;
     
        $scope.UserTypeId = authData.SystemUserTypeId;
        $scope.sscVerified = false;
        $scope.ApproveType = $localStorage.CertificateData.ApproveType;
        $scope.Scheme = $localStorage.CertificateData.Scheme;
        $scope.College_Code = authData.College_Code;
        $scope.BranchCode = authData.BranchCode;
        
        var PaymentStudent = [];
        var PaymentStudentList = [];
        $scope.buttonlabel = "Approve";

        $scope.Conduct = [{ "Id": 1, "Name": "Satisfactory" },
        { "Id": 2, "Name": "Good" }, { "Id": 3, "Name": "UnSatisfactory" }
        ]

        $scope.Promoted = [{ "Id": 1, "Name": "Yes" },
        { "Id": 1, "Name": "No" }]

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetApprovalDetails()
        }

        $scope.selectAll = function (val) {
            PaymentStudent = [];

            if (val == true) {
                for (var i = 0; i < $scope.ApprovalDetails.length; i++) {
                    if ($scope.UserTypeId == 1006) {
                        if ($scope.ApprovalDetails[i].Clg_AdminVerified == 0) {
                            $scope.ApprovalDetails[i].isChecked = false
                            $scope.allItemsSelected = false;
                            $scope.checkedStatus = false;
                            val = false;
                            alert("Please Verify all Student Details by clicking concerned row")
                            return;
                        }
                    } else
                        if ($scope.UserTypeId == 3) {
                            if ($scope.ApprovalDetails[i].Clg_HodVerified == 0) {
                                $scope.ApprovalDetails[i].isChecked = false
                                $scope.allItemsSelected = false;
                                $scope.checkedStatus = false;
                                val = false;
                                alert("Please Verify all Student Details by clicking concerned row")
                                return;
                            }
                        } else
                            if ($scope.UserTypeId == 2) {
                                if ($scope.ApprovalDetails[i].Clg_PrincipalVerified == 0) {
                                    $scope.ApprovalDetails[i].isChecked = false
                                    $scope.allItemsSelected = false;
                                    $scope.checkedStatus = false;
                                    val = false;
                                    alert("Please Verify all Student Details by clicking concerned row")
                                    return;
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

        $scope.ReleaseTcPin = function (PIN) {

            var ReleasePin = PreExaminationService.ReleaseTcPin(PIN);
            ReleasePin.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponseCode == "200") {
                    alert(response[0].ResponseDesc);
                    $scope.GetApprovalDetails();
                } else {
                    alert(response[0].ResponseDesc);
                    $scope.GetApprovalDetails();
                }

            }, function (err) {
                $scope.GetApprovalDetails();
            });



        }


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

        var Religion = PreExaminationService.GetReligion();
        Religion.then(function (response) {
            //var response = JSON.parse(response)
            $scope.Religions = response.Table
        }, function (error) {


            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });

        $scope.ResetCertificateStatus = function (PIN, Path) {
            if (Path == null || Path == '' || Path == undefined) {
                var Path = '';
            }
            var ResetCertificateStatus = PreExaminationService.ResetCertificateStatus(6, PIN, Path);
            ResetCertificateStatus.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponceCode == "200") {
                    alert(response[0].ResponceDescription);
                    $scope.GetApprovalDetails();
                } else {
                    alert(response[0].ResponceDescription);
                    $scope.GetApprovalDetails();
                }

            }, function (err) {
                $scope.GetApprovalDetails();
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

          var  resultpath = Path.replace(/(^\w+:|^)\/\//, '');
           
            var sensSMS = PreExaminationService.sendcertSMS(PIN, resultpath, mobile, "Transfer");
            sensSMS.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response == "SUCCESS") {
                    var UpdateSmsStatus = PreExaminationService.UpdateSmsStatus(6, PIN);
                    UpdateSmsStatus.then(function (response) {
                        try { var response = JSON.parse(response) } catch (err) { }
                        if (response[0].ResponceCode == "200") {
                            alert(response[0].ResponceDescription);
                            $scope.GetApprovalDetails();
                        } else {
                            alert(response[0].ResponceDescription);
                            $scope.GetApprovalDetails();
                        }
                        $scope['smsbtndisable' + ind] = false;
                    }, function (err) {
                        $scope['smsbtndisable' + ind] = false;
                        $scope.GetApprovalDetails();
                    });

                } else {
                    alert(response);
                    $scope.GetApprovalDetails();
                }
                $scope['smsbtndisable' + ind] = false;
            }, function (err) {
                $scope['smsbtndisable' + ind] = false;
                $scope.GetApprovalDetails();
            });

        }
        //$scope.sensSMS = function (PIN, Path, mobile) {
        //    if (mobile == null || angular.isUndefined(mobile) || mobile == "") {
        //        alert("Mobile No not Found");
        //        return;
        //    }
        //    if (Path == null || angular.isUndefined(Path) || Path == "") {
        //        alert("Certificate not found");
        //        return;
        //    }
        //    $scope.smsbtndisable = true;
        //    var sensSMS = PreExaminationService.sendcertSMS(PIN, Path, mobile, "Transfer");
        //    sensSMS.then(function (response) {
        //        try { var response = JSON.parse(response) } catch (err) { }
        //        if (response == "SUCCESS") {
        //            alert("Sms Sent");
        //        } else {
        //            alert(response);
        //        }
        //        $scope.smsbtndisable = false;
        //    }, function (err) {
        //        $scope.smsbtndisable = false;
        //    });


        //}

        var Caste = PreExaminationService.GetCastes();
        Caste.then(function (response) {
            //var response = JSON.parse(response)
            $scope.Castes = response.Table
        }, function (error) {


            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });




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



        var sems = PreExaminationService.getAllSemester();
        sems.then(function (response) {
            //var response = JSON.parse(response)
            //console.log(response);
            $scope.Semesters = response.Table
            //$scope.StudentDetails.LeftClass = response.Table[0].semid
            //alert($scope.StudentDetails.LeftClass)
        },
            function (error) {
                $scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });

        $scope.GetApprovalDetails = function () {
            var ApproveList = PreExaminationService.GetTcApprovalDetails($scope.Scheme, $scope.ApproveType, $scope.UserTypeId, $scope.College_Code, $scope.BranchCode);
            ApproveList.then(function (response) {
                var response = JSON.parse(response)
                console.log(response);
                if (response.Table[0].ResponseCode == '200') {
                    if (response.Table1.length > 0) {
                        $scope.$emit('hideLoading', data);
                        PaymentStudent = [];
                        PaymentStudentList = [];
                        $scope.ApprovalDetails = response.Table1;
                        for (var j = 0; j < response.Table1.length; j++) {
                            $scope['smsbtndisable' + j] = false;
                        }
                        $scope.Data = true;
                        $scope.Nodata = false;
                        $scope.btndisable = false;
                    } else {
                        $scope.$emit('hideLoading', data);
                        $scope.Data = false;
                        $scope.Nodata = true;
                        $scope.btndisable = false;
                    }


                } else if (response.Table[0].ResponseCode == '400') {
                    $scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                    $scope.btndisable = false;
                }
                else {
                    $scope.btndisable = false;
                    $scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                }

            },
                function (error) {
                    $scope.$emit('hideLoading', data);
                    $scope.btndisable = false;
                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");
                });
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




        $scope.Changecheck = function () {

            if ($scope.MyCheck == false) {
                $scope.btndisable = false;
                //$scope.MyCheck = true;
            } else {
                $scope.btndisable = true;
            }

        }

        $scope.Approve = function (Pin) {
            $scope.Pin = Pin;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/AlertPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });

            $scope.closeModal = function () {

                $scope.modalInstance.close();
            }
        }

        $scope.Proceed = function (status) {
            $scope.Pin;
            $scope.Approve = status;
            //alert("Certificate Approved Successfully")
            $scope.modalInstance.close();
            var ApproveList = PreExaminationService.SetCertificateApproval($scope.Pin, $scope.Approve);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response); } catch (err) { }

                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDesc)
                    $state.go('Dashboard.PostExam.CertificateApproveList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDesc)
                    $state.go('Dashboard.PostExam.CertificateApproveList');
                }
                else {
                    //$scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                }

            },
                function (error) {
                    //$scope.$emit('hideLoading', data);

                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");
                });
        }

        $scope.Proceed1 = function (Pin) {
            $scope.Pin = Pin;
            $scope.Approve = 2;

            var ApproveList = PreExaminationService.SetCertificateApproval($scope.Pin, $scope.Approve);
            ApproveList.then(function (response) {
                var response = JSON.parse(response)
                // console.log(response);

                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDesc)
                    $state.go('Dashboard.PostExam.CertificateApproveList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDesc)
                    $state.go('Dashboard.PostExam.CertificateApproveList');
                }
                else {
                    //$scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                }

            },
                function (error) {
                    //$scope.$emit('hideLoading', data);

                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");
                });
        }

        $scope.openDetails = function (CertificateType, Pin) {

            $localStorage.certData = {
                Certificate: CertificateType,
                pin: Pin
            }

            $state.go('Dashboard.PostExam.TransferCertificatePending');
        }

        $scope.OpenData = function (Pin) {
            $localStorage.certData = {

                pin: Pin
            }
            $state.go('Dashboard.PostExam.TransferCertificate')
        }

        $scope.OpenPopup = function (pin, Certificate) {
            var ApproveList = PreExaminationService.getTcRequestedDetailsByPin(pin);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response.Table[0].ResponceCode == '200') {
                    var data = response.Table1[0];
                    $scope.StudentDetails = data;
                    $scope.StudentDetails.Nationality = 'INDIAN';
                    $scope.$emit('hideLoading', data);
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/PostExam/TcDeatilsPopup.html",
                        size: 'xlg',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                        //backdrop: 'static',
                    });
                } else {
                    alert('data cannot be displayed, something went wrong.');
                }

            },
                function (error) {
                    //$scope.$emit('hideLoading', data);

                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");
                    $scope.$emit('hideLoading', data);
                });

        }


        //$scope.openApprove = function (CertificateType, Pin) {
        //   // if ($scope.UserTypeId == 3) {
        //        $localStorage.certData = {
        //            Certificate: CertificateType,
        //            pin: Pin
        //        }

        //        $state.go('Dashboard.PostExam.TransferCertificatePending');
        //    //} else {
        //    //    $localStorage.certData = {
        //    //        Certificate: CertificateType,
        //    //        pin: Pin
        //    //    }
        //    //    $state.go('Dashboard.PostExam.Tc_StudentDetails')
        //    //}
        //}


        $scope.selectEntity = function (data) {
            if ($scope.UserTypeId == 1006) {
                if (data.Clg_AdminVerified == 0) {
                    data.isChecked = false
                    alert("Please Verify Student Details by clicking concerned row")
                    return
                }
            } else
                if ($scope.UserTypeId == 3) {
                    if (data.Clg_HodVerified == 0) {
                        data.isChecked = false
                        alert("Please Verify Student Details by clicking concerned row")
                        return
                    }
                } else
                    if ($scope.UserTypeId == 2) {
                        if (data.Clg_PrincipalVerified == 0) {
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
                    dataPay.isChecked = data.isChecked
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.PIN);
                    PaymentStudentList.push(data.isChecked)
                }
                else if (PaymentStudentList.includes(data.PIN)) {
                    PaymentStudentList.remByVal(data.PIN);
                    PaymentStudentList.remByVal(data.isChecked);
                    PaymentStudent.remElementByVal(data.PIN);

                    PaymentStudent.remElementByVal(data.isChecked);
                    if (PaymentStudentList.length == 0) {
                        $scope.allItemsSelectedthing = false;
                    }
                }
            }
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



        $scope.Approve = function () {
            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.btndisable = true;
                var ApproveStatus = 1;
                if ($scope.UserTypeId == '2') {
                    if (angular.isUndefined($scope.UserCertificates) || $scope.UserCertificates[0].SerialNumber == null) {
                        alert('Link the Digital signature to sign the documents');
                        return;
                    }
                    $scope.buttonlabel = "Signing in process ...";
                    var GetInterimCertificateTobeSignedlocation = PreExaminationService.GetTransferCertificateTobeSignedlocation(PaymentStudent)
                    GetInterimCertificateTobeSignedlocation.then(function (response) {
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
                                    "CertificateServiceId": 6,
                                    "PdfLocation": response[i].PdfUrl,
                                    "SerialNumber": $scope.UserCertificates[0].SerialNumber,
                                    "ApplicationNo": angular.isUndefined(response[i].ApplicationNumber) ? "" : response[i].ApplicationNumber,
                                    "Designation": " ",
                                    "llx": 390,
                                    "lly": 135,
                                    "urx": 390 + 180,
                                    "ury": 135 + 60,
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

                                    var getData = PreExaminationService.TCMultipleSelectApprove(signedpins, $scope.UserTypeId, ApproveStatus)
                                    getData.then(function (response) {
                                        try { var response = JSON.parse(response) } catch (err) { }
                                        if (response.Table[0].ResponseCode == '200') {
                                            alert(response.Table[0].ResponseDescription);
                                        } else {
                                            alert(response.Table[0].ResponseDescription);
                                        }
                                        $scope.GetApprovalDetails();
                                        $scope.buttonlabel = "Approve";
                                        $scope.btndisable = false;
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
                    var array = []
                    for (var i = 0; i < PaymentStudent.length; i++) {
                        dataPay = {};
                        dataPay.PIN = PaymentStudent[i].PIN;

                        array.push(dataPay);
                        //array.push($scope.PaymentStudent[i].PIN);
                    }
                    $scope.btndisable = true;
                    var ApproveStatus = 1
                    var Approve = PreExaminationService.TCMultipleSelectApprove(array, $scope.UserTypeId, ApproveStatus);
                    Approve.then(function (response) {
                        var response = JSON.parse(response)
                        if (response.Table[0].ResponseCode == '200') {
                            alert(response.Table[0].ResponseDescription);
                            $scope.btndisable = false;

                            $scope.GetApprovalDetails()
                            // $state.go('Dashboard.PostExam.TcApprovalList');
                        } else if (response.Table[0].ResponseCode == '400') {
                            alert(response.Table[0].ResponseDescription)
                            $scope.GetApprovalDetails();
                            $scope.btndisable = false;
                            // $state.go('Dashboard.PostExam.TcApprovalList');
                        }
                        else {
                            //$scope.$emit('hideLoading', data);
                            $scope.Data = false;
                            $scope.Nodata = true;
                            $scope.btndisable = false;
                        }
                        //alert("Success")

                    },
                        function (error) {
                            //$scope.$emit('hideLoading', data);
                            $scope.btndisable = false;
                            $scope.Data = false;
                            $scope.Nodata = true;
                            alert("error while loading data");
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

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.Submit = function (remarks) {
            if (PaymentStudent != [] && PaymentStudent != '') {
                var ApproveStatus = 2
                $scope.btndisable = true;
                var Approve = PreExaminationService.TcSetApproveStatusReject(PaymentStudent, $scope.UserTypeId, ApproveStatus, remarks);
                Approve.then(function (response) {
                    var response = JSON.parse(response)
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.GetApprovalDetails();
                        $scope.btndisable = false;
                        //$state.go('Dashboard.PostExam.TcApprovalList');
                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.GetApprovalDetails();
                        $scope.btndisable = false;
                        // $state.go('Dashboard.PostExam.TcApprovalList');
                    }
                    else {
                        //$scope.$emit('hideLoading', data);
                        $scope.Data = false;
                        $scope.Nodata = true;
                        $scope.btndisable = false;
                    }
                    //alert("Success")

                },
                    function (error) {
                        //$scope.$emit('hideLoading', data);
                        $scope.btndisable = false;
                        $scope.Data = false;
                        $scope.Nodata = true;
                        alert("error while loading data");
                    });
            } else {
                alert('select the pins');
                return;
            }
        }

        $scope.Verify = function (Religion, Caste, AdmittedDate, LeftDate, CollegeDuesPaid, Promoted, ConductValue, LeftClass, StudentRemarks) {
            if ($scope.UserTypeId == null || $scope.UserTypeId == '') {
                alert('user do not have acces to update.');
                return;
            }
            if (($scope.StudentDetails.CollegeDuesPaid == null || $scope.StudentDetails.CollegeDuesPaid == '' || $scope.StudentDetails.CollegeDuesPaid == undefined)) {
                alert("Please Select wheather candidate paid all fee dues.")
                return;
            }
            if ($scope.StudentDetails.Promoted == null || $scope.StudentDetails.Promoted == '' || $scope.StudentDetails.Promoted == undefined) {
                alert('please select He/She Qualified for Promotion to higher Class.');
                return;
            }
            if ($scope.StudentDetails.LeftClass == null || $scope.StudentDetails.LeftClass == '' || $scope.StudentDetails.LeftClass == undefined) {
                alert('please select the semester at the time of leaving.');
                return;
            }
            if ($scope.StudentDetails.ReligionId == null || $scope.StudentDetails.ReligionId == '' || $scope.StudentDetails.ReligionId == undefined) {
                alert('please select Religion.');
                return;
            }
            if ($scope.StudentDetails.CasteId == null || $scope.StudentDetails.CasteId == '' || $scope.StudentDetails.CasteId == undefined) {
                alert('please select Caste.');
                return;
            }
            if ($scope.StudentDetails.AdmissionNo == null || $scope.StudentDetails.AdmissionNo == '' || $scope.StudentDetails.AdmissionNo == undefined) {
                alert('please Enter Admission Number');
                return;
            }
            if ($scope.StudentDetails.Station == null || $scope.StudentDetails.Station == '' || $scope.StudentDetails.Station == undefined) {
                alert('please Enter college Location');
                return;
            }
            if (( $scope.UserTypeId == 2) && ($scope.StudentDetails.Conduct == null || $scope.StudentDetails.Conduct == '' || $scope.StudentDetails.Conduct == undefined)) {
                alert('please select conduct.');
                return;
            }
            if ($scope.StudentDetails.MotherName == null || $scope.StudentDetails.MotherName == '' || $scope.StudentDetails.MotherName == undefined) {
                alert('please Enter Mother name.');
                return;
            }
            if ($scope.StudentDetails.Dateofbirth == null || $scope.StudentDetails.Dateofbirth == '' || $scope.StudentDetails.Dateofbirth == undefined) {
                alert('please select Date of Birth.');
                return;
            }
            if ($scope.StudentDetails.admittedDate == null || $scope.StudentDetails.admittedDate == '' || $scope.StudentDetails.admittedDate == undefined) {
                alert('please select student college admitted Date.');
                return;
            }
            if ($scope.StudentDetails.LeftDate == null || $scope.StudentDetails.LeftDate == '' || $scope.StudentDetails.LeftDate == undefined) {
                alert('please select student college leaving Date.');
                return;
            }
            var stuconduct = $scope.StudentDetails.Conduct == null || $scope.StudentDetails.Conduct == undefined ? '' : $scope.StudentDetails.Conduct
            var ApproveStatus = 1
            //console.log($scope.StudentDetails.IdMark1, $scope.StudentDetails.IdMark2)
            var Approve = PreExaminationService.TcSetApproveStatus($scope.StudentDetails.Pin, $scope.UserTypeId, moment($scope.StudentDetails.admittedDate).format('DD-MM-YYYY'), moment($scope.StudentDetails.LeftDate).format('DD-MM-YYYY'), $scope.StudentDetails.CollegeDuesPaid,
                parseInt($scope.StudentDetails.ReligionId), $scope.StudentDetails.Nationality, parseInt($scope.StudentDetails.CasteId), moment($scope.StudentDetails.Dateofbirth).format('DD-MM-YYYY'), $scope.StudentDetails.MotherName,
                $scope.StudentDetails.Promoted, stuconduct, $scope.StudentDetails.StudentRemarks, $scope.StudentDetails.LeftClass, $scope.StudentDetails.Station, $scope.StudentDetails.AdmissionNo, $scope.StudentDetails.IdMark1, $scope.StudentDetails.IdMark2);

            Approve.then(function (response) {


                try { var response = JSON.parse(response); } catch (err) { }
                if (response.Table != undefined) {
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.closeModal()

                        $scope.GetApprovalDetails()

                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription)
                        $state.go('Dashboard.PostExam.TcApprovalList');
                        $scope.closeModal()
                    }
                    else {
                        //$scope.$emit('hideLoading', data);
                        $scope.Data = false;
                        $scope.Nodata = true;
                    }
                } else {
                    alert("data not updated, something went wrong");
                    $scope.closeModal()
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