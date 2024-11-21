define(['app'], function (app) {
    app.service("SystemUserService", function (DataAccessService) {
        this.GetSystemUsereList = function () {
            var data = DataAccessService.getDataAll('api/SystemUser/GetSystemUserList');
            return data;
        }
        this.GetSystemUserListForAuditTrailReport = function (TypeFlag) {
            var paramObject = { "TypeFlag": TypeFlag };
            var data = DataAccessService.getDataWithPara('api/SystemUser/GetSystemUserListForAuditTrailReport', paramObject);
            return data;
        }
        this.GetSystemUserById = function (SysUserID) {
            var paramObject = { "SysUserID": SysUserID };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetSystemUserById', paramObject);
            return promise;
        }

        this.GetModulesbyRole = function (UserTypeId) {
            var paramObject = { "UserTypeId": UserTypeId };
            var promise = DataAccessService.getDataWithPara('SystemEntityRights/GetModulesbyRole', paramObject);
            return promise;
        }
        this.GetSubModulesbyRole = function (UserTypeId, moduleId) {
            var paramObject = { "UserTypeId": UserTypeId, "moduleId": moduleId };
            var promise = DataAccessService.getDataWithPara('SystemEntityRights/GetSubModulesbyRole', paramObject);
            return promise;
        }
        this.GetUserRightsById = function (SysModID, SysUsrGrpID) {
            //var data = DataAccessService.getDataAll('api/SystemUser/GetSystemUserList');
            //return data;
            var paramObject = { "SysModID": SysModID, "SysUsrGrpID": parseInt(SysUsrGrpID) };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetUsersRightsById', paramObject);
            return promise;
            // var data = DataAccessService.getDataAll('api/BasicSubCaste/GetBasicSubCasteList');
            //return data;
        }
        //this.GetUserRightsById = function (usertypeid) {
        //    //var data = DataAccessService.getDataAll('api/SystemUser/GetSystemUserList');
        //    //return data;
        //    var paramObject = {"usertypeid": parseInt(usertypeid)};
        //    var promise = DataAccessService.getDataWithPara('api/SystemUser/GetUsersRightsById', paramObject);
        //    return promise;
        //    // var data = DataAccessService.getDataAll('api/BasicSubCaste/GetBasicSubCasteList');
        //    //return data;
        //}
        this.GetCheckDependancy = function (SysUserID) {
            var paramObject = { "SysUserID": SysUserID };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetCheckPreDetails = function (TypeFlag, LoginName, EmailId, CellNo) {
            var paramObject = { "TypeFlag": TypeFlag, "LoginName": LoginName, "EmailId": EmailId, "CellNo": CellNo };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetCheckPreDetails', paramObject);
            return promise;
        }
        this.GetUserProfileDetailsById = function (SysUserID) {
            var paramObject = { "SysUserID": SysUserID };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetUserProfileDetailsById', paramObject);
            return promise;
        }
        this.GetUpdateSystemUserLog = function (xFrmString, xFrmProgramID, xFrmOpenedByUserID) {
            var paramObject = { "xFrmString": xFrmString, "xFrmProgramID": xFrmProgramID, "xFrmOpenedByUserID": xFrmOpenedByUserID };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetUpdateSystemUserLog', paramObject);
            return promise;
        }
        this.GetUpdateSystemUserLog = function (xFrmString, xFrmProgramID, xFrmOpenedByUserID) {
            var paramObject = { "xFrmString": xFrmString, "xFrmProgramID": xFrmProgramID, "xFrmOpenedByUserID": xFrmOpenedByUserID };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetUpdateSystemUserLog', paramObject);
            return promise;
        }
        this.GetLoginAccess = function (userName) {

            var paramObject = { "UserName": userName };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetLoginAccess', paramObject);
            return promise;
        }
        this.postUserLogin = function (userName) {
            var paramObject = { "UserName": userName };
            var promise = DataAccessService.postData('api/SystemUser/PostLoginLog', paramObject);
            return promise;
        }
        this.postUserLogout = function (userName) {
            var paramObject = { "UserName": userName };
            var promise = DataAccessService.postData('api/SystemUser/PostLogoutLog', paramObject);
            return promise;
        }
        this.GetUserLoginPermissions = function (username, password) {
            var paramObject = { "username": username, "password": password };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetUserLoginPermissions', paramObject);
            return promise;
        }
        this.GetSubModules = function (username, moduleid) {
            var paramObject = { "UserName": userName, "moduleid": moduleid };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetSubModules', paramObject);
            return promise;
        }
        this.GetEKey = function () {
            var promise = DataAccessService.getDataAll('api/SystemUser/GetEKey');
            return promise;
        }

        this.GetSessionEKey = function () {
            var promise = DataAccessService.getDataAll('api/SystemUser/GetSessionEKey');
            return promise;
        }
        this.GetStudentData = function (PIN) {
            var paramObject = { "PIN": PIN };
            var promise = DataAccessService.getDataWithPara('Admission/GetStudentData', paramObject);
            return promise;
        }
        this.GetCertificate = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetCertificate');
            return promise;
        }

        this.GetForgotPassword = function (reqdata) {
            var paramObject = reqdata;
            var promise = DataAccessService.postData('api/SystemUser/GetForgotPassword', paramObject);
            return promise;
        }

       
    });
});