define(['app'], function (app) {
    app.controller("TranscriptApprovalDetailsController", function ($scope, $http, $localStorage, $state, $stateParams, DigitalSignatureService, AppSettings, $uibModal, $timeout, PreExaminationService) {
        $scope.btndisable = false;
        $scope.EmailLoading = false;
        $scope.buttonlabel = "Approve";
        $scope.MyCheck = false;
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        $scope.ApproveType = $localStorage.CertificateData.ApproveType;
        $scope.Scheme = $localStorage.CertificateData.Scheme;
        $scope.Subject = "SBTET-Telangana-Issue of Transcripts-Reg.";
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
        var PaymentStudent = [];
        var PaymentStudentList = [];

        $scope.selectAll = function (val) {
            PaymentStudent = [];

            if (val == true) {
                for (var i = 0; i < $scope.ApprovalDetails.length; i++) {

                    $scope.ApprovalDetails[i].isChecked = true;
                    if ($scope.ApprovalDetails[i].isChecked) {
                        dataPay = {};
                        dataPay.AppNo = $scope.ApprovalDetails[i].ApplicationNo
                        PaymentStudent.push(dataPay);
                        PaymentStudentList.push($scope.ApprovalDetails[i].ApplicationNo);
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



        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetApprovalDetails()
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
        $scope.showPDFincanvas = function () {
            pdfjsLib.getDocument(pdfloc).then(doc => {
                doc.getPage(1).then(page => {
                    var PDFcanvas = document.getElementById("PDFcanvas");
                    var context = PDFcanvas.getContext('2d');
                    var viewport = page.getviewport(1);
                    PDFcanvas.width = viewport.width;
                    PDFcanvas.height = viewport.height;
                    page.render({
                        canvasContext: context,
                        viewport: viewport
                    });
                });


            });

        }
        $scope.splitArrayIntoChunksOfLen = function (arr, len) {
            var chunks = [], i = 0, n = arr.length;
            while (i < n) {
                chunks.push(arr.slice(i, i += len));
            }
            return chunks;
        }



        $scope.sendmail = function (Subject, message, mails) {


            if (angular.isUndefined(Subject) || Subject == "" || Subject == null) {
                alert('please write the Subject of email');
                return;
            }
            if (angular.isUndefined(message) || message == "" || message == null) {
                alert('please write the email body.');
                return;
            }
            var paramObject = [];
            var location = window.location.origin;
            var physicalpath = "";
            if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
                physicalpath = "C:/SB-TET/Publish";
            } else {
                physicalpath = "D:/CCic_backup/SoftwareSuite/SoftwareSuite/Reports";                  //"C:/SBTET/dev";
            }

            var emailattch = [];
            for (var p = 0; p < $scope.attachments.length; p++) {
                var count = p + 1;
                var obj1 = {
                    "attachName": "Transcript_" + count,
                    "attachpath": $scope.attachments[p].CertificatePath
                    // "attachpath": physicalpath + $scope.attachments[p].CertificatePath.replace(/https?:\/\/[^\/]+/i, "")
                }
                emailattch.push(obj1);
            }
            var toemail = mails.split(',');
            var emailarr = $scope.splitArrayIntoChunksOfLen(emailattch, 12)
            var html = "<div>" + message + "<div><div>Please find the transcripts attached.<div>";
            for (var p = 0; p < emailattch.length; p++) {
                html = html + "<div><a href=" + emailattch[p].attachpath + " download>" + emailattch[p].attachName + "</a></div>";
            }
            //html = html + "<div><label for='to'>To</label><input id='to' type='text'></div>";
            //html = html + "<div><label for='from'>From</label><input id='from' type='text' value='" + email + "'></div>";
            //html = html + "<div><label for='subject'>Subject</label><input id='subject' type='text' disabled='disabled' value='" + subject + "'></div>";
            //html = html + "<div><label for='body'>Body</label><input id='body' type='text' disabled='disabled' value='" + body + "'></div>";
            //html = html + "<div><input type='submit' value='Send'><input type='button' value='Cancel' onClick='javascript:$.fancybox.close();'></div>";
            //html = html + "</form></div>";
            for (var q = 0; q < emailarr.length; q++) {

                for (var k = 0; k < toemail.length; k++) {

                    var obj = {
                        "From": $scope.from,
                        "To": toemail[k],
                        "cc": $scope.CCEmails,
                       
                        "Subject": Subject,
                        "Message": html,
                        "attachmentdata": emailarr[q]
                    }
                    paramObject.push(obj)
                }
            }
            $scope.btndisable = true;
            $scope.EmailLoading = true;
            //  console.log(paramObject)
            var sendmail = PreExaminationService.SendRelayMail(paramObject)
            sendmail.then(function (response) {
                var mailed_app = response;
                if (response[0] == "success") {
                    alert("mail sent successfully.");
                    $scope.btndisable = false;
                    $scope.EmailLoading = false;
                    $scope.closeModal();
                    var setmailstatis = PreExaminationService.SetTranscriptEmailStatus($scope.mailapplicatioNo);
                    setmailstatis.then(function (response) {
                        $scope.btndisable = false;
                        $scope.EmailLoading = false;
                        $scope.GetApprovalDetails();
                    }, function () {
                        $scope.btndisable = false;
                        $scope.EmailLoading = false;
                    });
                } else {
                    $scope.btndisable = false;
                    $scope.EmailLoading = false;
                    alert("Mail sending failed");
                }

            }, function (err) {
                $scope.btndisable = false;
                $scope.EmailLoading = false;
            });
            // $scope.btndisable = false;
        }

        $scope.GetmailDetails = function (ApplicationNo, Pin) {
            var mailDetails = PreExaminationService.GetTranscriptDataforEmail(ApplicationNo);
            mailDetails.then(function (response) {
                if (response.Table.length > 0 && response.Table1.length > 0) {
                    $scope.from = 'sbtet-helpdesk[at]telangana[dot]gov[dot]in';
                    $scope.studentemaildata = response.Table[0];
                    $scope.mailapplicatioNo = ApplicationNo;
                    $scope.Subject = "SBTET-Telangana-Issue of Transcripts-Reg.";
                    $scope.message = "Sir/Madam,I am enclosing here with the Transcripts of the candidate bearing PIN :" + Pin;
                    $scope.TOUniversityEmails = response.Table[0].UniversityEmails.slice(0, -1);
                    $scope.CCEmails = response.Table[0].Email;
                    $scope.attachments = response.Table1;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/EmailPopup.html",
                        size: 'xlg',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                    });
                } else {
                    alert("attachments are  Not found");
                }

            }, function (err) {

            });
        }



        $scope.OpenPopup = function (pin, ApplicationNo, Certificate) {
            var ApproveList = PreExaminationService.getTranscriptsdetails(pin, ApplicationNo);
            ApproveList.then(function (response) {

                var response = JSON.parse(response);
                $scope.StudentDetails = response.Table[0];
                var wes = response.Table[0].Memos;
                var mails = response.Table[0].UniversityEmails
                var str_array = wes.split(',');
                var mail_array = mails.split(',');
                $scope.array = [];
                $scope.mailarray = []
                for (var i = 0; i < mail_array.length - 1; i++) {
                    mail_array[i] = mail_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
                    var obj1 = {};
                    var obj1 = { "mail": mail_array[i] }
                    $scope.mailarray.push(obj1);
                }
                for (var i = 0; i < str_array.length - 1; i++) {
                    str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
                    var obj = {};
                    var obj = { "link": str_array[i], "memo": str_array[i] }
                    $scope.array.push(obj);
                }

            },
                function (error) {
                    //$scope.$emit('hideLoading', data);

                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");
                });

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/PostExam/TranscriptPopup.html",
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

        $scope.GetApprovalDetails = function () {
            var ApproveList = PreExaminationService.GetTranscriptListByScheme($scope.Scheme, $scope.ApproveType, $scope.UserTypeId);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response) }
                catch (err) {
                    $scope.$emit('hideLoading', data);
                    PaymentStudent = [];
                    PaymentStudentList = [];
                    $scope.Data = false;
                    $scope.Nodata = true;
                }
                if (response.Table[0].ResponseCode == '200') {
                    if (response.Table1.length > 0) {
                        $scope.$emit('hideLoading', data);
                        PaymentStudent = [];
                        PaymentStudentList = [];
                        $scope.ApprovalDetails = response.Table1;
                        $scope.Data = true;
                        $scope.Nodata = false;
                        $scope.btnDisable = false;
                        $scope.Data = true;
                        $scope.Nodata = false;
                    } else {
                        $scope.$emit('hideLoading', data);
                        PaymentStudent = [];
                        PaymentStudentList = [];
                        $scope.Data = false;
                        $scope.Nodata = true;
                    }
                } else if (response.Table[0].ResponseCode == '400') {
                    $scope.$emit('hideLoading', data);
                    PaymentStudent = [];
                    PaymentStudentList = [];
                    $scope.Data = false;
                    $scope.Nodata = true;
                }
                else {
                    $scope.$emit('hideLoading', data);
                    PaymentStudent = [];
                    PaymentStudentList = [];
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

        $scope.Changecheck = function () {

            if ($scope.MyCheck == false) {
                $scope.btnDisable = false;
                //$scope.MyCheck = true;
            } else {
                $scope.btnDisable = true;
            }

        }

        var Getmemoschemes = PreExaminationService.GetScheme();
        Getmemoschemes.then(function (response) {
            $scope.Schemes = response.Table;

        },
            function (error) {
                //$scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });


        $scope.loadSemExamTypes = function (scheme) {
            $scope.ResultFound = false;
            $scope.ResultNotFound = false;
            $scope.LoadImg = false;
            $scope.seminfo = [];
            try { var scheme = JSON.parse(scheme); } catch (err) { }
            if ((scheme.SchemeID == undefined) || (scheme.SchemeID == "0") || (scheme.SchemeID == "")) {
                alert("select Scheme");
                return;
            }

            var SemExamInfo = PreExaminationService.GetExamTypeForResults(scheme.SchemeID);
            SemExamInfo.then(function (data) {
                if (data.Table.length > 0) {
                    $scope.seminfo = data.Table;
                }

            }, function (error) {
                alert("unable to load semester");
            });
        }


        var GetmemoYearMonth = PreExaminationService.getExamYearMonths();
        GetmemoYearMonth.then(function (response) {
            $scope.ExamMonthYear = response.Table

        },
            function (error) {
                //$scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });



        $scope.GetMarksMemo = function (scheme, sem, ExamYearMonth, memoPin) {

            try { var scheme = JSON.parse(scheme); } catch (err) { }

            if ((scheme == undefined) || (scheme == null) || (scheme == "")) {
                alert("select Scheme");
                return;
            }
            if ((scheme.SchemeID == undefined) || (scheme.SchemeID == null) || (scheme.SchemeID == "")) {
                alert("select Scheme");
                return;
            }
            if ((sem == undefined) || (sem == null) || (sem == "")) {
                alert("select Semester");
                return;
            }
            if ((ExamYearMonth == undefined) || (ExamYearMonth == null) || (ExamYearMonth == "")) {
                alert("Select Exam Month Year");
                return;
            }
            if ((memoPin == undefined) || (memoPin == null) || (memoPin == "")) {
                alert("Enter PIN");
                return;
            }
            $scope.LoadImg = true;
            $scope.ResultFound = false;
            $scope.ResultNotFound = false;
            var getmemodetails = PreExaminationService.GETMemoDataByPin(scheme.Scheme, sem, ExamYearMonth, memoPin);
            getmemodetails.then(function (res) {
                if (res.Table.length > 0) {
                    $scope.$emit('hideLoading', data);
                    $scope.ResultFound = true;
                    $scope.LoadImg = false;
                    $scope.ResultNotFound = false;
                    $scope.memostudData = res.Table[0];
                } else {
                    $scope.$emit('hideLoading', data);
                    $scope.ResultFound = true;
                    $scope.LoadImg = false;
                    $scope.ResultNotFound = false;
                    $scope.memostudData = [];
                }
                // if (res.length > 0) {
                //     $scope.ResultFound = true;
                //     $scope.LoadImg = false;
                //     $scope.ResultNotFound = false;
                //     $scope.memostudData = res[0];
                // } else {
                //     $scope.ResultFound = false;
                //     $scope.LoadImg = false;
                //     $scope.ResultNotFound = true;
                //     $scope.memostudData = [];
                // }

            }, function (err) {
                $scope.ResultFound = false;
                $scope.ResultNotFound = true;

            })

        }


        $scope.checkMemo = function () {
            $scope.ResultFound = false;
            $scope.ResultNotFound = false;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/PostExam/MarksMemoPopup.html",
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
            $scope.LoadImg = true;
            $scope.ResultFound = false;
            $scope.ResultNotFound = false;
            var getmemodetails = PreExaminationService.getTranscriptODCDetailsByPin(Pin);
            getmemodetails.then(function (res) {
                try { var response = JSON.parse(res) } catch (err) { }

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

        $scope.ResetCertificateStatus = function (PIN, Path) {
            if (Path == null || Path == '' || Path == undefined) {
                var Path = '';
            }
            var ResetCertificateStatus = PreExaminationService.ResetCertificateStatus(3, PIN, Path);
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


        $scope.RelesePin = function (Pin, CertificateTypeId, Id) {
            var ApproveList = PreExaminationService.ReleaseStudentServicesPin(Pin,CertificateTypeId,Id);
            ApproveList.then(function (response) {
               // var response = JSON.parse(response)
             //   $scope.closeModal();
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponceDescription)

                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponceDescription)

                }
                $scope.GetApprovalDetails();

            },
                function (error) {
                    //$scope.$emit('hideLoading', data);

                    $scope.Data = false;
                    $scope.Nodata = true;
                    alert("error while loading data");
                });
        }
        

        $scope.Verify = function (applicationNo) {
            var ApproveList = PreExaminationService.SetTranscriptVerificationStatus(applicationNo, $scope.UserTypeId);
            ApproveList.then(function (response) {
                var response = JSON.parse(response)
                $scope.closeModal();
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponceDescription)

                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponceDescription)

                }
                $scope.GetApprovalDetails();

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
            $state.go('Dashboard.PostExam.Transcript_StudentDetails');
        }



        $scope.openPending = function (pin, CertificateType) {
            // alert(pin)
            if ($scope.UserTypeId == 1009) {
                $localStorage.certData = {
                    Certificate: CertificateType,
                    pin: pin
                }
                $state.go('Dashboard.PostExam.Transcript_StudentDetails');
            } else {
                $localStorage.certData = {
                    Certificate: CertificateType,
                    pin: pin
                }
                $state.go('Dashboard.PostExam.Transcript_StudentDetails');
            }

        }

        $scope.OpenData = function () {
            $state.go('Dashboard.PostExam.Transcript_StudentDetails');
        }



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
                if (!PaymentStudentList.includes(data.ApplicationNo)) {
                    dataPay = {};
                    dataPay.AppNo = data.ApplicationNo
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.ApplicationNo);
                }
                else if (PaymentStudentList.includes(data.ApplicationNo)) {
                    PaymentStudentList.remByVal(data.ApplicationNo);
                    PaymentStudent.remElementByVal(data.ApplicationNo);
                    if (PaymentStudentList.length == 0) {
                        $scope.allItemsSelectedthing = false;
                    }
                }
            }
        };


        $scope.Approve = function () {
            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.btndisable = true;
                var ApproveStatus = 1;
                if ($scope.UserTypeId == '1009') {
                    if (angular.isUndefined($scope.UserCertificates) || $scope.UserCertificates[0].SerialNumber == null) {
                        alert('Link the Digital signature to sign the documents');
                        return;
                    }
                    $scope.buttonlabel = "Signing in process ...";
                    var GetInterimCertificateTobeSignedlocation = PreExaminationService.GetTranscriptCertificate(PaymentStudent)
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
                                    "CertificateServiceId": 3,
                                    "PdfLocation": response[i].Certificatepath,
                                    "SerialNumber": $scope.UserCertificates[0].SerialNumber,
                                    "ApplicationNo": response[i].ApplicationNo,
                                    "Designation": "CONTROLLER OF EXAMINATIONS, SBTET, TELANGANA",
                                    "llx": 360,
                                    "lly": 60,
                                    "urx": 360 + 160,
                                    "ury": 60 + 50,
                                    "responseUrl": btoa(responseurl)
                                }
                                paramObject.push(obj)
                            }
                            var SignPdf = PreExaminationService.SignMultiplePdf(paramObject)
                            SignPdf.then(function (response) {
                                if (response.length > 0) {
                                    var signedpins = [];
                                    var temparr = [];
                                    response.forEach(function (item, index) {
                                        if (item.status == "SUCCESS" && !temparr.includes(item.Pin)) {
                                            signedpins.push({ "PIN": item.Pin });
                                            temparr.push(item.Pin)
                                        }
                                    });
                                    if (signedpins.length <= 0) {
                                        alert("certificate signing failed ");
                                        $scope.btndisable = false;
                                        $scope.buttonlabel = "Approve";
                                        return;
                                    }

                                    var Approve = PreExaminationService.TranscriptSetApproveStatus(PaymentStudent, $scope.UserTypeId, ApproveStatus);
                                    Approve.then(function (response) {
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
                        dataPay.AppNo = PaymentStudent[i].AppNo;

                        array.push(dataPay);
                        //array.push($scope.PaymentStudent[i].PIN);
                    }
                    //  $scope.btnDisable = true;
                    var ApproveStatus = 1
                    var Approve = PreExaminationService.TranscriptSetApproveStatus(array, $scope.UserTypeId, ApproveStatus);
                    Approve.then(function (response) {
                        var response = JSON.parse(response)
                        if (response.Table[0].ResponseCode == '200') {
                            alert(response.Table[0].ResponseDescription);
                            $scope.btnDisable = false;

                            $scope.GetApprovalDetails();
                            // $state.go('Dashboard.PostExam.TcApprovalList');
                        } else if (response.Table[0].ResponseCode == '400') {
                            alert(response.Table[0].ResponseDescription)
                            $scope.GetApprovalDetails();
                            $scope.btnDisable = false;
                            // $state.go('Dashboard.PostExam.TcApprovalList');
                        }
                        else {
                            //$scope.$emit('hideLoading', data);
                            $scope.Data = false;
                            $scope.Nodata = true;
                            $scope.btnDisable = false;
                        }
                        //alert("Success")

                    },
                        function (error) {
                            //$scope.$emit('hideLoading', data);
                            $scope.btnDisable = false;
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
            var ApproveStatus = 2
            if (PaymentStudent != [] && PaymentStudent != '') {
                var Approve = PreExaminationService.TranscriptSetApproveStatusReject(PaymentStudent, $scope.UserTypeId, ApproveStatus, remarks);
                Approve.then(function (response) {
                    var response = JSON.parse(response)
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription)
                        //  $state.go('Dashboard.PostExam.TranscriptApproval');
                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription)
                        //  $state.go('Dashboard.PostExam.TranscriptApproval');
                    }
                    else {
                        //$scope.$emit('hideLoading', data);
                        //$scope.Data = false;
                        //$scope.Nodata = true;
                    }
                    //alert("Success")
                    $scope.closeModal();
                },
                    function (error) {
                        //$scope.$emit('hideLoading', data);

                        //$scope.Data = false;
                        //$scope.Nodata = true;
                        alert("error while loading data");
                        $scope.closeModal();
                    });
            } else {
                alert('select the pins');
                return;
            }
        }
    })
})