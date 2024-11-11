define(['app'], function (app) {
    app.service("ReCountingService", function (DataAccessService) {
        //this.AddReCounting = function (object) {
        //    var promise = DataAccessService.postData('api/ReqReCounting/PostReqReCountin', object);
        //    return promise;
        //}
        this.AddReCounting = function (object) {
            var promise = DataAccessService.postData('api/ReqReCounting/PostReqReCountings', object);
            return promise;
        }
        this.UpdateDupTripPass = function (object) {
            var promise = DataAccessService.postData('api/ReqReCounting/PostReqReCounting', object);
            return promise;
        }
        this.DeleteDupTripPass = function (PassCertID) {
            var paramObject = { "PassCertID": PassCertID };
            var promise = DataAccessService.deleteData('api/ReqReCounting/DeleteReqReCounting', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetDupTripPassByID = function (ReCntMrkID) {
            var paramObject = { "ReCntMrkID": ReCntMrkID };
            var promise = DataAccessService.getDataWithPara('api/ReqReCounting/GetReqReCountingByID', paramObject);
            return promise;
        }
        this.GetPreStudentInfo = function (HTNO) {
            var paramObject = { "HTNO": HTNO };
            var promise = DataAccessService.getDataWithPara('api/ReqReCounting/GetPreStudentInfoForReCounting', paramObject);
            return promise;
        }

        this.GetReqReCountingByFormNoAndAcdYrID = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqReCounting/GetReqReCountingByFormNoAndAcdYrID', paramObject);
            return promise;
        }
        this.GetSubjectMarksInfoCheck = function (HTNO, ExmSubID, AcdYrID) {
            var paramObject = { "HTNO": HTNO, "ExmSubID": ExmSubID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ReqReCounting/GetSubjectMarksInfoCheck', paramObject);
            return promise;
        }

    });
});