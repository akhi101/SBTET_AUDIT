define(['app'], function (app) {
    app.controller("BasicIncomeGroupsListController", function ($scope, $state, AppSettings, BasicIncomeGroupsService) {
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
            { field: "IncGrpame", headerText: "Name ", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "IncGrpCode", headerText: "Code", textAlign: ej.TextAlign.Left, width: 30 }, 
            { field: "UpperLimit", headerText: "Upper Limit", textAlign: ej.TextAlign.Left, width: 30 }, 
            { field: "LowerLimit", headerText: "Lower Limit", textAlign: ej.TextAlign.Left, width: 30 }, 
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "IncGrpID", headerText: "ID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicIncomeGroupsList = [];
        $("#BasicIncomeGroups").ejGrid({
            dataSource: $scope.BasicIncomeGroupsList,
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
            $state.go('Masters.BasicIncomeGroups', { IncGrpID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicIncomeGroups', { IncGrpID: sender.data.IncGrpID });
            }
        }
        //var BasicIncomeGroupsdata = BasicIncomeGroupsService.GetBasicIncomeGroupsList();
        //BasicIncomeGroupsdata.then(function (data) {
        //    $scope.BasicIncomeGroupsList = data;
        //}, function (error) {
        //    alert(error);
        //    });
        var BasicIncomeGroupsdata = BasicIncomeGroupsService.GetBasicIncomeGroupsForList(3);
        BasicIncomeGroupsdata.then(function (data) {
            $scope.BasicIncomeGroupsList = data;
        }, function (error) {
            alert(error);
        });

        $scope.FillIncomeGroupsList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicIncomeGroupsdata = BasicIncomeGroupsService.GetBasicIncomeGroupsForList(ActiveFlag);
            BasicIncomeGroupsdata.then(function (data) {
                $scope.BasicIncomeGroupsList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});