define(['app'], function (app) {
    app.controller("AcademicYearFeesListController", function ($scope, $state, AppSettings, AcademicYearFeesService) {
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
			{ field: "AcdYrName", headerText: "Academic Instance", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "FeesName", headerText: "Fees Name", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "FeesAppliedFlag", headerText: "Fees Applied For", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "FeesAmount", headerText: "Fees Amount", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "LateFeesAmount", headerText: "Late Fees Amount", textAlign: ej.TextAlign.Left, width: 20 },  
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 20 }, 
            { field: "AcdyrFeesID", headerText: "AcdyrFeesID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.AcademicYearFeesList = [];
        $("#AcademicYearFees").ejGrid({
            dataSource: $scope.AcademicYearFeesList,
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
            $state.go('Masters.AcademicYearFees', { AcdyrFeesID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Masters.AcademicYearFees', { AcdyrFeesID: sender.data.AcdyrFeesID });
            }
        }
        var AcademicYearFeesdata = AcademicYearFeesService.GetAcademicYearFeesList();
        AcademicYearFeesdata.then(function (data) {
            $scope.AcademicYearFeesList = data;
        }, function (error) {
            alert(error);
        });
    });
});