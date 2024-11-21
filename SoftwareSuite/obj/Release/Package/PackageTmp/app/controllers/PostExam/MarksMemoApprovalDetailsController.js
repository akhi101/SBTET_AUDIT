define(['app'], function (app) {
    app.controller("MarksMemoApprovalDetailsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService, $uibModal) {

        $scope.btnDisable = false;
        $scope.MyCheck = false;
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        $scope.ApproveType = $localStorage.CertificateData.ApproveType;
        $scope.Scheme = $localStorage.CertificateData.Scheme;

        $scope.url = 'https://exams.sbtet.telangana.gov.in/downloads/Cert/'
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

        $scope.OpenOdc = function (Pin, Scheme, Sem, ExamMonthYear,SemId,ExamMonthYearId) {
            localStorage.setItem('MemoPin', Pin)    
            localStorage.setItem('MemoScheme', Scheme)

            localStorage.setItem('MemoSem', Sem)
            localStorage.setItem('ExamMonthYear', ExamMonthYear)
            localStorage.setItem('MemoSemId', SemId)
            localStorage.setItem('ExamMonthYearId', ExamMonthYearId)
           // $state.go('Dashboard.PostExam.SemesterData')
            //var url = 'http://localhost:50421/index.html#!/Dashboard/PostExam/MarksMemoApproval/MarksMemoApprovalDetails/SemesterData'
            var url = window.location.href + '/SemesterData';
            window.location = url;
            //window.open(url, '_blank');//, '_blank'
        }

        $scope.sendSMS = function (PIN, mobile, Semester, Scheme) {
            Path = 'Path';
            if (mobile == null || angular.isUndefined(mobile) || mobile == "") {
                alert("Mobile No not Found");
                return;
            }
            //if (Path == null || angular.isUndefined(Path) || Path == "") {
            //    alert("Certificate not found");
            //    return;
            //}
            $scope.smsbtndisable = true;
            //console.log(PIN, Path, mobile)
            var sensSMS = PreExaminationService.sendMemoSMS(PIN, mobile, "Duplicate Marks Memo", Semester, Scheme);
            sensSMS.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response == "SUCCESS") {
                    var smsStatus = PreExaminationService.SetSmsStatus(PIN, Semester);
                    smsStatus.then(function (response) {
                        alert("Sms Sent");
                        $scope.ApproveListDetails()
                    }, function (err) {
                        $scope.smsbtndisable = false;
                    });
                } else {
                    alert(response);
                }
                $scope.smsbtndisable = false;
            }, function (err) {
                $scope.smsbtndisable = false;
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


        $scope.ApproveListDetails = function () {
            var ApproveList = PreExaminationService.GetDuplicateMarksMemoListByScheme($scope.Scheme, $scope.ApproveType, $scope.UserTypeId);
            ApproveList.then(function (response) {
                var response = JSON.parse(response);
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

                    $scope.ApprovalDetails = response.Table1;
                    if ($scope.ApprovalDetails.length == 0) {
                        $state.go('Dashboard.PostExam.MarksMemoApproval');
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

        var ApproveList = PreExaminationService.GetDuplicateMarksMemoListByScheme($scope.Scheme, $scope.ApproveType, $scope.UserTypeId);
        ApproveList.then(function (response) {
            var response = JSON.parse(response)
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
                var response = JSON.parse(response);
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
                alert("error while loading dataOpenOdc")
            });
        }

        $scope.openDetails = function (pin, CertificateType) {
            //  alert()
            $localStorage.certData = {
                Certificate: CertificateType,
                pin: pin
            }
            $state.go('Dashboard.PostExam.Odc_StudentDetails');
        }

        $scope.openPending = function (pin, CertificateType) {
            if ($scope.UserTypeId == 1009) {
                $localStorage.certData = {
                    Certificate: CertificateType,
                    pin: pin
                }
                $state.go('Dashboard.PostExam.Odc_StudentDetails');
            } else {
                $localStorage.certData = {
                    Certificate: CertificateType,
                    pin: pin
                }
                $state.go('Dashboard.PostExam.Odc_StudentDetails');
            }

        }

        $scope.OpenData = function () {
            $state.go('Dashboard.PostExam.Odc_StudentDetails');

        }

        $scope.OpenPopup = function (pin, Certificate,Sem,MonthYear) {
            var ApproveList = PreExaminationService.getDMMdetails(pin, Sem, MonthYear);
            ApproveList.then(function (response) {''
                try { var response = JSON.parse(response) } catch (err) { }
                $scope.StudentDetails = response.Table1[0];
               
               
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
                templateUrl: "/app/views/PostExam/DMM_Popup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });
        }


        $scope.Approve = function () {
            if (PaymentStudent != [] && PaymentStudent != '') {
            var ApproveStatus = 1
            var Approve = PreExaminationService.DMMSetApproveStatus(PaymentStudent, $scope.UserTypeId, ApproveStatus);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    //  $state.go('Dashboard.PostExam.OdcApproveList');
                    $scope.ApproveListDetails()
                    PaymentStudent = []
                    PaymentStudentList = [];
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    // $state.go('Dashboard.PostExam.OdcApproveList');
                    $scope.ApproveListDetails()
                    //PaymentStudent = []
                }
                else {
                    //$scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                }
                //alert("Success")

            },
            function (error) {
                //$scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });
            } else {
                alert('select the pins');
                return;
            }
        }

        $scope.Reject = function () {
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

        var PaymentStudent = [];
        var PaymentStudentList = [];

        $scope.selectAll = function (val) {
            PaymentStudent = [];
            $scope.allItemsSelected = false;
            if (val == true) {
                for (var i = 0; i < $scope.ApprovalDetails.length; i++) {

                    if ($scope.UserTypeId == 1007) {
                        if ($scope.ApprovalDetails[i].IsAsVerified == 0) {
                            $scope.ApprovalDetails[i].isChecked = false
                            $scope.allItemsSelected = false;
                            $scope.checkedStatus = false;
                            val = false;
                            alert("Please Verify all Student Details by clicking concerned row")
                            return;
                        }
                    } else
                        if ($scope.UserTypeId == 1002) {
                            if ($scope.ApprovalDetails[i].IsDsVerified == 0) {
                                $scope.ApprovalDetails[i].isChecked = false
                                $scope.allItemsSelected = false;
                                $scope.checkedStatus = false;
                                val = false;
                                alert("Please Verify all Student Details by clicking concerned row")
                                return;
                            }
                        } else
                            if ($scope.UserTypeId == 1009) {
                                if ($scope.ApprovalDetails[i].IsJsVerified == 0) {
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
                        dataPay.Id = $scope.ApprovalDetails[i].Id
                        dataPay.PIN = $scope.ApprovalDetails[i].PIN
                        dataPay.Semester = $scope.ApprovalDetails[i].Semester
                        dataPay.ExamMonthYear = $scope.ApprovalDetails[i].ExamMonthYear
                        dataPay.isChecked = $scope.ApprovalDetails[i].isChecked
                        PaymentStudent.push(dataPay);
                        PaymentStudentList.push($scope.ApprovalDetails[i].Id, $scope.ApprovalDetails[i].PIN, $scope.ApprovalDetails[i].Semester, $scope.ApprovalDetails[i].ExamMonthYear);
                        PaymentStudentList.push($scope.ApprovalDetails[i].isChecked)
                    }
                }
               

            } else {
                for (var i = 0; i < $scope.ApprovalDetails.length; i++) {
                    $scope.ApprovalDetails[i].isChecked = false;
                    $scope.allItemsSelected = false;
                    $scope.checkedStatus = false;
                    val = false;
                    PaymentStudent = [];
                    PaymentStudentList = [];
                }
            }
              console.log(PaymentStudent);
        };

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
                if (!PaymentStudentList.includes(data.Id)) {
                    dataPay = {};
                    dataPay.Id = data.Id
                    dataPay.PIN = data.PIN
                    dataPay.Semester = data.Semester
                    dataPay.ExamMonthYear = data.ExamMonthYear
                    dataPay.isChecked = data.isChecked
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.Id,data.PIN,data.Semester,data.ExamMonthYear);
                    PaymentStudentList.push(data.isChecked)
                    //console.log(PaymentStudent)
                }
                else if (PaymentStudentList.includes(data.Id)) {
                    PaymentStudentList.remByVal(data.Id);
                    //PaymentStudentList.remByVal(data.PIN);
                    //PaymentStudentList.remByVal(data.Semester);
                    //PaymentStudentList.remByVal(data.ExamMonthYear);
                    //PaymentStudentList.remByVal(data.isChecked);
                    PaymentStudent.remElementByVal(data.Id);
                    //PaymentStudent.remElementByVal(data.PIN);
                    //PaymentStudent.remElementByVal(data.Semester);
                    //PaymentStudent.remElementByVal(data.ExamMonthYear);
                    //PaymentStudent.remElementByVal(data.isChecked);
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


        $scope.OpenPdf = function (Pin, Scheme, Sem, ExamMonthYear, SemId, ExamMonthYearId) {
           
            if (Scheme == 'C-00' || Scheme == 'C-96' || Scheme == 'C-90' || Scheme == 'NC') {
                alert('Printing Data Not Available for Schemes(C-00,C-96,C-90,NC)')
            } else {
               // alert(Pin)
                localStorage.setItem('MemoPin', Pin)
                localStorage.setItem('MemoScheme', Scheme)

                localStorage.setItem('MemoSem', Sem)
                localStorage.setItem('ExamMonthYear', ExamMonthYear)
                localStorage.setItem('MemoSemId', SemId)
                localStorage.setItem('ExamMonthYearId', ExamMonthYearId)
                
                $state.go('Dashboard.PostExam.DMFinal');
            }
        }

        $scope.Submit = function (remarks) {
            if (PaymentStudent != [] && PaymentStudent != '') {
            var ApproveStatus = 2

            var Approve = PreExaminationService.DMMSetApproveStatusReject(PaymentStudent, $scope.UserTypeId, ApproveStatus, remarks);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.closeModal()
                    $scope.ApproveListDetails()
                    PaymentStudent = []
                    PaymentStudentList = [];
                    //$state.go('Dashboard.PostExam.OdcApproveList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.closeModal()
                    $scope.ApproveListDetails()
                    //PaymentStudent = []
                    // $state.go('Dashboard.PostExam.OdcApproveList');
                }
                else {
                    //$scope.$emit('hideLoading', data);
                   // $scope.closeModal()
                    PaymentStudent = []
                    $scope.Data = false;
                    $scope.Nodata = true;
                }
                //alert("Success")

            },
            function (error) {
                //$scope.$emit('hideLoading', data);
                $scope.closeModal()
                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });
            } else {
                alert('select the pins');
                return;
            }
        }

        $scope.Verify = function (Semester,ExamMonthYear) {
            if (($scope.StudentDetails.Pin == null || $scope.StudentDetails.Pin == '') || ($scope.UserTypeId == null || $scope.UserTypeId == '')) {

                alert("Please Select All Fields")
                return;
            }
            var ApproveStatus = 1
            var verify = PreExaminationService.DMM_SetVerifyStatus($scope.StudentDetails.Pin, $scope.UserTypeId,Semester,ExamMonthYear);

            verify.then(function (response) {

                var response = JSON.parse(response)
                try { var response = JSON.parse(response); } catch (err) { }
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.closeModal()
                    //$state.go('Dashboard.PostExam.TcApprovalList');
                    $scope.ApproveListDetails()

                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    // $state.go('Dashboard.PostExam.TcApprovalList');
                    $scope.closeModal()
                    $scope.ApproveListDetails()
                }
                else {
                    //$scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
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