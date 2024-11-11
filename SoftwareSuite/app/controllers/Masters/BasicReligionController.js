define(['app'], function (app) {
    app.controller("BasicReligionController", function ($scope, $state, $stateParams, AppSettings, BasicReligionService) {
        $scope.BasicReligion = { ReligionID: $stateParams.ReligionID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicReligionRightsdata = [];
        BasicReligionRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicReligionRightsdata.length; i++) {
            if (BasicReligionRightsdata[i].ListFormReligionName == PageNm) {
                if ($scope.BasicReligion.ReligionID == 0) {
                    if (BasicReligionRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicReligionRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicReligionRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        if ($scope.BasicReligion.ReligionID > 0) {
            var BasicReligiondata = BasicReligionService.GetBasicReligionByReligionID($scope.BasicReligion.ReligionID);
            BasicReligiondata.then(function (data) {
                $scope.BasicReligion = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicReligion = function () {
            $scope.isupdatableDisable = true;
            $scope.BasicReligion.ReligionID = $stateParams.ReligionID;
            if ($scope.BasicReligion.ReligionID == "") { $scope.BasicReligion.ReligionID = 0; }
            if (CheckValReligionIDation() == true) {
                if ($scope.BasicReligion.ReligionID == 0) {
                    $scope.BasicReligion.CreLoginReligionID = AppSettings.LoggedUserId;
                    $scope.BasicReligion.UpdLoginReligionID = AppSettings.LoggedUserId;
                    var getPromise = BasicReligionService.AddBasicReligion($scope.BasicReligion);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicReligion.UpdLoginReligionID = AppSettings.LoggedUserId;
                    var getPromise = BasicReligionService.UpdateBasicReligion($scope.BasicReligion);
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
        $scope.DeleteBasicReligion = function () {
            var getData = BasicReligionService.DeleteBasicReligion($scope.BasicReligion.ReligionID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValReligionIDation() {
            if (($scope.BasicReligion.RelgName == undefined) || ($scope.BasicReligion.RelgName == "")) {
                alert("Enter ReligionName");
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
            $state.go('Masters.BasicReligionList');
        }
    });
});
