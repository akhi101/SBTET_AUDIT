define(['app'], function (app) {
    app.service("ExamFormsRepeaterService", function (DataAccessService) {
        this.AddExamFormsRepeater = function (object) {
            var promise = DataAccessService.postData('api/ExamFormsRepeater/PostInsertExamFormsRepeater', object);
            return promise;
        }
        this.UpdateExamFormsRepeater = function (object) {
            var promise = DataAccessService.postData('api/ExamFormsRepeater/PostExamFormsRepeater', object);
            return promise;
        }
        this.DeleteExamFormsRepeater = function (ExmFrmID, UpdLoginID) {
            var paramObject = { "ExmFrmID": ExmFrmID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/ExamFormsRepeater/DeleteExamFormsRepeater', paramObject);
            return promise;
        }
        this.GetExamFormsRepeaterList = function (AcdYrID, CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/ExamFormsRepeater/GetExamFormsList', paramObject);
            return promise;
        }
        this.GetExamFormsRepeaterById = function (ExmFrmID) {
            var paramObject = { "ExmFrmID": ExmFrmID };
            var promise = DataAccessService.getDataWithPara('api/ExamFormsRepeater/GetExamFormsById', paramObject);
            return promise;
        }
        this.GetBasicAcademicYearListForExamForm = function () {
            var data = DataAccessService.getDataAll('api/BasicAcademicYear/GetBasicAcademicYearListForExamForm');
            return data;
        }
        this.GetExmFrmMaxNo = function (AcdYrID, CollegeID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ExamFormsRepeater/GetExmFrmMaxNo', paramObject);
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
            var promise = DataAccessService.getDataWithPara('api/ExamFormsRepeater/GetMainGroupListByCollegeId', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetGroupSubjects = function (MainGrpID, ExamID) {
            var paramObject = { "MainGrpID": MainGrpID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/ExamFormsRepeater/GetGroupSubjects', paramObject);
            return promise;
        }
        this.GetCasteList = function () {
            var data = DataAccessService.getDataAll('api/BasicCaste/GetBasicCasteList');
            return data;
        }
        this.GetSubCastListByCasteID = function (CasteId) {
            var paramObject = { "CasteId": CasteId };
            var promise = DataAccessService.getDataWithPara('api/BasicSubCaste/GetSubCastListByCasteID', paramObject);
            return promise;
        }
        this.GetBasicSubjectListForSecondLangaugeInRegStud1 = function (CollegeID, CourseID, AcdYrID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicSubjectListForSecondLangaugeInRegStud', paramObject);
            return promise;
        }
        this.GetBasicMediumInRegStud = function (CollegeID, BranchID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicMediumInRegStud', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByDate = function (AcdYrID) {
            var paramObject = { "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByDate', paramObject);
            return promise;
        }
        this.GetCheckUnStudCase = function (PRNNo, ApplicationDate) {
            var paramObject = { "PRNNo": PRNNo, "ApplicationDate": ApplicationDate };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCheckUnStudCase', paramObject);
            return promise;
        }
        this.GetStudCatList = function () {
            var data = DataAccessService.getDataAll('api/ExamForms/GetStudCatList');
            return data;
        }
        this.GetInstScheduleDate = function (ExamInstID, ApplicationDate) {
            var paramObject = { "ExamInstID": ExamInstID, "ApplicationDate": ApplicationDate };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetInstScheduleDate', paramObject);
            return promise;
        }
    });
});