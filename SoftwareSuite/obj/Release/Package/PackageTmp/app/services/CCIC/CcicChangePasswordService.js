define(['app'], function (app) {
    app.service("CcicChangePasswordService", function (DataAccessService) {


        this.GetCcicChangePassword = function (reqdata) {
            var paramObject = reqdata;
            var promise = DataAccessService.postData('api/CcicSystemUser/GetCcicChangePassword', paramObject);
            return promise;
        }


        this.GetCcicCheckOldPassword = function (reqdata) {
            var paramObject = reqdata;
            var promise = DataAccessService.postData('api/CcicSystemUser/GetCcicCheckOldPassword', paramObject);
            return promise;
        }


        });
});