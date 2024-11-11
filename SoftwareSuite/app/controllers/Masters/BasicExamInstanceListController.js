define(['app'], function (app) {
	app.controller("BasicExamInstanceListController", function ($scope, $state, AppSettings, BasicExamInstanceService) {
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
			
			{ field: "ExamInstanceYear", headerText: "Year", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "ExamInstance", headerText: "Month", textAlign: ej.TextAlign.Left, width: 60 },
			{ field: "AcdYrName", headerText: "Academic Year", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "ExamAuthorityName", headerText: " Authority Name ", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "CurrentInstanceFlag", headerText: "Exam Instance Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "ReExamFlag", headerText: "Re-Exam Flag", textAlign: ej.TextAlign.Left, width: 30 },			 
            { field: "ExamInstID", headerText: "ExamInstID", textAlign: ej.TextAlign.Right, visible: false } 
        ];
		$scope.BasicExamInstanceList = [];
		$("#BasicExamInstance").ejGrid({
			dataSource: $scope.BasicExamInstanceList,
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
            $state.go('Masters.BasicExamInstance', { ExamInstID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicExamInstance', { ExamInstID: sender.data.ExamInstID });
            }
        }
		var BasicExamInstancedata = BasicExamInstanceService.GetBasicExamInstanceList();
		BasicExamInstancedata.then(function (data) {
			$scope.BasicExamInstanceList = data;
        }, function (error) {
            alert(error);
        });
    });
});