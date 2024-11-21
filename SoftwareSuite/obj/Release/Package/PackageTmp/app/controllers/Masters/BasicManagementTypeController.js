define(['app'], function (app) {
    app.controller("BasicManagementTypeController", function ($scope, $state, $stateParams, AppSettings, BasicManagementTypeService) {
        $scope.BasicManagementType = { MngtTypID: $stateParams.MngtTypID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicManagementTypeRightsdata = [];
        BasicManagementTypeRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicManagementTypeRightsdata.length; i++) {
            if (BasicManagementTypeRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicManagementType.MngtTypID == 0) {
                    if (BasicManagementTypeRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicManagementTypeRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicManagementTypeRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicManagementType.MngtTypID > 0) {
            var BasicManagementTypedata = BasicManagementTypeService.GetBasicManagementTypeById($scope.BasicManagementType.MngtTypID);
            BasicManagementTypedata.then(function (data) {
                $scope.BasicManagementType = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicManagementType = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicManagementType.MngtTypID == undefined) { $scope.BasicManagementType.MngtTypID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicManagementType.MngtTypID == 0) {
                    $scope.BasicManagementType.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicManagementType.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicManagementTypeService.PostBasicManagementTypeInsert($scope.BasicManagementType);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicManagementType.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicManagementTypeService.UpdateBasicManagementType($scope.BasicManagementType);
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
        $scope.DeleteBasicManagementType = function () {
            var getData = BasicManagementTypeService.DeleteBasicManagementType($scope.BasicManagementType.MngtTypID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicManagementType.MngtTypName == undefined) || ($scope.BasicManagementType.MngtTypName == "")) {
                alert("Enter Management Type Name ");
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
            $state.go('Masters.BasicManagementTypeList');
        }
    });
});
