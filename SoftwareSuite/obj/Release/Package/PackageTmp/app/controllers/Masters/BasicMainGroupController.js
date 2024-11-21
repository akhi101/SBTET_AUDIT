define(['app'], function (app) {
	app.controller("BasicMainGroupController", function ($scope, $state, $stateParams, AppSettings, BasicMainGroupService, BasicExamService, BasicBranchService, BasicCourseService) {
		$scope.BasicMainGroup = { MainGrpID: $stateParams.MainGrpID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicMainGroupRightsdata = [];
		BasicMainGroupRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicMainGroupRightsdata.length; i++) {
			if (BasicMainGroupRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicMainGroup.MainGrpID == 0) {
					if (BasicMainGroupRightsdata[i].isaddable == 'Y') {
						$scope.isupdatableDisable = false;
					} else {
						$scope.isupdatableDisable = true;
					}
					$scope.isdeletableDisable = true;
				} else {
					if (BasicMainGroupRightsdata[i].isupdatable == 'Y') {
						$scope.isupdatableDisable = false;
					}
					else {
						$scope.isupdatableDisable = true;
					}
					if (BasicMainGroupRightsdata[i].isdeletable == 'Y') {
						$scope.isdeletableDisable = false;
					} else {
						$scope.isdeletableDisable = true;
					}
				}
			}
		}

		//     if ($scope.BasicMainGroup.MainGrpID > 0) {
		//var BasicMainGroupdata = BasicMainGroupService.GetBasicMainGroupById($scope.BasicMainGroup.MainGrpID);
		//         BasicMainGroupdata.then(function (data) {
		//             $scope.BasicMainGroup = data[0];
		//         }, function (error) {
		//             alert(error);
		//         });
		//     }
		$scope.DisableExamAndBranch = false;
		var BasicCourseList = BasicCourseService.GetBasicCourseList();
		BasicCourseList.then(function (CourseData, status, headers, config, error) {
			$scope.BasicCourseList = CourseData;
			var BasicExamList = BasicExamService.GetExamListByCourseID(0);
			BasicExamList.then(function (ExamData, status, headers, config, error) {
				$scope.BasicExamList = ExamData;
				var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
				BasicBranchList.then(function (BranchData, status, headers, config, error) {
					$scope.BasicBranchList = BranchData;
					if ($scope.BasicMainGroup.MainGrpID > 0) {
						var BasicMainGroupdata = BasicMainGroupService.GetBasicMainGroupById($scope.BasicMainGroup.MainGrpID);
						BasicMainGroupdata.then(function (data) {
							$scope.BasicMainGroup = data[0];
							$scope.DisableExamAndBranch = true;
						}, function (error) {
							alert(error);
						});
					}
				}, function (BranchData, status, headers, config) {
					alert(error);
				});
			}, function (ExamData, status, headers, config) {
				alert(error);
			});
		}, function (CourseData, status, headers, config) {
			alert(error);
		});

		$scope.GetExamList = function (CourseID) {
			$scope.DisableExamAndBranch = false;
			FillExam(CourseID);
			FillBranch(CourseID);
		}
		function FillExam(CourseID) {
			var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
			BasicExamList.then(function (ExamData, status, headers, config, error) {
				$scope.BasicExamList = ExamData;
			}, function (ExamData, status, headers, config) {
				alert(error);
			})
		}
		function FillBranch(CourseID) {
			var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(CourseID);
			BasicBranchList.then(function (BranchData, status, headers, config, error) {
				$scope.BasicBranchList = BranchData;
			}, function (BranchData, status, headers, config) {
				alert(error);
			})
		}

		//var BasicExamList = BasicExamService.GetBasicExamList();
		//BasicExamList.then(function (ExamData, status, headers, config, error) {
		//	$scope.BasicExamList = ExamData;
		//}, function (ExamData, status, headers, config) {
		//	alert(error);
		//	});
		//var BasicBranchList = BasicBranchService.GetBasicBranchList();
		//BasicBranchList.then(function (BrancData, status, headers, config, error) {
		//	$scope.BasicBranchList = BrancData;
		//}, function (BrancData, status, headers, config) {
		//	alert(error);
		//});

		$scope.SaveBasicMainGroup = function () {
			$scope.isupdatableDisable = true;
			if ($scope.BasicMainGroup.MainGrpID == undefined) { $scope.BasicMainGroup.MainGrpID = 0; }
			if (CheckValidation() == true) {
				if ($scope.BasicMainGroup.MainGrpID == 0) {
					$scope.BasicMainGroup.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicMainGroup.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicMainGroupService.PostBasicMainGroupInsert($scope.BasicMainGroup);
					getPromise.then(function (msg) {
						alert("Added successfully!!");
						RedirectToListPage();
					}, function (error) {
						$scope.isupdatableDisable = false;
						alert(error);
					});
				}
				else {
					$scope.BasicMainGroup.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicMainGroupService.UpdateBasicMainGroup($scope.BasicMainGroup);
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
		$scope.DeleteBasicMainGroup = function () {
			var getData = BasicMainGroupService.DeleteBasicMainGroup($scope.BasicMainGroup.MainGrpID, AppSettings.LoggedUserId);
			getData.then(function (msg) {
				alert('Record Deleted');
				RedirectToListPage();
			}, function (error) {
				alert(error);
			});
		}
		function CheckValidation() {
			if (($scope.BasicMainGroup.ExamID == undefined) || ($scope.BasicMainGroup.PcktName == 0)) {
				alert(" Please Select Exam  ");
				return false;
			}
			if (($scope.BasicMainGroup.BranchID == undefined) || ($scope.BasicMainGroup.BranchID == 0)) {
				alert(" Please Select Branch  ");
				return false;
			}
			if (($scope.BasicMainGroup.MainGrpName == undefined) || ($scope.BasicMainGroup.MainGrpName == "")) {
				alert("Enter Main Group Name ");
				return false;
			}
			if (($scope.BasicMainGroup.MainGrpName == undefined) || ($scope.BasicMainGroup.MainGrpName == "")) {
				alert("Enter Main Group Name ");
				return false;
			}
			if (($scope.BasicMainGroup.MaxNoofPaper == undefined) || ($scope.BasicMainGroup.MaxNoofPaper == "")) {
				alert(" Enter Max Number of Paper ");
				return false;
			}
			if (($scope.BasicMainGroup.MainNoofPaper == undefined) || ($scope.BasicMainGroup.MainNoofPaper == "")) {
				alert(" Enter Minimum Number of Paper ");
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
			$state.go('Masters.BasicMainGroupList');
		}
	});
});
