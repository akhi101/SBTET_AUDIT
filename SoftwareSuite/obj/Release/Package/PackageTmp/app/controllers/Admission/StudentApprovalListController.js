define(['app'], function (app) {
    app.controller("StudentApprovalListController", function ($scope, $state, AppSettings, StudentRegService,RegisterAdmittedStudentService) {
        $scope.StudentApprovalList = { };
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                if (UsersRightsdata[i].isupdatable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        var gridColumns = [
            { headerTemplateID: "#headerTemplate", template: true, templateID: "#checkboxTemplate", textAlign: ej.TextAlign.Center, width: 50 }, 
            { field: "CheckStudent", headerText: "CheckStudent", visible: false, textAlign: ej.TextAlign.Left },
            { field: "StuRegSrNo", headerText: "S. No.", textAlign: ej.TextAlign.Right},
            { field: "AdmNo", headerText: "Admission No.", textAlign: ej.TextAlign.Right },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left },
            { field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left },
            { field: "BirthDateDesc", headerText: "Birth Date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Left},
            { field: "GenderDesc", headerText: "Sex", textAlign: ej.TextAlign.Left},
            { field: "SSCHallTicket", headerText: "Hall Ticket No.", textAlign: ej.TextAlign.Right },
            { field: "MediumName", headerText: "Medium", textAlign: ej.TextAlign.Left },
            { field: "StudRegID", headerText: "StudRegID", visible: false, textAlign: ej.TextAlign.Left, width: 0 }
        ];
        $scope.StudentApprovalData = [];
        //if (AppSettings.StudentApprovalData.length == 0) {
        //    $scope.StudentApprovalData = [];
        //} else {
        //    $scope.StudentApprovalData = AppSettings.StudentApprovalData;
        //}
        $("#StudentRegs").ejGrid({
            dataSource: $scope.StudentApprovalData,
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
        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = RegisterAdmittedStudentService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                var BranchList = RegisterAdmittedStudentService.GetBasicBranchListForRegStud(CourseID, AppSettings.CollegeID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        $scope.Show = function () {
            if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            var StudentRegdata = StudentRegService.FillStudentRegDetailsListForApproval(AppSettings.CollegeID, $scope.CourseID, $scope.ExamID, $scope.BranchID);
            StudentRegdata.then(function (data) {
                if (data.length == 0) {
                    alert("Data Not Found");
                } else {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.StudentApprovalData = data;
                    AppSettings.StudentApprovalData = $scope.StudentApprovalData;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.StudentReg = [];
        $scope.StudentApproval = function () {
            if ($scope.StudentApprovalData.length == 0) {
                alert("No Any data");
                return;
            }
            var StudentReg = [];
            for (var i = 0; i < $scope.StudentApprovalData.length; i++) {
                if ($scope.StudentApprovalData[i].CheckStudent == 1) {
                    var obj = {};
                    obj.StudRegID = $scope.StudentApprovalData[i].StudRegID;
                    obj.UpdLoginID = AppSettings.LoggedUserId;
                    StudentReg.push(obj);
                }
            }
            if (StudentReg.length == 0)
            {
                alert("No Any Rows Selected");
                return;
            }
            var StudentRegdata = StudentRegService.PostupdateEligible(StudentReg);
            StudentRegdata.then(function (data) {
                alert("Approval Successfully");
                var StudentRegdata = StudentRegService.FillStudentRegDetailsListForApproval(AppSettings.CollegeID, $scope.CourseID, $scope.ExamID, $scope.BranchID);
                StudentRegdata.then(function (data) {
                    if (data.length == 0) {
                        $state.go('Admission');
                    } else {
                        var SrNo = 1
                        for (var i = 0; i < data.length; i++) {
                            data[i].StuRegSrNo = SrNo;
                            SrNo = SrNo + 1;
                        }
                        $scope.StudentApprovalData = data;
                        AppSettings.StudentApprovalData = $scope.StudentApprovalData;
                    }
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        function checkChange(e) {
            gridObj = $("#StudentRegs").data("ejGrid");
            var rowCheck = $(".rowCheckbox:checked"), cp = gridObj.model.pageSettings.currentPage;
            if ($("#headchk").is(':checked')) {
                for (var k = 0; k < $scope.StudentApprovalData.length; k++) {
                    $scope.StudentApprovalData[k].CheckStudent = 1;
                }
            } else {
                if (gridObj.model.selectedRecords[0] == undefined) {
                    for (var k = 0; k < $scope.StudentApprovalData.length; k++) {
                        $scope.StudentApprovalData[k].CheckStudent = 0;
                    }
                } else {
                    if (e.isChecked == true) {
                        for (var k = 0; k < $scope.StudentApprovalData.length; k++) {
                            if (gridObj.model.selectedRecords[0].StudRegID == $scope.StudentApprovalData[k].StudRegID) {
                                $scope.StudentApprovalData[k].CheckStudent = 1;
                                return;
                            }
                        }
                    } else {
                        for (var k = 0; k < $scope.StudentApprovalData.length; k++) {
                            if (gridObj.model.selectedRecords[0].StudRegID == $scope.StudentApprovalData[k].StudRegID) {
                                $scope.StudentApprovalData[k].CheckStudent = 0;
                                return;
                            }
                        }
                    }
                }
            }
        }
        function headCheckChange(e) {
            $("#StudentRegs .rowCheckbox").ejCheckBox({ "change": checkChange });
            gridObj = $("#StudentRegs").data("ejGrid");
            if ($("#headchk").is(':checked')) {
                $(".rowCheckbox").ejCheckBox({ "checked": true });
            }
            else {
                $(".rowCheckbox").ejCheckBox({ "checked": false });
            }
        }
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Admission.StudentApproval', { StudRegID: sender.data.StudRegID });
            }
        }
        //$scope.dataBound = function (args) {
        //    $("#StudentRegs .rowCheckbox").ejCheckBox({ "change": checkChange });
        //    $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
        //}
        $scope.refreshTemplate = function (args) {
            $("#StudentRegs .rowCheckbox").ejCheckBox({ "change": checkChange });
            $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
        }
        //$scope.actionbegin = function (args) {
        //    if (args.requestType == "paging") {
        //        if (this.selectedRowsIndexes.length > 0) {
        //            if (this.model.indexes == undefined) {
        //                return;
        //            }
        //            this.model.indexes[args.previousPage] = this.selectedRowsIndexes.slice(0, 4);
        //        } else {
        //            if (this.model.indexes == undefined) {
        //                return;
        //            }
        //        }
        //    }
        //}
        $scope.actioncomplete = function (args) {
            $("#headchk").ejCheckBox({ width: 100, visible: false });
        }
    });
});