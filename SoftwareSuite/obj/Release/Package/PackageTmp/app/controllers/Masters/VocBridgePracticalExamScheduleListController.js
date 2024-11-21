define(['app'], function (app) {
    app.controller("VocBridgePracticalExamScheduleListController", function ($scope, $state, AppSettings, BasicMarksEntrScheduleService) {
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
            { field: "CourseName", headerText: "Stream", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "ExmName", headerText: "Exam", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "ColName", headerText: "Center", textAlign: ej.TextAlign.Left, width: 35 },
            { field: "StrStartDate", headerText: "Start Date", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "StrEndDate", headerText: "End Date", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "MornigStartTime", headerText: "Morning Start Time", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "MornigEndTime", headerText: "Morning End Time", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "AfterNoonStartTime", headerText: "After Noon Start Time", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "AfterNoonEndTime", headerText: "After Noon End Time", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "PrePracScheID", headerText: "PrePracScheID", textAlign: ej.TextAlign.Right, visible: false }
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
            $state.go('Masters.VocBridgePracticalExamSchedule', { PrePracScheID: 0 });
        }

        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.VocBridgePracticalExamSchedule', { PrePracScheID: sender.data.PrePracScheID });
            }
        }

        var ExmSchType = "2";

        var BasicMarksEntrScheduledata = BasicMarksEntrScheduleService.GetVocBridgePracticalEntryScheduleList();
        BasicMarksEntrScheduledata.then(function (data) {
            $scope.BasicMarksEntrScheduleList = data;
        }, function (error) {
            alert(error);
        });

    });
});