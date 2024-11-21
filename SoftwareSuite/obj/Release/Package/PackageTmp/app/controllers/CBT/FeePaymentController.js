define(['app'], function (app) {
    app.controller("FeePaymentController", function ($scope, $http, $localStorage, $state, TwshStudentRegService, PaymentService, AppSettings) {
        $scope.detailsfound = false;
        $scope.applicationNo = true;
        $scope.appno = AppSettings.applicationno;
        $scope.candidateName ="";
        $scope.gradeName="";
        $scope.ChallanNo ="";
        $scope.FathernameName ="";
        $scope.Applicationno ="";
        $scope.mobileno ="";
        $scope.Amount="";
        $scope.status="";
        $scope.feetype="";
        $scope.feetype="";
        if ($scope.appno) {
            //$scope.applicationNo = false;
            var getFeeDetails = TwshStudentRegService.GetFeeDetails($scope.appno);
            getFeeDetails.then(function (res) {
                if (res.length > 0) {
                    if (res[0].ResponceCode == "200") {
                        $scope.detailsfound = true;
                        $scope.applicationNo = false;
                        $scope.candidateName = res[0].StudentName;
                        $scope.candidategender = res[0].Gender;
                        $scope.ChallanNo = res[0].ChallanNo;
                        $scope.FathernameName = res[0].FatherName;
                        $scope.mobileno = res[0].StudentPhoneNumber;
                        $scope.Applicationno = res[0].ApplicationNumber;
                        $scope.ExamMode = res[0].ExamMode;
                        $scope.gradeName = res[0].GradeCode;
                        $scope.feetype = res[0].FeeType;
                        $scope.status= res[0].ResponceCode;
                        $scope.Amount = res[0].FeeAmount;
                    }else if(res[0].ResponceCode == "406"){
                        $scope.detailsfound = false;
                        alert("Payment already done for this Application number.");
                    } else if (res[0].ResponceCode == "404") {
                        $scope.detailsfound = false;
                        alert("No Data Found With This Application Number")
                    } else {
                        $scope.detailsfound = false;
                    }
                   
                } else {
                    alert("Application Details not found.");
                }
              
            }, function (err) {

            });
        }


        $scope.getPaymentDetails = function (ApplicationNo) {
            var getFeeDetails = TwshStudentRegService.GetFeeDetails(ApplicationNo);
            getFeeDetails.then(function (res) {
                if (res.length > 0) {
                    if (res[0].ResponceCode == "200") {
                        $scope.detailsfound = true;
                        $scope.applicationNo = false;
                        $scope.candidateName = res[0].StudentName;
                        $scope.ChallanNo = res[0].ChallanNo;
                        $scope.candidategender = res[0].Gender;
                        $scope.FathernameName = res[0].FatherName;
                        $scope.mobileno = res[0].StudentPhoneNumber;
                        $scope.Applicationno = res[0].ApplicationNumber;
                        $scope.ExamMode = res[0].ExamMode;
                        $scope.gradeName = res[0].GradeCode;
                        $scope.feetype = res[0].FeeType;
                        $scope.status = res[0].ResponceCode;
                        $scope.Amount = res[0].FeeAmount;
                    } else if (res[0].ResponceCode == "406") {
                        $scope.detailsfound = false;
                        $scope.feeresp = res[0].RespoceDescription;
                        alert("Payment already done for this Application number.");
                    } else if (res[0].ResponceCode == "404") {
                        $scope.detailsfound = false;
                        $scope.feeresp = res[0].RespoceDescription;
                        alert("No Data Found With This Application Number")
                    }else {
                        $scope.detailsfound = false;
                    }
                    
                } else {
                    alert("Application Details not found.");
                }              
            }, function (err) {

            });
        }
        $scope.cancel = function () {           
            $state.go("TWSH.OnlineApplication");
        }
        $scope.Payfee = function () {
            var marchantid = "TSSBTET"; // test
            var addInfo1 = $scope.candidateName;
            var addInfo3 = $scope.Applicationno;
            var addInfo4 = $scope.gradeName;
            var addInfo5 = $scope.ExamMode;
            var addInfo6 = "";
            var amount = $scope.Amount.toFixed(2);
            var addInfo7 = "";
            var subMarchantid = "TSTWSH"
            $localStorage.redirecturl = "";
            $localStorage.redirecturl = 'TWSH.OnlineApplication';
            var location = window.location.origin;
            if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
                location += "/API/"
            } else {
                location += "/"
            }
            var proceedfinePayment = PaymentService.getHashValue(location+"TwshPayment/BillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.ChallanNo, amount);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    if ($scope.status = "200") {
                       var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp
                       window.location.replace(req);

                    }else {
                        alert('Application details not found.');
                    }

                }
            }, function (err) {
                alert('Details not found');
                console.log(err);
            });
        }

    });
});