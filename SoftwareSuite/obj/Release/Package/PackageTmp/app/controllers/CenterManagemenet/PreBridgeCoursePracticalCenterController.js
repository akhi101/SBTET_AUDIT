define(['app'], function (app) {
    app.controller("PreBridgeCoursePracticalCenterController", function ($scope, $state, $stateParams, AppSettings, PreBridgeCourseCenterService, BasicDistrictsService, BasicCollegeService, BasicCourseService, BasicExamService, PreZoneService) {
        $scope.PreBridgeCoursePracticalCenter = {};
        $scope.PreBridgeCoursePracticalCenter.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "";
        var PreVocationalCenterRightsdata = [];
        $scope.PreBridgeCoursePracticalCenter.PrePractCntrID = 0;
        $scope.PreBridgeCoursePracticalCenter.IYearTotal = 0;
        $scope.PreBridgeCoursePracticalCenter.IIYearTotal = 0;
        PreVocationalCenterRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreVocationalCenterRightsdata.length; i++) {
            if (PreVocationalCenterRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreBridgeCoursePracticalCenter.PrePractCntrID == 0) {
                    if (PreVocationalCenterRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreVocationalCenterRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreVocationalCenterRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 0;
        if (AppSettings.SysUsrGrpID == 7) {
            $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 9;
        } else if (AppSettings.SysUsrGrpID == 9) {
            $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 2;
        } else if (AppSettings.SysUsrGrpID == 2) {
            $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 11;
        } else if (AppSettings.SysUsrGrpID == 11) {
            $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 23;
        }
        if ($scope.PreBridgeCoursePracticalCenter.PrePractCntrID > 0) {
        } else {
            $scope.PreBridgeCoursePracticalCenter.PrePractCntrID = 0;
        }
        $scope.isupdatableDisable = false;
        $scope.DistEnable = false;
        FillData();
        $scope.EnableCenterCollege = false;
        $scope.EnableCenterCollege1 = true;
        $scope.EnableYear = false;
        $scope.districtDisable = false; 
        function FillData() {
            //var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
            var BasicDistrictList = [];

            if (AppSettings.SysUsrGrpID != 23) {
                BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
            } else {
                BasicDistrictList = BasicDistrictsService.GetDistrictListForCOE(AppSettings.ExamInstID, 4);
            }
            BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                $scope.BasicDistrictList = DistrictData;
                //var ZoneList = PreZoneService.GetPreZoneListByDistrictIdNew(AppSettings.DistrictIDs, AppSettings.ExamInstID, 4);
                if ($scope.PreBridgeCoursePracticalCenter.PrePractCntrID == 0) { $scope.PreBridgeCoursePracticalCenter.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + ""; }
                if (AppSettings.SysUsrGrpID == 23) { $scope.FillListDataNew($scope.PreBridgeCoursePracticalCenter.DistrictID); }
                var ZoneList = [];
                if (AppSettings.SysUsrGrpID != 23) {
                    ZoneList = PreZoneService.GetPreZoneListByDistrictId(AppSettings.DistrictIDs, AppSettings.ExamInstID, 4);
                } else {
                    ZoneList = PreZoneService.GetPreZoneListByDistrictIdNew($scope.PreBridgeCoursePracticalCenter.DistrictID, AppSettings.ExamInstID, 4);
                }
                 

                ZoneList.then(function (ZoneData, status, headers, config, error) {
                    $scope.PreZoneList = ZoneData;
                    //var CollegeList = BasicCollegeService.GetPreBridgePractZoneCollegeListByZoneID($scope.PreBridgeCoursePracticalCenter.PrePractCntrID, 0, AppSettings.DistrictIDs);
                    //CollegeList.then(function (CollegeData, status, headers, config, error) {
                    //    $scope.CenterCollegeList = CollegeData;
                    var CollegeList = BasicCollegeService.GetPreBridgePractZoneCollegeListByZoneID(1, 0, AppSettings.DistrictIDs);
                    CollegeList.then(function (CollegeData, status, headers, config, error) {
                        $scope.CenterCollegeListZone = CollegeData;
                        $scope.EnableCenterCollege1 = true;
                        var BasicCourseList = BasicCourseService.GetBasicCourseList();
                        BasicCourseList.then(function (CourseData, status, headers, config, error) {
                            $scope.BasicCourseList = CourseData;
                            $scope.PreBridgeCoursePracticalCenter.CourseID = "2";
                            var BasicExamList = BasicExamService.GetExamListByCourseID(2);
                            BasicExamList.then(function (ExamData, status, headers, config, error) {
                                $scope.BasicExamList = ExamData;
                                if ($scope.PreBridgeCoursePracticalCenter.PrePractCntrID > 0) {
                                    //var ZoneList = PreZoneService.GetPreZoneListByDistrictId(AppSettings.DistrictIDs, AppSettings.ExamInstID, 4);
                                    //ZoneList.then(function (ZoneData, status, headers, config, error) {
                                    //    $scope.PreZoneList = ZoneData;
                                        var PreVocationalCenterdata = PreBridgeCourseCenterService.GetPreVocationalCenterById($scope.PreBridgeCoursePracticalCenter.PrePractCntrID);
                                        PreVocationalCenterdata.then(function (data) {
                                            $scope.PreBridgeCoursePracticalCenter = data[0];
                                            $scope.EnableCenterCollege = true;
                                            $scope.EnableCenterCollege1 = true;
                                            $scope.EnableYear = true;
                                            $scope.PreBridgeCoursePracticalCenter.StudentTotalCount = 0;
                                            $scope.BasicCollegeist = data[0].BasicCollege;
                                            $scope.PreBridgeCoursePracticalCenter.DistrictID = "" + data[0].DistrictID + "";
                                            $scope.PreBridgeCoursePracticalCenter.CollegeID = "" + data[0].CollegeID + "";
                                            $scope.PreBridgeCoursePracticalCenter.CourseID = "" + data[0].CourseID + "";
                                            $scope.PreBridgeCoursePracticalCenter.ExamID = "" + data[0].ExamID + "";
                                            $scope.PreBridgeCoursePracticalCenter.CenterCollegeID = "" + data[0].CenterCollegeID + "";
                                            if (data[0].ElectricityFlag == "Y") {
                                                $scope.PreBridgeCoursePracticalCenter.ElectricityFlag = true;
                                            } else {
                                                $scope.PreBridgeCoursePracticalCenter.ElectricityFlag = false;
                                            }
                                            if (data[0].InternetFlag == "Y") {
                                                $scope.PreBridgeCoursePracticalCenter.InternetFlag = true;
                                            } else {
                                                $scope.PreBridgeCoursePracticalCenter.InternetFlag = false;
                                            }
                                            if (data[0].ComputerFlag == "Y") {
                                                $scope.PreBridgeCoursePracticalCenter.ComputerFlag = true;
                                            } else {
                                                $scope.PreBridgeCoursePracticalCenter.ComputerFlag = false;
                                            }
                                            if (data[0].PrinterFlag == "Y") {
                                                $scope.PreBridgeCoursePracticalCenter.PrinterFlag = true;
                                            } else {
                                                $scope.PreBridgeCoursePracticalCenter.PrinterFlag = false;
                                            }
                                            for (var i = 0; i < data[0].BasicCollege.length; i++) {
                                                $scope.PreBridgeCoursePracticalCenter.StudentTotalCount = parseFloat($scope.PreBridgeCoursePracticalCenter.StudentTotalCount) + parseFloat(data[0].BasicCollege[i].StudentCount);
                                            }
                                            $scope.districtDisable = true; 
                                            var ZoneList = PreZoneService.GetPreZoneListByDistrictId(data[0].DistrictID, AppSettings.ExamInstID, 4);
                                            ZoneList.then(function (ZoneData, status, headers, config, error) {
                                                $scope.PreZoneList = ZoneData;
                                                $scope.PreBridgeCoursePracticalCenter.ZoneID = "" + data[0].ZoneID + "";
                                            }, function (error) {
                                                alert(error);
                                            });
                                            //var CollegeList = BasicCollegeService.GetPreBridgePractZoneCollegeListByZoneID(0, $scope.PreBridgeCoursePracticalCenter.ZoneID, AppSettings.DistrictIDs);
                                            //CollegeList.then(function (CollegeData, status, headers, config, error) {
                                            //    $scope.CenterCollegeList = CollegeData;
                                            //    $scope.PreBridgeCoursePracticalCenter.CollegeID = data[0].CollegeID;
                                            //}, function (CollegeData, status, headers, config) {
                                            //    alert(error);
                                            //})
                                        //}, function (error) {
                                        //    alert(error);
                                        //});
                                    }, function (ZoneData, status, headers, config) {
                                        alert(error);
                                    })
                                }
                            }, function (ExamData, status, headers, config) {
                                alert(error);
                            })
                        }, function (CourseData, status, headers, config) {
                            alert(error);
                        });
                    }, function (CollegeData, status, headers, config) {
                        alert(error);
                    })

                    //}, function (CollegeData, status, headers, config) {
                    //    alert(error);
                    //})
                }, function (ZoneData, status, headers, config) {
                    alert(error);
                })
            }, function (Castdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.GetCenterCollegeList = function (ZoneID) {
            if (ZoneID != "" || ZoneID != undefined) {
                $scope.EnableCenterCollege = false;
                var CollegeList = BasicCollegeService.GetPreBridgePractZoneCollegeListByZoneID(1, ZoneID, AppSettings.DistrictIDs);
                CollegeList.then(function (CollegeData, status, headers, config, error) {
                    $scope.CenterCollegeListZone = CollegeData;
                    $scope.EnableCenterCollege1 = false;
                    //var CollegeList = BasicCollegeService.GetPractVocZoneCollegeListByZoneID(0, ZoneID, AppSettings.DistrictIDs);
                    //CollegeList.then(function (CollegeData, status, headers, config, error) {
                    //    $scope.CenterCollegeList = CollegeData;
                    //}, function (CollegeData, status, headers, config) {
                    //    alert(error);
                    //})
                }, function (CollegeData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.GetPreZoneList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                $scope.EnableCenterCollege = false;
                var ZoneList = PreZoneService.GetPreZoneListByDistrictIdNew(DistrictID, AppSettings.ExamInstID, 4);
                ZoneList.then(function (ZoneData, status, headers, config, error) {
                    $scope.PreZoneList = ZoneData;
                    if (AppSettings.SysUsrGrpID == 23) { $scope.FillListDataNew($scope.PreBridgeCoursePracticalCenter.DistrictID); }
                }, function (ZoneData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                $scope.EnableYear = false;
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.SavePreVocationalCenter = function () {
            $scope.isupdatableDisable = true;
            if ($scope.PreBridgeCoursePracticalCenter.PrePractCntrID == undefined) { $scope.PreBridgeCoursePracticalCenter.PrePractCntrID = 0; }
            if (CheckValidation() == true) {
                $scope.PreBridgeCoursePracticalCenter.BasicCollege = $scope.BasicCollegeist;
                $scope.PreBridgeCoursePracticalCenter.ZoneType = 4;
                $scope.PreBridgeCoursePracticalCenter.CreLoginID = AppSettings.LoggedUserId;
                $scope.PreBridgeCoursePracticalCenter.UpdLoginID = AppSettings.LoggedUserId;
                $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 0;
                if (AppSettings.SysUsrGrpID == 7) {
                    $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 9;
                } else if (AppSettings.SysUsrGrpID == 9) {
                    $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 2;
                } else if (AppSettings.SysUsrGrpID == 2) {
                    $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 11;
                } else if (AppSettings.SysUsrGrpID == 11) {
                    $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 23;
                }
                $scope.PreBridgeCoursePracticalCenter.ExamInstID = AppSettings.ExamInstID;
                if ($scope.PreBridgeCoursePracticalCenter.PrePractCntrID == 0) {
                    $scope.PreBridgeCoursePracticalCenter.CollegeID = 0
                    $scope.PreBridgeCoursePracticalCenter.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PreBridgeCoursePracticalCenter.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreBridgeCourseCenterService.AddPreVocationalCenter($scope.PreBridgeCoursePracticalCenter);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.PreBridgeCoursePracticalCenter.CollegeID = 0
                    $scope.PreBridgeCoursePracticalCenter.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreBridgeCourseCenterService.UpdatePreVocationalCenter($scope.PreBridgeCoursePracticalCenter);
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
        $scope.DeletePreBridgeCourseCenterNew = function () {
            $scope.PreBridgeCoursePracticalCenter.ZoneType = 4;
            if (AppSettings.SysUsrGrpID == 7) {
                $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 9;
            } else if (AppSettings.SysUsrGrpID == 9) {
                $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 2;
            } else if (AppSettings.SysUsrGrpID == 2) {
                $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 11;
            } else if (AppSettings.SysUsrGrpID == 11) {
                $scope.PreBridgeCoursePracticalCenter.SysUsrGrpID = 23;
            }
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                var getData = PreBridgeCourseCenterService.DeletePreBridgeCourseCenterNew($scope.PreBridgeCoursePracticalCenter);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    RedirectToListPage();
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.DeletePreVocationalCenter = function () {
            //var isConfirmed = confirm("Are you sure to delete this record ?");
            //if (isConfirmed) {
            //    var getData = PreBridgeCourseCenterService.DeletePreVocationalCenter($scope.PreBridgeCoursePracticalCenter.PrePractCntrID, AppSettings.LoggedUserId);
            //    getData.then(function (msg) {
            //        alert('Record Deleted');
            //        RedirectToListPage();
            //    }, function (error) {
            //        alert(error);
            //    });
            //}
            
        }
        $scope.ResetData = function () {
            $scope.PreBridgeCoursePracticalCenter = {};
            $scope.PreBridgeCoursePracticalCenter.ExamInstID = AppSettings.ExamInstID;
            var PageNm = $state.current.name.split(".")[1] + "List";
            var PreVocationalCenterRightsdata = [];
            $scope.PreBridgeCoursePracticalCenter.IYearTotal = 0;
            $scope.PreBridgeCoursePracticalCenter.IIYearTotal = 0;
            PreVocationalCenterRightsdata = AppSettings.UserRights;
            for (var i = 0; i < PreVocationalCenterRightsdata.length; i++) {
                if (PreVocationalCenterRightsdata[i].GridFormToOpen == PageNm) {
                    if ($scope.PreBridgeCoursePracticalCenter.PrePractCntrID == 0) {
                        if (PreVocationalCenterRightsdata[i].isaddable == 'Y') {
                            $scope.isupdatableDisable = false;
                        } else {
                            $scope.isupdatableDisable = true;
                        }
                        $scope.isdeletableDisable = true;
                    } else {
                        if (PreVocationalCenterRightsdata[i].isupdatable == 'Y') {
                            $scope.isupdatableDisable = false;
                        }
                        else {
                            $scope.isupdatableDisable = true;
                        }
                        if (PreVocationalCenterRightsdata[i].isdeletable == 'Y') {
                            $scope.isdeletableDisable = false;
                        } else {
                            $scope.isdeletableDisable = true;
                        }
                    }
                }
            }
            if ($scope.PreBridgeCoursePracticalCenter.PrePractCntrID > undefined) {
            } else {
                $scope.PreBridgeCoursePracticalCenter.PrePractCntrID = 0;
            }
            $scope.isupdatableDisable = false;
            $scope.isdeletableDisable = true;
            $scope.DistEnable = false;
            FillData();
            $scope.EnableCenterCollege = false;
            $scope.EnableCenterCollege1 = true;
            $scope.EnableYear = false;

            $scope.BasicCollegeist = [];
            $scope.districtDisable = false; 
        }
        function CheckValidation() {
            if (($scope.PreBridgeCoursePracticalCenter.DistrictID == undefined) || ($scope.PreBridgeCoursePracticalCenter.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PreBridgeCoursePracticalCenter.CenterCollegeID == undefined) || ($scope.PreBridgeCoursePracticalCenter.CenterCollegeID == "")) {
                alert("Select Practical Center");
                return false;
            }
            if ($scope.PreBridgeCoursePracticalCenter.ExamCapacity == undefined || $scope.PreBridgeCoursePracticalCenter.ExamCapacity == "" || $scope.PreBridgeCoursePracticalCenter.ExamCapacity == 0) {
                alert("Enter Center Capacity greater than zero");
                return;
            }
            if (($scope.PreBridgeCoursePracticalCenter.ExamID == undefined) || ($scope.PreBridgeCoursePracticalCenter.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            if ($scope.PreBridgeCoursePracticalCenter.CCamerasNo == undefined || $scope.PreBridgeCoursePracticalCenter.CCamerasNo == "") {
                alert("CCTV No is Compulsory");
                return;
            }
            if ($scope.PreBridgeCoursePracticalCenter.ElectricityFlag == undefined) { $scope.PreBridgeCoursePracticalCenter.ElectricityFlag = false; }
            if ($scope.PreBridgeCoursePracticalCenter.ElectricityFlag == false) {
                $scope.PreBridgeCoursePracticalCenter.ElectricityFlag = "Y";
                alert("Electricity is Compulsory");
                return;
            } else {
                $scope.PreBridgeCoursePracticalCenter.ElectricityFlag = "Y";
            }
            if ($scope.PreBridgeCoursePracticalCenter.InternetFlag == undefined) { $scope.PreBridgeCoursePracticalCenter.InternetFlag = false; }
            if ($scope.PreBridgeCoursePracticalCenter.InternetFlag == false) {
                $scope.PreBridgeCoursePracticalCenter.InternetFlag = "N";
                alert("Internet is Compulsory");
                return;
            } else {
                $scope.PreBridgeCoursePracticalCenter.InternetFlag = "Y";
            }
            if ($scope.PreBridgeCoursePracticalCenter.ComputerFlag == undefined) { $scope.PreBridgeCoursePracticalCenter.ComputerFlag = false; }
            if ($scope.PreBridgeCoursePracticalCenter.ComputerFlag == false) {
                $scope.PreBridgeCoursePracticalCenter.ComputerFlag = "N";
                alert("Computer is Compulsory");
                return;
            } else {
                $scope.PreBridgeCoursePracticalCenter.ComputerFlag = "Y";
            }
            if ($scope.PreBridgeCoursePracticalCenter.PrinterFlag == undefined) { $scope.PreBridgeCoursePracticalCenter.PrinterFlag = false; }
            if ($scope.PreBridgeCoursePracticalCenter.PrinterFlag == false) {
                $scope.PreBridgeCoursePracticalCenter.PrinterFlag = "N";
                alert("Printer is Compulsory");
                return;
            } else {
                $scope.PreBridgeCoursePracticalCenter.PrinterFlag = "Y";
            }
            if ($scope.IsDelete != true) {
                if ($scope.BasicCollegeist.length == 0) {
                    alert("Enter College to Alloted ");
                    return false;
                }
            }
            return true;
        }
        $scope.Exit = function () {
            //RedirectToListPage();
            //$scope.DistEnable = false;
            $state.go('CenterManagemnet');
        }
        function RedirectToListPage() {
            $scope.PreBridgeCoursePracticalCenter = {};
            $scope.BasicCollegeist = {};
            $scope.isupdatableDisable = false;
            $scope.isdeletableDisable = true;
            $scope.IsDelete = false;
            FillListData();
            $scope.ResetDate();
            $state.go('CenterManagemnet.PreBridgeCoursePracticalCenter');
        }
        var gridColumns = [
            //{ field: "SrNo", headerText: " Sr No ", textAlign: ej.TextAlign.Left, isPrimaryKey: true, width: 20 },
            { field: "ColCode", headerText: "College Code", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "ColName", headerText: "College Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "IsGovt", headerText: "Clg Type", textAlign: ej.TextAlign.Left, width: 25 },
            //{ field: "StudentCount", headerText: "Student Count", textAlign: ej.TextAlign.Right, width: 30 },
            { field: "CourseCount", headerText: "Course wise Count", textAlign: ej.TextAlign.Left, width: 150 }
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
        $scope.IsDelete = false;
        function DeleteRecord(args) {
            $scope.IsDelete = false;
            if (args.requestType == "delete") {
                $scope.PreBridgeCoursePracticalCenter.StudentTotalCount = 0;
                for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                    $scope.BasicCollegeist[i].SrNo = i + 1;
                    $scope.PreBridgeCoursePracticalCenter.StudentTotalCount = parseFloat($scope.PreBridgeCoursePracticalCenter.StudentTotalCount) + parseFloat($scope.BasicCollegeist[i].StudentCount);
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
            if (($scope.PreBridgeCoursePracticalCenter.DistrictID == undefined) || ($scope.PreBridgeCoursePracticalCenter.DistrictID == 0)) {
                alert("First Select District");
                return;
            }
            if (($scope.PreBridgeCoursePracticalCenter.CourseID == undefined) || ($scope.PreBridgeCoursePracticalCenter.CourseID == 0)) {
                alert("First Select Stream");
                return;
            } else {
                if (($scope.PreBridgeCoursePracticalCenter.ExamID == undefined) || ($scope.PreBridgeCoursePracticalCenter.ExamID == 0)) {
                    alert("First Select Year");
                    return;
                }
            }
            if ($scope.PreBridgeCoursePracticalCenter.CenterCollegeID == undefined || $scope.PreBridgeCoursePracticalCenter.CenterCollegeID == "") {
                alert("Select Center College");
                return;
            }
            if ($scope.PreBridgeCoursePracticalCenter.ExamCapacity == undefined || $scope.PreBridgeCoursePracticalCenter.ExamCapacity == "" || $scope.PreBridgeCoursePracticalCenter.ExamCapacity == 0) {
                alert("Enter Center Capacity greater than zero");
                return;
            }
            if ($scope.PreBridgeCoursePracticalCenter.CCamerasNo == undefined || $scope.PreBridgeCoursePracticalCenter.CCamerasNo == "") {
                alert("CCTV No is Compulsory");
                return;
            }
            if ($scope.PreBridgeCoursePracticalCenter.ElectricityFlag == undefined) { $scope.PreBridgeCoursePracticalCenter.ElectricityFlag = false; }
            if ($scope.PreBridgeCoursePracticalCenter.ElectricityFlag == false) {
                alert("Electricity is Compulsory");
                return;
            }
            if ($scope.PreBridgeCoursePracticalCenter.InternetFlag == undefined) { $scope.PreBridgeCoursePracticalCenter.InternetFlag = false; }
            if ($scope.PreBridgeCoursePracticalCenter.InternetFlag == false) {
                alert("Internet is Compulsory");
                return;
            }
            if ($scope.PreBridgeCoursePracticalCenter.ComputerFlag == undefined) { $scope.PreBridgeCoursePracticalCenter.ComputerFlag = false; }
            if ($scope.PreBridgeCoursePracticalCenter.ComputerFlag == false) {
                alert("Computer is Compulsory");
                return;
            }
            if ($scope.PreBridgeCoursePracticalCenter.PrinterFlag == undefined) { $scope.PreBridgeCoursePracticalCenter.PrinterFlag = false; }
            if ($scope.PreBridgeCoursePracticalCenter.PrinterFlag == false) {
                alert("Printer is Compulsory");
                return;
            }
            var ColPresent = "";
            for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                for (var j = 0; j < $scope.CenterCollegeListZone.length; j++) {
                    if ($scope.BasicCollegeist[i].CollegeID == $scope.CenterCollegeListZone[j].CollegeID) {
                        if (ColPresent != "") {
                            ColPresent = ColPresent + "," + $scope.BasicCollegeist[i].ColCode;
                        }
                        else {
                            ColPresent = $scope.BasicCollegeist[i].ColCode;
                        }
                    }
                }

            }
            if (ColPresent != "") {
                alert("" + ColPresent + ": already Linked this center");
                angular.element("#ColCode").focus();
                return;
            }
            $scope.PreBridgeCoursePracticalCenter.StudentTotalCount = 0;
            $scope.SrNo = 0;
            for (var i = 0; i < $scope.CenterCollegeListZone.length; i++) {
                var obj = {};
                obj.SrNo = $scope.SrNo + 1;
                $scope.SrNo = obj.SrNo;
                obj.CollegeID = $scope.CenterCollegeListZone[i].CollegeID;
                obj.ColName = $scope.CenterCollegeListZone[i].ColName;
                obj.ColCode = $scope.CenterCollegeListZone[i].ColCode;
                obj.IsGovt = $scope.CenterCollegeListZone[i].IsGovt;
               // obj.StudentCount = $scope.CenterCollegeListZone[i].StudentCount;
                obj.CourseCount = $scope.CenterCollegeListZone[i].CourseCount;
                //$scope.PreBridgeCoursePracticalCenter.StudentTotalCount = parseFloat($scope.PreBridgeCoursePracticalCenter.StudentTotalCount) + parseFloat($scope.CenterCollegeListZone[i].StudentCount);
                $scope.BasicCollegeist.push(obj);
                angular.element("#CollegeID").focus();
            }
            $scope.BasicCollegeist = $scope.BasicCollegeist;
            //if ($scope.PreBridgeCoursePracticalCenter.CollegeID != "") {
            //    var BasicCollegeData = BasicCollegeService.GetCollegeListForPracticalCenter($scope.PreBridgeCoursePracticalCenter.DistrictID, AppSettings.ExamInstID, $scope.PreBridgeCoursePracticalCenter.ExamID, $scope.PreBridgeCoursePracticalCenter.CollegeID);
            //    BasicCollegeData.then(function (data) {
            //        if (data.length == 0) {
            //            alert("College Code Not found");
            //            angular.element("#CollegeID").focus();
            //            $scope.PreBridgeCoursePracticalCenter.CollegeID = "";
            //            return;
            //        }
            //        for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
            //            if ($scope.BasicCollegeist[i].CollegeID == data[0].CollegeID) {
            //                alert("already Linked this college code");
            //                angular.element("#ColCode").focus();
            //                $scope.PreBridgeCoursePracticalCenter.ColCode = "";
            //                return;
            //            }
            //        }
            //        $scope.PreBridgeCoursePracticalCenter.StudentTotalCount = 0;
            //        for (var i = 0; i < data.length; i++) {
            //            var obj = {};
            //            obj.SrNo = $scope.BasicCollegeist.length + 1;
            //            obj.CollegeID = data[i].CollegeID;
            //            obj.ColName = data[i].ColName;
            //            obj.ColCode = data[i].ColCode;
            //            obj.IsGovt = data[i].IsGovt;
            //            obj.StudentCount = data[i].StudentCount;
            //            $scope.PreBridgeCoursePracticalCenter.StudentTotalCount = parseFloat($scope.PreBridgeCoursePracticalCenter.StudentTotalCount) + parseFloat(data[i].StudentCount);
            //            $scope.BasicCollegeist.push(obj);
            //            angular.element("#CollegeID").focus();
            //            //$scope.PreBridgeCoursePracticalCenter.CollegeID = "";
            //        }
            //        $scope.BasicCollegeist = $scope.BasicCollegeist;
            //    }, function (error) {
            //        alert(error);
            //    });
            //}
        }
        var gridColumns = [
            { field: "DistName", headerText: "District", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "ColCode", headerText: " Center Code ", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "ColName", headerText: " Center Name ", textAlign: ej.TextAlign.Left, width: 40 },
            //{ field: "Active", headerText: "Active", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "PrePractCntrID", headerText: "PrePractCntrID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.PreBridgeCourseCenterList = [];
        $("#PreBridgeCoursePracticalCenterGrid").ejGrid({
            dataSource: $scope.PreBridgeCourseCenterList,
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
                $scope.PreBridgeCoursePracticalCenter.PrePractCntrID = sender.data.PrePractCntrID;
                FillData();
                $scope.DistEnable = true;
                if ($scope.PreBridgeCoursePracticalCenter.PrePractCntrID > 0) {
                    $scope.isdeletableDisable = false;
                } else {
                    $scope.isdeletableDisable = true;
                }

            }
        }
        FillListData();
        function FillListData() {
            var PreVocationalCenterdata = PreBridgeCourseCenterService.GetPreVocationalCenterList(AppSettings.DistrictIDs);
            PreVocationalCenterdata.then(function (data) {
                $scope.PreBridgeCourseCenterList = data;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillListDataNew = function (DistrictID) {
            var PreVocationalCenterdata = PreBridgeCourseCenterService.GetPreVocationalCenterList(DistrictID);
            PreVocationalCenterdata.then(function (data) {
                $scope.PreBridgeCourseCenterList = data;
            }, function (error) {
                alert(error);
            });
        }
        

        function ResetDate() {
            $scope.PreBridgeCoursePracticalCenter = {};
            $scope.PreBridgeCoursePracticalCenter.ExamInstID = AppSettings.ExamInstID;
            var PageNm = $state.current.name.split(".")[1] + "List";
            var PreVocationalCenterRightsdata = [];
            $scope.PreBridgeCoursePracticalCenter.PrePractCntrID = 0;
            $scope.PreBridgeCoursePracticalCenter.IYearTotal = 0;
            $scope.PreBridgeCoursePracticalCenter.IIYearTotal = 0;
            PreVocationalCenterRightsdata = AppSettings.UserRights;
            for (var i = 0; i < PreVocationalCenterRightsdata.length; i++) {
                if (PreVocationalCenterRightsdata[i].GridFormToOpen == PageNm) {
                    if ($scope.PreBridgeCoursePracticalCenter.PrePractCntrID == 0) {
                        if (PreVocationalCenterRightsdata[i].isaddable == 'Y') {
                            $scope.isupdatableDisable = false;
                        } else {
                            $scope.isupdatableDisable = true;
                        }
                        $scope.isdeletableDisable = true;
                    } else {
                        if (PreVocationalCenterRightsdata[i].isupdatable == 'Y') {
                            $scope.isupdatableDisable = false;
                        }
                        else {
                            $scope.isupdatableDisable = true;
                        }
                        if (PreVocationalCenterRightsdata[i].isdeletable == 'Y') {
                            $scope.isdeletableDisable = false;
                        } else {
                            $scope.isdeletableDisable = true;
                        }
                    }
                }
            }
            if ($scope.PreBridgeCoursePracticalCenter.PrePractCntrID > 0) {
            } else {
                $scope.PreBridgeCoursePracticalCenter.PrePractCntrID = 0;
            }
            $scope.isupdatableDisable = false;
            $scope.isdeletableDisable = true;
            $scope.DistEnable = false;
            $scope.IsDelete = false;
            FillData();
            $scope.EnableCenterCollege = false;
            $scope.EnableYear = false;
            $scope.BasicCollegeist = [];
        }

    });
});
