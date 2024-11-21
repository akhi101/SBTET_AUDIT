define(['app'], function (app) {
	app.controller("BasicBranchController", function ($scope, $state, $stateParams, AppSettings, BasicBranchService, BasicCourseService) {
		$scope.BasicBranch = { BranchID: $stateParams.BranchID };
        var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicBranchRightsdata = [];
        BasicBranchRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicBranchRightsdata.length; i++) {
			if (BasicBranchRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicBranch.DistrictID == 0) {
					if (BasicBranchRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
					if (BasicBranchRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
					if (BasicBranchRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
		}
		var BasicCourseList = BasicCourseService.GetBasicCourseList();
		BasicCourseList.then(function (CourseData, status, headers, config, error) {
			$scope.BasicCourseList = CourseData;
        }, function (CourseData, status, headers, config) {
			alert(error);
		});

		if ($scope.BasicBranch.BranchID > 0) {
			var BasicBranchdata = BasicBranchService.GetBasicBranchListById($scope.BasicBranch.BranchID);
            BasicBranchdata.then(function (data) {
				$scope.BasicBranch = data[0];
            }, function (error) {
                alert(error);
            });
        }
		$scope.SaveBasicBranch = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicBranch.BranchID == undefined) { $scope.BasicBranch.BranchID = 0; }
			if ($scope.BasicBranch.BranchID == "") { $scope.BasicBranch.BranchID = 0; }
            if (CheckValidation() == true) {
				if ($scope.BasicBranch.BranchID == 0) {
					$scope.BasicBranch.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicBranch.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicBranchService.PostBasicBranchInsert($scope.BasicBranch);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
					$scope.BasicBranch.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicBranchService.UpdateBasicBranch($scope.BasicBranch);
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
		$scope.DeleteBasicBranch = function () {
			var getData = BasicBranchService.DeleteBasicBranch($scope.BasicBranch.BranchID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicBranch.BranchName == undefined) || ($scope.BasicBranch.BranchName == "")) {
				alert("Enter Branch Name ");
                return false;
            }
			if (($scope.BasicBranch.BranchCode == undefined) || ($scope.BasicBranch.BranchCode == "")) {
				alert("Enter Branch Code");
                return false;
            }
            if (($scope.BasicBranch.CourseID == undefined) || ($scope.BasicBranch.CourseID == 0)) {
                alert("Select Stream");
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
			$state.go('Masters.BasicBranchList');
        }
    });
});
