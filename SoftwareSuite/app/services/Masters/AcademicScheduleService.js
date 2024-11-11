define(['app'], function (app) {
    app.service("AcademicScheduleService", function (DataAccessService) {
        this.AddAcademicSchedule = function (object) {
            var promise = DataAccessService.putData('api/AcademicSchedule/PutAcademicSchedule', object);
            return promise;
        }
        this.UpdateAcademicSchedule = function (object) {
            var promise = DataAccessService.postData('api/AcademicSchedule/PostAcademicSchedule', object);
            return promise;
        }
        this.DeleteAcademicSchedule = function (AcdscheduleID, UpdLoginID) {
            var paramObject = { "AcdscheduleID": AcdscheduleID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/AcademicSchedule/DeleteAcademicSchedule', paramObject);
            return promise;
        }
        this.GetAcademicScheduleList = function () {
            var data = DataAccessService.getDataAll('api/AcademicSchedule/GetAcademicScheduleList');
            return data;
        }
        this.GetAcademicScheduleForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/AcademicSchedule/GetAcademicScheduleForList', paramObject);
            return data;
        }
        this.GetAcademicScheduleByAcdscheduleID = function (AcdscheduleID) {
            var paramObject = { "AcdscheduleID": AcdscheduleID };
            var promise = DataAccessService.getDataWithPara('api/AcademicSchedule/GetAcademicScheduleList', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (AcdscheduleID) {
            var paramObject = { "AcdscheduleID": AcdscheduleID };
            var promise = DataAccessService.getDataWithPara('api/AcademicSchedule/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});