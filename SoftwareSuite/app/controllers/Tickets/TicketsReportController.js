define(['app'], function (app) {
    app.controller("TicketsReportController", function ($scope, AdminService, $http, $localStorage, $state, AppSettings) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;
        $scope.UserTypeID = authData.UserTypeID;
        $scope.LoadImg = false;
        $scope.Setdate = function () {
            if (Date.parse($scope.setFromDate) > Date.parse($scope.setToDate)) {
                alert("To Date Should Not Less Then From Date");
                $scope.setToDate = '';

                return false;
            }
        };
        $scope.Todate = function () {
            if (Date.parse($scope.setFromDate) > Date.parse($scope.setToDate)) {
                alert("To Date Should Not Less Then From Date");
                $scope.setFromDate = '';

                return false;
            }
        };



        $scope.GetReport = function () {
            $scope.LoadImg = true;
            $scope.isShowResults = true;
            var fromdate = moment($scope.setFromDate).format("YYYY-MM-DD");
            var todate = moment($scope.setToDate).format("YYYY-MM-DD");
            AdminService.GetTicketsReportExcel(fromdate, todate, $scope.UserName)
                .then(function (response) {
                    if (response != null && response.length > 1) {
                        var location = window.location.origin;
                        $scope.LoadImg = false;
                        window.location.href =  response;
                        $scope.NoResult = false;
                    } else {
                        $scope.LoadImg = false;
                        alert("Error Generating The Report");
                        $scope.NoResult = true;
                    }
                },
                    function (error) {
                        $scope.LoadImg = false;
                        alert("error data is not getting");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                    });
        }



    });
});