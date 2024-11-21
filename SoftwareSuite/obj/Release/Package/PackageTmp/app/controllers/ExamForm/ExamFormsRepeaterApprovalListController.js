define(['app'], function (app) {
    app.controller("ExamFormsRepeaterApprovalListController", function ($scope, $state, AppSettings, ExamFormsRepeaterApprovalService) {
        $scope.ExamFormsRepeaterApprovalList = {};
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
            var DistrictList = ExamFormsRepeaterApprovalService.GetDistrictListByStateID(1);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        } else { $scope.ExamFormsRepeaterApprovalList.CollegeID = AppSettings.CollegeID; }
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.CourseList = [];
                $scope.ExamList = [];
                $scope.MainGroupList = [];
                $scope.CollegeList = [];
                $scope.MandalList = [];
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;
                var MandalList = ExamFormsRepeaterApprovalService.GetMandalListByDistrict(DistrictID);
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
                var CollegeList = ExamFormsRepeaterApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormsRepeaterApprovalList.DistrictID, MandalID);
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
                var CourseList = ExamFormsRepeaterApprovalService.GetCourseListForRegStud($scope.ExamFormsRepeaterApprovalList.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsRepeaterApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
            }, function (error) {
                alert(error);
            });
        }
        //var AcdYearList = ExamFormsRepeaterApprovalService.GetBasicAcademicYearListForExamForm();
        //AcdYearList.then(function (AcdYeardata, status, headers, config, error) {
        //    $scope.AcdYearList = AcdYeardata;
        //}, function (AcdYeardata, status, headers, config) {
        //    alert(error);
        //});
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.MainGroupList = [];
            //if (($scope.ExamFormsRepeaterApprovalList.AcdYrID == undefined) || ($scope.ExamFormsRepeaterApprovalList.AcdYrID == "")) {
            //    alert("Select Academic Year");
            //    return;
            //}
            if (CourseID != "") {
                var ExamList = ExamFormsRepeaterApprovalService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    var MainGroupList = ExamFormsRepeaterApprovalService.GetMainGroupListByCollegeId($scope.ExamFormsRepeaterApprovalList.CollegeID, CourseID, AppSettings.AcdYrID);
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
            //if (($scope.ExamFormsRepeaterApprovalList.AcdYrID == undefined) || ($scope.ExamFormsRepeaterApprovalList.AcdYrID == "")) {
            //    alert("Select Academic Year");
            //    return;
            //}
            if (($scope.ExamFormsRepeaterApprovalList.CourseID == undefined) || ($scope.ExamFormsRepeaterApprovalList.CourseID == "")) {
                alert("Select stream");
                return;
            }
            if (($scope.ExamFormsRepeaterApprovalList.ExamID == undefined) || ($scope.ExamFormsRepeaterApprovalList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFormsRepeaterApprovalList.MainGrpID == undefined) || ($scope.ExamFormsRepeaterApprovalList.MainGrpID == "")) {
                alert("Select Group");
                return;
            }
            var ExamFormData = ExamFormsRepeaterApprovalService.GetExamFormsRepeaterApprovalList(AppSettings.AcdYrID, $scope.ExamFormsRepeaterApprovalList.CollegeID, $scope.ExamFormsRepeaterApprovalList.CourseID, $scope.ExamFormsRepeaterApprovalList.ExamID, $scope.ExamFormsRepeaterApprovalList.MainGrpID);
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamFormsApprovalData = [];
                    return;
                } else {
                    $scope.ExamFormsRepeaterApprovalData = data;
                }
            }, function (data, status, headers, config) {
                alert(error);
            });
        }
        $scope.FormsApproval = function () {
            if ($scope.ExamFormsRepeaterApprovalData.length == 0) {
                alert("No Any data");
                return;
            }
            var ExamFormsRepeater = [];
            for (var i = 0; i < $scope.ExamFormsRepeaterApprovalData.length; i++) {
                if ($scope.ExamFormsRepeaterApprovalData[i].CheckExmFrm == 1) {
                    var obj = {};
                    obj.ExmFrmID = $scope.ExamFormsRepeaterApprovalData[i].ExmFrmID;
                    obj.SSCHallTicket = $scope.ExamFormsRepeaterApprovalData[i].SSCHallTicket;
                    ExamFormsRepeater.push(obj);
                }
            }
            if (ExamFormsRepeater.length == 0) {
                alert("No Any Rows Selected");
                return;
            }
            var ExamFormsRepeaterdata = ExamFormsRepeaterApprovalService.PostApprovalForms(ExamFormsRepeater);
            ExamFormsRepeaterdata.then(function (data) {
                alert("Approved Successfully");
                var ExamFormData = ExamFormsRepeaterApprovalService.GetExamFormsRepeaterApprovalList(AppSettings.AcdYrID, $scope.ExamFormsRepeaterApprovalList.CollegeID, $scope.ExamFormsRepeaterApprovalList.CourseID, $scope.ExamFormsRepeaterApprovalList.ExamID, $scope.ExamFormsRepeaterApprovalList.MainGrpID);
                ExamFormData.then(function (data, status, headers, config, error) {
                    $scope.ExamFormsRepeaterApprovalData = data;
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
            { field: "Formno", headerText: "Form Number", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "SSCHallTicket", headerText: "SSC Hall Ticket", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "FormFees", headerText: "Total Fee Amount", textAlign: ej.TextAlign.Right, width: 100 },
            { field: "ImprovementFlag", headerText: "Improvement", textAlign: ej.TextAlign.Left, width: 70 },
            { field: "Remark", headerText: "Remark", textAlign: ej.TextAlign.Left, width: 100 },
        ];
        $scope.ExamFormsRepeaterApprovalData = [];
        $("#ExamFormsRepeaterApprovalGrid").ejGrid({
            dataSource: $scope.ExamFormsRepeaterApprovalData,
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
            //    $state.go('ExamForm.ExamFormsRepeaterApproval', { ExmFrmID: sender.data.ExmFrmID, AcdYrID: $scope.ExamFormsRepeaterApprovalList.AcdYrID });
            //}
        }
        function checkChange(e) {
            gridObj = $("#ExamFormsRepeaterApprovalGrid").data("ejGrid");
            var rowCheck = $(".rowCheckbox:checked"), cp = gridObj.model.pageSettings.currentPage;
            if ($("#headchk").is(':checked')) {
                for (var k = 0; k < $scope.ExamFormsRepeaterApprovalData.length; k++) {
                    $scope.ExamFormsRepeaterApprovalData[k].CheckExmFrm = 1;
                    return;
                }
            } else {
                if (gridObj.model.selectedRecords[0] == undefined) {
                    for (var k = 0; k < $scope.ExamFormsRepeaterApprovalData.length; k++) {
                        $scope.ExamFormsRepeaterApprovalData[k].CheckExmFrm = 0;
                        return;
                    }
                } else {
                    if (e.isChecked == true) {
                        for (var k = 0; k < $scope.ExamFormsRepeaterApprovalData.length; k++) {
                            if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamFormsRepeaterApprovalData[k].ExmFrmID) {
                                if ((gridObj.model.selectedRecords[0].CheckExmFrm == 0) || (gridObj.model.selectedRecords[0].CheckExmFrm == undefined)) {
                                    $scope.ExamFormsRepeaterApprovalData[k].CheckExmFrm = 1;
                                    return;
                                }
                            }
                        }
                    } else {
                        for (var k = 0; k < $scope.ExamFormsRepeaterApprovalData.length; k++) {
                            if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamFormsRepeaterApprovalData[k].ExmFrmID) {
                                if (gridObj.model.selectedRecords[0].CheckExmFrm == 1) {
                                    $scope.ExamFormsRepeaterApprovalData[k].CheckExmFrm = 0;
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }
        function headCheckChange(e) {
            $("#ExamFormsRepeaterApprovalGrid .rowCheckbox").ejCheckBox({ "change": checkChange });
            gridObj = $("#ExamFormsRepeaterApprovalGrid").data("ejGrid");
            if ($("#headchk").is(':checked')) {
                $(".rowCheckbox").ejCheckBox({ "checked": true });
            }
            else {
                $(".rowCheckbox").ejCheckBox({ "checked": false });
            }
        }
        $scope.refreshTemplate = function (args) {
            $("#ExamFormsRepeaterApprovalGrid .rowCheckbox").ejCheckBox({ "change": checkChange });
            $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
        }
        $scope.actioncomplete = function (args) {
            if (args.requestType == "beginedit" || args.requestType == "add") {
                $("#ExamFormsRepeaterApprovalGrid").ejNumericTextbox({ showSpinButton: false, focusOut: onkeydown });
            }
            $("#headchk").ejCheckBox({ width: 100, visible: false });
        }
    });
});