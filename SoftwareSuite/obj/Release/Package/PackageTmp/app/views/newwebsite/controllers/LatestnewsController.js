define(['app'], function (app) {
    app.controller("LatestnewsController", function ($scope, $state, $stateParams, AppSettings, AdminService) {

        

        $scope.search = "";
        $scope.loading = true;
        var getNotification = AdminService.GetNotificationsActiveByUser(1017);
        getNotification.then(function (response) {
            //console.log(response)
            if (response.length > 0) {
                $scope.GetNotifications = response;
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


        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }

    });
});
