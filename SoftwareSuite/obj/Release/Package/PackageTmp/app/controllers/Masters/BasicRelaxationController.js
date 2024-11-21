define(['app'], function (app) {
	app.controller("BasicRelaxationController", function ($scope, $state, $stateParams, AppSettings, BasicRelaxationService) {
		$scope.BasicRelaxation = { RelaxId: $stateParams.RelaxId };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicRelaxationRightsdata = [];
		BasicRelaxationRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicRelaxationRightsdata.length; i++) {
			if (BasicRelaxationRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicRelaxation.RelaxId == 0) {
					if (BasicRelaxationRightsdata[i].isaddable == 'Y') {
						$scope.isupdatableDisable = false;
					} else {
						$scope.isupdatableDisable = true;
					}
					$scope.isdeletableDisable = true;
				} else {
					if (BasicRelaxationRightsdata[i].isupdatable == 'Y') {
						$scope.isupdatableDisable = false;
					}
					else {
						$scope.isupdatableDisable = true;
					}
					if (BasicRelaxationRightsdata[i].isdeletable == 'Y') {
						$scope.isdeletableDisable = false;
					} else {
						$scope.isdeletableDisable = true;
					}
				}
			}
		}
		if ($scope.BasicRelaxation.RelaxId > 0) {
			var BasicRelaxationdata = BasicRelaxationService.GetBasicRelaxationById($scope.BasicRelaxation.RelaxId);
			BasicRelaxationdata.then(function (data) {
				$scope.BasicRelaxation = data[0];
			}, function (error) {
				alert(error);
			});
		}
		$scope.SaveBasicRelaxation = function () {
			$scope.isupdatableDisable = true;
			if ($scope.BasicRelaxation.RelaxId == undefined) { $scope.BasicRelaxation.RelaxId = 0; }
			if ($scope.BasicRelaxation.RelaxId == "") { $scope.BasicRelaxation.RelaxId = 0; }
			if (CheckValidation() == true) {
				if ($scope.BasicRelaxation.RelaxId == 0) {
					$scope.BasicRelaxation.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicRelaxation.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicRelaxationService.PostBasicRelaxationInsert($scope.BasicRelaxation);
					getPromise.then(function (msg) {
						alert("Added successfully!!");
						RedirectToListPage();
					}, function (error) {
						$scope.isupdatableDisable = false;
						alert(error);
					});
				}
				else {
					$scope.BasicRelaxation.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicRelaxationService.UpdateBasicRelaxation($scope.BasicRelaxation);
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
		$scope.DeleteBasicRelaxation = function () {
			var getData = BasicRelaxationService.DeleteBasicRelaxation($scope.BasicRelaxation.RelaxId, AppSettings.LoggedUserId);
			getData.then(function (msg) {
				alert('Record Deleted');
				RedirectToListPage();
			}, function (error) {
				alert(error);
			});
		}
		function CheckValidation() {
			if (($scope.BasicRelaxation.RelaxDescription == undefined) || ($scope.BasicRelaxation.RelaxDescription == "")) {
				alert("Enter Relaxation Description ");
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
			$state.go('Masters.BasicRelaxationList');
		}
	});
});
