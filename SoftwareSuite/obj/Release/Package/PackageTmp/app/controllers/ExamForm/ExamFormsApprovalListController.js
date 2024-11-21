define(['app'], function (app) {
    app.controller("ExamFormsApprovalListController", function ($scope, $state, AppSettings, ExamFormsApprovalService) {
        $scope.ExamFormsApprovalList = {};
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
        $scope.ExamDisable = true;
        if (AppSettings.CollegeID == 0) {
            $scope.ForBoardDisable = false;
            var DistrictList = ExamFormsApprovalService.GetDistrictListByStateID(1);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        } else { $scope.ExamFormsApprovalList.CollegeID = AppSettings.CollegeID;}
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.CourseList = [];
                $scope.ExamList = [];
                $scope.MainGroupList = [];
                $scope.CollegeList = [];
                $scope.MandalList = [];
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;
                var MandalList = ExamFormsApprovalService.GetMandalListByDistrict(DistrictID);
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
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormsApprovalList.DistrictID, MandalID);
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

                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.ExamFormsApprovalList.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            //$scope.MainGroupList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsApprovalService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamDisable = false;
                    $scope.ExamList = BasicExamdata;
                    //var MainGroupList = ExamFormsApprovalService.GetMainGroupListByCollegeId($scope.ExamFormsApprovalList.CollegeID, CourseID, AppSettings.AcdYrID);
                    //MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    //    $scope.MainGroupList = MainGroupListdata;
                    //}, function (error) {
                    //    alert(error);
                    //});
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.Show = function () {
            if (($scope.ExamFormsApprovalList.CourseID == undefined) || ($scope.ExamFormsApprovalList.CourseID == "")) {
                alert("Select stream");
                return;
            }
            if (($scope.ExamFormsApprovalList.ExamID == undefined) || ($scope.ExamFormsApprovalList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            //if ($scope.ExamFormsApprovalList.MainGrpID == undefined) { $scope.ExamFormsApprovalList.MainGrpID = 0;}
            var ExamFormData = ExamFormsApprovalService.GetExamFormsApprovalList(AppSettings.ExamInstID, $scope.ExamFormsApprovalList.CollegeID, $scope.ExamFormsApprovalList.CourseID, $scope.ExamFormsApprovalList.ExamID);//, $scope.ExamFormsApprovalList.MainGrpID
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamFormsApprovalData = [];
                    return;
                } else {
                    $scope.ExamFormsApprovalData = data;
                }
            }, function (data, status, headers, config) {
                alert(error);
            });
        }
        $scope.FormsApproval = function () {
            if ($scope.ExamFormsApprovalData.length == 0) {
                alert("No Any data");
                return;
            }
            var ExamForms = [];
            for (var i = 0; i < $scope.ExamFormsApprovalData.length; i++) {
                if ($scope.ExamFormsApprovalData[i].CheckExmFrm == 1) {
                    var obj = {};
                    obj.ExmFrmID = $scope.ExamFormsApprovalData[i].ExmFrmID;
                    obj.FormFees = $scope.ExamFormsApprovalData[i].FormFees;
                    obj.CollegeID = AppSettings.CollegeID;
                    obj.PRNNo = $scope.ExamFormsApprovalData[i].PRNNo;
                    obj.ExamInstID = AppSettings.ExamInstID;
                    obj.AcdYrID = AppSettings.AcdYrID;
                    obj.PreStudRegID = $scope.ExamFormsApprovalData[i].PreStudRegID;
                    obj.ExamID = $scope.ExamFormsApprovalList.ExamID;
                    ExamForms.push(obj);
                }
            }
            if (ExamForms.length == 0) {
                alert("No Any Rows Selected");
                return;
            }
            var ExamFormsdata = ExamFormsApprovalService.PostApprovalForms(ExamForms);
            ExamFormsdata.then(function (data) {
                alert("Approved Successfully");
                var ExamFormData = ExamFormsApprovalService.GetExamFormsApprovalList(AppSettings.AcdYrID, $scope.ExamFormsApprovalList.CollegeID, $scope.ExamFormsApprovalList.CourseID, $scope.ExamFormsApprovalList.ExamID, $scope.ExamFormsApprovalList.MainGrpID);
                ExamFormData.then(function (data, status, headers, config, error) {
                    $scope.ExamFormsApprovalData = data;
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
            { field: "PRNNo", headerText: "PRN No", textAlign: ej.TextAlign.Right, width: 90, allowEditing: false },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150, allowEditing: false },
            { field: "Fathername", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 150, allowEditing: false },
            { field: "StudCatID", headerText: "Category", textAlign: ej.TextAlign.Right, width: 60, allowEditing: false },
            { field: "RegularFees", headerText: "Regular Fee", textAlign: ej.TextAlign.Right, width: 60, allowEditing: false },
            { field: "LateFees", headerText: "Late Fee", textAlign: ej.TextAlign.Right, width: 60, allowEditing: false },
            { field: "FormFees", headerText: "Total Fee", textAlign: ej.TextAlign.Right, width: 60, allowEditing: false },
            { field: "MainGrpName", headerText: "Group", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "MediumName", headerText: "Medium", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "SubName", headerText: "Second Lang.", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "PhysDisbCode", headerText: "Ph.", textAlign: ej.TextAlign.Right, width: 30, allowEditing: false },
            { field: "CasteName", headerText: "Caste", textAlign: ej.TextAlign.Right, width: 50, allowEditing: false },
            { field: "FirstYearSubjects", headerText: "1st Yr Subjects", textAlign: ej.TextAlign.Right, width: 200, allowEditing: false },
            { field: "SecondYearSubjects", headerText: "2nd Yr Subjects", textAlign: ej.TextAlign.Right, width: 200, allowEditing: false },
            { field: "ExmFrmID", headerText: "ExmFrmID", visible: true, textAlign: ej.TextAlign.Right, width: 0 },
            { field: "ExamInstID", headerText: "ExamInstID", visible: true, textAlign: ej.TextAlign.Right, width: 0 },

            //{ field: "ImprovementFlag", headerText: "Improvement", textAlign: ej.TextAlign.Left, width: 70 },
            //{ field: "Remark", headerText: "Remark", textAlign: ej.TextAlign.Left, width: 100 },
        ];
        $scope.ExamFormsApprovalData = [];
        $("#ExamFormsApprovalGrid").ejGrid({
            dataSource: $scope.ExamFormsApprovalData,
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
            //    $state.go('ExamForm.ExamFormsApproval', { ExmFrmID: sender.data.ExmFrmID });
            //}
        }
        function checkChange(e) {
            gridObj = $("#ExamFormsApprovalGrid").data("ejGrid");
            var rowCheck = $(".rowCheckbox:checked"), cp = gridObj.model.pageSettings.currentPage;
            for (var k = 0; k < $scope.ExamFormsApprovalData.length; k++) {
                var totAmount = 0;
                var tot = 0;
                if (gridObj.model.selectedRecords[0] != undefined) {
                    if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamFormsApprovalData[k].ExmFrmID) {
                        if (e.isChecked == true) {
                            $scope.ExamFormsApprovalData[k].CheckExmFrm = 1;
                        }
                        else {
                            $scope.ExamFormsApprovalData[k].CheckExmFrm = 0;
                        }
                    }
                }
            }
            //if ($("#headchk").is(':checked')) {
            //    for (var k = 0; k < $scope.ExamFormsApprovalData.length; k++) {
            //        $scope.ExamFormsApprovalData[k].CheckExmFrm = 1;
            //        return;
            //    }
            //} else {
            //    if (gridObj.model.selectedRecords[0] == undefined) {
            //        for (var k = 0; k < $scope.ExamFormsApprovalData.length; k++) {
            //            $scope.ExamFormsApprovalData[k].CheckExmFrm = 0;
            //            return;
            //        }
            //    } else {
            //        if (e.isChecked == true) {
            //            for (var k = 0; k < $scope.ExamFormsApprovalData.length; k++) {
            //                if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamFormsApprovalData[k].ExmFrmID) {
            //                    if ((gridObj.model.selectedRecords[0].CheckExmFrm == 0) || (gridObj.model.selectedRecords[0].CheckExmFrm == undefined)) {
            //                        $scope.ExamFormsApprovalData[k].CheckExmFrm = 1;
            //                        return;
            //                    }
            //                }
            //            }
            //        } else {
            //            for (var k = 0; k < $scope.ExamFormsApprovalData.length; k++) {
            //                if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamFormsApprovalData[k].ExmFrmID) {
            //                    if (gridObj.model.selectedRecords[0].CheckExmFrm == 1) {
            //                        $scope.ExamFormsApprovalData[k].CheckExmFrm = 0;
            //                        return;
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}
        }
        function headCheckChange(e) {
            $("#ExamFormsApprovalGrid .rowCheckbox").ejCheckBox({ "change": checkChange });
            gridObj = $("#ExamFormsApprovalGrid").data("ejGrid");
            if ($("#headchk").is(':checked')) {
                $(".rowCheckbox").ejCheckBox({ "checked": true });
            }
            else {
                $(".rowCheckbox").ejCheckBox({ "checked": false });
            }
        }
        $scope.refreshTemplate = function (args) {
            $("#ExamFormsApprovalGrid .rowCheckbox").ejCheckBox({ "change": checkChange });
            $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
        }
        $scope.actioncomplete = function (args) {
            if (args.requestType == "beginedit" || args.requestType == "add") {
                $("#ExamFormsApprovalGrid").ejNumericTextbox({ showSpinButton: false, focusOut: onkeydown });
            }
            $("#headchk").ejCheckBox({ width: 100, visible: false });
        }
    });
});