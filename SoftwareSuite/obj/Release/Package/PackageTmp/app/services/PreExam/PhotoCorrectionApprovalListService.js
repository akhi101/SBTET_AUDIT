define(['app'], function (app) {
    app.service("PhotoCorrectionApprovalListService", function (DataAccessService) {       
        this.GetAcademicYear = function () {
            var promise = DataAccessService.getDataWithPara('api/BasicAcademicYear/GetBasicAcademicYearListForRequests');
            return promise;
        }

        this.GetPhotoCorrectionApprovalList = function (AcdYrID, DistrictIDs, SysUserID) {
            var paramObject = { "AcdYrID": AcdYrID, "DistrictIDs": DistrictIDs, "SysUserID": SysUserID };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetPhotoCorrectionApprovalList', paramObject);
            return promise;
        }

        this.GetCandidateDetails = function (CollegeID, TypeID, SysUserID) {
            var paramObject = { "CollegeID": CollegeID, "TypeID": TypeID, "SysUserID": SysUserID };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetCandidateByCatTypeForPhoto', paramObject);
            return promise;
        }

        this.UpdateNRCorrectionStatus = function (object) {           
            var promise = DataAccessService.postData('api/NRDetail/UpdateNRCorrectionStatusForPhoto', object);
            return promise;
        }
        //this.GetSubjectData = function (ExmFrmID) {
        //    var paramObject = { "ExmFrmID": ExmFrmID };
        //    var promise = DataAccessService.getDataWithPara('api/NRDetail/GetSubjectDetailsForApproval', paramObject);
        //    return promise;
        //}
        //this.GetMasterData = function (PRNNo, ExamID) {
        //    var paramObject = { "PRNNo": PRNNo, "ExamID": ExamID };
        //    var promise = DataAccessService.getDataWithPara('api/NRDetail/GetVerificationDetailsForApproval', paramObject);
        //    return promise;
        //}
        ////Report For College
        //this.GetDataPreExamNRCorrectionList = function (CollegeID, CourseID, ExamID) {
        //    var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID };
        //    var promise = DataAccessService.getDataWithPara('api/NRDetail/GetDataPreExamNRCorrectionList', paramObject);
        //    return promise;
        //}

        //this.GetCandidateDetailByPRNNo = function (CollegeID, PreStudRegID, type) {
        //    var paramObject = { "CollegeID": CollegeID, "PreStudRegID": PreStudRegID, "ReqType": type };
        //    var promise = DataAccessService.getDataWithPara('api/NRDetail/GetCandidateDetailByPRNNo', paramObject);
        //    return promise;
        //}

        //this.ShowMarksSheet = function (PRNNo) {
        //    var paramObject = { "PRNNo": PRNNo };
        //    var promise = DataAccessService.getDataWithPara('api/NRDetail/ShowMarksSheet', paramObject);
        //    return promise;
        //}
    });
});