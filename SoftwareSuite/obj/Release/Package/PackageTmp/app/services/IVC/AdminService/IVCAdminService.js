define(['app'], function (app) {
    app.service("IVCAdminService", function (DataAccessService) {

        this.GetCaptchaString10 = function () {
            return DataAccessService.getDataAll('api/IVCAdminService/GetCaptchaString10');
        };

        this.GetCaptchaString = function (SessionId) {
            var paramObject = { "SessionId": SessionId };
            return DataAccessService.getDataWithPara('api/IVCAdminService/GetCaptchaString', paramObject);
        };


        this.ValidateCaptcha = function (SessionId, Captcha) {
            var paramObject = { "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.postData('api/IVCAdminService/ValidateCaptcha', paramObject);
        };

        this.GetTenthYears = function () {
            return DataAccessService.postData('api/IVCAdminService/GetTenthYears');
        };

        this.GetQualifiedExams = function () {
            return DataAccessService.postData('api/IVCAdminService/GetQualifiedExams');
        };

        this.AddStudentPersonalDetails = function (paramObject) {

            return DataAccessService.postData('api/IVCAdminService/AddStudentPersonalDetails', paramObject);
        };

        this.AddStudentCommunicationDetails = function (paramObject) {

            return DataAccessService.postData('api/IVCAdminService/AddStudentCommunicationDetails', paramObject);
        };

        this.AddStudentCategoryDetails = function (paramObject) {

            return DataAccessService.postData('api/IVCAdminService/AddStudentCategoryDetails', paramObject);
        };

        this.AddStudentSpecialCategoryDetails = function (paramObject) {

            return DataAccessService.postData('api/IVCAdminService/AddStudentSpecialCategoryDetails', paramObject);
        };

        this.AddStudentStudyDetails = function (paramObject) {

            return DataAccessService.postData('api/IVCAdminService/AddStudentStudyDetails', paramObject);
        };

        this.SetApplicationSubmit = function (RegistrationID) {
            var paramObj = {
                "RegistrationID": RegistrationID
            };
            var promise = DataAccessService.getDataWithPara('api/IVCAdminService/SetApplicationSubmit', paramObj);
            return promise;
        };

        this.GetStudentFeeData = function (RegistrationID) {
            var paramObject = { "RegistrationID": RegistrationID };
            return DataAccessService.getDataWithPara('api/IVCAdminService/GetStudentFeeData', paramObject);
        };

        this.GetDashboardStatus = function (RegistrationID) {
            var paramObject = { "RegistrationID": RegistrationID };
            return DataAccessService.getDataWithPara('api/IVCAdminService/GetDashboardStatus', paramObject);
        };

        this.GetStudentApplicationData = function (RegistrationID) {
            var paramObject = { "RegistrationID": RegistrationID };
            return DataAccessService.getDataWithPara('api/IVCAdminService/GetStudentApplicationData', paramObject);
        };


        this.GetStudentDetails = function (RegistrationID) {
            var paramObj = {
                "RegistrationID": RegistrationID
            };
            var promise = DataAccessService.postData('api/IVCAdminService/GetStudentDetails', paramObj);
            return promise;
        };


        this.GetStates = function () {
            return DataAccessService.getDataAll('api/IVCAdminService/GetStates');
        };

        this.GetDistrictsbyState = function (DataType, StateID) {
            var paramObject = { "DataType": DataType, "StateID": StateID };
            return DataAccessService.getDataWithPara('api/IVCAdminService/GetDistrictsbyState', paramObject);
        };

        this.GetMandalsbyDistrict = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            return DataAccessService.getDataWithPara('api/IVCAdminService/GetMandalsbyDistrict', paramObject);
        };


        this.GetIVCEWSVerification = function (applicationNo, userid) {
            var paramObject = { "applicationNo": applicationNo, "userid": userid };
            console.log(paramObject)
            return DataAccessService.postData('api/IVCAdminService/GetIVCEWSVerification', paramObject);
        };

        this.GetCasteDetails = function (applicationNo, userid) {
            var paramObject = { "applicationNo": applicationNo, "userid": userid };
            console.log(paramObject)
            return DataAccessService.postData('api/IVCAdminService/GetCasteDetails', paramObject);
        };

        this.GetIVCCourses = function (IVCYear) {
            var paramObject = { "IVCYear": IVCYear };
            return DataAccessService.getDataWithPara('api/IVCAdminService/GetIVCCourses', paramObject);
        };

        this.GetLEPCourses = function (IVCCourseID) {
            var paramObject = { "IVCCourseID": IVCCourseID };
            return DataAccessService.getDataWithPara('api/IVCAdminService/GetLEPCourses', paramObject);
        };

    })
})