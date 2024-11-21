define(['app'], function (app) {
    app.service("NRCorrectionApprovalListService", function (DataAccessService) {       
        this.GetAcademicYear = function () {
            var promise = DataAccessService.getDataWithPara('api/BasicAcademicYear/GetBasicAcademicYearListForRequests');
            return promise;
        }

        this.GetNRCorrectionApprovalList = function (AcdYrID, DistrictIDs, SysUsrGrpID) {
            var paramObject = { "AcdYrID": AcdYrID, "DistrictIDs": DistrictIDs, "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetNRCorrectionApprovalList', paramObject);
            return promise;
        }

        this.GetCandidateByCatType = function (CollegeID, DistrictIDs, ReqStatus, SysUsrGrpID) {
            var paramObject = { "CollegeID": CollegeID, "DistrictIDs": DistrictIDs, "ReqStatus": ReqStatus, "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetCandidateByCatType', paramObject);
            return promise;
        }

        this.GetCandidateDetails = function (PRNNo, CollegeID, SysUsrGrpID, ReqStatus) {
            var paramObject = { "PRNNo": PRNNo, "CollegeID": CollegeID, "SysUsrGrpID": SysUsrGrpID, "ReqStatus": ReqStatus };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetCandidateDetails', paramObject);
            return promise;
        }

        this.UpdateNRCorrectionStatus = function (object) {           
            var promise = DataAccessService.postData('api/NRDetail/UpdateNRCorrectionStatus', object);
            return promise;
        }
        this.GetSubjectData = function (ExmFrmID) {
            var paramObject = { "ExmFrmID": ExmFrmID };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetSubjectDetailsForApproval', paramObject);
            return promise;
        }
        this.GetMasterData = function (PRNNo, ExamID) {
            var paramObject = { "PRNNo": PRNNo, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetVerificationDetailsForApproval', paramObject);
            return promise;
        }
        //Report For College
        this.GetDataPreExamNRCorrectionList = function (CollegeID, CourseID, ExamID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetDataPreExamNRCorrectionList', paramObject);
            return promise;
        }

        this.GetCandidateDetailByPRNNo = function (CollegeID, PreStudRegID, type) {
            var paramObject = { "CollegeID": CollegeID, "PreStudRegID": PreStudRegID, "ReqType": type };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetCandidateDetailByPRNNo', paramObject);
            return promise;
        }

        this.ShowMarksSheet = function (PRNNo) {
            var paramObject = { "PRNNo": PRNNo };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/ShowMarksSheet', paramObject);
            return promise;
        }
    });
});