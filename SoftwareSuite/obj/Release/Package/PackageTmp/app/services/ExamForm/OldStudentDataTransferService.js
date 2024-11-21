define(['app'], function (app) {
    app.service("OldStudentDataTransferService", function (DataAccessService) {
        this.GetOldStudentData = function (HTNO, DistrictIDs) {
            var paramObject = { "HTNO": HTNO, "DistrictIDs": DistrictIDs };
            var promise = DataAccessService.getDataWithPara('api/OldStudentDataTransfer/GetOldStudentData', paramObject);
            return promise;
        }
        this.GetColList = function (DistrictIDs) {
            var paramObject = {"DistrictIDs": DistrictIDs };
            var promise = DataAccessService.getDataWithPara('api/OldStudentDataTransfer/GetColList', paramObject);
            return promise;
        }
        this.TransferStudentData = function (object) {
             var promise = DataAccessService.postData('api/OldStudentDataTransfer/PostTransferStudentData', object);
            return promise;
        }
    });
});