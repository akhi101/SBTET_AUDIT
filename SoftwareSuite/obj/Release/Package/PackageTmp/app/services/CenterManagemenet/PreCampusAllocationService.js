define(['app'], function (app) {
    app.service("PreCampusAllocationService", function (DataAccessService) {
        this.AddPreCampusAllocation = function (object) {
            var promise = DataAccessService.postData('api/PreCampusAllocation/PostInsertPreCampusAllocation', object);
            return promise;
        }
        this.UpdatePreCampusAllocation = function (object) {
            var promise = DataAccessService.postData('api/PreCampusAllocation/PostPreCampusAllocation', object);
            return promise;
        }
        this.DeletePreCampusAllocation = function (CampusCenterID, UpdLoginID) {
            var paramObject = { "CampusCenterID": CampusCenterID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreCampusAllocation/DeletePreCampusAllocation', paramObject);
            return promise;
        }
        this.GetPreCampusAllocationList = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var data = DataAccessService.getDataWithPara('api/PreCampusAllocation/GetPreCampusAllocationList', paramObject);
            return data;
        }
        this.GetPreCampusAllocationById = function (CampusCenterID) {
            var paramObject = { "CampusCenterID": CampusCenterID };
            var promise = DataAccessService.getDataWithPara('api/PreCampusAllocation/GetPreCampusAllocationById', paramObject);
            return promise;
        }
        this.GetPreCampusAllocationListByDistrictId = function (DistrictID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreCampusAllocation/GetPreCampusAllocationListByDistrictId', paramObject);
            return promise;
        }
        this.GetDistrictListByDistCode = function (ExamInstID, DistCode) {
            var paramObject = { "ExamInstID": ExamInstID, "DistCode": DistCode };
            var promise = DataAccessService.getDataWithPara('api/PreCampusAllocation/GetDistrictListByDistCode', paramObject);
            return promise;
        }
    });
});