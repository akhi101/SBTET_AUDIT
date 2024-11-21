define(['app'], function (app) {
    app.service("AssessmentService", function (DataAccessService) {
        this.GetCollegesSchemeSemInfo = function (CollegeId) {
            var paramObject = { "CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('Admission/GetCollegesSchemeSemInfo', paramObject);
            return promise;
        };
        this.GetAcademicYearsActive = function () {
            var promise = DataAccessService.getDataAll('Assessment/getAcademicYearsActive');
            return promise;
        };

        this.getFeeAcademicYearsActive = function () {
            var promise = DataAccessService.getDataAll('Assessment/GetFeeAcademicYearsActive');
            return promise;
        };

        this.getSchemeWiseExamTypes = function (AcademicYearId, StudentTypeId, schemeid, SemId, ExamMonthYearId) {
           
            var parmObject = {
                "AcademicYearId": AcademicYearId, "StudentTypeId": StudentTypeId, "SchemeId": schemeid, "SemId": SemId,
                "ExamMonthYearId": ExamMonthYearId
            };
            console.log(parmObject)
            return DataAccessService.getDataWithPara('Assessment/getSchemeWiseExamTypes', parmObject);
        };

        this.getSchemeWiseExams = function (StudentTypeId, schemeid, SemId, SubjectTypeId, ExamMonthYearId) {
            var parmObject = { "StudentTypeId": StudentTypeId, "SchemeId": schemeid, "SemId": SemId, "SubjectTypeId": SubjectTypeId, "ExamMonthYearId": ExamMonthYearId };
            return DataAccessService.getDataWithPara('Assessment/getSchemeWiseExams', parmObject);
        };

        this.getbranchNameById = function (branchId) {
            var paramObject = { "branchcode": branchId };
            return DataAccessService.getDataWithPara('Assessment/getBranchName', paramObject);
        };

        this.GetExamMonthYearAcademicYear = function (Academicyearid) {
            var paramObject = { "Academicyearid": Academicyearid };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetExamMonthYearAcademicYear', paramObject);
            return promise;
        }

        
        this.getSemBySchemes = function (StudentTypeId, SchemeId) {
            var paramObject = { "StudentTypeId": StudentTypeId, "SchemeId": SchemeId };
            return DataAccessService.getDataWithPara('Assessment/getSemByScheme', paramObject);
        };

        this.getActiveSemester = function () {
            return DataAccessService.getDataAll('Assessment/getActiveSemester');
        };

        this.getAllSemesters = function () {
            return DataAccessService.getDataAll('Assessment/getAllSemesters');
        };
        this.getSchemeStatus = function () {
            return DataAccessService.getDataAll('Assessment/getSchemeStatus');
        };
        this.getSemistersSetData = function () {
            return DataAccessService.getDataAll('Assessment/getSemistersSetData');
        };
        
        this.getStatisticalReports = function (semisterId) {
            var paramObject = { "semid": semisterId };
            return DataAccessService.getDataWithPara('Assessment/GetStatisticalReports', paramObject);
        };
        this.getExamType = function (schemeid) {
            var paramObject = { "schemeid": schemeid };
            return DataAccessService.getDataWithPara('Assessment/getExamType', paramObject);
        };
        this.getActiveExamTypes = function () {

            return DataAccessService.getDataAll('Assessment/getActiveExamTypes');
        };

        this.getCollegeAssessmentReports = function (collegecode, examtypeid, studentType, AcademicYearId, Semester, ExamMonthYear) {
            var paramObject = {
                "collegecode": collegecode, "examtypeid": examtypeid, "studentType": studentType
                , "AcademicYearId": AcademicYearId, "Semester": Semester, "ExamMonthYear": ExamMonthYear            };
            return DataAccessService.getDataWithPara('Assessment/getCollegeAssessmentReports', paramObject);
        };


        this.getSubjectsReport = function (CollegeId,  SchemeId,  SemId,  ExamTypeId,  BranchId,  ExamMonthYearId) {
            var paramObject = {
                "CollegeId": CollegeId, "SchemeId": SchemeId, "SemId": SemId, "ExamTypeId": ExamTypeId, "BranchId": BranchId, "ExamMonthYearId": ExamMonthYearId
            };
            return DataAccessService.getDataWithPara('Assessment/getSubjectsReport', paramObject);
        };
        
        this.getExamTypesBySem = function (StudentTypeId,Schemeid) {
            var paramObject = { "StudentTypeId": StudentTypeId, "Schemeid": Schemeid };
            return DataAccessService.getDataWithPara('Assessment/getExamTypesBySem', paramObject);
        };

        this.getAdminReport = function (examtypeid, studentType, AcademicYearId, Semester,ExamMonthYear) {
         
            var paramObject = { "examtypeid": examtypeid, "studentType": studentType, "AcademicYearId": AcademicYearId, "Semester": Semester, "ExamMonthYear": ExamMonthYear };
           
            return DataAccessService.getDataWithPara('AssessmentReports/getAdminReport', paramObject);
        };

        
        this.getSchemes = function (StudentTypeId) {
            var paramObject = { "StudentTypeId": StudentTypeId };
            return DataAccessService.getDataWithPara('Assessment/getSchemes', paramObject);
        };

        this.getAdminReportsCollege = function (examtypeid, collegecode, studentType, AcademicYearId, Semester, ExamMonthYear) {

            var paramObject = { "examtypeid": examtypeid, "collegecode": collegecode, "studentType": studentType, "AcademicYearId": AcademicYearId, "Semester": Semester, "ExamMonthYear": ExamMonthYear};

            return DataAccessService.getDataWithPara('AssessmentReports/getAdminReportsCollege', paramObject);
        };
        this.getBranchReports = function (examtypeid, collegecode, branchid, subjectid, semid, studentType ) {
        
            var paramObject = {
                "collegecode": collegecode,"examtypeid": examtypeid,"studentType": studentType, "semid": semid,  "branchId": branchid,
                "subjectid": subjectid
            };
          
            return DataAccessService.getDataWithPara('AssessmentReports/getBranchReports', paramObject);
        };
        
        this.getAdminBranchReports = function (examtypeid, collegecode, branchid, subid, semid, studentType, AcademicYearId,ExamMonthYear) {
            var paramObject = {
                "examtypeid": examtypeid, "collegecode": collegecode, "branchid": branchid, "subid": subid, "semid": semid, "studentType": studentType, "AcademicYearId": AcademicYearId,
                "ExamMonthYear": ExamMonthYear            };
            return DataAccessService.getDataWithPara('AssessmentReports/getAdminBranchReports', paramObject);
        };


        this.getStudentReport = function (pin) {
            var paramObject = { "pin": pin };
            return DataAccessService.getDataWithPara('AssessmentReports/getStudentReport', paramObject);
        };
     

        this.updateMarks = function (marksList) {
            return DataAccessService.postData('AssessmentReports/UpdateStudentMarks', marksList);
        };
        
        this.SETRubricsMarks = function (SubjectTypeId,stringRubricsData) {
            var paramObject = { "SubjectTypeId": SubjectTypeId, "stringRubricsData": stringRubricsData };
            return DataAccessService.postData('AssessmentReports/SETRubricsMarks', paramObject);
        };


        this.getAbsenteesDates = function (AcademicYearid, semid) {
            var paramObject = { "AcademicYearid": AcademicYearid, "semid": semid };
            return DataAccessService.getDataWithPara('Assessment/GetAbsenteesDates', paramObject);
        };

        this.GetAbsenteesListExcel = function (AcademicYearID, SemId, FromDate, ToDate, CollegeCode, BranchId, DataType) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "SemId": SemId,
                "FromDate": FromDate,
                "ToDate": ToDate,
                "CollegeCode": CollegeCode,
                "BranchId": BranchId,
                "DataType": DataType
            };
            var promise = DataAccessService.postData('Assessment/GetAbsenteesListExcel', paramObj);
            return promise;
        };
    });

});