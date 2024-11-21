define(['app'], function (app) {
    app.service("BasicSubjectService", function (DataAccessService) {
        this.AddBasicSubject = function (object) {
            var promise = DataAccessService.putData('api/BasicSubject/PutBasicSubject', object);
            return promise;
        }
        this.UpdateBasicSubject = function (object) {
            var promise = DataAccessService.postData('api/BasicSubject/PostBasicSubject', object);
            return promise;
        }
		this.DeleteBasicSubject = function (SubjectID, UpdLoginID) {
			var paramObject = { "SubjectID": SubjectID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicSubject/DeleteBasicSubject', paramObject);
            return promise;
        }
        this.GetBasicSubjectList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubject/GetBasicSubjectList');
            return data;
        }
        this.GetBasicSubjectForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicSubject/GetBasicSubjectForList', paramObject);
            return data;
        }
        this.GetBasicSubjectBySubjectID = function (SubjectID) {
            var paramObject = { "SubjectID": SubjectID };
			var promise = DataAccessService.getDataWithPara('api/BasicSubject/GetBasicSubjectListByID', paramObject);
            return promise;
		}
		this.GetBasicSubjectByCourseID = function (CourseID) {
			var paramObject = { "CourseID": CourseID };
			var promise = DataAccessService.getDataWithPara('api/BasicSubject/GetBasicSubjectListByCourseID', paramObject);
			return promise;
		}
        this.GetCheckDependancy = function (SubjectID) {
            var paramObject = { "SubjectID": SubjectID };
            var promise = DataAccessService.getDataWithPara('api/BasicSubject/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});