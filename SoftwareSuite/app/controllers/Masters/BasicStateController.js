define(['app'], function (app) {
	app.controller("BasicStateController", function ($scope, $state, $stateParams, AppSettings, BasicStateService) {
		$scope.BasicState = { StateID: $stateParams.StateID };
        var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicStateRightsdata = [];
        BasicStateRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicStateRightsdata.length; i++) {
			if (BasicStateRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicState.StateID == 0) {
					if (BasicStateRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
					if (BasicStateRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
					if (BasicStateRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
		}

		if ($scope.BasicState.StateID > 0) {
			var BasicStatedata = BasicStateService.GetBasicStateByID($scope.BasicState.StateID);
            BasicStatedata.then(function (data) {
				$scope.BasicState = data[0];
            }, function (error) {
                alert(error);
            });
        }
		$scope.SaveBasicState = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicState.StateID == undefined) { $scope.BasicState.StateID = 0; }
			if ($scope.BasicState.StateID == "") { $scope.BasicState.StateID = 0; }
            if (CheckValidation() == true) {
				if ($scope.BasicState.StateID == 0) {
					$scope.BasicState.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicState.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicStateService.AddBasicState($scope.BasicState);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
					$scope.BasicState.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicStateService.UpdateBasicState($scope.BasicState);
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
		$scope.DeleteBasicState = function () {
            var getData = BasicStateService.DeleteBasicState($scope.BasicState.StateID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicState.StateName == undefined) || ($scope.BasicState.StateName == "")) {
				alert("Enter State Name ");
                return false;
            }
			if (($scope.BasicState.StateCode == undefined) || ($scope.BasicState.StateCode == "")) {
				alert("Enter State Code");
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
			$state.go('Masters.BasicStateList');
        }
    });
});
