define(['app'], function (app) {
	app.controller("BasicCommunityController", function ($scope, $state, $stateParams, AppSettings, BasicCommunityService) {
        $scope.BasicCommunity = { CommunityID: $stateParams.CommunityID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicCommunityRightsdata = [];
        BasicCommunityRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicCommunityRightsdata.length; i++) {
            if (BasicCommunityRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicCommunity.BasicCommunityId == 0) {
                    if (BasicCommunityRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicCommunityRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicCommunityRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        if ($scope.BasicCommunity.CommunityID > 0) {
			var BasicCommunitydata = BasicCommunityService.GetBasicBasicCommunityByID($scope.BasicCommunity.CommunityID);
            BasicCommunitydata.then(function (data) {
                $scope.BasicCommunity = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicCommunity = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicCommunity.CommunityID == undefined) { $scope.BasicCommunity.CommunityID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicCommunity.CommunityID == 0) {
                    $scope.BasicCommunity.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicCommunity.UpdLoginID = AppSettings.LoggedUserId;
					var getPromise = BasicCommunityService.AddBasicCommunity($scope.BasicCommunity);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicCommunity.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicCommunityService.UpdateBasicCommunity($scope.BasicCommunity);
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
        $scope.DeleteBasicCommunity = function () {
            var getData = BasicCommunityService.DeleteBasicCommunity($scope.BasicCommunity.CommunityID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicCommunity.CommName == undefined) || ($scope.BasicCommunity.CommName == "")) {
				alert("Enter Community Name");
                return false;
            }
			if (($scope.BasicCommunity.CommCode == undefined) || ($scope.BasicCommunity.CommCode == "")) {
				alert("Enter Community Short Name");
                return false;
            }
            if (($scope.BasicCommunity.CommunityCode == undefined) || ($scope.BasicCommunity.CommunityCode == "")) {
                alert("Enter Community Code");
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
            $state.go('Masters.BasicCommunityList');
        }
    });
});
