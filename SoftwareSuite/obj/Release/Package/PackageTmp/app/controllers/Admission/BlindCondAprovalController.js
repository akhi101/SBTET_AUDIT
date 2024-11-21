define(['app'], function (app) {
    app.controller("BlindCondAprovalController", function ($filter, $http, $scope, $state, $stateParams, AppSettings, BlindCondAprovalService, RegisterAdmittedStudentService) {
        $scope.BlindCondAproval = { StudRegID: $stateParams.StudRegID };
        var PageNm = $state.current.name.split(".")[1] + "";
        var BlindCondAprovalRightsdata = [];
        BlindCondAprovalRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BlindCondAprovalRightsdata.length; i++) {
            if (BlindCondAprovalRightsdata[i].GridFormToOpen == PageNm) {
                if (BlindCondAprovalRightsdata[i].isupdatable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        var StudentRegdata = BlindCondAprovalService.GetStudentRegById($scope.BlindCondAproval.StudRegID);
        StudentRegdata.then(function (data) {
            $scope.BlindCondAproval = data[0];
        }, function (error) {
            alert(error);
        });
        $scope.SaveBlindCondAproval = function () {
            $scope.RollEditDisable = true;
            if ($scope.BlindCondAproval.StudRegID == undefined) { $scope.BlindCondAproval.StudRegID = 0; }
            if ($scope.BlindCondAproval.StudRegID != 0) {
                $scope.BlindCondAproval.UpdLoginID = AppSettings.LoggedUserId;
                var getData = BlindCondAprovalService.GetUpdateBlindCondAproval($scope.BlindCondAproval.StudRegID, $scope.BlindCondAproval.UpdLoginID);
                getData.then(function (msg) {
                    alert('Approved Successfully');
                    RedirectToListPage();
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission.BlindCondAprovalList');
        }
    });
});

