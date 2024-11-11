define(['app'], function (app) {
    app.service("ExamTypeService", function (DataAccessService) {

        this.GetBranches= function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetBranches');
        };
        this.GetAcdamicyear = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetAcdamicyear');
        };
        this.getActiveSemester = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/getActiveSemester');
        };       
        this.getExamData = function (AcademicYearId, SemId,SchemeId, BrnachId) {
            var paramObject = { "AcademicYearId": AcademicYearId, "SemId": SemId, "SchemeId": SchemeId, "BrnachId": BrnachId};
            return DataAccessService.getDataWithPara('api/PreExamination/getExamData', paramObject);
        }
             this.Savedate = function (AcademicYearId, SemId, SchemeId, BrnachId, json) {
            var paramObject = { "AcademicYearId": AcademicYearId, "SemId": SemId, "SchemeId": SchemeId, "BranchId": BrnachId, "json": json };
            return DataAccessService.postData('api/PreExamination/setDate', paramObject);
        }

    });
});