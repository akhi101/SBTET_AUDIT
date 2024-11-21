define(['app'], function (app) {
    app.service("TranscriptsService", function (DataAccessService) {
        this.AddTranscripts = function (object) {
            var promise = DataAccessService.postData('api/ReqTranscripts/PostReqTranscripts', object);
            return promise;
        }
        this.UpdateTranscripts = function (object) {
            var promise = DataAccessService.postData('api/ReqTranscripts/PostReqTranscripts', object);
            return promise;
        }
        this.DeleteTranscripts = function (TrnSrptID) {
            var paramObject = { "TrnSrptID": TrnSrptID };
            var promise = DataAccessService.deleteData('api/ReqTranscripts/DeleteReqTranscripts', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetTranscriptsByID = function (TrnSrptID) {
            var paramObject = { "TrnSrptID": TrnSrptID };
            var promise = DataAccessService.getDataWithPara('api/ReqTranscripts/GetReqTranscriptsByID', paramObject);
            return promise;
        }
        this.GetPreStudentInfo = function (HTNO) {
            var paramObject = { "HTNO": HTNO };
            var promise = DataAccessService.getDataWithPara('api/ReqTranscripts/GetPreStudentInfoByHTNO', paramObject);
            return promise;
        }


        this.GetReqTranscriptsByFormNoAndAcdYrID = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqTranscripts/GetReqTranscriptsByFormNoAndAcdYrID', paramObject);
            return promise;
        }

    });
});