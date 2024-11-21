define(['app'], function (app) {
	app.controller("BasicBranchListController", function ($scope, $state, AppSettings, BasicBranchService) {
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
			{ field: "CourseName", headerText: "Stream", textAlign: ej.TextAlign.Left, width: 30 },
			{ field: "BranchName", headerText: "Name", textAlign: ej.TextAlign.Left, width: 50 },
			{ field: "BranchCode", headerText: "Code", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
			{ field: "BranchID", headerText: "BranchID", textAlign: ej.TextAlign.Right, visible: false }
        ];
		$scope.BasicBranchList = [];
		$("#BasicBranch").ejGrid({
			dataSource: $scope.BasicBranchList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
			toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
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
			$state.go('Masters.BasicBranch', { BranchID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
				// $state.go('Masters.BasicBranch', { BranchID: sender.data.BranchID });
            }
        }
		//var BasicBranchdata = BasicBranchService.GetBasicBranchList();
		//BasicBranchdata.then(function (data) {
		//	$scope.BasicBranchList = data;
  //      }, function (error) {
  //          alert(error);
  //      });

        var BasicBranchdata = BasicBranchService.GetBasicBranchForList(3);
        BasicBranchdata.then(function (data) {
            $scope.BasicBranchList = data;
        }, function (error) {
            alert(error);
        });
        $scope.FillBranchList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicBranchdata = BasicBranchService.GetBasicBranchForList(ActiveFlag);
            BasicBranchdata.then(function (data) {
                $scope.BasicBranchList = data;
            }, function (error) {
                alert(error);
            });
        }

    });
});