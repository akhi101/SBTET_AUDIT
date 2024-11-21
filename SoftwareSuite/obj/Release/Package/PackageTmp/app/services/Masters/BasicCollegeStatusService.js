define(['app'], function (app) {
    app.service("BasicCollegeStatusService", function (DataAccessService) {
        this.AddBasicCollegeStatus = function (object) {
            var promise = DataAccessService.putData('api/BasicCollegeStatus/PutBasicCollegeStatus', object);
            return promise;
        }
        this.PostBasicCollegeStatusInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicCollegeStatus/PostBasicCollegeStatusInsert', object);
            return promise;
        }
        this.UpdateBasicCollegeStatus = function (object) {
            var promise = DataAccessService.postData('api/BasicCollegeStatus/PostBasicCollegeStatus', object);
            return promise;
        }
		this.DeleteBasicCollegeStatus = function (ColStatusID, UpdLoginID) {
			var paramObject = { "ColStatusID": ColStatusID, "UpdLoginID": UpdLoginID};
            var promise = DataAccessService.deleteData('api/BasicCollegeStatus/DeleteBasicCollegeStatus', paramObject);
            return promise;
        }
        this.GetBasicCollegeStatusList = function () {
            var data = DataAccessService.getDataAll('api/BasicCollegeStatus/GetBasicCollegeStatusList');
            return data;
        }
        this.GetBasicCollegeStatusForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicCollegeStatus/GetBasicCollegeStatusForList', paramObject);
            return data;
        }
        this.GetBasicCollegeStatusByColStatusID = function (ColStatusID) {
            var paramObject = { "ColStatusID": ColStatusID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollegeStatus/GetBasicCollegeStatusByColStatusID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (ColStatusID) {
            var paramObject = { "ColStatusID": ColStatusID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollegeStatus/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});