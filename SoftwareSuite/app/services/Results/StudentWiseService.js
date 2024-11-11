define(['app'], function (app) {
    app.service("StudentWiseService", function (DataAccessService) {
        this.GetBranchWiseReport = function (CollegeId,SchemeId, SemYearId,BranchId) {
  
            var paramObject = {"CollegeId":CollegeId, "SchemeId": SchemeId, "SemYearId": SemYearId,"BranchId":BranchId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetBranchWiseReport', paramObject);
            return promise;
        }
        this.GetBranchWiseOldReport = function (CollegeId, SchemeId, SemYearId, BranchId) {

            var paramObject = { "CollegeId": CollegeId, "SchemeId": SchemeId, "SemYearId": SemYearId, "BranchId": BranchId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetBranchWiseOldReport', paramObject);
            return promise;
        }
        this.GetStudentWiseReport = function (SemYearId, Pin, SchemeId, ExamTypeId) {

            var paramObject = { "SemYearId": SemYearId, "Pin": Pin, "SchemeId": SchemeId, "ExamTypeId": ExamTypeId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetStudentWiseReport', paramObject);
            return promise;
        }
        this.GetOldStudentWiseReport = function (SemYearId, Pin, SchemeId, ExamTypeId) {

            var paramObject = { "SemYearId": SemYearId, "Pin": Pin, "SchemeId": SchemeId, "ExamTypeId": ExamTypeId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetOldStudentWiseReport', paramObject);
            return promise;
        }
        this.GetSchemeSemBranchInfo = function (CollegeId) {
            var paramObject = { "CollegeId": CollegeId};
            var promise = DataAccessService.getDataWithPara('Results/GetSchemeSemBranchInfo', paramObject);
            return promise;
        }
        this.GetSchemeDataForResults = function () {
            var promise = DataAccessService.getDataAll('api/Results/GetSchemeDataForResults');
            return promise;
        }
        this.GetExamTypeForResults = function (SchemeId) {
            var paramObject = { "SchemeId": SchemeId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetExamTypeForResults', paramObject);
            return promise;
        }

        this.GetExamTypeInfo = function (SchemeId, SemYearId) {
            var paramObject = { "SchemeId": SchemeId, "SemYearId": SemYearId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetExamTypeInfo', paramObject);
            return promise;
        }
    });
});