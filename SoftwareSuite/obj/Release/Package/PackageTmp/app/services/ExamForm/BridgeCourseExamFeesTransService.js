define(['app'], function (app) {
    app.service("BridgeCourseExamFeesTransService", function (DataAccessService) {       

        this.GetDrillDownFeeTransReport = function (AcdYrID, DistrictID, LoggedUserId, MngtTypIDs, ExamID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "LoggedUserId": LoggedUserId, "MngtTypIDs": MngtTypIDs, "ExamID":ExamID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesTrans/GetBridgeCourseExamFeesTransReport', paramObject);
            return promise;
        }
        

        this.GetBridgeCourseFeeTransReportByCollege = function (AcdYrID, DistrictID, CollegeID, MngtTypIDs, ExamID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "CollegeID": CollegeID, "MngtTypIDs": MngtTypIDs, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesTrans/GetBridgeCourseFeeTransReportByCollege', paramObject);
            return promise;
        }

        this.GetCandidateByCollege = function (TransactionID, ColCode, ExamID) {
            var paramObject = { "TransactionID": TransactionID, "ColCode": ColCode, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesTrans/GetCandidateByCollege', paramObject);
            return promise;
        }

        this.GetBridgeCandidateByCollege = function (TransactionID, ColCode, ExamID) {
            var paramObject = { "TransactionID": TransactionID, "ColCode": ColCode, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesTrans/GetBridgeCandidateByCollege', paramObject);
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
        this.GetExamFeeTransExcelReportByCollege = function (AcdYrID, DistrictID, CollegeID, MngtTypIDs, ExamID, AcdYrSelectText, DistrictSelectText, StreamYearSelectText, MngtName) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "CollegeID": CollegeID, "MngtTypIDs": MngtTypIDs, "ExamID": ExamID, "AcdYrSelectText": AcdYrSelectText, "DistrictSelectText": DistrictSelectText, "StreamYearSelectText": StreamYearSelectText, "MngtName": MngtName };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesTrans/GetExamFeeTransExcelReportByCollege', paramObject);
            return promise;
        }
    });
});