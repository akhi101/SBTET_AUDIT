define(['app'], function (app) {
    app.controller("TwshAuthorizationReportListController", function ($scope, $state, TwshStudentRegService, $window, $timeout, Excel, $localStorage, PreExaminationService, DigitalSignatureService, $uibModal) {
        var authData = $localStorage.authorizationData;

        $scope.userId = authData.SysUserID;
        $scope.userType = authData.SystemUserTypeId;
        var PaymentStudent = [];
        var PaymentStudentList = [];
        var studData = $localStorage.TwshAuthListData;
        $scope.DataType = studData.DataType;
        $scope.ExamMode = studData.ExamMode;
        $scope.ExamMonthYearId = studData.ExamMonthYearId;
        
        $scope.CollegeCode = studData.CollegeCode;
        $scope.fromdate = studData.fromdate;
        $scope.todate = studData.todate;
        $scope.btnDisable = false;
        $scope.buttonlabel = "Approve";
        var MyData = {};
        $scope.$emit('showLoading', MyData);

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }
       
        var GetInstituteReports = TwshStudentRegService.getTwshAuthorizationListDetails($scope.ExamMode, $scope.CollegeCode, $scope.DataType, $scope.ExamMonthYearId, $scope.fromdate.toString(), $scope.todate.toString());
        GetInstituteReports.then(function (response) {
            if (response.Table.length > 0) {
                //$scope.LoadImg = false;
                $scope.$emit('hideLoading', MyData);
                $scope.data = true;
                $scope.Nodata = false;
                $scope.QualifiedList = response.Table;
                PaymentStudent = [];
                PaymentStudentList = [];
            } else {
                $scope.$emit('hideLoading', MyData);
                //$scope.LoadImg = false;
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;
                $scope.Nodata = true;
            }
        },
            function (error) {
                $scope.$emit('hideLoading', MyData);
                //$scope.LoadImg = false;
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;
                $scope.Nodata = true;
            });

        $scope.selectAll = function (val) {
            PaymentStudent = [];

            if (val == true) {
                for (var i = 0; i < $scope.QualifiedList.length; i++) {

                    $scope.QualifiedList[i].isChecked = true;
                    if ($scope.QualifiedList[i].isChecked) {
                        dataPay = {};
                        dataPay.RegistrationNo = $scope.QualifiedList[i].RegistrationNo
                        PaymentStudent.push(dataPay);
                        PaymentStudentList.push($scope.QualifiedList[i].RegistrationNo);
                    }
                }

            } else {
                for (var i = 0; i < $scope.QualifiedList.length; i++) {
                    $scope.QualifiedList[i].isChecked = false;
                    PaymentStudent = [];
                    PaymentStudentList = [];
                }
            }

        };

        $scope.sensSMS = function (regno, Path, mobile, ind) {
            if (mobile == null || angular.isUndefined(mobile) || mobile == "") {
                alert("Mobile No not Found");
                return;
            }
            if (Path == null || angular.isUndefined(Path) || Path == "") {
                alert("Certificate not found");
                return;
            }
            $scope['smsbtndisable' + ind] = true;
            var sensSMS = PreExaminationService.sendTwshcertSMS(regno, Path, mobile, "Typewriting");
            sensSMS.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response == "SUCCESS") {
                    var UpdateSmsStatus = TwshStudentRegService.UpdateTwshSmsStatus(regno);
                    UpdateSmsStatus.then(function (response) {
                        try { var response = JSON.parse(response) } catch (err) { }
                        $scope.GetReports();
                        if (response[0].ResponceCode == "200") {
                            alert(response[0].ResponceDescription);
                        } else {
                            alert(response[0].ResponceDescription);
                        }
                        $scope['smsbtndisable' + ind] = false;
                    }, function (err) {
                        $scope['smsbtndisable' + ind] = false;
                    });

                } else {
                    alert(response);
                    $scope.GetReports();
                }
                $scope['smsbtndisable' + ind] = false;
            }, function (err) {
                $scope.GetReports();
                $scope['smsbtndisable' + ind] = false;
            });


        }

        $scope.ResetCertificateStatus = function (RegistrationNo, Path) {
            if (Path == null || Path == '' || Path == undefined) {
                var Path = '';
            }
            var ResetCertificateStatus = PreExaminationService.ResetTwshCertificateStatus(RegistrationNo, Path);
            ResetCertificateStatus.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponceCode == "200") {
                    alert(response[0].ResponceDescription);
                    $scope.GetReports();
                } else {
                    alert('Something Went Wrong');
                    $scope.GetReports();
                }

            }, function (err) {
                $scope.GetReports();
            });



        }

        $scope.GetReports = function () {

            var GetInstituteReports = TwshStudentRegService.getTwshApproveListDetails($scope.GradeId, $scope.DataType, $scope.userType);
            GetInstituteReports.then(function (response) {
                if (response.Table1.length > 0) {
                    $scope.LoadImg = false;
                    $scope.data = true;
                    $scope.Nodata = false;
                    $scope.QualifiedList = response.Table1;
                    PaymentStudent = [];
                    PaymentStudentList = [];
                } else {
                    $scope.LoadImg = false;
                    $scope.StatusMessage = "No Data Found";
                    $scope.showStatus = true;
                    $scope.statusclass = 'alert-danger';
                    $scope.data = false;
                    $scope.Nodata = true;
                }
            },
                function (error) {
                    $scope.Nodata = true;
                    $scope.LoadImg = false;
                    $scope.StatusMessage = "No Data Found";
                    $scope.showStatus = true;
                    $scope.statusclass = 'alert-danger';
                    $scope.data = false;

                });
        }



        $scope.OpenData = function (RegistrationNo) {
            localStorage.setItem('RegistrationNo', RegistrationNo)
            $state.go('TWSH.TypeWritingCertificate')
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
                if (!PaymentStudentList.includes(data.RegistrationNo)) {
                    dataPay = {};
                    dataPay.RegistrationNo = data.RegistrationNo
                    dataPay.isChecked = data.isChecked
                    dataPay.Id = data.Id
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.RegistrationNo);
                    PaymentStudentList.push(data.isChecked)
                    PaymentStudentList.push(data.Id)
                }
                else if (PaymentStudentList.includes(data.RegistrationNo)) {
                    PaymentStudentList.remByVal(data.RegistrationNo);
                    PaymentStudentList.remByVal(data.isChecked);
                    PaymentStudentList.remByVal(data.Id);
                    PaymentStudent.remElementByVal(data.RegistrationNo);

                    PaymentStudent.remElementByVal(data.isChecked);
                    PaymentStudent.remElementByVal(data.Id);
                    if (PaymentStudentList.length == 0) {
                        $scope.allItemsSelectedthing = false;
                    }
                }

            }


        };


        $scope.OpenFixedWindow = function () {
            $window.open($scope.Src, 'Twsh CBT AnswerSheet Preview', 'resizable,height=768,width=1024')

        }

        $scope.DownloadtoExcel = function (tableid) {

            var exportHref = Excel.tableToExcel(tableid, 'Twsh_AuthorizationReportList');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Twsh_AuthorizationReportList.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }


        $scope.OpenPopup = function (RegistrationNo) {

            var Approve = TwshStudentRegService.getTwshResult(RegistrationNo);
            Approve.then(function (response) {
                $scope.StudentData = response[0];
                $scope.Src = "https://ss.sbtet.telangana.gov.in/TwshCbtApi/Exam/Preview/" + $scope.StudentData.ApplicationNumber;
                $scope.modalInstance = $uibModal.open({
                    templateUrl: "/app/views/TWSH/TwshResult_Popup.html",
                    size: 'xlg',
                    scope: $scope,
                    windowClass: 'modal-fit-att',
                    //backdrop: 'static',
                });
            },
                function (error) {
                    //$scope.$emit('hideLoading', data);
                    $scope.StudentData = [];
                    $scope.Data = false;
                    $scope.Nodata = true;
                    $scope.btndisable = false;
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
                if (this[i].RegistrationNo === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        $scope.Approve = function () {
            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.btndisable = true;
                var ApproveStatus = 1
                var Approve = TwshStudentRegService.TwshSetApproveStatus(PaymentStudent, $scope.userType, ApproveStatus);
                Approve.then(function (response) {

                    var response = JSON.parse(response)
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription);
                        $scope.btndisable = false;
                        $scope.GetReports()
                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription);
                        ;
                        $scope.btndisable = false;
                        $scope.GetReports()
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

                        $scope.Data = false;
                        $scope.Nodata = true;
                        $scope.btndisable = false;
                        alert("error while loading data");
                    });
            } else {
                alert('select the pins');
                $scope.btndisable = false;
                return;
            }
        }

        $scope.Reject = function () {
            $scope.remarks = '';
            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.modalInstance = $uibModal.open({
                    templateUrl: "/app/views/GenuineRejectPopup.html",
                    size: 'xlg',
                    scope: $scope,
                    windowClass: 'modal-fit-att',
                });
            } else {
                alert('select the candidates.');
                return;
            }
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }


        DigitalSignatureService.GetUserCertificates().then(
            function (res) {
                if (res.length > 0) {
                    $scope.UserCertificates = res;
                }

            }, function (error) {

                $scope.data = false;
                $scope.error = true;
            });


        $scope.Submit = function (remarks) {
            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.btndisable = true;
                var ApproveStatus = 2

                var Approve = TwshStudentRegService.TwshSetApproveStatusReject(PaymentStudent, $scope.userType, ApproveStatus, remarks);
                Approve.then(function (response) {

                    var response = JSON.parse(response)
                    if (response.Table[0].ResponseCode == '200') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.closeModal()
                        $scope.remarks = "";
                        $scope.GetReports();
                        $scope.btndisable = false;
                        //$state.go('Dashboard.PostExam.OdcApproveList');
                    } else if (response.Table[0].ResponseCode == '400') {
                        alert(response.Table[0].ResponseDescription)
                        $scope.closeModal()
                        $scope.remarks = "";
                        $scope.GetReports();
                        $scope.btndisable = false;
                        // $state.go('Dashboard.PostExam.OdcApproveList');
                    }
                    else {
                        //$scope.$emit('hideLoading', data);
                        $scope.GetReports();
                        $scope.closeModal()
                        $scope.Data = false;
                        $scope.Nodata = true;
                        $scope.btndisable = false;
                    }
                    //alert("Success")

                },
                    function (error) {
                        //$scope.$emit('hideLoading', data);
                        $scope.GetReports();
                        $scope.closeModal();
                        $scope.btndisable = false;
                        $scope.Data = false;
                        $scope.Nodata = true;
                        alert("error while loading data");
                    });
            } else {
                alert('select the candidates.');
                return;
            }
        }


        $scope.openStudentDetails = function (ApplicationNumber, Name, Gender, PhoneNumber, Id) {
            var ApplicationDetails = {
                ApplicationNumber: ApplicationNumber,
                Name: Name,
                Gender: Gender,
                PhoneNumber: PhoneNumber,
                Id: Id
            }
            $localStorage.ApplicationDetails = ApplicationDetails;

            $state.go('Dashboard.TypeWriting.TwshViewAuthorizationDetails')
        }

        $scope.ApprovePin = function () {
            if (PaymentStudent != [] && PaymentStudent != '') {
                var ApproveStatus = 1
                $scope.btndisable = true;
                if ($scope.userType == '1009') {
                    if (angular.isUndefined($scope.UserCertificates) || $scope.UserCertificates[0].SerialNumber == null) {
                        alert('Link the Digital signature to sign the documents');
                        return;
                    }
                    $scope.buttonlabel = "Signing in process ...";
                    var GetInterimCertificateTobeSignedlocation = PreExaminationService.GetTwshCertificateTobeSignedlocation(PaymentStudent)
                    GetInterimCertificateTobeSignedlocation.then(function (response) {
                        var location = window.location.origin;
                        if (location == "https://ss.sbtet.telangana.gov.in") {
                            location += "/API/"
                        } else {
                            location += "/"
                        }
                        var responseurl = location + "api/StudentCertificate/StoreSignedCertificate";
                        var paramObject = []
                        if (response.length > 0) {
                            for (var i = 0; i < response.length; i++) {
                                var obj = {
                                    "Pin": response[i].RegistrationNo,
                                    "CertificateServiceId": 10,
                                    "PdfLocation": response[i].PdfUrl,
                                    "SerialNumber": $scope.UserCertificates[0].SerialNumber,
                                    "ApplicationNo": angular.isUndefined(response[i].ApplicationNumber) ? "" : response[i].ApplicationNumber,
                                    "Designation": "CONTROLLER OF EXAMINATIONS, SBTET, TELANGANA",
                                    "llx": 360,
                                    "lly": 450,
                                    "urx": 360 + 170,
                                    "ury": 450 + 60,
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
                                            signedpins.push({ "RegistrationNo": item.Pin });
                                        }
                                    });
                                    if (signedpins.length <= 0) {
                                        alert("certificate signing failed ");
                                        $scope.btndisable = false;
                                        $scope.buttonlabel = "Approve";

                                        return;
                                    } else {
                                        var getData = TwshStudentRegService.TwshSetApproveStatus(signedpins, $scope.userType, ApproveStatus);
                                        getData.then(function (response) {
                                            var response = JSON.parse(response)
                                            if (response.Table[0].ResponseCode == '200') {
                                                alert(response.Table[0].ResponseDescription);
                                                $scope.buttonlabel = "Approve";

                                                $scope.btndisable = false;
                                                $scope.GetReports();
                                            } else {
                                                alert(response.Table[0].ResponseDescription);
                                                $scope.btndisable = false;
                                                $scope.buttonlabel = "Approve";
                                                $scope.GetReports();
                                            }
                                        }, function (error) {
                                            $scope.GetReports();
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
                    var getData = TwshStudentRegService.TwshSetApproveStatus(PaymentStudent, $scope.userType, ApproveStatus);
                    getData.then(function (response) {
                        var response = JSON.parse(response)
                        alert(response.Table[0].ResponseDescription);
                        $scope.btndisable = false;
                        $scope.GetReports();
                        //if (response.Table[0].ResponseCode == '200') {
                        //    alert(response.Table[0].ResponseDescription);
                        //    $scope.btndisable = false;
                        //    $scope.GetReports();
                        //} else {
                        //    alert(response.Table[0].ResponseDescription);
                        //    $scope.btndisable = false;
                        //    $scope.GetReports();
                        //}
                    }, function (error) {
                        $scope.result = false;
                        $scope.btndisable = false;
                        $scope.GetReports();
                    });

                }
            } else {
                alert('select the candidates');
                return;
            }
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
                var table = $(tableId);
                ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });
})