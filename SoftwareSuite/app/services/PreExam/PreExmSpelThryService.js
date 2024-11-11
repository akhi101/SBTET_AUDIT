define(['app'], function (app) {
    app.service("PreExmSpelThryService", function (DataAccessService) {
        this.AddPreExmSpelThry = function (object) {
            var promise = DataAccessService.putData('api/PreExmSpelThry/PutPreExmSpelThry', object);
            return promise;
        }
        this.UpdatePreExmSpelThry = function (object) {
            var promise = DataAccessService.postData('api/PreExmSpelThry/PostPreExmSpelThry', object);
            return promise;
        }
        this.DeletePreExmSpelThry = function (PreExmSplTrID, UpdLoginID) {
            var paramObject = { "PreExmSplTrID": PreExmSplTrID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreExmSpelThry/DeletePreExmSpelThry', paramObject);
            return promise;
        }
        this.GetPreExmSpelThryListByInstance = function (InstanceID) {
            var paramObject = { "InstanceID": InstanceID};
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelThry/GetPreExmSpelThryListByInstance', paramObject);
            return promise;
        }
        this.GetPreExmSpelThryByID = function (PreExmSplTrID) {
            var paramObject = { "PreExmSplTrID": PreExmSplTrID };
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelThry/GetPreExmSpelThryByID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (PreExmSplTrID) {
            var paramObject = { "PreExmSplTrID": PreExmSplTrID };
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelThry/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
        this.GetBasicExamListByCourseID = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetBasicExamSubjectListReport = function (CourseID, ExamID) {
            var paramObject = { "CourseID": CourseID,"ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicExamSubjectListReport', paramObject);
            return promise;
        }
        this.GetBasicExamSubjectList = function (CourseID, ExamID) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicExamSubjectList', paramObject);
            return promise;
        }
    });
});