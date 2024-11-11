define(['app'], function (app) {
    app.service("BasicAcademicInstanceService", function (DataAccessService) {
        this.AddBasicAcademicInstance = function (object) {
            var promise = DataAccessService.putData('api/BasicAcademicInstance/PutBasicAcademicInstance', object);
            return promise;
        }
        this.UpdateBasicAcademicInstance = function (object) {
            var promise = DataAccessService.postData('api/BasicAcademicInstance/PostBasicAcademicInstance', object);
            return promise;
        }
        this.DeleteBasicAcademicInstance = function (AcdInstID) {
            var paramObject = { "AcdInstID": AcdInstID };
            var promise = DataAccessService.deleteData('api/BasicAcademicInstance/DeleteBasicAcademicInstance', paramObject);
            return promise;
        }
        this.GetBasicAcademicInstanceList = function () {
            var data = DataAccessService.getDataAll('api/BasicAcademicInstance/GetBasicAcademicInstanceList');
            return data;
        }
        this.GetBasicAcademicInstanceListByID = function (AcdInstID) {
            var paramObject = { "AcdInstID": AcdInstID };
            var promise = DataAccessService.getDataWithPara('api/BasicAcademicInstance/GetBasicAcademicInstanceListByID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (AcdInstID) {
            var paramObject = { "AcdInstID": AcdInstID };
            var promise = DataAccessService.getDataWithPara('api/BasicAcademicInstance/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});