define(['app'], function (app) {
    app.controller("DownloadsController", function ($scope, $state, $stateParams, AppSettings,AdminService) {

       
        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }

        $scope.search = "";
        $scope.loading = true;
        var getcircular = AdminService.GetActiveDownloadsList();
        getcircular.then(function (response) {           
            if (response.Table.length > 0) {
                $scope.Downloads = response.Table;
                $scope.loading = false;
                $scope.data = true;
                $scope.error = false;
               
            } else {
                $scope.loading = false;
                $scope.data = false;
                $scope.error = true;
            }
        },
                function (error) {

                    console.log(error);
                    $scope.loading = false;
                    $scope.data = false;
                    $scope.error = true;
                });
 

    });
});
