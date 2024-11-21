define(['app'], function (app) {
    app.service("CommunicationService", function (DataAccessService) {        
        this.SendSmSByChallan = function (chalanaNo) {
            var paramObject = { "chalanaNo": chalanaNo };
            return DataAccessService.getDataWithPara('api/PreExamination/SendSms', paramObject);
        }
    });
});