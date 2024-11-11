define(['app'], function (app) {
    app.controller("PreExmSpelPractVocController", function ($scope, $state, $stateParams, AppSettings, PreExmSpelPractService, BasicDistrictsService, PreZoneService, PrePractCenterService) {
        $scope.PreExmSpelPract = { PreExmSplPrID: $stateParams.PreExmSplPrID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreExmSpelPractRightsdata = [];
        PreExmSpelPractRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreExmSpelPractRightsdata.length; i++) {
            if (PreExmSpelPractRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreExmSpelPract.PreExmSplPrID == 0) {
                    if (PreExmSpelPractRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreExmSpelPractRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreExmSpelPractRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        if ($scope.PreExmSpelPract.PreExmSplPrID > 0) {
            var PreExmSpelPractdata = PreExmSpelPractService.GetPreExmSpelPractByID($scope.PreExmSpelPract.PreExmSplPrID);
            PreExmSpelPractdata.then(function (data) {
                $scope.PreExmSpelPract = data[0];
                for (var i = 0; i < data[0].PreExamSplPrDetls.length; i++) {
                    if (data[0].PreExamSplPrDetls[i].PreExmSplPrDetID != 0) {
                        data[0].PreExamSplPrDetls[i].CheckCent = true;
                    }
                }
                $scope.Centerdata = data[0].PreExamSplPrDetls;
                $("#SpellStartDate").ejDatePicker({ value: $scope.PreExmSpelPract.SpellStartDate });
                $("#SpellEndDate").ejDatePicker({ value: $scope.PreExmSpelPract.SpellEndDate });
            }, function (error) {
                alert(error);
            });
        } else {
            var CenterList = PrePractCenterService.GetPracticalCenterListForSpell(AppSettings.ExamInstID,3);
            CenterList.then(function (data) {
                $scope.Centerdata = data;
            }, function (error) {
                alert(error);
            });
        }
        $("#SpellStartDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });
        $("#SpellEndDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });
        $scope.SavePreExmSpelPract = function () {
            $scope.isupdatableDisable = true;
            if ($("#SpellStartDate").val() != "") { $scope.PreExmSpelPract.SpellStartDate = $("#SpellStartDate").val(); }
            if ($("#SpellEndDate").val() != "") { $scope.PreExmSpelPract.SpellEndDate = $("#SpellEndDate").val(); }
            if ($scope.PreExmSpelPract.PreExmSplPrID == undefined) { $scope.PreExmSpelPract.PreExmSplPrID = 0; }
            $scope.PreExmSpelPract.InstanceID = AppSettings.ExamInstID;
            $scope.PreExmSpelPract.ZoneType = 3;
            if ($scope.PreExmSpelPract.PreExmSplPrID == "") { $scope.PreExmSpelPract.PreExmSplPrID = 0; }
            var CenterList = [];
            for (var i = 0; i < $scope.Centerdata.length; i++) {
                if ($scope.Centerdata[i].CheckCent == true) {
                    var obj = {};
                    $scope.StudentCount = $scope.StudentCount + 1;
                    obj.ColCode = $scope.Centerdata[i].ColCode;
                    obj.ColName = $scope.Centerdata[i].ColName;
                    obj.CenterID = $scope.Centerdata[i].CenterID;
                    CenterList.push(obj);
                }
            }
            if (CenterList.length == 0) {
                alert("No Any Center Selected");
                return;
            }
            $scope.PreExmSpelPract.PreExamSplPrDetls = CenterList;
            if (CheckValidation() == true) {
                if ($scope.PreExmSpelPract.PreExmSplPrID == 0) {
                    $scope.PreExmSpelPract.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PreExmSpelPract.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.PreExmSpelPract.ZoneType = 3;
                    var getPromise = PreExmSpelPractService.AddPreExmSpelPract($scope.PreExmSpelPract);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.PreExmSpelPract.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.PreExmSpelPract.ZoneType = 3;
                    var getPromise = PreExmSpelPractService.UpdatePreExmSpelPract($scope.PreExmSpelPract);
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
        $scope.DeletePreExmSpelPract = function () {
            var getData = PreExmSpelPractService.DeletePreExmSpelPract($scope.PreExmSpelPract.PreExmSplPrID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }

        //var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        //BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
        //    $scope.BasicDistrictList = DistrictData;
        //}, function (DistrictData, status, headers, config) {
        //    alert(error);
        //    });

        //$scope.FillZoneList = function (DistrictID)
        //{
        //    FillZoneByDistrictID(DistrictID);
        //}

        //function FillZoneByDistrictID(DistrictID) {
        //    var PreZoneList = PreZoneService.GetPreZoneBYDistrictIDForSpell(DistrictID,3);
        //    PreZoneList.then(function (ZoneData, status, headers, config, error) {
        //        $scope.PreZoneList = ZoneData;
        //    }, function (ZoneData, status, headers, config) {
        //        alert(error);
        //    });
        //}
        //$scope.FillCenterListByDistrictIDAndZoneID = function (DistrictID,ZoneID) {
        //    FillCenterListByDistrictIDAndZoneID(DistrictID, ZoneID);
        //}

        //////var CenterList = PreExmSpelPractService.GetPracCenterListByDistrictIDandZoneID(AppSettings.ExamInstID, DistrictID, ZoneID);
        //////CenterList.then(function (CenterData, status, headers, config, error) {
        //////    $scope.CenterList = CenterData;
        //////}, function (CenterData, status, headers, config) {
        //////    alert(error);
        //////});

        //function FillCenterListByDistrictIDAndZoneID(DistrictID, ZoneID) {
        //    if (($scope.PreExmSpelPract.DistrictID == undefined) || ($scope.PreExmSpelPract.DistrictID == "")) {
        //        $scope.PreExmSpelPract.DistrictID = AppSettings.DistrictIDs;
        //    } else {
        //        $scope.PreExmSpelPract.DistrictID = DistrictID;
        //    }
        //    if (ZoneID != ""  && ZoneID != undefined )
        //    {
        //        var CenterList = PreExmSpelPractService.GetPracCenterListByDistrictIDandZoneID(AppSettings.ExamInstID, DistrictID, ZoneID, 3);
        //        CenterList.then(function (data) {
        //            $scope.Centerdata = data;
        //        }, function (error) {
        //            alert(error);
        //            });
        //    }
            
        //}


        function CheckValidation() {
            if (($scope.PreExmSpelPract.SpellNo == undefined) || ($scope.PreExmSpelPract.SpellNo == "")) {
                alert("Enter Spell No ");
                return false;
            }
            if (($scope.PreExmSpelPract.SpellStartDate == undefined) || ($scope.PreExmSpelPract.SpellStartDate == "")) {
                alert("Select Spell Start Date");
                return false;
            }
            if (($scope.PreExmSpelPract.SpellEndDate == undefined) || ($scope.PreExmSpelPract.SpellEndDate == "")) {
                alert("Select Spell End Date");
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
            $state.go('PreExam.PracticalSpellVocList');
        }
    });
});
