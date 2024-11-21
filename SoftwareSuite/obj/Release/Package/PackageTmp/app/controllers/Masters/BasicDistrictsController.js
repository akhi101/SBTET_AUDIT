define(['app'], function (app) {
	app.controller("BasicDistrictsController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService, BasicStateService) {
		$scope.BasicDistricts = { DistrictID: $stateParams.DistrictID };
        var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicDistrictsRightsdata = [];
        BasicDistrictsRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicDistrictsRightsdata.length; i++) {
			if (BasicDistrictsRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicDistricts.DistrictID == 0) {
					if (BasicDistrictsRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
					if (BasicDistrictsRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
					if (BasicDistrictsRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
		}
		var BasicStateList = BasicStateService.GetBasicStateList();
		BasicStateList.then(function (StateData, status, headers, config, error) {
			$scope.BasicStateList = StateData;
		}, function (Castdata, status, headers, config) {
			alert(error);
		});

		if ($scope.BasicDistricts.DistrictID > 0) {
			var BasicDistrictsdata = BasicDistrictsService.GetBasicDistrictsByDistrictID($scope.BasicDistricts.DistrictID);
            BasicDistrictsdata.then(function (data) {
				$scope.BasicDistricts = data[0];
            }, function (error) {
                alert(error);
            });
        }
		$scope.SaveBasicDistricts = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicDistricts.DistrictID == undefined) { $scope.BasicDistricts.DistrictID = 0; }
			if ($scope.BasicDistricts.DistrictID == "") { $scope.BasicDistricts.DistrictID = 0; }
            if (CheckValidation() == true) {
				if ($scope.BasicDistricts.DistrictID == 0) {
					$scope.BasicDistricts.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicDistricts.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicDistrictsService.PostBasicDistrictsInsert($scope.BasicDistricts);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
					$scope.BasicDistricts.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicDistrictsService.UpdateBasicDistricts($scope.BasicDistricts);
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
		$scope.DeleteBasicDistricts = function () {
            var getData = BasicDistrictsService.DeleteBasicDistricts($scope.BasicDistricts.DistrictID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
		function CheckValidation() {
			if (($scope.BasicDistricts.StateID == undefined) || ($scope.BasicDistricts.StateID == 0)) {
				alert("Select State ");
				return false;
			}
			if (($scope.BasicDistricts.DistName == undefined) || ($scope.BasicDistricts.DistName == "")) {
				alert("Enter District Name ");
                return false;
            }
			if (($scope.BasicDistricts.DistCode == undefined) || ($scope.BasicDistricts.DistCode == "")) {
				alert("Enter District Code");
                return false;
			}
			if (($scope.BasicDistricts.OldCode == undefined) || ($scope.BasicDistricts.OldCode == "")) {
				alert("Enter District Old Code");
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
			$state.go('Masters.BasicDistrictsList');
        }
    });
});
