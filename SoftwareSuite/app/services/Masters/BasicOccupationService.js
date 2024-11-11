define(['app'], function (app) {
    app.service("BasicOccupationService", function (DataAccessService) {
        this.AddBasicOccupation = function (object) {
            var promise = DataAccessService.putData('api/BasicOccupation/PutBasicOccupation', object);
            return promise;
        }
        this.PostBasicOccupationInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicOccupation/PostBasicOccupationInsert', object);
            return promise;
        }
        this.UpdateBasicOccupation = function (object) {
            var promise = DataAccessService.postData('api/BasicOccupation/PostBasicOccupation', object);
            return promise;
        }
        this.DeleteBasicOccupation = function (OcupID, UpdLoginID) {
            var paramObject = { "OcupID": OcupID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicOccupation/DeleteBasicOccupation', paramObject);
            return promise;
        }
        this.GetBasicOccupationList = function () {
            var data = DataAccessService.getDataAll('api/BasicOccupation/GetBasicOccupationList');
            return data;
        }
        this.GetBasicOccupationForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicOccupation/GetBasicOccupationForList', paramObject);
            return data;
        }
        this.GetBasicOccupationById = function (OcupID) {
            var paramObject = { "OcupID": OcupID };
            var promise = DataAccessService.getDataWithPara('api/BasicOccupation/GetBasicOccupationById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (OcupID) {
            var paramObject = { "OcupID": OcupID };
            var promise = DataAccessService.getDataWithPara('api/BasicOccupation/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});