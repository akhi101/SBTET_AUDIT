define(['app'], function (app) {
    app.controller("BasicMarksEntrScheduleListController", function ($scope, $state, AppSettings, BasicMarksEntrScheduleService) {
        //$scope.CompanyName = AppSettings.CompanyName;
        //$scope.LoginYear = AppSettings.SelectedYear;
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
            { field: "CourseName", headerText: "Stream", textAlign: ej.TextAlign.Left, width: 15 },
            { field: "ExmName", headerText: "Exam", textAlign: ej.TextAlign.Left, width: 15 },
            { field: "ColCode", headerText: "College Code", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "ColName", headerText: "College", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "ExmSubName", headerText: "Subject", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "StrStartDate", headerText: "Start Date", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "StrEndDate", headerText: "End Date", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "StartTime", headerText: "Start Time", textAlign: ej.TextAlign.Left, width: 15 },
            { field: "EndTime", headerText: "End Time", textAlign: ej.TextAlign.Left, width: 15 },
            //{ field: "utodate", headerText: "To Date", textAlign: ej.TextAlign.Left, width: 20 },
            //{ field: "FeeAmount", headerText: "Fee Amount", textAlign: ej.TextAlign.Left, width: 20 },
            //{ field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "MarkEntrSchID", headerText: "MarkEntrSchID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicMarksEntrScheduleList = [];

        $("#BasicMarksEntrSchedule").ejGrid({
            dataSource: $scope.BasicMarksEntrScheduleList,
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
            $state.go('Masters.OtherMarkEntrySchedule', { MarkEntrSchID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.OtherMarkEntrySchedule', { MarkEntrSchID: sender.data.MarkEntrSchID });
            }
        }

        var ExmSchType = "1";

        var BasicMarksEntrScheduledata = BasicMarksEntrScheduleService.GetOtherMarkEntryScheduleForList();
        BasicMarksEntrScheduledata.then(function (data) {
            $scope.BasicMarksEntrScheduleList = data;
        }, function (error) {
            alert(error);
        });
      
    });
});