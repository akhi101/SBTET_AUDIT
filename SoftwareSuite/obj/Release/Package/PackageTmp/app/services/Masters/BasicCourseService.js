define(['app'], function (app) {
	app.service("BasicCourseService", function (DataAccessService) {
		this.AddBasicCourse = function (object) {
			var promise = DataAccessService.putData('api/BasicCourse/PutBasicCourse', object);
            return promise;
        }
        this.PostBasicCourseInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicCourse/PostBasicCourseInsert', object);
            return promise;
        }
		this.UpdateBasicCourse = function (object) {
			var promise = DataAccessService.postData('api/BasicCourse/PostBasicCourse', object);
            return promise;
        }
		this.DeleteBasicCourse = function (CourseID,UpdLoginID) {
			var paramObject = { "CourseID": CourseID, "UpdLoginID":UpdLoginID};
			var promise = DataAccessService.deleteData('api/BasicCourse/DeleteBasicCourse', paramObject);
            return promise;
        }
		this.GetBasicCourseList = function () {
			var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
        this.GetBasicCourseForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicCourse/GetBasicCourseForList', paramObject);
            return data;
        }
		this.GetBasicCourseListByID = function (CourseID) {
			var paramObject = { "CourseID": CourseID };
			var promise = DataAccessService.getDataWithPara('api/BasicCourse/GetBasicCourseListByID', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (CourseID) {
			var paramObject = { "CourseID": CourseID };
			var promise = DataAccessService.getDataWithPara('api/BasicCourse/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});