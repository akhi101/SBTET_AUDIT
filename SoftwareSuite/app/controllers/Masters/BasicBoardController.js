define(['app'], function (app) {
	app.controller("BasicBoardController", function ($scope, $state, $stateParams, AppSettings, BasicBoardService) {
        $scope.BasicBoard = { BoardID: $stateParams.BoardID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicBoardRightsdata = [];
        BasicBoardRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicBoardRightsdata.length; i++) {
            if (BasicBoardRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicBoard.BoardID == 0) {
                    if (BasicBoardRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicBoardRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicBoardRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicBoard.BoardID > 0) {
            var BasicBoarddata = BasicBoardService.GetBasicBoardById($scope.BasicBoard.BoardID);
            BasicBoarddata.then(function (data) {
                $scope.BasicBoard = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicBoard = function () {
            $scope.isupdatableDisable = true;
			if ($scope.BasicBoard.BoardID == undefined) { $scope.BasicBoard.BoardID = 0; }
			if ($scope.BasicBoard.BoardID == "") { $scope.BasicBoard.BoardID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicBoard.BoardID == 0) {
                    $scope.BasicBoard.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicBoard.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicBoardService.PostBasicBoardInsert($scope.BasicBoard);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false; 
                        alert(error);
                    });
                }
                else {
                    $scope.BasicBoard.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicBoardService.UpdateBasicBoard($scope.BasicBoard);
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
        $scope.DeleteBasicBoard = function () {
            var getData = BasicBoardService.DeleteBasicBoard($scope.BasicBoard.BoardID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
			if (($scope.BasicBoard.BoardName == undefined) || ($scope.BasicBoard.BoardName == "")) {
				alert("Enter Board Name ");
				return false;
			}
		    if (($scope.BasicBoard.BoardType == undefined) || ($scope.BasicBoard.BoardType == "")) {
				alert(" Select Board Type ");
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
            $state.go('Masters.BasicBoardList');
        }
    });
});
