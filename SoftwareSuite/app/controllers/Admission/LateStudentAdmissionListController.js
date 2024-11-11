define(['app'], function (app) {
    app.controller("LateStudentAdmissionListController", function ($scope, $state, AppSettings, LateStudentAdmissionService, RegisterAdmittedStudentService) {
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
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 200 },
            { field: "SSCHallTicket", headerText: "Hall Ticket No.", textAlign: ej.TextAlign.Right, width: 100 },
            { field: "AdmTypeDesc", headerText: "Adm Type", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "CourseName", headerText: "Stream", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "ExmName", headerText: "Exam", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "LateAdmID", headerText: "LateAdmID", visible: true, textAlign: ej.TextAlign.Left, width: 0 }
        ];
        $scope.LateStudentAdmissionData = [];
        $("#LateStudentRegs").ejGrid({
            dataSource: $scope.LateStudentAdmissionData,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
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
        // Add new Record
        function AddNew() {
            if (RightForCurrentPage[0].isaddable != 'Y') {
                alert("You Don't have Add Rights");
                return;
            } else {
                $state.go('Admission.LateStudentAdmission', { LateAdmID: 0 });
            }
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Admission.LateStudentAdmission', { LateAdmID: sender.data.LateAdmID });
            }
        }
        var BasicCollegeList = RegisterAdmittedStudentService.GetBasicCollegeList();
        BasicCollegeList.then(function (BasicCollegedata, status, headers, config, error) {
            $scope.CollegeList = BasicCollegedata;
        }, function (error) {
            alert(error);
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
            var LateStudentdata = LateStudentAdmissionService.GetLateStudAdmList($scope.CollegeID,$scope.CourseID, $scope.ExamID);
            LateStudentdata.then(function (data) {
                if (data.length == 0) {
                    alert("Data Not Found");
                    return;
                } else {
                    $scope.LateStudentAdmissionData = data;
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});