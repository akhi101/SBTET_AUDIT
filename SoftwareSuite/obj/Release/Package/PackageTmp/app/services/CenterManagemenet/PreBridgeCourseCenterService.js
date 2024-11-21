define(['app'], function (app) {
    app.service("PreBridgeCourseCenterService", function (DataAccessService) {
        this.AddPreBridgeCourseTheoryCenter = function (object) {
            var promise = DataAccessService.postData('api/PreGeneralCenterBridge/PostInsertPreGeneralCenterBridge', object);
            return promise;
        }
        this.UpdatePreBridgeCourseTheoryCenter = function (object) {
            var promise = DataAccessService.postData('api/PreGeneralCenterBridge/PostPreGeneralCenterBridge', object);
            return promise;
        }
        
        this.GetDeletePreBridgeCourseTheoryCenter = function (PreDistrictCenterBridgeID) {
            var paramObject = { "PreDistrictCenterBridgeID": PreDistrictCenterBridgeID };
            var data = DataAccessService.getDataWithPara('api/PreGeneralCenterBridge/GetDeletePreBridgeCourseTheoryCenter', paramObject);
            return data;
        }
        this.DeletePreBridgeCourseTheoryCenter = function (object) {
            var promise = DataAccessService.postData('api/PreGeneralCenterBridge/PostDeletePreBridgeCourseTheoryCenter', object);
            return promise;
        }
        this.GetCenterCodePresent = function (ColCode, ExamInstID, StrZones) {
            var paramObject = { "ColCode": ColCode, "ExamInstID": ExamInstID, "StrZones": StrZones};
            var data = DataAccessService.getDataWithPara('api/PreGeneralCenterBridge/GetCenterCodePresent', paramObject);
            return data;
        }
        this.AddPreVocationalCenter = function (object) {
            var promise = DataAccessService.postData('api/PreVocationalCenterBridge/PostInsertPreVocationalCenter', object);
            return promise;
        }
        this.UpdatePreVocationalCenter = function (object) {
            var promise = DataAccessService.postData('api/PreVocationalCenterBridge/PostPreVocationalCenter', object);
            return promise;
        }
        this.DeletePreVocationalCenter = function (PreZoneCntrID, UpdLoginID) {
            var paramObject = { "PreZoneCntrID": PreZoneCntrID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreVocationalCenterBridge/DeletePreVocationalCenter', paramObject);
            return promise;
        }
        this.DeletePreBridgeCourseCenterNew = function (object) {           
            var promise = DataAccessService.postData('api/PreVocationalCenterBridge/PostDeletePreBridgeCourseCenterNew', object);
            return promise;
        }
        this.GetPreVocationalCenterList = function (DistrictIDs) {
            var paramObject = { "DistrictIDs": DistrictIDs };
            var data = DataAccessService.getDataWithPara('api/PreVocationalCenterBridge/GetPreVocationalCenterList', paramObject);
            return data;
        }
        this.GetPreVocationalCenterById = function (PreZoneCntrID) {
            var paramObject = { "PreZoneCntrID": PreZoneCntrID };
            var promise = DataAccessService.getDataWithPara('api/PreVocationalCenterBridge/GetPreVocationalCenterById', paramObject);
            return promise;
        }
        this.GetPreVocationalCenterByDistrictId = function (DistrictID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreVocationalCenterBridge/GetPreVocationalCenterByDistrictId', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (PreZoneCntrID) {
            var paramObject = { "PreZoneCntrID": PreZoneCntrID };
            var promise = DataAccessService.getDataWithPara('api/PreVocationalCenterBridge/GetCheckDependancy', paramObject);
            return promise;
        }

        this.PostProcessCenterPractBatchReportChart = function (object) {
            var promise = DataAccessService.postData('api/PreVocationalCenterBridge/PostProcessCenterPractBatchReportChart', object);
            return promise;
        }
        this.GetPreBridgeCourseTheoryCenterList = function (DistrictIDs, ExamInstID) {
            var paramObject = { "DistrictIDs": DistrictIDs, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreGeneralCenterBridge/GetPreBridgeCourseTheoryCenterList', paramObject);
            return promise;
        }
        this.GetPreBridgeCourseTheoryCenterListByID = function (CenterCollegeID, DistrictIDs, ExamInstID, ZoneType) {
            var paramObject = { "CenterCollegeID": CenterCollegeID, "DistrictIDs": DistrictIDs, "ExamInstID": ExamInstID, "ZoneType": ZoneType};
            var promise = DataAccessService.getDataWithPara('api/PreGeneralCenterBridge/GetPreBridgeCourseTheoryCenterListByID', paramObject);
            return promise;
        }
    });
});