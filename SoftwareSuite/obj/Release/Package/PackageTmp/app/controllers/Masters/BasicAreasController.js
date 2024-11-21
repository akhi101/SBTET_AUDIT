define(['app'], function (app) {
	app.controller("BasicAreasController", function ($scope, $state, $stateParams, AppSettings, BasicAreasService) {
        $scope.BasicAreas = { AreasID: $stateParams.AreasID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicAreasRightsdata = [];
        BasicAreasRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicAreasRightsdata.length; i++) {
            if (BasicAreasRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicAreas.AreasID == 0) {
                    if (BasicAreasRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicAreasRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicAreasRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicAreas.AreasID > 0) {
            var BasicAreasdata = BasicAreasService.GetBasicAreasById($scope.BasicAreas.AreasID);
            BasicAreasdata.then(function (data) {
                $scope.BasicAreas = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicAreas = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicAreas.AreasID == undefined) { $scope.BasicAreas.AreasID = 0; }
			if ($scope.BasicAreas.AreasID == "") { $scope.BasicAreas.AreasID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicAreas.AreasID == 0) {
                    $scope.BasicAreas.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicAreas.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicAreasService.PostBasicAreasInsert($scope.BasicAreas);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false; 
                        alert(error);
                    });
                }
                else {
                    $scope.BasicAreas.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicAreasService.UpdateBasicAreas($scope.BasicAreas);
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
        $scope.DeleteBasicAreas = function () {
            var getData = BasicAreasService.DeleteBasicAreas($scope.BasicAreas.AreasID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicAreas.AreaName == undefined) || ($scope.BasicAreas.AreaName == "")) {
				alert("Enter Area Name ");
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
            $state.go('Masters.BasicAreasList');
        }
    });
});
