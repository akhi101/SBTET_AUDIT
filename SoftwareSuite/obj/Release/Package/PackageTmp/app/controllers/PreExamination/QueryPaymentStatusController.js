define(['app'], function (app) {
    app.controller("QueryPaymentStatusController", function ($scope, $http, $localStorage, $state, PreExaminationService, MarksEntryService, $uibModal) {

        var authData = $localStorage.authorizationData;
        SystemUserTypeId = authData.SystemUserTypeId;
        $scope.challanNumber;
        $scope.LoadImg = false;
        $scope.paymentResponseFound = false;
        $scope.showData = false;
        $scope.success = false;
        $scope.dataInform = false;
        $scope.Student = {};
        if (SystemUserTypeId == 1) {
            $scope.showData = true;
        }
        $scope.SystemUserTypeId = SystemUserTypeId;


        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });

        $scope.changedVal = function (studentId) {
            $scope.Student.id = studentId;
            $scope.dataInform = false;
        }

        $scope.checkChallanNumber = function (challanNumber) {
            $scope.challanNumber = challanNumber;
            $scope.LoadImg = true;
            if ($scope.challanNumber != "") {
                console.log($scope.challanNumber);

                var getPaymentStatus = PreExaminationService.getPaymentStatus($scope.challanNumber);
                getPaymentStatus.then(function (detail) {


                    $scope.LoadImg = false;
                    $scope.paymentResponseFound = false;
                        detail = JSON.parse(detail);
                        
                        if (detail[0] == undefined || detail[0].ReponceCode == undefined) {

                            $scope.Paymentmode = detail.addinfo2;
                            if (detail.statusdesc.includes('-')) {
                                for (var i = 0; i < detail.statusdesc.length; i++)
                                    if (detail.statusdesc.charAt(i) == '-') {
                                        specialchar = i;
                                        break;
                                    }
                                detail.statusdesc = detail.statusdesc.substring(specialchar + 1, detail.statusdesc.length);
                            }

                            $scope.transactionno = detail.txnrefno;
                            $scope.dataInform = true;
                            if ($scope.transactionno == 'NA') {
                                $scope.paymentResponseFound = true;
                                $scope.dataInform = false;
                            }

                            $scope.refno = detail.Refno;
                            $scope.collegecode = detail.addinfo1;
                            $scope.branch = detail.addinfo3;
                            $scope.sem = detail.addinfo5;
                            $scope.scheme = detail.addinfo4;
                            $scope.exam = detail.addinfo2;
                            $scope.date = detail.date;

                            detail.amount = (detail.amount * 1).toString();
                            $scope.amount = detail.amount;


                            var specialchar = 0;
                            if (detail.statusdesc.includes('-')) {
                                for (var i = 0; i < detail.statusdesc.length; i++)
                                    if (detail.statusdesc.charAt(i) == '-') {
                                        specialchar = i;
                                        break;
                                    }
                                detail.statusdesc = detail.statusdesc.substring(specialchar + 1, detail.statusdesc.length);
                            }
                            $scope.Status = detail.statusdesc;

                            if ($scope.Status == 'Success Transaction') {
                                $scope.success = true;
                            } else {
                                $scope.success = false;
                            }

                            $scope.pins = detail.pins;
                        }
                        else if (detail[0].ReponceCode == '400') {
                            $scope.dataInform = true;
                            $scope.success = false;

                            $scope.amount = undefined;
                            $scope.Status = detail[0].ReponceDescription;
                            $scope.transactionno = undefined;
                            $scope.pins = undefined;
                            $scope.refno = undefined;
                            $scope.collegecode = undefined;
                            $scope.branch = undefined;
                            $scope.sem = undefined;
                            $scope.scheme = undefined;
                            $scope.exam = undefined;
                            $scope.date = undefined;
                            detail.statusdesc = detail[0].ReponceDescription;
                        }


                    }, function (error) {
                        $scope.LoadImg = false;
                    });
                }
            else {
                alert("Enter Challan Number");
                $scope.LoadImg = true;
                $scope.paymentResponseFound = true;
            }
        }


        $scope.printMarksEntered = function () {

            var divName = "idtoDivPrint";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "table";



            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;

            //var domClone = divToPrint.cloneNode(true);
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
    });
});