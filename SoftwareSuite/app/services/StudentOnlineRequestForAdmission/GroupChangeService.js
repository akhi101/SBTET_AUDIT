define(['app'], function (app) {
    app.service("GroupChangeService", function (DataAccessService) {
        this.GetStudInfo = function (HTNO, EditYear, EditCourse, CollegeID) {
            var paramObject = { "HTNO": HTNO, "EditYear": EditYear, "EditCourse": EditCourse, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ReqGroupChange/GetStudInfo', paramObject);
            return promise;
        }
        this.GetMainGrpList = function (CollegeID, CourseID, BranchID, MainGrpID, EditYear) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "BranchID": BranchID, "MainGrpID": MainGrpID, "EditYear": EditYear };
            var data = DataAccessService.getDataWithPara('api/ReqGroupChange/GetMainGroupListByYear', paramObject);
            return data;
        }
        this.GetMainGrpDetails = function (EditYear, MainGrpID) {
            var paramObject = { "ExamID": EditYear, "MainGrpIDNew": MainGrpID };
            var data = DataAccessService.getDataWithPara('api/ReqGroupChange/GetMainGrpDetails', paramObject);
            return data;
        }
        this.AddGroupChange = function (object) {
            var promise = DataAccessService.postData('api/ReqGroupChange/PostReqGroupChange', object);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        //this.AddGroupChange = function (object) {
        //    var promise = DataAccessService.putData('api/ReqGroupChange/PutReqGroupChange', object);
        //    return promise;
        //}
        //this.UpdateGroupChange = function (object) {
        //    var promise = DataAccessService.postData('api/ReqGroupChange/PostReqGroupChange', object);
        //    return promise;
        //}
        //this.DeleteGroupChange = function (GrpChngID) {
        //    var paramObject = { "GrpChngID": GrpChngID };
        //    var promise = DataAccessService.deleteData('api/ReqGroupChange/DeleteReqGroupChange', paramObject);
        //    return promise;
        //}
        //this.GetReqGroupChangeByFormNoAndAcdYrID = function (FormNo, AcdYrID) {
        //    var paramObject = { "FormNo": FormNo, "AcdYrID": AcdYrID };
        //    var promise = DataAccessService.getDataWithPara('api/ReqGroupChange/GetReqGroupChangeByFormNoAndAcdYrID', paramObject);
        //    return promise;
        //}
        //this.GetReqGroupChangeByID = function (GrpChngID) {
        //    var paramObject = { "GrpChngID": GrpChngID };
        //    var promise = DataAccessService.getDataWithPara('api/ReqGroupChange/GetReqGroupChangeByID', paramObject);
        //    return promise;
        //}
        //this.GetPreStudentInfo = function (HTNO, AcdYrID) {
        //    var paramObject = { "HTNO": HTNO, "AcdYrID": AcdYrID };
        //    var promise = DataAccessService.getDataWithPara('api/ReqMigrCert/GetPreStudentInfo', paramObject);
        //    return promise;
        //}
        //this.GetBasicAcademicYearListForRequests = function () {
        //    var data = DataAccessService.getDataAll('api/BasicAcademicYear/GetBasicAcademicYearListForRequests');
        //    return data;
        //}
    });
});