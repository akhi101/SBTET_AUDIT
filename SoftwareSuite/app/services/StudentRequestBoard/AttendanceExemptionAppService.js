define(['app'], function (app) {
    app.service("AttendanceExemptionAppService", function (DataAccessService) {
        //Getdata for Board Side Student by ID
        this.GetReqAttendanceExemptionByID = function (AttendExID) {
            var paramObject = { "AttendExID": AttendExID };
            var promise = DataAccessService.getDataWithPara('api/ReqAttendanceExemption/GetReqAttendanceExemptionByID', paramObject);
            return promise;
        }
        //Board Side Approved or Rejected
        this.UpdateAttendanceExemptionApp = function (object) {
            var promise = DataAccessService.postData('api/ReqAttendanceExemption/PostApprovedOrRejectedReqAttendanceExemption', object);
            return promise;
        }

        this.GetCertPdf = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqAttendanceExemption/GetCertPdf', paramObject);
            return promise;
        }


    });
});