define(['app'], function (app) {
    app.controller("GenuinenessApproveListController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings,DigitalSignatureService, $uibModal, $timeout, PreExaminationService) {
        $scope.btnDisable = false;
        $scope.buttonlabel = "Approve";

        $scope.MyCheck = false;
       
        $scope.Subject = "SBTET-Telangana-Genuine Verification of Diploma Certificate Intimation Reg.";
        
        var authData = $localStorage.authorizationData;
       // console.log(authData)
        $scope.UserTypeId = authData.SystemUserTypeId;
        $scope.ApproveType = $localStorage.CertificateData.ApproveType;
        $scope.Scheme = $localStorage.CertificateData.Scheme;
        $scope.loader = false;

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

        $scope.selectAll = function (val) {
            PaymentStudent = [];

            if (val == true) {
                if ($scope.UserTypeId == 1007) {
                    for (var i = 0; i < $scope.ApprovalDetails.length; i++) {
                        if ($scope.ApprovalDetails[i].IsAsVerified == 0) {
                            alert('Please Verify Student Details by clicking concerned row')
                            $scope.ApprovalDetails[i].isChecked = false;
                            return
                        } else {
                        

                                $scope.ApprovalDetails[i].isChecked = true;
                                if ($scope.ApprovalDetails[i].isChecked) {
                                    dataPay = {};
                                    dataPay.PIN = $scope.ApprovalDetails[i].PIN
                                    PaymentStudent.push(dataPay);
                                    PaymentStudentList.push($scope.ApprovalDetails[i].PIN);
                                }
                         
                        }
                    }
                } else
                    if ($scope.UserTypeId == 1002) {
                        for (var i = 0; i < $scope.ApprovalDetails.length; i++) {
                            if ($scope.ApprovalDetails[i].IsDsVerified == 0) {
                                alert('Please Verify Student Details by clicking concerned row')
                                $scope.ApprovalDetails[i].isChecked = false;
                                return
                            } else {
                                

                                    $scope.ApprovalDetails[i].isChecked = true;
                                    if ($scope.ApprovalDetails[i].isChecked) {
                                        dataPay = {};
                                        dataPay.PIN = $scope.ApprovalDetails[i].PIN
                                        PaymentStudent.push(dataPay);
                                        PaymentStudentList.push($scope.ApprovalDetails[i].PIN);
                                    }
                                }
                            
                        }
                    }
                    //else
                    //    if ($scope.UserTypeId == 1009) {
                    //        for (var i = 0; i < $scope.ApprovalDetails.length; i++) {
                    //            if ($scope.ApprovalDetails[i].IsJsVerified == 0) {
                    //                alert('Please Verify Student Details by clicking concerned row')
                    //                $scope.ApprovalDetails[i].isChecked = false;
                    //                $scope.checkedStatus = false
                    //                return
                    //            }  else {
                           
                    //            $scope.ApprovalDetails[i].isChecked = true;
                    //            if ($scope.ApprovalDetails[i].isChecked) {
                    //                dataPay = {};
                    //                dataPay.PIN = $scope.ApprovalDetails[i].PIN
                    //                PaymentStudent.push(dataPay);
                    //                PaymentStudentList.push($scope.ApprovalDetails[i].PIN);
                    //            }
                    //        }
                    //    }
                      //      }
                       


               

            } else {
                for (var i = 0; i < $scope.ApprovalDetails.length; i++) {
                    $scope.ApprovalDetails[i].isChecked = false;
                    $scope.checkedStatus = false
                    PaymentStudent = [];
                    PaymentStudentList = [];
                }
            }
            //  console.log(PaymentStudent);
        };

        $scope.OpenOdc = function (Pin, Certificate, Id) {
           
            var ApproveList = PreExaminationService.getGenuinenessCheckdetails(Pin, Id);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }

              
                var data = response.Table1[0];

                $scope.StudentDetails = data;
                if ($scope.StudentDetails.Ds_Status == 1) {
                    $scope.message = "This is to inform you that the particulars of the Certificate issued to the candidate bearing PIN: " + Pin +" are verified with this office records and found to be Genuine"
                    //$scope.message = "The particulars of photocopies of Diploma Certificate in respect of the candidate (PIN: "+$scope.StudentDetails.Pin+") after thorough verification of this office records it is found to be genuine and issued by this office.";
                } else if ($scope.StudentDetails.Ds_Status == 0) {
                    $scope.message = "This is to inform you that the particulars of the Certificate issued to the candidate bearing PIN: " + Pin +" are verified with this office records and found to be Not Genuine"
                    //$scope.message = "The particulars of photocopies of Diploma Certificate in respect of the candidate (PIN: " + $scope.StudentDetails.Pin + ") after thorough verification of this office records it is found to be Not genuine and Not issued by this office."
                    $scope.Attachment = null;
                }
                localStorage.setItem('OdcCertificate', $scope.StudentDetails.ODC)
                $scope.ODC = "https://exams.sbtet.telangana.gov.in/downloads/Cert/" + data.ODC
                $scope.$emit('hideLoading', data);
            },
            function (error) {
                //$scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
                $scope.$emit('hideLoading', data);
            });
            localStorage.setItem('GenuinePin', Pin)
            localStorage.setItem('GenuineDatatype', $scope.ApproveType)
            localStorage.setItem('PinId', Id)
            //$state.go('Dashboard.PostExam.OdcData')
            window.location.href = window.location.href + '/GenuineOdc';
            
            //  window.open(url, '_blank');
            //window.open(url);
        }

        $scope.ReleasePopup = function (PIN, CertificateTypeId, Id) {

            if (confirm("Are you sure you want to Release Pin?") == true) {
                $scope.ReleasePin(PIN, CertificateTypeId, Id)
            } else {
                userPreference = "Save Canceled!";

            }


        }

        $scope.ReleasePin = function (PIN, CertificateTypeId,Id) {

            var ReleasePin = PreExaminationService.ReleaseStudentServicesPin(PIN,CertificateTypeId,Id);
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
            var ApproveList = PreExaminationService.GetGenuinenessListByScheme($scope.Scheme, $scope.ApproveType, $scope.UserTypeId);
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
        }

           $scope.ResetCertificateStatus = function (PIN, Path) {
            if (Path == null || Path == '' || Path == undefined) {
                var Path = '';
            }
            var ResetCertificateStatus = PreExaminationService.ResetCertificateStatus(8, PIN, Path);
            ResetCertificateStatus.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponceCode == "200") {
                    alert(response[0].ResponceDescription);
                    $scope.ApproveListDetails();
                } else {
                    alert(response[0].ResponceDescription);
                    $scope.ApproveListDetails();
                }

            }, function (err) {
                    $scope.ApproveListDetails();
            });



        }

        var ApproveList = PreExaminationService.GetGenuinenessListByScheme($scope.Scheme, $scope.ApproveType, $scope.UserTypeId);
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

        $scope.GetmailDetails = function (Pin,Certificate,Id, Email,Attachment) {
            $scope.Id = Id;
            var ApplicationNo = '001'
            $scope.from = 'sbtet-helpdesk[at]telangana[dot]gov[dot]in';
            $scope.studentemaildata = 'Hii'//response.Table[0];
            $scope.mailapplicatioNo = ApplicationNo;
            $scope.TOUniversityEmails = Email;//response.Table[0].UniversityEmails.slice(0, -1);
            $scope.Attachment = Attachment;
            //$scope.attachments = response.Table1;

            var ApproveList = PreExaminationService.getGenuinenessCheckdetails(Pin, $scope.Id);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }


                var data = response.Table1[0];

                $scope.StudentDetails = data;
                if ($scope.StudentDetails.Ds_Status == 1) {
                    $scope.message = "This is to inform you that the particulars of the Certificate issued to the candidate bearing PIN: " + Pin +" are verified with this office records and found Genuine."
                    //$scope.message = "The particulars of photocopies of Diploma Certificate in respect of the candidate (PIN: "+$scope.StudentDetails.Pin+") after thorough verification of this office records it is found to be genuine and issued by this office.";
                } else if ($scope.StudentDetails.Ds_Status == 2) {
                    $scope.message = "This is to inform you that the particulars of the Certificate issued to the candidate bearing PIN: " + Pin +" are verified with this office records and found Not Genuine."
                    //$scope.message = "The particulars of photocopies of Diploma Certificate in respect of the candidate (PIN: " + $scope.StudentDetails.Pin + ") after thorough verification of this office records it is found to be Not genuine and Not issued by this office."
                    $scope.Attachment = null;
                }
                localStorage.setItem('OdcCertificate', $scope.StudentDetails.ODC)
                $scope.ODC = "https://exams.sbtet.telangana.gov.in/downloads/Cert/" + data.ODC
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
                templateUrl: "/app/views/GenuinenessEmailPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            //var mailDetails = PreExaminationService.GetTranscriptDataforEmail(ApplicationNo);
            ////alert()
            //mailDetails.then(function (response) {
            //    if (response.Table.length > 0 && response.Table1.length > 0) {
            //        $scope.from = 'sbtet-helpdesk[at]telangana[dot]gov[dot]in';
            //        $scope.studentemaildata = response.Table[0];
            //        $scope.mailapplicatioNo = ApplicationNo;
            //        $scope.TOUniversityEmails = response.Table[0].UniversityEmails.slice(0, -1);
            //        $scope.attachments = response.Table1;
            //        $scope.modalInstance = $uibModal.open({
            //            templateUrl: "/app/views/GenuinenessEmailPopup.html",
            //            size: 'xlg',
            //            scope: $scope,
            //            windowClass: 'modal-fit-att',
            //        });
            //    } else {
            //        alert("attachments are  Not found");
            //    }

            //}, function (err) {

            });
        }

        $scope.sendmail = function (Subject, message, mails,Attachment) {
            $scope.loader = true;

            if (angular.isUndefined(Subject) || Subject == "" || Subject == null) {
                $scope.loader = false;
                alert('please write the Subject of email');
                return;
            }
            if (angular.isUndefined(message) || message == "" || message == null) {
                $scope.loader = false;
                alert('please write the email body.');
                return;
            }
            if (Attachment != null && Attachment != '' && Attachment!= undefined){
            var paramObject = [];
            var location = window.location.origin;
            var physicalpath = "";
                if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
               // physicalpath = "C:/SB-TET/Publish";
            } else {
                physicalpath = "D:/softwaresuite/SoftwareSuite";                  //"C:/SBTET/dev";
            }
            var emailattch = physicalpath + Attachment.replace(/https?:\/\/[^\/]+/i, "")
            } else {
                var emailattch = 'Attachment';
            }
            var html = "<div>" + message + "<div><div>Please find the attached document.<div>";
          
            html = html + "<div><a href=" + Attachment + " download>" + "Genuineness_Verification_Report.pdf" + "</a></div>";
           
            //var emailattch = [];
            //for (var p = 0; p < $scope.attachments.length; p++) {
            //    var obj1 = {
            //        "attachName": "Transcript_DOC" + [p],git 
            //        "attachpath": physicalpath + $scope.attachments[p].CertificatePath.replace(/https?:\/\/[^\/]+/i, "")
            //    }
            //    emailattch.push(obj1);
            //}
            
            var paramObject=[]
            var toemail = mails.split(',');
            for (var k = 0; k < toemail.length; k++) {
         //   var toemail = mails.split(',');
            //var emailattch = Attachment;
                var obj = {
                    "From": $scope.from,
                    "To": toemail[k],
                    "Subject": Subject,
                    "Message": html,
                    "attachmentdata": emailattch
                }
                paramObject.push(obj)
            }
            console.log(paramObject)
            var sendmail = PreExaminationService.SendEmail(paramObject)
                sendmail.then(function (response) {
                   
                var mailed_app = response;
                if (response[0] == "success") {
                    alert("mail sent successfully.");
                    $scope.closeModal();
                    $scope.loader = false;
                    var setmailstatis = PreExaminationService.SetGenuinenessEmailStatus($scope.Id);
                    setmailstatis.then(function (response) {
                        $scope.ApproveListDetails();
                        $scope.loader = false;
                    }, function () { });
                } else {
                    alert("Mail sending failed");
                    $scope.loader = false;
                }

                }, function (err) {
                    $scope.loader = false;
            });
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
            //$scope.btnDisable = true;
            if (status == 1) {
                $scope.Pin;
                $scope.Approve = status;
                //alert("Certificate Approved Successfully")
                $scope.modalInstance.close();
                var ApproveList = PreExaminationService.SetCertificateApproval($scope.Pin, $scope.Approve);
                ApproveList.then(function (response) {
                    try { var response = JSON.parse(response); } catch (err) { }

                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDesc)
                        $scope.ApproveListDetails();
                        //$scope.btnDisable = false;
                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDesc)
                        $scope.ApproveListDetails();
                        //$scope.btnDisable = false;
                    }
                    else {
                        //$scope.$emit('hideLoading', data);
                        $scope.Data = false;
                        $scope.Nodata = true;
                        //$scope.btnDisable = false;
                    }

                },
                function (error) {
                    //$scope.$emit('hideLoading', data);
                    //$scope.btnDisable = false;
                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");
                });
            } else {
                $scope.Proceed1()
            }
        }

        $scope.Proceed1 = function (Pin) {
            $scope.Pin = Pin;
            $scope.Approve = 2;

            var ApproveList = PreExaminationService.SetCertificateApproval($scope.Pin, $scope.Approve);
            ApproveList.then(function (response) {
                var response = JSON.parse(response)
               
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDesc)
                    //$state.go('Dashboard.PostExam.CertificateApproveList');
                    $scope.ApproveListDetails();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDesc)
                    //$state.go('Dashboard.PostExam.CertificateApproveList');
                    $scope.ApproveListDetails();
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
            if ($scope.UserTypeId == 1007) {
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


        $scope.OpenPdf = function () {
            $state.go('Dashboard.PostExam.OdcFinal');

        }


        $scope.OpenPopup = function (pin, Certificate) {
            var ApproveList = PreExaminationService.getGenuinenessCheckdetails(pin, Certificate);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }

                var data = response.Table1[0];

                ////$scope.Files = response.Table1[0].OdcMemos;
                ////$scope.array = []
                ////var str_array = $scope.Files.split(',');
                ////for (i = 0; i < str_array.length - 1; i++) {
                ////    var obj = { "link": "https://exams.sbtet.telangana.gov.in/downloads/Cert/" + str_array[i] }
                ////    $scope.array.push(obj);
                ////}

                $scope.StudentDetails = data;
                localStorage.setItem('OdcCertificate',$scope.StudentDetails.ODC)
                $scope.ODC = "https://exams.sbtet.telangana.gov.in/downloads/Cert/" + data.ODC
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
                templateUrl: "/app/views/PostExam/Genuineness_DetailsPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
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

        $scope.ApprovePin = function () {
            if (PaymentStudent != [] && PaymentStudent != '') {
                var ApproveStatus = 1
                $scope.btndisable = true;
                if ($scope.UserTypeId == '1002' || $scope.UserTypeId == '1009') {
                    if (angular.isUndefined($scope.UserCertificates) || $scope.UserCertificates[0].SerialNumber == null) {
                        alert('Link the Digital signature to sign the documents');
                        return;
                    }
                    $scope.buttonlabel = "Signing in process ...";
                    var GetInterimCertificateTobeSignedlocation = PreExaminationService.GetGenuinenessCertificateTobeSignedlocation(PaymentStudent)
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
                                    "RegistratioNo": response[i].RegistrationNo,
                                    "CertificateServiceId": 8,
                                    "PdfLocation": response[i].PdfUrl,
                                    "SerialNumber": $scope.UserCertificates[0].SerialNumber,
                                    "ApplicationNo": angular.isUndefined(response[i].ApplicationNumber) ? "" : response[i].ApplicationNumber,
                                    "Designation": "DEPUTY SECRETARY, SBTET, TELANGANA",
                                    "llx": 360,
                                    "lly": 100,
                                    "urx": 360 + 170,
                                    "ury": 100 + 50,
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
                                            signedpins.push({ "Pin": item.Pin });
                                        }
                                    });
                                    if (signedpins.length <= 0) {
                                        alert("certificate signing failed ");
                                        $scope.btndisable = false;
                                        $scope.buttonlabel = "Approve";
                                      
                                        return;
                                    } else {
                                        var getData = PreExaminationService.GenuinenessSetApproveStatus(PaymentStudent, $scope.UserTypeId, ApproveStatus)
                                        getData.then(function (response) {
                                            var response = JSON.parse(response)
                                            if (response.Table[0].ResponseCode == '200') {
                                                alert(response.Table[0].ResponseDescription);
                                                $scope.buttonlabel = "Approve";

                                                $scope.btndisable = false;
                                                $scope.ApproveListDetails();
                                            } else {
                                                alert(response.Table[0].ResponseDescription);
                                                $scope.btndisable = false;
                                                $scope.buttonlabel = "Approve";
                                                $scope.ApproveListDetails();
                                            }
                                        }, function (error) {
                                            $scope.result = false;
                                            $scope.btndisable = false;
                                            $scope.buttonlabel = "Approve";
                                        });
                                    }

                                   
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
                    var getData = PreExaminationService.GenuinenessSetApproveStatus(PaymentStudent, $scope.UserTypeId, ApproveStatus)
                    getData.then(function (response) {
                        var response = JSON.parse(response)
                        if (response.Table[0].ResponseCode == '200') {
                            alert(response.Table[0].ResponseDescription);
                            $scope.btndisable = false;
                            $scope.ApproveListDetails();
                        } else {
                            alert(response.Table[0].ResponseDescription);
                            $scope.btndisable = false;
                            $scope.ApproveListDetails();
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

        $scope.Approve = function () {
            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.btndisable = true;
                var ApproveStatus = 1
                var Approve = PreExaminationService.GenuinenessSetApproveStatus(PaymentStudent, $scope.UserTypeId, ApproveStatus);
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
            if (PaymentStudent != [] && PaymentStudent != '') {
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/GenuineRejectPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            } else {
                alert('select the pins');
                return;
            }
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
                }
                //else
                //    if ($scope.UserTypeId == 1009) {
                //        if (data.IsJsVerified == 0) {
                //            data.isChecked = false
                //            alert("Please Verify Student Details by clicking concerned row")
                //            return
                //        }
                //    }
            $scope.allItemsSelectedthing = false;
            if (data != null) {
                if (!PaymentStudentList.includes(data.PIN)) {
                    dataPay = {};
                    dataPay.PIN = data.PIN
                    dataPay.isChecked = data.isChecked
                    dataPay.Id = data.Id
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.PIN);
                    PaymentStudentList.push(data.isChecked)
                    PaymentStudentList.push(data.Id)
                }
                else if (PaymentStudentList.includes(data.PIN)) {
                    PaymentStudentList.remByVal(data.PIN);
                    PaymentStudentList.remByVal(data.isChecked);
                    PaymentStudentList.remByVal(data.Id);
                    PaymentStudent.remElementByVal(data.PIN);

                    PaymentStudent.remElementByVal(data.isChecked);
                    PaymentStudent.remElementByVal(data.Id);
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

                var Approve = PreExaminationService.GenuinenessSetApproveStatusReject(PaymentStudent, $scope.UserTypeId, ApproveStatus, remarks);
                Approve.then(function (response) {
                  
                    var response = JSON.parse(response)
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.closeModal()
                        $scope.remarks = "";
                        $scope.ApproveListDetails()
                        //$state.go('Dashboard.PostExam.OdcApproveList');
                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.closeModal()
                        $scope.remarks = "";
                        $scope.ApproveListDetails()
                        // $state.go('Dashboard.PostExam.OdcApproveList');
                    }
                    else {
                        //$scope.$emit('hideLoading', data);
                        $scope.closeModal()
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

        $scope.Verify = function (Pin) {
            if (($scope.StudentDetails.Pin == null || $scope.StudentDetails.Pin == '') || ($scope.UserTypeId == null || $scope.UserTypeId == '')) {

                alert("Please Select All Fields")
                return;
            }
            var ApproveStatus = 1
            var verify = PreExaminationService.Genuineness_SetVerifyStatus($scope.StudentDetails.Pin, $scope.UserTypeId);

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