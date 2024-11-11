define(['app'], function (app) {
    app.service("SessionalsService", function (DataAccessService) {       
        this.getSemSubjects = function (semid, branchCode, loadedScheme, subType, examTypeid, collegecode, StudentTypeId, AcademicYearId,ExamMonthYearId) {
            var paramObject = {
                "semid": semid, "branchCode": branchCode, "loadedScheme": loadedScheme, "subType": subType, "examTypeid": examTypeid, "collegecode": collegecode,
                "studenttypeid": StudentTypeId, "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId
            };
           
            return DataAccessService.getDataWithPara('Assessment/getSemSubjects', paramObject);

        }
    });
});
