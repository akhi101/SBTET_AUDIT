define(['app'], function (app) {
    app.service("DupTripPassCertService", function (DataAccessService) {
        this.AddDupTripPassCert = function (object) {
            var promise = DataAccessService.postData('api/ReqDupTripPassCert/PostReqDupTripPassCert', object);
            return promise;
        }
        this.UpdateDupTripPassCert = function (object) {
            var promise = DataAccessService.postData('api/ReqDupTripPassCert/ReApplyDupTripPassCert', object);
            return promise;
        }
        this.DeleteDupTripPass = function (PassCertID) {
            var paramObject = { "PassCertID": PassCertID };
            var promise = DataAccessService.deleteData('api/ReqDupTripPassCert/DeleteReqDupTripPassCert', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetDupTripPassByID = function (PassCertID) {
            var paramObject = { "PassCertID": PassCertID };
            var promise = DataAccessService.getDataWithPara('api/ReqDupTripPassCert/GetReqDupTripPassCertByID', paramObject);
            return promise;
        }
        this.GetStudentInfo = function (HTNO, DupTripFlag) {
            var paramObject = { "HTNO": HTNO, "DupTripFlag": DupTripFlag };
            var promise = DataAccessService.getDataWithPara('api/ReqDupTripPassCert/GetStudentInfo', paramObject);
            return promise;
        }

        this.GetCandidatePhoto = function (HTNO) {
            var paramObject = { "HTNO": HTNO };
            var promise = DataAccessService.getDataWithPara('api/ReqDupTripPassCert/GetCandidatePhoto', paramObject);
            return promise;
        }

        this.GetSubjectName = function (subCode) {
            var paramObject = [];
            var paramObject = { "SubjectCode": subCode };
            var promise = DataAccessService.getDataWithPara('api/ReqDupTripPassCert/GetSubjectName', paramObject);
            return promise;
        }
        this.GetDataByFormNo = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqDupTripPassCert/GetReApplyDataByFormNo', paramObject);
            return promise;
        }

        this.GetReqDupTripPassCertByFormNoAndAcdYrID = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqDupTripPassCert/GetReqDupTripPassCertByFormNoAndAcdYrID', paramObject);
            return promise;
        }
         
    });
});