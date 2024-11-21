define(['app'], function (app) {
    app.controller("PreCampusAllocationController", function ($scope, $state, $stateParams, AppSettings, PreCampusAllocationService, BasicDistrictsService, PreZoneCenterService, BasicCourseService, BasicExamService, PreCampusService, BasicExamSubjectService, PreDRDCService) {
        $scope.PreCampusAllocation = {};
        $scope.PreCampusAllocation.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreCampusAllocationRightsdata = [];
        PreCampusAllocationRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreCampusAllocationRightsdata.length; i++) {
            if (PreCampusAllocationRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreCampusAllocation.CampusCenterID == 0) {
                    if (PreCampusAllocationRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreCampusAllocationRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreCampusAllocationRightsdata[i].isdeletable == 'Y') {
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
            var PreDRDCList = PreDRDCService.GetPreDRDCList(AppSettings.ExamInstID);
            PreDRDCList.then(function (PreDRDCData, status, headers, config, error) {
                $scope.PreDRDCList = PreDRDCData;
            var PreCampusList = PreCampusService.GetPreCampusListByDRDCId(0);
            PreCampusList.then(function (PreCampusData, status, headers, config, error) {
                $scope.PreCampusList = PreCampusData;
                var BasicDistrictList = PreCampusService.GetBasicDistrictsListByDRDCId(0);
                BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                    $scope.BasicDistrictList = DistrictData;
                    var PreZoneCenterList = PreZoneCenterService.GetPreZoneCenterName(0, AppSettings.ExamInstID);
                    PreZoneCenterList.then(function (PreZoneCenterData, status, headers, config, error) {
                        $scope.PreZoneCenterList = PreZoneCenterData;
                        var BasicCourseList = BasicCourseService.GetBasicCourseList();
                        BasicCourseList.then(function (CourseData, status, headers, config, error) {
                            $scope.BasicCourseList = CourseData;
                            var BasicExamList = BasicExamService.GetExamListByCourseID(0);
                            BasicExamList.then(function (ExamData, status, headers, config, error) {
                                $scope.BasicExamList = ExamData;
                                var BasicExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectListByExamID(0, 1);
                                BasicExamSubjectList.then(function (BasicExamSubjectData, status, headers, config, error) {
                                    $scope.BasicExamSubjectList = BasicExamSubjectData;
                                    if ($scope.PreCampusAllocation.CampusID > 0) {
                                        var PreCampusAllocationdata = PreCampusAllocationService.GetPreCampusAllocationById($scope.PreCampusAllocation.CampusID);
                                        PreCampusAllocationdata.then(function (data) {
                                            $scope.PreCampusAllocation = data[0];
                                            $scope.EnableCenterCollege = true;
                                            $scope.EnableYear = true;
                                        }, function (error) {
                                            alert(error);
                                        });
                                    }
                                }, function (BasicExamSubjectData, status, headers, config) {
                                    alert(error);
                                })
                            }, function (ExamData, status, headers, config) {
                                alert(error);
                            })
                        }, function (ExamData, status, headers, config) {
                            alert(error);
                        })
                    }, function (PreZoneCenterData, status, headers, config) {
                        alert(error);
                    })
                }, function (Castdata, status, headers, config) {
                    alert(error);
                });
            }, function (PreDRDCData, status, headers, config) {
                alert(error);
                    })
            }, function (PreDRDCData, status, headers, config) {
                alert(error);
            })
        }
        $scope.GetPreZoneCenterName = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PreZoneCenterList = PreZoneCenterService.GetPreZoneCenterName(DistrictID, AppSettings.ExamInstID);
                PreZoneCenterList.then(function (PreZoneCenterData, status, headers, config, error) {
                    $scope.PreZoneCenterList = PreZoneCenterData;
                }, function (PreZoneCenterData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.FillData = function (DRDCID) {
            if (DRDCID != "" || DRDCID != undefined) {
                var BasicDistrictList = PreCampusService.GetBasicDistrictsListByDRDCId(DRDCID);
                BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                    $scope.BasicDistrictList = DistrictData
                }, function (Castdata, status, headers, config) {
                    alert(error);
                });
                var PreCampusList = PreCampusService.GetPreCampusListByDRDCId(DRDCID);
                PreCampusList.then(function (PreCampusData, status, headers, config, error) {
                    $scope.PreCampusList = PreCampusData;
                }, function (PreDRDCData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.GetExamList = function (CourseID) {
            if (CourseID != undefined) {
                if (CourseID != "") {
                    $scope.EnableYear = false;
                    var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                    BasicExamList.then(function (ExamData, status, headers, config, error) {
                        $scope.BasicExamList = ExamData;
                    }, function (ExamData, status, headers, config) {
                        alert(error);
                    })
                }
            }
        }
        $scope.GetBasicExamSubjectList = function (ExamID) {
            if (ExamID != "" || ExamID != undefined) {
                var BasicExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectListByExamID(ExamID, 1);
                BasicExamSubjectList.then(function (BasicExamSubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = BasicExamSubjectData;
                }, function (BasicExamSubjectData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.GetCollCenterName = function (CollegeID) {
            if (CollegeID != undefined) { CollegeID = ""; }
            if (CollegeID != "") {
                $scope.EnableCodeCampusName = true;
                for (var i = 0; i < $scope.BasicCollegeList.length; i++) {
                    if (CollegeID == $scope.BasicCollegeList[i].CollegeID) {
                        $scope.PreCampusAllocation.CampusName = $scope.BasicCollegeList[i].ColName;
                        $scope.PreCampusAllocation.CampusCode = $scope.BasicCollegeList[i].ColCode;
                    }
                }
            } else {
            }
        }
        $scope.SavePreCampusAllocation = function () {
            $scope.isupdatableDisable = true;
            if ($scope.PreCampusAllocation.CampusCenterID == undefined) { $scope.PreCampusAllocation.CampusCenterID = 0; }
            if (CheckValidation() == true) {
                if ($scope.PreCampusAllocation.CampusCenterID == 0) {
                    $scope.PreCampusAllocation.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PreCampusAllocation.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreCampusAllocationService.AddPreCampusAllocation($scope.PreCampusAllocation);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.PreCampusAllocation.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreCampusAllocationService.UpdatePreCampusAllocation($scope.PreCampusAllocation);
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
        $scope.DeletePreCampusAllocation = function () {
            var getData = PreCampusAllocationService.DeletePreCampusAllocation($scope.PreCampusAllocation.CampusCenterID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.PreCampusAllocation.CampusID == undefined) || ($scope.PreCampusAllocation.CampusID == "")) {
                alert("Select Campus");
                return false;
            }
            if (($scope.PreCampusAllocation.DistrictID == undefined) || ($scope.PreCampusAllocation.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PreCampusAllocation.CenterID == undefined) || ($scope.PreCampusAllocation.CenterID == "")) {
                alert("Select Center");
                return false;
            }
            if (($scope.PreCampusAllocation.CourseID == undefined) || ($scope.PreCampusAllocation.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.PreCampusAllocation.ExamID == undefined) || ($scope.PreCampusAllocation.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            if (($scope.PreCampusAllocation.ExmSubID == undefined) || ($scope.PreCampusAllocation.ExmSubID == "")) {
                alert("Select Exam Subject");
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
            $scope.PreCampusAllocation = {};
            $scope.DistrictList = {};
            $scope.isupdatableDisable = false;
            FillListData();
            $state.go('CenterManagemnet');
        }
        var gridColumns = [
            { field: "CampusName", headerText: " Campus Name ", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "CampusCode", headerText: " Code ", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "Active", headerText: "Active", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "CampusCenterID", headerText: "CampusCenterID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.PreCampusAllocationList = [];
        $("#PreCampusAllocation").ejGrid({
            dataSource: $scope.PreCampusAllocationList,
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
                $scope.PreCampusAllocation.CampusCenterID = sender.data.CampusCenterID;
                FillData();
                $scope.DistEnable = true;
            }
        }
        $scope.ClearGrid = function ClearGrid() {
            $scope.DistrictList = [];
        }
        FillListData();
        function FillListData() {
            var PreCampusAllocationdata = PreCampusAllocationService.GetPreCampusAllocationList(AppSettings.ExamInstID);
            PreCampusAllocationdata.then(function (data) {
                $scope.PreCampusAllocationList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});
