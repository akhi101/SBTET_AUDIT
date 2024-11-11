define(['app'], function (app) {
    app.controller("BasicSubCasteController", function ($scope, $state, $stateParams, AppSettings, BasicSubCasteService, BasicCasteService) {
        $scope.BasicSubCaste = { SubCastID: $stateParams.SubCastID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicSubCasteRightsdata = [];
        BasicSubCasteRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicSubCasteRightsdata.length; i++) {
            if (BasicSubCasteRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicSubCaste.SubCastID == 0) {
                    if (BasicSubCasteRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicSubCasteRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicSubCasteRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
		}

		var BasicCasteList = BasicCasteService.GetBasicCasteList();
		BasicCasteList.then(function (CasteData, status, headers, config, error) {
			$scope.BasicCasteList = CasteData;
		}, function (Castdata, status, headers, config) {
			alert(error);
            });

        if ($scope.BasicSubCaste.SubCastID > 0) {
            var BasicSubCastedata = BasicSubCasteService.GetBasicSubCasteByID($scope.BasicSubCaste.SubCastID);
            BasicSubCastedata.then(function (data) {
                $scope.BasicSubCaste = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicSubCaste = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicSubCaste.SubCastID == undefined) { $scope.BasicSubCaste.SubCastID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicSubCaste.SubCastID == 0) {
                    $scope.BasicSubCaste.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicSubCaste.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSubCasteService.PostBasicSubCasteInsert($scope.BasicSubCaste);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"SubCastName","Message":"Duplicate Name"},{"Id":"SubCastCode","Message":"Duplicate Code"}]') {
                            alert("Sub Caste Name and Code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"SubCastName","Message":"Duplicate Name"}]') {
                            alert("Sub Caste must be unique");
                            return;
                        }
                        if (error == '[{"Id":"SubCastCode","Message":"Duplicate Code"}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicSubCaste.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSubCasteService.UpdateBasicSubCaste($scope.BasicSubCaste);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"SubCastName","Message":"Duplicate Name"},{"Id":"SubCastCode","Message":"Duplicate Code"}]') {
                            alert("Sub Caste Name and Code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"SubCastName","Message":"Duplicate Name"}]') {
                            alert("Sub Caste must be unique");
                            return;
                        }
                        if (error == '[{"Id":"SubCastCode","Message":"Duplicate Code"}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else { alert(error); }
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicSubCaste = function () {
            var getData = BasicSubCasteService.DeleteBasicSubCaste($scope.BasicSubCaste.SubCastID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
		function CheckValidation() {
			if (($scope.BasicSubCaste.CasteID == undefined) || ($scope.BasicSubCaste.CasteID == 0)) {
				alert(" Select Caste ");
				return false;
			}
			if (($scope.BasicSubCaste.SubCastName == undefined) || ($scope.BasicSubCaste.SubCastName == "")) {
				alert("Enter Sub-Caste Name");
                return false;
            }
			if (($scope.BasicSubCaste.SubCastCode == undefined) || ($scope.BasicSubCaste.SubCastCode == "")) {
				alert("Enter Sub-Caste Code");
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
            $state.go('Masters.BasicSubCasteList');
        }
    });
});
