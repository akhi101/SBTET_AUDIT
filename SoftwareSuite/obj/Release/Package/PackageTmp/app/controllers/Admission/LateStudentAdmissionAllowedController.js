define(['app'], function (app) {
    app.controller("LateStudentAdmissionAllowedController", function ($scope, $state, $stateParams, AppSettings, RegisterAdmittedStudentService, LateStudentAdmissionService) {
        $scope.LateStudentAdmission = { LateAdmID: $stateParams.LateAdmID };
        $scope.LateStudentAdmissionAllowed = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                if (UsersRightsdata[i].isaddable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        if ($scope.LateStudentAdmission.LateAdmID > 0) {
            var LateStudentAdmissiondata = LateStudentAdmissionService.GetLateStudAdmByID($scope.LateStudentAdmission.LateAdmID);
            LateStudentAdmissiondata.then(function (data) {
                $scope.LateStudentAdmissionAllowed = data[0];
                if (data[0].AdmType = 'S') {
                    $scope.LateStudentAdmissionAllowed.CheckSSC = true;
                } else {
                    $scope.LateStudentAdmissionAllowed.CheckEligibility = false;
                }
                var BranchList = RegisterAdmittedStudentService.GetBasicBranchList(data[0].CourseID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveLateStudentAdmissionAllowed = function () {
            $scope.RollEditDisable = true;
            if ($scope.LateStudentAdmissionAllowed.CheckSSC == true) {
                $scope.LateStudentAdmissionAllowed.CheckType = 'S';
            }
            else { $scope.LateStudentAdmissionAllowed.CheckType = 'E'; }
            var getPromise = RegisterAdmittedStudentService.CheckHallTicketNoPresent(AppSettings.AcdYrID, $scope.LateStudentAdmissionAllowed.SSCHallTicket);
            getPromise.then(function (data) {
                if (data == 1) {
                    alert("Hall Ticket No already present");
                    $scope.RollEditDisable = false;
                    return false;
                } else {
                    if (($scope.LateStudentAdmissionAllowed.BranchID == undefined) || ($scope.LateStudentAdmissionAllowed.BranchID == "")) {
                        $scope.LateStudentAdmissionAllowed.BranchID = 0;
                    }
                    $scope.LateStudentAdmissionAllowed.CreLoginID = AppSettings.LoggedUserId;
                    $scope.LateStudentAdmissionAllowed.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.LateStudentAdmissionAllowed.AcdYrID = AppSettings.AcdYrID;
                    $scope.LateStudentAdmissionAllowed.checkShedule = false;
                    var getPromise = RegisterAdmittedStudentService.PutSSCStudentDetails($scope.LateStudentAdmissionAllowed);
                    getPromise.then(function (msg) {
                        alert("Saved Successfully");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.RollEditDisable = false;
                        alert("Saved Error");
                    });
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission');
        }

        $scope.CheckSSC = function () {
            if ($scope.LateStudentAdmissionAllowed.CheckSSC == true) {
                $scope.LateStudentAdmissionAllowed.CheckEligibility = false;
            }
            else {
                $scope.LateStudentAdmissionAllowed.CheckEligibility = true;
            }
        }
        $scope.CheckEligibility = function () {
            if ($scope.LateStudentAdmissionAllowed.CheckEligibility == true) {
                $scope.LateStudentAdmissionAllowed.CheckSSC = false;
            }
            else {
                $scope.LateStudentAdmissionAllowed.CheckSSC = true;
            }
        }
    });
});
