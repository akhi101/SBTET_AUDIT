define(['app'], function (app) {
    app.service("CategorywiseExamFeesPaidService", function (DataAccessService) {       

        this.GetCategorywiseExamFeesPaidReport = function (AcdYrID, DistrictID, LoggedUserId, MngtTypIDs, Branch, ExamIDPara, StudCatID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "LoggedUserId": LoggedUserId, "MngtTypIDs": MngtTypIDs, "Branch": Branch, "ExamIDPara": ExamIDPara, "StudCatID": StudCatID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetCategorywiseExamFeesPaidReport', paramObject);
            return promise;
        }
        this.GetCandidateByCollege = function (AcdYrID, DistrictID, CollegeID, MngtTypIDs) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "CollegeID": CollegeID, "MngtTypIDs": MngtTypIDs };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetCandidateByCollege', paramObject);
            return promise;
        }

        this.GetCandidateDetailsByCollegeCategory = function (AcdYrID, CollegeID, ExamID, StudCatID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID, "ExamID": ExamID, "StudCatID": StudCatID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownExamFeesPaid/GetCandidateDetailsByCollegeCategory', paramObject);
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

        this.GetCategoryList = function () {
            var data = DataAccessService.getDataAll('api/DrillDownExamFeesPaid/GetCategoryList');
            return data;
        }
    });
});