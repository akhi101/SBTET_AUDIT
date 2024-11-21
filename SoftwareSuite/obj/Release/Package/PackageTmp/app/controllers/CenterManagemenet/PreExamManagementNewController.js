define(['app'], function (app) {
    app.controller("PreExamManagementNewController", function ($scope, $state, $stateParams, AppSettings, PreExamManagementNewService, BasicDistrictsService, BasicCollegeService) {
        $scope.PreExamManagementNew = {};
        $scope.PreExamManagementNew.ExamInstID = AppSettings.ExamInstID;
        var ExamInstIDData = PreExamManagementNewService.GetCurretnExamInst(AppSettings.AcdYrID);
        ExamInstIDData.then(function (data) {
            $scope.PreExamManagementNew.ExamInstID = data;
        }, function (error) {
            alert(error);
        });
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreExamManagementNewRightsdata = [];
        $scope.CollegeDisable = false;
        $scope.DistEnable = false;

        PreExamManagementNewRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreExamManagementNewRightsdata.length; i++) {
            if (PreExamManagementNewRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreExamManagementNew.ExamMgntID == 0) {
                    if (PreExamManagementNewRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreExamManagementNewRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreExamManagementNewRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.isupdatableDisable = false;
        $scope.isdeletableDisable = true;

        $scope.PreExamManagementNew.SysUsrGrpID = 0;
        if (AppSettings.SysUsrGrpID == 7) {
            $scope.PreExamManagementNew.SysUsrGrpID = 9;
        } else if (AppSettings.SysUsrGrpID == 9) {
            $scope.PreExamManagementNew.SysUsrGrpID = 2;
        } else if (AppSettings.SysUsrGrpID == 2) {
            $scope.PreExamManagementNew.SysUsrGrpID = 11;
        } else if (AppSettings.SysUsrGrpID == 11) {
            $scope.PreExamManagementNew.SysUsrGrpID = 23;
        }


        FillData();
        function FillData() {
            var BasicDistrictList = [];  

            if (AppSettings.SysUsrGrpID != 23) {
                BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
            } else {
                BasicDistrictList = BasicDistrictsService.GetDistrictListForCOE(AppSettings.ExamInstID,1);
            }
            BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                $scope.BasicDistrictList = DistrictData;
                if (($scope.PreExamManagementNew.ExamMgntID == 0) || ($scope.PreExamManagementNew.ExamMgntID == undefined)) {
                    $scope.PreExamManagementNew.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
                }
                if (AppSettings.SysUsrGrpID == 23) { $scope.FillListDataNew($scope.PreExamManagementNew.DistrictID); }
                if ($scope.PreExamManagementNew.ExamMgntID > 0) {
                    $scope.CollegeDisable = true;
                    var ExamMgntID = $scope.PreExamManagementNew.ExamMgntID;
                    var PreExamManagementNewdata = PreExamManagementNewService.GetPreExamManagementNewListByID(ExamMgntID);
                    PreExamManagementNewdata.then(function (data) {
                        $scope.PreExamManagementNew = data[0];
                        $scope.PreExamManagementNew.ExamInstID = $scope.PreExamManagementNew.ExamInstID;
                        $scope.PreExamManagementNew.DistrictID = "" + data[0].DistrictID + "";
                        $scope.BasicCollegeist = data[0].PreExamManagementCollege;
                    }, function (error) {
                        alert(error);
                    });
                }
            }, function (DistrictData, status, headers, config) {
                alert(error);
            });
        }
        $scope.SavePreExamManagementNew = function () {
            $scope.isupdatableDisable = true;
            if ($scope.PreExamManagementNew.ExamMgntID == undefined) { $scope.PreExamManagementNew.ExamMgntID = 0; }
            if (CheckValidation() == true) {
                $scope.PreExamManagementNew.PreExamManagementCollege = $scope.BasicCollegeist;
                if ($scope.PreExamManagementNew.ExamMgntID == 0) {
                    $scope.PreExamManagementNew.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PreExamManagementNew.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.PreExamManagementNew.SysUsrGrpID = 0;
                    if (AppSettings.SysUsrGrpID == 7) {
                        $scope.PreExamManagementNew.SysUsrGrpID = 9;
                    } else if (AppSettings.SysUsrGrpID == 9) {
                        $scope.PreExamManagementNew.SysUsrGrpID = 2;
                    } else if (AppSettings.SysUsrGrpID == 2) {
                        $scope.PreExamManagementNew.SysUsrGrpID = 11;
                    } else if (AppSettings.SysUsrGrpID == 11) {
                        $scope.PreExamManagementNew.SysUsrGrpID = 23;
                    }

                    var getPromise = PreExamManagementNewService.AddPreExamManagementNew($scope.PreExamManagementNew);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        //alert(error);

                       
                        if (error == '[{"Id":"","Message":"Already approved or forwared by higher authority, you cant edit"}]') {
                            alert("Already forwarded you can't edit");
                        }
                        else { alert(error); }
                        //if (error == '[{"Id":"ExamMngtCode","Message":"Exam Management Code Already Present"},{"Id":"ExamMngtName","Message":"Exam Management Name Already Present"}]')
                        //{
                        //    alert("Exam Management Code and Exam Management Name Already Present");
                        //    break;
                        //}
                        //if (error == '[{"Id":"ExamMngtCode","Message":"Exam Management Code Already Present"}]') {
                        //    alert("Exam Management Code Already Present");
                        //    break;
                        //}
                        //if (error == '[{"Id":"ExamMngtName","Message":"Exam Management Name Already Present"}]') {
                        //    alert("Exam Management Name Already Present");
                        //    break;
                        //}                        

                        //if (error == '[{"Id":"","Message":"Already approved or forwared by higher authority, you cant edit"}]') {
                        //    alert("Aadhaar No is Duplicate");
                        //}

                    });
                }
                else {
                    $scope.PreExamManagementNew.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.PreExamManagementNew.SysUsrGrpID = 0;
                    if (AppSettings.SysUsrGrpID == 7) {
                        $scope.PreExamManagementNew.SysUsrGrpID = 9;
                    } else if (AppSettings.SysUsrGrpID == 9) {
                        $scope.PreExamManagementNew.SysUsrGrpID = 2;
                    } else if (AppSettings.SysUsrGrpID == 2) {
                        $scope.PreExamManagementNew.SysUsrGrpID = 11;
                    } else if (AppSettings.SysUsrGrpID == 11) {
                        $scope.PreExamManagementNew.SysUsrGrpID = 23;
                    }

                    var getPromise = PreExamManagementNewService.UpdatePreExamManagementNew($scope.PreExamManagementNew);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;

                 
                        //alert(error);
                         
                        if (error == '[{"Id":"","Message":"Already approved or forwared by higher authority, you cant edit"}]') {
                            alert("Already forwarded you can't edit");
                        }
                        else { alert(errstring); }

                        
                        //if (error == '[{"Id":"ExamMngtCode","Message":"Exam Management Code Already Present"},{"Id":"ExamMngtName","Message":"Exam Management Name Already Present"}]') {
                        //    alert("Exam Management Code and Exam Management Name Already Present");
                        //    break;
                        //}
                        //if (error == '[{"Id":"ExamMngtCode","Message":"Exam Management Code Already Present"}]') {
                        //    alert("Exam Management Code Already Present");
                        //    break;
                        //}
                        //if (error == '[{"Id":"ExamMngtName","Message":"Exam Management Name Already Present"}]') {
                        //    alert("Exam Management Name Already Present");
                        //    break;
                        //}

                        //if (error == '[{"Id":"","Message":"Already approved or forwared by higher authority, you cant edit"}]') {
                        //    alert("Already forwarded you can't edit");
                        //    break;
                        //}

                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeletePreExamManagementNew = function () {
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                //int ExamMgntID, int UpdLoginID,int ExamInstID
                $scope.PreExamManagementNew.UpdLoginID = AppSettings.LoggedUserId
                $scope.PreExamManagementNew.ExamInstID = AppSettings.ExamInstID

                $scope.PreExamManagementNew.SysUsrGrpID = 0;
                if (AppSettings.SysUsrGrpID == 7) {
                    $scope.PreExamManagementNew.SysUsrGrpID = 9;
                } else if (AppSettings.SysUsrGrpID == 9) {
                    $scope.PreExamManagementNew.SysUsrGrpID = 2;
                } else if (AppSettings.SysUsrGrpID == 2) {
                    $scope.PreExamManagementNew.SysUsrGrpID = 11;
                } else if (AppSettings.SysUsrGrpID == 11) {
                    $scope.PreExamManagementNew.SysUsrGrpID = 23;
                }

                // var getData = PreExamManagementNewService.DeletePreExamManagementNew($scope.PreExamManagementNew.ExamMgntID, AppSettings.LoggedUserId, AppSettings.ExamInstID);
                var getData = PreExamManagementNewService.DeletePreExamManagementNew($scope.PreExamManagementNew);

                getData.then(function (msg) {
                    alert('Record Deleted');
                    $scope.isdeletableDisable = true;
                    RedirectToListPage();
                }, function (error) {
                    $scope.isdeletableDisable = false;
                    //alert(error);
                    
                    if (error == '[{"Id":"","Message":"Already approved or forwared by higher authority, you cant edit"}]') {
                        alert("Already forwarded you can't edit");
                    }
                    else { alert(errstring); }
                });
            }
        }
        function CheckValidation() {
            if (($scope.PreExamManagementNew.DistrictID == undefined) || ($scope.PreExamManagementNew.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PreExamManagementNew.ExamMngtName == undefined) || ($scope.PreExamManagementNew.ExamMngtName == "")) {
                alert("Enter Management Name");
                return false;
            }
            if (($scope.PreExamManagementNew.ExamMngtCode == undefined) || ($scope.PreExamManagementNew.ExamMngtCode == "")) {
                alert("Enter Management Code");
                return false;
            }
            if ($scope.IsDelete != true) {
                if ($scope.BasicCollegeist.length == 0) {
                    alert("Enter College to Alloted ");
                    return false;
                }
            }
            return true;
        }
        var gridColumns = [
            { field: "SrNo", headerText: " Sr No ", textAlign: ej.TextAlign.Left, isPrimaryKey: true, width: 20 },
            { field: "ColCode", headerText: "College Code", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "ColName", headerText: "College Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "CollegeCategory", headerText: "Col Type", textAlign: ej.TextAlign.Left, width: 40 }
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
                for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                    $scope.BasicCollegeist[i].SrNo = i + 1;
                }
                var gridObj = $("#BasicCollege").ejGrid("instance");
                gridObj.refreshContent();
            }
        }

        $scope.Exit = function () {
            //RedirectToListPage();
            $state.go('CenterManagemnet');
            //$scope.DistEnable = false;
            $scope.isdeletableDisable = true;
        }
        $scope.ResetData = function () {
            $scope.PreExamManagementNew = {};
            $scope.PreExamManagementNew.ExamInstID = AppSettings.ExamInstID;
            var ExamInstIDData = PreExamManagementNewService.GetCurretnExamInst(AppSettings.AcdYrID);
            ExamInstIDData.then(function (data) {
                $scope.PreExamManagementNew.ExamInstID = data;
            }, function (error) {
                alert(error);
            });
            var PageNm = $state.current.name.split(".")[1] + "List";
            var PreExamManagementNewRightsdata = [];

            $scope.CollegeDisable = false;
            $scope.DistEnable = false;
            $scope.BasicCollegeist = [];
            $scope.isdeletableDisable = true;
            $scope.IsDelete = false;

        }
        function RedirectToListPage() {
            $scope.PreExamManagementNew = {};
            $scope.BasicCollegeist = {};
            $scope.isupdatableDisable = false;
            $scope.DistEnable = false;
            $scope.IsDelete = false;
            FillListData();
            $state.go('CenterManagemnet.PreExamManagementNew');

            //$state.go('CenterManagemnet/PreExamManagementNew');
            //$scope.DistEnable = true;

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
            if (($scope.PreExamManagementNew.DistrictID == undefined) || ($scope.PreExamManagementNew.DistrictID == 0)) {
                alert("First Select District");
                return;
            }
            if ($scope.PreExamManagementNew.ColCode == undefined) {
                $scope.PreExamManagementNew.ColCode = "";
            }
            if ($scope.PreExamManagementNew.ColCode != "") {
                //var BasicCollegeData = BasicCollegeService.GetCollegeListByColCode($scope.PreExamManagementNew.DistrictID, AppSettings.ExamInstID, $scope.PreExamManagementNew.ColCode);
                var BasicCollegeData = BasicCollegeService.GetCollegeListByColCodeForSameMngt($scope.PreExamManagementNew.DistrictID, AppSettings.ExamInstID, $scope.PreExamManagementNew.ColCode);
                BasicCollegeData.then(function (data) {
                    if (data.length == 0) {
                        alert("College Code Not found");
                        angular.element("#ColCode").focus();
                        $scope.PreExamManagementNew.ColCode = "";
                        return;
                    }
                    for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                        if ($scope.BasicCollegeist[i].CollegeID == data[0].CollegeID) {
                            alert("already Selected this college code");
                            angular.element("#ColCode").focus();
                            $scope.PreExamManagementNew.ColCode = "";
                            return;
                        }
                    }

                    var obj = {};
                    obj.SrNo = data[0].SrNo;
                    obj.CollegeID = data[0].CollegeID;
                    obj.ColName = data[0].ColName;
                    obj.ColCode = data[0].ColCode;
                    obj.IsGovt = data[0].IsGovt;
                    //obj.CollegeCategory = data[0].IsGovt;
                    obj.CollegeCategory = $scope.PreExamManagementNew.ExamMngtCode;

                    var GetCollegeData = PreExamManagementNewService.GetCollegePresent(obj.CollegeID, AppSettings.ExamInstID);
                    GetCollegeData.then(function (coldata) {
                        if (coldata.length == 0) {
                            $scope.BasicCollegeist.push(obj);
                            angular.element("#ColCode").focus();
                            $scope.PreExamManagementNew.ColCode = "";
                            for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                                $scope.BasicCollegeist[i].SrNo = i + 1;
                            }
                            return;
                        }
                        if (coldata[0].CollegeID != 0) {
                            $scope.PreExamManagementNew.ColCode = "";
                            alert("College already present");
                            return;
                        }
                        else {

                            $scope.BasicCollegeist.push(obj);
                            angular.element("#ColCode").focus();
                            $scope.PreExamManagementNew.ColCode = "";
                            for (var i = 0; i < $scope.BasicCollegeist.length; i++) {
                                $scope.BasicCollegeist[i].SrNo = i + 1;
                            }
                        }
                    }, function (error) {
                        alert(error);
                    });



                }, function (error) {
                    alert(error);
                });
            }
        }
        var gridColumns = [
            { field: "SrNo", headerText: "Sr.No.", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "DistName", headerText: "District", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "ExamMngtName", headerText: "Management", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "ExamMngtCode", headerText: "Management Code", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "CollegeCount", headerText: "College Count", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "ExamMgntID", headerText: "ExamMgntID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.PreExamManagementNewList = [];
        $("#PreExamManagementNew").ejGrid({
            dataSource: $scope.PreExamManagementNewList,
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
                $scope.PreExamManagementNew.ExamMgntID = sender.data.ExamMgntID;
                FillData();
                $scope.DistEnable = true;
                $scope.isdeletableDisable = false;
            }
        }
        FillListData();
        function FillListData() {
            var PreExamManagementNewdata = PreExamManagementNewService.GetPreExamManagementNewList(AppSettings.DistrictIDs, AppSettings.ExamInstID);
            PreExamManagementNewdata.then(function (data) {
                $scope.PreExamManagementNewList = data;
                for (var i = 0; i < $scope.PreExamManagementNewList.length; i++) {
                    $scope.PreExamManagementNewList[i].SrNo = i + 1;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillListDataNew = function (DistrictID) {
            var PreExamManagementNewdata = PreExamManagementNewService.GetPreExamManagementNewList(DistrictID, AppSettings.ExamInstID);
            PreExamManagementNewdata.then(function (data) {
                $scope.PreExamManagementNewList = data;
                for (var i = 0; i < $scope.PreExamManagementNewList.length; i++) {
                    $scope.PreExamManagementNewList[i].SrNo = i + 1;
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});
