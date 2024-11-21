define(['app'], function (app) {
    app.controller("DupMarksMemoAppListController", function ($scope, $state, AppSettings, DupMarksMemoAppService) {
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
        if (AppSettings.SysUsrGrpID == 4) {
            UserGrp = "O";
        } else if (AppSettings.SysUsrGrpID == 2) {
            UserGrp = "A";
        } else {
            UserGrp = "S";
        }
        var gridColumns = [
            { field: "FormNo", headerText: "FormNo", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "HallTicketNo", headerText: "Hall Ticket No.", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "Fathername", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "MobileNo", headerText: "Mobile No", textAlign: ej.TextAlign.Left, width: 100 }
        ];
        $scope.DupMarksMemoAppdata = [];
        $("#DupMarksMemoApps").ejGrid({
            dataSource: $scope.DupMarksMemoAppdata,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Search] },//ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, 
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
        var CourseList = DupMarksMemoAppService.GetBasicCourseList();
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = DupMarksMemoAppService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                var BranchList = DupMarksMemoAppService.GetBasicBranchList(CourseID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('StudentRequestBoard.DupMarksMemoApp', { DupMemoID: sender.data.DupMemoID });
            }
        }
        var CourseList = DupMarksMemoAppService.GetBasicCourseList();
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = DupMarksMemoAppService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                var BranchList = DupMarksMemoAppService.GetBasicBranchList(CourseID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        $scope.EditData = "N";
        $scope.Show = function () {
            if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                alert("Select Course");
                return;
            }
            if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
                alert("Select Course Exam");
                return;
            }
            if (($scope.BranchID == undefined) || ($scope.BranchID == "")) {
                alert("Select Branch");
                return;
            }
            var UserGrp = "";
            if (AppSettings.SysUsrGrpID == 4) {
                UserGrp = "O";
            } else if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
            } else {
                UserGrp = "S";
            }

            var EditData = false;
            if ($scope.EditData == 'Y') {
                EditData = true;
            } else {
                EdiData = false;
            }
            var DupMarksMemoAppdata = DupMarksMemoAppService.FillDupMarksMemoAppDetailsList($scope.CourseID, $scope.ExamID, $scope.BranchID, UserGrp, EditData);
            DupMarksMemoAppdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].SrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.DupMarksMemoAppdata = data;
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