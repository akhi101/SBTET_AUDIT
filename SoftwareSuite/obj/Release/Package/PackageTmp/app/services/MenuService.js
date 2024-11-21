define(['app'], function (app) {
    app.service("MenuService", function (DataAccessService) {
        this.GetAddToToolBarMenu = function (ModuleIds) {
            var paramObject = { "ModuleIds": ModuleIds };
            var promise = DataAccessService.getDataWithPara('api/Menu/GetAddToToolBarMenu', paramObject);
            return promise;
        }
        this.GetAddToToolBarMenuForSideBar = function (ModuleIds, UserId) {
            var paramObject = { "ModuleIds": ModuleIds, "UserId": UserId };
            var promise = DataAccessService.getDataWithPara('api/Menu/GetAddToToolBarMenuForSideBar', paramObject);
            return promise;
        }
        this.GetAdmissionLoginDetail = function (CollegeId, LoggedUserId, AcdYrID) {
            var paramObject = { "CollegeId": CollegeId, "LoggedUserId": LoggedUserId, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetAdmissionLoginDetail', paramObject);
            return promise;
        }
        this.GetInsertAcdYrClg = function (CollegeID, AcdYrID, CreLoginID) {
            var paramObject = { "CollegeID": CollegeID, "AcdYrID": AcdYrID, "CreLoginID": CreLoginID};
            var promise = DataAccessService.getDataWithPara('api/AcademicYearCollege/GetInsertAcdYrClg', paramObject);
            return promise;
        }
        this.GetInsertLoginInfo = function (LoggedUserId, userName) {
            var paramObject = { "LoggedUserId": LoggedUserId, "userName": userName };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetInsertLoginInfo', paramObject);
            return promise;
        }
        this.GetUpdateLogoutInfo = function (LoggedUserId, userName) {
            var paramObject = { "LoggedUserId": LoggedUserId, "userName": userName };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetUpdateLogoutInfo', paramObject);
            return promise;
        }
        
        this.GetDistrictListByStateID = function (StateID) {
            var paramObject = { "StateID": StateID };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetDistrictListByStateID', paramObject);
            return promise;
        }
        this.GetCollegeListByDistrictAndMandal = function (AcdYrID,DistrictID) {
            var paramObject = { "AcdYrID": AcdYrID,"DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetCollegeListByDistrict', paramObject);
            return promise;
        }

        this.GetDistrictListByLoggedID = function (StateID, LoggedUserId) {
            var paramObject = { "StateID": StateID, "LoggedUserId": LoggedUserId  };
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetDistrictListByLoggedID', paramObject);
            return promise;
        }
        
        this.GetCollegeListByDistrictAndMandalGovtPvt = function (AcdYrID, DistrictID, GovtOrPvt) {
            var paramObject = { "AcdYrID": AcdYrID, "DistrictID": DistrictID, "GovtOrPvt": GovtOrPvt};
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetCollegeListByDistrictAndMandalGovtPvt', paramObject);
            return promise;
        }
        this.GetCollegeNameForExamModule = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCollegeNameForExamModule', paramObject);
            return promise;
        }
        this.GetCurretnExamInst = function (AcdYrID) {
            var paramObject = { "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCurretnExamInst', paramObject);
            return promise;
        }
    });
});