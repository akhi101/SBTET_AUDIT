define(['app'], function (app) {
    app.service("ForgetPasswordService", function (DataAccessService) {
        //this.GetCheckPreDetails = function (TypeFlag, LoginName, EmailId, CellNo) {
        //    var paramObject = { "TypeFlag": TypeFlag, "LoginName": LoginName, "EmailId": EmailId, "CellNo": CellNo };
        //    var promise = DataAccessService.getDataWithPara('api/SystemUser/GetCheckPreDetails', paramObject);
        //    return promise;
        //}
        this.GetForgetPassword = function (reqdata) {
            var paramObject = reqdata;
            var promise = DataAccessService.postData('api/SystemUser/GetForgetPassword', paramObject);
            return promise;
        }
        this.SendCredentialsAsSMS = function (LoginName, LoginPassword, CellNo) {
            var paramObject = {"LoginName": LoginName, "LoginPassword": LoginPassword, "CellNo": CellNo };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/SendCredentialsAsSMS', paramObject);
            return promise;
        }

        this.GetForgotPassword = function (reqdata) {
            var paramObject = reqdata;
            var promise = DataAccessService.postData('api/SystemUser/GetForgotPassword', paramObject);
            return promise;
        }
    });
});