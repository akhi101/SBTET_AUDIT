define(['app'], function (app) {
    app.controller("TwshPaymentResponseController", function ($scope, $http, $localStorage, $interval, $state, $stateParams, AppSettings, PaymentService) {
        $scope.printHead = false;


        var paymentdetails = $stateParams.data;
        var detail = JSON.parse(atob(paymentdetails));
        $scope.transactionno = detail.txnrefno;
        $scope.name = detail.addinfo1;
        $scope.appno = detail.addinfo3;
        $scope.grade = detail.addinfo4;
        $scope.ExamMode = detail.addinfo5;
        if ($scope.ExamMode == 1) {
            $scope.ExamModename = 'Computer Based Test (CBT)';
        } else if ($scope.ExamMode == 2) {
            $scope.ExamModename = 'Type Machine Based Test (TMBT)';
        }
       
       // $scope.amount = detail.amount;
       // $scope.Status = detail.statusdesc;


        $scope.success = false;
        $scope.LoadpaymentImg = true;
        $scope.Detailsfound = false;
        $scope.paymentResponseFound = false;
       
        $scope.transactionno = detail.bankrefno;
        $scope.refno = detail.Refno;





        if ($scope.Detailsfound == false) {



            var calls2s = function () {
                if (detail.Refno != null && detail.Refno != undefined && detail.Refno != "" && $scope.Detailsfound == false) {

                    var s2sresponsedata = PaymentService.billDeskS2SResponse($scope.refno);
                    s2sresponsedata.then(function (res) {

                        $scope.LoadpaymentImg = false;
                        $scope.Detailsfound = true;


                        if (res.Table.length > 0) {
                            
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

                                $scope.Status = "Success Transaction";
                                //sending sms using challan number to SendSms controller
                                //PaymentService.callSms($scope.refno);
                                $scope.cancel();
                                return;
                            } else {
                                $scope.Status = "Transaction Failed";
                               
                                $scope.LoadpaymentImg = false;
                               
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


                }

            }


            var promise = $interval(calls2s, 5000, 12);      //  $interval(function, interval, count);
            $scope.cancel = function () {
                $interval.cancel(promise);
            };
        }



        $scope.back = function () {
            
            //var redir = $localStorage.redirecturl == undefined || $localStorage.redirecturl == null ? "TWSH.OnlineApplication" : $localStorage.redirecturl;
            $scope.BackButton = true;
            $state.go('TWSH.TwshReports');
            $scope.BackButton = false;
           
        }

        $scope.printMarksEntered = function () {
            $scope.printHead = true;
            var divName = "idtoDivPrint";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "table";
            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;
            //    $("#markslist").hide();
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


        }
    })
})