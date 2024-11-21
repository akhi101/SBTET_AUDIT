define(['app'], function (app) {
    app.service("PreExmSpelPractService", function (DataAccessService) {
        this.AddPreExmSpelPract = function (object) {
            var promise = DataAccessService.postData('api/PreExmSpelPract/PostInsertPreExmSpelPract', object);
            return promise;
        }
        this.UpdatePreExmSpelPract = function (object) {
            var promise = DataAccessService.postData('api/PreExmSpelPract/PostPreExmSpelPract', object);
            return promise;
        }
        this.DeletePreExmSpelPract = function (PreExmSplPrID, UpdLoginID) {
            var paramObject = { "PreExmSplPrID": PreExmSplPrID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreExmSpelPract/DeletePreExmSpelPract', paramObject);
            return promise;
        }
        this.GetDeletePreExmSpelPract = function (PreExmSplPrID, UpdLoginID) {
            var paramObject = { "PreExmSplPrID": PreExmSplPrID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelPract/GetDeletePreExmSpelPract', paramObject);
            return promise;
        }
        this.GetPreExmSpelPractList = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelPract/GetPreExmSpelPractList', paramObject);
            return promise;
        }
        this.GetPreExmSpelPractListForVocational = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelPract/GetPreExmSpelPractListForVocational', paramObject);
            return promise;
        }
        this.GetPreExmSpelPractByPrePractCntrID = function (ZoneType, PrePractCntrID) {
            var paramObject = { "ZoneType": ZoneType, "PrePractCntrID": PrePractCntrID };
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelPract/GetPreExmSpelPractByPrePractCntrID', paramObject);
            return promise;
        }
        this.GetPreExamSpellListByPreExmSplPrID = function (PreExmSplPrID) {
            var paramObject = { "PreExmSplPrID": PreExmSplPrID };
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelPract/GetPreExamSpellListByPreExmSplPrID', paramObject);
            return promise;
        }
        this.GetPreExmSpelPractByID = function (PreExmSplPrID) {
            var paramObject = { "PreExmSplPrID": PreExmSplPrID };
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelPract/GetPreExmSpelPractByID', paramObject);
            return promise;
        }
        this.GetPracCenterList = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelPract/GetPracCenterList', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (PreExmSplPrID) {
            var paramObject = { "PreExmSplPrID": PreExmSplPrID };
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelPract/GetCheckDependancy', paramObject);
            return promise;
        }
        this.UpdatePractCenterSpell = function (object) {
            var promise = DataAccessService.postData('api/PreExmSpelPract/PostPractCenterSpell', object);
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
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicExamSubjectListReport', paramObject);
            return promise;
        }
        this.GetBasicExamSubjectList = function (CourseID, ExamID) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicExamSubjectList', paramObject);
            return promise;
        }
        this.GetPracCenterListByDistrictIDandZoneID = function (ExamInstID, DistrictID, ZoneID, ZoneType) {
            var paramObject = { "ExamInstID": ExamInstID, "DistrictID": DistrictID, "ZoneID": ZoneID, "ZoneType": ZoneType };
            var promise = DataAccessService.getDataWithPara('api/PreExmSpelPract/GetPracCenterListByDistrictIDandZoneID', paramObject);
            return promise;
        }

    });
});