define(['app'], function (app) {
    app.service("BasicExamInstanceScheduleService", function (DataAccessService) {
		this.AddBasicExamInstanceSchedule = function (object) {
            var promise = DataAccessService.postData('api/ExamInstanceSchedule/PostInsertExamInstanceSchedule', object); //PutExamInstanceSchedule
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
        
        this.CheckDuplicateInstance = function (ExamInstID,CourseID,ExamId,BranchID) {
            var paramObject = { "ExamInstID": ExamInstID, "CourseID": CourseID, "ExamId": ExamId, "BranchID": BranchID};
            var promise = DataAccessService.getDataWithPara('api/ExamInstanceSchedule/GetCheckDuplicateInstance', paramObject);
            return promise;
        }
        //GetCheckDatesValidations StartDate, EndDate, FromLateDate1, FromLateDate2, FromLateDate3
        this.PostCheckDatesValidations = function (object) {
            var promise = DataAccessService.postData('api/ExamInstanceSchedule/PostCheckDatesValidations', object);
            return promise;
            //var paramObject = { "StartDate": StartDate, "EndDate": FromLateDate1, "FromLateDate1": FromLateDate1, "FromLateDate2": FromLateDate2, "FromLateDate3": FromLateDate3};
            //var promise = DataAccessService.getDataWithPara('api/ExamInstanceSchedule/GetCheckDatesValidations', paramObject);
            //return promise;
        }

        this.GetExamFeesPerYear = function ( ExamFeesCode,  ExamFeesDesc,  ExamFeesAmount,  ExmInstSchID,  ExamInstID,  ExamID) {
            var paramObject = { "ExamFeesCode": ExamFeesCode, "ExamFeesDesc": ExamFeesDesc, "ExamFeesAmount": ExamFeesAmount, "ExmInstSchID": ExmInstSchID, "ExamInstID": ExamInstID, "ExamID": ExamID};
            var promise = DataAccessService.getDataWithPara('api/ExamInstanceSchedule/GetExamFeesPerYear', paramObject);
            return promise;
        }


    });
});