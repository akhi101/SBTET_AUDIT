define(['app'], function (app) {
	app.service("BasicEvalGradeService", function (DataAccessService) {
		this.AddBasicEvalGrade = function (object) {
			var promise = DataAccessService.putData('api/BasicEvalGrade/PutBasicEvalGrade', object);
            return promise;
        }
        this.PostBasicEvalGradeInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicEvalGrade/PostBasicEvalGradeInsert', object);
            return promise;
        }
		this.UpdateBasicEvalGrade = function (object) {
			var promise = DataAccessService.postData('api/BasicEvalGrade/PostBasicEvalGrade', object);
            return promise;
        }
        this.DeleteBasicEvalGrade = function (EvalGrdID, UpdLoginID) {
            var paramObject = {"EvalGrdID": EvalGrdID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicEvalGrade/DeleteBasicEvalGrade', paramObject);
            return promise;
        }
		this.GetBasicEvalGradeList = function () {
			var data = DataAccessService.getDataAll('api/BasicEvalGrade/GetBasicEvalGradeList');
            return data;
        }
        this.GetBasicEvalGradeForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicEvalGrade/GetBasicEvalGradeForList', paramObject);
            return data;
        }

        this.GetBasicEvalGradeById = function (EvalGrdID) {
			var paramObject = { "EvalGrdID": EvalGrdID };
            var promise = DataAccessService.getDataWithPara('api/BasicEvalGrade/GetBasicEvalGradeById', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (EvalGrdID) {
			var paramObject = { "EvalGrdID": EvalGrdID };
			var promise = DataAccessService.getDataWithPara('api/BasicEvalGrade/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});