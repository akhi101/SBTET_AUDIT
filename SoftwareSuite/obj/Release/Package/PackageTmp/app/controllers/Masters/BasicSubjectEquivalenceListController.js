define(['app'], function (app) {
    app.controller("BasicSubjectEquivalenceListController", function ($scope, $state, AppSettings, BasicSubjectEquivalenceService) {
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
            { field: "CourseName", headerText: "Stream", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "ExmName", headerText: "Exam", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "ExmSubName", headerText: " Subject", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "EquSubName", headerText: "Equivalance Subject", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "SubEqiValenceID", headerText: "SubEqiValenceID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicSubjectEquivalenceList = [];
        $("#BasicSubjectEquivalence").ejGrid({
            dataSource: $scope.BasicSubjectEquivalenceList,
            allowPaging: true,
            allowEditing: false,
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
            $state.go('Masters.SubjectEquivalence', { SubEqiValenceID: 0 });
            //}
        }
        // Edit delete record

        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.SubjectEquivalence', { SubEqiValenceID: sender.data.SubEqiValenceID });
            }
        }
        //var BasicAreasdata = BasicAreasService.GetBasicAreasList();
        //BasicAreasdata.then(function (data) {
        //    $scope.BasicAreasList = data;
        //}, function (error) {
        //    alert(error);
        //});

        var BasicSubjectEquivalencedata = BasicSubjectEquivalenceService.GetBasicSubjectEquivalenceList();
        BasicSubjectEquivalencedata.then(function (data) {
            $scope.BasicSubjectEquivalenceList = data;
        }, function (error) {
            alert(error);
        });

        //$scope.FillAreasList = function (ActiveFlag) {
        //    if (ActiveFlag == undefined) { ActiveFlag = 3; }
        //    if (ActiveFlag == "") { ActiveFlag = 3; }
        //    var BasicAreasdata = BasicAreasService.GetBasicAreasForList(ActiveFlag);
        //    BasicAreasdata.then(function (data) {
        //        $scope.BasicAreasList = data;
        //    }, function (error) {
        //        alert(error);
        //    });
        //}
    });
});