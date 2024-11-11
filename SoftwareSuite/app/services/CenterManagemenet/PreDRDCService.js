define(['app'], function (app) {
    app.service("PreDRDCService", function (DataAccessService) {
        this.AddPreDRDC = function (object) {
            var promise = DataAccessService.postData('api/PreDRDC/PostInsertPreDRDC', object);
            return promise;
        }
        this.UpdatePreDRDC = function (object) {
            var promise = DataAccessService.postData('api/PreDRDC/PostPreDRDC', object);
            return promise;
        }
        this.DeletePreDRDC = function (DRDCID, UpdLoginID) {
            var paramObject = { "DRDCID": DRDCID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreDRDC/DeletePreDRDC', paramObject);
            return promise;
        }
        this.GetPreDRDCList = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var data = DataAccessService.getDataWithPara('api/PreDRDC/GetPreDRDCList', paramObject);
            return data;
        }
        this.GetPreDRDCById = function (DRDCID) {
            var paramObject = { "DRDCID": DRDCID };
            var promise = DataAccessService.getDataWithPara('api/PreDRDC/GetPreDRDCById', paramObject);
            return promise;
        }
        this.GetPreDRDCListByDistrictId = function (DistrictID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreDRDC/GetPreDRDCListByDistrictId', paramObject);
            return promise;
        }
        this.GetDistrictListByDistCode = function (ExamInstID, DistCode) {
            var paramObject = { "ExamInstID": ExamInstID, "DistCode": DistCode };
            var promise = DataAccessService.getDataWithPara('api/PreDRDC/GetDistrictListByDistCode', paramObject);
            return promise;
        }
    });
});