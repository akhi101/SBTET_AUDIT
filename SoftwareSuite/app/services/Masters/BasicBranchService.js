define(['app'], function (app) {
	app.service("BasicBranchService", function (DataAccessService) {
		this.AddBasicBranch = function (object) {
			var promise = DataAccessService.putData('api/BasicBranch/PutBasicBranch', object);
            return promise;
        }
        this.PostBasicBranchInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicBranch/PostBasicBranchInsert', object);
            return promise;
        }
		this.UpdateBasicBranch = function (object) {
			var promise = DataAccessService.postData('api/BasicBranch/PostBasicBranch', object);
            return promise;
        }
		this.DeleteBasicBranch = function (BranchID, UpdLoginID) {
			var paramObject = { "BranchID": BranchID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicBranch/DeleteBasicBranch', paramObject);
            return promise;
        }
		this.GetBasicBranchList = function () {
			var data = DataAccessService.getDataAll('api/BasicBranch/GetBasicBranchList');
            return data;
        }
        this.GetBasicBranchForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchForList', paramObject);
            return data;
        }
		this.GetBasicBranchListById = function (BranchID) {
			var paramObject = { "BranchID": BranchID };
			var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByID', paramObject);
            return promise;
        }
        this.GetBasicBranchListByCourseID = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByCourseID', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (BranchID) {
			var paramObject = { "BranchID": BranchID };
			var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});