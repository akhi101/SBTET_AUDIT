define(['app'], function (app) {
    app.controller("TcApplicationFormController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, AcademicService) {
        $scope.Datatable = false;
        $scope.Table = false;
        $scope.Result = false;
        $scope.OTP = false;
        $scope.IsDisabled =true;
        $scope.myCheckBox = false;
        $scope.Tables = false;
       

     
        $scope.getDetails = function () {
            //if (!$scope.studentPin) {
            //    alert("pls enter PIn Number")
               
            //}
         


                var GetStudentData = SystemUserService.GetStudentData($scope.studentPin);
                GetStudentData.then(function (response) {
                    if (response.Table.length > 0) {
                      
                        
                            $scope.Datatable = true;
                            $scope.Table = true;
                            $scope.Result = true;
                            $scope.OTP = true;

                            $scope.StudentDetails = response.Table[0];
                            console.log($scope.StudentDetails);
                    }
                    else {
                        alert("Enter valid Pin Number")
                    }
                    
                   
                },


                    function (error) {
                        alert("something went wrong")

                    })
          
            
            
        }

        var GetCertificate = SystemUserService.GetCertificate()
        GetCertificate.then(function (response) {
      
            $scope.CertificateNames = response.Table;
          
        },

            function (error) {
                alert("something went wrong")

            })

        $scope.SendOtp = function () {
            $scope.Tables = true;
            var Pin = $scope.studentPin;

            var sendOtp = AcademicService.sendOtp(Pin);
            sendOtp.then(function (response) {
                //var data = JSON.parse(response);
                //if (data.status == '200') {
                //    alert(data.description);
                //} else {
                //    alert(data.description);
                //}
            },
            function (error) {
                alert("something Went wrong")
            });

          
        }
        $scope.EnableDisable = function () {
        
            $scope.IsDisabled = $scope.studentPin.length == '0';
        }
        


    });
});
    