define(['app'], function (app) {
    app.controller("PreBridgeCourseTheoryCenterController", function ($scope, $state, $stateParams, AppSettings, PreBridgeCourseCenterService, BasicDistrictsService, BasicCourseService, BasicExamService, PreZoneService, PreZoneCenterService) {
        $scope.PreBridgeCourseTheoryCenter = { PreZoneCntrID: $stateParams.PreZoneCntrID };
        $scope.PreBridgeCourseTheoryCenter.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "";
        var PreBridgeCourseTheoryCenterRightsdata = [];
        $scope.BlnNewCenter = true;
        $scope.PreBridgeCourseTheoryCenter.BlnRemainsStudent = true;
        $scope.PreBridgeCourseTheoryCenter.Diffrence = 0;
        var ZoneCapacity = 0;
        var CenterCapacity = 0;
        PreBridgeCourseTheoryCenterRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreBridgeCourseTheoryCenterRightsdata.length; i++) {
            if (PreBridgeCourseTheoryCenterRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreBridgeCourseTheoryCenter.PreZoneCntrID == 0) {
                    if (PreBridgeCourseTheoryCenterRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreBridgeCourseTheoryCenterRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreBridgeCourseTheoryCenterRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        $scope.GetPreZoneData = function (DistrictID) {
            $scope.PreZoneClgList = [];
            $scope.PreZoneList = [];
            $scope.PreBridgeCourseTheoryCenter.IYearCount = 0;
            $scope.PreBridgeCourseTheoryCenter.IIYearCount = 0;
            $scope.PreBridgeCourseTheoryCenter.TotalStudentCapacity = 0;
            if (DistrictID != "") {
                var PreZoneList = PreZoneService.GetPreZoneListByDistrictIdWithYearTotal(DistrictID, AppSettings.ExamInstID, 1, "Y");
                PreZoneList.then(function (PreZoneData, status, headers, config, error) {
                    $scope.PreZoneList = PreZoneData;
                    for (var i = 0; i < $scope.PreZoneList.length; i++) {
                        $scope.PreZoneList[i].SrNo = i + 1;
                    }
                }, function (PreZoneData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.GetCenterInfoInCenterZone = function (event) {
            if (event.which == 13 || event.which == 9) {
                var PreCenterInfoList = PreZoneCenterService.GetCenterInfoInCenterZone($scope.PreBridgeCourseTheoryCenter.ColCode, $scope.PreBridgeCourseTheoryCenter.DistrictID, AppSettings.ExamInstID);
                PreCenterInfoList.then(function (CenterData, status, headers, config, error) {
                    if (CenterData.length > 0) {
                        $scope.PreBridgeCourseTheoryCenter.ColType = CenterData[0].ColType;
                        $scope.PreBridgeCourseTheoryCenter.ExamCapacity = CenterData[0].ExamCapacity;
                        $scope.PreBridgeCourseTheoryCenter.ColName = CenterData[0].ColName;
                        $scope.PreBridgeCourseTheoryCenter.CenterCollegeID = CenterData[0].CenterCollegeID;
                    } else {
                        alert("Zone Center is not created.");
                        return false;
                    }
                }, function (CenterData, status, headers, config) {
                    alert(error);
                });
            }
        }
        var gridColumns = [
            { field: "SrNo", headerText: "Sr", textAlign: ej.TextAlign.Left, isPrimaryKey: true, width: 10 },
            { field: "CenterCollegeID", headerText: "CenterCollegeID", visible: false, textAlign: ej.TextAlign.Left, width: 0 },
            { field: "PreDistrictCenterBridgeID", headerText: "PreDistrictCenterBridgeID", visible: false, textAlign: ej.TextAlign.Left, width: 0 },
            { field: "ZoneID", headerText: "ZoneID", visible: false, textAlign: ej.TextAlign.Left, width: 0 },
            { field: "ColCode", headerText: "Code", textAlign: ej.TextAlign.Left, width: 25 },
            { field: "ColName", headerText: "Center Name", textAlign: ej.TextAlign.Left, width: 70 },
            { field: "IYearGen", headerText: "I Year Total", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "IIYearGen", headerText: "II Year Total", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "CollegeCategory", headerText: "Center Type", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "ExamCapacity", headerText: "Center Capacity", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "ZoneCode", headerText: "Zone Code", textAlign: ej.TextAlign.Left, width: 30 }
        ];
        $scope.BasicCollegeist = [];
        $("#BasicCollege").ejGrid({
            dataSource: $scope.BasicCollegeist,
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
        //function DeleteRecord(args) {
        //    if (args.requestType == "delete") {
        //        for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
        //            $scope.BasicCollegeist[i].SrNo = i + 1;
        //        }
        //        var gridObj = $("#BasicCollege").ejGrid("instance");
        //        gridObj.refreshContent();
        //    }
        //}
        function DeleteRecord(args) {
            var gridObj = $("#BasicCollege").ejGrid("instance");
            var PreDistrictCenterBridgeID = gridObj.model.selectedRecords[0].PreDistrictCenterBridgeID;
            var getPromise = PreBridgeCourseCenterService.GetDeletePreBridgeCourseTheoryCenter(PreDistrictCenterBridgeID);
            getPromise.then(function (msg) {
                $scope.isupdatableDisable = false;
                alert("Delete successfully!!");
                $scope.ResetData();
            }, function (error) {
                $scope.isupdatableDisable = false;
                alert(error);
            });
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
            if (($scope.PreBridgeCourseTheoryCenter.DistrictID == undefined) || ($scope.PreBridgeCourseTheoryCenter.DistrictID == 0)) {
                alert("Select District");
                return;
            }
            if (($scope.PreBridgeCourseTheoryCenter.CourseID == undefined) || ($scope.PreBridgeCourseTheoryCenter.CourseID == 0)) {
                alert("Select Stream");
                return;
            }
            if (($scope.PreBridgeCourseTheoryCenter.ColCode == undefined) || ($scope.PreBridgeCourseTheoryCenter.ColCode == "")) {
                alert("Enter Center Code");
                return;
            }
            if (($scope.PreBridgeCourseTheoryCenter.ExamCapacity == undefined) || ($scope.PreBridgeCourseTheoryCenter.ExamCapacity == "")
                || ($scope.PreBridgeCourseTheoryCenter.ExamCapacity == 0)) {
                alert("Center Capacity not allowed zero");
                return;
            }
            if (($scope.PreBridgeCourseTheoryCenter.ColType == undefined) || ($scope.PreBridgeCourseTheoryCenter.ColType == "")
                || ($scope.PreBridgeCourseTheoryCenter.ColType == 0)) {
                alert("Center Type not allowed Blank ,please press Enter After write Center Code.");
                return;
            }
            if (($scope.PreBridgeCourseTheoryCenter.CenterCollegeID == undefined)
                || ($scope.PreBridgeCourseTheoryCenter.CenterCollegeID == 0)) {
                alert("please press Enter After write Center Code.");
                return;
            }
            if (($scope.PreBridgeCourseTheoryCenter.ColCode == undefined) || ($scope.PreBridgeCourseTheoryCenter.ColCode == "")) {
                alert("Enter Center Code");
                return;
            }
            for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                if ($scope.BasicCollegeist[i].CenterCollegeID == $scope.PreBridgeCourseTheoryCenter.CenterCollegeID) {
                    alert("already Linked this Center");
                    angular.element("#ColCode").focus();
                    $scope.PreBridgeCourseTheoryCenter.ColCode = "";
                    return;
                }
            }
            $scope.StrZones = "";
            $scope.StudentCountYear = 0;
            for (var i = 0; i < $scope.PreZoneList.length; i++) {
                if ($scope.PreZoneList[i].checked == false) {
                    if ($scope.StrZones != "") {
                        $scope.StrZones = $scope.StrZones + "," + $scope.PreZoneList[i].ZoneID;
                    } else {
                        $scope.StrZones = $scope.PreZoneList[i].ZoneID;
                    }
                }
            }
            $scope.StudentCountYear = 0;
            for (var i = 0; i < $scope.PreZoneList.length; i++) {
                if ($scope.PreZoneList[i].checkZone == true) {
                    if ($scope.PreZoneList[i].IIYearGen > $scope.PreZoneList[i].IYearGen) {
                        $scope.StudentCountYear = $scope.PreZoneList[i].IIYearGen;
                    } else
                        $scope.StudentCountYear = $scope.PreZoneList[i].IYearGen;
                }
                //$scope.StudentCountYear = $scope.StudentCountYear + parseInt($scope.PreZoneList[i].IYearGen) + parseInt($scope.PreZoneList[i].IIYearGen);
            }
            if ($scope.StudentCountYear > $scope.PreBridgeCourseTheoryCenter.ExamCapacity) {
                alert("Less Capacity than Students Count");
                $scope.BasicCollegeist = [];
                return;
            }
            var getCnt = PreBridgeCourseCenterService.GetCenterCodePresent($scope.PreBridgeCourseTheoryCenter.ColCode, AppSettings.ExamInstID, $scope.StrZones);
            getCnt.then(function (data) {
                if (data == 1) {
                    $scope.isupdatableDisable = false;
                    alert("Center is already created");
                    return;
                } else {
                    var Zones = [];
                    $scope.StudentCount = $scope.BasicCollegeist.length;
                    for (var i = 0; i < $scope.PreZoneList.length; i++) {
                        if (($scope.PreZoneList[i].checkZone == true) && (($scope.PreZoneList[i].checked == false) || ($scope.PreZoneList[i].checked == undefined))) {
                            var obj = {};
                            $scope.StudentCount = $scope.StudentCount + 1;
                            obj.SrNo = $scope.StudentCount;
                            obj.ZoneCode = $scope.PreZoneList[i].ZoneCode;
                            obj.ZoneName = $scope.PreZoneList[i].ZoneName;
                            obj.ZoneID = $scope.PreZoneList[i].ZoneID;
                            obj.IYearGen = $scope.PreZoneList[i].IYearGen;
                            obj.IIYearGen = $scope.PreZoneList[i].IIYearGen;
                            $scope.StudentCountYear = $scope.StudentCountYear + $scope.PreZoneList[i].IYearGen + $scope.PreZoneList[i].IIYearGen;
                            obj.ColCode = $scope.PreBridgeCourseTheoryCenter.ColCode;
                            obj.CollegeCategory = $scope.PreBridgeCourseTheoryCenter.ColType;
                            obj.ExamCapacity = $scope.PreBridgeCourseTheoryCenter.ExamCapacity;
                            obj.CenterCollegeID = $scope.PreBridgeCourseTheoryCenter.CenterCollegeID;
                            obj.ColName = $scope.PreBridgeCourseTheoryCenter.ColName;
                            obj.ColCode = $scope.PreBridgeCourseTheoryCenter.ColCode;
                            obj.ExamInstID = AppSettings.ExamInstID;
                            obj.CreLoginID = AppSettings.LoggedUserId;
                            obj.UpdLoginID = AppSettings.LoggedUserId;
                            $scope.BasicCollegeist.push(obj);
                        }
                    }
                    if ($scope.BasicCollegeist.length == 0) {
                        alert("No any Zone Selected");
                        return;
                    }

                    //$scope.BasicCollegeist = Zones;
                }
            }, function (error) {
                $scope.isupdatableDisable = false;
                alert(error);
            });
        }
        $scope.Delete = function (index) {
            CenterCapacity = 0;
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                var PrezoneCntrId = $scope.PreZoneClgList[index].PreZoneCntrID;
                if (PrezoneCntrId > 0) {
                    var PreZoneCentrdata = PreBridgeCourseCenterService.GetPreBridgeCourseTheoryCenterCount(PrezoneCntrId, AppSettings.LoggedUserId);
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
                        alert(error);
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
                $scope.PreBridgeCourseTheoryCenter.TotalStudentCapacity = parseFloat(CenterCapacity);
                $scope.PreBridgeCourseTheoryCenter.Diffrence = parseFloat(ZoneCapacity) - parseFloat(CenterCapacity);
                if (parseFloat($scope.PreBridgeCourseTheoryCenter.Diffrence) < 0) {
                    $scope.PreBridgeCourseTheoryCenter.BlnRemainsStudent = true;
                }
            }
        };
        $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 0;
        if (AppSettings.SysUsrGrpID == 7) {
            $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 9;
        } else if (AppSettings.SysUsrGrpID == 9) {
            $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 2;
        } else if (AppSettings.SysUsrGrpID == 2) {
            $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 11;
        } else if (AppSettings.SysUsrGrpID == 11) {
            $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 23;
        }
        var PreBridgeCourseTheoryCenter = [];
        $scope.SavePreBridgeCourseTheoryCenter = function () {
            if (CheckValidation() == true) {
                $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 0;
                if (AppSettings.SysUsrGrpID == 7) {
                    $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 9;
                } else if (AppSettings.SysUsrGrpID == 9) {
                    $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 2;
                } else if (AppSettings.SysUsrGrpID == 2) {
                    $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 11;
                } else if (AppSettings.SysUsrGrpID == 11) {
                    $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 23;
                }
                for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                    $scope.BasicCollegeist[i].DistrictID = $scope.PreBridgeCourseTheoryCenter.DistrictID;
                    $scope.BasicCollegeist[i].CourseID = $scope.PreBridgeCourseTheoryCenter.CourseID;
                    $scope.BasicCollegeist[i].ExamInstID = AppSettings.ExamInstID;
                    $scope.BasicCollegeist[i].CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicCollegeist[i].UpdLoginID = AppSettings.LoggedUserId;
                    $scope.BasicCollegeist[i].SysUsrGrpID = $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID;
                }
                $scope.PreGeneralCenterBridgeList = $scope.BasicCollegeist;
                var getPromise = PreBridgeCourseCenterService.AddPreBridgeCourseTheoryCenter($scope.PreGeneralCenterBridgeList);
                getPromise.then(function (msg) {
                    //if (msg == "") {
                    //    var error = '[{"Id":"","Message":"Approved by higher authority"}]';
                    //    alert(error);
                    //} else {
                      
                    //}
                    alert("Added successfully!!");
                    $scope.isupdatableDisable = false;
                    $scope.ResetData();
                }, function (error) {
                    $scope.isupdatableDisable = false;
                    alert(error);
                });
                //} else {
                //    $scope.PreBridgeCourseTheoryCenter.UpdLoginID = AppSettings.LoggedUserId;
                //    var getPromise = PreBridgeCourseCenterService.UpdatePreBridgeCourseTheoryCenter($scope.PreGeneralCenterBridgeList);
                //    getPromise.then(function (msg) {
                //        alert("Update successfully!!");
                //        $scope.ResetData();
                //    }, function (error) {
                //        $scope.isupdatableDisable = false;
                //        alert(error);
                //    });
                //}
            }
        }
        $scope.DeletePreBridgeCourseTheoryCenter = function () {
            $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 0;
            if (AppSettings.SysUsrGrpID == 7) {
                $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 9;
            } else if (AppSettings.SysUsrGrpID == 9) {
                $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 2;
            } else if (AppSettings.SysUsrGrpID == 2) {
                $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 11;
            } else if (AppSettings.SysUsrGrpID == 11) {
                $scope.PreBridgeCourseTheoryCenter.SysUsrGrpID = 23;
            }
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                var getData = PreBridgeCourseCenterService.DeletePreBridgeCourseTheoryCenter($scope.PreBridgeCourseTheoryCenter);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    RedirectToListPage();
                }, function (error) {
                    alert(error);
                });
            }
        }
        function CheckValidation() {
            if (($scope.PreBridgeCourseTheoryCenter.DistrictID == undefined) || ($scope.PreBridgeCourseTheoryCenter.DistrictID == 0)) {
                alert("Select District");
                return;
            }
            if (($scope.PreBridgeCourseTheoryCenter.CourseID == undefined) || ($scope.PreBridgeCourseTheoryCenter.CourseID == 0)) {
                alert("Select Stream");
                return;
            }
            if (($scope.PreBridgeCourseTheoryCenter.ColCode == undefined) || ($scope.PreBridgeCourseTheoryCenter.ColCode == "")) {
                alert("Enter Center Code");
                return;
            }
            if (($scope.PreBridgeCourseTheoryCenter.ExamCapacity == undefined) || ($scope.PreBridgeCourseTheoryCenter.ExamCapacity == "")
                || ($scope.PreBridgeCourseTheoryCenter.ExamCapacity == 0)) {
                alert("Center Capacity not allowed zero");
                return;
            }
            if (($scope.PreBridgeCourseTheoryCenter.ColType == undefined) || ($scope.PreBridgeCourseTheoryCenter.ColType == "")
                || ($scope.PreBridgeCourseTheoryCenter.ColType == 0)) {
                alert("Center Type not allowed Blank ,please press Enter After write Center Code.");
                return;
            }
            if (($scope.PreBridgeCourseTheoryCenter.ColCode == undefined) || ($scope.PreBridgeCourseTheoryCenter.ColCode == "")) {
                alert("Enter Center Code");
                return;
            }
            if ($scope.BasicCollegeist.length == 0) {
                alert("No any Center present");
                return;
            }
            return true;
        }
        $scope.Exit = function () {
            //RedirectToListPage();
            $state.go('CenterManagemnet');
        }
        function RedirectToListPage() {
            $state.go('CenterManagemnet');

        }
        function RedirectToEntryPage() {
            $scope.PreBridgeCourseTheoryCenter.ZoneID = undefined;
            $scope.PreBridgeCourseTheoryCenter.DistrictID = undefined;
            $scope.PreZoneClgList = [];
            $state.go('CenterManagemnet');
        }
        $scope.ResetData = function () {
            $scope.PreBridgeCourseTheoryCenter.ColCode = "";
            $scope.PreBridgeCourseTheoryCenter.ColCode = "";
            $scope.PreBridgeCourseTheoryCenter.ColType = "";
            $scope.PreBridgeCourseTheoryCenter.ExamCapacity = "";
            $scope.BasicCollegeist = [];
            $scope.isdeletableDisable = true;
            $scope.PreBridgeCourseTheoryCenter.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetPreZoneData($scope.PreBridgeCourseTheoryCenter.DistrictID);
            //FillListData();
            $scope.FillListDataNew($scope.PreBridgeCourseTheoryCenter.DistrictID);
        }
        $scope.getdistrictchange = function (DistrictID) {
            $scope.FillListDataNew(DistrictID);
        }
        $scope.GetCheckZone = function (obj) {
            if (obj.checkZone == false) {
                if ($scope.headercheck == true) { $scope.headercheck = false; }
            }
            var checkCnt = 0;
            for (var i = 0; i < $scope.PreZoneList.length; i++) {
                if ($scope.PreZoneList[i].checkZone == true) {
                    checkCnt = checkCnt + 1;
                }
            }
            if ($scope.PreZoneList.length == checkCnt) {
                $scope.headercheck = true;
            }
        }
        $scope.GetCheckStudentHeader = function (headercheck) {
            for (var i = 0; i < $scope.PreZoneList.length; i++) {
                if (headercheck == true) {
                    $scope.PreZoneList[i].checkZone = true;
                }
                else {
                    $scope.PreZoneList[i].checkZone = false;
                }
            }
        }
        var gridColumns = [
            { field: "SrNo", headerText: "Sr.No.", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "DistName", headerText: "District", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "ColCode", headerText: "Center Code", textAlign: ej.TextAlign.Left, width: 70 },
            { field: "ColName", headerText: "Center Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "ZoneCount", headerText: "Zone Count", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "ExamCapacity", headerText: "Exam Capacity", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "CollegeCategory", headerText: "Category", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "IYearGen", headerText: "IYearGen", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "IIYearGen", headerText: "IIYearGen", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "CenterCollegeID", headerText: "CenterCollegeID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.PreBridgeCourseTheoryCenterList = [];
        $("#PreBridgeCourseTheoryCenterGrid").ejGrid({
            dataSource: $scope.PreBridgeCourseTheoryCenterList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
            editSettings: { allowAdding: true },
            toolbarClick: function (args) {
                if (args.itemName == "Add") {
                    args.cancel = true;
                    AddNew();
                }
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
                $scope.PreBridgeCourseTheoryCenter.CenterCollegeID = sender.data.CenterCollegeID;
                FillData();
                $scope.DistEnable = true;
                $scope.isdeletableDisable = false;
            }
        }
        FillListData();
        function FillListData() {
            var PreExamManagementNewdata = PreBridgeCourseCenterService.GetPreBridgeCourseTheoryCenterList(AppSettings.DistrictIDs, AppSettings.ExamInstID);
            PreExamManagementNewdata.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].SrNo = i + 1;
                }
                $scope.PreBridgeCourseTheoryCenterList = data;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillListDataNew = function (DistrictID) {
            var PreExamManagementNewdata = PreBridgeCourseCenterService.GetPreBridgeCourseTheoryCenterList(DistrictID, AppSettings.ExamInstID);
            PreExamManagementNewdata.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].SrNo = i + 1;
                }
                $scope.PreBridgeCourseTheoryCenterList = data;
            }, function (error) {
                alert(error);
            });
        }
        FillData();
        function FillData() {
            //var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);

            var BasicDistrictList = [];

            if (AppSettings.SysUsrGrpID != 23) {
                BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
            } else {
                BasicDistrictList = BasicDistrictsService.GetDistrictListForCOE(AppSettings.ExamInstID,5);
            }

            BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                $scope.BasicDistrictList = DistrictData;
                if (($scope.PreBridgeCourseTheoryCenter.CenterCollegeID == 0) || ($scope.PreBridgeCourseTheoryCenter.CenterCollegeID == undefined)) {
                    $scope.PreBridgeCourseTheoryCenter.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
                }
                if (AppSettings.SysUsrGrpID == 23) { $scope.FillListDataNew($scope.PreBridgeCourseTheoryCenter.DistrictID); }
                var BasicCourseList = BasicCourseService.GetBasicCourseList();
                BasicCourseList.then(function (CourseData, status, headers, config, error) {
                    $scope.BasicCourseList = CourseData;
                    $scope.PreBridgeCourseTheoryCenter.CourseID = "1";
                    if ($scope.PreBridgeCourseTheoryCenter.CenterCollegeID == undefined) { $scope.PreBridgeCourseTheoryCenter.CenterCollegeID = 0; }
                    if ($scope.PreBridgeCourseTheoryCenter.CenterCollegeID > 0) {
                        $scope.CollegeDisable = true;
                        var CenterCollegeID = $scope.PreBridgeCourseTheoryCenter.CenterCollegeID;
                        var PreExamManagementNewdata = PreBridgeCourseCenterService.GetPreBridgeCourseTheoryCenterListByID(CenterCollegeID, AppSettings.DistrictIDs, AppSettings.ExamInstID, 1);
                        PreExamManagementNewdata.then(function (data) {
                            $scope.PreBridgeCourseTheoryCenter = data[0];
                            $scope.PreBridgeCourseTheoryCenter.ColType = data[0].CollegeCategory;
                            $scope.PreBridgeCourseTheoryCenter.ExamInstID = $scope.PreBridgeCourseTheoryCenter.ExamInstID;
                            $scope.PreBridgeCourseTheoryCenter.DistrictID = "" + data[0].DistrictID + "";
                            $scope.PreBridgeCourseTheoryCenter.CourseID = "" + data[0].CourseID + "";
                            $scope.PreZoneList = data[0].PreZone;
                            for (var i = 0; i < $scope.PreZoneList.length; i++) {
                                $scope.PreZoneList[i].SrNo = i + 1;
                                if ($scope.PreZoneList[i].checkZone == true) {
                                    $scope.PreZoneList[i].checked = true;
                                }
                                else {
                                    $scope.PreZoneList[i].checked = false;
                                }
                            }
                            var Zones = [];
                            $scope.StudentCount = 0;
                            for (var i = 0; i < data.length; i++) {
                                var obj = {};
                                $scope.StudentCount = $scope.StudentCount + 1;
                                obj.SrNo = $scope.StudentCount;
                                obj.PreDistrictCenterBridgeID = data[i].PreDistrictCenterBridgeID;
                                obj.ZoneID = data[i].ZoneID;
                                obj.IYearGen = data[i].IYearGen;
                                obj.IIYearGen = data[i].IIYearGen;
                                obj.ColCode = data[i].ColCode;
                                obj.ZoneCode = data[i].ZoneCode;
                                obj.CollegeCategory = data[i].CollegeCategory;
                                obj.ExamCapacity = data[i].ExamCapacity;
                                obj.CenterCollegeID = data[i].CenterCollegeID;
                                obj.ColName = data[i].ColName;
                                obj.ExamInstID = AppSettings.ExamInstID;
                                obj.CreLoginID = AppSettings.LoggedUserId;
                                obj.UpdLoginID = AppSettings.LoggedUserId;
                                Zones.push(obj);
                            }
                            if (Zones.length == 0) {
                                alert("No any Zone Selected");
                                return;
                            }
                            $scope.BasicCollegeist = Zones;
                        }, function (error) {
                            alert(error);
                        });
                    }
                }, function (CourseData, status, headers, config) {
                    alert(error);
                });
                $scope.GetPreZoneData($scope.PreBridgeCourseTheoryCenter.DistrictID);
            }, function (Castdata, status, headers, config) {
                alert(error);
            });
        }
    });
});