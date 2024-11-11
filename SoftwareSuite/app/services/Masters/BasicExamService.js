define(['app'], function (app) {
	app.service("BasicExamService", function (DataAccessService) {
		this.AddBasicExam = function (object) {
			var promise = DataAccessService.putData('api/BasicExam/PutBasicExam', object);
            return promise;
        }
        this.PostBasicExamInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicExam/PostBasicExamInsert', object);
            return promise;
        }
		this.UpdateBasicExam = function (object) {
			var promise = DataAccessService.postData('api/BasicExam/PostBasicExam', object);
            return promise;
        }
		this.DeleteBasicExam = function (ExamID,UpdLoginID) {
			var paramObject = { "ExamID": ExamID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicExam/DeleteBasicExam', paramObject);
            return promise;
        }
		this.GetBasicExamList = function () {
			var data = DataAccessService.getDataAll('api/BasicExam/GetBasicExamList');
            return data;
        }
        this.GetBasicExamForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamForList', paramObject);
            return data;
        }
		this.GetBasicExamListByID = function (ExamID) {
			var paramObject = { "ExamID": ExamID };
			var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByID', paramObject);
            return promise;
        }
        this.GetExamListByCourseID = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetBasicExamListByIYearByCourseID = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByIYearByCourseID', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (ExamID) {
			var paramObject = { "ExamID": ExamID };
			var promise = DataAccessService.getDataWithPara('api/BasicExam/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});