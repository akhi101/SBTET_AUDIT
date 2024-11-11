define(['app'], function (app) {
    app.controller("SystemUserGroupController", function ($scope, $state, $filter, $stateParams, AppSettings, SystemUserGroupService) {
        $scope.SystemUserGroup = { SysUsrGrpID: $stateParams.SysUsrGrpID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var SystemUserGroupRightsdata = [];
        SystemUserGroupRightsdata = AppSettings.UserRights;
        for (var i = 0; i < SystemUserGroupRightsdata.length; i++) {
            if (SystemUserGroupRightsdata[i].ListFormName == PageNm) {
                if ($scope.SystemUserGroup.SysUsrGrpID == 0) {
                    if (SystemUserGroupRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (SystemUserGroupRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (SystemUserGroupRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var SystemModuleList = SystemUserGroupService.GetSystemModuleList();
        SystemModuleList.then(function (SystemModuleData, status, headers, config, error) {
            $scope.SystemModuleList = SystemModuleData;
        }, function (SystemModuleData, status, headers, config) {
            alert(error);
        });

        $('#CheckAllMenues').click(function (e) {
            if (($scope.SystemUserGroup.SysModID == undefined) || ($scope.SystemUserGroup.SysModID == "")) {
                alert("Select Module first");
                var table = $(e.target).closest('table');
                table.prevObject[0].checked == false;
                $('#CheckAllMenues').val(false);
                return;
            } else {
                var table = $(e.target).closest('table');
                if (table.prevObject[0].checked == true) {
                    $scope.AllMenues = true;
                    for (var k = 0; k < $scope.documentdata.length; k++) {
                        $scope.documentdata[k].selectAdd = true;
                        $scope.documentdata[k].selectEdit = true;
                        $scope.documentdata[k].selectDelete = true;
                        $scope.documentdata[k].selectPrint = true;
                        $scope.documentdata[k].selectReadOnly = true;
                    }
                } else {
                    $scope.AllMenues = false;
                    for (var k = 0; k < $scope.documentdata.length; k++) {
                        $scope.documentdata[k].selectAdd = false;
                        $scope.documentdata[k].selectEdit = false;
                        $scope.documentdata[k].selectDelete = false;
                        $scope.documentdata[k].selectPrint = false;
                        $scope.documentdata[k].selectReadOnly = false;
                    }
                }
                $('td input:checkbox', table).prop('checked', this.checked);
            }
        });
        $scope.ModuleChangeEvent = function (SysModID) {
            var ModuleGridlData = SystemUserGroupService.GetSystemProgramList(SysModID, $stateParams.SysUsrGrpID);
            ModuleGridlData.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].isaddable == "Y") {
                        data[i].selectAdd = true;
                    } else {
                        data[i].selectAdd = false;
                    }
                    if (data[i].isupdatable == "Y") {
                        data[i].selectEdit = true;
                    } else {
                        data[i].selectEdit = false;
                    }
                    if (data[i].isdeletable == "Y") {
                        data[i].selectDelete = true;
                    } else {
                        data[i].selectDelete = false;
                    }
                    if (data[i].isprintable == "Y") {
                        data[i].selectPrint = true;
                    } else {
                        data[i].selectPrint = false;
                    }
                    if (data[i].isReadOnly == "Y") {
                        data[i].selectReadOnly = true;
                    } else {
                        data[i].selectReadOnly = false;
                    }
                }
                $scope.documentdata = data;
            }, function (error) {
                alert(error);
            });
        }
        if ($scope.SystemUserGroup.SysUsrGrpID > 0) {
            var SystemUserGroupdata = SystemUserGroupService.GetSystemUserGroupById($scope.SystemUserGroup.SysUsrGrpID);
            SystemUserGroupdata.then(function (data) {
                $scope.SystemUserGroup = data[0];
            }, function (error) {
                alert(error);
            });
        }
        var SystemUserGroupRights = [];
        $scope.SaveSystemUserGroup = function () {
            $scope.isupdatableDisable = true;
            if ($scope.SystemUserGroup.SysUsrGrpID == undefined) { $scope.SystemUserGroup.SysUsrGrpID = 0; }
            if ($scope.AllMenues == true) {
                for (var k = 0; k < $scope.documentdata.length; k++) {
                    var obj = {};
                    obj.SysSubModID = $scope.documentdata[k].SysSubModID;
                    obj.SysProgID = $scope.documentdata[k].SysProgID;
                    obj.SysUsrGrpID = $stateParams.SysUsrGrpID;
                    obj.SysModID = $scope.SystemUserGroup.SysModID;
                    obj.isaddable = "Y";
                    obj.isupdatable = "Y";
                    obj.isdeletable = "Y";
                    obj.isprintable = "Y";
                    obj.isReadOnly = "Y";
                    SystemUserGroupRights.push(obj);
                }
            } else {
                for (var k = 0; k < $scope.documentdata.length; k++) {
                    var obj = {};
                    obj.SysSubModID = $scope.documentdata[k].SysSubModID;
                    obj.SysProgID = $scope.documentdata[k].SysProgID;
                    obj.SysUsrGrpID = $stateParams.SysUsrGrpID;
                    obj.SysModID = $scope.SystemUserGroup.SysModID;
                    if ($scope.documentdata[k].selectAdd == true) {
                        obj.isaddable = "Y";
                    }
                    else {
                        obj.isaddable = "N";
                    }
                    if ($scope.documentdata[k].selectEdit == true) {
                        obj.isupdatable = "Y";
                    }
                    else {
                        obj.isupdatable = "N";
                    }
                    if ($scope.documentdata[k].selectDelete == true) {
                        obj.isdeletable = "Y";
                    }
                    else {
                        obj.isdeletable = "N";
                    }
                    if ($scope.documentdata[k].selectPrint == true) {
                        obj.isprintable = "Y";
                    }
                    else {
                        obj.isprintable = "N";
                    }
                    if ($scope.documentdata[k].selectReadOnly == true) {
                        obj.isReadOnly = "Y";
                    }
                    else {
                        obj.isReadOnly = "N";
                    }
                    SystemUserGroupRights.push(obj);
                }
            }
            if (CheckValidation() == true) {
                $scope.SystemUserGroup.SystemGroupProgramRightsList = SystemUserGroupRights;
                if ($scope.SystemUserGroup.SysUsrGrpID == 0) {
                    $scope.SystemUserGroup.CreLoginID = AppSettings.LoggedUserId;
                    $scope.SystemUserGroup.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = SystemUserGroupService.AddSystemUserGroup($scope.SystemUserGroup);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                } else {
                    $scope.SystemUserGroup.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = SystemUserGroupService.UpdateSystemUserGroup($scope.SystemUserGroup);
                    getPromise.then(function (msg) {
                        alert("Updated successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
            }
        }
        function CheckValidation() {
            return true;
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Masters.SystemUserGroupList');
            //$scope.documentdata = [];
            //SystemUserGroupRights = [];
            //$scope.SystemUserGroup.SysUsrGrpID = "";
            //$scope.AllMenues = false;
        }
    });
});
