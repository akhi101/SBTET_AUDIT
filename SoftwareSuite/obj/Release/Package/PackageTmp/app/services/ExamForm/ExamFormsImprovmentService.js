define(['app'], function (app) {
    app.service("ExamFormsImprovmentService", function (DataAccessService) {
        this.AddExamForms = function (object) {
            var promise = DataAccessService.postData('api/ExamForms/PostInsertExamForms', object); //PutExamForms
            return promise;
        }
        this.UpdateExamForms = function (object) {
            var promise = DataAccessService.postData('api/ExamForms/PostExamForms', object);
            return promise;
        }
        this.DeleteExamForms = function (ExmFrmID, UpdLoginID) {
            var paramObject = { "ExmFrmID": ExmFrmID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/ExamForms/DeleteExamForms', paramObject);
            return promise;
        }
        this.GetExamFormsList = function (AcdYrID, CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormsListImprovment', paramObject);
            return promise;
        }
        this.GetExamFormsById = function (ExmFrmID) {
            var paramObject = { "ExmFrmID": ExmFrmID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormsById', paramObject);
            return promise;
        }
        this.GetBasicAcademicYearListForExamForm = function () {
            var data = DataAccessService.getDataAll('api/BasicAcademicYear/GetBasicAcademicYearListForExamForm');
            return data;
        }
        this.GetExamFormDataByPrnNo = function (PRNNo, AcdYrID, CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "PRNNo": PRNNo, "AcdYrID": AcdYrID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormDataByPrnNo', paramObject);
            return promise;
        }
        this.GetExmFrmMaxNo = function (AcdYrID, CollegeID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExmFrmMaxNo', paramObject);
            return promise;
        }

        this.GetBasicBranchListForRegStud = function (CourseID, CollegeID) {
            var paramObject = { "CourseID": CourseID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicBranchListForRegStud', paramObject);
            return promise;
        }
        this.GetBasicBranchListByCourseID = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByCourseID', paramObject);
            return promise;
        }

        this.GetPRNDataList = function (PRNNo) {
            var paramObject = { "PRNNo": PRNNo };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetPRNDataList', paramObject);
            return promise;
        }
        this.GetMainGroupListByCollegeId = function (CollegeID, CourseID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetMainGroupListByCollegeId', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByDate = function (object) {
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetAcademicYearFeesByDate', object);
            return promise;
        }
        this.GetGroupSubjects = function (MainGrpID, ExamID) {
            var paramObject = { "MainGrpID": MainGrpID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetGroupSubjects', paramObject);
            return promise;
        }
        this.GetCourseListForRegStud = function (CollegeID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCourseListForRegStud', paramObject);
            return promise;
        }
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
    });
});