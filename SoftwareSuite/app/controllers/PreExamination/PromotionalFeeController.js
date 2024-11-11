define(['app'], function (app) {
    app.controller("PromotionalFeeController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, PreExaminationService, PaymentService, MarksEntryService) {
        $scope.displayError = false;
        
        $scope.payNow = function () {
            $scope.ProceedGettChallanToPayfine()
          $scope.modalInstance = $uibModal.open({
              templateUrl: "/app/views/PromotionalFeePaymentPopup.html",
              size: 'xlg',
              scope: $scope,
              windowClass: 'modal-fit-att',
          });
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        var LoadExamTypeBysem = MarksEntryService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
                var data = { id: 999, type: "PromotionalFee" }
                $scope.StudentType.push(data);
                //   $scope.Student.id = response.Table[0].id
            } else {
                $scope.StudentType = [];
                //    alert("No Data Found");
            }
        },
        function (error) {
            alert("error while Data");
            console.log(error);
        });


        $scope.getStudentDetails = function () {
        
            var getData = PreExaminationService.getDataByPin($scope.StudentId,$scope.StudentPin);
            getData.then(function (res) {
                $scope.displayError = true;;
                console.log(res)
                if (res.Table) {
                    if (res.Table[0].ResponceCode == '200') {
                        $scope.getUserData = res.Table1[0];
                        $scope.result = true;
                    } else {
                        $scope.result = false;
                        $scope.DetainedDetailsFoundWithData = res.Table[0].ResponceDescription;
                        $scope.displayError = true;;
                    }
                } else {
                    $scope.result = false;
                    $scope.displayError = true;
                }
            },
                function (error) {
                    $scope.displayError = true;;
                    $scope.result = false;
                    alert("Error while loading Data");
                    console.log(error);
                });
        }

        $scope.Proceedtopayfine = function () {
            var College_Code = "admin";
            $scope.noteChallan = false;
            $scope.secondClick = false;
            var marchantid = "TSSBTET"; // test
            try {
                College_Code = authData.College_Code == null ? "admin" : authData.College_Code;
            } catch (err) {
            }
            var addInfo1 = College_Code;
            var addInfo3 = $scope.StudentPin;
            var addInfo4 = $scope.getUserData.CurrentSemester == null || $scope.getUserData.CurrentSemester == "" ? "NA" : $scope.getUserData.CurrentSemester;//previous sem;
            var addInfo5 = $scope.getUserData.Scheme == null || $scope.getUserData.Scheme == "" ? "NA" : $scope.getUserData.Scheme;//Scheme;
            var addInfo6 = "PROMOTIONAL"//PaymentType;
            var addInfo7 = "NA";
            var amount = $scope.AmountDB.toFixed(2) == null || $scope.AmountDB.toFixed(2) == "" ? $scope.studentTotalFee.toFixed(2) : $scope.AmountDB.toFixed(2);

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
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                console.log(err);
            });
        };
           
        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.ProceedGettChallanToPayfine = function () {
           
           // var ip = "";
            var getChallanData = PreExaminationService.getChallanData($scope.StudentId,$scope.StudentPin);
            getChallanData.then(function (res) {
             //   console.log(res)
                    if (res.Table[0].ResponceCode == '200') {
                        $scope.StudentVerData = res.Table1
                        $scope.challan = res.Table1[0].ChalanaNumber;
                        $scope.FinalAmountDB = res.Table1[0].Amount;
                        $scope.AmountDB = res.Table1[0].Amount;
                        $scope.DetailsFound = true;
                } else {
                        $scope.DetailsFound = false;
                        //  $scope.DetainedDetailsFoundWithData = res.Table[0].ResponceDescription
                    alert("Error while loading Data");
                    }
               
                
            },
                function (error) {

                    $scope.DetailsFound = false;
                    alert("Error while loading Data");
                    console.log(error);
                });
        }

    })
})

