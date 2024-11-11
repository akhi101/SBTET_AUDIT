define(['app'], function (app) {
	app.service("BasicExaminerTypesService", function (DataAccessService) {
		this.AddBasicExaminerTypes = function (object) {
			var promise = DataAccessService.putData('api/BasicExaminerTypes/PutBasicExaminerTypes', object);
            return promise;
        }
        this.PostBasicExaminerTypes = function (object) {
            var promise = DataAccessService.postData('api/BasicExaminerTypes/PostBasicExaminerTypesInsert', object);
            return promise;
        }
		this.UpdateBasicExaminerTypes = function (object) {
			var promise = DataAccessService.postData('api/BasicExaminerTypes/PostBasicExaminerTypes', object);
            return promise;
        }
		this.DeleteBasicExaminerTypes = function (ExaminerTypID,UpdLoginID) {
			var paramObject = { "ExaminerTypID": ExaminerTypID, "UpdLoginID":UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicExaminerTypes/DeleteBasicExaminerTypes', paramObject);
            return promise;
        }
		this.GetBasicExaminerTypesList = function () {
			var data = DataAccessService.getDataAll('api/BasicExaminerTypes/GetBasicExaminerTypesList');
            return data;
        }
        this.GetBasicExaminerTypesForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicExaminerTypes/GetBasicExaminerTypesForList', paramObject);
            return data;
        }
		this.GetBasicExaminerTypesListByID = function (ExaminerTypID) {
			var paramObject = { "ExaminerTypID": ExaminerTypID };
			var promise = DataAccessService.getDataWithPara('api/BasicExaminerTypes/GetBasicExaminerTypesByID', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (ExaminerTypID) {
			var paramObject = { "ExaminerTypID": ExaminerTypID };
			var promise = DataAccessService.getDataWithPara('api/BasicExaminerTypes/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});