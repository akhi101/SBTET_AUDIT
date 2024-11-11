define(['app'], function (app) {
    app.controller("BackLogDetailesController", function ($scope, $http, $localStorage, $state, BacklogResultsService) {

        $scope.getBacklogStudentdetailes = {};
        $scope.result = false;
        

        var subcode = $localStorage.Results.subcode;
        var Pin = $localStorage.Results.pin;

        var getbacklogHistory = BacklogResultsService.getStudentbacklogHistory(Pin, subcode);
            getbacklogHistory.then(function (response) {
                if (response) {
                 response = JSON.parse(response);
                $scope.getBacklogStudentdetailes = response.Table;
                console.log($scope.getBacklogStudentdetailes);
                $scope.isShowResults1 = true;
                $scope.isShowResults = true
                }
                else {
                    $scope.result = true;
                    $scope.response = "Data Not Found";

                }
               

            },
             function (error) {
                 alert("while error geting data");
                 var err = JSON.parse(error);
                 console.log(err.Message);



             });
           

    });
});
