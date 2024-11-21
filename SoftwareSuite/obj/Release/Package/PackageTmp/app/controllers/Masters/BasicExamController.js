define(['app'], function (app) {
	app.controller("BasicExamController", function ($scope, $state, $stateParams, AppSettings, BasicExamService,BasicCourseService) {
		$scope.BasicExam = { ExamID: $stateParams.ExamID };
        var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicExamRightsdata = [];
        BasicExamRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicExamRightsdata.length; i++) {
			if (BasicExamRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicExam.CollegeID == 0) {
					if (BasicExamRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
					if (BasicExamRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
					if (BasicExamRightsdata[i].isdeletable == 'Y') {
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
		}, function (Castdata, status, headers, config) {
			alert(error);
		})

		if ($scope.BasicExam.ExamID > 0) {
			var BasicExamdata = BasicExamService.GetBasicExamListByID($scope.BasicExam.ExamID);
            BasicExamdata.then(function (data) {
                $scope.BasicExam = data[0];
                if ($scope.BasicExam.ResultFlag == "Y") {
                    $scope.BasicExam.ResultFlag = true;
                } else {
                    $scope.BasicExam.ResultFlag = false;
                }
                if ($scope.BasicExam.OrdFlag == "Y") {
                    $scope.BasicExam.OrdFlag = true;
                } else {
                    $scope.BasicExam.OrdFlag = false;
                }
                if ($scope.BasicExam.ClassFlag == "Y") {
                    $scope.BasicExam.ClassFlag = true;
                } else {
                    $scope.BasicExam.ClassFlag = false;
                }
                if ($scope.BasicExam.GPAApplyFlag == "Y") {
                    $scope.BasicExam.GPAApplyFlag = true;
                } else {
                    $scope.BasicExam.GPAApplyFlag = false;
                }
                if ($scope.BasicExam.SylApplicable == "Y") {
                    $scope.BasicExam.SylApplicable = true;
                } else {
                    $scope.BasicExam.SylApplicable = false;
                }
                if ($scope.BasicExam.ScaleFlag == "Y") {
                    $scope.BasicExam.ScaleFlag = true;
                } else {
                    $scope.BasicExam.ScaleFlag = false;
                }
            }, function (error) {
                alert(error);
            });
        }
		$scope.SaveBasicExam = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicExam.ExamID == undefined) { $scope.BasicExam.ExamID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicExam.ResultFlag == true) {
                    $scope.BasicExam.ResultFlag = "Y";
                } else {
                    $scope.BasicExam.ResultFlag = "N";
                }
                if ($scope.BasicExam.OrdFlag == true) {
                    $scope.BasicExam.OrdFlag = "Y";
                } else {
                    $scope.BasicExam.OrdFlag = "N";
                }
                if ($scope.BasicExam.ClassFlag == true) {
                    $scope.BasicExam.ClassFlag = "Y";
                } else {
                    $scope.BasicExam.ClassFlag = "N";
                }
                if ($scope.BasicExam.GPAApplyFlag == true) {
                    $scope.BasicExam.GPAApplyFlag = "Y";
                } else {
                    $scope.BasicExam.GPAApplyFlag = "N";
                }
                if ($scope.BasicExam.SylApplicable == true) {
                    $scope.BasicExam.SylApplicable = "Y";
                } else {
                    $scope.BasicExam.SylApplicable = "N";
                }
                if ($scope.BasicExam.ScaleFlag == true) {
                    $scope.BasicExam.ScaleFlag = "Y";
                } else {
                    $scope.BasicExam.ScaleFlag = "N";
                }
				if ($scope.BasicExam.ExamID == 0) {
					$scope.BasicExam.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicExam.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicExamService.PostBasicExamInsert($scope.BasicExam);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"ExmName","Message":"Duplicate Name"},{"Id":"ExmCode","Message":"Duplicate Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmName","Message":"Duplicate Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmCode","Message":"Duplicate Code"}]') {
                            alert("Ccode must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
                    });
                }
                else {
					$scope.BasicExam.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicExamService.UpdateBasicExam($scope.BasicExam);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"ExmName","Message":"Duplicate Name"},{"Id":"ExmCode","Message":"Duplicate Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmName","Message":"Duplicate Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmCode","Message":"Duplicate Code"}]') {
                            alert("Ccode must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
		$scope.DeleteBasicExam = function () {
			var getData = BasicExamService.DeleteBasicExam($scope.BasicExam.ExamID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicExam.CourseID == undefined) || ($scope.BasicExam.CourseID == 0)) {
                alert("Select Stream ");
                return false;
            }
            if (($scope.BasicExam.ExmName == undefined) || ($scope.BasicExam.ExmName == "")) {
				alert("Enter Exam Name ");
                return false;
            }
            if (($scope.BasicExam.ExmShrtName == undefined) || ($scope.BasicExam.ExmShrtName == "")) {
                alert("Enter Exam Short Name ");
                return false;
            }
			if (($scope.BasicExam.ExmCode == undefined) || ($scope.BasicExam.ExmCode == "")) {
				alert("Enter Exam Code");
                return false;
            }
            if (($scope.BasicExam.SequenceNo == undefined) || ($scope.BasicExam.SequenceNo == 0)) {
                alert("Enter Sequence No ");
                return false;
            }
            if (($scope.BasicExam.MaxAttemptsToComplete == undefined) || ($scope.BasicExam.MaxAttemptsToComplete == 0)) {
                alert("Enter Max Attempt ");
                return false;
            }
            if (($scope.BasicExam.ScalingPercentage == undefined) || ($scope.BasicExam.ScalingPercentage == 0)) {
                alert("Enter Scaling Percentage ");
                return false;
            }
            if (($scope.BasicExam.ScalingPercentage == undefined) || ($scope.BasicExam.ScalingPercentage == 0)) {
                alert("Enter Scaling Percentage ");
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
			$state.go('Masters.BasicExamList');
        }
    });
});
