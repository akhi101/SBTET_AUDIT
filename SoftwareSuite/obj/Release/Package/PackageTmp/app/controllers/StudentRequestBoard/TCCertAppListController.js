define(['app'], function (app) {
    app.controller("TCCertAppListController", function ($scope, $state, AppSettings, TCCertAppService) {
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
            { field: "FormNo", headerText: "Form No", textAlign: ej.TextAlign.Center, width: 50 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "Fathername", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "PRNNo", headerText: "PRN No", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "Purpose", headerText: "Purpose", textAlign: ej.TextAlign.Left, width: 120 },
            { field: "StudentResultDesc", headerText: "Result", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "AcdYrName", headerText: "Year", textAlign: ej.TextAlign.Left, width: 70 },
            { field: "FeeAmount", headerText: "Amount", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "ReqStatus", headerText: "Status", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "ProcessRemark", headerText: "Process Remark", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "TCCertID", headerText: "TCCertID", visible: true, textAlign: ej.TextAlign.Right, width: 0 },
            { field: "AcdYrID", headerText: "AcdYrID", visible: false, textAlign: ej.TextAlign.Right, width: 0 }
        ];
        $scope.TCCertAppdata = [];
        $("#TCCertApps").ejGrid({
            dataSource: $scope.TCCertAppdata,
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
        $scope.EditData = "N";
        //var CourseList = TCCertAppService.GetBasicCourseList();
        //CourseList.then(function (Coursedata, status, headers, config, error) {
        //	$scope.CourseList = Coursedata;
        //}, function (error) {
        //	alert(error);
        //});
        //$scope.FillCoursePart = function (CourseID) {
        //	var ExamList = TCCertAppService.GetBasicExamList(CourseID);
        //	ExamList.then(function (BasicExamdata, status, headers, config, error) {
        //		$scope.ExamList = BasicExamdata;
        //		var BranchList = TCCertAppService.GetBasicBranchList(CourseID);
        //		BranchList.then(function (BasicBranchdata, status, headers, config, error) {
        //			$scope.BranchList = BasicBranchdata;
        //		}, function (error) {
        //			alert(error);
        //		});
        //	}, function (error) {
        //		alert(error);
        //	});
        //}
        //function AddNew() {
        //	$state.go('StudentRequestBoard.TCCertApp', { TCCertID: 0 });
        //}
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('StudentRequestBoard.TCCertApp', { TCCertID: sender.data.TCCertID });
            }
        }
        //$scope.Show = function () {
        //if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
        //    alert("Select Course");
        //    return;
        //}
        //if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
        //    alert("Select Course Exam");
        //    return;
        //}
        //if (($scope.BranchID == undefined) || ($scope.BranchID == "")) {
        //    alert("Select Branch");
        //    return;
        //}
        //var UserGrp = "";
        //if (AppSettings.SysUsrGrpID == 2) {
        //	UserGrp = "A";
        //} else {
        //	UserGrp = "O";
        //}
        //var EditData = false;
        //if ($scope.EditData == 'Y') {
        //	EditData = true;
        //} else {
        //	EdiData = false;
        //}
        //         var TCCertAppdata = TCCertAppService.FillTCCertAppDetailsList($scope.CourseID, $scope.ExamID, $scope.BranchID, UserGrp, EditData);
        //TCCertAppdata.then(function (data) {
        //	if (data.length > 0) {
        //		var SrNo = 1
        //		for (var i = 0; i < data.length; i++) {
        //			data[i].SrNo = SrNo;
        //			SrNo = SrNo + 1;
        //		}
        //		$scope.TCCertAppdata = data;
        //	}
        //	else {
        //		alert("Data Not Found");
        //		return;
        //	}
        //}, function (error) {
        //	alert(error);
        //});
        //}
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
        $scope.ChangeChange = function () {
            var EditData = false;
            if ($scope.EditData == 'Y') {
                EditData = true;
            } else {
                EdiData = false;
            }
            var TCCertAppdata = TCCertAppService.FillTCCertAppDetailsList(UserGrp, EditData);
            TCCertAppdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].SrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.TCCertAppdata = data;
                }
                else {
                    alert("Data Not Found");
                    $scope.TCCertAppdata = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
        var TCCertAppdata = TCCertAppService.FillTCCertAppDetailsList(UserGrp, EditData);
        TCCertAppdata.then(function (data) {
            if (data.length > 0) {
                var SrNo = 1
                for (var i = 0; i < data.length; i++) {
                    data[i].SrNo = SrNo;
                    SrNo = SrNo + 1;
                }
                $scope.TCCertAppdata = data;
            }
            else {
                alert("Data Not Found");
                return;
            }
        }, function (error) {
            alert(error);
        });
    });
});