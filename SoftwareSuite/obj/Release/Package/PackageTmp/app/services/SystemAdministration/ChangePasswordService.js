define(['app'], function (app) {
    app.service("ChangePasswordService", function (DataAccessService) {
        this.GetCheckOldPassword = function (reqdata) {
            var paramObject = reqdata ;
            var promise = DataAccessService.postData('api/SystemUser/GetCheckOldPassword', paramObject);
            return promise;
        }
        this.GetChangePassword = function (reqdata) {
            var paramObject = reqdata;
            var promise = DataAccessService.postData('api/SystemUser/GetChangePassword', paramObject);
            return promise;
        }
    });
});