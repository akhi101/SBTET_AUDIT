define(['app'], function (app) {
    app.service("BasicGrpSubjectService", function (DataAccessService) {
        this.AddBasicGrpSubject = function (object) {
			var promise = DataAccessService.putData('api/BasicGrpSubject/PutBasicGrpSubject', object);
            return promise;
        }
        this.PostBasicGrpSubjectInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicGrpSubject/PostBasicGrpSubjectInsert', object);
            return promise;
        }
        this.UpdateBasicGrpSubject = function (object) {
			var promise = DataAccessService.postData('api/BasicGrpSubject/PostBasicGrpSubject', object);
            return promise;
        }
        this.DeleteBasicGrpSubject = function (GrpSubID, UpdLoginID) {
            var paramObject = { "GrpSubID": GrpSubID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicGrpSubject/DeleteBasicGrpSubject', paramObject);
            return promise;
        }
        this.GetBasicGrpSubjectList = function () {
            var data = DataAccessService.getDataAll('api/BasicGrpSubject/GetBasicGrpSubjectList');
            return data;
        }
        this.GetBasicGrpSubjectForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicGrpSubject/GetBasicGrpSubjectForList', paramObject);
            return data;
        }
        this.GetBasicGrpSubjectById = function (GrpSubID) {
            var paramObject = { "GrpSubID": GrpSubID };
            var promise = DataAccessService.getDataWithPara('api/BasicGrpSubject/GetBasicGrpSubjectById', paramObject);
            return promise;
		}
		this.GetBasicMainGroupByCourseandBranchID = function (CourseID, BranchID) {
			var paramObject = { "CourseID": CourseID, "BranchID": BranchID };
			var promise = DataAccessService.getDataWithPara('api/BasicGrpSubject/GetBasicMainGroupByCourseandBranchID', paramObject);
			return promise;
		}
        this.GetCheckDependancy = function (GrpSubID) {
            var paramObject = { "GrpSubID": GrpSubID };
            var promise = DataAccessService.getDataWithPara('api/BasicGrpSubject/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});