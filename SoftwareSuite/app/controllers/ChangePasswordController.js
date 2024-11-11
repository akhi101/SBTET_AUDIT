define(['app'], function (app) {
    app.controller("ChangePasswordController", function ($scope, $state, $filter, $localStorage, $stateParams, $crypto, AppSettings, ChangePasswordService, MenuService, SystemUserService) {
      
            var authData = $localStorage.authorizationData;
        $scope.NewPassword = "";
            $scope.userType = authData.SystemUserTypeId
            $scope.userName = authData.userName;

            AppSettings.userName = authData.userName;
            AppSettings.LoggedUserId = authData.SysUserID;
            //alert("College Id" + authData.CollegeID);
            AppSettings.CollegeID = authData.CollegeID;
            $scope.CollegeID = authData.CollegeID;
            AppSettings.AcdYrID = authData.AcdYrID;
            AppSettings.PrevAdmNo = authData.PrevAdmNo;
            AppSettings.TypeFlag = authData.TypeFlag;
            AppSettings.MngtTypID = authData.MngtTypID;
            AppSettings.SysUsrGrpID = authData.SysUsrGrpID,
            AppSettings.SeqNo = authData.SeqNo,
            AppSettings.UserRights = authData.UserRights,
            AppSettings.DistrictIDs = authData.DistrictIDs;
            AppSettings.College_Code = authData.College_Code;
            AppSettings.College_Name = authData.College_Name;
            $scope.College_Name = authData.College_Name
            $scope.College_Code = authData.College_Code;
            $scope.ChangePassword = {};
            $scope.shownewpassword = false;
            $scope.CheckOldPassword = function () {
                if (($scope.OldPassword == undefined) || ($scope.OldPassword == "")) {
                    alert("Enter Old Password");
                    return false;
                }
                let reqdata = $crypto.encrypt($scope.OldPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(AppSettings.LoggedUserId.toString(), sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
                var getPromise = ChangePasswordService.GetCheckOldPassword(reqdata);
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
            let reqdata = $crypto.encrypt($scope.NewPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt($scope.OldPassword, sessionStorage.Ekey) + "$$@@$$"+ $crypto.encrypt(AppSettings.LoggedUserId.toString(), sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
                var getPromise = ChangePasswordService.GetChangePassword(reqdata);
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
                $state.go('index.WebsiteLogin');
            }
            $scope.logOut = function () {
             
                sessionStorage.loggedIn = "no";
                sessionStorage.clear();
                delete $localStorage.authorizationData;
                var logUser = SystemUserService.postUserLogout($scope.userName);
                logUser.then(function (response) {
                    console.log(response);
                }, function (err) {
                    alert(err);
                });
                var InsertLoginList = MenuService.GetUpdateLogoutInfo(AppSettings.LoggedUserId, $scope.userName);
                InsertLoginList.then(function (Districtdata, status, headers, config, error) {
                }, function (error) {
                    alert(error);
                });
                $scope.authentication = {
                    isAuth: false,
                    UserId: 0,
                    userName: ""
                };
                $state.go('index.WebsiteLogin')
            }
        });
    });

