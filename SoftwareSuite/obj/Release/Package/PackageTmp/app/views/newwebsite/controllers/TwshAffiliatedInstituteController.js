define(['app'], function (app) {
    app.controller("TwshAffiliatedInstituteController", function ($scope, $state, $stateParams, AppSettings, AdminService) {

        $scope.search = "";

        var GetTwshInstitutions = AdminService.GetAffiliatedTwshInstitutions();
        GetTwshInstitutions.then(function (res) {
          //  var response = JSON.parse(res)
            if (res.length > 0) {
                $scope.Institutions = res;
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
