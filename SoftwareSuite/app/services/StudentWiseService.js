define(['app'], function (app) {
    app.service("StudentWiseService", function (DataAccessService) {
        this.GetBranchWiseReport = function (CollegeId,SchemeId, SemYearId,BranchId) {
  
            var paramObject = {"CollegeId":CollegeId, "SchemeId": SchemeId, "SemYearId": SemYearId,"BranchId":BranchId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetBranchWiseReport', paramObject);
            return promise;
        }
        this.GetStudentWiseReport = function (SemYearId, Pin, SchemeId, ExamTypeId) {

            var paramObject = { "SemYearId": SemYearId, "Pin": Pin, "SchemeId": SchemeId, "ExamTypeId": ExamTypeId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetStudentWiseReport', paramObject);
            return promise;
        }
        this.GetSchemeSemBranchInfo = function (CollegeId, SchemeId, SemYearId, BranchId) {

            var paramObject = { "CollegeId": CollegeId};
            var promise = DataAccessService.getDataWithPara('api/Results/GetSchemeSemBranchInfo', paramObject);
            return promise;
        }
        this.GetExamTypeInfo = function (SchemeId, SemYearId) {
            var paramObject = { "SchemeId": SchemeId, "SemYearId": SemYearId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetExamTypeInfo', paramObject);
            return promise;
        }
    });
});