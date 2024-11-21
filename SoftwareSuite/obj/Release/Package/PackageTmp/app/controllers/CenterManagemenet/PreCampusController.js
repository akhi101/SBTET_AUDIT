define(['app'], function (app) {
    app.controller("PreCampusController", function ($scope, $state, $stateParams, AppSettings, PreCampusService, BasicDistrictsService, BasicCollegeService, BasicCourseService, BasicExamService, PreDRDCService) {
        $scope.PreCampus = {};
        $scope.PreCampus.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreCampusRightsdata = [];
        $scope.EnableCodeCampusName = false;
        $scope.PreCampus.CampusName = "";
        $scope.PreCampus.CampusCode = "";
        PreCampusRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreCampusRightsdata.length; i++) {
            if (PreCampusRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreCampus.CampusID == 0) {
                    if (PreCampusRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreCampusRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreCampusRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $("#RegFromDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#RegToDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $scope.isupdatableDisable = false;
        $scope.DistEnable = false;
        FillData();
        $scope.EnableCenterCollege = false;
        $scope.EnableYear = false;
        function FillData() {
            var PreDRDCList = PreDRDCService.GetPreDRDCList(AppSettings.ExamInstID);
            PreDRDCList.then(function (PreDRDCData, status, headers, config, error) {
                $scope.PreDRDCList = PreDRDCData;
                var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
                BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                    $scope.BasicDistrictList = DistrictData;
                    //var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(0);
                    //BasicCollegeList.then(function (BasicCollegeData, status, headers, config, error) {
                    //    $scope.BasicCollegeList = BasicCollegeData;
                        var BasicCourseList = BasicCourseService.GetBasicCourseList();
                        BasicCourseList.then(function (CourseData, status, headers, config, error) {
                            $scope.BasicCourseList = CourseData;
                            var BasicExamList = BasicExamService.GetExamListByCourseID(0);
                            BasicExamList.then(function (ExamData, status, headers, config, error) {
                                $scope.BasicExamList = ExamData;
                                if ($scope.PreCampus.CampusID > 0) {
                                    var PreCampusdata = PreCampusService.GetPreCampusById($scope.PreCampus.CampusID);
                                    PreCampusdata.then(function (data) {
                                        $scope.PreCampus = data[0];
                                        $("#RegFromDate").val($scope.PreCampus.FromDate);
                                        $("#RegToDate").val($scope.PreCampus.ToDate);
                                        $scope.EnableCenterCollege = true;
                                        $scope.EnableYear = true;
                                    }, function (error) {
                                        alert(error);
                                    });
                                }
                            }, function (ExamData, status, headers, config) {
                                alert(error);
                            })
                        }, function (ExamData, status, headers, config) {
                            alert(error);
                        })
                    //}, function (BasicCollegeData, status, headers, config) {
                    //    alert(error);
                    //})
                }, function (Castdata, status, headers, config) {
                    alert(error);
                });
            }, function (PreDRDCData, status, headers, config) {
                alert(error);
            })
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
        $scope.GetCollCenterName = function (CollegeID) {
            if (CollegeID != undefined) {
                if (CollegeID != "") {
                    $scope.EnableCodeCampusName = true;
                    for (var i = 0; i < $scope.BasicCollegeList.length; i++) {
                        if (CollegeID == $scope.BasicCollegeList[i].CollegeID) {
                            $scope.PreCampus.CampusName = $scope.BasicCollegeList[i].ColName;
                            $scope.PreCampus.CampusCode = $scope.BasicCollegeList[i].ColCode;
                        }
                    }
                } else {
                    $scope.PreCampus.CampusName = "";
                    $scope.PreCampus.CampusCode = "";
                    $scope.EnableCodeCampusName = false;
                }
            } else {
                $scope.PreCampus.CampusName = "";
                $scope.PreCampus.CampusCode = "";
                $scope.EnableCodeCampusName = false;
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
        $scope.SavePreCampus = function () {
            $scope.isupdatableDisable = true;
            $scope.PreCampus.FromDate = $("#RegFromDate").val();
            $scope.PreCampus.ToDate = $("#RegToDate").val();
            if ($scope.PreCampus.CampusID == undefined) { $scope.PreCampus.CampusID = 0; }
            if (CheckValidation() == true) {
                if ($scope.PreCampus.CampusID == 0) {
                    $scope.PreCampus.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PreCampus.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreCampusService.AddPreCampus($scope.PreCampus);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.PreCampus.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreCampusService.UpdatePreCampus($scope.PreCampus);
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
        $scope.DeletePreCampus = function () {
            var getData = PreCampusService.DeletePreCampus($scope.PreCampus.CampusID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.PreCampus.DRDCID == undefined) || ($scope.PreCampus.DRDCID == "")) {
                alert("Select DRDC");
                return false;
            }
            if (($scope.PreCampus.CourseID == undefined) || ($scope.PreCampus.CourseID == "")) {
                alert("Select stream");
                return false;
            }
            if (($scope.PreCampus.ExamID == undefined) || ($scope.PreCampus.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            if (($scope.PreCampus.FromDate == undefined) || ($scope.PreCampus.FromDate == "")) {
                alert("Please Choose Start Date ");
                return false;
            }
            if (($scope.PreCampus.ToDate == undefined) || ($scope.PreCampus.ToDate == "")) {
                alert("Please Choose End Date ");
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
            $scope.PreCampus = {};
            $scope.DistrictList = {};
            $scope.isupdatableDisable = false;
            FillListData();
            $state.go('CenterManagemnet');
        }
        var gridColumns = [
            { field: "CampusName", headerText: " Campus Name ", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "CampusCode", headerText: " Code ", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "Active", headerText: "Active", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "CampusID", headerText: "CampusID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.PreCampusList = [];
        $("#PreCampus").ejGrid({
            dataSource: $scope.PreCampusList,
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
                $scope.PreCampus.CampusID = sender.data.CampusID;
                FillData();
                $scope.DistEnable = true;
            }
        }
        $scope.ClearGrid = function ClearGrid() {
            $scope.DistrictList = [];
        }
        FillListData();
        function FillListData() {
            var PreCampusdata = PreCampusService.GetPreCampusList(AppSettings.ExamInstID);
            PreCampusdata.then(function (data) {
                $scope.PreCampusList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});
