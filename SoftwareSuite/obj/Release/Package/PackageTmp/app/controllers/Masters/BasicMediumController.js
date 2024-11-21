define(['app'], function (app) {
	app.controller("BasicMediumController", function ($scope, $state, $stateParams, AppSettings, BasicMediumService) {
        $scope.BasicMedium = { MediumID: $stateParams.MediumID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicMediumRightsdata = [];
        BasicMediumRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicMediumRightsdata.length; i++) {
            if (BasicMediumRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicMedium.BasicMediumId == 0) {
                    if (BasicMediumRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicMediumRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicMediumRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        if ($scope.BasicMedium.MediumID > 0) {
			var BasicMediumdata = BasicMediumService.GetBasicMediumByMediumID($scope.BasicMedium.MediumID);
            BasicMediumdata.then(function (data) {
                $scope.BasicMedium = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicMedium = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicMedium.MediumID == undefined) { $scope.BasicMedium.MediumID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicMedium.MediumID == 0) {
                    $scope.BasicMedium.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicMedium.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicMediumService.PostBasicMediumInsert($scope.BasicMedium);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicMedium.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicMediumService.UpdateBasicMedium($scope.BasicMedium);
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
		$scope.DeleteBasicMedium = function () {
			var getData = BasicMediumService.DeleteBasicMedium($scope.BasicMedium.MediumID,AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicMedium.MediumName == undefined) || ($scope.BasicMedium.MediumName == "")) {
				alert("Enter Medium Name");
                return false;
            }
			if (($scope.BasicMedium.MediumCode == undefined) || ($scope.BasicMedium.MediumCode == "")) {
				alert("Enter Medium Code");
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
            $state.go('Masters.BasicMediumList');
        }
    });
});
