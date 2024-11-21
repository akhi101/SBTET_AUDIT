define(['app'], function (app) {
	app.controller("BasicCollegeController", function ($scope, $state, $stateParams, AppSettings, BasicCollegeService) {
		$scope.BasicCollege = { CollegeID: $stateParams.CollegeID };
        var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicCollegeRightsdata = [];
        BasicCollegeRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicCollegeRightsdata.length; i++) {
			if (BasicCollegeRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicCollege.CollegeID == 0) {
					if (BasicCollegeRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
					if (BasicCollegeRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
					if (BasicCollegeRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
		}
		

		if ($scope.BasicCollege.CollegeID > 0) {
			var BasicCollegedata = BasicCollegeService.GetBasicCollegeByCollegeID($scope.BasicCollege.CollegeID);
            BasicCollegedata.then(function (data) {
				$scope.BasicCollege = data[0];
            }, function (error) {
                alert(error);
            });
        }
		$scope.SaveBasicCollege = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicCollege.CollegeID == undefined) { $scope.BasicCollege.CollegeID = 0; }
            if (CheckValidation() == true) {
				if ($scope.BasicCollege.CollegeID == 0) {
					$scope.BasicCollege.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicCollege.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicCollegeService.PostBasicCollegeInsert($scope.BasicCollege);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
					$scope.BasicCollege.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicCollegeService.UpdateBasicCollege($scope.BasicCollege);
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
		$scope.DeleteBasicCollege = function () {
			var getData = BasicCollegeService.DeleteBasicCollege($scope.BasicCollege.CollegeID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicCollege.ColName == undefined) || ($scope.BasicCollege.ColName == "")) {
				alert("Enter College Name ");
                return false;
            }
            if (($scope.BasicCollege.ColShrtName == undefined) || ($scope.BasicCollege.ColShrtName == "")) {
                alert("Enter Short Name");
                return false;
            }
			if (($scope.BasicCollege.ColCode == undefined) || ($scope.BasicCollege.ColCode == "")) {
				alert("Enter College Code");
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
			$state.go('Masters.BasicCollegeList');
        }
    });
});
