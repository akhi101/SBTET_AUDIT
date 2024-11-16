define(['app'], function (app) {
    app.service("PreExaminationService", function (DataAccessService) {

        this.getStudentFeeDates = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/getStudentFeePaymentDates');
        };

        this.getAllBranches = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetAllBranches');
        };
        this.GetAttendanceDataByDate = function (date) {
            var paramObject = { "date": date };
            var promise = DataAccessService.getDataWithPara('api/Attendance/GetAttendanceDataByDate', paramObject);
            return promise;
        }

        this.PostAttendance = function (obj) {
            //var paramObject = { "UserId": UserId, "attData": AttDataList };
            //console.log(paramObject)
            var promise = DataAccessService.postData('api/PreExamination/SendAttendance', obj);
            return promise;
        },

            this.GetHomePageSlides = function () {
                return DataAccessService.getDataAll('api/PreExamination/GetHomePageSlides');
            };

        this.GetHomePageSlidesActive = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetHomePageSlidesActive');
        };

        this.getActiveExamTypes = function () {
            return DataAccessService.getDataAll('api/PreExamination/getActiveExamTypes');
        };

        this.getExamTypesForExamCenters = function () {
            return DataAccessService.getDataAll('api/PreExamination/getExamTypesForExamCenters');
        };

        this.GetExamType = function (SchemeId) {
            var paramObject = { "schemeid": SchemeId };
            var promise = DataAccessService.getDataWithPara('Assessment/getExamTypes', paramObject);
            return promise;
        }


        this.GetCategory = function () {
            return DataAccessService.getDataAll('Admission/GetCategory');
        };

        this.GenerateC18MemosDataByPin = function (ExamMonthYearId, MinCredits, Day, Month, Year, PIN) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "MinCredits": MinCredits, "Day": Day, "Month": Month, "Year": Year, "PIN": PIN
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GenerateC18MemosDataByPin', paramObject);
        };

        this.RequestLog = function (marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, challan, amount, schemeId, json) {
            var paramObject = { "marchantid": marchantid, "subMarchantid": subMarchantid, "addInfo1": addInfo1, "addInfo3": addInfo3, "addInfo4": addInfo4, "addInfo5": addInfo5, "addInfo6": addInfo6, "addInfo7": addInfo7, "challan": challan, "amount": amount, "schemeId": schemeId, "json": json };

            return DataAccessService.postData('api/PreExamination/RequestLog', paramObject);
        },

            this.ThreeBacklogODCByPin = function (fromdate, todate, PIN) {
                var paramObj = {
                    "fromdate": fromdate,
                    "todate": todate,
                    "PIN": PIN
                }
                var promise = DataAccessService.postData('PreExaminationReport/ThreeBacklogODCByPin', paramObj);
                return promise;
            };

        this.GetPolycetAcademicYear = function () {
            return DataAccessService.getDataAll('Admission/GetPolycetAcademicYear');
        };


        this.GetPromotionalList = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetPromotionalList');
        };


        this.GetCollegeTypes = function () {
            return DataAccessService.getDataAll('Admission/GetCollegeTypes');
        };

        this.GetAdmissionTypes = function () {
            return DataAccessService.getDataAll('Admission/GetAdmissionTypes');
        };


        this.GetNICData = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetNICData');
        };

        this.getActiveExamTypesByScheme = function (scheme) {
            var paramObject = {
                "scheme": scheme
            };
            return DataAccessService.getDataWithPara('api/PreExamination/getActiveExamTypesByScheme', paramObject);
        };


        this.GetPolycetExamCenters = function (AcademicYear) {
            var paramObject = {
                "AcademicYear": AcademicYear
            };
            return DataAccessService.getDataWithPara('Admission/GetPolycetExamCenters', paramObject);
        };

        this.GetPolycetExamCentersExcel = function (AcademicYear) {
            var paramObject = {
                "AcademicYear": AcademicYear
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetPolycetExamCentersExcel', paramObject);
        };

        this.GetStudentServicesCounts = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetStudentServicesCounts');
        };

        this.GetFeedbackReportExcel = function (p_FeedbackId) {
            var paramObject = {
                "p_FeedbackId": p_FeedbackId
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetFeedbackReportExcel', paramObject);
        };

        this.getBranchsByCollegeCode = function (CollegeCode) {
            var paramObject = {
                "CollegeCode": CollegeCode
            };
            return DataAccessService.getDataWithPara('api/PreExamination/getBranchsByCollegeCode', paramObject);
        };

        this.GetResultsReports = function (Scheme, semid, branchid, collegecode) {
            var paramObject = {
                "Scheme": Scheme, "semid": semid, "branchid": branchid, "collegecode": collegecode
            };
            return DataAccessService.postData('api/PreExamination/GetResultsReports', paramObject);
        };

        this.GetAmbedkarResultsReport = function (scheme) {
            var paramObject = {
                "scheme": scheme
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetAmbedkarResultsReport', paramObject);
        };

        this.GetAttendanceReportData = function (AcademicYearID, Semid) {
            var paramObject = {
                "AcademicYearID": AcademicYearID, "Semid": Semid
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetAttendanceReportData', paramObject);
        };

        this.GetAsssessmentConsolidatedReport = function (AcademicyearId, ExamMonthYearId, collegecode, branchId, schemeid, semid, ExamType) {
            var paramObject = {
                "AcademicyearId": AcademicyearId, "ExamMonthYearId": ExamMonthYearId, "collegecode": collegecode, "branchId": branchId, "schemeid": schemeid, "semid": semid, "ExamType": ExamType
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetAsssessmentConsolidatedReport', paramObject);
        };



        this.GetBackolgSubjects = function (scheme) {
            var paramObject = {
                "scheme": scheme
            };

            return DataAccessService.getDataWithPara('api/PreExamination/GetBackolgSubjects', paramObject);
        };

        this.GetIndustrialFailedReport = function (scheme) {
            var paramObject = {
                "scheme": scheme
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetIndustrialFailedReport', paramObject);
        };
        this.GetFeeEligibelList = function (ExamMonthYearId, StudentTypeId) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId,
                "StudentTypeId": StudentTypeId
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetFeeEligibelList', paramObject);
        };

        this.GetExpenditure = function (ExamMonthYearId) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetExpenditure', paramObject);
        };



        this.getElectiveMappedReport = function (UserTypeId, CollegeCode, BranchCode) {
            var paramObject = { "UserTypeId": UserTypeId, "CollegeCode": CollegeCode, "BranchCode": BranchCode };
            return DataAccessService.getDataWithPara('api/PreExamination/getElectiveMappedReport', paramObject);
        };


        this.GetDayWiseNrReports = function (ExamMonthYearId, AcademicID, StudentTypeId) {
            var paramObject = { "ExamMonthYearId": ExamMonthYearId, "AcademicID": AcademicID, "StudentTypeId": StudentTypeId };
            return DataAccessService.getDataWithPara('api/PreExamination/GetDayWiseNrReports', paramObject);
        };

        this.GetDayWiseNrReportsExcel = function (ExamMonthYearId, AcademicID, StudentTypeId) {
            var paramObject = { "ExamMonthYearId": ExamMonthYearId, "AcademicID": AcademicID, "StudentTypeId": StudentTypeId };
            return DataAccessService.getDataWithPara('api/PreExamination/GetDayWiseNrReportsExcel', paramObject);
        };

        this.GetBranchSemFeeReports = function (dataType, StudentTypeId, emy) {
            var paramObject = { "dataType": dataType, "StudentTypeId": StudentTypeId, "emy": emy };
            return DataAccessService.getDataWithPara('api/PreExamination/GetBranchSemFeeReports', paramObject);
        };

        this.GetBranchSemSubFeeReports = function (dataType, StudentTypeId, emy, Id) {
            var paramObject = { "dataType": dataType, "StudentTypeId": StudentTypeId, "emy": emy, "Id": Id };
            return DataAccessService.getDataWithPara('api/PreExamination/GetBranchSemSubFeeReports', paramObject);
        };

        this.GetExamMonthYearByAcademic = function (Academicyearid, studenttypeid, Examtypeid, semid) {
            var paramObject = { "Academicyearid": Academicyearid, "studenttypeid": studenttypeid, "Examtypeid": Examtypeid, "semid": semid };
            return DataAccessService.postData('api/PreExamination/getExamMonthYearByAcademic', paramObject);
        };




        this.TransferBmaAttendee = function (collegecode, attendeeid, branch, remarks) {
            var paramObject = { "collegecode": collegecode, "attendeeid": attendeeid, "branch": branch, "remarks": remarks };
            return DataAccessService.getDataWithPara('api/PreExamination/TransferBmaAttendee', paramObject);
        };



        this.SetSessionalExpenditure = function (object) {

            return DataAccessService.postData('api/PreExamination/SetSessionalExpenditure', object);
        };


        this.SetEventExpenditure = function (AoNotification, Superintendent, SeatingArrangement, ExamMonthYearId) {
            var paramObject = {
                "AoNotification": AoNotification, "Superintendent": Superintendent, "SeatingArrangement": SeatingArrangement, "ExamMonthYearId": ExamMonthYearId
            };
            ////console.log(paramObject)
            return DataAccessService.getDataWithPara('api/PreExamination/SetEventExpenditure', paramObject);
        };

        this.GenerateNrData = function (ExamMonthYearId, StudentTypeId, Scheme, ExamTypeId, UserName) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme,
                "ExamTypeId": ExamTypeId, "UserName": UserName
            };

            return DataAccessService.getDataWithPara('api/PreExamination/GenerateNrData', paramObject);
        };

        this.GetFacultyMappingExcel = function (AcademicYearId, SemId, CollegeCode) {
            var paramObject = {
                "AcademicYearId": AcademicYearId, "SemId": SemId, "CollegeCode": CollegeCode,

            };

            return DataAccessService.postData('api/PreExamination/GetFacultyMappingExcel', paramObject);
        };


        this.SetHomePageSlidesStatus = function (Id, Status) {
            var paramObject = {
                "Id": Id, "Status": Status

            };

            return DataAccessService.getDataWithPara('api/PreExamination/SetHomePageSlidesStatus', paramObject);
        };

        this.ResultsProcessing = function (ExamMonthYearId, StudentTypeId, Scheme, SemIdJson, ExamTypeId, academicyearid, UserName) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme, "SemIdJson": SemIdJson,
                "ExamTypeId": ExamTypeId, "academicyearid": academicyearid, "UserName": UserName
            };

            return DataAccessService.getDataWithPara('api/PreExamination/ResultsProcessing', paramObject);
        };

        this.RVRCResultsProcessing = function (ExamMonthYearId, StudentTypeId, Scheme, UserName, ExamTypeId) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme,
                "UserName": UserName, "ExamTypeId": ExamTypeId
            };

            return DataAccessService.getDataWithPara('api/PreExamination/RVRCResultsProcessing', paramObject);
        };


        this.ResultsLogicReports = function (ExamMonthYearId, StudentTypeId, Scheme, ExamTypeId, academicyearid, UserName) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme,
                "ExamTypeId": ExamTypeId, "academicyearid": academicyearid, "UserName": UserName
            };

            return DataAccessService.getDataWithPara('api/PreExamination/ResultsLogicReports', paramObject);
        };

        this.ResultsDeployTables = function (ExamMonthYearId, StudentTypeId, Scheme, ExamTypeId, UserName) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme,
                "ExamTypeId": ExamTypeId, "UserName": UserName
            };

            return DataAccessService.getDataWithPara('api/PreExamination/ResultsDeployTables', paramObject);
        };

        this.RVRCResultsDeployTables = function (ExamMonthYearId, StudentTypeId, Scheme, UserName, ExamTypeId) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme,
                "UserName": UserName, "ExamTypeId": ExamTypeId
            };

            return DataAccessService.getDataWithPara('api/PreExamination/RVRCResultsDeployTables', paramObject);
        };


        this.getMercyData = function (Id, DataType) {
            var paramObject = {
                "Id": Id, "DataType": DataType
            };

            return DataAccessService.getDataWithPara('api/PreExamination/getMercyData', paramObject);
        };


        this.GenerateWantings = function (ExamMonthYearId, StudentTypeId, Scheme, ExamTypeId) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme,
                "ExamTypeId": ExamTypeId
            };

            return DataAccessService.getDataWithPara('api/PreExamination/GenerateWantings', paramObject);
        };


        this.PostMarks = function (ExamMonthYearId, StudentTypeId, Scheme, ExamTypeId, UserName) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme,
                "ExamTypeId": ExamTypeId, "UserName": UserName
            };

            return DataAccessService.getDataWithPara('api/PreExamination/PostMarks', paramObject);
        };

        this.getElectiveMappedReportExcel = function (UserTypeId, CollegeCode, BranchCode) {
            var paramObject = { "UserTypeId": UserTypeId, "CollegeCode": CollegeCode, "BranchCode": BranchCode };
            return DataAccessService.getDataWithPara('api/PreExamination/getElectiveMappedReportExcel', paramObject);
        };

        this.getSubjectWiseElectiveMappedReportExcel = function (UserTypeId, CollegeCode, BranchCode) {
            var paramObject = { "UserTypeId": UserTypeId, "CollegeCode": CollegeCode, "BranchCode": BranchCode };
            return DataAccessService.getDataWithPara('api/PreExamination/getSubjectWiseElectiveMappedReportExcel', paramObject);
        };

        this.getElectiveMappingSubjectReport = function (UserTypeId, CollegeCode, BranchCode) {
            var paramObject = { "UserTypeId": UserTypeId, "CollegeCode": CollegeCode, "BranchCode": BranchCode };

            return DataAccessService.getDataWithPara('api/PreExamination/getElectiveMappingSubjectReport', paramObject);
        };

        this.getElectiveMappingSubjectReportExcel = function (UserTypeId, CollegeCode, BranchCode) {
            var paramObject = { "UserTypeId": UserTypeId, "CollegeCode": CollegeCode, "BranchCode": BranchCode };
            return DataAccessService.getDataWithPara('api/PreExamination/getElectiveMappingSubjectReportExcel', paramObject);
        };

        this.GetBonafideTypes = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetBonafideTypes');
        };

        this.GetExaminationHallData = function (CollegeCode) {
            var paramObject = { "CollegeCode": CollegeCode };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetExaminationHallData', paramObject);
            return promise;
        }

        this.GenerateOdcDataByPin = function (pin) {
            var paramObject = { "pin": pin };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GenerateOdcDataByPin', paramObject);
            return promise;
        }

        this.GetMigrationDetails = function (AcademicYearId) {
            var paramObject = { "AcademicYearId": AcademicYearId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetMigrationDetails', paramObject);
            return promise;
        }

        this.getWantingsReport = function (Exam_MonthYear, studentType, Scheme) {
            var paramObject = { "Exam_MonthYear": Exam_MonthYear, "studentType": studentType, "Scheme": Scheme };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getWantingsReport', paramObject);
            return promise;
        }



        this.UpdateSmsStatus = function (CertificateTypeId, Pin, Id) {
            var paramObject = { "CertificateTypeId": CertificateTypeId, "Pin": Pin, "Id": Id };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/UpdateSmsStatus', paramObject);
            return promise;
        }

        this.EnableFeePayment = function (ExamMonthYear, Pin, studenttypeid, ExamFee, LateFee, TatkalFee, PremiumTatkalFee, Semid) {
            var paramObject = { "ExamMonthYear": ExamMonthYear, "Pin": Pin, "studenttypeid": studenttypeid, "ExamFee": ExamFee, "LateFee": LateFee, "TatkalFee": TatkalFee, "PremiumTatkalFee": PremiumTatkalFee, "Semid": Semid };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/EnableFeePayment', paramObject);
            return promise;
        }

        this.SetExaminationHallData = function (paramObject) {
            var promise = DataAccessService.postData('api/PreExamination/SetExaminationHallData', paramObject);
            return promise;
        }

        this.SetSeatingExaminationHallData = function (paramObject) {
            var promise = DataAccessService.postData('api/PreExamination/SetSeatingExaminationHallData', paramObject);
            return promise;
        }
        this.SeatingPlanPdf = function (paramObject) {
            var promise = DataAccessService.getDataWithPara('api/PreExamination/SeatingPlanPdf', paramObject);
            return promise;
        }


        this.SetHolidaysForTimeTable = function (json, AcademicYearId, SessionId, ExamMonthYearId, StudentTypeId, ExamTypeId) {
            var paramObject = { "json": json, "AcademicYearId": AcademicYearId, "SessionId": SessionId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId };
            var promise = DataAccessService.postData('api/PreExamination/SetHolidaysForTimeTable', paramObject);
            return promise;
        }

        this.GetHolidaysForTimeTable = function (startdate, days) {
            var paramObject = { "startdate": startdate, "days": days };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetHolidaysForTimeTable', paramObject);
            return promise;
        }

        this.GetSemsBySchemePin = function (pin, Scheme) {
            var paramObject = { "pin": pin, "Scheme": Scheme };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetSemsBySchemePin', paramObject);
            return promise;
        }

        this.GetMonthYearBySemSchemePin = function (pin, Scheme, Semester) {
            var paramObject = { "pin": pin, "Scheme": Scheme, "Semester": Semester };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetMonthYearBySemSchemePin', paramObject);
            return promise;
        }

        this.GetExamSessionByExamDate = function (ExamDate, StudentTypeId) {
            var paramObject = { "ExamDate": ExamDate, "StudentTypeId": StudentTypeId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetExamSessionByExamDate', paramObject);
            return promise;
        }



        this.GetSchemeByPin = function (pin) {
            var paramObject = { "pin": pin };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetSchemeByPin', paramObject);
            return promise;
        }


        this.GetPrincipalTimetable = function (ExamMonthYearId) {
            var paramObject = { "ExamMonthYearId": ExamMonthYearId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetPrincipalTimetable', paramObject);
            return promise;
        }

        this.GetPrincipalTimetableExcel = function (ExamMonthYearId) {
            var paramObject = { "ExamMonthYearId": ExamMonthYearId };
            var promise = DataAccessService.postData('api/PreExamination/GetPrincipalTimetableExcel', paramObject);
            return promise;
        }


        this.SubmitFeedback = function (Name, Email, Mobile, Message) {
            var paramObject = {
                "Name": Name, "Email": Email, "Mobile": Mobile,
                "Message": Message
            };
            var promise = DataAccessService.postData('api/PreExamination/SubmitFeedback', paramObject);
            return promise;
        }


        this.GetPrincipalTimeTablePdf = function (ExamMonthYearId) {
            var paramObject = { "ExamMonthYearId": ExamMonthYearId };
            var promise = DataAccessService.postData('api/TimeTableGenerator/GetPrincipalTimeTablePdf', paramObject);
            return promise;
        }


        this.GetAcademicYears = function () {
            var promise = DataAccessService.getDataAll('api/PreExamination/GetAcdamicyear');
            return promise;
        }

        this.GetExamMonthYearByAcademicYear = function (Academicyearid, SessionId) {
            var paramObject = { "Academicyearid": Academicyearid, "SessionId": SessionId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetExamMonthYearByAcademicYear', paramObject);
            return promise;
        }

        this.GetTotalCollegeWiseCharges = function (ExamMonthYearId, AcademicID, StudentTypeId) {
            var paramObject = { "ExamMonthYearId": ExamMonthYearId, "AcademicID": AcademicID, "StudentTypeId": StudentTypeId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTotalCollegeWiseCharges', paramObject);
            return promise;
        }

        this.GetTotalDayWiseCharges = function (ExamMonthYearId, AcademicID, StudentTypeId) {
            var paramObject = { "ExamMonthYearId": ExamMonthYearId, "AcademicID": AcademicID, "StudentTypeId": StudentTypeId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTotalDayWiseCharges', paramObject);
            return promise;
        }
        this.GetDcBillsAbstract = function (ExamMonthYearId, AcademicID, StudentTypeId) {
            var paramObject = { "ExamMonthYearId": ExamMonthYearId, "AcademicID": AcademicID, "StudentTypeId": StudentTypeId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetDcBillsAbstract', paramObject);
            return promise;
        }


        this.GetTimeTableExistingHolidays = function (AcademicYearId, SessionId, ExamMonthYearId, StudentTypeId, ExamTypeId) {
            var paramObject = { "AcademicYearId": AcademicYearId, "SessionId": SessionId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/TimeTableExistingHolidays', paramObject);
            return promise;
        }


        this.getTimeTableData = function (StudentTypeId, SemId, SchemeId, ExamTypeId, StartDate, Fntime, Antime) {
            var paramObject = { "StudentTypeId": StudentTypeId, "SemId": SemId, "SchemeId": SchemeId, "ExamTypeId": ExamTypeId, "startdate": StartDate };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/setTimeTable', paramObject);
            return promise;
        }


        this.setTimeTableData = function (AcademicYearId, SessionId, ExamMonthYearId, StudentTypeId, SchemeId, SemId, ExamTypeId, StartDate, isonlyC18) {
            var paramObject = { "AcademicYearId": AcademicYearId, "SessionId": SessionId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "SemId": SemId, "SchemeId": SchemeId, "ExamTypeId": ExamTypeId, "StartDate": StartDate, "isonlyC18": isonlyC18 };
            var promise = DataAccessService.postData('api/TimeTableGenerator/setTimeTable', paramObject);
            return promise;
        }

        this.getTimeTabledata = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, SchemeId) {
            var paramObject = {
                "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId,
                "SchemeId": SchemeId
            };
            var promise = DataAccessService.postData('api/TimeTableGenerator/getTimeTabledata', paramObject);
            return promise;
        }

        this.ResetCertificateStatus = function (CertificateTypeId, Pin, certifictepath) {
            var paramObject = { "CertificateTypeId": CertificateTypeId, "Pin": Pin, "certifictepath": certifictepath };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/ResetCertificateStatus', paramObject);
            return promise;
        }

        this.GetChallanNumbers = function (PaymentTypeID, PaymentSubTypeID, ExamMonthYearID, PIN) {
            var paramObject = { "PaymentTypeID": PaymentTypeID, "PaymentSubTypeID": PaymentSubTypeID, "PIN": PIN, "ExamMonthYearID": ExamMonthYearID };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetChallanNumbers', paramObject);
            return promise;
        }

        this.ResetNameCorrectionToDs = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/ResetNameCorrectionToDs', paramObject);
            return promise;
        }

        this.ReleaseBonafidePin = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/ReleaseBonafidePin', paramObject);
            return promise;
        }

        this.ReleaseStudyPin = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/ReleaseStudyPin', paramObject);
            return promise;
        }



        this.ReleaseStudentServicesPin = function (Pin, CertificateTypeId, Id) {
            var paramObject = {
                "Pin": Pin,
                "CertificateTypeId": CertificateTypeId,
                "Id": Id
            };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/ReleaseStudentServicesPin', paramObject);
            return promise;
        }

        this.ReleaseTcPin = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/ReleaseTcPin', paramObject);
            return promise;
        }
        this.GetExamMonthYearForHallticketandFeepayment = function (DataTypeId, StudentTypeId) {
            var paramObject = { "DataTypeId": DataTypeId, "StudentTypeId": StudentTypeId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetExamMonthYearForHallticketandFeepayment', paramObject);
            return promise;
        }


        this.ResetTwshCertificateStatus = function (RegistrationNo, certifictepath) {
            var paramObject = { "RegistrationNo": RegistrationNo, "certifictepath": certifictepath };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/ResetTwshCertificateStatus', paramObject);
            return promise;
        }

        this.getpdfTimeTableData = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, SchemeId) {
            var paramObject = {
                "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId,
                "SchemeId": SchemeId
            };
            var promise = DataAccessService.postData('api/TimeTableGenerator/TimeTablePdf', paramObject);
            return promise;
        }

        this.PublishTimetable = function (ExamMonthYearId, StudentTypeId) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId
            };
            var promise = DataAccessService.postData('api/TimeTableGenerator/PublishTimetable', paramObject);
            return promise;
        }

        this.TimeTablePdf = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, SchemeId, DataTypeId) {
            var paramObject = {
                "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId,
                "SchemeId": SchemeId, "DataTypeId": DataTypeId
            };
            var promise = DataAccessService.postData('api/TimeTableGenerator/TimeTablePdf', paramObject);
            return promise;
        }

        this.TimeTablePdfAdmin = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, SchemeId, DataTypeId) {
            var paramObject = {
                "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId,
                "SchemeId": SchemeId, "DataTypeId": DataTypeId
            };
            var promise = DataAccessService.postData('api/TimeTableGenerator/TimeTablePdfAdmin', paramObject);
            return promise;
        }

        this.TimeTableXlsx = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, SchemeId, DataTypeId) {
            var paramObject = {
                "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId,
                "SchemeId": SchemeId, "DataTypeId": DataTypeId
            };
            var promise = DataAccessService.postData('api/TimeTableGenerator/TimeTableXlsx', paramObject);
            return promise;
        }
        this.TimeTableXlsxAdmin = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, SchemeId, DataTypeId) {
            var paramObject = {
                "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId,
                "SchemeId": SchemeId, "DataTypeId": DataTypeId
            };
            var promise = DataAccessService.postData('api/TimeTableGenerator/TimeTableXlsxAdmin', paramObject);
            return promise;
        }

        this.TimeTableEdepXlsx = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, SchemeId, DataTypeId) {
            var paramObject = {
                "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId,
                "SchemeId": SchemeId, "DataTypeId": DataTypeId
            };
            var promise = DataAccessService.postData('api/TimeTableGenerator/TimeTableEdepXlsx', paramObject);
            return promise;
        }

        this.ValidateAttendenceCaptcha = function (SessionId, Captcha, Pin) {
            var paramObject = {
                "SessionId": SessionId, "Captcha": Captcha, "Pin": Pin
            };
            return DataAccessService.postData('api/AdminService/ValidateAttendenceCaptcha', paramObject);
        };

        this.GetCaptchaString = function (SessionId) {
            var paramObject = { "SessionId": SessionId };
            return DataAccessService.postData('api/AdminService/GetCaptchaString', paramObject);
        };

        this.GenerateOtpForMobileNoUpdate = function (Pin, Phone) {
            var param = { "Pin": Pin, "Phone": Phone }
            return DataAccessService.getDataWithPara('api/PreExamination/GenerateOtpForMobileNoUpdate', param);
        };

        this.GenerateOtpForMobileNo = function (Pin, Phone, StudentType, ExamDetails) {
            var param = { "Pin": Pin, "Phone": Phone, "StudentType": StudentType, "ExamDetails": ExamDetails  }
            return DataAccessService.getDataWithPara('api/PreExamination/GenerateOtpForFacultyMobileNoUpdate', param);
        };

        this.GenerateOtpForFacultyMobileNoUpdate = function (Pin, Phone, StudentType, ExamDetails) {
            var param = { "Pin": Pin, "Phone": Phone, "StudentType": StudentType, "ExamDetails": ExamDetails }

            return DataAccessService.getDataWithPara('api/PreExamination/GenerateOtpForFacultyMobileNoUpdate', param);
        };

        this.SendEail = function (htmlString) {
            var param = { "htmlString": htmlString }
            return DataAccessService.getDataWithPara('api/PreExamination/Email', param);
        };

        this.getTcData = function (pin) {
            var param = { "pin": pin }
            return DataAccessService.getDataWithPara('api/PreExamination/getTcData', param);
        };



        this.getBonafideData = function (pin, Id) {
            var param = { "pin": pin, "Id": Id }
            return DataAccessService.getDataWithPara('api/PreExamination/getBonafideData', param);
        };

        this.getStudyData = function (pin, Id) {
            var param = { "pin": pin, "Id": Id }
            return DataAccessService.getDataWithPara('api/PreExamination/getStudyData', param);
        };

        this.SetSignedDate = function (Pin) {
            var param = { "Pin": Pin }
            return DataAccessService.getDataWithPara('api/PreExamination/SetSignedDate', param);
        };

        this.SetMemoSignedDate = function (Pin, Semester, ExamMonthYear) {
            var param = {
                "Pin": Pin,
                "Semester": Semester,
                "ExamMonthYear": ExamMonthYear
            }
            return DataAccessService.getDataWithPara('api/PreExamination/SetMemoSignedDate', param);
        };

        this.sendcertSMS = function (PIN, CertificatePath, mobile, CertificateName) {
            var paramObj = {
                "Pin": PIN,
                "CertificatePath": CertificatePath,
                "mobile": mobile,
                "CertificateName": CertificateName
            }
            ////console.log(paramObj)
            var promise = DataAccessService.getDataWithPara('api/PreExamination/sendcertSMS', paramObj);
            return promise;
        };

        this.sendTwshcertSMS = function (regno, CertificatePath, mobile, CertificateName) {
            var paramObj = {
                "RegNo": regno,
                "CertificatePath": CertificatePath,
                "mobile": mobile,
                "CertificateName": CertificateName
            }
            ////console.log(paramObj)
            var promise = DataAccessService.getDataWithPara('api/PreExamination/sendTwshcertSMS', paramObj);
            return promise;
        };

        this.sendMemoSMS = function (PIN, mobile, CertificateName, Semester, Scheme) {
            var paramObj = {
                "Pin": PIN,

                "mobile": mobile,
                "CertificateName": CertificateName,
                "Semester": Semester,
                "Scheme": Scheme
            }
            // //console.log(paramObj)
            var promise = DataAccessService.getDataWithPara('api/PreExamination/sendMemoSMS', paramObj);
            return promise;
        };

        this.sendGenuinenessSMS = function (PIN, mobile, CertificateName, ApplicationNo) {
            var paramObj = {
                "Pin": PIN,
                "mobile": mobile,
                "CertificateName": CertificateName,
                "ReferenceNo": ApplicationNo
            }
            ////console.log(paramObj)
            var promise = DataAccessService.getDataWithPara('api/PreExamination/sendGenuinenessSMS', paramObj);
            return promise;
        };

        this.ThreeBacklogODCReports = function (fromdate, todate) {
            var paramObj = {
                "fromdate": fromdate,
                "todate": todate
            }
            var promise = DataAccessService.postData('PreExaminationReport/ThreeBacklogODCReports', paramObj);
            return promise;
        };

        this.getMarksMemoDetailsByPin = function (pin) {
            var param = { "pin": pin }
            return DataAccessService.getDataWithPara('api/PreExamination/getMarksMemoDetailsByPin', param);
        };

        this.getGenuinenessCheckDetailsByPin = function (pin) {
            var param = { "pin": pin }
            return DataAccessService.getDataWithPara('api/PreExamination/getGenuinenessCheckDetailsByPin', param);
        };


        this.GetInterimCertificateTobeSignedlocation = function (PinJson) {
            var param = { "PINjson": PinJson }
            return DataAccessService.postData('api/StudentCertificate/GetInterimCertificate', param);
        };

        this.GetGenuinenessCertificateTobeSignedlocation = function (PinJson) {
            var param = { "PINjson": PinJson }
            return DataAccessService.postData('api/StudentCertificate/GetGenuinenessCertificate', param);
        };

        this.GetTwshCertificateTobeSignedlocation = function (PinJson) {
            var param = { "PINjson": PinJson }
            return DataAccessService.postData('api/StudentCertificate/GetTwshCertificate', param);
        };

        this.GetDuplicateODCTobeSignedlocation = function (PinJson) {
            var param = { "PINjson": PinJson }
            return DataAccessService.postData('api/StudentCertificate/GetDuplicateDiplomaCertificate', param);
        };

        this.GetMigrationCertificateTobeSignedlocation = function (PinJson) {
            var param = { "PINjson": PinJson }
            return DataAccessService.postData('api/StudentCertificate/GetMigrationCertificate', param);
        };

        this.GetSSCDetails = function (RollNo, Year, Stream) {
            var param = { "RollNo": RollNo, "Year": Year, "Stream": Stream }
            return DataAccessService.postData('api/PreExamination/GetSSCDetails', param);
        };

        this.GetTranscriptDataforEmail = function (ApplicationNo) {
            var param = { "ApplicationNo": ApplicationNo }
            return DataAccessService.getDataWithPara('api/PreExamination/GetTranscriptDataforEmail', param);
        };

        this.SetTranscriptEmailStatus = function (ApplicationNo) {
            var param = { "ApplicationNo": ApplicationNo }
            return DataAccessService.getDataWithPara('api/PreExamination/SetTranscriptEmailStatus', param);
        };

        this.SetGenuinenessEmailStatus = function (Id) {
            var param = { "Id": Id }
            return DataAccessService.getDataWithPara('api/PreExamination/SetGenuinenessEmailStatus', param);
        };

        this.getTranscriptODCDetailsByPin = function (pin) {
            var param = { "pin": pin }
            return DataAccessService.getDataWithPara('api/PreExamination/getTranscriptODCDetailsByPin', param);
        };


        this.SetSmsStatus = function (pin, semester) {
            var param = { "pin": pin, "semester": semester }
            return DataAccessService.getDataWithPara('api/PreExamination/SetSmsStatus', param);
        };

        this.getMarksMemoDataByPin = function (pin, Semester) {
            var param = {
                "pin": pin,
                "Semester": Semester
            }

            return DataAccessService.getDataWithPara('api/PreExamination/getMarksMemoDataByPin', param);
        };

        this.getMarksMemoDataSemwiseByPin = function (pin, Semester) {
            var param = {
                "pin": pin,
                "Semester": Semester
            }
            return DataAccessService.getDataWithPara('api/PreExamination/getMarksMemoDataSemwiseByPin', param);
        };

        this.SendRelayMail = function (paramobj) {
            // var param = { "From": From, "To": To, "Subject": Subject, "Message": Message, "attachmentdata": attachmentdata}
            return DataAccessService.postData('api/Email/SendRelayMail', paramobj);
        };


        this.SendOTP = function (paramobj) {
            // var param = { "From": From, "To": To, "Subject": Subject, "Message": Message, "attachmentdata": attachmentdata}
            return DataAccessService.postData('api/Email/SendGenuinenessOTP', paramobj);
        };

        this.SendEmail = function (paramobj) {
            // var param = { "From": From, "To": To, "Subject": Subject, "Message": Message, "attachmentdata": attachmentdata}
            //return DataAccessService.postData('api/Communication/SendMails', paramobj);
            return DataAccessService.postData('api/Email/SendRelayMail', paramobj);
        };
        this.GetTranscriptCertificate = function (Applicationjson) {
            var param = { "Applicationjson": Applicationjson }
            return DataAccessService.postData('api/PreExamination/GetTranscriptCertificate', param);
        };


        this.GetTransferCertificateTobeSignedlocation = function (PinJson) {
            var param = { "PINjson": PinJson }
            return DataAccessService.postData('api/StudentCertificate/GetTransferCertificate', param);
        };

        this.GetBonafideCertificateTobeSignedlocation = function (PinJson) {
            var param = { "PINjson": PinJson }
            return DataAccessService.postData('api/StudentCertificate/GetBonafideCertificate', param);
        };

        this.GetStudyCertificateTobeSignedlocation = function (PinJson) {
            var param = { "PINjson": PinJson }
            return DataAccessService.postData('api/StudentCertificate/GetStudyCertificate', param);
        };

        this.GetBranchs = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetBranchs');
        };
        this.GetExamMonthYears = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetExamMonthYears');
        };

        this.GetExamMonthYearBySem = function (Semester, StudentTypeId) {
            var param = {
                "Semester": Semester,
                "StudentTypeId": StudentTypeId,

            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetExamMonthYearBySem', param);
        };

        this.GetExamMonthYearBySemId = function (Semid, StudentTypeId) {
            var param = {
                "Semid": Semid,
                "StudentTypeId": StudentTypeId,

            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetExamMonthYearBySemId', param);
        };



        this.GetExamMonthYear = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetExamMonthYear');
        };
        this.GetCertificateTypes = function () {

            return DataAccessService.getDataWithPara('api/PreExamination/GetCertificateTypes');
        };


        this.GetTimetableDatesByExamMonthYear = function (StudentTypeId, ExamMonthYearId) {
            var param = {
                "StudentTypeId": StudentTypeId,
                "ExamMonthYearId": ExamMonthYearId
            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetTimetableDatesByExamMonthYear', param);
        };

        this.GetChallanNumberData = function (pin, CertificateTypeId, ApplicationNumber) {
            var param = {
                "pin": pin,
                "CertificateTypeId": CertificateTypeId,
                "ApplicationNumber": ApplicationNumber
            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetChallanNumberData', param);
        };

        this.GetChallanData = function (pin, CertificateTypeId, ApplicationNumber) {

            var param = {
                "pin": pin,
                "CertificateTypeId": CertificateTypeId,
                "ApplicationNumber": ApplicationNumber
            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetChallanData', param);

        };

        this.Verify_GenuinenessEmailLog = function (Pin, Email, OTP) {
            var param = {
                "Pin": Pin,
                "Email": Email,
                "OTP": OTP
            }
            return DataAccessService.getDataWithPara('api/PreExamination/Verify_GenuinenessEmailLog', param);
        };



        this.UpdateUserdata = function (Pin, StudentPhoneNumber, OTP) {
            var param = {
                "Pin": Pin,
                "StudentPhoneNumber": StudentPhoneNumber,
                "OTP": OTP
            }
            return DataAccessService.getDataWithPara('api/PreExamination/UpdateUserdata', param);
        };

        this.AdmissionFilterReport = function (AcademicYearId, branchid, categoryid, admissiontype, schemeid, isphysicallyhandicaped, semid, collegetype, DataTypeId) {
            var param = {
                "AcademicYearId": AcademicYearId,
                "branchid": branchid,
                "categoryid": categoryid,
                "admissiontype": admissiontype,
                "schemeid": schemeid,
                "isphysicallyhandicaped": isphysicallyhandicaped,
                "semid": semid,
                "collegetype": collegetype,
                "DataTypeId": DataTypeId

            }

            return DataAccessService.postData('api/PreExamination/AdmissionFilterReport', param);
        };

        this.AdmissionSubReportsFilter = function (CollegeCode, UserId, AcademicYearId, branchid, categoryid, admissiontype, schemeid, isphysicallyhandicaped, semid, collegetype, DataTypeId) {
            var param = {
                "CollegeCode": CollegeCode,
                "UserId": UserId,
                "AcademicYearId": AcademicYearId,
                "branchid": branchid,
                "categoryid": categoryid,
                "admissiontype": admissiontype,
                "schemeid": schemeid,
                "isphysicallyhandicaped": isphysicallyhandicaped,
                "semid": semid,
                "collegetype": collegetype,
                "DataTypeId": DataTypeId
            }

            return DataAccessService.postData('api/PreExamination/AdmissionSubReportsFilter', param);
        };

        this.AdmissionSubReportsFilterExcel = function (CollegeCode, UserId, AcademicYearId, branchid, categoryid, admissiontype, schemeid, isphysicallyhandicaped, semid, collegetype, DataTypeId) {
            var param = {
                "CollegeCode": CollegeCode,
                "UserId": UserId,
                "AcademicYearId": AcademicYearId,
                "branchid": branchid,
                "categoryid": categoryid,
                "admissiontype": admissiontype,
                "schemeid": schemeid,
                "isphysicallyhandicaped": isphysicallyhandicaped,
                "semid": semid,
                "collegetype": collegetype,
                "DataTypeId": DataTypeId
            }
            return DataAccessService.postData('api/PreExamination/AdmissionSubReportsFilterExcel', param);
        };

        this.AdmissionSubReportPinList = function (CollegeCode, BranchId, SemId, AcademicYearId, DataFormatTypeId, categoryid, admissiontype, schemeid, isphysicallyhandicaped, DataTypeId) {
            var param = {
                "CollegeCode": CollegeCode,
                "BranchId": BranchId,
                "SemId": SemId,
                "AcademicYearId": AcademicYearId,
                "DataFormatTypeId": DataFormatTypeId,
                "categoryid": categoryid,
                "admissiontype": admissiontype,
                "schemeid": schemeid,
                "isphysicallyhandicaped": isphysicallyhandicaped,
                "DataTypeId": DataTypeId
            }
            return DataAccessService.postData('api/PreExamination/AdmissionSubReportPinList', param);
        };



        this.AdmissionReportsFilterExcel = function (AcademicYearId, branchid, categoryid, admissiontype, schemeid, isphysicallyhandicaped, semid, collegetype, DataTypeId) {
            var param = {
                "AcademicYearId": AcademicYearId,
                "branchid": branchid,
                "categoryid": categoryid,
                "admissiontype": admissiontype,
                "schemeid": schemeid,
                "isphysicallyhandicaped": isphysicallyhandicaped,
                "semid": semid,
                "collegetype": collegetype,
                "DataTypeId": DataTypeId

            }

            return DataAccessService.postData('api/PreExamination/AdmissionFilterReportExcel', param);
        };
        this.AdmissionBranchReportsFilterExcel = function (AcademicYearId, branchid, categoryid, admissiontype, schemeid, isphysicallyhandicaped, semid, collegetype, DataTypeId) {
            var param = {
                "AcademicYearId": AcademicYearId,
                "branchid": branchid,
                "categoryid": categoryid,
                "admissiontype": admissiontype,
                "schemeid": schemeid,
                "isphysicallyhandicaped": isphysicallyhandicaped,
                "semid": semid,
                "collegetype": collegetype,
                "DataTypeId": DataTypeId

            }

            return DataAccessService.postData('api/PreExamination/AdmissionBranchReportsFilterExcel', param);
        };


        this.getInterimDetails = function (pin) {
            var param = {
                "pin": pin,
            }
            return DataAccessService.getDataWithPara('api/PreExamination/getInterimDetails', param);
        };

        this.getDuplicateODCDetails = function (pin) {
            var param = {
                "pin": pin,
            }
            return DataAccessService.getDataWithPara('api/PreExamination/getDuplicateODCDetails', param);
        };

        this.getInterimPendingDetails = function (pin) {
            var param = {
                "pin": pin,
            }
            return DataAccessService.getDataWithPara('api/PreExamination/getInterimPendingDetails', param);
        };


        this.GetInternApproveList = function (userType) {
            var param = {
                "userType": userType
            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetInternApproveList', param);

        };


        this.GetTranscriptApprovalList = function (userType) {
            var param = {
                "userType": userType
            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetTranscriptApprovalList', param);

        };

        this.GetDuplicateMarksMemoApprovalList = function (userType) {
            var param = {
                "userType": userType
            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetDuplicateMarksMemoApprovalList', param);

        };

        this.GetNameCorrectionApproveList = function (userType) {
            var param = {
                "userType": userType
            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetNameCorrectionApproveList', param);

        };


        this.GetCertificateApprovalList = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetCertificateApprovalList');
        };

        this.GetTcApprovalList = function (CollegeCode, userType, Branch) {
            if (userType == 3) {
                var param = {
                    "CollegeCode": CollegeCode,
                    "userType": userType,
                    "BranchCode": Branch
                }
                return DataAccessService.getDataWithPara('api/PreExamination/GetTcApprovalLists', param);
            } else {
                var param = {
                    "CollegeCode": CollegeCode,
                    "userType": userType

                }
                return DataAccessService.getDataWithPara('api/PreExamination/GetTcApprovalList', param);
            }



        };

        this.GetBonafideApprovalList = function (CollegeCode, userType, Branch) {
            var param = {
                "CollegeCode": CollegeCode,
                "userType": userType,
                "BranchCode": Branch
            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetBonafideApprovalList', param);
        };

        this.GetStudyCertApprovalList = function (CollegeCode, userType, Branch) {
            var param = {
                "CollegeCode": CollegeCode,
                "userType": userType,
                "BranchCode": Branch
            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetStudyCertApprovalList', param);
        };

        this.GetMigrationApprovalList = function (userType) {
            var param = {

                "userType": userType

            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetMigrationApprovalList', param);
        };

        this.GetAttendanceApproveList = function (UserId) {
            var param = {

                "UserId": UserId

            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetAttendanceApproveList', param);
        };



        this.GetOdcApprovalList = function (userType) {
            var param = {

                "userType": userType

            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetOdcApprovalList', param);
        };

        this.GetGenuinenessApprovalList = function (userType) {
            var param = {

                "userType": userType

            }
            return DataAccessService.getDataWithPara('api/PreExamination/GetGenuinenessApprovalList', param);
        };

        this.GetScheme = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetScheme');
        };


        this.GetSemesters = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetSemesters');
        };

        this.GetAllSemesters = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetSemesters');
        };

        this.SetScheme = function (datatypeid, scheme, sequenceid, username) {
            var paramObject = {
                "datatypeid": datatypeid,
                "scheme": scheme,
                "sequenceid": sequenceid,
                "username": username
            };
            return DataAccessService.getDataWithPara('api/PreExamination/SetScheme', paramObject);
        };

        this.GenerateOdcData = function (ExamMonthYearId, day, month, year) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId,
                "day": day,
                "month": month,
                "year": year
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GenerateOdcData', paramObject);
        };

        this.GetOdcData = function (Scheme, ExamMonthYearId, Date) {
            var paramObject = {
                "Scheme": Scheme,
                "ExamMonthYearId": ExamMonthYearId,
                "Date": Date,

            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetOdcData', paramObject);
        };


        this.GetExamSessionDates = function (ExamMonthYearId, AcademicYearId, StudentTypeId, ExamTypeId, schemeid) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId,
                "AcademicYearId": AcademicYearId,
                "StudentTypeId": StudentTypeId,
                "ExamTypeId": ExamTypeId,
                "schemeid": schemeid
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetExamSessionDates', paramObject);
        };


        this.SetSemester = function (DataTypeId, Semester, UserName, scheme, schemeid, IsSession1, IsSession2, SequenceId, semid, IsActive) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "Semester": Semester,
                "UserName": UserName,
                "scheme": scheme,
                "schemeid": schemeid,
                "IsSession1": IsSession1,
                "IsSession2": IsSession2,
                "SequenceId": SequenceId,
                "semid": semid,
                "IsActive": IsActive,
            };

            return DataAccessService.getDataWithPara('api/PreExamination/SetSemester', paramObject);
        };


        this.SetAcademicYear = function (DataTypeId, AcademicYear, AcademicStartYear, StartDate, EndDate, UserName, IsCurrentAcademicYear, AcademicID, ActiveFlag) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "AcademicYear": AcademicYear,
                "AcademicStartYear": AcademicStartYear,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "UserName": UserName,
                "IsCurrentAcademicYear": IsCurrentAcademicYear,
                "AcademicID": AcademicID,
                "ActiveFlag": ActiveFlag

            };
            return DataAccessService.getDataWithPara('api/PreExamination/SetAcademicYear', paramObject);
        };


        this.GetNoDataCertificateApprovalList = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetNoDataCertificateApprovalList');
        };

        this.GetMonthYear = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetMonthYear');
        };

        this.GetMonthYears = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetMonthYears');
        };

        this.GetStudentTypes = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetStudentTypes');
        };
        this.getSchemes = function () {
            var promise = DataAccessService.getDataWithPara('Admission/getSchemes');
            return promise;
        }

        this.GetCollegelist = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetColleges');
        };

        this.GetExamTypeForResults = function (SchemeId) {
            var paramObject = { "SchemeId": SchemeId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetExamTypeForResults', paramObject);
            return promise;
        }


        this.GetExamMonthYearAcademicYear = function (Academicyearid) {
            var paramObject = { "Academicyearid": Academicyearid };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetExamMonthYearAcademicYear', paramObject);
            return promise;
        }


        this.getTwoYearsCertificateDetails = function (pin) {
            var paramObject = { "pin": pin };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getTwoYearsCertificateDetails', paramObject);
            return promise;
        }


        this.GetTwoYearsListByScheme = function (userType) {
            var paramObject = { "userType": userType };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTwoYearsListByScheme', paramObject);
            return promise;
        }


        this.GetTwoYearsApproveList = function (Scheme, datatype, userType) {
            var paramObject = { "Scheme": Scheme, "datatype": datatype, "userType": userType };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTwoYearsApproveList', paramObject);
            return promise;
        }


        this.getFeeTypes = function (ExamMonthYearId, StudentTypeId) {
            var paramObject = { "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getFeeTypes', paramObject);
            return promise;
        }

        this.getExamYearMonths = function () {
            return DataAccessService.getDataWithPara('MasterPage/getExamYearMonths');
        };

        this.GetCastes = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetCastes');
        };

        this.GetOrganizationTypes = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetOrganizationTypes');
        };

        this.GetReligion = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetReligion');
        };

        this.GetCollegeWiseExpenditure = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetCollegeWiseExpenditure');
        };

        this.getActiveExamTypes = function () {
            return DataAccessService.getDataAll('api/PreExamination/getActiveExamTypes');
        };

        this.GetDaywisePcodeReport = function (AcademicYearId, ExamMonthYearId, StudentTypeId, Schemeid, ExamTypeId) {
            var paramObj = {
                "AcademicYearId": AcademicYearId,
                "ExamMonthYearId": ExamMonthYearId,
                "StudentTypeId": StudentTypeId,
                "Schemeid": Schemeid,
                "ExamTypeId": ExamTypeId
            }

            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetDaywisePcodeReport', paramObj);
            return promise;
        };

        this.GetDaywisePcodeExcel = function (AcademicYearId, ExamMonthYearId, StudentTypeId, Schemeid, ExamTypeId) {
            var paramObj = {
                "AcademicYearId": AcademicYearId,
                "ExamMonthYearId": ExamMonthYearId,
                "StudentTypeId": StudentTypeId,
                "Schemeid": Schemeid,
                "ExamTypeId": ExamTypeId
            }

            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetDaywisePcodeExcel', paramObj);
            return promise;
        };




        this.BackLogDetailsForNc = function (PIN) {
            var paramObj = {
                "pin": PIN
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/BackLogDetailsForNc', paramObj);
            return promise;
        };


        this.GetExpenditureById = function (Id) {
            var paramObj = {
                "Id": Id
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetExpenditureById', paramObj);
            return promise;
        };

        this.DleteExpenditure = function (Id) {
            var paramObj = {
                "Id": Id
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/DleteExpenditure', paramObj);
            return promise;
        };

        this.GETMemoDataByPin = function (Scheme, sem, ExamYearMonth, pin) {
            var paramObj = {
                "Scheme": Scheme,
                "ExamMonthYearId": ExamYearMonth,
                "semid": sem,
                "pin": pin
            }

            var promise = DataAccessService.getDataWithPara('api/PreExamination/GETMemoDataByPin', paramObj);
            return promise;
        };

        this.ReleaseMarksEntry = function (CollegeCode, SemId, SchemeId, ExamTypeId, AcademicYearId, subid, ExamMonthYearId, UserName, UserTypeId) {
            var paramObj = {
                "CollegeCode": CollegeCode,
                "SemId": SemId,
                "SchemeId": SchemeId,
                "ExamTypeId": ExamTypeId,
                "AcademicYearId": AcademicYearId,
                "subid": subid,
                "ExamMonthYearId": ExamMonthYearId,
                "UserName": UserName,
                "UserTypeId": UserTypeId
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/ReleaseMarksEntry', paramObj);
            return promise;
        };


        this.ReleaseSixthSem = function (AcademicYearId, CollegeCode, BranchId) {
            var paramObj = {
                "AcademicYearId": AcademicYearId,
                "CollegeCode": CollegeCode,
                "BranchId": BranchId
            }

            var promise = DataAccessService.getDataWithPara('api/PreExamination/ReleaseSixthSem', paramObj);
            return promise;
        };


        this.GETMemoDataByPinForPrinting = function (Scheme, sem, ExamYearMonth, pin) {
            var paramObj = {
                "Scheme": Scheme,
                "ExamMonthYearId": ExamYearMonth,
                "semid": sem,
                "pin": pin
            }

            var promise = DataAccessService.getDataWithPara('api/PreExamination/GETMemoDataByPinForPrinting', paramObj);
            return promise;
        };

        this.getApprovePinList = function (Scheme, datatype, userType) {
            var paramObj = {
                "Scheme": Scheme,
                "datatype": datatype,
                "userType": userType
            }

            var promise = DataAccessService.getDataWithPara('api/PreExamination/getApprovePinList', paramObj);
            return promise;
        };


        //this.SetNameCorrectionData = function (PIN, Scheme, CollegeCode,CertificateType, OldName, UpdatedName, FatherName,
        //    UpdatedFathername, SscMemo, Amount, Mobile,DOB) {
        //    var paramObj = {
        //        "PIN": PIN,

        //        "Scheme": Scheme,
        //        "CollegeCode": CollegeCode,
        //        "CertificateType":CertificateType,
        //        "OldName":OldName,
        //        "UpdatedName":UpdatedName,
        //        "FatherName":FatherName,
        //        "UpdatedFathername":UpdatedFathername,
        //        "SscMemo":SscMemo,

        //        "Amount":Amount,
        //        "Mobile": Mobile,
        //        "DOB": DOB
        //    }
        //   
        //    var promise = DataAccessService.postData('api/PreExamination/SetNameCorrectionData', paramObj);
        //    return promise;
        //};


        this.SetTcData = function (pin, ReasonForTC, IdMark1, IdMark2) {
            var paramObj = {
                "pin": pin,
                "ReasonForTC": ReasonForTC,
                "IdMark1": IdMark1,
                "IdMark2": IdMark2
            }
            var promise = DataAccessService.postData('api/PreExamination/SetTcData', paramObj);
            return promise;
        };

        this.AddExpenditureData = function (CollegeCode, StudentType, ExamMonthYear, ExamDate, ExpenditureAmount, Description, DataTypeId) {
            var paramObj = {
                "CollegeCode": CollegeCode,
                "StudentType": StudentType,
                "ExamMonthYear": ExamMonthYear,
                "ExamDate": ExamDate,
                "ExpenditureAmount": ExpenditureAmount,
                "Description": Description,
                "DataTypeId": DataTypeId,
            }
            var promise = DataAccessService.postData('api/PreExamination/AddExpenditureData', paramObj);
            return promise;
        };

        this.UpdateExpenditureData = function (ExpenditureAmount, Description, Id) {
            var paramObj = {

                "ExpenditureAmount": ExpenditureAmount,
                "Description": Description,
                "Id": Id,
            }
            var promise = DataAccessService.postData('api/PreExamination/UpdateExpenditureData', paramObj);
            return promise;
        };

        this.SetGenuinenessCheck = function (Pin, OrganizationType, OrganizationName, OrganizationAddress, OrganizationEmail, OrganizationMobile, ODCNo, ODC,
            ExamMonthYear, Amount, ApplyingOfficer, CertificateApplication, OfficerDesignation) {
            var paramObj = {
                "Pin": Pin,
                "OrganizationType": OrganizationType,
                "OrganizationName": OrganizationName,
                "OrganizationAddress": OrganizationAddress,
                "OrganizationEmail": OrganizationEmail,
                "OrganizationMobile": OrganizationMobile,
                "ODCNo": ODCNo,
                "ODC": ODC,
                "ExamMonthYear": ExamMonthYear,
                "Amount": Amount,
                "ApplyingOfficer": ApplyingOfficer,
                "CertificateApplication": CertificateApplication,
                "OfficerDesignation": OfficerDesignation
            }

            var promise = DataAccessService.postData('api/PreExamination/SetGenuinenessCheck', paramObj);
            return promise;
        };


        this.SetGenuinenessCheckPayment = function (Pin, OrganizationType, OrganizationName, OrganizationAddress, OrganizationEmail, OrganizationMobile, ODCNo, ODC,
            ExamMonthYear, Amount, ApplyingOfficer, CertificateApplication, OfficerDesignation) {
            var paramObj = {
                "Pin": Pin,
                "OrganizationType": OrganizationType,
                "OrganizationName": OrganizationName,
                "OrganizationAddress": OrganizationAddress,
                "OrganizationEmail": OrganizationEmail,
                "OrganizationMobile": OrganizationMobile,
                "ODCNo": ODCNo,
                "ODC": ODC,
                "ExamMonthYear": ExamMonthYear,
                "Amount": Amount,
                "ApplyingOfficer": ApplyingOfficer,
                "CertificateApplication": CertificateApplication,
                "OfficerDesignation": OfficerDesignation

            }

            var promise = DataAccessService.postData('api/PreExamination/SetGenuinenessCheckPayment', paramObj);
            return promise;
        };



        this.UpdateTcData = function (pin, ReasonForTC, IdMark1, IdMark2) {
            var paramObj = {
                "pin": pin,
                "ReasonForTC": ReasonForTC,
                "IdMark1": IdMark1,
                "IdMark2": IdMark2,

            }

            //+//console.log(paramObj)
            var promise = DataAccessService.postData('api/PreExamination/UpdateTcData', paramObj);
            return promise;
        };

        this.SetBonafiedData = function (pin, ReasonForBonafied, Name, FatherName, Branchcode, CollegeCode) {
            var paramObj = {
                "pin": pin,
                "ReasonForBonafied": ReasonForBonafied,
                "Name": Name,
                "FatherName": FatherName,
                "Branchcode": Branchcode,
                "CollegeCode": CollegeCode
            }

            var promise = DataAccessService.postData('api/PreExamination/SetBonafiedData', paramObj);
            return promise;
        };

        this.SetStudyCertData = function (pin, ReasonForBonafied, Name, FatherName, Branchcode, CollegeCode) {
            var paramObj = {
                "pin": pin,
                "ReasonForBonafied": ReasonForBonafied,
                "Name": Name,
                "FatherName": FatherName,
                "Branchcode": Branchcode,
                "CollegeCode": CollegeCode,
            }

            var promise = DataAccessService.postData('api/PreExamination/SetStudyCertData', paramObj);
            return promise;
        };

        this.SetInterimData = function (pin) {
            var paramObj = {
                "pin": pin,
            }
            var promise = DataAccessService.postData('api/PreExamination/SetInterimData', paramObj);
            return promise;
        };

        this.SetNameCorrectionData = function (pin, Name, UpdatedName, FatherName, UpdatedFatherName, Gender, Sscmemo) {
            var paramObj = {
                "pin": pin,
                "Name": Name,
                "UpdatedName": UpdatedName,
                "FatherName": FatherName,
                "UpdatedFatherName": UpdatedFatherName,
                "Gender": Gender,
                "Sscmemo": Sscmemo,

            }

            var promise = DataAccessService.postData('api/PreExamination/SetNameCorrectionData', paramObj);
            return promise;
        };

        this.SetTranscriptData = function (Pin, UniversitiesApplied, UniversityEmails, WESCertificate, WESReferenceNo, Email, Memos, certificateType) {
            var paramObj = {
                "Pin": Pin,
                "UniversitiesApplied": UniversitiesApplied,
                "UniversityEmails": UniversityEmails,
                "WESCertificate": WESCertificate,
                "WESReferenceNo": WESReferenceNo,
                "Email": Email,
                "filedata": Memos,
                "certificateType": certificateType
            }
            var promise = DataAccessService.postData('api/PreExamination/SetTranscriptData', paramObj);
            return promise;
        };
        this.SetNoDataTranscriptData = function (Pin, Name, FatherName, Branch, CollegeCode, Scheme, Gender, UniversitiesApplied, UniversityEmails, WESCertificate, WESReferenceNo, Email, Memos, certificateType) {
            var paramObj = {
                "Pin": Pin,
                "Name": Name,
                "FatherName": FatherName,
                "Branch": Branch,
                "CollegeCode": CollegeCode,
                "Scheme": Scheme,
                "Gender": Gender,
                "UniversitiesApplied": UniversitiesApplied,
                "UniversityEmails": UniversityEmails,
                "WESCertificate": WESCertificate,
                "WESReferenceNo": WESReferenceNo,
                "Email": Email,
                "filedata": Memos,
                "certificateType": certificateType
            }
            var promise = DataAccessService.postData('api/PreExamination/SetNoDataTranscriptData', paramObj);
            return promise;
        };


        this.SetAttendanceVerificationStatus = function (UserId, AttendeeId, Pin) {
            var paramObj = {
                "UserId": UserId,
                "AttendeeId": AttendeeId,
                "Pin": Pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/SetAttendanceVerificationStatus', paramObj);
            return promise;
        };

        this.SetTranscriptVerificationStatus = function (ApplicationNo, userType) {
            var paramObj = {
                "ApplicationNo": ApplicationNo,
                "userType": userType
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/SetTranscriptVerificationStatus', paramObj);
            return promise;
        };

        this.SetTwoYearsCertificateVerifyStatus = function (PIN, userType) {
            var paramObj = {
                "PIN": PIN,
                "userType": userType
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/SetTwoYearsCertificateVerifyStatus', paramObj);
            return promise;
        };



        this.SetMigrationData = function (pin) {
            var paramObj = {
                "pin": pin,
            }
            var promise = DataAccessService.postData('api/PreExamination/SetMigrationData', paramObj);
            return promise;
        };

        this.SetOdcData = function (pin, AadharNo, OdcNo, PoliceFir, PrincipalCoveringLetter, MegisrateAffidavit, AadharCopy, OdcMemos) {
            var paramObj = {
                "pin": pin,
                "AadharNo": AadharNo,
                "OdcNo": OdcNo,
                "PoliceFir": PoliceFir,
                "PrincipalCoveringLetter": PrincipalCoveringLetter,
                "MegisrateAffidavit": MegisrateAffidavit,
                "AadharCopy": AadharCopy,
                "OdcMemos": OdcMemos
            }

            var promise = DataAccessService.postData('api/PreExamination/SetOdcData', paramObj);
            return promise;
        };

        this.SetOldStudentsOdcDataPayment = function (pin, Name, FatherName, Branch, CollegeCode, Scheme, Gender, AadharNo, OdcNo, PoliceFir, PrincipalCoveringLetter, MegisrateAffidavit, AadharCopy, OdcMemos, OdcReason) {
            ////console.log(pin, Name, FatherName, Branch, CollegeCode, Scheme, Gender, AadharNo, OdcNo, PoliceFir, PrincipalCoveringLetter, MegisrateAffidavit, AadharCopy, OdcMemos, OdcReason)
            if (OdcReason == 'Missing ODC') {
                var paramObj = {
                    "pin": pin,
                    "Name": Name,
                    "FatherName": FatherName,
                    "Branch": Branch,
                    "CollegeCode": CollegeCode,
                    "Scheme": Scheme,
                    "Gender": Gender,
                    "AadharNo": AadharNo,
                    "OdcNo": OdcNo,
                    "PoliceFir": PoliceFir,
                    "PrincipalCoveringLetter": PrincipalCoveringLetter,
                    "MegisrateAffidavit": MegisrateAffidavit,
                    "AadharCopy": AadharCopy,
                    "OdcMemos": OdcMemos,
                    "OdcReason": OdcReason
                }

                var promise = DataAccessService.postData('api/PreExamination/SetOldStudentsOdcDataPayment', paramObj);
                return promise;
            } else {
                var paramObj = {
                    "pin": pin,
                    "Name": Name,
                    "FatherName": FatherName,
                    "Branch": Branch,
                    "CollegeCode": CollegeCode,
                    "Scheme": Scheme,
                    "Gender": Gender,
                    "AadharNo": AadharNo,
                    "OdcNo": OdcNo,

                    "PrincipalCoveringLetter": PrincipalCoveringLetter,

                    "AadharCopy": AadharCopy,
                    "OdcMemos": OdcMemos,
                    "OdcReason": OdcReason
                }
                var promise = DataAccessService.postData('api/PreExamination/SetOldStudentsDamagedDdcDataPayment', paramObj);
                return promise;
            }
        }
        this.SetOdcDataPayment = function (pin, AadharNo, OdcNo, PoliceFir, PrincipalCoveringLetter, MegisrateAffidavit, AadharCopy, OdcMemos, OdcReason) {
            if (OdcReason == 'Missing ODC') {
                var paramObj = {
                    "pin": pin,
                    "AadharNo": AadharNo,
                    "OdcNo": OdcNo,
                    "PoliceFir": PoliceFir,
                    "PrincipalCoveringLetter": PrincipalCoveringLetter,
                    "MegisrateAffidavit": MegisrateAffidavit,
                    "AadharCopy": AadharCopy,
                    "OdcMemos": OdcMemos,
                    "OdcReason": OdcReason
                }
                var promise = DataAccessService.postData('api/PreExamination/SetOdcDataPayment', paramObj);
                return promise;
            } else {
                var paramObj = {
                    "pin": pin,
                    "AadharNo": AadharNo,
                    "OdcNo": OdcNo,
                    "PrincipalCoveringLetter": PrincipalCoveringLetter,
                    "AadharCopy": AadharCopy,
                    "OdcMemos": OdcMemos,
                    "OdcReason": OdcReason
                }
                var promise = DataAccessService.postData('api/PreExamination/SetOdcDamagedDataPayment', paramObj);
                return promise;
            }

        };


        this.SetCertificateData = function (Pin, Name, Scheme, CollegeCode, CertificateType, Amount, Mobile, Nodue, photo) {
            if (CertificateType == 6) {
                var paramObj = {
                    "Pin": Pin,
                    "Name": Name,
                    "Scheme": Scheme,
                    "CollegeCode": CollegeCode,
                    "CertificateType": CertificateType,
                    "Amount": Amount,
                    "Mobile": Mobile,
                    "NoDue": Nodue,
                    "photo": photo
                }
                var promise = DataAccessService.postData('api/PreExamination/Set_TC_CertificateData', paramObj);
                return promise;
            } else {
                var paramObj = {
                    "Pin": Pin,
                    "Name": Name,
                    "Scheme": Scheme,
                    "CollegeCode": CollegeCode,
                    "CertificateType": CertificateType,
                    "Amount": Amount,
                    "Mobile": Mobile

                }
                var promise = DataAccessService.postData('api/PreExamination/SetCertificateData', paramObj);
                return promise;
            }



        };

        this.SetExamMonthYear = function (DataTypeId, ExamMonthYear, ExamMonthYearId, SequenceId) {
            var paramObj = {
                "DataTypeId": DataTypeId,
                "ExamMonthYear": ExamMonthYear,
                "ExamMonthYearId": ExamMonthYearId,
                "SequenceId": SequenceId
            }
            var promise = DataAccessService.getDataWithPara('MasterPage/SetExamMonthYear', paramObj);
            return promise;
        };


        this.GetTimeTableUpdateData = function (AcademicYearId, ExamMonthYearId, StudentTypeId, Schemeid, semid, ExamTypeId, branchid) {
            var paramObj = {
                "AcademicYearId": AcademicYearId,
                "ExamMonthYearId": ExamMonthYearId,
                "StudentTypeId": StudentTypeId,
                "ExamTypeId": ExamTypeId,
                "Schemeid": Schemeid,
                "semid": semid,
                "branchid": branchid
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTimeTableUpdateData', paramObj);
            return promise;
        };


        this.GetTimeTableUpdateDataByPcode = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, pcode) {
            var paramObj = {
                "ExamMonthYearId": ExamMonthYearId,
                "AcademicYearId": AcademicYearId,
                "StudentTypeId": StudentTypeId,
                "ExamTypeId": ExamTypeId,
                "pcode": pcode

            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTimeTableUpdateDataByPcode', paramObj);
            return promise;

        };

        this.GetExamTypeByMonthYear = function (ExamMonthYearId, SessionId) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId,
                "SessionId": SessionId
            };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetExamTypeByMonthYear', paramObject);
            return promise;
        }

        this.GetTimeTableUpdateDataByDate = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, ExamDate, ExamSession, schemeid) {
            var paramObj = {
                "ExamMonthYearId": ExamMonthYearId,
                "AcademicYearId": AcademicYearId,

                "StudentTypeId": StudentTypeId,
                "ExamTypeId": ExamTypeId,
                "ExamDate": ExamDate,
                "ExamSession": ExamSession,
                "schemeid": schemeid,

            }

            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTimeTableUpdateDataByDate', paramObj);
            return promise;

        };

        this.SetTimeTableUpdateData = function (DataTypeId, Json) {
            var paramObj = {
                "DataTypeId": DataTypeId,
                "Json": Json
            }
            var promise = DataAccessService.postData('api/PreExamination/SetTimeTableUpdateData', paramObj);
            return promise;
        };

        this.GetTimeTableMonthYearExamTypesSessions = function (SessionId, AcademicYearId) {
            var paramObj = {
                "SessionId": SessionId,
                "AcademicYearId": AcademicYearId
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTimeTableMonthYearExamTypesSessions', paramObj);
            return promise;
        };

        this.SetTimeTableMonthYearExamTypesSessions = function (DataTypeId, Json) {
            var paramObj = {
                "DataTypeId": DataTypeId,
                "Json": Json
            }
            var promise = DataAccessService.postData('api/PreExamination/SetTimeTableMonthYearExamTypesSessions', paramObj);
            return promise;
        };

        this.GetTimeTableMonthYearExamTypes = function (SessionId, AcademicYearId) {
            var paramObj = {
                "SessionId": SessionId,
                "AcademicYearId": AcademicYearId
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTimeTableMonthYearExamTypes', paramObj);
            return promise;
        };

        this.SetTimeTableMonthYearExamTypes = function (DataTypeId, Json) {
            var paramObj = {
                "DataTypeId": DataTypeId,
                "Json": Json
            }
            paramObj = JSON.stringify(paramObj);
            var promise = DataAccessService.postData('api/PreExamination/SetTimeTableMonthYearExamTypes', paramObj);
            return promise;
        };

        this.GetTimeTableSessionSchemeSemesters = function (SessionId, AcademicYearId) {
            var paramObj = {
                "SessionId": SessionId,
                "AcademicYearId": AcademicYearId
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTimeTableSessionSchemeSemesters', paramObj);
            return promise;
        };

        this.SetTimeTableSessionSchemeSemesters = function (DataTypeId, Json) {
            var paramObj = {
                "DataTypeId": DataTypeId,
                "Json": Json
            }
            var promise = DataAccessService.postData('api/PreExamination/SetTimeTableSessionSchemeSemesters', paramObj);
            return promise;
        };

        this.GetCertificateApprovalDetails = function (Scheme, datatype) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetCertificateApprovalListByScheme', paramObj);
            return promise;
        };


        this.GetTcApprovalDetails = function (Scheme, datatype, userType, CollegeCode, BranchCode) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype, "userType": userType, "CollegeCode": CollegeCode, "BranchCode": BranchCode
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTcApprovalListByScheme', paramObj);
            return promise;
        };


        this.GetBonafiedApprovalListByScheme = function (Scheme, datatype, userType, CollegeCode, BranchCode) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype, "userType": userType, "CollegeCode": CollegeCode, "BranchCode": BranchCode
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetBonafiedApprovalListByScheme', paramObj);
            return promise;
        };

        this.GetStudyApprovalListByScheme = function (Scheme, datatype, userType, CollegeCode, BranchCode) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype, "userType": userType, "CollegeCode": CollegeCode, "BranchCode": BranchCode
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetStudyApprovalListByScheme', paramObj);
            return promise;
        };


        this.GetTranscriptListByScheme = function (Scheme, datatype, userType) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype, "userType": userType
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTranscriptListByScheme', paramObj);
            return promise;
        };

        this.GetNameCorrectionListByScheme = function (Scheme, datatype, userType) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype, "userType": userType
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetNameCorrectionListByScheme', paramObj);
            return promise;
        };

        this.GetMigrationApprovalDetails = function (Scheme, datatype, userType) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype, "userType": userType
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetMigrationApprovalListByScheme', paramObj);
            return promise;
        };

        this.GetAttendanceApprovalDetails = function (UserId, CollegeCode, DataType) {
            var paramObj = {
                "UserId": UserId, "CollegeCode": CollegeCode, "DataType": DataType
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetAttendanceApprovalDetails', paramObj);
            return promise;
        };


        this.getAttendanceDetails = function (UserId, AttendeeId, Pin) {
            var paramObj = {
                "UserId": UserId, "AttendeeId": AttendeeId, "Pin": Pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getAttendanceDetails', paramObj);
            return promise;
        };

        this.GetOdcListByScheme = function (Scheme, datatype, userType) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype, "userType": userType
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetOdcListByScheme', paramObj);
            return promise;
        };

        this.GetGenuinenessListByScheme = function (Scheme, datatype, userType) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype, "userType": userType
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetGenuinenessListByScheme', paramObj);
            return promise;
        };

        this.GetDuplicateMarksMemoListByScheme = function (Scheme, datatype, userType) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype, "userType": userType
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetDuplicateMarksMemoListByScheme', paramObj);
            return promise;
        };


        this.GetNoDataCertificateApprovalDetails = function (Scheme, datatype) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetNoDataCertificateApprovalListByScheme', paramObj);
            return promise;
        };

        this.TwoYearsFeePaymentReports = function (Scheme, datatype, userType) {
            var paramObj = {
                "Scheme": Scheme, "datatype": datatype, "userType": userType

            }
            return DataAccessService.getDataWithPara('api/PreExamination/TwoYearsFeePaymentReports', paramObj);
        },

            this.CertificateFeePaymentReports = function (Scheme, datatype) {
                var paramObj = {
                    "Scheme": Scheme, "datatype": datatype

                }
                return DataAccessService.getDataWithPara('api/PreExamination/CertificateFeePaymentReports', paramObj);
            },

            this.Memos = function (Scheme, ExamMonthYearId, Date) {
                var paramObj = {
                    "Scheme": Scheme, "ExamMonthYearId": ExamMonthYearId, "Date": Date

                }
                return DataAccessService.getDataWithPara('api/PreExamination/Memos', paramObj);
            },

            this.GetTwoYearsOdcData = function (FromDate, Todate) {
                var paramObj = {
                    "FromDate": FromDate, "Todate": Todate

                }
                return DataAccessService.getDataWithPara('api/PreExamination/GetTwoYearsOdcData', paramObj);
            },

            this.GetChangePassword = function (reqdata) {
                var paramObject = reqdata;
                var promise = DataAccessService.postData('api/SystemUser/GetChangePassword', paramObject);
                return promise;
            }


        this.GetTrSheets = function (Scheme, ExamMonthYearId, Date, CollegeCodesList, Semid) {
            var paramObj = {
                "Scheme": Scheme, "ExamMonthYearId": ExamMonthYearId, "Date": Date, "CollegeCodesList": CollegeCodesList, "Semid": Semid
            }
            return DataAccessService.postData('api/StudentCertificate/GetTrSheetsData', paramObj);
        },

            this.GetOdcTrSheets = function (ExamMonthYearId, CollegeCodesList) {
                var paramObj = {
                    "ExamMonthYearId": ExamMonthYearId, "CollegeCodesList": CollegeCodesList

                }
                return DataAccessService.getDataWithPara('api/StudentCertificate/GetODCTrsheets', paramObj);
            },

            this.GetC18OdcTrSheets = function (ExamMonthYearId, CollegeCodesList) {
                var paramObj = {
                    "ExamMonthYearId": ExamMonthYearId, "CollegeCodesList": CollegeCodesList

                }
                return DataAccessService.getDataWithPara('api/StudentCertificate/GetC18OdcTrSheets', paramObj);
            },
            this.UpdateMobileNumber = function (Pin, PhoneNumber) {
                var paramObj = {
                    "Pin": Pin, "PhoneNumber": PhoneNumber
                }
                var promise = DataAccessService.getDataWithPara('api/PreExamination/UpdateMobileNumber', paramObj);
                return promise;
            };

        this.getFeePaymentStatus = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getFeePaymentStatus', paramObj);
            return promise;
        };

        this.getMersyFeeStatus = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getMersyFeeStatus', paramObj);
            return promise;
        };

        this.getTwoYearsFeePaymentStatus = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getTwoYearsFeePaymentStatus', paramObj);
            return promise;
        };

        this.getFileUploadDetails = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getFileUploadDetails', paramObj);
            return promise;
        };

        this.getTranscriptsdetails = function (Pin, ApplicationNumber) {
            var paramObj = {
                "Pin": Pin,
                "ApplicationNumber": ApplicationNumber
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getTranscriptsdetails', paramObj);
            return promise;
        };

        this.getOdcdetails = function (Pin) {
            var paramObj = {
                "Pin": Pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getOdcdetails', paramObj);
            return promise;
        };

        this.getGenuinenessCheckdetails = function (Pin, Id) {
            var paramObj = {
                "Pin": Pin, "Id": Id
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getGenuinenessCheckdetails', paramObj);
            return promise;
        };

        this.getDMMdetails = function (Pin, Semester, ExamMonthYear, Scheme) {
            var paramObj = {
                "Pin": Pin, "Semester": Semester, "ExamMonthYear": ExamMonthYear, "Scheme": Scheme
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getDMMdetails', paramObj);
            return promise;
        };

        this.ApproveCertificate = function (Pin, Approvestatus) {
            var paramObj = {
                "Pin": Pin, "Approvestatus": Approvestatus
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/ApproveCertificate', paramObj);
            return promise;
        };

        this.SetApproveStatus = function (PIN, Approvestatus) {
            var paramObj = {
                "PIN": PIN, "Approvestatus": Approvestatus
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/SetApproveStatus', paramObj);
            return promise;
        };

        this.getTcDetails = function (Pin) {
            var paramObj = {
                "Pin": Pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getTcDetails', paramObj);
            return promise;
        }


        this.GetInterimCertificate = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/StudentCertificate/GetInterimCertificate', paramObj);
            return promise;
        }

        this.GetTypewritingCertificate = function (RegNo) {
            var paramObj = {
                "RegNo": RegNo
            }
            var promise = DataAccessService.getDataWithPara('api/StudentCertificate/GetTypewritingCertificate', paramObj);
            return promise;
        }


        this.getNCdetails = function (Pin) {
            var paramObj = {
                "Pin": Pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getNCdetails', paramObj);
            return promise;
        }

        this.UpdateNameCorrectionData = function (Pin, Name, FatherName) {
            var paramObj = {
                "Pin": Pin, "Name": Name, "FatherName": FatherName
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/UpdateNameCorrectionData', paramObj);
            return promise;
        }


        this.BonafideSetVerifyStatus = function (Pin, Name, FatherName, Branchcode, AcademicYear, Conduct, userType, Id) {

            var paramObj = {
                "Pin": Pin, "Name": Name, "FatherName": FatherName, "Branchcode": Branchcode, "AcademicYear": AcademicYear,
                "Conduct": Conduct, "userType": userType, "Id": Id
            }

            var promise = DataAccessService.postData('api/PreExamination/BonafideSetVerifyStatus', paramObj);
            return promise;


        };


        this.StudySetVerifyStatus = function (Pin, Name, FatherName, Branchcode, AcademicYear, Conduct, userType, Id) {

            var paramObj = {
                "Pin": Pin, "Name": Name, "FatherName": FatherName, "Branchcode": Branchcode, "AcademicYear": AcademicYear,
                "Conduct": Conduct, "userType": userType, "Id": Id
            }

            var promise = DataAccessService.postData('api/PreExamination/StudySetVerifyStatus', paramObj);
            return promise;


        };

        this.TcSetApproveStatus = function (Pin, userType, admittedDate, LeftDate, CollegeDuesPaid, Religion, Nationality,
            Caste, DateOfBirth, MotherName, Promoted, Conduct, StudentRemarks, LeftClass, Station, AdmissionNo, IdMark1, IdMark2) {
            var paramObj = {
                "Pin": Pin, "userType": userType, "admittedDate": admittedDate, "LeftDate": LeftDate, "CollegeDuesPaid": CollegeDuesPaid,
                "Religion": Religion, "Nationality": Nationality, "Caste": Caste, "DateOfBirth": DateOfBirth, "MotherName": MotherName,
                "Promoted": Promoted, "Conduct": Conduct, "StudentRemarks": StudentRemarks, "LeftClass": LeftClass, "Station": Station,
                "AdmissionNo": AdmissionNo, "IdMark1": IdMark1, "IdMark2": IdMark2
            }

            var promise = DataAccessService.postData('api/PreExamination/TcSetApproveStatus', paramObj);
            return promise;
        };

        this.TCMultipleSelectApprove = function (PINjson, userType, approvestatus) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,

            }
            var promise = DataAccessService.postData('api/PreExamination/TCMultipleSelectApprove', paramObj);
            return promise;
        };

        this.BonafideMultipleSelectApprove = function (PINjson, userType, approvestatus) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,

            }
            var promise = DataAccessService.postData('api/PreExamination/BonafideMultipleSelectApprove', paramObj);
            return promise;
        };

        this.StudyMultipleSelectApprove = function (PINjson, userType, approvestatus) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,

            }
            var promise = DataAccessService.postData('api/PreExamination/StudyMultipleSelectApprove', paramObj);
            return promise;
        };

        this.OdcSetApproveStatus = function (PINjson, userType, approvestatus) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus
            }
            var promise = DataAccessService.postData('api/PreExamination/OdcSetApproveStatus', paramObj);
            return promise;
        };

        this.OdcSetApproveStatusReject = function (PINjson, userType, approvestatus, remarks) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus, "Remarks": remarks
            }
            var promise = DataAccessService.postData('api/PreExamination/OdcSetApproveStatusReject', paramObj);
            return promise;
        };

        this.DMMSetApproveStatus = function (PINjson, userType, approvestatus) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus
            }
            var promise = DataAccessService.postData('api/PreExamination/DMMSetApproveStatus', paramObj);
            return promise;
        };

        this.TwoYearsCertificateSetApproveStatus = function (PINjson, userType, approvestatus, Scheme) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "Scheme": Scheme, "approvestatus": approvestatus
            }
            var promise = DataAccessService.postData('api/PreExamination/TwoYearsCertificateSetApproveStatus', paramObj);
            return promise;
        };




        this.DMMSetApproveStatusReject = function (PINjson, userType, approvestatus, remarks) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus, "Remarks": remarks
            }
            var promise = DataAccessService.postData('api/PreExamination/DMMSetApproveStatusReject', paramObj);
            return promise;
        };


        this.TwoYearsCertificateSetApproveStatusReject = function (PINjson, userType, approvestatus, Scheme, remarks) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus, "Scheme": Scheme, "Remarks": remarks
            }
            var promise = DataAccessService.postData('api/PreExamination/TwoYearsCertificateSetApproveStatusReject', paramObj);
            return promise;
        };


        this.GenuinenessSetApproveStatus = function (PINjson, userType, approvestatus) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus
            }
            ////console.log(paramObj)
            var promise = DataAccessService.postData('api/PreExamination/GenuinenessSetApproveStatus', paramObj);
            return promise;
        };

        this.GenuinenessSetApproveStatusReject = function (PINjson, userType, approvestatus, remarks) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,
                "Remarks": remarks
            }
            var promise = DataAccessService.postData('api/PreExamination/GenuinenessSetApproveStatusReject', paramObj);
            return promise;
        };

        this.TranscriptSetApproveStatus = function (Applicationjson, userType, approvestatus) {
            var paramObj = {
                "Applicationjson": Applicationjson, "userType": userType, "approvestatus": approvestatus
            }
            ////console.log(paramObj)
            var promise = DataAccessService.postData('api/PreExamination/TranscriptSetApproveStatus', paramObj);
            return promise;
        };


        this.TranscriptSetApproveStatusReject = function (Applicationjson, userType, approvestatus, remarks) {
            var paramObj = {
                "Applicationjson": Applicationjson, "userType": userType, "approvestatus": approvestatus,
                "Remarks": remarks
            }
            var promise = DataAccessService.postData('api/PreExamination/TranscriptSetApproveStatusReject', paramObj);
            return promise;
        };


        this.NameCorrectionSetApproveStatus = function (PINjson, userType, approvestatus) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,

            }

            var promise = DataAccessService.postData('api/PreExamination/NameCorrectionSetApproveStatus', paramObj);
            return promise;
        };
        this.NameCorrectionSetApproveStatusReject = function (PINjson, userType, approvestatus, remarks) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus, "Remarks": remarks

            }

            var promise = DataAccessService.postData('api/PreExamination/NameCorrectionSetApproveStatusReject', paramObj);
            return promise;
        };

        this.NameCorrectionSetApproveStatusforDsJs = function (PINjson, userType, approvestatus) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,

            }
            var promise = DataAccessService.postData('api/PreExamination/NameCorrectionSetApproveStatusforDsJs', paramObj);
            return promise;
        };


        this.MigrationSetApproveStatus = function (PINjson, userType, approvestatus) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,

            }
            var promise = DataAccessService.postData('api/PreExamination/MigrationSetApproveStatus', paramObj);
            return promise;
        };

        this.MigrationSetApproveStatusReject = function (PINjson, userType, approvestatus, remarks) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,
                "Remarks": remarks
            }
            var promise = DataAccessService.postData('api/PreExamination/MigrationSetApproveStatusReject', paramObj);
            return promise;
        };

        this.AttendanceApproveStatus = function (PINjson, UserId, approvestatus, remarks) {
            var paramObj = {
                "PINjson": PINjson, "UserId": UserId, "approvestatus": approvestatus, "Remarks": remarks

            }
            var promise = DataAccessService.postData('api/PreExamination/AttendanceApproveStatus', paramObj);
            return promise;
        };

        //this.AttendanceApproveStatusReject = function (PINjson, userType, approvestatus, remarks) {
        //    var paramObj = {
        //        "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,
        //        "Remarks": remarks
        //    }
        //    var promise = DataAccessService.postData('api/PreExamination/AttendanceApproveStatusReject', paramObj);
        //    return promise;
        //};


        this.TcSetApproveStatusReject = function (PINjson, userType, approvestatus, remarks) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,
                "Remarks": remarks
            }
            var promise = DataAccessService.postData('api/PreExamination/TcSetApproveStatusReject', paramObj);
            return promise;
        };

        this.BonafiedSetApproveStatusReject = function (PINjson, userType, approvestatus, remarks) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,
                "Remarks": remarks
            }
            var promise = DataAccessService.postData('api/PreExamination/BonafiedSetApproveStatusReject', paramObj);
            return promise;
        };

        this.StudySetApproveStatusReject = function (PINjson, userType, approvestatus, remarks) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,
                "Remarks": remarks
            }
            var promise = DataAccessService.postData('api/PreExamination/StudySetApproveStatusReject', paramObj);
            return promise;
        };

        this.InterimSetApproveStatus = function (PINjson, userType, approvestatus) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus
            }
            var promise = DataAccessService.postData('api/PreExamination/InterimSetApproveStatus', paramObj);
            return promise;
        };

        this.InterimSetApproveStatusReject = function (PINjson, userType, approvestatus, remarks) {
            var paramObj = {
                "PINjson": PINjson, "userType": userType, "approvestatus": approvestatus,
                "Remarks": remarks
            }
            var promise = DataAccessService.postData('api/PreExamination/InterimSetApproveStatusReject', paramObj);
            return promise;
        };

        this.sendsmscert = function (PIN, CertificateType) {
            var paramObj = {
                "Pin": PIN,
                "certificatetype": CertificateType
            }
            var promise = DataAccessService.getDataWithPara('api/StudentCertificate/SendSmsforApproveCertificate', paramObj);
            return promise;
        };

        this.sendsmsrejectcert = function (PIN, Remarks, CertificateType) {
            var paramObj = {
                "Pin": PIN,
                "Remarks": Remarks,
                "CertificateType": CertificateType
            }
            var promise = DataAccessService.getDataWithPara('api/StudentCertificate/SendSmsforRejectCertificate', paramObj);
            return promise;
        };

        this.sendsmsMigrationrejectcert = function (PIN, Remarks) {
            var paramObj = {
                "Pin": PIN,
                "Remarks": Remarks
            }
            var promise = DataAccessService.getDataWithPara('api/StudentCertificate/SendSmsforRejectMigrationCertificate', paramObj);
            return promise;
        };

        this.SignMultiplePdf = function (paramObject) {
            //var paramObject = {
            //    "Pin": Pin,
            //    "CertificateServiceId": CertificateType,
            //    "PdfLocation": PdfLocation,        //"http://dev.sbtet.hebeon.in/Reports/InterimCert/46033f88-a5e9-4282-aff2-af813eb7eb7f.pdf",
            //    "SerialNumber": SerialNumber,
            //    "ApplicationNo": "",
            //    "llx": 360,
            //    "lly": 100,
            //    "urx": 510,
            //    "ury": 150
            //};

            var promise = DataAccessService.postSignData('http://localhost:9000/sbtet/DigiSign/SignMultiplePdf', paramObject);
            return promise;
        };

        this.SetCertificateApproval = function (PINjson, ApproveStatus) {
            var paramObj = {
                "PINjson": PINjson, "ApproveStatus": ApproveStatus
            }
            var promise = DataAccessService.postData('api/PreExamination/SetCertificateApproval', paramObj);
            return promise;
        };

        this.getCertificateDetailsForApproval = function (Pin) {
            var paramObj = {
                "Pin": Pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getCertificateDetailsForApproval', paramObj);
            return promise;
        };

        this.getMigrationPendingDetails = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getMigrationPendingDetails', paramObj);
            return promise;
        };

        this.getTcDetailsByPin = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getTcDetailsByPin', paramObj);
            return promise;
        };
        this.getBonafiedDetailsByPin = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getBonafiedDetailsByPin', paramObj);
            return promise;
        };

        this.getStudyDetailsByPin = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getStudyDetailsByPin', paramObj);
            return promise;
        };

        this.getTcRequestedDetailsByPin = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getTcRequestedDetailsByPin', paramObj);
            return promise;
        };

        this.getBonafiedRequestedDetailsByPin = function (pin, Id) {
            var paramObj = {
                "pin": pin, "Id": Id
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getBonafiedRequestedDetailsByPin', paramObj);
            return promise;
        };

        this.getStudyRequestedDetailsByPin = function (pin, Id) {
            var paramObj = {
                "pin": pin, "Id": Id
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getStudyRequestedDetailsByPin', paramObj);
            return promise;
        };

        this.getNcDetailsByPin = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getNcDetailsByPin', paramObj);
            return promise;
        };

        this.getODCDetailsByPin = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getODCDetailsByPin', paramObj);
            return promise;
        };

        this.GetOdcDataByPin = function (pin) {
            var paramObj = {
                "pin": pin
            }
            var promise = DataAccessService.getDataWithPara('Admission/GetOdcDataByPin', paramObj);
            return promise;
        };

        this.CertificateFeePaymentChallanNumber = function (PIN, CertificateType) {
            var paramObj = {
                "PIN": PIN, "CertificateType": CertificateType
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/CertificateFeePaymentChallanNumber', paramObj);
            return promise;
        };

        this.MersidyFeePaymentChallanNumber = function (PIN, CertificateType) {
            var paramObj = {
                "PIN": PIN, "CertificateType": CertificateType
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/MersidyFeePaymentChallanNumber', paramObj);
            return promise;
        };


        this.getStudentApprovalList = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetStudentApprovalList');
        };

        this.GetCertificateFee = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/GetCertificateFee');
        };

        this.PostFeepaymentDates = function (StudentType, Semid, FromDate, ToDate, Fee, FineDate, LateFee, TatkalDate, TatkalFee, PremiumTatkalFee, CondonationFee, PresemptiveAttendedDays, maxWorkingDays, CertificateFee,
            SchemeId, ExamMonthYearId, CondonationP, DetentionP, IsPresemtiveCalculationRequired, IsTimetableRequired, IsOnlyC18) {

            var paramObject = {
                "StudentType": StudentType, "Semid": Semid, "FromDate": FromDate, "ToDate": ToDate, "Fee": Fee, "FineDate": FineDate,
                "LateFee": LateFee, "TatkalDate": TatkalDate, "TatkalFee": TatkalFee, "PremiumTatkalFee": PremiumTatkalFee, "CondonationFee": CondonationFee, "PresemptiveAttendedDays": PresemptiveAttendedDays,
                "MaxWorkingDays": maxWorkingDays, "CertificateFee": CertificateFee, "SchemeId": SchemeId, "ExamMonthYearId": ExamMonthYearId,
                //"CondonationP": CondonationP, "DetentionP": DetentionP,
                "IsPresemtiveCalculationRequired": IsPresemtiveCalculationRequired,
                "IsTimetableRequired": IsTimetableRequired
            };

            var promise = DataAccessService.postData('api/PreExamination/setStudentFeepayments', paramObject);
            return promise;
        };

        this.UpdateOdcDataByPin = function (SNO, UserName, NAME, SEX, FNAME, CEN, CEN_NAME, CEN_ADDRESS, PIN, COURSE, BR, MAX_MARKS_1YR, TOTAL1, TOTAL1_25, MAX_MARKS_3SEM, TOTAL3S, MAX_MARKS_4SEM, TOTAL4S,
            MAX_MARKS_5SEM, TOTAL5S, MAX_MARKS_6SEM, TOTAL6S, MAX_MARKS_7SEM, TOTAL7S, GRAND_TOTAL, PER, scheme, MAX_MARKS_1SEM, TOTAL1S, TOTAL1S_25, MAX_MARKS_2SEM, TOTAL2S, TOTAL2S_25, MONTH_YEAR) {
            var paramObject = {
                "SNO": SNO, "UserName": UserName, "NAME": NAME, "SEX": SEX, "FNAME": FNAME, "CEN": CEN, "CEN_NAME": CEN_NAME, "CEN_ADDRESS": CEN_ADDRESS, "PIN": PIN, "COURSE": COURSE, "BR": BR,
                "MAX_MARKS_1YR": MAX_MARKS_1YR, "TOTAL1": TOTAL1, "TOTAL1_25": TOTAL1_25, "MAX_MARKS_3SEM": MAX_MARKS_3SEM, "TOTAL3S": TOTAL3S,
                "MAX_MARKS_4SEM": MAX_MARKS_4SEM, "TOTAL4S": TOTAL4S, "MAX_MARKS_5SEM": MAX_MARKS_5SEM, "TOTAL5S": TOTAL5S, "MAX_MARKS_6SEM": MAX_MARKS_6SEM, "TOTAL6S": TOTAL6S,
                "MAX_MARKS_7SEM": MAX_MARKS_7SEM, "TOTAL7S": TOTAL7S, "GRAND_TOTAL": GRAND_TOTAL,
                "PER": PER, "scheme": scheme, "MAX_MARKS_1SEM": MAX_MARKS_1SEM, "TOTAL1S": TOTAL1S,
                "TOTAL1S_25": TOTAL1S_25, "MAX_MARKS_2SEM": MAX_MARKS_2SEM, "TOTAL2S": TOTAL2S, "TOTAL2S_25": TOTAL2S_25, "MONTH_YEAR": MONTH_YEAR
            };
            //console.log(paramObject)
            var promise = DataAccessService.postData('api/PreExamination/UpdateOdcDataByPin', paramObject);
            return promise;
        };

        this.getAdminExamCentersList = function (ExamMonthYearId, StudentTypeId, ExamTypeID) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeID": ExamTypeID
            };
            return DataAccessService.getDataWithPara('api/PreExamination/getAdminExamCentersList', paramObject);
        };


        this.AddOldStudentData = function (paramObject) {
            var promise = DataAccessService.postData('api/PreExamination/AddOldStudentData', paramObject);
            return promise;
        };

        this.AddMersyData = function (paramObject) {
            var promise = DataAccessService.postData('api/PreExamination/AddMersyData', paramObject);
            return promise;
        };



        this.UpdateOldStudentData = function (paramObject) {
            return DataAccessService.postData('api/PreExamination/UpdateOldStudentFileData', paramObject);
        };


        this.getDataByPin = function (StudentTypeId, pin) {
            var paramObject = {
                "StudentTypeId": StudentTypeId, "pin": pin
            };
            return DataAccessService.getDataWithPara('api/PreExamination/getUserDataByPinForPromotionalFee', paramObject);
        };

        this.GetPinDetails = function (pin) {
            var paramObject = { "pin": pin };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetUserDetails', paramObject);
            return promise;
        }

        
        this.GetExamMonthYearsByAcademicYearId = function (AcademicYearId) {
            var paramObject = { "AcademicYearId": AcademicYearId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetExamMonthYearsByAcademicYearId', paramObject);
            return promise;
        }

        this.GetTwoYearsPinDetails = function (pin) {
            var paramObject = { "pin": pin };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTwoYearsPinDetails', paramObject);
            return promise;
        }

        this.getUserDataByPin = function (pin) {
            var paramObject = {
                "pin": pin
            };
            return DataAccessService.getDataWithPara('Admission/GetStudentBackLogByPin', paramObject);
        };




        this.GetSchemes = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetSchemes');
        };

        this.GetAllSchemes = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetSchemes');
        };

        this.getExaminationCentersList = function (Examyearid, studentTypeId, ExamTypeID) {
            var paramObject = {
                "Examyearid": Examyearid,
                "studentTypeId": studentTypeId,
                "ExamTypeID": ExamTypeID
            };
            return DataAccessService.getDataWithPara('api/PreExamination/getExamCentersList', paramObject);
        };

        
        this.GatStatisticsReports = function (AcademicYearId,  Exammonthyearid,  DataType,  CollegeCode) {
            var paramObject = {
                "AcademicYearId": AcademicYearId,
                "Exammonthyearid": Exammonthyearid,
                "DataType": DataType,
                "CollegeCode": CollegeCode
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GatStatisticsReports', paramObject);
        };

        this.SemOmrCount = function (SchemeId) {
            var paramObject = {
                "SchemeId": SchemeId
            };
            return DataAccessService.getDataWithPara('api/PreExamination/SemOmrCount', paramObject);
        };


        this.getOmrBranchCount = function (Schemeid, SemId) {
            var paramObject = {
                "Schemeid": Schemeid, "SemId": SemId
            };
            return DataAccessService.getDataWithPara('api/PreExamination/getOmrBranchCount', paramObject);
        };

        this.GenerateC18MemosData = function (ExamMonthYearId, MinCredits, Day, Month, Year) {
            var paramObject = {
                "ExamMonthYearId": ExamMonthYearId, "MinCredits": MinCredits, "Day": Day, "Month": Month, "Year": Year
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GenerateC18MemosData', paramObject);
        };


        this.getExaminationMonthYear = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/getExaminationMonthYear');
        };


        this.getChallanData = function (StudentTypeId, pin) {

            var paramObject = {
                "StudentTypeId": StudentTypeId, "pin": pin
            };
            return DataAccessService.getDataWithPara('api/PreExamination/getChallanData', paramObject);
        };

        this.getExamYearMonth = function () {
            return DataAccessService.getDataWithPara('api/PreExamination/getExamYearMonth');
        }

        //this.getAdminExamCentersList = function (StudentTypeId, SchemeId, AcademicYearId, ExamYearMonth) {
        //    var paramObject = {
        //        "StudentTypeId": StudentTypeId, "SchemeId": SchemeId, "AcademicYearId": AcademicYearId, "ExamYearMonth": ExamYearMonth
        //    };
        //    return DataAccessService.getDataWithPara('api/PreExamination/getAdminExamCentersList', paramObject);
        //};

        //this.getExaminationCentersList = function (StudentTypeId, SchemeId, AcademicYearId, ExamYearMonth) {
        //    var paramObject = {
        //        "StudentTypeId": StudentTypeId, "SchemeId": SchemeId, "AcademicYearId": AcademicYearId, "ExamYearMonth": ExamYearMonth
        //    };
        //    return DataAccessService.getDataWithPara('api/PreExamination/getExamCentersList', paramObject);
        //};
        this.setExamCenters = function (paramObj) {
            return DataAccessService.postData('api/PreExamination/SetExaminationCenters', paramObj);
        };



        this.getPayExamFee = function (UserId, StudentTypeId, Semid, ExamMonthYearId) {
            var paramObject = {
                "UserId": UserId, "StudentTypeId": StudentTypeId, "Semid": Semid, "ExamMonthYearId": ExamMonthYearId
            };
            ////console.log(paramObject)
            return DataAccessService.postData('api/PreExamination/getPayExamFee', paramObject);
        }


        this.UpdateMigrationData = function (AcademicYearId, CummulativeCredits, id) {
            var paramObject = {
                "AcademicYearId": AcademicYearId, "CummulativeCredits": CummulativeCredits, "id": id
            };
            return DataAccessService.postData('api/PreExamination/UpdateMigrationData', paramObject);
        }

        this.GetS2SPaymentReports = function (dataTypeId, studentTypeId, startDate, endDate) {
            const params = { "DataTypeId": dataTypeId, "EndDate": endDate, "StartDate": startDate, "StudentTypeId": studentTypeId };
            ////console.log(params);
            return DataAccessService.getDataWithPara('PreExaminationReport/GetS2SPaymentReports', params);
        }

        this.getApproveExamFees = function (UserId, StudentTypeId, ExamMonthYearId, Semester) {
            var paramObject = {
                "UserId": UserId, "StudentTypeId": StudentTypeId, "ExamMonthYearId": ExamMonthYearId, "Semester": Semester
            };
            ////console.log(paramObject)

            return DataAccessService.getDataWithPara('api/PreExamination/getApproveExamFees', paramObject);
        }





        this.getApproveExamFeeCondonation = function (UserId, StudentTypeId) {
            var paramObject = {
                "UserId": UserId, "StudentTypeId": StudentTypeId
            };
            return DataAccessService.postData('api/PreExamination/getApproveExamFeeCondonation', paramObject);
        }
        this.setApprovalSingleList = function (PaymentStudent, UserTypeId) {
            var paramObject = {
                "Json": PaymentStudent, "UserTypeId": UserTypeId
            };
            return DataAccessService.postData('api/PreExamination/setApprovalSingleList', paramObject);
        }

        this.getApprovalList = function (type, StudentTypeId, CollegeCode, BranchCode, ExamMonthYearId, Semester) {
            var paramObject = {
                "type": type, "StudentTypeId": StudentTypeId,
                "collegeCode": CollegeCode, "branchcode": BranchCode, "ExamMonthYearId": ExamMonthYearId, "semester": Semester
            };
            ////console.log(paramObject)
            return DataAccessService.postData('api/PreExamination/GetApprovalList', paramObject);
        }


        this.getAttendanceReport = function (Pin) {
            var paramObject = {
                "Pin": Pin
            };
            return DataAccessService.getDataWithPara('api/PreExamination/getAttendanceReport', paramObject);
        };
        this.getApprovalSingleList = function (UserTypeId, CollegeCode, BranchCode, Semester, StudentTypeId) {
            var paramObject = {
                "StudentTypeId": StudentTypeId,
                "collegeCode": CollegeCode, "branchcode": BranchCode, "semester": Semester, "UserTypeId": UserTypeId
            };
            return DataAccessService.postData('api/PreExamination/getApprovalSingleList', paramObject);
        }

        this.getCondonationApprovalList = function (StudentTypeId, CollegeCode, BranchCode, Semester) {
            var paramObject = {
                "StudentTypeId": StudentTypeId, "collegeCode": CollegeCode, "branchcode": BranchCode, "semester": Semester
            };
            return DataAccessService.postData('api/PreExamination/GetCondonationApprovalList', paramObject);
        }

        this.GetStudentFeePaymentDetails = function (Pin, StudentTypeId, EMYR) {
            var paramObject = { "Pin": Pin, "StudentTypeId": StudentTypeId, "EMYR": EMYR };
            return DataAccessService.getDataWithPara('api/PreExamination/GetStudentFeePaymentDetails', paramObject);
        }

        this.GetStudentFeePaymentDetailsforAdmin = function (Pin, StudentTypeId, UserTypeId) {
            var paramObject = { "Pin": Pin, "StudentTypeId": StudentTypeId, "UserTypeId": UserTypeId };
            return DataAccessService.getDataWithPara('api/PreExamination/GetStudentFeePaymentDetailsforAdmin', paramObject);
        }

        this.getChanllanForExamFee = function (json, ExamMonthYearId) {
            var paramObject = { "json": json, "ExamMonthYearId": ExamMonthYearId == null ? 0 : ExamMonthYearId };
            return DataAccessService.postData('api/PreExamination/getChanllanForExamFee', paramObject);
        }


        this.OdcSetVerifyStatus = function (Pin, userType) {
            var paramObject = { "Pin": Pin, "userType": userType };
            ////console.log(paramObject)
            var promise = DataAccessService.getDataWithPara('api/PreExamination/Odc_SetVerifyStatus', paramObject);
            return promise;
        }

        this.Odc_Set_UpdateAffidavit = function (Pin, userType, MegistrateAffidavit) {
            var paramObject = { "Pin": Pin, "userType": userType, "MegistrateAffidavit": MegistrateAffidavit };

            var promise = DataAccessService.postData('api/PreExamination/Odc_Set_UpdateAffidavit', paramObject);
            return promise;
        }


        this.Odc_SetPrinted = function (Pin, userType) {
            var paramObject = { "Pin": Pin, "userType": userType };
            //console.log(paramObject)
            var promise = DataAccessService.getDataWithPara('api/PreExamination/Odc_SetPrinted', paramObject);
            return promise;
        }

        this.Genuineness_SetVerifyStatus = function (Id, Pin, userType, Status) {
            var paramObject = { "Id": Id, "Pin": Pin, "userType": userType, Status };
            //console.log(paramObject)
            var promise = DataAccessService.getDataWithPara('api/PreExamination/Genuineness_SetVerifyStatus', paramObject);
            return promise;
        }

        this.Genuineness_SetVerifyStatusRemarks = function (Id, Pin, userType, Status, Remarks) {
            var paramObject = { "Id": Id, "Pin": Pin, "userType": userType, "Status": Status, "Remarks": Remarks };
            //console.log(paramObject)
            var promise = DataAccessService.getDataWithPara('api/PreExamination/Genuineness_SetVerifyStatusRemarks', paramObject);
            return promise;
        }

        this.DMM_SetVerifyStatus = function (Pin, userType, Semester, ExamMonthYear) {
            var paramObject = { "Pin": Pin, "userType": userType, "Semester": Semester, "ExamMonthYear": ExamMonthYear };
            //console.log(paramObject)
            var promise = DataAccessService.getDataWithPara('api/PreExamination/DMM_SetVerifyStatus', paramObject);
            return promise;
        }

        this.UpdateMarksMemo = function (pin, json) {
            var paramObject = { "pin": pin, "json": json };
            //console.log(paramObject)
            var promise = DataAccessService.postData('api/PreExamination/UpdateMarksMemo', paramObject);
            return promise;
        }

        this.UpdatePaymentMarksMemo = function (pin, json) {
            var paramObject = { "pin": pin, "json": json };
            var promise = DataAccessService.postData('api/PreExamination/UpdatePaymentMarksMemo', paramObject);
            return promise;
        }

        this.UpdateNoDataMarksMemo = function (pin, Name, FatherName, Branch, CollegeCode, Scheme, Gender, json) {
            var paramObject = { "pin": pin, "Name": Name, "FatherName": FatherName, "Branch": Branch, "CollegeCode": CollegeCode, "Scheme": Scheme, "Gender": Gender, "json": json };

            var promise = DataAccessService.postData('api/PreExamination/UpdateNoDataMarksMemo', paramObject);
            return promise;
        }
        this.getNoDataSchemes = function () {
            return DataAccessService.getDataAll('api/PreExamination/getNoDataSchemes');
        },
            this.getStudentType = function () {
                return DataAccessService.getDataAll('api/PreExamination/getStudentType');
            },

            this.getActiveSemester = function () {
                return DataAccessService.getDataAll('api/PreExamination/getActiveSemester');
            },

            this.getAllSemester = function () {
                return DataAccessService.getDataAll('api/PreExamination/getAllSemester');
            },

            this.getSemestersByScheme = function (StudentTypeId, SchemeId) {
                var paramObject = { "SchemeId": SchemeId, "StudentTypeId": StudentTypeId };
                return DataAccessService.getDataWithPara('api/PreExamination/getSemestersByScheme', paramObject);
            },


            this.RequestLog = function (marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, challan, amount, schemeId, json) {
                var paramObject = { "marchantid": marchantid, "subMarchantid": subMarchantid, "addInfo1": addInfo1, "addInfo3": addInfo3, "addInfo4": addInfo4, "addInfo5": addInfo5, "addInfo6": addInfo6, "addInfo7": addInfo7, "challan": challan, "amount": amount, "schemeId": schemeId, "json": json };

                return DataAccessService.postData('api/PreExamination/RequestLog', paramObject);
            },

            this.getPaymentStatus = function (challanNumber) {
                var paramObject = { "MarchantID": 'TSSBTET', "CustomerRefNO": challanNumber };
                return DataAccessService.postData('api/BillDesk/getPaymentQueryStatus', paramObject);
            },

            this.getS2SPaymentStatus = function (UserTypeId, challanNumber, StudentTypeId) {
                var paramObject = { "UserTypeId": UserTypeId, "MarchantID": 'TSSBTET', "CustomerRefNO": challanNumber, "StudentTypeId": StudentTypeId };
                return DataAccessService.postData('api/BillDesk/getPaymentS2SQueryStatus', paramObject);
            },

            this.getHallticket = function (Pin, DateOfBirth, StudentTypeId, EMYR) {
                if (StudentTypeId == 1) {
                    var paramObject = { "Pin": Pin, "DateOfBirth": DateOfBirth, "StudentTypeId": StudentTypeId, "EMYR": EMYR };
                    var promise = DataAccessService.getDataWithPara('api/PreExamination/GetRegularHallticket', paramObject);
                    return promise;
                } else if (StudentTypeId == 2) {
                    var paramObject = { "Pin": Pin, "DateOfBirth": DateOfBirth, "StudentTypeId": StudentTypeId, "Exammonthyearid": EMYR };
                    var promise = DataAccessService.getDataWithPara('api/PreExamination/GetBacklogHallticket', paramObject);
                    return promise;
                }
            },

            this.getHallticket1 = function (Pin, DateOfBirth, StudentTypeId, EMYR) {
                if (StudentTypeId == 1) {
                    var paramObject = { "Pin": Pin, "DateOfBirth": DateOfBirth, "StudentTypeId": StudentTypeId, "EMYR": EMYR };
                    var promise = DataAccessService.getDataWithPara('api/PreExamination/GetRegularHallticket1', paramObject);
                    return promise;
                } else if (StudentTypeId == 2) {
                    var paramObject = { "Pin": Pin, "DateOfBirth": DateOfBirth, "StudentTypeId": StudentTypeId, "Exammonthyearid": EMYR };
                    console.log(paramObject)
                    var promise = DataAccessService.getDataWithPara('api/PreExamination/GetBacklogHallticket1', paramObject);
                    return promise;
                }
            },

            this.getAdminCollegePreExamReports = function (UserId, CollegeCode, ExamMonthYearId, Semester, StudentTypeId) {
                var paramObj = { "UserId": UserId, "CollegeCode": CollegeCode, "ExamMonthYearId": ExamMonthYearId, "Semester": Semester, "StudentTypeId": StudentTypeId };
                console.log(paramObj)
                var promise = DataAccessService.getDataWithPara('api/PreExamination/getAdminCollegePreExamReports', paramObj);
                return promise;
            }
        this.GetFeePaymentReports = function (studentTypeId, startDate, endDate, examType) {
            var paramObj = { "StudentTypeId": studentTypeId, "StartDate": startDate, "EndDate": endDate, "examType": examType };
            var promise = DataAccessService.getDataWithPara('PreExaminationReport/GetFeePaymentReports', paramObj);
            return promise;
        }
        this.GetAdminPreExamReports = function (ExamMonthYearId, Semester, StudentTypeId) {
            var paramObj = { "ExamMonthYearId": ExamMonthYearId, "Semester": Semester, "StudentTypeId": StudentTypeId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetAdminPreExamReports', paramObj);
            return promise;
        },
            this.GetAdminFeedBackReports = function (ExamMonthYearId, Semester, StudentTypeId) {
                var paramObj = { "ExamMonthYearId": ExamMonthYearId, "Semester": Semester, "StudentTypeId": StudentTypeId };
                var promise = DataAccessService.getDataWithPara('api/PreExamination/GetAdminFeedBackReports', paramObj);
                return promise;
            },

            this.GetAdminHallTicketReports = function (ExamMonthYearId, Semester, StudentTypeId) {
                var paramObj = { "ExamMonthYearId": ExamMonthYearId, "Semester": Semester, "StudentTypeId": StudentTypeId };
                var promise = DataAccessService.getDataWithPara('api/PreExamination/GetAdminHallTicketReports', paramObj);
                return promise;
            },

            //this.getAdminCollegePreExamReports = function (UserId, CollegeCode) {
            //    var paramObj = { "UserId": UserId, "CollegeCode": CollegeCode };
            //    var promise = DataAccessService.getDataWithPara('api/PreExamination/getAdminCollegePreExamReports', paramObj);
            //    return promise;
            //},
            this.GetTransaction = function (StudentType, fromDate, toDate) {
                var paramObj = { "StudentType": StudentType, "fromDate": fromDate, "toDate": toDate };
                var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTransaction', paramObj);
                return promise;
            },
            this.GetSubBillerReport = function (SubBillerId, fromDate, toDate) {
                var paramObj = { "SubBillerId": SubBillerId, "StartDate": fromDate, "EndDate": toDate };
                var promise = DataAccessService.postData('PreExaminationReport/GetSubBillerReport', paramObj);
                return promise;
            },

            this.GetDayWiseSubBillerCountExcel = function (Date) {
                var paramObj = { "Date": Date };
                var promise = DataAccessService.postData('PreExaminationReport/GetDayWiseSubBillerCountExcel', paramObj);
                return promise;
            },

            this.GetDayWiseSubBillerReport = function (DataType, subbillerid, Date) {
                var paramObj = {
                    "DataType": DataType,
                    "subbillerid": subbillerid,
                    "Date": Date
                };
                var promise = DataAccessService.postData('PreExaminationReport/GetDayWiseSubBillerReport', paramObj);
                return promise;
            },
            this.GetFeePaymentReports = function (studentTypeId, startDate, endDate, examType) {
                var paramObj = { "StudentTypeId": studentTypeId, "StartDate": startDate, "EndDate": endDate, "examType": examType };
                var promise = DataAccessService.postData('PreExaminationReport/GetFeePaymentReports', paramObj);
                return promise;
            },
            //this.GetTransaction = function (StudentType, fromDate, toDate) {
            //    var paramObj = { "StudentType": StudentType, "fromDate": fromDate, "toDate": toDate };
            //    var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTransaction', paramObj);
            //},
            this.UpdateStudentsContact = function (pin, num) {
                var paramObj = { "Pin": pin, "StudentContact": num };
                var promise = DataAccessService.getDataWithPara('api/PreExamination/UpdateStudentContact', paramObj);

                return promise;
            },

            this.getExamsMonthYear = function (StudentTypeId, SemId, SchemeId) {
                var paramObj = { "StudentTypeId": StudentTypeId, "SemId": SemId, "SchemeId": SchemeId };
                var promise = DataAccessService.getDataWithPara('api/PreExamination/GetExamsMonthYear', paramObj);

                return promise;
            },

            this.NrReports = function (ExamMonthYearId, StudentTypeId, CollegeCode, ExamDate, ExamType) {
                var paramObj = { "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "CollegeCode": CollegeCode, "ExamDate": ExamDate, "ExamTypeId": ExamType };
                var promise = DataAccessService.getDataWithPara('PreExaminationReport/NrReports', paramObj);
                return promise;
            },

            this.NrExcelReports = function (StudentTypeId, CollegeCode, ExamTypeId, ExamMonthYearId) {
                var paramObj = {

                    "StudentTypeId": StudentTypeId, "CollegeCode": CollegeCode, "ExamTypeId": ExamTypeId, "ExamMonthYearId": ExamMonthYearId
                };
                var promise = DataAccessService.getDataWithPara('PreExaminationReport/NrExcelReports', paramObj);

                return promise;
            },

            this.PrinterNrDownload = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, semid) {
                var paramObj = {
                    "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId, "semid": semid
                };
                var promise = DataAccessService.getDataWithPara('PreExaminationReport/PrinterNrDownload', paramObj);
                return promise;
            },

            this.PrinterNrDownloadExcelReport = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, semid) {
                var paramObj = {
                    "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId,
                    "semid": semid
                };
                var promise = DataAccessService.getDataWithPara('PreExaminationReport/PrinterNrDownloadExcelReport', paramObj);
                return promise;
            },

            this.PrinterNrAttendanceExcelReport = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId, semid) {
                var paramObj = {
                    "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId,
                    "semid": semid
                };
                var promise = DataAccessService.getDataWithPara('PreExaminationReport/PrinterNrAttendanceExcelReport', paramObj);
                return promise;
            },


            this.PrinterNrCollegeVsBranchReport = function (AcademicYearId, ExamMonthYearId, StudentTypeId, ExamTypeId) {
                var paramObj = { "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "ExamTypeId": ExamTypeId };
                var promise = DataAccessService.getDataWithPara('PreExaminationReport/PrinterNrCollegeVsBranchReport', paramObj);
                return promise;
            },

            this.FeeNotPaidExcelReport = function () {
                return DataAccessService.getDataAll('PreExaminationReport/FeeNotPaidExcelReport');
            },

            this.GetNBAReports1Excel = function () {
                return DataAccessService.getDataAll('api/PreExamination/GetNBAReports1Excel');
            },

            this.GetNBAReports2Excel = function () {
                return DataAccessService.getDataAll('api/PreExamination/GetNBAReports2Excel');
            },
            this.GetNBAReports31Excel = function () {
                return DataAccessService.getDataAll('api/PreExamination/GetNBAReports31Excel');
            },
            this.GetNBAReports32Excel = function () {
                return DataAccessService.getDataAll('api/PreExamination/GetNBAReports32Excel');
            },
            this.GetNBAReports4Excel = function () {
                return DataAccessService.getDataAll('api/PreExamination/GetNBAReports4Excel');
            },


            this.GetOdcReasons = function () {
                return DataAccessService.getDataAll('api/PreExamination/GetOdcReasons');
            },

            this.CurrentExamDates = function () {
                var promise = DataAccessService.getDataWithPara('api/PreExamination/CurrentExamDates');
                return promise;
            },

            this.CurrentExamDatesForNr = function (selectedEmy, studentTypeId, examTypeId) {
                var paramObj = {
                    "ExamMonthYearId": selectedEmy, "StudentTypeId": studentTypeId, "ExamTypeId": examTypeId
                };
                var promise = DataAccessService.getDataWithPara('PreExaminationReport/GetCurrentExamDatesForNr', paramObj);
                return promise;
            },
            this.GetSeatingData = function (selectedEmy, studentTypeId, collegeCode, examDate, timeSlot, seatingPerBench, examTypeId, examHallString) {
                var paramObj = {
                    "ExamMonthYearId": selectedEmy, "StudentTypeId": studentTypeId, "ExamTypeId": examTypeId,
                    "ExamDate": examDate, "TimeSlot": timeSlot, "CollegeCode": collegeCode, "SeatingPerBench": seatingPerBench,
                    "ExamHallString": examHallString
                };
                var promise = DataAccessService.postData('api/PreExamination/GetSeatingData', paramObj);
                return promise;
            },
            this.getDetailsByPin = function (pin) {
                var paramObj = { "pin": pin };
                var promise = DataAccessService.getDataWithPara('api/PreExamination/getDetailsByPins', paramObj);
                return promise;
            },

            this.getTranscriptDetailsByPin = function (pin) {
                var paramObj = { "pin": pin };
                var promise = DataAccessService.getDataWithPara('api/PreExamination/getTranscriptDetailsByPin', paramObj);
                return promise;
            },

            this.getMigrationDetailsByPin = function (pin) {
                var paramObj = { "pin": pin };
                var promise = DataAccessService.getDataWithPara('api/PreExamination/getMigrationDetailsByPin', paramObj);
                return promise;
            },


            this.getBackLogData = function (Pin, StudentType) {
                var paramObj = { "Pin": Pin, "StudentType": StudentType };
                var promise = DataAccessService.postData('api/PreExamination/getBackLogData', paramObj);
                return promise;
            },

            this.SetSemTransfer = function (AcademicYearId, SemId) {
                var paramObj = { "AcademicYearId": AcademicYearId, "SemId": SemId };
                var promise = DataAccessService.getDataWithPara('api/PreExamination/SetSemTransfer', paramObj);
                return promise;
            },

            this.setBackLogData = function (Pin, StudentType, Profilephoto) {
                var paramObj = { "Pin": Pin, "StudentType": StudentType, "Profilephoto": Profilephoto };
                var promise = DataAccessService.postData('api/PreExamination/setBackLogData', paramObj);
                return promise;
            },
            this.uploadExcel = function (ExcelData) {
                var promise = DataAccessService.uploadFileToUrl('PreExaminationReport/GetFromExalReports', ExcelData);

                return promise;
            }
        this.uploadJsonData = function (Json, type) {
            var paramObj = { "Json": Json, "type": type };
            var promise = DataAccessService.postData('api/PreExamination/uploadJsonData', paramObj);
            return promise;
        }

        this.uploadJson = function (json, type) {
            var paramObj = { "json": json }
            //console.log(paramObj)
            var promise = DataAccessService.postData('api/PreExamination/uploadJson', paramObj);
            return promise;
        }

        this.UploadResultJson = function (json, type) {
            var paramObj = { "json": json }
            var promise = DataAccessService.postData('api/PreExamination/UploadResultJson', paramObj);
            return promise;
        }

        this.UploadResultFileJson = function (ExamMonthYearId, StudentTypeId, Scheme, ExamTypeId, Json, UserName) {
            var paramObj = { "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme, "ExamTypeId": ExamTypeId, "Json": Json, "UserName": UserName }
            var promise = DataAccessService.postData('api/PreExamination/UploadResultFileJson', paramObj);
            return promise;
        }

        this.UploadRVRCFileJson = function (ExamMonthYearId, StudentTypeId, Scheme, UserName, Json) {
            var paramObj = { "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme, "UserName": UserName, "Json": Json }
            var promise = DataAccessService.postData('api/PreExamination/UploadRVRCFileJson', paramObj);
            return promise;
        }


        this.UploadWantingsJson = function (ExamMonthYearId, StudentTypeId, Scheme, ExamTypeId, DataTypeId, UserName, Json) {
            var paramObj = { "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme, "ExamTypeId": ExamTypeId, "DataTypeId": DataTypeId, "UserName": UserName, "Json": Json }
            ////console.log(paramObj)
            var promise = DataAccessService.postData('api/PreExamination/UploadWantingsJson', paramObj);
            return promise;
        }

        this.DeployNicData = function (AcademicYearId, AdmissionType) {
            var paramObj = { "AcademicYearId": AcademicYearId, "AdmissionType": AdmissionType }
            ////console.log(paramObj)
            var promise = DataAccessService.postData('api/PreExamination/DeployNicData', paramObj);
            return promise;
        }

        this.uploadJsonExcel = function (AcademicYearId, AdmissionType, json) {
            var paramObj = { "AcademicYearId": AcademicYearId, "AdmissionType": AdmissionType, "json": json }
            ////console.log(paramObj)
            var promise = DataAccessService.postData('api/PreExamination/uploadJsonExcel', paramObj);
            return promise;
        }

        this.UploadPolycetData = function (PolycetYear, Data) {
            var paramObj = {
                "PolycetYear": PolycetYear,
                "Data": Data
            }
            ////console.log(paramObj)
            var promise = DataAccessService.postData('api/PreExamination/UploadPolycetData', paramObj);
            return promise;
        }
        //uploadJsonData

        this.setSyllabusCoverage = function (paramObj) {
            return DataAccessService.postData('api/PreExamination/setSyllabusCoverage', paramObj);
        }

        this.GetFacultyData = function (Pin, FeedbackId, Otp) {
            var paramObject = {
                "Pin": Pin, "FeedbackId": FeedbackId, "Otp": Otp
            }
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getFacultyData', paramObject);
            return promise;
        }

        this.SetFeedbackData = function (PIN, Collegecode, BranchId, ScheameID, SemId, Json) {

            var paramObject = { "PIN": PIN, "Collegecode": Collegecode, "BranchId": BranchId, "ScheameID": ScheameID, "SemId": SemId, "json": Json };

            var promise = DataAccessService.postData('api/PreExamination/SetFeedbackData', paramObject);
            return promise;
        }


        this.GetDescription = function (FeedbackId) {
            var paramObject = { "FeedbackId": FeedbackId };
            return DataAccessService.getDataWithPara('api/PreExamination/GetDescriptionData', paramObject);
        };
        this.GetAvailableFeedbacks = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetAvailableFeedbacks');
        };
        this.GenerateOtpForFeedback = function (Pin, FeedbackId) {
            var paramObject = {
                "Pin": Pin, "FeedbackId": FeedbackId
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GenerateOtpForFeedback', paramObject);
        };

        this.UpdateSubjectMasterDetails = function (SubId, Subject_Code, SubjectName, iselective, BoardQuestionPaper, AnswerBookLet, Mid1Max_Marks, Mid2Max_Marks, Mid3Max_Marks, InternalMax_Marks, end_exam_max_marks, Credits, PCode) {
            var paramObject = {
                "SubId": SubId, "Subject_Code": Subject_Code, "SubjectName": SubjectName, "iselective": iselective,
                "BoardQuestionPaper": BoardQuestionPaper, "AnswerBookLet": AnswerBookLet, "Mid1Max_Marks": Mid1Max_Marks, "Mid2Max_Marks": Mid2Max_Marks,
                "Mid3Max_Marks": Mid3Max_Marks, "InternalMax_Marks": InternalMax_Marks, "end_exam_max_marks": end_exam_max_marks, "Credits": Credits, "PCode": PCode
            };
            return DataAccessService.getDataWithPara('api/PreExamination/UpdateSubjectMasterDetails', paramObject);
        };

        this.GetSubjectMasterDetails = function (scheme, SubjectCode) {
            var paramObject = {
                "scheme": scheme, "SubjectCode": SubjectCode
            };
            return DataAccessService.getDataWithPara('api/PreExamination/GetSubjectMasterDetails', paramObject);
        };

        this.GetMercyList = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetMercyList');
        };

        this.GetSubBillerDayWiseCount = function (Date) {
            var paramObj = {
                "Date": Date
            };
            var promise = DataAccessService.getDataWithPara('PreExaminationReport/GetSubBillerDayWiseCount', paramObj);
            return promise;

        };



        this.AddFeeSettings = function (DataTypeId, ID, Name, Is_Active, Price, ServiceType, ChallanPrefix, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "ID": ID,
                "Name": Name,
                "Is_Active": Is_Active,
                "Price": Price,
                "ServiceType": ServiceType,
                "ChallanPrefix": ChallanPrefix,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PreExamination/AddorUpdateFeeSettings', paramObject);
            return promise;
        };


        this.UpdateFeeSettings = function (DataTypeId, ID, Name, Is_Active, Price, ServiceType, ChallanPrefix, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "ID": ID,
                "Name": Name,
                "Is_Active": Is_Active,
                "Price": Price,
                "ServiceType": ServiceType,
                "ChallanPrefix": ChallanPrefix,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PreExamination/AddorUpdateFeeSettings', paramObject);
            return promise;
        };

        this.GetFeeSettingsData = function (DataTypeID, ID) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "ID": ID
            };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetorEditFeeSettingsData', paramObj);
            return promise;

        };



        //this.AddFeeSettings = function (DataTypeId, ID, Name, Is_Active, Price, ServiceType, ChallanPrefix, UserName) {
        //    var paramObj = {

        //        "DataTypeId": DataTypeId,
        //        "ID": ID,
        //        "Name": Name,
        //        "Is_Active": Is_Active,
        //        "Price": Price,
        //        "ServiceType": ServiceType,
        //        "ChallanPrefix": ChallanPrefix,
        //        "UserName": UserName


        //    };
        //    var promise = DataAccessService.postData('api/PreExamination/AddorUpdateFeeSettings', paramObj);
        //    return promise;
        //};





    });
});