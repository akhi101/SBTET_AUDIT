define(['app'], function (app) {
	app.controller("BasicPhysDisabilityRelaxationController", function ($scope, $state, $filter, $stateParams, AppSettings, BasicPhysDisabilityRelaxationService,BasicPhysDisabilityService, BasicRelaxationService) {
		$scope.BasicPhysDisabilityRelaxation = { PhysDisbID: $stateParams.PhysDisbID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicPhysDisabilityRelaxationRightsdata = [];
		BasicPhysDisabilityRelaxationRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicPhysDisabilityRelaxationRightsdata.length; i++) {
			if (BasicPhysDisabilityRelaxationRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicPhysDisabilityRelaxation.PhysDisbRelaxID == 0) {
					if (BasicPhysDisabilityRelaxationRightsdata[i].isaddable == 'Y') {
						$scope.isupdatableDisable = false;
					} else {
						$scope.isupdatableDisable = true;
					}
					$scope.isdeletableDisable = true;
				} else {
					if (BasicPhysDisabilityRelaxationRightsdata[i].isupdatable == 'Y') {
						$scope.isupdatableDisable = false;
					}
					else {
						$scope.isupdatableDisable = true;
					}
					if (BasicPhysDisabilityRelaxationRightsdata[i].isdeletable == 'Y') {
						$scope.isdeletableDisable = false;
					} else {
						$scope.isdeletableDisable = true;
					}
				}
			}
		}
		var BasicPhysDisabilityList = BasicPhysDisabilityService.GetBasicPhysDisabilityList();
		BasicPhysDisabilityList.then(function (BasicPhysDisabilityData, status, headers, config, error) {
			$scope.BasicPhysDisabilityList = BasicPhysDisabilityData;
		}, function (BasicPhysDisabilityData, status, headers, config) {
			alert(error);
		});
		var RelaxationGridlData = BasicRelaxationService.GetBasicRelaxationList();
		RelaxationGridlData.then(function (data) {
			$scope.Relaxationdata = data;
		}, function (Relaxationdata, status, headers, config) {
			alert(error);
			});

		if ($scope.BasicPhysDisabilityRelaxation.PhysDisbID > 0) {
			var BasicPhysDisabilityRelaxationList = BasicPhysDisabilityRelaxationService.GetBasicPhysDisabilityRelaxationByPhysDisbRelaxID($scope.BasicPhysDisabilityRelaxation.PhysDisbID);
			BasicPhysDisabilityRelaxationList.then(function (data, status, headers, config, error) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].checkRelaxation == "Y") {
						data[i].checkRelaxation = true;
						BasicPhysDisabilityRelaxation.PhysDisbID = data[i].PhysDisbID;
					}
					else {
						data[i].checkRelaxation = false;
					}
				}
				$scope.Relaxationdata = data;
				BasicPhysDisabilityRelaxation.PhysDisbID = data;
			}, function (error) {
				alert(error);
			});
		}

		var BasicPhysDisabilityRelaxation = [];
		$scope.SaveBasicPhysDisabilityRelaxation = function () {
			if (CheckValidation() == true) {
				for (var k = 0; k < $scope.Relaxationdata.length; k++) {
					var obj = {};
					if ($scope.Relaxationdata[k].checkRelaxation == true) {
						obj.checkRelaxation = "Y";
						obj.PhysDisbID = $scope.BasicPhysDisabilityRelaxation.PhysDisbID;
						obj.RelaxId = $scope.Relaxationdata[k].RelaxId;
						BasicPhysDisabilityRelaxation.push(obj);
					}
				}
				$scope.BasicPhysDisabilityRelaxation.CreLoginID = AppSettings.LoggedUserId;
				$scope.BasicPhysDisabilityRelaxation.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = BasicPhysDisabilityRelaxationService.PostBasicPhysDisabilityRelaxationListInsert(BasicPhysDisabilityRelaxation);
				getPromise.then(function (msg) {
					alert("Added successfully!!");
					RedirectToListPage();
					$scope.isupdatableDisable = false;
				}, function (error) {
					$scope.isupdatableDisable = false;
					alert(error);
				});
			}
			else {
				$scope.isupdatableDisable = false;
			}
		}
		function CheckValidation() {
			return true;
		}
		$scope.Exit = function () {
			RedirectToListPage();
		}
		function RedirectToListPage() {
			$state.go('Masters.BasicPhysDisabilityRelaxationList');
		}
		//});
	});
});