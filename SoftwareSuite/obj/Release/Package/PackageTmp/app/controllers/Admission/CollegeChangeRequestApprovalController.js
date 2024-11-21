define(['app'], function (app) {
    app.controller("CollegeChangeRequestApprovalController", function ($filter, $http, $scope, $state, $stateParams, AppSettings, CollegeChangeRequestListService) {
        $scope.CollegeChangeRequestApproval = { CollegeChangeID: $stateParams.CollegeChangeID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var GroupChangeRightsdata = [];
        GroupChangeRightsdata = AppSettings.UserRights;
        for (var i = 0; i < GroupChangeRightsdata.length; i++) {
            if (GroupChangeRightsdata[i].GridFormToOpen == PageNm) {
                if (GroupChangeRightsdata[i].isupdatable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        var CollegeChangeList = CollegeChangeRequestListService.GetCollegeChangeRequestDataForApprovalByID($scope.CollegeChangeRequestApproval.CollegeChangeID);
        CollegeChangeList.then(function (data, status, headers, config, error) {
            $scope.CollegeChangeRequestApproval = data[0];
        }, function (error) {
            alert(error);
        });
        $scope.SaveAccept = function () {
            $scope.RollEditDisable = true;
            if ($scope.CollegeChangeRequestApproval.CollegeChangeID == undefined) { $scope.CollegeChangeRequestApproval.CollegeChangeID = 0; }
            if ($scope.CollegeChangeRequestApproval.CollegeChangeID != 0) {
                $scope.CollegeChangeRequestApproval.ReqApprovalD = AppSettings.LoggedUserId;
                $scope.CollegeChangeRequestApproval.ReqApproval = "Y";
                var getPromise = CollegeChangeRequestListService.GetUpdateCollegeChangeRequestApproval($scope.CollegeChangeRequestApproval.CollegeChangeID, "Y", $scope.CollegeChangeRequestApproval.ReqApprovalD,"");
                getPromise.then(function (data) {
                    $scope.RollEditDisable = true;
                    if (data == 0) {
                        alert("Request is accepted and Change the College");
                        RedirectToListPage();
                    } else if (data == 1) {
                        alert("College wise intake is full");
                        RedirectToListPage();
                    } else if (data == 2) {
                        alert("Request is Rejected");
                        RedirectToListPage();
                    }
                }, function (error) {
                    $scope.RollEditDisable = false;
                    alert(error);
                });
            }
        }
        $scope.SaveReject = function () {
            if (($scope.CollegeChangeRequestApproval.ReqRejectedReason == undefined) || ($scope.CollegeChangeRequestApproval.ReqRejectedReason == "")) {
                alert("Rejected Reason");
                return;
            }
            $scope.RollEditDisable = true;
            if ($scope.CollegeChangeRequestApproval.CollegeChangeID == undefined) { $scope.CollegeChangeRequestApproval.CollegeChangeID = 0; }
            if ($scope.CollegeChangeRequestApproval.CollegeChangeID != 0) {
                $scope.CollegeChangeRequestApproval.ReqApprovalD = AppSettings.LoggedUserId;
                $scope.CollegeChangeRequestApproval.ReqApproval = "R";
                var getPromise = CollegeChangeRequestListService.GetUpdateCollegeChangeRequestApproval($scope.CollegeChangeRequestApproval.CollegeChangeID, "R", $scope.CollegeChangeRequestApproval.ReqApprovalD, $scope.CollegeChangeRequestApproval.ReqRejectedReason);
                getPromise.then(function (data) {
                    $scope.RollEditDisable = true;
                    alert("Request is Rejected");
                    RedirectToListPage();
                }, function (error) {
                    $scope.RollEditDisable = false;
                    alert(error);
                });
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('AdmissionOther.CollegeChangeRequestApprovalList');
        }
    });
});

