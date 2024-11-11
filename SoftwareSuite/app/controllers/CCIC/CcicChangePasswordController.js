define(['app'], function (app) {
    app.controller("CcicChangePasswordController", function ($scope, $state, $filter, $localStorage, $stateParams, $crypto, AppSettings, CcicChangePasswordService, CcicSystemUserService) {

        var authData = $localStorage.authorizationData;

        $scope.UserTypeID = authData.UserTypeID;
        $scope.UserName = authData.UserName;

        AppSettings.UserName = authData.UserName;
        AppSettings.LoggedUserId = authData.UserID;



      
        $scope.CcicChangePassword = {};
        $scope.shownewpassword = false;
        $scope.CcicCheckOldPassword = function () {
            if (($scope.OldPassword == undefined) || ($scope.OldPassword == "")) {
                alert("Enter Old Password");
                return false;
            }
            let reqdata = $crypto.encrypt($scope.OldPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(AppSettings.LoggedUserId.toString(), sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
            var getPromise = CcicChangePasswordService.GetCcicCheckOldPassword(reqdata);
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
        $scope.CcicSaveChangePassword = function () {
            if (($scope.OldPassword == undefined) || ($scope.OldPassword == "")) {
                alert("Enter Old Password");
                return;
            }

            if (($scope.NewPassword == undefined) || ($scope.NewPassword == "")) {
                alert("Enter New Password");
                return;
            }
            if (($scope.ConfirmPassword == undefined) || ($scope.ConfirmPassword == "")) {
                alert("Enter Confirm Password");
                return;
            }
            if ($scope.NewPassword != $scope.ConfirmPassword) {
                alert("New Password and Confirm Password did not match.");
                return;
            }
            let reqdata = $crypto.encrypt($scope.NewPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt($scope.OldPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(AppSettings.LoggedUserId.toString(), sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
            var getPromise = CcicChangePasswordService.GetCcicChangePassword(reqdata);
            getPromise.then(function (data) {
                if (data.ResponceCode == "200") {
                    alert(data.ResponceDescription);
                    RedirectToListPage();
                } else {
                    alert(data.ResponceDescription);
                    $scope.OldPassword = "";
                    $scope.NewPassword = "";
                    $scope.ConfirmPassword = "";
                }

            }, function (error) {
                alert(error);
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('CcicLogin');
        }

        $scope.logOut = function () {


            sessionStorage.loggedIn = "no";
            var GetCcicUserLogout = CcicSystemUserService.PostCcicUserLogout($scope.UserName, $scope.SessionID);

            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;

            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""

            };
            $state.go('CcicLogin')
        }    });
});

