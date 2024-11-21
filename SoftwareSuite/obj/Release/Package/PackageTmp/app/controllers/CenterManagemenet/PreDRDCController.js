define(['app'], function (app) {
    app.controller("PreDRDCController", function ($scope, $state, $stateParams, AppSettings, PreDRDCService, BasicDistrictsService, BasicCollegeService, BasicCourseService, BasicExamService) {
        $scope.PreDRDC = {};
        $scope.PreDRDC.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreDRDCRightsdata = [];
        $scope.EnableCodeCenterName = false;
        $scope.PreDRDC.DRDCCenterName = "";
        $scope.PreDRDC.DRDCCenterCode = "";
        PreDRDCRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreDRDCRightsdata.length; i++) {
            if (PreDRDCRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreDRDC.DRDCID == 0) {
                    if (PreDRDCRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreDRDCRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreDRDCRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.isupdatableDisable = false;
        $scope.DistEnable = false;
        FillData();
        $scope.EnableCenterCollege = false;
        $scope.EnableYear = false;
        function FillData() {
            var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
            BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                $scope.BasicDistrictList = DistrictData;
                //var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(0);
                //BasicCollegeList.then(function (BasicCollegeData, status, headers, config, error) {
                //    $scope.BasicCollegeList = BasicCollegeData;
                    if ($scope.PreDRDC.DRDCID > 0) {
                        var PreDRDCdata = PreDRDCService.GetPreDRDCById($scope.PreDRDC.DRDCID);
                        PreDRDCdata.then(function (data) {
                            $scope.PreDRDC = data[0];
                            $scope.DistrictList = data[0].PreDRDCDistrict;
                            $scope.EnableCenterCollege = true;
                            $scope.EnableYear = true;
                        }, function (error) {
                            alert(error);
                        });
                    }
                //}, function (BasicCollegeData, status, headers, config) {
                //    alert(error);
                //})
            }, function (Castdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.GetCollCenterName = function (CollegeID) {
            if (CollegeID != undefined) {
                if (CollegeID != "") {
                    $scope.EnableCodeCenterName = true;
                    for (var i = 0; i < $scope.BasicCollegeList.length; i++) {
                        if (CollegeID == $scope.BasicCollegeList[i].CollegeID) {
                            $scope.PreDRDC.DRDCCenterName = $scope.BasicCollegeList[i].ColName;
                            $scope.PreDRDC.DRDCCenterCode = $scope.BasicCollegeList[i].ColCode;
                        }
                    }
                } else {
                    $scope.PreDRDC.DRDCCenterName = "";
                    $scope.PreDRDC.DRDCCenterCode = "";
                    $scope.EnableCodeCenterName = false;
                }
            } else {
                $scope.PreDRDC.DRDCCenterName = "";
                $scope.PreDRDC.DRDCCenterCode = "";
                $scope.EnableCodeCenterName = false;
            }
        }
        $scope.GetCollegeData = function (DistrictID) {
            if (DistrictID != undefined) {
                if (DistrictID != "") {
                    $scope.EnableCenterCollege = false;
                    var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(DistrictID);
                    BasicCollegeList.then(function (BasicCollegeData, status, headers, config, error) {
                        $scope.BasicCollegeList = BasicCollegeData;
                    }, function (BasicCollegeData, status, headers, config) {
                        alert(error);
                    })
                }
            }
        }
        $scope.SavePreDRDC = function () {
            $scope.isupdatableDisable = true;
            if ($scope.PreDRDC.DRDCID == undefined) { $scope.PreDRDC.DRDCID = 0; }
            if (CheckValidation() == true) {
                $scope.PreDRDC.PreDRDCDistrict = $scope.DistrictList;
                if ($scope.PreDRDC.DRDCID == 0) {
                    $scope.PreDRDC.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PreDRDC.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreDRDCService.AddPreDRDC($scope.PreDRDC);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.PreDRDC.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreDRDCService.UpdatePreDRDC($scope.PreDRDC);
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
        $scope.DeletePreDRDC = function () {
            var getData = PreDRDCService.DeletePreDRDC($scope.PreDRDC.DRDCID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            //if (($scope.PreDRDC.DistrictID == undefined) || ($scope.PreDRDC.DistrictID == "")) {
            //    alert("Select District");
            //    return false;
            //}
            if ($scope.DistrictList.length == 0) {
                alert("Enter District");
                return false;
            }
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
            $scope.DistEnable = false;
        }
        function RedirectToListPage() {
            $scope.PreDRDC = {};
            $scope.DistrictList = {};
            $scope.isupdatableDisable = false;
            FillListData();
            $state.go('CenterManagemnet');
        }
        var gridColumns = [
            { field: "SrNo", headerText: " Sr No ", textAlign: ej.TextAlign.Left, isPrimaryKey: true, width: 20 },
            { field: "DistCode", headerText: "District Code", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "DistName", headerText: "District Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "GenStudCount", headerText: "Gen. Count", textAlign: ej.TextAlign.Left, width: 25 },
            { field: "VocStudCount", headerText: "Voc. Count", textAlign: ej.TextAlign.Right, width: 30 },
            { field: "MinorStudCount", headerText: "Minor Count", textAlign: ej.TextAlign.Right, width: 30 },
            { field: "ExaminerCount", headerText: "Examiner Count", textAlign: ej.TextAlign.Right, width: 30 },
        ];
        $scope.DistrictList = [];
        $("#BasicDistrict").ejGrid({
            dataSource: $scope.DistrictList,
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
            columns: gridColumns
        });
        $scope.complete = function (args) {
            if (args.requestType == "delete") {
                for (var i = 0; i < $scope.DistrictList.length; i++) {
                    $scope.DistrictList[i].SrNo = i + 1;
                }
                var gridObj = $("#BasicDistrict").ejGrid("instance");
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
            if ($scope.PreDRDC.DistCode == undefined) {
                $scope.PreDRDC.DistCode = "";
            }
            if ($scope.PreDRDC.DistCode != "") {
                var BasicDistrictData = PreDRDCService.GetDistrictListByDistCode(AppSettings.ExamInstID, $scope.PreDRDC.DistCode);
                BasicDistrictData.then(function (data) {
                    if (data.length == 0) {
                        alert("this Code Not found");
                        angular.element("#DistCode").focus();
                        $scope.PreDRDC.DistCode = "";
                        return;
                    }
                    for (var i = 0; i < $scope.DistrictList.length; i++) {
                        if ($scope.DistrictList[i].DistrictID == data[0].DistrictID) {
                            alert("already Linked this District code");
                            angular.element("#DistCode").focus();
                            $scope.PreDRDC.DistCode = "";
                            return;
                        }
                    }
                    for (var i = 0; i < data.length; i++) {
                        var obj = {};
                        obj.SrNo = $scope.DistrictList.length + 1;
                        obj.DistrictID = data[i].DistrictID;
                        obj.DistName = data[i].DistName;
                        obj.DistCode = data[i].DistCode;
                        obj.GenStudCount = data[i].GenStudCount;
                        obj.VocStudCount = data[i].VocStudCount;
                        obj.MinorStudCount = data[i].MinorStudCount;
                        obj.ExaminerCount = data[i].ExaminerCount;
                        $scope.DistrictList.push(obj);
                        angular.element("#DistCode").focus();
                        $scope.PreDRDC.DistCode = "";
                    }
                    $scope.DistrictList = $scope.DistrictList;
                }, function (error) {
                    alert(error);
                });
            }
        }
        var gridColumns = [
            { field: "DRDCCenterName", headerText: " DRDC Center Name ", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "DRDCCenterCode", headerText: " Code ", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "Active", headerText: "Active", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "DRDCID", headerText: "DRDCID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.PreDRDCList = [];
        $("#PreDRDC").ejGrid({
            dataSource: $scope.PreDRDCList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
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
                $scope.PreDRDC.DRDCID = sender.data.DRDCID;
                FillData();
                $scope.DistEnable = true;
            }
        }
        $scope.ClearGrid = function ClearGrid() {
            $scope.DistrictList = [];
        }
        FillListData();
        function FillListData() {
            var PreDRDCdata = PreDRDCService.GetPreDRDCList(AppSettings.ExamInstID);
            PreDRDCdata.then(function (data) {
                $scope.PreDRDCList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});
