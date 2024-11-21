define(['app'], function (app) {
    app.controller("BasicPacketListController", function ($scope, $state, AppSettings, BasicPacketService) {
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
            { field: "PcktName", headerText: "Name", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "PcktSize", headerText: "Size", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "PcktID", headerText: "PcktID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicPacketList = [];
        $("#BasicPacket").ejGrid({
            dataSource: $scope.BasicPacketList,
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
            $state.go('Masters.BasicPacket', { PcktID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicPacket', { PcktID: sender.data.PcktID });
            }
        }
        //var BasicPacketdata = BasicPacketService.GetBasicPacketList();
        //BasicPacketdata.then(function (data) {
        //    $scope.BasicPacketList = data;
        //}, function (error) {
        //    alert(error);
        //});

        var BasicPacketdata = BasicPacketService.GetBasicPacketForList(3);
        BasicPacketdata.then(function (data) {
            $scope.BasicPacketList = data;
        }, function (error) {
            alert(error);
            });


        $scope.FillPacketList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicPacketdata = BasicPacketService.GetBasicPacketForList(ActiveFlag);
            BasicPacketdata.then(function (data) {
                $scope.BasicPacketList = data;
            }, function (error) {
                alert(error);
            });
        }

    });
});