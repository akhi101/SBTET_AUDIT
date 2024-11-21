define(['app'], function (app) {
    app.service("GenratePRNService", function (DataAccessService) {
        this.GetCourseListForRegStud = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetCourseListForRegStud', paramObject);
            return promise;
        }
        this.FillGenratePRNDetailsList = function (CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/PrestudentReg/GetGenratePRNDetailsList', paramObject);
            return promise;
        }
       
    });
});