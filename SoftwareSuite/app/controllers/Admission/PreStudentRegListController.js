define(['app'], function (app) {
    app.controller("PreStudentRegListController", function ($scope, $state, AppSettings, PreStudentRegService, PreRegisterAdmittedStudentService) {
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
        var gridColumns = [
            { field: "StuRegSrNo", headerText: "S.No.", textAlign: ej.TextAlign.Right },
            { field: "AdmNo", headerText: "Admission No.", textAlign: ej.TextAlign.Right },
            { field: "PRNNo", headerText: "PRN No.", textAlign: ej.TextAlign.Right },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left },
            { field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left },
            { field: "BirthDateDesc", headerText: "Birth Date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Left },
            { field: "GenderDesc", headerText: "Sex", textAlign: ej.TextAlign.Left },
            { field: "SSCHallTicket", headerText: "Hall Ticket No.", textAlign: ej.TextAlign.Right },
            { field: "SubName", headerText: "Sec. Lang.", textAlign: ej.TextAlign.Left },
            { field: "MainGrpName", headerText: "Main Group", textAlign: ej.TextAlign.Left },
            { field: "MediumName", headerText: "Medium", textAlign: ej.TextAlign.Left },      
            { field: "PreStudRegID", headerText: "PreStudRegID", visible: false, textAlign: ej.TextAlign.Left, width: 0 }
        ];
        $scope.PreStudentRegdata = [];
        $("#PreStudentRegs").ejGrid({
            dataSource: $scope.PreStudentRegdata,
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
        // Add new Record
        function AddNew() {
            //if (RightForCurrentPage[0].RollAdd != 'Y') {
            //     alert("You Don't have Add Rights");
            //    return;
            // } else {
            $state.go('Admission.PreStudRegID', { PreStudRegID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Admission.PreStudentReg', { PreStudRegID: sender.data.PreStudRegID });
            }
        }
        var CourseList = PreRegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = PreRegisterAdmittedStudentService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                var BranchList = PreRegisterAdmittedStudentService.GetBasicBranchListForRegStud(CourseID, AppSettings.CollegeID);
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
            var PreStudentRegdata = PreStudentRegService.FillPreStudentRegDetailsList(AppSettings.CollegeID, $scope.CourseID, $scope.ExamID, $scope.BranchID, AppSettings.AcdYrID);
            PreStudentRegdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.PreStudentRegdata = data;
                }
                else {
                    alert("Data Not Found");
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }

        //All data shows
        var PreStudentRegdata = PreStudentRegService.FillPreStudentRegDetailsList(AppSettings.CollegeID, 0, 0, 0, AppSettings.AcdYrID);
        PreStudentRegdata.then(function (data) {
            if (data.length > 0) {
                var SrNo = 1
                for (var i = 0; i < data.length; i++) {
                    data[i].StuRegSrNo = SrNo;
                    SrNo = SrNo + 1;
                }
                $scope.PreStudentRegdata = data;
            }
            else {
                alert("Data Not Found");
                return;
            }
        }, function (error) {
            alert(error);
            });

        $scope.ShowAll = function () {
            var PreStudentRegdata = PreStudentRegService.FillPreStudentRegDetailsList(AppSettings.CollegeID, 0, 0, 0, AppSettings.AcdYrID);
            PreStudentRegdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.PreStudentRegdata = data;
                }
                else {
                    alert("Data Not Found");
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});