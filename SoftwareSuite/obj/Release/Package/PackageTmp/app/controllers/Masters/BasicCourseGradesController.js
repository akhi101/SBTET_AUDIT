define(['app'], function (app) {
	app.controller("BasicCourseGradesController", function ($scope, $state, $stateParams, AppSettings, BasicCourseGradesService, BasicCourseService, BasicEvalGradeService) {
		$scope.BasicCourseGrades = { CoGradeID: $stateParams.CoGradeID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicCourseGradesRightsdata = [];
		BasicCourseGradesRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicCourseGradesRightsdata.length; i++) {
			if (BasicCourseGradesRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicCourseGrades.CoGradeID == 0) {
					if (BasicCourseGradesRightsdata[i].isaddable == 'Y') {
						$scope.isupdatableDisable = false;
					} else {
						$scope.isupdatableDisable = true;
					}
					$scope.isdeletableDisable = true;
				} else {
					if (BasicCourseGradesRightsdata[i].isupdatable == 'Y') {
						$scope.isupdatableDisable = false;
					}
					else {
						$scope.isupdatableDisable = true;
					}
					if (BasicCourseGradesRightsdata[i].isdeletable == 'Y') {
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

		var BasicEvalGradeList = BasicEvalGradeService.GetBasicEvalGradeList();
		BasicEvalGradeList.then(function (BasicEvalGradeData, status, headers, config, error) {
			$scope.BasicEvalGradeList = BasicEvalGradeData;
		}, function (Castdata, status, headers, config) {
			alert(error);
		})
		//var BasicFinalGradeList = BasicFinalGradeService.GetBasicFinalGradeList();
		//BasicFinalGradeList.then(function (FinalGradeData, status, headers, config, error) {
		//	$scope.BasicFinalGradeList = FinalGradeData;
		//      }, function (Castdata, status, headers, config) {
		//          alert(error);
		//      })

		if ($scope.BasicCourseGrades.CoGradeID > 0) {
			var BasicCourseGradesdata = BasicCourseGradesService.GetBasicCourseGradesListByID($scope.BasicCourseGrades.CoGradeID);
			BasicCourseGradesdata.then(function (data) {
				$scope.BasicCourseGrades = data[0];
			}, function (error) {
				alert(error);
			});
		}
		$scope.SaveBasicCourseGrades = function () {
			$scope.isupdatableDisable = true;
			if ($scope.BasicCourseGrades.CoGradeID == undefined) { $scope.BasicCourseGrades.CoGradeID = 0; }
			if (CheckValidation() == true) {
				if ($scope.BasicCourseGrades.CoGradeID == 0) {
					$scope.BasicCourseGrades.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicCourseGrades.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicCourseGradesService.PostBasicCourseGradesInsert($scope.BasicCourseGrades);
					getPromise.then(function (msg) {
						alert("Added successfully!!");
						RedirectToListPage();
					}, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"GrdName","Message":"Duplicate Course Grade Name"}]') {
                            alert("Stream Grade must be unique");
                            return;
                        }
                        if (error == '[{"Id":"CourseID","Message":"Course Not Found"}]') {
                            alert("Stream Not Found");
                            return;
                        }
                        if (error == '[{"Id":"FinalGrdID","Message":"Final Grade Not Found"}]') {
                            alert("Final Grade Not Found");
                            return;
                        }
                        else {
                            alert(error);
                        }
					});
				}
				else {
					$scope.BasicCourseGrades.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicCourseGradesService.UpdateBasicCourseGrades($scope.BasicCourseGrades);
					getPromise.then(function (msg) {
						alert("Update successfully!!");
						RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"GrdName","Message":"Duplicate Course Grade Name"}]') {
                            alert("Stream Grade must be unique");
                            return;
                        }
                        if (error == '[{"Id":"CourseID","Message":"Course Not Found"}]') {
                            alert("Stream Not Found");
                            return;
                        }
                        if (error == '[{"Id":"FinalGrdID","Message":"Final Grade Not Found"}]') {
                            alert("Final Grade Not Found");
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
		$scope.DeleteBasicCourseGrades = function () {
			var getData = BasicCourseGradesService.DeleteBasicCourseGrades($scope.BasicCourseGrades.CoGradeID, AppSettings.LoggedUserId);
			getData.then(function (msg) {
				alert('Record Deleted');
				RedirectToListPage();
			}, function (error) {
				alert(error);
			});
		}
		function CheckValidation() {
			if (($scope.BasicCourseGrades.CourseID == undefined) || ($scope.BasicCourseGrades.CourseID == 0)) {
				alert("Please Select Stream");
				return false;
			}
			if (($scope.BasicCourseGrades.EvalGrdID == undefined) || ($scope.BasicCourseGrades.EvalGrdID == 0)) {
				alert("Please Select Grade");
				return false;
			}
			if (($scope.BasicCourseGrades.GrdName == undefined) || ($scope.BasicCourseGrades.GrdName == "")) {
				alert("Enter Stream Grade Name");
				return false;
			}
            if (($scope.BasicCourseGrades.MaxMarks == undefined) || ($scope.BasicCourseGrades.MaxMarks == "")) {
                $scope.BasicCourseGrades.MaxMarks = 0;
				alert("Enter Max Mark's");
				return false;
			}
            if (($scope.BasicCourseGrades.MinMarks == undefined) || ($scope.BasicCourseGrades.MinMarks == "")) {
                $scope.BasicCourseGrades.MinMarks = 0;
				alert("Enter Min Mark's");
				return false;
            }
            if (($scope.BasicCourseGrades.MinMarks > $scope.BasicCourseGrades.MaxMarks)) {                 
                alert("Min Mark's must be less than Max Mark's");
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
			$state.go('Masters.BasicCourseGradesList');
		}
	});
});
