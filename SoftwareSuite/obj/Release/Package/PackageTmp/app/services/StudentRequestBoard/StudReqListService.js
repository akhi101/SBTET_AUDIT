define(['app'], function (app) {
    app.service("StudReqListService", function (DataAccessService) {
        //this.UpdateStudReqList = function (object) {
        //    var promise = DataAccessService.postData('api/ReqTranscripts/PostApprovedReqTranscripts', object);
        //    return promise;
        //}
        //this.GetReqTranscriptsByID = function (TrnSrptID) {
        //    var paramObject = { "TrnSrptID": TrnSrptID };
        //    var promise = DataAccessService.getDataWithPara('api/ReqTranscripts/GetReqTranscriptsByID', paramObject);
        //    return promise;
        //}
        this.FillStudReqListDetailsList = function (UserID) {
            var paramObject = { "UserID": UserID };
            var promise = DataAccessService.getDataWithPara('api/ReqDashboard/GetReqCountByUserID', paramObject);
            return promise;
        }
        this.GetDateFromPaymentDetails = function () {
            var data = DataAccessService.getDataAll('api/ReqDashboard/GetDateFromPaymentDetails')
            return data;
        }
        this.GetReport = function (Date, EditRptType) {
            var paramObject = { "Date": Date, "EditRptType": EditRptType };
            var promise = DataAccessService.getDataWithPara('api/ReqDashboard/GetBDTextReport', paramObject);
            return promise;
        }
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