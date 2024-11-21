define(['app'], function (app) {
    app.controller("BasicExamInstanceScheduleListController", function ($scope, $state, AppSettings, BasicExamInstanceScheduleService) {
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
			{ field: "ExamInstanceNAme", headerText: "Exam Instance", textAlign: ej.TextAlign.Left, width: 10 },
			{ field: "ExmName", headerText: "Exam", textAlign: ej.TextAlign.Left, width: 10 },
			//{ field: "BranchName", headerText: "Branch", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "strDate", headerText: "  Start Date ", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "enddDate", headerText: " End Date ", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "ApproveFlag", headerText: "Approve Flag", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "ExmInstSchID", headerText: "ExmInstSchID", textAlign: ej.TextAlign.Right, visible: false } 
        ];
		$scope.ExamInstanceScheduleList = [];
		$("#ExamInstanceSchedule").ejGrid({
			dataSource: $scope.ExamInstanceScheduleList,
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
            //if (RightForCurrentPage[0].isaddable != 'Y') {
            //     alert("You Don't have Add Rights");
            //    return;
            // } else {
            $state.go('Exam.BasicExamInstanceSchedule', { ExmInstSchID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Exam.BasicExamInstanceSchedule', { ExmInstSchID: sender.data.ExmInstSchID });
            }
        }
		var ExamInstanceScheduledata = BasicExamInstanceScheduleService.GetExamInstanceScheduleList();
		ExamInstanceScheduledata.then(function (data) {
			$scope.ExamInstanceScheduleList = data;
        }, function (error) {
            alert(error);
        });
    });
});