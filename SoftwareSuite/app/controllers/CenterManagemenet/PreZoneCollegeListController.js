define(['app'], function (app) {
    app.controller("PreZoneCollegeListController", function ($scope, $state, AppSettings, PreZoneCollegeService) {
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
            { field: "ZoneName", headerText: " Zone Name ", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "ZoneCode", headerText: " Code ", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "Active", headerText: "Active", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "PreZoneColID", headerText: "PreZoneColID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.PreZoneCollegeList = [];
        $("#PreZoneCollege").ejGrid({
            dataSource: $scope.PreZoneCollegeList,
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
            $state.go('CenterManagemnet.PreZoneCollege', { PreZoneColID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('CenterManagemnet.PreZoneCollege', { PreZoneColID: sender.data.PreZoneColID });
            }
        }
        var PreZoneCollegedata = PreZoneCollegeService.GetPreZoneCollegeList();
        PreZoneCollegedata.then(function (data) {
            $scope.PreZoneCollegeList = data;
        }, function (error) {
            alert(error);
        });
    });
});