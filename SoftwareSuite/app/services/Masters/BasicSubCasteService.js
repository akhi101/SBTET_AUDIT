define(['app'], function (app) {
    app.service("BasicSubCasteService", function (DataAccessService) {
        this.AddBasicSubCaste = function (object) {
            var promise = DataAccessService.putData('api/BasicSubCaste/PutBasicSubCaste', object);
            return promise;
        }
        this.PostBasicSubCasteInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicSubCaste/PostBasicSubCasteInsert', object);
            return promise;
        }
        this.UpdateBasicSubCaste = function (object) {
            var promise = DataAccessService.postData('api/BasicSubCaste/PostBasicSubCaste', object);
            return promise;
        }
        this.DeleteBasicSubCaste = function (SubCastID, UpdLoginID) {
            var paramObject = { "SubCastID": SubCastID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicSubCaste/DeleteBasicSubCaste', paramObject);
            return promise;
        }
        this.GetBasicSubCasteList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubCaste/GetBasicSubCasteList');
            return data;
        }
        this.GetBasicSubCasteForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicSubCaste/GetBasicSubCasteForList', paramObject);
            return data;
        }
        this.GetBasicSubCasteByID = function (SubCastID) {
            var paramObject = { "SubCastID": SubCastID };
            var promise = DataAccessService.getDataWithPara('api/BasicSubCaste/GetBasicSubCasteByID', paramObject);
            return promise;
        }
    });
});