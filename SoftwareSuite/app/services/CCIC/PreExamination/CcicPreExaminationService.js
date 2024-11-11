define(['app'], function (app) {
    app.service("CcicPreExaminationService", function (DataAccessService) {

        this.GetBatches = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetBatches');
        };

        this.GetStudentType = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetStudentType');
        };

        //this.GetFeePaymentType = function () {
        //    return DataAccessService.getDataWithPara('api/CcicPreExamination/GetFeePaymentType');
        //};

        this.GetCourseDurations = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetCourseDurations');
        };

        this.getRegularExamCourseDurations = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetRegularExamCourseDurations');
        };

        this.GetCcicAcademicYears = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicAcademicYears');
        };

        this.GetAffiliatedCourses = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetAffiliatedCourses');
        };

        this.GetCcicSubjectTypes = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicSubjectTypes');
        };



        this.GetExaminationCenters = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetExaminationCenters');
        };


        this.GetAffiliatedInstitutions = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetAffiliatedInstitutions');
        };

        this.GetApplicationNumber = function () {
            return DataAccessService.postData('api/CcicPreExamination/GetApplicationNumber');
        };


        this.GetDistricts = function () {
            return DataAccessService.postData('api/CcicPreExamination/GetDistricts');
        };


        this.GetAffiliatedInstitutions = function (AcademicYearID, ExamMonthYearID, CourseID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "CourseID": CourseID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAffiliatedInstitutions', paramObj);
            return promise;
        };
        this.GetFeePaymentType = function (InstitutionID) {
            var paramObj = {
                "InstitutionID": InstitutionID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetFeePaymentType', paramObj);
            return promise;
        };

        this.GetCcicAcademicYearCurrentBatch = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicAcademicYearCurrentBatch', paramObj);
            return promise;
        };

        this.GetCcicSubjectMaster = function (DataType, CourseID, SubjectID) {
            var paramObj = {
                "DataType": DataType,
                "CourseID": CourseID,
                "SubjectID": SubjectID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetorEditCcicSubjectMaster', paramObj);
            return promise;
        };

        this.EditCcicSubjectMaster = function (DataType, CourseID, SubjectID) {
            var paramObj = {
                "DataType": DataType,
                "CourseID": CourseID,
                "SubjectID": SubjectID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetorEditCcicSubjectMaster', paramObj);
            return promise;
        };


        this.GetExaminationCentres = function (DataType, ExaminationCentreID) {
            var paramObj = {
                "DataType": DataType,
                "ExaminationCentreID": ExaminationCentreID,
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetorEditExaminationCentres', paramObj);
            return promise;
        };

        this.EditExaminationCentres = function (DataType, ExaminationCentreID) {
            var paramObj = {
                "DataType": DataType,
                "ExaminationCentreID": ExaminationCentreID,
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetorEditExaminationCentres', paramObj);
            return promise;
        };

        this.EditCcicExaminationCentres = function (DataType, ExaminationCentreID) {
            var paramObj = {
                "DataType": DataType,
                "ExaminationCentreID": ExaminationCentreID,
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetorEditCcicExaminationCentres', paramObj);
            return promise;
        };

        this.AddExaminationCentres = function (paramObject) {

            return DataAccessService.postData('api/CcicPreExamination/AddorUpdateorInActiveExaminationCentres', paramObject);
        };

        this.UpdateExaminationCentres = function (paramObject) {

            return DataAccessService.postData('api/CcicPreExamination/AddorUpdateorInActiveExaminationCentres', paramObject);
        };


        this.GetCcicAcademicYearBatches = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicAcademicYearBatches', paramObj);
            return promise;
        };
        this.GetCurrentBatch = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCurrentBatch', paramObj);
            return promise;
        };

        this.AddExamMonthYear = function (paramObject) {

            return DataAccessService.postData('api/CcicPreExamination/AddExamMonthYear', paramObject);
        };

        this.AddCcicSubjectMaster = function (paramObject) {

            return DataAccessService.postData('api/CcicPreExamination/AddorUpdateorDeleteCcicSubjectMaster', paramObject);
        };

        this.UpdateorActiveCcicSubjectMaster = function (paramObject) {

            return DataAccessService.postData('api/CcicPreExamination/AddorUpdateorDeleteCcicSubjectMaster', paramObject);
        };


        this.GetAYBatchExamMonthYear = function (AcademicYearID, Batch) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "Batch": Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAYBatchExamMonthYear', paramObj);
            return promise;
        };


        this.GetHolidaysForTimeTable = function (StartDate, NofDates) {
            var paramObj = {
                "StartDate": StartDate, "NofDates": NofDates
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetHolidaysForTimeTable', paramObj);
            return promise;
        };

        this.GenerateTimeTable = function (HolidaysJson, AcademicYearId, ExamMonthYearId, TimeSlotJson, StartDate, UserName) {
            var paramObj = {
                "HolidaysJson": HolidaysJson,
                "AcademicYearId": AcademicYearId,
                "ExamMonthYearId": ExamMonthYearId,
                "TimeSlotJson": TimeSlotJson,
                "StartDate": StartDate,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GenerateTimeTable', paramObj);
            return promise;
        };

        this.VerifyTimeTableGeneration = function (AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/VerifyTimeTableGeneration', paramObj);
            return promise;
        };

        this.GetInsEnrollmentReportCoursesCount = function (InstitutionID) {
            var paramObj = {
                "InstitutionID": InstitutionID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetInsEnrollmentReportCoursesCount', paramObj);
            return promise;
        };

        this.GetInsRegisterReportCoursesCount = function (InstitutionID,AcademicYearID,Batch) {
            var paramObj = {
                "InstitutionID": InstitutionID, "AcademicYearID": AcademicYearID, "Batch": Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetInsRegisterReportCoursesCount', paramObj);
            return promise;
        };

        this.GetInsVerificationReportCoursesCount = function (AcademicYearID,Batch,InstitutionID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "Batch": Batch,
                "InstitutionID": InstitutionID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetInsVerificationReportCoursesCount', paramObj);
            return promise;
        };

        this.GetAdminExamCentersList = function (AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "ExamMonthYearID": ExamMonthYearID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetAdminExamCentersList', paramObj);
            return promise;
        };

        this.GetExamCentresMappingData = function (DataType, AcademicYearID, ExamMonthYearID, CourseID, InstitutionExamCenterMappingId) {
            var paramObj = {
                "DataType": DataType,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "CourseID": CourseID,
                "InstitutionExamCenterMappingId": InstitutionExamCenterMappingId
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetorEditExamCentresMappingData', paramObj);
            return promise;
        };

        this.EditExamCentresMappingData = function (DataType, AcademicYearID, ExamMonthYearID, CourseID, InstitutionExamCenterMappingId) {
            var paramObj = {
                "DataType": DataType,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "CourseID": CourseID,
                "InstitutionExamCenterMappingId": InstitutionExamCenterMappingId
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetorEditExamCentresMappingData', paramObj);
            return promise;
        };


        this.GetExamCentreMappingExcel = function (DataType, AcademicYearID, ExamMonthYearID, CourseID, InstitutionExamCenterMappingId) {
            var paramObj = {
                "DataType": DataType,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "CourseID": CourseID,
                "InstitutionExamCenterMappingId": InstitutionExamCenterMappingId
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetExamCentreMappingExcel', paramObj);
            return promise;
        };

        this.SetAdminExamCentersList = function (Json,ExamMonthYearID) {
            var paramObj = {
                "Json": Json, "ExamMonthYearID": ExamMonthYearID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/SetAdminExamCentersList', paramObj);
            return promise;
        };


        this.AddMappingExamCentres = function (AcademicYearID, ExamMonthYearID, CourseID, ExaminationCentreID, InstitutionIDJson, UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "CourseID": CourseID,
                "ExaminationCentreID": ExaminationCentreID,
                "InstitutionIDJson": InstitutionIDJson,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/AddMappingExamCentres', paramObj);
            return promise;
        };

        this.UpdateMappingExamCentres = function (InstitutionExamCenterMappingId, ExaminationCentreID, Active, UserName) {
            var paramObj = {
                "InstitutionExamCenterMappingId": InstitutionExamCenterMappingId,
                "ExaminationCentreID": ExaminationCentreID,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/UpdateMappingExamCentres', paramObj);
            return promise;
        };
        this.GetAdminEnrollmentReportInsCount = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminEnrollmentReportInsCount');
        };


        this.GetAdminVerificationReportInsCount = function (AcademicYearID, Batch) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "Batch": Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminVerificationReportInsCount', paramObj);
            return promise;
        };

        this.GetAdminRegisterReportCount = function (AcademicYearID, Batch) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, Batch: Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminRegisterReportCount', paramObj);
            return promise;
        };



        this.GetAdminRegisterCoursesCount = function (InstitutionID,AcademicYearID, Batch) {
            var paramObj = {
                "InstitutionID": InstitutionID,"AcademicYearID": AcademicYearID, Batch: Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminRegisterCoursesCount', paramObj);
            return promise;
        };

        this.GetRegisterCoursesCount = function (InstitutionID, AcademicYearID, Batch) {
            var paramObj = {
                "InstitutionID": InstitutionID, "AcademicYearID": AcademicYearID, Batch: Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetRegisterCoursesCount', paramObj);
            return promise;
        };


        this.GetAdminRegisterReportData = function (InstitutionID, CourseID, ReportTypeID,AcademicYearID, Batch) {
            var paramObj = {
                "InstitutionID": InstitutionID, "CourseID": CourseID, "ReportTypeID": ReportTypeID, "AcademicYearID": AcademicYearID, Batch: Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminRegisterReportData', paramObj);
            return promise;
        };

        this.GetExamMonthYears = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetExamMonthYears', paramObj);
            return promise;
        };

       

        this.GetInstitutionEnrollmentReportData = function (InstitutionID, CourseID, ReportTypeID) {
            var paramObj = {
                "InstitutionID": InstitutionID, "CourseID": CourseID, "ReportTypeID": ReportTypeID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetInstitutionEnrollmentReportData', paramObj);
            return promise;
        };

        this.GetInstitutionRegisterReportData = function (InstitutionID, CourseID, ReportTypeID, AcademicYearID,Batch) {
            var paramObj = {
                "InstitutionID": InstitutionID, "CourseID": CourseID, "ReportTypeID": ReportTypeID, "AcademicYearID": AcademicYearID, "Batch": Batch
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetInstitutionRegisterReportData', paramObj);
            return promise;
        };

        this.GetInstitutionVerificationReportData = function (AcademicYearID,Batch,InstitutionID, CourseID, ReportTypeID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "Batch": Batch,
                "InstitutionID": InstitutionID,
                "CourseID": CourseID,
                "ReportTypeID": ReportTypeID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetInstitutionVerificationReportData', paramObj);
            return promise;
        };

        //this.getSSCDetails = function (TENTH_HT_NO, TENTH_YEAR, STREAM) {
        //    var paramObj = {
        //        "TENTH_HT_NO": TENTH_HT_NO, "TENTH_YEAR": TENTH_YEAR, "STREAM": STREAM
        //    };
        //    var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetSSCDetails', paramObj);
        //    return promise;
        //};

        //this.GetSSCDetails = function (RollNo, Year, Stream) {
        //    var param = { "RollNo": RollNo, "Year": Year, "Stream": Stream }
        //    return DataAccessService.postData('api/TwshStudentReg/GetSSCDetails', param);
        //};

        this.getSSCDetails = function (object) {
            var promise = DataAccessService.postData('api/CcicPreExamination/GetSSCDetails', object);
            return promise;
        };

        this.GetEnrollementDates = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetEnrollementDates', paramObj);
            return promise;
        };


        this.VerifyEnrollmentDate = function (CourseID) {
            var paramObj = {
                "CourseID": CourseID
            };
            return DataAccessService.getDataWithPara('api/CcicPreExamination/VerifyEnrollmentDate', paramObj);
        };

        this.VerifyFeePaymentDate = function (AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "ExamMonthYearID": ExamMonthYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/VerifyFeePaymentDate', paramObj);
            return promise;
        };
          

        this.GetCcicCurrentAcademicYear = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCurrentAcademicYear');
        };

        this.GetCcicResultsAcademicYear = function () {
            return DataAccessService.getDataAll('api/CcicPreExamination/GetCcicResultsAcademicYear');
        };

        this.GetResultsExamMonthYears = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetResultsExamMonthYears', paramObj);
            return promise;
        };

        this.GetCcicFeePaymentAcademicYear = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicFeePaymentAcademicYear');
        };
      
        this.GetCcicCourseDurationBatches = function (CourseDurationID) {
            var paramObj = {
                "CourseDurationID": CourseDurationID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCourseDurationBatches', paramObj);
            return promise;
        };

        this.GetCcicCourseDurations = function (BatchID) {
            var paramObj = {
                "BatchID": BatchID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCourseDurations', paramObj);
            return promise;
        };

        this.GetCcicCoursesByInstitution = function (InstitutionID) {
            var paramObject = {
                "InstitutionID": InstitutionID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCoursesByInstitution', paramObject);
            return promise;
        };

        this.GetCcicCourseQualifications = function (CourseID) {
            var paramObject = {
                "CourseID": CourseID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCourseQualifications', paramObject);
            return promise;
        };

        this.GetCcicCourseExperience = function (CourseQualificationsID) {
            var paramObject = {
                "CourseQualificationsID": CourseQualificationsID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCourseExperience', paramObject);
            return promise;
        };

        //this.AddStudentDetails = function (ApplicationNumber, InstitutionID, CourseID, CourseQualificationID, CourseExperienceID, SSC, SSCHallticketNumber, SSCPassedYear, SSCPassedType, StudentName, FatherName, MotherName, DateofBirth, SSCDateofBirth, Gender, AadharNumber, HouseNumber, Street, Landmark, Village, Pincode, District, AddressState, StudentMobile, StudentEmail,SSCValidated,UserName,StudentPhoto,StudentSign,SSCCertificate,QualificationCertificate, ExperienceCertificate) {
        //    var paramObj = {
        //        "ApplicationNumber": ApplicationNumber, "InstitutionID": InstitutionID, "CourseID": CourseID, "CourseQualificationID": CourseQualificationID, "CourseExperienceID": CourseExperienceID, "SSC": SSC, "SSCHallticketNumber": SSCHallticketNumber, "SSCPassedYear": SSCPassedYear, "SSCPassedType": SSCPassedType, "StudentName": StudentName, "FatherName": FatherName, "MotherName": MotherName, "DateofBirth": DateofBirth, "SSCDateofBirth": SSCDateofBirth, "Gender": Gender, "AadharNumber": AadharNumber, "HouseNumber": HouseNumber, "Street": Street, "Landmark": Landmark, "Village": Village, "Pincode": Pincode, "District": District, "AddressState": AddressState, "StudentMobile": StudentMobile, "StudentEmail": StudentEmail, "SSCValidated": SSCValidated, "UserName": UserName, "StudentPhoto": StudentPhoto, "StudentSign": StudentSign, "SSCCertificate": SSCCertificate, "QualificationCertificate": QualificationCertificate, "ExperienceCertificate": ExperienceCertificate
        //    };
        //    var promise = DataAccessService.postData('api/CcicPreExamination/AddStudentDetails', paramObj);
        //    return promise;
        //}

        this.AddStudentDetails = function (paramObject) {
            console.log(paramObject)
            return DataAccessService.postData('api/CcicPreExamination/AddStudentDetails', paramObject);
        };

        this.UpdateStudentDetails = function (paramObject) {
            console.log(paramObject)
            return DataAccessService.postData('api/CcicPreExamination/UpdateStudentDetails', paramObject);
        };

        this.GetViewStudentDetails = function (ApplicationNumber, StudentID,ApplicationStatus ) {
            var paramObj = {
                "ApplicationNumber": ApplicationNumber,
                "StudentID": StudentID,
                "ApplicationStatus": ApplicationStatus
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetViewStudentDetails', paramObj);
            return promise;
        }

        this.GetStudentDetails = function (ApplicationNumber, StudentID) {
            var paramObj = {
                "ApplicationNumber": ApplicationNumber, "StudentID": StudentID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetStudentDetails', paramObj);
            return promise;
        }

        this.SubmitStdDetails = function (ApplicationNumber, StudentID) {
            var paramObj = {
                "ApplicationNumber": ApplicationNumber, "StudentID": StudentID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/SubmitStdDetails', paramObj);
            return promise;
        }

        this.SetApplicationApprovalStatus = function (StudentId, UpdatedBy, ApplicationStatus,Remarks) {
            var paramObj = {
                "StudentId": StudentId,
                "UpdatedBy": UpdatedBy,
                "ApplicationStatus": ApplicationStatus,
                "Remarks": Remarks
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/SetApplicationApprovalStatus', paramObj);
            return promise;
        }

      

        this.AddAcademicYear = function (AcademicStartYear, AcademicYear, AcademicYearStartDate, AcademicYearEndDate,CurrentAcademicYear,UserName) {
            var paramObj = {
                "AcademicStartYear": AcademicStartYear, "AcademicYear": AcademicYear, "AcademicYearStartDate": AcademicYearStartDate, "AcademicYearEndDate": AcademicYearEndDate, "CurrentAcademicYear": CurrentAcademicYear,"UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/AddAcademicYear', paramObj);
            return promise;
        }


        this.UpdateAcademicYear = function (AcademicYearID, AcademicYearStartDate, AcademicYearEndDate, CurrentAcademicYear, UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "AcademicYearStartDate": AcademicYearStartDate, "AcademicYearEndDate": AcademicYearEndDate, "CurrentAcademicYear": CurrentAcademicYear, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateAcademicYear', paramObj);
            return promise;
        }


        this.AddAcademicYearCurrentBatch = function (AcademicYearID,Batch,CurrentBatch ,UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "Batch": Batch, "CurrentBatch": CurrentBatch  ,"UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/AddAcademicYearCurrentBatch', paramObj);
            return promise;
        }

        this.AddAYCourseDurationBatches = function (AcademicYearID, CourseDuration, Batch, AYBatchStartDate, AYBatchEndDate ,UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "CourseDuration": CourseDuration, "Batch": Batch, "AYBatchStartDate": AYBatchStartDate, "AYBatchEndDate": AYBatchEndDate, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/AddAYCourseDurationBatches', paramObj);
            return promise;
        }
        this.AddEnrollementDates = function (AcademicYearID, CourseDuration, Batch, EnrollementStartDate, EnrollementEndDate, UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "CourseDuration": CourseDuration, "Batch": Batch, "EnrollementStartDate": EnrollementStartDate, "EnrollementEndDate": EnrollementEndDate, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/AddEnrollementDates', paramObj);
            return promise;
        }

        this.SetAYCourseDurationBatchStatus = function (UpdateType, UserName, AcademicYearBatchID, Active) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "AcademicYearBatchID": AcademicYearBatchID, "Active": Active
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/SetAYCourseDurationBatchStatus', paramObj);
            return promise;
        }

        this.SetEnrollementDatesStatus = function (UpdateType, UserName, EnrollementDatesID, Active) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "EnrollementDatesID": EnrollementDatesID, "Active": Active
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/SetEnrollementDatesStatus', paramObj);
            return promise;
        }



        this.SetExamMonthYearStatus = function (UpdateType, UserName, ExamMonthYearID, Active) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "ExamMonthYearID": ExamMonthYearID, "Active": Active
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/SetExamMonthYearStatus', paramObj);
            return promise;
        }

        this.UpdateAcademicYearCurrentBatch = function (AcademicYearCurrentBatchID, CurrentBatch,UserName) {
            var paramObj = {
                "AcademicYearCurrentBatchID": AcademicYearCurrentBatchID, "CurrentBatch": CurrentBatch, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateAcademicYearCurrentBatch', paramObj);
            return promise;
        }

        this.UpdateEnrollementDates = function (UpdateType, UserName, EnrollementDatesID, Active, EnrollementStartDate, EnrollementEndDate) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "EnrollementDatesID": EnrollementDatesID, "Active": Active, "EnrollementStartDate": EnrollementStartDate, "EnrollementEndDate": EnrollementEndDate
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateEnrollementDates', paramObj);
            return promise;
        }

        this.UpdateAYCourseDurationBatchDates = function (UpdateType, UserName, AcademicYearBatchID, Active, AYBatchStartDate, AYBatchEndDate) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "AcademicYearBatchID": AcademicYearBatchID, "Active": Active, "AYBatchStartDate": AYBatchStartDate, "AYBatchEndDate": AYBatchEndDate
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateAYCourseDurationBatchDates', paramObj);
            return promise;
        }



        this.UpdateExamMonthYear = function (UserName, ExamMonthYearID, ExamMonthYearName, ExamMonthYearSequence) {
            var paramObj = {
                "UserName": UserName, "ExamMonthYearID": ExamMonthYearID, "ExamMonthYearName": ExamMonthYearName, "ExamMonthYearSequence": ExamMonthYearSequence
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateExamMonthYear', paramObj);
            return promise;
        }

        this.AddNRDataforFeePayment = function (paramObject) {
            console.log(paramObject)
            return DataAccessService.postData('api/CcicPreExamination/AddNRDataforFeePayment', paramObject);
        };

        this.GetFeePaymentNRData = function (ExamMonthYearID) {
            var paramObj = {
                "ExamMonthYearID": ExamMonthYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetFeePaymentNRData', paramObj);
            return promise;
        };


        this.GetFeePaymentDates = function (DataType, AcademicYearID, FeePaymentDateID) {
            var paramObject = { "DataType": DataType, "AcademicYearID": AcademicYearID, "FeePaymentDateID": FeePaymentDateID};
            return DataAccessService.postData('api/CcicPreExamination/GetFeePaymentDates', paramObject);
        };

        this.EditFeePaymentDates = function (DataType, AcademicYearID, FeePaymentDateID) {
            var paramObject = { "DataType": DataType, "AcademicYearID": AcademicYearID, "FeePaymentDateID": FeePaymentDateID };
            return DataAccessService.postData('api/CcicPreExamination/GetFeePaymentDates', paramObject);
        };

        this.AddFeePaymentDates = function (paramObject) {
            return DataAccessService.postData('api/CcicPreExamination/AddorUpdateFeePaymentDates', paramObject);
        };


        this.UpdateFeePaymentDates = function (paramObject) {
            return DataAccessService.postData('api/CcicPreExamination/AddorUpdateFeePaymentDates', paramObject);
        };

        this.getPayExamFee = function (InstitutionID,AcademicYearID, ExamMonthYearID, FeePaymentTypeID,UserName) {
            var paramObject = {
                "InstitutionID": InstitutionID, "AcademicYearID": AcademicYearID, "ExamMonthYearID": ExamMonthYearID, "FeePaymentTypeID": FeePaymentTypeID, "UserName": UserName
            };
            return DataAccessService.postData('api/CcicPreExamination/getPayExamFee', paramObject);
        }

        this.GetFeePaymentReport = function (DataType,InstitutionID, AcademicYearID, ExamMonthYearID, FeePaymentTypeID, UserName) {
            var paramObject = {
                "DataType": DataType,
                "InstitutionID": InstitutionID,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "FeePaymentTypeID": FeePaymentTypeID,
                "UserName": UserName
            };
            return DataAccessService.postData('api/CcicPreExamination/GetFeePaymentReport', paramObject);
        }

        this.SetHolidayDates = function (Json, AcademicYearId, ExamMonthYearId) {
            var paramObj = {
                "Json": Json,
                "AcademicYearId": AcademicYearId,
                "ExamMonthYearId": ExamMonthYearId
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/SetHolidayDates', paramObj);
            return promise;
        };

        this.setTimeTableData = function (AcademicYearId, ExamMonthYearId, StartDate) {
            var paramObject = {
                "AcademicYearId": AcademicYearId,
                "ExamMonthYearId": ExamMonthYearId,
                "StartDate": StartDate
            };
            var promise = DataAccessService.postData('api/CcicTimeTableGenerator/setTimeTable', paramObject);
            return promise;
        }

        this.GetTimeTableDataPdf = function (DataType, AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "DataType": DataType,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetTimeTableDataPdf', paramObj);
            return promise;
        }

        this.GetCcicTimeTableExcel = function (DataType, AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "DataType": DataType, "AcademicYearID": AcademicYearID, "ExamMonthYearID": ExamMonthYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicTimeTableExcel', paramObj);
            return promise;
        };

        this.GetFeePaymentReportExcel = function (DataType,InstitutionID, AcademicYearID, ExamMonthYearID, FeePaymentTypeID, UserName) {
            var paramObj = {
                "DataType": DataType,
                "InstitutionID": InstitutionID,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "FeePaymentTypeID": FeePaymentTypeID,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetFeePaymentReportExcel', paramObj);
            return promise;
        };

        this.GetFeeEligibleReportExcel = function (DataType) {
            var paramObj = {
                "DataType": DataType
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetFeeEligibleReportExcel', paramObj);
            return promise;
        };

        this.GetAdminFeePaymentInstituteCount = function (AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminFeePaymentInstituteCount', paramObj);
            return promise;
        };



        this.GetAdmFeePaymentInstituteCountExcel = function (AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdmFeePaymentInstituteCountExcel', paramObj);
            return promise;
        };

        this.GetCoursewiseFeePaymentCount = function (AcademicYearID, ExamMonthYearID, InstitutionID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "InstitutionID": InstitutionID

            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCoursewiseFeePaymentCount', paramObj);
            return promise;
        };



        this.GetCoursewiseFeePaymentCountExcel = function (AcademicYearID, ExamMonthYearID, InstitutionID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "InstitutionID": InstitutionID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCoursewiseFeePaymentCountExcel', paramObj);
            return promise;
        };

        this.GetAdminFeePaymentCourseCount = function (AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminFeePaymentCourseCount', paramObj);
            return promise;
        };

        this.GetAdmFeePaymentCourseCountExcel = function (AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdmFeePaymentCourseCountExcel', paramObj);
            return promise;
        };

        this.GetInstitutewiseFeePaymentCount = function (AcademicYearID, ExamMonthYearID,CourseID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "CourseID": CourseID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetInstitutewiseFeePaymentCount', paramObj);
            return promise;
        };

        this.GetInstitutewiseFeePaymentCountExcel = function (AcademicYearID, ExamMonthYearID, CourseID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "CourseID": CourseID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetInstitutewiseFeePaymentCountExcel', paramObj);
            return promise;
        };
       
        this.AddHallTicketDates = function (DataType,HallTicketDateID,AcademicYearID, ExamMonthYearID, StartDate, EndDate,Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "HallTicketDateID": HallTicketDateID,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/AddorUpdateHallTicketDates', paramObj);
            return promise;
        }

        this.UpdateHallTicketDates = function (DataType, HallTicketDateID, AcademicYearID, ExamMonthYearID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "HallTicketDateID": HallTicketDateID,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/AddorUpdateHallTicketDates', paramObj);
            return promise;
        }

        this.GetHallTicketDates = function (DataType, HallTicketDateID) {
            var paramObj = {
                "DataType": DataType,
                "HallTicketDateID": HallTicketDateID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetorEditHallTicketDates', paramObj);
            return promise;
        };


        this.GetNRExcelData = function (AcademicYearID, ExamMonthYearID, ExamCentreCode) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "ExamCentreCode": ExamCentreCode
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetNRExcelData', paramObj);
            return promise;
        };

        this.GetNRExcel = function (AcademicYearID, ExamMonthYearID, ExamCentreCode) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "ExamCentreCode": ExamCentreCode
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetNRExcel', paramObj);
            return promise;
        };

        this.GetStudentPinList = function (InstitutionID, AcademicYearID, ExamMonthYearID, FeePaymentTypeID, UserName) {
            var paramObj = {
                "InstitutionID": InstitutionID,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "FeePaymentTypeID": FeePaymentTypeID,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetStudentPinList', paramObj);
            return promise;
        };

        this.GetCandidateHallticket = function (AcademicYearID, ExamMonthYearID, StudentTypeID, StudentID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "StudentTypeID": StudentTypeID,
                "StudentID": StudentID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCandidateHallticket', paramObj);
            return promise;
        };

        this.GetExamDates = function (AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetExamDates', paramObj);
            return promise;
        };

        this.NrReports = function (AcademicYearID, ExamMonthYearID, ExamDate, UserName) {
            var paramObj = {
                AcademicYearID: AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "ExamDate": ExamDate,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('CcicPreExaminationReport/NrReports', paramObj);
            return promise;
        };

        this.UploadResultFileJson = function (AcademicYearID, ExamMonthYearID, Json,UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "Json": Json,
                "UserName": UserName,
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/UploadResultFileJson', paramObj);
            return promise;
        };

        this.GenerateNrData = function (AcademicYearID, ExamMonthYearID, UserName) {
            var paramObject = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "UserName": UserName

            };

            return DataAccessService.getDataWithPara('api/CcicPreExamination/GenerateNrData', paramObject);
        };

        this.PostMarks = function (AcademicYearID, ExamMonthYearID, UserName) {
            var paramObject = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "UserName": UserName

            };

            return DataAccessService.getDataWithPara('api/CcicPreExamination/PostMarks', paramObject);
        };


        this.GenerateWantings = function (AcademicYearID, ExamMonthYearID, UserName) {
            var paramObject = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "UserName": UserName

            };

            return DataAccessService.getDataWithPara('api/CcicPreExamination/GenerateWantings', paramObject);
        };

        this.UploadWantingsJson = function (AcademicYearID, ExamMonthYearID,Json, UserName) {
            var paramObject = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "Json": Json,
                "UserName": UserName

            };

            return DataAccessService.postData('api/CcicPreExamination/UploadWantingsJson', paramObject);
        };

        this.ResultsProcessing = function (AcademicYearID, ExamMonthYearID, UserName) {
            var paramObject = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "UserName": UserName

            };

            return DataAccessService.getDataWithPara('api/CcicPreExamination/ResultsProcessing', paramObject);
        };

        this.ResultsLogicReports = function (AcademicYearID, ExamMonthYearID, UserName) {
            var paramObject = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "UserName": UserName

            };

            return DataAccessService.getDataWithPara('api/CcicPreExamination/ResultsLogicReports', paramObject);
        };

        this.GetCcicEducationQualifications = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicEducationQualifications');
        };

        this.AddCourses = function (paramObject) {

            return DataAccessService.postData('api/CcicPreExamination/AddorUpdateCourses', paramObject);
        };

        this.UpdateCourses = function (paramObject) {

            return DataAccessService.postData('api/CcicPreExamination/AddorUpdateCourses', paramObject);
        };

        this.GetCourses = function (paramObject) {

            return DataAccessService.postData('api/CcicPreExamination/GetorActiveorUpdateCourses', paramObject);
        };

        this.UpdateCourseStatus = function (paramObject) {

            return DataAccessService.postData('api/CcicPreExamination/GetorActiveorUpdateCourses', paramObject);
        };

        this.GetNRStudentDetails = function (AcademicYearID,ExamMonthYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetNRStudentDetails', paramObj);
            return promise;
        };

    });
});