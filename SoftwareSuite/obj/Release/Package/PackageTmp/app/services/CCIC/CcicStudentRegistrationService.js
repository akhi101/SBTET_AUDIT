define(['app'], function (app) {
    app.service("CcicStudentRegistrationService", function (DataAccessService) {

        this.getCourseList = function () {
            return DataAccessService.getDataAll('api/CcicStudentRegistration/GetCcicCourses');
        };

        this.getInstitutionList = function () {
            return DataAccessService.getDataAll('api/CcicStudentRegistration/GetCcicInstitutions');
        };


        this.getInstitutionListByCourse = function (CourseId) {
            var paramObject = {
                "CourseId": CourseId
            };
            return DataAccessService.getDataWithPara('api/CcicStudentRegistration/GetCcicInstitutionsByCourse', paramObject);
        };

        this.getCourseListByInstitution = function (InstituteId) {
            var paramObject = {
                "InstitutionId": InstituteId
            };
            return DataAccessService.getDataWithPara('api/CcicStudentRegistration/GetCcicCoursesByInstitution', paramObject);
        };

        this.SendMail = function (CandidateEmail, InstitutionID, CourseID, CandidateName) {
            var paramObject = {
                "CandidateEmail": CandidateEmail, "InstitutionID": InstitutionID, "CourseID": CourseID, "CandidateName": CandidateName
            };
            return DataAccessService.postData('api/CcicStudentRegistration/SendMail', paramObject);
        };

        this.SendSms = function (CandidateMobile, InstitutionID, CourseID, CandidateName) {
            var paramObject = {
                "CandidateMobile": CandidateMobile, "InstitutionID": InstitutionID, "CourseID": CourseID, "CandidateName": CandidateName
            };
            return DataAccessService.postData('api/CcicStudentRegistration/SendSms', paramObject);
        };

       



        this.VerifyMailOtp = function (CandidateEmail, InstitutionID, CourseID, CandidateName, EmailOTP) {
            var paramObject = {
                "CandidateEmail": CandidateEmail, "InstitutionID": InstitutionID, "CourseID": CourseID, "CandidateName": CandidateName, "EmailOTP": EmailOTP
            };
            return DataAccessService.postData('api/CcicStudentRegistration/VerifyMailOtp', paramObject);
        };
        this.VerifyMobileOtp = function (CandidateMobile, InstitutionID, CourseID, CandidateName, MobileOTP) {
            var paramObject = {
                "CandidateMobile": CandidateMobile, "InstitutionID": InstitutionID, "CourseID": CourseID, "CandidateName": CandidateName, "MobileOTP": MobileOTP
            };
            return DataAccessService.postData('api/CcicStudentRegistration/VerifyMobileOtp', paramObject);
        };

        this.PostMultiplePaymentData = function (ReqData) {
            var promise = DataAccessService.postData('api/CcicStudentRegistration/PostMultipleApplicationPaymentdata', ReqData);
            return promise;
        };

       
      

    });

});