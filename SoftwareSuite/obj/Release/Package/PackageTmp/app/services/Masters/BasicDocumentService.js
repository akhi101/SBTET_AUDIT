define(['app'], function (app) {
    app.service("BasicDocumentService", function (DataAccessService) {
        this.AddBasicDocument = function (object) {
            var promise = DataAccessService.putData('api/BasicDocument/PutBasicDocument', object);
            return promise;
        }
        this.PostBasicDocumentInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicDocument/PostBasicDocumentInsert', object);
            return promise;
        }
        this.UpdateBasicDocument = function (object) {
            var promise = DataAccessService.postData('api/BasicDocument/PostBasicDocument', object);
            return promise;
        }
        this.DeleteBasicDocument = function (DocID, UpdLoginID) {
            var paramObject = { "DocID": DocID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicDocument/DeleteBasicDocument', paramObject);
            return promise;
        }
        this.GetBasicDocumentList = function () {
            var data = DataAccessService.getDataAll('api/BasicDocument/GetBasicDocumentList');
            return data;
        }
        this.GetBasicDocumentForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicDocument/GetBasicDocumentForList', paramObject);
            return data;
        }
        this.GetBasicDocumentById = function (DocID) {
            var paramObject = { "DocID": DocID };
            var promise = DataAccessService.getDataWithPara('api/BasicDocument/GetBasicDocumentById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (DocID) {
            var paramObject = { "DocID": DocID };
            var promise = DataAccessService.getDataWithPara('api/BasicDocument/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});