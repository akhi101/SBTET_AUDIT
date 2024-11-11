define(['app'], function (app) {
    app.service("MediumChangeService", function (DataAccessService) {
        this.MediumChange = function (object) {
            var promise = DataAccessService.postData('api/ReqMediumChange/PostReqMedChange', object);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        //Anil's
        this.GetPreStudentInfoByHTNO = function (HTNO, CollegeID) {
            var paramObject = { "HTNO": HTNO, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ReqMediumChange/GetPreStudentInfoByHTNO', paramObject);
            return promise;
        }
        //this.GetBasicAcademicYearListForRequests = function () {
        //    var data = DataAccessService.getDataAll('api/BasicAcademicYear/GetBasicAcademicYearListForRequests'); 
        //    return data;
        //}
        this.GetMediumList = function (CollegeID, MainGrpName, MediumID) {
            var paramObject = { "CollegeID": CollegeID, "MainGrpName": MainGrpName, "MediumID": MediumID };
            var data = DataAccessService.getDataWithPara('api/ReqMediumChange/GetBasicMediumListByCollegeIdGrpName', paramObject);
            return data;
        }
    });
});