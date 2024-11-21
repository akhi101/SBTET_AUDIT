define(['app'], function (app) {
    app.service("CbtStudentRegService", function (DataAccessService) {

        this.GetTenthYears = function () {
            return DataAccessService.postData('api/CbtStudentReg/GetTenthYears');
        };
       
        this.GetTwshExamMonthYearbyID = function (AcademicYearID) {
            var paramObj = { "AcademicYearID": AcademicYearID };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetTwshExamMonthYearbyID', paramObj);
            return promise;
        };
        this.getStudentDetails = function (ApplicationNumber) {
            var paramObj = { "ApplicationNumber": ApplicationNumber }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getStudentDetails', paramObj);
            return promise;
        };

        this.TwshsetStudentFeepayments = function (AcademicYearId,ExamMonthYearId, FromDate, ToDate, FineDate, TatkalDate, Fee, LateFee, TatkalFee, PremiumTatkalFee, CertificateFee) {
            var paramObject = {
                "AcademicYearId": AcademicYearId,
                "ExamMonthYearId": ExamMonthYearId, "FromDate": FromDate, "ToDate": ToDate, "FineDate": FineDate, "TatkalDate": TatkalDate, "Fee": Fee,
                "LateFee": LateFee, "TatkalFee": TatkalFee, "PremiumTatkalFee": PremiumTatkalFee, "CertificateFee": CertificateFee
            };
   
            var promise = DataAccessService.postData('api/CbtStudentReg/TwshsetStudentFeepayments', paramObject);
            return promise;
        };

        this.TwshUpdateStudentFeepayments = function (FeePaymentId,AcademicYearId,ExamMonthYearId, FromDate, ToDate, FineDate, TatkalDate, Fee, LateFee, TatkalFee, PremiumTatkalFee, CertificateFee) {
            var paramObject = {
                "FeePaymentId": FeePaymentId, "AcademicYearId": AcademicYearId,"ExamMonthYearId": ExamMonthYearId, "FromDate": FromDate, "ToDate": ToDate, "FineDate": FineDate, "TatkalDate": TatkalDate, "Fee": Fee,
                "LateFee": LateFee, "TatkalFee": TatkalFee, "PremiumTatkalFee": PremiumTatkalFee, "CertificateFee": CertificateFee
            };
            var promise = DataAccessService.postData('api/CbtStudentReg/TwshUpdateStudentFeepayments', paramObject);
            return promise;
        };

        this.getTwshResult = function (RegNo) {
            var paramObj = { "RegNo": RegNo }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getTwshResult', paramObj);
            return promise;
        };
        this.TwshExamCenterStrengthXlsxReport = function (ExamMode) {
            var paramObj = { "ExamMode": ExamMode }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/TwshExamCenterStrengthXlsxReport', paramObj);
            return promise;
        };
        this.TwshExamCenterStrengthReport = function (ExamMode) {
            var paramObj = { "ExamMode": ExamMode }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/TwshExamCenterStrengthReport', paramObj);
            return promise;
        };


        this.PostMultiplePaymentData = function (ReqData) {
            // var paramObj = { "ReqData": ReqData };PIDResponseXML.InnerXml.Length
            var promise = DataAccessService.postData('api/CbtStudentReg/PostMultipleApplicationPaymentdata', ReqData);
            return promise;
        };

        this.GetStudentHallticket = function (ApplicationNo, DateofBirth) {
            var paramObj = { "ApplicationNo": ApplicationNo, "DateofBirth": DateofBirth }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetStudentHallTicket', paramObj);
            return promise;
        };

        this.CreateTwshTimeSlot = function (DataTypeId, CourseId, GradeId, BatchId, Paper1TimeSlot, Paper2TimeSlot, PCODE) {
            var paramObj = {
                "DataTypeId": DataTypeId, "CourseId": CourseId, "GradeId": GradeId,
                "BatchId": BatchId, "Paper1TimeSlot": Paper1TimeSlot, "Paper2TimeSlot": Paper2TimeSlot, "PCODE": PCODE
            }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/CreateTwshTimeSlot', paramObj);
            return promise;
        };
        
        this.SetTwshTimeSlot = function (DataTypeId, Paper1TimeSlot, Paper2TimeSlot, Id, PCODE, Active) {
            var paramObj = {
                "DataTypeId": DataTypeId, "Paper1TimeSlot": Paper1TimeSlot, "Paper2TimeSlot": Paper2TimeSlot,
                "Id": Id, "PCODE": PCODE, "Active": Active
            }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/SetTwshTimeSlot', paramObj);
            return promise;
        };
        
    
        
        this.GetExaminationDatesByCourse = function (CourseId) {
            var paramObj = { "CourseId": CourseId }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetExaminationDatesByCourse', paramObj);
            return promise;
        };



        this.GetCBTCourses = function () {
            // var paramObj = { "ReqData": ReqData };SP_GET_Category
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetCBTCourses');
            return promise;
        };

        this.TwshCertificate = function () {
            // var paramObj = { "ReqData": ReqData };SP_GET_Category
            var promise = DataAccessService.getDataAll('api/TwshCertificate/GetTypeWritingCertificate');
            return promise;
        };


        this.getCategory = function () {
            // var paramObj = { "ReqData": ReqData };SP_GET_Category
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetCategoryList');
            return promise;
        };


        this.getDistricts = function () {
            // var paramObj = { "ReqData": ReqData };SP_GET_Category
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetDistrictList');
            return promise;
        };

        this.generateTwshNr = function () {
            // var paramObj = { "ReqData": ReqData };SP_GET_NR
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/generateTwshNr');
            return promise;
        };

        this.generateTwshNrExcel = function () {
            // var paramObj = { "ReqData": ReqData };SP_GET_NR
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/generateTwshNrExcel');
            return promise;
        };

        this.GetOnlineExamDist = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetOnlineExamDist');
            return promise;
        };

        

        this.GetExamsDates = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetExamsDates');
            return promise;
        };

        this.getTwshExamMonthYears = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/getTwshExamMonthYears');
            return promise;
        };

        this.getTwshExamMonthYearsbyID = function (AcademicYearID) {
            var paramObj = { "AcademicYearID": AcademicYearID };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getTwshExamMonthYearsbyID', paramObj);
            return promise;
        };

        this.getTwshExamCenterCollegeList = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/getTwshExamCenterCollegeList');
            return promise;
        };

        this.getTwshDistictMasterList = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/getTwshDistictMasterList');
            return promise;
        };

        this.DeleteTwshExamCenter = function (Id) {
            var paramObj = { "Id": Id};
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/DeleteTwshExamCenter', paramObj);
            return promise;
        };

        this.DeleteGradewiseExamCenters = function (Id) {
            var paramObj = { "Id": Id };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/DeleteGradewiseExamCenters', paramObj);
            return promise;
        };

        this.SetTwshExamCenter = function (CenterCode, CenterName, CenterAddress, DistrictId, IsTw, IsSh, IsTwOnline, IsShOnline, GenderId) {
            var paramObj = { "CenterCode": CenterCode, "CenterName": CenterName, "CenterAddress": CenterAddress, "DistrictId": DistrictId, "IsTw": IsTw, "IsSh": IsSh, "IsTwOnline": IsTwOnline, "IsShOnline": IsShOnline, "GenderId": GenderId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/SetTwshExamCenter', paramObj);
            return promise;
        };

        this.TwshExamDatesbyCourse = function (ExamMonthYearId, CourseId) {
            var paramObj = { "ExamMonthYearId": ExamMonthYearId, "CourseId": CourseId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/TwshExamDatesbyCourse', paramObj);
            return promise;
        };
        this.TwshExamBatchbyDate = function (ExamDateId) {
            var paramObj = { "ExamDateId": ExamDateId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/TwshExamBatchbyDate', paramObj);
            return promise;
        };
        this.TwshNrReports = function (ExamMonthYearId, UserId, CourseId, ExamDate, ExamBatch) {
            var paramObj = { "ExamMonthYearId": ExamMonthYearId, "UserId": UserId, "CourseId": CourseId, "ExamDate": ExamDate, "ExamBatch": ExamBatch };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/TwshNrReports', paramObj);
            return promise;
        };

        this.TwshNrExcelReports = function (ExamMonthYearId, UserId, CourseId, ExamDate, ExamBatch) {
            var paramObj = { "ExamMonthYearId": ExamMonthYearId, "UserId": UserId, "CourseId": CourseId, "ExamDate": ExamDate, "ExamBatch": ExamBatch };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/TwshNrExcelReports', paramObj);
            return promise;
        };

        this.getExaminationDistricts = function (CourseId, UserId, GradeId) {
            var paramObj = { "CourseId": CourseId, "UserId": UserId, "GradeId": GradeId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetExaminationDistricts', paramObj);
            return promise;
        };

        this.GetTwshAcademicYears = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetTwshAcademicYears');
            return promise;
        };


        this.SetTwshExamMonthYear = function (DataTypeId, AcademicID,ExamMonthYear, ExamMonthYearId, SequenceId) {
            var paramObj = {
                "DataTypeId": DataTypeId,
                "AcademicID": AcademicID,
                "ExamMonthYear": ExamMonthYear,
                "ExamMonthYearId": ExamMonthYearId,
                "SequenceId": SequenceId
            }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/SetTwshExamMonthYear', paramObj);
            return promise;
        };

        this.SetExamMonthYearStatus = function (Id, Active) {
            var paramObj = {
                "Id": Id,
                "Active": Active,
               
            }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/SetExamMonthYearStatus', paramObj);
            return promise;
        };

        
        this.SetAcademicYearStatus = function (AcademicID, Active) {
            var paramObj = {
                "AcademicID": AcademicID,
                "Active": Active,

            }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/SetAcademicYearStatus', paramObj);
            return promise;
        };

        this.TwshSetFeeDateStatus = function (FeePaymentDateID) {
            var paramObj = {
                "FeePaymentDateID": FeePaymentDateID
            }
            console.log(paramObj)
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/TwshSetFeeDateStatus', paramObj);
            return promise;
        };

        this.getTwshStudentDetails = function (ApplicationNumber) {
            var paramObj = {
                "ApplicationNumber": ApplicationNumber,
                                
            }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getTwshStudentDetails', paramObj);
            return promise;
        };

        this.TwshUploadSign = function (sign, ApplicationNumber, RegistrationNumber) {
            var paramObj = {
                "sign": sign,
                "ApplicationNumber": ApplicationNumber,
                "RegistrationNumber": RegistrationNumber,
            }
            var promise = DataAccessService.postData('api/CbtStudentReg/TwshUploadSign', paramObj);
            return promise;
        };

        
        this.getTwshStudentDetailsForCertificate = function (RegistrationNo) {
            var paramObj = {
                "RegistrationNo": RegistrationNo,

            }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getTwshStudentDetailsForCertificate', paramObj);
            return promise;
        };

        this.GetExamMonthYear = function () {
            // var paramObj = { "ReqData": ReqData };SP_GET_Category
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetExamMonthYear');
            return promise;
        };



        this.GetTwshExamCenters = function () {
            // var paramObj = { "ReqData": ReqData };SP_GET_Category
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetTwshExamCenters');
            return promise;
        };

        this.GetExamCentersList = function () {
            // var paramObj = { "ReqData": ReqData };SP_GET_Category
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetExamCentersList');
            return promise;
        };


        this.GetExamMonthYearForTwshOdc = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetExamMonthYearForTwshOdc');
            return promise;
        };

        this.GetTwshPrinterOdcDownload = function (ExamMonthYear) {
            var paramObj = { "ExamMonthYear": ExamMonthYear };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetTwshPrinterOdcDownload', paramObj);
            return promise;
        };

        this.GetTwshPrinterNrDownload = function (ExamMonthYearId) {
            var paramObj = { "ExamMonthYearId": ExamMonthYearId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetTwshPrinterNrDownload', paramObj);
            return promise;
        };

        this.generateTwshNrExcel = function (ExamMonthYearId) {
            var paramObj = { "ExamMonthYearId": ExamMonthYearId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/generateTwshNrExcel', paramObj);
            return promise;
        };


        this.getExamDates = function (CourseId, GradeId) {
            var paramObj = { "CourseId": CourseId, "GradeId": GradeId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetExaminationDates', paramObj);
            return promise;
        };

        this.EditInstituteData = function (Id) {
            var paramObj = { "Id": Id };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/EditInstituteData', paramObj);
            return promise;
        };


        this.Delete_Institute = function (Id) {
            var paramObj = { "Id": Id };
            var promise = DataAccessService.postData('api/CbtStudentReg/Delete_InstituteData', paramObj);
            return promise;
        };

        this.Delete_TimeSlot = function (Id) {
            var paramObj = { "Id": Id };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/Delete_TimeSlot', paramObj);
            return promise;
        };

        
        this.AddInstitute = function (paramObj) {
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/AddInstitute', paramObj);
            return promise;
        };


        this.UpdateInstitutionData = function (paramObj) {
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/UpdateInstitutionData', paramObj);
            return promise;
        };

        this.GetInstitutesList = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetInstitutesList');
            return promise;
        };
        
        this.GetTwshExamDatesBatches = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetTwshExamDatesBatches');
            return promise;
        };

        
        this.getExamTimeSlots = function (AcademicYearID, ExamMonthYearID) {
            var paramObj = { "AcademicYearID": AcademicYearID, "ExamMonthYearID": ExamMonthYearID }
            console.log(paramObj)
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getExamTimeSlots', paramObj);
            return promise;
        };

        this.GetAllCourses = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetAllCourses');
            return promise;
        };
        

        this.GetAllGrades = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetAllGrades');
            return promise;
        };

        

        this.GetInstitutesListExcel = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetInstitutesListExcel');
            return promise;
        };

        this.GetInstitutesListExcel = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetInstitutesListExcel');
            return promise;
        };

        this.getTwshCertificateApplicationReport = function (ExamMode, ExamMonthYearId, CbtfromData, CbttoData) {
            var paramObj = {
                "ExamMode": ExamMode, "ExamMonthYearId": ExamMonthYearId, "CbtfromData": CbtfromData, "CbttoData": CbttoData
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getTwshCertificateApplicationReport', paramObj);
            return promise;
        };
        

        this.getBatches = function (ExamDateId, CourseId, GradeID) {
            var paramObj = { "ExamDateId": ExamDateId, "CourseId": CourseId, "GradeID": GradeID }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetExaminationbatches', paramObj);
            return promise;
        };

        
        this.getExamCentersByMode = function (Mode) {
            var paramObj = { "Mode": Mode}
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getExamCentersByMode', paramObj);
            return promise;
        };

        this.getExamCenters = function (DataType, AcademicYearID, ExamMonthYearID) {
            var paramObj = {
                "DataType": DataType,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID
            }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetExamCenters', paramObj);
            return promise;
        };

        this.getExamCentresCoursewise = function (DataType, ExamCentreID, AcademicYearID, ExamMonthYearID, MBT, SHORTHAND) {
            var paramObj = {
                "DataType": DataType,
                "ExamCentreID": ExamCentreID,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "MBT": MBT,
                "SHORTHAND": SHORTHAND

            }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetExamCentresCoursewise', paramObj);
            return promise;
        };

        this.editExamCentresCoursewise = function (ExamCentreCourseID) {
            var paramObj = {
                "ExamCentreCourseID": ExamCentreCourseID
            }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/EditExamCentresCoursewise', paramObj);
            return promise;
        };

        this.getExamCentersExcel = function (AcademicYearID, ExamMonthYearID) {
            var paramObj = { "AcademicYearID": AcademicYearID, "ExamMonthYearID": ExamMonthYearID }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getExamCentersExcel', paramObj);
            return promise;
        };

        this.getExamCentersByModeExcel = function (Mode) {
            var paramObj = { "Mode": Mode }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getExamCentersByModeExcel', paramObj);
            return promise;
        };


        this.getExamTimeSlotsExcel = function (AcademicYearID,ExamMonthYearID) {
            var paramObj = { "AcademicYearID": AcademicYearID, "ExamMonthYearID": ExamMonthYearID }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getExamTimeSlotsExcel', paramObj);

            return promise;
        };
        this.SetTwshExamCenters = function (Id, ExaminationCenterCode, ExaminationCenterName, DistrictId, IsTw, IsSh, IsTwOnline, IsShOnline, GenderId, IsActive) { 
            var paramObj = {
                "Id": Id,
                "ExaminationCenterCode": ExaminationCenterCode,
                "ExaminationCenterName": ExaminationCenterName,
                "DistrictId": DistrictId,
                "IsTw": IsTw,
                "IsSh": IsSh,
                "IsTwOnline": IsTwOnline,
                "IsShOnline": IsShOnline,
                "GenderId": GenderId,
                "IsActive": IsActive
            }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/SetTwshExamCenters', paramObj);
            return promise;
        };

        this.SetTwshExamCentres = function (DataType, ExaminationCentreID, AcademicYearID, ExamMonthYearID, ExaminationCentreCode, ExaminationcentreName, DistrictID, Gender, CBT, MBT, ShortHand, CentreAddress, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "ExaminationCentreID": ExaminationCentreID,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "ExaminationCentreCode": ExaminationCentreCode,
                "ExaminationcentreName": ExaminationcentreName,
                "DistrictID": DistrictID,
                "Gender": Gender,
                "CBT": CBT,
                "MBT": MBT,
                "ShortHand": ShortHand,
                "CentreAddress": CentreAddress,
                "Active": Active,
                "UserName": UserName,
            }
            var promise = DataAccessService.postData('api/CbtStudentReg/SetorUpdateTwshExamCentres', paramObj);
            return promise;
        };


        this.UpdateTwshExamCentres = function (DataType, ExaminationCentreID, AcademicYearID, ExamMonthYearID, ExaminationCentreCode, ExaminationcentreName, DistrictID, Gender, CBT, MBT, ShortHand, CentreAddress, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "ExaminationCentreID": ExaminationCentreID,
                "AcademicYearID": AcademicYearID,
                "ExamMonthYearID": ExamMonthYearID,
                "ExaminationCentreCode": ExaminationCentreCode,
                "ExaminationcentreName": ExaminationcentreName,
                "DistrictID": DistrictID,
                "Gender": Gender,
                "CBT": CBT,
                "MBT": MBT,
                "ShortHand": ShortHand,
                "CentreAddress": CentreAddress,
                "Active": Active,
                "UserName": UserName,
            }
            var promise = DataAccessService.postData('api/CbtStudentReg/SetorUpdateTwshExamCentres', paramObj);
            return promise;
        };

        this.UpdateTwshExamCentresCourseWise = function (ExamCentreCourseID, ExamStrength, CourseAvailable, Active, UserName) {
            var paramObj = {
                "ExamCentreCourseID": ExamCentreCourseID,
                "ExamStrength": ExamStrength,
                "CourseAvailable": CourseAvailable,
                "Active": Active,
                "UserName": UserName,
            }
            var promise = DataAccessService.postData('api/CbtStudentReg/UpdateTwshExamCentresCourseWise', paramObj);
            return promise;
        };

        this.GetFeeDetails = function (ApplicationNo) {
            var paramObj = { "ApplicationNo": ApplicationNo }
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetFeeDetails', paramObj);
            return promise;
        };
        this.getlanguages = function (courseid) {
            var paramObj = { "CourseId": courseid };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getLanguages', paramObj);
            return promise;
        };

        this.GetPreviousExamData = function (HallticketNo, GradeId) {
            var paramObj = { "HallticketNo": HallticketNo, "GradeId": GradeId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetPreviousExamData', paramObj);
            return promise;
        };
        this.GetQualifiedExamData = function (HallticketNo, QualificationGradeId) {
            var paramObj = { "HallticketNo": HallticketNo, "QualificationGradeId": QualificationGradeId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetQualifiedExamData', paramObj);
            return promise;
        };
        this.getGrades = function (courseid, language) {
            var paramObj = { "CourseId": courseid, "language": language };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetGradeList', paramObj);
            return promise;
        };

        this.getQualifications = function (GradeId) {
            var paramObj = {
                "GradeId": GradeId
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetQualificationList', paramObj);
            return promise;
        };

        //------Offline exam centers----------
        this.getExaminationCenters = function (UserId, DistrictId, CourseId, GradeId) {
            var paramObj = { "UserId": UserId, "DistrictId": DistrictId, "CourseId": CourseId, "GradeId": GradeId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetExaminationCenters', paramObj);
            return promise;
        };
        //---------------online Examcenters---------------
        this.getonlineExaminationCenters = function (CourseId, DistrictId) {
            var paramObj = { "CoursesType": CourseId, "DistrictId": DistrictId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getonlineExamcentersAndDates', paramObj);
            return promise;
        };

        this.GetCBTExamcentersAndDates = function (CourseId, DistrictId) {
            var paramObj = { "CoursesType": CourseId, "DistrictId": DistrictId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetCBTExamcentersAndDates', paramObj);
            return promise;
        };

        this.TempGetSSCDetails = function (TENTH_HT_NO, TENTH_YEAR, STREAMS) {
            var paramObject = { "TENTH_HT_NO": TENTH_HT_NO, "TENTH_YEAR": TENTH_YEAR, "STREAMS": STREAMS };
            return DataAccessService.postData('api/CbtStudentReg/TempGetSSCDetails', paramObject);
        };

        this.GetApplicationNumber = function () {
            return DataAccessService.getDataAll('api/CbtStudentReg/GetApplicationNumber');
        };

        this.AddCandidateDetails = function (object) {
            var promise = DataAccessService.postData('api/CbtStudentReg/AddCandidateDetails', object);
            return promise;
        };

        this.UpdateCandidateDetails = function (object) {
            var promise = DataAccessService.postData('api/CbtStudentReg/UpdateCandidateDetails', object);
            return promise;
        };


        this.GetViewCandidateDetails = function (ApplicationNumber, CandidateID, ApplicationStatus) {
            var paramObj = {
                "ApplicationNumber": ApplicationNumber,
                "CandidateID": CandidateID,
                "ApplicationStatus": ApplicationStatus
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetViewCandidateDetails', paramObj);
            return promise;
        }

        this.GetCandidateDetails = function (ApplicationNumber, CandidateID) {
            var paramObj = {
                "ApplicationNumber": ApplicationNumber,
                "CandidateID": CandidateID,
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetCandidateDetails', paramObj);
            return promise;
        }


        this.SubmitCandidateDetails = function (ApplicationNumber, CandidateID) {
            var paramObj = {
                "ApplicationNumber": ApplicationNumber, "CandidateID": CandidateID
            };
            var promise = DataAccessService.postData('api/CbtStudentReg/SubmitCandidateDetails', paramObj);
            return promise;
        }

        this.UpdateTwshExamDates = function (ExamDate, ExamMonthYearId, CourseId,BatchNumber, BatchId, Id) {
            var object = {
                "ExamDate": ExamDate,
                "ExamMonthYearId": ExamMonthYearId,
                "CourseId": CourseId,
                "BatchNumber":BatchNumber,
                "BatchId": BatchId,
                "Id":Id

            }
            var promise = DataAccessService.postData('api/CbtStudentReg/UpdateTwshExamDates', object);
            return promise;
        };
        this.UpdateGradewiseExamCenters = function (paramObj) {
            var promise = DataAccessService.postData('api/CbtStudentReg/UpdateGradewiseExamCenters', paramObj);
            return promise;
        };
        
        this.AddGradewiseExamCenters = function (paramObj) {
            var promise = DataAccessService.postData('api/CbtStudentReg/AddGradewiseExamCenters', paramObj);
            return promise;
        };

        this.SetTwshExamDates = function (object) {
            var promise = DataAccessService.postData('api/CbtStudentReg/SetTwshExamDates', object);
            return promise;
        };

        this.UpdateTwshPhotoData = function (object) {
            var promise = DataAccessService.postData('api/CbtStudentReg/UpdateTwshPhotoData', object);
            return promise;
        };

        this.SetExamSession = function (ExamMonthYearId, TwDate1, TwDate2, ShDate1, ShDate2) {
            var object = { "ExamMonthYearId": ExamMonthYearId, "TwDate1": TwDate1, "TwDate2": TwDate2, "ShDate1": ShDate1, "ShDate2": ShDate2 }
            console.log(object)
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/SetExamSession', object);
            return promise;
        }

        this.getSSCDetails = function (object) {
            var promise = DataAccessService.postData('api/CbtStudentReg/GetSSCDetails', object);
            return promise;
        };
        this.getDistrictInstitutes = function (DistrictId, UserTypeId) {
            var paramObj = { "DistrictId": DistrictId, "UserTypeId": UserTypeId };
            console.log(paramObj)
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetDistrictInstitutes', paramObj);
            return promise;
        };
        this.validateOldPassword = function (UserId) {
            var paramObj = { "UserId": UserId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetOldPassword', paramObj);
            return promise;
        };


        this.GetCertificateData = function (Result, GradeId, UserTypeId, RegNo) {
            var paramObj = { "Result": Result, "GradeId": GradeId, "UserTypeId": UserTypeId, "RegNo": RegNo };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetCertificateData', paramObj);
            return promise;
        };

        this.GetTwshCertificateData = function (RegNo) {
            var paramObj = { "RegNo": RegNo };
            console.log(paramObj)
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetTwshCertificateData', paramObj);
            return promise;
        };

        this.getQualifiedCount = function (userType) {
            var paramObj = { "userType": userType };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getQualifiedCount', paramObj);
            return promise;
        };

        this.getTwshApprovelList = function (userType) {
            var paramObj = { "userType": userType };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getTwshApprovelList', paramObj);
            return promise;
        };
        this.getTwshAuthorizationlList = function (ExamMode, ExamMonthYearId, CbtfromData, CbttoData) {
            var paramObj = {
                "ExamMode": ExamMode, "ExamMonthYearId": ExamMonthYearId, "CbtfromData": CbtfromData,"CbttoData": CbttoData
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getTwshAuthorizationlList', paramObj);
            return promise;
        };

        this.getTwshAuthorizationlListExcel = function (ExamMode, ExamMonthYearId, CbtfromData, CbttoData) {
            var paramObj = {
                "ExamMode": ExamMode, "ExamMonthYearId": ExamMonthYearId, "CbtfromData": CbtfromData, "CbttoData": CbttoData
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getTwshAuthorizationlListExcel', paramObj);
            return promise;
        };

        this.UpdateCertificateData = function (RegNo) {
            var paramObj = { "RegNo": RegNo };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/UpdateCertificateData', paramObj);
            return promise;
        };

        this.getQualifiedList = function (Result, Gradeid) {
            var paramObj = { "Result": Result, "Gradeid": Gradeid };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getQualifiedList', paramObj);
            return promise;
        };

        this.getTwshAuthorizationListDetails = function (ExamMode, collegecode, dataTypeId, ExamMonthYearId,CbtfromData, CbttoData) {
            var paramObj = {
                "ExamMode": ExamMode, "collegecode": collegecode, "dataTypeId": dataTypeId, "ExamMonthYearId": ExamMonthYearId,
                "CbtfromData": CbtfromData, "CbttoData": CbttoData
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getTwshAuthorizationListDetails', paramObj);
            return promise;
        };

    
        this.getTwshApproveListDetails = function (GradeId, datatype, userType) {
            var paramObj = { "GradeId": GradeId, "datatype": datatype, "userType": userType };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/getTwshApproveListDetails', paramObj);
            return promise;
        };

        this.TwshSetApproveStatus = function (RegistrationNo, userType, approvestatus) {
            var paramObj = {
                "RegistrationNo": RegistrationNo, "userType": userType, "approvestatus": approvestatus
            }
            //console.log(paramObj)
            var promise = DataAccessService.postData('api/CbtStudentReg/TwshSetApproveStatus', paramObj);
            return promise;
        };

        this.UpdateTwshSmsStatus = function (RegNo) {
            var paramObject = { "RegNo": RegNo };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/UpdateTwshSmsStatus', paramObject);
            return promise;
        }

        this.TwshSetApproveStatusReject = function (RegnoJSON, userType, approvestatus, remarks) {
            var paramObj = {
                "RegnoJSON": RegnoJSON, "userType": userType, "approvestatus": approvestatus,
                "Remarks": remarks
            }
            var promise = DataAccessService.postData('api/CbtStudentReg/TwshSetApproveStatusReject', paramObj);
            return promise;
        };


        this.getUserTypes = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetUserTypes');
            return promise;
        };



        this.changeUserPassword = function (UserId, UserPassword) {
            var paramObj = { "UserId": UserId, "UserPassword": UserPassword };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/ChangePassword', paramObj);
            return promise;
        };
        this.resetUserPassword = function (UserName, UserPassword) {
            var paramObj = { "UserName": UserName, "UserPassword": UserPassword };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/ResetPassword', paramObj);
            return promise;
        };

        this.getModules = function (UserTypeId) {
            var paramObj = { "UserTypeId": UserTypeId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetModules', paramObj);
            return promise;
        };

        this.getApplicationData = function (ApplicationNumber, DOB) {
            var paramObj = { "ApplicationNumber": ApplicationNumber, "DOB": DOB };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetApplicationDetails', paramObj);
            return promise;
        };

        this.getStudentApplicationData = function (ApplicationNumber) {
            var paramObj = { "ApplicationNumber": ApplicationNumber };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetStudentApplicationDetails', paramObj);
            return promise;
        };
        this.getDetailsByMobileDetails = function (PhoneNumber, DOB) {
            var paramObj = { "PhoneNumber": PhoneNumber, "DOB": DOB };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetDetailsByMobile', paramObj);
            return promise;
        };

        this.getDetailsByMobileNumber = function (PhoneNumber) {
            var paramObj = { "PhoneNumber": PhoneNumber };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetStudentDetailsByMobile', paramObj);
            return promise;
        };


        this.getInstituteReports = function (UserId) {
            var paramObj = { "UserId": UserId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetInstituteReports', paramObj);
            return promise;
        };
        this.getGradewiseReport = function (UserId, GradeId) {
            var paramObj = { "UserId": UserId, "GradeId": GradeId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetGradeWiseCandidateDetails', paramObj);
            return promise;
        };

        this.getFeeNotpaidList = function (UserId, GradeId,datatype) {
            var paramObj = { "UserId": UserId, "GradeId": GradeId, "datatype": datatype};
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetFeeNotpaidList', paramObj);
            return promise;
        };
        this.getApprovedList = function (UserId, CourseId, GradeId, LanguageId, ExamBatch,DataType) {

            var paramObj = { "UserId": UserId, "CourseId": CourseId, "GradeId": GradeId, "LanguageId": LanguageId, "ExamBatch": ExamBatch, "DataType": DataType };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetApprovedList', paramObj);
            return promise;
        };

        this.getExamCenterApplied = function (UserId) {
            var paramObj = { "UserId": UserId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetExamCenterAppliedStudents', paramObj);
            return promise;
        };

        this.getNeedApproveDetails = function (Id) {
            var paramObj = { "Id": Id };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetNeedToApproveDetails', paramObj);
            return promise;
        };



        this.approveDetails = function (ApprovedStatus, Id, examDate, RejectedRemarks, ReleasedRemarks) {
            var paramObj = {
                "ApprovedStatus": ApprovedStatus,
                "Id": Id,
                "examDate": examDate,
                "RejectedRemarks": RejectedRemarks,
                "ReleasedRemarks": ReleasedRemarks
            };
            //console.log(paramObj)


            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/ApproveDetails', paramObj);
            return promise;
        };

        this.RescheduleCbtExamDetails = function (Id, examDate) {
            var paramObj = { "Id": Id, "examDate": examDate };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/RescheduleCbtExamDetails', paramObj);
            return promise;
        };

        this.AbsentExam = function (Id) {
            var paramObj = { "Id": Id };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/AbsentExam', paramObj);
            return promise;
        };

        this.SendAadhaarOtp = function (AadhaarNo) {
            var paramObj = { "AadhaarNo": AadhaarNo };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetOtpAadhaarKyc', paramObj);
            return promise;
        };

        this.VerifyAadhaarOtp = function (AadhaarNo, AadhaarOtp, txnId) {
            var paramObj = { "AadhaarNumber": AadhaarNo, "Otp": AadhaarOtp, "TxnId": txnId };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/DoKyc', paramObj);
            return promise;
        };


        this.SendStudentDetailsASSms = function (Message, CellNo) {
            // var paramobj = { "Message": Message, "CellNo": CellNo };
            var Urlstring = "?User=sbtetts&Passwd=sbtet@1972&Sid=SBTETS&Mobilenumber=91" + CellNo + "&Message=" + Message + "&Mtype=N&DR`=Y";
            var promise = DataAccessService.getDataWithPara('http://api.smscountry.com/SMSCwebservice_bulk.aspx' + Urlstring, "");
            return promise
        };

        this.getCbtStudents = function (UserId, FromDate,ToDate) {
            var paramObj = { "UserId": UserId, "FromDate": FromDate.toString(), "ToDate": ToDate.toString() };
            var promise = DataAccessService.postData('api/CbtStudentReg/GetCbtStudents', paramObj);
            return promise;
        };
        this.getExamStartToken = function (ApplicationNumber) {
            var paramObj = { "ApplicationNumber": ApplicationNumber };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetExamStartToken', paramObj);
            return promise;
        };

        this.GetTwshNRDates = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetTwshNRDates');
            return promise;
        };

        this.AddNRDates = function (DataType, ExamMonthYearId, NRDatesID, NRStartDate, NREndDate,Active,UserName) {
            var paramObj = {
                "DataType": DataType,
                "ExamMonthYearId": ExamMonthYearId,
                "NRDatesID": NRDatesID,
                "NRStartDate": NRStartDate,
                "NREndDate": NREndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/CbtStudentReg/AddorUpdateNRDates', paramObj);
            return promise;
        }

        this.UpdateTwshNRDates = function (DataType, ExamMonthYearId, NRDatesID, NRStartDate, NREndDate,Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "ExamMonthYearId": ExamMonthYearId,
                "NRDatesID": NRDatesID,
                "NRStartDate": NRStartDate,
                "NREndDate": NREndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/CbtStudentReg/AddorUpdateNRDates', paramObj);
            return promise;
        }

        this.GetTwshStudentDetails = function (HallticketNumber) {
            var paramObject = { "HallticketNumber": HallticketNumber };
            return DataAccessService.getDataWithPara('api/CbtStudentReg/GetTwshStudentDetails', paramObject);
        };

        this.GetExaminationCentres = function (DataType) {
            var paramObj = {
                "DataType": DataType
            };
            var promise = DataAccessService.postData('api/CbtStudentReg/GetExaminationCentres', paramObj);
            return promise;
        };

        this.UpdateNewCentre = function (HallTicketNumber,ExamcenterID) {
            var paramObj = {
                "HallTicketNumber": HallTicketNumber,
                "ExamcenterID": ExamcenterID
            }
            var promise = DataAccessService.postData('api/CbtStudentReg/UpdateNewCentre', paramObj);
            return promise;
        };

        this.UpdateNewBatch = function (HallTicketNumber, Batch) {
            var paramObj = {
                "HallTicketNumber": HallTicketNumber,
                "Batch": Batch
            }
            var promise = DataAccessService.postData('api/CbtStudentReg/UpdateNewBatch', paramObj);
            return promise;
        };

        this.GetTwshExamMonthYearbyID = function (AcademicYearID) {
            var paramObj = { "AcademicYearID": AcademicYearID };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetTwshExamMonthYearbyID', paramObj);
            return promise;
        };

        this.GetTwshAcademicYears = function () {
            var promise = DataAccessService.getDataAll('api/CbtStudentReg/GetTwshAcademicYears');
            return promise;
        };


        this.VerifyApplicationDates = function (Mode) {
            var paramObj = {
                "Mode": Mode
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/VerifyApplicationDates', paramObj);

            return promise;

        };

        this.editExamCenters = function (ExaminationCentreID) {
            var paramObj = {
                "ExaminationCentreID": ExaminationCentreID
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/EditTwshExamCentres', paramObj);

            return promise;
        };

        this.GetGradeWiseBatchTimings = function (GradeID, BatchID) {
            var paramObj = {
                "GradeID": GradeID,
                "BatchID": BatchID
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetGradeWiseBatchTimings', paramObj);
            return promise;
        };



        this.RejectSubmitDetails = function (ApprovedStatus, Id, examDate, RejectedRemarks, ReleasedRemarks) {
            var paramObj = {
                "ApprovedStatus": ApprovedStatus,
                "Id": Id,
                "examDate": examDate,
                "RejectedRemarks": RejectedRemarks,
                "ReleasedRemarks": ReleasedRemarks
            };
            var promise = DataAccessService.postData('api/CbtStudentReg/RejectorApproveorReleaseSubmitDetails', paramObj);
            return promise;
        };

        this.ApproveSubmitDetails = function (ApprovedStatus, Id, examDate, RejectedRemarks, ReleasedRemarks) {
            var paramObj = {
                "ApprovedStatus": ApprovedStatus,
                "Id": Id,
                "examDate": examDate,
                "RejectedRemarks": RejectedRemarks,
                "ReleasedRemarks": ReleasedRemarks
            };
            var promise = DataAccessService.postData('api/CbtStudentReg/RejectorApproveorReleaseSubmitDetails', paramObj);
            return promise;
        };
        this.ReleaseSubmitDetails = function (ApprovedStatus, Id, examDate, RejectedRemarks, ReleasedRemarks) {
            var paramObj = {
                "ApprovedStatus": ApprovedStatus,
                "Id": Id,
                "examDate": examDate,
                "RejectedRemarks": RejectedRemarks,
                "ReleasedRemarks": ReleasedRemarks
            };
            var promise = DataAccessService.postData('api/CbtStudentReg/RejectorApproveorReleaseSubmitDetails', paramObj);
            return promise;
        };

        this.GetStudentsRejectedExcel = function (DataType, ExamCenterID) {
            var paramObj = {
                "DataType": DataType,
                "ExamCenterID": ExamCenterID
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetStudentsRejectedExcel', paramObj);
            return promise;
        };


        this.GetStudentBlindListExcel = function (DataType) {
            var paramObj = {
                "DataType": DataType
            };
            var promise = DataAccessService.getDataWithPara('api/CbtStudentReg/GetStudentBlindListExcel', paramObj);
            return promise;
        };

        
    });
});