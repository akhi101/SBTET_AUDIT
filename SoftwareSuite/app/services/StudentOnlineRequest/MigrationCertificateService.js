define(['app'], function (app) {
    app.service("MigrationCertificateService", function (DataAccessService) {
        this.AddMigrationCertificate = function (object) {
            var promise = DataAccessService.postData('api/ReqMigrCert/PostReqMigrCert', object);
            return promise;
        }
        //this.UpdateMigrationCertificate = function (object) {
        //    var promise = DataAccessService.postData('api/ReqMigrCert/PostReqMigrCert', object);
        //    return promise;
        //}
        this.DeleteMigrationCertificate = function (MigrCertID) {
            var paramObject = { "MigrCertID": MigrCertID };
            var promise = DataAccessService.deleteData('api/ReqMigrCert/DeleteReqMigrCert', paramObject);
            return promise;
        }
        this.GetReqMigrCertByFormNoAndAcdYrID = function (FormNo, AcdYrID) {
            var paramObject = { "FormNo": FormNo, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ReqMigrCert/GetReqMigrCertByFormNoAndAcdYrID', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetReqMigrCertByID = function (MigrCertID) {
            var paramObject = { "MigrCertID": MigrCertID };
            var promise = DataAccessService.getDataWithPara('api/ReqMigrCert/GetReqMigrCertByID', paramObject);
            return promise;
        }
        //Anil's
        this.GetPreStudentInfoByHTNO = function (HTNO) {
            var paramObject = { "HTNO": HTNO };
            var promise = DataAccessService.getDataWithPara('api/ReqMigrCert/GetPreStudentInfoByHTNO', paramObject);
            return promise;
        }
        this.GetAckReport = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqMigrCert/CreateAckReport', paramObject);
            return promise;
        }
        this.GetPreStudentInfo = function (HTNO, AcdYrID) {
            var paramObject = { "HTNO": HTNO, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ReqMigrCert/GetPreStudentInfo', paramObject);
            return promise;
        }
        this.GetBasicAcademicYearListForRequests = function () {
            var data = DataAccessService.getDataAll('api/BasicAcademicYear/GetBasicAcademicYearListForRequests');
            return data;
        }
    });
});