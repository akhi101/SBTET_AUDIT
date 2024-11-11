define(['app'], function (app) {
	app.service("BasicRelaxationService", function (DataAccessService) {
		this.AddBasicRelaxation = function (object) {
			var promise = DataAccessService.putData('api/BasicRelaxation/PutBasicRelaxation', object);
			return promise;
        }
        this.PostBasicRelaxationInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicRelaxation/PostBasicRelaxationInsert', object);
            return promise;
        }
		this.UpdateBasicRelaxation = function (object) {
			var promise = DataAccessService.postData('api/BasicRelaxation/PostBasicRelaxation', object);
			return promise;
		}
		this.DeleteBasicRelaxation = function (RelaxId, UpdLoginID) {
			var paramObject = { "RelaxId": RelaxId, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicRelaxation/DeleteBasicRelaxation', paramObject);
			return promise;
		}
		this.GetBasicRelaxationList = function () {
			var data = DataAccessService.getDataAll('api/BasicRelaxation/GetBasicRelaxationList');
			return data;
        }

        this.GetBasicRelaxationForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicRelaxation/GetBasicRelaxationForList', paramObject);
            return data;
        }

		this.GetBasicRelaxationById = function (RelaxId) {
			var paramObject = { "RelaxId": RelaxId };
			var promise = DataAccessService.getDataWithPara('api/BasicRelaxation/GetBasicRelaxationById', paramObject);
			return promise;
		}
		this.GetCheckDependancy = function (RelaxId) {
			var paramObject = { "RelaxId": RelaxId };
			var promise = DataAccessService.getDataWithPara('api/BasicRelaxation/GetCheckDependancy', paramObject);
			return promise;
		}
	});
});