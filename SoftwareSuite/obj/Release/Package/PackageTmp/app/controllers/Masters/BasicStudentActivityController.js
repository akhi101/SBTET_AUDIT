define(['app'], function (app) {
	app.controller("BasicStudentActivityController", function ($scope, $state, $stateParams, AppSettings, BasicStudentActivityService) {
        $scope.BasicStudentActivity = { StudActID: $stateParams.StudActID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicStudentActivityRightsdata = [];
        BasicStudentActivityRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicStudentActivityRightsdata.length; i++) {
            if (BasicStudentActivityRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicStudentActivity.StudActID == 0) {
                    if (BasicStudentActivityRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicStudentActivityRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicStudentActivityRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicStudentActivity.StudActID > 0) {
            var BasicStudentActivitydata = BasicStudentActivityService.GetBasicStudentActivityById($scope.BasicStudentActivity.StudActID);
            BasicStudentActivitydata.then(function (data) {
                $scope.BasicStudentActivity = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicStudentActivity = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicStudentActivity.StudActID == undefined) { $scope.BasicStudentActivity.StudActID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicStudentActivity.StudActID == 0) {
                    $scope.BasicStudentActivity.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicStudentActivity.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicStudentActivityService.PostBasicStudentActivity($scope.BasicStudentActivity);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"StudActName","Message":"Duplicate Student Activity Name"}]') {
                            alert("Name must be unique");
                            return;
                        } else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicStudentActivity.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicStudentActivityService.UpdateBasicStudentActivity($scope.BasicStudentActivity);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"StudActName","Message":"Duplicate Student Activity Name"}]') {
                            alert("Name must be unique");
                            return;
                        } else {
                            alert(error);
                        }
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicStudentActivity = function () {
            var getData = BasicStudentActivityService.DeleteBasicStudentActivity($scope.BasicStudentActivity.StudActID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicStudentActivity.StudActName == undefined) || ($scope.BasicStudentActivity.StudActName == "")) {
				alert("Enter Student Activity Name ");
                return false;
            }
			if (($scope.BasicStudentActivity.StudActCode == undefined) || ($scope.BasicStudentActivity.StudActCode == "")) {
				alert("Enter Student Activity Code");
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
            $state.go('Masters.BasicStudentActivityList');
        }
    });
});
