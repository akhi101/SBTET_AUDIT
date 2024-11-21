define(['app'], function (app) {
    app.controller("BasicFeesListController", function ($scope, $state, AppSettings, BasicFeesService) {
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
            { field: "FeesName", headerText: "Name", textAlign: ej.TextAlign.Left, width: 30 },      
			{ field: "CollectedForFlag", headerText: "Collected For", textAlign: ej.TextAlign.Left, width: 10 },
			{ field: "FeesCode", headerText: "Code", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "FeesID", headerText: "FeesID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicFeesList = [];
        $("#BasicFees").ejGrid({
            dataSource: $scope.BasicFeesList,
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
			$state.go('Masters.BasicFees', { FeesID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
				$state.go('Masters.BasicFees', { FeesID: sender.data.FeesID });
            }
        }
        //var BasicFeesdata = BasicFeesService.GetBasicFeesList();
        //BasicFeesdata.then(function (data) {
        //    $scope.BasicFeesList = data;
        //}, function (error) {
        //    alert(error);
        //});


        var BasicFeesdata = BasicFeesService.GetBasicFeesForList(3);
        BasicFeesdata.then(function (data) {
            $scope.BasicFeesList = data;
        }, function (error) {
            alert(error);
            });


        $scope.FillFeesList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicFeesdata = BasicFeesService.GetBasicFeesForList(ActiveFlag);
            BasicFeesdata.then(function (data) {
                $scope.BasicFeesList = data;
            }, function (error) {
                alert(error);
            });
        }

    });
});