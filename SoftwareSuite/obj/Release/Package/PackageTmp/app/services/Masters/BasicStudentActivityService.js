define(['app'], function (app) {
    app.service("BasicStudentActivityService", function (DataAccessService) {
        this.AddBasicStudentActivity = function (object) {
            var promise = DataAccessService.putData('api/BasicStudentActivity/PutBasicStudentActivity', object);
            return promise;
        }
        this.PostBasicStudentActivity = function (object) {
            var promise = DataAccessService.postData('api/BasicStudentActivity/PostBasicStudentActivityInsert', object);
            return promise;
        }
        this.UpdateBasicStudentActivity = function (object) {
            var promise = DataAccessService.postData('api/BasicStudentActivity/PostBasicStudentActivity', object);
            return promise;
        }
		this.DeleteBasicStudentActivity = function (StudActID,UpdLoginID) {
			var paramObject = { "StudActID": StudActID, "UpdLoginID":UpdLoginID};
            var promise = DataAccessService.deleteData('api/BasicStudentActivity/DeleteBasicStudentActivity', paramObject);
            return promise;
        }
        this.GetBasicStudentActivityList = function () {
			var data = DataAccessService.getDataAll('api/BasicStudentActivity/GetBasicStudentActivityList');
            return data;
        }
        this.GetBasicStudentActivityForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicStudentActivity/GetBasicStudentActivityForList', paramObject);
            return data;
        }
        this.GetBasicStudentActivityById = function (StudActID) {
            var paramObject = { "StudActID": StudActID };
			var promise = DataAccessService.getDataWithPara('api/BasicStudentActivity/GetBasicStudentActivityByID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (StudActID) {
            var paramObject = { "StudActID": StudActID };
            var promise = DataAccessService.getDataWithPara('api/BasicStudentActivity/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});