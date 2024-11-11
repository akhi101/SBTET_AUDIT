define(['app'], function (app) {
    app.controller("PaymentGatewayResponseController", function ($scope, $http, $localStorage, $state, $stateParams, $interval, AppSettings, PaymentService, PreExaminationService) {
        $scope.success = false;
        $scope.LoadpaymentImg = true;
        $scope.Detailsfound = false;
        $scope.paymentResponseFound = false;
        var paymentdetails = $stateParams.data;
        var detail = JSON.parse(atob(paymentdetails));
        $scope.transactionno = detail.bankrefno;
        $scope.refno = detail.Refno;
        if ($scope.Detailsfound == false) {      


           
           var calls2s = function () {                   
            if (detail.Refno != null && detail.Refno != undefined && detail.Refno != "" && $scope.Detailsfound == false) {
              
                    var s2sresponsedata = PaymentService.billDeskS2SResponse($scope.refno);
                    s2sresponsedata.then(function (res) {

                        var pins = "";
                        if (res.Table1.length > 0) {
                            for (let i = 0; i < res.Table1.length; i++) {
                                pins += res.Table1[i].pin+",";
                            }
                        }

                        pins = pins.substring(0, pins.length - 1);
                        $scope.pins = pins;
                        if (res.Table.length > 0) {
                            $scope.Paymentmode = res.Table[0].addtninfo6;
                            if (res.Table[0].addtninfo4 != 'NA') {
                                $scope.Sem = res.Table[0].addtninfo4;
                            }

                            $scope.date = res.Table[0].txndate;
                            $scope.transactionno = res.Table[0].bankrefno;
                            $scope.amount = (res.Table[0].txnamt * 1).toString();
                            $scope.LoadpaymentImg = false;
                            $scope.Detailsfound = true;
                            $scope.paymentResponseFound = true;
                            $scope.Status = res.Table[0].errordesc;
                            var desc = res.Table[0].errordesc;
                            if (res.Table[0].authstatus == '0300') {
                                $scope.success = true;
                                $scope.pins = pins;
                                $scope.Status = res.Table[0].errordesc;
                                //sending sms using challan number to SendSms controller
                                PaymentService.callSms($scope.refno);
                                $scope.cancel();
                                return;
                            } else if (res.Table[0].authstatus == '0999') {
                                $scope.LoadImg = false;
                                $scope.success = false;
                                $scope.pins = pins;
                                $scope.Status = res.Table[0].errordesc;
                                //sending sms using challan number to SendSms controller
                                //PaymentService.callSms($scope.refno);
                                //$scope.cancel();
                                return;
                            } else {
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
                                $scope.cancel();
                                return;
                            }                           

                        } else {
                            $scope.LoadpaymentImg = false;
                            $scope.success = false;
                            $scope.paymentResponseFound = true;
                            $scope.Status = "If amount is deducted from your bank it is will be refunded with in 7 working days. PLEASE PAY THE FEE AGAIN TO GENERATE HT WITH IN DUE DATES";
                            $scope.cancel();

                        }
                    }, function (error) {
                            $scope.LoadpaymentImg = false;
                            $scope.success = false;
                            $scope.paymentResponseFound = true;
                            $scope.Status = "If amount is deducted from your bank it is will be refunded with in 7 working days. PLEASE PAY THE FEE AGAIN TO GENERATE HT WITH IN DUE DATES";
                            $scope.cancel();
                    });                              
                   

              

                // checking that of the s2s is done or not else call query api
                //if ($scope.Detailsfound == false) {
                //    $scope.LoadpaymentImg = true;
                //    $scope.paymentResponseFound = false;
                //    var getPaymentStatus = PreExaminationService.getPaymentStatus($scope.refno);

                //    getPaymentStatus.then(function (data) {

                //        $scope.LoadpaymentImg = false;
                //        $scope.Detailsfound = true;
                //        $scope.paymentResponseFound = true;
                //        data = JSON.parse(data);
                //        $scope.date = data.date;
                //        data.amount = (data.amount * 1).toString();
                //        $scope.amount = data.amount;
                //        var specialchar = 0;
                //        $scope.Paymentmode = data.addinfo2;
                //        if (data.statusdesc.includes('-')) {
                //            for (var i = 0; i < data.statusdesc.length; i++)
                //                if (data.statusdesc.charAt(i) == '-') {
                //                    specialchar = i;
                //                    break;
                //                }
                //            data.statusdesc = data.statusdesc.substring(specialchar + 1, data.statusdesc.length);
                //        }
                //        $scope.Status = data.statusdesc;
                //        //$scope.pins = data.pins;
                //        $scope.transactionno = data.bankrefno;
                //        if ($scope.Status == 'Success Transaction') {
                //            $scope.success = true;
                //            //sending sms using challan number to SendSms controller
                //            PaymentService.callSms($scope.refno);
                //            return;
                //        } else {
                //            $scope.success = false;
                //        }
                //    }, function (error) {
                //        $scope.success = false;
                //        $scope.Status = "If amount is deducted from your bank it is will be refunded with in 7 working days. PLEASE PAY THE FEE AGAIN TO GENERATE HT WITH IN DUE DATES";

                //    });

                //}



            }
                           
            }


            var promise = $interval(calls2s, 5000, 12);      //  $interval(function, interval, count);
            $scope.cancel = function () {
                $interval.cancel(promise);
            };
        }
        //else {

        //    $scope.LoadpaymentImg = false;
        //    $scope.paymentResponseFound = false;
        //    $scope.success = false;
        //    $scope.Status = "If amount is deducted from your bank it is will be refunded with in 7 working days. PLEASE PAY THE FEE AGAIN TO GENERATE HT WITH IN DUE DATES";

        //}   




        $scope.back = function () {
            if ($localStorage.PaymentGatewayResponse.redirecturl != null && $localStorage.PaymentGatewayResponse.redirecturl != undefined) {
                $state.go($localStorage.PaymentGatewayResponse.redirecturl);

            } else {
                $state.go('Dashboard.PreExamination');

            }


        };
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
    });
});