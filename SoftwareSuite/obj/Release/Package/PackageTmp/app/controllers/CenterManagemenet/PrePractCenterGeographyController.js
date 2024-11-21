define(['app'], function (app) {
    app.controller("PrePractCenterGeographyController", function ($scope, $state, $stateParams, AppSettings, PrePractCenterService, BasicDistrictsService, BasicCollegeService, BasicCourseService, BasicExamService, PreZoneService) {
        $scope.PrePractCenter = {};
        $scope.PrePractCenter.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PrePractCenterRightsdata = [];
        $scope.PrePractCenter.IYearTotal = 0;
        $scope.PrePractCenter.IIYearTotal = 0;
        $scope.PrePractCenter.StudentTotalCount = 0;
        PrePractCenterRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PrePractCenterRightsdata.length; i++) {
            if (PrePractCenterRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PrePractCenter.PrePractCntrID == 0) {
                    if (PrePractCenterRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PrePractCenterRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PrePractCenterRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        if ($scope.PrePractCenter.PrePractCntrID == undefined) {
            $scope.PrePractCenter.PrePractCntrID = 0;
        }
        $scope.isupdatableDisable = false;
        $scope.isdeletableDisable = true;
        $scope.DistEnable = false;
        FillData();
        $scope.EnableCenterCollege = false;
        $scope.EnableCenterCollege1 = true;
        $scope.EnableYear = false;
        function FillData() {
            //var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);

            var BasicDistrictList = [];

            if (AppSettings.SysUsrGrpID != 23) {
                BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
            } else {
                BasicDistrictList = BasicDistrictsService.GetDistrictListForCOE(AppSettings.ExamInstID,6);
            }

            BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                $scope.BasicDistrictList = DistrictData;
                $scope.PrePractCenter.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
                var ZoneList = PreZoneService.GetPreZoneListByDistrictIdNew(AppSettings.DistrictIDs, AppSettings.ExamInstID,6);
                ZoneList.then(function (ZoneData, status, headers, config, error) {
                    $scope.PreZoneList = ZoneData;
                    //var CollegeList = BasicCollegeService.GetPractZoneCollegeListByZoneID($scope.PrePractCenter.PrePractCntrID, 0, AppSettings.DistrictIDs);
                    //CollegeList.then(function (CollegeData, status, headers, config, error) {
                    //    $scope.CenterCollegeList = CollegeData;
                    var CollegeList = BasicCollegeService.GetPractZoneCollegeListByZoneID(1, 0, AppSettings.DistrictIDs);
                    CollegeList.then(function (CollegeData, status, headers, config, error) {
                        $scope.CenterCollegeListZone = CollegeData;
                        $scope.EnableCenterCollege1 = true;
                        var BasicCourseList = BasicCourseService.GetBasicCourseList();
                        BasicCourseList.then(function (CourseData, status, headers, config, error) {
                            $scope.BasicCourseList = CourseData;
                            $scope.PrePractCenter.CourseID = "1";
                            var BasicExamList = BasicExamService.GetExamListByCourseID($scope.PrePractCenter.CourseID);//(0);
                            $scope.PrePractCenter.ExamID = "2";
                            BasicExamList.then(function (ExamData, status, headers, config, error) {
                                $scope.BasicExamList = ExamData;
                                if ($scope.PrePractCenter.PrePractCntrID > 0) {
                                    var ZoneList = PreZoneService.GetPreZoneListByDistrictId(AppSettings.DistrictIDs, AppSettings.ExamInstID, 6);
                                    ZoneList.then(function (ZoneData, status, headers, config, error) {
                                        $scope.PreZoneList = ZoneData;
                                        var PrePractCenterdata = PrePractCenterService.GetPrePractCenterById($scope.PrePractCenter.PrePractCntrID);
                                        PrePractCenterdata.then(function (data) {
                                            $scope.PrePractCenter = data[0];
                                            $scope.EnableCenterCollege = true;
                                            $scope.EnableCenterCollege1 = true;

                                            $scope.EnableYear = true;
                                            $scope.PrePractCenter.StudentTotalCount = 0;
                                            $scope.BasicCollegeist = data[0].BasicCollege;
                                            $scope.PrePractCenter.DistrictID = "" + data[0].DistrictID + "";
                                            $scope.PrePractCenter.ZoneID = "" + data[0].ZoneID + "";
                                            $scope.PrePractCenter.CourseID = "" + data[0].CourseID + "";
                                            $scope.PrePractCenter.ExamID = "" + data[0].ExamID + "";
                                            $scope.PrePractCenter.CenterCollegeID = "" + data[0].CenterCollegeID + "";
                                            if (data[0].ElectricityFlag == "Y") {
                                                $scope.PrePractCenter.ElectricityFlag = true;
                                            } else {
                                                $scope.PrePractCenter.ElectricityFlag = false;
                                            }
                                            if (data[0].InternetFlag == "Y") {
                                                $scope.PrePractCenter.InternetFlag = true;
                                            } else {
                                                $scope.PrePractCenter.InternetFlag = false;
                                            }
                                            if (data[0].ComputerFlag == "Y") {
                                                $scope.PrePractCenter.ComputerFlag = true;
                                            } else {
                                                $scope.PrePractCenter.ComputerFlag = false;
                                            }
                                            if (data[0].PrinterFlag == "Y") {
                                                $scope.PrePractCenter.PrinterFlag = true;
                                            } else {
                                                $scope.PrePractCenter.PrinterFlag = false;
                                            }
                                            for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                                                $scope.PrePractCenter.StudentTotalCount = parseFloat($scope.PrePractCenter.StudentTotalCount) + parseFloat($scope.BasicCollegeist[i].StudentCount);
                                            }
                                            //var CollegeList = BasicCollegeService.GetPractZoneCollegeListByZoneID(0, $scope.PrePractCenter.ZoneID, AppSettings.DistrictIDs);
                                            //CollegeList.then(function (CollegeData, status, headers, config, error) {
                                            //    $scope.CenterCollegeList = CollegeData;
                                            //    $scope.PrePractCenter.CollegeID = data[0].CollegeID;
                                            //}, function (CollegeData, status, headers, config) {
                                            //    alert(error);
                                            //})
                                        }, function (error) {
                                            alert(error);
                                        });
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
        $scope.PrePractCenter.SysUsrGrpID = 0;
        if (AppSettings.SysUsrGrpID == 7) {
            $scope.PrePractCenter.SysUsrGrpID = 9;
        } else if (AppSettings.SysUsrGrpID == 9) {
            $scope.PrePractCenter.SysUsrGrpID = 2;
        } else if (AppSettings.SysUsrGrpID == 2) {
            $scope.PrePractCenter.SysUsrGrpID = 11;
        } else if (AppSettings.SysUsrGrpID == 11) {
            $scope.PrePractCenter.SysUsrGrpID = 23;
        }
        $scope.GetCenterCollegeList = function (ZoneID) {
            if (ZoneID != "" || ZoneID != undefined) {
                $scope.EnableCenterCollege = false;
                var CollegeList = BasicCollegeService.GetPractZoneCollegeListByZoneID(1, ZoneID, AppSettings.DistrictIDs);
                CollegeList.then(function (CollegeData, status, headers, config, error) {
                    $scope.CenterCollegeListZone = CollegeData;
                    $scope.EnableCenterCollege1 = false;
                    //var CollegeList = BasicCollegeService.GetPractZoneCollegeListByZoneID(0, ZoneID, AppSettings.DistrictIDs);
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
        //$scope.GetCenterCollegeListNew = function () {
        //    if (ZoneID != "" || ZoneID != undefined) {
        //        $scope.EnableCenterCollege = false;
        //        var CollegeList = BasicCollegeService.GetPractZoneCollegeListByZoneID($scope.PrePractCenter.PrePractCntrID, $scope.PrePractCenter.ZoneID, AppSettings.DistrictIDs);
        //        CollegeList.then(function (CollegeData, status, headers, config, error) {
        //            $scope.CenterCollegeList = CollegeData;
        //        }, function (CollegeData, status, headers, config) {
        //            alert(error);
        //        })
        //    }
        //}
        $scope.GetPreZoneList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                $scope.EnableCenterCollege = false;
                var ZoneList = PreZoneService.GetPreZoneListByDistrictIdNew(DistrictID, AppSettings.ExamInstID, 6);
                ZoneList.then(function (ZoneData, status, headers, config, error) {
                    $scope.PreZoneList = ZoneData;
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
        $scope.SavePrePractCenter = function () {
            $scope.isupdatableDisable = true;
            if ($scope.PrePractCenter.PrePractCntrID == undefined) { $scope.PrePractCenter.PrePractCntrID = 0; }
            if (CheckValidation() == true) {
                $scope.PrePractCenter.BasicCollege = $scope.BasicCollegeist;
                $scope.PrePractCenter.ExamInstID = AppSettings.ExamInstID;
                $scope.PrePractCenter.ZoneType = 6;
                $scope.PrePractCenter.CreLoginID = AppSettings.LoggedUserId;
                $scope.PrePractCenter.UpdLoginID = AppSettings.LoggedUserId;
                $scope.PrePractCenter.SysUsrGrpID = 0;
                if (AppSettings.SysUsrGrpID == 7) {
                    $scope.PrePractCenter.SysUsrGrpID = 9;
                } else if (AppSettings.SysUsrGrpID == 9) {
                    $scope.PrePractCenter.SysUsrGrpID = 2;
                } else if (AppSettings.SysUsrGrpID == 2) {
                    $scope.PrePractCenter.SysUsrGrpID = 11;
                } else if (AppSettings.SysUsrGrpID == 11) {
                    $scope.PrePractCenter.SysUsrGrpID = 23;
                }
                if ($scope.PrePractCenter.PrePractCntrID == 0) {
                    $scope.PrePractCenter.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PrePractCenter.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PrePractCenterService.AddPrePractCenter($scope.PrePractCenter);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.PrePractCenter.CollegeID = 0;
                    $scope.PrePractCenter.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PrePractCenterService.UpdatePrePractCenter($scope.PrePractCenter);
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

        //$scope.DeletePrePractCenter = function () {
        //    var isConfirmed = confirm("Are you sure to delete this record ?");
        //    if (isConfirmed) {
        //        var getData = PrePractCenterService.DeletePrePractCenter($scope.PrePractCenter.PrePractCntrID, AppSettings.LoggedUserId);
        //        getData.then(function (msg) {
        //            alert('Record Deleted');
        //            RedirectToListPage();
        //        }, function (error) {
        //            alert(error);
        //        });
        //    }
        //}

        $scope.DeletePrePractCenterNew = function () {
            $scope.PrePractCenter.ZoneType = 6;
            if (AppSettings.SysUsrGrpID == 7) {
                $scope.PrePractCenter.SysUsrGrpID = 9;
            } else if (AppSettings.SysUsrGrpID == 9) {
                $scope.PrePractCenter.SysUsrGrpID = 2;
            } else if (AppSettings.SysUsrGrpID == 2) {
                $scope.PrePractCenter.SysUsrGrpID = 11;
            } else if (AppSettings.SysUsrGrpID == 11) {
                $scope.PrePractCenter.SysUsrGrpID = 23;
            }
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                var getData = PrePractCenterService.DeletePrePractCenterNew($scope.PrePractCenter);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    RedirectToListPage();
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.ResetDate = function () {
            $scope.PrePractCenter = {};
            $scope.PrePractCenter.ExamInstID = AppSettings.ExamInstID;
            var PageNm = $state.current.name.split(".")[1] + "List";
            var PrePractCenterRightsdata = [];
            $scope.PrePractCenter.IYearTotal = 0;
            $scope.PrePractCenter.IIYearTotal = 0;
            PrePractCenterRightsdata = AppSettings.UserRights;
            for (var i = 0; i < PrePractCenterRightsdata.length; i++) {
                if (PrePractCenterRightsdata[i].GridFormToOpen == PageNm) {
                    if ($scope.PrePractCenter.PrePractCntrID == 0) {
                        if (PrePractCenterRightsdata[i].isaddable == 'Y') {
                            $scope.isupdatableDisable = false;
                        } else {
                            $scope.isupdatableDisable = true;
                        }
                        $scope.isdeletableDisable = true;
                    } else {
                        if (PrePractCenterRightsdata[i].isupdatable == 'Y') {
                            $scope.isupdatableDisable = false;
                        }
                        else {
                            $scope.isupdatableDisable = true;
                        }
                        if (PrePractCenterRightsdata[i].isdeletable == 'Y') {
                            $scope.isdeletableDisable = false;
                        } else {
                            $scope.isdeletableDisable = true;
                        }
                    }
                }
            }
            if ($scope.PrePractCenter.PrePractCntrID == undefined) {
                $scope.PrePractCenter.PrePractCntrID = 0;
            }
            $scope.isupdatableDisable = false;
            $scope.isdeletableDisable = true;
            $scope.DistEnable = false;
            FillData();
            $scope.EnableCenterCollege = false;
            $scope.EnableCenterCollege1 = true;
            $scope.EnableYear = false;
            $scope.IsDelete = false;
            $scope.BasicCollegeist = [];

        }
        function CheckValidation() {
            if (($scope.PrePractCenter.DistrictID == undefined) || ($scope.PrePractCenter.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PrePractCenter.ZoneID == undefined) || ($scope.PrePractCenter.ZoneID == "")) {
                alert("Select Zone");
                return false;
            }
            if (($scope.PrePractCenter.CenterCollegeID == undefined) || ($scope.PrePractCenter.CenterCollegeID == "")) {
                alert("Select Practical Center");
                return false;
            }
            if ($scope.PrePractCenter.ExamCapacity == undefined || $scope.PrePractCenter.ExamCapacity == "" || $scope.PrePractCenter.ExamCapacity == 0) {
                alert("Enter Center Capacity greater than zero");
                return;
            }
            if (($scope.PrePractCenter.ExamID == undefined) || ($scope.PrePractCenter.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            if ($scope.PrePractCenter.CCamerasNo == undefined || $scope.PrePractCenter.CCamerasNo == "") {
                alert("CCTV No is Compulsory");
                return;
            }
            if ($scope.PrePractCenter.ElectricityFlag == undefined) { $scope.PrePractCenter.ElectricityFlag = false; }
            if ($scope.PrePractCenter.ElectricityFlag == false) {
                $scope.PrePractCenter.ElectricityFlag = "Y";
                alert("Electricity is Compulsory");
                return;
            } else {
                $scope.PrePractCenter.ElectricityFlag = "Y";
            }
            if ($scope.PrePractCenter.InternetFlag == undefined) { $scope.PrePractCenter.InternetFlag = false; }
            if ($scope.PrePractCenter.InternetFlag == false) {
                $scope.PrePractCenter.InternetFlag = "N";
                alert("Internet is Compulsory");
                return;
            } else {
                $scope.PrePractCenter.InternetFlag = "Y";
            }
            if ($scope.PrePractCenter.ComputerFlag == undefined) { $scope.PrePractCenter.ComputerFlag = false; }
            if ($scope.PrePractCenter.ComputerFlag == false) {
                $scope.PrePractCenter.ComputerFlag = "N";
                alert("Computer is Compulsory");
                return;
            } else {
                $scope.PrePractCenter.ComputerFlag = "Y";
            }
            if ($scope.PrePractCenter.PrinterFlag == undefined) { $scope.PrePractCenter.PrinterFlag = false; }
            if ($scope.PrePractCenter.PrinterFlag == false) {
                $scope.PrePractCenter.PrinterFlag = "N";
                alert("Printer is Compulsory");
                return;
            } else {
                $scope.PrePractCenter.PrinterFlag = "Y";
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
            $scope.PrePractCenter = {};
            $scope.BasicCollegeist = {};
            $scope.isupdatableDisable = false;
            $scope.IsDelete = false;
            FillListData();
            $scope.ResetDate();
            $state.go('CenterManagemnet.PrePractCenterGeography');
        }
        var gridColumns = [
            { field: "SrNo", headerText: " Sr No ", textAlign: ej.TextAlign.Left, isPrimaryKey: true, width: 20 },
            { field: "ColCode", headerText: "College Code", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "ColName", headerText: "College Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "IsGovt", headerText: "Clg Type", textAlign: ej.TextAlign.Left, width: 25 },
            { field: "StudentCount", headerText: "Student Count", textAlign: ej.TextAlign.Right, width: 30 },
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
            if (args.requestType == "Delete") {
                $scope.PrePractCenter.StudentTotalCount = 0;
                for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                    $scope.BasicCollegeist[i].SrNo = i + 1;
                    $scope.PrePractCenter.StudentTotalCount = parseFloat($scope.PrePractCenter.StudentTotalCount) + parseFloat($scope.BasicCollegeist[i].StudentCount);
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
            if (($scope.PrePractCenter.DistrictID == undefined) || ($scope.PrePractCenter.DistrictID == 0)) {
                alert("First Select District");
                return;
            }
            if (($scope.PrePractCenter.CourseID == undefined) || ($scope.PrePractCenter.CourseID == 0)) {
                alert("First Select Stream");
                return;
            } else {
                if (($scope.PrePractCenter.ExamID == undefined) || ($scope.PrePractCenter.ExamID == 0)) {
                    alert("First Select Year");
                    return;
                }
            }
            if ($scope.PrePractCenter.CenterCollegeID == undefined || $scope.PrePractCenter.CenterCollegeID == "") {
                alert("Select Center College");
                return;
            }
            if ($scope.PrePractCenter.ExamCapacity == undefined || $scope.PrePractCenter.ExamCapacity == "" || $scope.PrePractCenter.ExamCapacity == 0) {
                alert("Enter Center Capacity greater than zero");
                return;
            }
            if ($scope.PrePractCenter.CCamerasNo == undefined || $scope.PrePractCenter.CCamerasNo == "") {
                alert("CCTV No is Compulsory");
                return;
            }
            if ($scope.PrePractCenter.ElectricityFlag == undefined) { $scope.PrePractCenter.ElectricityFlag = false; }
            if ($scope.PrePractCenter.ElectricityFlag == false) {
                alert("Electricity is Compulsory");
                return;
            }
            if ($scope.PrePractCenter.InternetFlag == undefined) { $scope.PrePractCenter.InternetFlag = false; }
            if ($scope.PrePractCenter.InternetFlag == false) {
                alert("Internet is Compulsory");
                return;
            }
            if ($scope.PrePractCenter.ComputerFlag == undefined) { $scope.PrePractCenter.ComputerFlag = false; }
            if ($scope.PrePractCenter.ComputerFlag == false) {
                alert("Computer is Compulsory");
                return;
            }
            if ($scope.PrePractCenter.PrinterFlag == undefined) { $scope.PrePractCenter.PrinterFlag = false; }
            if ($scope.PrePractCenter.PrinterFlag == false) {
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
            $scope.PrePractCenter.StudentTotalCount = 0;
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
                $scope.PrePractCenter.StudentTotalCount = parseFloat($scope.PrePractCenter.StudentTotalCount) + parseFloat($scope.CenterCollegeListZone[i].StudentCount);
                $scope.BasicCollegeist.push(obj);
                angular.element("#CollegeID").focus();
            }
            $scope.BasicCollegeist = $scope.BasicCollegeist;

            //if ($scope.PrePractCenter.CollegeID != "") {
            //    var BasicCollegeData = BasicCollegeService.GetCollegeListForPracticalCenter($scope.PrePractCenter.DistrictID, AppSettings.ExamInstID, $scope.PrePractCenter.ExamID, $scope.PrePractCenter.CollegeID);
            //    BasicCollegeData.then(function (data) {
            //        if (data.length == 0) {
            //            alert("College Code Not found");
            //            angular.element("#CollegeID").focus();
            //            $scope.PrePractCenter.CollegeID = "";
            //            return;
            //        }
            //        for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
            //            if ($scope.BasicCollegeist[i].CollegeID == data[0].CollegeID) {
            //                alert("already Linked this college code");
            //                angular.element("#ColCode").focus();
            //                $scope.PrePractCenter.ColCode = "";
            //                return;
            //            }
            //        }
            //        for (var i = 0; i < data.length; i++) {
            //            var obj = {};
            //            obj.SrNo = $scope.BasicCollegeist.length + 1;
            //            obj.CollegeID = data[i].CollegeID;
            //            obj.ColName = data[i].ColName;
            //            obj.ColCode = data[i].ColCode;
            //            obj.IsGovt = data[i].IsGovt;
            //            obj.StudentCount = data[i].StudentCount;
            //            $scope.PrePractCenter.StudentTotalCount = parseFloat($scope.PrePractCenter.StudentTotalCount) + parseFloat(data[i].StudentCount);
            //            $scope.BasicCollegeist.push(obj);
            //            angular.element("#CollegeID").focus();
            //            //$scope.PrePractCenter.CollegeID = "";
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
        $scope.PrePractCenterList = [];
        $("#PrePractCenter").ejGrid({
            dataSource: $scope.PrePractCenterList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.Search] },
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
                $scope.PrePractCenter.PrePractCntrID = sender.data.PrePractCntrID;
                $scope.PrePractCenter.ZoneID = sender.data.ZoneID;
                FillData();
                $scope.DistEnable = true;
                if ($scope.PrePractCenter.PrePractCntrID > 0) {
                    $scope.isdeletableDisable = false;
                } else {
                    $scope.isdeletableDisable = true;
                }

            }
        }
        FillListData();
        function FillListData() {
            var PrePractCenterdata = PrePractCenterService.GetPrePractCenterListForGeography(AppSettings.DistrictIDs);
            PrePractCenterdata.then(function (data) {
                $scope.PrePractCenterList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});
