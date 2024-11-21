define(['app'], function (app) {
    app.service("EnrollStudentRequestService", function (DataAccessService) {
        this.PutSSCStudentDetails = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostSSCStudentDetails', object); //put
            return promise;
        }
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID};
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetCourseListForRegStud = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetCourseListForRegStud', paramObject);
            return promise;
        }
        this.GetBasicBranchListForRegStud = function (CourseID, CollegeID) {
            var paramObject = { "CourseID": CourseID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicBranchListForRegStud', paramObject);
            return promise;
        }
        this.FillEnrollStudentRequestDetailsListAll = function (CollegeID, CourseID, ExamID, BranchID,AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetEnrollStudentRequestDetailsListAll', paramObject);
            return promise;
        }
        this.GetStudEnrollDataByEnrollColID = function (StudEnrolColID) {
            var paramObject = { "StudEnrolColID": StudEnrolColID};
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetStudEnrollDataByEnrollColID', paramObject);
            return promise;
        }
        this.GetBasicBoardList = function () {
            var data = DataAccessService.getDataAll('api/BasicBoard/GetBasicBoardList');
            return data;
        }
        this.GetBasicBranchList = function () {
            var data = DataAccessService.getDataAll('api/BasicBranch/GetBasicBranchList');
            return data;
        }
        this.GetBasicExamList = function () {
            var data = DataAccessService.getDataAll('api/BasicExam/GetBasicExamList');
            return data;
        }
        this.GetBasicExamListByCourse = function (CourseID, SequenceNo) {
            var paramObject = { "CourseID": CourseID, "SequenceNo": SequenceNo  };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetMainGroupListByCollegeId = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListByCollegeId', paramObject);
            return promise;
        }

        this.GetBasicSubjectListForSecondLangaugeInRegStud = function (CollegeID, CourseID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicSubjectListForSecondLangaugeInRegStud', paramObject);
            return promise;
        }
        this.GetBasicSubjectListForSecondLangaugeInRegStud1 = function (CollegeID, CourseID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicSubjectListForSecondLangaugeInRegStud', paramObject);
            return promise;
        }

        this.GetBasicMediumList = function (CollegeID, BranchID) {
            var data = DataAccessService.getDataAll('api/BasicMedium/GetBasicMediumList');
            return data;
        }
        this.GetBasicSubjectList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubject/GetBasicSubjectList');
            return data;
        }
        this.GetUpdateEnrolFlagStud = function (StudEnrolID,CollegeID) {
            var paramObject = { "StudEnrolID": StudEnrolID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetUpdateEnrolFlagStud', paramObject);
            return promise;
        }

        this.ChecAdmissionNo = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetBasicCollegeByCollegeID', paramObject);
            return promise;
        }

    });
});