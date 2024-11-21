define(['app'], function (app) {
    app.service("BasicMarksEntrScheduleService", function (DataAccessService) {
        this.AddMarkEntryScheduleSchedule = function (object) {
            var promise = DataAccessService.putData('api/MarkEntrySchedule/PutMarkEntrySchedule', object);
            return promise;
        }
        this.PostMarkEntryScheduleInsert = function (object) {
            var promise = DataAccessService.postData('api/MarkEntrySchedule/PostMarkEntryScheduleInsert', object);
            return promise;
        }
        this.PostOtherMarkEntryScheduleInsert = function (object) {
            var promise = DataAccessService.postData('api/MarkEntrySchedule/PostOtherMarkEntryScheduleInsert', object);
            return promise;
        }
        this.PostVocBridgePracticalMarkEntryScheduleInsert = function (object) {
            var promise = DataAccessService.postData('api/MarkEntrySchedule/PostVocBridgePracticalMarkEntryScheduleInsert', object);
            return promise;
        }
        this.UpdateMarkEntrySchedule = function (object) {
            var promise = DataAccessService.postData('api/MarkEntrySchedule/PostMarkEntrySchedule', object);
            return promise;
        }
        this.DeleteMarkEntrySchedule = function (MarkEntrSchID, UpdLoginID) {
            var paramObject = { "MarkEntrSchID": MarkEntrSchID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/MarkEntrySchedule/DeleteMarkEntrySchedule', paramObject);
            return promise;
        }
        this.GetDeleteMarkEntrySchedule = function (MarkEntrSchID, UpdLoginID) {
            var paramObject = { "MarkEntrSchID": MarkEntrSchID, "UpdLoginID": UpdLoginID };
            var data = DataAccessService.getDataWithPara('api/MarkEntrySchedule/GetDeleteMarkEntrySchedule', paramObject);
            return data;
        }
        this.GetMarkEntryScheduleList = function () {
            var data = DataAccessService.getDataAll('api/MarkEntrySchedule/GetMarkEntryScheduleList');
            return data;
        }
        this.GetOtherMarkEntryScheduleForList = function () {
            var data = DataAccessService.getDataAll('api/MarkEntrySchedule/GetOtherMarkEntryScheduleForList');
            return data;
        }
        this.GetMarkEntryScheduleListByExmSchType = function (ExmSchType) {
            var paramObject = { "ExmSchType": ExmSchType };
            var data = DataAccessService.getDataWithPara('api/MarkEntrySchedule/GetMarkEntryScheduleListByExmSchType', paramObject);
            return data;
        }
        this.GetCheckDuplicateEntryOfSchedule = function (ExamID, ExamInstID, ExmSchType) {
            var paramObject = { "ExamID": ExamID, "ExamInstID": ExamInstID, "ExmSchType": ExmSchType };
            var data = DataAccessService.getDataWithPara('api/MarkEntrySchedule/GetCheckDuplicateEntryOfSchedule', paramObject);
            return data;
        }
        this.GetDeletePrePracCenterSchedule = function (PrePracScheID, UpdLoginID) {
            var paramObject = { "PrePracScheID": PrePracScheID, "UpdLoginID": UpdLoginID };
            var data = DataAccessService.getDataWithPara('api/MarkEntrySchedule/GetDeletePrePracCenterSchedule', paramObject);
            return data;
        }
        this.GetVocBridgeDeletePrePracCenterSchedule = function (PrePracScheID, UpdLoginID) {
            var paramObject = { "PrePracScheID": PrePracScheID, "UpdLoginID": UpdLoginID };
            var data = DataAccessService.getDataWithPara('api/MarkEntrySchedule/GetVocBridgeDeletePrePracCenterSchedule', paramObject);
            return data;
        }
        this.GetMarkEntryScheduleForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/MarkEntrySchedule/GetMarkEntryScheduleForList', paramObject);
            return data;
        }
        this.GetMarkEntryScheduleListByID = function (MarkEntrSchID) {
            var paramObject = { "MarkEntrSchID": MarkEntrSchID };
            var promise = DataAccessService.getDataWithPara('api/MarkEntrySchedule/GetMarkEntryScheduleListByID', paramObject);
            return promise;
        }
        this.GetPracticalEntryScheduleList = function () {
            var promise = DataAccessService.getDataAll('api/MarkEntrySchedule/GetPracticalEntryScheduleList');
            return promise;
        }
        this.GetPracticalEntryScheduleListByID = function (PrePracScheID) {
            var paramObject = { "PrePracScheID": PrePracScheID };
            var promise = DataAccessService.getDataWithPara('api/MarkEntrySchedule/GetPracticalEntryScheduleListByID', paramObject);
            return promise;
        }
        this.GetVocBridgePracticalEntryScheduleList = function () {
            var promise = DataAccessService.getDataAll('api/MarkEntrySchedule/GetVocBridgePracticalEntryScheduleList');
            return promise;
        }
        this.GetVocBridgePracticalEntryScheduleListByID = function (PrePracScheID) {
            var paramObject = { "PrePracScheID": PrePracScheID };
            var promise = DataAccessService.getDataWithPara('api/MarkEntrySchedule/GetVocBridgePracticalEntryScheduleListByID', paramObject);
            return promise;
        }
        this.PostCheckDatesValidations = function (object) {
            var promise = DataAccessService.postData('api/MarkEntrySchedule/PostCheckDatesValidations', object);
            return promise;
        }
        this.PostPracticalMarkEntryScheduleInsert = function (object) {
            var promise = DataAccessService.postData('api/MarkEntrySchedule/PostPracticalMarkEntryScheduleInsert', object);
            return promise;
        }
        this.PostPracticalMarkEntrySchedule = function (object) {
            var promise = DataAccessService.postData('api/MarkEntrySchedule/PostPracticalMarkEntrySchedule', object);
            return promise;
        }
        this.DeletePrePracCenterSchedule = function (PrePracScheID, UpdLoginID) {
            var paramObject = { "PrePracScheID": PrePracScheID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/MarkEntrySchedule/DeletePrePracCenterSchedule', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (MarkEntrSchID) {
            var paramObject = { "MarkEntrSchID": MarkEntrSchID };
            var promise = DataAccessService.getDataWithPara('api/MarkEntrySchedule/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});