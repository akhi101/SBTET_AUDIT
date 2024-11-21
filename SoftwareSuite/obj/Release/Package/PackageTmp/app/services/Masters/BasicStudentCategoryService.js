define(['app'], function (app) {
    app.service("BasicStudentCategoryService", function (DataAccessService) {
        this.AddBasicStudentCategory = function (object) {
            var promise = DataAccessService.putData('api/BasicStudentCategory/PutBasicStudentCategory', object);
            return promise;
        }
        this.UpdateBasicStudentCategory = function (object) {
            var promise = DataAccessService.postData('api/BasicStudentCategory/PostBasicStudentCategory', object);
            return promise;
        }
        this.DeleteBasicStudentCategory = function (StudCatID) {
            var paramObject = { "StudCatID": StudCatID };
            var promise = DataAccessService.deleteData('api/BasicStudentCategory/DeleteBasicStudentCategory', paramObject);
            return promise;
        }
        this.GetBasicStudentCategoryList = function () {
            var data = DataAccessService.getDataAll('api/BasicStudentCategory/GetBasicStudentCategoryList');
            return data;
        }
        this.GetBasicStudentCategoryForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicStudentCategory/GetBasicStudentCategoryForList', paramObject);
            return data;
        }
        this.GetBasicStudentCategoryById = function (StudCatID) {
            var paramObject = { "StudCatID": StudCatID };
            var promise = DataAccessService.getDataWithPara('api/BasicStudentCategory/GetBasicStudentCategoryById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (StudCatID) {
            var paramObject = { "StudCatID": StudCatID };
            var promise = DataAccessService.getDataWithPara('api/BasicStudentCategory/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});