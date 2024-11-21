define(['app'], function (app) {
    app.service("BlindCondAprovalService", function (DataAccessService) {
        this.GetUpdateBlindCondAproval = function (StudRegID, UpdLoginID) {
            var paramObject = { "StudRegID": StudRegID, "UpdLoginID": UpdLoginID};
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetUpdateBlindCondAproval', paramObject);
            return promise;
        }
        this.GetSubCastListByCasteID = function (CasteId) {
            var paramObject = { "CasteId": CasteId };
            var promise = DataAccessService.getDataWithPara('api/BasicSubCaste/GetSubCastListByCasteID', paramObject);
            return promise;
        }
        this.GetCasteList = function () {
            var data = DataAccessService.getDataAll('api/BasicCaste/GetBasicCasteList');
            return data;
        }
        this.GetStudentRegById = function (StudRegID) {
            var paramObject = { "StudRegID": StudRegID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegById', paramObject);
            return promise;
        }
        this.GetBlindCondAprovalList = function (CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetBlindCondAprovalList', paramObject);
            return promise;
        }
    });
});