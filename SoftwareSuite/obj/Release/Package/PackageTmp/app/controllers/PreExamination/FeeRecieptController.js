define(['app'], function (app) {
    app.controller("FeeRecieptController", function ($scope, $http, $localStorage, $state, $stateParams, $interval, AppSettings, PreExaminationService, PaymentService) {

        $scope.ChallanData = false;
        var getDatagetCertificates = PreExaminationService.GetCertificateTypes()
        getDatagetCertificates.then(function (resp) {

            try {
                var res = JSON.parse(resp);

            } catch (err) { }


            //console.log(response)
            $scope.CertificateTypes = resp.Table;
            var data = {
                ChallanPrefix: "GC",
                Id: 8,
                Is_Active: true,
                Name: "Genuineness Certificate",
                Price: ""
            }
            $scope.CertificateTypes.push(data);
            var data1 = {
                ChallanPrefix: "",
                Id: 9,
                Is_Active: true,
                Name: "2 Years Certificate",
                Price: ""
            }
            $scope.CertificateTypes.push(data1);
            var data2 = {
                ChallanPrefix: "",
                Id: 10,
                Is_Active: true,
                Name: "3 Backlog Exemption",
                Price: ""
            }
            $scope.CertificateTypes.push(data2)
            //$scope.CertificateTypes.splice(7, 1);                       
            $scope.Service = false;
        }, function (error) {
            $scope.NoDataFound = true;
            $scope.result = false;
        })


        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        $scope.Sems = "";
        $scope.feepayingpins = "";
        $scope.noteChallan = false;
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
                var data = { id: 999, type: "Promotional" };
                $scope.StudentType.push(data);
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });

        var loadHallticket = PreExaminationService.GetExamMonthYearForHallticketandFeepayment(1, 1);
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

        $scope.changeVal = function () {
            $scope.paymentResponseFound = false;
            $scope.ChallanData = false;
        }

        $scope.ChangeData = function () {
            $scope.paymentResponseFound = false;
            $scope.ChallanData = false;
        }

        $scope.changedVal = function () {
            $scope.paymentResponseFound = false;
            $scope.ChallanData = false;
            if ($scope.Student.id == null || $scope.Student.id == '' || $scope.Student.id == undefined) {
                $scope.Student.id = 1
            }
            var loadHallticket = PreExaminationService.GetExamMonthYearForHallticketandFeepayment(1, $scope.Student.id);
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
        }

        $scope.ExamTypes = [{ "Id": "1", "ExamType": "Examination" },
        { "Id": "2", "ExamType": "Student Services" }]

        $scope.GetChallanNumbers = function () {
            $scope.LoadImg = true;
            if ($scope.ExamType == 1) {
                var ServiceType = $scope.Student.id
            } else if ($scope.ExamType == 2) {
                var ServiceType = $scope.CertificateType
            }

            var loadHallticket = PreExaminationService.GetChallanNumbers($scope.ExamType, ServiceType, $scope.ExamMonthYear, $scope.pinNumber);
            loadHallticket.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table.length > 0) {
                    $scope.LoadImg = false;
                    $scope.ChallanData = true;
                    $scope.ChallanNumbers = [];
                    $scope.ChallanNumbers = response.Table;
                } else {
                    $scope.ChallanNumbers = [];
                    $scope.LoadImg = false;
                    $scope.ChallanData = false;
                    alert("No Challan Numbers found on this Record");
                }
            },
                function (error) {
                    $scope.LoadImg = false;
                    $scope.ChallanData = false;
                    alert("error while loading Challan Numbers");
                    console.log(error);
                });
        }

        $scope.calls2s = function () {
            $scope.date = "";
            $scope.transactionno = "";
            $scope.subscriberid = "";
            $scope.amount = "";
            $scope.Status = "";
            $scope.Paymentmode = "";
            $scope.Sem = "";
            $scope.ExamMonthYearr = "";
            //if (detail.Refno != null && detail.Refno != undefined && detail.Refno != "" && $scope.Detailsfound == false) {
            $scope.LoadImg = true;
            var s2sresponsedata = PaymentService.GetFeeReciept($scope.refno);
            s2sresponsedata.then(function (res) {
                //console.log(resp)
                //var res = JSON.parse(resp)
                //console.log(res)
                var pins = "";
                if (res.Table.length > 0) {

                    $scope.LoadImg = false;
                    for (let i = 0; i < res.Table1.length; i++) {
                        pins += res.Table1[i].pin + ",";
                    }
                } else {

                    $scope.LoadImg = false;
                    $scope.LoadpaymentImg = false;
                    $scope.success = false;
                    $scope.paymentResponseFound = true;
                    $scope.Status = "No Data Found with given Challan Number";
                    return;
                }

                if (res.Table1.length > 0) {
                    $scope.LoadImg = false;
                    for (let i = 0; i < res.Table1.length; i++) {
                        pins += res.Table1[i].pin + ",";
                    }
                }

                pins = pins.substring(0, pins.length - 1);
                $scope.pins = pins;
                if (res.Table.length > 0) {
                    $scope.LoadImg = false;
                    $scope.Paymentmode = res.Table[0].addtninfo6;
                    if (res.Table[0].addtninfo4 != 'NA') {
                        $scope.Sem = res.Table[0].addtninfo4;
                    }
                    if (res.Table[0].addtninfo7 != 'NA' || res.Table[0].addtninfo7 != null || res.Table[0].addtninfo7 != undefined || res.Table[0].addtninfo7 != '') {
                        $scope.ExamMonthYearr = res.Table[0].addtninfo7;
                    }
                    $scope.date = res.Table[0].txndate;
                    $scope.transactionno = res.Table[0].bankrefno;
                    $scope.subscriberid = res.Table[0].subscriberid;
                    $scope.amount = (res.Table[0].txnamt * 1).toString();
                    $scope.LoadpaymentImg = false;
                    $scope.Detailsfound = true;
                    $scope.paymentResponseFound = true;
                    $scope.Status = res.Table[0].errordesc;
                    var desc = res.Table[0].errordesc;
                    if (res.Table[0].authstatus == '0300') {
                        $scope.LoadImg = false;
                        $scope.success = true;
                        $scope.pins = pins;
                        $scope.Status = "Success Transaction";
                        //sending sms using challan number to SendSms controller
                        PaymentService.callSms($scope.refno);
                        //$scope.cancel();
                        return;
                    } else if (res.Table[0].authstatus == '0999') {
                        $scope.LoadImg = false;
                        $scope.success = false;
                        $scope.pins = pins;
                        if (res.Table[0].Status) {
                            $scope.Status = res.Table[0].Status;
                        } else {
                            $scope.Status = res.Table[0].errordesc;
                        }
                        //sending sms using challan number to SendSms controller
                        //PaymentService.callSms($scope.refno);
                        //$scope.cancel();
                        return;
                    }
                    else {
                        $scope.LoadImg = false;
                        $scope.Status = "Transaction Failed";
                        if (desc.includes('-')) {
                            for (var i = 0; i < desc.length; i++)
                                if (desc.charAt(i) == '-') {
                                    specialchar = i;
                                    break;
                                }
                            desc = desc.substring(specialchar + 1, desc.length);
                        }

                        $scope.Status = desc;
                        $scope.LoadpaymentImg = false;
                        $scope.pins = pins;
                        $scope.success = false;
                        //$scope.cancel();
                        return;
                    }

                } else {
                    $scope.LoadImg = false;
                    $scope.LoadpaymentImg = false;
                    $scope.success = false;
                    $scope.paymentResponseFound = true;
                    $scope.Status = "If amount is deducted from your bank it is will be refunded with in 7 working days. PLEASE PAY THE FEE AGAIN TO GENERATE HT WITH IN DUE DATES";
                    //$scope.cancel();

                }
            }, function (error) {
                $scope.LoadImg = false;
                $scope.LoadpaymentImg = false;
                $scope.success = false;
                $scope.paymentResponseFound = true;
                $scope.Status = "If amount is deducted from your bank it is will be refunded with in 7 working days. PLEASE PAY THE FEE AGAIN TO GENERATE HT WITH IN DUE DATES";
                //$scope.cancel();
            });




        }


        $scope.GetFeeReciept = function () {
            $scope.date = "";
            $scope.transactionno = "";
            $scope.subscriberid = "";
            $scope.amount = "";
            $scope.Status = "";
            $scope.Paymentmode = "";
            $scope.Sem = "";
            $scope.ExamMonthYearr = "";
            //if (detail.Refno != null && detail.Refno != undefined && detail.Refno != "" && $scope.Detailsfound == false) {
            $scope.LoadImg = true;
            var s2sresponsedata = PaymentService.GetFeeReciept($scope.ChallanNumber);
            s2sresponsedata.then(function (res) {
                //var res = JSON.parse(resp)
                var pins = "";
                if (res.Table.length > 0) {

                } else {

                    $scope.LoadImg = false;
                    $scope.LoadpaymentImg = false;
                    $scope.success = false;
                    $scope.paymentResponseFound = true;
                    $scope.Status = "No Data Found with given Challan Number";
                    return;
                }

                if (res.Table1.length > 0) {
                    $scope.LoadImg = false;
                    for (let i = 0; i < res.Table1.length; i++) {
                        pins += res.Table1[i].pin + ",";
                    }
                }

                pins = pins.substring(0, pins.length - 1);
                $scope.pins = pins;
                if (res.Table.length > 0) {
                    $scope.LoadImg = false;
                    $scope.Paymentmode = res.Table[0].addtninfo6;
                    if (res.Table[0].addtninfo4 != 'NA') {
                        $scope.Sem = res.Table[0].addtninfo4;
                    }
                    if (res.Table[0].addtninfo7 != 'NA' || res.Table[0].addtninfo7 != null || res.Table[0].addtninfo7 != undefined || res.Table[0].addtninfo7 != '') {
                        $scope.ExamMonthYearr = res.Table[0].addtninfo7;
                    }
                    $scope.date = res.Table[0].txndate;
                    $scope.transactionno = res.Table[0].bankrefno;
                    $scope.subscriberid = res.Table[0].subscriberid;
                    $scope.amount = (res.Table[0].txnamt * 1).toString();
                    $scope.LoadpaymentImg = false;
                    $scope.Detailsfound = true;
                    $scope.paymentResponseFound = true;
                    $scope.Status = res.Table[0].errordesc;
                    var desc = res.Table[0].errordesc;
                    if (res.Table[0].authstatus == '0300') {
                        $scope.LoadImg = false;
                        $scope.success = true;
                        $scope.pins = pins;
                        $scope.Status = "Success Transaction";
                        //sending sms using challan number to SendSms controller
                        //PaymentService.callSms($scope.refno);
                        //$scope.cancel();
                        return;
                    } else if (res.Table[0].authstatus == '0999') {
                        $scope.LoadImg = false;
                        $scope.success = false;
                        $scope.pins = pins;
                        if (res.Table[0].Status) {
                            $scope.Status = res.Table[0].Status;
                        } else {
                            $scope.Status = res.Table[0].errordesc;
                        }
                        //sending sms using challan number to SendSms controller
                        //PaymentService.callSms($scope.refno);
                        //$scope.cancel();
                        return;
                    }
                    else {
                        $scope.LoadImg = false;
                        $scope.Status = "Transaction Failed";
                        if (desc.includes('-')) {
                            for (var i = 0; i < desc.length; i++)
                                if (desc.charAt(i) == '-') {
                                    specialchar = i;
                                    break;
                                }
                            desc = desc.substring(specialchar + 1, desc.length);
                        }

                        $scope.Status = desc;
                        $scope.LoadpaymentImg = false;
                        $scope.pins = pins;
                        $scope.success = false;
                        //$scope.cancel();
                        return;
                    }

                } else {
                    $scope.LoadImg = false;
                    $scope.LoadpaymentImg = false;
                    $scope.success = false;
                    $scope.paymentResponseFound = true;
                    $scope.Status = "If amount is deducted from your bank it is will be refunded with in 7 working days. PLEASE PAY THE FEE AGAIN TO GENERATE HT WITH IN DUE DATES";
                    //$scope.cancel();

                }
            }, function (error) {
                $scope.LoadImg = false;
                $scope.LoadpaymentImg = false;
                $scope.success = false;
                $scope.paymentResponseFound = true;
                $scope.Status = "If amount is deducted from your bank it is will be refunded with in 7 working days. PLEASE PAY THE FEE AGAIN TO GENERATE HT WITH IN DUE DATES";
                //$scope.cancel();
            });




        }

        $scope.printMarksEntered = function () {

            var divName = "idtoDivPrint";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "table";



            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;

            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if ($printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";


                document.body.appendChild($printSection);

                var $ele1 = document.createElement("div");
                $ele1.className = "row";

                var $ele2 = document.createElement("div");
                $ele2.className = "col-lg-2 col-md-12";

                var $ele3 = document.createElement("div");
                $ele3.className = "col-lg-10 col-md-12";


                $ele1.appendChild($ele3);

                $printSection.appendChild($ele1);

                $printSection.appendChild($ele1);
                $printSection.appendChild($markstable);

            }

            window.print();


        };

        //$scope.ExamTypes = [{ "Id": "1", "ExamType": "Fee Payment" },
        //    { "Id": "1", "ExamType": "Student Services" }]

        //$scope.ExamTypes = [{ "Id": "1", "ExamType": "Fee Payment" },
        //{ "Id": "1", "ExamType": "Student Services" }]
    })
})