define(['app'], function (app) {
    app.service("NRCorrectionDistWiseService", function (DataAccessService) {       
        this.GetCurrentAcademicYearForDrillDown = function () {
            var data = DataAccessService.getDataAll('api/BasicAcademicYear/GetCurrentAcademicYearForDrillDown');
            return data;
        }
        this.GetDistrictListByStateID = function (StateID) {
            var paramObject = { "StateID": StateID };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetDistrictListByStateID', paramObject);
            return promise;
        }
        
        this.GetExamFeeTransactionSummary = function (AcdYrID, DistrictID, LoggedUserId, MngtTypIDs, ExamID) {
            var paramObject = { "AcdYrID": AcdYrID, "DistrictID": DistrictID, "LoggedUserId": LoggedUserId, "MngtTypIDs": MngtTypIDs, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/ExamFeesTrans/GetExamFeeDistTransSumm', paramObject);
            return promise;
        }
        this.GetDistrictLevelDetails = function (AcdYrID, DistrictID, LoggedUserId, MngtTypIDs, ExamID) {
            var paramObject = { "AcdYrID": AcdYrID, "DistrictID": DistrictID, "LoggedUserId": LoggedUserId, "MngtTypIDs": MngtTypIDs, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/ExamFeesTrans/GetDistrictLevelDetails', paramObject);
            return promise;
        }

        this.GetCandidateDetailsTransSummByCollege = function (AcdYrID, CollegeID, ExamID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID, "ExamID":ExamID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetCandidateDetailsTransSummByCollege', paramObject);
            return promise;
        }


        this.GetBasicManagementTypeListWithAll = function () {
            var data = DataAccessService.getDataAll('api/BasicManagementType/GetBasicManagementTypeListWithAll');
            return data;
        }

        this.GetNRCorrectionListDistrictwise = function (MngtTypIDs, DistrictID, LoggedUserId) {
            var paramObject = { "MngtTypIDs": MngtTypIDs, "DistrictID": DistrictID, "LoggedUserId": LoggedUserId };
            var promise = DataAccessService.getDataWithPara('api/NRDetail/GetNRCorrectionListDistrictwise', paramObject);
            return promise;
        }
    });
});