define(['app'], function (app) {
    app.service("DigitalSignatureService", function (DataAccessService) {

        this.GetAvailableCertificates = function () {
            var promise = DataAccessService.getDataWithParaCustomUrl('http://127.0.0.1:9000/sbtet/Certificate/GetAvailableCertificates');
            return promise;
        }

        this.VerifyCertificateForUser = function (SerialNumber) {
            var promise = DataAccessService.getDataWithParaCustomUrl('http://127.0.0.1:9000/sbtet/Certificate/VerifyCertificateUser', { "SerialNumber": SerialNumber});
            return promise;
        }

        this.GetUserCertificates = function () {
            var promise = DataAccessService.getDataAll('DigitalSignature/GetDigitalSignatures');
            return promise;
        }

        this.LinkUserCertificate = function (SerialNumber, Subject, NotBefore, NotAfter) {
            var paramObject = { "SerialNumber": SerialNumber, "Subject": Subject, "NotBefore": NotBefore, "NotAfter": NotAfter };
            var promise = DataAccessService.postData('DigitalSignature/SaveDigitalSignature', paramObject);
            return promise;
        }
    });
});