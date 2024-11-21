define(['app'], function (app) {
    app.service("ExternalService", function (DataAccessService) {

        this.GetDataForAdmissionDashboard = function (UserId, CollegeId,AcademicYearId) {
            var paramObject = { "UserId": UserId, "CollegeId": CollegeId,AcademicYearId };
            var promise = DataAccessService.getDataWithPara('Admission/GetDataForAdmissionDashboard', paramObject);
            return promise;
        }
        this.GetReAdmissionListByCollegeCode = function (CollegeCode) {
            var paramObject = { "collegecode": CollegeCode };
            var data = DataAccessService.getDataWithPara('Admission/GetReAdmissionListByCollegeCode', paramObject);
            return data;
        }
        this.GetCondonationListByCollegeCode = function (CollegeCode) {
            var paramObject = { "collegecode": CollegeCode };
            var data = DataAccessService.getDataWithPara('Admission/GetReAdmissionListByCollegeCode', paramObject);
            return data;
        }
        this.GetCollegesSchemeSemInfo = function (CollegeId) {
            var paramObject = {"CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('Admission/GetCollegesSchemeSemInfo', paramObject);
            return promise;
        }
        this.GetAcademicYearsActive = function (CollegeId) {
            var paramObject = { "CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('Admission/GetAcademicYearsActive', paramObject);
            return promise;
        }
    });
});