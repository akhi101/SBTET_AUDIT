define(['app'], function (app) {
    app.controller("BasicIncomeGroupsController", function ($scope, $state, $stateParams, AppSettings, BasicIncomeGroupsService) {
        $scope.BasicIncomeGroups = { IncGrpID: $stateParams.IncGrpID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicIncomeGroupsRightsdata = [];
        BasicIncomeGroupsRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicIncomeGroupsRightsdata.length; i++) {
            if (BasicIncomeGroupsRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicIncomeGroups.IncGrpID == 0) {
                    if (BasicIncomeGroupsRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicIncomeGroupsRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicIncomeGroupsRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicIncomeGroups.IncGrpID > 0) {
            var BasicIncomeGroupsdata = BasicIncomeGroupsService.GetBasicIncomeGroupsById($scope.BasicIncomeGroups.IncGrpID);
            BasicIncomeGroupsdata.then(function (data) {
                $scope.BasicIncomeGroups = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicIncomeGroups = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicIncomeGroups.IncGrpID == undefined) { $scope.BasicIncomeGroups.IncGrpID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicIncomeGroups.IncGrpID == 0) {
                    $scope.BasicIncomeGroups.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicIncomeGroups.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicIncomeGroupsService.PostBasicIncomeGroupsInsert($scope.BasicIncomeGroups);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"IncGrpame","Message":"Duplicate Name"},{"Id":"IncGrpCode","Message":"Duplicate Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"IncGrpame","Message":"Duplicate Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"IncGrpCode","Message":"Duplicate Code"}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicIncomeGroups.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicIncomeGroupsService.UpdateBasicIncomeGroups($scope.BasicIncomeGroups);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"IncGrpame","Message":"Duplicate Name"},{"Id":"IncGrpCode","Message":"Duplicate Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"IncGrpame","Message":"Duplicate Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"IncGrpCode","Message":"Duplicate Code"}]') {
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
        $scope.DeleteBasicIncomeGroups = function () {
            var getData = BasicIncomeGroupsService.DeleteBasicIncomeGroups($scope.BasicIncomeGroups.IncGrpID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicIncomeGroups.IncGrpame == undefined) || ($scope.BasicIncomeGroups.IncGrpame == "")) {
                alert("Enter Income Groups Name ");
                return false;
            }
            if (($scope.BasicIncomeGroups.IncGrpCode == undefined) || ($scope.BasicIncomeGroups.IncGrpCode == "")) {
                alert("Enter Income Groups Code");
                return false;
            }
            if (($scope.BasicIncomeGroups.LowerLimit == undefined) || ($scope.BasicIncomeGroups.LowerLimit == "")) {
                $scope.BasicIncomeGroups.LowerLimit = 0;
            }
            if (($scope.BasicIncomeGroups.UpperLimit == undefined) || ($scope.BasicIncomeGroups.UpperLimit == "")) {
                $scope.BasicIncomeGroups.UpperLimit = 0;
            }
            if (($scope.BasicIncomeGroups.UpperLimit < $scope.BasicIncomeGroups.LowerLimit)) {
                alert("Upper limit must be greater than Lower Limit");
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
            $state.go('Masters.BasicIncomeGroupsList');
        }
    });
});
