define(['app'], function (app) {
	app.controller("BasicMainGroupListController", function ($scope, $state, AppSettings, BasicMainGroupService) {
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
            { field: "CourseName", headerText: "Stream", textAlign: ej.TextAlign.Left, width: 10 },
		    { field: "BranchName", headerText: "Branch", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "MainGrpName", headerText: "Main Group Name", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "GroupCode", headerText: "Group Code", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 10 },
			{ field: "MainGrpID", headerText: "MainGrpID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicMainGroupList = [];
        $("#BasicMainGroup").ejGrid({
            dataSource: $scope.BasicMainGroupList,
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
            $state.go('Masters.BasicMainGroup', { MainGrpID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
               // $state.go('Masters.BasicMainGroup', { MainGrpID: sender.data.MainGrpID });
            }
        }
		var BasicMainGroupdata = BasicMainGroupService.GetBasicMainGroupList();
        BasicMainGroupdata.then(function (data) {
            $scope.BasicMainGroupList = data;
        }, function (error) {
            alert(error);
        });
    });
});