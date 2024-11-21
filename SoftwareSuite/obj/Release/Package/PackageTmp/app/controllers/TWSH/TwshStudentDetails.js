define(['app'], function (app) {
    app.controller("TwshStudentDetailsController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
       
        $scope.data = [];
        $scope.dataFound = false;
        $scope.loading = false;
        $scope.Noresult = false;


        $scope.Submit = function () {           
            if ($scope.ApplicationNumber == null || $scope.ApplicationNumber == undefined || $scope.ApplicationNumber == "") {
                alert("Enter ApplicationNumber.");
                return;
            }
            $scope.dataFound = false;
            $scope.loading = true;
            $scope.Noresult = false;
            var getTwshStudentDetails = TwshStudentRegService.getTwshStudentDetails($scope.ApplicationNumber);
            getTwshStudentDetails.then(function (response) {
                try { var response = JSON.parse(response); }
                catch (err) {
                    $scope.data = [];
                    $scope.dataFound = false;
                    $scope.loading = false;
                    $scope.Noresult = true;
                }
               
                if (response.Table[0].ResponseCode == '200' && response.Table1.length >0 ) {                   
                    $scope.data = [];
                    $scope.data = response.Table1[0];
                    $scope.dataFound = true;
                    $scope.loading = false;
                    $scope.Noresult = false;
                } else if (response.Table[0].ResponseCode == '400' || response.Table1.length <= 0 ) {
                    alert('Data not found');
                    $scope.data = [];
                    $scope.dataFound = false;
                    $scope.loading = false;
                    $scope.Noresult = true;
                } else {
                    alert('Something Went Wrong');
                    $scope.data = [];
                    $scope.dataFound = false;
                    $scope.loading = false;
                    $scope.Noresult = true;
                }
            },
                function (error) {   
                    $scope.data = [];
            $scope.dataFound = false;
            $scope.loading = false;
            $scope.Noresult = true;
        });

        }

        $scope.SendSms = function () {
            if ($scope.data.ExamMode == 1 && $scope.data.SelectedOnlineExamDate != null && $scope.data.IsEligible && $scope.data.IsFeePaid) {

                var approveDetails = TwshStudentRegService.approveDetails($scope.data.Id, $scope.data.SelectedOnlineExamDate);
                approveDetails.then(function (response) {                   
                        alert('SMs sent');                     
                   
                },
                    function (error) {
                      
                    });
            } else {
                alert('Not eligible to send CBT Sms.')

            }





        }
    })
})