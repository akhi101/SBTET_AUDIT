define(['app'], function (app) {
	app.controller("BasicMotherTongueController", function ($scope, $state, $stateParams, AppSettings, BasicMotherTongueService) {
        $scope.BasicMotherTongue = { MothTID: $stateParams.MothTID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicMotherTongueRightsdata = [];
        BasicMotherTongueRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicMotherTongueRightsdata.length; i++) {
            if (BasicMotherTongueRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicMotherTongue.MothTID == 0) {
                    if (BasicMotherTongueRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicMotherTongueRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicMotherTongueRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        if ($scope.BasicMotherTongue.MothTID > 0) {
			var BasicMotherTonguedata = BasicMotherTongueService.GetBasicMotherTongueById($scope.BasicMotherTongue.MothTID);
            BasicMotherTonguedata.then(function (data) {
                $scope.BasicMotherTongue = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicMotherTongue = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicMotherTongue.MothTID == undefined) { $scope.BasicMotherTongue.MothTID = 0; }
			if ($scope.BasicMotherTongue.MothTID == "") { $scope.BasicMotherTongue.MothTID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicMotherTongue.MothTID == 0) {
                    $scope.BasicMotherTongue.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicMotherTongue.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicMotherTongueService.PostBasicMotherTongueInsert($scope.BasicMotherTongue);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false; 
                        alert(error);
                    });
                }
                else {
                    $scope.BasicMotherTongue.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicMotherTongueService.UpdateBasicMotherTongue($scope.BasicMotherTongue);
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
		$scope.DeleteBasicMotherTongue = function () {
            var getData = BasicMotherTongueService.DeleteBasicMotherTongue($scope.BasicMotherTongue.MothTID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicMotherTongue.MothTName == undefined) || ($scope.BasicMotherTongue.MothTName == "")) {
				alert("Enter Mother Tongue Name ");
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
            $state.go('Masters.BasicMotherTongueList');
        }
    });
});
