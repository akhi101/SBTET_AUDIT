define(['app'], function (app) {
    app.controller("TranscriptsAppListController", function ($scope, $state, AppSettings, TranscriptsAppService) {
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
            { field: "FormNo", headerText: "FormNo", textAlign: ej.TextAlign.Right, width: 100 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "Purpose", headerText: "Purpose", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "FeeAmount", headerText: "Amount", textAlign: ej.TextAlign.Right, width: 100 },
            { field: "ReqStatus", headerText: "Status", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "TrnSrptID", headerText: "TrnSrptID", visible: true, textAlign: ej.TextAlign.Right, width: 0 }

        ];
        $scope.TranscriptsAppdata = [];
        $("#TranscriptsApps").ejGrid({
            dataSource: $scope.TranscriptsAppdata,
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
        var CourseList = TranscriptsAppService.GetBasicCourseList();
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = TranscriptsAppService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                var BranchList = TranscriptsAppService.GetBasicBranchList(CourseID);
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
                $state.go('StudentRequestBoard.TranscriptsApp', { TrnSrptID: sender.data.TrnSrptID });
            }
        }
        var CourseList = TranscriptsAppService.GetBasicCourseList();
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = TranscriptsAppService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                var BranchList = TranscriptsAppService.GetBasicBranchList(CourseID);
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
            if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
            } else {
                UserGrp = "O";
            }
            var EditData = false;
            if ($scope.EditData == 'Y') {
                EditData = true;
            } else {
                EdiData = false;
            }
            var TranscriptsAppdata = TranscriptsAppService.FillTranscriptsAppDetailsList($scope.CourseID, $scope.ExamID, $scope.BranchID, UserGrp, EditData);
            TranscriptsAppdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].SrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.TranscriptsAppdata = data;
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