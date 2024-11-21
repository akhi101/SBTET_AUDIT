define(['app'], function (app) {
    app.controller("PreReqScheduleListController", function ($scope, $state, AppSettings, PreReqScheduleService) {
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
            { field: "AcdYrName", headerText: "Academic Instance", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "ServiceName", headerText: "Online Request", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "Frmdate", headerText: "From Date", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "utodate", headerText: "To Date", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "FeeAmount", headerText: "Fee Amount", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "ReqSchID", headerText: "ReqSchID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.PreReqScheduleList = [];
        $("#PreReqSchedule").ejGrid({
            dataSource: $scope.PreReqScheduleList,
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
            $state.go('Masters.PreReqSchedule', { ReqSchID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.PreReqSchedule', { ReqSchID: sender.data.ReqSchID });
            }
        }
        //var PreReqScheduledata = PreReqScheduleService.GetPreReqScheduleList();
        //PreReqScheduledata.then(function (data) {
        //    $scope.PreReqScheduleList = data;
        //}, function (error) {
        //    alert(error);
        //});

        var PreReqScheduledata = PreReqScheduleService.GetPreReqScheduleForList(3);
        PreReqScheduledata.then(function (data) {
            $scope.PreReqScheduleList = data;
        }, function (error) {
            alert(error);
        });

        $scope.FillPreReqScheduleList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var PreReqScheduledata = PreReqScheduleService.GetPreReqScheduleForList(ActiveFlag);
            PreReqScheduledata.then(function (data) {
                $scope.PreReqScheduleList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});