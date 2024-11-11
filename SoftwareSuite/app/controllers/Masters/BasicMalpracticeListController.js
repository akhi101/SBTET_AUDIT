define(['app'], function (app) {
	app.controller("BasicMalpracticeListController", function ($scope, $state, AppSettings, BasicMalpracticeService) {
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
			{ field: "MalPractName", headerText: "Mal Practice", textAlign: ej.TextAlign.Left, width: 50 },
			{ field: "MalPractCode", headerText: "Code", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
			{ field: "MalPractID", headerText: "MalPractID", textAlign: ej.TextAlign.Right, visible: false }
		];
		$scope.BasicMalpracticeList = [];
		$("#BasicMalpractice").ejGrid({
			dataSource: $scope.BasicMalpracticeList,
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
            $state.go('Masters.BasicMalPractice', { MalPractID: 0 });
			//}
		}
		// Edit delete record
		$scope.doubleclick = function doubleclick(sender, args) {
			if (this.multiSelectCtrlRequest == false) {
				$state.go('Masters.BasicMalPractice', { MalPractID: sender.data.MalPractID });
			}
		}
		//var BasicMalpracticedata = BasicMalpracticeService.GetBasicMalpracticeList();
		//BasicMalpracticedata.then(function (data) {
		//	$scope.BasicMalpracticeList = data;
		//}, function (error) {
		//	alert(error);
		//});

        var BasicMalpracticedata = BasicMalpracticeService.GetBasicMalpracticeForList(3);
        BasicMalpracticedata.then(function (data) {
            $scope.BasicMalpracticeList = data;
        }, function (error) {
            alert(error);
            });

        $scope.FillMalpracticeList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicMalpracticedata = BasicMalpracticeService.GetBasicMalpracticeForList(ActiveFlag);
            BasicMalpracticedata.then(function (data) {
                $scope.BasicMalpracticeList = data;
            }, function (error) {
                alert(error);
            });
        }

	});
});