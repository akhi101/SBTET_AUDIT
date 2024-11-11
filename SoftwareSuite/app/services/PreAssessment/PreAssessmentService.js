define(['app'], function (app) {
    app.service("PreAssessmentService", function (DataAccessService) {

        this.GetDataForAdmissionDashboard = function (UserId, CollegeId,AcademicYearId) {
            var paramObject = { "UserId": UserId, "CollegeId": CollegeId,AcademicYearId };
            var promise = DataAccessService.getDataWithPara('api/Admission/GetDataForAdmissionDashboard', paramObject);
            return promise;
        }
        this.GetReAdmissionListByCollegeCode = function (CollegeCode) {
            var paramObject = { "collegecode": CollegeCode };
            var data = DataAccessService.getDataWithPara('api/Admission/GetReAdmissionListByCollegeCode', paramObject);
            return data;
        }
        this.GetCondonationListByCollegeCode = function (CollegeCode) {
            var paramObject = { "collegecode": CollegeCode };
            var data = DataAccessService.getDataWithPara('api/Admission/GetReAdmissionListByCollegeCode', paramObject);
            return data;
        }
        this.GetCollegesSchemeSemInfo = function (CollegeId) {
            var paramObject = {"CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('api/Admission/GetCollegesSchemeSemInfo', paramObject);
            return promise;
        }
        this.GetAcademicYearsActive = function (CollegeId) {
            var paramObject = { "CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('api/Admission/GetAcademicYearsActive', paramObject);
            return promise;
        }
    });
});