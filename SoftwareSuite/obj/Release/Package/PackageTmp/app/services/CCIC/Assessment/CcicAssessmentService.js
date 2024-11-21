define(['app'], function (app) {
    app.service("CcicAssessmentService", function (DataAccessService) {


        this.GetCcicAcademicYears = function () {
            return DataAccessService.getDataWithPara('api/CcicAssessment/GetCcicAcademicYears');
        };
        this.GetCcicCurrentAcademicYear = function () {
            return DataAccessService.getDataWithPara('api/CcicAssessment/GetCcicCurrentAcademicYear');
        };

        this.getExamTypes = function () {
            return DataAccessService.getDataWithPara('api/CcicAssessment/GetExamTypes');
        };
        this.GetExamMonthYears = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicAssessment/GetExamMonthYears', paramObj);
            return promise;
        };
        this.AddAssesmentEntryDates = function (DataType, EntryDateID, AcademicYearID, ExamMonthYearID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "EntryDateID": EntryDateID,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/CcicAssessment/AddorUpdateorInActiveAssesmentEntryDates', paramObj);
            return promise;
        }

        this.UpdateAssesmentEntryDates = function (DataType, EntryDateID, AcademicYearID, ExamMonthYearID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "EntryDateID": EntryDateID,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/CcicAssessment/AddorUpdateorInActiveAssesmentEntryDates', paramObj);
            return promise;
        }

        this.SetAssesmentEntryDatesStatus = function (DataType, EntryDateID, AcademicYearID, ExamMonthYearID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "EntryDateID": EntryDateID,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/CcicAssessment/AddorUpdateorInActiveAssesmentEntryDates', paramObj);
            return promise;
        }


        this.GetAssesmentEntryDates = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicAssessment/GetAssesmentEntryDates', paramObj);
            return promise;
        };

        this.VerifyAssesmentEntryDate = function (AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID
            };
            return DataAccessService.getDataWithPara('api/CcicAssessment/VerifyAssesmentEntryDate', paramObj);
        };


        this.getInternalorExternalSubjects = function (AcademicYearID, ExamMonthYearID, InstitutionID, CourseID, ExamTypeID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "InstitutionID": InstitutionID,
                "CourseID": CourseID,
                "ExamTypeID": ExamTypeID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicAssessment/GetInternalorExternalSubjects', paramObj);
            return promise;
        };



        this.getCcicSubjectPinList = function (AcademicYearID, ExamMonthYearID, InstitutionID, CourseID, ExamTypeID, SubjectID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "InstitutionID": InstitutionID,
                "CourseID": CourseID,
                "ExamTypeID": ExamTypeID,
                "SubjectID": SubjectID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicAssessment/GetCcicSubjectPinList', paramObj);
            return promise;
        };

        this.PostStudentMarks = function (MarksList, UserName) {
            var paramObject = {
                "marksdata": MarksList,
                "UserName": UserName
            };
            return DataAccessService.postData('api/CcicAssessment/PostCcicStudentMarks', paramObject);
        };

        this.SubmitMarksEntered = function (AcademicYearID, ExamMonthYearID, InstitutionID, CourseID, ExamTypeID, SubjectID) {
            var paramObject = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "InstitutionID": InstitutionID,
                "CourseID": CourseID,
                "ExamTypeID": ExamTypeID,
                "SubjectID": SubjectID
            };
            var promise = DataAccessService.postData('api/CcicAssessment/SubmitMarksEntered', paramObject);
            return promise;
        };

        this.GetSubjectsReport = function (AcademicYearID, ExamMonthYearID, InstitutionID, CourseID, ExamTypeID) {
            var paramObject = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "InstitutionID": InstitutionID,
                "CourseID": CourseID,
                "ExamTypeID": ExamTypeID,
            };
            var promise=  DataAccessService.getDataWithPara('api/CcicAssessment/GetSubjectsReport', paramObject);
            return promise;
        };
        this.GetAssessmentInstitutionCourses = function (InstitutionID) {
            var paramObject = {
                "InstitutionID": InstitutionID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicAssessment/GetAssessmentInstitutionCourses', paramObject);
            return promise;
        };


        this.GetExamMonthYears = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicAssessment/GetExamMonthYears', paramObj);
            return promise;
        };

        this.GetAssessmentInstituteCount = function (AcademicYearID, ExamMonthYearID,ExamTypeId) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "ExamTypeId": ExamTypeId
            };
            var promise = DataAccessService.getDataWithPara('api/CcicAssessment/GetAssessmentInstituteCount', paramObj);
            return promise;
        };

        this.GetAssessmentInstituteCountExcel = function (AcademicYearID, ExamMonthYearID, ExamTypeId) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "ExamTypeId": ExamTypeId
            };
            var promise = DataAccessService.getDataWithPara('api/CcicAssessment/GetAssessmentInstituteCountExcel', paramObj);
            return promise;
        };

        this.GetAssessmentInstituteCourseCount = function (AcademicYearID, ExamMonthYearID, ExamTypeId,InstitutionID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "ExamTypeId": ExamTypeId,
                "InstitutionID": InstitutionID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicAssessment/GetAssessmentInstituteCourseCount', paramObj);
            return promise;
        };

        this.GetAssesmentInstituteCourseSubjectCount = function (AcademicYearID, ExamMonthYearID, ExamTypeId, InstitutionID,CourseID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "ExamTypeId": ExamTypeId,
                "InstitutionID": InstitutionID,
                "CourseID": CourseID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicAssessment/GetAssesmentInstituteCourseSubjectCount', paramObj);
            return promise;
        };

    });
});