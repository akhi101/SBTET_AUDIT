define(['app'], function (app) {
    app.controller("PreVocationalCenterController", function ($scope, $state, $stateParams, AppSettings, PreVocationalCenterService, BasicDistrictsService, BasicCollegeService, BasicCourseService, BasicExamService, PreZoneService) {
        $scope.PreVocationalCenter = {};
        $scope.PreVocationalCenter.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreVocationalCenterRightsdata = [];
        $scope.PreVocationalCenter.PrePractCntrID = 0;
        $scope.PreVocationalCenter.IYearTotal = 0;
        $scope.PreVocationalCenter.IIYearTotal = 0;
        PreVocationalCenterRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreVocationalCenterRightsdata.length; i++) {
            if (PreVocationalCenterRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreVocationalCenter.PrePractCntrID == 0) {
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
        if ($scope.PreVocationalCenter.PrePractCntrID > 0) {
        } else {
            $scope.PreVocationalCenter.PrePractCntrID = 0;
        }
        $scope.isupdatableDisable = false;
        $scope.isdeletableDisable = true;
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
                BasicDistrictList = BasicDistrictsService.GetDistrictListForCOE(AppSettings.ExamInstID,3);
            }

            BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                $scope.BasicDistrictList = DistrictData;
                if ($scope.PreVocationalCenter.PrePractCntrID == 0) { $scope.PreVocationalCenter.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + ""; }
               // var ZoneList = PreZoneService.GetPreZoneListByDistrictIdNew(AppSettings.DistrictIDs, AppSettings.ExamInstID, 3);
                if (AppSettings.SysUsrGrpID == 23) { $scope.FillListDataNew($scope.PreVocationalCenter.DistrictID); }
                var ZoneList = [];
                if (AppSettings.SysUsrGrpID != 23) {
                    ZoneList = PreZoneService.GetPreZoneListByDistrictId(AppSettings.DistrictIDs, AppSettings.ExamInstID, 3);
                } else {
                    ZoneList = PreZoneService.GetPreZoneListByDistrictIdNew($scope.PreVocationalCenter.DistrictID, AppSettings.ExamInstID, 3);
                }
                  
                ZoneList.then(function (ZoneData, status, headers, config, error) {
                    $scope.PreZoneList = ZoneData;
                    //var CollegeList = BasicCollegeService.GetPractVocZoneCollegeListByZoneID($scope.PreVocationalCenter.PrePractCntrID, 0, AppSettings.DistrictIDs);
                    //CollegeList.then(function (CollegeData, status, headers, config, error) {
                    //    $scope.CenterCollegeList = CollegeData;
                    var CollegeList = BasicCollegeService.GetPractVocZoneCollegeListByZoneID(1, 0, AppSettings.DistrictIDs);
                    CollegeList.then(function (CollegeData, status, headers, config, error) {
                        $scope.CenterCollegeListZone = CollegeData;
                        $scope.EnableCenterCollege1 = true;
                        var BasicCourseList = BasicCourseService.GetBasicCourseList();
                        BasicCourseList.then(function (CourseData, status, headers, config, error) {
                            $scope.BasicCourseList = CourseData;
                            $scope.PreVocationalCenter.CourseID = "2";
                            var BasicExamList = BasicExamService.GetExamListByCourseID(2);
                            BasicExamList.then(function (ExamData, status, headers, config, error) {
                                $scope.BasicExamList = ExamData;
                                if ($scope.PreVocationalCenter.PrePractCntrID > 0) {
                                    //var ZoneList = PreZoneService.GetPreZoneListByDistrictId(AppSettings.DistrictIDs, AppSettings.ExamInstID, 3);
                                    //ZoneList.then(function (ZoneData, status, headers, config, error) {
                                    //    $scope.PreZoneList = ZoneData;
                                        var PreVocationalCenterdata = PreVocationalCenterService.GetPreVocationalCenterById($scope.PreVocationalCenter.PrePractCntrID);
                                        PreVocationalCenterdata.then(function (data) {
                                            $scope.PreVocationalCenter = data[0];
                                            $scope.EnableCenterCollege = true;
                                            $scope.EnableCenterCollege1 = true;
                                            
                                            $scope.EnableYear = true;
                                            $scope.PreVocationalCenter.StudentTotalCount = 0;
                                            $scope.BasicCollegeist = data[0].BasicCollege;
                                            $scope.PreVocationalCenter.DistrictID = "" + data[0].DistrictID + "";
                                            $scope.PreVocationalCenter.CollegeID = "" + data[0].CollegeID + "";
                                            $scope.PreVocationalCenter.CourseID = "" + data[0].CourseID + "";
                                            $scope.PreVocationalCenter.ZoneID = "" + data[0].ZoneID + "";
                                            $scope.PreVocationalCenter.CenterCollegeID = "" + data[0].CenterCollegeID + "";
                                            if (data[0].ElectricityFlag == "Y") {
                                                $scope.PreVocationalCenter.ElectricityFlag = true;
                                            } else {
                                                $scope.PreVocationalCenter.ElectricityFlag = false;
                                            }
                                            if (data[0].InternetFlag == "Y") {
                                                $scope.PreVocationalCenter.InternetFlag = true;
                                            } else {
                                                $scope.PreVocationalCenter.InternetFlag = false;
                                            }
                                            if (data[0].ComputerFlag == "Y") {
                                                $scope.PreVocationalCenter.ComputerFlag = true;
                                            } else {
                                                $scope.PreVocationalCenter.ComputerFlag = false;
                                            }
                                            if (data[0].PrinterFlag == "Y") {
                                                $scope.PreVocationalCenter.PrinterFlag = true;
                                            } else {
                                                $scope.PreVocationalCenter.PrinterFlag = false;
                                            }
                                            for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                                                $scope.PreVocationalCenter.StudentTotalCount = parseFloat($scope.PreVocationalCenter.StudentTotalCount) + parseFloat($scope.BasicCollegeist[i].StudentCount);
                                            }
                                            $scope.districtDisable = true; 
                                            var ZoneList = PreZoneService.GetPreZoneListByDistrictId(data[0].DistrictID, AppSettings.ExamInstID, 3);
                                            ZoneList.then(function (ZoneData, status, headers, config, error) {
                                                $scope.PreZoneList = ZoneData;
                                                $scope.PreVocationalCenter.ZoneID = "" + data[0].ZoneID + "";
                                            }, function (error) {
                                                alert(error);
                                            });
                                            //var CollegeList = BasicCollegeService.GetPractVocZoneCollegeListByZoneID(0, $scope.PreVocationalCenter.ZoneID, AppSettings.DistrictIDs);
                                            //CollegeList.then(function (CollegeData, status, headers, config, error) {
                                            //    $scope.CenterCollegeList = CollegeData;
                                            //    $scope.PreVocationalCenter.CollegeID = data[0].CollegeID;
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
                    }, function (ZoneData, status, headers, config) {
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
        $scope.PreVocationalCenter.SysUsrGrpID = 0;
        if (AppSettings.SysUsrGrpID == 7) {
            $scope.PreVocationalCenter.SysUsrGrpID = 9;
        } else if (AppSettings.SysUsrGrpID == 9) {
            $scope.PreVocationalCenter.SysUsrGrpID = 2;
        } else if (AppSettings.SysUsrGrpID == 2) {
            $scope.PreVocationalCenter.SysUsrGrpID = 11;
        } else if (AppSettings.SysUsrGrpID == 11) {
            $scope.PreVocationalCenter.SysUsrGrpID = 23;
        }
        //$scope.GetCenterCollegeList = function (ZoneID) {
        //    if (ZoneID != "" || ZoneID != undefined) {
        //        $scope.EnableCenterCollege = false;
        //        var CollegeList = BasicCollegeService.GetPractZoneCollegeListByZoneID(ZoneID);
        //        CollegeList.then(function (CollegeData, status, headers, config, error) {
        //            $scope.CenterCollegeList = CollegeData;
        //        }, function (CollegeData, status, headers, config) {
        //            alert(error);
        //        })
        //    }
        //}
        $scope.GetCenterCollegeList = function (ZoneID) {
            if (ZoneID != "" || ZoneID != undefined) {
                $scope.EnableCenterCollege = false;
                var CollegeList = BasicCollegeService.GetPractVocZoneCollegeListByZoneID(1, ZoneID, AppSettings.DistrictIDs);
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
                var ZoneList = PreZoneService.GetPreZoneListByDistrictIdNew(DistrictID, AppSettings.ExamInstID, 3);
                ZoneList.then(function (ZoneData, status, headers, config, error) {
                    $scope.PreZoneList = ZoneData;
                    if (AppSettings.SysUsrGrpID == 23) { $scope.FillListDataNew($scope.PreVocationalCenter.DistrictID); }
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
            if ($scope.PreVocationalCenter.PrePractCntrID == undefined) { $scope.PreVocationalCenter.PrePractCntrID = 0; }
            if (CheckValidation() == true) {
                $scope.PreVocationalCenter.BasicCollege = $scope.BasicCollegeist;
                $scope.PreVocationalCenter.ExamInstID = AppSettings.ExamInstID;
                $scope.PreVocationalCenter.ZoneType = 3;
                $scope.PreVocationalCenter.CreLoginID = AppSettings.LoggedUserId;
                $scope.PreVocationalCenter.UpdLoginID = AppSettings.LoggedUserId;
                $scope.PreVocationalCenter.SysUsrGrpID = 0;
                if (AppSettings.SysUsrGrpID == 7) {
                    $scope.PreVocationalCenter.SysUsrGrpID = 9;
                } else if (AppSettings.SysUsrGrpID == 9) {
                    $scope.PreVocationalCenter.SysUsrGrpID = 2;
                } else if (AppSettings.SysUsrGrpID == 2) {
                    $scope.PreVocationalCenter.SysUsrGrpID = 11;
                } else if (AppSettings.SysUsrGrpID == 11) {
                    $scope.PreVocationalCenter.SysUsrGrpID = 23;
                }
                if ($scope.PreVocationalCenter.PrePractCntrID == 0) {
                    $scope.PreVocationalCenter.CollegeID = 0
                    $scope.PreVocationalCenter.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PreVocationalCenter.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreVocationalCenterService.AddPreVocationalCenter($scope.PreVocationalCenter);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.PreVocationalCenter.CollegeID = 0;
                    $scope.PreVocationalCenter.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreVocationalCenterService.UpdatePreVocationalCenter($scope.PreVocationalCenter);
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
        $scope.DeletePreVocationalCenter = function () {
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                var getData = PreVocationalCenterService.DeletePreVocationalCenter($scope.PreVocationalCenter.PrePractCntrID, AppSettings.LoggedUserId);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    RedirectToListPage();
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.DeletePreVocationalCenterNew = function () {
            $scope.PreVocationalCenter.ZoneType = 3;
            if (AppSettings.SysUsrGrpID == 7) {
                $scope.PreVocationalCenter.SysUsrGrpID = 9;
            } else if (AppSettings.SysUsrGrpID == 9) {
                $scope.PreVocationalCenter.SysUsrGrpID = 2;
            } else if (AppSettings.SysUsrGrpID == 2) {
                $scope.PreVocationalCenter.SysUsrGrpID = 11;
            } else if (AppSettings.SysUsrGrpID == 11) {
                $scope.PreVocationalCenter.SysUsrGrpID = 23;
            }
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                var getData = PreVocationalCenterService.DeletePreVocationalCenterNew($scope.PreVocationalCenter);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    RedirectToListPage();
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.ResetDate = function () {
            $scope.PreVocationalCenter = {};
            $scope.PreVocationalCenter.ExamInstID = AppSettings.ExamInstID;
            var PageNm = $state.current.name.split(".")[1] + "List";
            var PreVocationalCenterRightsdata = [];
            $scope.PreVocationalCenter.IYearTotal = 0;
            $scope.PreVocationalCenter.IIYearTotal = 0;
            PreVocationalCenterRightsdata = AppSettings.UserRights;
            for (var i = 0; i < PreVocationalCenterRightsdata.length; i++) {
                if (PreVocationalCenterRightsdata[i].GridFormToOpen == PageNm) {
                    if ($scope.PreVocationalCenter.PrePractCntrID == 0) {
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
            if ($scope.PreVocationalCenter.PrePractCntrID > undefined) {
            } else {
                $scope.PreVocationalCenter.PrePractCntrID = 0;
            }
            $scope.isupdatableDisable = false;
            $scope.isdeletableDisable = true;
            $scope.DistEnable = false;
            FillData();
            //$scope.EnableCenterCollege = false;
            $scope.EnableYear = false;
            $scope.EnableCenterCollege = false;
            $scope.EnableCenterCollege1 = true;
            $scope.IsDelete = false;
            $scope.BasicCollegeist = [];
            $scope.districtDisable = false; 
        }
        function CheckValidation() {
            if (($scope.PreVocationalCenter.DistrictID == undefined) || ($scope.PreVocationalCenter.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PreVocationalCenter.CenterCollegeID == undefined) || ($scope.PreVocationalCenter.CenterCollegeID == "")) {
                alert("Select Practical Center");
                return false;
            }
            if ($scope.PreVocationalCenter.ExamCapacity == undefined || $scope.PreVocationalCenter.ExamCapacity == "" || $scope.PreVocationalCenter.ExamCapacity == 0) {
                alert("Enter Center Capacity greater than zero");
                return;
            }
            //if (($scope.PreVocationalCenter.ExamID == undefined) || ($scope.PreVocationalCenter.ExamID == "")) {
            //    alert("Select Year");
            //    return false;
            //}
            if (($scope.PreVocationalCenter.ExamID == undefined) || ($scope.PreVocationalCenter.ExamID == "")) {
                $scope.PreVocationalCenter.ExamID = 0;
            }
            if ($scope.PreVocationalCenter.CCamerasNo == undefined || $scope.PreVocationalCenter.CCamerasNo == "") {
                alert("CCTV No is Compulsory");
                return;
            }
            if ($scope.PreVocationalCenter.ElectricityFlag == undefined) { $scope.PreVocationalCenter.ElectricityFlag = false; }
            if ($scope.PreVocationalCenter.ElectricityFlag == false) {
                $scope.PreVocationalCenter.ElectricityFlag = "Y";
                alert("Electricity is Compulsory");
                return;
            } else {
                $scope.PreVocationalCenter.ElectricityFlag = "Y";
            }
            if ($scope.PreVocationalCenter.InternetFlag == undefined) { $scope.PreVocationalCenter.InternetFlag = false; }
            if ($scope.PreVocationalCenter.InternetFlag == false) {
                $scope.PreVocationalCenter.InternetFlag = "N";
                alert("Internet is Compulsory");
                return;
            } else {
                $scope.PreVocationalCenter.InternetFlag = "Y";
            }
            if ($scope.PreVocationalCenter.ComputerFlag == undefined) { $scope.PreVocationalCenter.ComputerFlag = false; }
            if ($scope.PreVocationalCenter.ComputerFlag == false) {
                $scope.PreVocationalCenter.ComputerFlag = "N";
                alert("Computer is Compulsory");
                return;
            } else {
                $scope.PreVocationalCenter.ComputerFlag = "Y";
            }
            if ($scope.PreVocationalCenter.PrinterFlag == undefined) { $scope.PreVocationalCenter.PrinterFlag = false; }
            if ($scope.PreVocationalCenter.PrinterFlag == false) {
                $scope.PreVocationalCenter.PrinterFlag = "N";
                alert("Printer is Compulsory");
                return;
            } else {
                $scope.PreVocationalCenter.PrinterFlag = "Y";
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
            $scope.PreVocationalCenter = {};
            $scope.BasicCollegeist = {};
            $scope.isupdatableDisable = false;
            $scope.isdeletableDisable = true;
            $scope.IsDelete = false;
            FillListData();
            $scope.ResetDate();
            $state.go('CenterManagemnet.PreVocationalCenter');
        }
        var gridColumns = [
            //{ field: "SrNo", headerText: " Sr No ", textAlign: ej.TextAlign.Left, isPrimaryKey: true, width: 20 },
            { field: "ColCode", headerText: "College Code", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "ColName", headerText: "College Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "IsGovt", headerText: "Clg Type", textAlign: ej.TextAlign.Left, width: 30 },
            //{ field: "StudentCount", headerText: "Student Count", textAlign: ej.TextAlign.Right, width: 100 },
            { field: "CourseCount", headerText: "Course Count (I yr)", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "CourseCount2", headerText: "Course Count (II yr)", textAlign: ej.TextAlign.Left, width: 100 }
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
                $scope.PreVocationalCenter.StudentTotalCount = 0;
                for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                    $scope.BasicCollegeist[i].SrNo = i + 1;
                    $scope.PreVocationalCenter.StudentTotalCount = parseFloat($scope.PreVocationalCenter.StudentTotalCount) + parseFloat($scope.BasicCollegeist[i].StudentCount);
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
            if (($scope.PreVocationalCenter.DistrictID == undefined) || ($scope.PreVocationalCenter.DistrictID == 0)) {
                alert("First Select District");
                return;
            }
            if (($scope.PreVocationalCenter.CourseID == undefined) || ($scope.PreVocationalCenter.CourseID == 0)) {
                alert("First Select Stream");
                return;
            } else {
                //if (($scope.PreVocationalCenter.ExamID == undefined) || ($scope.PreVocationalCenter.ExamID == 0)) {
                //    alert("First Select Year");
                //    return;
                //}
                if (($scope.PreVocationalCenter.ExamID == undefined) || ($scope.PreVocationalCenter.ExamID == 0)) {
                    $scope.PreVocationalCenter.ExamID = 0;
                }
            }
            if ($scope.PreVocationalCenter.CenterCollegeID == undefined || $scope.PreVocationalCenter.CenterCollegeID == "") {
                alert("Select Center College");
                return;
            }
            if ($scope.PreVocationalCenter.ExamCapacity == undefined || $scope.PreVocationalCenter.ExamCapacity == "" || $scope.PreVocationalCenter.ExamCapacity == 0) {
                alert("Enter Center Capacity greater than zero");
                return;
            }
            if ($scope.PreVocationalCenter.CCamerasNo == undefined || $scope.PreVocationalCenter.CCamerasNo == "") {
                alert("CCTV No is Compulsory");
                return;
            }
            if ($scope.PreVocationalCenter.ElectricityFlag == undefined) { $scope.PreVocationalCenter.ElectricityFlag = false; }
            if ($scope.PreVocationalCenter.ElectricityFlag == false) {
                alert("Electricity is Compulsory");
                return;
            }
            if ($scope.PreVocationalCenter.InternetFlag == undefined) { $scope.PreVocationalCenter.InternetFlag = false; }
            if ($scope.PreVocationalCenter.InternetFlag == false) {
                alert("Internet is Compulsory");
                return;
            }
            if ($scope.PreVocationalCenter.ComputerFlag == undefined) { $scope.PreVocationalCenter.ComputerFlag = false; }
            if ($scope.PreVocationalCenter.ComputerFlag == false) {
                alert("Computer is Compulsory");
                return;
            }
            if ($scope.PreVocationalCenter.PrinterFlag == undefined) { $scope.PreVocationalCenter.PrinterFlag = false; }
            if ($scope.PreVocationalCenter.PrinterFlag == false) {
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
            if (ColPresent !="") {
                alert("" + ColPresent + ": already Linked this center");
                angular.element("#ColCode").focus();
                return;
            }
            $scope.PreVocationalCenter.StudentTotalCount = 0;
            $scope.SrNo = 0;
            for (var i = 0; i < $scope.CenterCollegeListZone.length; i++) {
                var obj = {};
                obj.SrNo = $scope.SrNo + 1;
                $scope.SrNo = obj.SrNo;
                obj.CollegeID = $scope.CenterCollegeListZone[i].CollegeID;
                obj.ColName = $scope.CenterCollegeListZone[i].ColName;
                obj.ColCode = $scope.CenterCollegeListZone[i].ColCode;
                obj.IsGovt = $scope.CenterCollegeListZone[i].IsGovt;
                obj.StudentCount = $scope.CenterCollegeListZone[i].StudentCount;
                obj.CourseCount = $scope.CenterCollegeListZone[i].CourseCount;
                obj.CourseCount2 = $scope.CenterCollegeListZone[i].CourseCount2;
                $scope.PreVocationalCenter.StudentTotalCount = parseFloat($scope.PreVocationalCenter.StudentTotalCount) + parseFloat($scope.CenterCollegeListZone[i].StudentCount);
                $scope.BasicCollegeist.push(obj);
                angular.element("#CollegeID").focus();
            }
            $scope.BasicCollegeist = $scope.BasicCollegeist;
            //if ($scope.PreVocationalCenter.CollegeID != "") {
            //    var BasicCollegeData = BasicCollegeService.GetCollegeListForPracticalCenter($scope.PreVocationalCenter.DistrictID, AppSettings.ExamInstID, $scope.PreVocationalCenter.ExamID, $scope.PreVocationalCenter.CollegeID);
            //    BasicCollegeData.then(function (data) {
            //        if (data.length == 0) {
            //            alert("College Code Not found");
            //            angular.element("#CollegeID").focus();
            //            $scope.PreVocationalCenter.CollegeID = "";
            //            return;
            //        }
            //        for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
            //            if ($scope.BasicCollegeist[i].CollegeID == data[0].CollegeID) {
            //                alert("already Linked this college code");
            //                angular.element("#ColCode").focus();
            //                $scope.PreVocationalCenter.ColCode = "";
            //                return;
            //            }
            //        }
            //        $scope.PreVocationalCenter.StudentTotalCount = 0;
            //        for (var i = 0; i < data.length; i++) {
            //            var obj = {};
            //            obj.SrNo = $scope.BasicCollegeist.length + 1;
            //            obj.CollegeID = data[i].CollegeID;
            //            obj.ColName = data[i].ColName;
            //            obj.ColCode = data[i].ColCode;
            //            obj.IsGovt = data[i].IsGovt;
            //            obj.StudentCount = data[i].StudentCount;
            //            $scope.PreVocationalCenter.StudentTotalCount = parseFloat($scope.PreVocationalCenter.StudentTotalCount) + parseFloat(data[i].StudentCount);
            //            $scope.BasicCollegeist.push(obj);
            //            angular.element("#CollegeID").focus();
            //            //$scope.PreVocationalCenter.CollegeID = "";
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
        $scope.PreVocationalCenterList = [];
        $("#PreVocationalCenter").ejGrid({
            dataSource: $scope.PreVocationalCenterList,
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
                $scope.PreVocationalCenter.PrePractCntrID = sender.data.PrePractCntrID;
                $scope.PreVocationalCenter.ZoneID = sender.data.ZoneID;
                FillData();
                $scope.DistEnable = true;
                if ($scope.PreVocationalCenter.ZoneID > 0) {
                    $scope.isdeletableDisable = false;
                } else {
                    $scope.isdeletableDisable = true;
                }


            }
        }
        FillListData();
        function FillListData() {
            var PreVocationalCenterdata = PreVocationalCenterService.GetPreVocationalCenterList(AppSettings.DistrictIDs);
            PreVocationalCenterdata.then(function (data) {
                $scope.PreVocationalCenterList = data;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillListDataNew = function (DistrictID) {
            var PreVocationalCenterdata = PreVocationalCenterService.GetPreVocationalCenterList(DistrictID);
            PreVocationalCenterdata.then(function (data) {
                $scope.PreVocationalCenterList = data;
            }, function (error) {
                alert(error);
            });
        }
        function ResetDate() {
            $scope.PreVocationalCenter = {};
            $scope.PreVocationalCenter.ExamInstID = AppSettings.ExamInstID;
            var PageNm = $state.current.name.split(".")[1] + "List";
            var PreVocationalCenterRightsdata = [];
            $scope.PreVocationalCenter.PrePractCntrID = 0;
            $scope.PreVocationalCenter.IYearTotal = 0;
            $scope.PreVocationalCenter.IIYearTotal = 0;
            PreVocationalCenterRightsdata = AppSettings.UserRights;
            for (var i = 0; i < PreVocationalCenterRightsdata.length; i++) {
                if (PreVocationalCenterRightsdata[i].GridFormToOpen == PageNm) {
                    if ($scope.PreVocationalCenter.PrePractCntrID == 0) {
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
            if ($scope.PreVocationalCenter.PrePractCntrID > 0) {
            } else {
                $scope.PreVocationalCenter.PrePractCntrID = 0;
            }
            $scope.isupdatableDisable = false;
            $scope.isdeletableDisable = true;
            $scope.DistEnable = false;
            FillData();
            $scope.EnableCenterCollege = false;
            $scope.EnableYear = false;
            $scope.BasicCollegeist = [];
        }

    });
});
