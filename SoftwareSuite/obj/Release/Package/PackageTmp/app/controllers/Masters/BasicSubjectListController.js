define(['app'], function (app) {
    app.controller("BasicSubjectListController", function ($scope, $state, AppSettings, BasicSubjectService) {
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
            { field: "SubName", headerText: "Subject", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "SubShrtName", headerText: "Short Name", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "SubCode", headerText: "Subject Code", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "SubjectID", headerText: "SubjectID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicSubjectList = [];
        $("#BasicSubject").ejGrid({
            dataSource: $scope.BasicSubjectList,
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
            $state.go('Masters.BasicSubject', { SubjectID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                //$state.go('Masters.BasicSubject', { SubjectID: sender.data.SubjectID });
            }
        }
        //var BasicSubjectdata = BasicSubjectService.GetBasicSubjectList();
        //BasicSubjectdata.then(function (data) {
        //    $scope.BasicSubjectList = data;
        //}, function (error) {
        //    alert(error);
        //    });

        var BasicSubjectdata = BasicSubjectService.GetBasicSubjectForList(3);
        BasicSubjectdata.then(function (data) {
            $scope.BasicSubjectList = data;
        }, function (error) {
            alert(error);
        });

        $scope.FillSubjectList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicSubjectdata = BasicSubjectService.GetBasicSubjectForList(ActiveFlag);
            BasicSubjectdata.then(function (data) {
                $scope.BasicSubjectList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});