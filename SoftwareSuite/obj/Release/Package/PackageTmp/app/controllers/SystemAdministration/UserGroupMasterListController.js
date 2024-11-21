define(['app'], function (app) {
    app.controller("UserGroupMasterListController", function ($scope, $state, AppSettings, UserGroupMasterService) {
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        //var PageNm = $state.current.name.split(".")[1];
        //var RightForCurrentPage = [];
        //var UsersRightsdata = [];
        //UsersRightsdata = AppSettings.UserRights;
        //for (var i = 0; i < UsersRightsdata.length; i++) {
        //    if (UsersRightsdata[i].GridFormToOpen == PageNm) {
        //        var obj = {};
        //        obj.isaddable = UsersRightsdata[i].isaddable;
        //        RightForCurrentPage.push(obj);
        //    }
        //}
        var gridColumns = [
            { field: "SysUsrGrpName", headerText: " Group Name ", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "SysUsrGrpID", headerText: "SysUsrGrpID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.UserGroupMasterList = [];
        $("#UserGroupMaster").ejGrid({
            dataSource: $scope.UserGroupMasterList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add,ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
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
            $state.go('Masters.UserGroupMaster', { SysUsrGrpID: 0 });
            //}
        }
        //Edit Record 
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.UserGroupMaster', { SysUsrGrpID: sender.data.SysUsrGrpID });
            }
        }

        var UserGroupMasterdata = UserGroupMasterService.GetUserGroupMasterList();
        UserGroupMasterdata.then(function (data) {
            $scope.UserGroupMasterList = data;
        }, function (error) {
            alert(error);
        });

        //$scope.FillCollegeTypeList = function (ActiveFlag) {
        //    if (ActiveFlag == undefined) { ActiveFlag = 3; }
        //    if (ActiveFlag == "") { ActiveFlag = 3; }
        //    var BasicCollegeTypedata = UserGroupMasterService.GetBasicCollegeTypeForList(ActiveFlag);
        //    BasicCollegeTypedata.then(function (data) {
        //        $scope.UserGroupMasterList = data;
        //    }, function (error) {
        //        alert(error);
        //    });
        //}
    });
});