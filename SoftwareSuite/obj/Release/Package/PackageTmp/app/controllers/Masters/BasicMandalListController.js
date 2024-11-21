define(['app'], function (app) {
	app.controller("BasicMandalListController", function ($scope, $state, AppSettings, BasicMandalService) {
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
			{ field: "DistrictName", headerText: "District", textAlign: ej.TextAlign.Left,width: 30 },
			{ field: "MandalName", headerText: "Mandal Name", textAlign: ej.TextAlign.Left, width: 70 },
			{ field: "MandalCode", headerText: "Mandal Code", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "MandalID", headerText: "MandalID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.BasicMandalList = [];
        $("#BasicMandal").ejGrid({
            dataSource: $scope.BasicMandalList,
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
                this.model["apiUrlAndApiName"] = AppSettings.WebApiUrl + "api/BasicMandal/GetBasicMandalList";
                this.model["ModelName"] = "BasicMandal";
                this.model["ModelName1"] = "CoreExamin.Masters.BasicMandal, Masters";
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
            $state.go('Masters.BasicMandal', { MandalID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                //$state.go('Masters.BasicMandal', { MandalID: sender.data.MandalID });
            }
        }
        //var BasicMandaldata = BasicMandalService.GetBasicMandalList();
        //BasicMandaldata.then(function (data) {
        //    $scope.BasicMandalList = data;
        //}, function (error) {
        //    alert(error);
        //    });
        var BasicMandaldata = BasicMandalService.GetBasicMandalForList(3);
        BasicMandaldata.then(function (data) {
            $scope.BasicMandalList = data;
        }, function (error) {
            alert(error);
        });

        $scope.FillMandalList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicMandaldata = BasicMandalService.GetBasicMandalForList(ActiveFlag);
            BasicMandaldata.then(function (data) {
                $scope.BasicMandalList = data;
            }, function (error) {
                alert(error);
            })
        }

    });
});