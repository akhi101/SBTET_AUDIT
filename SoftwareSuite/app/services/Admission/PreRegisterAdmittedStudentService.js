define(['app'], function (app) {
    app.service("PreRegisterAdmittedStudentService", function (DataAccessService) {
        this.PutSSCStudentDetails = function (object) {
            var promise = DataAccessService.postData('api/PreStudentReg/PostSSCStudentDetails', object); //put
            return promise;
        }
        this.CheckHallTicketNoPresent = function (AcdYrID, SSCHallTicket) {
            var paramObject = { "AcdYrID": AcdYrID, "SSCHallTicket": SSCHallTicket };
            var promise = DataAccessService.getDataWithPara('api/PreStudentReg/GetCheckHallTicketNoPresent', paramObject);
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
            var data = DataAccessService.getDataAll('api/PreStudentReg/GetAdmissionMaxNo');
            return data;
        }
        this.GetBasicBranchListForRegStud = function (CourseID, CollegeID) {
            var paramObject = { "CourseID": CourseID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicBranchListForRegStud', paramObject);
            return promise;
        }
        this.GetBasicSubjectListForSecondLangaugeInRegStud = function (CollegeID, BranchID, CourseID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID, "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicSubjectListForSecondLangaugeInRegStud', paramObject);
            return promise;
        }
        this.GetBasicMediumInRegStud = function (CollegeID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicMediumInRegStud', paramObject);
            return promise;
        }
        this.GetMainGroupListForRegStud = function (CollegeID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListForRegStud', paramObject);
            return promise;
        }
        this.GetCourseListForRegStud = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetCourseListForRegStud', paramObject);
            return promise;
        }
    });
});