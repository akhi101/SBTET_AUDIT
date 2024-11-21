define(['app'], function (app) {
    app.controller("BasicSubPacktListController", function ($scope, $state, AppSettings, BasicSubPacktService) {
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
            { field: "PcktName", headerText: "Name", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "ExmSubName", headerText: "Subject", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "QpCode", headerText: "Qp Code", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "StateBuffer", headerText: "State Buffer", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "DistrictBuffer", headerText: "District Buffer", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "CenterBuffer", headerText: "Center Buffer", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "SubPacktID", headerText: "SubPacktID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicSubPacktList = [];
        $("#BasicSubPackt").ejGrid({
            dataSource: $scope.BasicSubPacktList,
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
            $state.go('Masters.BasicSubPackt', { SubPacktID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicSubPackt', { SubPacktID: sender.data.SubPacktID });
            }
        }
        var BasicSubPacktdata = BasicSubPacktService.GetBasicSubPacktListFromExamInstID(AppSettings.AcdYrID);
        BasicSubPacktdata.then(function (data) {
            $scope.BasicSubPacktList = data;
        }, function (error) {
            alert(error);
        });
    });
});