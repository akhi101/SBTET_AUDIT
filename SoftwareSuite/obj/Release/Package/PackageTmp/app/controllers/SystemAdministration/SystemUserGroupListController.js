define(['app'], function (app) {
    app.controller("SystemUserGroupListController", function ($scope, $state, AppSettings, SystemUserGroupService) {
        $scope.SystemUserGroupList = {}
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ListFormName == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
        var gridColumns = [
            { field: "SysUsrGrpName", headerText: "User Group Name", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "Active", headerText: "Active", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "SysUsrGrpID", headerText: "SysUsrGrpID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.SystemUserGroupList = [];
        $("#SystemUserGroup").ejGrid({
            dataSource: $scope.SystemUserGroupList,
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
            $state.go('Masters.SystemUserGroup', { SysUsrGrpID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.SystemUserGroup', { SysUsrGrpID: sender.data.SysUsrGrpID });
            }
        }
        var SystemUserGroupdata = SystemUserGroupService.GetSystemUserGroupList();
        SystemUserGroupdata.then(function (data) {
            $scope.SystemUserGroupList = data;
        }, function (error) {
            alert(error);
        });
    });
});