define(['app'], function (app) {
    app.service("PreExamCapacityService", function (DataAccessService) {
        this.AddPreExamCapacity = function (object) {
            var promise = DataAccessService.postData('api/PreExamCapacity/PutPreExamCapacity', object);
            return promise;
        }
        this.UpdatePreExamCapacity = function (object) {
            var promise = DataAccessService.postData('api/PreExamCapacity/PostPreExamCapacity', object);
            return promise;
        }
        this.DeletePreExamCapacity = function (ExamCapacityID, UpdLoginID) {
            var paramObject = { "ExamCapacityID": ExamCapacityID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreExamCapacity/DeletePreExamCapacity', paramObject);
            return promise;
        }
        this.GetPreExamCapacityList = function () {
            var data = DataAccessService.getDataAll('api/PreExamCapacity/GetPreExamCapacityList');
            return data;
        }
        this.GetPreExamCapacityById = function (ExamCapacityID) {
            var paramObject = { "ExamCapacityID": ExamCapacityID };
            var promise = DataAccessService.getDataWithPara('api/PreExamCapacity/GetPreExamCapacityById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (ExamCapacityID) {
            var paramObject = { "ExamCapacityID": ExamCapacityID };
            var promise = DataAccessService.getDataWithPara('api/PreExamCapacity/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetCollegeCount = function (CollegeID,ExamCapacityID) {
            var paramObject = { "CollegeID": CollegeID,"ExamCapacityID": ExamCapacityID };
            var promise = DataAccessService.getDataWithPara('api/PreExamCapacity/GetCollegeCount', paramObject);
            return promise;
        }
    });
});