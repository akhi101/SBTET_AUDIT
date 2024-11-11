define(['app'], function (app) {
    app.controller("EnrollStudentRequestListController", function ($scope, $state, AppSettings, EnrollStudentRequestService, EnrollStudentRequestService) {

        var AdmNoList = EnrollStudentRequestService.ChecAdmissionNo(AppSettings.CollegeID);
        AdmNoList.then(function (response, error) {
            //$scope.AdmNo = response[0].PrevAdmNo;
            if (response[0].PrevAdmNo == 0) {
                alert("Please enter previous Admission Number.");
                $state.go('Admission.PreYearAdmissionEntry');
            }
        }, function (error) {
            alert(error);
        });


        $scope.EnrollStudentRequestList = {};
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
            { field: "SSCHallTicket", headerText: "Hall Ticket No.", textAlign: ej.TextAlign.Right },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left },
            { field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left },
            { field: "MotherName", headerText: "Mother Name", textAlign: ej.TextAlign.Left },
            { field: "BirthDateDesc", headerText: "Birth Date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Left },
            { field: "GenderDesc", headerText: "Sex", textAlign: ej.TextAlign.Left },
            { field: "StudEnrolColID", headerText: "StudEnrolColID", visible: false, textAlign: ej.TextAlign.Right }
        ];
        $scope.EnrollStudentRequestData = [];
        $("#EnrollStudentRequests").ejGrid({
            dataSource: $scope.EnrollStudentRequestData,
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
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Admission.EnrollStudentRequest', { StudEnrolColID: sender.data.StudEnrolColID });
            }
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
            if (($scope.BranchID == undefined) || ($scope.BranchID == "")) {
                alert("Select Branch");
                return;
            }
            var EnrollStudentRequest = EnrollStudentRequestService.FillEnrollStudentRequestDetailsListAll(AppSettings.CollegeID, $scope.CourseID, $scope.ExamID, $scope.BranchID, AppSettings.AcdYrID);
            EnrollStudentRequest.then(function (data) {
                if (data.length > 0) {
                    $scope.EnrollStudentRequestData = data;
                }
                else {
                    //alert("Data Not Found");
                    $scope.EnrollStudentRequestData = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
        var CourseList = EnrollStudentRequestService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = EnrollStudentRequestService.GetBasicExamListByCourse(CourseID, 1);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;                
                var BranchList = EnrollStudentRequestService.GetBasicBranchListForRegStud(CourseID, AppSettings.CollegeID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }

        //All data shows
        var EnrollStudentRequest = EnrollStudentRequestService.FillEnrollStudentRequestDetailsListAll(AppSettings.CollegeID, 0, 0, 0, AppSettings.AcdYrID);
        EnrollStudentRequest.then(function (data) {
            if (data.length > 0) {
                $scope.EnrollStudentRequestData = data;
            }
            else {
                //alert("Data Not Found");
                $scope.EnrollStudentRequestData = [];
                return;
            }
        }, function (error) {
            alert(error);
            });

        $scope.ShowAll = function () {
            var EnrollStudentRequest = EnrollStudentRequestService.FillEnrollStudentRequestDetailsListAll(AppSettings.CollegeID, 0, 0, 0, AppSettings.AcdYrID);
            EnrollStudentRequest.then(function (data) {
                if (data.length > 0) {
                    $scope.EnrollStudentRequestData = data;
                }
                else {
                    //alert("Data Not Found");
                    $scope.EnrollStudentRequestData = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});