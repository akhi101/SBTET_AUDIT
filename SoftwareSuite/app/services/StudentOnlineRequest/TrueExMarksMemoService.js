define(['app'], function (app) {
    app.service("TrueExMarksMemoService", function (DataAccessService) {
        this.GetStudentInfoByHTNo = function (HallTicket) {
            var paramObject = { "HallTicket": HallTicket };
            var promise = DataAccessService.getDataWithPara('api/ReqTrueExMarksMemo/GetStudentInfoByHTNo', paramObject);
            return promise;
        }
        this.AddTrueExMarksMemo = function (object) {
            var promise = DataAccessService.postData('api/ReqTrueExMarksMemo/PostReqTrueExMarksMemo', object);
            return promise;
        }



        this.UpdateTrueExMarksMemo = function (object) {
            var promise = DataAccessService.postData('api/ReqTrueExMarksMemo/PostReqTrueExMarksMemo', object);
            return promise;
        }
        this.DeleteTrueExMarksMemo = function (TrueExMrkID) {
            var paramObject = { "TrueExMrkID": TrueExMrkID };
            var promise = DataAccessService.deleteData('api/ReqTrueExMarksMemo/DeleteReqTrueExMarksMemo', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetTrueExMarksMemoByID = function (TrueExMrkID) {
            var paramObject = { "TrueExMrkID": TrueExMrkID };
            var promise = DataAccessService.getDataWithPara('api/ReqTrueExMarksMemo/GetReqTrueExMarksMemoByID', paramObject);
            return promise;
        }
        this.GetReqTrueExMarksMemoByFormNoAndAcdYrID = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqTrueExMarksMemo/GetReqTrueExMarksMemoByFormNoAndAcdYrID', paramObject);
            return promise;
        }

    });
});