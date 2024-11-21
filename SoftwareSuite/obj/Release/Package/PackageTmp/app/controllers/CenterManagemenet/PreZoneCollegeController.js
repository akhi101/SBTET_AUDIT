define(['app'], function (app) {
    app.controller("PreZoneCollegeController", function ($scope, $state, $stateParams, AppSettings, PreZoneCollegeService, PreZoneService, BasicCollegeService, BasicDistrictsService, BasicMandalService) {
        $scope.PreZoneCollege = { PreZoneColID: $stateParams.PreZoneColID };
        $scope.PreZoneCollege.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreZoneCollegeRightsdata = [];
        PreZoneCollegeRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreZoneCollegeRightsdata.length; i++) {
            if (PreZoneCollegeRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreZoneCollege.PreZoneColID == 0) {
                    if (PreZoneCollegeRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    } 
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreZoneCollegeRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreZoneCollegeRightsdata[i].isdeletable == 'Y') {
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
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });

        $scope.GetBasicMandl = function (DistrictID) {
            var BasicMandalList = BasicMandalService.GetBasicMandalByDistrictID(DistrictID);
            BasicMandalList.then(function (BasicMandalData, status, headers, config, error) {
                $scope.BasicMandalList = BasicMandalData;
            }, function (BasicMandalData, status, headers, config) {
                alert(error);
            });
        }
        $scope.GetPreZoneData = function (DistrictID, MandalID) {
            if (DistrictID != "" && MandalID != "") {
                var PreZoneList = PreZoneService.GetPreZoneListByDistrictAndMandalId(DistrictID, MandalID);
                PreZoneList.then(function (PreZoneData, status, headers, config, error) {
                    $scope.PreZoneList = PreZoneData;
                }, function (PreZoneData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.GetCollegeList = function (DistrictID, MandalID,PreZoneID) {
            if (DistrictID != "" || MandalID != "" || PreZoneID != "") {
                var BasicCollegeList = PreZoneCollegeService.GetBasicCollegeListForPreZoneCollege(DistrictID, MandalID,PreZoneID);
                BasicCollegeList.then(function (data, status, headers, config, error) {
                    $scope.BasicCollegeData = data;
                    for (var k = 0; k < $scope.BasicCollegeData.length; k++) {
                        if ($scope.BasicCollegeData[k].CollegeCheck == "Y") {
                            $scope.BasicCollegeData[k].CollegeCheck = true;
                        } else {
                            $scope.BasicCollegeData[k].CollegeCheck = false;
                        }
					}
					$scope.BasicCollegeList = $scope.BasicCollegeData;
                }, function (error) {
                    alert(error);
                });
            }
        }
        var PreZoneCollege = [];
        $scope.SavePreZoneCollege = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                for (var k = 0; k < $scope.BasicCollegeList.length; k++) {
                    var obj = {};
                    if ($scope.BasicCollegeList[k].CollegeCheck == true) {
                        obj.CollegeCheck = "Y";
                        obj.ZoneID = $scope.PreZoneCollege.ZoneID;
                        obj.CollegeID = $scope.BasicCollegeList[k].CollegeID;
                        PreZoneCollege.push(obj);
                    }
                }
                if ($scope.PreZoneCollege.PreZoneColID == undefined) { $scope.PreZoneCollege.PreZoneColID = 0; }

                $scope.PreZoneCollege.CreLoginID = AppSettings.LoggedUserId;
                $scope.PreZoneCollege.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreZoneCollegeService.AddPreZoneCollege(PreZoneCollege);
                getPromise.then(function (msg) {
                    alert("Added successfully!!");
                    RedirectToListPage();
                    $scope.isupdatableDisable = false;
                }, function (error) {
                    $scope.isupdatableDisable = false;
                    alert(error);
                });
            } else {
                $scope.isupdatableDisable = false;
            }
        }

        var gridColumns = [
            { headerTemplateID: "#headerTemplate", template: true, templateID: "#checkboxTemplate", textAlign: ej.TextAlign.Center, width: 50 },
            { field: "CollegeCheck", headerText: "CollegeCheck", visible: false, textAlign: ej.TextAlign.Left },
            { field: "SrNo", headerText: "S No", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "CollegeID", headerText: "CollegeID", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "ColName", headerText: "Admission No", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "ColCode", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150 }
        ];
        $scope.BasicCollegeData = [];
        $("#BasicCollege").ejGrid({
            dataSource: $scope.BasicCollegeData,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
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
        function checkChange(e) {
            gridObj = $("#BasicCollege").data("ejGrid");
            var rowCheck = $(".rowCheckbox:checked"), cp = gridObj.model.pageSettings.currentPage;
            if ($("#headchk").is(':checked')) {
                for (var k = 0; k < $scope.BasicCollegeData.length; k++) {
                    $scope.BasicCollegeData[k].CollegeCheck = 1;
                }
            } else {
                if (gridObj.model.selectedRecords[0] == undefined) {
                    for (var k = 0; k < $scope.BasicCollegeData.length; k++) {
                        $scope.BasicCollegeData[k].CollegeCheck = 0;
                    }
                } else {
                    if (e.isChecked == true) {
                        for (var k = 0; k < $scope.BasicCollegeData.length; k++) {
                            if (gridObj.model.selectedRecords[0].CollegeID == $scope.BasicCollegeData[k].CollegeID) {
                                $scope.BasicCollegeData[k].CollegeCheck = 1;
                                return;
                            }
                        }
                    } else {
                        for (var k = 0; k < $scope.BasicCollegeData.length; k++) {
                            if (gridObj.model.selectedRecords[0].CollegeID == $scope.BasicCollegeData[k].CollegeID) {
                                $scope.BasicCollegeData[k].CollegeCheck = 0;
                                return;
                            }
                        }
                    }
                }
            }
        }
        function headCheckChange(e) {
            $("#BasicCollege .rowCheckbox").ejCheckBox({ "change": checkChange });
            gridObj = $("#BasicCollege").data("ejGrid");
            if ($("#headchk").is(':checked')) {
                $(".rowCheckbox").ejCheckBox({ "checked": true });
            }
            else {
                $(".rowCheckbox").ejCheckBox({ "checked": false });
            }
        }
        $scope.refreshTemplate = function (args) {
            $("#BasicCollege .rowCheckbox").ejCheckBox({ "change": checkChange });
            $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
        }
        $scope.actioncomplete = function (args) {
            $("#headchk").ejCheckBox({ width: 100, visible: false });
        }
        $scope.DeletePreZoneCollege = function () {
            var getData = PreZoneCollegeService.DeletePreZoneCollege($scope.PreZoneCollege.PreZoneColID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.PreZoneCollege.ZoneID == undefined) || ($scope.PreZoneCollege.ZoneID == "")) {
                alert("Select Zone");
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
            $state.go('CenterManagemnet');
            //$state.go('CenterManagemnet.PreZoneCollege');
        }
    });
});
