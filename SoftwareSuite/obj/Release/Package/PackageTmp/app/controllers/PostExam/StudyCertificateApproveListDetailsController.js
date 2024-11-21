define(['app'], function (app) {
    app.controller("StudyCertificateApproveListDetailsController", function ($scope, $http, $localStorage, $state, DigitalSignatureService, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
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

        var getBranchList = PreExaminationService.GetBranchs();
        getBranchList.then(function (response) {
            $scope.Branches = response.Table;
        },
        function (error) {
        
            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
           
        });

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetApprovalDetails()
        }

        var GetBonafideTypes = PreExaminationService.GetBonafideTypes();
        GetBonafideTypes.then(function (response) {

            if (response.Table.length > 0) {
                $scope.BonafideTypes = response.Table;

            }
        },
            function (error) {

            });

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
                        dataPay.Id = $scope.ApprovalDetails[i].Id
                        PaymentStudent.push(dataPay);
                        PaymentStudentList.push($scope.ApprovalDetails[i].PIN);
                        PaymentStudentList.push($scope.ApprovalDetails[i].Id);
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
            var ResetCertificateStatus = PreExaminationService.ResetCertificateStatus(91, PIN, Path);
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

        $scope.ReleaseBonafidePin = function (PIN) {
           
            var ReleaseBonafidePin = PreExaminationService.ReleaseStudyPin(PIN);
            ReleaseBonafidePin.then(function (response) {
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


        $scope.sensSMS = function (Id,PIN, Path, mobile, ind) {
            if (mobile == null || angular.isUndefined(mobile) || mobile == "") {
                alert("Mobile No not Found");
                return;
            }
            if (Path == null || angular.isUndefined(Path) || Path == "") {
                alert("Certificate not found");
                return;
            }

            //url = Path.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
            url = Path.replace('www.', '');    // for https use url..split("://")[0];
            url = url.replace('https://', '');


            $scope['smsbtndisable' + ind] = true;
            var sensSMS = PreExaminationService.sendcertSMS(PIN, url, mobile, "Study Certificate");
            sensSMS.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response == "SUCCESS") {
                    var UpdateSmsStatus = PreExaminationService.UpdateSmsStatus(9, PIN,Id);
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
            var ApproveList = PreExaminationService.GetStudyApprovalListByScheme($scope.Scheme, $scope.ApproveType, $scope.UserTypeId, $scope.College_Code, $scope.BranchCode);
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
                    $scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                    $scope.btndisable = false;
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
                    $state.go('Dashboard.PostExam.StudyCertificateApproveList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDesc)
                    $state.go('Dashboard.PostExam.StudyCertificateApproveList');
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
                    $state.go('Dashboard.PostExam.StudyCertificateApproveList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDesc)
                    $state.go('Dashboard.PostExam.StudyCertificateApproveList');
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

        $scope.openDetails = function (CertificateType, Pin,Id) {

            $localStorage.certData = {
                Certificate: CertificateType,
                pin: Pin,
                Id: Id
            }

            $state.go('Dashboard.PreExamination.StudyCertificate');
        }

        $scope.OpenData = function (Pin) {
            $localStorage.certData = {

                pin: Pin
            }
            $state.go('Dashboard.PostExam.StudyCertificate')
        }

        $scope.UpdateAcaYear = function (StartYear,EndYear) {
            //var tempyr = (parseInt(StartYear) .toString();
            if (StartYear == '' || StartYear == null || StartYear == undefined) {
               // alert('Please Select From Year')
                return
            }
            if (EndYear == '' || EndYear == null || EndYear == undefined) {
               // alert('Please Select To Year')
                return
            }
           
            var yr = StartYear + '-' + EndYear;
            $scope.StudentDetails.AcademicYear = yr;
        }

        $scope.OpenPopup = function (pin, Id) {
            var ApproveList = PreExaminationService.getStudyRequestedDetailsByPin(pin,Id);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response.Table[0].ResponceCode == '200') {
                    var data = response.Table1[0];
                    $scope.StudentDetails = data;
                    $scope.$emit('hideLoading', data);
                    if ($scope.StudentDetails.AcademicYear != '' && $scope.StudentDetails.AcademicYear != null && $scope.StudentDetails.AcademicYear != undefined) {
                       var tmp = $scope.StudentDetails.AcademicYear.split('-');
                        $scope.StartYear = tmp[0];
                        $scope.EndYear = tmp[1];
                    }
                   
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/PostExam/StudyCertificateDetailsPopup.html",
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
        //    //        Certificate: CertifiScateType,
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
                if (!PaymentStudentList.includes(data.Id)) {
                    dataPay = {};
                    dataPay.PIN = data.PIN
                    dataPay.isChecked = data.isChecked
                    dataPay.Id = data.Id
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.PIN);
                    PaymentStudentList.push(data.Id);
                    PaymentStudentList.push(data.isChecked)
                }
                else if (PaymentStudentList.includes(data.Id)) {
                    PaymentStudentList.remByVal(data.PIN);
                    PaymentStudentList.remByVal(data.isChecked);
                    PaymentStudentList.remByVal(data.Id);

                    PaymentStudent.remElementByVal(data.PIN);
                    PaymentStudent.remElementByVal(data.Id);
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
                if (this[i].Id === val) {
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
                    //if (angular.isUndefined($scope.UserCertificates) || $scope.UserCertificates[0].SerialNumber == null) {
                    //    alert('Link the Digital signature to sign the documents');
                    //    return;
                    //}
                    $scope.buttonlabel = "Signing in process ...";
                    var GetInterimCertificateTobeSignedlocation = PreExaminationService.GetStudyCertificateTobeSignedlocation(PaymentStudent)
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
                                    "Id": response[i].Id,
                                    "Pin": response[i].Pin,
                                    "CertificateServiceId": 9,
                                    "PdfLocation": response[i].PdfUrl,
                                    "SerialNumber": $scope.UserCertificates[0].SerialNumber,
                                    "ApplicationNo": angular.isUndefined(response[i].ApplicationNumber) ? "" : response[i].ApplicationNumber,
                                    "Designation": "",
                                    "llx": 390,
                                    "lly": 465,   /*//430px*/
                                    "urx": 390 + 180,
                                    "ury": 465 + 60,
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
                                            for (var i = 0; i < paramObject.length; i++) {
                                                if (item.Pin === paramObject[i].Pin) {
                                                    signedpins.push({ "PIN": item.Pin, "Id": paramObject[i].Id });
                                                }
                                            }
                                          
                                        }
                                    });
                                    if (signedpins.length <= 0) {
                                        alert("certificate signing failed ");
                                        $scope.btndisable = false;
                                        $scope.buttonlabel = "Approve";
                                        return;
                                    }

                                    var getData = PreExaminationService.StudyMultipleSelectApprove(signedpins, $scope.UserTypeId, ApproveStatus)
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
                        dataPay.Id = PaymentStudent[i].Id;
                        array.push(dataPay);
                        //array.push($scope.PaymentStudent[i].PIN);
                    }
                    $scope.btndisable = true;
                    var ApproveStatus = 1
                    var Approve = PreExaminationService.StudyMultipleSelectApprove(array, $scope.UserTypeId, ApproveStatus);
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
                var Approve = PreExaminationService.StudySetApproveStatusReject(PaymentStudent, $scope.UserTypeId, ApproveStatus, remarks);
                Approve.then(function (response) {
                    var response = JSON.parse(response)
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.GetApprovalDetails();
                        $scope.btndisable = false;
                        $state.go('Dashboard.PostExam.StudyCertificateApproveListDetails');
                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.GetApprovalDetails();
                        $scope.btndisable = false;
                        $state.go('Dashboard.PostExam.StudyCertificateApproveListDetails');
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

        $scope.Verify = function (StartYear, EndYear) {

            if ($scope.StudentDetails.Name == null || $scope.StudentDetails.Name == '' || $scope.StudentDetails.Name == undefined) {
                alert('please Enter Name');
                return;
            }
            if (($scope.UserTypeId == 3 || $scope.UserTypeId == 2) && ($scope.StudentDetails.conduct == null || $scope.StudentDetails.conduct == '' || $scope.StudentDetails.conduct == undefined)) {
                alert('please select conduct.');
                return;
            }
            if ($scope.StudentDetails.FatherName == null || $scope.StudentDetails.FatherName == '' || $scope.StudentDetails.FatherName == undefined) {
                alert('please Enter Father name.');
                return;
            }
            if ($scope.StudentDetails.BranchCode == null || $scope.StudentDetails.BranchCode == '' || $scope.StudentDetails.BranchCode == undefined) {
                alert('please Enter Branch Code.');
                return;
            }
            if (StartYear == null || StartYear == '' || StartYear == undefined) {
                alert('please select from Academic Year.');
                return;
            }
            if (EndYear == null || EndYear == '' || EndYear == undefined) {
                alert('please select to Academic Year.');
                return;
            }
            if ($scope.StudentDetails.AcademicYear == null || $scope.StudentDetails.AcademicYear == '' || $scope.StudentDetails.AcademicYear == undefined) {
                alert('please select Academic Year.');
                return;
            }

            var stuconduct = $scope.StudentDetails.conduct == null || $scope.StudentDetails.conduct == undefined ? ' ' : $scope.StudentDetails.conduct
            var ApproveStatus = 1
            var Approve = PreExaminationService.StudySetVerifyStatus($scope.StudentDetails.pin, $scope.StudentDetails.Name, $scope.StudentDetails.FatherName, $scope.StudentDetails.BranchCode, $scope.StudentDetails.AcademicYear, $scope.StudentDetails.conduct, $scope.UserTypeId, $scope.StudentDetails.Id);

            Approve.then(function (response) {


                try { var response = JSON.parse(response); } catch (err) { }
                if (response.Table != undefined) {
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.closeModal()

                        $scope.GetApprovalDetails()
                        $scope.StartYear = "";
                        $scope.EndYear = "";

                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.StartYear = "";
                        $scope.EndYear = "";
                        $state.go('Dashboard.PostExam.StudyCertificateApproveListDetails');
                        $scope.closeModal()
                    }
                    else {
                        //$scope.$emit('hideLoading', data);
                        $scope.Data = false;
                        $scope.Nodata = true;
                        $scope.StartYear = "";
                        $scope.EndYear = "";
                    }
                } else {
                    alert("data not updated, something went wrong");
                    $scope.StartYear = "";
                    $scope.EndYear = "";
                    $scope.closeModal()
                }
                //alert("Success")

            },
                function (error) {
                    //$scope.$emit('hideLoading', data);
                    $scope.StartYear = "";
                    $scope.EndYear = "";
                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");
                });
        };

    })
})