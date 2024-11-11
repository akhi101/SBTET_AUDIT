define(['app'], function (app) {
    app.controller("BasicCasteListController", function ($scope, $state, AppSettings, BasicCasteService) {
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
            { field: "CasteName", headerText: "Name", textAlign: ej.TextAlign.Left, width: 50 },
			{ field: "CasteCode", headerText: "Code", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "CasteID", headerText: "ID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicCasteList = [];
        $("#BasicCaste").ejGrid({
            dataSource: $scope.BasicCasteList,
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
            if (RightForCurrentPage[0].isaddable != 'Y') {
                 alert("You Don't have Add Rights");
                return;
             } else {
				 $state.go('Masters.BasicCaste', { CasteID: 0 });
            }
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicCaste', { CasteID: sender.data.CasteID });
            }
        }
        //var BasicCastedata = BasicCasteService.GetBasicCasteList();
        //BasicCastedata.then(function (data) {
        //    $scope.BasicCasteList = data;
        //}, function (error) {
        //    alert(error);
        //    });
        var BasicCastedata = BasicCasteService.GetBasicCasteForList(3);
        BasicCastedata.then(function (data) {
            $scope.BasicCasteList = data;
        }, function (error) {
            alert(error);
        });
        $scope.FillCasteList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicCastedata = BasicCasteService.GetBasicCasteForList(ActiveFlag);
            BasicCastedata.then(function (data) {
                $scope.BasicCasteList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});