define(['app'], function (app) {
	app.controller("BasicMandalController", function ($scope, $state, $stateParams, AppSettings, BasicMandalService, BasicDistrictsService) {
		$scope.BasicMandal = { MandalID: $stateParams.MandalID };
        var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicMandalRightsdata = [];
        BasicMandalRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicMandalRightsdata.length; i++) {
			if (BasicMandalRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicMandal.MandalID == 0) {
					if (BasicMandalRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
					if (BasicMandalRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
					if (BasicMandalRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
		}
		var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByCode();
		BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
			$scope.BasicDistrictList = DistrictData;
		}, function (Castdata, status, headers, config) {
			alert(error);
		});

		if ($scope.BasicMandal.MandalID > 0) {
			var BasicMandaldata = BasicMandalService.GetBasicMandalByMandalID($scope.BasicMandal.MandalID);
            BasicMandaldata.then(function (data) {
				$scope.BasicMandal = data[0];
            }, function (error) {
                alert(error);
            });
        }
		$scope.SaveBasicMandal = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicMandal.MandalID == undefined) { $scope.BasicMandal.MandalID = 0; }
			if ($scope.BasicMandal.MandalID == "") { $scope.BasicMandal.MandalID = 0; }
            if (CheckValidation() == true) {
				if ($scope.BasicMandal.MandalID == 0) {
					$scope.BasicMandal.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicMandal.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicMandalService.PostBasicMandalInsert($scope.BasicMandal);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
					$scope.BasicMandal.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicMandalService.UpdateBasicMandal($scope.BasicMandal);
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
		$scope.DeleteBasicMandal = function () {
            var getData = BasicMandalService.DeleteBasicMandal($scope.BasicMandal.MandalID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
		function CheckValidation() {
			if (($scope.BasicMandal.DistrictID == undefined) || ($scope.BasicMandal.DistrictID == "")) {
				alert("Select District");
				return false;
			}
			if (($scope.BasicMandal.MandalName == undefined) || ($scope.BasicMandal.MandalName == "")) {
				alert("Enter Mandal Name ");
                return false;
            }
			if (($scope.BasicMandal.MandalCode == undefined) || ($scope.BasicMandal.MandalCode == "")) {
				alert("Enter Mandal Code");
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
			$state.go('Masters.BasicMandalList');
        }
    });
});
