define(['app'], function (app) {
    app.controller("ExamFormsCancelListController", function ($scope, $state, AppSettings, ExamFormsCancelService) {
        $scope.ExamFormsCancelList = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
        $scope.ForBoardDisable = true;
        if (AppSettings.CollegeID == 0) {
            $scope.ForBoardDisable = false;
            var DistrictList = ExamFormsCancelService.GetDistrictListByStateID(1);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        } else { $scope.ExamFormsCancelList.CollegeID = AppSettings.CollegeID; }
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.CourseList = [];
                $scope.ExamList = [];
                $scope.MainGroupList = [];
                $scope.CollegeList = [];
                $scope.MandalList = [];
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;
                var MandalList = ExamFormsCancelService.GetMandalListByDistrict(DistrictID);
                MandalList.then(function (MandalListdata, status, headers, config, error) {
                    $scope.MandalList = MandalListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollege = function (MandalID) {
            if ((MandalID > 0) || (MandalID != undefined)) {
                $scope.CourseList = [];
                $scope.ExamList = [];
                $scope.MainGroupList = [];
                $scope.CollegeList = [];
                var CollegeList = ExamFormsCancelService.GetCollegeListByDistrictAndMandal($scope.ExamFormsCancelList.DistrictID, MandalID);
                CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    if (CollegeListdata.length == 0) {
                        $scope.CollegeList = [];
                        alert("There is no college in this mandal");
                        return;
                    } else {
                        $scope.CollegeList = CollegeListdata;
                        $scope.GovtColEnroll.CollegeID = "";
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollData = function (CollegeID) {
            if (CollegeID != null) {
                $scope.CourseList = [];
                $scope.ExamList = [];
                $scope.MainGroupList = [];

                var CourseList = ExamFormsCancelService.GetCourseListForRegStud($scope.ExamFormsCancelList.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsCancelService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.MainGroupList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsCancelService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    var MainGroupList = ExamFormsCancelService.GetMainGroupListByCollegeId($scope.ExamFormsCancelList.CollegeID, CourseID, AppSettings.AcdYrID);
                    MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                        $scope.MainGroupList = MainGroupListdata;
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.Show = function () {
            if (($scope.ExamFormsCancelList.CourseID == undefined) || ($scope.ExamFormsCancelList.CourseID == "")) {
                alert("Select stream");
                return;
            }
            if (($scope.ExamFormsCancelList.ExamID == undefined) || ($scope.ExamFormsCancelList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            //if (($scope.ExamFormsCancelList.MainGrpID == undefined) || ($scope.ExamFormsCancelList.MainGrpID == "")) {
            //    alert("Select Group");
            //    return;
            //}
            if ($scope.ExamFormsCancelList.MainGrpID == undefined) { $scope.ExamFormsCancelList.MainGrpID = 0; }
            var ExamFormData = ExamFormsCancelService.GetExamFormsCancelList(AppSettings.ExamInstID, $scope.ExamFormsCancelList.CollegeID, $scope.ExamFormsCancelList.CourseID, $scope.ExamFormsCancelList.ExamID, $scope.ExamFormsCancelList.MainGrpID);
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamFormsCancelData = [];
                    return;
                } else {
                    $scope.ExamFormsCancelData = data;
                }
            }, function (data, status, headers, config) {
                alert(error);
            });
        }
        $scope.FormsCancel = function () {
            if ($scope.ExamFormsCancelData.length == 0) {
                alert("No Any data");
                return;
            }
            var ExamForms = [];
            for (var i = 0; i < $scope.ExamFormsCancelData.length; i++) {
                if ($scope.ExamFormsCancelData[i].CheckExmFrm == 1) {
                    var obj = {};
                    obj.ExmFrmID = $scope.ExamFormsCancelData[i].ExmFrmID;
                    obj.PreStudRegID = $scope.ExamFormsCancelData[i].PreStudRegID;
                    ExamForms.push(obj);
                }
            }
            if (ExamForms.length == 0) {
                alert("No Any Rows Selected");
                return;
            }
            var ExamFormsdata = ExamFormsCancelService.PostCancelForms(ExamForms);
            ExamFormsdata.then(function (data) {
                alert("Exam Forms Cancel Successfully");
                var ExamFormData = ExamFormsCancelService.GetExamFormsCancelList(AppSettings.AcdYrID, $scope.ExamFormsCancelList.CollegeID, $scope.ExamFormsCancelList.CourseID, $scope.ExamFormsCancelList.ExamID, $scope.ExamFormsCancelList.MainGrpID);
                ExamFormData.then(function (data, status, headers, config, error) {
                    $scope.ExamFormsCancelData = data;
                }, function (data, status, headers, config) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        var gridColumns = [
            { headerTemplateID: "#headerTemplate", template: true, templateID: "#checkboxTemplate", textAlign: ej.TextAlign.Center, width: 50 },
            { field: "CheckExmFrm", headerText: "CheckExmFrm", visible: false, textAlign: ej.TextAlign.Left },
            { field: "ExmFrmID", headerText: "ExmFrmID", textAlign: ej.TextAlign.Right, visible: false },
            { field: "PreStudRegID", headerText: "PreStudRegID", textAlign: ej.TextAlign.Right, visible: false },
            { field: "Formno", headerText: "Form Number", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "PRNNo", headerText: "PRN No", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "MainGrpName", headerText: "Group", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "MediumName", headerText: "Medium", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "SubName", headerText: "Second Lang.", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "FormFees", headerText: "Total Fee Amount", textAlign: ej.TextAlign.Right, width: 100 },
            { field: "ImprovementFlag", headerText: "Improvement", textAlign: ej.TextAlign.Left, width: 70 },
            //{ field: "Approval", headerText: "Approval", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "Remark", headerText: "Remark", textAlign: ej.TextAlign.Left, width: 100 },
        ];
        $scope.ExamFormsCancelData = [];
        $("#ExamFormsCancelListGrid").ejGrid({
            dataSource: $scope.ExamFormsCancelData,
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
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            //if (this.multiSelectCtrlRequest == false) {
            //    $state.go('ExamForm.ExamFormsCancelList', { ExmFrmID: sender.data.ExmFrmID });
            //}
        }
        $scope.refreshTemplate = function (args) {
            $("#ExamFormsCancelListGrid .rowCheckbox").ejCheckBox({ "change": checkChange });
            $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
        }
        $scope.actioncomplete = function (args) {
            if (args.requestType == "beginedit" || args.requestType == "add") {
                $("#ExamFormsCancelListGrid").ejNumericTextbox({ showSpinButton: false, focusOut: onkeydown });
            }
            $("#headchk").ejCheckBox({ width: 100, visible: false });
        }
        function checkChange(e) {
            gridObj = $("#ExamFormsCancelListGrid").data("ejGrid");
            var rowCheck = $(".rowCheckbox:checked"), cp = gridObj.model.pageSettings.currentPage;
            for (var k = 0; k < $scope.ExamFormsCancelData.length; k++) {
                var totAmount = 0;
                var tot = 0;
                if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamFormsCancelData[k].ExmFrmID) {
                    var tot = 0;
                    var totAmount = 0;
                    if (e.isChecked == true) {
                        $scope.ExamFormsCancelData[k].CheckExmFrm = 1;
                    }
                    else {
                        $scope.ExamFormsCancelData[k].CheckExmFrm = 0;
                    }
                }
            }
            //if ($("#headchk").is(':checked')) {
            //    for (var k = 0; k < $scope.ExamFormsCancelData.length; k++) {
            //        $scope.ExamFormsCancelData[k].CheckExmFrm = 1;
            //        return;
            //    }
            //} else {
            //    if (gridObj.model.selectedRecords[0] == undefined) {
            //        for (var k = 0; k < $scope.ExamFormsCancelData.length; k++) {
            //            $scope.ExamFormsCancelData[k].CheckExmFrm = 0;
            //            return;
            //        }
            //    } else {
            //        if (e.isChecked == true) {
            //            for (var k = 0; k < $scope.ExamFormsCancelData.length; k++) {
            //                if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamFormsCancelData[k].ExmFrmID) {
            //                    if ((gridObj.model.selectedRecords[0].CheckExmFrm == 0) || (gridObj.model.selectedRecords[0].CheckExmFrm == undefined)) {
            //                        $scope.ExamFormsCancelData[k].CheckExmFrm = 1;
            //                        return;
            //                    }
            //                }
            //            }
            //        } else {
            //            for (var k = 0; k < $scope.ExamFormsCancelData.length; k++) {
            //                if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamFormsCancelData[k].ExmFrmID) {
            //                    if (gridObj.model.selectedRecords[0].CheckExmFrm == 1) {
            //                        $scope.ExamFormsCancelData[k].CheckExmFrm = 0;
            //                        return;
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}
        }
        function headCheckChange(e) {
            $("#ExamFormsCancelListGrid .rowCheckbox").ejCheckBox({ "change": checkChange });
            gridObj = $("#ExamFormsCancelListGrid").data("ejGrid");
            if ($("#headchk").is(':checked')) {
                $(".rowCheckbox").ejCheckBox({ "checked": true });
            }
            else {
                $(".rowCheckbox").ejCheckBox({ "checked": false });
            }
        }
    });
});