define(['app'], function (app) {
    app.service("PracticalReportService", function (DataAccessService) {

  
        this.GetCourseByPraticalDateList = function (CourseID, ExamId) {
            var paramObject = { "CourseID": CourseID, "ExamId": ExamId };
            var promise = DataAccessService.getDataWithPara('api/PracticalReport/GetCourseByPraticalDateList', paramObject);
            return promise;
        }     
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/PracticalReport/GetBasicCourseList');
            return data;
        }
        this.GetBasicParticalSubjectList = function (CourseID, ExamId, PrDate, SessionType) {
            var paramObject = { "CourseID": CourseID, "ExamId": ExamId, "PrDate": PrDate, "SessionType": SessionType };
            var data = DataAccessService.getDataWithPara('api/PracticalReport/GetBasicParticalSubjectList', paramObject);
            return data;
        }
        this.GetDrillDownStudentDetailsListENVandETH = function (ExamInstID, ExmSubID) {
            var paramObject = { "ExamInstID": ExamInstID, "ExmSubID": ExmSubID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsListENVandETH', paramObject);
            return promise;
        }   

    });
});