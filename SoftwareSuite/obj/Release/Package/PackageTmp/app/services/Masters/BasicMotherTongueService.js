define(['app'], function (app) {
    app.service("BasicMotherTongueService", function (DataAccessService) {
        this.AddBasicMotherTongue = function (object) {
			var promise = DataAccessService.putData('api/BasicMotherTongue/PutBasicMotherTongue', object);
            return promise;
        }
        this.PostBasicMotherTongueInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicMotherTongue/PostBasicMotherTongueInsert', object);
            return promise;
        }
        this.UpdateBasicMotherTongue = function (object) {
			var promise = DataAccessService.postData('api/BasicMotherTongue/PostBasicMotherTongue', object);
            return promise;
        }
		this.DeleteBasicMotherTongue = function (MothTID, UpdLoginID) {
			var paramObject = { "MothTID": MothTID, "UpdLoginID": UpdLoginID};
			var promise = DataAccessService.deleteData('api/BasicMotherTongue/DeleteBasicMotherTongue', paramObject);
            return promise;
        }
        this.GetBasicMotherTongueList = function () {
			var data = DataAccessService.getDataAll('api/BasicMotherTongue/GetBasicMotherTongueList');
            return data;
        }
        this.GetBasicMotherTongueForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicMotherTongue/GetBasicMotherTongueForList', paramObject);
            return data;
        }
        this.GetBasicMotherTongueById = function (MothTID) {
            var paramObject = { "MothTID": MothTID };
			var promise = DataAccessService.getDataWithPara('api/BasicMotherTongue/GetBasicMotherTongueListByID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (MothTID) {
            var paramObject = { "MothTID": MothTID };
			var promise = DataAccessService.getDataWithPara('api/BasicMotherTongue/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});