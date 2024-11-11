define(['app'], function (app) {
    app.service("StudentResultService", function (DataAccessService) {
        this.GetBranchWiseReport = function (CollegeId, SchemeId, SemYearId, BranchId) {

            var paramObject = { "CollegeId": CollegeId, "SchemeId": SchemeId, "SemYearId": SemYearId, "BranchId": BranchId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetBranchWiseReport', paramObject);
            return promise;
        }
        this.GetBranchWiseOldReport = function (CollegeId, SchemeId, SemYearId, BranchId) {

            var paramObject = { "CollegeId": CollegeId, "SchemeId": SchemeId, "SemYearId": SemYearId, "BranchId": BranchId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetBranchWiseOldReport', paramObject);
            return promise;
        }
        this.GetStudentWiseReport = function (StudentTypeId, Pin, SchemeId, ExamTypeId, ExamMonthYearId, SemYearId) {

            var paramObject = { "StudentTypeId": StudentTypeId, "Pin": Pin, "SchemeId": SchemeId, "ExamMonthYearId": ExamMonthYearId, "ExamTypeId": ExamTypeId, "SemYearId": SemYearId};
            var promise = DataAccessService.getDataWithPara('api/Results/GetStudentWiseReport', paramObject);
            return promise;
        }
        this.GetC18MidStudentWiseReport = function (SemYearId, Pin, SchemeId, ExamTypeId) {

            var paramObject = { "SemYearId": SemYearId, "Pin": Pin, "SchemeId": SchemeId, "ExamTypeId": ExamTypeId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetC18MidStudentWiseReport', paramObject);
            console.log(paramObject)
            return promise;
        }
        this.GetConsolidatedPreviewResults = function (StudentTypeId, scheme,Pin) {
            var paramObject = { "StudentTypeId": StudentTypeId, "scheme": scheme, "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/Results/GetConsolidatedPreviewResults', paramObject);
            return promise;
        };

        this.GetConsolidatedRVRCPreviewResults = function (ExamMonthYearId, StudentTypeId, Scheme, pin, ExamTypeId) {
            var paramObject = { "ExamMonthYearId": ExamMonthYearId, "StudentTypeId": StudentTypeId, "Scheme": Scheme, "pin": pin, "ExamTypeId": ExamTypeId};
            var promise = DataAccessService.getDataWithPara('api/Results/GetConsolidatedRVRCPreviewResults', paramObject);
            return promise;
        };

        this.GetConsolidatedResult = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/Results/GetConsolidatedResults', paramObject);
            return promise;
        };
       
        this.GetC09ConsolidatedResult = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/Results/GetC09ConsolidatedResult', paramObject);
            return promise;
        };
        this.GetC05ConsolidatedResult = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/Results/GetC05ConsolidatedResult', paramObject);
            return promise;
        };
       
        this.GetC08ConsolidatedResult = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/Results/GetC08ConsolidatedResult', paramObject);
            return promise;
        };

        this.GetC14ConsolidatedResult = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/Results/GetC14ConsolidatedResult', paramObject);
            return promise;
        };

        this.GetC16ConsolidatedResult = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/Results/GetC16ConsolidatedResult', paramObject);
            return promise;
        };

        this.GetC16SConsolidatedResult = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/Results/GetC16SConsolidatedResult', paramObject);
            return promise;
        };

        this.GetER91ConsolidatedResult = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/Results/GetER91ConsolidatedResult', paramObject);
            return promise;
        };
        

        this.GetResultsHistory = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('api/Results/GetResultsHistory', paramObject);
            return promise;
        };

        this.GetOldStudentWiseReport = function (StudentTypeId, Pin, SchemeId, ExamTypeId, ExamMonthYearId, SemYearId) {

            var paramObject = { "StudentTypeId": StudentTypeId, "Pin": Pin, "SchemeId": SchemeId, "ExamMonthYearId": ExamMonthYearId, "ExamTypeId": ExamTypeId, "SemYearId": SemYearId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetOldStudentWiseReport', paramObject);
            return promise;
        };

        
        this.Getc09StudentWiseReport = function (StudentTypeId, Pin, SchemeId, ExamTypeId, ExamMonthYearId, semid) {

            var paramObject = { "Pin": Pin, "StudentTypeId": StudentTypeId, "ExamMonthYearId": ExamMonthYearId, "SchemeId": SchemeId, "semid": semid, "ExamTypeId": ExamTypeId };
            var promise = DataAccessService.getDataWithPara('api/Results/Getc09StudentWiseReport', paramObject);
            return promise;
        };


        //this.GetOldStudentWiseReport = function (SemYearId, Pin, SchemeId, ExamTypeId) {

        //    var paramObject = { "SemYearId": SemYearId, "Pin": Pin, "SchemeId": SchemeId, "ExamTypeId": ExamTypeId };
        //    var promise = DataAccessService.getDataWithPara('api/Results/GetOldStudentWiseReport', paramObject);
        //    return promise;
        //}
        this.GetSchemeSemBranchInfo = function (CollegeId) {

            var paramObject = { "CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetSchemeSemBranchInfo', paramObject);
            return promise;
        }
        this.GetSchemeDataForResults = function () {
            var promise = DataAccessService.getDataAll('api/Results/GetSchemeDataForResults');
            return promise;
        }
        this.GetExamTypeForResults = function (SchemeId) {
            var paramObject = { "SchemeId": SchemeId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetExamTypeForResults', paramObject);
            return promise;
        }

     
        
        this.GetExamMonthYearByAcademicYear = function (Academicyearid) {
            var paramObject = { "Academicyearid": ExamMonthYearId };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetExamMonthYearByAcademicYear', paramObject);
            return promise;
        }
        
        this.getStudentType = function () {
            return DataAccessService.getDataAll('api/PreExamination/get_StudentTypes');
        },

        this.GetExamTypeInfo = function (SchemeId, SemYearId) {
            var paramObject = { "SchemeId": SchemeId, "SemYearId": SemYearId };
            var promise = DataAccessService.getDataWithPara('api/Results/GetExamTypeInfo', paramObject);
            return promise;
        };
        this.GetExamMonthYear = function () {
            var promise = DataAccessService.getDataAll('api/Results/GetExamMonthYear');
            return promise;
        };
        this.GetTypeWritingShorthandReport = function (HallTicketno) {
            var paramObject = { "hallTicketno": HallTicketno };
            var promise = DataAccessService.getDataWithPara('api/Results/GetTypeWritingShorthandReport', paramObject);
            return promise;
        };
    });
});