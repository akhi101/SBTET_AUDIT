define(['app'], function (app) {
    app.service("BasicSubGroupService", function (DataAccessService) {
        this.AddBasicSubGroup = function (object) {
            var promise = DataAccessService.putData('api/BasicSubGroup/PutBasicSubGroup', object);
            return promise;
        }
        this.PostBasicSubGroupInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicSubGroup/PostBasicSubGroupInsert', object);
            return promise;
        }
        this.UpdateBasicSubGroup = function (object) {
            var promise = DataAccessService.postData('api/BasicSubGroup/PostBasicSubGroup', object);
            return promise;
        }
        this.DeleteBasicSubGroup = function (SubGrpID, UpdLoginID) {
            var paramObject = { "SubGrpID": SubGrpID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicSubGroup/DeleteBasicSubGroup', paramObject);
            return promise;
        }
        this.GetBasicSubGroupList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubGroup/GetBasicSubGroupList');
            return data;
        }
        this.GetBasicSubGroupForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicSubGroup/GetBasicSubGroupForList', paramObject);
            return data;
        }
        this.GetBasicSubGroupByID = function (SubGrpID) {
            var paramObject = { "SubGrpID": SubGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicSubGroup/GetBasicSubGroupByID', paramObject);
            return promise;
        }
        this.GetBasicSubGroupByMainGrpID = function (MainGrpID) {
            var paramObject = { "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicSubGroup/GetBasicSubGroupByMainGrpID', paramObject);
            return promise;
        }
		this.GetBasicMainGroupList = function () {
			var data = DataAccessService.getDataAll('api/BasicMainGroup/GetBasicMainGroupList');
			return data;
		}
        this.GetCheckDependancy = function (SubGrpID) {
            var paramObject = { "SubGrpID": SubGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicSubGroup/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});