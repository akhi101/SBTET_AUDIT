define(['app'], function (app) {
    app.service("BasicExamInstanceScheduleService", function (DataAccessService) {
		this.AddBasicExamInstanceSchedule = function (object) {
			var promise = DataAccessService.putData('api/ExamInstanceSchedule/PutExamInstanceSchedule', object);
            return promise;
        }
		this.UpdateBasicExamInstanceSchedule = function (object) {
			var promise = DataAccessService.postData('api/ExamInstanceSchedule/PostExamInstanceSchedule', object);
            return promise;
        }
		this.DeleteBasicExamInstanceSchedule = function (ExmInstSchID, UpdLoginID) {
			var paramObject = { "ExmInstSchID": ExmInstSchID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/ExamInstanceSchedule/DeleteExamInstanceSchedule', paramObject);
            return promise;
        }
		this.GetExamInstanceScheduleList = function () {
			var data = DataAccessService.getDataAll('api/ExamInstanceSchedule/GetExamInstanceScheduleList');
            return data;
        }
        this.GetBasicExamInstanceScheduleListByID = function (ExmInstSchID) {
			var paramObject = { "ExmInstSchID": ExmInstSchID };
			var promise = DataAccessService.getDataWithPara('api/ExamInstanceSchedule/GetExamInstanceScheduleListByID', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (ExmInstSchID) {
			var paramObject = { "ExmInstSchID": ExmInstSchID };
			var promise = DataAccessService.getDataWithPara('api/ExamInstanceSchedule/GetCheckDependancy', paramObject);
            return promise;
        }
        this.GetExamInstanceYearList = function () {
            var data = DataAccessService.getDataAll('api/ExamInstanceSchedule/GetExamInstanceYearList');
            return data;
        }

        
    });
});