define(['app'], function (app) {
    app.controller("AboutCollegeController", function ($scope, $state, $stateParams, AppSettings, RegisterAdmittedStudentService) {
        $scope.AboutCollege = {};
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
        $scope.AboutCollege.CollegeID = AppSettings.CollegeID;
        $scope.Exit = function () {
            RedirectToListPage();   
        }
        function RedirectToListPage() {
            $state.go('Admission');
        }
        var LateStudentdata = RegisterAdmittedStudentService.GetCollegeInfo(AppSettings.CollegeID);
        LateStudentdata.then(function (data) {
            $scope.AboutCollege = data[0];
        }, function (error) {
            alert(error);
        });
    });
});
