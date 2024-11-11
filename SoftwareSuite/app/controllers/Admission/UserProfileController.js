define(['app'], function (app) {
    app.controller("UserProfileController", function ($scope, $state, AppSettings, SystemUserService) {
        $scope.UserProfile = {};
        var SystemUserInfoList = SystemUserService.GetUserProfileDetailsById(AppSettings.LoggedUserId);
        SystemUserInfoList.then(function (SystemUserInfoList, status, headers, config, error) {
            $scope.UserProfile = SystemUserInfoList[0];
        }, function (error) {
            alert(error);
        });
    });
});