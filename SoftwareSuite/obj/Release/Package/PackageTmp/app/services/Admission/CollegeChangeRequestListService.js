define(['app'], function (app) {
    app.service("CollegeChangeRequestListService", function (DataAccessService) {
        this.PutCollegeChanegRequest = function (object) {
            var promise = DataAccessService.postData('api/CollegeChange/PostCollegeChange', object);
            return promise;
        }
        this.GetStudentDataForCollegeChange = function (AcdYrID, YrName, Month, SSCHallTicket, BoardID) {
            var paramObject = { "AcdYrID": AcdYrID,"YrName": YrName, "Month": Month, "SSCHallTicket": SSCHallTicket, "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/CollegeChange/GetStudentDataForCollegeChange', paramObject);
            return promise;
        }
        this.GetCollegeRequestCnt = function (StudRegID, SSCHallTicket, CollegeID) {
            var paramObject = { "StudRegID": StudRegID, "SSCHallTicket": SSCHallTicket, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/CollegeChange/GetCollegeRequestCnt', paramObject);
            return promise;
        }
        this.GetCollegeChangeRequestDataForApproval = function (AcdYrID) {
            var paramObject = { "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/CollegeChange/GetCollegeChangeRequestDataForApproval', paramObject);
            return promise;
        }
        this.GetCollegeChangeRequestDataForApprovalByID = function (CollegeChangeID) {
            var paramObject = { "CollegeChangeID": CollegeChangeID };
            var promise = DataAccessService.getDataWithPara('api/CollegeChange/GetCollegeChangeRequestDataForApprovalByID', paramObject);
            return promise;
        }
        
        this.GetUpdateCollegeChangeRequestApproval = function (CollegeChangeID, Status, ReqApprovalD, ReqRejectedReason) {
            var paramObject = { "CollegeChangeID": CollegeChangeID, "Status": Status, "ReqApprovalD": ReqApprovalD, "ReqRejectedReason": ReqRejectedReason};
            var promise = DataAccessService.getDataWithPara('api/CollegeChange/GetUpdateCollegeChangeRequestApproval', paramObject);
            return promise;
        }
    });
});