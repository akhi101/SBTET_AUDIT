define(['app'], function (app) {
    app.controller("BasicAcademicYearListController", function ($scope, $state, AppSettings, BasicAcademicYearService) {
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
			{ field: "AcdYrName", headerText: "Academic Year", textAlign: ej.TextAlign.Left, width: 100 },
			{ field: "strDate", headerText: "Start Date", textAlign: ej.TextAlign.Left, width: 50 },
			{ field: "enddDate", headerText: "End Date", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "AcdYrID", headerText: "AcdYrID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicAcademicYearList = [];
        $("#BasicAcademicYear").ejGrid({
            dataSource: $scope.BasicAcademicYearList,
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
            $state.go('Masters.BasicAcademicYear', { AcdYrID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicAcademicYear', { AcdYrID: sender.data.AcdYrID });
            }
        }
        //var BasicAcademicYeardata = BasicAcademicYearService.GetBasicAcademicYearList();
        //BasicAcademicYeardata.then(function (data) {
        //    $scope.BasicAcademicYearList = data;
        //}, function (error) {
        //    alert(error);
        //});

        var BasicAcademicYeardata = BasicAcademicYearService.GetBasicAcademicYearForList(3);
        BasicAcademicYeardata.then(function (data) {
            $scope.BasicAcademicYearList = data;
        }, function (error) {
            alert(error);
        });

        $scope.FillAcademicYearList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicAcademicYeardata = BasicAcademicYearService.GetBasicAcademicYearForList(ActiveFlag);
            BasicAcademicYeardata.then(function (data) {
                $scope.BasicAcademicYearList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});