define(['app'], function (app) {
    app.service("PreZoneCenterService", function (DataAccessService) {
        this.AddPreZoneCenter = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostInsertPreZoneCenterList', object);
            return promise;
        }
        this.UpdatePreZoneCenter = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostPreZoneCenter', object);
            return promise;
        }
        this.PostAttachCenterToCollege = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostAttachCenterToCollege', object);
            return promise;
        }
        this.DeletePreZoneCenter = function (PreZoneCntrID, UpdLoginID) {
            var paramObject = { "PreZoneCntrID": PreZoneCntrID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreZoneCenter/DeletePreZoneCenter', paramObject);
            return promise;
        }
        this.GetPreZoneCenterList = function () {
            var data = DataAccessService.getDataAll('api/PreZoneCenter/GetPreZoneCenterList');
            return data;
        }
        this.GetPreZoneClgList = function (ZoneID) {
            var paramObject = { "ZoneID": ZoneID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetPreZoneClgList', paramObject);
            return promise;
        }
        this.GetPreZoneCollege = function (ZoneID, PreZoneCntrID) {
            var paramObject = { "ZoneID": ZoneID, "PreZoneCntrID": PreZoneCntrID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetPreZoneCollege', paramObject);
            return promise;
        }
        this.GetPreZoneCenterCount = function (PreZoneCntrID, UpdLoginID) {
            var paramObject = { "PreZoneCntrID": PreZoneCntrID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetPreZoneCenterCount', paramObject);
            return promise;
        }
        this.GetPreZoneCenter = function (ZoneID) {
            var paramObject = { "ZoneID": ZoneID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetPreZoneCenter', paramObject);
            return promise;
        }
        this.GetPreZoneCenterById = function (PreZoneCntrID) {
            var paramObject = { "PreZoneCntrID": PreZoneCntrID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetPreZoneCenterById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (PreZoneCntrID) {
            var paramObject = { "PreZoneCntrID": PreZoneCntrID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetBasicCollegeListForPreZoneCenter = function (PreZoneCntrID) {
            var paramObject = { "PreZoneCntrID": PreZoneCntrID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetBasicCollegeListForPreZoneCenter', paramObject);
            return promise;
        }
        this.GetCollegesCenterAccocateNotAllocatedList = function (ZoneID, FlagCenter) {
            var paramObject = { "ZoneID": ZoneID, "FlagCenter": FlagCenter };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetCollegesCenterAccocateNotAllocatedList', paramObject);
            return promise;
        }
        this.GetCenterListForAttachCollegeToPreZone = function (ZoneID) {
            var paramObject = { "ZoneID": ZoneID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetCenterListForAttachCollegeToPreZone', paramObject);
            return promise;
        }
        this.GetPreZoneCenterClgList = function (DistrictID, ColCode, ZoneID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ColCode": ColCode, "ZoneID": ZoneID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetPreZoneCenterClgList', paramObject);
            return promise;
        }
        this.GetPreZoneCenterName = function (DistrictID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetPreZoneCenterName', paramObject);
            return promise;
        }
        this.CentertoCollegeAllocationProcess = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostCentertoCollegeAllocationProcess', object);
            return promise;
        }
        this.CenterToStudentAllocationProcess = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostCenterToStudentAllocationProcess', object);
            return promise;
        }
        this.PracticalCenterAllocationProcess = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostPracticalCenterAllocationProcess', object);
            return promise;
        }
        this.PracticalCenterAllocationVocProcess = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostPracticalCenterAllocationVocProcess', object);
            return promise;
        }
        this.PostPracticalCenterAllocationProcessGeography = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostPracticalCenterAllocationProcessGeography', object);
            return promise;
        }
        this.PostPracticalCenterAllocationProcessBridge = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostPracticalCenterAllocationProcessBridge', object);
            return promise;
        }

        this.HallTicketNoGenerationProcess = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostHallTicketNoGenerationProcess', object);
            return promise;
        }
        this.CenterPracticalBatchCreationProcess = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostCenterPracticalBatchCreationProcess', object);
            return promise;
        }
        this.CenterPracticalBatchCreationVocProcess = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostCenterPracticalBatchCreationVocProcess', object);
            return promise;
        }
        this.GetPreCenterCollegeCount = function (ExamInstID, ColCode) {
            var paramObject = { "ExamInstID": ExamInstID, "ColCode": ColCode };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetPreCenterCollegeCount', paramObject);
            return promise;
        }
        this.PreparationofResultsProcess = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostPreparationofResultsProcess', object);
            return promise;
        }
        this.GetPreCentreAuthData = function (ExamInstID, LoggedUserId, DistrictID, UserGroupId, ReportType) {
            var paramObject = { "ExamInstID": ExamInstID, "LoggedUserId": LoggedUserId, "DistrictID": DistrictID, "UserGroupId": UserGroupId, "ZoneType": ReportType };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetPreCentreAuthData', paramObject);
            return promise;
        }
        this.GetPreCentreAuthDigiSign = function (ExamInstID, LoggedUserId, DistrictID, ReportType) {
            var paramObject = { "ExamInstID": ExamInstID, "LoggedUserId": LoggedUserId, "DistrictID": DistrictID, "ZoneType": ReportType };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetPreCentreAuthDigiSign', paramObject);
            return promise;
        }
        this.GetUpdatePreCenterAuth = function (ApprovalFlg, Remark, ExamInstID, LoggedUserId, DistrictID, UserGroupId, CurrentUserGroupId, ReportType) {
            var paramObject = {
                "ApprovalFlg": ApprovalFlg, "Remark": Remark, "ExamInstID": ExamInstID, "LoggedUserId": LoggedUserId, "DistrictID": DistrictID,
                "UserGroupId": UserGroupId, "CurrentUserGroupId": CurrentUserGroupId, "ZoneType": ReportType
            };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetUpdatePreCenterAuth', paramObject);
            return promise;
        }
        this.PostProcessCenterPractBatch = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostProcessCenterPractBatch', object);
            return promise;
        }
        this.PostProcessCenterPractBatchVoc = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostProcessCenterPractBatchVoc', object);
            return promise;
        }
        this.PostProcessCenterPractBatchGeography = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostProcessCenterPractBatchGeography', object);
            return promise;
        }
        this.PostProcessCenterPractBatchBridge = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCenter/PostProcessCenterPractBatchBridge', object);
            return promise;
        }
        this.GetPreZoneListByDistrictId = function (DistrictID, ExamInstID, ZoneType) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID, "ZoneType": ZoneType };
            var promise = DataAccessService.getDataWithPara('api/PreZone/GetPreZoneListByDistrictId', paramObject);
            return promise;
        }
        this.GetCenterInfoInCenterZone = function (ColCode, DistrictID,ExamInstID) {
            var paramObject = { "ColCode": ColCode, "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetCenterInfoInCenterZone', paramObject);
            return promise;
        }
        this.GetZoneDetailsPDF = function (DistrictID, ExamInstID, ReportType) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID, "ReportType": ReportType };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetZoneDetailsPDF', paramObject);
            return promise;
        }
        this.GetPracticalBatchStudentList = function (ExamInstID, ExmSubID, PrePractCntrID, BatchNo) {
            var paramObject = { "ExamInstID": ExamInstID, "ExmSubID": ExmSubID, "PrePractCntrID": PrePractCntrID, "BatchNo": BatchNo };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCenter/GetPracticalBatchStudentList', paramObject);
            return promise;
        }
    });
});