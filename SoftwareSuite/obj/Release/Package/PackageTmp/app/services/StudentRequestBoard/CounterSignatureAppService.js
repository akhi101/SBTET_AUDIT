define(['app'], function (app) {
    app.service("CounterSignatureAppService", function (DataAccessService) {
        this.UpdateCounterSignatureApp = function (object) {
            var promise = DataAccessService.postData('api/ReqCounterSignature/PostApprovedReqCounterSignature', object);
            return promise;
        }
        this.GetReqCounterSignatureByID = function (CountSignID) {
            var paramObject = { "CountSignID": CountSignID };
            var promise = DataAccessService.getDataWithPara('api/ReqCounterSignature/GetReqCounterSignatureByID', paramObject);
            return promise;
        }
       
        this.FillCounterSignatureAppDetailsList = function (UserGrp, EditData) {
            var paramObject = { "UserGrp": UserGrp, "EditData": EditData };
            var promise = DataAccessService.getDataWithPara('api/ReqCounterSignature/GetCounterSignatureAppDetailsList', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
    });
});