define(['app'], function (app) {
    app.service("BasicPacketService", function (DataAccessService) {
        this.AddBasicPacket = function (object) {
            var promise = DataAccessService.putData('api/BasicPacket/PutBasicPacket', object);
            return promise;
        }
        this.PostBasicPacketInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicPacket/PostBasicPacketInsert', object);
            return promise;
        }
        this.UpdateBasicPacket = function (object) {
            var promise = DataAccessService.postData('api/BasicPacket/PostBasicPacket', object);
            return promise;
        }
        this.DeleteBasicPacket = function (PcktID, UpdLoginID) {
            var paramObject = { "PcktID": PcktID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicPacket/DeleteBasicPacket', paramObject);
            return promise;
        }
        this.GetBasicPacketList = function () {
            var data = DataAccessService.getDataAll('api/BasicPacket/GetBasicPacketList');
            return data;
        }
        this.GetBasicPacketForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicPacket/GetBasicPacketForList', paramObject);
            return data;
        }
        this.GetBasicPacketById = function (PcktID) {
            var paramObject = { "PcktID": PcktID };
            var promise = DataAccessService.getDataWithPara('api/BasicPacket/GetBasicPacketById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (PcktID) {
            var paramObject = { "PcktID": PcktID };
            var promise = DataAccessService.getDataWithPara('api/BasicPacket/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});