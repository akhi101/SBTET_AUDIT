define(['app'], function (app) {
    app.service("BasicCollegeService", function (DataAccessService) {
        this.AddBasicCollege = function (object) {
            var promise = DataAccessService.putData('api/BasicCollege/PutBasicCollege', object);
            return promise;
        }
        this.PostBasicCollegeInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicCollege/PostBasicCoGetPractZoneCollegeListByZonellegeInsert', object);
            return promise;
        }
        this.UpdateBasicCollege = function (object) {
            var promise = DataAccessService.postData('api/BasicCollege/PostBasicCollege', object);
            return promise;
        }
        this.DeleteBasicCollege = function (CollegeID, UpdLoginID) {
            var paramObject = { "CollegeID": CollegeID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicCollege/DeleteBasicCollege', paramObject);
            return promise;
        }
        this.GetBasicCollegeList = function () {
            var data = DataAccessService.getDataAll('api/BasicCollege/GetBasicCollegeList');
            return data;
        }
        this.GetBasicCollegeByCollegeID = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetBasicCollegeByCollegeID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetCollegeListByColCode = function (DistrictID, ExamInstID, ColCode, ZoneType) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID, "ColCode": ColCode, "ZoneType": ZoneType};
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegeListByColCode', paramObject);
            return promise;
        }
        this.GetCollegeListByColCodeForSameMngt = function (DistrictID, ExamInstID, ColCode) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID, "ColCode": ColCode };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegeListByColCodeForSameMngt', paramObject);
            return promise;
        }
        this.GetCollegeListByDistrict = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegeListByDistrict', paramObject);
            return promise;
        }
       

        this.GetPractZoneCollegeListByZoneID = function (PrePractCntrID, ZoneID, DistrictIDs) {
            var paramObject = { "PrePractCntrID": PrePractCntrID, "ZoneID": ZoneID, "DistrictIDs": DistrictIDs };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetPractZoneCollegeListByZoneID', paramObject);
            return promise;
        }
        this.GetPreBridgePractZoneCollegeListByZoneID = function (PrePractCntrID, ZoneID, DistrictIDs) {
            var paramObject = { "PrePractCntrID": PrePractCntrID, "ZoneID": ZoneID, "DistrictIDs": DistrictIDs };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetPreBridgePractZoneCollegeListByZoneID', paramObject);
            return promise;
        }
        this.GetPractVocZoneCollegeListByZoneID = function (PrePractCntrID, ZoneID, DistrictIDs) {
            var paramObject = { "PrePractCntrID": PrePractCntrID, "ZoneID": ZoneID, "DistrictIDs": DistrictIDs };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetPractVocZoneCollegeListByZoneID', paramObject);
            return promise;
        }
        this.GetCollegeListForPracticalCenter = function (DistrictID, ExamInstID, ExamId, CollegeID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID, "ExamId": ExamId, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegeListForPracticalCenter', paramObject);
            return promise;
        }
        this.GetCollegeListByExamId = function (ExamId, ExamInstID, DistrictID) {
            var paramObject = { "ExamId": ExamId, "ExamInstID": ExamInstID, "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegeListByExamId', paramObject);
            return promise;
        }
        this.GetTheroyExamCenterCollegeList = function (DistrictID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetTheroyExamCenterCollegeList', paramObject);
            return promise;
        }

    });
});