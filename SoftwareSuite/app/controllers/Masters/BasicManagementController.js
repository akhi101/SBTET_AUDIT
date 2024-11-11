define(['app'], function (app) {
    app.controller("BasicManagementController", function ($scope, $state, $stateParams, AppSettings, BasicManagementService) {
        $scope.BasicManagement = { MngtID: $stateParams.MngtID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicManagementRightsdata = [];
        BasicManagementRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicManagementRightsdata.length; i++) {
            if (BasicManagementRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicManagement.MngtID == 0) {
                    if (BasicManagementRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicManagementRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicManagementRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicManagement.MngtID > 0) {
            var BasicManagementdata = BasicManagementService.GetBasicManagementById($scope.BasicManagement.MngtID);
            BasicManagementdata.then(function (data) {
                $scope.BasicManagement = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicManagement = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicManagement.MngtID == undefined) { $scope.BasicManagement.MngtID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicManagement.MngtID == 0) {
                    $scope.BasicManagement.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicManagement.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicManagementService.PostBasicManagementInsert($scope.BasicManagement);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false; 
                        alert(error);
                    });
                }
                else {
                    $scope.BasicManagement.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicManagementService.UpdateBasicManagement($scope.BasicManagement);
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
        $scope.DeleteBasicManagement = function () {
            var getData = BasicManagementService.DeleteBasicManagement($scope.BasicManagement.MngtID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicManagement.MngtName == undefined) || ($scope.BasicManagement.MngtName == "")) {
                alert("Enter Management Name ");
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
            $state.go('Masters.BasicManagementList');
        }
    });
});
