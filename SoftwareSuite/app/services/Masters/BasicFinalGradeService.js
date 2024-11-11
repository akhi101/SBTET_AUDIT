define(['app'], function (app) {
	app.service("BasicFinalGradeService", function (DataAccessService) {
		this.AddBasicFinalGrade = function (object) {
			var promise = DataAccessService.putData('api/BasicFinalGrade/PutBasicFinalGrade', object);
            return promise;
        }
		this.UpdateBasicFinalGrade = function (object) {
			var promise = DataAccessService.postData('api/BasicFinalGrade/PostBasicFinalGrade', object);
            return promise;
        }
		this.DeleteBasicFinalGrade = function (FinalGrdID, UpdLoginID) {
			var paramObject = { "FinalGrdID": FinalGrdID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicFinalGrade/DeleteBasicFinalGrade', paramObject);
            return promise;
        }
		this.GetBasicFinalGradeList = function () {
			var data = DataAccessService.getDataAll('api/BasicFinalGrade/GetBasicFinalGradeList');
            return data;
        }

        this.GetBasicFinalGradeForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicFinalGrade/GetBasicFinalGradeForList', paramObject);
            return data;
        }
		this.GetBasicFinalGradeById = function (FinalGrdID) {
			var paramObject = { "FinalGrdID": FinalGrdID };
			var promise = DataAccessService.getDataWithPara('api/BasicFinalGrade/GetBasicFinalGradeById', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (FinalGrdID) {
			var paramObject = { "FinalGrdID": FinalGrdID };
			var promise = DataAccessService.getDataWithPara('api/BasicFinalGrade/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});