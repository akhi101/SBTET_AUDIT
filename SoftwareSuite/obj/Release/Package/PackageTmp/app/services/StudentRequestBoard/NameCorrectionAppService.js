define(['app'], function (app) {
    app.service("NameCorrectionAppService", function (DataAccessService) {
        this.UpdateNameCorrectionApp = function (object) {
            var promise = DataAccessService.postData('api/ReqNameCorrection/PostApprovedReqNameCorrection', object);
            return promise;
        }
        this.GetReqNameCorrectionByID = function (NameCorID) {
            var paramObject = { "NameCorID": NameCorID };
            var promise = DataAccessService.getDataWithPara('api/ReqNameCorrection/GetReqNameCorrectionByID', paramObject);
            return promise;
        }
        this.FillNameCorrectionAppDetailsList = function (CourseID, ExamID, BranchID, UserGrp, EditData) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "UserGrp": UserGrp, "EditData": EditData };
            var promise = DataAccessService.getDataWithPara('api/ReqNameCorrection/GetNameCorrectionAppDetailsList', paramObject);
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
        this.FillNameCorrectionAppDetailsList = function (UserGrp, EditData) {
            var paramObject = { "UserGrp": UserGrp, "EditData": EditData };
            var promise = DataAccessService.getDataWithPara('api/ReqNameCorrection/GetNameCorrectionAppDetailsList', paramObject);
            return promise;
        }
    });
});