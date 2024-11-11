define(['app'], function (app) {
    app.controller("BasicMediumListController", function ($scope, $state, AppSettings, BasicMediumService) {
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
            { field: "MediumName", headerText: "Name", textAlign: ej.TextAlign.Left, width: 50 },
			{ field: "MediumCode", headerText: "Code", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "MediumID", headerText: "MediumID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicMediumList = [];
        $("#BasicMedium").ejGrid({
            dataSource: $scope.BasicMediumList,
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
            $state.go('Masters.BasicMedium', { MediumID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                //$state.go('Masters.BasicMedium', { MediumID: sender.data.MediumID });
            }
        }
        //var BasicMediumdata = BasicMediumService.GetBasicMediumList();
        //BasicMediumdata.then(function (data) {
        //    $scope.BasicMediumList = data;
        //}, function (error) {
        //    alert(error);
        //    });
        var BasicMediumdata = BasicMediumService.GetBasicMediumList(3);
        BasicMediumdata.then(function (data) {
            $scope.BasicMediumList = data;
        }, function (error) {
            alert(error);
        });

        $scope.FillMediumList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicMediumdata = BasicMediumService.GetBasicMediumList(ActiveFlag);
            BasicMediumdata.then(function (data) {
                $scope.BasicMediumList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});