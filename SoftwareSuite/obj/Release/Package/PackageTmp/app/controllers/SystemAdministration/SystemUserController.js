define(['app'], function (app) {
    app.controller("SystemUserController", function ($scope, $state, $filter, $stateParams, AppSettings, SystemUserService, SystemUserGroupService, BasicCollegeService, BasicDistrictsService) {
        $scope.SystemUser = { SysUserID: $stateParams.SysUserID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var SystemUserRightsdata = [];
        $scope.CollegeCodeReadonly = false;
        $scope.ShowTypeFlag = false;
        SystemUserRightsdata = AppSettings.UserRights;
        console.log(SystemUserRightsdata)
        for (var i = 0; i < SystemUserRightsdata.length; i++) {
            if (SystemUserRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.SystemUser.SysUserID == 0) {
                    if (SystemUserRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (SystemUserRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (SystemUserRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        var SystemUserGroupList = SystemUserGroupService.GetSystemUserGroupList();
        SystemUserGroupList.then(function (SystemUserGroupData, status, headers, config, error) {
            $scope.SystemUserGroupList = SystemUserGroupData;
        }, function (SystemUserGroupData, status, headers, config) {
            alert(error);
            });

       //$("#ExpiryDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });

        if ($scope.SystemUser.SysUserID > 0) {
            var CollegeList = BasicCollegeService.GetBasicCollegeList();
            CollegeList.then(function (CollegeData, status, headers, config, error) {
                $scope.CollegeList = CollegeData;
                var DistrictdataList = BasicDistrictsService.GetBasicDistrictListByCode();
                DistrictdataList.then(function (DistrictData, status, headers, config, error) {
                    $scope.Districtdata = DistrictData;
                    var SystemUserdata = SystemUserService.GetSystemUserById($scope.SystemUser.SysUserID);
                    SystemUserdata.then(function (data) {
                        $scope.SystemUser = data[0];
                        if ($scope.SystemUser.TypeFlag == "D" || $scope.SystemUser.TypeFlag == "B") {


                            $scope.ShowTypeFlag = true;
                            var str = $scope.SystemUser.DistrictIDs;
                            var res = str.split(",");
                            for (var i = 0; i < res.length; i++) {
                                var DistrictIDChK = res[i];
                                for (var j = 0; j < $scope.Districtdata.length; j++) {
                                    if ($scope.Districtdata[j].DistrictID == DistrictIDChK) {
                                        $scope.Districtdata[j].checkDist = true;
                                    }
                                }
                            }

                        }
                       
                       // $("#ExpiryDate").val(data[0].ExpiryDate);

                        $("#ExpiryDate").ejDatePicker({ value: data[0].ExpiryDate });

                        //$("#ExpiryDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });
                        $scope.DisableTypeFlag = false;
                        if ($scope.SystemUser.TypeFlag == "B" || $scope.SystemUser.TypeFlag == "D") {
                            $scope.CollegeCodeReadonly = false;
                            $scope.DisableTypeFlag = true;

                        } else {
                            $scope.CollegeCodeReadonly = true;
                            $scope.DisableTypeFlag = false;
                        }
                    }, function (error) {
                        alert(error);
                    });
                }, function (Castdata, status, headers, config) {
                    alert(error);
                });
            }, function (Castdata, status, headers, config) {
                alert(error);
            });
        }

        $("#ExpiryDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });

        $scope.SaveSystemUser = function () {
            if ($("#ExpiryDate").val() != "") { $scope.SystemUser.ExpiryDate = $("#ExpiryDate").val(); }
            $scope.isupdatableDisable = true;

            var TypeFlag = $scope.SystemUser.TypeFlag;

            if ($scope.SystemUser.SysUserID == undefined) { $scope.SystemUser.SysUserID = 0; }
            if ($scope.SystemUser.CollegeID == undefined) { $scope.SystemUser.CollegeID = 0; }
            if ($scope.SystemUser.CollegeID == "") { $scope.SystemUser.CollegeID = 0; }
            if ($scope.SystemUser.LoginName == undefined) { $scope.SystemUser.LoginName = 0; }
            if ($scope.SystemUser.LoginName == "") { $scope.SystemUser.LoginName = 0; }


            if (CheckValidation() == true) {
                var SystemUser = [];
                var obj = {};
                $scope.SystemUser.ExpiryDate = new Date();
                if ($scope.SystemUser.SysUserID == 0) {
                    if (TypeFlag == "D" || TypeFlag == "B") {


                        $scope.SystemUser.DistrictIDs = "";
                        for (var j = 0; j < $scope.Districtdata.length; j++) {
                            if ($scope.Districtdata[j].checkDist == true) {
                                if ($scope.SystemUser.DistrictIDs == "") {
                                    $scope.SystemUser.DistrictIDs = $scope.Districtdata[j].DistrictID;
                                }
                                else {
                                    $scope.SystemUser.DistrictIDs = $scope.SystemUser.DistrictIDs + "," + $scope.Districtdata[j].DistrictID;
                                }
                            }
                        }

                        //for (var k = 0; k < $scope.Districtdata.length; k++) {

                        //    if ($scope.Districtdata[k].checkDist == true) {
                        //        obj.checkDist = "Y";
                        //        obj.TypeFlag = $scope.SystemUser.TypeFlag;
                        //        obj.FirstName = $scope.SystemUser.FirstName;
                        //        obj.LastName = $scope.SystemUser.LastName;
                        //        obj.LoginName = $scope.SystemUser.LoginName;
                        //        obj.LoginPassword = $scope.SystemUser.LoginPassword;
                        //        obj.SysUsrGrpID = $scope.SystemUser.SysUsrGrpID;
                        //        obj.CollegeID = $scope.SystemUser.CollegeID;
                        //        obj.ExpiryDate = $scope.SystemUser.ExpiryDate;
                        //        obj.Address1 = $scope.SystemUser.Address1;
                        //        obj.CellNo = $scope.SystemUser.CellNo;
                        //        obj.EmailId = $scope.SystemUser.EmailId;
                        //        obj.DistrictID = $scope.Districtdata[k].DistrictID;
                        //        SystemUser.push(obj);
                        //    }
                        //}
                    }
                    //else {

                    //    obj.TypeFlag = $scope.SystemUser.TypeFlag;
                    //    obj.FirstName = $scope.SystemUser.FirstName;
                    //    obj.LastName = $scope.SystemUser.LastName;
                    //    obj.LoginName = $scope.SystemUser.LoginName;
                    //    obj.LoginPassword = $scope.SystemUser.LoginPassword;
                    //    obj.SysUsrGrpID = $scope.SystemUser.SysUsrGrpID;
                    //    obj.CollegeID = $scope.SystemUser.CollegeID;
                    //    obj.ExpiryDate = $scope.SystemUser.ExpiryDate;
                    //    obj.Address1 = $scope.SystemUser.Address1;
                    //    obj.CellNo = $scope.SystemUser.CellNo;
                    //    obj.EmailId = $scope.SystemUser.EmailId;
                    //    //obj.DistrictID = $scope.Districtdata[k].DistrictID;
                    //    SystemUser.push(obj);
                    //}
                    $scope.SystemUser.CreLoginID = AppSettings.LoggedUserId;
                    $scope.SystemUser.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = SystemUserService.AddSystemUser($scope.SystemUser);
                    //var getPromise = SystemUserService.AddSystemUser(SystemUser);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"LoginName","Message":"Duplicate Name"}]') {
                            alert("User Name must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.SystemUser.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.SystemUser.DistrictIDs = "";
                    for (var j = 0; j < $scope.Districtdata.length; j++) {
                        if ($scope.Districtdata[j].checkDist == true) {
                            if ($scope.SystemUser.DistrictIDs == "") {
                                $scope.SystemUser.DistrictIDs = $scope.Districtdata[j].DistrictID;
                            }
                            else {
                                $scope.SystemUser.DistrictIDs = $scope.SystemUser.DistrictIDs + "," + $scope.Districtdata[j].DistrictID;
                            }
                        }
                    }

                    var getPromise = SystemUserService.UpdateSystemUser($scope.SystemUser);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"LoginName","Message":"Duplicate Name"}]') {
                            alert("User Name must be unique");
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
        $scope.DisableTypeFlag = false;

        $scope.ModuleChangeEvent = function (TypeFlag) {
            if (TypeFlag == "B") {
                $scope.SystemUser.CollegeID = undefined;
                $scope.CollegeCodeReadonly = false;
                $scope.DisableTypeFlag = true;
                var Districtdata = BasicDistrictsService.GetBasicDistrictListByCode();
                Districtdata.then(function (DistrictData, status, headers, config, error) {
                    $scope.Districtdata = DistrictData;
                }, function (DistrictData, status, headers, config) {
                    alert(error);
                });
                $scope.ShowTypeFlag = true;

                //$scope.ShowTypeFlag = false;
            } else if (TypeFlag == "C") {
                var CollegeList = BasicCollegeService.GetBasicCollegeList();
                CollegeList.then(function (CollegeData, status, headers, config, error) {
                    $scope.CollegeList = CollegeData;
                }, function (Castdata, status, headers, config) {
                    alert(error);
                });
                $scope.CollegeCodeReadonly = true;
                $scope.DisableTypeFlag = false;
                $scope.ShowTypeFlag = false;
            }
            else if (TypeFlag == "D") {
                var Districtdata = BasicDistrictsService.GetBasicDistrictListByCode();
                Districtdata.then(function (DistrictData, status, headers, config, error) {
                    $scope.Districtdata = DistrictData;
                }, function (DistrictData, status, headers, config) {
                    alert(error);
                });
                $scope.ShowTypeFlag = true;
                $scope.CollegeCodeReadonly = false;
                $scope.DisableTypeFlag = true;
            }
        }

        $scope.DeleteSystemUser = function () {
            var getData = SystemUserService.GetDeleteSystemUser(AppSettings.LoggedUserId, $scope.SystemUser.SysUserID);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }

        function CheckValidation() {

            if (($scope.SystemUser.TypeFlag == undefined) || ($scope.SystemUser.TypeFlag == "")) {
                alert("Please Select User Type ");
                return false;
            }
            if (($scope.SystemUser.FirstName == undefined) || ($scope.SystemUser.FirstName == "")) {
                alert("Enter First Name");
                return false;
            }
            if (($scope.SystemUser.LastName == undefined) || ($scope.SystemUser.LastName == "")) {
                alert("Enter Last Name");
                return false;
            }
            if (($scope.SystemUser.LoginName == undefined) || ($scope.SystemUser.LoginName == "")) {
                alert("Enter Login Name");
                return false;
            }
            if (($scope.SystemUser.LoginPassword == undefined) || ($scope.SystemUser.LoginPassword == "")) {
                alert("Enter Login Password");
                return false;
            }
            if ($scope.SystemUser.LoginPassword != $scope.SystemUser.ConfirmPassword) {
                alert("Wrong Confirm Password ");
                return false;
            }
            if (($scope.SystemUser.SysUsrGrpID == undefined) || ($scope.SystemUser.SysUsrGrpID == 0)) {
                alert("Please Select Group ");
                return false;
            }
            if (($scope.SystemUser.ExpiryDate == undefined) || ($scope.SystemUser.ExpiryDate == "")) {
                alert("Please Choose User Expiray Date");
                return false;
            }
            //if (($scope.SystemUser.Address1 == undefined) || ($scope.SystemUser.Address1 == "")) {
            //    alert("Enter Address Please");
            //    return false;
            //}
            if (($scope.SystemUser.CellNo == undefined) || ($scope.SystemUser.CellNo == "")) {
                alert("Please Enter Cell Number ");
                return false;
            }
            if (($scope.SystemUser.CellNo.length < 10) || ($scope.SystemUser.CellNo.length > 10)) {
                alert("Please Enter Valid Cell Number ");
                return false;
            }
            if (($scope.SystemUser.EmailId == undefined) || ($scope.SystemUser.EmailId == "")) {
                alert("Please Enter Valid Email-ID ");
                return false;
            }
            else {
                return true;
            }
        }
        $scope.GetCollegeCodeByCollegeID = function (ColleID) {
            if ($scope.SystemUser.TypeFlag == 'C') {
                $scope.CollegeCodeReadonly = true;
                var CollegeData = BasicCollegeService.GetBasicCollegeByCollegeID(ColleID);
                CollegeData.then(function (CollegeData, status, headers, config, error) {
                    var data = CollegeData[0];
                    $scope.SystemUser.LoginName = CollegeData[0].ColCode;
                }, function (Castdata, status, headers, config) {
                    alert(error);
                });
            } else {
                $scope.CollegeCodeReadonly = false;
            }
        }

        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Masters.SystemUserList');
        }

        //$scope.CheckConfirmPassword = function () {
        //    if ($scope.SystemUser.LoginPassword != $scope.SystemUser.ConfirmPassword) {
        //        alert("Password Missmatched");
        //        return false;
        //    }
        //    else {
        //        return true;
        //    }
        //}
    });
});
