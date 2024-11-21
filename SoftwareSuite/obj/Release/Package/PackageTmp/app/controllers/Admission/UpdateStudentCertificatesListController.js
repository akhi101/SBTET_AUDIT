define(['app'], function (app) {
    app.controller("UpdateStudentCertificatesListController", function ($scope, $state, AppSettings, StudentRegService, RegisterAdmittedStudentService) {
        $scope.UpdateStudentCertificatesList = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1] + "List";;
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
            { field: "StuRegSrNo", headerText: "S. No.", textAlign: ej.TextAlign.Right, width: 50 },
            { field: "AdmNo", headerText: "Admission No.", textAlign: ej.TextAlign.Right, width: 150 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 250 },
            { field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 250 },
            { field: "BirthDateDesc", headerText: "Birth Date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "GenderDesc", headerText: "Sex", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "SSCHallTicket", headerText: "Hall Ticket No.", textAlign: ej.TextAlign.Right, width: 120 },
            { field: "SubName", headerText: "Sec. Lang.", textAlign: ej.TextAlign.Left },
            { field: "MainGrpName", headerText: "Main Group", textAlign: ej.TextAlign.Left },
            { field: "MediumName", headerText: "Medium", textAlign: ej.TextAlign.Left },
            { field: "StudRegID", headerText: "StudRegID", visible: true, textAlign: ej.TextAlign.Left, width: 0 }
        ];
        $scope.UpdateStudentCertificatesdata = [];
        $("#UpdateStudentCertificates").ejGrid({
            dataSource: $scope.UpdateStudentCertificatesdata,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            //allowResizeToFit: true,
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
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Admission.UpdateStudentCertificates', { StudRegID: sender.data.StudRegID });
            }
        }
        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if (CourseID != "") {
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
        }
        $scope.WithCertificates = "N";
        $scope.Show = function () {
            if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.BranchID == undefined) || ($scope.BranchID == "")) {
                $scope.BranchID = 0;
              
            }
            
            var UpdateStudentCertificatesdata = StudentRegService.FillStudentRegDetailsListForUpdateCertificates(AppSettings.CollegeID, $scope.CourseID, $scope.ExamID, $scope.BranchID, $scope.WithCertificates);
            UpdateStudentCertificatesdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.UpdateStudentCertificatesdata = data;
                }
                else {
                    alert("Data Not Found");
                    $scope.UpdateStudentCertificatesdata = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }

        //All data shows
        var UpdateStudentCertificatesdata = StudentRegService.FillStudentRegDetailsListForUpdateCertificates(AppSettings.CollegeID, 0, 0, 0, $scope.WithCertificates);
        UpdateStudentCertificatesdata.then(function (data) {
            if (data.length > 0) {
                var SrNo = 1
                for (var i = 0; i < data.length; i++) {
                    data[i].StuRegSrNo = SrNo;
                    SrNo = SrNo + 1;
                }
                $scope.UpdateStudentCertificatesdata = data;
            }
            else {
                alert("Data Not Found");
                $scope.UpdateStudentCertificatesdata = [];
                return;
            }
        }, function (error) {
            alert(error);
        });

        $scope.ShowAll = function () {
            var UpdateStudentCertificatesdata = StudentRegService.FillStudentRegDetailsListForUpdateCertificates(AppSettings.CollegeID, 0, 0, 0, $scope.WithCertificates);
            UpdateStudentCertificatesdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.UpdateStudentCertificatesdata = data;
                }
                else {
                    alert("Data Not Found");
                    $scope.UpdateStudentCertificatesdata = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.ClearData = function () {
            $scope.CourseID = "";
            $scope.ExamID = "";
            $scope.BranchID = "";
        }
    });
});