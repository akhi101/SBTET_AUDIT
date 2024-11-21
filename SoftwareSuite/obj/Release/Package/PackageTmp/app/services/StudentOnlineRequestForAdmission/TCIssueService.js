define(['app'], function (app) {
    app.service("TCIssueService", function (DataAccessService) {
        this.GetStudentInfoByAdmNo = function (AdmNo, CollegeID) {
            var paramObject = { "strAdmNo": AdmNo, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ReqTCIssue/GetStudentInfoByAdmNo', paramObject);
            return promise;
        }

        this.GetCandidatePhoto = function (AdmNo, CollegeID) {
            var paramObject = { "strAdmNo": AdmNo, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ReqTCIssue/GetCandidatePhoto', paramObject);
            return promise;
        }

        this.GetReasonList = function () {
            var data = DataAccessService.getDataAll('api/ReqTCIssue/GetReasonList');
            return data;
        }
        this.AddTCIssue = function (object) {
            var promise = DataAccessService.postData('api/ReqTCIssue/PostReqTCIssue', object);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        //check date for current date and futrure.
        this.GetCheckFromTodate = function (FromDate, ToDate) {
            var paramObject = { "FromDate": FromDate, "ToDate": ToDate };
            //var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckFromTodate', paramObject);
            var promise = DataAccessService.getDataWithPara('api/ReqTCIssue/GetCheckFromTodate', paramObject);

            return promise;
        }

         
    });
});

//ghjgjh