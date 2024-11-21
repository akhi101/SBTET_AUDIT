define(['app'], function (app) {
    app.controller("BasicAcademicYearController", function ($scope, $state, $stateParams, AppSettings, BasicAcademicYearService) {
        $scope.BasicAcademicYear = { AcdYrID: $stateParams.AcdYrID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicAcademicYearRightsdata = [];
        BasicAcademicYearRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicAcademicYearRightsdata.length; i++) {
            if (BasicAcademicYearRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicAcademicYear.AcdYrID == 0) {
                    if (BasicAcademicYearRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicAcademicYearRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicAcademicYearRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
		}

		$("#StartDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
		$("#EndDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });

        if ($scope.BasicAcademicYear.AcdYrID > 0) {
            var BasicAcademicYeardata = BasicAcademicYearService.GetBasicAcademicYearListByID($scope.BasicAcademicYear.AcdYrID);
            BasicAcademicYeardata.then(function (data) {
                $scope.BasicAcademicYear = data[0];
                if ($scope.BasicAcademicYear.StatusFlag == 'Y') {
					$scope.BasicAcademicYear.StatusFlag = true

                }
                else {
                    $scope.BasicAcademicYear.StatusFlag = false
				}
				$("#StartDate").val($scope.BasicAcademicYear.StartDate);
				$("#EndDate").val($scope.BasicAcademicYear.EndDate);
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicAcademicYear = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicAcademicYear.StatusFlag == true) {
                $scope.BasicAcademicYear.StatusFlag = 'Y'
            }
            else {
                $scope.BasicAcademicYear.StatusFlag = 'N'
            }
			$scope.BasicAcademicYear.StartDate = $("#StartDate").val();
			$scope.BasicAcademicYear.EndDate = $("#EndDate").val();
            if ($scope.BasicAcademicYear.AcdYrID == undefined) { $scope.BasicAcademicYear.AcdYrID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicAcademicYear.AcdYrID == 0) {
                    $scope.BasicAcademicYear.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicAcademicYear.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicAcademicYearService.AddBasicAcademicYear($scope.BasicAcademicYear);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"AcdYrName","Message":"Duplicate Name"}]') {
                            alert("Academic Year must be unique");
                            return;
                        } else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicAcademicYear.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicAcademicYearService.UpdateBasicAcademicYear($scope.BasicAcademicYear);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"AcdYrName","Message":"Duplicate Name"}]') {
                            alert("Academic Year must be unique");
                            return;
                        } else {
                            alert(error);
                        }
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicAcademicYear = function () {
            var getData = BasicAcademicYearService.DeleteBasicAcademicYear($scope.BasicAcademicYear.AcdYrID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicAcademicYear.AcdYrName == undefined) || ($scope.BasicAcademicYear.AcdYrName == "")) {
				alert("Enter Academic Year Name");
				return false;
			}
			if (($scope.BasicAcademicYear.AcdYrCode == undefined) || ($scope.BasicAcademicYear.AcdYrCode == "")) {
				alert("Enter Academic Year Code");
				return false;
			}
			if (($scope.BasicAcademicYear.StartDate == undefined) || ($scope.BasicAcademicYear.StartDate == "")) {
				alert("Please Choose Start Date");
				return false;
			}
			if (($scope.BasicAcademicYear.EndDate == undefined) || ($scope.BasicAcademicYear.EndDate == "")) {
				alert("Please Choose End Date");
				return false;
			}
			if (($scope.BasicAcademicYear.StatusFlag == undefined) || ($scope.BasicAcademicYear.StatusFlag == "N")) {
				alert("Please Select Academic Year Applicable");
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
            $state.go('Masters.BasicAcademicYearList');
        }
        //$scope.openCalendarFromDate = function () {
        //    $scope.BasicAcademicYear.FromDateIsOpen = true;
        //}
    });
});
