define(['app'], function (app) {
    app.service("ExamFormCategoryThreeService", function (DataAccessService) {
        this.AddExamFormCategoryThree = function (object) {
            var promise = DataAccessService.postData('api/ExamForms/PostInsertExamForms', object); //PutExamForms
            return promise;
        }
        this.UpdateExamFormCategoryThree = function (object) {
            var promise = DataAccessService.postData('api/ExamForms/PostExamForms', object);
            return promise;
        }
        this.DeleteExamFormCategoryThree = function (ExmFrmID, UpdLoginID) {
            var paramObject = { "ExmFrmID": ExmFrmID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/ExamForms/DeleteExamForms', paramObject);
            return promise;
        }
        this.GetExamFormCategoryThreeList = function (ExamInstID, CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormCategoryThreeList', paramObject);
            return promise;
        }
        this.GetExamFormCategoryThreeById = function (ExmFrmID) {
            var paramObject = { "ExmFrmID": ExmFrmID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormsById', paramObject);
            return promise;
        }
        this.GetBasicAcademicYearListForExamForm = function () {
            var data = DataAccessService.getDataAll('api/BasicAcademicYear/GetBasicAcademicYearListForExamForm');
            return data;
        }
        this.GetExamFormDataByPrnNo = function (PRNNo, ExamInstID, CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "PRNNo": PRNNo, "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormDataByPrnNoForCatThree', paramObject);
            return promise;
        }

        this.GetExmFrmMaxNo = function (ExamInstID, CollegeID) {
            var paramObject = { "ExamInstID": ExamInstID, "CollegeID": CollegeID };
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
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetAcademicYearFeesByDateForImprovement', object);
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
        this.GetCheckPRNNoPresent = function (PRNNo, ExamInstID) {
            var paramObject = { "PRNNo": PRNNo, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCheckPRNNoPresent', paramObject);
            return promise;
        }
        this.GetCurrExmInstSchedule = function (ExamInstID, ExamID) {
            var paramObject = { "ExamInstID": ExamInstID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCurrExmInstSchedule', paramObject);
            return promise;
        }
        this.GetPhysDisbList = function () {
            var data = DataAccessService.getDataAll('api/BasicPhysDisability/GetBasicPhysDisabilityList');
            return data;
        }
        this.GetSpclConsList = function () {
            var data = DataAccessService.getDataAll('api/BasicSpclConsiderations/GetBasicSpclConsiderationsList');
            return data;
        }
        this.GetBasicMediumList = function () {
            var data = DataAccessService.getDataAll('api/BasicMedium/GetBasicMediumList');
            return data;
        }
        this.GetcheckstudPassOrNot = function (PRNNo, ExamInstID, CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "PRNNo": PRNNo, "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetcheckstudPassOrNot', paramObject);
            return promise;
        }
        this.GetcheckstudPassOrNotForCatThree = function (PRNNo, ExamInstID, CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "PRNNo": PRNNo, "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetcheckstudPassOrNotForCatThree', paramObject);
            return promise;
        }
        
        this.GetCheckUnStudCase = function (PRNNo, ApplicationDate, ExamInstID) {
            var paramObject = { "PRNNo": PRNNo, "ApplicationDate": ApplicationDate, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/UnfStudCases/GetCheckUnStudCase', paramObject);
            return promise;
        }
        this.GetStudCatList = function () {
            var data = DataAccessService.getDataAll('api/ExamForms/GetStudCatList');
            return data;
        }
        this.GetInstScheduleDate = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetInstScheduleDate', paramObject);
            return promise;
        }
        this.GetSSCHallTicketNoAndInsertIntoPrestudent = function (PRNNo) {
            var paramObject = { "PRNNo": PRNNo };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetSSCHallTicketNoAndInsertIntoPrestudent', paramObject);
            return promise;
        }
        this.GetPrnNoCountInPrestudentReg = function (PRNNo) {
            var paramObject = { "PRNNo": PRNNo };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetPrnNoCountInPrestudentReg', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByDateForBridge = function (ExamInstID, ExamID) {
            var paramObject = { "ExamInstID": ExamInstID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetAcademicYearFeesByDateForBridge', paramObject);
            return promise;
        }
        this.GetRegularExamFormFees = function (ExamInstID, ExamID) {
            var paramObject = { "ExamInstID": ExamInstID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetRegularExamFormFees', paramObject);
            return promise;
        }
        this.AddExamFormUpdatedAlreadyGenerated = function (object) {
            var promise = DataAccessService.postData('api/ExamForms/PostAddExamFormUpdatedAlreadyGenerated', object);
            return promise;
        }
        this.GetReexamFlagForFirstYr = function (ExamInstID, ExamID) {
            var paramObject = { "ExamInstID": ExamInstID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetReexamFlagForFirstYr', paramObject);
            return promise;
        }

    });
});