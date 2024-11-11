define(['app'], function (app) {
    app.service("ServiceRequestDrillDownReportService", function (DataAccessService) {       
        this.GetServiceRequestByServiceAndUser = function (DistrictID, ServiceID, AcdYrID, SysUsrGrpID, intColumnNo, strCallingFrom) {
            var paramObject = { "DistrictID": DistrictID, "ServiceID": ServiceID, "AcdYrID": AcdYrID, "SysUsrGrpID": SysUsrGrpID, "intColumnNo": intColumnNo, "strCallingFrom": strCallingFrom };
            var promise = DataAccessService.getDataWithPara('api/ReqDashboard/GetServiceRequestByServiceID', paramObject);
            return promise;
        }

        this.GetServiceRequestDrillDownReport = function (AcdYrID, DistrictIDs, SysUsrGrpID) {
            var paramObject = { "AcdYrID": AcdYrID, "strDistrictIDs": DistrictIDs, "SysUsrGrpID":SysUsrGrpID };
            var promise = DataAccessService.getDataWithPara('api/ServiceRequestDrillDownReport/GetServiceRequestDrillDownReport', paramObject);
            return promise;
        }

        this.GetAcademicYear = function () {
            var promise = DataAccessService.getDataWithPara('api/BasicAcademicYear/GetBasicAcademicYearListForRequests');
            return promise;
        }

        this.GetDrillDownStudentDetailsListTcIssued = function (AcdYrID, ExamID, SysUsrGrpID) {
            var paramObject = { "AcdYrID": AcdYrID, "ExamID": ExamID, "SysUsrGrpID": SysUsrGrpID };
            var promise = DataAccessService.getDataWithPara('api/ServiceRequestDrillDownReport/GetDrillDownStudentDetailsListTcIssued', paramObject);
            return promise;
        }

        this.GetCurrentAcademicYearForDrillDown = function () {
            var promise = DataAccessService.getDataWithPara('api/BasicAcademicYear/GetBasicAcademicYearListForRequests');
            return promise;
        }
    });
});