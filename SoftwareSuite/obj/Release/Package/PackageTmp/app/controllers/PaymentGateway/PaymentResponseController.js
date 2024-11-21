define(['app'], function (app) {
    app.controller("PaymentResponseController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $interval, PaymentService) {

        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        $scope.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        $scope.BranchId = authData.BranchId;
        $scope.CollegeID = authData.CollegeID;
        $scope.userType = authData.SystemUserTypeId;


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

                        $scope.LoadpaymentImg = false;
                        $scope.Detailsfound = true;


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


                }

            }


            var promise = $interval(calls2s, 5000, 12);      //  $interval(function, interval, count);
            $scope.cancel = function () {
                $interval.cancel(promise);
            };
        }



        $scope.back = function () {
            var redir = $localStorage.assessment.redirecturl == "" || $localStorage.assessment.redirecturl == "" ? "" : $localStorage.assessment.redirecturl;
            //window.location.replace(redir);
            $state.go(redir);
        }
        $scope.printMarksEntered = function () {

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
                //var $ele1 = document.createElement("div");
                //$ele1.className = "sbtet_img";             
                // var divToPrintheads = bl.getElementById("divtitle");
                //var divToPrintheaded = al.getElementById("divtop");
                //var divToPrinthead = el.getElementById("divtoadd");
                // $markstable.appendChild(divToPrintheads);
                //$markstable.appendChild(divToPrintheaded);
                //$markstable.appendChild(divToPrinthead);


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