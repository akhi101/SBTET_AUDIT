define(['app'], function (app) {
    app.service("TrueExMarksMemoAppService", function (DataAccessService) {
        this.UpdateTrueExMarksMemoApp = function (object) {
            var promise = DataAccessService.postData('api/ReqTrueExMarksMemo/PostApprovedReqTrueExMarksMemo', object);
            return promise;
        }
        this.GetReqTrueExMarksMemoByID = function (TrueExMrkID) {
            var paramObject = { "TrueExMrkID": TrueExMrkID };
            var promise = DataAccessService.getDataWithPara('api/ReqTrueExMarksMemo/GetReqTrueExMarksMemoByID', paramObject);
            return promise;
        }
        this.FillTrueExMarksMemoAppDetailsList = function (CourseID, ExamID, BranchID, UserGrp, EditData) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "UserGrp": UserGrp, "EditData": EditData };
            var promise = DataAccessService.getDataWithPara('api/ReqTrueExMarksMemo/GetTrueExMarksMemoAppDetailsList', paramObject);
            return promise;
        }
        //this.GetBasicExamList = function (CourseID) {
        //    var paramObject = { "CourseID": CourseID };
        //    var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
        //    return promise;
        //}
        //this.GetBasicCourseList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
        //    return data;
        //}
        //this.GetBasicBranchList = function (CourseID) {
        //    var paramObject = { "CourseID": CourseID };
        //    var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByCourseID', paramObject);
        //    return promise;
        //}
    });
});