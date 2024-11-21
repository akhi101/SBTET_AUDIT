define(['app'], function (app) {
    app.service("BasicSubCategoryService", function (DataAccessService) {
        this.AddBasicSubCategory = function (object) {
            var promise = DataAccessService.putData('api/BasicSubCategory/PutBasicSubCategory', object);
            return promise;
        }
        this.PostBasicSubCategoryInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicSubCategory/PostBasicSubCategoryInsert', object);
            return promise;
        }
        this.UpdateBasicSubCategory = function (object) {
            var promise = DataAccessService.postData('api/BasicSubCategory/PostBasicSubCategory', object);
            return promise;
        }
        this.DeleteBasicSubCategory = function (SubCatID, UpdLoginID) {
            var paramObject = { "SubCatID": SubCatID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicSubCategory/DeleteBasicSubCategory', paramObject);
            return promise;
        }
        this.GetBasicSubCategoryList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubCategory/GetBasicSubCategoryList');
            return data;
        }
        this.GetBasicSubCategoryForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicSubCategory/GetBasicSubCategoryForList', paramObject);
            return data;
        }
        this.GetBasicSubCategoryListByID = function (SubCatID) {
            var paramObject = { "SubCatID": SubCatID };
            var promise = DataAccessService.getDataWithPara('api/BasicSubCategory/GetBasicSubCategoryById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (SubCatID) {
            var paramObject = { "SubCatID": SubCatID };
            var promise = DataAccessService.getDataWithPara('api/BasicSubCategory/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});