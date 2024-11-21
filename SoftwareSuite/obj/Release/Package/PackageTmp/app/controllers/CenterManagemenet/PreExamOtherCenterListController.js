define(['app'], function (app) {
	app.controller("PreExamOtherCenterListController", function ($scope, $state, AppSettings, PreExamOtherCenterService) {
		//$scope.CompanyName = AppSettings.CompanyName;
		//$scope.LoginYear = AppSettings.SelectedYear;
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
			{ field: "NameOfOtherCenter", headerText: "Other Center Name", textAlign: ej.TextAlign.Left, width: 40 },
			{ field: "Address", headerText: " Address ", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "ManagementName", headerText: "ManagementName", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "OtherCenterID", headerText: "OtherCenterID", textAlign: ej.TextAlign.Right, visible: false }
		];
		$scope.PreExamOtherCenterList = [];
		var PreExamOtherCenterdata = PreExamOtherCenterService.GetPreExamOtherCenterList();
		PreExamOtherCenterdata.then(function (data) {
			$scope.PreExamOtherCenterList = data;
		}, function (error) {
			alert(error);
		});
		$("#PreExamOtherCenter").ejGrid({
			dataSource: $scope.PreExamOtherCenterList,
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
			$state.go('CenterManagemnet.PreExamOtherCenter', { OtherCenterID: 0 });
			//}
		}
		// Edit delete record
		$scope.doubleclick = function doubleclick(sender, args) {
			if (this.multiSelectCtrlRequest == false) {
				$state.go('CenterManagemnet.PreExamOtherCenter', { OtherCenterID: sender.data.OtherCenterID, DistrictID: sender.data.DistrictID });
			}
		}
		
	});
});