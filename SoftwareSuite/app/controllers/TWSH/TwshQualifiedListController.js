define(['app'], function (app) {
    app.controller("TwshQualifiedListController", function ($scope, $state, TwshStudentRegService, $localStorage) {
        var authData = $localStorage.Twsh;

        $scope.userId = authData.UserId;
        $scope.userType = authData.UserTypeId;
        $scope.LoadImg = true;
        var studData = $localStorage.TwshStudentData
        $scope.Result = studData.Result
        $scope.GradeId = studData.GradeId

        var GetInstituteReports = TwshStudentRegService.getQualifiedList($scope.Result, $scope.GradeId);
        GetInstituteReports.then(function (response) {
            if (response.length > 0) {
                $scope.LoadImg = false;
                $scope.data = true;

                $scope.QualifiedList = response;
              
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


        $scope.OpenData = function (RegistrationNo) {
            localStorage.setItem('RegistrationNo', RegistrationNo)
            $state.go('TWSH.TypeWritingCertificate')
        }

    })
})