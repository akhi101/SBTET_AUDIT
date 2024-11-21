define(['app'], function (app) {
    app.service("PreZoneService", function (DataAccessService) {
        this.AddPreZone = function (object) {
            var promise = DataAccessService.postData('api/PreZone/PostPreZone1', object);
            return promise;
        }
        this.UpdatePreZone = function (object) {
            var promise = DataAccessService.postData('api/PreZone/PostPreZone', object);
            return promise;
        }
        //this.DeletePreZone = function (ZoneID, UpdLoginID, ZoneType) {
        //    var paramObject = { "ZoneID": ZoneID, "UpdLoginID": UpdLoginID, "ZoneType": ZoneType };
        //    var promise = DataAccessService.deleteData('api/PreZone/DeletePreZone', paramObject);
        //    return promise;
        //}
        this.DeletePreZone = function (object) {          
            var promise = DataAccessService.postData('api/PreZone/PostDeletePreZone', object);
            return promise;
        }
        this.GetPreZoneList = function (ExamInstID, ZoneType, DistrictIDs) {
            var paramObject = { "ExamInstID": ExamInstID, "ZoneType": ZoneType, "DistrictIDs": DistrictIDs };
            var data = DataAccessService.getDataWithPara('api/PreZone/GetPreZoneList', paramObject);
            return data;
        }
        this.GetPreZoneById = function (ZoneID, ZoneType) {
            var paramObject = { "ZoneID": ZoneID, "ZoneType": ZoneType };
            var promise = DataAccessService.getDataWithPara('api/PreZone/GetPreZoneById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (ZoneID) {
            var paramObject = { "ZoneID": ZoneID };
            var promise = DataAccessService.getDataWithPara('api/PreZone/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetPreZoneListByDistrictId = function (DistrictID, ExamInstID, ZoneType) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID, "ZoneType": ZoneType };
            var promise = DataAccessService.getDataWithPara('api/PreZone/GetPreZoneListByDistrictId', paramObject);
            return promise;
        }
        this.GetPreZoneListByDistrictIdNew = function (DistrictID, ExamInstID, ZoneType) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID, "ZoneType": ZoneType };
            var promise = DataAccessService.getDataWithPara('api/PreZone/GetPreZoneListByDistrictIdNew', paramObject);
            return promise;
        }
        this.GetPreZoneCollegeCount = function (ExamInstID, ColCode, ZoneType) {
            var paramObject = { "ExamInstID": ExamInstID, "ColCode": ColCode, "ZoneType": ZoneType };
            var promise = DataAccessService.getDataWithPara('api/PreZone/GetPreZoneCollegeCount', paramObject);
            return promise;
        }
        this.GetZoneTotal = function (ZoneID) {
            var paramObject = { "ZoneID": ZoneID };
            var promise = DataAccessService.getDataWithPara('api/PreZone/GetZoneTotal', paramObject);
            return promise;
        }
        this.GetUpdateDioApproval = function (ExamInstID, LoggedUserId, DistrictID, SysUsrGrpID, ReportType) {
            var paramObject = {
                "ExamInstID": ExamInstID, "LoggedUserId": LoggedUserId, "DistrictID": DistrictID, "SysUsrGrpID": SysUsrGrpID, "ZoneType": ReportType};
            var promise = DataAccessService.getDataWithPara('api/PreZone/GetUpdateDioApproval', paramObject);
            return promise;
        }
        this.GetPreZoneBYDistrictIDForSpell = function (DistrictID, ZoneType) {
            var paramObject = { "DistrictID": DistrictID, "ZoneType": ZoneType};
            var promise = DataAccessService.getDataWithPara('api/PreZone/GetPreZoneBYDistrictIDForSpell', paramObject);
            return promise;
        }
        this.GetCheckStreamOfCollege = function (ColCode, CourseID) {
            var paramObject = { "ColCode": ColCode, "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/PreZone/GetCheckStreamOfCollege', paramObject);
            return promise;
        }
        this.GetPreZoneListByDistrictIdWithYearTotal = function (DistrictID, ExamInstID, ZoneType, PresentStr) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID, "ZoneType": ZoneType, "PresentStr": PresentStr};
            var promise = DataAccessService.getDataWithPara('api/PreZone/GetPreZoneListByDistrictIdWithYearTotal', paramObject);
            return promise;
        }
        this.GetPreCheckCenterData = function (ZoneID, CollegeID, ExamInstID,ZoneType) {
            var paramObject = { "ZoneID": ZoneID, "CollegeID": CollegeID, "ExamInstID": ExamInstID, "ZoneType": ZoneType };
            var data = DataAccessService.getDataWithPara('api/PreZone/GetPreCheckCenterData', paramObject);
            return data;
        }
    });
});