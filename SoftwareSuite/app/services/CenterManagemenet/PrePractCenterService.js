define(['app'], function (app) {
    app.service("PrePractCenterService", function (DataAccessService) {
        this.AddPrePractCenter = function (object) {
            var promise = DataAccessService.postData('api/PrePractCenter/PostInsertPrePractCenter', object);
            return promise;
        }
        this.UpdatePrePractCenter = function (object) {
            var promise = DataAccessService.postData('api/PrePractCenter/PostPrePractCenter', object);
            return promise;
        }
        this.DeletePrePractCenter = function (PrePractCntrID, UpdLoginID) {
            var paramObject = { "PrePractCntrID": PrePractCntrID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PrePractCenter/DeletePrePractCenter', paramObject);
            return promise;
        }
        this.DeletePrePractCenterNew = function (object) {            
            var promise = DataAccessService.postData('api/PrePractCenter/PostDeletePrePractCenterNew', object);
            return promise;
        }
        this.GetPrePractCenterList = function (DistrictIDs) {
            var paramObject = { "DistrictIDs": DistrictIDs};
            var data = DataAccessService.getDataWithPara('api/PrePractCenter/GetPrePractCenterList', paramObject);
            return data;
        }
        this.GetPrePractCenterListForGeography = function (DistrictIDs) {
            var paramObject = { "DistrictIDs": DistrictIDs };
            var data = DataAccessService.getDataWithPara('api/PrePractCenter/GetPrePractCenterListForGeography', paramObject);
            return data;
        }
        this.GetPrePractCenterById = function (PrePractCntrID) {
            var paramObject = { "PrePractCntrID": PrePractCntrID };
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetPrePractCenterById', paramObject);
            return promise;
        }
        this.GetBridgeVocationalPracticalCenterList = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetBridgeVocationalPracticalCenterList', paramObject);
            return promise;
        }
        this.GetPrePractCenterByDistrictId = function (DistrictID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetPrePractCenterByDistrictId', paramObject);
            return promise;
        }
        this.GetPrePractCenterByDistrictIdForAppointment = function (DistrictID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetPrePractCenterByDistrictIdForAppointment', paramObject);
            return promise;
        }
        this.GetPrePractCenterByDistrictIdByZoneID = function (DistrictID, ExamInstID, ZoneID, ZoneType) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID, "ZoneID": ZoneID, "ZoneType": ZoneType };
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetPrePractCenterByDistrictIdByZoneID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (PrePractCntrID) {
            var paramObject = { "PrePractCntrID": PrePractCntrID };
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetCheckDependancy', paramObject);
            return promise;
        }

        this.PostProcessCenterPractBatchReportChart = function (object) {
            var promise = DataAccessService.postData('api/PrePractCenter/PostProcessCenterPractBatchReportChart', object);
            return promise;
        }
        this.GetPrePractCenterByDistrictIdANDZoneID = function (DistrictID,ZoneID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ZoneID": ZoneID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetPrePractCenterByDistrictIdANDZoneID', paramObject);
            return promise;
        }
        this.GetVocPrePractCenterByDistrictIdANDZoneID = function (DistrictID, ZoneID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ZoneID": ZoneID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetVocPrePractCenterByDistrictIdANDZoneID', paramObject);
            return promise;
        }
        this.GetGenPrePractandVocCenterListForUpdate = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetGenPrePractandVocCenterListForUpdate', paramObject);
            return promise;
        }
        this.GetCollegeAsPracticalCenter = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetCollegeAsPracticalCenter', paramObject);
            return promise;
        }
        this.GetPracticalCenterListByDistrictIDANDZoneType = function (ExamInstID, ZoneType, DistrictID) {
            var paramObject = { "ExamInstID": ExamInstID, "ZoneType": ZoneType, "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetPracticalCenterListByDistrictIDANDZoneType', paramObject);
            return promise;
        }
        this.GetPracticalCenterListForSpell = function (ExamInstID, ZoneType) {
            var paramObject = { "ExamInstID": ExamInstID, "ZoneType": ZoneType};
            var promise = DataAccessService.getDataWithPara('api/PrePractCenter/GetPracticalCenterListForSpell', paramObject);
            return promise;
        }



        
        this.GetExamineForVocationalPractical = function (DistrictID, MainGrpID) {
            var paramObject = { "DistrictID": DistrictID, "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/PracticalTimeTable/GetExamineForVocationalPractical', paramObject);
            return promise;
        }
        this.GetExamineForVocationalPracticalForBridge = function (DistrictID, ExmSubID) {
            var paramObject = { "DistrictID": DistrictID, "ExmSubID": ExmSubID };
            var promise = DataAccessService.getDataWithPara('api/PracticalTimeTable/GetExamineForVocationalPracticalForBridge', paramObject);
            return promise;
        }
        this.GetExamineForVocationalPracticalForGeo = function (DistrictID, ExmSubID) {
            var paramObject = { "DistrictID": DistrictID, "ExmSubID": ExmSubID };
            var promise = DataAccessService.getDataWithPara('api/PracticalTimeTable/GetExamineForVocationalPracticalForGeo', paramObject);
            return promise;
        }
        this.GetBatchListForVocationalPractical = function (DistrictID, MainGrpID, PrePractCntrID, ExamID, ExamInstID) {
            var paramObject = {
                "DistrictID": DistrictID, "MainGrpID": MainGrpID, "PrePractCntrID": PrePractCntrID, "ExamID": ExamID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PracticalTimeTable/GetBatchListForVocationalPractical', paramObject);
            return promise;
        }
        this.GetBatchListForVocationalPracticalForBridge = function (DistrictID, ExmSubID, PrePractCntrID, ExamID, ExamInstID) {
            var paramObject = {
                "DistrictID": DistrictID, "ExmSubID": ExmSubID, "PrePractCntrID": PrePractCntrID, "ExamID": ExamID, "ExamInstID": ExamInstID
            };
            var promise = DataAccessService.getDataWithPara('api/PracticalTimeTable/GetBatchListForVocationalPracticalForBridge', paramObject);
            return promise;
        }
        this.GetBatchListForVocationalPracticalForGeo = function (DistrictID, ExmSubID, PrePractCntrID, ExamID, ExamInstID) {
            var paramObject = {
                "DistrictID": DistrictID, "ExmSubID": ExmSubID, "PrePractCntrID": PrePractCntrID, "ExamID": ExamID, "ExamInstID": ExamInstID
            };
            var promise = DataAccessService.getDataWithPara('api/PracticalTimeTable/GetBatchListForVocationalPracticalForGeo', paramObject);
            return promise;
        }
        this.postPreVocPracticalBatchsEntry = function (object) {
            var promise = DataAccessService.postData('api/PracticalTimeTable/postPreVocPracticalBatchsEntry', object);
            return promise;
        }
        
        this.getExamTimeTableSubjectListByExamIDBranchIDForBridge = function () {
            var paramObject = {
                "ExamID": 4, "BranchID": 3, "ExamInstID": 0
            };
            var promise = DataAccessService.getDataWithPara('api/PracticalEntry/getExamTimeTableSubjectListByExamIDBranchIDForBridge', paramObject);
            return promise;
        }
        this.GetExamTimeTableSubjectListByExamIDBranchIDForGeo = function () {
            var paramObject = {
                "ExamID": 2, "BranchID": 3, "ExamInstID": 0
            };
            var promise = DataAccessService.getDataWithPara('api/PracticalEntry/GetExamTimeTableSubjectListByExamIDBranchIDForGeo', paramObject);
            return promise;
        }
    });
});