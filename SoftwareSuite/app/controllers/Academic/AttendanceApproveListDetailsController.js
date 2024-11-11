define(['app'], function (app) {
    app.controller("AttendanceApproveListDetailsController", function ($scope, $http, $localStorage, $state, $stateParams, Excel, $timeout, AppSettings, $uibModal, $timeout, PreExaminationService) {
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
                    if ($scope.ApprovalDetails[i].Verified == true) {

                        $scope.ApprovalDetails[i].isChecked = true;
                        if ($scope.ApprovalDetails[i].isChecked) {
                            dataPay = {};
                            dataPay.AttendeeId = $scope.ApprovalDetails[i].AttendeeId
                            PaymentStudent.push(dataPay);
                            PaymentStudentList.push($scope.ApprovalDetails[i].AttendeeId);
                        }

                    } else {
                        checkedStatus = false
                        $scope.allItemsSelected = false;
                        alert("Please Verify All Student Details by clicking concerned row")
                        return;
                    }
                }

            } else {
                for (var i = 0; i < $scope.ApprovalDetails.length; i++) {
                    $scope.ApprovalDetails[i].isChecked = false;
                    $scope.allItemsSelected = false;
                    PaymentStudent = [];
                    PaymentStudentList = [];
                }
            }
            //  console.log(PaymentStudent);
        };


        $scope.ApproveType = $localStorage.AttendanceData.ApproveType;
        $scope.CollegeCode = $localStorage.AttendanceData.CollegeCode;
        $scope.UserId = $localStorage.AttendanceData.UserId;

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

        //$scope.DownloadtoExcel = function () {
        //    var CertificateFeePaymentReports = PreExaminationService.CertificateFeePaymentReports($scope.Scheme);
        //    CertificateFeePaymentReports.then(function (res) {

        //        if (res.length > 0) {
        //            if (res.length > 4) {
        //                window.location.href = res;
        //            } else {
        //                alert("No Excel Report Present")
        //            }
        //        } else {
        //            alert("No Report Present")
        //        }
        //    }, function (err) {
        //        $scope.LoadImg = false;
        //        alert("Error while loading");
        //    });

        //}

        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'Table');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "AttendanceReports.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();

            }, 100);
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
            var ApproveList = PreExaminationService.GetAttendanceApprovalDetails($scope.UserId, $scope.CollegeCode, $scope.ApproveType);
            ApproveList.then(function (response) {
                var response = JSON.parse(response)
                console.log(response);
                if (response.Table.length>0) {
                    //if (response.Table1.length > 0) {
                        $scope.$emit('hideLoading', data);
                        $scope.ApprovalDetails = response.Table;
                        //for (var j = 0; j < response.Table1.length; j++) {
                        //    $scope['smsbtndisable' + j] = false;
                        //}
                        PaymentStudentList = []
                        PaymentStudent = []
                        $scope.Data = true;
                        $scope.Nodata = false;
                    //} else {
                    //    $scope.$emit('hideLoading', data);
                    //    $scope.Data = false;
                    //    $scope.Nodata = true;
                    //}

                //} else if (response.Table[0].ResponseCode == '400') {
                //    $scope.$emit('hideLoading', data);
                //    $scope.Data = false;
                //    $scope.Nodata = true;
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
     
        $scope.Verify = function (AttendeeId, Pin) {
            var ApproveList = PreExaminationService.SetAttendanceVerificationStatus($scope.UserId, AttendeeId, Pin);
            ApproveList.then(function (response) {
                var response = JSON.parse(response)
               
                if (response.Table[0].ResponceCode == '200') {
                    $scope.closeModal();
                    alert(response.Table[0].ResponceDescription)

                } else if (response.Table[0].ResponceCode == '400') {
                    $scope.closeModal();
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

        $scope.OpenPopup = function (AttendeeId, Pin) {
            var ApproveList = PreExaminationService.getAttendanceDetails($scope.UserId, AttendeeId, Pin);
            ApproveList.then(function (response) {
                var response = JSON.parse(response)

                $scope.StudentDetails = response.Table//.Table[0];
                $scope.RemarksData = response.Table1
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
                templateUrl: "/app/views/Academic/AttendanceDetailsPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //ackdrop: false,
            });
            $scope.closeModal = function () {
               // $uibModalInstance.dismiss()
                $scope.modalInstance.dismiss();
                $scope.modalInstance.close();
                //$scope.modalInstance.close();
            }
        }

        $scope.closeModal = function () {
            // $uibModalInstance.dismiss()
            $scope.modalInstance.dismiss();
            $scope.modalInstance.close();
            //$scope.modalInstance.close();
        }

        $scope.Approve = function (Pin) {
            $scope.Pin = Pin;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/AlertPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
               // backdrop: false,
            });

           
        }
     

        var PaymentStudent = [];
        var PaymentStudentList = [];

        $scope.selectEntity = function (data) {
            if ($scope.UserTypeId == 1015) {
                if (data.Verified == 0) {
                    data.isChecked = false
                    alert("Please Verify Student Details by clicking concerned row")
                    return
                }
            }
            $scope.allItemsSelectedthing = false;
            if (data != null) {
                if (!PaymentStudentList.includes(data.AttendeeId)) {
                    dataPay = {};
                    dataPay.AttendeeId = data.AttendeeId
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.AttendeeId);
                }
                else if (PaymentStudentList.includes(data.AttendeeId)) {
                    PaymentStudentList.remByVal(data.AttendeeId);
                    PaymentStudent.remElementByVal(data.AttendeeId);
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
                if (this[i].AttendeeId === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }



        $scope.Submit = function (ApproveStatus,remarks) {
            if (PaymentStudent != [] && PaymentStudent != '') {
                //console.log(PaymentStudent)
               
                $scope.btndisable = true;
                $scope.Remarks = remarks;
                if ($scope.Remarks == null || $scope.Remarks == undefined || $scope.Remarks == "") {
                    $scope.Remarks = null;
                }
                if ($scope.UserTypeId == '1015') {
                    var getData = PreExaminationService.AttendanceApproveStatus(PaymentStudent, $scope.UserId, ApproveStatus, $scope.Remarks)
                    getData.then(function (response) {
                                        var response = JSON.parse(response)
                                        if (response.Table[0].ResponseCode == '200') {
                                            alert(response.Table[0].ResponseDescription);
                                            $scope.buttonlabel = "Approve";
                                            $scope.btndisable = false;
                                            $scope.getlist();
                                            if ($scope.Remarks != "" || $scope.Remarks != undefined || $scope.Remarks == null) {
                                                $scope.closeModal()
                                            }

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
            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.remarks = '';
                $scope.modalInstance = $uibModal.open({
                    templateUrl: "/app/Controllers/PostExam/RejectPopup.html",
                    size: 'xlg',
                    scope: $scope,
                    windowClass: 'modal-fit-att',
                   // backdrop: false,
                });
             
            } else {
                alert("Please select Pins")
                return;
            }
        }


        //$scope.closeModal = function () {
        //    $scope.modalInstance = $uibModal({})
        //    alert()
        //   // $uibModalInstance.close(result);
        //    $scope.modalInstance.dismiss();
        //    $scope.modalInstance.dismiss('cancel');
        //    $scope.modalInstance.close();
        //}


        //$scope.Submit = function (remarks) {
        //    if (PaymentStudent != [] && PaymentStudent != '') {
        //        var ApproveStatus = 2
        //        $scope.btndisable = true;

        //        var Approve = PreExaminationService.MigrationSetApproveStatusReject(PaymentStudent, $scope.UserId, ApproveStatus, remarks);
        //        Approve.then(function (response) {
        //            var response = JSON.parse(response)
        //            if (response.Table[0].ResponseCode == '200') {
        //                alert(response.Table[0].ResponseDescription)
        //                $scope.btndisable = false;
        //                $scope.closeModal()
        //                $scope.getlist();

        //            } else if (response.Table[0].ResponseCode == '400') {
        //                alert(response.Table[0].ResponseDescription)
        //                $scope.btndisable = false;
        //                $scope.closeModal()
        //                $scope.getlist();
        //            }
        //            else {
        //                //$scope.$emit('hideLoading', data);
        //                $scope.Data = false;
        //                $scope.Nodata = true;
        //                $scope.closeModal()

        //            }
        //            //alert("Success")

        //        },
        //            function (error) {
        //                //$scope.$emit('hideLoading', data);
        //                $scope.btndisable = false;

        //                $scope.Data = false;
        //                $scope.Nodata = true;
        //                $scope.closeModal()
        //                alert("error while loading data");
        //            });
        //    } else {
        //        alert('select the pins');
        //        return;
        //    }
        //}



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
    app.factory('Excel', function ($window) {
        //alert("hello");
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
    });
})
