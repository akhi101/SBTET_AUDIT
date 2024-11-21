define(['app'], function (app) {
    app.controller("RiceMillController", function ($scope, $state, $stateParams, AppSettings, RiceMillService) {
        $scope.RiceMill = { RiceMillId: $stateParams.RiceMillId };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var RiceMillRightsdata = [];
        RiceMillRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RiceMillRightsdata.length; i++) {
            if (RiceMillRightsdata[i].ListFormName == PageNm) {
                if ($scope.RiceMill.RiceMillId == 0) {
                    if (RiceMillRightsdata[i].RollAdd == 'Y') {
                        $scope.RollEditDisable = false;
                    } else {
                        $scope.RollEditDisable = true;
                    }
                    $scope.RollDeleteDisable = true;
                } else {
                    if (RiceMillRightsdata[i].RollEdit == 'Y') {
                        $scope.RollEditDisable = false;
                    }
                    else {
                        $scope.RollEditDisable = true;
                    }
                    if (RiceMillRightsdata[i].RollDelete == 'Y') {    
                        $scope.RollDeleteDisable = false;
                    } else {
                        $scope.RollDeleteDisable = true;
                    }
                }
            }
        }
        if ($scope.RiceMill.RiceMillId > 0) {
            var RiceMilldata = RiceMillService.GetRiceMillById($scope.RiceMill.RiceMillId);
            RiceMilldata.then(function (data) {
                $scope.RiceMill = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveRiceMill = function () {
            $scope.RollEditDisable = true;
            if ($scope.RiceMill.RiceMillId == undefined) { $scope.RiceMill.RiceMillId = 0; }
            if (CheckValidation() == true) {
                $scope.RiceMill.RiceMillShortName = "";
                if ($scope.RiceMill.RiceMillId == 0) {
                    $scope.RiceMill.CrUserId = AppSettings.LoggedUserId;
                    var getPromise = RiceMillService.AddRiceMill($scope.RiceMill);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.RollEditDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.RiceMill.UpUserId = AppSettings.LoggedUserId;
                    var getPromise = RiceMillService.UpdateRiceMill($scope.RiceMill);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.RollEditDisable = false;
                        alert(error);
                    });
                }
            } else {
                $scope.RollEditDisable = false;
            }
        }
        $scope.DeleteRiceMill = function () {
            var getData = RiceMillService.GetCheckDependancy($scope.RiceMill.RiceMillId);
            getData.then(function (CheckDepandancyMsg) {
                if (CheckDepandancyMsg == "") {
                    var getData = RiceMillService.DeleteRiceMill($scope.RiceMill.RiceMillId);
                    getData.then(function (msg) {
                        alert('Record Deleted');
                        RedirectToListPage();
                    }, function (error) {
                        alert(error);
                    });
                }
                else {
                    alert(CheckDepandancyMsg);
                    RedirectToListPage();
                }
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if ($scope.RiceMill.RiceMillName == undefined) {
                alert("Enter Mill Name");
                return false;
            }
            if ($scope.RiceMill.ContactName == undefined) {
                alert("Enter Contact Name");
                return false;
            }
            if ($scope.RiceMill.ContactNumber == undefined) {
                alert("Enter Contact Number");
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
            $state.go('Admission.RiceMillList');
        }
    });
});
