define(['app'], function (app) {
    app.service("ReportService", function (DataAccessService) {
   
        this.GetPinGeneratedReportInfo = function (AcademicId) {
            var paramsobject =  { "AcademicId" : AcademicId };
            var promise = DataAccessService.getDataWithPara('Admission/GetAdmissionStatistics', paramsobject);
            return promise;
        }
        this.GetStudentByPin = function (pin) {
            var paramsobject = { "Pin": pin };
            var promise = DataAccessService.getDataWithPara('Admission/GetStudentByPin', paramsobject);
            return promise;
        }
        this.GetStudentBackLogByPin = function (pin) {
            var paramsobject = { "Pin": pin };
            var promise = DataAccessService.getDataWithPara('Admission/GetStudentBackLogByPin', paramsobject);
            return promise;
        }
        this.GetSudentByAadhaar = function (AadhaarNo) {
            var paramsobject = { "AadhaarNo": AadhaarNo };
            var promise = DataAccessService.getDataWithPara('Admission/GetSudentByAadhaar', paramsobject);
            return promise;
        }
        this.GetStudentByattendeeId = function (AttendeeId) {
            var paramsobject = { "AttendeeId": AttendeeId };
            var promise = DataAccessService.getDataWithPara('Admission/GetStudentByattendeeId', paramsobject);
            return promise;
        }

        this.GetCategory = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetCategory');
            return promise;
        }
        this.GetSpecialCategory = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetSpecialCategory');
            return promise;
        }
        this.GetEducationalQualification = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetEducationalQualification');
            return promise;
        }
        this.GetReligion = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetReligion');
            return promise;
        }
        this.GetRegion = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetRegion');
            return promise;
        }
        this.GetMiniority = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetMiniority');
            return promise;
        }

        this.GetDistricts = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetDistricts');
            return promise;
        }
        this.GetBanks = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetBanks');
            return promise;
        }


        this.GetMandalsForDistrict = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('Admission/GetMandalsForDistrict', paramObject);
            return promise;
        }
        this.GetActiveBranches = function () {
            var promise = DataAccessService.getDataWithPara('Admission/getActiveBranches');
            return promise;
        }
        this.GetActiveSemisters = function () {
            var promise = DataAccessService.getDataWithPara('Admission/getActiveSemisters');
            return promise;
        }
        this.GetSchemes = function () {
            var promise = DataAccessService.getDataWithPara('Admission/getSchemes');
            return promise;
        }
        this.GetIncomeCategory = function () {
            var promise = DataAccessService.getDataWithPara('Admission/getIncomeCategory');
            return promise;
        }
        this.GetSscBoard = function () {
            var promise = DataAccessService.getDataWithPara('Admission/getSscBoard');
            return promise;
        }
        
      

        this.UpdateStudentBacklogMarks = function (marksList) {
            return DataAccessService.postData('AssessmentReports/UpdateStudentBacklogMarks', marksList);
        }
        this.UpdateStudentBacklogMarks = function (marksList) {
            return DataAccessService.postData('AssessmentReports/UpdateStudentBacklogMarks', marksList);
        }

        this.UpdateStudentData = function (params) {           
            //console.log(params);
            var promise = DataAccessService.postData('Assessment/updateStudentDetails', params);
            return promise;
        }
        this.updateMarks = function (marksList) {
            //console.log(params);
            var promise = DataAccessService.postData('AssessmentReports/UpdateStudentMarks', marksList);
            return promise;
        }
        
    });
});
