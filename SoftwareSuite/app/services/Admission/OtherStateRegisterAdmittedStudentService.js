define(['app'], function (app) {
    app.service("OtherStateRegisterAdmittedStudentService", function (DataAccessService) {
        this.PutSSCStudentDetails = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostSSCStudentDetails', object); //put
            return promise;
        }
        this.CheckHallTicketNoPresent = function (AcdYrID, SSCHallTicket) {
            var paramObject = { "AcdYrID": AcdYrID, "SSCHallTicket": SSCHallTicket };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckHallTicketNoPresent', paramObject);
            return promise;
        }
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetBasicExamListAll = function () {
            var data = DataAccessService.getDataAll('api/BasicExam/GetBasicExamList');
            return data;
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
        this.GetBasicBranchListForRegStud = function (CourseID, CollegeID) {
            var paramObject = { "CourseID": CourseID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicBranchListForRegStud', paramObject);
            return promise;
        }
        this.GetBasicCollegeList = function () {
            var data = DataAccessService.getDataAll('api/BasicCollege/GetBasicCollegeList');
            return data;
        }
        this.GetMaxAdmNo = function () {
            var data = DataAccessService.getDataAll('api/StudentReg/GetAdmissionMaxNo');
            return data;
        }
        this.CheckAddBranchCount = function (CollegeID, AcdYrID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "AcdYrID": AcdYrID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckAddBranchCount', paramObject);
            return promise;
        }
    });
});