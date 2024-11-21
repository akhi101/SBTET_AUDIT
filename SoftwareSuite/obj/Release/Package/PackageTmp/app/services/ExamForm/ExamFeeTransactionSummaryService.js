define(['app'], function (app) {
    app.service("ExamFeeTransactionSummaryService", function (DataAccessService) {       

        this.GetExamFeeTransactionSummary = function (AcdYrID, DistrictID, LoggedUserId, MngtTypIDs, ExamID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "LoggedUserId": LoggedUserId, "MngtTypIDs": MngtTypIDs, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetExamFeeTransactionSummary', paramObject);
            return promise;
        }
        this.GetCandidateByCollege = function (AcdYrID, DistrictID, CollegeID, MngtTypIDs) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "CollegeID": CollegeID, "MngtTypIDs": MngtTypIDs };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetCandidateByCollege', paramObject);
            return promise;
        }

        this.GetCandidateDetailsTransSummByCollege = function (AcdYrID, CollegeID, ExamID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetCandidateDetailsTransSummByCollege', paramObject);
            return promise;
        }
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
        this.GetCourseListForRegStud = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetCourseListForRegStud', paramObject);
            return promise;
        }
        this.GetBasicManagementTypeList = function () {
            var data = DataAccessService.getDataAll('api/BasicManagementType/GetBasicManagementTypeList');
            return data;
        }

        this.GetBasicManagementTypeListWithAll = function () {
            var data = DataAccessService.getDataAll('api/BasicManagementType/GetBasicManagementTypeListWithAll');
            return data;
        }
        this.GetDistrictListByStateID = function (StateID) {
            var paramObject = { "StateID": StateID };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetDistrictListByStateID', paramObject);
            return promise;
        }
        this.GetCurrentAcademicYearForDrillDown = function () {
            var data = DataAccessService.getDataAll('api/BasicAcademicYear/GetCurrentAcademicYearForDrillDown');
            return data;
        }
        this.GetCollegeExamFeeTransactionSummaryNew = function (AcdYrID, CollegeID, ExamID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID":CollegeID, "ExamID":ExamID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetCollegeExamFeeTransactionSummaryNew', paramObject);
            return promise;
        }

        this.GeneratePDF = function (AcdYrID, DistrictID, LoggedUserId, MngtTypIDs, Branch) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "LoggedUserId": LoggedUserId, "MngtTypIDs": MngtTypIDs, "Branch": Branch };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GeneratePDF', paramObject);
            return promise;
        }
    });
});