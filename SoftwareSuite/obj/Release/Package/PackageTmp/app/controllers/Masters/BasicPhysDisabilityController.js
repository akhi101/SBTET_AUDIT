define(['app'], function (app) {
	app.controller("BasicPhysDisabilityController", function ($scope, $state, $stateParams, AppSettings, BasicPhysDisabilityService) {
        $scope.BasicPhysDisability = { PhysDisbID: $stateParams.PhysDisbID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicPhysDisabilityRightsdata = [];
        BasicPhysDisabilityRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicPhysDisabilityRightsdata.length; i++) {
            if (BasicPhysDisabilityRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicPhysDisability.PhysDisbID == 0) {
                    if (BasicPhysDisabilityRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicPhysDisabilityRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicPhysDisabilityRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicPhysDisability.PhysDisbID > 0) {
			var BasicPhysDisabilitydata = BasicPhysDisabilityService.GetBasicPhysDisabilityListByID($scope.BasicPhysDisability.PhysDisbID);
            BasicPhysDisabilitydata.then(function (data) {
                $scope.BasicPhysDisability = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicPhysDisability = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicPhysDisability.PhysDisbID == undefined) { $scope.BasicPhysDisability.PhysDisbID = 0; }
			if ($scope.BasicPhysDisability.PhysDisbID == "") { $scope.BasicPhysDisability.PhysDisbID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicPhysDisability.PhysDisbID == 0) {
                    $scope.BasicPhysDisability.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicPhysDisability.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicPhysDisabilityService.PostBasicPhysDisabilityInsert($scope.BasicPhysDisability);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"PhysDisbName","Message":"Duplicate Physical Disability Name"}]')
                        {
                            alert('Name must be unique');
                        } else { 
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicPhysDisability.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicPhysDisabilityService.UpdateBasicPhysDisability($scope.BasicPhysDisability);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"PhysDisbName","Message":"Duplicate Physical Disability Name"}]')
                        {
                            alert('Name must be unique');
                        } else {
                            alert(error);
                        }
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicPhysDisability = function () {
			var getData = BasicPhysDisabilityService.DeleteBasicPhysDisability($scope.BasicPhysDisability.PhysDisbID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicPhysDisability.PhysDisbName == undefined) || ($scope.BasicPhysDisability.PhysDisbName == "")) {
				alert("Enter Physical Disability Name ");
                return false;
            }
			if (($scope.BasicPhysDisability.PhysDisbCode == undefined) || ($scope.BasicPhysDisability.PhysDisbCode == "")) {
				alert("Enter Physical Disability Code");
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
            $state.go('Masters.BasicPhysDisabilityList');
        }
    });
});
