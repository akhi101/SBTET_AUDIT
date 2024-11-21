define(['app'], function (app) {
    app.controller("GenratePRNListController", function ($scope, $state, AppSettings, GenratePRNService, RegisterAdmittedStudentService) {
        $scope.GenratePRNList = {};
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
        //var gridColumns = [
        //    { field: "StuRegSrNo", headerText: "S No", textAlign: ej.TextAlign.Right },
        //    { field: "AdmNo", headerText: "Enroll No", textAlign: ej.TextAlign.Right },
        //    { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left },
        //    { field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left },
        //    { field: "BirthDateDesc", headerText: "Birth Date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Left },
        //    { field: "GenderDesc", headerText: "Sex", textAlign: ej.TextAlign.Left },
        //    { field: "SSCHallTicket", headerText: "SSC Details", textAlign: ej.TextAlign.Right },
        //    { field: "PRNNo", headerText: "PRN Number", textAlign: ej.TextAlign.Left },
        //    { field: "SubName", headerText: "Second Lang.", textAlign: ej.TextAlign.Left },
        //    { field: "PreStudRegID", headerText: "PreStudRegID", visible: false, textAlign: ej.TextAlign.Right }
        //];
        //$scope.GenratePRNData = [];
        //$("#GenratePRNs").ejGrid({
        //    dataSource: $scope.GenratePRNData,
        //    allowPaging: true,
        //    pageSettings: { pageSize: 10 },
        //    allowSearching: true,
        //    allowScrolling: true,
        //    allowResizeToFit: true,
        //    allowFiltering: true,
        //    toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
        //    toolbarClick: function (args) {
        //        if (args.itemName == "Add") {
        //            args.cancel = true;
        //            AddNew();
        //        }
        //        if (args.itemName == "Excel Export") {
        //            args.cancel = true;
        //            this.export(AppSettings.ExportToExcelUrl);
        //        }
        //        if (args.itemName == "Word Export") {
        //            args.cancel = true;
        //            this.export(AppSettings.ExportToWordUrl);
        //        }
        //        if (args.itemName == "PDF Export") {
        //            args.cancel = true;
        //            this.export(AppSettings.ExportToPdfUrl);
        //        }
        //    },
        //    columns: gridColumns
        //});
        //$scope.doubleclick = function doubleclick(sender, args) {
        //    if (this.multiSelectCtrlRequest == false) {
        //        $state.go('Admission.PreStudentReg', { PreStudRegID: sender.data.PreStudRegID });
        //    }
        //}
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
        $scope.Genrate = function () {
            if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            var GenratePRNdata = GenratePRNService.FillGenratePRNDetailsList(AppSettings.CollegeID, $scope.CourseID, $scope.ExamID, $scope.BranchID);
            GenratePRNdata.then(function (data) {
                if (data.length > 0) {
                    //var SrNo = 1
                    //for (var i = 0; i < data.length; i++) {
                    //    data[i].StuRegSrNo = SrNo;
                    //    SrNo = SrNo + 1;
                    //}
                    //$scope.GenratePRNData = data;
                    alert("PRN Generated Successfully");
                }
                else {
                    alert("Data Not Found");
                    $scope.GenratePRNData = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});