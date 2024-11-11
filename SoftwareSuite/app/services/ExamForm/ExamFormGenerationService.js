define(['app'], function (app) {
    app.service("ExamFormGenerationService", function (DataAccessService) {
        this.GetGenerateExamForms = function (object) {
            var paramObject = {
                "AcdYrID": object.AcdYrID,
                "CourseID": object.CourseID,
                "ExamID": object.ExamID,              
                "CollegeID": object.CollegeID,
                "CreLoginID": object.CreLoginID,            
                "DistrictID": object.DistrictID
            };

            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetGenerateExamForms', paramObject);
            return promise;
        }
   
    });
});