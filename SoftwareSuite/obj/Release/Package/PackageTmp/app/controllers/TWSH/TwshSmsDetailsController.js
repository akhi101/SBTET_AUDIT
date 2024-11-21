define(['app'], function (app) {
    app.controller("TwshSmsDetailsController", function ($scope, $state, TwshStudentRegService, $localStorage) {
        var authData = $localStorage.Twsh;
        $scope.userId = authData.UserId;
        $scope.LoadImg = false;
        $scope.SmsDetailsFound = false;
        $scope.userType = authData.UserTypeId;
        $scope.loadsmsDetails = function () {
            $scope.LoadImg = true;
            var GetInstituteReports = TwshStudentRegService.GetSmsDetails();
            GetInstituteReports.then(function (response) {
                var smsData = JSON.parse(response);
                console.log(smsData);
                if (smsData.length > 0) {
                    $scope.SmsDetailsList = [];
                    $scope.LoadImg = false;
                    $scope.SmsDetailsFound = true;
                    $scope.SmsDetailsList = smsData;
                   // console.log(response);
                } else {
                    $scope.SmsDetailsList = [];
                    $scope.LoadImg = false;
                    $scope.SmsDetailsFound = false;
                    $scope.SmsDetailsList = [];
                    $scope.StatusMessage = "No Data Present";
                    $scope.showStatus = true;
                    $scope.statusclass = 'alert-danger';
                    $scope.data = false;
                }

            },

                function (err) {
                    $scope.SmsDetailsList = [];
                    $scope.LoadImg = false;
                    $scope.SmsDetailsFound = false;
                    $scope.StatusMessage = "No Data Present";
                    $scope.showStatus = true;
                    $scope.statusclass = 'alert-danger';
                    $scope.data = false;
                });
        }

        $scope.SendSms = function () { }

        $scope.openDetails = function (gradeId) {

            localStorage.setItem('gradeId', gradeId)
            $state.go('TWSH.DetailedReports')
        }
    })
})
