define(['app'], function (app) {
    app.controller("PrePractCenterSpellChangeController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, PrePractCenterService, PreExmSpelPractService) {
        $scope.PrePractCenterSpellChange = {};
        var PreSplIDofCnt = '0'; 
        $scope.PrePractCenterSpellChange.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PrePractCenterSpellChangeRightsdata = [];
        PrePractCenterSpellChangeRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PrePractCenterSpellChangeRightsdata.length; i++) {
            if (PrePractCenterSpellChangeRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PrePractCenterSpellChange.OtherCenterID == 0) {
                    if (PrePractCenterSpellChangeRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PrePractCenterSpellChangeRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PrePractCenterSpellChangeRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (ZoneData, status, headers, config) {
            alert(error);
        })

        $scope.GetPracticalCenterList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PracticalCenterList = PrePractCenterService.GetPracticalCenterListByDistrictIDANDZoneType($scope.PrePractCenterSpellChange.ExamInstID, $scope.PrePractCenterSpellChange.ZoneType, DistrictID);
                PracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                    $scope.PracticalCenterList = PracticalCenterData;
                }, function (PracticalCenterData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.FillPreExamSpellForPracticalCenterChange = function (PrePractCntrID) {
            var PreExmSpelPractList = PreExmSpelPractService.GetPreExmSpelPractByPrePractCntrID($scope.PrePractCenterSpellChange.ZoneType, $scope.PrePractCenterSpellChange.PrePractCntrID);
            PreExmSpelPractList.then(function (PreExmSpelPractListData, status, headers, config, error) {
                $scope.PreExmSpelPractList = PreExmSpelPractListData;
                $scope.PrePractCenterSpellChange.PreExmSpellNo = PreExmSpelPractListData[0].SpellNo;
                PreSplIDofCnt = PreExmSpelPractListData[0].PreExmSplPrID;
                FillSpellListForSpelllChange(PreSplIDofCnt)
            }, function (PracticalCenterData, status, headers, config) {
                alert(error);
            })
        }

        function FillSpellListForSpelllChange(PreSplIDofCnt) {
            var PracticalSpellList = PreExmSpelPractService.GetPreExamSpellListByPreExmSplPrID(PreSplIDofCnt);
            PracticalSpellList.then(function (PreExmSpelPractListData, status, headers, config, error) {
                $scope.PracticalSpellList = PreExmSpelPractListData;
            }, function (PracticalCenterData, status, headers, config) {
                alert(error);
            })
        }


        $scope.SavePrePractCenterSpellChange = function () {
            $scope.isupdatableDisable = true;
            if (CheckValidation() == true) {
                $scope.PrePractCenterSpellChange.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreExmSpelPractService.UpdatePractCenterSpell($scope.PrePractCenterSpellChange);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                    });
                }
            }
        




        function CheckValidation() {
            if (($scope.PrePractCenterSpellChange.ZoneType == undefined) || ($scope.PrePractCenterSpellChange.ZoneType == "")) {
                alert("Select Zone Type");
                return false;
            }
            if (($scope.PrePractCenterSpellChange.DistrictID == undefined) || ($scope.PrePractCenterSpellChange.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PrePractCenterSpellChange.PrePractCntrID == undefined) || ($scope.PrePractCenterSpellChange.PrePractCntrID == "")) {
                alert("Select Practical Center");
                return false;
            }
            if (($scope.PrePractCenterSpellChange.PreExmSplPrID == undefined) || ($scope.PrePractCenterSpellChange.PreExmSplPrID == "")) {
                alert("Select Spell No to Update");
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
            $scope.isupdatableDisable = false;
            $state.go('PreExam');
        }
    });
});
