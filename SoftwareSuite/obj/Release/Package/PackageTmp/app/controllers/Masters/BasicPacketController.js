define(['app'], function (app) {
    app.controller("BasicPacketController", function ($scope, $state, $stateParams, AppSettings, BasicPacketService) {
        $scope.BasicPacket = { PcktID: $stateParams.PcktID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicPacketRightsdata = [];
        BasicPacketRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicPacketRightsdata.length; i++) {
            if (BasicPacketRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicPacket.PcktID == 0) {
                    if (BasicPacketRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicPacketRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicPacketRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicPacket.PcktID > 0) {
            var BasicPacketdata = BasicPacketService.GetBasicPacketById($scope.BasicPacket.PcktID);
            BasicPacketdata.then(function (data) {
                $scope.BasicPacket = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicPacket = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicPacket.PcktID == undefined) { $scope.BasicPacket.PcktID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicPacket.PcktID == 0) {
                    $scope.BasicPacket.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicPacket.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicPacketService.AddBasicPacket($scope.BasicPacket);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"PcktName","Message":"Duplicate Packet Name"}]') {
                            alert("Name must be unique");
                            return;
                        } else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicPacket.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicPacketService.UpdateBasicPacket($scope.BasicPacket);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"PcktName","Message":"Duplicate Packet Name"}]') {
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
        $scope.DeleteBasicPacket = function () {
            var getData = BasicPacketService.DeleteBasicPacket($scope.BasicPacket.PcktID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicPacket.PcktName == undefined) || ($scope.BasicPacket.PcktName == "")) {
                alert("Enter Packet Name ");
                return false;
            }
            if (($scope.BasicPacket.PcktSize == undefined) || ($scope.BasicPacket.PcktSize == "")) {
                alert("Enter Packet Size ");
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
            $state.go('Masters.BasicPacketList');
        }
    });
});
