define(['app'], function (app) {
    app.service("BasicDistrictsService", function (DataAccessService) {
        this.AddBasicDistricts = function (object) {
            var promise = DataAccessService.putData('api/BasicDistricts/PutBasicDistricts', object);
            return promise;
        } 
        this.PostBasicDistrictsInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicDistricts/PostBasicDistrictsInsert', object);
            return promise;
        }
        this.UpdateBasicDistricts = function (object) {
            var promise = DataAccessService.postData('api/BasicDistricts/PostBasicDistricts', object);
            return promise;
        }
        this.DeleteBasicDistricts = function (DistrictID, UpdLoginID) {
            var paramObject = {
                "DistrictID": DistrictID, "UpdLoginID": UpdLoginID
            };
            var promise = DataAccessService.deleteData('api/BasicDistricts/DeleteBasicDistricts', paramObject);
            return promise;
        }
        this.GetBasicDistrictList = function () {
            var data = DataAccessService.getDataAll('api/BasicDistricts/GetBasicDistrictsList');
            return data;
        }
        this.GetBasicDistrictListByCode = function () {
            var data = DataAccessService.getDataAll('api/BasicDistricts/GetBasicDistrictListByCode');
            return data;
        }
        this.GetBasicDistrictsForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicDistricts/GetBasicDistrictsForList', paramObject);
            return data;
        }
        this.GetBasicDistrictsByDistrictID = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetBasicDistrictsByDistrictID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetBasicDistrictListByDistrictIds = function (DistrictIDs) {
            var paramObject = { "DistrictID": DistrictIDs };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetBasicDistrictListByDistrictId', paramObject);
            return promise;
        }
        this.GetBasicDistrictListByUserGroupId = function (DistrictIDs, UsrGrpID, CurrentUserGroupId) {
            var paramObject = { "DistrictID": DistrictIDs, "UsrGrpID": UsrGrpID, "CurrentUserGroupId": CurrentUserGroupId };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetBasicDistrictListByUserGroupId', paramObject);
            return promise;
        }
        this.GetDistrictListForCOE = function (ExamInstID, ZoneType) {
            var paramObject = { "ExamInstID": ExamInstID, "ZoneType": ZoneType };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetDistrictListForCOE', paramObject);
            return promise;
        }
        this.GetBasicDistrictListByUserId = function (UpdLoginID) {
            var paramObject = { "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetBasicDistrictListByUserId', paramObject);
            return promise;
        }
    });
});