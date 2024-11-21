define(['app'], function (app) {
    app.service("ExamFormNRListService", function (DataAccessService) {
        this.PostExamRegBatchNo = function (object) {
            var promise = DataAccessService.postData('api/ExamFormsWC/PostExamRegBatchNo', object);
            return promise;
        }
        this.GetExamFeesPaidList = function (ExamInstID, CollegeID, CourseID, ExamID, CollegeTransferDates) {
            var paramObject = { "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "CollegeTransferDates": CollegeTransferDates };
            var promise = DataAccessService.getDataWithPara('api/ExamFormsWC/GetExamFeesPaidList', paramObject);
            return promise;
        }
        this.AddNRCorrectioncmt = function (CollegeID, Comment) {
            var paramObject = { "CollegeID": CollegeID, "Comment": Comment};
            var promise = DataAccessService.postData('api/NRDetail/InsertNRCorrectionCmt', paramObject); //PutExamForms
            return promise;
        }
        //1
        this.GetPreExamNRPDFReport = function (ExamID, ExamInstID, CollegeID ) {
            var paramObject = { "ExamID": ExamID , "ExamInstID": ExamInstID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetPreExamNRPDFReportList', paramObject);
            return promise;
        }

        this.GetPreExamNRCorrectionList = function (ExamID, ExamInstID, CollegeID, MainGrpID, MediumID, CourseID) {
            var paramObject = { "ExamID": ExamID, "ExamInstID": ExamInstID, "CollegeID": CollegeID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetPreExamNRCorrectionList', paramObject);
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