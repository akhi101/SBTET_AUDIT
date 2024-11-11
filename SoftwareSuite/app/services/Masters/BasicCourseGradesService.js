define(['app'], function (app) {
	app.service("BasicCourseGradesService", function (DataAccessService) {
		this.AddBasicCourseGrades = function (object) {
			var promise = DataAccessService.putData('api/BasicCourseGrades/PutBasicCourseGrades', object);
            return promise;
        }
        this.PostBasicCourseGradesInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicCourseGrades/PostBasicCourseGradesInsert', object);
            return promise;
        }
		this.UpdateBasicCourseGrades = function (object) {
			var promise = DataAccessService.postData('api/BasicCourseGrades/PostBasicCourseGrades', object);
            return promise;
        }
        this.DeleteBasicCourseGrades = function (CoGradeID, UpdLoginID) {
            var paramObject = { "CoGradeID": CoGradeID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicCourseGrades/DeleteBasicCourseGrades', paramObject);
            return promise;
        }
		this.GetBasicCourseGradesList = function () {
			var data = DataAccessService.getDataAll('api/BasicCourseGrades/GetBasicCourseGradesList');
            return data;
        }
        this.GetBasicCourseGradesForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicCourseGrades/GetBasicCourseGradesForList', paramObject);
            return data;
        }
		this.GetBasicCourseGradesListByID = function (CoGradeID) {
			var paramObject = { "CoGradeID": CoGradeID };
			var promise = DataAccessService.getDataWithPara('api/BasicCourseGrades/GetBasicCourseGradesListByID', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (CoGradeID) {
			var paramObject = { "CoGradeID": CoGradeID };
			var promise = DataAccessService.getDataWithPara('api/BasicCourseGrades/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});