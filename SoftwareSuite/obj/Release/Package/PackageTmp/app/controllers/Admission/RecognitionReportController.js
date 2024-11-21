define(['app'], function (app) {
    app.controller("RecognitionReportController", function ($scope, $state, AppSettings, PreStudentRegService, RegisterAdmittedStudentService) {
        $scope.RecognitionReport = { };
        //$scope.CompanyName = AppSettings.CompanyName;
        //$scope.LoginYear = AppSettings.SelectedYear;
        //var PageNm = $state.current.name.split(".")[1];
        //var RightForCurrentPage = [];
        //var UsersRightsdata = [];
        //UsersRightsdata = AppSettings.UserRights;
        //for (var i = 0; i < UsersRightsdata.length; i++) {
        //    if (UsersRightsdata[i].GridFormToOpen == PageNm) {
        //        var obj = {};
        //        obj.isaddable = UsersRightsdata[i].isaddable;
        //        RightForCurrentPage.push(obj);
        //    }
        //}
        $scope.RecognitionReport.ReportType = 'N';
        var gridColumns = [
            { field: "StuRegSrNo", headerText: "S No", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "CourseName", headerText: "Stream", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "BranchName", headerText: "Branch", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "AdmNo", headerText: "Admission No", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 250 },
            { field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 250 },
            { field: "BirthDateDesc", headerText: "DOB", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "GenderDesc", headerText: "Sex", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "SSCHallTicket", headerText: "SSCDetails", textAlign: ej.TextAlign.Left, width: 120 },
            { field: "CommName", headerText: "Community", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "SubName", headerText: "Second Lang.", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "StudRegID", headerText: "StudRegID", visible: true, textAlign: ej.TextAlign.Left, width: 0 }
        ];
        $scope.RecognitionReportData = [];
        $("#StudentRegsRpt").ejGrid({
            dataSource: $scope.RecognitionReportData,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
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
            var BranchList = RegisterAdmittedStudentService.GetBasicBranchListForRegStud(CourseID, AppSettings.CollegeID);
            BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                $scope.BranchList = BasicBranchdata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.Show = function () {
            if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.BranchID == undefined) || ($scope.BranchID == "")) {
                alert("Select Branch");
                return;
            }
            if (($scope.RecognitionReport.ReportType == undefined) || ($scope.RecognitionReport.ReportType == "")) {
                alert("Select Report Type");
                return;
            }
            var StudentRegdata = PreStudentRegService.FillStudRegListForRecogFeeRpt(AppSettings.CollegeID, $scope.CourseID, $scope.BranchID, $scope.RecognitionReport.ReportType);
            StudentRegdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.RecognitionReportData = data;
                } else {
                    alert("Data Not Found");
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});