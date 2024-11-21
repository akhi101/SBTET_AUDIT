define(['app'], function (app) {
    app.service("BasicMediumService", function (DataAccessService) {
        this.AddBasicMedium = function (object) {
            var promise = DataAccessService.putData('api/BasicMedium/PutBasicMedium', object);
            return promise;
        }
        this.PostBasicMediumInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicMedium/PostBasicMediumInsert', object);
            return promise;
        }
        this.UpdateBasicMedium = function (object) {
            var promise = DataAccessService.postData('api/BasicMedium/PostBasicMedium', object);
            return promise;
        }
		this.DeleteBasicMedium = function (MediumID,UpdLoginID) {
		var paramObject = { "MediumID": MediumID, "UpdLoginID": UpdLoginID};
			var promise = DataAccessService.deleteData('api/BasicMedium/DeleteBasicMedium', paramObject);
            return promise;
        }
        this.GetBasicMediumList = function () {
            var data = DataAccessService.getDataAll('api/BasicMedium/GetBasicMediumList');
            return data;
        }
        this.GetBasicMediumForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicMedium/GetBasicMediumForList', paramObject);
            return data;
        }

        this.GetBasicMediumByMediumID = function (MediumID) {
            var paramObject = { "MediumID": MediumID };
			var promise = DataAccessService.getDataWithPara('api/BasicMedium/GetBasicMediumByMediumID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (MediumID) {
            var paramObject = { "MediumID": MediumID };
            var promise = DataAccessService.getDataWithPara('api/BasicMedium/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});