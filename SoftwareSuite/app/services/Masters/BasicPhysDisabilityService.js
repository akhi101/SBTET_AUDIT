define(['app'], function (app) {
	app.service("BasicPhysDisabilityService", function (DataAccessService) {
		this.AddBasicPhysDisability = function (object) {
			var promise = DataAccessService.putData('api/BasicPhysDisability/PutBasicPhysDisability', object);
            return promise;
        }
        this.PostBasicPhysDisabilityInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicPhysDisability/PostBasicPhysDisabilityInsert', object);
            return promise;
        }
		this.UpdateBasicPhysDisability = function (object) {
			var promise = DataAccessService.postData('api/BasicPhysDisability/PostBasicPhysDisability', object);
            return promise;
        }
		this.DeleteBasicPhysDisability = function (PhysDisbID,UpdLoginID) {
			var paramObject = { "PhysDisbID": PhysDisbID, "UpdLoginID": UpdLoginID};
			var promise = DataAccessService.deleteData('api/BasicPhysDisability/DeleteBasicPhysDisability', paramObject);
            return promise;
        }
		this.GetBasicPhysDisabilityList = function () {
			var data = DataAccessService.getDataAll('api/BasicPhysDisability/GetBasicPhysDisabilityList');
            return data;
        }
        this.GetBasicPhysDisabilityForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicPhysDisability/GetBasicPhysDisabilityForList', paramObject);
            return data;
        }
		this.GetBasicPhysDisabilityListByID = function (PhysDisbID) {
			var paramObject = { "PhysDisbID": PhysDisbID };
			var promise = DataAccessService.getDataWithPara('api/BasicPhysDisability/GetBasicPhysDisabilityByID', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (PhysDisbID) {
			var paramObject = { "PhysDisbID": PhysDisbID };
			var promise = DataAccessService.getDataWithPara('api/BasicPhysDisability/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});