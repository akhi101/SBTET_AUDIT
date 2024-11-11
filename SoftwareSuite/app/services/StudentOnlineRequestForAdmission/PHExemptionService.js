define(['app'], function (app) {
    app.service("PHExemptionService", function (DataAccessService) {
        this.GetPreStudentInfoByAdmNo = function (AdmNo, CollegeID) {
            var paramObject = { "strAdmNo": AdmNo, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ReqPHExemption/GetPreStudentInfoByAdmNo', paramObject);
            return promise;
        }
        //Get All Disability Type List
        this.GetDisabilityList = function () {
            var data = DataAccessService.getDataAll('api/ReqPHExemption/GetDisabilityList');
            return data;
        }
        //Get Student Photo.
        this.GetCandidatePhoto = function (AdmNo, CollegeID) {
            var paramObject = { "strAdmNo": AdmNo, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ReqPHExemption/GetCandidatePhoto', paramObject);
            return promise;
        }
        this.AddPHExemption = function (object) {
            var promise = DataAccessService.postData('api/ReqPHExemption/PostReqPHExemption', object);
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