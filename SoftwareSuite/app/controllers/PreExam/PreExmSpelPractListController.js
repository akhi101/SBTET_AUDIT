﻿define(['app'], function (app) {
    app.controller("PreExmSpelPractListController", function ($scope, $state, AppSettings, PreExmSpelPractService) {
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
            { field: "SpellNo", headerText: "Spell No", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "SpellDateDesc", headerText: "Spell Sart Date", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "SpellEndDateDesc", headerText: "Spell End Date", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "PreExmSplPrID", headerText: "PreExmSplPrID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        $scope.PreExmSpelPractList = [];
        $("#PreExmSpelPract").ejGrid({
            dataSource: $scope.PreExmSpelPractList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] }, editSettings: { allowAdding: true },
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
            $state.go('PreExam.PreExmSpelPract', { PreExmSplPrID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('PreExam.PreExmSpelPract', { PreExmSplPrID: sender.data.PreExmSplPrID });
            }
        }
        var PreExmSpelPractdata = PreExmSpelPractService.GetPreExmSpelPractList(AppSettings.ExamInstID);
        PreExmSpelPractdata.then(function (data) {
            $scope.PreExmSpelPractList = data;
        }, function (error) {
            alert(error);
        });
    });
});