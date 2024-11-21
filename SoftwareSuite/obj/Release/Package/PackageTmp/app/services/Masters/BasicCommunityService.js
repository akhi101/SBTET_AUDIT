define(['app'], function (app) {
    app.service("BasicCommunityService", function (DataAccessService) {
        this.AddBasicCommunity = function (object) {
            var promise = DataAccessService.putData('api/BasicCommunity/PutBasicCommunity', object);
            return promise;
        }
        this.UpdateBasicCommunity = function (object) {
            var promise = DataAccessService.postData('api/BasicCommunity/PostBasicCommunity', object);
            return promise;
        }
        this.DeleteBasicCommunity = function (CommunityID, UpdLoginID) {
            var paramObject = {"CommunityID": CommunityID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicCommunity/DeleteBasicCommunity', paramObject);
            return promise;
        }
        this.GetBasicCommunityList = function () {
            var data = DataAccessService.getDataAll('api/BasicCommunity/GetBasicCommunityList');
            return data;
        }
		this.GetBasicBasicCommunityByID = function (CommunityID) {
			var paramObject = { "CommunityID": CommunityID };
            var promise = DataAccessService.getDataWithPara('api/BasicCommunity/GetBasicBasicCommunityByID', paramObject);
            return promise;
        }
    });
});