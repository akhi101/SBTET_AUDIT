define(['app'], function (app) {
	app.controller("BasicSubCategoryController", function ($scope, $state, $stateParams, AppSettings, BasicSubCategoryService, BasicExamSubjectService, BasicEvalTypesService, BasicEvalGradeService) {
		$scope.BasicSubCategory = { SubCatID: $stateParams.SubCatID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var BasicSubCategoryRightsdata = [];
		BasicSubCategoryRightsdata = AppSettings.UserRights;
		for (var i = 0; i < BasicSubCategoryRightsdata.length; i++) {
			if (BasicSubCategoryRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.BasicSubCategory.SubCatID == 0) {
					if (BasicSubCategoryRightsdata[i].isaddable == 'Y') {
						$scope.isupdatableDisable = false;
					} else {
						$scope.isupdatableDisable = true;
					}
					$scope.isdeletableDisable = true;
				} else {
					if (BasicSubCategoryRightsdata[i].isupdatable == 'Y') {
						$scope.isupdatableDisable = false;
					}
					else {
						$scope.isupdatableDisable = true;
					}
					if (BasicSubCategoryRightsdata[i].isdeletable == 'Y') {
						$scope.isdeletableDisable = false;
					} else {
						$scope.isdeletableDisable = true;
					}
				}
			}
		}
		var BasicExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectList();
		BasicExamSubjectList.then(function (BasicExamSubjectData, status, headers, config, error) {
			$scope.BasicExamSubjectList = BasicExamSubjectData;
			var BasicEvalTypesList = BasicEvalTypesService.GetBasicEvalTypesList();
			BasicEvalTypesList.then(function (BasicEvalTypesData, status, headers, config, error) {
				$scope.BasicEvalTypesList = BasicEvalTypesData;
				var BasicEvalGradeList = BasicEvalGradeService.GetBasicEvalGradeList();
				BasicEvalGradeList.then(function (BasicEvalGradeData, status, headers, config, error) {
					$scope.BasicEvalGradeList = BasicEvalGradeData;
					if ($scope.BasicSubCategory.SubCatID > 0) {
						var BasicSubCategorydata = BasicSubCategoryService.GetBasicSubCategoryListByID($scope.BasicSubCategory.SubCatID);
						BasicSubCategorydata.then(function (data) {
							$scope.BasicSubCategory = data[0];
							if ($scope.BasicSubCategory.CodeFlag == "Y") {
								$scope.BasicSubCategory.CodeFlag = true;
							} else {
								$scope.BasicSubCategory.CodeFlag = false;
							}
							if ($scope.BasicSubCategory.MarkGradeConversionFlag == "Y") {
								$scope.BasicSubCategory.MarkGradeConversionFlag = true;
							} else {
								$scope.BasicSubCategory.MarkGradeConversionFlag = false;
							}
							if ($scope.BasicSubCategory.Scalingapplicableflag == "Y") {
								$scope.BasicSubCategory.Scalingapplicableflag = true;
							} else {
								$scope.BasicSubCategory.Scalingapplicableflag = false;
							}
						}, function (error) {
							alert(error);
						});
					}
				}, function (BasicExamSubjectData, status, headers, config) {
					alert(error);
				})
			}, function (BasicEvalTypesData, status, headers, config) {
				alert(error);
			})
		}, function (BasicEvalGradeData, status, headers, config) {
			alert(error);
		})

		$scope.SaveBasicSubCategory = function () {
			$scope.isupdatableDisable = true;
			if ($scope.BasicSubCategory.SubCatID == undefined) { $scope.BasicSubCategory.SubCatID = 0; }
			if ($scope.BasicSubCategory.EvalGrdID == undefined) { $scope.BasicSubCategory.EvalGrdID = 0; }
            if ($scope.BasicSubCategory.EvalGrdID == "") { $scope.BasicSubCategory.EvalGrdID = 0; }
            if ($scope.BasicSubCategory.EvalTypeID == undefined) { $scope.BasicSubCategory.EvalTypeID = 0; }
            if ($scope.BasicSubCategory.EvalTypeID == "") { $scope.BasicSubCategory.EvalTypeID = 0; }

            $scope.BasicSubCategory.EvalTypID = $scope.BasicSubCategory.EvalTypeID;
			if (CheckValidation() == true) {
				if ($scope.BasicSubCategory.CodeFlag == true) {
					$scope.BasicSubCategory.CodeFlag = "Y";
				} else {
					$scope.BasicSubCategory.CodeFlag = "N";
				}
				if ($scope.BasicSubCategory.MarkGradeConversionFlag == true) {
					$scope.BasicSubCategory.MarkGradeConversionFlag = "Y";
				} else {
					$scope.BasicSubCategory.MarkGradeConversionFlag = "N";
				}
				if ($scope.BasicSubCategory.Scalingapplicableflag == true) {
					$scope.BasicSubCategory.Scalingapplicableflag = "Y";
				} else {
					$scope.BasicSubCategory.Scalingapplicableflag = "N";
				}
				if ($scope.BasicSubCategory.SubCatID == 0) {
					$scope.BasicSubCategory.CreLoginID = AppSettings.LoggedUserId;
					$scope.BasicSubCategory.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSubCategoryService.PostBasicSubCategoryInsert($scope.BasicSubCategory);
					getPromise.then(function (msg) {
						alert("Added successfully!!");
						RedirectToListPage();
					}, function (error) {
						$scope.isupdatableDisable = false;
						alert(error);
					});
				}
				else {
					$scope.BasicSubCategory.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicSubCategoryService.UpdateBasicSubCategory($scope.BasicSubCategory);
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
		$scope.DeleteBasicSubCategory = function () {
			var getData = BasicSubCategoryService.DeleteBasicSubCategory($scope.BasicSubCategory.SubCatID, AppSettings.LoggedUserId);
			getData.then(function (msg) {
				alert('Record Deleted');
				RedirectToListPage();
			}, function (error) {
				alert(error);
			});
		}
		function CheckValidation() {
			if (($scope.BasicSubCategory.ExmSubID == undefined) || ($scope.BasicSubCategory.ExmSubID == 0)) {
				alert(" Please Select Exam Subject ");
				return false;
			}
			if (($scope.BasicSubCategory.EvalTypID == undefined) || ($scope.BasicSubCategory.EvalTypID == 0)) {
				alert(" Please Selct Evaluation Type ");
				return false;
			}
			if (($scope.BasicSubCategory.MaxMarks == undefined) || ($scope.BasicSubCategory.MaxMarks == "")) {
				alert(" Please Enter Max Mark's ");
				return false;
			}
			if (($scope.BasicSubCategory.PassMarks == undefined) || ($scope.BasicSubCategory.PassMarks == "")) {
				alert(" Please Enter Pass Mark's ");
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
			$state.go('Masters.BasicSubCategoryList');
		}
	});
});
