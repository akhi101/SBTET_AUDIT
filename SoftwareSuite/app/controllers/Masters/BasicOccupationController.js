define(['app'], function (app) {
    app.controller("BasicOccupationController", function ($scope, $state, $stateParams, AppSettings, BasicOccupationService) {
        $scope.BasicOccupation = { OcupID: $stateParams.OcupID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicOccupationRightsdata = [];
        BasicOccupationRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicOccupationRightsdata.length; i++) {
            if (BasicOccupationRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicOccupation.OcupID == 0) {
                    if (BasicOccupationRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicOccupationRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicOccupationRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicOccupation.OcupID > 0) {
            var BasicOccupationdata = BasicOccupationService.GetBasicOccupationById($scope.BasicOccupation.OcupID);
            BasicOccupationdata.then(function (data) {
                $scope.BasicOccupation = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicOccupation = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicOccupation.OcupID == undefined) { $scope.BasicOccupation.OcupID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicOccupation.OcupID == 0) {
                    $scope.BasicOccupation.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicOccupation.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicOccupationService.PostBasicPacketInsert($scope.BasicOccupation);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"OcupName","Message":"Duplicate Name"},{"Id":"OcupCode","Message":"Duplicate Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"OcupName","Message":"Duplicate Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"OcupCode","Message":"Duplicate Code"}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicOccupation.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicOccupationService.UpdateBasicOccupation($scope.BasicOccupation);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"OcupName","Message":"Duplicate Name"},{"Id":"OcupCode","Message":"Duplicate Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"OcupName","Message":"Duplicate Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"OcupCode","Message":"Duplicate Code"}]') {
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
        $scope.DeleteBasicOccupation = function () {
            var getData = BasicOccupationService.DeleteBasicOccupation($scope.BasicOccupation.OcupID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicOccupation.OcupName == undefined) || ($scope.BasicOccupation.OcupName == "")) {
                alert("Enter Occupation Name ");
                return false;
            }
            if (($scope.BasicOccupation.OcupCode == undefined) || ($scope.BasicOccupation.OcupCode == "")) {
                alert("Enter Occupation Code");
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
            $state.go('Masters.BasicOccupationList');
        }
    });
});
