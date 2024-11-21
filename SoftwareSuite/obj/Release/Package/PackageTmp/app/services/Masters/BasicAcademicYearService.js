define(['app'], function (app) {
    app.service("BasicAcademicYearService", function (DataAccessService) {
        this.AddBasicAcademicYear = function (object) {
            var promise = DataAccessService.putData('api/BasicAcademicYear/PutBasicAcademicYear', object);
            return promise;
        }
        this.UpdateBasicAcademicYear = function (object) {
            var promise = DataAccessService.postData('api/BasicAcademicYear/PostBasicAcademicYear', object);
            return promise;
        }
        this.DeleteBasicAcademicYear = function (AcdYrID, UpdLoginID) {
            var paramObject = { "AcdYrID": AcdYrID, "UpdLoginID": UpdLoginID};
            var promise = DataAccessService.deleteData('api/BasicAcademicYear/DeleteBasicAcademicYear', paramObject);
            return promise;
        }
        this.GetBasicAcademicYearList = function () {
            var data = DataAccessService.getDataAll('api/BasicAcademicYear/GetBasicAcademicYearList');
            return data;
        }
        this.GetBasicAcademicYearForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicAcademicYear/GetBasicAcademicYearForList', paramObject);
            return data;
        }
        this.GetBasicAcademicYearListByID = function (AcdYrID) {
            var paramObject = { "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicAcademicYear/GetBasicAcademicYearListByID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (AcdYrID) {
            var paramObject = { "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicAcademicYear/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});