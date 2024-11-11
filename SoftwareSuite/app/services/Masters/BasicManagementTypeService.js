define(['app'], function (app) {
	app.service("BasicManagementTypeService", function (DataAccessService) {
		this.AddBasicManagementType = function (object) {
			var promise = DataAccessService.putData('api/BasicManagementType/PutBasicManagementType', object);
            return promise;
        }
        this.PostBasicManagementTypeInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicManagementType/PostBasicManagementTypeInsert', object);
            return promise;
        }
		this.UpdateBasicManagementType = function (object) {
			var promise = DataAccessService.postData('api/BasicManagementType/PostBasicManagementType', object);
            return promise;
        }
        this.DeleteBasicManagementType = function (MngtTypID, UpdLoginID) {
            var paramObject = { "MngtTypID": MngtTypID, "UpdLoginID": UpdLoginID};
			var promise = DataAccessService.deleteData('api/BasicManagementType/DeleteBasicManagementType', paramObject);
            return promise;
        }
		this.GetBasicManagementTypeList = function () {
			var data = DataAccessService.getDataAll('api/BasicManagementType/GetBasicManagementTypeList');
            return data;
        }
        this.GetBasicManagementTypeForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicManagementType/GetBasicManagementTypeForList', paramObject);
            return data;
        }
        this.GetBasicManagementTypeById = function (MngtTypID) {
			var paramObject = { "MngtTypID": MngtTypID };
            var promise = DataAccessService.getDataWithPara('api/BasicManagementType/GetBasicManagementTypeById', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (MngtTypID) {
			var paramObject = { "MngtTypID": MngtTypID };
			var promise = DataAccessService.getDataWithPara('api/BasicManagementType/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});