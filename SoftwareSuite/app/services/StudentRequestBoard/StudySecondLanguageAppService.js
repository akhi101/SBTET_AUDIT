define(['app'], function (app) {
    app.service("StudySecondLanguageAppService", function (DataAccessService) {
        this.GetReqStudySecondLanguageByID = function (SSLChngID) {
            var paramObject = { "SSLChngID": SSLChngID };
            var promise = DataAccessService.getDataWithPara('api/ReqStudySecondLanguage/GetReqStudySecondLanguageByID', paramObject);
            return promise;
        }
        this.UpdateStudySecondLanguageApp = function (object) {
            var promise = DataAccessService.postData('api/ReqStudySecondLanguage/PostApprovedReqStudySecondLanguage', object);
            return promise;
        }
        this.GetCertPdf = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqStudySecondLanguage/GetCertPdf', paramObject);
            return promise;
        }
    });
});