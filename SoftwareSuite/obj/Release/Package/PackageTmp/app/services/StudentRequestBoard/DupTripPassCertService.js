define(['app'], function (app) {
    app.service("DupTripPassCertAppService", function (DataAccessService) {
        this.UpdateDupTripPassCertApp = function (object) {
            var promise = DataAccessService.postData('api/ReqDupTripPassCert/PostApprovedReqDupTripPassCert', object);
            return promise;
        }
        this.GetReqDupTripPassCertByID = function (PassCertID) {
            var paramObject = { "PassCertID": PassCertID };
            var promise = DataAccessService.getDataWithPara('api/ReqDupTripPassCert/GetReqDupTripPassCertByID', paramObject);
            return promise;
        }
        this.FillDupTripPassCertAppDetailsList = function (CourseID, ExamID, BranchID, UserGrp, EditData) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "UserGrp": UserGrp, "EditData": EditData };
            var promise = DataAccessService.getDataWithPara('api/ReqDupTripPassCert/GetDupTripPassCertAppDetailsList', paramObject);
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
        this.GetCertPdf = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqDupTripPassCert/GetCertPdf', paramObject);
            return promise;
        }
    });
});