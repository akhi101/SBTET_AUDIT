define(['app'], function (app) {
    app.controller("BasicFeesController", function ($scope, $state, $stateParams, AppSettings, BasicFeesService) {
        $scope.BasicFees = { FeesID: $stateParams.FeesID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicFeesRightsdata = [];
        BasicFeesRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicFeesRightsdata.length; i++) {
            if (BasicFeesRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicFees.FeesID == 0) {
                    if (BasicFeesRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicFeesRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicFeesRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicFees.FeesID > 0) {
			var BasicFeesdata = BasicFeesService.GetBasicFeesById($scope.BasicFees.FeesID);
            BasicFeesdata.then(function (data) {
                $scope.BasicFees = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicFees = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicFees.FeesID == undefined) { $scope.BasicFees.FeesID = 0; }
			if ($scope.BasicFees.FeesID == "") { $scope.BasicFees.FeesID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicFees.FeesID == 0) {
                    $scope.BasicFees.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicFees.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicFeesService.PostBasicFeesInsert($scope.BasicFees);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"FeesName","Message":"Duplicate Name"},{"Id":"FeesCode","Message":"Duplicate Fees Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"FeesName","Message":"Duplicate Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"FeesCode","Message":"Duplicate Fees Code"}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else { alert(error); }
                    });
                }
                else {
                    $scope.BasicFees.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicFeesService.UpdateBasicFees($scope.BasicFees);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"FeesName","Message":"Duplicate Name"},{"Id":"FeesCode","Message":"Duplicate Fees Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"FeesName","Message":"Duplicate Name"}]') {
                            alert("Name must be unique");
                            return;
                        } 
                        if (error == '[{"Id":"FeesCode","Message":"Duplicate Fees Code"}]') {
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
        $scope.DeleteBasicFees = function () {
            var getData = BasicFeesService.DeleteBasicFees($scope.BasicFees.FeesID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicFees.FeesName == undefined) || ($scope.BasicFees.FeesName == "")) {
                alert("Enter Fees Name ");
                return false;
            }
            if (($scope.BasicFees.CollectedForFlag == undefined) || ($scope.BasicFees.CollectedForFlag == "")) {
                alert("Enter Collected For Flag");
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
            $state.go('Masters.BasicFeesList');
        }
    });
});
