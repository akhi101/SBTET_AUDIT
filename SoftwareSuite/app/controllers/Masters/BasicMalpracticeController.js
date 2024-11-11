define(['app'], function (app) {
	app.controller("BasicMalpracticeController", function ($scope, $state, $stateParams, AppSettings, BasicMalpracticeService) {
        $scope.BasicMalpractice = { MalPractID: $stateParams.MalPractID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicMalpracticeRightsdata = [];
        BasicMalpracticeRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicMalpracticeRightsdata.length; i++) {
            if (BasicMalpracticeRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicMalpractice.MalPractID == 0) {
                    if (BasicMalpracticeRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicMalpracticeRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicMalpracticeRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        if ($scope.BasicMalpractice.MalPractID > 0) {
            var BasicMalpracticedata = BasicMalpracticeService.GetBasicMalpracticeById($scope.BasicMalpractice.MalPractID);
            BasicMalpracticedata.then(function (data) {
                $scope.BasicMalpractice = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicMalpractice = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicMalpractice.MalPractID == undefined) { $scope.BasicMalpractice.MalPractID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicMalpractice.MalPractID == 0) {
                    $scope.BasicMalpractice.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicMalpractice.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicMalpracticeService.AddBasicMalpractice($scope.BasicMalpractice);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicMalpractice.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicMalpracticeService.UpdateBasicMalpractice($scope.BasicMalpractice);
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
        $scope.DeleteBasicMalpractice = function () {
            var getData = BasicMalpracticeService.DeleteBasicMalpractice($scope.BasicMalpractice.MalPractID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicMalpractice.MalPractName == undefined) || ($scope.BasicMalpractice.MalPractName == "")) {
                alert("Enter Name ");
                return false;
            }
            if (($scope.BasicMalpractice.MalPractCode == undefined) || ($scope.BasicMalpractice.MalPractCode == "")) {
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
			$state.go('Masters.BasicMalpracticeList');
        }
    });
});
