define(['app'], function (app) {
    app.service("BasicSpclConsiderationsService", function (DataAccessService) {
        this.AddBasicSpclConsiderations = function (object) {
            var promise = DataAccessService.putData('api/BasicSpclConsiderations/PutBasicSpclConsiderations', object);
            return promise;
        }
        this.PostBasicSpclConsiderations = function (object) {
            var promise = DataAccessService.postData('api/BasicSpclConsiderations/PostBasicSpclConsiderationsInsert', object);
            return promise;
        }
        this.UpdateBasicSpclConsiderations = function (object) {
            var promise = DataAccessService.postData('api/BasicSpclConsiderations/PostBasicSpclConsiderations', object);
            return promise;
        }
        this.DeleteBasicSpclConsiderations = function (SpclConsID, UpdLoginID) {
            var paramObject = { "SpclConsID": SpclConsID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicSpclConsiderations/DeleteBasicSpclConsiderations', paramObject);
            return promise;
        }
        this.GetBasicSpclConsiderationsList = function () {
            var data = DataAccessService.getDataAll('api/BasicSpclConsiderations/GetBasicSpclConsiderationsList');
            return data;
        }

        this.GetBasicSpclConsiderationsForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicSpclConsiderations/GetBasicSpclConsiderationsForList', paramObject);
            return data;
        }
        this.GetBasicSpclConsiderationsById = function (SpclConsID) {
            var paramObject = { "SpclConsID": SpclConsID };
            var promise = DataAccessService.getDataWithPara('api/BasicSpclConsiderations/GetBasicSpclConsiderationsById', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (SpclConsID) {
            var paramObject = { "SpclConsID": SpclConsID };
            var promise = DataAccessService.getDataWithPara('api/BasicSpclConsiderations/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});