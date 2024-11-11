define(['app'], function (app) {
	app.service("PreExamOtherCenterService", function (DataAccessService) {
		this.AddPreExamOtherCenter = function (object) {
            var promise = DataAccessService.postData('api/PreExamOtherCenter/PostInsertPreExamOtherCenter', object);
			return promise;
		}
		this.UpdatePreExamOtherCenter = function (object) {
			var promise = DataAccessService.postData('api/PreExamOtherCenter/PostPreExamOtherCenter', object);
			return promise;
		}
		//this.DeletePreExamOtherCenter = function (OtherCenterID, UpdLoginID) {
		//	var paramObject = { "OtherCenterID": OtherCenterID, "UpdLoginID": UpdLoginID };
		//	var promise = DataAccessService.deleteData('api/PreExamOtherCenter/DeletePreExamOtherCenter', paramObject);
		//	return promise;
  //      }
        this.DeletePreExamOtherCenter = function(object) {            
            var promise = DataAccessService.postData('api/PreExamOtherCenter/PostDeletePreExamOtherCenter', object);
            return promise;
        }
		this.GetPreExamOtherCenterList = function () {
			var data = DataAccessService.getDataAll('api/PreExamOtherCenter/GetPreExamOtherCenterList');
			return data;
        }
        this.GetPreExamOtherCenterListByDistrictID = function (DistrictIDs) {
            var paramObject = { "DistrictIDs": DistrictIDs };
            var promise = DataAccessService.getDataWithPara('api/PreExamOtherCenter/GetPreExamOtherCenterListByDistrictID', paramObject);
            return promise;
        }
		this.GetPreExamOtherCenterById = function (OtherCenterID) {
			var paramObject = { "OtherCenterID": OtherCenterID };
			var promise = DataAccessService.getDataWithPara('api/PreExamOtherCenter/GetPreExamOtherCenterById', paramObject);
			return promise;
		}
		this.GetCheckDependancy = function (OtherCenterID) {
			var paramObject = { "OtherCenterID": OtherCenterID };
			var promise = DataAccessService.getDataWithPara('api/PreExamOtherCenter/GetCheckDependancy', paramObject);
			return promise;
		}
		this.GetOtherCenterNewCode = function (DistrictID) {
			var paramObject = { "DistrictID": DistrictID };
			var promise = DataAccessService.getDataWithPara('api/PreExamOtherCenter/GetOtherCenterNewCode', paramObject);
			return promise;
		}
	});
});