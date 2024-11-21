define(['app'], function (app) {
    app.controller("TwshChangePasswordController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
        var authData = $localStorage.Twsh;
        $scope.userId = authData.UserId;
        $scope.submit = function () {       
            var twshLogin = TwshStudentRegService.changeUserPassword($scope.userId, $scope.confirmPassword);
            twshLogin.then(function (response) {
                              
            },
            function (error) {
                var err = JSON.parse(error);
              
                alert(" failed, Server Error");
                // console.log(err.Message);
               
            });
        }



        $scope.comparePassword = function () {
         
            if ($scope.newPassword === $scope.confirmPassword) {
               
                $scope.submitBtn = false;
                $scope.passwordError = '';
            } else {
               
                $scope.submitBtn = true;
                $scope.passwordError = 'New password and confirmpassword not matched';
            }
        }

        $scope.checkOldPassword = function () {
            var validatePassword = TwshStudentRegService.validateOldPassword($scope.userId);
            validatePassword.then(function (response) {
                $scope.userPassword = response[0].UserPassword;
                if ($scope.userPassword === $scope.oldPassword) {
                    $scope.error = '';
                } else {
                    $scope.error = 'Please enter correct password';
                }
            },
            function (error) {
                $scope.error = '';
                var err = JSON.parse(error);
                alert(" failed, Server Error");
                // console.log(err.Message);

            });

        }
    })
})