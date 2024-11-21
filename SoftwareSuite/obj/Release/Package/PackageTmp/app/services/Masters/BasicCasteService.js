define(['app'], function (app) {
    app.service("BasicCasteService", function (DataAccessService) {
        this.AddBasicCaste = function (object) {
            var promise = DataAccessService.putData('api/BasicCaste/PutBasicCaste', object);
            return promise;
        }
        this.PostBasicCasteInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicCaste/PostBasicCasteInsert', object);
            return promise;
        }
        this.UpdateBasicCaste = function (object) {
            var promise = DataAccessService.postData('api/BasicCaste/PostBasicCaste', object);
            return promise;
        }
        this.DeleteBasicCaste = function (CasteID, UpdLoginID) {
            var paramObject = {
                "CasteID": CasteID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicCaste/DeleteBasicCaste', paramObject);
            return promise;
        }
        this.GetBasicCasteList = function () {
            var data = DataAccessService.getDataAll('api/BasicCaste/GetBasicCasteList');
            return data;
        }

        this.GetBasicCasteForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicCaste/GetBasicCasteForList', paramObject);
            return data;
        }
		this.GetBasicCasteById = function (CasteID) {
			var paramObject = { "CasteID": CasteID };
            var promise = DataAccessService.getDataWithPara('api/BasicCaste/GetBasicCasteById', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (CasteID) {
			var paramObject = { "CasteID": CasteID };
            var promise = DataAccessService.getDataWithPara('api/BasicCaste/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});