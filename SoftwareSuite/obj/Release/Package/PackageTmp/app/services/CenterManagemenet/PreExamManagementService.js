define(['app'], function (app) {
    app.service("PreExamManagementService", function (DataAccessService) {
        this.AddPreExamManagement = function (object) {
            var promise = DataAccessService.postData('api/PreExamManagement/PutPreExamManagement', object);
            return promise;
        }
        this.UpdatePreExamManagement = function (object) {
            var promise = DataAccessService.postData('api/PreExamManagement/PostPreExamManagement', object);
            return promise;
        }
        this.DeletePreExamManagement = function (ExamMgntID, UpdLoginID) {
            var paramObject = { "ExamMgntID": ExamMgntID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreExamManagement/DeletePreExamManagement', paramObject);
            return promise;
        }
        this.GetPreExamManagementList = function () {
            var data = DataAccessService.getDataAll('api/PreExamManagement/GetPreExamManagementList');
            return data;
        }
        this.GetPreExamManagementById = function (ExamMgntID) {
            var paramObject = { "ExamMgntID": ExamMgntID };
            var promise = DataAccessService.getDataWithPara('api/PreExamManagement/GetPreExamManagementById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (ExamMgntID) {
            var paramObject = { "ExamMgntID": ExamMgntID };
            var promise = DataAccessService.getDataWithPara('api/PreExamManagement/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});