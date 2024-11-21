define(['app'], function (app) {
    app.service("SystemUserGroupService", function (DataAccessService) {
        this.AddSystemUserGroup = function (object) {
            var promise = DataAccessService.putData('api/SystemUserGroup/PutSystemUserGroup', object);
            return promise;
        }
        this.UpdateSystemUserGroup = function (object) {
            var promise = DataAccessService.postData('api/SystemUserGroup/PostSystemUserGroup', object);
            return promise;
        }
        this.DeleteSystemUserGroup = function (SysUsrGrpID) {
            var paramObject = { "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.deleteData('api/SystemUserGroup/DeleteSystemUserGroup', paramObject);
            return promise;
        }
        this.GetSystemUserGroupList = function () {
            var data = DataAccessService.getDataAll('api/SystemUserGroup/GetSystemUserGroupList');
            return data;
        }
        this.GetSystemUserGroupById = function (SysUsrGrpID) {
            var paramObject = { "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.getDataWithPara('api/SystemUserGroup/GetSystemUserGroupById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (SysUsrGrpID) {
            var paramObject = { "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.getDataWithPara('api/SystemUserGroup/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetSystemModuleList = function () {
            var data = DataAccessService.getDataAll('api/SystemUserGroup/GetSystemModuleList');
            return data;
        }
        this.GetSystemProgramList = function (SysModID, SysUsrGrpID) {
            var paramObject = { "SysModID": SysModID, "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.getDataWithPara('api/SystemUserGroup/GetSystemProgramList', paramObject);
            return promise;
        }
        this.GetUserGroupRightsDetailsReport = function (SysUsrGrpID) {
            var paramObject = { "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.getDataWithPara('api/SystemEntityRights/GetUserGroupRightsDetailsReport', paramObject);
            return promise;
        }
        
    });
});