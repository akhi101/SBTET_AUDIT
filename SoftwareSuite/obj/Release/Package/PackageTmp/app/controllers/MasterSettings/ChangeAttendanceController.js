define(['app'], function (app) {
    app.controller("ChangeAttendanceController", function ($scope, $http, $localStorage, $state, $window, $stateParams, AppSettings, MasterSettingsService) {
        $scope.ShowData = false;
 
        $scope.GetDetails = function () {
            //var Puropse = $scope.Puropse;
            //$scope.Update = true;


            var EditData = MasterSettingsService.getAttendanceByPin($scope.Pin)
            EditData.then(function (response) {
                //console.log(response)
                $scope.ShowData = true;
                $scope.UserData = response[0];

            },
                function (error) {
                    $scope.ShowData = false;
                    alert("edit is not wroking");
                    var err = JSON.parse(error);
                    console.log(err.Message);

                });


        }
    })
})