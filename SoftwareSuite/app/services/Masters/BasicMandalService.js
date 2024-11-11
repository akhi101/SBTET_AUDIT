define(['app'], function (app) {
    app.service("BasicMandalService", function (DataAccessService) {
        this.AddBasicMandal = function (object) {
            var promise = DataAccessService.putData('api/BasicMandal/PutBasicMandal', object);
            return promise;
        }
        this.PostBasicMandalInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicMandal/PostBasicMandalInsert', object);
            return promise;
        }
        this.UpdateBasicMandal = function (object) {
            var promise = DataAccessService.postData('api/BasicMandal/PostBasicMandal', object);
            return promise;
        }
        this.DeleteBasicMandal = function (MandalID, UpdLoginID) {
            var paramObject = {
                "MandalID": MandalID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicMandal/DeleteBasicMandal', paramObject);
            return promise;
        }
        this.GetBasicMandalList = function () {
            var data = DataAccessService.getDataAll('api/BasicMandal/GetBasicMandalList');
            return data;
        }
        this.GetBasicMandalByMandalID = function (MandalID) {
            var paramObject = { "MandalID": MandalID };
            var promise = DataAccessService.getDataWithPara('api/BasicMandal/GetBasicMandalByMandalID', paramObject);
            return promise;
        }

        this.GetBasicMandalForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicMandal/GetBasicMandalForList', paramObject);
            return data;
        }
        this.GetBasicMandalByDistrictID = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/BasicMandal/GetBasicMandalByDistrictID', paramObject);
            return promise;
        } 
        this.GetCheckDependancy = function (MandalID) {
            var paramObject = { "MandalID": MandalID };
            var promise = DataAccessService.getDataWithPara('api/BasicMandal/GetCheckDependancy', paramObject);
            return promise;
        }

    });
});