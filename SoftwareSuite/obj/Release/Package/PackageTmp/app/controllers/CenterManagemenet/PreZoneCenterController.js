define(['app'], function (app) {
    app.controller("PreZoneCenterController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, PreZoneService, BasicDistrictsService) {
        $scope.PreZoneCenter = { PreZoneCntrID: $stateParams.PreZoneCntrID };
        $scope.PreZoneCenter.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreZoneCenterRightsdata = [];
        $scope.BlnNewCenter = true;
        $scope.PreZoneCenter.BlnRemainsStudent = true;
        $scope.PreZoneCenter.Diffrence = 0;
        var ZoneCapacity = 0;
        var CenterCapacity = 0;
        PreZoneCenterRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreZoneCenterRightsdata.length; i++) {
            if (PreZoneCenterRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreZoneCenter.PreZoneCntrID == 0) {
                    if (PreZoneCenterRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreZoneCenterRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreZoneCenterRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        $scope.PreZoneCenter.SysUsrGrpID = 0;
        if (AppSettings.SysUsrGrpID == 7) {
            $scope.PreZoneCenter.SysUsrGrpID = 9;
        } else if (AppSettings.SysUsrGrpID == 9) {
            $scope.PreZoneCenter.SysUsrGrpID = 2;
        } else if (AppSettings.SysUsrGrpID == 2) {
            $scope.PreZoneCenter.SysUsrGrpID = 11;
        } else if (AppSettings.SysUsrGrpID == 11) {
            $scope.PreZoneCenter.SysUsrGrpID = 23;
        }


        //var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        var BasicDistrictList = [];

        if (AppSettings.SysUsrGrpID != 23) {
            BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        } else {
            BasicDistrictList = BasicDistrictsService.GetDistrictListForCOE(AppSettings.ExamInstID,1);
        }

        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.PreZoneCenter.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetPreZoneData($scope.PreZoneCenter.DistrictID);
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        $scope.GetPreZoneData = function (DistrictID) {
            $scope.PreZoneClgList = [];
            $scope.PreZoneList = [];
            $scope.PreZoneCenter.IYearCount = 0;
            $scope.PreZoneCenter.IIYearCount = 0;
            $scope.PreZoneCenter.TotalStudentCapacity = 0;
            if (DistrictID != "") {
                var PreZoneList = PreZoneService.GetPreZoneListByDistrictId(DistrictID, AppSettings.ExamInstID,1);
                PreZoneList.then(function (PreZoneData, status, headers, config, error) {
                    $scope.PreZoneList = PreZoneData;
                }, function (PreZoneData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.GetZoneTotal = function (ZoneID) {
            if (ZoneID != "") {
                $scope.PreZoneCenter.IYearCount = 0;
                $scope.PreZoneCenter.IIYearCount = 0;
                FillCenterList();
                var PreZoneTotalList = PreZoneService.GetZoneTotal(ZoneID);
                PreZoneTotalList.then(function (PreZoneTotalData, status, headers, config, error) {
                    $scope.PreZoneCenter.IYearCount = PreZoneTotalData[0].IYearCount;
                    $scope.PreZoneCenter.IIYearCount = PreZoneTotalData[0].IIYearCount;
                    if (parseFloat($scope.PreZoneCenter.IIYearCount) > parseFloat($scope.PreZoneCenter.IYearCount)) {
                        ZoneCapacity = parseFloat($scope.PreZoneCenter.IIYearCount);
                    } else {
                        ZoneCapacity = parseFloat($scope.PreZoneCenter.IYearCount);
                    }
                    $scope.PreZoneCenter.Diffrence = parseFloat(ZoneCapacity) - parseFloat(CenterCapacity);
                    if (parseFloat($scope.PreZoneCenter.Diffrence) > 0) {
                        $scope.PreZoneCenter.BlnRemainsStudent = false;
                    }
                }, function (PreZoneTotalData, status, headers, config) {
                    alert(error);
                });
            }
        }
        function FillCenterList() {
            $scope.PreZoneClgList = [];
            $scope.PreZoneCenter.TotalStudentCapacity = 0;
            if (ZoneID != "" || ZoneID != undefined) {
                var PreZoneClgList = PreZoneCenterService.GetPreZoneCenterClgList($scope.PreZoneCenter.DistrictID, '', $scope.PreZoneCenter.ZoneID, 0);
                PreZoneClgList.then(function (data) {
                    CenterCapacity = 0;
                    for (var i = 0; i < data.length; i++) {
                        var obj = {};
                        if ($scope.PreZoneCenter.MgmtCode == undefined) {
                            $scope.PreZoneCenter.MgmtCode = "";
                        }
                        obj.SrNo = $scope.PreZoneClgList.length + 1;
                        obj.CollegeID = data[i].CollegeID;
                        obj.ColName = data[i].ColName;
                        if (data[i].AffiliatedFlag == 0) { obj.AffiliatedFlag = false; } else { obj.AffiliatedFlag = true; }
                        obj.MultiCenter = $scope.PreZoneCenter.MgmtCode;
                        obj.ColCode = data[i].ColCode + $scope.PreZoneCenter.MgmtCode;
                        obj.ZoneID = data[i].ZoneID;
                        if (data[i].SensiCompli == "Y") { obj.SensiCompli = true; } else { obj.SensiCompli = false; }
                        if (data[i].Vocational == "Y") { obj.Vocational = true; } else { obj.Vocational = false; }
                        if (data[i].MinorSubject == "Y") { obj.MinorSubject = true; } else { obj.MinorSubject = false; }
                        if (data[i].PostOfficeFlag == "Y") { obj.PostOfficeFlag = true; } else { obj.PostOfficeFlag = false; }
                        obj.PostOffice = data[i].PostOffice;
                        obj.PostOfficeDistance = data[i].PostOfficeDistance;
                        obj.OtherCenterID = data[i].OtherCenterID;
                        if (data[i].PoliceStationFlag == "Y") { obj.PoliceStationFlag = true; } else { obj.PoliceStationFlag = false; }
                        obj.PoliceStation = data[i].PoliceStation;
                        obj.PreZoneCntrID = data[i].PreZoneCntrID;
                        obj.Distance = data[i].Distance;
                        obj.IsGovt = data[i].IsGovt;
                        obj.ExamCapacity = data[i].ExamCapacity;
                        obj.FurnitureNo = data[i].FurnitureNo;
                        obj.OFurnitureNo = data[i].OFurnitureNo;
                        obj.TotalSeats = data[i].FurnitureNo + data[i].OFurnitureNo;
                        obj.CCamerasNo = data[i].CCamerasNo;
                        if (data[i].ElectricityFlag == "Y") { obj.ElectricityFlag = true; } else { obj.ElectricityFlag = false; }
                        if (data[i].InternetFlag == "Y") { obj.InternetFlag = true; } else { obj.InternetFlag = false; }
                        if (data[i].ComputerFlag == "Y") { obj.ComputerFlag = true; } else { obj.ComputerFlag = false; }
                        if (data[i].PrinterFlag == "Y") { obj.PrinterFlag = true; } else { obj.PrinterFlag = false; }
                        $scope.PreZoneClgList.push(obj);
                        angular.element("#ColCode").focus();
                        $scope.PreZoneCenter.ColCode = "";

                    }
                    $scope.PreZoneClgList = $scope.PreZoneClgList;
                    for (var k = 0; k < $scope.PreZoneClgList.length; k++) {
                        CenterCapacity = parseFloat(CenterCapacity) + parseFloat($scope.PreZoneClgList[k].ExamCapacity);
                    }
                    $scope.PreZoneCenter.TotalStudentCapacity = parseFloat(CenterCapacity);
                    $scope.PreZoneCenter.Diffrence = parseFloat(ZoneCapacity) - parseFloat(CenterCapacity);
                    if (parseFloat($scope.PreZoneCenter.Diffrence) < 0) {
                        $scope.PreZoneCenter.BlnRemainsStudent = true;
                    }
                }, function (PreZoneTotalData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.CheckExistingCenter = function (ChkExistingCenter) {
            if (ChkExistingCenter == true) {
                $scope.PreZoneCenter.ChkNewCenter = false;
                $scope.BlnNewCenter = true;
            } else {
                $scope.PreZoneCenter.ChkNewCenter = true;
                $scope.BlnNewCenter = false;
            }
        }
        $scope.CheckNewCenter = function (ChkNewCenter) {
            if (ChkNewCenter == true) {
                $scope.PreZoneCenter.ChkExistingCenter = false;
                $scope.BlnNewCenter = false;
            } else {
                $scope.PreZoneCenter.ChkExistingCenter = true;
                $scope.BlnNewCenter = true;
            }
        }
        $scope.FillGrid = function (event) {
            if (event.which == 13 || event.which == 9) {
                $scope.ShowCenterCollegesFunction(false);
            }
        }

        $scope.FillGridOnChange = function (event) {      
            if (event.which != 13 || event.which != 9) {
                $scope.ShowCenterCollegesFunction(false);
            }
        }
        
        $scope.ShowColleges = function () {
            $scope.ShowCenterCollegesFunction(true);
        }
        $scope.ShowCenterCollegesFunction = function (EventFlg) {
            if (($scope.PreZoneCenter.DistrictID == undefined) || ($scope.PreZoneCenter.DistrictID == 0)) {
                alert("First Select District");
                return;
            }
            if ($scope.PreZoneCenter.ChkExistingCenter == false) {
                if (($scope.PreZoneCenter.JustificationReport == undefined) || ($scope.PreZoneCenter.JustificationReport == "")) {
                    alert("Enter Justification Report");
                    return false;
                }

            }

            if ($scope.PreZoneCenter.ColCode == undefined) {
                $scope.PreZoneCenter.ColCode = "";
            }
            if ($scope.PreZoneCenter.ColCode != "") {
                if ($scope.PreZoneCenter.MgmtCode == undefined) {
                    $scope.PreZoneCenter.MgmtCode = "";
                }
                var PreZoneCenterList = PreZoneCenterService.GetPreCenterCollegeCount(AppSettings.ExamInstID, $scope.PreZoneCenter.ColCode);
                PreZoneCenterList.then(function (data) {
                    if (EventFlg == true) {
                        if ($scope.PreZoneCenter.MgmtCode == "") {
                            if (data.length > 0) {
                                alert("It is defined as Center");
                                return;
                            }
                        }
                    }

                    var PreZoneClgList = PreZoneCenterService.GetPreZoneCenterClgList($scope.PreZoneCenter.DistrictID, $scope.PreZoneCenter.ColCode, 0, AppSettings.ExamInstID);
                    PreZoneClgList.then(function (data) {
                        if (data.length == 0) {
                            $scope.PreZoneCenter.ColType = "";
                            alert("College Code Not found");
                            angular.element("#ColCode").focus();
                            $scope.PreZoneCenter.ColCode = "";
                            return;
                        }
                        if (EventFlg == true) {
                            for (var i = 0; i < $scope.PreZoneClgList.length; i++) {
                                if ($scope.PreZoneClgList[i].CollegeID == data[0].CollegeID) {
                                    if ($scope.PreZoneCenter.MgmtCode == "") {
                                        alert("already Linked this college code");
                                        angular.element("#ColCode").focus();
                                        $scope.PreZoneCenter.ColCode = "";
                                        return;
                                    }
                                }
                            }
                        }
                        if (EventFlg == true) {
                            ColType = data[0].IsGovt;
                            $scope.PreZoneCenter.ColType = data[0].IsGovt;
                            if (data[0].JustificationReport != "") {
                                $scope.PreZoneCenter.JustificationReport = data[0].JustificationReport;
                            }
                            CenterCapacity = 0;
                            for (var i = 0; i < data.length; i++) {
                                var obj = {};
                                if ($scope.PreZoneCenter.MgmtCode == undefined) {
                                    $scope.PreZoneCenter.MgmtCode = "";
                                }
                                obj.SrNo = $scope.PreZoneClgList.length + 1;
                                obj.CollegeID = data[i].CollegeID;
                                obj.ColName = data[i].ColName;
                                obj.MultiCenter = $scope.PreZoneCenter.MgmtCode;
                                obj.ColCode = data[i].ColCode + $scope.PreZoneCenter.MgmtCode;
                                obj.ZoneID = data[i].ZoneID;
                                if (data[i].AffiliatedFlag == 0) { obj.AffiliatedFlag = false; } else { obj.AffiliatedFlag = true; }
                                if ($scope.PreZoneCenter.MgmtCode != "" && data[i].PreZoneCntrID != 0) {
                                    obj.SensiCompli = false;
                                    obj.Vocational = false;
                                    obj.MinorSubject = false;
                                    obj.PostOfficeFlag = false;
                                    obj.PostOffice = "";
                                    obj.PostOfficeDistance = "";
                                    obj.PoliceStationFlag = false
                                    obj.PoliceStation = "";
                                    obj.OtherCenterID = "";
                                    obj.PreZoneCntrID = 0;
                                    obj.Distance = 0;
                                    obj.IsGovt = data[i].IsGovt;
                                    obj.ExamCapacity = 0;
                                    obj.FurnitureNo = 0;
                                    obj.OFurnitureNo = 0;
                                    obj.TotalSeats = 0;
                                    obj.CCamerasNo = 0;
                                    obj.ElectricityFlag = false;
                                    obj.InternetFlag = false;
                                    obj.ComputerFlag = false;
                                    obj.PrinterFlag = false;
                                } else {
                                    if (data[i].SensiCompli == "Y") { obj.SensiCompli = true; } else { obj.SensiCompli = false; }
                                    if (data[i].Vocational == "Y") { obj.Vocational = true; } else { obj.Vocational = false; }
                                    if (data[i].MinorSubject == "Y") { obj.MinorSubject = true; } else { obj.MinorSubject = false; }
                                    if (data[i].PostOfficeFlag == "Y") { obj.PostOfficeFlag = true; } else { obj.PostOfficeFlag = false; }
                                    obj.PostOffice = data[i].PostOffice;
                                    obj.PostOfficeDistance = data[i].PostOfficeDistance;
                                    obj.PoliceStationFlag = data[i].PoliceStationFlag;
                                    obj.PoliceStation = data[i].PoliceStation;
                                    obj.OtherCenterID = data[i].OtherCenterID;
                                    obj.PreZoneCntrID = data[i].PreZoneCntrID;
                                    obj.Distance = data[i].Distance;
                                    obj.IsGovt = data[i].IsGovt;
                                    obj.ExamCapacity = data[i].ExamCapacity;
                                    obj.FurnitureNo = data[i].FurnitureNo;
                                    obj.OFurnitureNo = data[i].OFurnitureNo;
                                    obj.TotalSeats = data[i].FurnitureNo + data[i].OFurnitureNo;
                                    obj.CCamerasNo = data[i].CCamerasNo;
                                    if (data[i].ElectricityFlag == "Y") { obj.ElectricityFlag = true; } else { obj.ElectricityFlag = false; }
                                    if (data[i].InternetFlag == "Y") { obj.InternetFlag = true; } else { obj.InternetFlag = false; }
                                    if (data[i].ComputerFlag == "Y") { obj.ComputerFlag = true; } else { obj.ComputerFlag = false; }
                                    if (data[i].PrinterFlag == "Y") { obj.PrinterFlag = true; } else { obj.PrinterFlag = false; }
                                }
                                $scope.PreZoneClgList.push(obj);
                                angular.element("#ColCode").focus();
                                $scope.PreZoneCenter.ColCode = "";

                                $scope.PreZoneCenter.JustificationReport = "";
                                $scope.PreZoneCenter.ChkNewCenter = false;
                                $scope.PreZoneCenter.ChkExistingCenter = true;
                                $scope.CheckExistingCenter(true);
                            }
                            $scope.PreZoneClgList = $scope.PreZoneClgList;
                            for (var k = 0; k < $scope.PreZoneClgList.length; k++) {
                                CenterCapacity = parseFloat(CenterCapacity) + parseFloat($scope.PreZoneClgList[k].ExamCapacity);
                            }
                            $scope.PreZoneCenter.TotalStudentCapacity = parseFloat(CenterCapacity);
                            $scope.PreZoneCenter.Diffrence = parseFloat(ZoneCapacity) - parseFloat(CenterCapacity);
                            if (parseFloat($scope.PreZoneCenter.Diffrence) < 0) {
                                $scope.PreZoneCenter.BlnRemainsStudent = true;
                            }
                            $scope.PreZoneCenter.MgmtCode = "";
                            $scope.PreZoneCenter.ColType = "";

                            $scope.PreZoneCenter.JustificationReport = "";
                            $scope.PreZoneCenter.ChkNewCenter = false;
                            $scope.PreZoneCenter.ChkExistingCenter = true;
                            $scope.CheckExistingCenter(true);
                        } else {
                            $scope.PreZoneCenter.ColType = data[0].IsGovt;
                            if (data[0].JustificationReport != "") {
                                $scope.PreZoneCenter.JustificationReport = data[0].JustificationReport;
                            }
                        }
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.Delete = function (index) {
            CenterCapacity = 0;
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                var PrezoneCntrId = $scope.PreZoneClgList[index].PreZoneCntrID;
                if (PrezoneCntrId > 0) {
                    var PreZoneCentrdata = PreZoneCenterService.GetPreZoneCenterCount(PrezoneCntrId, AppSettings.LoggedUserId);
                    PreZoneCentrdata.then(function (data) {
                        if (data > 0) {
                            return;
                        } else {
                            $scope.PreZoneClgList.splice(index, 1);
                            for (var i = 0; i < $scope.PreZoneClgList.length; i++) {
                                $scope.PreZoneClgList[i].SrNo = i + 1;
                            }
                        }
                    }, function (data) {
                        
                        if (error == '[{"Id":"","Message":"Already approved or forwared by higher authority, you cant edit"}]') {
                            alert("Already forwarded you can't edit");
                        } else { alert(error);}
                    });
                } else {
                    $scope.PreZoneClgList.splice(index, 1);
                    for (var i = 0; i < $scope.PreZoneClgList.length; i++) {
                        $scope.PreZoneClgList[i].SrNo = i + 1;
                    }
                }
                for (var k = 0; k < $scope.PreZoneClgList.length; k++) {
                    CenterCapacity = parseFloat(CenterCapacity) + parseFloat($scope.PreZoneClgList[k].ExamCapacity);
                }
                $scope.PreZoneCenter.TotalStudentCapacity = parseFloat(CenterCapacity);
                $scope.PreZoneCenter.Diffrence = parseFloat(ZoneCapacity) - parseFloat(CenterCapacity);
                if (parseFloat($scope.PreZoneCenter.Diffrence) < 0) {
                    $scope.PreZoneCenter.BlnRemainsStudent = true;
                }
            }
        };

        var PreZoneCenter = [];
        $scope.SavePreZoneCenter = function () {            
            if (CheckValidation() == true) {

                var isConfirmed = confirm("Are you sure to save this record ?");
                if (isConfirmed == false) {
                    return;
                }

                $scope.isupdatableDisable = true;
                var PreZoneCenter = [];
                var  IsMSChecked = false;
                for (var k = 0; k < $scope.PreZoneClgList.length; k++)
                {
                    if ($scope.PreZoneClgList[k].MinorSubject == true)
                    {                         
                        IsMSChecked = true;
                        break;
                    }
                     
                }

                if (IsMSChecked == false) {
                    alert("Select atleast one Minor Subject");
                    $scope.isupdatableDisable = false;
                }
                else
                {
                    for (var k = 0; k < $scope.PreZoneClgList.length; k++) {
                        var obj = {};
                        if ($scope.PreZoneClgList[k].SensiCompli == true) { obj.SensiCompli = "Y"; }
                        else { obj.SensiCompli = "N"; }
                        if ($scope.PreZoneClgList[k].Vocational == true) { obj.Vocational = "Y"; }
                        else { obj.Vocational = "N"; }
                        if ($scope.PreZoneClgList[k].MinorSubject == true) { obj.MinorSubject = "Y"; }
                        else { obj.MinorSubject = "N"; }
                        if ($scope.PreZoneClgList[k].SameCity == true) { obj.SameCity = "Y"; }
                        else { obj.SameCity = "N"; }
                        if ($scope.PreZoneClgList[k].PostOfficeFlag == true) {
                            obj.PostOfficeFlag = "Y";
                        }
                        else {
                            obj.PostOfficeFlag = "N";
                            if (($scope.PreZoneClgList[k].PostOffice == "") || ($scope.PreZoneClgList[k].PostOffice == undefined)) {
                                alert("" + $scope.PreZoneClgList[k].ColCode + " : Post Office name is Compulsory ");
                                $scope.isupdatableDisable = false;
                                return;
                            }
                            if (($scope.PreZoneClgList[k].PostOfficeDistance == "") || ($scope.PreZoneClgList[k].PostOfficeDistance == undefined)) {
                                alert("" + $scope.PreZoneClgList[k].ColCode + " : Post Office Distance is Compulsory ");
                                $scope.isupdatableDisable = false;
                                return;
                            }
                        }
                        obj.PostOffice = $scope.PreZoneClgList[k].PostOffice;
                        if (($scope.PreZoneClgList[k].PostOfficeDistance == "") || $scope.PreZoneClgList[k].PostOfficeDistance == null) {
                            obj.PostOfficeDistance = 0;
                        }
                        else {
                            obj.PostOfficeDistance = $scope.PreZoneClgList[k].PostOfficeDistance;
                        }
                        obj.MultiCenter = $scope.PreZoneClgList[k].MultiCenter;
                        if ($scope.PreZoneCenter.ChkNewCenter == true) {
                            obj.JustificationReport = $scope.PreZoneCenter.JustificationReport;
                        } else {
                            obj.JustificationReport = "";
                        }
                        if ($scope.PreZoneClgList[k].PoliceStationFlag == true) {
                            obj.PoliceStationFlag = "Y";
                        }
                        else {
                            obj.PoliceStationFlag = "N";
                            if (($scope.PreZoneClgList[k].PoliceStation == "") || ($scope.PreZoneClgList[k].PoliceStation == undefined)) {
                                alert("" + $scope.PreZoneClgList[k].ColCode + " : Police Station name is Compulsory ");
                                $scope.isupdatableDisable = false;
                                return;
                            }
                            if (($scope.PreZoneClgList[k].Distance == "") || ($scope.PreZoneClgList[k].Distance == undefined) || ($scope.PreZoneClgList[k].Distance == 0)) {
                                alert("" + $scope.PreZoneClgList[k].ColCode + " : Police Distance is Compulsory ");
                                $scope.isupdatableDisable = false;
                                return;
                            }
                        }
                        obj.PoliceStation = $scope.PreZoneClgList[k].PoliceStation;
                        obj.OtherCenterID = $scope.PreZoneClgList[k].OtherCenterID;
                        obj.PreZoneCntrID = $scope.PreZoneClgList[k].PreZoneCntrID;
                        obj.Distance = $scope.PreZoneClgList[k].Distance;
                        obj.ExamCapacity = $scope.PreZoneClgList[k].ExamCapacity;
                        obj.IsGovt = $scope.PreZoneClgList[k].IsGovt;
                        obj.FurnitureNo = $scope.PreZoneClgList[k].FurnitureNo;
                        obj.OFurnitureNo = $scope.PreZoneClgList[k].OFurnitureNo;
                        obj.TotalSeats = $scope.PreZoneClgList[k].FurnitureNo + $scope.PreZoneClgList[k].OFurnitureNo;
                        obj.CCamerasNo = $scope.PreZoneClgList[k].CCamerasNo;

                        
                        if ($scope.PreZoneClgList[k].ElectricityFlag == true) {
                            obj.ElectricityFlag = "Y";
                        }
                        else {
                            obj.ElectricityFlag = "N";
                            alert("" + $scope.PreZoneClgList[k].ColCode + " : Electricity is Compulsory");
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        if ($scope.PreZoneClgList[k].InternetFlag == true) {
                            obj.InternetFlag = "Y";
                        }
                        else {
                            obj.InternetFlag = "N";
                            alert("" + $scope.PreZoneClgList[k].ColCode + " : Internet is Compulsory");
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        if ($scope.PreZoneClgList[k].ComputerFlag == true) {
                            obj.ComputerFlag = "Y";
                        }
                        else {
                            obj.ComputerFlag = "N";
                            alert("" + $scope.PreZoneClgList[k].ColCode + " : Computer is Compulsory");
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        if ($scope.PreZoneClgList[k].PrinterFlag == true) {
                            obj.PrinterFlag = "Y";
                        }
                        else {
                            obj.PrinterFlag = "N";
                            alert("" + $scope.PreZoneClgList[k].ColCode + " : Printer is Compulsory");
                            $scope.isupdatableDisable = false;
                            return;
                        }

                        obj.ZoneID = $scope.PreZoneCenter.ZoneID;
                        obj.CenterCollegeID = $scope.PreZoneClgList[k].CollegeID;
                        obj.CreLoginID = AppSettings.LoggedUserId;
                        obj.UpdLoginID = AppSettings.LoggedUserId;
                        obj.ExamInstID = AppSettings.ExamInstID;

                        $scope.PreZoneCenter.SysUsrGrpID = 0;
                        if (AppSettings.SysUsrGrpID == 7) {
                            obj.SysUsrGrpID = 9;
                        } else if (AppSettings.SysUsrGrpID == 9) {
                            obj.SysUsrGrpID = 2;
                        } else if (AppSettings.SysUsrGrpID == 2) {
                            obj.SysUsrGrpID = 11;
                        } else if (AppSettings.SysUsrGrpID == 11) {
                            obj.SysUsrGrpID = 23;
                        }
                        obj.DistrictID = $scope.PreZoneCenter.DistrictID;
                        PreZoneCenter.push(obj);
                    }

                    var isVocationalSelected = false;

                    for (var k = 0; k < $scope.PreZoneClgList.length; k++) {
                        if ($scope.PreZoneClgList[k].Vocational == true) { isVocationalSelected = true; break; }
                        else {
                        }
                    }

                    if (isVocationalSelected == true) {

                        


                        var getPromise = PreZoneCenterService.AddPreZoneCenter(PreZoneCenter);
                        getPromise.then(function (msg) {
                            $scope.isupdatableDisable = false;
                            alert("Added successfully!!");
                            RedirectToEntryPage();
                            $scope.PreZoneCenter.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
                            $scope.GetPreZoneData($scope.PreZoneCenter.DistrictID);
                        }, function (error) {
                            $scope.isupdatableDisable = false;
                            //alert(error);
                            if (error == '[{"Id":"","Message":"Already approved or forwared by higher authority, you cant edit"}]') {
                                alert("Already forwarded you can't edit");
                            } else { alert(error); }
                        });
                    }
                    else {
                        alert("Select atleast one center as vocational.");
                        $scope.isupdatableDisable = false;
                    }

                } 
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeletePreZoneCenter = function () {
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                var getData = PreZoneCenterService.DeletePreZoneCenter($scope.PreZoneCenter.PreZoneCntrID, AppSettings.LoggedUserId);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    RedirectToListPage();
                }, function (error) {
                    alert(error);
                });
            }
        }
        function CheckValidation() {
            if (($scope.PreZoneCenter.ZoneID == undefined) || ($scope.PreZoneCenter.ZoneID == "")) {
                alert("Select Zone");
                return false;
            }
            if (AppSettings.SysUsrGrpID != 23) {
                if (parseFloat($scope.PreZoneCenter.Diffrence) > 0) {
                    alert("Center Capacity must be greater than College strength capacity in zone");
                    return false;
                }
            }
            return true;
        }
        $scope.Exit = function () {
            //RedirectToListPage();
            $state.go('CenterManagemnet'); 
        }
        function RedirectToListPage() {
            $state.go('CenterManagemnet.PreZoneCenter');

        }
        function RedirectToEntryPage() {
            $scope.PreZoneCenter.ZoneID = undefined;
            $scope.PreZoneCenter.DistrictID = undefined;
            $scope.PreZoneClgList = [];
            $state.go('CenterManagemnet.PreZoneCenter');

        }
        $scope.SameCityClicked = function (obj) {
            if (obj.SameCity == true) {
                obj.PoliceStationFlag = obj.PostOfficeFlag;
                obj.PoliceStation = obj.PostOffice;
                obj.Distance = obj.PostOfficeDistance;
            }
            else if (obj.SameCity == false) {
                obj.PoliceStationFlag = false;
                obj.PoliceStation = "";
                obj.Distance = "";
            }
        };
        $scope.GetZoneDifferenceCapacity = function () {
            CenterCapacity = 0;
            for (var k = 0; k < $scope.PreZoneClgList.length; k++) {
                if ($scope.PreZoneClgList[k].ExamCapacity == "" || $scope.PreZoneClgList[k].ExamCapacity == undefined) {
                    $scope.PreZoneClgList[k].ExamCapacity = 0;
                } else {
                    if ($scope.PreZoneClgList[k].FurnitureNo == "" || $scope.PreZoneClgList[k].FurnitureNo == undefined) {
                        $scope.PreZoneClgList[k].FurnitureNo = 0;
                    }
                    
                    if ($scope.PreZoneClgList[k].OFurnitureNo == "" || $scope.PreZoneClgList[k].OFurnitureNo == undefined)
                    {
                        $scope.PreZoneClgList[k].OFurnitureNo = 0;
                    }
                    $scope.PreZoneClgList[k].FurnitureNo = $scope.PreZoneClgList[k].ExamCapacity;
                    if (parseInt($scope.PreZoneClgList[k].ExamCapacity) > parseInt($scope.PreZoneClgList[k].OFurnitureNo)) {
                        $scope.PreZoneClgList[k].FurnitureNo = parseInt($scope.PreZoneClgList[k].ExamCapacity) - parseInt($scope.PreZoneClgList[k].OFurnitureNo);
                        } else if (parseInt($scope.PreZoneClgList[k].ExamCapacity) < parseInt($scope.PreZoneClgList[k].OFurnitureNo)){
                        $scope.PreZoneClgList[k].FurnitureNo = parseInt($scope.PreZoneClgList[k].OFurnitureNo) - parseInt($scope.PreZoneClgList[k].ExamCapacity);
                    }
                    else if (parseInt($scope.PreZoneClgList[k].ExamCapacity) == parseInt($scope.PreZoneClgList[k].OFurnitureNo)) {
                        $scope.PreZoneClgList[k].FurnitureNo = 0;
                    }
                    else if (parseInt($scope.PreZoneClgList[k].ExamCapacity) == parseInt($scope.PreZoneClgList[k].FurnitureNo)) {
                        $scope.PreZoneClgList[k].OFurnitureNo = 0;
                    }
                    
                    $scope.PreZoneClgList[k].TotalSeats = parseInt($scope.PreZoneClgList[k].FurnitureNo) + parseInt($scope.PreZoneClgList[k].OFurnitureNo);
                }
                CenterCapacity = parseFloat(CenterCapacity) + parseFloat($scope.PreZoneClgList[k].ExamCapacity);
               
            }
            $scope.PreZoneCenter.TotalStudentCapacity = parseFloat(CenterCapacity);
            $scope.PreZoneCenter.Diffrence = parseFloat(ZoneCapacity) - parseFloat(CenterCapacity);
            if (parseFloat($scope.PreZoneCenter.Diffrence) < 0) {
                $scope.PreZoneCenter.BlnRemainsStudent = true;
            } else {
                $scope.PreZoneCenter.BlnRemainsStudent = false;
            }
        };
        $scope.CalTotalSeats = function (PreZoneClg) {
            PreZoneClg.TotalSeats = parseInt(PreZoneClg.ExamCapacity);
            //if (parseInt(PreZoneClg.FurnitureNo) > parseInt(PreZoneClg.TotalSeats))
            //{
            //    alert("With funrtinure must be less than student capacity");
            //    return;
            //}
            //if (parseInt(PreZoneClg.OFurnitureNo) > parseInt(PreZoneClg.TotalSeats)) {
            //    alert("Without funrtinure must be less than student capacity");
            //    return;
            //}  
            //if ((parseInt(PreZoneClg.FurnitureNo) + parseInt(PreZoneClg.OFurnitureNo)) != PreZoneClg.TotalSeats )
            //{
            //    alert("Total seat not matched with student capacity.");
            //    return;
            //}
            if ((parseInt(PreZoneClg.FurnitureNo) + parseInt(PreZoneClg.OFurnitureNo)) == PreZoneClg.TotalSeats) {
                PreZoneClg.TotalSeats = parseInt(PreZoneClg.FurnitureNo) + parseInt(PreZoneClg.OFurnitureNo);
            }
            else if (parseInt(PreZoneClg.OFurnitureNo) > parseInt(PreZoneClg.ExamCapacity)) {
                PreZoneClg.TotalSeats = parseInt(PreZoneClg.ExamCapacity);
                PreZoneClg.FurnitureNo = parseInt(PreZoneClg.ExamCapacity);
                PreZoneClg.OFurnitureNo = 0;
                return;
            }
            else if (parseInt(PreZoneClg.OFurnitureNo) < parseInt(PreZoneClg.FurnitureNo)) {
                PreZoneClg.FurnitureNo = parseInt(PreZoneClg.ExamCapacity) - parseInt(PreZoneClg.OFurnitureNo);
                PreZoneClg.TotalSeats = parseInt(PreZoneClg.FurnitureNo) + parseInt(PreZoneClg.OFurnitureNo);
                return;

            } else if (parseInt(PreZoneClg.OFurnitureNo) > parseInt(PreZoneClg.FurnitureNo)) {
                PreZoneClg.FurnitureNo = (parseInt(PreZoneClg.ExamCapacity) + parseInt(PreZoneClg.OFurnitureNo));
                PreZoneClg.TotalSeats = parseInt(PreZoneClg.FurnitureNo) + parseInt(PreZoneClg.OFurnitureNo);
                return;

            }
            
            
             
            //PreZoneClg.TotalSeats = parseInt(PreZoneClg.FurnitureNo) + parseInt(PreZoneClg.OFurnitureNo);

        }
        $scope.CheckChangePostOffice = function (PreZoneClg) {
            PreZoneClg.PostOffice = "";
            PreZoneClg.PostOfficeDistance = "";
        }
        $scope.CheckChangePoliceStation = function (PreZoneClg) {
            PreZoneClg.PoliceStation = "";
            PreZoneClg.Distance = "";
        }
    });
});