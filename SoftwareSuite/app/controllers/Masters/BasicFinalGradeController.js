define(['app'], function (app) {
	app.controller("BasicFinalGradeController", function ($scope, $state, $stateParams, AppSettings, BasicFinalGradeService) {
        $scope.BasicFinalGrade = { FinalGrdID: $stateParams.FinalGrdID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicFinalGradeRightsdata = [];
        BasicFinalGradeRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicFinalGradeRightsdata.length; i++) {
            if (BasicFinalGradeRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicFinalGrade.FinalGrdID == 0) {
                    if (BasicFinalGradeRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicFinalGradeRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicFinalGradeRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicFinalGrade.FinalGrdID > 0) {
            var BasicFinalGradedata = BasicFinalGradeService.GetBasicFinalGradeById($scope.BasicFinalGrade.FinalGrdID);
            BasicFinalGradedata.then(function (data) {
                $scope.BasicFinalGrade = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicFinalGrade = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicFinalGrade.FinalGrdID == undefined) { $scope.BasicFinalGrade.FinalGrdID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicFinalGrade.FinalGrdID == 0) {
                    $scope.BasicFinalGrade.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicFinalGrade.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicFinalGradeService.AddBasicFinalGrade($scope.BasicFinalGrade);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"FinalGrdName","Message":"Duplicate Final Grade Name"}]') {
                            alert("Name must be unique");
                            return;
                        } else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicFinalGrade.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicFinalGradeService.UpdateBasicFinalGrade($scope.BasicFinalGrade);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"FinalGrdName","Message":"Duplicate Final Grade Name"}]') {
                            alert("Name must be unique");
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
        $scope.DeleteBasicFinalGrade = function () {
            var getData = BasicFinalGradeService.DeleteBasicFinalGrade($scope.BasicFinalGrade.FinalGrdID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicFinalGrade.FinalGrdName == undefined) || ($scope.BasicFinalGrade.FinalGrdName == "")) {
                alert("Enter Grade Name ");
                return false;
            }
			if (($scope.BasicFinalGrade.FinalGrdCode == undefined) || ($scope.BasicFinalGrade.FinalGrdCode == "")) {
				alert("Enter Grade Code");
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
            $state.go('Masters.BasicFinalGradeList');
        }
    });
});
