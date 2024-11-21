define(['app'], function (app) {
	app.service("BasicExamInstanceService", function (DataAccessService) {
		this.AddBasicExamInstance = function (object) {
			var promise = DataAccessService.putData('api/BasicExamInstance/PutBasicExamInstance', object);
            return promise;
        }
		this.UpdateBasicExamInstance = function (object) {
			 var promise = DataAccessService.postData('api/BasicExamInstance/PostBasicExamInstance', object);
            return promise;
        }
		this.DeleteBasicExamInstance = function (ExamInstID) {
			var paramObject = { "ExamInstID": ExamInstID };
			var promise = DataAccessService.deleteData('api/BasicExamInstance/DeleteBasicExamInstance', paramObject);
            return promise;
        }
		this.GetBasicExamInstanceList = function () {
			var data = DataAccessService.getDataAll('api/BasicExamInstance/GetBasicExamInstanceList');
            return data;
        }
        this.GetBasicExamInstanceById = function (ExamInstID) {
			var paramObject = { "ExamInstID": ExamInstID };
			var promise = DataAccessService.getDataWithPara('api/BasicExamInstance/GetBasicExamInstanceListByID', paramObject);
            return promise;
        }
        this.GetBasicExamInstanceForCenterMgmt = function () {
            var promise = DataAccessService.getDataWithPara('api/BasicExamInstance/GetBasicExamInstanceForCenterMgmt');
            return promise;
        }
		this.GetCheckDependancy = function (ExamInstID) {
			var paramObject = { "ExamInstID": ExamInstID };
			var promise = DataAccessService.getDataWithPara('api/BasicExamInstance/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});