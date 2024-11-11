define(['app'], function (app) {
    app.controller("BasicSubGroupListController", function ($scope, $state, AppSettings, BasicSubGroupService) {
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
			{ field: "SubGrpName", headerText: "Name", textAlign: ej.TextAlign.Left, width: 30 },
			{ field: "GroupType", headerText: "Group Type", textAlign: ej.TextAlign.Left, width: 30 },
			{ field: "MainGrpName", headerText: "Main Group", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "GroupSeq", headerText: "Group Seq", textAlign: ej.TextAlign.Left, width: 30 },
			{ field: "CompCount", headerText: "Compulsory Subject Count", textAlign: ej.TextAlign.Left, width: 30 },
			{ field: "OptCount", headerText: "Optional Subject Count", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "SubGrpID", headerText: "SubGrpID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicSubGroupList = [];
        $("#BasicSubGroup").ejGrid({
            dataSource: $scope.BasicSubGroupList,
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
            $state.go('Masters.BasicSubGroup', { SubGrpID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicSubGroup', { SubGrpID: sender.data.SubGrpID });
            }
        }
        //var BasicSubGroupdata = BasicSubGroupService.GetBasicSubGroupList();
        //BasicSubGroupdata.then(function (data) {
        //    $scope.BasicSubGroupList = data;
        //}, function (error) {
        //    alert(error);
        //});

        var BasicSubGroupdata = BasicSubGroupService.GetBasicSubGroupForList(3);
        BasicSubGroupdata.then(function (data) {
            $scope.BasicSubGroupList = data;
        }, function (error) {
            alert(error);
            });

        $scope.FillSubGroupList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicSubGroupdata = BasicSubGroupService.GetBasicSubGroupForList(ActiveFlag);
            BasicSubGroupdata.then(function (data) {
                $scope.BasicSubGroupList = data;
            }, function (error) {
                alert(error);
            });
        }


    });
});