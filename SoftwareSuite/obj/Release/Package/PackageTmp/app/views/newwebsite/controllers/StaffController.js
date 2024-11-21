define(['app'], function (app) {
    app.controller("staffController", function ($scope, $state, $stateParams, AppSettings, AdminService) {

        $scope.search = "";
        $scope.loading = true;
        var getcircular = AdminService.getStaffActive();
        getcircular.then(function (response) {
            //var response = JSON.parse(res)
            if (response.Table.length > 0) {
                $scope.StaffList = response.Table;
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
