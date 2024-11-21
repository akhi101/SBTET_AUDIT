define(['app'], function (app) {
    app.service("ReCountingAppService", function (DataAccessService) {
        this.UpdateReCountingApp = function (object) {
            var promise = DataAccessService.postData('api/ReqReCounting/PostApprovedReqReCounting', object);
            return promise;
        }
        this.GetReqReCountingByID = function (ReCntMrkID) {
            var paramObject = { "ReCntMrkID": ReCntMrkID };
            var promise = DataAccessService.getDataWithPara('api/ReqReCounting/GetReqReCountingByID', paramObject);
            return promise;
        }
        this.FillReCountingAppDetailsList = function (CourseID, ExamID, BranchID, UserGrp, EditData) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "UserGrp": UserGrp, "EditData": EditData };
            var promise = DataAccessService.getDataWithPara('api/ReqReCounting/GetReCountingAppDetailsList', paramObject);
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