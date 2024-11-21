define(['app'], function (app) {
    app.service("RegisterAdmittedStudentService", function (DataAccessService) {
        this.PutSSCStudentDetails = function (object) {
            var promise = DataAccessService.putData('api/StudentReg/PutSSCStudentDetails', object);
            return promise;
        }
        this.CheckHallTicketNoPresent = function (CollegeID, SSCHallTicket) {
            var paramObject = { "CollegeID": CollegeID, "SSCHallTicket": SSCHallTicket };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/CheckHallTicketNoPresent', paramObject);
            return promise;
        }
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
        this.GetBasicBranchList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByCourseID', paramObject);
            return promise;
        }
    });
});