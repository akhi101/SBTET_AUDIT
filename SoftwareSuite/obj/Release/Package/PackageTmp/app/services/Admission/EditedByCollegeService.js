define(['app'], function (app) {
    app.service("EditedByCollegeService", function (DataAccessService) {
        this.PostEditedByCollegeData = function (object) {
            var promise = DataAccessService.postData('api/PreStudentReg/PostEditedByCollegeData', object);
            return promise;
        }
        this.DeleteEditedByCollege = function (PreStudRegID, UpdLoginID) {
            var paramObject = { "PreStudRegID": PreStudRegID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreStudentReg/DeleteEditedByCollege', paramObject);
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
        this.GetStudentRegById = function (PreStudRegID) {
            var paramObject = { "PreStudRegID": PreStudRegID };
            var promise = DataAccessService.getDataWithPara('api/PreStudentReg/GetPrestudentRegListByID', paramObject);
            return promise;
        }
        this.GetDataForEditByCollegeList = function (CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID};
            var promise = DataAccessService.getDataWithPara('api/PreStudentReg/GetDataForEditByCollegeList', paramObject);
            return promise;
        }
    });
});