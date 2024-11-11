define(['app'], function (app) {
    app.service("PreCampusDRDCAuthoritiesService", function (DataAccessService) {
        this.AddPreCampusDRDCAuthorities = function (object) {
            var promise = DataAccessService.postData('api/PreCampusDRDCAuthorities/PostInsertPreCampusDRDCAuthorities', object);
            return promise;
        }
        this.UpdatePreCampusDRDCAuthorities = function (object) {
            var promise = DataAccessService.postData('api/PreCampusDRDCAuthorities/PostPreCampusDRDCAuthorities', object);
            return promise;
        }
        this.DeletePreCampusDRDCAuthorities = function (DRDCAuthID, UpdLoginID) {
            var paramObject = { "DRDCAuthID": DRDCAuthID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreCampusDRDCAuthorities/DeletePreCampusDRDCAuthorities', paramObject);
            return promise;
        }
        this.GetPreCampusDRDCAuthoritiesList = function () {
            var data = DataAccessService.getDataWithPara('api/PreCampusDRDCAuthorities/GetPreCampusDRDCAuthoritiesList');
            return data;
        }
        this.GetPreCampusDRDCAuthoritiesById = function (DRDCAuthID) {
            var paramObject = { "DRDCAuthID": DRDCAuthID };
            var promise = DataAccessService.getDataWithPara('api/PreCampusDRDCAuthorities/GetPreCampusDRDCAuthoritiesById', paramObject);
            return promise;
        }
        this.GetPreCampusDRDCAuthoritiesListByDistrictId = function (DistrictID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreCampusDRDCAuthorities/GetPreCampusDRDCAuthoritiesListByDistrictId', paramObject);
            return promise;
        }
        this.GetDistrictListByDistCode = function (ExamInstID, DistCode) {
            var paramObject = { "ExamInstID": ExamInstID, "DistCode": DistCode };
            var promise = DataAccessService.getDataWithPara('api/PreCampusDRDCAuthorities/GetDistrictListByDistCode', paramObject);
            return promise;
        }
    });
});