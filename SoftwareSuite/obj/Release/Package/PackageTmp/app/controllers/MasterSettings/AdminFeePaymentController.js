define(['app'], function (app) {
    app.controller("AdminFeePaymentController", function ($scope, $http, $localStorage, $state, PreExaminationService, $uibModal, PaymentService) {
        $scope.secondClick = false;
        $scope.allItemsSelected = true;
        $scope.allItemsSelectedthing = true;
        $scope.PaymentDetails = {}
        var authData = $localStorage.authorizationData;
        $scope.SystemUserTypeId = authData.SystemUserTypeId;
        $scope.LoadImg = false;
        $scope.DetailsFound = false;
        $scope.DetailsNotFound = false;
        $scope.DetainedDetailsFound = false;
        $scope.isBackLog = false;
        $scope.PaymentStudent = [];
        

        var LoadExamMonthyears = PreExaminationService.getExamYearMonths(); 
        LoadExamMonthyears.then(function (response) {
            if (response.Table.length > 0) {
                $scope.getExamMonthYears = response.Table;
                // $scope.StudentType.push(response.Table[0]);
            } else {
                $scope.getExamMonthYears = [];
                alert("No Student found on this Record");
            }
        },
         function (error) {
             alert("error while loading Student Types");
             console.log(error);
         });


      
        var LoadExamTypeBysem = PreExaminationService.getStudentType();
           LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
                // $scope.StudentType.push(response.Table[0]);
            } else{
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });

     
        
        
        PaymentStudent = [];
        PaymentStudentList = [];

        $scope.selectAll = function () {

            $scope.allItemsSelectedthing = true;


            if ($scope.isAllchecked == true) {

                $scope.isAllchecked = false;


                for (var i = 0; i < $scope.studentSubData.length; i++) {
                    $scope.studentSubData[i].isChecked = false;
                }

                dataPay.Amount = 0;
                $scope.studentLateFee = 0;
                $scope.studentTatkalFee = 0;

                PaymentStudent = [];
                PaymentStudentList = [];
                $scope.studentSubjectsSelected = PaymentStudentList.length;
                $scope.studentTotalFee = ($scope.studentExamFee) * (PaymentStudentList.length);
                if ($scope.FinalstudentTatkalFee > 0) {
                    $scope.studentTotalFee = $scope.FinalstudentTatkalFee;
                }
            }
            else if ($scope.isAllchecked == false) {
                $scope.isAllchecked = true;
                for (var i = 0; i < $scope.studentSubData.length; i++) {
                    $scope.studentSubData[i].isChecked = true;
                }
                PaymentStudentList = [];
                PaymentStudent = [];


                for (var i = 0; i < $scope.studentSubData.length; i++) {
                    dataPay = {};

                    dataPay.Semester = $scope.studentSubData[i].Semester;
                    dataPay.Sem = $scope.studentSubData[i].SemId;

                    if ($scope.PaymentDetails.length > 0) {
                        dataPay.Amount = 0;
                        $scope.studentLateFee = 0;
                        $scope.studentTatkalFee = 0;
                        $scope.ExamFee = 0;
                        for (var j = 0; j < $scope.PaymentDetails.length; j++) {
                            //dataPay.Amount += $scope.PaymentDetails[i].ExamFee + $scope.PaymentDetails[i].LateFee + $scope.PaymentDetails[i].TatkalFee;
                            $scope.studentLateFee += $scope.PaymentDetails[j].LateFee;
                            $scope.studentTatkalFee += $scope.PaymentDetails[j].TatkalFee;
                            $scope.ExamFee += $scope.PaymentDetails[j].ExamFee;
                        }

                        //$scope.studentTotalFee = dataPay.Amount;
                    }
                    //dataPay.Amount = $scope.studentTotalFee;
                    if ($scope.studentTatkalFee > 0) {
                        dataPay.Amount = $scope.studentTatkalFee + $scope.ExamFee;
                        dataPay.isTatkalFee = true;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else if ($scope.studentLateFee > 0) {
                        dataPay.Amount = $scope.studentLateFee + $scope.ExamFee;
                        dataPay.isLateFee = false;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else {
                        dataPay.Amount = $scope.ExamFee;
                        $scope.studentTotalFee = dataPay.Amount;
                        dataPay.isLateFee = false;
                        dataPay.isTatkalFee = false;
                    }


                    //$scope.studentSubjectsSelected;
                    dataPay.Pin = $scope.studPin;
                    //for (var j = 0; j < $scope.ActiveSemesters.length; j++) {
                    //    if ($scope.ActiveSemesters[j].semid == $scope.current_schemeid) {
                    //        dataPay.Semester = $scope.ActiveSemesters[j].semester;
                    //        Semester = $scope.ActiveSemesters[j].semester;
                    //        break;
                    //    }
                    //}
                    dataPay.UserName = "STUDENT";
                    dataPay.StudentTypeId = $scope.Studtype;
                    dataPay.Name = $scope.studentName;

                    //if ($scope.studentSubData[i].Condonation !== undefined)
                    //    dataPay.Condonation = $scope.ExamPayment[i].Condonation;
                    //else
                    //    dataPay.Condonation = "";
                    //dataPay.Penality = $scope.ExamPayment[i].Penality;
                    //dataPay.Tatkal = $scope.ExamPayment[i].Tatkal;
                    //dataPay.CertificateFee = $scope.ExamPayment[i].CertificateFee;
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push($scope.studentSubData[i].Semester);
                    $scope.studentSubjectsSelected = PaymentStudentList.length;
                    //$scope.studentTotalFee = ($scope.studentExamFee) * (PaymentStudentList.length);
                    //if ($scope.FinalstudentTatkalFee > 0) {
                    //    //$scope.studentTotalFee = $scope.FinalstudentTatkalFee;
                    //}
                }
            }
            $scope.studentSubjectsSelected = PaymentStudentList.length;
            $scope.PaymentStudent = PaymentStudent;

            $scope.PaymentStudentList = PaymentStudentList;
            $scope.calculateTotalFee();
        };


        $scope.selectVAll = function () {

            if ($scope.allItemsSelectedthing == true) {


                if ($scope.isAllchecked == false) {

                    $scope.isAllchecked = false;


                    for (var i = 0; i < $scope.studentSubData.length; i++) {
                        $scope.studentSubData[i].isChecked = false;
                    }
                    PaymentStudent = [];
                    PaymentStudentList = [];
                }
                else if ($scope.isAllchecked == true) {
                    $scope.isAllchecked = true;
                    for (var i = 0; i < $scope.studentSubData.length; i++) {
                        $scope.studentSubData[i].isChecked = true;
                    }
                    PaymentStudentList = [];
                    PaymentStudent = [];
                    for (var i = 0; i < $scope.studentSubData.length; i++) {
                        dataPay = {};

                        dataPay.Semester = $scope.studentSubData[i].Semester;
                        dataPay.Sem = $scope.studentSubData[i].SemId;

                        if ($scope.PaymentDetails.length > 0) {
                            dataPay.Amount = 0;
                            $scope.studentLateFee = 0;
                            $scope.studentTatkalFee = 0;
                            $scope.ExamFee = 0;
                            for (var j = 0; j < $scope.PaymentDetails.length; j++) {
                                //dataPay.Amount += $scope.PaymentDetails[i].ExamFee + $scope.PaymentDetails[i].LateFee + $scope.PaymentDetails[i].TatkalFee;
                                $scope.studentLateFee += $scope.PaymentDetails[j].LateFee;
                                $scope.studentTatkalFee += $scope.PaymentDetails[j].TatkalFee;
                                $scope.ExamFee += $scope.PaymentDetails[j].ExamFee;
                            }

                            //$scope.studentTotalFee = dataPay.Amount;
                        }
                        //dataPay.Amount = $scope.studentTotalFee;
                        if ($scope.studentTatkalFee > 0) {
                            dataPay.Amount = $scope.studentTatkalFee + $scope.ExamFee;
                            dataPay.isTatkalFee = true;
                            $scope.studentTotalFee = dataPay.Amount;
                        }
                        else if ($scope.studentLateFee > 0) {
                            dataPay.Amount = $scope.studentLateFee + $scope.ExamFee;
                            dataPay.isLateFee = false;
                            $scope.studentTotalFee = dataPay.Amount;
                        }
                        else {
                            dataPay.Amount = $scope.ExamFee;
                            $scope.studentTotalFee = dataPay.Amount;
                            dataPay.isLateFee = false;
                            dataPay.isTatkalFee = false;
                        }
                        //$scope.studentSubjectsSelected;
                        dataPay.Pin = $scope.studPin;
                        //for (var j = 0; j < $scope.ActiveSemesters.length; j++) {
                        //    if ($scope.ActiveSemesters[j].semid == $scope.current_schemeid) {
                        //        dataPay.Semester = $scope.ActiveSemesters[j].semester;
                        //        Semester = $scope.ActiveSemesters[j].semester;
                        //        break;
                        //    }
                        //}
                        dataPay.UserName = "STUDENT";
                        dataPay.StudentTypeId = $scope.Studtype;
                        dataPay.Name = $scope.studentName;
                        //if ($scope.studentSubData[i].Condonation !== undefined)
                        //    dataPay.Condonation = $scope.ExamPayment[i].Condonation;
                        //else
                        //    dataPay.Condonation = "";
                        //dataPay.Penality = $scope.ExamPayment[i].Penality;
                        //dataPay.Tatkal = $scope.ExamPayment[i].Tatkal;
                        //dataPay.CertificateFee = $scope.ExamPayment[i].CertificateFee;
                        PaymentStudent.push(dataPay);
                        PaymentStudentList.push($scope.studentSubData[i].Semester);


                        //for (var i = 0 ; i < PaymentStudent.length; i++) {
                        //    $scope.studentTotalFee = 0;
                        //    $scope.studentTotalFee +=  PaymentStudent.Amount;
                        //}
                    }
                }

            }
            if ($scope.allItemsSelectedthing == false) {
                $scope.allItemsSelectedthing = true;
            }
            $scope.PaymentStudent = PaymentStudent;

            $scope.PaymentStudentList = PaymentStudentList;
            $scope.calculateTotalFee();
        };


        $scope.selectEntity = function (data) {
            if (data != null) {
                if (!PaymentStudentList.includes(data.Semester)) {
                    dataPay = {};
                    dataPay.Semester = data.Semester;
                    dataPay.Sem = data.SemId;

                    if ($scope.PaymentDetails.length > 0) {
                        for (var i = 0; i < $scope.PaymentDetails.length; i++) {
                            if ($scope.PaymentDetails[i].Semester == data.Semester) {
                                $scope.studentLateFee += $scope.PaymentDetails[i].LateFee;
                                $scope.studentTatkalFee += $scope.PaymentDetails[i].TatkalFee;
                                $scope.ExamFee += $scope.PaymentDetails[i].ExamFee;
                            }
                        }
                    }
                    if ($scope.studentTatkalFee > 0) {
                        dataPay.Amount = $scope.studentTatkalFee;
                        dataPay.isTatkalFee = true;
                        dataPay.isLateFee = false;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else if ($scope.studentLateFee > 0) {
                        dataPay.Amount = $scope.studentLateFee + $scope.ExamFee;
                        dataPay.isLateFee = true;
                        dataPay.isTatkalFee = false;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else {
                        dataPay.Amount = $scope.ExamFee;
                        $scope.studentTotalFee = dataPay.Amount;
                        dataPay.isLateFee = false;
                        dataPay.isTatkalFee = false;
                    }
                    dataPay.Name = $scope.studentName;
                    dataPay.UserName = "STUDENT";
                    dataPay.StudentTypeId = $scope.Studtype;
                    dataPay.Name = $scope.studentName;
                    dataPay.Pin = $scope.studPin;
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.Semester);
                    $scope.studentSubjectsSelected = PaymentStudentList.length;
                    $scope.calculateTotalFee();
                }
                else if (PaymentStudentList.includes(data.Semester)) {
                    PaymentStudentList.remByVal(data.Semester);
                    PaymentStudent.remElementByVal(data.Semester);
                    $scope.studentSubjectsSelected = PaymentStudentList.length;
                    if ($scope.PaymentDetails.length > 0) {
                        for (var i = 0; i < $scope.PaymentDetails.length; i++) {
                            if ($scope.PaymentDetails[i].Semester == data.Semester) {
                                $scope.studentLateFee -= $scope.PaymentDetails[i].LateFee;
                                $scope.studentTatkalFee -= $scope.PaymentDetails[i].TatkalFee;
                                $scope.ExamFee -= $scope.PaymentDetails[i].ExamFee;
                            }
                        }
                    }

                    //dataPay.Amount = $scope.studentTotalFee;
                    if ($scope.studentTatkalFee > 0) {
                        dataPay.Amount = $scope.studentTatkalFee + $scope.ExamFee;
                        dataPay.isTatkalFee = true;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else if ($scope.studentLateFee > 0) {
                        dataPay.Amount = $scope.studentLateFee + $scope.ExamFee;
                        dataPay.isLateFee = false;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else {
                        dataPay.Amount = $scope.ExamFee;
                        $scope.studentTotalFee = dataPay.Amount;
                        dataPay.isLateFee = false;
                        dataPay.isTatkalFee = false;
                    }

                    $scope.studentTotalFee = $scope.studentExamFee + $scope.studentLateFee + $scope.studentTatkalFee;
                    if (PaymentStudentList.length == 0) {
                        $scope.allItemsSelectedthing = false;
                        $scope.studentTotalFee = 0;
                    }
                    if ($scope.FinalstudentTatkalFee > 0) {
                        $scope.studentTotalFee = $scope.FinalstudentTatkalFee;
                    }
                    $scope.calculateTotalFee();
                }
                $scope.PaymentStudent = PaymentStudent;
                $scope.PaymentStudentList = PaymentStudentList;
            }


        };

        $scope.calculateTotalFee = function () {
            $scope.FinalExamFee = 0;
            $scope.FinalLateFee = 0;
            $scope.FinalTatkalFee = 0;
            for (var j = 0; j < PaymentStudentList.length; j++) {
                for (var i = 0; i < $scope.PaymentDetails.length; i++) {
                    if ($scope.PaymentDetails[i].Semester == PaymentStudentList[j]) {
                        $scope.FinalExamFee += $scope.PaymentDetails[i].ExamFee;
                        $scope.FinalLateFee += $scope.PaymentDetails[i].LateFee;
                        $scope.FinalTatkalFee += $scope.PaymentDetails[i].TatkalFee;
                    }
                }
            }
            $scope.FinalTotalFee = $scope.FinalExamFee + $scope.FinalLateFee + $scope.FinalTatkalFee;
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
                if (this[i].Semester === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        $scope.changedVal = function () {
            $scope.DetailsFound = false;
        }

        $scope.getStudentDetails = function (Pin, Studtype) {

            $scope.StudentTypeId;
            if ($scope.StudentTypeId == "1") {
                $scope.isBackLog = false;
                if ($scope.StudentTypeId === undefined) {
                    alert("Slelect Student Type");
                    return;
                }

                else if ($scope.StudentTypeId !== undefined) {
                    $scope.LoadImg = true;
                    $scope.DetailsFound = false;
                    $scope.DetainedDetailsFound = false;
                   
                    if ($scope.SystemUserTypeId == 1) {
                        var studentDetails = PreExaminationService.GetStudentFeePaymentDetailsforAdmin(Pin, $scope.StudentTypeId, $scope.SystemUserTypeId);
                        studentDetails.then(function (res) {
                            $scope.LoadImg = false;
                            $scope.DetailsNotFound = false;
                            $scope.DetailsFound = true;
                            var resp = JSON.parse(res);
                            if (resp.Table !== undefined && resp.Table[0].ResponceCode == '200') {
                                if (resp.Table.length > 0) {
                                    $scope.studPin = resp.Table1[0].Pin;
                                    $scope.Photo = resp.Table1[0].Photo;
                                    $scope.studentScheme = resp.Table1[0].Scheme;
                                    $scope.studentBranch = resp.Table1[0].Branch;
                                    $scope.studentSem = resp.Table1[0].Semester;
                                    $scope.studentName = resp.Table1[0].Name;
                                    $scope.studentFatherName = resp.Table1[0].FatherName;
                                    $scope.studentattendance = resp.Table1[0].PresemptiveAttendance;
                                    $scope.studentPaymentStatus = resp.Table1[0].Status;
                                    $scope.FinalstudentTatkalFee = resp.Table1[0].TatkalFee;
                                    $scope.studentTatkalFee = resp.Table1[0].TatkalFee;
                                    $scope.studentCondonationFee = resp.Table1[0].Condonation;
                                    $scope.FinalstudentLateFee = resp.Table1[0].LateFee;
                                    $scope.studentLateFee = resp.Table1[0].LateFee;
                                    $scope.studentExamFee = resp.Table1[0].ExamFee;
                                    $scope.studentTotalFee = resp.Table1[0].TotalFee;
                                    $scope.studentCertificateFee = resp.Table1[0].CertificateFee;
                                    $scope.studentExamCenterName = resp.Table1[0].ExaminationCenter;
                                    $scope.studentExamCenterCode = resp.Table1[0].ExaminationCenterCode;
                                    $scope.studentSubData = resp.Table2;
                                    $scope.DetailsNotFound = false;
                                    $scope.LoadImg = false;
                                } else {
                                    alert("No Data Found")
                                }
                            }
                            else if (resp.Table[0].ResponceCode == '400') {
                                $scope.LoadImg = false;
                                $scope.DetailsFound = false;
                                $scope.DetailsNotFound = false;
                                $scope.DetainedDetailsFound = true;
                                $scope.DetainedDetailsFoundWithData = resp.Table[0].ResponceDescription;
                            }
                            else {

                                $scope.LoadImg = false;
                                $scope.DetailsFound = false;
                                $scope.DetailsNotFound = true;
                                alert(resp.Table[0].ResponceDescription);

                            }

                        }, function (err) {
                            $scope.LoadImg = false;
                            $scope.DetailsFound = false;
                            $scope.DetailsNotFound = false;

                        });


                    } 


                }
            }

            else if ($scope.StudentTypeId == "2") {
                $scope.isAllchecked = true;
                $scope.isBackLog = true;
                if ($scope.StudentTypeId === undefined) {
                    alert("Slelect Student Type");
                    return;
                }

                else if ($scope.StudentTypeId !== undefined) {
                    $scope.LoadImg = true;
                    $scope.DetailsFound = false;
                    $scope.DetainedDetailsFound = false;
                    
                    var studentDetails = PreExaminationService.GetStudentFeePaymentDetailsforAdmin(Pin, $scope.StudentTypeId, $scope.SystemUserTypeId);
                    studentDetails.then(function (resp) {



                        $scope.LoadImg = false;
                        $scope.DetailsNotFound = false;
                        $scope.DetailsFound = true;

                        resp = JSON.parse(resp);
                        //if (JSON.parse(resp)) {
                        //} else {
                        //    alert("No Data Found")
                        //}
                        //var resp = {
                        //    "Table": [{
                        //        "ResponceCode": "200",
                        //        "ResponceDescription": "Required Data Pushed."
                        //    }],
                        //    "Table1": [{
                        //        "Photo": "data:image/png;base64,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",
                        //        "Pin": "18001-M-005",
                        //        "Name": "BHUPATHI JAY VARSHITH",
                        //        "FatherName": "BHUPATHI RAMESH",
                        //        "Scheme": "C18",
                        //        "CollegeCode": "001  ",
                        //        "Branch": "MECHANICAL ENGINEERING",
                        //        "ExaminationCenter": "027 - GOVT POLYTECHNIC,NALGONDA",
                        //        "PresemptiveAttendance": 87,
                        //        "ExamFee": 550,
                        //        "Condonation": 0,
                        //        "LateFee": 0,
                        //        "TatkalFee": 0,
                        //        "TotalFee": 550,
                        //        "CertificateFee": 600
                        //    }],
                        //    "Table2": [{
                        //        "Semester": "3SEM",
                        //        "Subjects": [{
                        //            "SubjectCode": "18M-301l",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }, {
                        //            "SubjectCode": "18M-301k",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        },{
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //    }]
                        //    }, {
                        //        "Semester": "3SEM",
                        //        "Subjects": [{
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }, {
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }]
                        //    }, {
                        //        "Semester": "3SEM",
                        //        "Subjects": [{
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }, {
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        },
                        //        {
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }]
                        //    }, {
                        //        "Semester": "3SEM",
                        //        "Subjects": [{
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }, {
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }]
                        //    }, {
                        //        "Semester": "3SEM",
                        //        "Subjects": [{
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }, {
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }]
                        //    }, {
                        //        "Semester": "3SEM",
                        //        "Subjects": [{
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }, {
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }]
                        //    }, {
                        //        "Semester": "3SEM",
                        //        "Subjects": [{
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }, {
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }]
                        //    }, {
                        //        "Semester": "3SEM",
                        //        "Subjects": [{
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }, {
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }]
                        //    }, {
                        //        "Semester": "3SEM",
                        //        "Subjects": [{
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }, {
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }]
                        //    }, {
                        //        "Semester": "3SEM",
                        //        "Subjects": [{
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }, {
                        //            "SubjectCode": "18M-301F",
                        //            "SubjectName": "APPLIED ENGINEERING MATHEMATICS",
                        //            "ExamDate": "",
                        //            "ExamTime": ""
                        //        }]
                        //    }]
                        //};
                        var newDataTable = [];

                        if (resp.Table !== undefined && resp.Table[0].ResponceCode == '200') {

                            //var newDataTable = [];
                            var SemesterList = [];

                            for (var i = 0; i < resp.Table2.length; i++) {
                                if (!SemesterList.includes(resp.Table2[i].yrsem)) {
                                    SemesterList.push(resp.Table2[i].yrsem);
                                    var temp = {};
                                    temp.Subjects = [];

                                    temp.Semester = resp.Table2[i].yrsem;
                                    temp.SemId = resp.Table2[i].semid;
                                    temp.scheme = resp.Table2[i].scheme;
                                    temp.oldscheme = resp.Table2[i].OriginalScheme;
                                    temp.isChecked = true;

                                    for (var j = 0; j < resp.Table2.length; j++) {
                                        var Subject = {};
                                        if (resp.Table2[j].yrsem == temp.Semester) {
                                            Subject.SubjectCode = resp.Table2[j].sub1;
                                            Subject.bacSubjectCode = resp.Table2[j].sub2;
                                            Subject.SubjectName = resp.Table2[j].subname;
                                            Subject.scheme = resp.Table2[i].scheme;
                                            Subject.ExamDate = resp.Table2[j].ExamDate;
                                            Subject.ExamTime = resp.Table2[j].ExamTime;
                                            temp.Subjects.push(Subject);

                                        }
                                    }

                                    newDataTable.push(temp);
                                }
                            }




                            $scope.studPin = resp.Table1[0].Pin;
                            $scope.Photo = resp.Table1[0].Photo;
                            $scope.studentScheme = resp.Table1[0].Scheme;
                            $scope.studentBranch = resp.Table1[0].Branch;
                            $scope.studentSem = resp.Table1[0].Semester;
                            $scope.studentName = resp.Table1[0].Name;
                            $scope.studentFatherName = resp.Table1[0].FatherName;
                            $scope.studentSubjectsSelected = resp.Table1[0].TotalSemSelect;
                            $scope.studentPaymentStatus = resp.Table1[0].Status;
                            $scope.FinalstudentTatkalFee = resp.Table1[0].TatkalFee;
                            $scope.studentTatkalFee = resp.Table1[0].TatkalFee;
                            $scope.studentCondonationFee = resp.Table1[0].Condonation;
                            $scope.FinalstudentLateFee = resp.Table1[0].LateFee;
                            $scope.studentLateFee = resp.Table1[0].LateFee;
                            $scope.studentExamFee = resp.Table1[0].ExamFee;
                            $scope.studentTotalFee = resp.Table1[0].TotalFee;
                            $scope.studentCertificateFee = resp.Table1[0].CertificateFee;
                            $scope.studentExamCenterName = resp.Table1[0].ExaminationCenter;
                            $scope.studentExamCenterCode = resp.Table1[0].ExaminationCenterCode;
                            $scope.PaymentDetails = resp.Table3;
                            $scope.studentSubData = newDataTable;
                            $scope.DetailsNotFound = false;
                            $scope.LoadImg = false;
                            $scope.selectVAll();

                            $scope.tableData = [];
                            //  $scope.ExamPayment = response;
                            $scope.tableData.push({ rows: resp.Table3, cols: Object.keys(resp.Table3[0]) });
                            $scope.calculateTotalFee();
                        }
                        else if (resp.Table !== undefined || resp.Table[0].ResponceCode == '400') {
                            $scope.LoadImg = false;
                            $scope.DetailsFound = false;
                            $scope.DetailsNotFound = false;
                            $scope.DetainedDetailsFound = true;
                            $scope.DetainedDetailsFoundWithData = resp.Table[0].ResponceDescription;
                        }
                        else {
                            $scope.LoadImg = false;
                            $scope.DetailsFound = false;
                            $scope.DetailsNotFound = true;
                            alert(resp.Table[0].ResponceDescription);

                        }

                    }, function (err) {
                        $scope.LoadImg = false;
                        $scope.DetailsFound = false;
                        $scope.DetailsNotFound = false;

                    });
                }
            }
        }



        $scope.Proceedtopayfine = function () {
            var College_Code = "admin";
            $scope.noteChallan = false;
            $scope.secondClick = false;
            //var marchantid = "TSSBTET"; // live
            var marchantid = "TSSBTET"; // test
            try {
                College_Code = authData.College_Code == null ? "admin" : authData.College_Code;
            } catch (err) {
            }
            var addInfo1 = College_Code;
            var addInfo3 = $scope.feepayingpins;
            var addInfo4 = "NA"//$scope.loadedScheme.Scheme;
            var addInfo5 = "NA";//Semester;
            var addInfo6 = "SINGLE"//PaymentType;
            var addInfo7 = "NA";
            var amount = "";
            if ($scope.Student.id == 1) {
                addInfo5 = "REGULAR";
                amount = $scope.AmountDB.toFixed(2) == null || $scope.AmountDB.toFixed(2) == "" ? $scope.studentTotalFee.toFixed(2) : $scope.AmountDB.toFixed(2);

            }
            else if ($scope.Student.id == 2) {
                amount = $scope.FinalAmountDB.toFixed(2);
                addInfo5 = "BACKLOG";
                addInfo4 = $scope.Sems;
            }
            var subMarchantid = "TSDOFP";
            $localStorage.PaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "Dashboard.PreExamination.DiplomaFeePayment"
            }
            $localStorage.PaymentGatewayResponse = redirecturl;

            var location = window.location.origin;

            PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount, "studentType", "json");
            // $localStorage.assessment.redirecturl = 'Dashboard.AssessmentDashboard.Assessment.TheorySubjectList';
            //localhost:65321/Payment/BulkBillResponse
            //'sbtet.telangana.gov.in/API/Payment/BulkBillResponse'
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

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }




        $scope.notedChallan = function () {
            if ($scope.noteChallan == true) {
                $scope.noteChallan = false;
            } else {
                $scope.noteChallan = true;
            }
        }


        $scope.isStudentContact = true;
        $scope.payNow = function () {


            if ($scope.Student === undefined) {
                alert("Select Student Type");
            }
            else if ($scope.Student !== undefined) {

                if ($scope.Student.id == 1) {

                    var PaymentStudent = [];
                    datajson = {};
                    datajson.Pin = $scope.studPin;
                    datajson.Semester = $scope.studentSubData[0].Semester + "(" + $scope.studentSubData[0].studentScheme + ")";
                    datajson.Amount = $scope.studentTotalFee.toFixed(2);
                    datajson.UserName = null;
                    datajson.StudentTypeId = $scope.Student.id;
                    PaymentStudent.push(datajson);
                }

                //UserName":"M_001","Pin":"123","Semester":"3sem(c18)","Amount":"100","IpAddress":""
                if (PaymentStudent === undefined) {
                    PaymentStudent = $scope.PaymentStudent;
                }
                var getChallanDetails = PreExaminationService.getChanllanForExamFee(JSON.stringify(PaymentStudent).toString());
                getChallanDetails.then(function (Usersdata) {
                    $scope.userJsonData = JSON.parse(Usersdata);

                    if ($scope.Student.id == 1) {
                        if ($scope.userJsonData.Table.length > 0) {
                            if ($scope.userJsonData.Table1[0].ChalanaNumber !== undefined) {
                                var feepayingpins = "";
                                var Sems = "";
                                $scope.StudentVerData = $scope.userJsonData.Table;
                                //  console.log(PaymentStudent)


                                if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 2) {
                                    for (var i = 0; i < $scope.userJsonData.Table.length; i++) {
                                        Sems += $scope.userJsonData.Table[i].Semester + ",";
                                    }
                                    Sems = Sems.substring(0, Sems.length - 1);
                                    $scope.Sems = Sems;
                                }


                                if ($scope.userJsonData.Table1[0].StudentContact != null && $scope.userJsonData.Table1[0].StudentContact != "") {
                                    $scope.UpdatedContactDetail = $scope.userJsonData.Table1[0].StudentContact;
                                    if ($scope.UpdatedContactDetail.toString().length == 10) {
                                        $scope.isStudentContact = false;
                                        $scope.StundetContactbuttonDesable = true;
                                    }
                                }
                                else {
                                    $scope.UpdatedContactDetail = 0
                                }
                                if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 1) {
                                    //feepayingpins = $scope.userJsonData.Table[0].Pin;
                                    for (let i = 0; i < $scope.userJsonData.Table.length; i++) {
                                        feepayingpins += $scope.userJsonData.Table[i].Pin + ",";
                                    }
                                }
                                else if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 2) {
                                    feepayingpins = $scope.userJsonData.Table[0].Pin + ",";
                                }

                                feepayingpins = feepayingpins.substring(0, feepayingpins.length - 1);
                                $scope.feepayingpins = feepayingpins;

                                $scope.challan = $scope.userJsonData.Table[0].ChalanaNumber;
                                $scope.AmountDB = $scope.userJsonData.Table1[0].TotalAmount;
                                $scope.FinalAmountDB = $scope.userJsonData.Table1[0].TotalAmount;
                                if ($scope.userJsonData.Table.length > 0) {
                                    $scope.modalInstance = $uibModal.open({
                                        templateUrl: "/app/views/DiplomaFeePaymentPopup.html",
                                        size: 'xlg',
                                        scope: $scope,
                                        windowClass: 'modal-fit-att',
                                    });
                                }
                                else {
                                    $scope.noPaymentelected = false;
                                }
                            }
                            else if ($scope.userJsonData.Table[0].ResponceCode !== undefined) {
                                alert($scope.userJsonData.Table[0].Message);
                            }
                        }
                    }
                    else if ($scope.Student.id == 2) {
                        if ($scope.userJsonData.Table1[0].ChalanaNumber !== undefined) {
                            var feepayingpins = "";
                            var Sems = "";
                            $scope.StudentVerData = $scope.userJsonData.Table1;
                            if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 2) {
                                for (var i = 0; i < $scope.userJsonData.Table.length; i++) {
                                    Sems += $scope.userJsonData.Table[i].Semester + ",";
                                }
                                Sems = Sems.substring(0, Sems.length - 1);
                                $scope.Sems = Sems;
                            }


                            if ($scope.userJsonData.Table1[0].StudentContact != null && $scope.userJsonData.Table1[0].StudentContact != "") {
                                $scope.UpdatedContactDetail = $scope.userJsonData.Table1[0].StudentContact;
                                if ($scope.UpdatedContactDetail.toString().length == 10) {
                                    $scope.isStudentContact = false;
                                    $scope.StundetContactbuttonDesable = true;
                                }
                            }
                            else {
                                $scope.UpdatedContactDetail = 0
                            }
                            if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 1) {
                                //feepayingpins = $scope.userJsonData.Table[0].Pin;
                                for (let i = 0; i < $scope.userJsonData.Table.length; i++) {
                                    feepayingpins += $scope.userJsonData.Table[i].Pin + ",";
                                }
                            }
                            else if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 2) {
                                feepayingpins = $scope.userJsonData.Table[0].Pin + ",";
                            }

                            feepayingpins = feepayingpins.substring(0, feepayingpins.length - 1);
                            $scope.feepayingpins = feepayingpins;

                            $scope.challan = $scope.userJsonData.Table1[0].ChalanaNumber;
                            $scope.AmountDB = $scope.userJsonData.Table2[0].TotalAmount;
                            $scope.UpdatedContactDetail = $scope.userJsonData.Table1[0].StudentContact
                            $scope.FinalAmountDB = $scope.userJsonData.Table2[0].TotalAmount;
                            if ($scope.userJsonData.Table.length > 0) {
                                $scope.modalInstance = $uibModal.open({
                                    templateUrl: "/app/views/DiplomaFeePaymentPopup.html",
                                    size: 'xlg',
                                    scope: $scope,
                                    windowClass: 'modal-fit-att',
                                });
                            }
                            else {
                                $scope.noPaymentelected = false;
                            }
                        }
                        else if ($scope.userJsonData.Table[0].ResponceCode !== undefined) {
                            alert($scope.userJsonData.Table[0].Message);
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




            //backdrop: 'static',

            //});
            //else
            //    alert("Select any student to pay");
        }


        $scope.UpdateStudentContact = function (num) {

            if (num.toString().length == 10) {
                var UpdatedNumber = PreExaminationService.UpdateStudentsContact($scope.feepayingpins, num);
                UpdatedNumber.then(function (res) {
                    if (res[0].Response == '200') {
                        alert(res[0].Message);
                        $scope.UpdatedContactDetail = num;
                        $scope.isStudentContact = false;
                    } else {
                        alert(res[0].Message);
                    }

                }, function (err) {
                });
            }
        };


        $scope.StundetContactbuttonDesable = false;

        $scope.changeNumber = function (num) {
            if (num.toString().length == 10) {
                $scope.StundetContactbuttonDesable = true;
                $scope.isStudentContact = true;
            }
            else {
                $scope.StundetContactbuttonDesable = false;
                $scope.isStudentContact = false;
            }
        };

    });
});