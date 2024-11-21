define(['app'], function (app) {
	app.service("BasicMainGroupService", function (DataAccessService) {
		this.AddBasicMainGroup = function (object) {
			var promise = DataAccessService.putData('api/BasicMainGroup/PutBasicMainGroup', object);
            return promise;
        }
        this.PostBasicMainGroupInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicMainGroup/PostBasicMainGroupInsert', object);
            return promise;
        }
		this.UpdateBasicMainGroup = function (object) {
            var promise = DataAccessService.postData('api/BasicMainGroup/PostBasicMainGroup', object);
            return promise;
        }
		this.DeleteBasicMainGroup = function (MainGrpID, UpdLoginID) {
            var paramObject = { "MainGrpID": MainGrpID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicMainGroup/DeleteBasicMainGroup', paramObject);
            return promise;
        }
        this.GetBasicMainGroupList = function () {
			var data = DataAccessService.getDataAll('api/BasicMainGroup/GetBasicMainGroupList');
            return data;
        }
        this.GetBasicMainGroupListForVocationalPractical = function (PrePractCntrID) {
            var paramObject = { "PrCentreID": PrePractCntrID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicMainGroupListForVocationalPractical', paramObject);
            return promise;
        }
        this.GetBasicMainGroupById = function (MainGrpID) {
            var paramObject = { "MainGrpID": MainGrpID };
			var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicMainGroupByID', paramObject);
            return promise;
		}
		this.GetBasicMainGroupListByExamIDAndBranchID = function (ExamID, BranchID) {
			var paramObject = { "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicMainGroupListByExamIDAndBranchID', paramObject);
			return promise;
        }
        this.GetMainGroupListByCourseID = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListByCourseID', paramObject);
            return promise;
        }
        this.GetMainGroupListByCourseIDBranchID = function (CourseID, BranchID) {
            var paramObject = { "CourseID": CourseID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListByCourseIDBranchID', paramObject);
            return promise;
        }
        this.GetMainGroupListByCourseIDForSubjectPacket = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListByCourseIDForSubjectPacket', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (MainGrpID) {
            var paramObject = { "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetMainGroupListByCollegeId = function (CollegeID, CourseID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetMainGroupListByCollegeId', paramObject);
            return promise;
        }
        this.GetGroupListForVocationalPracticalExaminerMobileUpdate = function () {
            //var paramObject = { "CourseID": CourseID, "BranchID": BranchID };
            var promise = DataAccessService.getDataAll('api/BasicMainGroup/GetGroupListForVocationalPracticalExaminerMobileUpdate');
            return promise;
        }
    });
});