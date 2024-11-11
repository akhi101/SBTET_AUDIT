define(['app'], function (app) {
    app.service("CcicSystemUserService", function (DataAccessService) {


        this.GetCcicUserModules = function (UserTypeID) {
            var paramObject = { "UserTypeID": UserTypeID };
            var promise = DataAccessService.getDataWithPara('CcicSystemEntityRights/GetCcicUserModules', paramObject);
            return promise;
        }
        this.GetCcicUserSubModules = function (UserTypeID,ModuleID) {
            var paramObject = { "UserTypeID": UserTypeID,"ModuleID": ModuleID };
            var promise = DataAccessService.getDataWithPara('CcicSystemEntityRights/GetCcicUserSubModules', paramObject);
            return promise;
        }
        this.GetCcicUserInnerSubModules = function (UserTypeID, SubModuleID) {
            var paramObject = { "UserTypeID": UserTypeID, "SubModuleID": SubModuleID };
            var promise = DataAccessService.getDataWithPara('CcicSystemEntityRights/GetCcicUserInnerSubModules', paramObject);
            return promise;
        }

        this.GetCcicSubModules = function (UserName, ModuleID) {
            var paramObject = { "UserName": UserName, "ModuleID": ModuleID };
            var promise = DataAccessService.getDataWithPara('api/CcicSystemUser/GetCcicSubModules', paramObject);
            return promise;
        }

        //this.GetCcicUserLogin = function (Username, UserPassword, IPAddress, SessionID) {
        //    var paramObject = { "Username": Username, "UserPassword": UserPassword, "IPAddress": IPAddress, "SessionID": SessionID };
        //    var promise = DataAccessService.getDataWithPara('api/CcicSystemUser/GetCcicUserLogin', paramObject);
        //    return promise;
        //}

        this.GetCcicSystemUserById = function (CcicSysUserID) {
            var paramObject = { "CcicSysUserID": CcicSysUserID };
            var promise = DataAccessService.getDataWithPara('api/CcicSystemUser/GetCcicSystemUserById', paramObject);
            return promise;
        }

        this.GetEKey = function () {
            var promise = DataAccessService.getDataAll('api/CcicSystemUser/GetEKey');
            return promise;
        }

        this.GetSessionEKey = function () {
            var promise = DataAccessService.getDataAll('api/CcicSystemUser/GetSessionEKey');
            return promise;
        }


        this.PostCcicUserLogout = function (UserName, SessionID) {
            var paramObject = { "UserName": UserName, "SessionID": SessionID };
            var promise = DataAccessService.postData('api/CcicSystemUser/GetCcicUserLogout', paramObject);
            return promise;
        }
       

       



    })
})