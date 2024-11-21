define(['app'], function (app) {
    app.service("ReverifService", function (DataAccessService) {
        this.AddReCounting = function (object) {
            var promise = DataAccessService.putData('api/ReqReCounting/PutReqReCounting', object);
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


        //Get Data
        this.GetPreStudentInfo = function (HTNO) {
            var paramObject = { "HTNO": HTNO };
            var promise = DataAccessService.getDataWithPara('api/ReqReverif/GetPreStudentInfoForReverify', paramObject);
            return promise;
        }
        //Insert
        this.AddReverif = function (object) {
            var promise = DataAccessService.postData('api/ReqReverif/PostReqReverify', object);
            return promise;
        }
        




        this.GetReqReCountingByFormNoAndAcdYrID = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqReCounting/GetReqReCountingByFormNoAndAcdYrID', paramObject);
            return promise;
        }

    });
});




//define(['app'], function (app) {
//    app.service("ReverifService", function (DataAccessService) {
//        this.AddReverif = function (object) {
//            var promise = DataAccessService.putData('api/ReqReverif/PutReqReverif', object);
//            return promise;
//        }
//        this.UpdateReverif = function (object) {
//            var promise = DataAccessService.postData('api/ReqReverif/PostReqReverif', object);
//            return promise;
//        }
//        this.DeleteReverif = function (PassCertID) {
//            var paramObject = { "PassCertID": PassCertID };
//            var promise = DataAccessService.deleteData('api/ReqReverif/DeleteReqReverif', paramObject);
//            return promise;
//        }
//        this.GetAcademicYearFeesByCode = function (FeesCode) {
//            var paramObject = { "FeesCode": FeesCode };
//            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
//            return promise;
//        }
//        this.GetReverifByID = function (PassCertID) {
//            var paramObject = { "PassCertID": PassCertID };
//            var promise = DataAccessService.getDataWithPara('api/ReqReverif/GetReqReverifByID', paramObject);
//            return promise;
//        }
//        this.GetPreStudentInfo = function (HTNO) {
//            var paramObject = { "HTNO": HTNO };
//            var promise = DataAccessService.getDataWithPara('api/ReqReCounting/GetPreStudentInfoForReCounting', paramObject);
//            return promise;
//        }


//        this.GetReqReverifByFormNoAndAcdYrID = function (FormNo) {
//            var paramObject = { "FormNo": FormNo };
//            var promise = DataAccessService.getDataWithPara('api/ReqReverif/GetReqReverifByFormNoAndAcdYrID', paramObject);
//            return promise;
//        }

//    });
//});