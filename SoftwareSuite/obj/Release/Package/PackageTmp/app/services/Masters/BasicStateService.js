define(['app'], function (app) {
	app.service("BasicStateService", function (DataAccessService) {
		this.AddBasicState = function (object) {
			var promise = DataAccessService.putData('api/BasicState/PutBasicState', object);
            return promise;
        }
        this.PostBasicStateInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicState/PostBasicStateInsert', object);
            return promise;
        }
		this.UpdateBasicState = function (object) {
			var promise = DataAccessService.postData('api/BasicState/PostBasicState', object);
            return promise;
        }
		this.DeleteBasicState = function (StateID,UpdLoginID) {
			var paramObject = { "StateID": StateID, "UpdLoginID":UpdLoginID};
			var promise = DataAccessService.deleteData('api/BasicState/DeleteBasicState', paramObject);
            return promise;
        }
		this.GetBasicStateList = function () {
			var data = DataAccessService.getDataAll('api/BasicState/GetBasicStateList');
            return data;
        }
		this.GetBasicStateByID = function (StateID) {
			var paramObject = { "StateID": StateID };
			var promise = DataAccessService.getDataWithPara('api/BasicState/GetBasicStateListByStateID', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (StateID) {
			var paramObject = { "StateID": StateID };
			var promise = DataAccessService.getDataWithPara('api/BasicState/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});