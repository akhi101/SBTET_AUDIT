define(['app'], function (app) {
    app.controller("AttachCollegeToPreZoneCenterController", function ($scope, $state, $stateParams, $filter, AppSettings, PreZoneCenterService, PreZoneService, BasicDistrictsService) {
        $scope.AttachCollegeToPreZoneCenter = { PreZoneCntrID: $stateParams.PreZoneCntrID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var AttachCollegeToPreZoneCenterRightsdata = [];
        AttachCollegeToPreZoneCenterRightsdata = AppSettings.UserRights;
        for (var i = 0; i < AttachCollegeToPreZoneCenterRightsdata.length; i++) {
            if (AttachCollegeToPreZoneCenterRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.AttachCollegeToPreZoneCenter.PreZoneCntrID == 0) {
                    if (AttachCollegeToPreZoneCenterRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (AttachCollegeToPreZoneCenterRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (AttachCollegeToPreZoneCenterRightsdata[i].isdeletable == 'Y') {
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
        }, function (Castdata, status, headers, config) {
            alert(error);
            });
        $scope.GetPreZoneData = function (DistrictID) {
            if (DistrictID != "") {
                var PreZoneList = PreZoneService.GetPreZoneListByDistrictId(DistrictID, AppSettings.ExamInstID,1);
                PreZoneList.then(function (PreZoneData, status, headers, config, error) {
                    $scope.PreZoneList = PreZoneData;
                }, function (PreZoneData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.FillPreZoneCenter = function (ZoneID) {
            FillPreZoneCenter(ZoneID);
        }
        $scope.PreZoneClgList = [];
        $scope.FillPreZoneCollege = function () {
            if ($scope.AttachCollegeToPreZoneCenter.ZoneID == undefined) { $scope.AttachCollegeToPreZoneCenter.ZoneID = "" }
            if ($scope.AttachCollegeToPreZoneCenter.PreZoneCntrID == undefined) { $scope.AttachCollegeToPreZoneCenter.PreZoneCntrID = "" }
            if ($scope.AttachCollegeToPreZoneCenter.PreZoneCntrID != "") {
                var Selected = $filter('filter')($scope.PreZoneCenterList, { PreZoneCntrID: $scope.AttachCollegeToPreZoneCenter.PreZoneCntrID })
                $scope.AttachCollegeToPreZoneCenter.ExamCapacity = Selected[0].ExamCap;
            }
            if ($scope.AttachCollegeToPreZoneCenter.ZoneID != "" && $scope.AttachCollegeToPreZoneCenter.PreZoneCntrID != "") {
                var PreZoneClgList = PreZoneCenterService.GetPreZoneCollege($scope.AttachCollegeToPreZoneCenter.ZoneID,$scope.AttachCollegeToPreZoneCenter.PreZoneCntrID);
                PreZoneClgList.then(function (PreZoneClgdata, status, headers, config, error) {
                    for (var i = 0; i < PreZoneClgdata.length; i++) {
                        if (PreZoneClgdata[i].CollegeCheck == "Y") {
                            PreZoneClgdata[i].CollegeCheck = true;
                        }
                        else {
                            PreZoneClgdata[i].CollegeCheck = false;
                        }
                    }
                    $scope.PreZoneClgList = PreZoneClgdata;
                    CalculateTotalCapacity();

                    var TotalList = [];
                    var TotalIyearGen = 0;
                    var TotalIIYearGen = 0;
                    var TotalIYearVoc = 0;
                    var TotalIIYearVoc = 0;
                    for (var i = 0; i < PreZoneClgdata.length; i++) {
                        if (PreZoneClgdata[i].CollegeCheck == true) {
                            TotalIyearGen = TotalIyearGen + PreZoneClgdata[i].IyearGen;
                            TotalIIYearGen = TotalIIYearGen + PreZoneClgdata[i].IIYearGen;
                            TotalIYearVoc = TotalIYearVoc + PreZoneClgdata[i].IYearVoc;
                            TotalIIYearVoc = TotalIIYearVoc + PreZoneClgdata[i].IIYearVoc;
                        }
                    }
                    var obj = {};
                    obj.TotalIyearGen = TotalIyearGen;
                    obj.TotalIIYearGen = TotalIIYearGen;
                    obj.TotalIYearVoc = TotalIYearVoc;
                    obj.TotalIIYearVoc = TotalIIYearVoc;
                    TotalList.push(obj);
                    $scope.PreZoneClgTotalList = TotalList;

                }, function (error) { 
                    alert(error);
                });
            }
        }
        CalculateTotalCapacity = function () {
            var TotalallCapacity = 0;
            for (var i = 0; i < $scope.PreZoneClgList.length; i++) {
                if ($scope.PreZoneClgList[i].CollegeCheck == true) {
                    TotalallCapacity = TotalallCapacity + $scope.PreZoneClgList[i].ExamCap;
                }
            }
            $scope.AttachCollegeToPreZoneCenter.AllocatedCapacity = TotalallCapacity;
        }
        FillPreZoneCenter = function (ZoneID) {
            if (ZoneID == undefined) {
                ZoneID = "";
            }
            if (ZoneID != "") {
                var PreZoneCenterList = PreZoneCenterService.GetCenterListForAttachCollegeToPreZone(ZoneID);
                PreZoneCenterList.then(function (PreZoneCenterData, status, headers, config, error) {
                    $scope.PreZoneCenterList = PreZoneCenterData;
                }, function (PreZoneCenterData, status, headers, config) {
                    alert(error);
                });
            }  
        }
         var AttachCollegeToPreZoneCenter = [];
        $scope.SaveAttachCollegeToPreZoneCenter = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                var AttachCollegeToPreZoneCenter = [];
                for (var k = 0; k < $scope.PreZoneClgList.length; k++) {
                    var obj = {};
                    if ($scope.PreZoneClgList[k].CollegeCheck == true) {
                        obj.CollegeCheck = "Y";
                    }
                    else {
                        obj.CollegeCheck = "N";
                    }
                    obj.TheoryPract = $scope.AttachCollegeToPreZoneCenter.TheoryPract;
                    obj.ZoneID = $scope.AttachCollegeToPreZoneCenter.ZoneID;
                    obj.CenterCollegeID = $scope.PreZoneClgList[k].CollegeID;
                    obj.PreZoneCntrID = $scope.AttachCollegeToPreZoneCenter.PreZoneCntrID;
                    obj.CreLoginID = AppSettings.LoggedUserId;
                    obj.UpdLoginID = AppSettings.LoggedUserId;
                    AttachCollegeToPreZoneCenter.push(obj);
                }
                var getPromise = PreZoneCenterService.PostAttachCenterToCollege(AttachCollegeToPreZoneCenter);
                getPromise.then(function (msg) {
                    alert("Added successfully!!");
                    $scope.isupdatableDisable = false;
                    RedirectToEntryPage();
                }, function (error) {
                    $scope.isupdatableDisable = false;
                    alert(error);
                });
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeletePreZoneCenter = function () {
            var getData = PreZoneCenterService.DeletePreZoneCenter($scope.AttachCollegeToPreZoneCenter.PreZoneCntrID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.AttachCollegeToPreZoneCenter.ZoneID == undefined) || ($scope.AttachCollegeToPreZoneCenter.ZoneID == "")) {
                alert("Select Zone");
                return false;
            }
            if (($scope.AttachCollegeToPreZoneCenter.PreZoneCntrID == undefined) || ($scope.AttachCollegeToPreZoneCenter.PreZoneCntrID == "")) {
                alert("Select Center");
                return false;
            }
            if (($scope.AttachCollegeToPreZoneCenter.ExamCapacity == "0") || ($scope.AttachCollegeToPreZoneCenter.ExamCapacity == undefined) || ($scope.AttachCollegeToPreZoneCenter.ExamCapacity == "")) {
                alert("Exam Capacity must be greater than 0");
                return false;
            }

            else {
                return true;
            }
        }
        $scope.Exit = function () {
            //RedirectToListPage();
            $state.go('CenterManagemnet'); 
        }
        function RedirectToListPage() {
            $state.go('CenterManagemnet.AttachCollegeToPreZoneCenter');
        }
        function RedirectToEntryPage() {
            $scope.AttachCollegeToPreZoneCenter.DistrictID = undefined;
            $scope.AttachCollegeToPreZoneCenter.PreZoneCntrID = undefined;
            $scope.AttachCollegeToPreZoneCenter.ExamCapacity = 0;
            $scope.AttachCollegeToPreZoneCenter.ZoneID = undefined;
            $scope.PreZoneClgList = [];
            $state.go('CenterManagemnet.AttachCollegeToPreZoneCenter');
        }
        $scope.rowClicked = function (obj) {
            var TotalList = [];
            var TotalIyearGen = 0;
            var TotalIIYearGen = 0;
            var TotalIYearVoc = 0;
            var TotalIIYearVoc = 0;
            for (var k = 0; k < $scope.PreZoneClgList.length; k++) {
                if ($scope.PreZoneClgList[k].CollegeCheck == true) {
                    TotalIyearGen = TotalIyearGen + $scope.PreZoneClgList[k].IyearGen;
                    TotalIIYearGen = TotalIIYearGen + $scope.PreZoneClgList[k].IIYearGen;
                    TotalIYearVoc = TotalIYearVoc + $scope.PreZoneClgList[k].IYearVoc;
                    TotalIIYearVoc = TotalIIYearVoc + $scope.PreZoneClgList[k].IIYearVoc;
                }
            }
            var obj = {};
            obj.TotalIyearGen = TotalIyearGen;
            obj.TotalIIYearGen = TotalIIYearGen;
            obj.TotalIYearVoc = TotalIYearVoc;
            obj.TotalIIYearVoc = TotalIIYearVoc;
            TotalList.push(obj);
            $scope.PreZoneClgTotalList = TotalList;
        };
    });
});
