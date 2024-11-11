define(['app'], function (app) {
    app.controller("BasicEduBoardsController", function ($scope, $state, $stateParams, AppSettings, BasicEduBoardsService, BasicStateService) {
        $scope.BasicEduBoards = { EduBoardID: $stateParams.EduBoardID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicEduBoardsRightsdata = [];
        BasicEduBoardsRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicEduBoardsRightsdata.length; i++) {
            if (BasicEduBoardsRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicEduBoards.EduBoardID == 0) {
                    if (BasicEduBoardsRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicEduBoardsRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicEduBoardsRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var BasicStateList = BasicStateService.GetBasicStateList();
        BasicStateList.then(function (StateData, status, headers, config, error) {
            $scope.BasicStateList = StateData;
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        if ($scope.BasicEduBoards.EduBoardID > 0) {
            var BasicEduBoardsdata = BasicEduBoardsService.GetBasicEduBoardsById($scope.BasicEduBoards.EduBoardID);
            BasicEduBoardsdata.then(function (data) {
                $scope.BasicEduBoards = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicEduBoards = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicEduBoards.EduBoardID == undefined) { $scope.BasicEduBoards.EduBoardID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicEduBoards.EduBoardID == 0) {
                    $scope.BasicEduBoards.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicEduBoards.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicEduBoardsService.AddBasicEduBoards($scope.BasicEduBoards);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicEduBoards.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicEduBoardsService.UpdateBasicEduBoards($scope.BasicEduBoards);
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
        $scope.DeleteBasicEduBoards = function () {
            var getData = BasicEduBoardsService.DeleteBasicEduBoards($scope.BasicEduBoards.EduBoardID, AppSettings.LoggedUserId, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicEduBoards.EduName == undefined) || ($scope.BasicEduBoards.EduName == "")) {
                alert("Enter Education Name ");
                return false;
            }
            if (($scope.BasicEduBoards.EduCode == undefined) || ($scope.BasicEduBoards.EduCode == "")) {
                alert("Enter Education Code");
                return false;
            }
            if (($scope.BasicEduBoards.StateID == undefined) || ($scope.BasicEduBoards.StateID == 0)) {
                alert("Select state");
                return false;
            }
            if (($scope.BasicEduBoards.EducBoardType == undefined) || ($scope.BasicEduBoards.EducBoardType == "")) {
                alert("Eneter Education Board Type");
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
            $state.go('Masters.BasicEduBoardsList');
        }
    });
});
