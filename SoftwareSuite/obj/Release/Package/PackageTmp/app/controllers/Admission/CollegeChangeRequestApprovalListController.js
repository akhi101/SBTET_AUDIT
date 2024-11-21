define(['app'], function (app) {
    app.controller("CollegeChangeRequestApprovalListController", function ($scope, $state, AppSettings, CollegeChangeRequestListService) {
        $scope.CollegeChangeRequestApprovalList = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
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
            //{ headerTemplateID: "#headerTemplate", template: true, templateID: "#checkboxTemplate", textAlign: ej.TextAlign.Center, width: 50 },
            //{ field: "CheckStudent", headerText: "CheckStudent", visible: false, textAlign: ej.TextAlign.Left },
            { field: "StuRegSrNo", headerText: "S. No.", textAlign: ej.TextAlign.Right, width: 50, allowEditing: false },
            { field: "ColName", headerText: "Colllege Name", textAlign: ej.TextAlign.Right, width: 200, allowEditing: false }, 
            { field: "SSCHallTicket", headerText: "Hall Ticket No.", textAlign: ej.TextAlign.Right, width: 200, allowEditing: false },
            { field: "FormNo", headerText: "Form No.", textAlign: ej.TextAlign.Right, width: 100, allowEditing: false },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150, allowEditing: false },
            { field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 150, allowEditing: false },
            { field: "StudRegID", headerText: "StudRegID", visible: false, textAlign: ej.TextAlign.Right, width: 0 },
            { field: "CollegeChangeID", headerText: "CollegeChangeID", visible: false, textAlign: ej.TextAlign.Right, width: 0 },
        ];
        $scope.CollegeChangeRequestData = [];
        $("#CollegeChangeRequestgrid").ejGrid({
            dataSource: $scope.CollegeChangeRequestData,
            allowEditing: true,
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
            if (this.multiSelectCtrlRequest == false) {
                $state.go('AdmissionOther.CollegeChangeRequestApproval', { CollegeChangeID: sender.data.CollegeChangeID });
            }
        }
        //var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        //CourseList.then(function (Coursedata, status, headers, config, error) {
        //    $scope.CourseList = Coursedata;
        //}, function (error) {
        //    alert(error);
        //});
        //$scope.FillCoursePart = function (CourseID) {
        //    var ExamList = RegisterAdmittedStudentService.GetBasicExamList(CourseID);
        //    ExamList.then(function (BasicExamdata, status, headers, config, error) {
        //        $scope.ExamList = BasicExamdata;
        //        var BranchList = RegisterAdmittedStudentService.GetBasicBranchListForRegStud(CourseID, AppSettings.CollegeID);
        //        BranchList.then(function (BasicBranchdata, status, headers, config, error) {
        //            $scope.BranchList = BasicBranchdata;
        //        }, function (error) {
        //            alert(error);
        //        });
        //    }, function (error) {
        //        alert(error);
        //    });
        //}
        //$scope.Show = function () {
        //    if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
        //        alert("Select Stream");
        //        return;
        //    }
        //    if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
        //        alert("Select Exam");
        //        return;
        //    }
        //    var StudentRegdata = StudentRegService.FillStudentListForRecognationFeePaid(AppSettings.CollegeID, $scope.CourseID, $scope.ExamID, $scope.BranchID);
        //    StudentRegdata.then(function (data) {
        //        if (data.length == 0) {
        //            alert("Data Not Found");
        //        } else {
        //            var SrNo = 1
        //            for (var i = 0; i < data.length; i++) {
        //                data[i].StuRegSrNo = SrNo;
        //                SrNo = SrNo + 1;
        //            }
        //            $scope.CollegeChangeRequestData = data;
        //        }
        //    }, function (error) {
        //        alert(error);
        //    });
        //}
        $scope.SaveRecognationFeePaid = function () {
            if ($scope.CollegeChangeRequestData.length == 0) {
                alert("No data found should be there");
                return;
            }
            var StudentReg = [];
            for (var i = 0; i < $scope.CollegeChangeRequestData.length; i++) {
                if ($scope.CollegeChangeRequestData[i].CheckStudent == 1) {
                    var obj = {};
                    obj.CollegeChangeID = $scope.CollegeChangeRequestData[i].CollegeChangeID;
                    obj.SSCHallTicket = $scope.CollegeChangeRequestData[i].SSCHallTicket;
                    obj.ReqApprovalD = AppSettings.LoggedUserId;
                    obj.StudRegID = $scope.CollegeChangeRequestData[i].StudRegID; 
                    StudentReg.push(obj);
                }
            }
            if (StudentReg.length == 0) {
                alert("No Any Rows Selected");
                return;
            }
            var StudentRegdata = CollegeChangeRequestListService.PostApprovalCollegeChangeRequest(StudentReg);
            StudentRegdata.then(function (data) {
                alert("Request Approval Successfully");
                $scope.CollegeChangeRequestData = [];
            }, function (error) {
                alert(error);
            });
        }
        //function checkChange(e) {
        //    gridObj = $("#CollegeChangeRequestgrid").data("ejGrid");
        //    var rowCheck = $(".rowCheckbox:checked"), cp = gridObj.model.pageSettings.currentPage;
        //    if ($("#headchk").is(':checked')) {
        //        for (var k = 0; k < $scope.CollegeChangeRequestData.length; k++) {
        //            $scope.CollegeChangeRequestData[k].CheckStudent = 1;
        //            return;
        //        }
        //    } else {
        //        if (gridObj.model.selectedRecords[0] == undefined) {
        //            for (var k = 0; k < $scope.CollegeChangeRequestData.length; k++) {
        //                $scope.CollegeChangeRequestData[k].CheckStudent = 0;
        //                return;
        //            }
        //        } else {
        //            if (e.isChecked == true) {
        //                for (var k = 0; k < $scope.CollegeChangeRequestData.length; k++) {
        //                    if (gridObj.model.selectedRecords[0].CollegeChangeID == $scope.CollegeChangeRequestData[k].CollegeChangeID) {
        //                        if ((gridObj.model.selectedRecords[0].CheckStudent == 0) || (gridObj.model.selectedRecords[0].CheckStudent == undefined)) {
        //                            $scope.CollegeChangeRequestData[k].CheckStudent = 1;
        //                            return;
        //                        }
        //                    }
        //                }
        //            } else {
        //                for (var k = 0; k < $scope.CollegeChangeRequestData.length; k++) {
        //                    if (gridObj.model.selectedRecords[0].CollegeChangeID == $scope.CollegeChangeRequestData[k].CollegeChangeID) {
        //                        if (gridObj.model.selectedRecords[0].CheckStudent == 1) {
        //                            $scope.CollegeChangeRequestData[k].CheckStudent = 0;
        //                            return;
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //    }
        //}
        //function headCheckChange(e) {
        //    $("#CollegeChangeRequestgrid .rowCheckbox").ejCheckBox({ "change": checkChange });
        //    gridObj = $("#CollegeChangeRequestgrid").data("ejGrid");
        //    if ($("#headchk").is(':checked')) {
        //        $(".rowCheckbox").ejCheckBox({ "checked": true });
        //        for (var k = 0; k < $scope.CollegeChangeRequestData.length; k++) {
        //            $scope.CollegeChangeRequestData[k].CheckStudent = 1;
        //        }
        //    }
        //    else {
        //        $(".rowCheckbox").ejCheckBox({ "checked": false });
        //        for (var k = 0; k < $scope.CollegeChangeRequestData.length; k++) {
        //            $scope.CollegeChangeRequestData[k].CheckStudent = 0;
        //        }
        //    }
        //}
        //$scope.refreshTemplate = function (args) {
        //    $("#CollegeChangeRequestgrid .rowCheckbox").ejCheckBox({ "change": checkChange });
        //    $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
        //}
        //$scope.actionbegin = function (args) {
        //    if (args.requestType == "beginedit") {
        //        args.cancel = true;
        //    }
        //}
        //$scope.actioncomplete = function (args) {
        //    if (args.requestType == "beginedit" || args.requestType == "add") {
        //        $("#CollegeChangeRequestgrid").ejNumericTextbox({ showSpinButton: false, focusOut: onkeydown });
        //    }
        //    $("#headchk").ejCheckBox({ width: 100, visible: false });
        //}
        //All data shows
        var StudentRegdata = CollegeChangeRequestListService.GetCollegeChangeRequestDataForApproval(AppSettings.AcdYrID);
        StudentRegdata.then(function (data) {
            if (data.length == 0) {
                alert("Data Not Found");
            } else {
                var SrNo = 1
                for (var i = 0; i < data.length; i++) {
                    data[i].StuRegSrNo = SrNo;
                    SrNo = SrNo + 1;
                }
                $scope.CollegeChangeRequestData = data;
            }
        }, function (error) {
            alert(error);
        });
    });
});