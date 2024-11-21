define(['app'], function (app) {
    app.controller("StudReqListController", function ($scope, $state, AppSettings, StudReqListService) {
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
            { field: "SrNo", headerText: "S No", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "ServiceName", headerText: "Service Name", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "TotalRequests", headerText: "Total Requests", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "ApprovedRequests", headerText: "Approved Requests", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "PendingRequests", headerText: "Pending Requests", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "RejectedRequests", headerText: "Rejected Requests", textAlign: ej.TextAlign.Left, width: 80 },
        ];
        $scope.StudReqListdata = [];
        $("#StudReqLists").ejGrid({
            dataSource: $scope.StudReqListdata,
            allowPaging: true,
            pageSettings: { pageSize: 20 },
            allowSearching: true,
            allowScrolling: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Search] }, //ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport,
            toolbarClick: function (args) {

            },
            columns: gridColumns
        });
        var StudReqListdata = StudReqListService.FillStudReqListDetailsList(AppSettings.SysUsrGrpID);
        StudReqListdata.then(function (data) {
            if (data.length > 0) {
                var SrNo = 1
                for (var i = 0; i < data.length; i++) {
                    data[i].SrNo = SrNo;
                    SrNo = SrNo + 1;
                }
                $scope.StudReqListdata = data;
            }
            else {
                alert("Data Not Found");
                return;
            }
        }, function (error) {
            alert(error);
        });
        //}
    });
});