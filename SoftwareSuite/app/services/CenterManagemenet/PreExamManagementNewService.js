define(['app'], function (app) {
	app.service("PreExamManagementNewService", function (DataAccessService) {
		this.AddPreExamManagementNew = function (object) {
            var promise = DataAccessService.postData('api/PreExamManagementNew/PostInsertPreExamManagementNew', object);
			return promise;
		}
		this.UpdatePreExamManagementNew = function (object) {
			var promise = DataAccessService.postData('api/PreExamManagementNew/PostPreExamManagementNew', object);
			return promise;
		}
		//this.DeletePreExamManagementNew = function (ExamMgntID, UpdLoginID, ExamInstID) {
		//    var paramObject = { "ExamMgntID": ExamMgntID, "UpdLoginID": UpdLoginID, "ExamInstID": ExamInstID };
		//	var promise = DataAccessService.deleteData('api/PreExamManagementNew/DeletePreExamManagementNew', paramObject);
		//	return promise;
  //      }
        this.DeletePreExamManagementNew = function (object) {             
            var promise = DataAccessService.postData('api/PreExamManagementNew/PostDeletePreExamManagementNew', object);
            return promise;
        }
        this.GetPreExamManagementNewList = function (DistrictIDs, ExamInstID) {
            var paramObject = { "DistrictIDs": DistrictIDs, "ExamInstID": ExamInstID};
            var data = DataAccessService.getDataWithPara('api/PreExamManagementNew/GetPreExamManagementNewList', paramObject);
			return data;
		}
		this.GetPreExamManagementNewListByID = function (ExamMgntID) {
			var paramObject = { "ExamMgntID": ExamMgntID };
			var promise = DataAccessService.getDataWithPara('api/PreExamManagementNew/GetPreExamManagementNewById', paramObject);
			return promise;
		}
		this.GetCheckDependancy = function (ExamMgntID) {
			var paramObject = { "ExamMgntID": ExamMgntID };
			var promise = DataAccessService.getDataWithPara('api/PreExamManagementNew/GetCheckDependancy', paramObject);
			return promise;
        }
        this.GetCollegePresent = function (CollegeID, ExamInstID) {
            var paramObject = { "CollegeID": CollegeID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreExamManagementNew/GetCollegePresent', paramObject);
            return promise;
        }
        this.GetCurretnExamInst = function (AcdYrID) {
            var paramObject = { "AcdYrID": AcdYrID};
            var promise = DataAccessService.getDataWithPara('api/PreExamManagementNew/GetCurretnExamInst', paramObject);
            return promise;
        }
        this.GetPreExamManagementListByDistrictId = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/PreExamManagementNew/GetPreExamManagementListByDistrictId', paramObject);
            return promise;
        }
        this.GetNextLevelApprovalOrNotBySysUsrGrpID = function (DistrictID, SysUsrGrpID, ExamInstID, ZoneType) {
            var paramObject = { "DistrictID": DistrictID, "SysUsrGrpID": SysUsrGrpID, "ExamInstID": ExamInstID, "ZoneType": ZoneType  };
            var promise = DataAccessService.getDataWithPara('api/PreExamManagementNew/GetNextLevelApprovalOrNotBySysUsrGrpID', paramObject);
            return promise;
        }

         
	});
});