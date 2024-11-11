define(['app'], function (app) {
    app.controller("GovtColEnrollListController", function ($scope, $state, $filter, $stateParams, AppSettings) {
        $scope.GovtColEnrollList = {};
        var PageNm = $state.current.name.split(".")[1];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                if (UsersRightsdata[i].isaddable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        $scope.GovtColEnrollList.EnrollExist = "N";
        $scope.Show = function () {
            if ($scope.GovtColEnrollList.EnrollExist == 'Y') {
                $state.go('GovtColEnrollExist');
            }
            else {
                $state.go('GovtColEnroll');
            }
        }
        //$scope.Exit = function () {
        //    RedirectToListPage();
        //}
        //function RedirectToListPage() {
        //    $state.go('GovtColEnroll');
        //}
    });
});
