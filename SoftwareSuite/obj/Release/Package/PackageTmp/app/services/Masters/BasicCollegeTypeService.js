define(['app'], function (app) {
	app.service("BasicCollegeTypeService", function (DataAccessService) {
		this.AddBasicCollegeType = function (object) {
			var promise = DataAccessService.putData('api/BasicCollegeType/PutBasicCollegeType', object);
			return promise;
        }
        this.PostBasicCollegeTypeInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicCollegeType/PostBasicCollegeTypeInsert', object);
            return promise;
        }
		this.UpdateBasicCollegeType = function (object) {
			var promise = DataAccessService.postData('api/BasicCollegeType/PostBasicCollegeType', object);
			return promise;
		}
		this.DeleteBasicCollegeType = function (ColTypID, UpdLoginID) {
			var paramObject = { "ColTypID": ColTypID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicCollegeType/DeleteBasicCollegeType', paramObject);
			return promise;
		}
		this.GetBasicCollegeTypeList = function () {
			var data = DataAccessService.getDataAll('api/BasicCollegeType/GetBasicCollegeTypeList');
            return data;
        }
        this.GetBasicCollegeTypeForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicCollegeType/GetBasicCollegeTypeForList', paramObject);
            return data;
        }

		this.GetBasicCollegeTypeByColTypID = function (ColTypID) {
			var paramObject = { "ColTypID": ColTypID };
			var promise = DataAccessService.getDataWithPara('api/BasicCollegeType/GetBasicCollegeTypeByColTypID', paramObject);
			return promise;
        }

		this.GetCheckDependancy = function (ColTypID) {
			var paramObject = { "ColTypID": ColTypID };
			var promise = DataAccessService.getDataWithPara('api/BasicCollegeType/GetCheckDependancy', paramObject);
			return promise;
		}
	});
});