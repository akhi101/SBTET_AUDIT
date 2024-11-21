define(['app'], function (app) {
    app.service("UserGroupMasterService", function (DataAccessService) {
        this.AddUserGroupMaster= function (object) {
            var promise = DataAccessService.postData('api/UserGroupMaster/PostUserGroupMaster', object);
            return promise;
        }
        this.UpdateUserGroupMaster = function (object) {
            var promise = DataAccessService.postData('api/UserGroupMaster/PostUserGroupMaster', object);
            return promise;
        }
        this.DeleteUserGroupMaster = function (SysUsrGrpID) {
            var paramObject = { "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.deleteData('api/UserGroupMaster/DeleteUserGroupMaster', paramObject);
            return promise;
        }
        this.GetUserGroupMasterList = function () {
            var data = DataAccessService.getDataAll('api/UserGroupMaster/GetUserGroupMasterList');
            return data;
        }
        this.GetUserGroupMasterForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/UserGroupMaster/GetUserGroupMasterForList', paramObject);
            return data;
        }
        this.GetUserGroupMasterById = function (SysUsrGrpID) {
            var paramObject = { "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.getDataWithPara('api/UserGroupMaster/GetUserGroupMasterById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (SysUsrGrpID) {
            var paramObject = { "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.getDataWithPara('api/UserGroupMaster/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetSystemModuleList = function () {
            var data = DataAccessService.getDataAll('api/UserGroupMaster/GetSystemModuleList');
            return data;
        }
        this.GetSystemProgramList = function (SysModID, SysUsrGrpID) {
            var paramObject = { "SysModID": SysModID, "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.getDataWithPara('api/UserGroupMaster/GetSystemProgramList', paramObject);
            return promise;
        }
    });
});