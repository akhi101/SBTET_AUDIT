define(['app'], function (app) {
	app.controller("BasicExamSubjectController", function ($scope, $state, $stateParams, AppSettings, BasicExamSubjectService, BasicExamService, BasicSubjectService, BasicEvalGradeService, BasicCourseService, BasicExamService) {
		$scope.BasicExamSubject = { ExmSubID: $stateParams.ExmSubID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicExamSubjectRightsdata = [];
		BasicExamSubjectRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicExamSubjectRightsdata.length; i++) {
			if (BasicExamSubjectRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicExamSubject.CollegeID == 0) {
					if (BasicExamSubjectRightsdata[i].isaddable == 'Y') {
						$scope.isupdatableDisable = false;
					} else {
						$scope.isupdatableDisable = true;
					}
					$scope.isdeletableDisable = true;
				} else {
					if (BasicExamSubjectRightsdata[i].isupdatable == 'Y') {
						$scope.isupdatableDisable = false;
					}
					else {
						$scope.isupdatableDisable = true;
					}
					if (BasicExamSubjectRightsdata[i].isdeletable == 'Y') {
						$scope.isdeletableDisable = false;
					} else {
						$scope.isdeletableDisable = true;
					}
				}
			}
		}
		$scope.DisableExamAndSubject = false;
		var BasicCourseList = BasicCourseService.GetBasicCourseList();
		BasicCourseList.then(function (CourseData, status, headers, config, error) {
			$scope.BasicCourseList = CourseData;
			var BasicExamList = BasicExamService.GetExamListByCourseID(0);
			BasicExamList.then(function (ExamData, status, headers, config, error) {
				$scope.BasicExamList = ExamData;
				var BasicSubjectList = BasicSubjectService.GetBasicSubjectByCourseID(0);
				BasicSubjectList.then(function (BasicSubjectData, status, headers, config, error) {
					$scope.BasicSubjectList = BasicSubjectData;
					var BasicEvalGradeList = BasicEvalGradeService.GetBasicEvalGradeList();
					BasicEvalGradeList.then(function (BasicEvalGradeData, status, headers, config, error) {
						$scope.BasicEvalGradeList = BasicEvalGradeData;
						if ($scope.BasicExamSubject.ExmSubID > 0) {
							var BasicExamSubjectdata = BasicExamSubjectService.GetBasicExamSubjectListByID($scope.BasicExamSubject.ExmSubID);
							BasicExamSubjectdata.then(function (data) {
								$scope.BasicExamSubject = data[0];
								$scope.DisableExamAndSubject = true;
								if ($scope.BasicExamSubject.OrdinanceFlag == "Y") {
									$scope.BasicExamSubject.OrdinanceFlag = true;
								} else {
									$scope.BasicExamSubject.OrdinanceFlag = false;
								}
								if ($scope.BasicExamSubject.RevaluationFlag == "Y") {
									$scope.BasicExamSubject.RevaluationFlag = true;
								} else {
									$scope.BasicExamSubject.RevaluationFlag = false;
								}
								if ($scope.BasicExamSubject.CodeFlag == "Y") {
									$scope.BasicExamSubject.CodeFlag = true;
								} else {
									$scope.BasicExamSubject.CodeFlag = false;
								}
								if ($scope.BasicExamSubject.IncludeInExamTotalFlag == "Y") {
									$scope.BasicExamSubject.IncludeInExamTotalFlag = true;
								} else {
									$scope.BasicExamSubject.IncludeInExamTotalFlag = false;
								}
								if ($scope.BasicExamSubject.MarkGradeConversionFlag == "Y") {
									$scope.BasicExamSubject.MarkGradeConversionFlag = true;
								} else {
									$scope.BasicExamSubject.MarkGradeConversionFlag = false;
								}
								if ($scope.BasicExamSubject.Scalingapplicableflag == "Y") {
									$scope.BasicExamSubject.Scalingapplicableflag = true;
								} else {
									$scope.BasicExamSubject.Scalingapplicableflag = false;
								}
							}, function (error) {
								alert(error);
							});
						}
					}, function (BasicEvalGradeData, status, headers, config) {
						alert(error);
					});
				}, function (BasicSubjectData, status, headers, config) {
					alert(error);
				});
			}, function (ExamData, status, headers, config) {
				alert(error);
			})
		}, function (CourseData, status, headers, config) {
			alert(error);
		});
		$scope.GetExamList = function (CourseID) {
			$scope.DisableExamAndSubject = false;
			FillExam(CourseID);
			FillSubject(CourseID);
		}
		function FillExam(CourseID) {
			var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
			BasicExamList.then(function (ExamData, status, headers, config, error) {
				$scope.BasicExamList = ExamData;
			}, function (ExamData, status, headers, config) {
				alert(error);
			})
		}
		function FillSubject(CourseID) {
			var BasicSubjectList = BasicSubjectService.GetBasicSubjectByCourseID(CourseID);
			BasicSubjectList.then(function (BasicSubjectData, status, headers, config, error) {
				$scope.BasicSubjectList = BasicSubjectData;
			}, function (BasicSubjectData, status, headers, config) {
				alert(error);
			});
		}

		$scope.SaveBasicExamSubject = function () {
			$scope.isupdatableDisable = true;
			if ($scope.BasicExamSubject.ExmSubID == undefined) { $scope.BasicExamSubject.ExmSubID = 0; }
			//if ($scope.BasicExamSubject.EvalGrdID == undefined) { $scope.BasicExamSubject.EvalGrdID = 0; }
			if (CheckValidation() == true) {
				if ($scope.BasicExamSubject.OrdinanceFlag == true) {
					$scope.BasicExamSubject.OrdinanceFlag = "Y";
				} else {
					$scope.BasicExamSubject.OrdinanceFlag = "N";
				}
				if ($scope.BasicExamSubject.RevaluationFlag == true) {
					$scope.BasicExamSubject.RevaluationFlag = "Y";
				} else {
					$scope.BasicExamSubject.RevaluationFlag = "N";
				}
				if ($scope.BasicExamSubject.CodeFlag == true) {
					$scope.BasicExamSubject.CodeFlag = "Y";
				} else {
					$scope.BasicExamSubject.CodeFlag = "N";
				}
				if ($scope.BasicExamSubject.IncludeInExamTotalFlag == true) {
					$scope.BasicExamSubject.IncludeInExamTotalFlag = "Y";
				} else {
					$scope.BasicExamSubject.IncludeInExamTotalFlag = "N";
				}
				if ($scope.BasicExamSubject.MarkGradeConversionFlag == true) {
					$scope.BasicExamSubject.MarkGradeConversionFlag = "Y";
				} else {
					$scope.BasicExamSubject.MarkGradeConversionFlag = "N";
				}
				if ($scope.BasicExamSubject.Scalingapplicableflag == true) {
					$scope.BasicExamSubject.Scalingapplicableflag = "Y";
				} else {
					$scope.BasicExamSubject.Scalingapplicableflag = "N";
				}
				if ($scope.BasicExamSubject.ExmSubID == 0) {
					$scope.BasicExamSubject.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicExamSubject.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicExamSubjectService.PostBasicExamSubjectInsert($scope.BasicExamSubject);
					getPromise.then(function (msg) {
						alert("Added successfully!!");
						RedirectToListPage();
					}, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"ExmSubCode","Message":"Duplicate Exam Subject Code"},{"Id":"ExmSubName","Message":"Duplicate Exam Subject Name"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmSubName","Message":"Duplicate Exam Subject Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmSubCode","Message":"Duplicate Exam Subject Code"}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
					});
				}
				else {
					$scope.BasicExamSubject.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicExamSubjectService.UpdateBasicExamSubject($scope.BasicExamSubject);
					getPromise.then(function (msg) {
						alert("Update successfully!!");
						RedirectToListPage();
					}, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"ExmSubCode","Message":"Duplicate Exam Subject Code"},{"Id":"ExmSubName","Message":"Duplicate Exam Subject Name"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmSubName","Message":"Duplicate Exam Subject Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmSubCode","Message":"Duplicate Exam Subject Code"}]') {
                            alert("Code must be unique");
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
		$scope.DeleteBasicExamSubject = function () {
			var getData = BasicExamSubjectService.DeleteBasicExamSubject($scope.BasicExamSubject.ExmSubID, AppSettings.LoggedUserId);
			getData.then(function (msg) {
				alert('Record Deleted');
				RedirectToListPage();
			}, function (error) {
				alert(error);
			});
		}
		function CheckValidation() {
			if (($scope.BasicExamSubject.ExamID == undefined) || ($scope.BasicExamSubject.ExamID == 0)) {
				alert("select Exam");
				return false;
			}
			if (($scope.BasicExamSubject.SubjectID == undefined) || ($scope.BasicExamSubject.SubjectID == 0)) {
				alert("select Subject");
				return false;
			}
			if (($scope.BasicExamSubject.ExmSubName == undefined) || ($scope.BasicExamSubject.ExmSubName == "")) {
				alert("Enter Exam Subject Name ");
				return false;
			}
			if (($scope.BasicExamSubject.ExmSubCode == undefined) || ($scope.BasicExamSubject.ExmSubCode == "")) {
				alert("Enter Exam Subject Code");
				return false;
			}
			if (($scope.BasicExamSubject.MaxMarks == undefined) || ($scope.BasicExamSubject.MaxMarks == 0)) {
				alert("Enter Max Marks");
				return false;
			}
			if (($scope.BasicExamSubject.PassMarks == undefined) || ($scope.BasicExamSubject.PassMarks == 0)) {
				alert("Enter Pass Marks");
				return false;
            }
            if ($scope.BasicExamSubject.PassMarks > $scope.BasicExamSubject.MaxMarks  ) {
                alert("Pass Marks must be less than Max Marks");
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
			$state.go('Masters.BasicExamSubjectList');
		}
	});
});
