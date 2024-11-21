define(['app'], function (app) {
    app.service("PreReqScheduleService", function (DataAccessService) {
        this.AddPreReqSchedule = function (object) {
            var promise = DataAccessService.putData('api/PreReqSchedule/PutPreReqSchedule', object);
            return promise;
        }
        this.UpdatePreReqSchedule = function (object) {
            var promise = DataAccessService.postData('api/PreReqSchedule/PostPreReqSchedule', object);
            return promise;
        }
        this.DeletePreReqSchedule = function (ReqSchID, UpdLoginID) {
            var paramObject = { "ReqSchID": ReqSchID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/PreReqSchedule/DeletePreReqSchedule', paramObject);
            return promise;
        }
        this.GetPreReqScheduleList = function () {
            var data = DataAccessService.getDataAll('api/PreReqSchedule/GetPreReqScheduleList');
            return data;
        }
        this.GetReqStudSerMasterList = function () {
            var data = DataAccessService.getDataAll('api/PreReqSchedule/GetReqStudSerMasterList');
            return data;
        }
        this.GetAcademicYearForRequestScheduleList = function () {
            var data = DataAccessService.getDataAll('api/PreReqSchedule/GetAcademicYearForRequestScheduleList');
            return data;
        }
        this.GetPreReqScheduleForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/PreReqSchedule/GetPreReqScheduleForList', paramObject);
            return data;
        }
        this.GetPreReqScheduleListByID = function (ReqSchID) {
            var paramObject = { "ReqSchID": ReqSchID };
            var promise = DataAccessService.getDataWithPara('api/PreReqSchedule/GetPreReqScheduleByID', paramObject);
            return promise;
        }
        this.GetCheckDatesValidations = function (FromDate,ToDate) {
            var paramObject = { "FromDate": FromDate, "ToDate": ToDate};
            var promise = DataAccessService.getDataWithPara('api/PreReqSchedule/GetCheckDatesValidations', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (ReqSchID) {
            var paramObject = { "ReqSchID": ReqSchID };
            var promise = DataAccessService.getDataWithPara('api/PreReqSchedule/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});