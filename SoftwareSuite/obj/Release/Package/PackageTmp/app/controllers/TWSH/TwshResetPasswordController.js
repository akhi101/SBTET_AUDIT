define(['app'], function (app) {
    app.controller("TwshResetPasswordController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
       
        //$scope.UserPassword = 'welcome';
        $scope.Districts = [];
        var GetExamDistricts = TwshStudentRegService.getDistricts();
        GetExamDistricts.then(function (res) {
            $scope.Districts = res;
        }, function (err) {
            $scope.Districts = [];
        });
        $scope.selectDistrict = function (district) {
            var GetInstitutes = TwshStudentRegService.getDistrictInstitutes($scope.District, $scope.UserType);
            GetInstitutes.then(function (res) {
                if (res.Table[0].UserTypeId == 3) {
                    $scope.Institutes = res.Table1;
                    $scope.UserPassword = res.Table[0].UserPassword;
                    $scope.Institute = true;
                    $scope.ExamCenter = false;
                } else {
                    $scope.UserPassword = res.Table[0].UserPassword;
                    $scope.Institutes = res.Table1;
                    $scope.Institute = false;
                    $scope.ExamCenter = true;
                }
             
            }, function (err) {
                $scope.Institute = false;
                $scope.ExamCenter = false;
                $scope.Institutes = [];
                //$scope.UserPassword = 'welcome';
            });

        }
      
            var GetUserTypes = TwshStudentRegService.getUserTypes();
            GetUserTypes.then(function (res) {
                $scope.userTypes = res;
            }, function (err) {
                $scope.userTypes = [];
            });

  
        

            $scope.resetPassword = function (userId) {
               
            var ResetInstitutePassword = TwshStudentRegService.resetUserPassword(userId, $scope.UserPassword);
            ResetInstitutePassword.then(function (res) {
               alert("Password has been Reset successfully for " +userId+".");
            }, function (err) {
              alert("server Error");
            });
        }
    })
})