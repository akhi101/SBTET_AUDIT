define(['app'], function (app) {
    app.service("IVCSystemUserService", function (DataAccessService) {
        
        this.GetEKey = function () {
            var promise = DataAccessService.getDataAll('api/IVCSystemUser/GetEKey');
            return promise;
        }

        this.GetSessionEKey = function () {
            var promise = DataAccessService.getDataAll('api/IVCSystemUser/GetSessionEKey');
            return promise;
        }
       
        this.GetIVCOfficialLogin = function (Username, UserPassword, IPAddress, SessionID) {
            var paramObject = { "Username": Username, "UserPassword": UserPassword, "IPAddress": IPAddress, "SessionID": SessionID };
            var promise = DataAccessService.getDataWithPara('api/IVCSystemUser/GetIVCUserLogin', paramObject);
            return promise;
        }

        this.GetIVCStudentLogin = function (Username, UserPassword, IPAddress, SessionID) {
            var paramObject = { "Username": Username, "UserPassword": UserPassword, "IPAddress": IPAddress, "SessionID": SessionID };
            var promise = DataAccessService.getDataWithPara('api/IVCSystemUser/GetIVCUserLogin', paramObject);
            return promise;
        }

    });
});