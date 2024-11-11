define(['app'], function (app) {
	app.service("BasicManagementService", function (DataAccessService) {
		this.AddBasicManagement = function (object) {
			var promise = DataAccessService.putData('api/BasicManagement/PutBasicManagement', object);
            return promise;
        }
        this.PostBasicManagementInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicManagement/PostBasicManagementInsert', object);
            return promise;
        }
		this.UpdateBasicManagement = function (object) {
			var promise = DataAccessService.postData('api/BasicManagement/PostBasicManagement', object);
            return promise;
        }
        this.DeleteBasicManagement = function (MngtID, UpdLoginID) {
            var paramObject = { "MngtID": MngtID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicManagement/DeleteBasicManagement', paramObject);
            return promise;
        }
		this.GetBasicManagementList = function () {
			var data = DataAccessService.getDataAll('api/BasicManagement/GetBasicManagementList');
            return data;
        }
        this.GetBasicManagementForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicManagement/GetBasicManagementForList', paramObject);
            return data;
        }
        this.GetBasicManagementById = function (MngtID) {
			var paramObject = { "MngtID": MngtID };
            var promise = DataAccessService.getDataWithPara('api/BasicManagement/GetBasicManagementById', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (MngtID) {
			var paramObject = { "MngtID": MngtID };
			var promise = DataAccessService.getDataWithPara('api/BasicManagement/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});