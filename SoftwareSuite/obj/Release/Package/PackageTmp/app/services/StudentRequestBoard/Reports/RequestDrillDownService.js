define(['app'], function (app) {
    app.service("RequestDrillDownService", function (DataAccessService) {
        this.GetAcademicYear = function () {
            var promise = DataAccessService.getDataWithPara('api/BasicAcademicYear/GetBasicAcademicYearListForRequests');
            return promise;
        }
        this.GetTcIssueReportByDIEO = function (AcdYrID, DistrictIDs) {
            var paramObject = { "AcdYrID": AcdYrID, "DistrictIDs": DistrictIDs };
            var promise = DataAccessService.getDataWithPara('api/ReqDashBoard/GetTcIssueReportByDIEO', paramObject);
            return promise;
        }
        this.GetTcIssueReportByCollege = function (CollegeID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "AcdYrID": AcdYrID };
            var data = DataAccessService.getDataWithPara('api/ReqDashBoard/GetTcIssueReportByCollege', paramObject);
            return data;
        }
        this.GetTcIssueStudReportByStudID = function (AcdYrID, CollegeID, StudID ) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID, "StudID": StudID };
            var data = DataAccessService.getDataWithPara('api/ReqDashBoard/GetTcIssueStudReportByStudID', paramObject);
            return data;
        }
        this.GetTcAdmissionReportByDistrict = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var data = DataAccessService.getDataWithPara('api/ReqDashBoard/GetTcAdmissionReportByDistrict', paramObject);
            return data;
        }
        this.GetTcAdmissionReportByCollege = function (AcdYrID, CollegeID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID };
            var data = DataAccessService.getDataWithPara('api/ReqDashBoard/GetTcAdmissionReportByCollege', paramObject);
            return data;
        }
    });
});