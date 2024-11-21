define(['app'], function (app) {
    app.controller("BasicGrpSubjectListController", function ($scope, $state, AppSettings, BasicGrpSubjectService) {
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
            { field: "SubGrpName", headerText: "Subject Group", textAlign: ej.TextAlign.Right, width: 30 },
            { field: "ExmSubName", headerText: "Subject", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "SubjectType", headerText: "Type", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "GrpSubID", headerText: "GrpSubID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicGrpSubjectList = [];
        $("#BasicGrpSubject").ejGrid({
            dataSource: $scope.BasicGrpSubjectList,
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
            $state.go('Masters.BasicGrpSubject', { GrpSubID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicGrpSubject', { GrpSubID: sender.data.GrpSubID });
            }
        }
        //var BasicGrpSubjectdata = BasicGrpSubjectService.GetBasicGrpSubjectList();
        //BasicGrpSubjectdata.then(function (data) {
        //    $scope.BasicGrpSubjectList = data;
        //}, function (error) {
        //    alert(error);
        //});

        var BasicGrpSubjectdata = BasicGrpSubjectService.GetBasicGrpSubjectForList(3);
        BasicGrpSubjectdata.then(function (data) {
            $scope.BasicGrpSubjectList = data;
        }, function (error) {
            alert(error);
            });

        $scope.FillGrpSubjectList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicGrpSubjectdata = BasicGrpSubjectService.GetBasicGrpSubjectForList(ActiveFlag);
            BasicGrpSubjectdata.then(function (data) {
                $scope.BasicGrpSubjectList = data;
            }, function (error) {
                alert(error);
            });
        }

    });
});