define(['app'], function (app) {
    app.service("BasicEvalTypesService", function (DataAccessService) {
        this.AddBasicEvalTypes = function (object) {
            var promise = DataAccessService.putData('api/BasicEvalTypes/PutBasicEvalTypes', object);
            return promise;
        }
        this.PostBasicEvalTypesInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicEvalTypes/PostBasicEvalTypesInsert', object);
            return promise;
        }
        this.UpdateBasicEvalTypes = function (object) {
            var promise = DataAccessService.postData('api/BasicEvalTypes/PostBasicEvalTypes', object);
            return promise;
        }
        this.DeleteBasicEvalTypes = function (EvalTypID, UpdLoginID) {
            var paramObject = {"EvalTypID": EvalTypID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicEvalTypes/DeleteBasicEvalTypes', paramObject);
            return promise;
        }
        this.GetBasicEvalTypesList = function () {
            var data = DataAccessService.getDataAll('api/BasicEvalTypes/GetBasicEvalTypesList');
            return data;
        }
        this.GetBasicEvalTypesForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicEvalTypes/GetBasicEvalTypesForList', paramObject);
            return data;
        }
        this.GetBasicEvalTypesById = function (EvalTypID) {
            var paramObject = { "EvalTypID": EvalTypID };
            var promise = DataAccessService.getDataWithPara('api/BasicEvalTypes/GetBasicEvalTypesById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (EvalTypID) {
            var paramObject = { "EvalTypID": EvalTypID };
            var promise = DataAccessService.getDataWithPara('api/BasicEvalTypes/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetBasicSessionTypes = function () {
            var data = DataAccessService.getDataAll('api/BasicEvalTypes/GetBasicSessionTypes');
            return data;
        }
    });
});