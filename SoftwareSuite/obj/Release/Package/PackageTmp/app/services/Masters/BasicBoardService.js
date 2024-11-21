define(['app'], function (app) {
	app.service("BasicBoardService", function (DataAccessService) {
		this.AddBasicBoard = function (object) {
			var promise = DataAccessService.putData('api/BasicBoard/PutBasicBoard', object);
            return promise;
        }
        this.PostBasicBoardInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicBoard/PostBasicBoardInsert', object);
            return promise;
        }
		this.UpdateBasicBoard = function (object) {
			var promise = DataAccessService.postData('api/BasicBoard/PostBasicBoard', object);
            return promise;
        }
        this.DeleteBasicBoard = function (BoardID, UpdLoginID) {
            var paramObject = {"BoardID": BoardID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicBoard/DeleteBasicBoard', paramObject);
            return promise;
        }
		this.GetBasicBoardList = function () {
			var data = DataAccessService.getDataAll('api/BasicBoard/GetBasicBoardList');
            return data;
        }
        this.GetBasicBoardForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicBoard/GetBasicBoardForList', paramObject);
            return data;
        }
        this.GetBasicBoardById = function (BoardID) {
			var paramObject = { "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/BasicBoard/GetBasicBoardById', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (BoardID) {
			var paramObject = { "BoardID": BoardID };
			var promise = DataAccessService.getDataWithPara('api/BasicBoard/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});