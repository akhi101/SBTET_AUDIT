define(['app'], function (app) {
    app.service("RequestDrillDownService", function (DataAccessService) {
        this.GetTcIssueReportByCollege = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var data = DataAccessService.getDataWithPara('api/ReqDashBoard/GetTcIssueReportByCollege', paramObject);
            return data;
        }
        this.GetTcAdmissionReportByDistrict = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var data = DataAccessService.getDataWithPara('api/ReqDashBoard/GetTcAdmissionReportByDistrict', paramObject);
            return data;
        }
    });
});