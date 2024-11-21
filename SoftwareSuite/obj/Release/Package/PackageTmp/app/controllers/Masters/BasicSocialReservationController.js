define(['app'], function (app) {
    app.controller("BasicSocialReservationController", function ($scope, $state, $stateParams, AppSettings, BasicSocialReservationService) {
        $scope.BasicSocialReservation = { SocResID: $stateParams.SocResID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicSocialReservationRightsdata = [];
        BasicSocialReservationRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicSocialReservationRightsdata.length; i++) {
            if (BasicSocialReservationRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicSocialReservation.SocResID == 0) {
                    if (BasicSocialReservationRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicSocialReservationRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicSocialReservationRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicSocialReservation.SocResID > 0) {
            var BasicSocialReservationdata = BasicSocialReservationService.GetBasicSocialReservationById($scope.BasicSocialReservation.SocResID);
            BasicSocialReservationdata.then(function (data) {
                $scope.BasicSocialReservation = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicSocialReservation = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicSocialReservation.SocResID == undefined) { $scope.BasicSocialReservation.SocResID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicSocialReservation.SocResID == 0) {
                    $scope.BasicSocialReservation.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicSocialReservation.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSocialReservationService.PostBasicSocialReservationInsert($scope.BasicSocialReservation);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"SocResName","Message":"Duplicate Area Name"},{"Id":"SocResCode","Message":"Duplicate Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"SocResName","Message":"Duplicate Area Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"SocResCode","Message":"Duplicate Code"}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicSocialReservation.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSocialReservationService.UpdateBasicSocialReservation($scope.BasicSocialReservation);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"SocResName","Message":"Duplicate Area Name"},{"Id":"SocResCode","Message":"Duplicate Code"}]') {
                            alert("Name and code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"SocResName","Message":"Duplicate Area Name"}]') {
                            alert("Name must be unique");
                            return;
                        } 
                        if (error == '[{"Id":"SocResCode","Message":"Duplicate Code"}]') {
                            alert("Code must be unique");
                            return;
                        } 
                        else {
                            alert(error);
                        }
                        
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicSocialReservation = function () {
            var getData = BasicSocialReservationService.DeleteBasicSocialReservation($scope.BasicSocialReservation.SocResID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicSocialReservation.SocResName == undefined) || ($scope.BasicSocialReservation.SocResName == "")) {
                alert("Enter Social Reservation Name ");
                return false;
            }
            if (($scope.BasicSocialReservation.SocResCode == undefined) || ($scope.BasicSocialReservation.SocResCode == "")) {
                alert("Enter Social Reservation Code");
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
            $state.go('Masters.BasicSocialReservationList');
        }
    });
});
