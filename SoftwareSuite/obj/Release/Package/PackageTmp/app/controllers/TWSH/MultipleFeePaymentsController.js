define(['app'], function (app) {
    app.controller("MultipleFeePaymentsController", function ($scope, $state, TwshStudentRegService, $localStorage) {


      //  $state.go('TWSH.MultipleFeePayments.PaymentProcess')

        var authData = $localStorage.Twsh;
       
        $scope.userId = authData.UserId;
        var GetInstituteReports = TwshStudentRegService.getInstituteReports($scope.userId);
        GetInstituteReports.then(function (response) {
          
            $scope.InstituteReports = response;
        },
            function (error) {
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.StatusMessage = "No Data Found";
                $timeout(function () {
                    $scope.showStatus = false;
                  
                }, 5000);

            });

        $scope.openNotPaid = function (gradeId, DataType) {
          
            $localStorage.gradeDetails = {
                userId: $scope.userId,
                gradeId: gradeId,            
                DataType: DataType
            }         
            $state.go('TWSH.PaymentProcess')
        }

        $scope.feePaid = function () {
          
            $scope.showStatus = true;
            $scope.statusclass = 'alert-success';
            $scope.StatusMessage = "No Pending Fee Payments";
            $timeout(function () {
                $scope.showStatus = false;
             
            }, 5000);
        }
    })
})