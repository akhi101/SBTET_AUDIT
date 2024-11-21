define(['app'], function (app) {
    app.controller("BasicSubCasteListController", function ($scope, $state, AppSettings, BasicSubCasteService) {
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
			{ field: "Castename", headerText: "Caste", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "SubCastName", headerText: "Sub-Caste", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "SubCastCode", headerText: "Sub-Caste Code", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "SrNo", headerText: "Serial Number", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "SubCastID", headerText: "SubCastID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicSubCasteList = [];
        $("#BasicSubCaste").ejGrid({
            dataSource: $scope.BasicSubCasteList,
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
            $state.go('Masters.BasicSubCaste', { SubCastID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicSubCaste', { SubCastID: sender.data.SubCastID });
            }
        }
        //var BasicSubCastedata = BasicSubCasteService.GetBasicSubCasteList();
        //BasicSubCastedata.then(function (data) {
        //    $scope.BasicSubCasteList = data;
        //}, function (error) {
        //    alert(error);
        //    });

        var BasicSubCastedata = BasicSubCasteService.GetBasicSubCasteForList(3);
        BasicSubCastedata.then(function (data) {
            $scope.BasicSubCasteList = data;
        }, function (error) {
            alert(error);
        });
        $scope.FillSubCasteList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicSubCastedata = BasicSubCasteService.GetBasicSubCasteForList(ActiveFlag);
            BasicSubCastedata.then(function (data) {
                $scope.BasicSubCasteList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});