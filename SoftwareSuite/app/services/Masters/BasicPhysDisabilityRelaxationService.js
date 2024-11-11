define(['app'], function (app) {
	app.service("BasicPhysDisabilityRelaxationService", function (DataAccessService) {
		this.AddBasicPhysDisabilityRelaxation = function (object) {
			var promise = DataAccessService.putData('api/BasicPhysDisabilityRelaxation/PutBasicPhysDisabilityRelaxationList', object);
			return promise;
        }
        this.PostBasicPhysDisabilityRelaxationListInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicPhysDisabilityRelaxation/PostBasicPhysDisabilityRelaxationListInsert', object);
            return promise;
        }
		this.UpdateBasicPhysDisabilityRelaxation = function (object) {
			var promise = DataAccessService.postData('api/BasicPhysDisabilityRelaxation/PostBasicPhysDisabilityRelaxation', object);
			return promise;
		}
		this.DeleteBasicPhysDisabilityRelaxation = function (PhysDisbRelaxID, UpdLoginID) {
			var paramObject = {
				"PhysDisbRelaxID": PhysDisbRelaxID, "UpdLoginID": UpdLoginID
			};
			var promise = DataAccessService.deleteData('api/BasicPhysDisabilityRelaxation/DeleteBasicPhysDisabilityRelaxation', paramObject);
			return promise;
		}
		this.GetBasicPhysDisabilityRelaxationList = function () {
			var data = DataAccessService.getDataAll('api/BasicPhysDisabilityRelaxation/GetBasicPhysDisabilityRelaxationList');
			return data;
        }

        this.GetBasicPhysDisabilityRelaxationForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicPhysDisabilityRelaxation/GetBasicPhysDisabilityRelaxationForList', paramObject);
            return data;
        }
		this.GetBasicPhysDisabilityRelaxationByPhysDisbRelaxID = function (PhysDisbID) {
			var paramObject = { "PhysDisbID": PhysDisbID };
			var promise = DataAccessService.getDataWithPara('api/BasicPhysDisabilityRelaxation/GetBasicPhysDisabilityRelaxationByID', paramObject);
			return promise;
		}
		this.GetCheckDependancy = function (PhysDisbRelaxID) {
			var paramObject = { "PhysDisbRelaxID": PhysDisbRelaxID };
			var promise = DataAccessService.getDataWithPara('api/BasicPhysDisabilityRelaxation/GetCheckDependancy', paramObject);
			return promise;
		}
	});
});