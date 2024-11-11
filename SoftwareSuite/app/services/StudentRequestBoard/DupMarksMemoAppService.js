define(['app'], function (app) {
    app.service("DupMarksMemoAppService", function (DataAccessService) {
        this.UpdateDupMarksMemoApp = function (object) {
            var promise = DataAccessService.postData('api/ReqDupMarksMemo/PostApprovedReqDupMarksMemo', object);
            return promise;
        }
        this.GetReqDupMarksMemoByID = function (DupMemoID) {
            var paramObject = { "DupMemoID": DupMemoID };
            var promise = DataAccessService.getDataWithPara('api/ReqDupMarksMemo/GetReqDupMarksMemoByID', paramObject);
            return promise;
        }
        this.FillDupMarksMemoAppDetailsList = function (CourseID, ExamID, BranchID, UserGrp, EditData) {
            var paramObject = { "CourseID":CourseID, "ExamID":ExamID, "BranchID":BranchID, "UserGrp": UserGrp, "EditData": EditData };
            var promise = DataAccessService.getDataWithPara('api/ReqDupMarksMemo/GetDupMarksMemoAppDetailsList', paramObject);
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
            var promise = DataAccessService.getDataWithPara('api/ReqDupMarksMemo/GetCertPdf', paramObject);
            return promise;
        }
    });
});