define(['app'], function (app) {
    app.controller("ChangePasswordController", function ($scope, $state, $filter, $stateParams, AppSettings, ChangePasswordService) {
        $scope.ChangePassword = {};
        $scope.shownewpassword = false;
        $scope.CheckOldPassword = function () {
            if (($scope.OldPassword == undefined) || ($scope.OldPassword == "")) {
                alert("Enter Old Password");
                return false;
            }
            var getPromise = ChangePasswordService.GetCheckOldPassword($scope.OldPassword, AppSettings.LoggedUserId);
            getPromise.then(function (data) {
                if (data == 0) {
                    alert("Invalid Old Password");
                    return;
                } else {
                    $scope.shownewpassword = true;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveChangePassword = function () {
            if (($scope.NewPassword == undefined) || ($scope.NewPassword == "")) {
                alert("Enter New Password");
                return false;
            }
            if (($scope.ConfirmPassword == undefined) || ($scope.ConfirmPassword == "")) {
                alert("Enter Confirm Password");
                return false;
            }
            if ($scope.NewPassword != $scope.ConfirmPassword) {
                alert("New Password and Confirm Password did not match.");
                return false;
            }
            var getPromise = ChangePasswordService.GetChangePassword(AppSettings.LoggedUserId, $scope.NewPassword);
            getPromise.then(function (data) {
                alert("Password Changed successfully");
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('index.WebsiteLogin');
        }
    });
});
