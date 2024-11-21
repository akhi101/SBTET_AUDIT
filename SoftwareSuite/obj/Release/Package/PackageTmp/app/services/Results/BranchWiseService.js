define(['app'], function (app) {
    app.service("BranchWiseService", function (DataAccessService) {
        this.GetBranchWiseReport = function (CollegeId, SchemeId, SemYearId, ExamTypeId, BranchId, ExamMonthYearId) {
            var paramObject = {
                "CollegeId": CollegeId, "SchemeId": SchemeId, "SemYearId": SemYearId, "ExamTypeId": ExamTypeId, "BranchId": BranchId, "ExamMonthYearId": ExamMonthYearId
            };
            var promise = DataAccessService.getDataWithPara('api/Results/GetBranchWiseReport', paramObject);
            return promise;
        }
        this.GetC18MidBranchWiseReport = function (CollegeId, SchemeId, SemYearId, ExamTypeId, BranchId, AcademicId) {
            var paramObject = {
                "CollegeId": CollegeId, "SchemeId": SchemeId, "SemYearId": SemYearId, "ExamTypeId": ExamTypeId, "BranchId": BranchId, "AcademicId": AcademicId
            };
            var promise = DataAccessService.getDataWithPara('api/Results/GetC18MidBranchWiseReport', paramObject);
            return promise;
        }
        this.getExamMonthYear = function () {
            var promise = DataAccessService.getDataAll('api/Results/GetExamMonthYear');
            return promise;
        }

        this.GetBranchWiseOldReport = function (CollegeId, SchemeId, SemYearId, ExamTypeId, BranchId) {
            var paramObject = {
                "CollegeId": CollegeId, "SchemeId": SchemeId, "SemYearId": SemYearId, "ExamTypeId": ExamTypeId, "BranchId": BranchId
            };
            var promise = DataAccessService.getDataWithPara('api/Results/GetBranchWiseOldReport', paramObject);
            return promise;
        }
        this.GetSchemeSemBranchInfo = function (CollegeId) {
            var paramObject = { "CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetSchemeSemBranchInfo', paramObject);
            return promise;
        }
        this.GetCollegesSchemeSemInfo = function () {           
            var promise = DataAccessService.getDataWithPara('api/Results/GetCollegesSchemeSemInfo');
            return promise;
        }

        this.GetExamTypeInfo = function (SchemeId, SemYearId) {
            var paramObject = { "SchemeId": SchemeId, "SemYearId": SemYearId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetExamTypeInfo', paramObject);
            return promise;
        }
    });
});