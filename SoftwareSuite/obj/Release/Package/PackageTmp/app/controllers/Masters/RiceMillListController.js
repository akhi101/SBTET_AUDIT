define(['app'], function (app) {
    app.controller("RiceMillListController", function ($scope, $state, AppSettings, RiceMillService) {
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
                              { field: "RiceMillName", headerText: "Name", textAlign: ej.TextAlign.Left, width:100 },
                              { field: "ContactName", headerText: "Contact Name", textAlign: ej.TextAlign.Left, width: 100 },
                              { field: "ContactNumber", headerText: "Contact Number", textAlign: ej.TextAlign.Left, width: 100 },
                              { field: "RiceMillId", headerText: "", textAlign: ej.TextAlign.Right, width: 0 },
        ];
        $scope.RiceMillList = [];
        $("#RiceMills").ejGrid({
            dataSource: $scope.RiceMillList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
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
            $state.go('Masters.RiceMill', { RiceMillId: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.RiceMill', { RiceMillId: sender.data.RiceMillId });
            }
        }
        var RiceMilldata = RiceMillService.GetRiceMillList();
        RiceMilldata.then(function (data) {
            $scope.RiceMillList = data;
        }, function (error) {
            alert(error);
        });
    });
});