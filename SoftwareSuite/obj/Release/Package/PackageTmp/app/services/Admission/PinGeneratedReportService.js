define(['app'], function (app) {
    app.service("PinGeneratedReportService", function (DataAccessService) {
   
        this.GetPinGeneratedReportInfo = function (AcademicId) {
            var paramsobject =  { "AcademicId" : AcademicId };
            var promise = DataAccessService.getDataWithPara('api/Admission/GetAdmissionStatistics', paramsobject);
            return promise;
        }
    });
});
