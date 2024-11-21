define(['app'], function (app) {
    app.service("EquivalancyCertificateService", function (DataAccessService) {
        this.AddEquivalencyCertificate = function (object) {
            var promise = DataAccessService.postData('api/ReqEquiCert/PostReqEquiCert', object);
            return promise;
        }
        this.UpdateEquivalencyCertificate = function (object) {
            var promise = DataAccessService.postData('api/ReqEquiCert/ReApplyReqEquiCert', object);
            return promise;
        }
        this.DeleteEquivalencyCertificate = function (EquiCertID) {
            var paramObject = { "EquiCertID": EquiCertID };
            var promise = DataAccessService.deleteData('api/ReqEquiCert/DeleteReqEquiCert', paramObject);
            return promise;
        }
        this.GetReqEquiCertByID = function (EquiCertID) {
            var paramObject = { "EquiCertID": EquiCertID };
            var promise = DataAccessService.getDataWithPara('api/ReqEquiCert/GetReqEquiCertByID', paramObject);
            return promise;
        }
        this.GetReqEquiCertByFormNo = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqEquiCert/GetReqEquiCertByFormNo', paramObject);
            return promise;
        }
        this.GetBoardLocationByBoardID = function (BoardID) {
            var paramObject = { "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/BasicBoard/GetBasicBoardByID', paramObject);
            return promise;
        }



        this.GetReqEquiCertByhallTicketAndAcdYrID = function (SSCHallTicket) {
            var paramObject = { "SSCHallTicket": SSCHallTicket };
            var promise = DataAccessService.getDataWithPara('api/ReqEquiCert/GetReqEquiCertByhallTicketAndAcdYrID', paramObject);
            return promise;
        }
        //this.GetAcademicYearFeesByCode = function (FeesCode) {
        //    var paramObject = { "FeesCode": FeesCode };
        //    var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
        //    return promise;
        //}
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetBasicIIYearExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByIIYearCourseID', paramObject);
            return promise;
        }
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
        this.GetBasicBranchList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByCourseID', paramObject);
            return promise;
        }
        this.GetBoardList = function () {
            var data = DataAccessService.getDataAll('api/BasicBoard/GetBasicBoardList');
            return data;
        }
        this.GetAcademicYearFeesByBoardID = function (BoardID, FeeCode) {
            var paramObject = { "BoardID": BoardID, "FeeCode": FeeCode };
            var promise = DataAccessService.getDataWithPara('api/ReqEquiCert/GetAcademicYearFeesByBoardID', paramObject);
            return promise;
        }
        this.GetDataByFormNo = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqEquiCert/GetReApplyDataByFormNo', paramObject);
            return promise;
        }
    });
});