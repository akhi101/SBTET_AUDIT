define(['app'], function (app) {
	app.controller("BasicCollegeStatusController", function ($scope, $state, $stateParams, AppSettings, BasicCollegeStatusService) {
		$scope.BasicCollegeStatus = { ColStatusID: $stateParams.ColStatusID };
        var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicCollegeStatusRightsdata = [];
        BasicCollegeStatusRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicCollegeStatusRightsdata.length; i++) {
			if (BasicCollegeStatusRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicCollegeStatus.ColStatusID == 0) {
					if (BasicCollegeStatusRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
					if (BasicCollegeStatusRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
					if (BasicCollegeStatusRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
		}
		if ($scope.BasicCollegeStatus.ColStatusID > 0) {
			var BasicCollegeStatusdata = BasicCollegeStatusService.GetBasicCollegeStatusByColStatusID($scope.BasicCollegeStatus.ColStatusID);
            BasicCollegeStatusdata.then(function (data) {
				$scope.BasicCollegeStatus = data[0];
            }, function (error) {
                alert(error);
            });
        }
		$scope.SaveBasicCollegeStatus = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicCollegeStatus.ColStatusID == undefined) { $scope.BasicCollegeStatus.ColStatusID = 0; }
            if (CheckValidation() == true) {
				if ($scope.BasicCollegeStatus.ColStatusID == 0) {
					$scope.BasicCollegeStatus.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicCollegeStatus.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicCollegeStatusService.PostBasicCollegeStatusInsert($scope.BasicCollegeStatus);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
					$scope.BasicCollegeStatus.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicCollegeStatusService.UpdateBasicCollegeStatus($scope.BasicCollegeStatus);
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
		$scope.DeleteBasicCollegeStatus = function () {
			var getData = BasicCollegeStatusService.DeleteBasicCollegeStatus($scope.BasicCollegeStatus.ColStatusID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicCollegeStatus.ColStatusName == undefined) || ($scope.BasicCollegeStatus.ColStatusName == "")) {
				alert("Enter College Status ");
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
			$state.go('Masters.BasicCollegeStatusList');
        }
    });
});
