define(['app'], function (app) {
	app.controller("AcademicScheduleController", function ($scope, $state, $stateParams, AppSettings, AcademicScheduleService, BasicAcademicYearService, BasicCourseService,BasicExamService, BasicBranchService) {
		$scope.AcademicSchedule = { AcdscheduleID: $stateParams.AcdscheduleID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var AcademicScheduleRightsdata = [];
		AcademicScheduleRightsdata = AppSettings.UserRights;
		for (var i = 0; i < AcademicScheduleRightsdata.length; i++) {
			if (AcademicScheduleRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.AcademicSchedule.AcdscheduleID == 0) {
					if (AcademicScheduleRightsdata[i].isaddable == 'Y') {
						$scope.isupdatableDisable = false;
					} else {
						$scope.isupdatableDisable = true;
					}
					$scope.isdeletableDisable = true;
				} else {
					if (AcademicScheduleRightsdata[i].isupdatable == 'Y') {
						$scope.isupdatableDisable = false;
					}
					else {
						$scope.isupdatableDisable = true;
					}
					if (AcademicScheduleRightsdata[i].isdeletable == 'Y') {
						$scope.isdeletableDisable = false;
					} else {
						$scope.isdeletableDisable = true;
					}
				}
			}
		}
		$("#RegStartDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
		$("#RegEndDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
		$("#LateFeeDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
		
		$scope.DisableExamAndBranch = false;
		var AcdYearList = BasicAcademicYearService.GetBasicAcademicYearList();
		AcdYearList.then(function (AcdYearData, status, headers, config, error) {
			$scope.AcdYearList = AcdYearData;
			var BasicCourseList = BasicCourseService.GetBasicCourseList();
			BasicCourseList.then(function (CourseData, status, headers, config, error) {
				$scope.BasicCourseList = CourseData;
				var ExamList = BasicExamService.GetExamListByCourseID(0);
				ExamList.then(function (ExamData, status, headers, config, error) {
					$scope.ExamList = ExamData;
					var BranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
					BranchList.then(function (BranchData, status, headers, config, error) {
						$scope.BranchList = BranchData;
						if ($scope.AcademicSchedule.AcdscheduleID > 0) {
							var AcademicScheduledata = AcademicScheduleService.GetAcademicScheduleByAcdscheduleID($scope.AcademicSchedule.AcdscheduleID);
							AcademicScheduledata.then(function (data) {
								$scope.AcademicSchedule = data[0];
								$scope.DisableExamAndBranch = true;
								if ($scope.AcademicSchedule.ApproveFlag == 'Y') {
									$scope.AcademicSchedule.ApproveFlag = true
								}
								else {
									$scope.AcademicSchedule.ApproveFlag = false
								}
								$("#RegStartDate").val($scope.AcademicSchedule.RegStartDate);
								$("#RegEndDate").val($scope.AcademicSchedule.RegEndDate);
								$("#LateFeeDate").val($scope.AcademicSchedule.LateFeeDate);
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
		}, function (AcdYearData, status, headers, config) {
			alert(error);
		});
		//var AcdYearList = BasicAcademicYearService.GetBasicAcademicYearList();
		//AcdYearList.then(function (AcdYeardata, status, headers, config, error) {
		//    $scope.AcdYearList = AcdYeardata;
		//}, function (AcdYeardata, status, headers, config) {
		//    alert(error);
		//});
		$scope.GetExamList = function (CourseID) {
			$scope.DisableExamAndBranch = false;
			FillExam(CourseID);
			FillBranch(CourseID);
		}
		function FillExam(CourseID) {
			//var ExamList = BasicExamService.GetBasicExamList();
			var ExamList = BasicExamService.GetExamListByCourseID(CourseID);
			ExamList.then(function (Examdata, status, headers, config, error) {
				$scope.ExamList = Examdata;
			}, function (Examdata, status, headers, config) {
				alert(error);
			});
		}
		function FillBranch(CourseID) {
			//var BranchList = BasicBranchService.GetBasicBranchList();
			var BranchList = BasicBranchService.GetBasicBranchListByCourseID(CourseID);
			BranchList.then(function (Branchdata, status, headers, config, error) {
				$scope.BranchList = Branchdata;
			}, function (Branchdata, status, headers, config) {
				alert(error);
			});
		}


		//if ($scope.AcademicSchedule.AcdscheduleID > 0) {
		//    var AcademicScheduledata = AcademicScheduleService.GetAcademicScheduleByAcdscheduleID($scope.AcademicSchedule.AcdscheduleID);
		//    AcademicScheduledata.then(function (data) {
		//        $scope.AcademicSchedule = data[0];
		//        if ($scope.AcademicSchedule.ApproveFlag == 'Y') {
		//            $scope.AcademicSchedule.ApproveFlag = true
		//        }
		//        else {
		//            $scope.AcademicSchedule.ApproveFlag = false
		//        }
		//        $("#RegStartDate").val($scope.AcademicSchedule.RegStartDate);
		//        $("#RegEndDate").val($scope.AcademicSchedule.RegEndDate);
		//        $("#LateFeeDate").val($scope.AcademicSchedule.LateFeeDate);
		//    }, function (error) {
		//        alert(error);
		//    });
		//}
		$scope.SaveAcademicSchedule = function () {
			$scope.isupdatableDisable = true;
			// $scope.AcademicSchedule.AcdYrID = 0;
			if ($scope.AcademicSchedule.ApproveFlag == true) {
				$scope.AcademicSchedule.ApproveFlag = 'Y'
			}
			else {
				$scope.AcademicSchedule.ApproveFlag = 'N'
			}
			$scope.AcademicSchedule.RegStartDate = $("#RegStartDate").val();
			$scope.AcademicSchedule.RegEndDate = $("#RegEndDate").val();
			$scope.AcademicSchedule.LateFeeDate = $("#LateFeeDate").val();


			if ($scope.AcademicSchedule.AcdscheduleID == undefined) { $scope.AcademicSchedule.AcdscheduleID = 0; }
			if (CheckValidation() == true) {
				if ($scope.AcademicSchedule.AcdscheduleID == 0) {
					$scope.AcademicSchedule.CreLoginID = AppSettings.LoggedUserId;
					$scope.AcademicSchedule.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = AcademicScheduleService.AddAcademicSchedule($scope.AcademicSchedule);
					getPromise.then(function (msg) {
						alert("Added successfully!!");
						RedirectToListPage();
					}, function (error) {
						$scope.isupdatableDisable = false;
						alert(error);
					});
				}
				else {
					$scope.AcademicSchedule.RegStartDate = $("#RegStartDate").val();
					$scope.AcademicSchedule.RegEndDate = $("#RegEndDate").val();
					$scope.AcademicSchedule.LateFeeDate = $("#LateFeeDate").val();
					$scope.AcademicSchedule.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = AcademicScheduleService.UpdateAcademicSchedule($scope.AcademicSchedule);
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
		$scope.DeleteAcademicSchedule = function () {
			var getData = AcademicScheduleService.DeleteAcademicSchedule($scope.AcademicSchedule.AcdscheduleID, AppSettings.LoggedUserId);
			getData.then(function (msg) {
				alert('Record Deleted');
				RedirectToListPage();
			}, function (error) {
				alert(error);
			});
		}
		function CheckValidation() {
			if (($scope.AcademicSchedule.AcdYrID == undefined) || ($scope.AcademicSchedule.AcdYrID == 0)) {
				alert("Select Academic Year");
				return false;
			}
			if (($scope.AcademicSchedule.ExamID == undefined) || ($scope.AcademicSchedule.ExamID == 0)) {
				alert("Please Select Exam ");
				return false;
			}
			if (($scope.AcademicSchedule.BranchID == undefined) || ($scope.AcademicSchedule.BranchID == 0)) {
				alert("Please Select Branch ");
				return false;
			}
			if (($scope.AcademicSchedule.RegStartDate == undefined) || ($scope.AcademicSchedule.RegStartDate == "")) {
				alert("Please Choose Start Date ");
				return false;
			}
			if (($scope.AcademicSchedule.RegEndDate == undefined) || ($scope.AcademicSchedule.RegEndDate == "")) {
				alert("Please Choose End Date ");
				return false;
			}
			if (($scope.AcademicSchedule.LateFeeDate == undefined) || ($scope.AcademicSchedule.LateFeeDate == "")) {
				alert("Please Choose Late Fee Date ");
				return false;
			}
			if (($scope.AcademicSchedule.ApproveFlag == undefined) || ($scope.AcademicSchedule.ApproveFlag == "N")) {
				alert("Please Select Approve Flag  ");
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
			$state.go('Masters.AcademicScheduleList');
		}
		//$scope.openCalendarFromDate = function () {
		//    $scope.AcademicSchedule.FromDateIsOpen = true;
		//}
	});
});
