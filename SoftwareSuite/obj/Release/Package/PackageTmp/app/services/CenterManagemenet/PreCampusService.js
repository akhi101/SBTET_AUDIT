define(['app'], function (app) {
    app.service("PreCampusService", function (DataAccessService) {
        this.AddPreCampus = function (object) {
            var promise = DataAccessService.postData('api/PreCampus/PostInsertPreCampus', object);
            return promise;
        }
        this.UpdatePreCampus = function (object) {
            var promise = DataAccessService.postData('api/PreCampus/PostPreCampus', object);
            return promise;
        }
        this.DeletePreCampus = function (CampusID, UpdLoginID) { 
            var paramObject = { "CampusID": CampusID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreCampus/DeletePreCampus', paramObject);
            return promise;
        }
        this.GetPreCampusList = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var data = DataAccessService.getDataWithPara('api/PreCampus/GetPreCampusList', paramObject);
            return data;
        }
        this.GetPreCampusListByDRDCId = function (DRDCID) {
            var paramObject = { "DRDCID": DRDCID };
            var data = DataAccessService.getDataWithPara('api/PreCampus/GetPreCampusListByDRDCId', paramObject);
            return data;
        }
        this.GetPreCampusById = function (CampusID) {
            var paramObject = { "CampusID": CampusID };
            var promise = DataAccessService.getDataWithPara('api/PreCampus/GetPreCampusById', paramObject);
            return promise;
        }
        this.GetBasicDistrictsListByDRDCId = function (DRDCID) {
            var paramObject = { "DRDCID": DRDCID };
            var promise = DataAccessService.getDataWithPara('api/PreCampus/GetBasicDistrictsListByDRDCId', paramObject);
            return promise;
        }
        this.GetPreCampusListByDistrictId = function (DistrictID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreCampus/GetPreCampusListByDistrictId', paramObject);
            return promise;
        }
        this.GetCampusListByDistrictID = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/PreCampus/GetCampusListByDistrictID', paramObject);
            return promise;
        }
        
    });
});