define(['app'], function (app) {
    app.service("CcicStudentResultService", function (DataAccessService) {


        
        this.GetStudentResult = function (AcademicYearID,ExamMonthYearID,PIN) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "PIN": PIN
            };
            var promise = DataAccessService.getDataWithPara('api/CcicStudentResult/GetStudentResult', paramObj);
            return promise;
        };
       

    });
});