define(['app'], function (app) {
    app.service("BasicSocialReservationService", function (DataAccessService) {
        this.AddBasicSocialReservation = function (object) {
            var promise = DataAccessService.putData('api/BasicSocialReservation/PutBasicSocialReservation', object);
            return promise;
        }
        this.PostBasicSocialReservationInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicSocialReservation/PostBasicSocialReservationInsert', object);
            return promise;
        }
        this.UpdateBasicSocialReservation = function (object) {
            var promise = DataAccessService.postData('api/BasicSocialReservation/PostBasicSocialReservation', object);
            return promise;
        }
        this.DeleteBasicSocialReservation = function (SocResID, UpdLoginID) {
            var paramObject = { "SocResID": SocResID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicSocialReservation/DeleteBasicSocialReservation', paramObject);
            return promise;
        }
        this.GetBasicSocialReservationList = function () {
            var data = DataAccessService.getDataAll('api/BasicSocialReservation/GetBasicSocialReservationList');
            return data;
        }

        this.GetBasicSocialReservationForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicSocialReservation/GetBasicSocialReservationForList', paramObject);
            return data;
        }
        this.GetBasicSocialReservationById = function (SocResID) {
            var paramObject = { "SocResID": SocResID };
            var promise = DataAccessService.getDataWithPara('api/BasicSocialReservation/GetBasicSocialReservationById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (SocResID) {
            var paramObject = { "SocResID": SocResID };
            var promise = DataAccessService.getDataWithPara('api/BasicSocialReservation/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});