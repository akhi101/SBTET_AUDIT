define(['app'], function (app) {
    app.service("BasicFeesService", function (DataAccessService) {
        this.AddBasicFees = function (object) {
            var promise = DataAccessService.putData('api/BasicFees/PutBasicFees', object);
            return promise;
        }
        this.PostBasicFeesInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicFees/PostBasicFeesInsert', object);
            return promise;
        }
        this.UpdateBasicFees = function (object) {
            var promise = DataAccessService.postData('api/BasicFees/PostBasicFees', object);
            return promise;
        }
        this.DeleteBasicFees = function (FeesID, UpdLoginID) {
            var paramObject = { "FeesID": FeesID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicFees/DeleteBasicFees', paramObject);
            return promise;
        }
        this.GetBasicFeesList = function () {
            var data = DataAccessService.getDataAll('api/BasicFees/GetBasicFeesList');
            return data;
        }

        this.GetBasicFeesForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicFees/GetBasicFeesForList', paramObject);
            return data;
        }
        this.GetBasicFeesById = function (FeesID) {
            var paramObject = { "FeesID": FeesID };
			var promise = DataAccessService.getDataWithPara('api/BasicFees/GetBasicFeesById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (FeesID) {
            var paramObject = { "FeesID": FeesID };
            var promise = DataAccessService.getDataWithPara('api/BasicFees/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});