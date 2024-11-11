define(['app'], function (app) {
    app.service("BasicSubjectEquivalenceService", function (DataAccessService) {
        this.AddBasicSubjectEquivalence = function (object) {
            var promise = DataAccessService.putData('api/BasicSubjectEquivalence/PutBasicSubjectEquivalence', object);
            return promise;
        }
        this.UpdateBasicSubjectEquivalence = function (object) {
            var promise = DataAccessService.postData('api/BasicSubjectEquivalence/PostBasicSubjectEquivalence', object);
            return promise;
        }
        this.DeleteBasicSubjectEquivalence = function (SubEqiValenceID, UpdLoginID) {
            var paramObject = { "SubEqiValenceID": SubEqiValenceID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicSubjectEquivalence/DeleteBasicSubjectEquivalence', paramObject);
            return promise;
        }
        this.GetBasicSubjectEquivalenceList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubjectEquivalence/GetBasicSubjectEquivalenceList');
            return data;
        }
        this.GetBasicSubjectEquivalenceForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicSubjectEquivalence/GetBasicSubjectEquivalenceForList', paramObject);
            return data;
        }
        this.GetBasicSubjectEquivalenceListByID = function (SubEqiValenceID) {
            var paramObject = { "SubEqiValenceID": SubEqiValenceID };
            var promise = DataAccessService.getDataWithPara('api/BasicSubjectEquivalence/GetBasicBasicSubjectEquivalenceListByID', paramObject);
            return promise;
        }
        this.GetBasicExamSubjectListForUpdate = function () {
            var data = DataAccessService.getDataAll('api/BasicSubjectEquivalence/GetBasicExamSubjectListForUpdate');
            return data;
        }
        this.GetCheckDependancy = function (SubEqiValenceID) {
            var paramObject = { "SubEqiValenceID": SubEqiValenceID };
            var promise = DataAccessService.getDataWithPara('api/BasicCourse/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});