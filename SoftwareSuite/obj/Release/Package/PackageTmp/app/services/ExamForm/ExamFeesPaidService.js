define(['app'], function (app) {
    app.service("ExamFeesPaidService", function (DataAccessService) {
        this.PostExamRegBatchNo = function (object) {
            var promise = DataAccessService.postData('api/ExamForms/PostExamRegBatchNo', object);
            return promise;
        }
        this.GetInsertFeesUpdate = function (ExamInstID, CollegeID, ChallanID, CollegeTransDate, ExamID, CourseID) {
            var paramObject = {
                "ExamInstID": ExamInstID, "CollegeID": CollegeID, "ChallanID": ChallanID, "CollegeTransDate": CollegeTransDate, "ExamID": ExamID, "CourseID": CourseID
            };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetInsertFeesUpdate', paramObject);
            return promise;
        }
        this.GetExamFeesPaidList = function (ExamInstID, CollegeID, CourseID, ExamID, CollegeTransferDates) {
            var paramObject = { "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "CollegeTransferDates": CollegeTransferDates };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFeesPaidList', paramObject);
            return promise;
        }
        this.StudCheckData = function (object) {
            var promise = DataAccessService.postData('api/ExamForms/PostOrderID', object);
            return promise;
        }
        this.StudCheckDataUsingChallan = function (object) {
            var promise = DataAccessService.postData('api/ExamForms/PostOrderIDUsingChallan', object);
            return promise;
        }
        this.GetCollegeTransferDates = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCollegeTransferDates', paramObject);
            return promise;
        }


        this.GetExamFeesPaidListSummary = function (ExamInstID, CollegeID, CourseID, ExamID) {
            var paramObject = { "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFeesPaidListSummary', paramObject);
            return promise;
        }
        this.GetExamFeesPaidListSummaryBridge = function (ExamInstID, CollegeID, CourseID, ExamID, BridgeFlag) {
            var paramObject = { "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BridgeFlag":BridgeFlag };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFeesPaidListSummaryBridge', paramObject);
            return promise;
        }
        this.StudCheckData = function (object) {
            var promise = DataAccessService.postData('api/ExamForms/PostOrderID', object);
            return promise;
        }
        this.GetStudentDetailsByTransactionID = function (ExamInstID, CollegeID, ChallanID, CollegeTransDate, ExamID, CourseID, TransactionID) {
            var paramObject = {
                "ExamInstID": ExamInstID, "CollegeID": CollegeID, "ChallanID": ChallanID, "CollegeTransDate": CollegeTransDate, "ExamID": ExamID, "CourseID": CourseID, "TransactionID": TransactionID};
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetStudentDetailsByTransactionID', paramObject);
            return promise;
        }
        this.GetStudentDetailsByTransactionIDForBridge = function (ExamInstID, CollegeID, ChallanID, CollegeTransDate, ExamID, CourseID, TransactionID) {
            var paramObject = {
                "ExamInstID": ExamInstID, "CollegeID": CollegeID, "ChallanID": ChallanID, "CollegeTransDate": CollegeTransDate, "ExamID": ExamID, "CourseID": CourseID, "TransactionID": TransactionID
            };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetStudentDetailsByTransactionIDForBridge', paramObject);
            return promise;
        }
        this.GetUpdateDeselectStudent = function (ExamInstID, PreStudRegIDs,CollegeID,ChallanNo, CollegeTransDate, StudDeSelectFees, StudDeSelectCnt) {
            var paramObject = {
                "ExamInstID": ExamInstID, "PreStudRegIDs": PreStudRegIDs, "CollegeID": CollegeID, "ChallanNo": ChallanNo, "CollegeTransDate": CollegeTransDate, "StudDeSelectFees": StudDeSelectFees, "StudDeSelectCnt": StudDeSelectCnt};
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetUpdateDeselectStudent', paramObject);
            return promise;
        }
        this.GetUpdateDeselectStudentForBridge = function (ExamInstID, PreStudRegIDs, CollegeID, ChallanNo, CollegeTransDate, StudDeSelectFees, StudDeSelectCnt) {
            var paramObject = {
                "ExamInstID": ExamInstID, "PreStudRegIDs": PreStudRegIDs, "CollegeID": CollegeID, "ChallanNo": ChallanNo, "CollegeTransDate": CollegeTransDate, "StudDeSelectFees": StudDeSelectFees, "StudDeSelectCnt": StudDeSelectCnt
            };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetUpdateDeselectStudentForBridge', paramObject);
            return promise;
        }
        this.GetInsertExamFeesPaymentChallan = function (ExamInstID, CollegeID, ChallanNo, StudentCount, TotalFeeAmount, LateFeeAmount, ExamID, CourseID, CollegeTransDate) {
            var paramObject = {
                "ExamInstID": ExamInstID, "CollegeID": CollegeID, "ChallanNo": ChallanNo, "StudentCount": StudentCount, "FormFees": TotalFeeAmount, "LateFeeAmount": LateFeeAmount, "ExamID": ExamID, "CourseID": CourseID, "CollegeTransDate": CollegeTransDate
            };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetInsertExamFeesPaymentChallan', paramObject);
            return promise;
        }
        this.GetInsertExamFeesPaymentChallanBridge = function (ExamInstID, CollegeID, ChallanNo, StudentCount, TotalFeeAmount, LateFeeAmount, ExamID, CourseID, CollegeTransDate) {
            var paramObject = {
                "ExamInstID": ExamInstID, "CollegeID": CollegeID, "ChallanNo": ChallanNo, "StudentCount": StudentCount, "FormFees": TotalFeeAmount, "LateFeeAmount": LateFeeAmount, "ExamID": ExamID, "CourseID": CourseID, "CollegeTransDate": CollegeTransDate
            };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetInsertExamFeesPaymentChallanBridge', paramObject);
            return promise;
        }
    });
});