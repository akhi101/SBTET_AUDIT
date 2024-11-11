define(['app'], function (app) {
    app.controller("UserGroupMasterController", function ($scope, $state, $stateParams, AppSettings, UserGroupMasterService) {
        $scope.UserGroupMaster = { SysUsrGrpID: $stateParams.SysUsrGrpID };
        //var PageNm = $state.current.name.split(".")[1] + "List";
        //var UserGroupMasterRightsdata = [];
        //UserGroupMasterRightsdata = AppSettings.UserRights;
        //for (var i = 0; i < UserGroupMasterRightsdata.length; i++) {
        //    if (UserGroupMasterRightsdata[i].GridFormToOpen == PageNm) {
        //        if ($scope.UserGroupMaster.SysUsrGrpID == 0) {
        //            if (UserGroupMasterRightsdata[i].isaddable == 'Y') {
        //                $scope.isupdatableDisable = false;
        //            } else {
        //                $scope.isupdatableDisable = true;
        //            }
        //            $scope.isdeletableDisable = true;
        //        } else {
        //            if (UserGroupMasterRightsdata[i].isupdatable == 'Y') {
        //                $scope.isupdatableDisable = false;
        //            }
        //            else {
        //                $scope.isupdatableDisable = true;
        //            }
        //            if (UserGroupMasterRightsdata[i].isdeletable == 'Y') {
        //                $scope.isdeletableDisable = false;
        //            } else {
        //                $scope.isdeletableDisable = true;
        //            }
        //        }
        //    }
        //}

        if ($scope.UserGroupMaster.SysUsrGrpID > 0) {
            var UserGroupMasterdata = UserGroupMasterService.GetUserGroupMasterById($scope.UserGroupMaster.SysUsrGrpID);
            UserGroupMasterdata.then(function (data) {
                $scope.UserGroupMaster = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveUserGroupMaster = function () {
            $scope.isupdatableDisable = true;
            if ($scope.UserGroupMaster.SysUsrGrpID == undefined) { $scope.UserGroupMaster.SysUsrGrpID = 0; }
            if ($scope.UserGroupMaster.SysUsrGrpID == "") { $scope.UserGroupMaster.SysUsrGrpID = 0; }
            if (CheckValidation() == true) {
                if ($scope.UserGroupMaster.SysUsrGrpID == 0) {
                    $scope.UserGroupMaster.CreLoginID = AppSettings.LoggedUserId;
                    $scope.UserGroupMaster.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = UserGroupMasterService.AddUserGroupMaster($scope.UserGroupMaster);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.UserGroupMaster.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = UserGroupMasterService.UpdateUserGroupMaster($scope.UserGroupMaster);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteUserGroupMaster = function () {
            var getData = UserGroupMasterService.DeleteUserGroupMaster($scope.UserGroupMaster.SysUsrGrpID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.UserGroupMaster.SysUsrGrpName == undefined) || ($scope.UserGroupMaster.SysUsrGrpName == "")) {
                alert("Please Enter User Group Name ");
                return false;
            }
            if (($scope.UserGroupMaster.SeqNo == undefined) || ($scope.UserGroupMaster.SeqNo == 0)) {
                alert("Please Enter Sequence Code ");
                return false;
            }
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Masters.UserGroupMasterList');
        }
    });
});
