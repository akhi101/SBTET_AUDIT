define(['app'], function (app) {
    app.service("ReverifAppService", function (DataAccessService) {
        this.UpdateReverifApp = function (object) {
            var promise = DataAccessService.postData('api/ReqReverif/PostApprovedReqReverif', object);
            return promise;
        }
        this.GetReqReverifByID = function (ReVerifID) {
            var paramObject = { "ReVerifID": ReVerifID };
            var promise = DataAccessService.getDataWithPara('api/ReqReverif/GetReqReverifByID', paramObject);
            return promise;
        }
        this.FillReverifAppDetailsList = function (CourseID, ExamID, BranchID, UserGrp, EditData) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "UserGrp": UserGrp, "EditData": EditData };
            var promise = DataAccessService.getDataWithPara('api/ReqReverif/GetReverifAppDetailsList', paramObject);
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