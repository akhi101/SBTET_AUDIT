define(['app'], function (app) {
    app.service("PreZoneCollegeService", function (DataAccessService) {
        this.AddPreZoneCollege = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCollege/PostInsertPreZoneCollegeList', object);
            return promise;
        }
        this.UpdatePreZoneCollege = function (object) {
            var promise = DataAccessService.postData('api/PreZoneCollege/PostPreZoneCollege', object);
            return promise;
        }
        this.DeletePreZoneCollege = function (PreZoneColID, UpdLoginID) {
            var paramObject = { "PreZoneColID": PreZoneColID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreZoneCollege/DeletePreZoneCollege', paramObject);
            return promise;
        }
        this.GetPreZoneCollegeList = function () {
            var data = DataAccessService.getDataAll('api/PreZoneCollege/GetPreZoneCollegeList');
            return data;
        }
        this.GetPreZoneCollegeById = function (PreZoneColID) {
            var paramObject = { "PreZoneColID": PreZoneColID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCollege/GetPreZoneCollegeById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (PreZoneColID) {
            var paramObject = { "PreZoneColID": PreZoneColID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCollege/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetBasicCollegeListForPreZoneCollege = function (DistrictID, MandalID,PreZoneID) {
            var paramObject = { "DistrictID": DistrictID, "MandalID": MandalID,"PreZoneID": PreZoneID };
            var promise = DataAccessService.getDataWithPara('api/PreZoneCollege/GetBasicCollegeListForPreZoneCollege', paramObject);
            return promise;
        }
    });
}); 