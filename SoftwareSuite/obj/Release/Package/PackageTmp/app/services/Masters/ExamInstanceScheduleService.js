define(['app'], function (app) {
	app.service("ExamInstanceScheduleService", function (DataAccessService) {
		this.AddExamInstanceSchedule = function (object) {
			var promise = DataAccessService.putData('api/ExamInstanceSchedule/PutExamInstanceSchedule', object);
            return promise;
        }
		this.UpdateExamInstanceSchedule = function (object) {
			var promise = DataAccessService.postData('api/ExamInstanceSchedule/PostExamInstanceSchedule', object);
            return promise;
        }
		this.DeleteExamInstanceSchedule = function (ExamInstID) {
			var paramObject = { "ExamInstID": ExamInstID };
			var promise = DataAccessService.deleteData('api/ExamInstanceSchedule/DeleteExamInstanceSchedule', paramObject);
            return promise;
        }
		this.GetExamInstanceScheduleList = function () {
			var data = DataAccessService.getDataAll('api/ExamInstanceSchedule/GetExamInstanceScheduleList');
            return data;
        }
		this.GetExamInstanceScheduleListByID = function (ExamInstID) {
			var paramObject = { "ExamInstID": ExamInstID };
			var promise = DataAccessService.getDataWithPara('api/ExamInstanceSchedule/GetExamInstanceScheduleListByID', paramObject);
            return promise;
        }
        this.GetExamFeesPerYear = function (ExamFeesCode, ExamFeesDesc, ExamFeesAmount, ExmInstSchID, ExamInstID, ExamID) {
            var paramObject = { "ExamFeesCode": ExamFeesCode, "ExamFeesDesc": ExamFeesDesc, "ExamFeesAmount": ExamFeesAmount, "ExmInstSchID": ExmInstSchID, "ExamInstID": ExamInstID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/ExamInstanceSchedule/GetExamFeesPerYear', paramObject);
            return promise;
        }
		this.GetCheckDependancy = function (ExamInstID) {
			var paramObject = { "ExamInstID": ExamInstID };
			var promise = DataAccessService.getDataWithPara('api/ExamInstanceSchedule/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});