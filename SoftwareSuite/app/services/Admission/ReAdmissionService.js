define(['app'], function (app) {
    app.service("ReAdmissionService", function (DataAccessService) {

        this.SetReAdmissionDate = function (StartDate,LastDate) {
            var paramObject = { "StartDate":StartDate,"LastDate": LastDate };
            var data = DataAccessService.getDataWithPara('Admission/SetReAdmissionDate', paramObject);
            return data;
        }
        this.getAcademicYears = function () {
            var promise = DataAccessService.getDataAll('Academic/getAcademicYears');
            return promise;
        }

        this.GetReAdmissionListByCollegeCode = function (CollegeCode) {
            var paramObject = { "collegecode": CollegeCode };
            var data = DataAccessService.getDataWithPara('Admission/GetReAdmissionListByCollegeCode', paramObject);
            return data;
        }
        this.GetReAdmissionListByBranchCode = function (CollegeCode, BranchCode,Semid,AcademicYear,Scheme) {
            var paramObject = { "collegecode": CollegeCode, "BranchCode": BranchCode, "Semid": Semid, "AcademicYear": AcademicYear, "Scheme": Scheme };
            var data = DataAccessService.getDataWithPara('Admission/GetReAdmissionListByBranchCode', paramObject);
            return data;
        }
        this.GetReAdmissionDisplayListBYCollegeCode = function (CollegeCode) {
            var paramObject = { "collegecode": CollegeCode};
            var data = DataAccessService.getDataWithPara('Admission/GetReAdmissionDisplayList', paramObject);
            return data;
        }
        this.RegisterDetainedStudent = function (CollegeCode, AcademicYear, scheme, semid, pin) {
            var paramObject = { "collegecode": CollegeCode, "AcademicYear": AcademicYear, "scheme": scheme, "semid": semid, "pin": pin};
            var data = DataAccessService.postData('Admission/AddDetainedStudent', paramObject);
            return data;
        }
        this.StudentReAdmission = function (CollegeCode, semid, pin) {
            var paramObject = { "collegecode": CollegeCode, "semid": semid, "pin": pin };
            var data = DataAccessService.postData('Admission/ReadmissionOfStudent', paramObject);
            return data;
        }
});
});