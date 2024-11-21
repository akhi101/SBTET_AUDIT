define(['app'], function (app) {
    app.controller("NameCorrectionApproveListDetailsControler", function ($scope, $http, $localStorage, $uibModal, $state, AppSettings, PreExaminationService) {
        $scope.btnDisable = false;
        $scope.MyCheck = false;
        $scope.isAllchecked = false;
        $scope.allItemsSelectedthing = false;
        $scope.allItemsSelected = false;
        $scope.btndisable = false;
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        $scope.ApproveType = $localStorage.CertificateData.ApproveType;
        $scope.Scheme = $localStorage.CertificateData.Scheme;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetNameCorrectionListByScheme();
        }
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


        $scope.ReleasePin = function (PIN, CertificateTypeId, Id) {

            var ReleasePin = PreExaminationService.ReleaseStudentServicesPin(PIN, CertificateTypeId, Id);
            ReleasePin.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response.Table[0].ResponseCode == "200") {
                    alert(response.Table[0].ResponseDesc);
                    $scope.ApproveListDetails();
                } else {
                    alert(response.Table[0].ResponseDesc);
                    $scope.ApproveListDetails();
                }

            }, function (err) {
                $scope.ApproveListDetails();
            });



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


        $scope.CheckSSCData = function () {
            $scope.ResultNotFound = false;
            $scope.LoadImg = false;
            $scope.ResultFound = false;
            $scope.StuSSCdata = {};
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/PostExam/SscPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });

        }

        $scope.ResetToDs = function (Pin) {
            var ResetCertificateStatus = PreExaminationService.ResetNameCorrectionToDs(Pin);
            ResetCertificateStatus.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponceCode == "200") {
                    alert(response[0].ResponceDescription);
                    $scope.GetNameCorrectionListByScheme();
                } else {
                    alert(response[0].ResponceDescription);
                    $scope.GetNameCorrectionListByScheme();
                }

            }, function (err) {
                $scope.GetNameCorrectionListByScheme();
            });
        }

        $scope.ResetCertificateStatus = function (PIN, Path) {
            if (Path == null || Path == '' || Path == undefined) {
                var Path = '';
            }
            var ResetCertificateStatus = PreExaminationService.ResetCertificateStatus(7, PIN, Path);
            ResetCertificateStatus.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponceCode == "200") {
                    alert(response[0].ResponceDescription);
                    $scope.GetNameCorrectionListByScheme();
                } else {
                    alert(response[0].ResponceDescription);
                    $scope.GetNameCorrectionListByScheme();
                }

            }, function (err) {
                    $scope.GetNameCorrectionListByScheme();
            });



        }

        $scope.getsscDetails = function (sscHallticket, passedoutYear, sscType) {

            if ((sscHallticket == undefined) || (sscHallticket == "") || (sscHallticket == null)) {
                alert("Enter SSC HallTicket no.");
                return;
            }
            if ((passedoutYear == undefined) || (passedoutYear == "") || (passedoutYear == null)) {
                alert("Enter passed out Year");
                return;
            }
            if ((sscType == undefined) || (sscType == "") || (sscType == null)) {
                alert("Select pass type.");
                return;
            }
            $scope.ResultNotFound = false;
            $scope.LoadImg = true;
            $scope.ResultFound = false;
            var sscData = PreExaminationService.GetSSCDetails(sscHallticket, passedoutYear, sscType);
            sscData.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                $scope.StuSSCdata = {};
                if (response != "No Data Found") {
                    $scope.ResultNotFound = false;
                    $scope.LoadImg = false;
                    $scope.ResultFound = true;
                    $scope.StuSSCdata = response.Table;
                } else {
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;
                    $scope.ResultFound = false;
                }


            }, function (error) {
                $scope.ResultNotFound = true;
                $scope.LoadImg = false
                $scope.ResultFound = false;
            });

        }


        $scope.Update = function () {
            var updateData = PreExaminationService.UpdateNameCorrectionData($scope.StudentDetails.Pin, $scope.StudentDetails.UpdatedName, $scope.StudentDetails.UpdatedFatherName);
            updateData.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                } else {
                    alert("Failed to Update Details")
                }
            },
                function (error) {
                    //$scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");

                });
        }


        $scope.OpenPopup = function (pin, Certificate) {
            var ApproveList = PreExaminationService.getNCdetails(pin, Certificate);
            ApproveList.then(function (response) {
                var response = JSON.parse(response)

                $scope.StudentDetails = response.Table[0];
                $scope.$emit('hideLoading', data);
            },
                function (error) {
                    //$scope.$emit('hideLoading', data);

                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");
                    $scope.$emit('hideLoading', data);
                });
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/PostExam/DetailsPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
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

        $scope.GetNameCorrectionListByScheme = function () {
            $scope.ApprovalDetails = [];
            var ApproveList = PreExaminationService.GetNameCorrectionListByScheme($scope.Scheme, $scope.ApproveType, $scope.UserTypeId);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response.Table[0].ResponseCode == '200') {
                    if (response.Table1.length > 0) {
                        $scope.$emit('hideLoading', data);
                        PaymentStudent = [];
                        PaymentStudentList = [];
                        $scope.Data = true;
                        $scope.Nodata = false;
                    } else {
                        $scope.$emit('hideLoading', data);
                        $scope.Data = false;
                        $scope.Nodata = true;
                    }

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
        //    $scope.ApprovalData = [
        //{ "Id": "1", "Scheme": "C16", "CollegeCode": "20", "PIN": "16001-m-001", "Name": "Ram","Phone":"1234567890","ApprovalDate":"08-04-2020"},
        //  { "Id": "2", "Scheme": "C16", "CollegeCode": "20", "PIN": "16001-M-001", "Name": "Ramesh", "Phone": "1234567890", "ApprovalDate": "08-04-2020", },
        //    { "Id": "3", "Scheme": "C16", "CollegeCode": "20", "PIN": "16001-m-001", "Name": "Ram", "Phone": "1234567890", "ApprovalDate": "08-04-2020", }

        //    ]

        $scope.Changecheck = function () {

            if ($scope.MyCheck == false) {
                $scope.btnDisable = false;
                //$scope.MyCheck = true;
            } else {
                $scope.btnDisable = true;
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
                $scope.noteChallan = false;
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
                    $state.go('Dashboard.PostExam.NameCorrectionApproveList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDesc)
                    $state.go('Dashboard.PostExam.NameCorrectionApproveList');
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
               
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDesc)
                    $state.go('Dashboard.PostExam.NameCorrectionApproveList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDesc)
                    $state.go('Dashboard.PostExam.NameCorrectionApproveList');
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

        $scope.openDetails = function (pin, CertificateType) {
            //  alert()
            $localStorage.certData = {
                Certificate: CertificateType,
                pin: pin
            }
            $state.go('Dashboard.PostExam.NC_StudentDetails');
        }

        $scope.openPending = function (pin, CertificateType) {
            //alert(CertificateType)
            if ($scope.UserTypeId == 1009) {
                $localStorage.certData = {
                    Certificate: CertificateType,
                    pin: pin
                }
                $state.go('Dashboard.PostExam.NC_StudentDetails');
            } else {
                $localStorage.certData = {
                    Certificate: CertificateType,
                    pin: pin
                }
                $state.go('Dashboard.PostExam.NC_StudentDetails');
            }

        }

        $scope.OpenData = function () {
            $state.go('Dashboard.PostExam.NC_StudentDetails');
        }

        var PaymentStudent = [];
        var PaymentStudentList = [];

        $scope.selectEntity = function (data) {

            $scope.allItemsSelectedthing = false;
            if (data != null) {
                if (!PaymentStudentList.includes(data.PIN)) {
                    dataPay = {};
                    dataPay.PIN = data.PIN.trim();
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
            console.log(PaymentStudentList)
        };



        //$scope.selectAll = function () {
        //    $scope.allItemsSelectedthing = true;
        //    if ($scope.isAllchecked == true) {

        //        $scope.isAllchecked = false;


        //        for (var i = 0; i < $scope.ApprovalDetails.length; i++) {
        //            $scope.ApprovalDetails[i].isChecked = false;
        //        }
        //        PaymentStudent = [];
        //        PaymentStudentList = [];
        //    }
        //    else if ($scope.isAllchecked == false) {
        //        $scope.isAllchecked = true;
        //        for (var i = 0; i < $scope.ApprovalDetails.length; i++) {
        //            $scope.ApprovalDetails[i].isChecked = true;
        //        }
        //        PaymentStudent = [];
        //        PaymentStudentList = [];
        //        for (var i = 0; i < $scope.ApprovalDetails.length; i++) {
        //            dataPay = {};

        //            dataPay.PIN = $scope.ApprovalDetails[i].PIN;

        //            PaymentStudent.push(dataPay);
        //            PaymentStudentList.push({ 'Pin': $scope.ApprovalDetails[i].PIN });
        //        }
        //    }
        //    console.log(PaymentStudentList)
        //};
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

        $scope.Reject = function () {
            $scope.remarks = '';
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/Controllers/PostExam/RejectPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
        };

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.Submit = function (remarks) {

            if (remarks == "" || remarks == undefined || remarks == null) {
                alert("Please Enter remarks");
            }

            if (PaymentStudent != [] && PaymentStudent != '') {
                var ApproveStatus = 2
                $scope.btndisable = true;

                var Approve = PreExaminationService.NameCorrectionSetApproveStatusReject(PaymentStudent, $scope.UserTypeId, ApproveStatus, remarks);
                Approve.then(function (response) {
                    try { var response = JSON.parse(response) } catch (err) { }
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.closeModal()
                        $scope.btndisable = false;
                        $scope.GetNameCorrectionListByScheme();
                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.closeModal()
                        $scope.btndisable = false;
                        $scope.GetNameCorrectionListByScheme();
                    }
                    else {
                        $scope.closeModal()
                        $scope.Data = false;
                        $scope.Nodata = true;
                    }
                },
                    function (error) {
                        $scope.closeModal()
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

        $scope.Approve = function () {
            var ApproveStatus = 1

            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.btndisable = true;
                var Approve = PreExaminationService.NameCorrectionSetApproveStatus(PaymentStudent, $scope.UserTypeId, ApproveStatus);
                Approve.then(function (response) {
                    try { var response = JSON.parse(response); } catch (err) { }
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription);
                        $scope.btndisable = false;
                        $scope.GetNameCorrectionListByScheme();
                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription);
                        $scope.btndisable = false;
                        $scope.GetNameCorrectionListByScheme();
                    }
                    else {
                        $scope.btndisable = false;
                        $scope.Data = false;
                        $scope.Nodata = true;
                    }


                },
                    function (error) {
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


        $scope.Approve_Js = function () {
            var ApproveStatus = 1
            if (PaymentStudent != [] && PaymentStudent != '') {
                var Approve = PreExaminationService.NameCorrectionSetApproveStatusforDsJs(PaymentStudent, $scope.UserTypeId, ApproveStatus);
                Approve.then(function (response) {
                    try { var response = JSON.parse(response); } catch (err) { }
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.GetNameCorrectionListByScheme();
                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.GetNameCorrectionListByScheme();
                    }
                    else {

                        $scope.Data = false;
                        $scope.Nodata = true;
                    }


                },
                    function (error) {

                        $scope.Data = false;
                        $scope.Nodata = true;
                        alert("error while loading data");
                    });
            } else {
                alert('select the pins');
                return;
            }

        }


    })
})