define(['app'], function (app) {
    app.controller("PreExamCapacityController", function ($scope, $state, $stateParams, AppSettings, PreExamCapacityService, BasicCollegeService, BasicDistrictsService) {
        $scope.PreExamCapacity = {};
        var DistrictID = 0;
        $scope.PreExamCapacity.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreExamCapacityRightsdata = [];
        $scope.CollegeDisable = false;
        PreExamCapacityRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreExamCapacityRightsdata.length; i++) {
            if (PreExamCapacityRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreExamCapacity.ExamCapacityID == 0) {
                    if (PreExamCapacityRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreExamCapacityRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreExamCapacityRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        FillDistrictList();
        function FillDistrictList() {
            var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
            BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                $scope.BasicDistrictList = DistrictData;
            }, function (DistrictData, status, headers, config) {
                alert(error);
            });
        }
        var FillData = function () {
            if ($scope.PreExamCapacity.ExamCapacityID > 0) {
                var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
                BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                    $scope.BasicDistrictList = DistrictData;
                    var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(DistrictID);
                    BasicCollegeList.then(function (BasicCollegeData, status, headers, config, error) {
                        $scope.BasicCollegeList = BasicCollegeData;
                        if ($scope.PreExamCapacity.ExamCapacityID > 0) {
                            $scope.CollegeDisable = true;
                            var PreExamCapacitydata = PreExamCapacityService.GetPreExamCapacityById($scope.PreExamCapacity.ExamCapacityID);
                            PreExamCapacitydata.then(function (data) {
                                $scope.PreExamCapacity = data[0];
                                $scope.PreExamCapacity.ExamInstID = $scope.PreExamCapacity.ExamInstID;
                            }, function (error) {
                                alert(error);
                            });
                        }
                    }, function (BasicCollegeData, status, headers, config) {
                        alert(error);
                    });
                }, function (DistrictData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.FillCollege = function (DistrictID) {
            $scope.CollegeDisable = false;
            GetCollage(DistrictID);
        }
        var GetCollage = function (DistrictID) {
            var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(DistrictID);
            BasicCollegeList.then(function (BasicCollegeData, status, headers, config, error) {
                $scope.BasicCollegeList = BasicCollegeData;
            }, function (BasicCollegeData, status, headers, config) {
                alert(error);
            });
        }
        $scope.SavePreExamCapacity = function () {
            if ($scope.PreExamCapacity.ExamCapacityID == undefined) {
                $scope.PreExamCapacity.ExamCapacityID = 0;
            }
            var CollageData = PreExamCapacityService.GetCollegeCount($scope.PreExamCapacity.CollegeID, $scope.PreExamCapacity.ExamCapacityID);
            CollageData.then(function (Data) {
                if (Data.length > 0) {
                    alert("College Code Already Present");
                    RedirectToListPage();
                    return;
                }
                $scope.isupdatableDisable = true;
                if ($scope.PreExamCapacity.ExamCapacityID == undefined) { $scope.PreExamCapacity.ExamCapacityID = 0; }
                if (CheckValidation() == true) {
                    if ($scope.PreExamCapacity.ExamCapacityID == 0) {
                        $scope.PreExamCapacity.CreLoginID = AppSettings.LoggedUserId;
                        $scope.PreExamCapacity.UpdLoginID = AppSettings.LoggedUserId;
                        $scope.PreExamCapacity.ExamInstID = AppSettings.ExamInstID;
                        var getPromise = PreExamCapacityService.AddPreExamCapacity($scope.PreExamCapacity);
                        getPromise.then(function (msg) {
                            alert("Added successfully!!");
                            RedirectToListPage();
                        }, function (error) {
                            $scope.isupdatableDisable = false;
                            alert(error);
                        });
                    }
                    else {
                        $scope.PreExamCapacity.UpdLoginID = AppSettings.LoggedUserId;
                        $scope.PreExamCapacity.ExamInstID = AppSettings.ExamInstID;
                        var getPromise = PreExamCapacityService.UpdatePreExamCapacity($scope.PreExamCapacity);
                        getPromise.then(function (msg) {
                            alert("Update successfully!!");
                            $scope.PreExamCapacity.ExamCapacityID = 0;
                            RedirectToListPage();
                        }, function (error) {
                            $scope.isupdatableDisable = false;
                            alert(error);
                        });
                    }
                } else {
                    $scope.isupdatableDisable = false;
                }
            }, function (error) {
                $scope.isupdatableDisable = false;
                alert(error);
            });
        }
        $scope.DeletePreExamCapacity = function () {
            var getData = PreExamCapacityService.DeletePreExamCapacity($scope.PreExamCapacity.ExamCapacityID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.PreExamCapacity.DistrictID == undefined) || ($scope.PreExamCapacity.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PreExamCapacity.CollegeID == undefined) || ($scope.PreExamCapacity.CollegeID == "")) {
                alert("Select College");
                return false;
            }
            if (($scope.PreExamCapacity.ExamCapacity == undefined) || ($scope.PreExamCapacity.ExamCapacity == "")) {
                alert("Enter Capacity");
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
            $scope.PreExamCapacity = {};
            $scope.isupdatableDisable = false;
            FillListData();
            FillDistrictList();
            GetCollage(DistrictID);
            $state.go('CenterManagemnet');
        }
        var gridColumns = [
            { field: "DistName", headerText: " District Name", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "ColCode", headerText: " Code ", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "ColName", headerText: "College Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "ExamCapacity", headerText: " Capacity ", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "ExamCapacityID", headerText: "ExamCapacityID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.PreExamCapacityList = [];
        $("#PreExamCapacity").ejGrid({
            dataSource: $scope.PreExamCapacityList,
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
        FillListData();
        function FillListData() {
            var PreExamCapacitydata = PreExamCapacityService.GetPreExamCapacityList();
            PreExamCapacitydata.then(function (data) {
                $scope.PreExamCapacityList = data;
            }, function (error) {
                alert(error);
            });
        }
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $scope.PreExamCapacity.ExamCapacityID = sender.data.ExamCapacityID;
                DistrictID = sender.data.DistrictID;
                FillData();
            }
        }
    });
});
