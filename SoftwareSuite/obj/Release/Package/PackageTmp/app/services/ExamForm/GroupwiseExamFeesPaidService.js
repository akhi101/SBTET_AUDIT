define(['app'], function (app) {
    app.service("GroupwiseExamFeesPaidService", function (DataAccessService) {       

        this.GetGroupwiseExamFeesPaidReport = function (AcdYrID, DistrictID, LoggedUserId, MngtTypIDs, Branch, ExamIDPara, MainGrpID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "LoggedUserId": LoggedUserId, "MngtTypIDs": MngtTypIDs, "Branch": Branch, "ExamIDPara": ExamIDPara, "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetGroupwiseExamFeesPaidReport', paramObject);
            return promise;
        }
        this.GetCandidateByCollege = function (AcdYrID, DistrictID, CollegeID, MngtTypIDs) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "CollegeID": CollegeID, "MngtTypIDs": MngtTypIDs };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetCandidateByCollege', paramObject);
            return promise;
        }

        this.GetCandidateDetailsByCollegeGroup = function (AcdYrID, CollegeID, ExamID, MainGrpID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID, "ExamID": ExamID, "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetCandidateDetailsByCollegeGroup', paramObject);
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

        this.GetMainGrpList = function (GroupName) {
            var paramObject = { "GroupName": GroupName };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetGroupsList', paramObject);
            return promise;
        }
    });
});