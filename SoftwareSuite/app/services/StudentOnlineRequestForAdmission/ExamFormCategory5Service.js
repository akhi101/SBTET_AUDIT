define(['app'], function (app) {
    app.service("ExamFormCategory5Service", function (DataAccessService) {
        this.GetPreStudentInfoByHTNOandAckNo = function (ACKNO, CollegeID) {
            var paramObject = { "strHTAndAckNo": ACKNO, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ReqExamFormCategory5/GetPreStudentInfoByHTNOandAckNo', paramObject);
            return promise;
        }
        //Get All Disability Type List
        this.GetDisabilityList = function () {
            var data = DataAccessService.getDataAll('api/ReqPHExemption/GetDisabilityList');
            return data;
        }
        
        //this.UpdateCatfive = function (PreStudRegID, CollegeID) {
        //    var paramObject = { "PreStudRegID": PreStudRegID, "CollegeID": CollegeID };
        //    var promise = DataAccessService.postData('api/ReqExamFormCategory5/PostReqUpdateCatfive', paramObject);
        //    return promise;
        //}
        this.UpdateCatfive = function (object) {
            var promise = DataAccessService.postData('api/ReqExamFormCategory5/PostReqUpdateCatfive', object);
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