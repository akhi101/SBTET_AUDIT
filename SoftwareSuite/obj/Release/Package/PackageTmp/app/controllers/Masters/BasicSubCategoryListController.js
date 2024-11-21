define(['app'], function (app) {
    app.controller("BasicSubCategoryListController", function ($scope, $state, AppSettings, BasicSubCategoryService) {
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
            { field: "ExmSubName", headerText: "Subject ", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "EvalTypName", headerText: "Category ", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "MaxMarks", headerText: "Max Marks", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "PassMarks", headerText: "Pass Marks", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "EvalGrdName", headerText: "Grade Name", textAlign: ej.TextAlign.Left, width: 30 },          
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "SubCatID", headerText: "SubCatID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicSubCategoryList = [];
        $("#BasicSubCategory").ejGrid({
            dataSource: $scope.BasicSubCategoryList,
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
            $state.go('Masters.BasicSubCategory', { SubCatID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.BasicSubCategory', { SubCatID: sender.data.SubCatID });
            }
        }
        //var BasicSubCategorydata = BasicSubCategoryService.GetBasicSubCategoryList();
        //BasicSubCategorydata.then(function (data) {
        //    $scope.BasicSubCategoryList = data;
        //}, function (error) {
        //    alert(error);
        //});

        var BasicSubCategorydata = BasicSubCategoryService.GetBasicSubCategoryForList(3);
        BasicSubCategorydata.then(function (data) {
            $scope.BasicSubCategoryList = data;
        }, function (error) {
            alert(error);
            });

        $scope.FillSubCategoryList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicSubCategorydata = BasicSubCategoryService.GetBasicSubCategoryForList(ActiveFlag);
            BasicSubCategorydata.then(function (data) {
                $scope.BasicSubCategoryList = data;
            }, function (error) {
                alert(error);
            });
        }


    });
});