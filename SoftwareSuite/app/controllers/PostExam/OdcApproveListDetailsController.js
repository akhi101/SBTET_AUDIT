/// <reference path="OdcApproveListDetailsController.js" />
define(['app'], function (app) {
    app.controller("OdcApproveListDetailsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        $scope.btnDisable = false;
        $scope.MyCheck = false;
        $scope.Update = false;
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        $scope.ApproveType = $localStorage.CertificateData.ApproveType;
        $scope.Scheme = $localStorage.CertificateData.Scheme;

        //$scope.url = 'https://exams.sbtet.telangana.gov.in/downloads/Cert/'
        $scope.url = 'E:/Akhil/softwaresuite/SoftwareSuite/Downloads/cert'
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

        $scope.selectAll = function (val) {
            PaymentStudent = [];

            if (val == true) {
                for (var i = 0; i < $scope.ApprovalDetails.length; i++) {

                    $scope.ApprovalDetails[i].isChecked = true;
                    if ($scope.ApprovalDetails[i].isChecked) {
                        if ($scope.UserTypeId == '1007') {
                            if ($scope.ApprovalDetails[i].IsAsVerified == 0) {
                                $scope.checkedStatus = false
                                alert("Please Verify Student Details by clicking concerned row")
                                return
                            } else {
                                dataPay = {};
                                dataPay.PIN = $scope.ApprovalDetails[i].PIN
                                PaymentStudent.push(dataPay);
                                PaymentStudentList.push($scope.ApprovalDetails[i].PIN);
                            }
                        } else if ($scope.UserTypeId == '1002') {
                            if ($scope.ApprovalDetails[i].IsDsVerified == 0) {
                                $scope.ApprovalDetails[i].isChecked = false;
                                $scope.allItemsSelected = false;
                                $scope.checkedStatus = false;
                                val = false;
                                alert("Please Verify Student Details by clicking concerned row")
                                return
                            } else {
                                dataPay = {};
                                dataPay.PIN = $scope.ApprovalDetails[i].PIN
                                PaymentStudent.push(dataPay);
                                PaymentStudentList.push($scope.ApprovalDetails[i].PIN);
                            }
                        } else if ($scope.UserTypeId == '1009') {
                            if ($scope.ApprovalDetails[i].IsJsVerified == 0) {
                                $scope.ApprovalDetails[i].isChecked = false
                                alert("Please Verify Student Details by clicking concerned row")
                                return
                            } else {
                                dataPay = {};
                                dataPay.PIN = $scope.ApprovalDetails[i].PIN
                                PaymentStudent.push(dataPay);
                                PaymentStudentList.push($scope.ApprovalDetails[i].PIN);
                            }
                        }
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


        $scope.ApproveListDetails = function () {
            var ApproveList = PreExaminationService.GetOdcListByScheme($scope.Scheme, $scope.ApproveType, $scope.UserTypeId);
            ApproveList.then(function (response) {
                var response = JSON.parse(response)
                console.log(response);
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
        }

        var ApproveList = PreExaminationService.GetOdcListByScheme($scope.Scheme, $scope.ApproveType, $scope.UserTypeId);
        ApproveList.then(function (response) {
            var response = JSON.parse(response)
            console.log(response);
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
                var response = JSON.parse(response)
                console.log(response);

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

        $scope.uploadpdffiles = function () {
            var input = document.getElementById("Affidavite");
            var fileSize = input.files[0].size;

            if (fileSize <= 3000000 && fileSize >= 1000000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdPhoto').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', {
                            src: e.target.result
                        });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.Photo = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");

                            
                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else if (fileSize <= 1000000) {
                alert("file size should not be less than 1MB");
                $('#stdNodue').val('');
                return;
            }
            else if (fileSize >= 3000000) {
                alert("file size should not be greater than 3MB");
                $('#stdNodue').val('');
                return;
            } else {
                alert("file size should be between 1MB and 3MB");
                $('#stdNodue').val('');
                return;
            }
        }
        

        $scope.OpenPopup = function (pin, Certificate) {
            var ApproveList = PreExaminationService.getOdcdetails(pin, Certificate);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                var data = response.Table1[0];
                $scope.Files = response.Table1[0].OdcMemos;
                $scope.array=[]
                var str_array = $scope.Files.split(',');
                for (i = 0; i < str_array.length - 1; i++) {
                    var obj = { "link":  str_array[i] }
                    $scope.array.push(obj);
                }

                console.log(data)
                $scope.StudentDetails = data;
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
                templateUrl: "/app/views/PostExam/Odc_DetailsPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });
        }

        $scope.EditAffidiate = function () {
            $scope.Update = true;
        }

        $scope.UpdateAffidiate = function () {
            $scope.Update = false;
            if ($scope.Photo == "" || $scope.Photo == null || $scope.Photo == undefined) {
                alert('Please Upload Affidavit Assested by Special Metropolitan Magistrate')
                return;
            }           
            var verify = PreExaminationService.Odc_Set_UpdateAffidavit($scope.StudentDetails.Pin, $scope.UserTypeId, $scope.Photo);
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
        
        $scope.Approve = function () {
            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.btndisable = true;
            var ApproveStatus = 1
            var Approve = PreExaminationService.OdcSetApproveStatus(PaymentStudent, $scope.UserTypeId, ApproveStatus);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    //  $state.go('Dashboard.PostExam.OdcApproveList');
                    $scope.ApproveListDetails()
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    // $state.go('Dashboard.PostExam.OdcApproveList');
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

        $scope.OpenOdc = function (Pin) {
            localStorage.setItem('GenuinePin', Pin)

            //$state.go('Dashboard.PostExam.OdcData')
            var url = window.location.href + '/OdcData';        
            window.open(url, '_blank');
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

            //console.log(PaymentStudent)
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


        $scope.Submit = function (remarks) {
            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.btndisable = true;
            var ApproveStatus = 2

            var Approve = PreExaminationService.OdcSetApproveStatusReject(PaymentStudent, $scope.UserTypeId, ApproveStatus, remarks);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.ApproveListDetails()
                    //$state.go('Dashboard.PostExam.OdcApproveList');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.ApproveListDetails()
                    // $state.go('Dashboard.PostExam.OdcApproveList');
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

        $scope.sendSMS = function (PIN, Path, mobile) {
            Path ='Path';
            if (mobile == null || angular.isUndefined(mobile) || mobile == "") {
                alert("Mobile No not Found");
                return;
            }
            if (Path == null || angular.isUndefined(Path) || Path == "") {
                alert("Certificate not found");
                return;
            }
            $scope.smsbtndisable = true;
            console.log(PIN, Path, mobile)
            var sensSMS = PreExaminationService.sendMemoSMS(PIN, Path, mobile, "Duplicate Diploma Certificate");
            sensSMS.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response == "SUCCESS") {
                    alert("Sms Sent");
                } else {
                    alert(response);
                }
                $scope.smsbtndisable = false;
            }, function (err) {
                $scope.smsbtndisable = false;
            });


        }

        $scope.Verify = function (Pin) {
            if (($scope.StudentDetails.Pin == null || $scope.StudentDetails.Pin == '')||($scope.UserTypeId == null || $scope.UserTypeId=='')) {

                alert("Please Select All Fields")
                return;
            }
            var ApproveStatus = 1
            var verify = PreExaminationService.OdcSetVerifyStatus($scope.StudentDetails.Pin,$scope.UserTypeId);

            verify.then(function (response) {

                console.log(response)
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