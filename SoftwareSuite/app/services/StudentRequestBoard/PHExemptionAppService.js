define(['app'], function (app) {
    app.service("PHExemptionAppService", function (DataAccessService) {
        //Getdata for Board Side Student by ID
        this.GetReqPHExceptionByID = function (PHExceptionID) {
            var paramObject = { "PHExceptionID": PHExceptionID };
            var promise = DataAccessService.getDataWithPara('api/ReqPHExemption/GetReqReqPHExemptionByID', paramObject);
            return promise;
        }
        //Board Side Approved or Rejected
        this.UpdatePHExemptionApp = function (object) {
            var promise = DataAccessService.postData('api/ReqPHExemption/PostApprovedOrRejectedReqPHExemption', object);
            return promise;
        }

        this.GetCertPdf = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqAttendanceExemption/GetCertPdf', paramObject);
            return promise;
        }


    });
});