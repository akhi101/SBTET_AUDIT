define(['app'], function (app) {
    app.service("NameCorrectionService", function (DataAccessService) {
        this.AddNameCorrection = function (object) {
            var promise = DataAccessService.postData('api/ReqNameCorrection/PostReqNameCorrection', object);
            return promise;
        }
        this.UpdateNameCorrection = function (object) {
            var promise = DataAccessService.postData('api/ReqNameCorrection/ReApplyNameCorrection', object);
            return promise;
        }
        this.DeleteNameCorrection = function (NameCorID) {
            var paramObject = { "NameCorID": NameCorID };
            var promise = DataAccessService.deleteData('api/ReqNameCorrection/DeleteReqNameCorrection', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetDataByFormNo = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqNameCorrection/GetReApplyDataByFormNo', paramObject);
            return promise;
        }
        this.GetPreStudentInfo = function (HTNO) {
            var paramObject = { "HTNO": HTNO };
            var promise = DataAccessService.getDataWithPara('api/ReqNameCorrection/GetPreStudentInfoForNameCorrection', paramObject);
            return promise;
        }


        this.GetReqNameCorrectionByFormNoAndAcdYrID = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqNameCorrection/GetReqNameCorrectionByFormNoAndAcdYrID', paramObject);
            return promise;
        }
        this.GetMediumList = function () {
            var data = DataAccessService.getDataAll('api/ReqNameCorrection/GetBasicMediumList');
            return data;
        }
        this.GetDistrictsList = function () {
            var data = DataAccessService.getDataAll('api/BasicDistricts/GetBasicDistrictListByCode');
            return data;
        }

    });
});