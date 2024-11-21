define(['app'], function (app) {
    app.service("BasicEduBoardsService", function (DataAccessService) {
		this.AddBasicEduBoards = function (object) {
			var promise = DataAccessService.putData('api/BasicEduBoards/PutBasicEduBoards', object);
            return promise;
        }
		this.UpdateBasicEduBoards = function (object) {
			var promise = DataAccessService.postData('api/BasicEduBoards/PostBasicEduBoards', object);
            return promise;
        }
        this.DeleteBasicEduBoards = function (EduBoardID, UpdLoginID) {
            var paramObject = {"EduBoardID": EduBoardID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicEduBoards/DeleteBasicEduBoards', paramObject);
            return promise;
        }
		this.GetBasicEduBoardsList = function () {
			var data = DataAccessService.getDataAll('api/BasicEduBoards/GetBasicEduBoardsList');
            return data;
        }
        this.GetBasicEduBoardsById = function (EduBoardID) {
			var paramObject = { "EduBoardID": EduBoardID };
            var promise = DataAccessService.getDataWithPara('api/BasicEduBoards/GetBasicEduBoardsById', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (EduBoardID) {
			var paramObject = { "EduBoardID": EduBoardID };
			var promise = DataAccessService.getDataWithPara('api/BasicEduBoards/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});