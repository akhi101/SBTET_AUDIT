define(['app'], function (app) {
    app.controller("BasicCasteController", function ($scope, $state, $stateParams, AppSettings, BasicCasteService) {
        $scope.BasicCaste = { CasteID: $stateParams.CasteID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicCasteRightsdata = [];
        BasicCasteRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicCasteRightsdata.length; i++) {
            if (BasicCasteRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicCaste.CasteID == 0) {
                    if (BasicCasteRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicCasteRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicCasteRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        if ($scope.BasicCaste.CasteID > 0) {
            var BasicCastedata = BasicCasteService.GetBasicCasteById($scope.BasicCaste.CasteID);
            BasicCastedata.then(function (data) {
                $scope.BasicCaste = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicCaste = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicCaste.CasteID == undefined) { $scope.BasicCaste.CasteID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicCaste.CasteID == 0) {
                    $scope.BasicCaste.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicCaste.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicCasteService.PostBasicCasteInsert($scope.BasicCaste);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"CasteName","Message":"Duplicate Name"},{"Id":"CasteCode","Message":"Duplicate Code"}]')
                        {
                            alert("Caste Name and Code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"CasteName","Message":"Duplicate Name"}]') {
                            alert("Caste Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"CasteCode","Message":"Duplicate Code"}]') {
                            alert("Caste code must be unique");
                            return;
                        }
                        else {
                        alert(error);}
                    });
                }
                else {
                    $scope.BasicCaste.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicCasteService.UpdateBasicCaste($scope.BasicCaste);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"CasteName","Message":"Duplicate Name"},{"Id":"CasteCode","Message":"Duplicate Code"}]') {
                            alert("Caste Name and Code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"CasteName","Message":"Duplicate Name"}]') {
                            alert("Caste Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"CasteCode","Message":"Duplicate Code"}]') {
                            alert('Code must be unique');
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
        $scope.DeleteBasicCaste = function () {
            var getData = BasicCasteService.DeleteBasicCaste($scope.BasicCaste.CasteID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicCaste.CasteName == undefined) || ($scope.BasicCaste.CasteName == "")) {
                alert("Enter Name");
                return false;
            }
			if (($scope.BasicCaste.CasteCode == undefined) || ($scope.BasicCaste.CasteCode == "")) {
                alert("Enter Code");
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
            $state.go('Masters.BasicCasteList');
        }
    });
});
