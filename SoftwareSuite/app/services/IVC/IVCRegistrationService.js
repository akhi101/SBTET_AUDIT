define(['app'], function (app) {
    app.service("IVCRegistrationService", function (DataAccessService) {

        this.SendSms = function (CandidateMobile, CandidateName) {
            var paramObject = {
                "CandidateMobile": CandidateMobile, "CandidateName": CandidateName
            };
            return DataAccessService.postData('api/IVCRegistration/SendMobileOTP', paramObject);
        };


        this.VerifyMobileOtp = function (CandidateMobile, CandidateName, MobileOTP) {
            var paramObject = {
                "CandidateMobile": CandidateMobile, "CandidateName": CandidateName, "MobileOTP": MobileOTP
            };
            return DataAccessService.postData('api/IVCRegistration/VerifyMobileOtp', paramObject);
        };

        this.SubmitStdDetails = function (StudentName, RegistrationMobile, RegistrationEmail, RegistrationPassword) {
            var paramObject = {
                "StudentName": StudentName, "RegistrationMobile": RegistrationMobile,
                "RegistrationEmail": RegistrationEmail, "RegistrationPassword": RegistrationPassword
            };
            return DataAccessService.postData('api/IVCRegistration/StdRegistration', paramObject);
        };
        this.GetCategories = function () {
            return DataAccessService.getDataAll('api/IVCRegistration/GetCategories');
        };

        this.GetRegions = function () {
            return DataAccessService.getDataAll('api/IVCRegistration/GetRegions');
        };


        this.GetMinorities = function () {
            return DataAccessService.getDataAll('api/IVCRegistration/GetMinorities');
        };
    })
})