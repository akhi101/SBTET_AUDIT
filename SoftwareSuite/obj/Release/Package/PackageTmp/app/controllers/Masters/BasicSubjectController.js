define(['app'], function (app) {
	app.controller("BasicSubjectController", function ($scope, $state, $stateParams, AppSettings, BasicSubjectService, BasicBranchService, BasicCourseService) {
        $scope.BasicSubject = { SubjectID: $stateParams.SubjectID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicSubjectRightsdata = [];
        BasicSubjectRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicSubjectRightsdata.length; i++) {
            if (BasicSubjectRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicSubject.SubjectID == 0) {
                    if (BasicSubjectRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicSubjectRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicSubjectRightsdata[i].isdeletable == 'Y') {
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
			if ($scope.BasicSubject.SubjectID > 0) {
				var BasicSubjectdata = BasicSubjectService.GetBasicSubjectBySubjectID($scope.BasicSubject.SubjectID);
				BasicSubjectdata.then(function (data) {
					$scope.BasicSubject = data[0];
				}, function (error) {
					alert(error);
				});
			}
		}, function (Castdata, status, headers, config) {
			alert(error);
		});
        $scope.SaveBasicSubject = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicSubject.SubjectID == undefined) { $scope.BasicSubject.SubjectID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicSubject.SubjectID == 0) {
                    $scope.BasicSubject.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicSubject.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSubjectService.AddBasicSubject($scope.BasicSubject);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicSubject.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSubjectService.UpdateBasicSubject($scope.BasicSubject);
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
        $scope.DeleteBasicSubject = function () {
			var getData = BasicSubjectService.DeleteBasicSubject($scope.BasicSubject.SubjectID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicSubject.SubName == undefined) || ($scope.BasicSubject.SubName == "")) {
                alert("Enter Subject Name");
                return false;
            }
            if (($scope.BasicSubject.SubCode == undefined) || ($scope.BasicSubject.SubCode == "")) {
                alert("Enter Subject Code");
                return false;
            }
            if (($scope.BasicSubject.CourseID == undefined) || ($scope.BasicSubject.CourseID == 0)) {
                alert("Please Select Stream");
                return false;
            }
            if (($scope.BasicSubject.SubType == undefined) || ($scope.BasicSubject.SubType == "")) {
                alert("Please Select Subject Type");
                return false;
            }
            if (($scope.BasicSubject.SubStatus == undefined) || ($scope.BasicSubject.SubStatus == "")) {
                alert("Please Select Subject Status");
                return false;
            }
            if (($scope.BasicSubject.SubExtStatus == undefined) || ($scope.BasicSubject.SubExtStatus == "")) {
                alert("Please Select Subject External Status");
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
            $state.go('Masters.BasicSubjectList');
        }
    });
});
