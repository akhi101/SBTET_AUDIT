define(['app'], function (app) {
    app.controller("GroupChangeAppListController", function ($scope, $state, AppSettings, GroupChangeAppService) {
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
            { field: "SrNo", headerText: "S No", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "FormNo", headerText: "FormNo", textAlign: ej.TextAlign.Right, width: 100 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "Fathername", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "Address", headerText: "Address", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "ExmName", headerText: "Exam", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "GrpChngID", headerText: "GrpChngID", visible: true, textAlign: ej.TextAlign.Right, width: 0 },
        ];
        $scope.EditData = "N";
        $scope.GroupChangeAppdata = [];
        $("#GroupChangeApps").ejGrid({
            dataSource: $scope.GroupChangeAppdata,
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
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('StudentRequestBoard.GroupChangeApp', { GrpChngID: sender.data.GrpChngID });
            }
        }
        //var CourseList = GroupChangeAppService.GetBasicCourseList();
        //CourseList.then(function (Coursedata, status, headers, config, error) {
        //	$scope.CourseList = Coursedata;
        //}, function (error) {
        //	alert(error);
        //});
        //$scope.FillCoursePart = function (CourseID) {
        //	var ExamList = GroupChangeAppService.GetBasicExamList(CourseID);
        //	ExamList.then(function (BasicExamdata, status, headers, config, error) {
        //		$scope.ExamList = BasicExamdata;
        //		var BranchList = GroupChangeAppService.GetBasicBranchList(CourseID);
        //		BranchList.then(function (BasicBranchdata, status, headers, config, error) {
        //			$scope.BranchList = BasicBranchdata;
        //		}, function (error) {
        //			alert(error);
        //		});
        //	}, function (error) {
        //		alert(error);
        //	});
        //}
        //$scope.Show = function () {
        //if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
        //	alert("Select Course");
        //	return;
        //}
        //if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
        //	alert("Select Course Exam");
        //	return;
        //}
        //if (($scope.BranchID == undefined) || ($scope.BranchID == "")) {
        //	alert("Select Branch");
        //	return;
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
        //var EligCertAppdata = GroupChangeAppService.FillGroupChangeAppDetailsList($scope.CourseID, $scope.ExamID, $scope.BranchID, UserGrp, EditData);
        //EligCertAppdata.then(function (data) {
        //             if (data.length > 0) {
        //                 var SrNo = 1
        //                 for (var i = 0; i < data.length; i++) {
        //			data[i].SrNo = SrNo;
        //			SrNo = SrNo + 1;
        //                 }
        //                 $scope.GroupChangeAppdata = data;
        //             }
        //             else {
        //                 alert("Data Not Found");
        //                 return;
        //             }
        //}, function (error) {
        //	alert(error);
        //	});
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
            var EligCertAppdata = GroupChangeAppService.FillGroupChangeAppDetailsList(UserGrp, EditData);
            EligCertAppdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].SrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.GroupChangeAppdata = data;
                }
                else {
                    alert("Data Not Found");
                    $scope.GroupChangeAppdata = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
        var EligCertAppdata = GroupChangeAppService.FillGroupChangeAppDetailsList(UserGrp, EditData);
        EligCertAppdata.then(function (data) {
            if (data.length > 0) {
                var SrNo = 1
                for (var i = 0; i < data.length; i++) {
                    data[i].SrNo = SrNo;
                    SrNo = SrNo + 1;
                }
                $scope.GroupChangeAppdata = data;
            }
            else {
                alert("Data Not Found");
                $scope.GroupChangeAppdata = [];
                return;
            }
        }, function (error) {
            alert(error);
        });
    });
});