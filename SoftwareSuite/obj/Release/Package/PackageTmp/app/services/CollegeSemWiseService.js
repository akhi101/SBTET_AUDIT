define(['app'], function (app) {
    app.service("CollegeSemWiseService", function (DataAccessService) {
        this.GetCollegeSemWiseReport = function (SchemeId, SemYearId) {
  
            var paramObject = { "SchemeId": SchemeId, "SemYearId": SemYearId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetCollegeSemWiseReport', paramObject);       
            return promise;
        }
       
    });
});