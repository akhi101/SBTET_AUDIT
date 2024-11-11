define(['app'], function (app) {
    app.service("PreVocationalCenterService", function (DataAccessService) {
        this.AddPreVocationalCenter = function (object) {
            var promise = DataAccessService.postData('api/PreVocationalCenter/PostInsertPreVocationalCenter', object);
            return promise;
        }
        this.UpdatePreVocationalCenter = function (object) {
            var promise = DataAccessService.postData('api/PreVocationalCenter/PostPreVocationalCenter', object);
            return promise;
        }
        this.DeletePreVocationalCenter = function (PreZoneCntrID, UpdLoginID) {
            var paramObject = { "PreZoneCntrID": PreZoneCntrID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreVocationalCenter/DeletePreVocationalCenter', paramObject);
            return promise;
        }
        this.DeletePreVocationalCenterNew = function (object) {
            
            var promise = DataAccessService.postData('api/PreVocationalCenter/PostDeletePreVocationalCenterNew', object);
            return promise;
        }
        this.GetPreVocationalCenterList = function (DistrictIDs) {
            var paramObject = { "DistrictIDs": DistrictIDs};
            var data = DataAccessService.getDataWithPara('api/PreVocationalCenter/GetPreVocationalCenterList', paramObject);
            return data;
        }
        this.GetPreVocationalCenterById = function (PreZoneCntrID) {
            var paramObject = { "PreZoneCntrID": PreZoneCntrID };
            var promise = DataAccessService.getDataWithPara('api/PreVocationalCenter/GetPreVocationalCenterById', paramObject);
            return promise;
        }
        this.GetPreVocationalCenterByDistrictId = function (DistrictID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreVocationalCenter/GetPreVocationalCenterByDistrictId', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (PreZoneCntrID) {
            var paramObject = { "PreZoneCntrID": PreZoneCntrID };
            var promise = DataAccessService.getDataWithPara('api/PreVocationalCenter/GetCheckDependancy', paramObject);
            return promise;
        }

        this.PostProcessCenterPractBatchReportChart = function (object) {
            var promise = DataAccessService.postData('api/PreVocationalCenter/PostProcessCenterPractBatchReportChart', object);
            return promise;
        }
    });
});