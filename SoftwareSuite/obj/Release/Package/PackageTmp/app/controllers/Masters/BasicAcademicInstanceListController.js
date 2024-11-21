define(['app'], function (app) {
    app.controller("BasicAcademicInstanceListController", function ($scope, $state, AppSettings, BasicAcademicInstanceService) {
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
			{ field: "AcdInstName", headerText: "Academic Instance", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "FromDate", headerText: "From Date", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "ToDate", headerText: "To Date", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "AcdInstID", headerText: "AcdInstID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicAcademicInstanceList = [];
        $("#BasicAcademicInstance").ejGrid({
            dataSource: $scope.BasicAcademicInstanceList,
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
            $state.go('Masters.BasicAcademicInstance', { AcdInstID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicAcademicInstance', { AcdInstID: sender.data.AcdInstID });
            }
        }
        var BasicAcademicInstancedata = BasicAcademicInstanceService.GetBasicAcademicInstanceList();
        BasicAcademicInstancedata.then(function (data) {
            $scope.BasicAcademicInstanceList = data;
        }, function (error) {
            alert(error);
        });
    });
});