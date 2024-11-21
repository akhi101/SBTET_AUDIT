define(['app'], function (app) {
    app.service("AcademicService", function (DataAccessService) {
        this.GetCollegesSchemeSemInfo = function (CollegeId) {
            var paramObject = { "CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('api/Admission/GetCollegesSchemeSemInfo', paramObject);
            return promise;
        }

        this.GetAdminTransferedReportExcel = function (CollegeId) {
            var paramObject = { "CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetAdminTransferedReportExcel', paramObject);
            return promise;
        }

        this.getAdminTransferReportExcel = function (AcademicYearId) {
            var paramObject = { "AcademicYearId": AcademicYearId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getAdminTransferReportExcel', paramObject);
            return promise;
        }

        this.GetAcademicYearsActive = function () {
            var promise = DataAccessService.getDataAll('api/Assessment/getAcademicYearsActive');
            return promise;
        }

        this.get6thSemStudiedReportExcel = function () {
            return DataAccessService.getDataAll('api/PreExamination/get6thSemStudiedReportExcel');
        };
        
        this.get6thSemStudiedReport = function () {
            return DataAccessService.getDataAll('api/PreExamination/get6thSemStudiedReport');
        };

        this.getSyllabusReportExcel = function (DataTypeId, AcademicYearId,Json, CollegeCode, BranchCode) {

            var ParamObj = {
                "DataTypeId": DataTypeId,
                "AcademicYearId": AcademicYearId,
                "Json": Json,
                "CollegeCode": CollegeCode,
                "BranchCode": BranchCode
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getSyllabusReportExcel', ParamObj);
            return promise;


        }

      

        this.SetPinsData = function (CollegeCode, BranchId, AcademicYearId, Json) {
            var paramObject = { "CollegeCode": CollegeCode, "BranchId": BranchId, "AcademicYearId": AcademicYearId, "Json": Json };
            return DataAccessService.postData('api/PreExamination/SetPinsData', paramObject);
        };

        this.GetSixthSemStudentsData = function (CollegeCode, BranchId, AcademicYearId) {
            var paramObject = { "CollegeCode": CollegeCode, "BranchId": BranchId, "AcademicYearId": AcademicYearId };
            var promise = DataAccessService.getDataWithPara('Admission/GetSixthSemStudents', paramObject);
            return promise;
        }

        
        this.SetSixthSemStudentsSubmit = function (CollegeCode, BranchId, AcademicYearId, IsSubmitted) {
            var paramObject = { "CollegeCode": CollegeCode, "BranchId": BranchId, "AcademicYearId": AcademicYearId, "IsSubmitted": IsSubmitted };
            console.log(paramObject)
            var promise = DataAccessService.getDataWithPara('Admission/SetSixthSemStudentsSubmit', paramObject);
            return promise;
        }

        this.GetAcademicYearsActive = function (CollegeId) {
            var paramObject = { "CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('Admission/GetAcademicYearsActive', paramObject);
            return promise;
        }
       
        this.getAcademicYears = function () {
            var promise = DataAccessService.getDataAll('Academic/getAcademicYears');
            return promise;
        }
        this.GetCollegeList = function () {
            var promise = DataAccessService.getDataAll('api/PreExamination/GetColleges');
            return promise;
        }

        this.GetAdminTransferedReport = function (AcademicYearId) {
            var paramObject = {
                "AcademicYearId": AcademicYearId
            };
            var promise = DataAccessService.getDataWithPara('Academic/GetAdminTransferedReport', paramObject);
            return promise;
        }
        this.getTransferReportExcel = function (AcademicYearId) {
            var paramObject = {
                "AcademicYearId": AcademicYearId
            };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getTransferReportExcel', paramObject);
            return promise;
        }

        this.GetUserTypes = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getUserTypes');
            return promise;
        }


        this.GetSchemeSems = function (Scheme) {
            var paramObject = {
                "Scheme": Scheme
            };
            var promise = DataAccessService.getDataWithPara('Academic/GetSchemeSems', paramObject);
            return promise;
        }
        
        this.GetPrincipalTransferReport = function (CollegeCode) {
            var paramObject = {
                "CollegeCode": CollegeCode
            };
            var promise = DataAccessService.getDataWithPara('Academic/GetPrincipalTransferReport', paramObject);
            return promise;
        }

        this.GetHodTransferReports = function (CollegeCode, BranchCode, Scheme, semester) {
            var paramObject = {
                "CollegeCode": CollegeCode, "BranchCode": BranchCode, "Scheme": Scheme, "semester": semester
            };
            var promise = DataAccessService.getDataWithPara('Academic/GetHodTransferReports', paramObject);
            return promise;
        }

        this.getStudentsList = function (Scheme, collegeCode, branchId, semId) {
            var paramObject = {
                "schemeId": Scheme, "collegeCode": collegeCode, "branchId": branchId, "semId": semId
            };
            var promise = DataAccessService.getDataWithPara('Academic/getStudentsList', paramObject);
            return promise;
        }



        this.GetFeedbackReport = function (FeedbackId, CollegeCode, branchid, SchemeId, SemId) {
            var paramObject = { "FeedbackId": FeedbackId, "CollegeCode": CollegeCode, "branchid": branchid, "SchemeId": SchemeId, "SemId": SemId };
            var promise = DataAccessService.getDataWithPara('Academic/GetFeedbackReport', paramObject);
            return promise;
        }



        this.getAdminSyllabusCoverageReport = function (DataTypeId, AcademicYearId,Json, CollegeCode, BranchCode) {

            var ParamObj = {
                "DataTypeId": DataTypeId,
                "AcademicYearId": AcademicYearId,
                "Json": Json,
                "CollegeCode": CollegeCode,
                "BranchCode": BranchCode
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getAdminSyllabusCoverageReport', ParamObj);
                    return promise;
                 
        }

        this.GetFacultyData = function (Pin, FeedbackId, Otp) {

            var paramObject = {
                "Pin": Pin, "FeedbackId": FeedbackId, "Otp": Otp
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getFacultyData', paramObject);
            return promise;
        }

        this.getAttendanceReport = function (Pin) {
            var paramObject = {
                "Pin": Pin
            };
            return DataAccessService.getDataWithPara('Academic/getAttendanceReport', paramObject);
        };

        this.GenerateOtpForFeedback = function (Pin, FeedbackId) {
            var paramObject = {
                "Pin": Pin, "FeedbackId": FeedbackId
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GenerateOtpForFeedback', paramObject);
        };

        this.GetSyllabusCoverage = function (SubjectId, CollegeCode, ShiftId) {
            var paramObject = {
                "SubjectId": SubjectId,
                "CollegeCode": CollegeCode,
                "ShiftId": ShiftId
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetSyllabusCoverage', paramObject);
        }


        this.getHodSubjectList = function (CollegeCode, CourseBranchId, SchemeId, SemId, ShiftId) {
            var paramObject = { "CollegeCode": CollegeCode, "CourseBranchId": CourseBranchId, "SchemeId": SchemeId, "SemId": SemId, "ShiftId": ShiftId };
            return DataAccessService.getDataWithPara('Academic/getHodSubjectList', paramObject);
        };


        this.getSchemes = function () {
            return DataAccessService.getDataWithPara('Admission/getSchemes');
        };
        
        this.getSemBySchemes = function (StudentTypeId, SchemeId) {
            var paramObject = { "StudentTypeId": StudentTypeId, "SchemeId": SchemeId };
            return DataAccessService.getDataWithPara('Assessment/getSemByScheme', paramObject);
        };

   
        this.getAlphaStudentsList = function (SchemeId, SemId,CollegeCode,BranchCode) {
             var paramObject = { "SchemeId": SchemeId, "SemId": SemId,"CollegeCode":CollegeCode,"BranchCode":BranchCode };
             return DataAccessService.getDataWithPara('Academic/getAlphaStudentsList', paramObject);
        };

        this.SaveAlphaStudentList = function (SchemeId, SemId, CollegeCode, BranchCode, json) {
            var paramObject = { "SchemeId": SchemeId, "SemId": SemId, "CollegeCode": CollegeCode, "BranchCode": BranchCode, "json": json };
            console.log(paramObject)
            return DataAccessService.postData('Academic/SaveAlphaStudentList', paramObject);
        };

        
        
        this.getAcademicSemByScheme = function (SchemeId) {
            var parmObject = { "SchemeId": SchemeId };
            return DataAccessService.getDataWithPara('Academic/getAcademicSemByScheme', parmObject);
        }

        this.getSchemewiseExams = function (schemeid) {
            var parmObject = { "schemeid": schemeid };
            return DataAccessService.getDataWithPara('api/Assessment/getSchemeWiseExams', parmObject);
        }

        this.getbranchNameById = function (branchId) {
            var paramObject = { "branchcode": branchId };
            return DataAccessService.getDataWithPara('api/Assessment/getBranchName', paramObject);
        }


        this.getExamType = function (schemeid) {
            var paramObject = { "schemeid": schemeid };
            return DataAccessService.getDataWithPara('api/Assessment/getExamType', paramObject);
        }


        this.GetBranchList = function (CollegeCode) {
            var paramObject = { "CollegeCode": CollegeCode };
            return DataAccessService.getDataWithPara('Academic/GetBranchList', paramObject);  
        }


        this.GetAdminFeedbackReport = function (CollegeCode, semid, FeedbackId) {
            var paramObject = { "CollegeCode": CollegeCode, "semid": semid, "FeedbackId": FeedbackId };
            return DataAccessService.getDataWithPara('api/PreExamination/GetAdminFeedbackReport', paramObject);
        }

        this.GetAdminFeedbackReport = function (FeedbackId, branchid, SchemeId, SemId) {
            var paramObject = { "FeedbackId": FeedbackId, "branchid": branchid, "SchemeId": SchemeId, "SemId": SemId };
            var promise = DataAccessService.getDataWithPara('Academic/GetAdminFeedbackReport', paramObject);
            return promise;
        }

        this.getActiveSemester = function () {
            return DataAccessService.getDataAll('Academic/getActiveSemester');
        }
        this.getSchemeStatus = function () {
            return DataAccessService.getDataAll('Academic/getSchemeStatus');
        }
        this.PostSetDates = function (Schemeid, semid, StartDate, EndDate, AcademicYearId) {
            var paramObject = { "Schemeid": Schemeid, "semid": semid, "StartDate": StartDate, "EndDate": EndDate, "AcademicYearId": AcademicYearId };
            var promise = DataAccessService.postData('Academic/PostSetDates', paramObject);
            return promise;
        }


        this.SetFeedbackData = function (PIN, CollegeCode, BranchId, SchemeId, SemId, FeedBackId, Json) {

            var paramObject = { "PIN": PIN, "CollegeCode": CollegeCode, "BranchId": BranchId, "SchemeId": SchemeId, "SemId": SemId, "FeedBackId": FeedBackId, "json": Json };

            var promise = DataAccessService.postData('api/PreExamination/SetFeedbackData', paramObject);
            return promise;
        }


        this.GetSetSemesterData = function () {
            return DataAccessService.getDataWithPara('Academic/GetSetSemesterData');
        };

        this.GetDescription = function (FeedbackId) {
            var paramObject = { "FeedbackId": FeedbackId };
            return DataAccessService.getDataWithPara('api/PreExamination/GetDescriptionData', paramObject);
        };
        this.GetAvailableFeedbacks = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetAvailableFeedbacks');
        };
        this.getAdminSyllabusReports = function (Scheme,AcademicYearId, Json, CollegeCode) {
            var paramObject = {"Scheme": Scheme,"AcademicYearId": AcademicYearId, "Json": Json, "CollegeCode": CollegeCode };
            console.log(paramObject)
            return DataAccessService.postData('api/PreExamination/getAdminSyllabusReports', paramObject);
        };


        this.getFacultyDetails = function (collegecode) {
            var paramObject = { "collegecode": collegecode };
            return DataAccessService.getDataWithPara('Academic/AFFCollegeTecHStaffInfo', paramObject);
        };
        this.GetMappingList = function (CollegeCode, CourseBranchId, SchemeId, SemId, ShiftId) {
            var paramObject = { "CollegeCode": CollegeCode, "CourseBranchId": CourseBranchId, "SchemeId": SchemeId, "SemId": SemId, "ShiftId": ShiftId };
            return DataAccessService.getDataWithPara('Academic/GetFacultyMappingList', paramObject);
        };
        this.SetMappingList = function (CollegeCode, CourseBranchId, ShiftId, data) {
            var paramObject = { "CollegeCode": CollegeCode, "CourseBranchId": CourseBranchId, "ShiftId": ShiftId, "data": data };
            return DataAccessService.getDataWithPara('Academic/SetFacultyMappingList', paramObject);
        };
        this.GenrateOtp = function (FeddBackId, Pin, mobile) {
            var paramObject = { FeddBackId: "FeddBackId", "Pin": Pin, "mobile": mobile };
            return DataAccessService.getDataWithPara('Academic/GenrateOtp', paramObject);
        };

        this.sendOtp = function (Pin) {
            var paramObject = {
                "Pin": Pin
            };
            return DataAccessService.getDataWithPara('api/PreExamination/SendOtpForCertificates', paramObject);
        };

        this.getScheme = function () {
            return DataAccessService.getDataWithPara('Academic/getScheme');
        };


    });
});