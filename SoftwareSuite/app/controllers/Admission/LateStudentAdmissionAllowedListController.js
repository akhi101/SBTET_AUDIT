define(['app'], function (app) {
    app.controller("LateStudentAdmissionAllowedListController", function ($scope, $state, AppSettings, LateStudentAdmissionService) {
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
            { field: "AdmTypeDesc", headerText: "Adm. Type", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "CourseName", headerText: "Stream", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "ExmName", headerText: "Exam", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "LateAdmID", headerText: "LateAdmID", visible: true, textAlign: ej.TextAlign.Left, width: 0 }
        ];
        $scope.LateStudentAdmissionAllowedData = [];
        $("#LateStudentRegs").ejGrid({
            dataSource: $scope.LateStudentAdmissionAllowedData,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
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
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Admission.LateStudentAdmissionAllowed', { LateAdmID: sender.data.LateAdmID });
            }
        }
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
            var LateStudentdata = LateStudentAdmissionService.GetLateStudAdmListByCourseExam(0,$scope.CourseID, $scope.ExamID);
            LateStudentdata.then(function (data) {
                $scope.LateStudentAdmissionAllowedData = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});