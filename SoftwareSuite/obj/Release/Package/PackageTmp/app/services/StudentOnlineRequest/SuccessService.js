define(['app'], function (app) {
    app.service("SuccessService", function (DataAccessService) {
        this.GetAckPrint = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqDashboard/CreateAckReport', paramObject);
            return promise;
        }
    });
});