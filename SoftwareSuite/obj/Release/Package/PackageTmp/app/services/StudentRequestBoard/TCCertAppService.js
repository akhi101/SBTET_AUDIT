define(['app'], function (app) {
    app.service("TCCertAppService", function (DataAccessService) {
        this.UpdateTCCertApp = function (object) {
            var promise = DataAccessService.postData('api/ReqTCCert/PostApprovedReqTCCert', object);
            return promise;
        }
        this.GetReqTCCertByID = function (TCCertID) {
            var paramObject = { "TCCertID": TCCertID };
            var promise = DataAccessService.getDataWithPara('api/ReqTCCert/GetReqTCCertByID', paramObject);
            return promise;
        }
        this.FillTCCertAppDetailsList = function (UserGrp, EditData) {
            var paramObject = { "UserGrp": UserGrp, "EditData": EditData };
            var promise = DataAccessService.getDataWithPara('api/ReqTCCert/GetTCCertAppDetailsList', paramObject);
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