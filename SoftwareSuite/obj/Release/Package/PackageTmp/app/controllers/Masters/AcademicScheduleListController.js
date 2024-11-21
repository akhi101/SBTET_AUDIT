define(['app'], function (app) {
    app.controller("AcademicScheduleListController", function ($scope, $state, AppSettings, AcademicScheduleService) {
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
			{ field: "AcdYrName", headerText: "Year", textAlign: ej.TextAlign.Left, width: 10 },
			{ field: "ExmName", headerText: "Exam", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "BranchName", headerText: "Branch", textAlign: ej.TextAlign.Left, width: 10 },
			{ field: "regStrDate", headerText: "Start Date", textAlign: ej.TextAlign.Left, width: 20 }, 
			{ field: "regenddDate", headerText: "End Date", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "regLatefeeDate", headerText: "Late Fee Date", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "ApproveFlag", headerText: "Approve", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "AcdscheduleID", headerText: "AcdscheduleID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.AcademicScheduleList = [];
        $("#AcademicSchedule").ejGrid({
            dataSource: $scope.AcademicScheduleList,
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
            $state.go('Masters.AcademicSchedule', { AcdInstID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.AcademicSchedule', { AcdscheduleID: sender.data.AcdscheduleID });
            }
        }
        //var AcademicScheduledata = AcademicScheduleService.GetAcademicScheduleList();
        //AcademicScheduledata.then(function (data) {
        //    $scope.AcademicScheduleList = data;
        //}, function (error) {
        //    alert(error);
        //});

        var AcademicScheduledata = AcademicScheduleService.GetAcademicScheduleForList(3);
        AcademicScheduledata.then(function (data) {
            $scope.AcademicScheduleList = data;
        }, function (error) {
            alert(error);
            });


        $scope.FillAcademicScheduleList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var AcademicScheduledata = AcademicScheduleService.GetAcademicScheduleForList(ActiveFlag);
            AcademicScheduledata.then(function (data) {
                $scope.AcademicScheduleList = data;
            }, function (error) {
                alert(error);
            });
        }

    });
});