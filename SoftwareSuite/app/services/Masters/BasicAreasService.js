define(['app'], function (app) {
	app.service("BasicAreasService", function (DataAccessService) {
		this.AddBasicAreas = function (object) {
			var promise = DataAccessService.putData('api/BasicAreas/PutBasicAreas', object);
			return promise;
        }
        this.PostBasicAreasInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicAreas/PostBasicAreasInsert', object);
            return promise;
        }
		this.UpdateBasicAreas = function (object) {
			var promise = DataAccessService.postData('api/BasicAreas/PostBasicAreas', object);
			return promise;
		}
		this.DeleteBasicAreas = function (AreasID, UpdLoginID) {
			var paramObject = { "AreasID": AreasID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicAreas/DeleteBasicAreas', paramObject);
			return promise;
		}
		this.GetBasicAreasList = function () {
			var data = DataAccessService.getDataAll('api/BasicAreas/GetBasicAreasList');
			return data;
        }
        this.GetBasicAreasForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicAreas/GetBasicAreasForList', paramObject);
            return data;
        }
		this.GetBasicAreasById = function (AreasID) {
			var paramObject = { "AreasID": AreasID };
			var promise = DataAccessService.getDataWithPara('api/BasicAreas/GetBasicAreasById', paramObject);
			return promise;
		}
		this.GetCheckDependancy = function (AreasID) {
			var paramObject = { "AreasID": AreasID };
			var promise = DataAccessService.getDataWithPara('api/BasicAreas/GetCheckDependancy', paramObject);
			return promise;
		}
	});
});