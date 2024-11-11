define(['app'], function (app) {
    app.controller("BasicSpclConsiderationsController", function ($scope, $state, $stateParams, AppSettings, BasicSpclConsiderationsService) {
        $scope.BasicSpclConsiderations = { SpclConsID: $stateParams.SpclConsID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicSpclConsiderationsRightsdata = [];
        BasicSpclConsiderationsRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicSpclConsiderationsRightsdata.length; i++) {
            if (BasicSpclConsiderationsRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicSpclConsiderations.SpclConsID == 0) {
                    if (BasicSpclConsiderationsRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicSpclConsiderationsRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicSpclConsiderationsRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicSpclConsiderations.SpclConsID > 0) {
            var BasicSpclConsiderationsdata = BasicSpclConsiderationsService.GetBasicSpclConsiderationsById($scope.BasicSpclConsiderations.SpclConsID);
            BasicSpclConsiderationsdata.then(function (data) {
                $scope.BasicSpclConsiderations = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicSpclConsiderations = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicSpclConsiderations.SpclConsID == undefined) { $scope.BasicSpclConsiderations.SpclConsID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicSpclConsiderations.SpclConsID == 0) {
                    $scope.BasicSpclConsiderations.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicSpclConsiderations.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSpclConsiderationsService.PostBasicSpclConsiderations($scope.BasicSpclConsiderations);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"SpclConsName","Message":"Duplicate Name"},{"Id":"SpclConsCode","Message":"Duplicate Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"SpclConsName","Message":"Duplicate Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"SpclConsCode","Message":"Duplicate Code"}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicSpclConsiderations.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSpclConsiderationsService.UpdateBasicSpclConsiderations($scope.BasicSpclConsiderations);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"SpclConsName","Message":"Duplicate Name"},{"Id":"SpclConsCode","Message":"Duplicate Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"SpclConsName","Message":"Duplicate Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"SpclConsCode","Message":"Duplicate Code"}]') {
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
        $scope.DeleteBasicSpclConsiderations = function () {
            var getData = BasicSpclConsiderationsService.DeleteBasicSpclConsiderations($scope.BasicSpclConsiderations.SpclConsID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicSpclConsiderations.SpclConsName == undefined) || ($scope.BasicSpclConsiderations.SpclConsName == "")) {
                alert("Enter Special Considerations Name ");
                return false;
            }
            if (($scope.BasicSpclConsiderations.SpclConsCode == undefined) || ($scope.BasicSpclConsiderations.SpclConsCode == "")) {
                alert("Enter Special Considerations Code");
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
            $state.go('Masters.BasicSpclConsiderationsList');
        }
    });
});
