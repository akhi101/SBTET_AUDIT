define(['app'], function (app) {
    app.controller("ForgetPasswordSavedController", function ($scope, $state, $filter, $stateParams, AppSettings, ForgetPasswordService) {
        $scope.ForgetPasswordSaved = { SysUserID: $stateParams.SysUserID };
        $scope.SaveForgetPassword = function () {
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
            var getPromise = ForgetPasswordService.GetForgetPassword($scope.ForgetPasswordSaved.SysUserID, $scope.NewPassword);
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
            $state.go('login');
        }
    });
});
