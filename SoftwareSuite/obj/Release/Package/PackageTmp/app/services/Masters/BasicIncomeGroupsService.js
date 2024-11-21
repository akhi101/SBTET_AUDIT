define(['app'], function (app) {
    app.service("BasicIncomeGroupsService", function (DataAccessService) {
        this.AddBasicIncomeGroups = function (object) {
            var promise = DataAccessService.putData('api/BasicIncomeGroups/PutBasicIncomeGroups', object);
            return promise;
        }
        this.PostBasicIncomeGroupsInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicIncomeGroups/PostBasicIncomeGroupsInsert', object);
            return promise;
        }
        this.UpdateBasicIncomeGroups = function (object) {
            var promise = DataAccessService.postData('api/BasicIncomeGroups/PostBasicIncomeGroups', object);
            return promise;
        }
        this.DeleteBasicIncomeGroups = function (IncGrpID, UpdLoginID) {
            var paramObject = { "IncGrpID": IncGrpID, "UpdLoginID": UpdLoginID};
            var promise = DataAccessService.deleteData('api/BasicIncomeGroups/DeleteBasicIncomeGroups', paramObject);
            return promise;
        }
        this.GetBasicIncomeGroupsList = function () {
            var data = DataAccessService.getDataAll('api/BasicIncomeGroups/GetBasicIncomeGroupsList');
            return data;
        }

        this.GetBasicIncomeGroupsForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicIncomeGroups/GetBasicIncomeGroupsForList', paramObject);
            return data;
        }
        this.GetBasicIncomeGroupsById = function (IncGrpID) {
            var paramObject = { "IncGrpID": IncGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicIncomeGroups/GetBasicIncomeGroupsById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (IncGrpID) {
            var paramObject = { "IncGrpID": IncGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicIncomeGroups/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});