define(['app'], function (app) {
    app.controller("EnableFeepaymentController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, PreExaminationService) {
        var authdata = $localStorage.authorizationData;
        $scope.UserId = authdata.SysUserID;
        $scope.Fee = 0;
        $scope.LateFee = 0;
        $scope.TatkalFee = 0;
        $scope.PremiumTatkalFee = 0;
       
        var StudentTypes = PreExaminationService.getStudentType();
        StudentTypes.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
                // $scope.StudentType.push(response.Table[0]);
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
         function (error) {
             alert("error while loading Student Types");
             console.log(error);
         });

        var getSemesters = PreExaminationService.GetSemesters();
        getSemesters.then(function (res) {
            //var res = JSON.parse(res);
            $scope.GetSemesters = res.Table;
          
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });


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


        
        
        //var LoadExamTypeBysem = PreExaminationService.getFeeTypes();
        //LoadExamTypeBysem.then(function (response) {
        //    if (response.Table.l0ength > 0) {
        //        $scope.GetFeeTypes = response.Table;
                
        //    } else {
        //        $scope.StudentType = [];
        //        alert("No Student found on this Record");
        //    }
        //},
        // function (error) {
        //     alert("error while loading Student Types");
        //     console.log(error);
        // });


        
        $scope.ChangeExamMonthYear = function () {

            
            var getFees = PreExaminationService.getFeeTypes($scope.ExamMonthYear, $scope.StudentTypeId);
            getFees.then(function (response) {
                var response = JSON.parse(response);
                if (response.Table.length > 0) {
                    $scope.FeeTypes = response.Table;
                    // $scope.StudentType.push(response.Table[0]);
                } else {
                    $scope.FeeTypes = [];
                    alert("No Fees found on this Exam Month Year");
                }
            },
              function (error) {
                  alert("error while loading Data");
                  console.log(error);
              });
        }

        $scope.ChangeFee = function (data) {
            var data = JSON.parse(data)
            $scope.Amount = data.FeeAmount;
            $scope.FeeType = data.FeeType
        }

        $scope.Submit = function () {

            //$scope.Fee = 0;
            //$scope.LateFee = 0;
            //$scope.TatkalFee = 0;
            //$scope.PremiumTatkalFee = 0;
            if ($scope.Fee == 0 && $scope.LateFee == 0 && $scope.TatkalFee == 0 && $scope.PremiumTatkalFee == 0) {
                alert('Please Enter Fee or Late Fee or Tatkal Fee or Premium Tatkal Fee ')
                return
            }
            //if ($scope.FeeType == 'Fee') {
            //    var dataType = 1
            //} else if ($scope.FeeType == 'LateFee') {
            //    var dataType = 2
            //} else if ($scope.FeeType == 'TatkalFee') {
            //    var dataType = 3
            //}
            //ExamMonthYear, studenttypeid, ExamFee, LateFe, TatkalFee, PremiumTatkalFee
            if ($scope.StudentTypeId == 2) {
                var Semester = $scope.Semester
            } else {
                var Semester = 0
            }
            var SetFeePayment = PreExaminationService.EnableFeePayment($scope.ExamMonthYear, $scope.Pin, $scope.StudentTypeId, $scope.Fee, $scope.LateFee, $scope.TatkalFee, $scope.PremiumTatkalFee, Semester);
            SetFeePayment.then(function (res) {
                var response = JSON.parse(res)
                //console.log(response)
                if (response.Table[0].ResponseCode =='200') {
                    alert(response.Table[0].ResponseDescription)
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                }else {
                    //$scope.getExamMonthYears = [];
                    alert("Something Went Wrong");
                }
            },
             function (error) {
                 alert("error while loading Data");
                 console.log(error);
             });
        }
    })
})