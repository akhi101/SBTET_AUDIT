define(['app'], function (app) {
    app.service("BranchWiseService", function (DataAccessService) {
        this.GetBranchWiseReport = function (CollegeId, SchemeId, SemYearId, ExamTypeId, BranchId) {

            var paramObject = {
                "CollegeId": CollegeId, "SchemeId": SchemeId, "SemYearId": SemYearId, "ExamTypeId": ExamTypeId, "BranchId": BranchId
            };
            var promise = DataAccessService.getDataWithPara('api/Results/GetBranchWiseReport', paramObject);
            return promise;
        }
        this.GetSchemeSemBranchInfo = function (CollegeId, SchemeId, SemYearId, BranchId) {

            var paramObject = { "CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetSchemeSemBranchInfo', paramObject);
            return promise;
        }
        this.GetCollegesSchemeSemInfo = function (CollegeId, SchemeId, SemYearId, BranchId) {

            //var paramObject = { "CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetCollegesSchemeSemInfo');
            return promise;
        }

        this.getExamMonthYear = function () {
            var promise = DataAccessService.getDataAll('api/Results/getExamMonthYear');
            return promise;
        }

        this.GetExamTypeInfo = function (SchemeId, SemYearId) {
            var paramObject = { "SchemeId": SchemeId, "SemYearId": SemYearId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetExamTypeInfo', paramObject);
            return promise;
        }
    });
});