define(['app'], function (app) {
    app.service("VerifySignService", function (DataAccessService) {
        this.GetVerifySign = function (RefNo) {
            var paramObject = { "RefNo": RefNo };
            var promise = DataAccessService.getDataWithPara('/api/ReqDashboard/GetReqCertInfoByRef', paramObject);
            return promise;
        }
    });
});