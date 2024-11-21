define(['app'], function (app) {
    app.service("StudSerListService", function (DataAccessService) {
        this.FillStudSerListDetailsList = function (SysUsrGrpID, LoggedUserId, ServiceID, EditData, DistrictIDs, SelectedAcdYrID, ColumnNo, CallingFrom, ServiceName) {
            var paramObject = { "UserGrpID": SysUsrGrpID, "LoggedInUserId": LoggedUserId, "ServiceID": ServiceID, "EditData": EditData, "strDistrictIDs": DistrictIDs, "SelectedAcdYrID": SelectedAcdYrID, "ColumnNo": ColumnNo, "CallingFrom":CallingFrom, "ServiceName":ServiceName }; 
            var promise = DataAccessService.getDataWithPara('api/ReqDashboard/GetStudReqSummaryByUserID', paramObject);
            return promise;
        }
        this.FillStudSerListDetailsListTcReport = function (UserID, LoggedUserId, ServiceID, EditData, DistrictIDs, SelectedAcdYrID, ColumnNo, CallingFrom, ServiceName) {
            var paramObject = { "UserGrpID": UserID, "LoggedInUserId": LoggedUserId, "ServiceID": ServiceID, "EditData": EditData, "strDistrictIDs": DistrictIDs, "SelectedAcdYrID": SelectedAcdYrID, "ColumnNo": ColumnNo, "CallingFrom": CallingFrom, "ServiceName": ServiceName };
            var promise = DataAccessService.getDataWithPara('api/ReqDashboard/GetStudReqSummaryByTcReport', paramObject);
            return promise;
        }
    });
});