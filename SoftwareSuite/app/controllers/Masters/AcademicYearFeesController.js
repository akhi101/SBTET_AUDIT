define(['app'], function (app) {
    app.controller("AcademicYearFeesController", function ($scope, $state, $stateParams, AppSettings, AcademicYearFeesService, BasicFeesService) {
        $scope.AcademicYearFees = { AcdyrFeesID: $stateParams.AcdyrFeesID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var AcademicYearFeesRightsdata = [];
        AcademicYearFeesRightsdata = AppSettings.UserRights;
        for (var i = 0; i < AcademicYearFeesRightsdata.length; i++) {
            if (AcademicYearFeesRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.AcademicYearFees.AcdyrFeesID == 0) {
                    if (AcademicYearFeesRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (AcademicYearFeesRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (AcademicYearFeesRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        var AcdYearList = AcademicYearFeesService.GetAcademicYearListByAcdInstance();
        AcdYearList.then(function (CourseData, status, headers, config, error) {
            $scope.AcdYearList = CourseData;
            var BasicFeesList = BasicFeesService.GetBasicFeesList();
            BasicFeesList.then(function (CourseData, status, headers, config, error) {
                $scope.BasicFeesList = CourseData;
                if ($scope.AcademicYearFees.AcdyrFeesID > 0) {
                    var AcademicYearFeesdata = AcademicYearFeesService.GetAcademicYearFeesListByID($scope.AcademicYearFees.AcdyrFeesID);
                    AcademicYearFeesdata.then(function (data) {
                        $scope.AcademicYearFees = data[0];
                    }, function (error) {
                        alert(error);
                    });
                }
            }, function (Castdata, status, headers, config) {
                alert(error);
            })
        }, function (Castdata, status, headers, config) {
            alert(error);
            })

        
        
        $scope.SaveAcademicYearFees = function () {
            $scope.isupdatableDisable = true;
            if ($scope.AcademicYearFees.AcdyrFeesID == undefined) { $scope.AcademicYearFees.AcdyrFeesID = 0; }
            if ($scope.AcademicYearFees.AcdyrFeesID == "") { $scope.AcademicYearFees.AcdyrFeesID = 0; }
            if (CheckValidation() == true) {
                if ($scope.AcademicYearFees.AcdyrFeesID == 0) {
                    $scope.AcademicYearFees.CreLoginID = AppSettings.LoggedUserId;
                    $scope.AcademicYearFees.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = AcademicYearFeesService.AddAcademicYearFees($scope.AcademicYearFees);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.AcademicYearFees.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = AcademicYearFeesService.UpdateAcademicYearFees($scope.AcademicYearFees);
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
        $scope.DeleteAcademicYearFees = function () {
            var getData = AcademicYearFeesService.DeleteAcademicYearFees($scope.AcademicYearFees.AcdyrFeesID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {            
			if (($scope.AcademicYearFees.AcdscheduleID == undefined) || ($scope.AcademicYearFees.AcdscheduleID == 0)) {
				alert("Please Select Academic Year  ");
				return false;
			}
			if (($scope.AcademicYearFees.FeesID == undefined) || ($scope.AcademicYearFees.FeesID == 0)) {
				alert("Please Select Fees  ");
				return false;
			}
			if (($scope.AcademicYearFees.FeesAppliedFlag == undefined) || ($scope.AcademicYearFees.FeesAppliedFlag == "")) {
				alert("Please Select Fees Applied For  ");
				return false;
			}
			if (($scope.AcademicYearFees.FeesAmount == undefined) || ($scope.AcademicYearFees.FeesAmount == "")) {
				alert("Enter Fees Amount ");
				return false;
			}
			if (($scope.AcademicYearFees.LateFeesAmount == undefined) || ($scope.AcademicYearFees.LateFeesAmount == "")) {
				alert("Enter Late Fees Amount ");
				return false;
            }
            if ($scope.AcademicYearFees.LateFeesAmount < $scope.AcademicYearFees.FeesAmount) {
                alert("Late Fees Amount must be greater than Fee Amount");
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
            $state.go('Masters.AcademicYearFeesList');
        }
    });
});
