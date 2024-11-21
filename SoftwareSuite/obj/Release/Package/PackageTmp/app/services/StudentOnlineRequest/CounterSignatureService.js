define(['app'], function (app) {
    app.service("CounterSignatureService", function (DataAccessService) {
        this.GetCounterSignatureByHTNo = function (HTNO) {
            var paramObject = { "HallTicket": HTNO };
            var promise = DataAccessService.getDataWithPara('api/ReqCounterSignature/GetReqCountSignByHTNo', paramObject);
            return promise;
        }
        this.AddCounterSignature = function (object) {
            var promise = DataAccessService.postData('api/ReqCounterSignature/PostReqCounterSignature', object);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        //this.GetStateList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicState/GetBasicStateList');
        //    return data;
        //}
        this.GetPreStudentInfo = function (HTNO) {
            var paramObject = { "HTNO": HTNO };
            var promise = DataAccessService.getDataWithPara('api/ReqCounterSignature/PutReqCounterSignature', paramObject);
            return promise;
        }
    });
});