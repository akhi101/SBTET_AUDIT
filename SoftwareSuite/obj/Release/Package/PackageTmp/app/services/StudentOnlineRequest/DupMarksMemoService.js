define(['app'], function (app) {
    app.service("DupMarksMemoService", function (DataAccessService) {
        this.AddDupMarksMemo = function (object) {
            var promise = DataAccessService.postData('api/ReqDupMarksMemo/PostReqDupMarksMemo', object);
            return promise;
        }
        this.UpdateDupMarksMemo = function (object) {
            var promise = DataAccessService.postData('api/ReqDupMarksMemo/PostReqDupMarksMemo', object);
            return promise;
        }
        this.DeleteDupMarksMemo = function (DupMemoID) {
            var paramObject = { "DupMemoID": DupMemoID };
            var promise = DataAccessService.deleteData('api/ReqDupMarksMemo/DeleteReqDupMarksMemo', paramObject);
            return promise;
        }
        this.GetReqDupMarksMemoCertByFormNoAndAcdYrID = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqDupMarksMemo/GetReqDupMarksMemoByFormNoAndAcdYrID', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetReqDupMarksMemoByID = function (DupMemoID) {
            var paramObject = { "DupMemoID": DupMemoID };
            var promise = DataAccessService.getDataWithPara('api/ReqDupMarksMemo/GetReqDupMarksMemoByID', paramObject);
            return promise;
        }
        this.GetStudentInfo = function (HTNO) {
            var paramObject = { "HTNO": HTNO };
            var promise = DataAccessService.getDataWithPara('api/ReqDupMarksMemo/GetStudentInfo', paramObject);
            return promise;
        }

        this.GetReqDupMarksMemoByFormNoAndAcdYrID = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqDupMarksMemo/GetReqDupMarksMemoByFormNoAndAcdYrID', paramObject);
            return promise;
        }

        this.GetDistrictsList = function () {
            var data = DataAccessService.getDataAll('api/BasicDistricts/GetBasicDistrictListByCode');
            return data;
        }
    });
});



