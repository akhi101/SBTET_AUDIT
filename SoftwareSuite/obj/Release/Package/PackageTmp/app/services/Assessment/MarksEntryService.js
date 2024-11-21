define(['app'], function (app) {
    app.service("MarksEntryService", function (DataAccessService) {
        this.AddMarksEntryDates = function (Examid, semid, Academicid, UserName, fromDate, toDate, fineDate, ipaddress, fineamount, studenttypeid, schemeId, ExamMonthYearId) {
            var paramObject = {
                "examid": Examid,
                "semid": semid,
                "AcademicYearId": Academicid,
                "username": UserName,
                "fromDate": fromDate,
                "toDate": toDate,
                "fineDate": fineDate,
                "ipaddress": ipaddress,
                "fine": fineamount,
                "Studenttypeid": studenttypeid,
                "schemeid": schemeId,
                "ExamMonthYearId": ExamMonthYearId

            };
            var promise = DataAccessService.postData('api/AdminService/PostMarksEntryDates', paramObject);
            return promise;
        },

            this.UpdateMarksEntryDatesforAdmin = function (id, fromdate, todate, finedate, fine_ammount) {
                var paramObject = {
                    "id": id,
                    "fromdate": fromdate,
                    "todate": todate,
                    "finedate": finedate,
                    "fine_ammount": fine_ammount,
                };
                var promise = DataAccessService.postData('Assessment/UpdateMarksEntryDatesforAdmin', paramObject);
                return promise;
            },
            this.GetExamType = function (SchemeId) {
                var paramObject = { "schemeid": SchemeId };
                var promise = DataAccessService.getDataWithPara('Assessment/getExamTypes', paramObject);
                return promise;
            }

        this.UploadSign = function (sign) {
            var paramObject = { "sign": sign };
            var promise = DataAccessService.postData('api/PreExamination/UploadSign', paramObject);
            return promise;
        }

        this.GetMarksEntryDates = function (AcademicId) {
            var paramObject = { "AcademicId": AcademicId };
            var promise = DataAccessService.getDataWithPara('Assessment/getMarksEntryDates', paramObject);
            return promise;
        },
            this.getDatesFineAmount = function (examid, semid, AcademicId, ExamMonthYearId) {
                var paramObject = { "examid": examid, "semid": semid, "Academicid": AcademicId, "ExamMonthYearId": ExamMonthYearId };
                var promise = DataAccessService.getDataWithPara('MarksEntry/getDatesFineAmount', paramObject);
                return promise;
            },
            this.getSubmitStatus = function (collegeCode, branchCode, AcademicId, semId, examtypeId, ExamMonthYearId) {
                var paramObject = { "collegeCode": collegeCode, "branchCode": branchCode, "AcademicId": AcademicId, "semId": semId, "examtypeId": examtypeId, "ExamMonthYearId": ExamMonthYearId };
                var promise = DataAccessService.getDataWithPara('MarksEntry/getSubmitStatus', paramObject);
                return promise;
            },
            this.SubmitAllMarksEntered = function (AcademicId, semId, examtypeId) {
                var paramObject = { "AcademicId": AcademicId, "semId": semId, "examtypeId": examtypeId };
                var promise = DataAccessService.postData('MarksEntry/SubmitAllMarksEntered', paramObject);
                return promise;
            },
            this.SubmitMarksEntered = function (collegeCode, branchCode, AcademicId, semId, examtypeId, subId, ExamMonthYearId, SubmittedMobileNo) {
                var paramObject = {
                    "collegeCode": collegeCode, "branchCode": branchCode, "AcademicId": AcademicId, "semId": semId, "examtypeId": examtypeId, "subId": subId, "ExamMonthYearId": ExamMonthYearId, "SubmittedMobileNo": SubmittedMobileNo
                };
                var promise = DataAccessService.postData('MarksEntry/SubmitMarksEntered', paramObject);
                return promise;
            },


            this.getStudentType = function () {
                return DataAccessService.getDataAll('Assessment/getStudentType');
            },
            this.getExamtype = function () {
                return DataAccessService.getDataAll('Assessment/getExamtypeR');
            },
            this.GetPresentStudentType = function () {
                return DataAccessService.getDataAll('Assessment/GetPresentStudentType');
            },
            this.RubricsgetSubjectPinList = function (SubjectTypeId, collegecode, SemId, BranchId, SchemeId, AcademicYearId, ExamTypeId, ExamMonthYearId) {
                var paramObject = {
                    "SubjectTypeId": SubjectTypeId, "collegecode": collegecode, "SemId": SemId,
                    "BranchId": BranchId, "SchemeId": SchemeId, "AcademicYearId": AcademicYearId, "ExamTypeId": ExamTypeId, "ExamMonthYearId": ExamMonthYearId

                };
                return DataAccessService.getDataWithPara('MarksEntry/RubricsgetSubjectPinList', paramObject);
            },
            this.getSubjectPinList = function (AcadamicYearid, SchemeId, collegecode, semid, branchId, subId, examTypeId, StudentTypeId, ExamMonthYearId) {

                var paramObject = {
                    "AcadamicYearid": AcadamicYearid, "schemeid": SchemeId, "collegecode": collegecode, "semid": semid, "branchid": branchId, "subid": subId,
                    "examtype": examTypeId, "studenttypeId": StudentTypeId, "ExamMonthYearId": ExamMonthYearId
                };

                return DataAccessService.getDataWithPara('MarksEntry/getSubjectPinList', paramObject);
            },

            this.getBacklogSubjectPinList = function (AcadamicYearid, SchemeId) {
                var paramObject = {
                    "AcadamicYearid": AcadamicYearid, "schemeid": SchemeId
                };
                return DataAccessService.getDataWithPara('MarksEntry/getBacklogSubjectPinList', paramObject);
            },

            this.getReportSubjectPinList = function (Academicid, SchemeId, collegecode, semid, branchId, subId, examtypeid, StudentTypeId, ExamMonthYearId) {
                var paramObject = {
                    "Academicid": Academicid, "SchemeId": SchemeId, "collegecode": collegecode, "semid": semid, "branchId": branchId, "subId": subId, "examtype": examtypeid,
                    "studenttypeId": StudentTypeId, "ExamMonthYearId": ExamMonthYearId
                };

                return DataAccessService.getDataWithPara('MarksEntry/getReportSubjectPinList', paramObject);
            },
            this.editMarksEntry = function (collegecode, branchcode, semid, examtypeid, subid, pin, ExamMonthYearId) {
                var paramObject = { "collegecode": collegecode, "branchcode": branchcode, "semid": semid, "examtypeid": examtypeid, "subid": subid, "pin": pin, "ExamMonthYearId": ExamMonthYearId };
                return DataAccessService.getDataWithPara('MarksEntry/editMarksEntry', paramObject);
            },
            this.PostStudentMarks = function (examtypeId, schemeid, MarksList, studenttypeid) {
                var paramObject = { "examtype": examtypeId, "schemeid": schemeid, "marksdata": MarksList, "studenttypeid": studenttypeid };
                return DataAccessService.postData('MarksEntry/PostSemExamMarks', paramObject);
            },
            this.PostBacklogSemExamMarks = function (MarksList) {
                var paramObject = { "marksdata": MarksList };
                return DataAccessService.postData('MarksEntry/PostBacklogSemExamMarks', paramObject);
            },
            this.getPaymentDetails = function (Amount, CollegeCode, BranchCode, SemId, SchemeId, Academicid, examTypeid, ExamMonthYearId) {
                var paramObject = {
                    "Amount": Amount, "CollegeCode": CollegeCode, "BranchCode": BranchCode, "SemId": SemId, "SchemeId": SchemeId, "Academicid": Academicid, "examTypeid": examTypeid,
                    "ExamMonthYearId": ExamMonthYearId
                };
                return DataAccessService.getDataWithPara('MarksEntryFinePayment/getPaymentDetails', paramObject);
            },

            this.GetDetailedAssessmentReportExcel = function (examtypeid, studentType, AcademicYearId, Semester, ExamMonthYear) {
                var paramObject = {
                    "examtypeid": examtypeid,
                    "studentType": studentType,
                    "AcademicYearId": AcademicYearId,
                    "Semester": Semester,
                    "ExamMonthYear": ExamMonthYear
            };
            return DataAccessService.getDataWithPara('MarksEntry/GetDetailedAssessmentReportExcel', paramObject);
            },

            this.getSubjectsFaculty = function () {
                return DataAccessService.getDataAll('Assessment/getSubjectsFaculty');
            }

     
        



    });
});