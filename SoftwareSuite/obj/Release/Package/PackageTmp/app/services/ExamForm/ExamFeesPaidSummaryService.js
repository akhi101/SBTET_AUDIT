define(['app'], function (app) {
    app.service("ExamFeesPaidSummaryService", function (DataAccessService) {
        this.PostExamRegBatchNo = function (object) {
            var promise = DataAccessService.postData('api/ExamFormsWC/PostExamRegBatchNo', object);
            return promise;
        }
        this.GetExamFeesPaidList = function (ExamInstID, CollegeID, CourseID, ExamID, CollegeTransferDates) {
            var paramObject = { "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "CollegeTransferDates": CollegeTransferDates };
            var promise = DataAccessService.getDataWithPara('api/ExamFormsWC/GetExamFeesPaidList', paramObject);
            return promise;
        }


        this.GetExamFeesPaidListSummary = function (ExamInstID, CollegeID, CourseID, ExamID) {
            var paramObject = { "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID};
            var promise = DataAccessService.getDataWithPara('api/ExamFormsWC/GetExamFeesPaidListSummary', paramObject);
            return promise;
        }


        this.StudCheckData = function (object) {
            //var promise = DataAccessService.postData('api/ExamFormsWC/PostOrderID', object);
            var promise = DataAccessService.getDataWithPara('api/ExamFormsWC/PostOrderID', paramObject);
            return promise;
        }
        this.GetCollegeTransferDates = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/ExamFormsWC/GetCollegeTransferDates', paramObject);
            return promise;
        }

    });
});