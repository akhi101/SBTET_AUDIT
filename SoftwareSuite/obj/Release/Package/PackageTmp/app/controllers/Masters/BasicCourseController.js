define(['app'], function (app) {
	app.controller("BasicCourseController", function ($scope, $state, $stateParams, AppSettings, BasicCourseService) {
		$scope.BasicCourse = { CourseID: $stateParams.CourseID };
        var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicCourseRightsdata = [];
        BasicCourseRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicCourseRightsdata.length; i++) {
			if (BasicCourseRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicCourse.CourseID == 0) {
					if (BasicCourseRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
					if (BasicCourseRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
					if (BasicCourseRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
		}
		

		if ($scope.BasicCourse.CourseID > 0) {
			var BasicCoursedata = BasicCourseService.GetBasicCourseListByID($scope.BasicCourse.CourseID);
            BasicCoursedata.then(function (data) {
				$scope.BasicCourse = data[0];
            }, function (error) {
                alert(error);
            });
        }
		$scope.SaveBasicCourse = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicCourse.CourseID == undefined) { $scope.BasicCourse.CourseID = 0; }
            if (CheckValidation() == true) {
				if ($scope.BasicCourse.CourseID == 0) {
					$scope.BasicCourse.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicCourse.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicCourseService.PostBasicCourseInsert($scope.BasicCourse);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
					$scope.BasicCourse.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicCourseService.UpdateBasicCourse($scope.BasicCourse);
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
		$scope.DeleteBasicCourse = function () {
			var getData = BasicCourseService.DeleteBasicCourse($scope.BasicCourse.CourseID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicCourse.CourseName == undefined) || ($scope.BasicCourse.CourseName == "")) {
				alert("Enter Stream Name ");
                return false;
            }
            if (($scope.BasicCourse.CourseShrtName == undefined) || ($scope.BasicCourse.CourseShrtName == "")) {
                alert("Enter Stream Short Name");
                return false;
            }
			if (($scope.BasicCourse.CourseCode == undefined) || ($scope.BasicCourse.CourseCode == "")) {
                alert("Enter Stream Code");
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
			$state.go('Masters.BasicCourseList');
        }
    });
});
