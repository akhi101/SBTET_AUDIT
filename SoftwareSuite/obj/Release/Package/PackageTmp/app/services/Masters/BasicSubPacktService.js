define(['app'], function (app) {
    app.service("BasicSubPacktService", function (DataAccessService) {
        this.AddBasicSubPackt = function (object) {
            var promise = DataAccessService.putData('api/BasicSubPackt/PutBasicSubPackt', object);
            return promise;
        }
        this.PostBasicSubPacktInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicSubPackt/PostBasicSubPacktInsert', object);
            return promise;
        }
        this.UpdateBasicSubPackt = function (object) {
            var promise = DataAccessService.postData('api/BasicSubPackt/PostBasicSubPackt', object);
            return promise;
        }
        this.DeleteBasicSubPackt = function (SubPacktID, UpdLoginID) {
            var paramObject = { "SubPacktID": SubPacktID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicSubPackt/DeleteBasicSubPackt', paramObject);
            return promise;
        }
        this.GetBasicSubPacktList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubPackt/GetBasicSubPacktList');
            return data;
        }
        this.GetBasicSubPacktListFromExamInstID = function (AcdYrID) {
            var paramObject = { "AcdYrID": AcdYrID };
            var data = DataAccessService.getDataWithPara('api/BasicSubPackt/GetBasicSubPacktListFromExamInstID', paramObject);
            return data;
        }
        
        this.GetBasicSubPacktById = function (SubPacktID) {
            var paramObject = { "SubPacktID": SubPacktID };
            var promise = DataAccessService.getDataWithPara('api/BasicSubPackt/GetBasicSubPacktById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (SubPacktID) {
            var paramObject = { "SubPacktID": SubPacktID };
            var promise = DataAccessService.getDataWithPara('api/BasicSubPackt/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetBasicMediumList = function () {
            var data = DataAccessService.getDataAll('api/BasicMedium/GetBasicMediumList');
            return data;
        }
        this.GetBasicMediumByMediumID = function (MediumID) {
            var paramObject = { "MediumID": MediumID };
            var data = DataAccessService.getDataWithPara('api/BasicMedium/GetBasicMediumByMediumID', paramObject);
            return data;
        }
    });
});