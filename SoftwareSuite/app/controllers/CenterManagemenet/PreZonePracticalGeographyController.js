define(['app'], function (app) {
    app.controller("PreZonePracticalGeographyController", function ($scope, $state, $stateParams, AppSettings, PreZoneService, BasicDistrictsService, BasicMandalService, BasicCollegeService) {
        $scope.PreZone = {};
        $scope.PreZone.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreZoneRightsdata = [];
        $scope.PreZone.IYearTotal = 0;
        $scope.PreZone.IIYearTotal = 0;
        PreZoneRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreZoneRightsdata.length; i++) {
            if (PreZoneRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreZone.ZoneID == 0) {
                    if (PreZoneRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreZoneRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreZoneRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        $scope.isdeletableDisable = true;
        $scope.isupdatableDisable = false;
        $scope.DistEnable = false;
        FillData();
        function FillData() {
            // var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);

            var BasicDistrictList = [];

            if (AppSettings.SysUsrGrpID != 23) {
                BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
            } else {
                BasicDistrictList = BasicDistrictsService.GetDistrictListForCOE(AppSettings.ExamInstID,6);
            }

            BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                $scope.BasicDistrictList = DistrictData;
                $scope.PreZone.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
                if ($scope.PreZone.ZoneID > 0) {
                    var PreZonedata = PreZoneService.GetPreZoneById($scope.PreZone.ZoneID, 6);
                    PreZonedata.then(function (data) {
                        $scope.PreZone = data[0];
                        $scope.PreZone.IYearTotal = 0;
                        $scope.PreZone.IIYearTotal = 0;
                        $scope.BasicCollegeList = data[0].BasicCollege;
                        $scope.PreZone.DistrictID = "" + data[0].DistrictID + "";
                        for (var i = 0; i < $scope.BasicCollegeList.length; i++) {
                            $scope.PreZone.IYearTotal = parseFloat($scope.PreZone.IYearTotal) + parseFloat($scope.BasicCollegeList[i].IYearGrandTotal);
                            $scope.PreZone.IIYearTotal = parseFloat($scope.PreZone.IIYearTotal) + parseFloat($scope.BasicCollegeList[i].IIYearGrandTotal);
                        }
                    }, function (error) {
                        alert(error);
                    });
                }
            }, function (Castdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.PreZone.SysUsrGrpID = 0;
        if (AppSettings.SysUsrGrpID == 7) {
            $scope.PreZone.SysUsrGrpID = 9;
        } else if (AppSettings.SysUsrGrpID == 9) {
            $scope.PreZone.SysUsrGrpID = 2;
        } else if (AppSettings.SysUsrGrpID == 2) {
            $scope.PreZone.SysUsrGrpID = 11;
        } else if (AppSettings.SysUsrGrpID == 11) {
            $scope.PreZone.SysUsrGrpID = 23;
        }
        $scope.SavePreZone = function () {
            $scope.isupdatableDisable = true;
            if ($scope.PreZone.ZoneID == undefined) { $scope.PreZone.ZoneID = 0; }
            if (CheckValidation() == true) {
                $scope.PreZone.BasicCollege = $scope.BasicCollegeList;
                $scope.PreZone.SysUsrGrpID = 0;
                if (AppSettings.SysUsrGrpID == 7) {
                    $scope.PreZone.SysUsrGrpID = 9;
                } else if (AppSettings.SysUsrGrpID == 9) {
                    $scope.PreZone.SysUsrGrpID = 2;
                } else if (AppSettings.SysUsrGrpID == 2) {
                    $scope.PreZone.SysUsrGrpID = 11;
                } else if (AppSettings.SysUsrGrpID == 11) {
                    $scope.PreZone.SysUsrGrpID = 23;
                }
                if ($scope.PreZone.ZoneID == 0) {
                    $scope.PreZone.ZoneType = 6;
                    $scope.PreZone.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PreZone.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.PreZone.ExamInstID = AppSettings.ExamInstID;
                    var getPromise = PreZoneService.AddPreZone($scope.PreZone);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"ZoneName","Message":"Duplicate Name"},{"Id":"ZoneCode","Message":"Duplicate Code"}]') {
                            alert("Duplicate Name and Code");
                        }
                        else if (error == '[{"Id":"ZoneName","Message":"Duplicate Name"}]') {
                            alert("Duplicate Name");
                        }
                        else if (error == '[{"Id":"ZoneCode","Message":"Duplicate Code"}]') {
                            alert("Duplicate Code");
                        } else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.PreZone.ZoneType = 6;
                    $scope.PreZone.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.PreZone.ExamInstID = AppSettings.ExamInstID;
                    var getPromise = PreZoneService.UpdatePreZone($scope.PreZone);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"ZoneName","Message":"Duplicate Name"},{"Id":"ZoneCode","Message":"Duplicate Code"}]') {
                            alert("Duplicate Name and Code");
                        }
                        else if (error == '[{"Id":"ZoneName","Message":"Duplicate Name"}]') {
                            alert("Duplicate Name");
                        }
                        else if (error == '[{"Id":"ZoneCode","Message":"Duplicate Code"}]') {
                            alert("Duplicate Code");
                        } else {
                            alert(error);
                        }
                        //alert(error);
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeletePreZone = function () {
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                var getData = PreZoneService.DeletePreZone($scope.PreZone.ZoneID, AppSettings.LoggedUserId, 6);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    RedirectToListPage();
                }, function (error) {
                    alert(error);
                });
            }
        }
        function CheckValidation() {

            if (($scope.PreZone.DistrictID == undefined) || ($scope.PreZone.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PreZone.ZoneName == undefined) || ($scope.PreZone.ZoneName == "")) {
                alert("Enter Name");
                return false;
            }
            if ($scope.IsDelete != true) {
                if ($scope.BasicCollegeList.length == 0) {
                    alert("Enter College to Alloted ");
                    return false;
                }
            }
            return true;
        }
        $scope.Exit = function () {
            //RedirectToListPage();
            $state.go('CenterManagemnet');
            //$scope.DistEnable = false;
        }


        $scope.ResetData = function () {
            $scope.PreZone = {};
            $scope.PreZone.ExamInstID = AppSettings.ExamInstID;
            var PageNm = $state.current.name.split(".")[1] + "List";
            var PreZoneRightsdata = [];
            $scope.PreZone.IYearTotal = 0;
            $scope.PreZone.IIYearTotal = 0;
            PreZoneRightsdata = AppSettings.UserRights;
            for (var i = 0; i < PreZoneRightsdata.length; i++) {
                if (PreZoneRightsdata[i].GridFormToOpen == PageNm) {
                    if ($scope.PreZone.ZoneID == 0) {
                        if (PreZoneRightsdata[i].isaddable == 'Y') {
                            $scope.isupdatableDisable = false;
                        } else {
                            $scope.isupdatableDisable = true;
                        }
                        $scope.isdeletableDisable = true;
                    } else {
                        if (PreZoneRightsdata[i].isupdatable == 'Y') {
                            $scope.isupdatableDisable = false;
                        }
                        else {
                            $scope.isupdatableDisable = true;
                        }
                        if (PreZoneRightsdata[i].isdeletable == 'Y') {
                            $scope.isdeletableDisable = false;
                        } else {
                            $scope.isdeletableDisable = true;
                        }
                    }
                }
            }
            $scope.isupdatableDisable = false;
            $scope.DistEnable = false;
            $scope.IsDelete = false;
            $scope.BasicCollegeList = [];

        }


        function RedirectToListPage() {
            $scope.PreZone = {};
            $scope.BasicCollegeList = {};
            $scope.isupdatableDisable = false;
            $scope.DistEnable = false;
            $scope.IsDelete = false;
            FillListData();
            $state.go('CenterManagemnet.PreZonePracticalGeography');
        }
        var gridColumns = [
            { field: "SrNo", headerText: " Sr No ", textAlign: ej.TextAlign.Left, isPrimaryKey: true, width: 20 },
            { field: "ColCode", headerText: "College Code", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "ColName", headerText: "College Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "IsGovt", headerText: "Clg Type", textAlign: ej.TextAlign.Left, width: 25 },
            { field: "Geog_67", headerText: "Geography", textAlign: ej.TextAlign.Left, width: 25 }
            //{ field: "Zoo_40", headerText: "Zoology", textAlign: ej.TextAlign.Left, width: 25 },
            //{ field: "Phy_43", headerText: "Physics", textAlign: ej.TextAlign.Left, width: 25 },
            //{ field: "Che_44", headerText: "Chemistry", textAlign: ej.TextAlign.Left, width: 25 },
            //{ field: "IYearGen", headerText: "I Year Gen.", textAlign: ej.TextAlign.Right, width: 30 },
            //{ field: "IYearVoc", headerText: "I Year Voc.", textAlign: ej.TextAlign.Right, width: 30 },
            //{ field: "IYearTot", headerText: "Total", textAlign: ej.TextAlign.Right, width: 30 },
            //{ field: "IYearFourtyPer", headerText: "40 %", textAlign: ej.TextAlign.Right, width: 30 },
            //{ field: "IYearGrandTotal", headerText: "Total", textAlign: ej.TextAlign.Right, width: 30 },
            //{ field: "IIYearGen", headerText: "II Year Gen.", textAlign: ej.TextAlign.Right, width: 30 },
            //{ field: "IIYearVoc", headerText: "II Year Voc.", textAlign: ej.TextAlign.Right, width: 30 },
            //{ field: "IIYearGrandTotal", headerText: "Total", textAlign: ej.TextAlign.Right, width: 30 },
        ];
        $scope.BasicCollegeList = [];
        $("#BasicCollege").ejGrid({
            dataSource: $scope.BasicCollegeList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: false,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: false,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Delete, ej.Grid.ToolBarItems.Search] },
            editSettings: {
                allowEditing: false, allowAdding: false, allowDeleting: true, editMode: ej.Grid.EditMode.DialogTemplate,
            },
            toolbarClick: function (args) {
                if (args.itemName == "Delete") {
                    var isConfirmed = confirm("Are you sure to delete this record ?");
                    if (isConfirmed) {
                        DeleteRecord(args);
                    } else {
                        args.cancel();
                    }
                }
            },
            columns: gridColumns
        });
        $scope.IsDelete = false;
        function DeleteRecord(args) {
            $scope.IsDelete = false;
            if (args.requestType == "delete") {
                $scope.PreZone.IYearTotal = 0;
                $scope.PreZone.IIYearTotal = 0;
                for (var i = 0; i < $scope.BasicCollegeList.length; i++) {
                    $scope.BasicCollegeList[i].SrNo = i + 1;
                    $scope.PreZone.IYearTotal = parseFloat($scope.PreZone.IYearTotal) + parseFloat($scope.BasicCollegeList[i].IYearGrandTotal);
                    $scope.PreZone.IIYearTotal = parseFloat($scope.PreZone.IIYearTotal) + parseFloat($scope.BasicCollegeList[i].IIYearGrandTotal);
                }
                var gridObj = $("#BasicCollege").ejGrid("instance");
                gridObj.refreshContent();
            }
        }
        $scope.FillGrid = function (event) {
            if (event.which == 13) {
                $scope.ShowCollegesFunction();
            }
        }
        $scope.ShowColleges = function () {
            $scope.ShowCollegesFunction();
        }
        $scope.ShowCollegesFunction = function () {

            if (($scope.PreZone.DistrictID == undefined) || ($scope.PreZone.DistrictID == 0)) {
                alert("First Select District");
                return;
            }
            if ($scope.PreZone.ColCode == undefined) {
                $scope.PreZone.ColCode = "";
            }
            if ($scope.PreZone.ColCode != "") {


            }
            if ($scope.PreZone.ColCode != "") {
                var PreZoneCollegedata = PreZoneService.GetPreZoneCollegeCount(AppSettings.ExamInstID, $scope.PreZone.ColCode, 6);
                PreZoneCollegedata.then(function (data) {
                    if (data.length > 0) {
                        alert("It is allocated to Zone");
                        return;
                    }
                    var BasicCollegeData = BasicCollegeService.GetCollegeListByColCode($scope.PreZone.DistrictID, AppSettings.ExamInstID, $scope.PreZone.ColCode, 6);
                    BasicCollegeData.then(function (data) {
                        if (data.length == 0) {
                            alert("College Code Not found");
                            angular.element("#ColCode").focus();
                            $scope.PreZone.ColCode = "";
                            return;
                        }
                        for (var i = 0; i < $scope.BasicCollegeList.length; i++) {
                            if ($scope.BasicCollegeList[i].CollegeID == data[0].CollegeID) {
                                alert("already Linked this college code");
                                angular.element("#ColCode").focus();
                                $scope.PreZone.ColCode = "";
                                return;
                            }
                        }
                        var PreZoneCollegedataStream = PreZoneService.GetCheckStreamOfCollege($scope.PreZone.ColCode, 1);
                        PreZoneCollegedataStream.then(function (dataCnt) {
                            if (dataCnt == 0) {
                                alert("General Stream not available in this College");
                                return;
                            } else {
                                for (var i = 0; i < data.length; i++) {
                                    var obj = {};
                                    obj.SrNo = $scope.BasicCollegeList.length + 1;
                                    obj.CollegeID = data[i].CollegeID;
                                    obj.ColName = data[i].ColName;
                                    obj.ColCode = data[i].ColCode;
                                    obj.IsGovt = data[i].IsGovt;
                                    obj.IYearGen = data[i].IYearGen;
                                    obj.IYearVoc = data[i].IYearVoc;
                                    obj.IYearTot = data[i].IYearTot;
                                    obj.IYearFourtyPer = data[i].IYearFourtyPer;
                                    obj.IYearGrandTotal = data[i].IYearGrandTotal;
                                    obj.IIYearGen = data[i].IIYearGen;
                                    obj.IIYearVoc = data[i].IIYearVoc;
                                    obj.IIYearGrandTotal = data[i].IIYearGrandTotal;
                                    //obj.Bot_39 = data[i].Bot_39;
                                    //obj.Zoo_40 = data[i].Zoo_40;
                                    //obj.Phy_43 = data[i].Phy_43;
                                    //obj.Che_44 = data[i].Che_44;
                                    obj.Geog_67 = data[i].Geog_67;
                                    $scope.PreZone.IYearTotal = parseFloat($scope.PreZone.IYearTotal) + parseFloat(data[i].IYearGrandTotal);
                                    $scope.PreZone.IIYearTotal = parseFloat($scope.PreZone.IIYearTotal) + parseFloat(data[i].IIYearGrandTotal);
                                    $scope.BasicCollegeList.push(obj);
                                    angular.element("#ColCode").focus();
                                    $scope.PreZone.ColCode = "";
                                }
                                $scope.BasicCollegeList = $scope.BasicCollegeList;
                                $scope.PreZone.IYearCount = 0;
                                $scope.PreZone.IIYearCount = 0;
                            }
                        }, function (error) {
                            alert(error);
                        });
                    }, function (error) {
                        alert(error);
                    });

                }, function (error) {
                    alert(error);
                });
            }
        }
        var gridColumns = [
            { field: "DistName", headerText: "District", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "ZoneName", headerText: " Zone Name ", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "ZoneCode", headerText: " Code ", textAlign: ej.TextAlign.Left, width: 20 },
            //{ field: "Active", headerText: "Active", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "ZoneID", headerText: "ZoneID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.PreZoneList = [];
        $("#PreZone").ejGrid({
            dataSource: $scope.PreZoneList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
            editSettings: { allowAdding: true },
            toolbarClick: function (args) {
                //if (args.itemName == "Add") {
                //    args.cancel = true;
                //    AddNew();
                //}
                if (args.itemName == "Excel Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToExcelUrl);
                }
                if (args.itemName == "Word Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToWordUrl);
                }
                if (args.itemName == "PDF Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToPdfUrl);
                }
            },
            columns: gridColumns
        });
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $scope.PreZone.ZoneID = sender.data.ZoneID;
                FillData();
                $scope.DistEnable = true;
                if ($scope.PreZone.ZoneID > 0) {
                    $scope.isdeletableDisable = false;
                } else {
                    $scope.isdeletableDisable = true;
                }

            }
        }
        $scope.ClearGrid = function ClearGrid() {
            $scope.BasicCollegeList = [];
        }
        FillListData();
        function FillListData() {
            var PreZonedata = PreZoneService.GetPreZoneList(AppSettings.ExamInstID, 6, AppSettings.DistrictIDs);
            PreZonedata.then(function (data) {
                $scope.PreZoneList = data;
            }, function (error) {
                alert(error);
            });
        }

        $scope.DeletePreZone = function () {
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                $scope.PreZone.ZoneType = "6";
                $scope.PreZone.UpdLoginID = AppSettings.LoggedUserId;
                //var getData = PreZoneService.DeletePreZone($scope.PreZone.ZoneID, AppSettings.LoggedUserId, "2");
                var getData = PreZoneService.DeletePreZone($scope.PreZone);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    $scope.isdeletableDisable = true;
                    $scope.DistEnable = false;
                    RedirectToListPage();
                }, function (error) {
                    $scope.isdeletableDisable = false;
                    alert(error);
                });
            }
        }


    });
});
