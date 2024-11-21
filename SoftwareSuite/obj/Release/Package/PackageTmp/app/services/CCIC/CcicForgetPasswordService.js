define(['app'], function (app) {
    app.service("CcicForgetPasswordService", function (DataAccessService) {
        //this.GetCheckPreDetails = function (TypeFlag, LoginName, EmailId, CellNo) {
        //    var paramObject = { "TypeFlag": TypeFlag, "LoginName": LoginName, "EmailId": EmailId, "CellNo": CellNo };
        //    var promise = DataAccessService.getDataWithPara('api/SystemUser/GetCheckPreDetails', paramObject);
        //    return promise;
        //}
        this.GetCcicForgetPassword = function (reqdata) {
            var paramObject = reqdata;
            var promise = DataAccessService.postData('api/CcicSystemUser/GetCcicForgetPassword', paramObject);
            return promise;
        }

        this.GetCcicForgotPassword = function (reqdata) {
            var paramObject = reqdata;
            var promise = DataAccessService.postData('api/CcicSystemUser/GetCcicForgotPassword', paramObject);
            return promise;
        }




        this.SendCredentialsAsSMS = function (UserName, UserPassword, UserMobile) {
            var paramObject = { "UserName": UserName, "UserPassword": UserPassword, "UserMobile": UserMobile };
            var promise = DataAccessService.getDataWithPara('api/CcicSystemUser/SendCredentialsAsSMS', paramObject);
            return promise;
        }
    });
});