define(['app'], function (app) {
    app.controller("TwshQualifiedCountController", function ($scope, $state, TwshStudentRegService, $localStorage) {
        var authData = $localStorage.Twsh;

        $scope.userId = authData.UserId;
        $scope.userType = authData.UserTypeId;
        $scope.LoadImg = true;
        var GetInstituteReports = TwshStudentRegService.getQualifiedCount($scope.userType);
        GetInstituteReports.then(function (response) {
            if (response.length > 0) {
                $scope.LoadImg = false;
                $scope.data = true;

                $scope.QualifiedList = response;
                var Qualified = 0;
                var Disqualified = 0;
                
                for (count = 0; count < $scope.QualifiedList.length; count++) {
                    Qualified += parseInt($scope.QualifiedList[count].Qualified)
                    Disqualified += parseInt($scope.QualifiedList[count].Disqualified);
                   
                }

                $scope.Qualified = Qualified;
                $scope.Disqualified = Disqualified;
               

            } else {
                $scope.LoadImg = false;
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;
            }
        },
            function (error) {
                $scope.LoadImg = false;
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;

            });


        $scope.OpenCountData = function (Result, GradeId) {
            $localStorage.TwshStudentData = {
                Result: Result,
                GradeId: GradeId

            }
            //localStorage.setItem('RegistrationNo', RegistrationNo)
            $state.go('TWSH.TwshQualifiedList')
        }

    })
})