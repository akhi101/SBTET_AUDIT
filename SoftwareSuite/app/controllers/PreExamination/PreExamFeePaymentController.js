define(['app'], function (app) {
    app.controller("PreExamFeePaymentController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService, AssessmentService, $uibModal, PaymentService) {
        $scope.isBackLog = false
        $scope.secondClick = false;
        var authData = $localStorage.authorizationData;
        $scope.Student = {};
        $scope.Student.id = '';
        $scope.isShowResults = false;
        $scope.isShowTags = false;
        $scope.allItemsSelected = false;
        $scope.allItemsSelectedthing = false;
        $scope.dataRegular = false;
        $scope.dataBackLog = false;
        var Semester;
        var PaymentStudentList = [];
        var PaymentStudent = [];
        var data = {};
        $scope.secondClick = false;
        $scope.noteChallan = false;


        $scope.SetStudentType = function (studentTypeId) {
            if (studentTypeId == "2") {
                $scope.isBackLog = true;
            } else if (studentTypeId == "1") {
                $scope.isBackLog = false;
            }
        }

        $scope.notedChallan = function () {
            if ($scope.noteChallan == true) {
                $scope.noteChallan = false;
            } else {
                $scope.noteChallan = true;
            }
        }

        if (authData.SystemUserTypeId == 3) {

            $scope.isShowTags = true;
            $scope.isAllchecked = false;
            $scope.addData = function (pin) {

                return {
                    pin: pin
                };

            };
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
                if (this[i].Pin === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        $scope.selectEntity = function (data) {
            $scope.allItemsSelectedthing = false;
            if (data != null) {
                if (data.IsFeedbackSubmitted === 0) {
                    data.isChecked = false
                    alert("Please Submit Feedback to Pay Fee")
                    return
                }
                if (!PaymentStudentList.includes(data.Pin)) {
                    dataPay = {};
                    dataPay.Pin = data.Pin;
                    dataPay.Amount = data.Total;
                    dataPay.Name = data.Name;
                    dataPay.StudentContact = data.StudentContact;
                    for (var j = 0; j < $scope.ActiveSemesters.length; j++) {
                        if ($scope.ActiveSemesters[j].semid == $scope.current_schemeid) {
                            dataPay.Semester = $scope.ActiveSemesters[j].semester;
                            Semester = $scope.ActiveSemesters[j].semester;
                            break;
                        }
                    }
                    dataPay.UserName = authData.userName;
                    dataPay.StudentTypeId = $scope.Student.id;


                    dataPay.ExamFee = data.ExamFee;

                    if (data.Condonation !== undefined)
                        dataPay.Condonation = data.Condonation;
                    else
                        dataPay.Condonation = "";
                    dataPay.Penality = data.Penality;
                    dataPay.Tatkal = data.Tatkal;
                    dataPay.CertificateFee = data.CertificateFee;


                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.Pin);
                }
                else if (PaymentStudentList.includes(data.Pin)) {
                    PaymentStudentList.remByVal(data.Pin);
                    PaymentStudent.remElementByVal(data.Pin);
                    if (PaymentStudentList.length == 0) {
                        $scope.allItemsSelectedthing = false;
                    }
                }

            }

        };

        $scope.selectAll = function () {
            $scope.allItemsSelectedthing = true;
            if ($scope.isAllchecked == true) {

                $scope.isAllchecked = false;


                for (var i = 0; i < $scope.ExamPayment.length; i++) {
                    $scope.ExamPayment[i].isChecked = false;
                }
                PaymentStudent = [];
                PaymentStudentList = [];
            }
            else if ($scope.isAllchecked == false) {

                for (var i = 0; i < $scope.ExamPayment.length; i++) {
                    if ($scope.ExamPayment[i].IsFeedbackSubmitted === 1) {
                        dataPay = {};

                        dataPay.Pin = $scope.ExamPayment[i].Pin;
                        dataPay.Amount = $scope.ExamPayment[i].Total;
                        dataPay.StudentContact = $scope.ExamPayment[i].StudentContact;
                        for (var j = 0; j < $scope.ActiveSemesters.length; j++) {
                            if ($scope.ActiveSemesters[j].semid == $scope.current_schemeid) {
                                dataPay.Semester = $scope.ActiveSemesters[j].semester;
                                Semester = $scope.ActiveSemesters[j].semester;
                                break;
                            }
                        }
                        dataPay.UserName = authData.userName;
                        dataPay.StudentTypeId = $scope.Student.id;
                        dataPay.Name = $scope.ExamPayment[i].Name;
                        dataPay.ExamFee = $scope.ExamPayment[i].ExamFee;

                        if ($scope.ExamPayment[i].Condonation !== undefined)
                            dataPay.Condonation = $scope.ExamPayment[i].Condonation;
                        else
                            dataPay.Condonation = "";
                        dataPay.Penality = $scope.ExamPayment[i].Penality;
                        dataPay.Tatkal = $scope.ExamPayment[i].Tatkal;
                        dataPay.CertificateFee = $scope.ExamPayment[i].CertificateFee;
                        PaymentStudent.push(dataPay);
                        PaymentStudentList.push($scope.ExamPayment[i].Pin);

                        $scope.ExamPayment[i].isChecked = true;
                        $scope.isAllchecked = true;
                    } else if ($scope.ExamPayment[i].IsFeedbackSubmitted === 0) {
                        $scope.ExamPayment[i].isChecked = false;
                        //alert("Please Submit All Students Feedback to Pay Fee")
                        //return;
                    }

                }


                //for (var i = 0; i < $scope.ExamPayment.length; i++) {

                //}


                $scope.PaymentStudentList = PaymentStudentList;

            };

        }
        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = [];
                $scope.StudentType.push(response.Table[0]);
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });


        var LoadActiveSemesters = AssessmentService.getActiveSemester();
        LoadActiveSemesters.then(function (response) {
            $scope.ActiveSemesters = response.Table;
        },
            function (error) {
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });

        var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
        AcademicYearsActive.then(function (response) {
            $scope.years = response.Table[0];

        },
            function (error) {
                alert("error while loading Academic Year");
            });


        $scope.LoadExamType = function (current_schemeid) {
            $scope.current_schemeid = current_schemeid;
        }

        $scope.showPaymentDetails = function (ExamMonthYear) {
            PaymentStudentList = [];
            PaymentStudent = [];
            if ($scope.current_schemeid !== undefined && $scope.Student.id !== undefined && $scope.Student.id != '' && $scope.isBackLog == false) {

                PaymentStudentList = [];
                PaymentStudent = [];

                $scope.dataRegular = true;
                $scope.ExamMonthYearId = ExamMonthYear
                var getAdmissionsubmod = PreExaminationService.getPayExamFee(authData.SysUserID, $scope.Student.id, $scope.current_schemeid, $scope.ExamMonthYear);
                getAdmissionsubmod.then(function (Usersdata) {
                    //$scope.userName = Usersdata;


                    $scope.BranchId = authData.BranchId;
                    if (Usersdata.Table.length > 0) {
                        $scope.isShowResults = true;
                        $scope.dataBackLog = false;

                        for (var i = 0; i < Usersdata.Table.length; i++) {
                            Usersdata.Table[i].isChecked = false;
                        }

                        $scope.ExamPayment = Usersdata.Table;
                    }
                    else {
                        $scope.isShowResults = false;
                        $scope.AcademicModules = [];
                        alert("No Data Found");
                    }


                }, function (err) {
                    $scope.isShowResults = false;
                    console.log(err);
                });
            } else if ($scope.Student.id !== undefined && $scope.Student.id != '' && $scope.isBackLog == true) {

                PaymentStudentList = [];
                PaymentStudent = [];
                $scope.dataBackLog = true;
                $scope.dataRegular = false;
                //$scope.current_schemeid
                var getAdmissionsubmod = PreExaminationService.getPayExamFee(authData.SysUserID, $scope.Student.id, 1);
                getAdmissionsubmod.then(function (Usersdata) {
                    //$scope.userName = Usersdata;


                    $scope.BranchId = authData.BranchId;
                    if (Usersdata.Table.length > 0) {
                        $scope.isShowResults = true;

                        for (var i = 0; i < Usersdata.Table.length; i++) {
                            Usersdata.Table[i].isChecked = false;
                        }

                        $scope.ExamPayment = Usersdata.Table;
                    }
                    else {
                        $scope.isShowResults = false;
                        $scope.AcademicModules = [];
                        alert("No Data Found");
                    }


                }, function (err) {
                    $scope.isShowResults = false;
                    console.log(err);
                });




            } else {
                alert("please select required fields");
            }
        }

        $scope.closeModal = function () {
            $scope.noteChallan = false;
            $scope.modalInstance.close();
        }

        $scope.ChangeData = function (data) {
            var Data = JSON.parse(data)
      //      console.log(Data)
            $scope.ExamMonthYear = Data.Id
            $scope.ExamMonthYearName = Data.ExamYearMonth

        }

        $scope.Proceedtopayfine = function () {
            $scope.noteChallan = false;
            $scope.secondClick = false;
            //var marchantid = "TSSBTET"; // live
            var marchantid = "TSSBTET"; // test
            var addInfo1 = authData.College_Code;
            var addInfo3 = "NA";
            var addInfo4 = "NA";//$scope.loadedScheme.Scheme;
            if ($scope.Student.id == 1) {
                var addInfo5 = "REGULAR";
            }
            //var addInfo5 = $scope.current_schemeid;//Semester;
            var addInfo6 = "Bulk"//$scope.Examtype;
            var addInfo7 = $scope.ExamMonthYearName;
            var amount = $scope.AmountDB.toFixed(2) == null || $scope.AmountDB.toFixed(2) == "" ? $scope.sum.toFixed(2) : $scope.AmountDB.toFixed(2);
            var subMarchantid = "TSDOFP";
            $localStorage.PaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "Dashboard.PreExamination.PreExamFeePayment"
            }
            $localStorage.PaymentGatewayResponse = redirecturl;
            //$localStorage.assessment.redirecturl = 'Dashboard.AssessmentDashboard.Assessment.TheorySubjectList';
            //localhost:65321/Payment/BulkBillResponse
            //'sbtet.telangana.gov.in/API/Payment/BulkBillResponse'
            var location = window.location.origin;
            PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount, $scope.Student.id, JSON.stringify(PaymentStudent));

            var proceedfinePayment = PaymentService.getHashValue(location + "/Payment/BulkBillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    // var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg="
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                    //var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg=KALYANTEST|429|NA|2|NA|NA|NA|INR|NA|R|kalyantest|NA|NA|F|8850062965|test-developer@candere.com|187|NA|NA|NA|NA|http://127.0.0.1/candere_repo/scheme/billdesk/response|9F4E06C08698DA6338428E2A36141826468E8E31C83F3B814F831AE6D6D27CFD";
                    //   var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                console.log(err);
            });
        }


        //$scope.clipBoard = function () {
        //    var copyText = $scope.challan;
        //    var copyElement = document.createElement("span");
        //    copyElement.appendChild(document.createTextNode(copyText));
        //    copyElement.id = 'tempCopyToClipboard';
        //    angular.element(document.body.append(copyText));

        //    // select the text
        //    var range = document.createRange();
        //    range.selectNode(copyText);
        //    window.getSelection().removeAllRanges();
        //    window.getSelection().addRange(range);

        //    // copy & cleanup
        //    document.execCommand('copy');
        //    window.getSelection().removeAllRanges();
        //    copyText.remove();
        //}

        var loadHallticket = PreExaminationService.GetExamMonthYearForHallticketandFeepayment(1,1);
        loadHallticket.then(function (response) {
            if (response.Table[0].ResponceCode == '200') {
                $scope.GetExamMonthYear = [];
                $scope.GetExamMonthYear = response.Table1;
            } else {
                $scope.GetExamMonthYear = [];
                alert("No Exam Month Year found on this Record");
            }
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);
            });

        $scope.payNow = function () {
            if (PaymentStudentList.length > 0) {
                sum = 0;
                for (var i = 0; i < PaymentStudent.length; i++) {
                    sum += PaymentStudent[i].Amount;
                }
                $scope.sum = sum;

                console.log(PaymentStudentList);
                console.log(JSON.stringify(PaymentStudent));

                //$scope.total = PaymentStudentList.length;
                //$scope.PaymentStudent = PaymentStudent;


                var getChallanDetails = PreExaminationService.getChanllanForExamFee(JSON.stringify(PaymentStudent).toString(), $scope.ExamMonthYearId);
                getChallanDetails.then(function (Usersdata) {
                    $scope.userJsonData = JSON.parse(Usersdata);
                    if ($scope.userJsonData.Table.length > 0) {
                        $scope.challan = $scope.userJsonData.Table[0].ChalanaNumber;
                        $scope.PaymentStudent = $scope.userJsonData.Table;
                        $scope.AmountDB = $scope.userJsonData.Table1[0].TotalAmount;
                        $scope.total = $scope.userJsonData.Table.length;
                        if (PaymentStudentList.length > 0) {
                            $scope.modalInstance = $uibModal.open({
                                templateUrl: "/app/views/TotalExampaymentPopup.html",
                                size: 'xlg',
                                scope: $scope,
                                windowClass: 'modal-fit-att',
                                //backdrop: 'static',
                            });
                        }
                        else {
                            $scope.noPaymentelected = false;
                        }

                    }
                    else {
                        alert("Some thing Went Wrong");
                    }
                }, function (err) {
                    $scope.isShowResults = false;
                    console.log(err);
                });
            }
            else
                alert("Select any student to pay");
        }


    })
})