define(['app'], function (app) {
    app.controller("PreCampusDRDCAuthoritiesController", function ($scope, $state, $stateParams, AppSettings, PreCampusDRDCAuthoritiesService, PreDRDCService, PreCampusService, BasicDistrictsService) {
        $scope.PreCampusDRDCAuthorities = {};
        $scope.PreCampusDRDCAuthorities.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreCampusDRDCAuthoritiesRightsdata = [];
        $scope.ChkDRDC = true;
        $scope.ChkCampus = true;
        PreCampusDRDCAuthoritiesRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreCampusDRDCAuthoritiesRightsdata.length; i++) {
            if (PreCampusDRDCAuthoritiesRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreCampusDRDCAuthorities.DRDCAuthID == 0) {
                    if (PreCampusDRDCAuthoritiesRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreCampusDRDCAuthoritiesRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreCampusDRDCAuthoritiesRightsdata[i].isdeletable == 'Y') {
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
        function FillData() {
            var PreDRDCList = PreDRDCService.GetPreDRDCList(AppSettings.ExamInstID);
            PreDRDCList.then(function (PreDRDCData, status, headers, config, error) {
                $scope.PreDRDCList = PreDRDCData;
                var PreCampusList = PreCampusService.GetPreCampusList(AppSettings.ExamInstID);
                PreCampusList.then(function (PreCampusData, status, headers, config, error) {
                    var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
                    BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                        $scope.BasicDistrictList = DistrictData;
                        $scope.PreCampusList = PreCampusData;
                        if ($scope.PreCampusDRDCAuthorities.DRDCAuthID > 0) {
                            var PreCampusDRDCAuthoritiesdata = PreCampusDRDCAuthoritiesService.GetPreCampusDRDCAuthoritiesById($scope.PreCampusDRDCAuthorities.DRDCAuthID);
                            PreCampusDRDCAuthoritiesdata.then(function (data) {
                                $scope.PreCampusDRDCAuthorities = data[0];
                            }, function (error) {
                                alert(error);
                            });
                        }
                    }, function (BasicCollegeData, status, headers, config) {
                        alert(error);
                    })
                }, function (Castdata, status, headers, config) {
                    alert(error);
                });
            }, function (Castdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.CheckDRDC = function (Chk) {
            if (Chk == true) {
                $scope.PreCampusDRDCAuthorities.ChkDRDC = true;
                $scope.PreCampusDRDCAuthorities.ChkCampus = false;
                $scope.PreCampusDRDCAuthorities.ChkDistrict = false;
                $scope.ChkDRDC = false;
                $scope.ChkCampus = true;
                $scope.ChkDistrict = true;
            } else {
                $scope.PreCampusDRDCAuthorities.ChkDRDC = false;
                $scope.PreCampusDRDCAuthorities.ChkCampus = false;
                $scope.PreCampusDRDCAuthorities.ChkDistrict = true;
                $scope.ChkDRDC = true;
                $scope.ChkCampus = false;
                $scope.ChkCampus = true;
            }
        }
        $scope.CheckCampus = function (Chk) {
            if (Chk == true) {
                $scope.PreCampusDRDCAuthorities.ChkDRDC = false;
                $scope.PreCampusDRDCAuthorities.ChkDistrict = false;
                $scope.PreCampusDRDCAuthorities.ChkCampus = true;
                $scope.ChkDRDC = true;
                $scope.ChkDistrict = true;
                $scope.ChkCampus = false;
            } else {
                $scope.PreCampusDRDCAuthorities.ChkDRDC = false;
                $scope.PreCampusDRDCAuthorities.ChkDistrict = true;
                $scope.PreCampusDRDCAuthorities.ChkCampus = false;
                $scope.ChkDRDC = false;
                $scope.ChkDistrict = false;
                $scope.ChkCampus = true;
            }
        }
        $scope.CheckDistrict = function (Chk) {
            if (Chk == true) {
                $scope.PreCampusDRDCAuthorities.ChkDRDC = false;
                $scope.PreCampusDRDCAuthorities.ChkDistrict = true;
                $scope.PreCampusDRDCAuthorities.ChkCampus = false;
                $scope.ChkDRDC = true;
                $scope.ChkDistrict = false;
                $scope.ChkCampus = true;
            } else {
                $scope.PreCampusDRDCAuthorities.ChkDRDC = true;
                $scope.PreCampusDRDCAuthorities.ChkDistrict = false;
                $scope.PreCampusDRDCAuthorities.ChkCampus = false;
                $scope.ChkDRDC = false;
                $scope.ChkDistrict = true;
                $scope.ChkCampus = false;
            }
        }
        $scope.SavePreCampusDRDCAuthorities = function () {
            $scope.isupdatableDisable = true;
            if ($scope.PreCampusDRDCAuthorities.DRDCAuthID == undefined) { $scope.PreCampusDRDCAuthorities.DRDCAuthID = 0; }
            if (CheckValidation() == true) {
                $scope.PreCampusDRDCAuthorities.PreCampusDRDCAuthoritiesDistrict = $scope.AuthoritiesList;
                if ($scope.PreCampusDRDCAuthorities.DRDCAuthID == 0) {
                    $scope.PreCampusDRDCAuthorities.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PreCampusDRDCAuthorities.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreCampusDRDCAuthoritiesService.AddPreCampusDRDCAuthorities($scope.PreCampusDRDCAuthorities);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.PreCampusDRDCAuthorities.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreCampusDRDCAuthoritiesService.UpdatePreCampusDRDCAuthorities($scope.PreCampusDRDCAuthorities);
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
        $scope.DeletePreCampusDRDCAuthorities = function () {
            var getData = PreCampusDRDCAuthoritiesService.DeletePreCampusDRDCAuthorities($scope.PreCampusDRDCAuthorities.DRDCAuthID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if ($scope.PreCampusDRDCAuthorities.ChkDRDC == true) {
                if (($scope.PreCampusDRDCAuthorities.DRDCID == undefined) || ($scope.PreCampusDRDCAuthorities.DRDCID == "")) {
                    alert("Select DRDC");
                    return false;
                }
            }
            if ($scope.PreCampusDRDCAuthorities.ChkCampus == true) {
                if (($scope.PreCampusDRDCAuthorities.CampusID == undefined) || ($scope.PreCampusDRDCAuthorities.CampusID == "")) {
                    alert("Select Campus");
                    return false;
                }
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
            $scope.PreCampusDRDCAuthorities = {};
            $scope.AuthoritiesList = {};
            $scope.isupdatableDisable = false;
            FillListData();
            $state.go('CenterManagemnet');
        }
        var gridColumns = [
            { field: "SrNo", headerText: " Sr No ", textAlign: ej.TextAlign.Left, isPrimaryKey: true, width: 20 },
            { field: "AuthorityPersonName", headerText: "Person Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "AuthorityNameAddress", headerText: "Address", textAlign: ej.TextAlign.Left, width: 200 },
            { field: "AuthorityContactNo", headerText: "Contact No.", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "AuthorityMailID", headerText: "Mail Id", textAlign: ej.TextAlign.Right, width: 50 },
        ];
        $scope.PreCampusDRDCAuthoritiesList = [];
        $("#PreCampusDRDCAuthorities").ejGrid({
            dataSource: $scope.PreCampusDRDCAuthoritiesList,
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
                $scope.PreCampusDRDCAuthorities.DRDCAuthID = sender.data.DRDCAuthID;
                FillData();
                $scope.DistEnable = true;
            }
        }
        FillListData();
        function FillListData() {
            var PreCampusDRDCAuthoritiesdata = PreCampusDRDCAuthoritiesService.GetPreCampusDRDCAuthoritiesList();
            PreCampusDRDCAuthoritiesdata.then(function (data) {
                $scope.PreCampusDRDCAuthoritiesList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});
