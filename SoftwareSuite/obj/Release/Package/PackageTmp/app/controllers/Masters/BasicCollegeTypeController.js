define(['app'], function (app) {
	app.controller("BasicCollegeTypeController", function ($scope, $state, $stateParams, AppSettings, BasicCollegeTypeService) {
		$scope.BasicCollegeType = { ColTypID: $stateParams.ColTypID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicCollegeTypeRightsdata = [];
		BasicCollegeTypeRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicCollegeTypeRightsdata.length; i++) {
			if (BasicCollegeTypeRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicCollegeType.ColTypID == 0) {
					if (BasicCollegeTypeRightsdata[i].isaddable == 'Y') {
						$scope.isupdatableDisable = false;
					} else {
						$scope.isupdatableDisable = true;
					}
					$scope.isdeletableDisable = true;
				} else {
					if (BasicCollegeTypeRightsdata[i].isupdatable == 'Y') {
						$scope.isupdatableDisable = false;
					}
					else {
						$scope.isupdatableDisable = true;
					}
					if (BasicCollegeTypeRightsdata[i].isdeletable == 'Y') {
						$scope.isdeletableDisable = false;
					} else {
						$scope.isdeletableDisable = true;
					}
				}
			}
		}
		if ($scope.BasicCollegeType.ColTypID > 0) {
			var BasicCollegeTypedata = BasicCollegeTypeService.GetBasicCollegeTypeByColTypID($scope.BasicCollegeType.ColTypID);
			BasicCollegeTypedata.then(function (data) {
				$scope.BasicCollegeType = data[0];
			}, function (error) {
				alert(error);
			});
		}
		$scope.SaveBasicCollegeType = function () {
			$scope.isupdatableDisable = true;
			if ($scope.BasicCollegeType.ColTypID == undefined) { $scope.BasicCollegeType.ColTypID = 0; }
			if (CheckValidation() == true) {
				if ($scope.BasicCollegeType.ColTypID == 0) {
					$scope.BasicCollegeType.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicCollegeType.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicCollegeTypeService.PostBasicCollegeTypeInsert($scope.BasicCollegeType);
					getPromise.then(function (msg) {
						alert("Added successfully!!");
						RedirectToListPage();
					}, function (error) {
						$scope.isupdatableDisable = false;
						alert(error);
					});
				}
				else {
					$scope.BasicCollegeType.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicCollegeTypeService.UpdateBasicCollegeType($scope.BasicCollegeType);
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
		$scope.DeleteBasicCollegeType = function () {
			var getData = BasicCollegeTypeService.DeleteBasicCollegeType($scope.BasicCollegeType.ColTypID, AppSettings.LoggedUserId);
			getData.then(function (msg) {
				alert('Record Deleted');
				RedirectToListPage();
			}, function (error) {
				alert(error);
			});
		}
		function CheckValidation() {
			if (($scope.BasicCollegeType.ColTypName == undefined) || ($scope.BasicCollegeType.ColTypName == "")) {
				alert("Enter College Type ");
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
			$state.go('Masters.BasicCollegeTypeList');
		}
	});
});
