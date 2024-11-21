define(['app'], function (app) {
    app.service("TranscriptsAppService", function (DataAccessService) {
        this.UpdateTranscriptsApp = function (object) {
            var promise = DataAccessService.postData('api/ReqTranscripts/PostApprovedReqTranscripts', object);
            return promise;
        }
        this.GetReqTranscriptsByID = function (TrnSrptID) {
            var paramObject = { "TrnSrptID": TrnSrptID };
            var promise = DataAccessService.getDataWithPara('api/ReqTranscripts/GetReqTranscriptsByID', paramObject);
            return promise;
        }
        this.FillTranscriptsAppDetailsList = function (CourseID, ExamID, BranchID, UserGrp, EditData) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "UserGrp": UserGrp, "EditData": EditData };
            var promise = DataAccessService.getDataWithPara('api/ReqTranscripts/GetTranscriptsAppDetailsList', paramObject);
            return promise;
        }
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
        this.GetBasicBranchList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByCourseID', paramObject);
            return promise;
        }
    });
});