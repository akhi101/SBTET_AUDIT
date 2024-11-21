define(['app'], function (app) {
	app.service("BasicReligionService", function (DataAccessService) {
        this.AddBasicReligion = function (object) {
            var promise = DataAccessService.putData('api/BasicReligion/PutBasicReligion', object);
            return promise;
        }
        this.UpdateBasicReligion = function (object) {
            var promise = DataAccessService.postData('api/BasicReligion/PostBasicReligion', object);
            return promise;
        }
        this.DeleteBasicReligion = function (ReligionID,UpdLoginID ) {
            var paramObject = {
                "ReligionID": ReligionID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicReligion/DeleteBasicReligion', paramObject);
            return promise;
        }
        this.GetBasicReligionList = function () {
            var data = DataAccessService.getDataAll('api/BasicReligion/GetBasicReligionList');
            return data;
        }
        this.GetBasicReligionByReligionID = function (ReligionID) {
            var paramObject = { "ReligionID": ReligionID };
            var promise = DataAccessService.getDataWithPara('api/BasicReligion/GetBasicReligionByReligionID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (ReligionID) {
            var paramObject = { "ReligionID": ReligionID };
            var promise = DataAccessService.getDataWithPara('api/BasicReligion/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});