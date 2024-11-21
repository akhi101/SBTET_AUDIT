define(['app'], function (app) {
	app.controller("BasicFinalGradeListController", function ($scope, $state, AppSettings, BasicFinalGradeService) {
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
			{ field: "FinalGrdName", headerText: "Grade", textAlign: ej.TextAlign.Left, width: 50 },      
			{ field: "FinalGrdCode", headerText: "Code", textAlign: ej.TextAlign.Left, width: 30 },      
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "FinalGrdID", headerText: "FinalGrdID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicFinalGradeList = [];
        $("#BasicFinalGrade").ejGrid({
            dataSource: $scope.BasicFinalGradeList,
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
            $state.go('Masters.BasicFinalGrade', { FinalGrdID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicFinalGrade', { FinalGrdID: sender.data.FinalGrdID });
            }
        }
        //var BasicFinalGradedata = BasicFinalGradeService.GetBasicFinalGradeList();
        //BasicFinalGradedata.then(function (data) {
        //    $scope.BasicFinalGradeList = data;
        //}, function (error) {
        //    alert(error);
        //});

        var BasicFinalGradedata = BasicFinalGradeService.GetBasicFinalGradeForList(3);
        BasicFinalGradedata.then(function (data) {
            $scope.BasicFinalGradeList = data;
        }, function (error) {
            alert(error);
            });

        $scope.FillFinalGradeList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicFinalGradedata = BasicFinalGradeService.GetBasicFinalGradeForList(ActiveFlag);
            BasicFinalGradedata.then(function (data) {
                $scope.BasicFinalGradeList = data;
            }, function (error) {
                alert(error);
            });
        }

    });
});