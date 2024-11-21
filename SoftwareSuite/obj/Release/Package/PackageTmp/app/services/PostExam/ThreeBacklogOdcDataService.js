define(['app'], function (app) {
    app.service("ThreeBacklogOdcDataService", function (DataAccessService) {

        this.ThreeBacklogOdcData = function (ExamMonthYearId) {
            var paramObj = { "ExamMonthYearId": ExamMonthYearId }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/ThreeBacklogOdcData', paramObj);
            return promise;
        };
    });
});