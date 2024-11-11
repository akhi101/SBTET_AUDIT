define(['app'], function (app) {
    app.service("BasicCatPaperService", function (DataAccessService) {
        this.AddBasicCatPaper = function (object) {
            var promise = DataAccessService.putData('api/BasicCatPaper/PutBasicCatPaper', object);
            return promise;
        }
        this.UpdateBasicCatPaper = function (object) {
            var promise = DataAccessService.postData('api/BasicCatPaper/PostBasicCatPaper', object);
            return promise;
        }
        this.DeleteBasicCatPaper = function (CatPaperID) {
            var paramObject = { "CatPaperID": CatPaperID };
            var promise = DataAccessService.deleteData('api/BasicCatPaper/DeleteBasicCatPaper', paramObject);
            return promise;
        }
        this.GetBasicCatPaperList = function () {
            var data = DataAccessService.getDataAll('api/BasicCatPaper/GetBasicCatPaperList');
            return data;
        }
        this.GetBasicCatPaperById = function (CatPaperID) {
            var paramObject = { "CatPaperID": CatPaperID };
            var promise = DataAccessService.getDataWithPara('api/BasicCatPaper/GetBasicCatPaperById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (CatPaperID) {
            var paramObject = { "CatPaperID": CatPaperID };
            var promise = DataAccessService.getDataWithPara('api/BasicCatPaper/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});